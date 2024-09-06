import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

export function Heading2({ children }: Props) {
  return <h2 className="text-[32px] leading-8 font-semibold text-semantic-accent-content">{children}</h2>
}
