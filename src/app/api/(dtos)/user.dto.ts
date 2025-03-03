export class UserDto {
	firstName: string
	lastName: string
	email: string
	id: number

	constructor(user: any) {
		this.firstName = user.firstName
		this.lastName = user.lastName
		this.email = user.email
		this.id = user.id
	}
}
