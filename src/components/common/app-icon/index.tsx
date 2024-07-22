/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import isEqual from 'react-fast-compare'

import { cn } from '@/lib/utils/cn'

import sx from './AppIcon.module.scss'

interface AppIconProps {
  src: string
  className?: string
  ['aria-label']: string
}

function AppIcon(props: AppIconProps) {
  const { src, className = '', ...other } = props

  return (
    <svg className={cn('duration-300', sx.Component, className)} {...other}>
      <use href={src} {...other} />
    </svg>
  )
}

export default React.memo(AppIcon, isEqual)
