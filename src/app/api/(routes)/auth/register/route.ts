import { handleApiError } from '@/app/api/(exceptions)/handleApiError'
import { NextRequest, NextResponse } from 'next/server'
import Joi from 'joi'
import { ApiError } from '@/app/api/(exceptions)/apiError'
import { authService } from '@/app/api/(services)/auth.service'
import { cookies } from 'next/headers'


const authRegisterSchema = Joi.object({
	firstName: Joi.string().required().min(1).max(50).trim().messages({
		'any.required': 'First name is required',
		'string.empty': 'First name is required',
		'string.min': 'First name must be at least 1 character long',
		'string.max': 'First name must be at most 50 characters long',
		'string.trim': 'First name must not contain leading or trailing spaces'
	}),
	lastName: Joi.string().required().min(1).max(50).trim().messages({
		'any.required': 'Last name is required',
		'string.empty': 'Last name is required',
		'string.min': 'Last name must be at least 1 character long',
		'string.max': 'Last name must be at most 50 characters long',
		'string.trim': 'Last name must not contain leading or trailing spaces'
	}),
	email: Joi.string().required().email().messages({
		'any.required': 'Email is required',
		'string.empty': 'Email is required',
		'string.email': 'Email is invalid'
	}),
	password: Joi.string().required().min(8).trim().messages({
		'any.required': 'Password is required',
		'string.empty': 'Password is required',
		'string.min': 'Password must be at least 8 characters long'
	})
})

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()

		const { error, value: validatedBody } = authRegisterSchema.validate(body, {
			abortEarly: false
		})
		if (error) throw new ApiError(error.details[0].message, 400)

		const userData = await authService.register(validatedBody)

		;(await cookies()).set('refreshToken', userData.refreshToken, {
			expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
			httpOnly: true
		})

		return NextResponse.json(userData, { status: 200 })
	} catch (err) {
		return handleApiError(err)
	}
}
