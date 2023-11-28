import { Button, Card, CardActions, CardContent, Container, Grid, Modal, TextField, Typography } from "@mui/material";
import { Form, useLoaderData } from "react-router-dom";
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import { useContext, useEffect, useState } from "react";
import './SurveyDetails.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
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


const SurveyDetails = () => {
    const survey = useLoaderData();
    const { user } = useContext(AuthContext);
    const axios = useAxiosPublic();
    const [currentUser, setCurrentUser] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [like, setLike] = useState(survey.likes);
    const [dislike, setDislike] = useState(survey.dislikes);
    const [userHasLike, setUserHasLike] = useState(false);
    const [userHasDislike, setUserHasDislike] = useState(false);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        axios.get('/users')
            .then(res => {
                setCurrentUser(res.data)
            })
    }, [axios])

    const userRole = currentUser.find(role => role?.email === user?.email)

    console.log(userRole)

    


    const { data: proUserComments = [], isLoading, refetch } = useQuery({
        queryKey: ['comment'],
        queryFn: async () => {
            const res = await axios.get('/comments')
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

    console.log(proUserComments)


    const dateObject = new Date(survey.timestamp);
    const formattedTimestamp = `${dateObject.toLocaleTimeString()} ${dateObject.toLocaleDateString()}`;
    survey.timestamp = formattedTimestamp;


    const { _id, title, description, options, category, timestamp } = survey


    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleLike = () => {
        if (userHasLike) {
            setLike(like - 1);
        } else {
            setLike(like + 1);
        }

        setUserHasLike(!userHasLike);
    };

    const handleDislike = () => {
        if (userHasDislike) {
            setDislike(dislike - 1);
        } else {
            setDislike(dislike + 1);
        }

        setUserHasDislike(!userHasDislike);
    };

    const handleComment = async (e) => {
        e.preventDefault();
        const form = e.target;
        const comment = form.comment.value;
        const commentData = {
            name: user?.displayName,
            email: user?.email,
            comment: comment,
            surveyId: _id,
            surveyTitle: title
        }
        const comments = await axios.post('/comments', commentData)
        if (comments.data.insertedId) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Your comment added successfully.`,
                showConfirmButton: false,
                timer: 1500
            });
            form.reset();
            refetch();
        }
    }

    const handleVote = async (e) => {
        e.preventDefault();
        const yes = e.target.yes.checked;
        const voteData = {
            name: user.displayName,
            email: user.email,
            surveyId: survey._id,
            vote: yes ? "yes" : "no",
            time: new Date,
        }

        const vote = await axios.post('/votes', voteData)
        if (vote.data.insertedId) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Your opinion added successfully.`,
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `Your opinion already added.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }


    const handleReport = async (value) => {
        const report = {
            name: user?.displayName,
            email: user?.email,
            report: value,
            title: title,
            surveyId: _id
        }
        const reportData = await axios.post('/reports', report)
        if (reportData.data.insertedId) {
            console.log(reportData.data.insertedId)
        }

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Your report added successfully.`,
            showConfirmButton: false,
            timer: 1500
        });
    }


    return (
        <Container maxWidth='xl' sx={{ py: 6 }}>
            <Card sx={{ minWidth: 275, cursor: 'pointer' }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {category}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Posted time: {timestamp}
                    </Typography>
                    <Typography color="text.secondary" variant="body2" sx={{ mt: 1.5 }}>
                        {description}
                        <br />
                    </Typography>
                    <Grid sx={{ mt: 4, display: "flex", alignItems: 'center', gap: '4px' }}>
                        <Typography color="text.secondary">
                            Total vote:
                        </Typography>
                        <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>
                            {options.yes + options.no}
                        </Typography>
                    </Grid>
                    <Grid sx={{ mt: 1.5, display: "flex", alignItems: 'center', gap: '4px' }}>
                        <Typography color="text.secondary">
                            Your opinion:
                        </Typography>
                        <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>
                            <Form onSubmit={handleVote} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                <Checkbox
                                    checked={selectedValue === 'yes'}
                                    label="Yes"
                                    name="yes"
                                    color="success"
                                    onChange={handleChange}
                                    value="yes"
                                    slotProps={{ input: { 'aria-label': 'Yes' } }} />
                                <Checkbox
                                    checked={selectedValue === 'no'}
                                    label="No"
                                    name="no"
                                    color="danger"
                                    onChange={handleChange}
                                    value="no"
                                    slotProps={{ input: { 'aria-label': 'No' } }} />
                                <Button type="submit" variant="contained"
                                disabled={!user}>
                                    submit
                                </Button>
                            </Form>
                        </Typography>
                    </Grid>
                    <Grid sx={{ mt: 1.5 }}>
                        <Button onClick={handleLike}
                            sx={{ fontWeight: userHasLike ? 'bold' : 'normal', textTransform: 'none' }}
                            color="primary"
                            startIcon={<ThumbUpIcon />}
                        >
                            Like ({like})
                        </Button>
                        <Button onClick={handleDislike}
                            sx={{ fontWeight: userHasDislike ? 'bold' : 'normal', textTransform: 'none' }}
                            color="error"
                            startIcon={<ThumbDownIcon />}
                        >
                            Dislike ({dislike})
                        </Button>
                    </Grid>
                    <Grid sx={{ mt: 1.5 }}>
                        <form className="comment-form" onSubmit={handleComment}>
                            <TextField id="outlined-basic"
                                name="comment" label="Add a comment" variant="outlined" sx={{ width: '70%' }} />
                            <button disabled={userRole?.role !== 'pro-user'} className="comment" type="submit">Comment</button>
                        </form>
                    </Grid>
                    <Button sx={{ textTransform: 'none', textDecoration: 'underline', mb: 2 }} onClick={handleOpen}>Report any problem</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <form className="comment-form" onSubmit={(e) => {
                                e.preventDefault();
                                handleReport(e.target.report.value)
                            }}>
                                <TextField id="outlined-basic"
                                    name="report" label="Write your report" variant="outlined" sx={{ width: '70%' }} />
                                <button className="comment" type="submit" disabled={!user}>Report</button>
                            </form>
                        </Box>
                    </Modal>
                    <Grid>
                        <Typography variant="subtitle1" sx={{ fontSize: '16px', fontWeight: 700 }}>
                            All Comments:
                        </Typography>
                        {
                            proUserComments.map((comment) => (
                                <Grid key={comment._id}>
                                    {
                                        comment.surveyId === _id && <Grid>
                                            <Typography variant="subtitle1" sx={{ fontSize: '16px', fontWeight: 600, mt:2, color: '#444' }}>
                                                {comment.name}
                                            </Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: '16px', fontWeight: 400, color: '#444' }}>
                                                {comment.comment}
                                            </Typography>
                                        </Grid>
                                    }
                                </Grid>
                            ))
                        }
                    </Grid>
                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
        </Container>
    );
};

export default SurveyDetails;