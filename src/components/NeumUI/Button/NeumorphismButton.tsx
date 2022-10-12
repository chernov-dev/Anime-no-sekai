import React from 'react'

const NeumorphismButton = ({onClick, children, className, value} : {onClick?: (e: any) => Promise<void>, children?: JSX.Element | JSX.Element[], className: string, value?: string}) => {
  return (
    <button className={`neumorphic-btn secondary flex gap-2 ${className}`} onClick={onClick}>
        {value ?? children}
    </button>
  )
}

export default NeumorphismButton