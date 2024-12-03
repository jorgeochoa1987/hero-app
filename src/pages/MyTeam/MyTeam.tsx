import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/card";
import './MyTeam.scss';
import superheroesData from '../../assets/data/data.json'; 

const MyTeam = () => {
  const [team, setTeam] = useState<string[]>([]);
  const [heroes, setHeroes] = useState<any[]>([]); 

  useEffect(() => {
    const savedTeam = localStorage.getItem('team');
    if (savedTeam) {
      setTeam(JSON.parse(savedTeam));
    }
  }, []);

  useEffect(() => {
    const selectedHeroes = superheroesData.results.filter((hero: any) =>
      team.includes(hero.name)
    );
    setHeroes(selectedHeroes);
  }, [team]);

  const removeFromTeam = (heroName: string) => {
    const updatedTeam = team.filter(name => name !== heroName);
    setTeam(updatedTeam);
    localStorage.setItem('team', JSON.stringify(updatedTeam));
  };

  return (
    <section className={heroes.length === 0 ? "empty-container" : "card-container"}>
      {heroes.length === 0 ? (
        <div className="empty-heroes">
          <h3>You do not have any team members selected. Please make selections on</h3>
          <Link to="/heroes">superheros page.</Link>
        </div>
      ) : (
        heroes.map(hero => (
          <Card
            key={hero.id}
            name={hero.name}
            imageUrl={hero.image.url}
            appearance={hero.appearance}
            powerstats={hero.powerstats}
            addToTeam={team.includes(hero.name)}
            onAddToTeamToggle={() => {}}
            isSelected={true}
            onUpdateSelected={() => {}}
            removeFromTeam={removeFromTeam} 
          />
        ))
      )}
    </section>
  );
};

export default MyTeam;
