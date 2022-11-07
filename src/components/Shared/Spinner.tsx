import { MoonLoader } from 'react-spinners'

const Spinner = ({ size }: { size?: number }) => {
  return (
    <MoonLoader color="rgb(var(--neumorph-accent))" size={size ?? 50} />
  )
}

export default Spinner