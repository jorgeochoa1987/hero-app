import  { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import superheroesData from '../../assets/data/data.json';
import './DetailHero.scss';

interface RelatedHero {
  id: string;
  name: string;
  image: {
    url: string;
  };
}
interface Hero {
  id: string;
  name: string;
  image: {
    url: string;
  };
  powerstats: {
    intelligence: string;
    speed: string;
    durability: string;
    power: string;
    combat: string;
  };
  appearance: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    eyeColor: string;
    hairColor: string;
  };
  biography: {
    fullName: string;
    alterEgos: string;
    aliases: string[];
    placeOfBirth: string;
    alignment: string;
  };
  work: {
    occupation: string;
    base: string;
  };
  relatedCharacters: RelatedHero[]; 
}



function DetailHero() {
  const { name } = useParams<{ name: string | undefined }>(); 
  const [heroDetails, setHeroDetails] = useState<Hero | undefined>(undefined);
  const [addToTeam, setAddToTeam] = useState<boolean>(false); 

  useEffect(() => {
    if (name) {
      const hero = getHeroDetailsByName(name);
      if (hero) {
        setHeroDetails(hero);
        setAddToTeam(false); 
      }
    }
  }, [name]);

  const toggleAddToTeam = () => {
    setAddToTeam(prevState => !prevState); 
  };


  if (!heroDetails) {
    return <div>Héroe no encontrado</div>;
  }

  return (
    <div className="App">
      <div className="hero-container">
        <div className="image-container">
          <img src={heroDetails.image.url} alt={heroDetails.name} />
         
          <div className="add-to-team">
            <h1>{heroDetails.name}</h1>
            <label className="switch">
              <input type="checkbox" checked={addToTeam} onChange={toggleAddToTeam} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="info-container">
          <div className="level-1">
            <div className="half">
              <h2>Powerstats</h2>
              <ul>
                <li><strong>Intelligence:</strong> {heroDetails.powerstats.intelligence}</li>
                <li><strong>Speed:</strong> {heroDetails.powerstats.speed}</li>
                <li><strong>Durability:</strong> {heroDetails.powerstats.durability}</li>
                <li><strong>Power:</strong> {heroDetails.powerstats.power}</li>
                <li><strong>Combat:</strong> {heroDetails.powerstats.combat}</li>
              </ul>
            </div>
            <div className="half">
              <h2>Appearance</h2>
              <ul>
                <li><strong>Gender:</strong> {heroDetails.appearance.gender}</li>
                <li><strong>Race:</strong> {heroDetails.appearance.race}</li>
                <li><strong>Height: </strong>{heroDetails.appearance.height.join(', ')}</li>
                <li><strong>Weight:</strong> {heroDetails.appearance.weight.join(', ')}</li>
                <li><strong>Eye Color:</strong> {heroDetails.appearance.eyeColor}</li>
                <li><strong>Hair Color:</strong> {heroDetails.appearance.hairColor}</li>
              </ul>
            </div>
          </div>
          <div className="level-2">
            <h2>Biography</h2>
            <ul>
              <li><strong>Full Name:</strong> {heroDetails.biography.fullName}</li>
              <li><strong>Alter Egos:</strong> {heroDetails.biography.alterEgos}</li>
              <li><strong>Aliases:</strong> {heroDetails.biography.aliases.join(', ')}</li>
              <li><strong>Place of Birth:</strong> {heroDetails.biography.placeOfBirth}</li>
              <li><strong>Alignment:</strong> {heroDetails.biography.alignment}</li>
            </ul>
            <h2>Work</h2>
            <ul>
              <li><strong>Occupation:</strong> {heroDetails.work.occupation}</li>
              <li><strong>Base:</strong> {heroDetails.work.base}</li>
            </ul>
          </div>
          <div className="related-heroes">
            <h2>Related Characters</h2>
            <div className="related-hero-list">
  {heroDetails.relatedCharacters.length > 0 ? (
    heroDetails.relatedCharacters.map(hero => (
      <Link key={hero.id} to={`/detail-hero/${hero.name}`} className="related-hero">
        <img src={hero.image.url} alt={hero.name} style={{ width: '100px', height: 'auto' }} />
      </Link>
    ))
  ) : (
    <p>No related heros.</p>
  )}
</div>

          </div>
        
        </div>
      </div>
    </div>
  );
}
function getHeroDetailsByName(name: string): Hero | undefined {
  const allHeroes = superheroesData.results;

  if (!name) {
    return undefined;
  }

  const foundHero = allHeroes.find(hero => hero.name === name);

  if (!foundHero) {
    return undefined;
  }

  const hero: Hero = {
    id: foundHero.id,
    name: foundHero.name,
    image: {
      url: foundHero.image.url,
    },
    powerstats: {
      intelligence: foundHero.powerstats.intelligence,
      speed: foundHero.powerstats.speed,
      durability: foundHero.powerstats.durability,
      power: foundHero.powerstats.power,
      combat: foundHero.powerstats.combat,
    },
    appearance: {
      gender: foundHero.appearance.gender,
      race: foundHero.appearance.race,
      height: foundHero.appearance.height,
      weight: foundHero.appearance.weight,
      eyeColor: foundHero.appearance.eyeColor,
      hairColor: foundHero.appearance.hairColor,
    },
    biography: {
      fullName: foundHero.biography.fullName,
      alterEgos: foundHero.biography.alterEgos,
      aliases: foundHero.biography.aliases,
      placeOfBirth: foundHero.biography.placeOffBirth,
      alignment: foundHero.biography.alignment,
    },
    work: {
      occupation: foundHero.work.occupation,
      base: foundHero.work.base,
    },
    relatedCharacters: [], // Inicialmente vacío, se llenará más adelante
  };

  const relatedHeroes = allHeroes
    .filter(h => h.biography.publisher === foundHero.biography.publisher && h.name !== foundHero.name)
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  hero.relatedCharacters = relatedHeroes.map(relatedHero => ({
    id: relatedHero.id,
    name: relatedHero.name,
    image: {
      url: relatedHero.image.url,
    },
  }));

  return hero;
}


  



export default DetailHero; 
