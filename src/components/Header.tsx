import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import {
  Typography,
  IconButton,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Button,
  Chip,
  Grid,
  Slider,
} from '@mui/material';
import superheroesData from '../assets/data/data.json';

import './header.scss'; 
interface HeaderProps {
  onSubmitFilters: (filters: any) => void;
}

const Header: React.FC<HeaderProps> = ({ onSubmitFilters }) => {
  const location = useLocation();
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [genderOptions, setGenderOptions] = useState<string[]>([]);
  const [gender, setGender] = useState('');
  const [alignmentOptions, setAlignmentOptions] = useState<string[]>([]);
  const [alignment, setAlignment] = useState('');
  const [powerStatsTags, setPowerStatsTags] = useState<string[]>([]);
  const [powerStatsInput, setPowerStatsInput] = useState('');
  const [intelligence, setIntelligence] = useState<number[]>([0, 100]);
  const [speed, setSpeed] = useState<number[]>([0, 100]);
  const [power, setPower] = useState<number[]>([0, 100]);
  const [durability, setDurability] = useState<number[]>([0, 100]);

  const noHeaderRoutes = ['/'];
  const [drawerOpen, setDrawerOpen] = useState(false);

  const shouldShowHeader = !noHeaderRoutes.includes(location.pathname);

  const toggleFilterForm = () => {
    setShowFilterForm(!showFilterForm);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filters = {
      keyword,
      gender,
      alignment,
      powerStatsTags,
      intelligence,
      speed,
      power,
      durability,
    };
    onSubmitFilters(filters);
  };

  const loadGenderOptions = () => {
    const genders: string[] = [];
    superheroesData.results.forEach(hero => {
      const gender = hero.appearance.gender.toLowerCase();
      if (gender && !genders.includes(gender)) {
        genders.push(gender);
      }
    });
    setGenderOptions(genders);
  };

  const loadAlignmentOptions = () => {
    const alignments: string[] = [];
    superheroesData.results.forEach(hero => {
      const alignment = hero.biography.alignment.toLowerCase();
      if (alignment && !alignments.includes(alignment)) {
        alignments.push(alignment);
      }
    });
    setAlignmentOptions(alignments);
  };

  useEffect(() => {
    loadGenderOptions();
    loadAlignmentOptions();
  }, []);

  const handleAddTag = () => {
    if (powerStatsInput.trim() !== '' && !powerStatsTags.includes(powerStatsInput.trim())) {
      setPowerStatsTags([...powerStatsTags, powerStatsInput.trim()]);
      setPowerStatsInput('');
    }
  };

  const handleDeleteTag = (tag: string) => {
    setPowerStatsTags(prevTags => prevTags.filter(t => t !== tag));
  };

  const handleIntelligenceChange = (_event: Event, newValue: number | number[]) => {
    setIntelligence(newValue as number[]);
  };
  
  const handleSpeedChange = (_event: Event, newValue: number | number[]) => {
    setSpeed(newValue as number[]);
  };
  
  const handlePowerChange = (_event: Event, newValue: number | number[]) => {
    setPower(newValue as number[]);
  };
  
  const handleDurabilityChange = (_event: Event, newValue: number | number[]) => {
    setDurability(newValue as number[]);
  };
  

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return shouldShowHeader ? (
    <>
      <header>
        <div className="navbar">
          <div className="navbar-left">
            <IconButton className="hamburger-icon" onClick={toggleDrawer}>
              {drawerOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <div className="logo">
              <Link to="/">SuperSearch</Link>
            </div>
            <ul className="nav-links">
              <li><Link to="/heroes">Super Heroes</Link></li>
              <li><Link to="/my-team">My Team</Link></li>
            </ul>
          </div>
          <div className="navbar-right">
            <div className="filter-icon" onClick={toggleFilterForm}>
              <FilterListOutlinedIcon />
            </div>
            <div className="filter-text" onClick={toggleFilterForm}>
              Filter
            </div>
          </div>
        </div>
      </header>
      <div className={`menu-below-header ${drawerOpen ? 'drawer-open' : ''}`}>
        <ul className={`nav-links-vertical ${drawerOpen ? 'open' : ''}`}>
          <li><Link to="/heroes" onClick={toggleDrawer}>Super Heroes</Link></li>
          <li><Link to="/my-team" onClick={toggleDrawer}>My Team</Link></li>
        </ul>
      </div>
      {showFilterForm && (
        <div className="filter-form">
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle1" gutterBottom>
                      Keyword
                    </Typography>
                    <FormControl fullWidth>
                      <TextField
                        id="keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Enter keyword"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle1" gutterBottom>
                      Gender
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        label="Gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value as string)}
                      >
                        {genderOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle1" gutterBottom>
                      Alignment
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        label="Alignment"
                        value={alignment}
                        onChange={(e) => setAlignment(e.target.value as string)}
                      >
                        {alignmentOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle1" gutterBottom>
                      Power Stats
                    </Typography>
                    <FormControl fullWidth>
                      <TextField
                        id="powerStats"
                        placeholder="Type and press Enter"
                        value={powerStatsInput}
                        onChange={(e) => setPowerStatsInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                        InputProps={{
                          endAdornment: (
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                              {powerStatsTags.map((tag, index) => (
                                <Chip
                                  key={index}
                                  label={tag}
                                  onDelete={() => handleDeleteTag(tag)}
                                  className="tag-chip"
                                  style={{ borderRadius: '0px', margin: '4px' }}
                                />
                              ))}
                            </div>
                          ),
                          style: { borderRadius: '0px' },
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle1" gutterBottom>
                      Intelligence
                    </Typography>
                    <Slider
                      value={intelligence}
                      onChange={handleIntelligenceChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="intelligence-slider"
                      min={0}
                      max={100}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle1" gutterBottom>
                      Speed
                    </Typography>
                    <Slider
                      value={speed}
                      onChange={handleSpeedChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="speed-slider"
                      min={0}
                      max={100}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle1" gutterBottom>
                      Power
                    </Typography>
                    <Slider
                      value={power}
                      onChange={handlePowerChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="power-slider"
                      min={0}
                      max={100}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle1" gutterBottom>
                      Durability
                    </Typography>
                    <Slider
                      value={durability}
                      onChange={handleDurabilityChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="durability-slider"
                      min={0}
                      max={100}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div className="submit-button">
              <Button type="submit" variant="contained" style={{ backgroundColor: '#EB6E1C', color: 'white', padding: '11px', boxShadow: 'none', height: '42px', width: '145px'}}>
                Submit Filters
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  ) : null;
};

export default Header;
