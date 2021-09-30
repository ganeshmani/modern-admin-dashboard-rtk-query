import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { isAuthenticated } from '../features/Auth/authSlice'
export const useAuth = () => {
  const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null
  console.log("isAuthenticated",currentUser)
  return currentUser
}
