import toast from "react-hot-toast";

export const showSuccess = (message) =>
  toast.success(message, {
    style: {
      background: "#ecfdf5",
      color: "#065f46",
      border: "1px solid #a7f3d0",
      padding: "12px 16px",
      borderRadius: "12px",
      fontWeight: 500,
    },
    iconTheme: {
      primary: "#10b981",
      secondary: "#ecfdf5",
    },
  });

export const showError = (message) =>
  toast.error(message, {
    style: {
      background: "#fef2f2",
      color: "#991b1b",
      border: "1px solid #fecaca",
      padding: "12px 16px",
      borderRadius: "12px",
      fontWeight: 500,
    },
    iconTheme: {
      primary: "#ef4444",
      secondary: "#fef2f2",
    },
  });

export const showInfo = (message) =>
  toast(message, {
    icon: "ℹ️",
    style: {
      background: "#eff6ff",
      color: "#1e40af",
      border: "1px solid #bfdbfe",
      padding: "12px 16px",
      borderRadius: "12px",
      fontWeight: 500,
    },
  });
