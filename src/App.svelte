<script lang="ts">
  import { onMount } from 'svelte';
  import Weather from './Weather.svelte';

  let message: string = "";
  const apiUrl: string = import.meta.env.VITE_API_URL as string;

  const fetchMessage = async () => {
    try {
      const res = await fetch(`${apiUrl}/welcome`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',  // Ensure this is set to include credentials
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      message = data.message;
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  onMount(() => {
    fetchMessage();
  });
</script>

<main>
  <h1>{message}</h1>
  <Weather />
</main>
