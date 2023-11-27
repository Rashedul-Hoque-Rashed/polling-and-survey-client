import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Button, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { useState } from 'react';


const ManageUsers = () => {

    const [filteredRole, setFilteredRole] = useState('all');
    const axios = useAxios();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', filteredRole],
        queryFn: async () => {
            let url = '/users';
            if(filteredRole !== 'all'){
                url += `?role=${filteredRole}`
            }
            const res = await axios.get(url)
            return res.data
        }
    })



    const handleRole = (user, role) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You will make him ${role}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`/users/${user._id}`, { role })
                    .then(res => {
                        if (res?.data?.modifiedCount > 0) {
                            Swal.fire({
                                title: "Congress!",
                                text: `${user.name} is an ${role} now`,
                                icon: "success"
                            });
                            refetch();
                        }
                    })

            }
        });
    }

    const handleDelete = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, delete ${user.name}!`
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/users/${user._id}`)
                .then(res => {
                    if(res?.data?.deletedCount > 0){
                        Swal.fire({
                            title: "Deleted!",
                            text: "User has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    }
                })
                
            }
        });
    }


    return (
        <Paper>
            <div>
                <Select value={filteredRole} onChange={(e) => setFilteredRole(e.target.value)}>
                    <MenuItem value='all'>All Roles</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="pro-user">Pro User</MenuItem>
                    <MenuItem value="surveyor">Surveyor</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                </Select>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Select
                                        sx={{ height: '30px' }}
                                        value={user.role}
                                        name='role'
                                        onChange={(e) => handleRole(user, e.target.value)}
                                    >
                                        <MenuItem value="user">User</MenuItem>
                                        <MenuItem value="pro-user">Pro-User</MenuItem>
                                        <MenuItem value="surveyor">Surveyor</MenuItem>
                                        <MenuItem value="admin">Admin</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDelete(user)} color='error'>
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Paper>
    );
}

export default ManageUsers;