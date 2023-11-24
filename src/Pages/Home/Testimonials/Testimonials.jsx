import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { BsQuote } from 'react-icons/bs';
import './Testimonials.css'

const Testimonials = () => {

    const reviews = [
        {
            "name": "John Doe",
            "testimonial": "Participating in the survey was a breeze! The clear instructions and engaging questions made the experience enjoyable. I appreciate the commitment to privacy and the opportunity to contribute to something meaningful.",
            "rating": 5
        },
        {
            "name": "Alice Smith",
            "testimonial": "The survey provided a platform to share my opinions on important topics. The user-friendly interface and thoughtful questions showcased the dedication to gathering diverse perspectives. Looking forward to future surveys!",
            "rating": 4.5

        },
        {
            "name": "Robert Johnson",
            "testimonial": "I was impressed by the professionalism and transparency of the survey process. The detailed step-by-step guide and the emphasis on data security gave me confidence. Kudos to the team for making my feedback count!",
            "rating": 4.8
        },
        {
            "name": "Emily Brown",
            "testimonial": "Completing the survey was a seamless experience. The well-organized structure, coupled with the efficient support system, ensured a positive interaction. Proud to be a part of this community-driven initiative!",
            "rating": 4.7
        },
        {
            "name": "Michael Rodriguez",
            "testimonial": "The survey was not only informative but also fun! The visuals and interactive elements made it engaging, and the time commitment was reasonable. Excited to see the impact of collective voices.",
            "rating": 4.9
        },
        {
            "name": "Sophia Chen",
            "testimonial": "I appreciate the user-friendly design and the variety of questions in the survey. It's evident that the team values participant input. The quick thank-you message and information about next steps were a nice touch!",
            "rating": 4.6
        },
        {
            "name": "David Thompson",
            "testimonial": "The survey was not just a questionnaire; it was an opportunity to contribute to positive change. The emphasis on privacy and the easy-to-navigate format made the experience enjoyable. Looking forward to future collaborations!",
            "rating": 4.8
        },
        {
            "name": "Jessica Miller",
            "testimonial": "As someone with a busy schedule, the flexibility to save and resume the survey was a game-changer. The thoughtful consideration for participants' time and the commitment to quality feedback were evident throughout.",
            "rating": 4.5
        }
    ]



    return (
        <Container maxWidth='xl' sx={{ pb: 12 }}>
            <Typography fontSize={{ xs: 20, sm: 36 }} sx={{ textAlign: 'center', fontWeight: 700 }}>
                Testimonials
            </Typography>
            <Typography color="text.secondary" fontSize={{ xs: 12, sm: 16 }} sx={{ textAlign: 'center', fontWeight: 400, mb: 6 }}>
                What our users say
            </Typography>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review => <SwiperSlide key={review.name} style={{textAlign: 'center'}}>
                        <Rating
                            style={{ maxWidth: 180, margin: '0 auto' }}
                            value={review.rating}
                            readOnly
                        />
                        <BsQuote className="review-icon"  />
                        <p className="review">{review.testimonial}</p>
                        <h4 className="name">{review.name}</h4>
                    </SwiperSlide>)
                }
            </Swiper>
        </Container>
    );
};

export default Testimonials;