import { useState, useEffect, useContext } from 'react';
import { MainContext } from '../components/MainContext';

const Home = () => {
    const { username } = useContext(MainContext)
    const User = () => {
        return(
            <div className='flex flex-col justify-center items-center'>
                <h1>Welcome</h1>
                <h2>{username}</h2>
            </div>
        )
    }
    const Login = () => {
        return(
            <div>
                <a className='py-1 px-3 rounded-lg bg-blue-300' href="/login">Login</a>
            </div>
        )
    }
    console.log(username)
    return(
        <div className='p-2 bg-blue-100 flex flex-row justify-between items-center'>
            <h1>Traders Notes</h1>
            {username != '' ? <User /> : <Login />}
        </div>
    )
}

export {
    Home
}