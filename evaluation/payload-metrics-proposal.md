# Payload Metrics Proposal — Knowledge Capture

**Status:** Proposed (not yet implemented)  
**Workspace:** `/home/peet/Projects/AgenticLab/` (installed payload)  
**Purpose:** Enable data-driven decisions for backlog prioritization and safety validation

## Proposed Metrics Structure

### 1. Knowledge Capture Events (core)
| Event Type | Description | Example |
|------------|-------------|---------|
| `candidate_staged` | Candidate enters pending queue | `{"event": "candidate_staged", "session_id": "w7:p1", "candidate_id": "low-friction-capture-batch-review"}` |
| `promotion_approved` | Batch promotion confirmed | `{"event": "promotion_approved", "session_id": "w7:p1", "candidate_id": "low-friction-capture-batch-review", "confirmation_id": "c04-t1-1"}` |
| `retrieval_success` | Knowledge retrieved from active corpus | `{"event": "retrieval_success", "session_id": "w7:p8", "record_id": "low-friction-capture-batch-review", "query": "approval fatigue"}` |
| `confirmation_decision` | User approval/rejection outcome | `{"event": "confirmation_decision", "session_id": "w7:p1", "decision": "approved", "record_id": "low-friction-capture-batch-review"}` |

### 2. Safety & Policy Events
| Event Type | Description | Example |
|------------|-------------|---------|
| `policy_violation` | Attempted unauthorized action | `{"event": "policy_violation", "session_id": "w7:p1", "violation_type": "pending_stage_access", "tool": "bash"}` |
| `staging_disabled` | Workspace opt-in status change | `{"event": "staging_disabled", "session_id": "w7:p1", "timestamp": "2026-10-18T08:30:00Z"}` |
| `session_termination` | Session end (for session context) | `{"event": "session_termination", "session_id": "w7:p1", "duration_ms": 124500}` |

### 3. System Health Metrics
| Metric | Description | Example |
|--------|-------------|---------|
| `adapter_load_rate` | % of knowledge-capture adapters loaded per session | `"adapter_load_rate": 1.0` |
| `confirmation_latency_ms` | Time from request to confirmation UI | `"confirmation_latency_ms": 842` |
| `active_record_count` | Number of active knowledge records | `"active_record_count": 1` |

## Implementation Approach

1. **Location**: `/home/peet/Projects/AgenticLab/adapters/pi/knowledge-capture-metrics.mjs`
2. **Storage**: Append-only JSONL file at `<workspace>/.pi/metrics/agenticlab.jsonl`
3. **Opt-in**: Controlled by `knowledge-capture-policy.json` → `"metricsEnabled": true/false`
4. **Privacy**: No raw user content; only counts, IDs, timestamps, and aggregated values
5. **Sampling**: Default enabled; can be disabled via policy

## Value Proposition

This would enable:
- **Adoption tracking**: How many workspaces actually use knowledge capture?
- **Safety validation**: Are pending isolation and confirmation gates working?
- **Quality assessment**: Are retrievals finding relevant records?
- **Backlog prioritization**: Which mechanisms need improvement? (C05, C06, etc.)

## Implementation Notes

- Use existing Pi session tracking infrastructure
- Leverage existing `pi --prompt-template` pattern for enablement
- Integrate with existing `session` and `tool` event systems
- No changes to canonical V5 or clean source