'use client'

import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'
import { CompanyApplicants } from '~~/components/job/CompanyApplicants'
import { CompanyApplicantsMobile } from '~~/components/job/CompanyApplicantsMobile'
import { Loader } from '~~/components/ui/Loader'
import { getJob } from '~~/db/jobActions'
import { isMobileView } from '~~/hooks/isMobileView'
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
  const isMobile = isMobileView()

  const { data } = useQuery({
    queryKey: ['getJob', address, params.slug],
    queryFn: async () => {
      if (!address) return undefined
      const job = await getJob(address, parseInt(params.slug))
      return job[0]
    },
    enabled: !!address,
  })

  const { data: applicants } = useScaffoldReadContract({
    contractName: 'WorldWork',
    functionName: 'getJobApplicants',
    args: [address, BigInt(parseInt(params.slug))],
  })

  if (!data) return <Loader />

  if (isMobile) {
    return <CompanyApplicantsMobile applicants={applicants} />
  }

  return <CompanyApplicants data={data} applicants={applicants} />
}

export default Jobs
