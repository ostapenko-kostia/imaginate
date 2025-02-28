import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { hf } from '@/lib/huggingface'
import { s3Client } from '@/lib/s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import Joi from 'joi'
import { NextRequest, NextResponse } from 'next/server'
import { ApiError } from '../../exceptions/apiError'

const validationSchema = Joi.object({
	prompt: Joi.string().required().min(1).max(250).messages({
		'any.required': 'Prompt is required',
		'string.empty': 'Prompt is required',
		'string.min': 'Prompt must be at least 1 character long',
		'string.max': 'Prompt must be at most 250 characters long'
	}),
	quality: Joi.string().required().valid('speed', 'quality').messages({
		'any.required': 'Quality is required',
		'string.empty': 'Quality is required',
		'string.valid': "Quality must be 'speed' or 'quality'"
	})
})

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		const { error, value: validatedBody } = validationSchema.validate(body)

		if (error) throw new ApiError(error.message, 400)

		const models: Record<string, string> = {
			speed: 'black-forest-labs/FLUX.1-schnell',
			quality: 'black-forest-labs/FLUX.1-dev'
		}

		const result = await hf.textToImage({
			model: models[validatedBody.quality],
			inputs: `Generate minimalistic logo (image next to the title in row) with neutral background and easy to read text from this prompt: ${validatedBody.prompt}`
		})

		const key = `${Date.now()}.png`
		const bytes = await result.arrayBuffer()
		const buffer = Buffer.from(bytes)

		const command = new PutObjectCommand({
			Bucket: process.env.AWS_BUCKET_NAME,
			Key: key.toString(),
			Body: buffer
		})

		await s3Client.send(command)
		const url = `https://s3.${process.env.REGION}.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${key}`

		return NextResponse.json({ url }, { status: 200 })
	} catch (err) {
		return handleApiError(err)
	}
}
