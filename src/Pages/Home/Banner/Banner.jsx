import { Link } from 'react-router-dom';
import './Banner.css'
import { SiAzuredataexplorer } from "react-icons/si";

const Banner = () => {


    return (
        <div className="hero-image">
            <div className="hero-text">
                <h2 className='banner-title'>A simple and powerful online survey</h2>
                <p className='banner-description'>Create free online surveys with unlimited questions and responses!</p>
                <Link to='/survey'>
                <button className='btn'>Explore <SiAzuredataexplorer/> </button>
                </Link>
            </div>
        </div>
    );
};

export default Banner;