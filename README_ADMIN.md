# Admin Panel Documentation

## Установка и настройка

1. **Установите зависимости:**
   ```bash
   npm install
   ```

2. **Настройте Remove.bg API:**
   - Зарегистрируйтесь на https://www.remove.bg/api
   - Получите API ключ
   - Создайте файл `.env` в корне проекта:
   ```
   VITE_REMOVE_BG_API_KEY=your_api_key_here
   ```

3. **Запустите проект:**
   ```bash
   npm run dev
   ```

4. **Откройте админ-панель:**
   - Перейдите по адресу: `http://localhost:5173/#/admin/profile`
   - Или используйте кнопку в основной админке (Ctrl+Alt+A)

## Структура проекта

```
src/admin/
├── components/          # UI компоненты
│   ├── Sidebar.svelte
│   ├── Header.svelte
│   ├── Card.svelte
│   ├── ColorPicker.svelte
│   ├── Slider.svelte
│   ├── FileUpload.svelte
│   ├── Modal.svelte
│   ├── Toast.svelte
│   └── ...
├── pages/              # Страницы/вкладки
│   ├── Appearance.svelte
│   ├── Media.svelte
│   ├── Box.svelte
│   └── ...
├── stores/             # Svelte stores
│   ├── profile.js
│   └── toast.js
└── utils/              # Утилиты
    ├── removeBg.js
    └── fileUpload.js
```

## Функциональность

### Вкладка Appearance (Внешний вид)
- **Typography**: Выбор шрифта, размера, цвета текста, межбуквенного интервала
- **Colors**: Настройка цветовой палитры (Primary, Secondary, Accent, Background)
- **Effects**: Эффекты (Sparkles, Glow, Parallax, Zoom, Film Grain, Vignette)
- **Animations**: Анимации страницы и заголовков

### Вкладка Media (Медиа)
- **Banner**: Загрузка баннера с удалением фона
- **Background**: Настройка фона с различными размерами и эффектами
- **Avatar**: Настройка аватара с декорациями и эффектами
- **Favicon**: Загрузка фавикона

### Вкладка Box & Layout
- **Box Settings**: Настройка размеров, отступов, скруглений
- **Box Colors**: Цвета и прозрачность блока
- **Border**: Настройка границ
- **Layout**: Выбор макета и выравнивания

### Интеграция Remove.bg

Кнопка "✨ Remove Background" появляется после загрузки изображения в:
- Banner
- Background  
- Avatar
- Track Cover

При клике:
1. Изображение отправляется в remove.bg API
2. Показывается модальное окно с preview оригинала и обработанного изображения
3. Можно применить обработанное изображение или отменить

## API Endpoints (для будущей интеграции)

```
GET /api/profile/settings - получить настройки
PUT /api/profile/settings - сохранить настройки
POST /api/profile/upload - загрузить файл
POST /api/profile/remove-background - удалить фон
```

## Сохранение данных

Все настройки сохраняются в `localStorage` с ключом `admin-profile`.
Данные автоматически загружаются при открытии админ-панели.

## Стилизация

Дизайн вдохновлен fakecrime.bio:
- Темная тема (#0f0f0f)
- Glass morphism эффекты
- Акцентный цвет #3a7bef
- Плавные анимации и переходы

## Мобильная версия

Админ-панель адаптивна:
- Sidebar сворачивается на мобильных устройствах
- Grid layout адаптируется под размер экрана
- Модальные окна занимают весь экран на мобильных

