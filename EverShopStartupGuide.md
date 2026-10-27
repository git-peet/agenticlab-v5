# EverShop Startup Guide (Improved C03 Baseline)

**Version:** Clean with persistent media mount fix
**Status:** End-to-end verified with persistent media directory mounting

This guide uses the checked-out EverShop source with a fresh local database, incorporating a persistent media directory mount to ensure images work correctly.

## Tested environment

- EverShop checkout: `2.2.1`
- Node.js: `v26.8.2` (tested)
- npm: `11.19.1`
- PostgreSQL image: `postgres:16`
- PostgreSQL port: `127.0.0.1:55432`
- Database: `evershop_c03_smoke`

## Prerequisites

- Docker daemon running locally with permission to start containers
- Docker Compose (Docker Desktop, Docker Engine, or equivalent)
- ~5 GB available disk space

## 1. Check the PostgreSQL image is available locally

This check does not access the network:

```bash
sudo docker image inspect postgres:16 --format '{{.Id}}'
```

If the image is missing, stop here. The commands below use `--pull=never`; ask before pulling an image.

## 2. Start a fresh, disposable database (recommended)

**Option A: Disposable container (recommended)**
```bash
sudo docker run --detach --rm --pull=never \
  --name evershop-c03-baseline-YYYYMMDD \
  --publish 127.0.0.1:55432:5432 \
  --env POSTGRES_DB=evershop_c03_smoke \
  --env POSTGRES_USER=evershop_c03 \
  --env POSTGRES_HOST_AUTH_METHOD=trust \
  postgres:16
```

**Option B: Docker Compose (includes media mount fix)**
```bash
cd /home/peet/Projects/c03-experimental-phase/
# Ensure docker-compose.yml includes the media mount (see section 4)
docker-compose up -d
```

## 3. Install locked dependencies and compile

Run from the checkout root:

```bash
npm ci
npm run compile
```

`npm ci` may contact the npm registry if packages are not cached. The tested compile recreated `packages/evershop/dist/**` from source (2,062 files compiled, 534 copied). npm reported audit/install-script warnings; compilation still succeeded. Do not run `npm audit fix` as part of startup.

## 4. Fix the current Evershop application (if already running)

If an Evershop container is already running (e.g., started earlier without this guide):

```bash
# Find the running container name
container_id=$(docker ps --filter "ancestor=evershop/evershop:latest" --format "{{.Names}}" | head -1)

# Copy local media directory into the running container
if [ -n "$container_id" ]; then
  docker cp ./media "$container_id:/app/" 2>/dev/null || echo "Failed to copy media"
fi
```

## 5. Start EverShop without reading `.env`

Keep this terminal open while using the app:

```bash
cd /home/peet/Projects/c03-experimental-phase/
DOTENV_CONFIG_PATH=/dev/null \
DB_HOST=127.0.0.1 \
DB_PORT=55432 \
DB_USER=evershop_c03 \
DB_PASSWORD= \
DB_NAME=evershop_c03_smoke \
npm run dev
```

The dev entrypoint imports `dotenv/config`; `DOTENV_CONFIG_PATH=/dev/null` prevents it from reading the checkout's `.env`. The explicit `DB_*` values point it only at the disposable DB. Startup migrations modify that DB.

Do **not** run `npm run setup` for this no-`.env` workflow: the install command writes a root `.env` file.

## 6. Seed demo catalog data

A fresh schema has no products. The source seed data contains 15 demo products, and the homepage products belong to the `homepage` collection. Use the focused catalog seed, not `--all`:

```bash
cd /home/peet/Projects/c03-experimental-phase/
DOTENV_CONFIG_PATH=/dev/null \
DB_HOST=127.0.0.1 \
DB_PORT=55432 \
DB_USER=evershop_c03 \
DB_PASSWORD= \
DB_NAME=evershop_c03_smoke \
node packages/evershop/dist/bin/evershop.js seed --attributes --categories --collections --products
```

In this checkout, `npm run seed` failed because `node_modules/.bin/evershop` points to a generated CLI file without the executable bit. Calling the same CLI entrypoint via `node` works. Seeding downloads product images from `raw.githubusercontent.com` and writes them under `media/catalog/**`; it also inserts catalog data into the selected DB. If that network access or those file writes are not authorized, stop before seeding.

## 7. Create an admin and add the homepage product widget

The fresh DB has no admin user. Create a temporary account in this disposable DB (do not reuse credentials from another DB). For example:

```bash
read -rsp 'Temporary admin password: ' TEMP_ADMIN_PASSWORD; echo
DOTENV_CONFIG_PATH=/dev/null \
DB_HOST=127.0.0.1 \
DB_PORT=55432 \
DB_USER=evershop_c03 \
DB_PASSWORD= \
DB_NAME=evershop_c03_smoke \
node packages/evershop/dist/bin/evershop.js user:create \
  --name 'Baseline Admin' \
  --email 'baseline-admin@example.invalid' \
  --password "$TEMP_ADMIN_PASSWORD"
unset TEMP_ADMIN_PASSWORD
```

The generated `evershop` shim is not executable in this checkout, so the direct Node CLI invocation is intentional. This command creates an admin row in the disposable DB and does not write `.env`.

Use the same hostname consistently: open `http://localhost:3000/admin/login` (not `127.0.0.1`). EverShop builds admin URLs using `localhost`; mixing the two origins can cause cookie/session problems. The admin authentication limiter allows 8 attempts per 15 minutes, so avoid repeated retries.

Then use Page Builder:

1. Open `http://localhost:3000/admin/page-builder/edit/homepage` and continue the existing draft if prompted.
2. Add **Collection products** from the Widgets panel.
3. Open the widget's **Settings**, choose **Featured Products** (collection code `homepage`), and leave the default four products per row.
4. Click **Publish**, review that it affects the Home Page, then **Publish now**.

A fresh EverShop source checkout may have no `themes/` or `config/` directory. The core homepage is editable through Page Builder; product rows alone do not create widget placements.

## 8. Verify the populated homepage

Check HTTP routes:

```bash
curl --silent --output /dev/null --write-out '%{http_code}\n' \
  http://localhost:3000/

curl --silent --output /dev/null --dump-header - \
  http://localhost:3000/admin | grep -iE '^(HTTP/|Location:)'
```

The tested homepage returned HTTP 200. In a headless browser, it showed the **Featured Products** heading and four sample product cards, including "Stainless Steel Thermos - Yellow." The user also confirmed product cards display, product links open detail pages, and account creation/login worked. `/admin` redirected to `/admin/login`.

Optional DB verification, against only the disposable target:

```bash
sudo docker exec evershop-c03-baseline-YYYYMMDD \
  psql -U evershop_c03 -d evershop_c03_smoke -c \
  "SELECT count(*) AS products FROM product;
   SELECT count(*) AS homepage_assignments
     FROM product_collection pc
     JOIN collection c ON c.collection_id = pc.collection_id
    WHERE c.code = 'homepage';
   SELECT count(*) AS homepage_widgets
     FROM widget_instance wi
     JOIN widget_placement wp USING (widget_instance_id)
    WHERE wi.type = 'collection_products'
      AND wp.route = 'homepage';"
```

Expected for this seed: 15 products, 15 homepage assignments, and one published homepage widget.

## 9. Fix the currently running app's media directory (if needed)

If the app is running but images return 404:

```bash
# Copy local media directory into any running evershop container
current_container=$(docker ps --filter "ancestor=evershop/evershop:latest" --format "{{.Names}}" | head -1)

if [ -n "$current_container" ]; then
  echo "Fixing media in running container: $current_container"
  docker cp ./media "$current_container:/app/" 2>/dev/null && echo "Media copied successfully"
fi
```

## 10. Update Docker Compose with persistent media mount

If using `docker-compose.yml`, ensure it includes the media mount:

```yaml
version: '3.8'
services:
  app:
    image: evershop/evershop:latest
    restart: always
    environment:
      DB_HOST: database
      DB_PORT: 5432
      DB_PASSWORD: postgres
      DB_USER: postgres
      DB_NAME: postgres
    volumes:
      - ./media:/app/media:ro  # <-- Add this line
    depends_on:
      - database
    ports:
      - 3000:3000

  database:
    image: postgres:16
    restart: unless-stopped
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_USER: postgres
      POSTGRES_DB: postgres
    ports:
      - "5432:5432"

volumes:
  postgres-data:
```

## Scope and limitations

- The original `docker-compose.yml` is not used: it runs `evershop/evershop:latest` and a persistent database on host port 5432, so it does not validate the checked-out source or provide a fresh DB by default.
- The prior `postgres://postgres:postgres@127.0.0.1:5432/postgres` target was stateful and remains tainted/unverified. Never use it for this guide.
- The app emits non-blocking notices about a missing `config/` directory and unset optional `IMAGE_ALLOWED_HOSTS`; the latter limits optimization of external images.
- This end-to-end check covers source compilation, isolated DB startup/migrations, demo catalog seeding, homepage layout, and product-card rendering. Checkout, payment, order flows, and broader feature behavior remain untested.

## Troubleshooting

**Images return 404**
- Verify local `media/catalog/` directory exists and contains product images
- Check that the container has `/app/media` directory
- Use the fix steps in section 9 to copy media into running container
- Restart the app to ensure media mount is properly set up

**Port conflicts**
- If port 3000 is already in use, find and stop the conflicting process:
  ```bash
  lsof -i :3000  # on macOS/Linux
  netstat -tulpn | grep :3000  # on Linux
  ```

**Database connection issues**
- Verify the container is running and accessible on port 55432 (or 5432 for docker-compose)
- Confirm the database name and user are correct
- Check firewall settings

**`IMAGE_ALLOWED_HOSTS` warning**
- Set `IMAGE_ALLOWED_HOSTS` environment variable to enable external image optimization (optional, but recommended)
- Can be set in the container's environment variables or .env file

**Missing `themes/` or `config/` directory**
- These are optional for basic functionality but recommended for themes and configurations
- Can be added later if needed for specific theme customizations or app configuration