'use client'

import { authService } from '@/services/auth/auth.service'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useEffect, useState } from 'react'

export function Providers({ children }: PropsWithChildren) {
	const [queryClient] = useState(() => new QueryClient())
	useEffect(() => {
		try {
			authService.refresh()
		} catch {
			authService.logout()
		}
	}, [])
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
