import { memo } from 'react'
import isEqual from 'react-fast-compare'

function Header() {
  return <div>Header</div>
}

export default memo(Header, isEqual)
