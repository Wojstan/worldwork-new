import { Logo } from '~~/components/Logo'
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Heading1 } from '~~/components/ui/Heading1'

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row">
      <div className="card h-screen min-w-[460px] bg-secondary flex flex-col items-center">
        <div className="flex items-center gap-3 justify-center h-full">
          <Heading1>I’m Employee</Heading1>
          <ArrowRightIcon className="h-8 w-8"/>
        </div>
        <img className="absolute left-1/2 transform -translate-x-1/2 bottom-0" src="/register-employee.svg" alt=""/>
      </div>
      <div className="w-full">
        <div className="flex flex-col justify-center h-24 w-full">
          <Logo />
        </div>
        {children}
      </div>
    </div>
  )
}

export default RegisterLayout
