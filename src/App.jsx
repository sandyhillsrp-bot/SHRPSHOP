import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from './lib/query-client'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'
import Rules from './pages/Rules'
import Tickets from './pages/Tickets'
import Staff from './pages/Staff'
import Applications from './pages/Applications'
import ServerStatus from './pages/ServerStatus'
import About from './pages/About'
import Shop from './pages/Shop'
import PageNotFound from './lib/PageNotFound'

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/about" element={<About />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/status" element={<ServerStatus />} />
        <Route path="/shop" element={<Shop />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <AuthenticatedApp />
      </Router>
    </QueryClientProvider>
  )
}