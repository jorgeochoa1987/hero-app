import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import Close from "@mui/icons-material/Close";
interface CardProps {
  name: string;
  imageUrl: string;
  appearance: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    eyeColor: string;
    hairColor: string;
  };
  powerstats: {
    intelligence: string;
    speed: string;
    durability: string;
    power: string;
    combat: string;
  };
  addToTeam: boolean;
  onAddToTeamToggle: () => void;
  isSelected: boolean;
  onUpdateSelected: (isSelected: boolean) => void;
  removeFromTeam?: (heroName: string) => void; 
}

const Card: React.FC<CardProps> = ({
  name,
  imageUrl,
  powerstats,
  onAddToTeamToggle,
  isSelected,
  onUpdateSelected,
  removeFromTeam,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedSelectedState = localStorage.getItem('isSelected-' + name);
    if (savedSelectedState !== null) {
      const parsedState = JSON.parse(savedSelectedState);
      if (parsedState !== isSelected) {
        onUpdateSelected(parsedState);
      }
    }
  }, [name, isSelected, onUpdateSelected]);

  const handleCardClick = () => {
    navigate(`/detail-hero/${encodeURIComponent(name)}`);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleAddToTeamToggle = () => {
    const newSelectedState = !isSelected;
    onUpdateSelected(newSelectedState);
    localStorage.setItem('isSelected-' + name, JSON.stringify(newSelectedState));
    onAddToTeamToggle();
    if (removeFromTeam && !newSelectedState) {
      removeFromTeam(name);
    }
  };

  return (
    <div className="card">
      <div className="NavCard" onClick={handleCardClick}></div>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="details-container">
          <h2>{name}</h2>
          <div className="add-to-team">
            <label className={`switch ${isSelected ? 'on' : ''}`}>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={handleAddToTeamToggle}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <IconButton 
            onClick={toggleDetails} 
            className={`white-icon-button icon-rotate ${showDetails ? 'open' : ''}`}
            style={{ color: 'white', transform: showDetails ? 'rotate(180deg)' : 'rotate(0)' }}
          >
            {showDetails ? <Close /> : <ExpandCircleDownOutlinedIcon />}
          </IconButton>
          {/* <button className="more-info-button" onClick={toggleDetails}>
            More Info
          </button> */}
        </div>
        <div
          className={`overlay ${showDetails ? "show" : ""}`}
          onClick={toggleDetails}
        >
          <div className="details">
            {showDetails && (
              <div className="powerstats">
                <p>
                  <strong>Intelligence:</strong> {powerstats.intelligence}
                </p>
                <p>
                  <strong>Speed:</strong> {powerstats.speed}
                </p>
                <p>
                  <strong>Durability:</strong> {powerstats.durability}
                </p>
                <p>
                  <strong>Power:</strong> {powerstats.power}
                </p>
                <p>
                  <strong>Combat:</strong> {powerstats.combat}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
