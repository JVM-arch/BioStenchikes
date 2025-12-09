import { writable } from 'svelte/store';

function createToastStore() {
  const { subscribe, update } = writable([]);
  
  function add(message, type = 'info', duration = 4000) {
    const id = Date.now();
    update(toasts => [...toasts, { id, message, type, duration }]);
    
    if (duration > 0) {
      setTimeout(() => {
        remove(id);
      }, duration);
    }
    
    return id;
  }
  
  function remove(id) {
    update(toasts => toasts.filter(t => t.id !== id));
  }
  
  return {
    subscribe,
    add,
    remove,
    success: (msg, dur) => add(msg, 'success', dur),
    error: (msg, dur) => add(msg, 'error', dur),
    info: (msg, dur) => add(msg, 'info', dur),
    warning: (msg, dur) => add(msg, 'warning', dur)
  };
}

export const toast = createToastStore();

