import { useState, useEffect, useContext } from 'react';
import { MainContext } from '../components/MainContext';
import axios from 'axios';

const Home = () => {
    const { username, setUsername } = useContext(MainContext)
    const [table, setTable] = useState([])
    const [input, setInput] = useState(false)
    const [trade, setTrade] = useState('')
    const [type, setType] = useState('')
    const [result, setResult] = useState('')
    const [timeframe, setTimeframe] = useState('')
    const [broker, setBroker] = useState('')
    const logout = () => {
        setUsername('')
        localStorage.setItem('username', '')
    }
    const loadTable = () => {
        axios.post('/api/table.php', { 'uname': username })
            .then(response => {
                setTable(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    const addToTable = () => {
        console.log('add to table')
    }
    const Button = () => {
        return (
            <div className='py-2'>
                <button onClick={setInput(true)} className='bg-blue-300 px-4 py-2 rounded-lg'>
                    Update
                </button>
            </div>
        )
    }
    const Input = () => {
        return (
            <form onSubmit={addToTable()} className='p-2 border border-1 rounded-lg w-fit flex flex-col '>
                <label htmlFor="trade">Select trade: </label>
                <select name="options" id="options" value={trade} onChange={(event) => setTrade(event.target.value)}>
                    <option value="">--- Select ---</option>
                    <option value="Buy">Buy</option>
                    <option value="Sell">Sell</option>
                </select>
            </form>
        )
    }
    const User = () => {
        return(
            <div className='flex flex-col justify-center items-center'>
                <h1>Welcome</h1>
                <h2 className='cursor-pointer' onClick={logout}>{username}</h2>
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
    const NonAuth = () => {
        return(
            <div className='font-bold text-2xl'>Login to view table</div>
        )
    }
    const Table = () => {
        let keys
        if (typeof table === 'object') {
            keys = Object.keys(table[0])
        }
        return(
            <table className='w-full mt-1'>
                <thead>
                    <tr>
                        {keys.map(item => <th className='border border-2 bg-gray-200' key={item}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {table.map(row => {
                        return (
                            <tr>
                                {keys.map(item => <td className='border border-1 bg-gray-50' key={item}>{row[item]}</td>)}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
    const Auth = () => {
        return (
            <div>
                {table.length > 0 ? <Table /> : <div className="cursor-pointer" onClick={loadTable}>Click to load table</div>}
            </div>
        )
    }
    return(
        <div className='w-full p-4'>
            <div className='p-2 bg-blue-100 flex flex-row justify-between items-center mb-2'>
                <h1>Traders Notes</h1>
                {username != '' ? <User /> : <Login />}
            </div>
            {input ? <Button /> : <Input />}
            {username != '' ? <Auth /> : <NonAuth />}
        </div>
    )
}

export {
    Home
}
