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
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Testimonials = () => {

    const axios = useAxiosPublic();

    const {data: reviews = []} = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axios.get('/reviews');
            return res.data
        }
    })


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
                    reviews.map(review => <SwiperSlide key={review._id} style={{textAlign: 'center'}}>
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