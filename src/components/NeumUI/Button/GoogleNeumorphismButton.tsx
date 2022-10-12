import React from 'react'
import { BsGoogle } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

const GoogleNeumorphismButton = ({onClick, children, className} : {onClick: (e: any) => Promise<void>, children?: JSX.Element, className: string}) => {
  return (
    <>
    <button className={`neumorphic-btn secondary flex gap-2 ${className}`} onClick={onClick}>
        <FcGoogle size={22}/>
        {children ?? "Sign in with Google"}
    </button>
    </>
  )
}

export default GoogleNeumorphismButton