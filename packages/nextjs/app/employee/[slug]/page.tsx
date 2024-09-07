import { JobReference } from '~~/components/job/JobReference'
import { ProfileBox } from '~~/components/job/Profile'
import { Heading3 } from '~~/components/ui/Heading3'
import { getEmployee } from '~~/db/employeeActions'
import { getEmployeeHistory } from '~~/db/jobActions'
import { Job } from '~~/db/schema'

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

const Profile = async ({ params }: { params: { slug: string } }) => {
  const employeeAddress = params.slug
  const history = await getEmployeeHistory(employeeAddress)
  const employee = await getEmployee(employeeAddress)

  return (
    <div className="mt-2">
      <ProfileBox className="bg-secondary" name={employee[0]?.name ?? ''} />

      <Heading3 className="mb-6">Experience:</Heading3>

      <ul className="">
        {history?.map((job) => (
          <JobReference key={`${job.employer}${job.arrayIndex}`} job={job} />
        ))}
      </ul>

      <div className="flex justify-center items-center gap-4">
        <button className="btn bg-[#F8E5E5] text-red-600 rounded-full min-w-60">Reject application</button>
        <button className="btn bg-[#AAF767] text-green-800 rounded-full min-w-60">Approve application</button>
      </div>
    </div>
  )
}

export default Profile
