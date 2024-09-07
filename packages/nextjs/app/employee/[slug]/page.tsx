import { Job } from '~~/components/job/Job'
import { Heading3 } from '~~/components/ui/Heading3'

export interface Reference extends Job {
  description: string
  signed: boolean
  date: string
}

export interface Employee {
  id?: number
  avatar: string
  name: string
  email: string
  phone: string
  description?: string
  experience: Reference[]
}

// const employee: Employee = {
//   avatar: '/doe.png',
//   name: 'john.eth',
//   email: 'john@email.com',
//   phone: '+ 23 000 344 000',
//   description:
//     'A passionate and detail-oriented developer with experience in building dynamic and responsive web applications. Proficient in front-end and back-end technologies, including JavaScript, HTML, CSS, React, and Node.js, with a strong focus on creating clean, efficient, and maintainable code. Skilled in collaborating with teams to deliver high-quality projects on time and constantly exploring new tools and techniques to stay at the cutting edge of development. Dedicated to problem-solving, continuous learning, and improving user experience through innovative solutions.',
//   experience: [
//     {
//       date: '02.2021 - 07.2024',
//       position: 'UX/UI Designer',
//       primarySalary: 5000,
//       secondarySalary: 10000,
//       location: 'Berlin, Germany',
//       image: '/worldcoin.png',
//       company: 'Worldcoin',
//       description: `He not only delivered quality code but also contributed to improving our development processes through innovative ideas and a collaborative approach. [Developer's Name] was a go-to person for troubleshooting and consistently exceeded expectations, always delivering on time and helping others when needed.`,
//       signed: true,
//     },
//     {
//       date: '02.2021 - 07.2024',
//       position: 'React Developer',
//       primarySalary: 5000,
//       secondarySalary: 10000,
//       location: 'Warsaw, Poland',
//       image: '/ens.png',
//       company: 'ENS',
//       description: 'Great developer!',
//       signed: true,
//     },
//   ],
// }

const Profile = ({ params }: { params: { slug: string } }) => {
  const { slug } = params

  console.log(slug)

  return (
    <div className="mt-2">
      {/* <ProfileBox className="bg-secondary" employee={employee} /> */}

      <Heading3 className="mb-6">Experience:</Heading3>

      <ul className="">
        {/* {employee.experience.map((job) => (
          <JobReference key={job.company} job={job} />
        ))} */}
      </ul>

      <div className="flex justify-center items-center gap-4">
        <button className="btn bg-[#F8E5E5] text-red-600 rounded-full min-w-60">Reject application</button>
        <button className="btn bg-[#AAF767] text-green-800 rounded-full min-w-60">Approve application</button>
      </div>
    </div>
  )
}

export default Profile
