import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { ROUTES, REDIRECTS } from './routes/pageConfig.jsx'

function ScrollToTop(){
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])
  return null
}

export default function App(){
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <Routes>
        {ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        {REDIRECTS.map(({ from, to }) => (
          <Route key={`${from}->${to}`} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}


