'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react"
import toast, { Toast } from "react-hot-toast";


const LoginPage = () => {
  const route = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loding, setLoding] = useState(false);

  const signupHandler = async () => {
    try {
      setLoding(true);
      const response = await axios.post("/api/users/login", user)
      .then((_response) => {
        route.push("/profile")
      })


    } catch (error: any) {
      console.log("signup Faild");
      toast.error(error.message)

    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Login to existing account</h3>
            <p className="">Don&apos;t have an account? <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign Up</Link></p>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <div
            className="space-y-5"
          >
         
            <div>
              <label className="font-medium">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div>
              <label className="font-medium">
                Password
              </label>
              <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <button
              disabled={buttonDisabled}
              onClick={signupHandler}
              className={`w-full px-4 py-2 text-white font-medium ${buttonDisabled ? "bg-indigo-200" : "bg-indigo-600  hover:bg-indigo-500 active:bg-indigo-600"} rounded-lg duration-150`}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage