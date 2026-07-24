// 👈 Importante: "melt/builders" en lugar de "melt"
import { Toaster } from "melt/builders";

export type ToastType = "info" | "success" | "warning" | "error";

export interface ToastData {
  title: string;
  description?: string;
  type?: ToastType;
}

// Instancia el Toaster de Melt v2
export const toaster = new Toaster<ToastData>({
  closeDelay: 5000,
  hover: "pause",
});

export const toast = {
  info: (title: string, description?: string) =>
    toaster.addToast({ data: { title, description, type: "info" } }),

  success: (title: string, description?: string) =>
    toaster.addToast({ data: { title, description, type: "success" } }),

  warning: (title: string, description?: string) =>
    toaster.addToast({ data: { title, description, type: "warning" } }),

  error: (title: string, description?: string) =>
    toaster.addToast({ data: { title, description, type: "error" } }),
};
