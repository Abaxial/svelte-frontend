<script>
  let message = "";

  const fetchMessage = async () => {
    try {
      const res = await fetch("http://localhost:3000/welcome", {
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

  fetchMessage();
  import Weather from './Weather.svelte';
</script>

<main>
  <h1>{message}</h1>
  <Weather />
</main>

