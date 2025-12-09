<script>
  import { validateCredentials, saveSession, checkSession, clearSession } from '../utils/auth.js';
  import { onMount } from 'svelte';
  
  let username = '';
  let password = '';
  let error = '';
  let loading = false;
  
  // Проверяем существующую сессию
  onMount(() => {
    if (checkSession()) {
      dispatch('authenticated');
    }
  });
  
  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      error = 'Заполните все поля';
      return;
    }
    
    loading = true;
    error = '';
    
    // Небольшая задержка для защиты от брутфорса
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (validateCredentials(username, password)) {
      saveSession();
      dispatch('authenticated');
    } else {
      error = 'Неверный логин или пароль';
      password = '';
    }
    
    loading = false;
  }
  
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="login-page">
  <div class="login-container">
    <div class="login-header">
      <h1>🔐 Admin Panel</h1>
      <p>Введите логин и пароль для доступа</p>
    </div>
    
    <form on:submit|preventDefault={handleLogin} class="login-form">
      <div class="form-group">
        <label for="username">Логин</label>
        <input
          id="username"
          type="text"
          bind:value={username}
          placeholder="Введите логин"
          autocomplete="username"
          disabled={loading}
          autofocus
        />
      </div>
      
      <div class="form-group">
        <label for="password">Пароль</label>
        <input
          id="password"
          type="password"
          bind:value={password}
          placeholder="Введите пароль"
          autocomplete="current-password"
          disabled={loading}
          on:keydown={(e) => e.key === 'Enter' && handleLogin()}
        />
      </div>
      
      {#if error}
        <div class="error-message">{error}</div>
      {/if}
      
      <button type="submit" class="login-button" disabled={loading}>
        {#if loading}
          Загрузка...
        {:else}
          Войти
        {/if}
      </button>
    </form>
    
    <div class="login-footer">
      <p>Защищено системой аутентификации</p>
    </div>
  </div>
</div>

<style>
  .login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0f0f0f;
    padding: 24px;
  }
  
  .login-container {
    width: 100%;
    max-width: 400px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }
  
  .login-header {
    text-align: center;
    margin-bottom: 32px;
  }
  
  .login-header h1 {
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 8px 0;
  }
  
  .login-header p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .form-group label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
  }
  
  .form-group input {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 12px 16px;
    color: #ffffff;
    font-size: 14px;
    outline: none;
    transition: all 200ms;
  }
  
  .form-group input:focus {
    border-color: #3a7bef;
    box-shadow: 0 0 0 3px rgba(58, 123, 239, 0.1);
  }
  
  .form-group input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .error-message {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #ef4444;
    padding: 12px;
    border-radius: 8px;
    font-size: 14px;
    text-align: center;
  }
  
  .login-button {
    background: linear-gradient(135deg, #3a7bef 0%, #2d6fd9 100%);
    color: #ffffff;
    border: none;
    padding: 14px 24px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 200ms;
    margin-top: 8px;
  }
  
  .login-button:hover:not(:disabled) {
    filter: brightness(1.1);
    box-shadow: 0 8px 16px rgba(58, 123, 239, 0.4);
  }
  
  .login-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .login-footer {
    margin-top: 24px;
    text-align: center;
  }
  
  .login-footer p {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
    margin: 0;
  }
</style>

