import { memo } from 'react'
import isEqual from 'react-fast-compare'

function Footer() {
  return <footer>
    {/* Copyright Section */}
    <div className="bg-luxury-navy text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="text-sm text-gray-300">
            © 2025 Next base template. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  </footer>
}

export default memo(Footer, isEqual)
