import { Logo } from '../ui/logo'
import { Container } from './container'

export function Header() {
	return (
		<header className='py-4 border border-b'>
			<Container>
				<Logo />
			</Container>
		</header>
	)
}
