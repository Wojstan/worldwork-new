import { useContext, useState } from 'react'
import Image from 'next/image'
import { Salary } from '../Salary'
import { TinderContext } from '../ScaffoldEthAppWithProviders'
import { Loader } from '../ui/Loader'
import { Swiper } from './Swiper'
import { TinderSwitch } from './TinderSwitch'
import { companies } from '~~/constants/company'
import { Employee, Employer, Job } from '~~/db/schema'
import { useSwipe } from '~~/hooks/useSwipe'

interface Props {
  applicants?: readonly string[]
}

export function CompanyApplicantsMobile({ applicants = [] }: Props) {
  const { isTinder } = useContext(TinderContext)

  const [offerCounter, setOfferCounter] = useState(0)

  const swipeLeft = () => {
    setOfferCounter((prevState) => (prevState == 0 ? applicants.length - 1 : prevState - 1))
  }

  const swipeRight = () => {
    setOfferCounter((prevState) => (prevState == 0 ? applicants.length - 1 : prevState - 1))
  }

  return (
    <div>
      <div className="px-6">
        <div className="text-center text-3xl font-semibold mb-6 leading-relaxed">
          Are you looking for an employee? :)
        </div>
        <TinderSwitch />

        {isTinder ? (
          <CurrentOffer applicant={applicants[offerCounter]} swipeLeft={swipeLeft} swipeRight={swipeRight} />
        ) : (
          <ul>
            {applicants.map((applicant) => (
              <Offer applicant={applicant} />
            ))}
          </ul>
        )}
      </div>

      {isTinder && <Swiper swipeLeft={swipeLeft} swipeRight={swipeRight} />}
    </div>
  )
}

function Offer({ applicant }: { applicant: string }) {
  if (!applicant) return <Loader />

  return (
    <div className="bg-white z-40 border border-black rounded-3xl p-8 text-xl mb-6">
      {/* <div className="flex gap-6 items-center mb-6">
        <Image alt="avatar" src={companies[name]} width={60} height={60} />
        <div className="font-bold text-xxl text-black">{name}</div>
      </div> */}
      <div>{applicant}</div>
      {/* <div className="font-bold mt-4">{location}</div>

      <div className="border w-full my-4"></div>

      <Salary primary={tokenSalary} secondary={stablecoinSalary} /> */}
    </div>
  )
}

function CurrentOffer({
  applicant,
  swipeLeft,
  swipeRight,
}: {
  swipeLeft: () => void
  swipeRight: () => void
  applicant?: string
}) {
  const { onTouchEnd, onTouchMove, onTouchStart } = useSwipe(swipeLeft, swipeRight)
  const [expand, setExpand] = useState(false)

  if (!applicant) return <Loader />

  const className = expand ? 'translate-y-[-18rem]' : ''

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={`bg-white z-40 border border-[#FF32D2] rounded-3xl p-8 text-xl relative ${className}`}
    >
      <div>{applicant}</div>

      {/* {expand && (
        <div className="mt-6 leading-7">
          {description} <br /> <br /> {description}
        </div>
      )} */}

      <button
        onClick={() => setExpand(!expand)}
        className="absolute -top-5 -right-5 bg-black rounded-full text-white w-24 h-24 text-3xl font-semibold"
      >
        i
      </button>
    </div>
  )
}
