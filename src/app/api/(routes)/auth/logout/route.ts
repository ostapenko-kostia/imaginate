import { handleApiError } from '@/app/api/(exceptions)/handleApiError'
import { NextRequest, NextResponse } from 'next/server'
import { ApiError } from '@/app/api/(exceptions)/apiError'
import { authService } from '@/app/api/(services)/auth.service'
import { cookies } from 'next/headers'
import { TOKEN } from '@/typing/enums'

export async function POST(req: NextRequest) {
	try {
		const cookiesStorage = await cookies()
		const refreshToken = cookiesStorage.get('refreshToken')?.value

		if (!refreshToken || !refreshToken.length) throw new ApiError('Unauthorized', 401)
	
		await authService.logout(refreshToken)

		cookiesStorage.delete(TOKEN.REFRESH_TOKEN)

		return NextResponse.json({}, { status: 200 })
	} catch (err) {
		return handleApiError(err)
	}
}
