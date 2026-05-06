import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5003");

export const useSocket = (event, callback) => {
  useEffect(() => {
    socket.on(event, callback);
    return () => {
      socket.off(event, callback);
    };
  }, [event, callback]);

  return socket;
};

export default socket;
