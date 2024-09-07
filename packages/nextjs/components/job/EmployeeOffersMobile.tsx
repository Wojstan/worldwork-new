import { useContext, useState } from 'react'
import { TinderContext } from '../ScaffoldEthAppWithProviders'
import { Job } from './Job'
import { Swiper } from './Swiper'
import { TinderSwitch } from './TinderSwitch'

interface Props {
  data: Job[]
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

function CurrentOffer({ job }: { job: Job }) {
  return <div>{job.job.name}</div>
}
