import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Navigate, Outlet, useLocation } from 'react-router-dom'

import Footer from './components/Footer.jsx'
import Nav from './components/Nav.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { ROUTES, REDIRECTS } from './routes/pageConfig.jsx'

function ScrollToTop(){
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])
  return null
}

function Layout(){
  return (
    <>
      <ScrollToTop />
      <Nav />
      <Outlet />
      <Footer />
    </>
  )
}

export default function App(){
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
    <RouterProvider
      router={router}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    />
  )
}
