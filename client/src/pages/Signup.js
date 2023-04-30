import { useState, useEffect, useContext } from 'react';
import { MainContext } from '../components/MainContext';
import axios from 'axios';

const Signup = () => {
    const { urlRoot } = useContext(MainContext)
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [passconfirm, setPassconfirm] = useState('')
    const [result, setResult] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (pass == passconfirm) {
            const data = {
                'username': name,
                'password': pass,
            }
            axios.post(`/api/signup.php`, data)
                .then((response) => {
                    setResult(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            console.log('signup failed')
        }
    }
    useEffect(() => {
        console.log(result)
    }, [result])
    return(
        <div className='w-full flex flex-col justify-center items-center p-4'>
            <h1 className='mb-1'>Signup</h1>
            <form onSubmit={handleSubmit} className='w-fit flex flex-col justify-center items-start'>
                <input value={name} onChange={(event) => setName(event.target.value)} className="mb-1 border border-1 rounded-lg p-1" type="text" placeholder='Username' />
                <input value={pass} onChange={(event) => setPass(event.target.value)} className="mb-1 border border-1 rounded-lg p-1" type="password" placeholder='Password' />
                <input value={passconfirm} onChange={(event) => setPassconfirm(event.target.value)} className="mb-1 border border-1 rounded-lg p-1" type="password" placeholder='Confirm Password' />
                <input className="py-1 px-2 bg-blue-300 rounded" type="submit" value="Signup" />
            </form>
        </div>
    )
}

export {
    Signup
}