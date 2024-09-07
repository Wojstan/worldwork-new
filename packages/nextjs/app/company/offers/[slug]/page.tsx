'use client'

import Link from 'next/link'
import { NextPage } from 'next'
import { Employee } from '~~/app/employee/[slug]/page'
import { Job, JobBox } from '~~/components/job/Job'
import { ProfileBox } from '~~/components/job/Profile'
import { BackButton } from '~~/components/ui/BackButton'
import { Heading3 } from '~~/components/ui/Heading3'

const job: Job = {
  position: 'React developer',
  primarySalary: 5000,
  secondarySalary: 10000,
  location: 'Berlin, Germany',
}

const employees: Partial<Employee>[] = [
  {
    id: 1,
    avatar: '/doe.png',
    name: 'john.eth',
    email: 'john@email.com',
    phone: '+ 23 000 344 000',
    description:
      'A passionate and detail-oriented developer with experience in building dynamic and responsive web applications. Proficient in front-end and back-end technologies, including JavaScript, HTML, CSS, React, and Node.js, with a strong focus on creating clean, efficient, and maintainable code. Skilled in collaborating with teams to deliver high-quality projects on time and constantly exploring new tools and techniques to stay at the cutting edge of development. Dedicated to problem-solving, continuous learning, and improving user experience through innovative solutions.',
  },
  {
    id: 2,
    avatar: '/anna.png',
    name: 'anna.eth',
    email: 'anna@email.com',
    phone: '+ 23 000 344 000',
    description: 'Dobry wariat.',
  },
]

const Jobs: NextPage = () => {
  return (
    <div>
      <BackButton href="/company/offers" />

      <JobBox key={job.company} job={job} hideArrow className="bg-slate-50 rounded-3xl mt-2" />

      <Heading3 className="mt-8">Applicants ({employees.length})</Heading3>

      {employees.map((employee: Partial<Employee>, i) => (
        <Link href={`/employee/${employee.id}`}>
          <ProfileBox
            employee={employee as Employee}
            className={i % 2 ? 'bg-primary hover:bg-[#b99dde]' : 'bg-secondary hover:bg-[#fcd46e]'}
          />
        </Link>
      ))}
    </div>
  )
}

export default Jobs
