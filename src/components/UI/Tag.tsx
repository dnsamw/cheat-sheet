import React from 'react'
import '../../assets/scss/tag.scss'

type Props = {
    bgColor: string;
    color: string;
    tag: string;
}

function Tag({bgColor,color,tag}: Props) {
  return (
    <li style={{backgroundColor:bgColor, color:color}}>{tag}</li>
  )
}

export default Tag