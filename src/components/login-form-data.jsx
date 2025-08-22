import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginFormData() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })
    const [errors, setErrors] = useState({})
    const [credentials, setCredentials] = useState(null)
    const nav = useNavigate()

    const validateUsername = (username) => {
        if (!username.trim()) {
            return "Username is required"
        }
        if (!/^[a-zA-Z0-9@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/.test(username)) {
            return "Username can only contain alphanumeric characters and special characters"
        }
        return undefined
    }

    const validatePassword = (password) => {
        if (password.length < 8) {
            return "Password must be at least 8 characters long";
        }

        if (!/\d/.test(password)) {
            return "Password must contain at least one number";
        }

        if (!/[a-zA-Z]/.test(password)) {
            return "Password must contain at least one letter";
        }

        return undefined;
    }


    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }



    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = {}

        const usernameError = validateUsername(formData.username)
        const passwordError = validatePassword(formData.password)

        if (usernameError) newErrors.username = usernameError
        if (passwordError) newErrors.password = passwordError

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0 && credentials && credentials?.length>0) {
            let isAuth = false
            for(let i=0; i<credentials.length; i++){
                if(credentials[i].username == formData.username && credentials[i].password == formData.password){
                    isAuth = true
                    break;
                }
            }
            if(isAuth){
                alert("Login Successful")
                nav("/home")
            }else{
                alert("Wrong Credentials")
            }
        }
    }


    useEffect(()=>{
        const cred_data = JSON.parse(localStorage.getItem("credentials"))
        setCredentials(cred_data)
    },[])


  return (
    <div className='w-full max-w-[90%] md:max-w-4xl bg-white shadow-lg overflow-hidden ' > 
        <div className='bg-teal-700 text-white text-center py-6 w-full ' >
            <h1 className='text-2xl ' >Login </h1>
            <p>Sign in to continue</p>
        </div>

        <div className='p-8 md:p-8 ' >
            <form onSubmit={handleSubmit} className='space-y-6 max-w-md mx-auto ' >
                <div className="space-y-2">
                    <div className="relative">
                    <input
                        type="text"
                        placeholder="USERNAME"
                        value={formData.username}
                        onChange={(e) => handleInputChange("username", e.target.value)}
                        className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-300 rounded-none focus:border-teal-700 focus:ring-0 placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium focus-visible:outline-none "
                    />
                    </div>
                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                </div>

                <div className="space-y-2">
                    <div className="relative">
                        <input
                            type={"text"}
                            placeholder="NEW PASSWORD"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            className="w-full px-0 py-3 pr-10 bg-transparent border-0 border-b-2 border-gray-300 rounded-none focus:border-teal-700 focus:ring-0 placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium focus-visible:outline-none"
                        />
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>


                <div className="pt-4 flex justify-center ">
                    <button
                        type="submit"
                        className="px-10 bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-md font-medium"
                    >
                        LOGIN
                    </button>
                </div>

                <div className="text-center pt-2">
                    <p className="text-gray-600 text-sm">
                    {"Don't have Account? "}
                    <Link to="/signup" className="text-teal-700 hover:text-teal-800 font-medium underline">
                        SignUp
                    </Link>
                    </p>
                </div>

            </form>
        </div>
    </div>
  )
}
