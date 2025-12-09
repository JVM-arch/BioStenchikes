<script>
  import { onMount } from 'svelte';

  let temp = '-5';
  let feelsLike = '-9';
  let humidity = '78';
  let wind = '4';
  let weatherIcon = '❄️';
  let weatherDesc = 'Облачно';
  let currentDate = '';

  const weatherMap = {
    0: { icon: '☀️', desc: 'Ясно' },
    1: { icon: '🌤️', desc: 'Преимущественно ясно' },
    2: { icon: '⛅', desc: 'Переменная облачность' },
    3: { icon: '☁️', desc: 'Облачно' },
    45: { icon: '🌫️', desc: 'Туман' },
    71: { icon: '🌨️', desc: 'Снег' },
    73: { icon: '🌨️', desc: 'Снег' },
    75: { icon: '❄️', desc: 'Сильный снег' }
  };

  onMount(async () => {
    const now = new Date();
    currentDate = now.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' });

    try {
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=55.7887&longitude=49.1221&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Europe%2FMoscow');
      const data = await res.json();

      if (data.current) {
        temp = Math.round(data.current.temperature_2m).toString();
        feelsLike = Math.round(data.current.apparent_temperature).toString();
        humidity = data.current.relative_humidity_2m.toString();
        wind = (Math.round(data.current.wind_speed_10m * 10) / 10).toString();

        const info = weatherMap[data.current.weather_code] || { icon: '☁️', desc: 'Облачно' };
        weatherIcon = info.icon;
        weatherDesc = info.desc;
      }
    } catch (e) {
      console.log('Weather error');
    }
  });
</script>

<div class="weather-card card">
  <div class="weather-header">
    <div class="weather-location">
      <span>📍</span>
      <span>Казань</span>
    </div>
    <div class="weather-date">{currentDate}</div>
  </div>
  <div class="weather-main">
    <div class="weather-temp">
      <span class="temp-icon">{weatherIcon}</span>
      <span class="temp-value">{temp}°</span>
    </div>
    <div class="weather-desc">{weatherDesc}</div>
  </div>
  <div class="weather-details">
    <div class="weather-detail">
      <span class="detail-icon">💨</span>
      <span class="detail-label">Ветер</span>
      <span class="detail-value">{wind} м/с</span>
    </div>
    <div class="weather-detail">
      <span class="detail-icon">💧</span>
      <span class="detail-label">Влажность</span>
      <span class="detail-value">{humidity}%</span>
    </div>
    <div class="weather-detail">
      <span class="detail-icon">🌡️</span>
      <span class="detail-label">Ощущается</span>
      <span class="detail-value">{feelsLike}°</span>
    </div>
  </div>
</div>

<style>
  .weather-card {
    padding: 16px;
    background: linear-gradient(135deg, rgba(13, 13, 13, 0.7) 0%, rgba(10, 10, 18, 0.7) 100%) !important;
  }

  .weather-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .weather-location {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .weather-date {
    color: var(--text-secondary);
    font-size: 0.75rem;
  }

  .weather-main {
    text-align: center;
    margin-bottom: 16px;
  }

  .weather-temp {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 4px;
  }

  .temp-icon {
    font-size: 1.6rem;
  }

  .temp-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .weather-desc {
    color: var(--text-secondary);
    font-size: 0.8rem;
  }

  .weather-details {
    display: flex;
    justify-content: space-around;
    padding-top: 12px;
    border-top: 1px solid var(--border-color);
  }

  .weather-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
  }

  .detail-icon {
    font-size: 1.1rem;
  }

  .detail-label {
    font-size: 0.65rem;
    color: var(--text-muted);
  }

  .detail-value {
    font-size: 0.75rem;
    font-weight: 600;
  }
</style>