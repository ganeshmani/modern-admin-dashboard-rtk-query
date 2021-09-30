import React, { useState,useEffect } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { useSignupUserMutation } from '../../app/services/auth'
const SignupComponent = () => {

  const history = useHistory()
  const [signupUser, { data, isLoading, isSuccess }] = useSignupUserMutation()

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    role : "admin"
  })

  useEffect(() => {

    if(isSuccess && Object.entries(data).length > 0){
        toast.success('Signup Successful')
          history.push('/')   
    }

},[data,isSuccess])

  const _handleOnChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const _handleSignup = async (e) => {
    try {
      e.preventDefault()

      await signupUser(state).unwrap()
    }
    catch (e) {
      if (e.data && e.data.message) {
        toast.error(e.data.message)
      }
      else {
        console.log("Error", e)
        toast.error("Error while login")
      }
    }
  }

  return (<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" action="" onSubmit={_handleSignup} method="POST">

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                onChange={_handleOnChange}
                type="text"
                autoComplete="name"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                onChange={_handleOnChange}
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                onChange={_handleOnChange}
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? (<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>) : null}
              Register
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or <a href=""><Link to="/login">signin</Link></a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>)
}

export default SignupComponent