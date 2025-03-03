import { authService } from '@/services/auth/auth.service'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useLogin() {
	return useMutation({
		mutationFn: async (data: { email: string; password: string }) => {
			return await authService.login(data)
		},
		onSuccess: () => {
			toast.success('Success!')
		}
	})
}

export function useRegister() {
	return useMutation({
		mutationFn: async (data: {
			email: string
			password: string
			firstName: string
			lastName: string
		}) => {
			return await authService.register(data)
		},
		onSuccess: () => {
			toast.success('Success!')
		}
	})
}

export function useRefresh() {
	return useMutation({
		mutationFn: async () => {
			return await authService.refresh()
		}
	})
}

export function useLogout() {
	return useMutation({
		mutationFn: async () => {
			return await authService.logout()
		},
		onSuccess: () => {
			toast.success('Success!')
		}
	})
}
