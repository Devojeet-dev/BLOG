import AppSidebar from '@/components/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import Topbar from '@/components/Topbar'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '@/components/Footer'

function Layout() {
  return (
    <div className='flex flex-col h-screen'>
      <Topbar />
      <SidebarProvider>
          <AppSidebar />  
          <main className=' w-full'>
            <div className='w-full min-h-[calc(100vh-40px)]'>
              <Outlet />
            </div>
            <Footer />
          </main>
      </SidebarProvider>
    </div>
  )
}

export default Layout
