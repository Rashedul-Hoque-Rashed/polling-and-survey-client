import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";


const AllPayments = () => {

    const axios = useAxios();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axios.get('/payments')
            return res.data
        }
    })

    payments.forEach(entry => {
        const dateObject = new Date(entry.date);
        const formattedDate = `${dateObject.toLocaleTimeString()} ${dateObject.toLocaleDateString()}`;
        entry.date = formattedDate;
    });

    console.log(payments)

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Package Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Date</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    payments.map((payment, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{payment.name}</TableCell>
                            <TableCell>{payment.email}</TableCell>
                            <TableCell>{payment.subscriptionName}</TableCell>
                            <TableCell>{payment.price}</TableCell>
                            <TableCell>{payment.date}</TableCell> 
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
};

export default AllPayments;