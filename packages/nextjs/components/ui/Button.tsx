import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
  isLoading?: boolean
  onClick?: () => void
}

export function Button({ children, type, className, isLoading, onClick }: Props) {
  return (
    <button onClick={onClick} type={type} className={`btn btn-primary border-none rounded-full bg-accent min-w-60 text-white ${className}`}>
      {isLoading ? <span className="loading loading-spinner"></span> : children}
    </button>
  )
}
