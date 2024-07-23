import SignInForm from '@/components/form/sign-in-form'
import { getDictionary } from '@/dictionaries/get-dictionary'
import { DefaultPageProps } from '@/types/common'

async function SignInPage({ params }: DefaultPageProps) {
  const dictionary = await getDictionary(params.lang)

  return <SignInForm dictionary={dictionary} />
}

export default SignInPage
