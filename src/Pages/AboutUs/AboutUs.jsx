import { Grid, Typography } from "@mui/material";


const AboutUs = () => {
    return (
        <Grid sx={{mt: 6, mb: 26, mx: 2}}>
            <Typography sx={{fontSize: '24px', fontWeight: 800, mb: 2}}>
            About Us
            </Typography>
            <Typography sx={{fontSize: '20px', fontWeight: 500, mb: 1}}>
            Welcome to Survey, where passion meets purpose. At the heart of our platform is a commitment to delivering an exceptional experience tailored just for you.
            </Typography>
            <Typography sx={{fontSize: '20px', fontWeight: 500, mb: 1}}>
            Our journey began with a simple idea: every piece of content, every feature, and every interaction is crafted with meticulous care to ensure a seamless and enriching experience for our users.
            </Typography>
            <Typography sx={{fontSize: '20px', fontWeight: 500, mb: 1}}>
            Your support fuels our passion, and together, we are building a community. Thank you for being a part of the Survey family. Lets explore, learn, and grow together!
            </Typography>
        </Grid>
    );
};

export default AboutUs;