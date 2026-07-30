import { createContext, useContext, useState } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const showNotification = (message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random();
    setNotifications((prev) => [...prev, { id, message, type }]);

    window.setTimeout(() => removeNotification(id), duration);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      <div className="pointer-events-none fixed right-4 top-24 z-[60] flex w-[min(92vw,24rem)] flex-col gap-3">
        {notifications.map(({ id, message, type }) => {
          const styles = {
            success: "border-emerald-200 bg-emerald-50 text-emerald-700",
            error: "border-rose-200 bg-rose-50 text-rose-700",
            info: "border-sky-200 bg-sky-50 text-sky-700",
          };

          const Icon = {
            success: CheckCircle2,
            error: AlertCircle,
            info: Info,
          }[type];

          return (
            <div
              key={id}
              className={`pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur ${styles[type] || styles.info}`}
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0" />
              <div className="flex-1 text-sm font-medium">{message}</div>
              <button
                type="button"
                onClick={() => removeNotification(id)}
                className="rounded-full p-1 transition hover:bg-black/5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};
