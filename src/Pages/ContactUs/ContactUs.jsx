import { Grid, Link, Typography } from "@mui/material";


const ContactUs = () => {
    return (
        <Grid sx={{mt: 6, mx: 2, mb: 30}}>
            <Typography sx={{fontSize: '24px', fontWeight: 800, mb: 2}}>
                Contact Us
            </Typography>
            <Typography sx={{fontSize: '20px', fontWeight: 500, mb: 1}}>
                We value your feedback and would love to hear from you! If you have any questions, suggestions, or just want to say hello, feel free to reach out to us at <Link sx={{cursor: 'pointer'}}>survey@gmail.com</Link>.
            </Typography>
            <Typography sx={{fontSize: '20px', fontWeight: 500, mb: 1}}>
                Thank you for being a part of the Survey community!
            </Typography>
            <Typography sx={{fontSize: '20px', fontWeight: 500, mb: 1}}>
                Remember to customize this template with specific details about your website, its mission, and the team members. Include any unique features, achievements, or milestones that set your website apart.
            </Typography>
        </Grid>
    );
};

export default ContactUs;