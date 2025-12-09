<script>
  import TabNavigation from '../components/TabNavigation.svelte';
  import Card from '../components/Card.svelte';
  import FileUpload from '../components/FileUpload.svelte';
  import Slider from '../components/Slider.svelte';
  import Dropdown from '../components/Dropdown.svelte';
  import ColorPicker from '../components/ColorPicker.svelte';
  import Toggle from '../components/Toggle.svelte';
  import { profileStore } from '../stores/profile.js';
  
  let activeSubTab = 'banner';
  let profile = {};
  
  profileStore.subscribe(value => {
    profile = value;
  });
  
  const subTabs = [
    { id: 'banner', label: 'Banner' },
    { id: 'background', label: 'Background' },
    { id: 'avatar', label: 'Avatar' },
    { id: 'favicon', label: 'Favicon' }
  ];
  
  const backgroundSizes = [
    { value: 'Cover', label: 'Cover' },
    { value: 'Contain', label: 'Contain' },
    { value: 'Fill', label: 'Fill' },
    { value: 'Auto', label: 'Auto' }
  ];
  
  const avatarDecorations = [
    { value: 'None', label: 'None' },
    { value: 'Glow', label: 'Glow' },
    { value: 'Border', label: 'Border' },
    { value: 'Frame', label: 'Frame' },
    { value: 'Glitch', label: 'Glitch' }
  ];
  
  function updateProfile(key, value) {
    profileStore.update(p => {
      const newProfile = { ...p };
      const keys = key.split('.');
      let obj = newProfile;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]] = { ...obj[keys[i]] };
      }
      obj[keys[keys.length - 1]] = value;
      return newProfile;
    });
  }
  
  function handleBannerChange(e) {
    updateProfile('banner.src', e.detail);
  }
  
  function handleBackgroundChange(e) {
    updateProfile('background.src', e.detail);
  }
  
  function handleAvatarChange(e) {
    updateProfile('avatar.src', e.detail);
  }
  
  function handleFaviconChange(e) {
    updateProfile('favicon.src', e.detail);
  }
</script>

<div class="media-page">
  <TabNavigation tabs={subTabs} activeTab={activeSubTab} on:tabChange={(e) => activeSubTab = e.detail} />
  
  {#if activeSubTab === 'banner'}
    <div class="grid">
      <Card title="Banner Settings">
        <FileUpload
          label="Banner Image"
          accept="image/*,video/*"
          maxSizeMB={25}
          value={profile.banner?.src || ''}
          showRemoveBg={true}
          on:change={handleBannerChange}
        />
        <Slider
          label="Banner Opacity"
          value={profile.banner?.opacity || 100}
          min={0}
          max={100}
          step={1}
          unit="%"
          on:change={(e) => updateProfile('banner.opacity', e.detail)}
        />
        <Slider
          label="Banner Blur"
          value={profile.banner?.blur || 0}
          min={0}
          max={100}
          step={1}
          unit="%"
          on:change={(e) => updateProfile('banner.blur', e.detail)}
        />
      </Card>
    </div>
  {:else if activeSubTab === 'background'}
    <div class="grid">
      <Card title="Background Settings">
        <FileUpload
          label="Background Image"
          accept="image/*"
          maxSizeMB={25}
          value={profile.background?.src || ''}
          showRemoveBg={true}
          on:change={handleBackgroundChange}
        />
        <Dropdown
          label="Background Size"
          value={profile.background?.size || 'Cover'}
          options={backgroundSizes}
          on:change={(e) => updateProfile('background.size', e.detail)}
        />
        <Slider
          label="Background Blur"
          value={profile.background?.blur || 0}
          min={0}
          max={100}
          step={1}
          unit="%"
          on:change={(e) => updateProfile('background.blur', e.detail)}
        />
        <Slider
          label="Background Opacity"
          value={profile.background?.opacity || 100}
          min={0}
          max={100}
          step={1}
          unit="%"
          on:change={(e) => updateProfile('background.opacity', e.detail)}
        />
        <ColorPicker
          label="Background Color"
          value={profile.background?.color || '#090909'}
          on:change={(e) => updateProfile('background.color', e.detail)}
        />
      </Card>
    </div>
  {:else if activeSubTab === 'avatar'}
    <div class="grid">
      <Card title="Avatar Settings">
        <FileUpload
          label="Avatar Image"
          accept="image/*"
          maxSizeMB={25}
          value={profile.avatar?.src || ''}
          showRemoveBg={true}
          on:change={handleAvatarChange}
        />
        <Dropdown
          label="Avatar Decoration"
          value={profile.avatar?.decoration || 'None'}
          options={avatarDecorations}
          on:change={(e) => updateProfile('avatar.decoration', e.detail)}
        />
        <Slider
          label="Avatar Radius"
          value={profile.avatar?.radius || 50}
          min={0}
          max={100}
          step={1}
          unit="px"
          on:change={(e) => updateProfile('avatar.radius', e.detail)}
        />
        <Toggle
          label="Avatar Glow"
          value={profile.avatar?.glow || false}
          on:change={(e) => updateProfile('avatar.glow', e.detail)}
        />
        {#if profile.avatar?.glow}
          <ColorPicker
            label="Avatar Glow Color"
            value={profile.avatar?.glowColor || '#3a7bef'}
            on:change={(e) => updateProfile('avatar.glowColor', e.detail)}
          />
        {/if}
        <Toggle
          label="Avatar Border Glow"
          value={profile.avatar?.borderGlow || false}
          on:change={(e) => updateProfile('avatar.borderGlow', e.detail)}
        />
        <Toggle
          label="Avatar Rotation"
          value={profile.avatar?.rotation || false}
          on:change={(e) => updateProfile('avatar.rotation', e.detail)}
        />
        {#if profile.avatar?.rotation}
          <Slider
            label="Rotation Speed"
            value={profile.avatar?.rotationSpeed || 5}
            min={1}
            max={10}
            step={1}
            on:change={(e) => updateProfile('avatar.rotationSpeed', e.detail)}
          />
        {/if}
      </Card>
    </div>
  {:else if activeSubTab === 'favicon'}
    <div class="grid">
      <Card title="Favicon Settings">
        <FileUpload
          label="Favicon"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          maxSizeMB={25}
          value={profile.favicon?.src || ''}
          on:change={handleFaviconChange}
        />
      </Card>
    </div>
  {/if}
</div>

<style>
  .media-page {
    padding: 24px 0;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 24px;
  }
</style>

