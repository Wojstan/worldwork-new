import { Logo } from '~~/components/Logo'
import { LogoutButton } from '~~/components/LogoutButton'
import { BackButton } from '~~/components/ui/BackButton'

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[1000px] mx-auto">
      <div className="flex items-center justify-between h-24 mb-4">
        <Logo />
        <LogoutButton />
      </div>
      <BackButton href="/employee/offers" />
      {children}
    </div>
  )
}

export default RegisterLayout
