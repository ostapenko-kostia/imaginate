import { api } from '@/lib/axios'
import { QUALITY } from '@/typing/types'

class LogoService {
	async generate(data: { prompt: string; quality: QUALITY }) {
		return await api.post<{ url: string }>('/generate/logo', data)
	}
}

export const logoService = new LogoService()
