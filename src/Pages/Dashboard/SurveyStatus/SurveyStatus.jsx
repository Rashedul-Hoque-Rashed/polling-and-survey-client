import { Box, Button, Grid, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
// import { DeleteIcon } from '@mui/icons-material/Delete';
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
import Swal from "sweetalert2";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState } from "react";
import { PacmanLoader } from 'react-spinners';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
};

const SurveyStatus = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const axios = useAxios();

    const { data: surveys = [], refetch, isLoading } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axios.get('/surveys')
            return res.data
        }
    })

    if (isLoading) {
        return <PacmanLoader
        color="#016A70"
        cssOverride={{margin: '200px auto'}}
        margin={2}
        size={50}
    />
    }


    const handleStatus = (id, status, feedback) => {
        
                axios.put(`/survey/${id}`, { status, feedback })
                    .then(res => {
                        if (res?.data?.modifiedCount > 0) {
                            Swal.fire({
                                title: "Congress!",
                                text: `This survey is ${status} now`,
                                icon: "success"
                            });
                            refetch();
                        }
                    })

            }

    surveys.forEach(entry => {
        const dateObject = new Date(entry.timestamp);
        const formattedTimestamp = `${dateObject.toLocaleTimeString()} ${dateObject.toLocaleDateString()}`;
        entry.timestamp = formattedTimestamp;
    });

    console.log(surveys)


    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Posted time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    surveys.map((survey, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{survey.title}</TableCell>
                            <TableCell>{survey.category}</TableCell>
                            <TableCell>{survey.timestamp}</TableCell>
                            <TableCell>{survey.status}</TableCell>
                            <TableCell>
                                {
                                    survey.status === 'pending' && <Grid sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Button variant="contained" color='success'
                                            onClick={() => handleStatus(survey._id, 'published')}>
                                            Published
                                        </Button>
                                        <Button variant="contained" color='error'
                                           onClick={handleOpen} >
                                            Unpublished
                                        </Button>
                                        <Modal
                                open={open}
                                onClose={handleClose}
                            >
                                <Box sx={style}>
                                    <form className="comment-form" onSubmit={(e) => handleStatus(survey._id, 'unpublished', e.target.feedback.value)}>
                                        <TextField id="outlined-basic"
                                            name="feedback" label="Write your feedback" variant="outlined" sx={{ width: '70%' }} />
                                        <button className="comment" type="submit">Feedback</button>
                                    </form>
                                </Box>
                            </Modal>
                                    </Grid>
                                }
                                {
                                    survey.status === 'published' &&
                                    <Button variant="contained" color='success'>
                                        <CheckCircleIcon />
                                    </Button>
                                }
                                {
                                    survey.status === 'unpublished' &&
                                    <Button variant="contained" color='error'>
                                        <HighlightOffIcon />
                                    </Button>
                                }
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
};

export default SurveyStatus;