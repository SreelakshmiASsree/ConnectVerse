import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginSignup = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        rememberMe: false
    });
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [success, setSuccess] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const toggleForm = () => {
        setIsRegister(!isRegister);
        setError(null);
        setSuccess(null);
        setValidationErrors({});
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validate = () => {
        let errors = {};

        if (isRegister && !formData.username.trim()) {
            errors.username = "Username is required";
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }

        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const url = isRegister ? 'http://localhost:3000/register' : 'http://localhost:3000/login';
            const response = await axios.post(url, formData);
            setSuccess('Success!');

            setError(null);

            if (formData.rememberMe) {
                localStorage.setItem('email', formData.email);
                localStorage.setItem('password', formData.password);
            } else {
                localStorage.removeItem('email');
                localStorage.removeItem('password');
            }

            if (isRegister) {
                setTimeout(() => {
                    setIsRegister(false);
                }, 1000);
            } else {
                setTimeout(() => {
                    navigate('/Dashboard');
                }, 1000);
            }

        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
            setSuccess(null);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 md:p-10 rounded-lg shadow-lg w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-xl md:text-3xl font-mono italic text-black">
                        ConnectVerse
                    </h1>
                    <h2 className="text-xl md:text-2xl font-medium text-black mt-2">
                        {isRegister ? 'Create Account' : 'Login'}
                    </h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {isRegister && (
                        <div>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${validationErrors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                            />
                            {validationErrors.username && <p className="text-red-500 text-sm mt-1">{validationErrors.username}</p>}
                        </div>
                    )}
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${validationErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                        />
                        {validationErrors.email && <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>}
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${validationErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                        />
                        <span
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                        {validationErrors.password && <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>}
                    </div>
                    {!isRegister && (
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="text-blue-500 form-checkbox"
                                />
                                <span className="ml-2 text-gray-600">Remember Me</span>
                            </label>
                            <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</a>
                        </div>
                    )}
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center">{success}</p>}
                    <button type="submit" className="w-full py-3 bg-black text-white rounded-lg hover:bg-black transition duration-200">
                        {isRegister ? 'Sign Up' : 'Login'}
                    </button>
                </form>
                <div className="text-center mt-6">
                    {isRegister ? (
                        <p>
                            Already have an account? 
                            <a href="#" onClick={toggleForm} className="text-blue-500 hover:underline ml-2">Sign in</a>
                        </p>
                    ) : (
                        <p>
                            Don't have an account? 
                            <a href="#" onClick={toggleForm} className="text-blue-500 hover:underline ml-2">Create one</a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;



