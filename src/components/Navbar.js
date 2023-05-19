import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className='bg-gray-700 dark:bg-midnight rounded-md items-center overflow-hidden w-screen sticky top-0 justify-center p-2 '>
    <div className=' font-popin text-black dark:text-white text-bold md:text-xl'>
        <div>
            <span className='font-bold text-xl'>E-Saving</span>
        </div>
        <ul className='flex flex-row justify-center items-center space-x-6 font-semibold'>
            <li>
                <NavLink to='/' className={({ isActive }) => isActive ? "text-cyan-500" : ""}>
                    Berlangsung
                </NavLink>
            </li>
            <li>
                <NavLink to='/tercapai' className={({ isActive }) => isActive ? "text-cyan-500" : ""}>
                    Selesai
                </NavLink>
            </li>
        </ul>
    </div>
</nav>
  )
}
