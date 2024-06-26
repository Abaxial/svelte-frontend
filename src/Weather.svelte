<script lang="ts">
  import { onMount } from 'svelte';

  // Import the API URL environment variable
  const apiUrl = import.meta.env.VITE_API_URL as string;

  interface WeatherData {
    temperature: number;
    description: string;
  }

  let torontoWeather: WeatherData | null = null;
  let burlingtonWeather: WeatherData | null = null;
  let wiartonWeather: WeatherData | null = null;
  let error: string | null = null;

  const fetchWeather = async (cityId: number, cityName: string): Promise<WeatherData> => {
    const res = await fetch(`${apiUrl}/weather?city_id=${cityId}&city_name=${cityName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch weather data: ${res.statusText}`);
    }
    return await res.json();
  };

  onMount(async () => {
    try {
      const [toronto, burlington, wiarton] = await Promise.all([
        fetchWeather(6167865, 'Toronto'),
        fetchWeather(5911592, 'Burlington'),
        fetchWeather(6186122, 'Wiarton')
      ]);
      torontoWeather = toronto;
      burlingtonWeather = burlington;
      wiartonWeather = wiarton;
    } catch (err: any) {
      error = err.message;
    }
  });
</script>

<style>
  .weather {
    display: flex;
    justify-content: space-around;
  }
  .city {
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
</style>

<div class="weather">
  {#if error}
    <p>Error: {error}</p>
  {:else}
    <div class="city">
      <h2>Toronto</h2>
      {#if torontoWeather}
        <p>Temperature: {torontoWeather.temperature} °C</p>
        <p>Weather: {torontoWeather.description}</p>
      {:else}
        <p>Loading...</p>
      {/if}
    </div>
    <div class="city">
      <h2>Burlington</h2>
      {#if burlingtonWeather}
        <p>Temperature: {burlingtonWeather.temperature} °C</p>
        <p>Weather: {burlingtonWeather.description}</p>
      {:else}
        <p>Loading...</p>
      {/if}
    </div>
    <div class="city">
      <h2>Wiarton</h2>
      {#if wiartonWeather}
        <p>Temperature: {wiartonWeather.temperature} °C</p>
        <p>Weather: {wiartonWeather.description}</p>
      {:else}
        <p>Loading...</p>
      {/if}
    </div>
  {/if}
</div>
