<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';

  export let profile = {
    nickname: '',
    tagline: '',
    status: '',
    bannerSrc: '',
    avatarSrc: '',
    nickAnim: 'none',
    avatarAnim: 'none',
    taglineAnim: 'none',
    backgroundAnim: 'bg-none',
    theme: 'dark',
    backgroundImage: '',
    bgPlacement: 'center',
    socials: [],
    skills: []
  };

  export let animationOptions;
  export let themeOptions = [];

  const dispatch = createEventDispatcher();
  let open = false;
  let authenticated = false;
  let passwordInput = '';
  let storedPass = 'admin123';
  let newPass = '';
  let loginError = '';
  let newSocial = { label: '', url: '' };
  let newCategory = { icon: '⭐', name: 'New', color: 'blue' };
  let newSkill = { name: 'Skill', level: 3 };

  const AUTH_KEY = 'bio-admin-auth';
  const PASS_KEY = 'bio-admin-pass';

  function toggle() {
    open = !open;
  }

  function handleInput(key, event) {
    dispatch('update', { [key]: event.target.value });
  }

  function handleSelect(key, event) {
    dispatch('update', { [key]: event.target.value });
  }

  function handleFile(key, event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      dispatch('update', { [key]: reader.result });
    };
    reader.readAsDataURL(file);
  }

  function addSocial() {
    if (!newSocial.label || !newSocial.url) return;
    const updated = [...(profile.socials || []), { ...newSocial }];
    dispatch('update', { socials: updated });
    newSocial = { label: '', url: '' };
  }

  function removeSocial(index) {
    const updated = (profile.socials || []).filter((_, i) => i !== index);
    dispatch('update', { socials: updated });
  }

  function addCategory() {
    const updated = [...(profile.skills || []), { ...newCategory, skills: [] }];
    dispatch('update', { skills: updated });
  }

  function updateCategory(idx, key, value) {
    const updated = (profile.skills || []).map((cat, i) => i === idx ? { ...cat, [key]: value } : cat);
    dispatch('update', { skills: updated });
  }

  function removeCategory(idx) {
    const updated = (profile.skills || []).filter((_, i) => i !== idx);
    dispatch('update', { skills: updated });
  }

  function addSkill(idx) {
    const updated = (profile.skills || []).map((cat, i) => {
      if (i !== idx) return cat;
      return { ...cat, skills: [...(cat.skills || []), { ...newSkill }] };
    });
    dispatch('update', { skills: updated });
  }

  function updateSkill(idx, skillIdx, key, value) {
    const updated = (profile.skills || []).map((cat, i) => {
      if (i !== idx) return cat;
      const skills = (cat.skills || []).map((s, si) => si === skillIdx ? { ...s, [key]: value } : s);
      return { ...cat, skills };
    });
    dispatch('update', { skills: updated });
  }

  function removeSkill(idx, skillIdx) {
    const updated = (profile.skills || []).map((cat, i) => {
      if (i !== idx) return cat;
      const skills = (cat.skills || []).filter((_, si) => si !== skillIdx);
      return { ...cat, skills };
    });
    dispatch('update', { skills: updated });
  }

  function login() {
    if (passwordInput === storedPass) {
      authenticated = true;
      loginError = '';
      localStorage.setItem(AUTH_KEY, '1');
    } else {
      loginError = 'Неверный пароль';
    }
  }

  function logout() {
    authenticated = false;
    localStorage.removeItem(AUTH_KEY);
  }

  function savePassword() {
    if (!newPass) return;
    storedPass = newPass;
    localStorage.setItem(PASS_KEY, storedPass);
    newPass = '';
  }

  function onKeydown(e) {
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') {
      e.preventDefault();
      toggle();
    }
  }

  onMount(() => {
    try {
      const savedPass = localStorage.getItem(PASS_KEY);
      if (savedPass) storedPass = savedPass;
      authenticated = localStorage.getItem(AUTH_KEY) === '1';
    } catch (e) {
      console.warn('Auth load error', e);
    }
    window.addEventListener('keydown', onKeydown);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', onKeydown);
  });
</script>

<!-- Invisible toggle in the corner -->
<button class="admin-hotspot" aria-label="Toggle admin panel" on:click={toggle}></button>

{#if open}
  <div class="admin-panel card">
    <div class="panel-header">
      <div>
        <div class="panel-title">Admin</div>
        <div class="panel-sub">Ctrl+Alt+A toggle</div>
      </div>
      <div class="panel-actions">
        {#if authenticated}
          <button class="ghost-btn" on:click={logout}>Выход</button>
        {/if}
        <button class="ghost-btn" on:click={toggle}>✕</button>
      </div>
    </div>
    
    {#if authenticated}
      <div class="full-admin-link">
        <a href="#/admin/profile" class="full-admin-btn" target="_blank">
          🎨 Open Full Admin Panel →
        </a>
      </div>
    {/if}

    {#if !authenticated}
      <div class="field">
        <label>Пароль</label>
        <input
          type="password"
          placeholder="admin123"
          bind:value={passwordInput}
          on:keydown={(e) => e.key === 'Enter' && login()}
        />
        {#if loginError}
          <div class="error">{loginError}</div>
        {/if}
        <button class="primary-btn" on:click={login}>Войти</button>
      </div>
    {:else}
      <div class="grid">
        <div class="field">
          <label>Nickname</label>
          <input
            type="text"
            value={profile.nickname}
            on:input={(e) => handleInput('nickname', e)}
            placeholder="Your name"
          />
        </div>

        <div class="field">
          <label>Tagline</label>
          <input
            type="text"
            value={profile.tagline}
            on:input={(e) => handleInput('tagline', e)}
            placeholder="Subtitle"
          />
        </div>

        <div class="field">
          <label>Status</label>
          <input
            type="text"
            value={profile.status}
            on:input={(e) => handleInput('status', e)}
            placeholder="Online"
          />
        </div>

        <div class="field">
          <label>Тема</label>
          <select value={profile.theme} on:change={(e) => handleSelect('theme', e)}>
            {#each themeOptions as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>

        <div class="field">
          <label>Banner URL (img/gif/mp4/webm)</label>
          <input
            type="text"
            value={profile.bannerSrc}
            on:input={(e) => handleInput('bannerSrc', e)}
            placeholder="/src/assets/willow-banner.jpg"
          />
          <input type="file" accept="image/*,video/mp4,video/webm" on:change={(e) => handleFile('bannerSrc', e)} />
        </div>

        <div class="field">
          <label>Avatar URL</label>
          <input
            type="text"
            value={profile.avatarSrc}
            on:input={(e) => handleInput('avatarSrc', e)}
            placeholder="/src/assets/avatar.jpg"
          />
          <input type="file" accept="image/*" on:change={(e) => handleFile('avatarSrc', e)} />
        </div>

        <div class="field">
          <label>Фон (изображение)</label>
          <input
            type="text"
            value={profile.backgroundImage}
            on:input={(e) => handleInput('backgroundImage', e)}
            placeholder="URL или оставить пустым"
          />
          <input type="file" accept="image/*" on:change={(e) => handleFile('backgroundImage', e)} />
          <label class="sub">Позиция</label>
          <select value={profile.bgPlacement} on:change={(e) => handleSelect('bgPlacement', e)}>
            <option value="top-left">top-left</option>
            <option value="top-right">top-right</option>
            <option value="bottom-left">bottom-left</option>
            <option value="bottom-right">bottom-right</option>
            <option value="center">center</option>
          </select>
        </div>

        <div class="field">
          <label>Анимация ника</label>
          <select value={profile.nickAnim} on:change={(e) => handleSelect('nickAnim', e)}>
            {#each animationOptions.nick as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>

        <div class="field">
          <label>Анимация аватара</label>
          <select value={profile.avatarAnim} on:change={(e) => handleSelect('avatarAnim', e)}>
            {#each animationOptions.avatar as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>

        <div class="field">
          <label>Анимация описания</label>
          <select value={profile.taglineAnim} on:change={(e) => handleSelect('taglineAnim', e)}>
            {#each animationOptions.tagline as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>

        <div class="field">
          <label>Анимация фона</label>
          <select value={profile.backgroundAnim} on:change={(e) => handleSelect('backgroundAnim', e)}>
            {#each animationOptions.background as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>

        <div class="field">
          <label>Новый пароль (опционально)</label>
          <input
            type="password"
            placeholder="новый пароль"
            bind:value={newPass}
            on:keydown={(e) => e.key === 'Enter' && savePassword()}
          />
          <button class="ghost-btn" on:click={savePassword}>Сохранить пароль</button>
        </div>
      </div>

      <div class="field">
        <label>Соцсети</label>
        <div class="social-list">
          {#each profile.socials || [] as social, index}
            <div class="social-row">
              <span>{social.label}</span>
              <span class="muted">{social.url}</span>
              <button class="ghost-btn small" on:click={() => removeSocial(index)}>Удалить</button>
            </div>
          {/each}
        </div>
        <div class="social-add">
          <input
            type="text"
            placeholder="Label"
            bind:value={newSocial.label}
          />
          <input
            type="text"
            placeholder="https://..."
            bind:value={newSocial.url}
          />
          <button class="primary-btn" on:click={addSocial}>Добавить</button>
        </div>
      </div>

      <div class="field">
        <label>Навыки</label>
        <div class="category-list">
          {#each profile.skills || [] as category, idx}
            <div class="category-row">
              <div class="category-head">
                <input type="text" value={category.icon} on:input={(e) => updateCategory(idx, 'icon', e.target.value)} class="icon-input" />
                <input type="text" value={category.name} on:input={(e) => updateCategory(idx, 'name', e.target.value)} />
                <input type="text" value={category.color} on:input={(e) => updateCategory(idx, 'color', e.target.value)} />
                <button class="ghost-btn small" on:click={() => removeCategory(idx)}>Удалить</button>
              </div>
              <div class="skill-list-admin">
                {#each category.skills || [] as skill, si}
                  <div class="skill-row">
                    <input type="text" value={skill.name} on:input={(e) => updateSkill(idx, si, 'name', e.target.value)} />
                    <input type="range" min="0" max="5" step="0.5" value={skill.level} on:input={(e) => updateSkill(idx, si, 'level', parseFloat(e.target.value))} />
                    <span class="muted">{skill.level}/5</span>
                    <button class="ghost-btn small" on:click={() => removeSkill(idx, si)}>×</button>
                  </div>
                {/each}
                <button class="ghost-btn small" on:click={() => addSkill(idx)}>+ Навык</button>
              </div>
            </div>
          {/each}
          <div class="category-add">
            <input type="text" placeholder="Icon" bind:value={newCategory.icon} />
            <input type="text" placeholder="Name" bind:value={newCategory.name} />
            <input type="text" placeholder="Color" bind:value={newCategory.color} />
            <button class="primary-btn" on:click={addCategory}>+ Категория</button>
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .admin-hotspot {
    position: fixed;
    bottom: 12px;
    left: 12px;
    width: 22px;
    height: 22px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    opacity: 0.08;
    cursor: pointer;
    z-index: 30;
    transition: opacity 0.2s ease, transform 0.2s ease;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.35);
  }

  .admin-hotspot:hover {
    opacity: 0.35;
    transform: scale(1.05);
  }

  .admin-panel {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 320px;
    background: rgba(12, 12, 12, 0.82);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 14px 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    z-index: 50;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .panel-actions {
    display: flex;
    gap: 8px;
  }

  .panel-title {
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .panel-sub {
    color: #777;
    font-size: 0.7rem;
  }

  .ghost-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #fff;
    border-radius: 10px;
    padding: 6px 10px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .ghost-btn:hover {
    border-color: rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.08);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  label {
    font-size: 0.75rem;
    color: #bbb;
    letter-spacing: 0.3px;
  }

  input {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 10px 12px;
    color: #fff;
    font-size: 0.85rem;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  input:focus {
    border-color: rgba(99, 102, 241, 0.6);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }

  select {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 10px 12px;
    color: #fff;
    font-size: 0.85rem;
    outline: none;
  }

  .primary-btn {
    background: #6366f1;
    color: #fff;
    border: 1px solid #7c7ef6;
    border-radius: 10px;
    padding: 8px 12px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .primary-btn:hover {
    filter: brightness(1.08);
  }

  .social-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .social-row {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 8px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    background: rgba(255,255,255,0.03);
  }

  .muted {
    color: #888;
    font-size: 0.78rem;
  }

  .social-add {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 8px;
    align-items: center;
  }

  .category-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .category-row {
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 10px;
    background: rgba(255,255,255,0.02);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .category-head {
    display: grid;
    grid-template-columns: 60px 1fr 120px auto;
    gap: 8px;
    align-items: center;
  }

  .icon-input {
    text-align: center;
  }

  .skill-list-admin {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .skill-row {
    display: grid;
    grid-template-columns: 1fr 140px 50px 32px;
    gap: 8px;
    align-items: center;
  }

  .category-add {
    display: grid;
    grid-template-columns: 80px 1fr 120px auto;
    gap: 8px;
    align-items: center;
  }

  .sub {
    font-size: 0.75rem;
    color: #999;
    margin-top: 6px;
  }

  .small {
    padding: 4px 8px;
  }

  .error {
    color: #f87171;
    font-size: 0.8rem;
  }

  .full-admin-link {
    margin: 12px 0;
    padding: 12px;
    background: rgba(58, 123, 239, 0.1);
    border: 1px solid rgba(58, 123, 239, 0.3);
    border-radius: 8px;
  }

  .full-admin-btn {
    display: block;
    width: 100%;
    text-align: center;
    color: #3a7bef;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 8px;
    border-radius: 6px;
    transition: all 200ms;
  }

  .full-admin-btn:hover {
    background: rgba(58, 123, 239, 0.2);
    color: #5b8ef0;
  }

  @media (max-width: 520px) {
    .admin-panel {
      width: calc(100% - 32px);
      right: 16px;
      left: 16px;
      bottom: 16px;
    }

    .admin-hotspot {
      bottom: 10px;
      left: 10px;
    }
  }
</style>

