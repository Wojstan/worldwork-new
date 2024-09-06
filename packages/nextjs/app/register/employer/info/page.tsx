'use client'

import { NextPage } from 'next'
import { Button } from '~~/components/ui/Button'
import { Heading1 } from '~~/components/ui/Heading1'
import { Input } from '~~/components/ui/Input'

const EmployerInfo: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 mt-24">
      <div className="flex flex-col gap-1 items-center">
        <Heading1>Provide some info</Heading1>
      </div>
      <form className="form-control gap-6">
        <Input id="name" label="Company Name" placeholder="DevCats" />
        <Input id="nickname" label="Nickname" placeholder="devcats" className="w-full" />
        <Button type="submit">Continue</Button>
      </form>
    </div>
  )
}

export default EmployerInfo
