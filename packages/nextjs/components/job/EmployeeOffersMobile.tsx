import { useContext, useState } from 'react'
import { TinderContext } from '../ScaffoldEthAppWithProviders'
import { Swiper } from './Swiper'
import { TinderSwitch } from './TinderSwitch'
import { Employee, Job } from '~~/db/schema'

interface Props {
  data: { job: Job; employee: Employee | null }[]
  isLoading: boolean
}

export function EmployeeOffersMobile({ data, isLoading }: Props) {
  const { isTinder } = useContext(TinderContext)

  const [offerCounter, setOfferCounter] = useState(0)

  return (
    <>
      <div className="px-3">
        <TinderSwitch />
      </div>

      <CurrentOffer job={data[offerCounter]} />

      {isTinder && <Swiper length={data.length} swipe={setOfferCounter} />}
    </>
  )
}

function CurrentOffer({ job }: { job: { job: Job; employee: Employee | null } }) {
  return <div>{job.job.name}</div>
}
