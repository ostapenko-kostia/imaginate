import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Logo } from '../../ui/logo'
import { Container } from '../container'
import { HeaderNav } from './header-nav'
import { MenuIcon } from 'lucide-react'

export function Header() {
	return (
		<header className='py-4 border border-b bg-background'>
			<Container className='flex items-center justify-between'>
				<Logo />
				<HeaderNav className='max-sm:hidden' />
				<Dialog>
					<DialogTrigger className='sm:hidden' asChild>
						<button className='flex items-center justify-center'>
							<MenuIcon size={28} />
						</button>
					</DialogTrigger>
					<DialogContent>
						<DialogTitle>Menu</DialogTitle>
						<HeaderNav className='flex-col gap-6 text-lg' />
					</DialogContent>
				</Dialog>
			</Container>
		</header>
	)
}
