import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Header from './components/Header.jsx'
import CreateTrip from './create-trip/index.jsx' // Import CreateTrip component
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <GoogleOAuthProvider clientId= {import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Router>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<App />} /> {/* Default Route */}
        <Route path="/create-trip" element={<CreateTrip />} /> {/* Create Trip Route */}
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  </StrictMode>,
)
