import { NextPage } from 'next'
import React from 'react'

interface IProps {
  text: string;
}

const NoResults: NextPage<IProps> = ({ text }) => {
  return (
    <div>{text}</div>
  )
}

export default NoResults