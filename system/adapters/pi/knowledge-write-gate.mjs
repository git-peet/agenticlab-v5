import {
  classifyKnowledgeMutation,
  decideKnowledgeMutation,
  formatKnowledgeConfirmation,
} from "./knowledge-write-policy.mjs";

export function registerKnowledgeWriteGate(pi) {
  pi.on("tool_call", async (event, ctx) => {
    const request = classifyKnowledgeMutation(event.toolName, event.input, ctx.cwd);
    if (!request) return undefined;

    if (!ctx.hasUI) {
      const decision = decideKnowledgeMutation(request, false, false);
      return { block: true, reason: decision.reason };
    }

    let approved = false;
    try {
      approved = await ctx.ui.confirm(
        "Confirm persistent AgenticLab knowledge change",
        formatKnowledgeConfirmation(request),
      );
    } catch {
      // Fail closed if the host UI cannot complete the confirmation.
      return { block: true, reason: "Project knowledge confirmation was unavailable; change blocked." };
    }

    const decision = decideKnowledgeMutation(request, true, approved);
    if (!decision.allow) return { block: true, reason: decision.reason };
    return undefined;
  });
}
