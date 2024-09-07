import { ReactNode } from 'react'
import { formatTime } from '~~/utils/formatTime'

interface Props {
  date: Date
}

export const DateInfo = ({ date }: Props) => {
  const [day, time] = formatTime(date).split(',')

  return (
    <div className="flex flex-col">
      <TimeHeading>{day}</TimeHeading>
      <TimeHeading>{time}</TimeHeading>
    </div>
  )
}

interface TimeHeadingProps {
  children: ReactNode
  className?: string
}

export function TimeHeading({ children, className }: TimeHeadingProps) {
  return <h3 className={`text-[20px] leading-[18px] font-bold text-neutral tracking-wider ${className}`}>{children}</h3>
}
