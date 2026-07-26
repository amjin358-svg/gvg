/**
 * @gvg/core/workflow — 工作流程引擎
 */

export type WorkflowStatus =
  | "draft"
  | "running"
  | "waiting"
  | "completed"
  | "failed"
  | "cancelled";

export type WorkflowStepStatus =
  | "pending"
  | "active"
  | "completed"
  | "failed"
  | "skipped";

export type WorkflowStepDef = {
  id: string;
  name: string;
  /** Optional role / permission gate */
  assigneeRole?: string;
};

export type WorkflowDefinition = {
  id: string;
  name: string;
  version: string;
  steps: WorkflowStepDef[];
};

export type WorkflowStepState = WorkflowStepDef & {
  status: WorkflowStepStatus;
  startedAt?: string;
  completedAt?: string;
  error?: string;
};

export type WorkflowInstance = {
  id: string;
  definitionId: string;
  status: WorkflowStatus;
  steps: WorkflowStepState[];
  context: Record<string, unknown>;
  currentStepId?: string;
  createdAt: string;
  updatedAt: string;
};

const definitions = new Map<string, WorkflowDefinition>();
const instances = new Map<string, WorkflowInstance>();

export function defineWorkflow(def: WorkflowDefinition): WorkflowDefinition {
  if (!def.steps.length) {
    throw new Error("defineWorkflow: at least one step is required");
  }
  definitions.set(def.id, def);
  return def;
}

export function getWorkflowDefinition(
  id: string,
): WorkflowDefinition | undefined {
  return definitions.get(id);
}

export function startWorkflow(
  definitionId: string,
  context: Record<string, unknown> = {},
): WorkflowInstance {
  const def = definitions.get(definitionId);
  if (!def) {
    throw new Error(`Unknown workflow: ${definitionId}`);
  }

  const first = def.steps[0]!;
  const now = new Date().toISOString();
  const instance: WorkflowInstance = {
    id: crypto.randomUUID(),
    definitionId,
    status: "running",
    currentStepId: first.id,
    context: { ...context },
    createdAt: now,
    updatedAt: now,
    steps: def.steps.map((step, index) => ({
      ...step,
      status: index === 0 ? "active" : "pending",
      startedAt: index === 0 ? now : undefined,
    })),
  };
  instances.set(instance.id, instance);
  return instance;
}

export function getWorkflow(id: string): WorkflowInstance | undefined {
  return instances.get(id);
}

export function listWorkflows(filter?: {
  definitionId?: string;
  status?: WorkflowStatus;
}): WorkflowInstance[] {
  let out = Array.from(instances.values());
  if (filter?.definitionId) {
    out = out.filter((w) => w.definitionId === filter.definitionId);
  }
  if (filter?.status) out = out.filter((w) => w.status === filter.status);
  return out.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function completeWorkflowStep(
  instanceId: string,
  stepId: string,
  patch?: Record<string, unknown>,
): WorkflowInstance {
  const instance = instances.get(instanceId);
  if (!instance) throw new Error(`Unknown workflow instance: ${instanceId}`);
  if (instance.status !== "running" && instance.status !== "waiting") {
    throw new Error(`Workflow ${instanceId} is ${instance.status}`);
  }

  const index = instance.steps.findIndex((s) => s.id === stepId);
  if (index < 0) throw new Error(`Unknown step: ${stepId}`);
  const step = instance.steps[index]!;
  if (step.status !== "active") {
    throw new Error(`Step ${stepId} is ${step.status}`);
  }

  const now = new Date().toISOString();
  step.status = "completed";
  step.completedAt = now;
  if (patch) Object.assign(instance.context, patch);

  const next = instance.steps[index + 1];
  if (!next) {
    instance.status = "completed";
    instance.currentStepId = undefined;
  } else {
    next.status = "active";
    next.startedAt = now;
    instance.currentStepId = next.id;
    instance.status = "running";
  }
  instance.updatedAt = now;
  return instance;
}

export function failWorkflow(
  instanceId: string,
  error: string,
): WorkflowInstance {
  const instance = instances.get(instanceId);
  if (!instance) throw new Error(`Unknown workflow instance: ${instanceId}`);
  const now = new Date().toISOString();
  const active = instance.steps.find((s) => s.status === "active");
  if (active) {
    active.status = "failed";
    active.error = error;
    active.completedAt = now;
  }
  instance.status = "failed";
  instance.updatedAt = now;
  return instance;
}

export function clearWorkflows(): void {
  definitions.clear();
  instances.clear();
}

export class WorkflowEngine {
  static define = defineWorkflow;
  static start = startWorkflow;
  static get = getWorkflow;
  static list = listWorkflows;
  static completeStep = completeWorkflowStep;
  static fail = failWorkflow;
  static clear = clearWorkflows;
}
