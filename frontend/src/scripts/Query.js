import { QueryClient } from '@tanstack/react-query'

export const TanQuery = globalThis.TanQuery || new QueryClient();
globalThis.TanQuery = TanQuery;