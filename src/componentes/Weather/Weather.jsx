import React, { useEffect, useState } from 'react';
import "./style.css";
import Muito from '../../assets/clima/muito.png';
import Pouco from '../../assets/clima/pouco.png';
import Water from '../Water/Water';
function Weather({ latitude, longitude }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoverText, setHoverText] = useState("");
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(`https://api.hgbrasil.com/weather?key=7b0e66d6&lat=${latitude}&lon=${longitude}&format=json-cors&locale=pt`);
        if (!response.ok) {
          throw new Error('Erro ao obter os dados climáticos. Por favor, tente novamente mais tarde.');
        }
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        setError('Ocorreu um problema ao carregar os dados climáticos. Tente novamente mais tarde.');
        setLoading(false);
      }
    }

    fetchWeather();
  }, [latitude, longitude]);

  useEffect(() => {
    if (weatherData) {
      setHoverText(weatherData.results.condition_slug === "clear_day" ? "Muito" : "Pouco");
    }
  }, [weatherData]);

  if (loading) {
    return <div className='loading'></div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  function getWeatherIconUrl(iconCode) {
    return `https://assets.hgbrasil.com/weather/icons/conditions/${iconCode}.svg`;
  }

  function getIntensityImage() {
    if (isMouseOver) {
      return hoverText === "Muito" ? <img className='img-muito' src={Muito} alt="Muito" /> : <img className='img-pouco' src={Pouco} alt="Pouco" />;
    }
    return null;
  }

  return (
    <>
      {weatherData && (
        <>
          <h2 className='dadosuser'>Dados do usuário </h2>
          <section className='framedados'>
              <section className='centro-dados'>
                <p className='cidade-name'>Cidade</p>
                <p className='city-name'>{weatherData.results.city_name}</p>
              </section>
              <section className='section-uf'>
                <p className='uf-style'>UF</p>
                <p className='uf-city'> {weatherData.results.city.split(',')[1]}</p>
              </section>
          </section>
          <section className='calor-style'>
            <Water latitude={latitude} longitude={longitude}/>
            <p className='calor-fonte'>Está muito calor?</p>
            <div
              className='tempo'
              onMouseOver={() => setIsMouseOver(true)}
              onMouseOut={() => setIsMouseOver(false)}
            >
              <img className='tempo-condicao' src={getWeatherIconUrl(weatherData.results.condition_slug)} alt="Condição do tempo" />
              {getIntensityImage()}
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Weather;
