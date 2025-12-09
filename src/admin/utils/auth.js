// Безопасная система аутентификации
// Учетные данные хранятся в переменных окружения

// Простое хеширование (для клиентской стороны)
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// Получить учетные данные из переменных окружения или использовать дефолтные
function getCredentials() {
  // Попытка получить из переменных окружения
  const envUsername = import.meta.env.VITE_ADMIN_USERNAME;
  const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;
  
  // Если не заданы, используем дефолтные (но они будут захешированы)
  const defaultUsername = 'admin';
  const defaultPassword = 'admin123';
  
  return {
    username: envUsername || defaultUsername,
    password: envPassword || defaultPassword,
    // Храним хеши для сравнения
    usernameHash: simpleHash(envUsername || defaultUsername),
    passwordHash: simpleHash(envPassword || defaultPassword)
  };
}

// Проверка учетных данных
export function validateCredentials(username, password) {
  const creds = getCredentials();
  
  // Сравниваем хеши вместо прямого сравнения
  const usernameHash = simpleHash(username.toLowerCase().trim());
  const passwordHash = simpleHash(password);
  
  return usernameHash === creds.usernameHash && passwordHash === creds.passwordHash;
}

// Сохранение сессии
export function saveSession() {
  const sessionToken = btoa(Date.now().toString() + Math.random().toString());
  localStorage.setItem('admin_session', sessionToken);
  localStorage.setItem('admin_session_time', Date.now().toString());
  return sessionToken;
}

// Проверка сессии
export function checkSession() {
  const session = localStorage.getItem('admin_session');
  const sessionTime = localStorage.getItem('admin_session_time');
  
  if (!session || !sessionTime) return false;
  
  // Сессия действительна 24 часа
  const sessionAge = Date.now() - parseInt(sessionTime);
  const maxAge = 24 * 60 * 60 * 1000; // 24 часа
  
  if (sessionAge > maxAge) {
    clearSession();
    return false;
  }
  
  return true;
}

// Очистка сессии
export function clearSession() {
  localStorage.removeItem('admin_session');
  localStorage.removeItem('admin_session_time');
}

// Получить подсказку для пользователя (не раскрывает пароль)
export function getHint() {
  const creds = getCredentials();
  // Показываем только первую букву логина
  return `Логин начинается с: ${creds.username.charAt(0).toUpperCase()}`;
}

