import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { registerKnowledgeWriteGate } from "./knowledge-write-gate.mjs";

export default function (pi: ExtensionAPI) {
  registerKnowledgeWriteGate(pi);
}
