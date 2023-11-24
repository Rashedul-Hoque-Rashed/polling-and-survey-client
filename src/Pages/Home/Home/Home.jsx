import Banner from "../Banner/Banner";
import FAQ from "../FAQ/FAQ";
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
            <FAQ/>
        </div>
    );
};

export default Home;