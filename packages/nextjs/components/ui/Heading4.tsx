import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

export function Heading4({ children }: Props) {
  return <h4 className="text-[18px] leading-6 font-semibold text-semantic-accent-content">{children}</h4>
}
