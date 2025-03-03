import { UserDto } from '@/app/api/(dtos)/user.dto'

export interface IAuthResponse {
	accessToken: string
	refreshToken: string
	user: UserDto
}

export interface IAuthState {
	isAuth: boolean
	user: UserDto | null
	setIsAuth: (isAuth: boolean) => void
	setUser: (user: UserDto) => void
}