import { Container, Link } from "@mui/material";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const Survey = () => {

    const axios = useAxiosPublic();

    const {data: surveyData = []} = useQuery({
        queryKey: ['survey'],
        queryFn: async () => {
            const res = await axios.get('/surveys');
            return res.data
        }
    })

    surveyData.forEach(entry => {
        const dateObject = new Date(entry.timestamp);
        const formattedTimestamp = `${dateObject.toLocaleTimeString()} ${dateObject.toLocaleDateString()}`;
        entry.timestamp = formattedTimestamp;
    });


    return (
        <Container maxWidth='xl' sx={{ py: 6 }}>
            <Select
                placeholder="Filter by…"
                indicator={<KeyboardArrowDown />}
                sx={{
                    width: 240,
                    [`& .${selectClasses.indicator}`]: {
                        transition: '0.2s',
                        [`&.${selectClasses.expanded}`]: {
                            transform: 'rotate(-180deg)',
                        },
                    },
                }}
            >
                <Option value="title">Title</Option>
                <Option value="category">Category</Option>
                <Option value="vote">Vote</Option>
            </Select>
            <Grid container spacing={6} sx={{ py: 5 }}>
                {
                    surveyData.map(item => <Grid key={item._id} item xs={12} sm={6} lg={4}>
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

export default Survey;