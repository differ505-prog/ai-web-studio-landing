export type ProjectStatus =
  | "lead"
  | "qualified"
  | "proposal_sent"
  | "contract_pending"
  | "signed"
  | "in_progress"
  | "completed";

export type PaymentStage = {
  id: string;
  label: string;
  percent: number;
  amount: number;
  dueRule: string;
  status: "pending" | "paid" | "overdue";
};

export type ContractClause = {
  id: string;
  title: string;
  content: string;
};

export type ClientProfile = {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
};

export type ProjectRecord = {
  id: string;
  title: string;
  client: string;
  summary: string;
  status: ProjectStatus;
  serviceType: string;
  totalBudget: number;
  nextAction: string;
  updatedAt: string;
};

export type ContractDraft = {
  id: string;
  projectId: string;
  projectTitle: string;
  title: string;
  totalAmount: number;
  paymentPlanLabel: string;
  freeRevisionRounds: number;
  extraRevisionFee: string;
  finalReviewDays: number;
  ghostingDays: number;
  warrantyDays: number;
  jurisdiction: string;
  client: ClientProfile;
  studio: ClientProfile;
  paymentStages: PaymentStage[];
  clauses: ContractClause[];
  notes: string[];
  updatedAt: string;
};

export type SharedContractPayload = {
  source: string;
  draft: ContractDraft;
  sharedAt: string;
};

export type SignatureSubmission = {
  signerName: string;
  signerEmail: string;
  signerPhone: string;
  signerRole: string;
  signatureDataUrl: string;
  agreedToTerms: boolean;
};

export type SignedContractRecord = {
  id: string;
  contractId: string;
  sourceToken: string;
  projectTitle: string;
  contractTitle: string;
  clientName: string;
  signerName: string;
  signerEmail: string;
  signerPhone: string;
  signerRole: string;
  signatureDataUrl: string;
  signedAt: string;
  ip: string;
  userAgent: string;
  documentHash: string;
  payload: SharedContractPayload;
};
