import { Routes, Route, Navigate } from "react-router-dom"

import { Signin } from "../pages/Signin"
import { Signup } from "../pages/Signup"

export function AuthRoutes() {
  const user = localStorage.getItem("@rocketnotes:user")
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/register" element={<Signup />} />

      {!user && <Route path="*" element={<Navigate to="/" />} />}
    </Routes>
  )
}
