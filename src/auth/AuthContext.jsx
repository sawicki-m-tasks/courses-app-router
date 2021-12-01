import { createContext } from 'react';

export const AuthContext = createContext({
  status: false,
  setStatus: status => { this.status = status; },
});
