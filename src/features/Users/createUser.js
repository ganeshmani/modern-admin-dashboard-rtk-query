import React, { useState,useEffect } from 'react'
import Modal from '../../shared/Modal'
import Dropdown from '../../shared/Dropdown'
import toast from 'react-hot-toast';
import { useCreateUserMutation } from '../../app/services/user'
const CreateUser = ({ isOpen,handleModalClick }) => {

    const [state,setState] = useState({
        name : "",
        email : "",
        location : "",
        role : "admin"
    })

    const [createUser,{data,isSuccess,isLoading,isError,error}] = useCreateUserMutation()

    useEffect(() => {

        if(isSuccess){
            toast.success('User Created Successfully')
            handleModalClick()
        }

    },[data,isSuccess])

    const _handleOnChange = (e) => {
        setState({ ...state, [e.target.name] : e.target.value })
    }

    const _handleCreateUser = async (e) => {
        try {
            e.preventDefault()
            await createUser({...state,status : "Active"})
        }
        catch(e){
            toast.error("Error while creating an user")
        }
        
    }

    return (<Modal isOpen={isOpen} setOpen={handleModalClick}>
        <form onSubmit={_handleCreateUser}>
        <div>
            <h4 className="mt-1 text-center text-3xl font-extrabold text-gray-900">Create User</h4>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <div className="mt-1">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={_handleOnChange}
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Location
                </label>
                <div className="mt-1">
                    <input
                        id="location"
                        name="location"
                        type="text"
                        onChange={_handleOnChange}
                        autoComplete="location"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Role
                </label>
                <div className="mt-1 w-full">
                    <select
                        id="role"
                        name="role"
                        onChange={_handleOnChange}
                        autoComplete="role"
                        className="block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    >
                        <option>admin</option>
                        <option>user</option>
                        
                    </select>
                </div>
            </div>
            <div className="mt-4">
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Create
                </button>
            </div>
        </div>
        </form>
    </Modal>)
}

export default CreateUser