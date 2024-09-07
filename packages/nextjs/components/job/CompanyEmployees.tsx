import { Heading1 } from '../ui/Heading1'
import { EmployeeBox } from './EmoployeeBox'
import { Employee } from '~~/app/employee/[slug]/page'
import { employee } from '~~/db/schema'

const employees: Partial<Employee>[] = [
  {
    avatar: '/doe.png',
    name: 'john.eth',
  },
  {
    avatar: '/anna.png',
    name: 'anna.eth',
  },
]

export function CompanyEmployees() {
  return (
    <div>
      <Heading1>Your employees</Heading1>

      <div className="flex flex-col gap-3 mt-8">
        {employees.map((employee, i) => (
          <EmployeeBox paid={i == 0} newLabel={i == 0} employee={employee as Employee} />
        ))}
      </div>
    </div>
  )
}
