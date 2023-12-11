window.addEventListener('load', () => {
    fetch('conf.json')
      .then(response => response.json())
      .then(data => {
        const apiKey = data.apiKey; // Clé d'API météo (à stocker dans conf.json)
        const city = data.city; // Ville pour laquelle vous souhaitez obtenir les données météo
  
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
        fetch(apiUrl)
          .then(response => response.json())
          
          .then(weatherData => {
            console.log(weatherData);

            document.getElementById('city').textContent = `${weatherData.name}`;
            document.getElementById('temperature').textContent = `${weatherData.main.temp}°C`;
            document.getElementById('humidity').textContent = `${weatherData.main.humidity}%`;
            document.getElementById('pressure').textContent = `${weatherData.main.pressure}hPa`;
            document.getElementById('feels_like').textContent = `${weatherData.main.feels_like}°C`;

            const weatherConditions = weatherData.weather[0].main.toLowerCase();
            console.log(weatherConditions);

            let weatherIcon = '';
            if (weatherConditions.includes('rain')) {
              weatherIcon = 'pluvieux.png';
            } else if (weatherConditions.includes('cloud')) {
              weatherIcon = 'nuageux.png';
            } else if (weatherConditions.includes('clear')) {
              weatherIcon = 'soleil.png';
            } else {
              weatherIcon = 'default.png'; // Une image par défaut pour les autres conditions météo
            }

            const iconImg = document.createElement('img');
            iconImg.src = `/images/${weatherIcon}`;
            document.querySelector('.weather-info').appendChild(iconImg);

            
          })
          .catch(error => {
            console.log('Erreur de récupération des données météo', error);
          });
      })
      .catch(error => {
        console.log('Erreur de chargement du fichier de configuration', error);
      });
  });