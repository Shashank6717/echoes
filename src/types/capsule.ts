export interface Capsule {
  id: string;
  title: string;
  message: string;
  unlockDate: string;
  createdAt: string;
  opened: boolean;
}

export type Page = "landing" | "dashboard" | "create" | "view";
