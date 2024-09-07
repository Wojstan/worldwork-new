import { useContext, useState } from 'react'
import Image from 'next/image'
import { Salary } from '../Salary'
import { TinderContext } from '../ScaffoldEthAppWithProviders'
import { Heading1 } from '../ui/Heading1'
import { Loader } from '../ui/Loader'
import { Swiper } from './Swiper'
import { TinderSwitch } from './TinderSwitch'
import { companies } from '~~/constants/company'
import { Employer, Job } from '~~/db/schema'
import { useSwipe } from '~~/hooks/useSwipe'

interface Props {
  data: { job: Job; employer: Employer | null }[]
  isLoading: boolean
}

export function EmployeeOffersMobile({ data, isLoading }: Props) {
  const { isTinder } = useContext(TinderContext)

  const [offerCounter, setOfferCounter] = useState(0)

  const swipeLeft = () => {
    setOfferCounter((prevState) => (prevState == 0 ? data.length - 1 : prevState - 1))
  }

  const swipeRight = () => {
    setOfferCounter((prevState) => (prevState == 0 ? data.length - 1 : prevState - 1))
  }

  if (isLoading) return <Loader />

  return (
    <div>
      <div className="px-6">
        <div className="text-center text-3xl font-semibold mb-6 leading-relaxed">Are you looking for a job? :)</div>
        <TinderSwitch />

        <CurrentOffer job={data[offerCounter]} swipeLeft={swipeLeft} swipeRight={swipeRight} />
      </div>

      {isTinder && <Swiper swipeLeft={swipeLeft} swipeRight={swipeRight} />}
    </div>
  )
}

function CurrentOffer({
  job,
  swipeLeft,
  swipeRight,
}: {
  swipeLeft: () => void
  swipeRight: () => void
  job?: { job: Job; employer: Employer | null }
}) {
  const { onTouchEnd, onTouchMove, onTouchStart } = useSwipe(swipeLeft, swipeRight)
  const [expand, setExpand] = useState(false)
  if (!job) return <Loader />

  const { name, position, location, stablecoinSalary, tokenSalary, description } = job.job

  const className = expand ? 'translate-y-[-18rem]' : ''

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={`bg-white z-40 border border-[#FF32D2] rounded-3xl p-8 text-xl relative ${className}`}
    >
      <div className="flex gap-6 items-center mb-6">
        <Image alt="avatar" src={companies[name]} width={60} height={60} />
        <div className="font-bold text-xxl text-black">{name}</div>
      </div>
      <div>{position}</div>
      <div className="font-bold mt-4">{location}</div>

      <div className="border w-full my-4"></div>

      <Salary primary={tokenSalary} secondary={stablecoinSalary} />

      {expand && (
        <div className="mt-6 leading-7">
          {description} <br /> <br /> {description}
        </div>
      )}

      <button
        onClick={() => setExpand(!expand)}
        className="absolute -top-5 -right-5 bg-black rounded-full text-white w-24 h-24 text-3xl font-semibold"
      >
        i
      </button>
    </div>
  )
}
