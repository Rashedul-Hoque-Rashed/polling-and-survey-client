import Banner from "../Banner/Banner";
import FeaturedSurveys from "../FeaturedSurveys/FeaturedSurveys";
import HowItWork from "../HowItWork/HowItWork";
import LatestSurveys from "../LatestSurveys/LatestSurveys";


const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturedSurveys/>
            <LatestSurveys/>
            <HowItWork/>
        </div>
    );
};

export default Home;