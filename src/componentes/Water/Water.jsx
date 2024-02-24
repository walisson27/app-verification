import React, { useEffect, useState } from 'react';
import "./style.css";
import sim from '../../assets/sim.png';
import simefe from '../../assets/sim-efe.png';
import nao from '../../assets/nao.png';
import naoefe from '../../assets/nao-efe.png';

function Water({ latitude, longitude }) {
  const [isInWater, setIsInWater] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function checkLocation() {
      const localStorageData = localStorage.getItem(`${latitude}-${longitude}`);
      
      if (localStorageData) {
        setIsInWater(JSON.parse(localStorageData));
        setLoading(false);
        return;
      }

      const apiKey = '4166bfbe15msh1f33f488fe6ba87p1b6e22jsnf34b5529965d'; 
      const url = `https://isitwater-com.p.rapidapi.com/?latitude=${latitude}&longitude=${longitude}`;

      try {
        const response = await fetch(url, {
          headers: {
            'x-rapidapi-key': apiKey
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao obter dados');
        }
        const data = await response.json();
        localStorage.setItem(`${latitude}-${longitude}`, JSON.stringify(data.water));

        setIsInWater(data.water);
        setLoading(false);
      } catch (error) {
        setError('Ocorreu um erro, tente novamente.');
        setLoading(false);
      }
    }

    checkLocation();
  }, [latitude, longitude]);

  if (loading) {
    return <div className='loading'></div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <>
      <section className="water-info">
        <p className='water-style'>Está na Água?</p>
        <div className='water-centro'>
          <img className='img-primaria' src={isInWater ? nao : sim} alt={isInWater ? 'Sim' : 'Não'} />
          <img className='img-second' src={isInWater ? simefe : naoefe} alt={isInWater ? 'Sim com efeito' : 'Não com efeito'} />
        </div>
      </section>
    </>
  );
}

export default Water;
