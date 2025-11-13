import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Navigate, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Footer from './components/Footer.jsx'
import Nav from './components/Nav.jsx'
import CosmicBackground from './components/CosmicBackground.jsx'
import PageTransition from './components/PageTransition.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { PricingCartProvider } from './components/PricingCartContext.jsx'
import { useI18n } from './i18n.jsx'
import { ROUTES, REDIRECTS } from './routes/pageConfig.jsx'
import { ensureSupabaseSession } from './lib/supabaseAuth'

// Scroll to top is now handled by PageTransition component
function Layout(){
  const location = useLocation()

  useEffect(() => {
    ensureSupabaseSession().catch((err) => {
      console.error('Supabase automatic sign-in failed:', err)
    })
  }, [])

  return (
    <>
      <CosmicBackground />
      <div className="relative z-10">
        <Nav />
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  )
}

export default function App(){
  const { lang } = useI18n()
  const locale = lang === 'CN' ? 'CN' : 'EN'
  
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        ...ROUTES.map(({ path, element }) => ({ path, element })),
        ...REDIRECTS.map(({ from, to }) => ({ path: from, element: <Navigate to={to} replace /> })),
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ])

  return (
    <PricingCartProvider locale={locale}>
      <RouterProvider
        router={router}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      />
    </PricingCartProvider>
  ) 
}
