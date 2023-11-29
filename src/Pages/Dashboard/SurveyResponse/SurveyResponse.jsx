import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { Grid, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import { PacmanLoader } from 'react-spinners';
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

const SurveyResponse = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const axios = useAxios();

    const { data: votes = [], isLoading } = useQuery({
        queryKey: ['votes'],
        queryFn: async () => {
            const res = await axios.get('/votes')
            return res.data
        }
    })

    const { data: surveyResponse = [] } = useQuery({
        queryKey: ['surveyResponse'],
        queryFn: async () => {
            const res = await axios.get('/surveys')
            return res.data
        }
    })

    if (isLoading) {
        return <PacmanLoader
            color="#016A70"
            cssOverride={{ margin: '200px auto' }}
            margin={2}
            size={50}
        />
    }


    votes.forEach(entry => {
        const dateObject = new Date(entry.time);
        const formattedDate = `${dateObject.toLocaleTimeString()} ${dateObject.toLocaleDateString()}`;
        entry.time = formattedDate;
    });


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };




    return (
        <Grid>
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
            <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={votes.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            <BarChart style={{margin: '24px 0'}} width={950} height={450} data={surveyResponse}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="options.yes" fill="#8884d8" />
                <Bar dataKey="options.no" fill="#82ca9d" />
            </BarChart>
        </Grid>
    );
};


export default SurveyResponse;