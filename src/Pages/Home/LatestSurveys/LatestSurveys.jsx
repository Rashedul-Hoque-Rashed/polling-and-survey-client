import { Container } from "@mui/material";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const LatestSurveys = () => {


    const surveyData = [
        {
            "title": "Customer Satisfaction",
            "description": "Please share your thoughts on our products and services. Your feedback is valuable and helps us improve. We appreciate your time and honesty.",
            "options": {
                "yes": 15,
                "no": 3
            },
            "like": 15,
            "dislike": 3,
            "category": "Business",
            "timestamp": "2023-11-23T12:30:00Z"
        },
        {
            "title": "Workplace Environment",
            "description": "Tell us about your satisfaction with the current workplace environment. Your input is crucial for creating a positive and productive work atmosphere.",
            "options": {
                "yes": 10,
                "no": 2
            },
            "like": 10,
            "dislike": 2,
            "category": "Employee Engagement",
            "timestamp": "2023-11-23T13:15:00Z"
        },
        {
            "title": "Favorite Travel Destinations",
            "description": "Share your favorite travel destinations and experiences. Your insights will help others discover amazing places and plan memorable trips.",
            "options": {
                "yes": 20,
                "no": 1
            },
            "like": 20,
            "dislike": 1,
            "category": "Travel and Tourism",
            "timestamp": "2023-11-23T14:00:00Z"
        },
        {
            "title": "Product Usability",
            "description": "Rate the usability of our latest product. Your feedback shapes future improvements, ensuring a user-friendly experience for all our customers.",
            "options": {
                "yes": 18,
                "no": 4
            },
            "like": 18,
            "dislike": 4,
            "category": "Technology",
            "timestamp": "2023-11-23T14:45:00Z"
        },
        {
            "title": "Community Engagement",
            "description": "Share your thoughts on community engagement initiatives. Your opinions contribute to building a stronger and more connected community for everyone.",
            "options": {
                "yes": 12,
                "no": 2
            },
            "like": 12,
            "dislike": 2,
            "category": "Social Issues",
            "timestamp": "2023-11-23T15:30:00Z"
        },
        {
            "title": "Healthy Lifestyle Habits",
            "description": "Tell us how often you engage in healthy lifestyle habits. Your habits inspire and motivate others to lead a healthier life.",
            "options": {
                "yes": 22,
                "no": 0
            },
            "like": 22,
            "dislike": 0,
            "category": "Health and Wellness",
            "timestamp": "2023-11-23T16:15:00Z"
        },
        {
            "title": "Online Learning Experience",
            "description": "Share your experience with online learning platforms. Your insights help improve the quality of online education for learners worldwide.",
            "options": {
                "yes": 14,
                "no": 3
            },
            "like": 14,
            "dislike": 3,
            "category": "Education",
            "timestamp": "2023-11-23T17:00:00Z"
        },
        {
            "title": "Feedback on Events",
            "description": "Provide feedback on recent events you attended. Your feedback helps us enhance future events and create memorable experiences for all participants.",
            "options": {
                "yes": 19,
                "no": 1
            },
            "like": 19,
            "dislike": 1,
            "category": "Event Feedback",
            "timestamp": "2023-11-23T17:45:00Z"
        },
        {
            "title": "Political Opinions",
            "description": "Share your opinions on current political issues. Your views contribute to a better understanding of public sentiment and shape discussions on important topics.",
            "options": {
                "yes": 16,
                "no": 5
            },
            "like": 16,
            "dislike": 5,
            "category": "Political",
            "timestamp": "2023-11-23T18:30:00Z"
        },
        {
            "title": "Brand Awareness",
            "description": "How familiar are you with our brand? Your awareness helps us gauge our market presence and improve our brand communication.",
            "options": {
                "yes": 13,
                "no": 2
            },
            "like": 13,
            "dislike": 2,
            "category": "Market Research",
            "timestamp": "2023-11-23T19:15:00Z"
        },
        {
            "title": "Environmental Concerns",
            "description": "Share your thoughts on environmental issues. Your opinions contribute to a better understanding of community concerns and guide environmental initiatives.",
            "options": {
                "yes": 21,
                "no": 0
            },
            "like": 21,
            "dislike": 0,
            "category": "Social Issues",
            "timestamp": "2023-11-23T20:00:00Z"
        },
        {
            "title": "Technology Preferences",
            "description": "What are your preferences when it comes to technology? Your insights help us tailor our technological offerings to meet user expectations.",
            "options": {
                "yes": 17,
                "no": 3
            },
            "like": 17,
            "dislike": 3,
            "category": "Technology",
            "timestamp": "2023-11-23T20:45:00Z"
        },
    ]

    const sortSurvey = surveyData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    console.log(sortSurvey)

    return (
        <Container maxWidth='xl' sx={{ pb: 12 }}>
            <Typography fontSize={{ xs: 20, sm: 36 }} sx={{ textAlign: 'center', fontWeight: 700 }}>
                Latest Surveys
            </Typography>
            <Typography color="text.secondary" fontSize={{ xs: 12, sm: 16 }} sx={{ textAlign: 'center', fontWeight: 400, mb: 6 }}>
                Recently added survey
            </Typography>
            <Grid container spacing={6}>
                {
                    sortSurvey.splice(0, 6).map(item => <Grid key={item.title} item xs={12} sm={6} lg={4}>
                        <Card sx={{ minWidth: 275, cursor: 'pointer' }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {item.category}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {item.title}
                                </Typography>
                                <Typography color="text.secondary" variant="body2" sx={{ minHeight: 80, mt: 1 }}>
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
                    </Grid>)
                }

            </Grid>
        </Container >
    );
};

export default LatestSurveys;