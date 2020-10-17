import React, {useState, useEffect} from 'react';
import './App.css';
import shuffle from 'lodash.shuffle';
import { CgPokemon} from 'react-icons/cg';

// image for the pokemon
// https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png

const pokemon = [
  { id: 4, name: 'charizard' },
  { id: 10, name: 'caterpie' },
  { id: 77, name: 'ponyta' },
  { id: 108, name: 'lickitung' },
  { id: 132, name: 'ditto' },
  { id: 133, name: 'eevee' },
];

const doublePokemon = shuffle([...pokemon,...pokemon]);


export default function App() {
  const [opened, setOpened] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  function ajoutCard(index)
  {
    if(opened.includes(index)===false)
    {
      setMoves(moves => moves+1);
      setOpened(opened => [...opened,index]);
    }
  }

  useEffect(
    () => {
      if(opened.length===2)
      {
        let pokemon1 = doublePokemon[opened[0]];
        let pokemon2 = doublePokemon[opened[1]];
        if(pokemon1.id === pokemon2.id)
        {
          setMatched(matched => [...matched,opened[0],opened[1] ])
        }
      }
    },
    [opened],
  );

  useEffect(
    () => {
      if(opened.length===2)
      {
        setTimeout(() => setOpened([]),400);
      }
    },
    [opened],
  );


  return <div className="app">
    <h1>Number of moves {moves}</h1>
    <div className="cards">
    {doublePokemon.map((pokemon,index) =>{
      let isFlipped = false;
      if(opened.includes(index) || matched.includes(index))
      {
        isFlipped = true;
      }
      return (
        <PokemonCard key={index} pokemon={pokemon} isFlipped={isFlipped} index={index} ajoutCard={ajoutCard} />
      )
    }
    )}
    </div>
  </div>;
}

function PokemonCard({pokemon, isFlipped, index, ajoutCard})
{
  return(
    <button className={"pokemon-card"+(isFlipped ? " flipped" : "")} onClick={() => ajoutCard(index)}>
      <div className="inner">
        <div className="front">
        <img
            src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
            width="100"
          />
      </div>
      <div className="back"><CgPokemon/></div>
    </div>
  </button>
  );
}