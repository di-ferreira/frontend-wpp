/* eslint-disable react-hooks/rules-of-hooks */
import { useMatch, useResolvedPath } from 'react-router-dom';
import { getSession } from '../service/auth';

export const isActiveLink = (Link: string): boolean => {
  const revolvedPath = useResolvedPath(Link);
  const isActive = useMatch({ path: revolvedPath.pathname, end: true });

  return isActive !== null;
};

export const isLogged = (): boolean => {
  const session = getSession();
  return session !== null;
};

