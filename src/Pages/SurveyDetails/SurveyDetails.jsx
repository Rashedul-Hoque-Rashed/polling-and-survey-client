import { Button, Card, CardActions, CardContent, Container, Grid, Modal, TextField, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import { useState } from "react";
import './SurveyDetails.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';


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

    const dateObject = new Date(survey.timestamp);
    const formattedTimestamp = `${dateObject.toLocaleTimeString()} ${dateObject.toLocaleDateString()}`;
    survey.timestamp = formattedTimestamp;


    const { title, description, options, like, dislike, category, timestamp } = survey


    const [selectedValue, setSelectedValue] = useState('');
    const [likes, setLikes] = useState(like);
    const [dislikes, setDislikes] = useState(dislike);
    const [userHasLike, setUserHasLike] = useState(false);
    const [userHasDislike, setUserHasDislike] = useState(false);
    const [comments, setComments] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleLike = () => {
        if (userHasLike) {
            setLikes(likes - 1);
          } else {
            setLikes(likes + 1);
          }
      
          setUserHasLike(!userHasLike);
    };

    const handleDislike = () => {
        if (userHasDislike) {
            setDislikes(dislikes - 1);
          } else {
            setDislikes(dislikes + 1);
          }
      
          setUserHasDislike(!userHasDislike);
    };

    const handleComment = (e) => {
        e.preventDefault();
        const form = e.target;
        const comment = form.comment.value;
        setComments([...comments, comment]);
        form.reset()
    };

    console.log(selectedValue)

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
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                                <Checkbox
                                    checked={selectedValue === 'yes'}
                                    label="Yes"
                                    color="success"
                                    onChange={handleChange}
                                    value="yes"
                                    slotProps={{ input: { 'aria-label': 'Yes' } }} />
                                <Checkbox
                                    checked={selectedValue === 'no'}
                                    label="No"
                                    color="danger"
                                    onChange={handleChange}
                                    value="no"
                                    slotProps={{ input: { 'aria-label': 'No' } }} />
                            </Box>
                        </Typography>
                    </Grid>
                        <Grid sx={{mt: 1.5}}>
                            <Button onClick={handleLike}
                            sx={{ fontWeight: userHasLike ? 'bold' : 'normal', textTransform: 'none' }}
                            color="primary"
                            startIcon={<ThumbUpIcon />}
                            >
                                Like ({likes})
                            </Button>
                            <Button onClick={handleDislike}
                            sx={{ fontWeight: userHasDislike ? 'bold' : 'normal', textTransform: 'none' }}
                            color="error"
                            startIcon={<ThumbDownIcon />}
                            >
                                Dislike ({dislikes})
                            </Button>
                        </Grid>
                        <Grid sx={{mt: 1.5}}>
                            <form className="comment-form" onSubmit={handleComment}>
                                <TextField id="outlined-basic"
                                    name="comment" label="Add a comment" variant="outlined" sx={{ width: '70%' }} />
                                <button className="comment" type="submit">Comment</button>
                            </form>
                        </Grid>
                        <Button sx={{textTransform: 'none', textDecoration: 'underline', mb: 2}} onClick={handleOpen}>Report any problem</Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <form className="comment-form" onSubmit={handleComment}>
                                        <TextField id="outlined-basic"
                                            name="comment" label="Write your report" variant="outlined" sx={{ width: '70%' }} />
                                        <button className="comment" type="submit">Report</button>
                                    </form>
                                </Box>
                            </Modal>
                    <Grid>
                        <Typography variant="subtitle1" sx={{fontSize: '16px', fontWeight: 700}}>All Comments:</Typography>
                        {comments.map((comment, index) => (
                            <Grid key={index}>{comment}</Grid>
                        ))}
                    </Grid>
                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
        </Container>
    );
};

export default SurveyDetails;