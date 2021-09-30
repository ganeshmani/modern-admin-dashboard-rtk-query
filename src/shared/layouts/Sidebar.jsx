import React,{ Fragment,useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch,useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames'
import {
  CalendarIcon,
  HomeIcon,
  MapIcon,
  MenuIcon,
  SearchCircleIcon,
  SpeakerphoneIcon,
  UserGroupIcon,
  UserIcon,
  XIcon,
} from '@heroicons/react/outline'
import { selectCurrentUser } from '../../features/Auth/authSlice'

const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon,  roles: ['admin','user'] },
    { name: 'Users', href: '/users', icon: UserIcon,  roles : ['admin'] },
    { name: 'Orders', href: '/orders', icon: SearchCircleIcon, roles : ['admin','user'] },
  ]

const Sidebar = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const dispatch = useDispatch()
    const [currentActiveIndex,setCurrentActiveIndex] = useState(localStorage.getItem('currentIndex'))  
    const currentUser = useSelector(selectCurrentUser)
    const history = useHistory()

    const _handleNavClick = (item,index) => {
      console.log("item",item)
      history.push(item.href)
      localStorage.setItem('currentIndex',index)
      setCurrentActiveIndex(index)
    }

    return (
        <div className="h-screen flex overflow-hidden bg-white">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-12 w-auto"
                    src="https://raw.githubusercontent.com/tryretool/brand-assets/master/Logos/logo-full-black.png"
                    alt="Workflow"
                  />
                </div>
                <nav aria-label="Sidebar" className="mt-5">
                  <div className="px-2 space-y-1">
                    {navigation.map((item,index) => (
                      item.roles.includes(currentUser.role) ?   
                      (
                      <div
                        key={item.name}
                        onClick={() => _handleNavClick(item,index)}
                        className={classNames(
                          index === currentActiveIndex
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            index === currentActiveIndex ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-4 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </div>
                    ): null
                     ) )}
                  </div>
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <a href="#" className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">Whitney Francis</p>
                      <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-gray-100">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="h-12 w-auto"
                  src="https://raw.githubusercontent.com/tryretool/brand-assets/master/Logos/logo-full-black.png"
                  alt="Workflow"
                />
              </div>
              <nav className="mt-5 flex-1" aria-label="Sidebar">
                <div className="px-2 space-y-1">
                  {navigation.map((item,index) => (
                    item.roles.includes(currentUser.role) ?  (
                    <div
                      key={item.name}
                      onClick={() => _handleNavClick(item,index)}
                      className={classNames(
                        index == currentActiveIndex
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          index == currentActiveIndex ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                          'mr-3 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </div>
                  ):null))}
                </div>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <a href="#" className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{currentUser.email}</p>
                    {/* <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p> */}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div className="lg:hidden">
          <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
            <div>
              <img
                className="h-12 w-auto"
                src="https://raw.githubusercontent.com/tryretool/brand-assets/master/Logos/logo-full-black.png"
                alt="Workflow"
              />
            </div>
            <div>
              <button
                type="button"
                className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 relative z-0 flex overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
            {/* Start main area*/}
            <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
            {children}
            </div>
            {/* End main area */}
          </main>
        </div>
      </div>
      
    </div>
    )
}

export default Sidebar