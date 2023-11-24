import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import img from '../../../assets/FAQs-amico.png'
import './FrequentlyAskedQuestions.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const FrequentlyAskedQuestions = () => {


    const faqs = [
        {
            "question": "How do I participate in a survey?",
            "answer": "Participating in a survey is easy! Simply click on the survey link provided in your invitation email or visit our website's homepage. Follow the on-screen instructions to complete the survey and share your valuable feedback."
        },
        {
            "question": "Is my personal information secure?",
            "answer": "Yes, your privacy is our top priority. We employ strict security measures to ensure the confidentiality of your personal information. Rest assured that your data is handled with the utmost care, and we adhere to all relevant privacy regulations."
        },
        {
            "question": "How long does it take to complete a survey?",
            "answer": "The time required to complete a survey varies, but we respect your time. Most surveys take approximately 10-15 minutes. If a survey is longer, we will provide an estimate at the beginning. You can also save your progress and return later if needed."
        },
        {
            "question": "Can I edit my responses after submitting?",
            "answer": "Once a survey is submitted, you cannot edit your responses. Please review your answers carefully before submitting. If you have specific concerns or need assistance, feel free to reach out to our support team."
        },
        {
            "question": "What happens after I complete a survey?",
            "answer": "After completing a survey, you will receive a thank-you message. Depending on the survey, you may also be informed about any follow-up steps, results, or future initiatives related to the survey topic. Your input is highly valued!"
        },
        {
            "question": "How can I contact customer support?",
            "answer": "If you have any questions, concerns, or technical issues, our customer support team is here to help! Visit our 'Contact Us' page on the website for information on how to reach us. We strive to provide prompt and helpful assistance."
        },
        {
            "question": "Are the survey results shared with participants?",
            "answer": "In some cases, we may share aggregated and anonymized survey results with participants. This information helps to provide insights into collective opinions. Rest assured, individual responses are always kept confidential."
        },
        {
            "question": "Can I opt out of receiving survey invitations?",
            "answer": "Yes, you can manage your communication preferences. Visit your account settings or use the 'unsubscribe' link in our emails to adjust your preferences. However, keep in mind that opting out may limit your opportunities to participate in valuable surveys."
        }
    ]


    return (
        <Container maxWidth='xl' sx={{ pb: 12 }}>
            <Typography fontSize={{ xs: 20, sm: 36 }} sx={{ textAlign: 'center', fontWeight: 700 }}>
                Frequently Asked Questions (FAQ)
            </Typography>
            <Typography color="text.secondary" fontSize={{ xs: 12, sm: 16 }} sx={{ textAlign: 'center', fontWeight: 400, mb: 6 }}>
                Your guide to survey participation and more
            </Typography>
            <Grid container spacing={{ sm: 20, xs: 10 }} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <Grid item xs={12} sm={6}>
                    <img src={img} alt="" className="faq-img" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    {
                        faqs.map(faq => <Accordion key={faq.question}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography fontSize={'20px'} sx={{fontWeight: 600, my: 1}}>{faq.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography color='text.secondary'>
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>)
                    }
                </Grid>
            </Grid>
        </Container>
    );
};

export default FrequentlyAskedQuestions;