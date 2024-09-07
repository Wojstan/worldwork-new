import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function Heading1({ children }: Props) {
  return (
    <div className="">
      <h1 className="text-4xl md:text-5xl font-semibold text-semantic-accent-content">{children}</h1>
    </div>
  )
}
