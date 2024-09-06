'use client'

import { NextPage } from 'next'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'

const Jobs: NextPage = () => {
  return (
    <div>
      <Heading1>Are you looking for a job?</Heading1>
      <Heading3 className="mt-8">Your history:</Heading3>

      <img className="absolute bottom-0 right-0" src="/history.svg" alt="" />
    </div>
  )
}

export default Jobs
