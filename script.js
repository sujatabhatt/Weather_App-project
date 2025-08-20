// Weather condition to icon mapping
const weatherIcons = {
    'sunny': `<circle cx="50" cy="50" r="20" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
             <g stroke="#FFD700" stroke-width="3" stroke-linecap="round">
                 <line x1="50" y1="15" x2="50" y2="25"/>
                 <line x1="50" y1="75" x2="50" y2="85"/>
                 <line x1="15" y1="50" x2="25" y2="50"/>
                 <line x1="75" y1="50" x2="85" y2="50"/>
                 <line x1="25.86" y1="25.86" x2="32.93" y2="32.93"/>
                 <line x1="67.07" y1="67.07" x2="74.14" y2="74.14"/>
                 <line x1="74.14" y1="25.86" x2="67.07" y2="32.93"/>
                 <line x1="32.93" y1="67.07" x2="25.86" y2="74.14"/>
             </g>`,
    'cloudy': `<ellipse cx="40" cy="45" rx="25" ry="15" fill="#E5E7EB"/>
              <ellipse cx="60" cy="45" rx="20" ry="12" fill="#D1D5DB"/>
              <ellipse cx="50" cy="35" rx="15" ry="10" fill="#F3F4F6"/>`,
    'rainy': `<ellipse cx="40" cy="35" rx="20" ry="12" fill="#6B7280"/>
             <ellipse cx="60" cy="35" rx="15" ry="10" fill="#9CA3AF"/>
             <g stroke="#3B82F6" stroke-width="2" stroke-linecap="round">
                 <line x1="35" y1="55" x2="32" y2="70"/>
                 <line x1="45" y1="60" x2="42" y2="75"/>
                 <line x1="55" y1="55" x2="52" y2="70"/>
                 <line x1="65" y1="60" x2="62" y2="75"/>
             </g>`,
    'thunderstorm': `<ellipse cx="40" cy="35" rx="20" ry="12" fill="#374151"/>
                    <ellipse cx="60" cy="35" rx="15" ry="10" fill="#4B5563"/>
                    <g stroke="#3B82F6" stroke-width="2" stroke-linecap="round">
                        <line x1="35" y1="55" x2="32" y2="70"/>
                        <line x1="55" y1="55" x2="52" y2="70"/>
                    </g>
                    <path d="M45 50 L55 65 L50 65 L55 80 L40 62 L48 62 Z" fill="#FBBF24"/>`,
    'snow': `<ellipse cx="40" cy="35" rx="20" ry="12" fill="#E5E7EB"/>
            <ellipse cx="60" cy="35" rx="15" ry="10" fill="#F3F4F6"/>
            <g fill="white" stroke="#D1D5DB" stroke-width="1">
                <circle cx="35" cy="55" r="3"/>
                <circle cx="45" cy="65" r="3"/>
                <circle cx="55" cy="55" r="3"/>
                <circle cx="65" cy="65" r="3"/>
            </g>`,
    'mist': `<g fill="#E5E7EB" opacity="0.8">
            <ellipse cx="50" cy="40" rx="30" ry="8"/>
            <ellipse cx="50" cy="50" rx="25" ry="6"/>
            <ellipse cx="50" cy="60" rx="20" ry="4"/>
            </g>`,
    'clear': `<circle cx="50" cy="50" r="20" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
             <g stroke="#FFD700" stroke-width="3" stroke-linecap="round">
                 <line x1="50" y1="15" x2="50" y2="25"/>
                 <line x1="50" y1="75" x2="50" y2="85"/>
                 <line x1="15" y1="50" x2="25" y2="50"/>
                 <line x1="75" y1="50" x2="85" y2="50"/>
                 <line x1="25.86" y1="25.86" x2="32.93" y2="32.93"/>
                 <line x1="67.07" y1="67.07" x2="74.14" y2="74.14"/>
                 <line x1="74.14" y1="25.86" x2="67.07" y2="32.93"/>
                 <line x1="32.93" y1="67.07" x2="25.86" y2="74.14"/>
             </g>`
};

function getWeatherIcon(condition) {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
        return weatherIcons.sunny;
    } else if (conditionLower.includes('cloud')) {
        return weatherIcons.cloudy;
    } else if (conditionLower.includes('rain') || conditionLower.includes('shower')) {
        return weatherIcons.rainy;
    } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
        return weatherIcons.thunderstorm;
    } else if (conditionLower.includes('snow')) {
        return weatherIcons.snow;
    } else if (conditionLower.includes('mist') || conditionLower.includes('fog') || conditionLower.includes('haze')) {
        return weatherIcons.mist;
    } else {
        return weatherIcons.cloudy; // default
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
}

function getCurrentDateTime() {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[now.getDay()];
    const time = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    return `${dayName}, ${time}`;
}

function drawTemperatureChart(dayTemp) {
    const canvas = document.getElementById('tempChart');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!dayTemp || dayTemp.length === 0) return;
    
    const padding = 40;
    const width = canvas.width - 2 * padding;
    const height = canvas.height - 2 * padding;
    
    // Find min and max temperatures for scaling
    const allTemps = dayTemp.flatMap(day => [day.minTemp, day.maxTemp]);
    const minTemp = Math.min(...allTemps);
    const maxTemp = Math.max(...allTemps);
    const tempRange = maxTemp - minTemp || 1;
    
    // Draw temperature line
    ctx.strokeStyle = '#74b9ff';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    
    dayTemp.forEach((day, index) => {
        const x = padding + (index / (dayTemp.length - 1)) * width;
        const y = padding + height - ((day.avgTemp - minTemp) / tempRange) * height;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        // Draw temperature points
        ctx.fillStyle = '#74b9ff';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw temperature labels
        ctx.fillStyle = '#2d3436';
        ctx.font = '12px Segoe UI';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.round(day.avgTemp)}°`, x, y - 10);
    });
    
    ctx.stroke();
}

async function fetchWeatherData(city = 'agra', days = 3) {
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const weatherCard = document.querySelector('.weather-card');
    
    loading.style.display = 'flex';
    error.style.display = 'none';
    weatherCard.style.display = 'none';
    
    try {
        const response = await fetch(`http://localhost:8080/weather/forecast?city=${encodeURIComponent(city)}&days=${days}`);
        
        if (!response.ok) {
            throw new Error(`Weather data not available for ${city}`);
        }
        
        const data = await response.json();
        displayWeatherData(data, days);
        
    } catch (err) {
        console.error('Error fetching weather data:', err);
        loading.style.display = 'none';
        error.style.display = 'block';
        document.querySelector('.error p').textContent = `Failed to load weather data for ${city}. Please check the city name and try again.`;
    }
}

function displayWeatherData(data, days) {
    const loading = document.getElementById('loading');
    const weatherCard = document.querySelector('.weather-card');
    
    // Update current weather
    document.getElementById('currentTemp').textContent = Math.round(data.weatherResponse.temperature);
    document.getElementById('cityName').textContent = data.weatherResponse.city;
    document.getElementById('regionName').textContent = data.weatherResponse.region;
    document.getElementById('weatherCondition').textContent = data.weatherResponse.condition;
    document.getElementById('currentDate').textContent = getCurrentDateTime();
    
    // Update main weather icon
    const mainIcon = document.getElementById('mainWeatherIcon');
    mainIcon.innerHTML = getWeatherIcon(data.weatherResponse.condition);
    
    // Draw temperature chart (only if more than 1 day)
    const chartContainer = document.querySelector('.temperature-chart');
    if (days > 1 && data.dayTemp && data.dayTemp.length > 1) {
        chartContainer.style.display = 'flex';
        drawTemperatureChart(data.dayTemp);
    } else {
        chartContainer.style.display = 'none';
    }
    
    // Update forecast
    const forecastContainer = document.getElementById('forecastDays');
    const forecastSection = document.querySelector('.forecast');
    
    if (days > 1 && data.dayTemp && data.dayTemp.length > 1) {
        forecastSection.style.display = 'block';
        forecastContainer.innerHTML = '';
        
        data.dayTemp.forEach((day, index) => {
            const dayElement = document.createElement('div');
            dayElement.className = 'forecast-day';
            
            const dayName = index === 0 ? 'Today' : formatDate(day.date);
            
            dayElement.innerHTML = `
                <div class="day-name">${dayName}</div>
                <div class="day-icon">
                    <svg width="40" height="40" viewBox="0 0 100 100">
                        ${getWeatherIcon(data.weatherResponse.condition)}
                    </svg>
                </div>
                <div class="day-temp">
                    <div class="max-temp">${Math.round(day.maxTemp)}°</div>
                    <div class="min-temp">${Math.round(day.minTemp)}°</div>
                </div>
            `;
            
            forecastContainer.appendChild(dayElement);
        });
    } else {
        forecastSection.style.display = 'none';
    }
    
    loading.style.display = 'none';
    weatherCard.style.display = 'block';
}

// Event listeners
document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();
    const days = parseInt(document.getElementById('daysSelect').value);
    
    if (city) {
        fetchWeatherData(city, days);
    } else {
        alert('Please enter a city name');
    }
});

document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = document.getElementById('cityInput').value.trim();
        const days = parseInt(document.getElementById('daysSelect').value);
        
        if (city) {
            fetchWeatherData(city, days);
        } else {
            alert('Please enter a city name');
        }
    }
});

// Also trigger search when days selection changes
document.getElementById('daysSelect').addEventListener('change', () => {
    const city = document.getElementById('cityInput').value.trim();
    const days = parseInt(document.getElementById('daysSelect').value);
    
    if (city) {
        fetchWeatherData(city, days);
    }
});

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData('agra', 3);
});