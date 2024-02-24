import React, { useEffect, useState } from 'react';
import Weather from '../Weather/Weather';
import './style.css'
function Localiza() {
  const [userIpAddress, setUserIpAddress] = useState(null);

useEffect(() => {
  async function fetchUserIpAddress() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      const ipAddress = data.ip;

      const accessKey = '43ac342d-1599-472c-99e0-9d88b9ba08e5'; 
      const url = `https://apiip.net/api/check?ip=${ipAddress}&accessKey=${accessKey}`;

      const ipResponse = await fetch(url);
      const ipInfo = await ipResponse.json();

      setUserIpAddress(ipInfo);
    } catch (error) {
      console.error('Ocorreu um erro ao obter informações do IP:', error);
    }
  }

  fetchUserIpAddress();
}, []);

  return (
    <>
      {userIpAddress && (
        <div className='centralize'>
        <section className='frameip'>
        <h2 className='ipinfor'>IP do Computador</h2>
        <div className='centra-ip'>
          <p className='ip'>IP</p>
          <p className='ip-number'>{userIpAddress.ip}</p>
        </div>
        </section>
        <section className='ordem'>
          <Weather latitude={userIpAddress.latitude} longitude={userIpAddress.longitude}/>
        </section>
        </div>
      )}
    </>
  );
}

export default Localiza;
