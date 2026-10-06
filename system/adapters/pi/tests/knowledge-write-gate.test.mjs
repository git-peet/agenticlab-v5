import assert from "node:assert/strict";
import test from "node:test";
import {
  classifyKnowledgeMutation,
  decideKnowledgeMutation,
} from "../knowledge-write-policy.mjs";
import { registerKnowledgeWriteGate } from "../knowledge-write-gate.mjs";

const cwd = "/tmp/agenticlab-gate-fixture";

function makePi() {
  let handler;
  return {
    pi: {
      on(eventName, callback) {
        assert.equal(eventName, "tool_call");
        handler = callback;
      },
    },
    call(event, ctx) {
      assert.ok(handler, "gate registered its tool_call handler");
      return handler(event, ctx);
    },
  };
}

test("file writes to project knowledge require confirmation", () => {
  const request = classifyKnowledgeMutation("write", {
    path: "AgenticLab/knowledge/decisions/date-format.md",
    content: "Synthetic fixture only",
  }, cwd);
  assert.equal(request?.kind, "file-tool");
  assert.equal(request?.target, `${cwd}/AgenticLab/knowledge/decisions/date-format.md`);
});

test("writes outside project knowledge and path traversal are not classified as memory writes", () => {
  assert.equal(classifyKnowledgeMutation("write", { path: "src/controller.py" }, cwd), null);
  assert.equal(
    classifyKnowledgeMutation("edit", { path: "AgenticLab/knowledge/../../src/controller.py" }, cwd),
    null,
  );
});

test("shell commands that visibly refer to project knowledge require confirmation", () => {
  const request = classifyKnowledgeMutation("bash", {
    command: "printf '%s' candidate > AgenticLab/knowledge/decisions/example.md",
  }, cwd);
  assert.equal(request?.kind, "shell-command");
});

test("unrelated tools and shell commands pass without a confirmation prompt", () => {
  assert.equal(classifyKnowledgeMutation("read", { path: "AgenticLab/knowledge/INDEX.md" }, cwd), null);
  assert.equal(classifyKnowledgeMutation("bash", { command: "python -m unittest" }, cwd), null);
  assert.deepEqual(decideKnowledgeMutation(null, false, false), { allow: true });
});

test("approval decision fails closed without UI or after rejection", () => {
  const request = classifyKnowledgeMutation("write", { path: "AgenticLab/knowledge/INDEX.md" }, cwd);
  assert.equal(decideKnowledgeMutation(request, false, false).allow, false);
  assert.equal(decideKnowledgeMutation(request, true, false).allow, false);
  assert.equal(decideKnowledgeMutation(request, true, true).allow, true);
});

test("Pi handler blocks knowledge writes without UI", async () => {
  const mock = makePi();
  registerKnowledgeWriteGate(mock.pi);
  const result = await mock.call(
    { toolName: "write", input: { path: "AgenticLab/knowledge/INDEX.md", content: "fixture" } },
    { cwd, hasUI: false },
  );
  assert.equal(result?.block, true);
  assert.match(result?.reason, /interactive user confirmation/);
});

test("Pi handler asks and blocks when the user rejects", async () => {
  const mock = makePi();
  let shown = "";
  registerKnowledgeWriteGate(mock.pi);
  const result = await mock.call(
    { toolName: "edit", input: { path: "AgenticLab/knowledge/INDEX.md", newText: "fixture" } },
    {
      cwd,
      hasUI: true,
      ui: { async confirm(title, message) { shown = `${title}\n${message}`; return false; } },
    },
  );
  assert.equal(result?.block, true);
  assert.match(shown, /AgenticLab\/knowledge\/INDEX\.md/);
  assert.match(shown, /fixture/);
});

test("Pi handler blocks shell access to knowledge when UI is unavailable", async () => {
  const mock = makePi();
  registerKnowledgeWriteGate(mock.pi);
  const result = await mock.call(
    { toolName: "bash", input: { command: "printf x > AgenticLab/knowledge/INDEX.md" } },
    { cwd, hasUI: false },
  );
  assert.equal(result?.block, true);
});

test("Pi handler blocks if confirmation UI fails", async () => {
  const mock = makePi();
  registerKnowledgeWriteGate(mock.pi);
  const result = await mock.call(
    { toolName: "write", input: { path: "AgenticLab/knowledge/INDEX.md", content: "fixture" } },
    { cwd, hasUI: true, ui: { async confirm() { throw new Error("UI unavailable"); } } },
  );
  assert.equal(result?.block, true);
  assert.match(result?.reason, /confirmation was unavailable/);
});

test("Pi handler allows a confirmed knowledge change", async () => {
  const mock = makePi();
  registerKnowledgeWriteGate(mock.pi);
  const result = await mock.call(
    { toolName: "write", input: { path: "AgenticLab/knowledge/INDEX.md", content: "fixture" } },
    { cwd, hasUI: true, ui: { async confirm() { return true; } } },
  );
  assert.equal(result, undefined);
});
