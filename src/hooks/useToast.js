'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((title, options = {}) => {
    const { type = 'info', message = '' } = options;
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            <div className="font-bold">{toast.title}</div>
            {toast.message && <div className="text-sm">{toast.message}</div>}
            <button onClick={() => removeToast(toast.id)} className="absolute top-1 right-1 text-lg">&times;</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};