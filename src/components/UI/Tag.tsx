import React from 'react'
import '../../assets/scss/tag.scss'

type Props = {
    bgColor: string;
    color: string;
    tag: string;
    onClick?: (tag:string) => void;
}

function Tag({bgColor,color,tag,onClick}: Props) {
  const handleClick=()=>{
    if (onClick) {
      return onClick(tag)
    }
  }
  return (
    <li onClick={handleClick} style={{backgroundColor:bgColor, color:color}}>{tag}</li>
  )
}

export default Tag