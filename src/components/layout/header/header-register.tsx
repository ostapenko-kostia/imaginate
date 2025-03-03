'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useRegister } from '@/hooks/useAuth'
import { LoaderIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function HeaderRegister() {
	const { register, handleSubmit } = useForm<{
		email: string
		password: string
		firstName: string
		lastName: string
	}>()

	const { mutate, isPending } = useRegister()

	return (
		<Dialog>
			<DialogTrigger className='cursor-pointer'>Sign up</DialogTrigger>
			<DialogContent>
				<DialogTitle style={{ fontSize: '26px', textAlign: 'center' }}>Sign up</DialogTitle>
				<form
					className='mt-3 flex flex-col items-center gap-5 w-full'
					onSubmit={handleSubmit(data => mutate(data))}
				>
					<div className='w-full'>
						<label htmlFor='register-first-name'>First Name</label>
						<Input
							{...register('firstName')}
							className='mt-2'
							placeholder='John'
							type='text'
							required
							id='register-first-name'
						/>
					</div>
					<div className='w-full'>
						<label htmlFor='register-last-name'>Last Name</label>
						<Input
							{...register('lastName')}
							className='mt-2'
							placeholder='Doe'
							type='text'
							required
							id='register-last-name'
						/>
					</div>
					<div className='w-full'>
						<label htmlFor='register-email'>Email</label>
						<Input
							{...register('email')}
							className='mt-2'
							placeholder='placeholder@mail.com'
							type='email'
							required
							id='register-email'
						/>
					</div>
					<div className='w-full'>
						<label htmlFor='register-password'>Password</label>
						<Input
							{...register('password')}
							className='mt-2'
							placeholder='********'
							type='password'
							required
							id='register-password'
						/>
					</div>
					<Button
						type='submit'
						disabled={isPending}
						className='flex items-center gap-2'
					>
						{isPending && <LoaderIcon className='animate-spin' />} Sign up
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
