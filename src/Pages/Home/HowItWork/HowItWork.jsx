import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import img from '../../../assets/how it work.jpg'
import './HowItWork.css'
import { RiGuideFill } from "react-icons/ri";
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdOutlinePrivacyTip, MdAvTimer, MdOutlineSupportAgent, MdCallToAction } from "react-icons/md";

const HowItWork = () => {
    return (
        <Container maxWidth='xl' sx={{ pb: 12 }}>
            <Typography fontSize={{ xs: 20, sm: 36 }} sx={{ textAlign: 'center', fontWeight: 700 }}>
                How it works
            </Typography>
            <Typography color="text.secondary" fontSize={{ xs: 12, sm: 16 }} sx={{ textAlign: 'center', fontWeight: 400, mb: 6 }}>
                Understanding the survey process
            </Typography>
            <Grid container spacing={20} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <Grid item xs={12} sm={6}>
                    <img src={img} alt="" className="img" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid sx={{mb: '12px'}}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <RiGuideFill className="icon" />
                            Step-by-Step Guide
                        </Typography>
                        <Typography color="text.secondary" variant="body2" sx={{ mt: '2px' }}>
                            Follow our easy-to-understand steps to navigate through the survey effortlessly.
                        </Typography>
                    </Grid>
                    <Grid sx={{mb: '12px'}}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaRegQuestionCircle className="icon" />
                            Answering Questions
                        </Typography>
                        <Typography color="text.secondary" variant="body2" sx={{ mt: '2px' }}>
                        Experience a variety of question types and easily track your progress as you provide valuable feedback.
                        </Typography>
                    </Grid>
                    <Grid sx={{mb: '12px'}}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MdOutlinePrivacyTip className="icon" />
                            Privacy and Data Security
                        </Typography>
                        <Typography color="text.secondary" variant="body2" sx={{ mt: '2px' }}>
                        Rest assured, your responses are confidential and secure, aligning with our commitment to privacy and data protection.
                        </Typography>
                    </Grid>
                    <Grid sx={{mb: '12px'}}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MdAvTimer  className="icon" />
                            Time Commitment
                        </Typography>
                        <Typography color="text.secondary" variant="body2" sx={{ mt: '2px' }}>
                        Get an estimate of how long it takes to complete the survey, and enjoy the flexibility to save and resume at your convenience.
                        </Typography>
                    </Grid>
                    <Grid sx={{mb: '12px'}}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MdOutlineSupportAgent className="icon" />
                            Support and Assistance
                        </Typography>
                        <Typography color="text.secondary" variant="body2" sx={{ mt: '2px' }}>
                        Have questions or need assistance? Find support resources and contact information for a seamless experience.
                        </Typography>
                    </Grid>
                    <Grid sx={{mb: '12px'}}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MdCallToAction className="icon" />
                            Call to Action
                        </Typography>
                        <Typography color="text.secondary" variant="body2" sx={{ mt: '2px' }}>
                        Participate now and contribute your valuable insights—your feedback matters, and we appreciate your input!
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HowItWork;