import { socket } from './api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function listenerMessages(cb: any) {
  socket.off('received-message').on('received-message', (message) => {
    return cb(null, message);
  });
}

