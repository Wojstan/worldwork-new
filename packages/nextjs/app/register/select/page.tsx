import { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'

export default function Register() {
  return (
    <div className="flex flex-col gap-6 text-center">
      <div>
        <Heading1>Register</Heading1>
        <Heading3 className="mt-3">Who you are?</Heading3>
      </div>

      <div className="flex justify-center gap-6">
        <Link href="/register/employer">
          <RegisterCard className="bg-primary hover:bg-[#AEE5F5]">
            <div className="flex items-center gap-3 justify-center">
              <Heading1>I’m Employer</Heading1>
              <ArrowRightIcon className="h-8 w-8" />
            </div>
            <img className="absolute left-1/2 transform -translate-x-1/2 bottom-0" src="/register-company.svg" alt="" />
          </RegisterCard>
        </Link>
        <Link href="/register/employee">
          <RegisterCard className="bg-secondary hover:bg-[#FDFF7D]">
            <Heading1>
              <div className="flex items-center gap-3 justify-center">
                <Heading1>I’m Employee</Heading1>
                <ArrowRightIcon className="h-8 w-8" />
              </div>
            </Heading1>
            <img className="absolute left-1/2 transform -translate-x-1/2 bottom-0" src="/register-employee.svg" alt="" />
          </RegisterCard>
        </Link>
      </div>

      <Link href="/home">
        <div className="underline text-sm font-bold">I already have an account</div>
      </Link>
    </div>
  )
}

interface CardProps {
  children: ReactNode
  className?: string
}

function RegisterCard({ children, className }: CardProps) {
  return (
    <div
      className={`border w-full border-transparent hover:border-black overflow-hidden relative min-h-96 p-8 px-14 rounded-2xl ${className}`}
    >
      {children}
    </div>
  )
}
