'use client'

import Link from 'next/link'
import { NextPage } from 'next'
import { Employee } from '~~/app/employee/[slug]/page'
import { JobBox } from '~~/components/job/Job'
import { ProfileBox } from '~~/components/job/Profile'
import { BackButton } from '~~/components/ui/BackButton'
import { Heading3 } from '~~/components/ui/Heading3'
import { Job } from '~~/db/schema'

const job: Job = {
  position: 'React developer',
  name: 'Worldcoin',
  employer: '0x0',
  arrayIndex: 0,
  description: '',
  stablecoinSalary: 0,
  tokenSalary: 0,
  startDate: null,
  location: null,
  endDate: null,
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

      <JobBox job={job} hideArrow className="bg-[#F3F4F6] rounded-3xl mt-2" />

      <Heading3 className="mt-8">Applicants ({employees.length})</Heading3>

      {employees.map((employee: Partial<Employee>, i) => (
        <Link key={employee.id} href={`/employee/${employee.id}`}>
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
