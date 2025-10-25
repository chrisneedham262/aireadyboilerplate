import RegisterPage from '../../components/pages/register'

export const metadata = {
  title: 'Register | launch software fast',
  description: 'We provide web development boilerplates for a range of different software choices. Are goal is to deliver software fast for people with little or no coding experience.',
  keywords: 'web developement, ai applications, software development, launch software',
  openGraph: {
    title: 'Boilerplate software| next.js, python, react, django -  Launch Software Fast',
    description: 'We create amazing software boilerplates using tech like next.js, python, react, django',
  },
}

export default function Register() {
  return <RegisterPage />
}