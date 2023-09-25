import { Form, REG_EXP_EMAIL, REG_EXP_PASSWORD } from '../../script/form.js'

class SignupForm extends Form {
	FIELD_NAME = {
		EMAil: 'email',
		PASSWORD: 'password',
		PASSWORD_AGAIN: 'password_again',
		ROLE: 'role',
		IS_CONFIRM: 'isConfirm',
	}
	FIELD_ERROR = {
		IS_EMPTY:'Введіть значення в поле',
		IS_BIG:'Дуже довге значенняю Приберіть зайве',
		EMAil:'Введіть коректне значення e-mail адреси',
		PASSWORD:'Пароль повинен складатися з не менше ніж 8 символівб включаючи хоча б одну цифруб малу та велику літеру',
		PASSWORD_AGAIN:'Ваш другий пароль не збігається з першим',
		NOT_CONFIRM:'Ви не погоджуєтесь з правилами',
		ROLE:'Ви не обрали роль',
	}

	validate = (name, value) => {
		if(String(value).length < 1) {
			return this.FIELD_ERROR.IS_EMPTY
		}

		if(String(value).length > 20) {
			return this.FIELD_ERROR.IS_BIG
		}

		if(name === this.FIELD_NAME.EMAil) {
			if (!REG_EXP_EMAIL.test(String(value))) {
				return this.FIELD_ERROR.EMAil
			}
		}

		if(name === this.FIELD_NAME.PASSWORD) {
			if (!REG_EXP_PASSWORD.test(String(value))) {
				return this.FIELD_ERROR.PASSWORD
			}
		}

		if (name === this.FIELD_NAME.PASSWORD_AGAIN) {
			if(!String(value) === this.value [this.FIELD_NAME.PASSWORD] ) {
				return this.FIELD_ERROR.PASSWORD_AGAIN
			}
		}

		if (name === this.FIELD_NAME.ROLE) {
			if (isNaN(value)) {
				return this.FIELD_ERROR.ROLE
			}
		}
		if (name === this.FIELD_NAME.IS_CONFIRM) {
			if(Boolean(value) === false) {
				return this.FIELD_ERROR.NOT_CONFIRM
			}
		}
	}

	submit = async () => {
		if(this.disabled === true) {
			this.validateAll()
		} else {
			console.log(this.value)

			this.setAlert('progress', 'Завантаження...')

			try{
				const res = await fetch('/signup', {
					method: 'POST',
					headers: {
						'content-Type': 'application/json',
					},
					body: this.convertData(),
				})

				const data = await res.json()

				if(res.ok) {
					this.setAlert('success', data.message)
				} else {
					this.setAlert('error', data.message)
				}
			} catch(error) {
				this.setAlert('error', error.message)
			}
		}		
	}

	convertData = () => {
		return JSON.stringify({
			[this.FIELD_NAME.EMAil]:
				this.value[this.FIELD_NAME.EMAil],
			[this.FIELD_NAME.PASSWORD]:
				this.value[this.FIELD_NAME.PASSWORD],
			[this.FIELD_NAME.ROLE]:
				this.value[this.FIELD_NAME.ROLE],
		})
	}
}

window.signupForm = new SignupForm()
