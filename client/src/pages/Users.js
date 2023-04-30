import { useState, useEffect, useContext } from 'react';
import { MainContext } from '../components/MainContext';

const Users = () => {
    const [data, setData] = useState(null);
    const { urlRoot } = useContext(MainContext);
    const Row = ({ username, password }) => {
        return(
            <tr>
                <td>{username}</td>
                <td>{password}</td>
            </tr>
        )
    }
    useEffect(() => {
        const getUsers = async () => {
            const response = await fetch(`/api/users.php`)
            const data = await response.json()
            setData(data)
            console.log(data)
        }
        return getUsers
    }, [])
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((row, index) => {
                        return(
                            <Row key={index} username={row.Name} password={row.Pass} />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export {
    Users
}