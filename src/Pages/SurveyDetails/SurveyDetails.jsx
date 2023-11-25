import { Button, Card, CardActions, CardContent, Container, Grid, TextField, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import { useState } from "react";
import './SurveyDetails.css'


const SurveyDetails = () => {

    const survey = useLoaderData();

    const dateObject = new Date(survey.timestamp);
    const formattedTimestamp = `${dateObject.toLocaleTimeString()} ${dateObject.toLocaleDateString()}`;
    survey.timestamp = formattedTimestamp;


    const { title, description, options, like, dislike, category, timestamp } = survey


    const [selectedValue, setSelectedValue] = useState('');
    const [likes, setLikes] = useState(like);
    const [dislikes, setDislikes] = useState(dislike);
    const [comments, setComments] = useState([]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleDislike = () => {
        setDislikes(dislikes + 1);
    };

    const handleComment = (e) => {
        e.preventDefault();
        const form = e.target;
        const comment = form.comment.value;
        setComments([...comments, comment]);
        form.reset()
    };


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
                    <Grid container spacing={2} sx={{ mt: 1.5, justifyItems: 'start', alignItems: 'center' }}>
                        <Grid item xs={2}>
                            <Button onClick={handleLike} color="primary">
                                Like ({likes})
                            </Button>
                            <Button onClick={handleDislike} color="secondary">
                                Dislike ({dislikes})
                            </Button>
                        </Grid>
                        <Grid item xs={10}>
                            <form onSubmit={handleComment}>
                                {/* <Input
                                    name="comment"
                                    placeholder="Add a comment..."
                                /> */}
                                 <TextField id="outlined-basic"
                                 name="comment" label="Add a comment" variant="outlined" sx={{width: '70%'}}/>
                                <Button className="cmd-btn" variant="contained" type="submit" sx={{px: '24px', py: '16px', borderRadius: '8px', color: 'white', backgroundColor: '#016A70', fontSize: '14px', fontWeight: 700, ml: 2}}>Comment</Button>
                            </form>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Typography variant="subtitle1">Comments:</Typography>
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