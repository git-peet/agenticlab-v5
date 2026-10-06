import path from "node:path";

const KNOWLEDGE_RELATIVE_PATH = path.join("AgenticLab", "knowledge");

function isWithin(root, target) {
  const relative = path.relative(root, target);
  return relative === "" || (relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative));
}

export function resolveKnowledgePath(cwd, candidatePath) {
  if (typeof cwd !== "string" || typeof candidatePath !== "string" || !candidatePath.trim()) return null;
  const root = path.resolve(cwd, KNOWLEDGE_RELATIVE_PATH);
  const target = path.resolve(cwd, candidatePath);
  return isWithin(root, target) ? target : null;
}

export function shellReferencesKnowledge(cwd, command) {
  if (typeof command !== "string" || !command.trim()) return false;
  const normalized = command.replaceAll("\\", "/");
  const knowledgeRoot = path.resolve(cwd, KNOWLEDGE_RELATIVE_PATH).replaceAll("\\", "/");
  if (normalized.includes(knowledgeRoot) || normalized.includes("AgenticLab/knowledge")) return true;

  // Conservative lexical fallback for common `cd AgenticLab && ... knowledge/...` commands.
  // This is not a shell parser and cannot prevent deliberately obfuscated or indirect writes.
  const words = normalized.split(/[^A-Za-z0-9_.-]+/).filter(Boolean);
  const projectPackage = path.resolve(cwd, "AgenticLab");
  const cwdIsInPackage = isWithin(projectPackage, path.resolve(cwd));
  return (words.includes("AgenticLab") && words.includes("knowledge")) || (cwdIsInPackage && words.includes("knowledge"));
}

/**
 * Return a confirmation request for built-in file writes/edits under AgenticLab/knowledge,
 * and for shell commands that visibly refer to that subtree. Return null for unrelated calls.
 */
export function classifyKnowledgeMutation(toolName, input, cwd) {
  if (toolName === "write" || toolName === "edit") {
    const protectedPath = resolveKnowledgePath(cwd, input?.path);
    if (!protectedPath) return null;
    return {
      kind: "file-tool",
      toolName,
      target: protectedPath,
      preview: typeof input?.content === "string" ? input.content : typeof input?.newText === "string" ? input.newText : "",
    };
  }

  return null;
}

export function decideKnowledgeMutation(request, hasUI, approved) {
  if (!request) return { allow: true };
  if (!hasUI) return { allow: false, reason: "Project knowledge changes require interactive user confirmation." };
  if (!approved) return { allow: false, reason: "Project knowledge change was not approved." };
  return { allow: true };
}

export function formatKnowledgeConfirmation(request, limit = 1600) {
  const text = String(request.preview ?? "");
  const preview = text.length > limit ? `${text.slice(0, limit)}\n…[preview truncated]` : text;
  return [
    `Operation: ${request.toolName}`,
    `Target: ${request.target}`,
    "This changes persistent project knowledge. Review the preview and approve only if the record is correctly scoped and supported.",
    "",
    preview || "(No text preview available.)",
  ].join("\n");
}
