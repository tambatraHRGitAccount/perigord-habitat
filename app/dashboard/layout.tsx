'use client'

import Header from './layout/header/Header'
import Sidebar from './layout/sidebar/Sidebar'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className='flex w-full min-h-screen'>
        <div className='page-wrapper flex w-full'>
          {/* Header/sidebar */}
          <div className='xl:block hidden'>
            <Sidebar />
          </div>

          <div className='body-wrapper w-full overflow-x-hidden'>
            {/* Top Header  */}
            <Header />
            {/* Body Content  */}
            <div className="bg-lightgray dark:bg-dark mr-0 xl:mr-3 rounded-none xl:rounded-3xl min-h-[90vh]">
              <div className={`w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-30`}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
