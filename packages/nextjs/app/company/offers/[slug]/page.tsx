'use client'

import Link from 'next/link'
import { JobBox } from '~~/components/job/Job'
import { ProfileBox } from '~~/components/job/Profile'
import { BackButton } from '~~/components/ui/BackButton'
import { Heading3 } from '~~/components/ui/Heading3'
import { useAccount } from 'wagmi'
import { getJob } from '~~/db/jobActions'
import { useQuery } from '@tanstack/react-query'
import { useScaffoldReadContract } from '~~/hooks/scaffold-eth'

// const job = {
//   position: 'React developer',
//   primarySalary: 5000,
//   secondarySalary: 10000,
//   location: 'Berlin, Germany',
// }

// const employees: Partial<Employee>[] = [
//   {
//     id: 1,
//     avatar: '/doe.png',
//     name: 'john.eth',
//     email: 'john@email.com',
//     phone: '+ 23 000 344 000',
//     description:
//       'A passionate and detail-oriented developer with experience in building dynamic and responsive web applications. Proficient in front-end and back-end technologies, including JavaScript, HTML, CSS, React, and Node.js, with a strong focus on creating clean, efficient, and maintainable code. Skilled in collaborating with teams to deliver high-quality projects on time and constantly exploring new tools and techniques to stay at the cutting edge of development. Dedicated to problem-solving, continuous learning, and improving user experience through innovative solutions.',
//   },
//   {
//     id: 2,
//     avatar: '/anna.png',
//     name: 'anna.eth',
//     email: 'anna@email.com',
//     phone: '+ 23 000 344 000',
//     description: 'Dobry wariat.',
//   },
// ]

const Jobs = ({ params }: { params: { slug: string } }) => {
  const { address } = useAccount()

  const { data } = useQuery({
    queryKey: ['getJob', address, params.slug],
    queryFn: async () => {
      if (!address) return undefined
      const job =  await getJob(address, parseInt(params.slug))
      return job[0]
    },
    enabled: !!address,
  })

  const { data: applicants } = useScaffoldReadContract({
    contractName: 'WorldWork',
    functionName: 'getJobApplicants',
    args: [address, BigInt(parseInt(params.slug))],
  })

  if (!data) return "No data..."

  return (
    <div>
      <BackButton href="/company/offers" />

      <JobBox job={data.job} employer={data.employer} hideArrow className="bg-[#F3F4F6] rounded-3xl mt-2" />

      <Heading3 className="mt-8">Applicants ({applicants?.length || 0})</Heading3>

      {applicants?.map((applicant, i) => (
        <Link key={applicant} href={`/employee/${i}`}>
          <ProfileBox
            name={applicant}
            className={i % 2 ? 'bg-primary hover:bg-[#b99dde]' : 'bg-secondary hover:bg-[#fcd46e]'}
          />
        </Link>
      ))}
    </div>
  )
}

export default Jobs
