import './Banner.css'
import { SiAzuredataexplorer } from "react-icons/si";

const Banner = () => {


    return (
        <div className="hero-image">
            <div className="hero-text">
                <h2 className='banner-title'>A simple and powerful online survey</h2>
                <p className='banner-description'>Create free online surveys with unlimited questions and responses!</p>
                <button className='btn'>Explore <SiAzuredataexplorer/> </button>
            </div>
        </div>
    );
};

export default Banner;