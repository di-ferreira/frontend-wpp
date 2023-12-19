import axios from 'axios';
import { io } from 'socket.io-client';

const ip = import.meta.env.VITE_IP_SERVER;

export const socket = io(import.meta.env.VITE_IP_SOCKET_IO);
export const api = axios.create({ baseURL: ip });
export default api;

