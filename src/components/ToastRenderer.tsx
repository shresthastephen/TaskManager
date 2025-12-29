import { useToast } from '../hooks/use-toast';
import { Transition } from '@headlessui/react';

export function ToastRenderer() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Transition
          key={toast.id}
          appear
          show={toast.open}
          enter="transform transition duration-300"
          enterFrom="opacity-0 translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transform transition duration-300"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-2"
        >
          <div
            className={`w-80 rounded-md p-4 shadow-lg bg-white border ${
              toast.variant === 'destructive'
                ? 'border-red-500'
                : 'border-blue-500'
            }`}
          >
            {toast.title && <h4 className="font-medium">{toast.title}</h4>}
            {toast.description && (
              <p className="mt-1 text-sm text-gray-600">{toast.description}</p>
            )}
          </div>
        </Transition>
      ))}
    </div>
  );
}
