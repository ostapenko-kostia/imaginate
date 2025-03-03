import { handleApiError } from '@/app/api/(exceptions)/handleApiError'
import { NextRequest, NextResponse } from 'next/server'
import { authService } from '@/app/api/(services)/auth.service'
import { cookies } from 'next/headers'
import { TOKEN } from '@/typing/enums'

export async function POST(req: NextRequest) {
	try {
		const cookiesStorage = await cookies()

		const userData = await authService.refresh(cookiesStorage.get('refreshToken')?.value ?? "")

		cookiesStorage.set(TOKEN.REFRESH_TOKEN, userData.refreshToken, {
			expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
			httpOnly: true
		})

		return NextResponse.json(userData, { status: 200 })
	} catch (err) {
		return handleApiError(err)
	}
}
