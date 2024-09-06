import { NextPage } from 'next'
import { Heading1 } from '~~/components/ui/Heading1'
import { Heading3 } from '~~/components/ui/Heading3'
import { Input } from '~~/components/ui/Input'

const AddJob: NextPage = () => {
  return (
    <div className="flex flex-col items-center content-center gap-10 max-w-[1000px]">
      <div className="flex flex-col gap-1">
        <Heading1>Add new job offer</Heading1>
        <Heading3>Please provide all details of the offer</Heading3>
      </div>
      <Input id="position" label="Job Position" placeholder="full-stack" className="w-full" />
      <Input
        id="description"
        label="Description"
        placeholder="Some interesing description"
        textarea
        className="w-full"
      />
    </div>
  )
}

export default AddJob
