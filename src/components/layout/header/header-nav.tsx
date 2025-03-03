'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { HeaderLogin } from './header-login'
import { HeaderRegister } from './header-register'
import { useAuthStore } from '@/store/auth.store'
import { HeaderLogout } from './header-logout'

interface Props {
	className?: string
}

export function HeaderNav({ className }: Props) {
	const { isAuth } = useAuthStore()
	return (
		<ul className={cn('flex items-center gap-10', className)}>
			<li>
				<Link href='/pricing'>Pricing</Link>
			</li>
			<li>
				<Link href='/support'>Support</Link>
			</li>
			{isAuth ? (
				<li>
					<HeaderLogout />
				</li>
			) : (
				<>
					<li>
						<HeaderLogin />
					</li>
					<li>
						<HeaderRegister />
					</li>
				</>
			)}
		</ul>
	)
}
