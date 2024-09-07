import Image from 'next/image'
import { CheckIcon } from '@heroicons/react/20/solid'
import { Reference } from '~~/app/employee/[slug]/page'

interface Props {
  job: Reference
}

export function JobReference({ job }: Props) {
  const { image, company, position, date, description } = job

  return (
    <li className="flex flex-col gap-4 mb-8  pb-8 [&:not(:last-child)]:border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 w-36">
          <Image alt="company" src={image as string} width={90} height={90} />
          <div className="font-bold">{company}</div>
        </div>
        <div>{position}</div>
        <div className="font-bold">{date}</div>
      </div>
      <div className="text-gray-700 font-semibold">Reference:</div>

      <div className="font-light text-gray-700">{description}</div>

      <div className="flex font-semibold text-gray-700 items-center gap-2">
        <CheckIcon className="h-6 text-green-700" />
        Reference is signed by WORLD ID
      </div>
    </li>
  )
}
