import Image from 'next/image'
import { Employee } from '~~/app/employee/[slug]/page'

interface Props {
  className?: string
  name: string
}

export function ProfileBox({ name, className }: Props) {
  const avatar = '/doe.png'
  const email = 'joe@gmail.com'
  const phone = '+48 332 554 534'
  const description = 'descriptiondescriptiondescriptiondescription'

  return (
    <div className={`rounded-2xl p-6 mb-4 ${className}`}>
      <div className="flex items-center justify-between mb-4 text-lg">
        <div className="flex gap-8 items-center">
          <Image alt="profile" src={avatar} width={90} height={90} />
          <div className="font-bold">{name}</div>
        </div>
        <div>{email}</div>
        <div className="font-bold">{phone}</div>
      </div>

      <div className="font-semibold text-gray-700 text-justify">{description}</div>
    </div>
  )
}
