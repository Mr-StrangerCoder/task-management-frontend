import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import { Table, Form, Card } from 'react-bootstrap'

const AllUsers = () => {

    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])

    async function fetchUsers() {
        try {

            const res = await axiosInstance.get('/user/getAllUsers')
            // console.log(res.data, "0000000000000000000000000")

            if (res.data.success) {
               setUsers(res.data.allUsers || [])
setFilteredUsers(res.data.allUsers || [])
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {

        let data = [...users]

        if (search) {
            data = data.filter(u =>
                u.name.toLowerCase().includes(search.toLowerCase())
            )
        }

        setFilteredUsers(data)

    }, [search, users])

    return (
        <Card className="shadow-sm">
            <Card.Body>

                <h4 className="mb-3 text-primary">All Users</h4>

                <Form.Control
                    placeholder="Search by name"
                    className="mb-3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Table bordered hover responsive>

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredUsers?.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <tr key={user.id || index}>
                                    <td>{index + 1}</td>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No users found
                                </td>
                            </tr>
                        )}

                    </tbody>

                </Table>

            </Card.Body>
        </Card>
    )
}

export default AllUsers