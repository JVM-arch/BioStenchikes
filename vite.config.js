import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// GitHub Pages base path
// Если репозиторий называется username.github.io, оставьте base: '/'
// Иначе укажите название репозитория: base: '/НАЗВАНИЕ_РЕПОЗИТОРИЯ/'
// Например, если репозиторий называется 'my-bio', то: base: '/my-bio/'

// Автоматическое определение base path из переменной окружения GitHub Actions
function getBasePath() {
  // В GitHub Actions
  if (process.env.GITHUB_REPOSITORY) {
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
    // Если репозиторий называется username.github.io, base = '/'
    if (repo === `${owner}.github.io` || repo.endsWith('.github.io')) {
      return '/';
    }
    // Иначе base = '/repo-name/'
    return `/${repo}/`;
  }
  
  // Для локальной разработки
  // Для репозитория jvm-arch.github.io base path = '/'
  if (process.env.NODE_ENV === 'production') {
    return '/'; // для jvm-arch.github.io
  }
  
  // Dev режим
  return '/';
}

export default defineConfig({
    plugins: [svelte()],
    base: getBasePath(),
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false, // Отключаем source maps для безопасности
        minify: 'terser', // Используем terser для лучшей обфускации
        terserOptions: {
            compress: {
                drop_console: true, // Удаляем console.log
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.debug']
            },
            mangle: {
                toplevel: true, // Обфусцируем имена переменных
                properties: {
                    regex: /^_/ // Обфусцируем приватные свойства
                }
            }
        },
        rollupOptions: {
            output: {
                manualChunks: undefined,
                // Обфускация имен файлов
                chunkFileNames: 'assets/[hash].js',
                entryFileNames: 'assets/[hash].js',
                assetFileNames: 'assets/[hash].[ext]'
            }
        }
    }
})
