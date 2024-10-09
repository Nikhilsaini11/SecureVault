import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Vault = () => {

    const [form, setForm] = useState({ website: '', username: '', password: '' })
    const [passwordsArray, setPasswordsArray] = useState([])
    const inputRef = useRef(null)
    const passwordIconRef = useRef(null)

    useEffect(() => {
        if (localStorage.getItem('passwords')) {
            setPasswordsArray(JSON.parse(localStorage.getItem('passwords')))
        }
    }, [])

    const handlePasswordHide = () => {
        inputRef.current.type = inputRef.current.type === 'password' ? 'text' : 'password'
        passwordIconRef.current.state = passwordIconRef.current.state === null ? 'hover-cross' : null
    }

    const handleDelete = (id) => {
        setPasswordsArray(passwordsArray.filter((password) => password.id !== id))
        localStorage.setItem('passwords', JSON.stringify(passwordsArray.filter((password) => password.id !== id)))
        toast('Password Deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    }

    const handleEdit = (id) => {
        setForm(passwordsArray.find((password) => password.id === id))
        setPasswordsArray(passwordsArray.filter((password) => password.id !== id))

    }

    const handleCopy = (data) => {
        navigator.clipboard.writeText(data)
        toast('Copied!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    }
    const addPassword = (e) => {
        e.preventDefault()
        console.log(form)
        const id = uuidv4()
        setPasswordsArray([...passwordsArray, { ...form, id: id }])
        localStorage.setItem('passwords', JSON.stringify([...passwordsArray, { ...form, id: id }]))
        setForm({ website: '', username: '', password: '' })
        toast('Password Added', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    }

    const handleOnChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            <div className="container mx-auto p-4 mt-6 text-cyan-700">
                {/* Form Section for entering website, username, and password */}
                <form className="flex flex-col items-center align-middle rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={addPassword}>
                    <div className="mb-6 w-3/4">
                        <label
                            className="block text-sm font-bold mb-2"
                            htmlFor="website"
                        >
                            Website
                        </label>
                        <input
                            className="shadow appearance-none border border-green-500 rounded w-full py-3 px-4 text-gray-900 leading-tight transition duration-300 ease-in-out focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            id="website"
                            type="text"
                            name='website'
                            value={form.website}
                            onChange={handleOnChange}
                            placeholder="Enter website"
                            required
                            minLength={1}
                        />
                    </div>

                    <div className="mb-6 w-3/4">
                        <label
                            className="block text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border border-green-500 rounded w-full py-3 px-4 text-gray-900 leading-tight transition duration-300 ease-in-out focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            id="username"
                            type="text"
                            name='username'
                            value={form.username}
                            onChange={handleOnChange}
                            placeholder="Enter username"
                            required
                            minLength={1}
                        />
                    </div>

                    <div className="mb-6 w-3/4">
                        <label
                            className="block text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative w-full">
                            <input
                                ref={inputRef}
                                className="shadow appearance-none border border-green-500 rounded w-full py-3 pl-4 pr-10 text-gray-900 leading-tight transition duration-300 ease-in-out focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                id="password"
                                type="password"
                                name='password'
                                value={form.password}
                                onChange={handleOnChange}
                                placeholder="Enter password"
                                required
                                minLength={1}
                            />
                            <lord-icon
                                ref={passwordIconRef}
                                onClick={handlePasswordHide}
                                src="https://cdn.lordicon.com/dicvhxpz.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#000000,secondary:#107c91"
                                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', width: '30px', height: '30px', cursor: 'pointer' }}
                            ></lord-icon>
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="w-1/12 flex justify-center text-lg items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-2 pe-4 rounded-lg shadow transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:scale-105"
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/fgxwhgfp.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#ffffff,secondary:#107c91"
                            style={{ width: "40px", height: "40px" }}>
                        </lord-icon>
                        Save
                    </button>

                </form>

                <div className="container mx-auto p-4 mt-6">
                    <h2 className="text-cyan-700 text-2xl font-bold mb-4">Stored Passwords</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
                            <thead className='rounded-t-lg'>
                                <tr className="bg-green-500 text-white">
                                    <th className="py-3 px-4 text-left rounded-tl-lg">Website</th>
                                    <th className="py-3 px-4 text-left">Username</th>
                                    <th className="py-3 px-4 text-left">Password</th>
                                    <th className="py-3 px-4 text-center rounded-tr-lg">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300">
                                {passwordsArray.map((password) =>
                                    <tr key={password.id} className="hover:bg-gray-700">
                                        <td className="py-3 px-4 w-2/5">
                                            <div className=' gap-2 flex items-center'>

                                                {password.website}
                                                <lord-icon
                                                    onClick={() => handleCopy(password.website)}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                    colors="primary:#66ee78"
                                                    style={{ width: "30px", height: "30px", cursor: 'pointer' }}>
                                                </lord-icon>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 w-1/4">
                                            <div className=' gap-2 flex items-center'>
                                                {password.username}
                                                <lord-icon
                                                    onClick={() => handleCopy(password.username)}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                    colors="primary:#66ee78"
                                                    style={{ width: "30px", height: "30px", cursor: 'pointer' }}>
                                                </lord-icon>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className=' gap-2 flex items-center'>
                                                {"*".repeat(password.password.length)}
                                                <lord-icon
                                                    onClick={() => handleCopy(password.password)}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                    colors="primary:#66ee78"
                                                    style={{ width: "30px", height: "30px", cursor: 'pointer' }}>
                                                </lord-icon>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <button onClick={() => handleEdit(password.id)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/exymduqj.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors="primary:#66d7ee,secondary:#66ee78"
                                                    style={{ width: "30px", height: "30px" }}>
                                                </lord-icon>
                                            </button>
                                            <button onClick={() => handleDelete(password.id)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/hwjcdycb.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors="primary:#c71f16,secondary:#ffffff"
                                                    style={{ width: "30px", height: "30px" }}>
                                                </lord-icon>
                                            </button>
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Vault
