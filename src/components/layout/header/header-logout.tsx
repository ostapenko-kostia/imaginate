'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { useLogout } from '@/hooks/useAuth'
import { LoaderIcon } from 'lucide-react'

export function HeaderLogout() {
	const { mutate, isPending } = useLogout()

	return (
		<Dialog>
			<DialogTrigger className='cursor-pointer'>Log out</DialogTrigger>
			<DialogContent>
				<DialogTitle style={{ fontSize: '20px' }}>Log out</DialogTitle>
				<p className='opacity-80'>
					Are you sure you want to log out? You will need to enter your credentials to sign in
					again.
				</p>
				<div className='flex items-center gap-4'>
					<Button
						type='submit'
						disabled={isPending}
						onClick={() => mutate()}
						className='flex items-center gap-2'
					>
						{isPending && <LoaderIcon className='animate-spin' />} Yes
					</Button>
					<DialogClose asChild>
						<Button
							className='w-min'
							variant='outline'
						>
							No
						</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	)
}
