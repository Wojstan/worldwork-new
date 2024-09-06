import { NextPage } from 'next'
import { Job, JobBox } from '~~/components/job/Job'
import { Button } from '~~/components/ui/Button'
import { Fragment } from "react";

const job: Job = {
  image: '/worldcoin.png',
  company: 'Worldcoin',
  position: 'React developer',
  primarySalary: 5000,
  secondarySalary: 10000,
  location: 'Berlin, Germany',
}

const jobDescription = `Our Technology team isn’t just one of the best in the industry. It's one of the best in the world. And we’re proud of it. It’s our driving force — our engine 🚀
From building a new financial backend to creating an innovative app, there’s nothing they can’t do. Our Technology team isn’t here to fix legacy systems — it’s here to build world-class financial features from the ground up that'll be used by millions of people around the world 🌎
We’re looking for a Blockchain Engineer that wants to change the world. If you like to work at a steady pace with no surprises, keep scrolling. If you want your work to change the global financial landscape, you might be just who we’re looking for. We have a minimalist approach to using external frameworks, with an emphasis on maintainability and fast turnaround with TDD, DDD, and Continuous Integration & Delivery.`

const JobDetails: NextPage = () => {
  const paragraphs = jobDescription.split('\n')
  return (
    <div className="flex flex-col gap-10">
      <JobBox key={job.image} job={job} hideArrow className="border-none hover:hidden" />
      <div>
        {paragraphs.map((paragraph, index) => (
          <Fragment key={index}>
            <span>{paragraph}</span>
            <br /> <br />
          </Fragment>
        ))}
      </div>
      <Button>Apply for the job</Button>
    </div>
  )
}

export default JobDetails
