import { Container, Link } from "@mui/material";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { PacmanLoader } from 'react-spinners';

const FeaturedSurveys = () => {


    const axios = useAxiosPublic();

    const {data: surveyData = [], isLoading} = useQuery({
        queryKey: ['featuredSurvey'],
        queryFn: async () => {
            const res = await axios.get('/surveys');
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

    surveyData.forEach(entry => {
        const dateObject = new Date(entry.timestamp);
        const formattedTimestamp = `${dateObject.toLocaleTimeString()} ${dateObject.toLocaleDateString()}`;
        entry.timestamp = formattedTimestamp;
    });

    const sortSurvey = surveyData.sort((a, b) => (b.options.yes + b.options.no) - (a.options.yes + a.options.no));

    return (
        <Container maxWidth='xl' sx={{ py: 12 }}>
            <Typography fontSize={{ xs: 20, sm: 36 }} sx={{ textAlign: 'center', fontWeight: 700 }}>
                Featured Surveys
            </Typography>
            <Typography color="text.secondary" fontSize={{ xs: 12, sm: 16 }} sx={{ textAlign: 'center', fontWeight: 400, mb: 6 }}>
                Most voted surveys
            </Typography>
            <Grid container spacing={6}>
                {
                    sortSurvey.splice(0, 6).map(item => <Grid key={item._id} item xs={12} sm={6} lg={4}>
                        <Link underline="none" href={`/details/${item._id}`}>
                            <Card sx={{ minWidth: 275, cursor: 'pointer' }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {item.category}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {item.title}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                       Posted time: {item.timestamp}
                                    </Typography>
                                    <Typography color="text.secondary" variant="body2" sx={{ minHeight: 80, mt: 1.5 }}>
                                        {item.description}
                                        <br />
                                    </Typography>
                                    <Grid sx={{ mt: 1.5, display: "flex", alignItems: 'center', gap: '4px' }}>
                                        <Typography color="text.secondary">
                                            Total vote:
                                        </Typography>
                                        <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>
                                            {item.options.yes + item.options.no}
                                        </Typography>
                                    </Grid>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>
                        </Link>
                    </Grid>)
                }

            </Grid>
        </Container >
    );
};

export default FeaturedSurveys;