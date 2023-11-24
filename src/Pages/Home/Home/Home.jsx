import Banner from "../Banner/Banner";
import FeaturedSurveys from "../FeaturedSurveys/FeaturedSurveys";
import LatestSurveys from "../LatestSurveys/LatestSurveys";


const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturedSurveys/>
            <LatestSurveys/>
        </div>
    );
};

export default Home;