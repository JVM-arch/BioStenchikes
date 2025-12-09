<script>
  import TabNavigation from '../components/TabNavigation.svelte';
  import Card from '../components/Card.svelte';
  import Dropdown from '../components/Dropdown.svelte';
  import Slider from '../components/Slider.svelte';
  import ColorPicker from '../components/ColorPicker.svelte';
  import Toggle from '../components/Toggle.svelte';
  import { profileStore } from '../stores/profile.js';
  
  let activeSubTab = 'typography';
  let profile = {};
  
  profileStore.subscribe(value => {
    profile = value;
  });
  
  const subTabs = [
    { id: 'typography', label: 'Typography' },
    { id: 'colors', label: 'Colors' },
    { id: 'effects', label: 'Effects' },
    { id: 'animations', label: 'Animations' }
  ];
  
  const fonts = [
    { value: 'Unbounded', label: 'Unbounded' },
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'IBM Plex Mono', label: 'IBM Plex Mono' }
  ];
  
  const sparkleOptions = [
    { value: 'None', label: 'None' },
    { value: 'Black', label: 'Black' },
    { value: 'Gold', label: 'Gold' },
    { value: 'Silver', label: 'Silver' },
    { value: 'Rainbow', label: 'Rainbow' }
  ];
  
  const overlayOptions = [
    { value: 'None', label: 'None' },
    { value: 'Glitch', label: 'Glitch' },
    { value: 'Blur', label: 'Blur' },
    { value: 'Film Grain', label: 'Film Grain' }
  ];
  
  const enterAnimations = [
    { value: 'None', label: 'None' },
    { value: 'Zoom', label: 'Zoom' },
    { value: 'Slide', label: 'Slide' },
    { value: 'Fade', label: 'Fade' },
    { value: 'Rotate', label: 'Rotate' }
  ];
  
  const titleAnimations = [
    { value: 'None', label: 'None' },
    { value: 'Typing', label: 'Typing' },
    { value: 'Fade', label: 'Fade' },
    { value: 'Slide', label: 'Slide' },
    { value: 'Wave', label: 'Wave' }
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
</script>

<div class="appearance-page">
  <TabNavigation tabs={subTabs} activeTab={activeSubTab} on:tabChange={(e) => activeSubTab = e.detail} />
  
  {#if activeSubTab === 'typography'}
    <div class="grid">
      <Card title="Font Settings">
        <Dropdown
          label="Font Family"
          value={profile.typography?.font || 'Inter'}
          options={fonts}
          on:change={(e) => updateProfile('typography.font', e.detail)}
        />
        <div class="preview-box">
          <p class="preview-text" style="font-family: {profile.typography?.font || 'Inter'}; font-size: {profile.typography?.fontSize || 16}px; color: {profile.typography?.primaryTextColor || '#ffffff'}; letter-spacing: {profile.typography?.letterSpacing || 0}px;">
            Preview Text: The quick brown fox jumps over the lazy dog
          </p>
        </div>
        <Slider
          label="Font Size"
          value={profile.typography?.fontSize || 16}
          min={12}
          max={32}
          step={1}
          unit="px"
          on:change={(e) => updateProfile('typography.fontSize', e.detail)}
        />
        <ColorPicker
          label="Primary Text Color"
          value={profile.typography?.primaryTextColor || '#ffffff'}
          on:change={(e) => updateProfile('typography.primaryTextColor', e.detail)}
        />
        <Slider
          label="Letter Spacing"
          value={profile.typography?.letterSpacing || 0}
          min={-2}
          max={2}
          step={0.1}
          unit="px"
          on:change={(e) => updateProfile('typography.letterSpacing', e.detail)}
        />
      </Card>
    </div>
  {:else if activeSubTab === 'colors'}
    <div class="grid">
      <Card title="Color Palette">
        <ColorPicker
          label="Primary Color"
          value={profile.colors?.primary || '#3a7bef'}
          on:change={(e) => updateProfile('colors.primary', e.detail)}
        />
        <ColorPicker
          label="Secondary Color"
          value={profile.colors?.secondary || '#aba29e'}
          on:change={(e) => updateProfile('colors.secondary', e.detail)}
        />
        <ColorPicker
          label="Accent Color"
          value={profile.colors?.accent || '#3a7bef'}
          on:change={(e) => updateProfile('colors.accent', e.detail)}
        />
        <ColorPicker
          label="Background Color"
          value={profile.colors?.background || '#090909'}
          on:change={(e) => updateProfile('colors.background', e.detail)}
        />
      </Card>
    </div>
  {:else if activeSubTab === 'effects'}
    <div class="grid">
      <Card title="Visual Effects">
        <Dropdown
          label="Username Sparkles"
          value={profile.effects?.usernameSparkles || 'None'}
          options={sparkleOptions}
          on:change={(e) => updateProfile('effects.usernameSparkles', e.detail)}
        />
        <Toggle
          label="Avatar Glow"
          value={profile.effects?.avatarGlow || false}
          on:change={(e) => updateProfile('effects.avatarGlow', e.detail)}
        />
        {#if profile.effects?.avatarGlow}
          <Slider
            label="Avatar Glow Intensity"
            value={profile.effects?.avatarGlowIntensity || 50}
            min={0}
            max={100}
            step={1}
            unit="%"
            on:change={(e) => updateProfile('effects.avatarGlowIntensity', e.detail)}
          />
        {/if}
        <Toggle
          label="Background Parallax"
          value={profile.effects?.backgroundParallax || false}
          on:change={(e) => updateProfile('effects.backgroundParallax', e.detail)}
        />
        <Toggle
          label="Background Zoom"
          value={profile.effects?.backgroundZoom || false}
          on:change={(e) => updateProfile('effects.backgroundZoom', e.detail)}
        />
        {#if profile.effects?.backgroundZoom}
          <Slider
            label="Background Zoom Intensity"
            value={profile.effects?.backgroundZoomIntensity || 50}
            min={0}
            max={100}
            step={1}
            unit="%"
            on:change={(e) => updateProfile('effects.backgroundZoomIntensity', e.detail)}
          />
        {/if}
        <Toggle
          label="Film Grain"
          value={profile.effects?.filmGrain || false}
          on:change={(e) => updateProfile('effects.filmGrain', e.detail)}
        />
        {#if profile.effects?.filmGrain}
          <Slider
            label="Film Grain Intensity"
            value={profile.effects?.filmGrainIntensity || 50}
            min={0}
            max={100}
            step={1}
            unit="%"
            on:change={(e) => updateProfile('effects.filmGrainIntensity', e.detail)}
          />
        {/if}
        <Toggle
          label="Vignette"
          value={profile.effects?.vignette || false}
          on:change={(e) => updateProfile('effects.vignette', e.detail)}
        />
      </Card>
    </div>
  {:else if activeSubTab === 'animations'}
    <div class="grid">
      <Card title="Page Animations">
        <Dropdown
          label="Page Overlay"
          value={profile.animations?.pageOverlay || 'None'}
          options={overlayOptions}
          on:change={(e) => updateProfile('animations.pageOverlay', e.detail)}
        />
        <Dropdown
          label="Page Enter Animation"
          value={profile.animations?.pageEnter || 'None'}
          options={enterAnimations}
          on:change={(e) => updateProfile('animations.pageEnter', e.detail)}
        />
        <Slider
          label="Page Enter Animation Speed"
          value={profile.animations?.pageEnterSpeed || 400}
          min={350}
          max={600}
          step={50}
          unit="ms"
          on:change={(e) => updateProfile('animations.pageEnterSpeed', e.detail)}
        />
        <Dropdown
          label="Page Title Animation"
          value={profile.animations?.pageTitleAnimation || 'None'}
          options={titleAnimations}
          on:change={(e) => updateProfile('animations.pageTitleAnimation', e.detail)}
        />
        <Slider
          label="Page Title Animation Speed"
          value={profile.animations?.pageTitleSpeed || 400}
          min={305}
          max={500}
          step={50}
          unit="ms"
          on:change={(e) => updateProfile('animations.pageTitleSpeed', e.detail)}
        />
      </Card>
    </div>
  {/if}
</div>

<style>
  .appearance-page {
    padding: 24px 0;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 24px;
  }
  
  .preview-box {
    padding: 24px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    margin: 16px 0;
  }
  
  .preview-text {
    margin: 0;
  }
</style>

