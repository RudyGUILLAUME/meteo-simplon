// Fonction pour récupérer et afficher les données récoltées de l'API
window.addEventListener('load', () => {
    fetch('conf.json')
      .then(response => response.json())
      .then(data => {
        const apiKey = data.apiKey; 
        const city = data.city;
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
        fetch(apiUrl)
          .then(response => response.json())
          
          .then(weatherData => {
            console.log(weatherData);

            const temperature = Math.round(weatherData.main.temp);
            const feelsLike = Math.round(weatherData.main.feels_like);

            document.getElementById('city').textContent = `${weatherData.name}`;
            document.getElementById('temperature').textContent = `${temperature}°C`;
            document.getElementById('humidity').textContent = `${weatherData.main.humidity}%`;
            document.getElementById('pressure').textContent = `${weatherData.wind.speed}km/h`;
            document.getElementById('feels_like').textContent = `${feelsLike}°C`;

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
              weatherIcon = 'default.png';
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

// Fonction pour refresh la page toutes les heures
const timeRefresh = 3600000;

function timeRefresher() {
  setTimeout(() => {
    location.reload();
  }, timeRefresh);
}

window.addEventListener('load', () => {
  timeRefresher();
});