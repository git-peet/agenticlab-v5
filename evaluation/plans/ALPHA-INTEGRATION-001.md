# ALPHA-INTEGRATION-001 — Integration of Knowledge-Capture Mechanisms into Canonical V5

**Status:** Approved for integration  
**Prepared:** 2026-10-18  
**Parent pilots:** ALPHA-KNOWLEDGE-PILOT-001, ALPHA-KNOWLEDGE-READ-001, ALPHA-C03-CONTEXT-RETRIEVAL-001, ALPHA-C04-GOVERNANCE-SAFETY-001

## Scope

Integrate the validated knowledge-capture mechanisms (triage → staging → batch promotion → retrieval) into the canonical AgenticLab V5 system, using the installed payload at `/home/peet/Projects/AgenticLab/` as scaffolding.

**Preserved boundaries:**
- Canonical V5 (`/home/peet/Projects/AgenticLab-v5/`) — **untouched**, remains clean baseline
- Clean EverShop source (`/home/peet/Projects/clean-evershop-dev/`) — **untouched**
- Pilot workspace (`/home/peet/Projects/V5-memory-pilot-001/`) — **active test case** with promoted record
- Installed payload (`/home/peet/Projects/AgenticLab/`) — **integration target** (scaffolding with validated adapter)

## Integration steps

### Step 1: Verify installed payload matches pilot validation
- Confirm `/home/peet/Projects/AgenticLab/adapters/pi/` contains the exact knowledge-capture adapter code tested in pilots
- Verify `knowledge-write-gate.mjs`, `knowledge-write-policy.mjs`, `knowledge-capture-tools.mjs` match pilot version
- Check `brain/knowledge-contract.md` and `brain/operating-contract.md` are current

### Step 2: Integration test in pilot workspace
- Run the full write → read cycle using the installed payload's adapter
- Verify existing promoted record (`low-friction-capture-batch-review`) is retrievable
- Test new candidate staging/promotion with installed payload

### Step 3: Canonical V5 preparation
- Document any changes needed in canonical V5 to support the integration
- Update `system/` payload to include the knowledge-capture mechanisms
- Ensure backward compatibility with existing V5 workspaces

### Step 4: Clean integration
- No changes to clean source, application code, or databases
- No package/lock file modifications
- All changes confined to the integration scaffolding and documentation

## Test criteria

- Existing active record remains retrievable
- New candidate can be triaged, staged, promoted via installed payload
- Retrieval works across fresh Pi sessions
- Safety mechanisms (opt-in, scope guards, pending isolation, atomic promotion) remain operational
- No regressions in pilot workspace state

## Evidence location

Results: `evaluation/results/ALPHA-INTEGRATION-001.md`
Checkpoint: `evaluation/checkpoints/ALPHA-20261018-INTEGRATION-CHECKPOINT.md`

## Stop conditions

- Any modification to canonical V5, clean source, or application code
- Any safety mechanism failure during integration testing
- Unauthorized write or scope violation
- Pending queue leak or data loss