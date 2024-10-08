'use client'

import { Fragment, useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { JobBox } from '~~/components/job/Job'
import { BackButton } from '~~/components/ui/BackButton'
import { Button } from '~~/components/ui/Button'
import { Heading2 } from '~~/components/ui/Heading2'
import { Heading4 } from '~~/components/ui/Heading4'
import { Loader } from '~~/components/ui/Loader'
import { getJob } from '~~/db/jobActions'
import { useScaffoldWriteContract } from '~~/hooks/scaffold-eth'
import { useRouter, useSearchParams } from 'next/navigation'

// const job = {
//   image: '/worldcoin.png',
//   company: 'Worldcoin',
//   position: 'React developer',
//   primarySalary: 5000,
//   secondarySalary: 10000,
//   location: 'Berlin, Germany',
// }

// const jobDescription = `Our Technology team isn’t just one of the best in the industry. It's one of the best in the world. And we’re proud of it. It’s our driving force — our engine 🚀
// From building a new financial backend to creating an innovative app, there’s nothing they can’t do. Our Technology team isn’t here to fix legacy systems — it’s here to build world-class financial features from the ground up that'll be used by millions of people around the world 🌎
// We’re looking for a Blockchain Engineer that wants to change the world. If you like to work at a steady pace with no surprises, keep scrolling. If you want your work to change the global financial landscape, you might be just who we’re looking for. We have a minimalist approach to using external frameworks, with an emphasis on maintainability and fast turnaround with TDD, DDD, and Continuous Integration & Delivery.`

const JobDetails = ({ params }: { params: { slug: string} }) => {
  const searchParams = useSearchParams()
  const router = useRouter();

  const employer = params.slug
  const index = searchParams?.get('index') || ''
  const { data, isFetching } = useQuery({
    queryKey: ['getJob', employer, index],
    queryFn: async () => {
      const jobs = await getJob(employer, Number(index))
      return jobs?.[0]
    },
    enabled: !!employer,
  })
  const jobDescription = data?.job.description || ''
  const paragraphs = jobDescription.split('\n')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract('WorldWork')

  const onApply = async () => {
    if (data?.job.arrayIndex == undefined || data?.job.arrayIndex == null) {
      console.log('no arrayIndex')
      return
    }

    await writeYourContractAsync({
      functionName: 'applyForJob',
      args: [data.job.employer, BigInt(data?.job.arrayIndex)],
    })
    setIsModalOpen(true)
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
    router.push('/employee/offers')
  }

  if (isFetching || !data) return <Loader />

  return (
    <>
      <BackButton href="/employee/offers" />
      <div className="flex flex-col gap-10">
        <JobBox key={data?.job.employer + data.job.arrayIndex} employer={data.employer} job={data.job} hideArrow />
        <div>
          {paragraphs.map((paragraph, index) => (
            <Fragment key={index}>
              <span>{paragraph}</span>
              <br /> <br />
            </Fragment>
          ))}
        </div>
        <Button onClick={onApply}>Apply for the job</Button>
        {isModalOpen && <SuccessModal onClose={() => onCloseModal()} />}
      </div>
    </>
  )
}

interface SuccessModalProps {
  onClose: () => void
}

function SuccessModal({ onClose }: SuccessModalProps) {
  return (
    <>
      <div className="shadow bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 rounded-2xl flex flex-col gap-6 items-center z-50 max-w-[360px]">
        <Image src="/profile.svg" alt="profile" width={280} height={290}></Image>
        <div className="flex flex-col gap-8 items-center text-center">
          <Heading2>Success!</Heading2>
          <Heading4>Now you need to wait for your application review.</Heading4>
        </div>
        <Button onClick={onClose}>Close</Button>
      </div>
      <div className="fixed top-0 right-0 w-full h-screen bg-[#B881FF] opacity-40 z-10" />
    </>
  )
}

export default JobDetails
