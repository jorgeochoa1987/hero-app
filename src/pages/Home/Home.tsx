import { Link } from 'react-router-dom';
import './Home.scss';
import '../../App.css';
import superheroImage from '../../assets/img/75269-america-superhero-cup-comics-spider-man-captain.png';
import mainImage from '../../assets/img/dc-comics-png-background-image.png';

const Home = () => {
    return (
        <div className="home-section">
            <div className="half">
            <img src={mainImage} alt="Superhero Image" />
            </div>
            <div className="half">
            <img src={superheroImage} alt="Superhero Image" />

                <div className="content">
                    <h1  style={{ fontFamily: 'Obelix Pro', fontSize: '2rem' }}>Create Your own Team of Superheroes</h1>
                    <Link to="/heroes">
                    <button style={{ fontFamily: 'Obelix Pro', fontSize: '2rem' }}>Enter</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
