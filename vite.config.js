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
    if (repo === `${owner}.github.io`) {
      return '/';
    }
    // Иначе base = '/repo-name/'
    return `/${repo}/`;
  }
  
  // Для локальной разработки
  if (process.env.NODE_ENV === 'production') {
    // Если вы знаете название репозитория, укажите его здесь:
    // Например, если репозиторий называется 'BIO', то:
    // return '/BIO/';
    // Если репозиторий называется 'my-bio', то:
    // return '/my-bio/';
    // Если репозиторий называется 'username.github.io', оставьте:
    return '/'; // по умолчанию для username.github.io
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
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: undefined
            }
        }
    }
})
