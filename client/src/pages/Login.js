import { useState, useEffect, useContext } from 'react';
import { MainContext } from '../components/MainContext';
import axios from 'axios';

const Login = () => {
    const { setUsername } = useContext(MainContext)
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [result, setResult] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            username: name,
            password: pass,
        }
        console.log(data)
        axios.post(`/api/login.php`, data)
            .then((response) => {
                setResult(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        if (result != null) {
            if (result.status === 'success') {
                console.log('login success')
                setUsername(name)
                window.location.href = '/'
            } else {
                alert(`Error: ${result.message}`)
            }
        }
    }, [result])
    return(
        <div className='flex flex-col w-full justify-center items-center p-4'>
            <h1 className='mb-2'>Login</h1>
            <form onSubmit={handleSubmit} className='flex flex-col w-fit justify-center items-start p-4 border border-1 rounded-lg'>
                <input value={name} onChange={(event) => setName(event.target.value)} className='p-2 border border-1 rounded-lg mb-1 ' type="text" placeholder='Enter username' />
                <input value={pass} onChange={(event) => setPass(event.target.value)} className='p-2 border border-1 rounded-lg mb-1 ' type="password" placeholder='Enter password'/>
                <input className='px-4 py-2 bg-blue-300 rounded-lg' type='submit' value='Login' />
            </form>
        </div>
    )
}

export {
    Login
}