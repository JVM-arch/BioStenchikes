<script>
  import { onMount } from 'svelte';
  import App from './App.svelte';
  import AdminPanel from './admin/AdminPanel.svelte';
  
  let currentRoute = 'home';
  
  onMount(() => {
    function handleRoute() {
      // GitHub Pages использует hash routing
      const hash = window.location.hash;
      const path = window.location.pathname;
      
      // Поддержка как hash (#/admin/profile), так и обычного пути (/admin/profile)
      if (hash === '#/admin/profile' || hash.startsWith('#/admin/profile') || 
          path === '/admin/profile' || path.endsWith('/admin/profile')) {
        currentRoute = 'admin';
      } else {
        currentRoute = 'home';
      }
    }
    
    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    
    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  });
</script>

{#if currentRoute === 'admin'}
  <AdminPanel />
{:else}
  <App />
{/if}

