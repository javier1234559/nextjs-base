import * as yup from 'yup'

export interface ISignInForm {
  username: string
  password: string
  confirmPassword: string
  name?: string
}

export const DEFAULT_SIGN_IN_FORM: ISignInForm = {
  username: '',
  password: '',
  confirmPassword: '',
  name: '',
}

export const finalSchema: yup.ObjectSchema<ISignInForm> = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  name: yup.string().required('Name is required'),
})