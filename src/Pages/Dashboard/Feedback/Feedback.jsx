import { Box, Button, Grid, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { useState } from "react";
import FeedbackIcon from '@mui/icons-material/Feedback';
import { PacmanLoader } from 'react-spinners';




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
};


const Feedback = () => {


    const [adminPage, setAdminPage] = useState(0);
    const [userPage, setUserPage] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [report, setReport] = useState('');
    const [adminRowsPerPage, setAdminRowsPerPage] = useState(5);
    const [userRowsPerPage, setUserRowsPerPage] = useState(5);
    const [adminOpen, setAdminOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);
    const axios = useAxios();

    const { data: feedbackSurvey = [], isLoading } = useQuery({
        queryKey: ['feedbackSurvey'],
        queryFn: async () => {
            const res = await axios.get('/surveys')
            return res.data
        }
    })

    const { data: reportSurvey = []} = useQuery({
        queryKey: ['reportSurvey'],
        queryFn: async () => {
            const res = await axios.get('/reports')
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


    const handleChangeAdminPage = (event, newPage) => {
        setAdminPage(newPage);
    };
    const handleChangeUserPage = (event, newPage) => {
        setUserPage(newPage);
    };

    const handleChangeAdminRowsPerPage = (event) => {
        setAdminRowsPerPage(parseInt(event.target.value, 10));
        setAdminPage(0);
    };
    const handleChangeUserRowsPerPage = (event) => {
        setUserRowsPerPage(parseInt(event.target.value, 10));
        setUserPage(0);
    };


    const handleAdminOpen = (feedbackMessage) => {
        setFeedback(feedbackMessage);
        setAdminOpen(true)
    };
    const handleAdminClose = () => setAdminOpen(false);

    const handleUserOpen = (report) => {
        setReport(report);
        setUserOpen(true)
    };
    const handleUserClose = () => setUserOpen(false);


    return (
            <Grid>
                <TableContainer component={Grid}>
                <Grid>
                    <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 600, py: '32px' }}>
                        Admin Feedback
                    </Typography>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>status</TableCell>
                            <TableCell>Feedback</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            feedbackSurvey.slice(adminPage * adminRowsPerPage, adminPage * adminRowsPerPage + adminRowsPerPage).map((survey) => (
                                <TableRow key={survey._id}>
                                    <TableCell>{survey.title}</TableCell>
                                    <TableCell>{survey.category}</TableCell>
                                    <TableCell>{survey.status}</TableCell>
                                    <TableCell>{survey.feedback ? <Button
                                        variant="contained" color='success'
                                        sx={{ fontWeight: 600 }} onClick={() => handleAdminOpen(survey.feedback)}
                                        startIcon={<FeedbackIcon />}
                                    >
                                        See Feedback
                                    </Button> : ''}
                                        <Modal
                                            open={adminOpen}
                                            onClose={handleAdminClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    Feedback Message:
                                                </Typography>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    {feedback}
                                                </Typography>
                                            </Box>
                                        </Modal>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={feedbackSurvey.length}
                    rowsPerPage={adminRowsPerPage}
                    page={adminPage}
                    onPageChange={handleChangeAdminPage}
                    onRowsPerPageChange={handleChangeAdminRowsPerPage}
                />
            </TableContainer> 

            <TableContainer component={Grid}>
            <Grid>
                <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 600, py: '32px' }}>
                Users Report
                </Typography>
            </Grid>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Report</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        reportSurvey.slice(userPage * userRowsPerPage, userPage * userRowsPerPage + userRowsPerPage).map((survey) => (
                            <TableRow key={survey._id}>
                                <TableCell>{survey.title}</TableCell>
                                <TableCell>{survey.name}</TableCell>
                                <TableCell>{survey.email}</TableCell>
                                <TableCell>{survey.report ? <Button
                                    variant="contained" color='error'
                                    sx={{ fontWeight: 600 }} onClick={() => handleUserOpen(survey.report)}
                                    startIcon={<FeedbackIcon />}
                                >
                                    See Report
                                </Button> : ''}
                                    <Modal
                                        open={userOpen}
                                        onClose={handleUserClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Report:
                                            </Typography>
                                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                {report}
                                            </Typography>
                                        </Box>
                                    </Modal>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={reportSurvey.length}
                rowsPerPage={userRowsPerPage}
                page={userPage}
                onPageChange={handleChangeUserPage}
                onRowsPerPageChange={handleChangeUserRowsPerPage}
            />
        </TableContainer>
            </Grid>
    );
};

export default Feedback;