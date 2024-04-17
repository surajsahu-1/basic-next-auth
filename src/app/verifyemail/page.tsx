'use client'

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"

const VerifyEmailPage = () => {
  const [token, setToken] = useState('');
  const [verifyed, setVerifyed] = useState(false);
  const [error, setError] = useState(false);
  const searchParams = useSearchParams()
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const verifyEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token })
      setVerifyed(true)
    } catch (error: any) {
      setError(true)
      console.log(error);
      
      console.log(error.response.data);
    }
  }
  useEffect(() => {
    // const urlToken =window.location.search.split('=')[1]
    // setToken(urlToken || '');
    const urlToken = searchParams.get('token')

    console.log(urlToken);
    setToken(urlToken || '');
    if (urlToken!?.length > 0) {
      setButtonDisabled(false)
    }



  }, [])
  // useEffect(() => {
  //   if (token.length > 0) {
  //     verifyEmail()
  //   }
  // })
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">


      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Email Verification</h1>
        <p className="text-gray-600 mb-6">Please verify your email address to continue.</p>
        {error && <p className="text-red-500 mb-6">Error verifying email. Please try again.</p>}
        {verifyed && <p className="text-green-500 mb-6">Email verified successfully.
          <Link href='/login'>Go to login</Link>
        </p>}
        <button
          disabled={buttonDisabled}
          onClick={verifyEmail}
          className={`w-full px-4 py-2 text-white font-medium ${buttonDisabled ? "bg-indigo-200" : "bg-indigo-600  hover:bg-indigo-500 active:bg-indigo-600"} rounded-lg duration-150`}
        >
          Verify Email
        </button>

      </div>
    </div>
  )
}

export default VerifyEmailPage