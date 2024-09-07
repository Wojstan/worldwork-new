import Image from 'next/image'
import Link from 'next/link'
import { Salary } from '../Salary'
import { Heading3 } from '../ui/Heading3'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { getJobOffers } from '~~/db/jobActions'

type Job = Awaited<ReturnType<typeof getJobOffers>>[number]


interface JobBoxProps {
  className?: string
  job: Job
  hideArrow?: boolean
}

export function JobBox({ job, hideArrow = false, className }: JobBoxProps) {
  const image = '/worldcoin.png'
  const position = 'React developer'
  // const { company, position, primarySalary, secondarySalary, location } = job
  const {job: {name: company, stablecoinSalary: primarySalary, tokenSalary: secondarySalary, location}} = job

  return (
    <div className={`h-28 bg-white z-10 flex items-center justify-between px-6 transition ${className}`}>
      {image && <Image alt="Logo" src={image} width={80} height={80} />}
      {company && <Heading3 className="mb-0 w-36">{company}</Heading3>}

      <div className="w-44">{position}</div>

      <Salary primary={primarySalary} secondary={secondarySalary} />

      <div className="w-28 font-bold">{location}</div>

      {!hideArrow && (
        <div className="cursor-pointer flex items-center gap-1">
          <ArrowRightIcon className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}

interface JobBoxLinkProps {
  job: Job
  hideArrow?: boolean
  className?: string
  href: string
}

export function JobBoxLink({ job, hideArrow = false, className, href }: JobBoxLinkProps) {
  const image = '/worldcoin.png'
  const position = 'React developer'
  // const { company, position, primarySalary, secondarySalary, location } = job
  const {job: {stablecoinSalary: primarySalary, tokenSalary: secondarySalary, location}, employee} = job
  if (!employee) {
    return 'No employee found for this job'
  }
  const {name: company} = employee

  return (
    <Link
      className={`border border-black h-28 rounded-xl bg-white z-50 flex items-center justify-between px-6 hover:bg-[#F8F2FF] hover:border-[#CFAAFF] transition cursor-pointer ${className}`}
      href={href}
    >
      {image && <Image alt="Logo" src={image} width={40} height={40} />}
      {company && <Heading3 className="mb-0 w-36">{company}</Heading3>}

      <div className="w-44">{position}</div>

      <Salary primary={primarySalary} secondary={secondarySalary} />

      <div className="w-28 font-bold">{location}</div>

      {!hideArrow && (
        <div className="cursor-pointer flex items-center gap-1">
          <ArrowRightIcon className="h-4 w-4" />
        </div>
      )}
    </Link>
  )
}
