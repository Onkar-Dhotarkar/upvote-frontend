import React from 'react';

const typeStyles = {
  success: 'bg-emerald-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-slate-800 text-white',
};

const Toast = ({ toasts = [], onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-[60] flex flex-col gap-3 w-[90vw] max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`shadow-lg rounded-lg px-4 py-3 flex items-start gap-3 ${typeStyles[t.type] || typeStyles.info}`}
        >
          <div className="flex-1">
            <p className="font-medium leading-snug">{t.title}</p>
            {t.message && (
              <p className="text-sm opacity-90 mt-0.5">{t.message}</p>
            )}
          </div>
          <button
            aria-label="Close"
            className="ml-2 text-white/80 hover:text-white"
            onClick={() => onClose && onClose(t.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
