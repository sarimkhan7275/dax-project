import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUpFormData() {
    const [formData, setFormData] = useState({
        name : "",
        username: "",
        email : "",
        phone_no : "",
        password: "",
        confirm_password : ""
    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()


    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const validateName = (name) => {
        if (!name.trim()) {
            return "Name is required"
        }
        if (!/^[a-zA-Z\s]*$/.test(name)) {
            return "Name can only contain alphabets and spaces"
        }
        return undefined
    }

    const validateUsername = (username) => {
        if (!username.trim()) {
            return "Username is required"
        }
        if (!/^[a-zA-Z0-9@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/.test(username)) {
            return "Username can only contain alphanumeric characters and special characters"
        }
        return undefined
    }

    const validateEmail = (email) => {
        const isGmail = email.toLowerCase().endsWith("@gmail.com");
        if(!isGmail){
            return "Must be a gmail.com"
        }
        if (!email.trim()) {
            return "Email is required"
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return "Please enter a valid email address"
        }
        return undefined
    }

    const validatePhone = (phone) => {
        const phoneRegex = /^\+\d{1,3}\d{7,12}$/;
        if(!phoneRegex.test(phone)){
            return "Provide a correct phone number with country code"
        }

        return undefined;
    }

    const validatePassword = (password) => {
        if(password == formData.username){
            return "Username and password cannot be the same"
        }
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

    const validateConfirmPassword = (confirmPassword) => {
        if (!confirmPassword) {
            return "Please confirm your password"
        }
        if (confirmPassword !== formData.password) {
            return "Passwords do not match"
        }
        return undefined
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = {}

        const nameError = validateName(formData.name)
        const usernameError = validateUsername(formData.username)
        const emailError = validateEmail(formData.email)
        const phoneError = validatePhone(formData.phone_no)
        const passwordError = validatePassword(formData.password)
        const confirmPasswordError = validateConfirmPassword(formData.confirm_password)

        if (nameError) newErrors.name = nameError
        if (usernameError) newErrors.username = usernameError
        if (emailError) newErrors.email = emailError
        if (phoneError) newErrors.phone_no = phoneError
        if (passwordError) newErrors.password = passwordError
        if (confirmPasswordError) newErrors.confirm_password = confirmPasswordError

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            alert("Account created successfully!")
            const cred_data = localStorage.getItem("credentials") || []
            cred_data.push(formData)
            localStorage.setItem("credentials", JSON.stringify(cred_data))
            navigate("/login")
        }
    }

  return (
    <div className='w-full max-w-[90%] md:max-w-4xl bg-white shadow-lg overflow-hidden ' > 
        <div className='bg-teal-700 text-white text-center py-6 w-full ' >
            <h1 className='text-2xl ' >Create new Account </h1>
        </div>

        <div className='p-8 ' >
            <form onSubmit={handleSubmit}  >
                <div className='w-full grid grid-cols-1 md:grid-cols-2  gap-6' >
                    <div className="space-y-2">
                        <div className="relative">
                        <input
                            type="text"
                            placeholder="NAME"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-300 rounded-none focus:border-teal-700 focus:ring-0 placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium focus-visible:outline-none "
                        />
                        </div>
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <div className="relative">
                            <input
                                type={"text"}
                                placeholder="USERNAME"
                                value={formData.username}
                                onChange={(e) => handleInputChange("username", e.target.value)}
                                className="w-full px-0 py-3 pr-10 bg-transparent border-0 border-b-2 border-gray-300 rounded-none focus:border-teal-700 focus:ring-0 placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium focus-visible:outline-none"
                            />
                        </div>
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>

                    <div className="space-y-2">
                        <div className="relative">
                            <input
                                type={"email"}
                                placeholder="EMAIL"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="w-full px-0 py-3 pr-10 bg-transparent border-0 border-b-2 border-gray-300 rounded-none focus:border-teal-700 focus:ring-0 placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium focus-visible:outline-none"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <div className="relative">
                            <input
                                type={"text"}
                                placeholder="PHONE NO"
                                value={formData.phone_no}
                                onChange={(e) => handleInputChange("phone_no", e.target.value)}
                                className="w-full px-0 py-3 pr-10 bg-transparent border-0 border-b-2 border-gray-300 rounded-none focus:border-teal-700 focus:ring-0 placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium focus-visible:outline-none"
                            />
                        </div>
                        {errors.phone_no && <p className="text-red-500 text-sm">{errors.phone_no}</p>}
                    </div>


                    <div className="space-y-2">
                        <div className="relative">
                            <input
                                type={"text"}
                                placeholder="PASSWORD"
                                value={formData.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                                className="w-full px-0 py-3 pr-10 bg-transparent border-0 border-b-2 border-gray-300 rounded-none focus:border-teal-700 focus:ring-0 placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium focus-visible:outline-none"
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                        <div className="relative">
                            <input
                                type={"text"}
                                placeholder="CONFIRM PASSWORD"
                                value={formData.confirm_password}
                                onChange={(e) => handleInputChange("confirm_password", e.target.value)}
                                className="w-full px-0 py-3 pr-10 bg-transparent border-0 border-b-2 border-gray-300 rounded-none focus:border-teal-700 focus:ring-0 placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium focus-visible:outline-none"
                            />
                        </div>
                        {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password}</p>}
                    </div>
                </div>


                <div className="pt-4 flex justify-center md:justify-end ">
                    <button
                        type="submit"
                        className="px-10 bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-md font-medium"
                    >
                        SIGN UP
                    </button>
                </div>

                <div className="text-center pt-2">
                    <p className="text-gray-600 text-sm">
                    {"Already have an account? "}
                    <Link to="/login" className="text-teal-700 hover:text-teal-800 font-medium underline">
                        Login
                    </Link>
                    </p>
                </div>

            </form>
        </div>
    </div>
  )
}
