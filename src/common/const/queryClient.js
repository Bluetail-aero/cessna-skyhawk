import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

// A useful object to spread into react queries with sensible defaults.
export const DEFAULT_QUERY_OPTIONS = {
  staleTime: 60 * 1000 * 15,
  cacheTime: 60 * 1000 * 60,
  retryDelay: (attempt) => attempt * 1500,
};
