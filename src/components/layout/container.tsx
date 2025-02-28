import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
	className?: string
}

export function Container({ className, children }: Props) {
	return <div className={cn('container mx-auto max-sm:w-full max-sm:px-2', className)}>{children}</div>
}
