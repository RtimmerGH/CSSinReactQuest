import {useState, useEffect} from 'react';
import './App.css';
import styled from 'styled-components';
import React from 'react';
import img from './card.png';


function App() {
  const [champions, setChampions] = useState([]);
  const [isMounting, setIsMounting] = useState(true);
  const [filteredChamp, setFilteredChamp] = useState([]);

  const ChampCard = styled.div `
  background-color: transparent;
  background-image: url(${img});
  background-size: contain;
  background-repeat: no-repeat;
  border: none;
  width: 20%;
  height: calc(1.37 * 20vw);
  min-height: 206px;
  min-width: 151px;
  max-height: 412px;
  max-width: 302px; 
  white-space: normal;`;

  const CardContainer = styled.div `
  width: 100%;
  height: 100%;
  position: relative;`;

  const ManaCard = styled.div `
  display: flex;
  width: 20%;
  padding-left: 3%;
  padding-top: 6%;
  color: #c89d3e;
  align-items: center;`;

  const ManaTitle = styled.h3 `
  font-size: 16px;
  font-size: calc(0.7rem + 1vw);
  padding-left: 15%;
  margin: 5%;
  border-radius: 10px;`;

  const CardNameContainer = styled.div `
  background: rgb(238,226,174);
  background: radial-gradient(circle, rgba(238,226,174,1) 0%, rgba(200,157,62,1) 100%);
  margin: auto;
  width: 55%;
  border-radius: 10px;
  border-style: double;
  border-color: hwb(0 6% 94%);
  margin-bottom: 2px;
  position: absolute;
  left: 24%;
  bottom: 74%;
  z-index: 1`; 

  const CardNameTitle = styled.h3 `
  margin: auto;
  color: black;
  text-align: center;
  font-size: calc(0.8vw + 1vh);
  line-height: calc(1vw + 1vh);
  @media screen and (max-width: 875px) {
    font-size: 12px;
    line-height: 12px;
    font-weight: 500;  
    }`; 

  const CardPicContainer = styled.div `
  margin: auto;
  background-color: hsla(0, 9.1%, 2.2%, 0.85);
  height: 45%;
  width: 80%;
  background-position: top;
  background-repeat: no-repeat;
  background-size: 60%;
  border-radius: 30%;
  position: absolute;
  left: 11%;
  bottom: 30%;
  border-style: double;
  border-color: hwb(41 24% 22%);`; 

  const CardSkillsContainer = styled.div `
  color: black;
  font-weight: 200;
  display: block;
  background: #c89d3e;
  align-items: center;
  width: 88%;
  margin-left: 5%;
  border-radius: 10px 5px 5px 5px;
  bottom: 4%;
  position: absolute;
  height: 24%;
  border-style: double;
  border-color: hwb(0 6% 94%);
  display: flex;
  flex-direction: column;
  justify-content: center;`; 

  const CardSkillsP = styled.p `
  font-size: 16px;
  font-size: calc((0.6rem + 1vw)*0.7);
  line-height: 82%;  
  margin: 0px;
  margin-left: 2%;
  margin-top: 2%;
  @media screen and (max-width: 875px) {       
      font-size: 12px;    
    }`; 



  const getChampions = () => {
    return fetch(
      "http://ddragon.leagueoflegends.com/cdn/12.20.1/data/fr_FR/champion.json",
      {
        type: "GET",
      }
    ).then((res) => res.json());
  }; 

    // appel Service API
    useEffect(() => {
      getChampions().then((json) => {
        setChampions(json.data);
        setIsMounting(false);
      });
    }, []);

    useEffect(() => {
      let filteredChamp1 = Object.entries(champions);      
      setFilteredChamp([...filteredChamp1]);
      console.log(filteredChamp1);
    },[champions]);

    const manaCost = (champ) => {
      // console.log(cardChampion.info.difficulty);
      switch (champ) {
        case 0:
        case 1:
        case 2:
        case 3:
          return "0";
        case 4:
        case 5:
        case 6:
          return "1";
        case 7:
        case 8:
          return "2";
        case 9:
        case 10:
          return "3";
        default:
          return "TBD";
      }
    };
    // test function to assign card skill 1 based on the champ class 1
    const skill1 = (champ) => {
      switch (champ.tags[0]) {
        case "Tank":
          return `Gain ${(
            7 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
            parseInt(manaCost(champ.info.difficulty), 10)
          ).toString()} Block`;
        case "Fighter":
          return `Deal ${(
            7 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
            parseInt(manaCost(champ.info.difficulty), 10)
          ).toString()} Phys Damage`;
        case "Support":
          return `Heal ${(
            4 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
            parseInt(manaCost(champ.info.difficulty), 10)
          ).toString()} HP`;
        case "Mage":
          return champ.tags.length === 2
            ? `Deal ${(
                7 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
                parseInt(manaCost(champ.info.difficulty), 10)
              ).toString()} Magic Damage`
            : `cards damage value + ${(
                1 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
                parseInt(manaCost(champ.info.difficulty), 10)
              ).toString()}`;
        case "Marksman":
          return `Apply ${(
            1 *
            (parseInt(manaCost(champ.info.difficulty), 10) + 1)
          ).toString()} Vulnerability`;
        case "Assassin":
          return champ.tags.length === 2
            ? `Apply ${(
                4 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
                parseInt(manaCost(champ.info.difficulty), 10)
              ).toString()} Poison`
            : "double ennemy Poison";
        default:
          return "TBD";
      }
    };
  
    // test function to assign card skill 2 based on the champ class 2
    const skill2 = (champ) => {
      switch (champ.tags[1]) {
        case "Tank":
          return `Gain ${(
            7 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
            parseInt(manaCost(champ.info.difficulty), 10)
          ).toString()} Block`;
        case "Fighter":
          return `cards block value + ${(
            1 * (parseInt(manaCost(champ.info.difficulty), 10) + 1) +
            parseInt(manaCost(champ.info.difficulty), 10)
          ).toString()}`;
        case "Support":
          return `gain ${
            parseInt(manaCost(champ.info.difficulty), 10) < 2 ? "1" : "2"
          } Energy`;
        case "Mage":
          return `Apply ${(
            1 *
            (parseInt(manaCost(champ.info.difficulty), 10) + 1)
          ).toString()} Weak`;
        case "Marksman":
          return "Ignore next attack";
        case "Assassin":
          return `Draw ${
            parseInt(manaCost(champ.info.difficulty), 10) < 2 ? "1" : "2"
          } card`;
        default:
          return "TBD";
      }
    };
  
  return (
    <div className="App">
      {isMounting ? (
        <p>En cours de chargement =P</p>
      ) : (
        <ChampCard>
      {filteredChamp[0] ? (
        <CardContainer>
          <ManaCard>
            <ManaTitle>{manaCost(filteredChamp[0][1].info.difficulty)}</ManaTitle>
          </ManaCard>
          <CardNameContainer>
            <CardNameTitle>{filteredChamp[0][1].name}</CardNameTitle>
          </CardNameContainer>
          <CardPicContainer
            style={{
              backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${filteredChamp[0][1].id}_0.jpg)`,
            }}
          />
          <CardSkillsContainer>
            <CardSkillsP>{skill1(filteredChamp[0][1])}</CardSkillsP>
            <CardSkillsP>{filteredChamp[0][1].tags[1] ? skill2(filteredChamp[0][1]) : null}</CardSkillsP>
          </CardSkillsContainer>
        </CardContainer>
      ) : (
        "TBD"
      )}
    </ChampCard>
      )}       
    </div>
  );
}

export default App;
