import Banner from "../Banner/Banner";
import FeaturedSurveys from "../FeaturedSurveys/FeaturedSurveys";
import HowItWork from "../HowItWork/HowItWork";
import LatestSurveys from "../LatestSurveys/LatestSurveys";
import Testimonials from "../Testimonials/Testimonials";


const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturedSurveys/>
            <LatestSurveys/>
            <HowItWork/>
            <Testimonials/>
        </div>
    );
};

export default Home;