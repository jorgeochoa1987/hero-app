import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Card from "../../components/card";
import superheroesData from "../../assets/data/data.json";
import "./SuperHeros.scss";

const App = () => {
  const [heroes, setHeroes] = useState(superheroesData.results);
  const [team, setTeam] = useState<string[]>(() => {
    const savedTeam = localStorage.getItem("team");
    return savedTeam ? JSON.parse(savedTeam) : [];
  });
  const [visibleHeroesCount, setVisibleHeroesCount] = useState(8);
  const heroesPerPage = 8;
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAlignmentModal, setShowAlignmentModal] = useState(false);

  const lastSelectedHero = useRef<string | null>(null);

  const canAddMoreHeroes = () => {
    return team.length < 8;
  };

  useEffect(() => {
    console.log(`showModal state changed: ${showModal}`);
  }, [showModal]);

  const addToTeam = (heroName: string) => {
    if (!canAddMoreHeroes()) {
      return;
    }

    if (team.includes(heroName)) {
      return;
    }
    const newTeam = [...team, heroName];
    const uniqueTeam = [...new Set(newTeam)];
    localStorage.setItem("team", JSON.stringify(uniqueTeam));

    const previouslySelectedHero =
      team.length > 0
        ? heroes.find((hero) => hero.name === team[team.length - 1])
        : null;
    if (previouslySelectedHero) {
      console.log(
        `Previous hero: ${previouslySelectedHero.name}, Alignment: ${previouslySelectedHero.biography.alignment}`
      );
      // Check alignment mismatch if needed
      // if (previouslySelectedHero.biography.alignment !== heroToAdd.biography.alignment) {
      //   setShowAlignmentModal(true);
      // }
    }

    setTeam(uniqueTeam);
    lastSelectedHero.current = heroName;
  };

  const removeFromTeam = (heroName: string) => {
    const newTeam = team.filter((name) => name !== heroName);
    setTeam(newTeam);
    localStorage.setItem("team", JSON.stringify(newTeam));
  };

  const loadMoreHeroes = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleHeroesCount((prevCount) =>
        Math.min(prevCount + heroesPerPage, heroes.length)
      );
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (loading) return;
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        loadMoreHeroes();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  useEffect(() => {
    localStorage.setItem("team", JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    const savedTeam = localStorage.getItem("team");
    if (savedTeam) {
      setTeam(JSON.parse(savedTeam));
    }
  }, []);

  const applyFilters = (filters: any) => {
    let filteredHeroes = superheroesData.results;
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filteredHeroes = filteredHeroes.filter((hero) =>
        hero.name.toLowerCase().includes(keyword)
      );
    }

    if (filters.gender) {
      filteredHeroes = filteredHeroes.filter(
        (hero) =>
          hero.appearance.gender.toLowerCase() === filters.gender.toLowerCase()
      );
    }

    if (filters.alignment) {
      filteredHeroes = filteredHeroes.filter(
        (hero) =>
          hero.biography.alignment.toLowerCase() ===
          filters.alignment.toLowerCase()
      );
    }

    if (filters.powerStatsTags.length > 0) {
      filteredHeroes = filteredHeroes.filter((hero) => {
        const heroPowerStats = Object.values(hero.powerstats);
        return filters.powerStatsTags.every((tag: string) =>
          heroPowerStats.includes(tag)
        );
      });
    }

    filteredHeroes = filteredHeroes.filter((hero) => {
      const heroIntelligence = parseInt(hero.powerstats.intelligence);
      return (
        heroIntelligence >= filters.intelligence[0] &&
        heroIntelligence <= filters.intelligence[1]
      );
    });

    filteredHeroes = filteredHeroes.filter((hero) => {
      const heroSpeed = parseInt(hero.powerstats.speed);
      return heroSpeed >= filters.speed[0] && heroSpeed <= filters.speed[1];
    });

    filteredHeroes = filteredHeroes.filter((hero) => {
      const heroPower = parseInt(hero.powerstats.power);
      return heroPower >= filters.power[0] && heroPower <= filters.power[1];
    });

    filteredHeroes = filteredHeroes.filter((hero) => {
      const heroDurability = parseInt(hero.powerstats.durability);
      return (
        heroDurability >= filters.durability[0] &&
        heroDurability <= filters.durability[1]
      );
    });

    setHeroes(filteredHeroes);
    setVisibleHeroesCount(8);
  };

  const handleSwitchClick = () => {
    if (!canAddMoreHeroes()) {
      setShowModal(!showModal);
    }
  };

  return (
    <>
      <Header onSubmitFilters={applyFilters} />

      <section className="card-container">
        {heroes.slice(0, visibleHeroesCount).map((hero) => (
          <Card
            key={hero.id}
            name={hero.name}
            imageUrl={hero.image.url}
            appearance={hero.appearance}
            powerstats={hero.powerstats}
            addToTeam={team.includes(hero.name)}
            onAddToTeamToggle={() => {
              if (team.includes(hero.name)) {
                removeFromTeam(hero.name);
              } else {
                addToTeam(hero.name);
                handleSwitchClick();
              }
            }}
            isSelected={team.includes(hero.name)}
            onUpdateSelected={(isSelected: boolean) => {
              if (isSelected) {
                addToTeam(hero.name);
              } else {
                removeFromTeam(hero.name);
              }
            }}
          />
        ))}
        {loading && <p>Loading...</p>}

        <Modal
          isOpen={showModal}
          onClose={() => {
            console.log("Intentando cerrar modal");
            setShowModal(false);
            console.log("Modal cerrado");
          }}
          title="Oops! You have too many team members"
          content="You may only select 8 team members at a time."
        />

        <Modal
          isOpen={showAlignmentModal}
          onClose={() => {
            console.log("Intentando cerrar modal de alineación");
            setShowAlignmentModal(false);
            console.log("Modal de alineación cerrado");
          }}
          title="Alignment Mismatch"
          content="The new hero's alignment does not match the previously selected hero's alignment."
        />
      </section>
    </>
  );
};

export default App;
