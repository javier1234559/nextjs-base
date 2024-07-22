import { memo } from 'react'
import isEqual from 'react-fast-compare'

function Footer() {
  return <div>Footer</div>
}

export default memo(Footer, isEqual)
