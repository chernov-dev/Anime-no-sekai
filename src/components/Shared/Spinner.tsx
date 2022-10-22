import React from 'react'
import { MoonLoader } from 'react-spinners'

const Spinner = ({size} : {size?: number}) => {
  return (
      <MoonLoader color="var(--neumorph-accent)" size={size ?? 50}/>
  )
}

export default Spinner