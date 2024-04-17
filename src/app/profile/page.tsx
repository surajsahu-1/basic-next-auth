'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react"
import toast, { Toast } from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    username: ''
  })
  useEffect(() => {
   try {
     axios.post('/api/users/me').then((response) => {
       console.log(response.data)
       const { email, username } = response.data.data;
       setUser({ email, username })
       console.log(email, username);
       console.log(user);
     })
     .catch((error) => {
       console.log(error)
     })
   } catch (error: any) {
     toast.error(error.message)
    
   }
  }, [])
  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]); // This useEffect will trigger whenever the user state changes

  const UserLogOut = async () => {
    try {
      await axios.get('/api/users/logout')
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  return (
    <main>
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
    <div className="flex min-h-screen items-center justify-center">
  <div className="w-64 rounded-lg border-2 border-indigo-500 bg-transparent p-4 text-center shadow-lg dark:bg-gray-800">
    <figure className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 dark:bg-indigo-600">
      
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-person-fill text-white dark:text-indigo-300" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
      </svg>
    </figure>
    <h2 className="mt-4 text-xl font-bold text-indigo-600 dark:text-indigo-400">{user.username.toLocaleUpperCase()}</h2>
    <p className="mb-4 text-gray-600 dark:text-gray-300">{user.email}</p>
    <div className="flex items-center justify-center">
      <button onClick={UserLogOut}  className="rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-500 w-full">Logout</button>
      
    </div>
  </div>
</div>

    </div>
</main>
  )
}

export default ProfilePage