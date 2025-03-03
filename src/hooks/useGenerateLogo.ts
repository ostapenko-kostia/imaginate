import { logoService } from '@/services/logo.service'
import { QUALITY } from '@/typing/types'
import { useMutation } from '@tanstack/react-query'

export const useGenerateLogo = () => {
	return useMutation({
		mutationKey: ['logo generate'],
		mutationFn: async (data: { prompt: string; quality: QUALITY }) => {
			const res = await logoService.generate(data)
			if (!res.data) Promise.reject()
			return res
		}
	})
}
