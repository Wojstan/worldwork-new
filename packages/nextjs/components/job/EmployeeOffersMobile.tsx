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
  return (
    <>
      <div className="px-3">
        <TinderSwitch />
      </div>

      {isTinder && <Swiper />}
    </>
  )
}
