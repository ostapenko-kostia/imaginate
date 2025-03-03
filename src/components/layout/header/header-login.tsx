'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useLogin } from '@/hooks/useAuth'
import { LoaderIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

export function HeaderLogin() {
	const { register, handleSubmit } = useForm<{
		email: string
		password: string
	}>()

	const { mutate, isPending } = useLogin()

	return (
		<Dialog>
			<DialogTrigger className='cursor-pointer'>Log in</DialogTrigger>
			<DialogContent>
				<DialogTitle style={{ fontSize: '26px', textAlign: 'center' }}>Log in</DialogTitle>
				<form
					className='mt-3 flex flex-col items-center gap-5 w-full'
					onSubmit={handleSubmit(data => mutate(data))}
				>
					<div className='w-full'>
						<label htmlFor='login-email'>Email</label>
						<Input
							{...register('email')}
							className='mt-2'
							placeholder='placeholder@mail.com'
							type='email'
							required
							id='login-email'
						/>
					</div>
					<div className='w-full'>
						<label htmlFor='login-password'>Password</label>
						<Input
							{...register('password')}
							className='mt-2'
							placeholder='********'
							type='password'
							required
							id='login-password'
						/>
					</div>
					<Button
						type='submit'
						disabled={isPending}
						className='flex items-center gap-2'
					>
						{isPending && <LoaderIcon className='animate-spin' />} Log in
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
