'use client'

import { useState } from 'react'
import { NextPage } from 'next'
import { CompanyEmployees } from '~~/components/job/CompanyEmployees'
import { CompanyOffers } from '~~/components/job/CompanyOffers'
import { CompanyPayments } from '~~/components/job/CompanyPayments'

type Tab = 'offers' | 'employees' | 'payments'

const Jobs: NextPage = () => {
  const [tab, setTab] = useState<Tab>('offers')

  return (
    <div>
      <ul className="flex gap-4 font-semibold cursor-pointer mb-6 text-lg text-accent">
        <li key="offers" className={tab === 'offers' ? 'underline' : ''} onClick={() => setTab('offers')}>
          Your company offers
        </li>
        <li key="employees" className={tab === 'employees' ? 'underline' : ''} onClick={() => setTab('employees')}>
          Employees
        </li>
        <li key="payments" className={tab === 'payments' ? 'underline' : ''} onClick={() => setTab('payments')}>
          Payments
        </li>
      </ul>

      {tab === 'offers' && <CompanyOffers />}
      {tab === 'employees' && <CompanyEmployees />}
      {tab === 'payments' && <CompanyPayments />}
    </div>
  )
}

export default Jobs
