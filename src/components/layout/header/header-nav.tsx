import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Props {
	className?: string
}

export function HeaderNav({ className }: Props) {
	return (
		<ul className={cn('flex items-center gap-10', className)}>
			<li>
				<Link href='/pricing'>Pricing</Link>
			</li>
			<li>
				<Link href='/support'>Support</Link>
			</li>
			<li>
				<Link href='/login'>Log in</Link>
			</li>
			<li>
				<Link href='/signup'>Sign up</Link>
			</li>
		</ul>
	)
}
