import { memo } from 'react'
import isEqual from 'react-fast-compare'

function Footer() {
  return <footer>
    {/* CTA Section */}
    <div className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-shrink-0">
            <img
              src="https://i.imgur.com/OAahSVe.png"
              alt="Smith & Associates Real Estate"
              className="h-24 lg:h-32 w-auto"
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Find Your Dream Home?
            </h3>
            <p className="text-xl text-orange-100">
              Whether you&apos;re buying or selling, Cyndi&apos;s expertise and dedication
              will guide you to success in Florida&apos;s luxury real estate market.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Copyright Section */}
    <div className="bg-luxury-navy text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="text-sm text-gray-300">
            © 2025 Cyndi Kaszirer, REALTOR® | Smith & Associates Real Estate. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  </footer>
}

export default memo(Footer, isEqual)
