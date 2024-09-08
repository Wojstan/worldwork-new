import Image from 'next/image'

interface Props {
  matchedCompany: string
}

export function Match({ matchedCompany }: Props) {
  return (
    <div className="bg-white w-full h-full fixed top-0 right-0 z-50 flex items-center justify-center flex-col transition-all opacity-90">
      <Image alt="company" src={matchedCompany} width={120} height={120} />
      <Image alt="match" src="/matchGraphic.png" width={250} height={250} />
      <Image alt="employee" src="/doe.png" width={120} height={120} />

      <Image alt="gif" src="/match.gif" width={200} height={600} className="w-full h-full absolute top-0" />
    </div>
  )
}
