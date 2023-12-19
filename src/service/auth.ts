import { iSession } from '../@types';

export const TOKEN_KEY = '@WPPConnect-Token';

export const defaultKey = () => localStorage.getItem(TOKEN_KEY);

export const login = (session: iSession) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(session));
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getSession = (): iSession | null => {
  const KEY = defaultKey();
  let result: iSession | null = null;
  if (KEY !== null) {
    result = JSON.parse(KEY);
  }
  return result;
};

export const getToken = (): string | null => {
  const KEY = defaultKey();
  const result = null;
  if (KEY !== null) {
    const { token } = JSON.parse(KEY);

    return token;
  }
  return result;
};

export const getDefaultImage = () => {
  return 'https://www.promoview.com.br/uploads/images/unnamed%2819%29.png';
};

