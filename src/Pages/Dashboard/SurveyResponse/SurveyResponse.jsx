import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const SurveyResponse = () => {


    const axios = useAxios();

    const { data: votes = [] } = useQuery({
        queryKey: ['votes'],
        queryFn: async () => {
            const res = await axios.get('/votes')
            return res.data
        }
    })


    votes.forEach(entry => {
        const dateObject = new Date(entry.time);
        const formattedDate = `${dateObject.toLocaleTimeString()} ${dateObject.toLocaleDateString()}`;
        entry.time = formattedDate;
    });



    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Vote</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    votes.map((vote, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{vote.name}</TableCell>
                            <TableCell>{vote.email}</TableCell>
                            <TableCell>{vote.time}</TableCell>
                            <TableCell>{vote.vote}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
};

export default SurveyResponse;