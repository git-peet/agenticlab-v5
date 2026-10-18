// Knowledge-capture metrics — privacy-minimized, opt-in via policy (metricsEnabled)
// Events: candidate_staged, promotion_approved, retrieval_success, confirmation_decision
// Storage: <workspace>/.pi/metrics/agenticlab.jsonl (JSONL)
// Session ID source: Pi's own session identifier (not Herdr-specific)

export function registerKnowledgeCaptureMetrics(pi, opts = {}) {
  const workspaceRoot = opts.workspaceRoot || '.';
  const metricsDir = `${workspaceRoot}/.pi/metrics`;
  const logPath = `${metricsDir}/agenticlab.jsonl`;
  return { workspaceRoot, metricsDir, logPath };
}