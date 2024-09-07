'use client'

import { NextPage } from 'next'
import { JobBoxLink } from '~~/components/job/Job'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { useScaffoldReadContract } from '~~/hooks/scaffold-eth'
import { useQuery } from '@tanstack/react-query'
import { getJobOffers } from '~~/db/jobActions'


// const jobs: Job[] = [
//   {
//     image: '/worldcoin.png',
//     company: 'Worldcoin',
//     position: 'React developer',
//     primarySalary: 5000,
//     secondarySalary: 10000,
//     location: 'Berlin, Germany',
//   },
//   {
//     image: '/ens.png',
//     company: 'ENS',
//     position: 'Rust developer',
//     primarySalary: 5000,
//     secondarySalary: 10000,
//     location: 'Fully remote',
//   },
//   {
//     image: '/celo.png',
//     company: 'CELO',
//     position: 'Backend developer',
//     primarySalary: 5000,
//     secondarySalary: 10000,
//     location: 'Fully remote',
//   },
//   {
//     image: '/eth.png',
//     company: 'ETH WARSAW',
//     position: 'Volounteer',
//     primarySalary: 5000,
//     secondarySalary: 10000,
//     location: 'Warsaw, Poland',
//   },
// ]

const Jobs: NextPage = () => {

  // const { data } = useScaffoldReadContract({
  //   contractName: 'WorldWork',
  //   functionName: 'getJobs',
  //   args: [address]
  // })
  
  const { data } = useQuery({
    queryKey: ['jobOffers'],
    queryFn: async () => {
      return await getJobOffers()
    },
  })

  console.log('data offerst', data)
  
  return (
    <div>
      <Heading1>Are you looking for a job? :)</Heading1>
      <Heading3 className="mt-8">Available jobs:</Heading3>

      <div className="flex flex-col gap-3">
        {data?.map((job) => (
          <JobBoxLink key={job.job.name} job={job} href="/employee/details" />
        ))}
      </div>
      <img className="absolute bottom-0 right-0" src="/jobs.svg" alt="" />
    </div>
  )
}

export default Jobs
