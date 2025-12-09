<script>
  import TabNavigation from '../components/TabNavigation.svelte';
  import Card from '../components/Card.svelte';
  import Dropdown from '../components/Dropdown.svelte';
  import Slider from '../components/Slider.svelte';
  import ColorPicker from '../components/ColorPicker.svelte';
  import { profileStore } from '../stores/profile.js';
  
  let activeSubTab = 'box-settings';
  let profile = {};
  
  profileStore.subscribe(value => {
    profile = value;
  });
  
  const subTabs = [
    { id: 'box-settings', label: 'Box Settings' },
    { id: 'box-colors', label: 'Box Colors' },
    { id: 'border', label: 'Border' },
    { id: 'layout', label: 'Layout & Alignment' }
  ];
  
  const tiltOptions = [
    { value: 'None', label: 'None' },
    { value: 'Left', label: 'Left' },
    { value: 'Right', label: 'Right' },
    { value: 'Center', label: 'Center' }
  ];
  
  const borderStyles = [
    { value: 'Solid', label: 'Solid' },
    { value: 'Dashed', label: 'Dashed' },
    { value: 'Dotted', label: 'Dotted' },
    { value: 'Double', label: 'Double' },
    { value: 'Groove', label: 'Groove' }
  ];
  
  const alignments = [
    { value: 'Left', label: 'Left' },
    { value: 'Center', label: 'Center' },
    { value: 'Right', label: 'Right' },
    { value: 'Justify', label: 'Justify' }
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

<div class="box-page">
  <TabNavigation tabs={subTabs} activeTab={activeSubTab} on:tabChange={(e) => activeSubTab = e.detail} />
  
  {#if activeSubTab === 'box-settings'}
    <div class="grid">
      <Card title="Box Settings">
        <Dropdown
          label="Box Tilt"
          value={profile.box?.tilt || 'None'}
          options={tiltOptions}
          on:change={(e) => updateProfile('box.tilt', e.detail)}
        />
        <Slider
          label="Box Width"
          value={profile.box?.width || 750}
          min={200}
          max={1000}
          step={10}
          unit="px"
          on:change={(e) => updateProfile('box.width', e.detail)}
        />
        <Slider
          label="Box Inner Spacing"
          value={profile.box?.innerSpacing || 16}
          min={0}
          max={100}
          step={1}
          unit="px"
          on:change={(e) => updateProfile('box.innerSpacing', e.detail)}
        />
        <Slider
          label="Box Radius"
          value={profile.box?.radius || 8}
          min={0}
          max={50}
          step={1}
          unit="px"
          on:change={(e) => updateProfile('box.radius', e.detail)}
        />
        <Slider
          label="Box Blur"
          value={profile.box?.blur || 0}
          min={0}
          max={100}
          step={1}
          unit="%"
          on:change={(e) => updateProfile('box.blur', e.detail)}
        />
      </Card>
    </div>
  {:else if activeSubTab === 'box-colors'}
    <div class="grid">
      <Card title="Box Colors">
        <ColorPicker
          label="Box Color"
          value={profile.box?.color || '#141414'}
          on:change={(e) => updateProfile('box.color', e.detail)}
        />
        <Slider
          label="Box Opacity"
          value={profile.box?.opacity || 100}
          min={0}
          max={100}
          step={1}
          unit="%"
          on:change={(e) => updateProfile('box.opacity', e.detail)}
        />
        <ColorPicker
          label="Box Shadow Color"
          value={profile.box?.shadowColor || '#090909'}
          on:change={(e) => updateProfile('box.shadowColor', e.detail)}
        />
        <Slider
          label="Box Shadow Opacity"
          value={profile.box?.shadowOpacity || 50}
          min={0}
          max={100}
          step={1}
          unit="%"
          on:change={(e) => updateProfile('box.shadowOpacity', e.detail)}
        />
      </Card>
    </div>
  {:else if activeSubTab === 'border'}
    <div class="grid">
      <Card title="Border Settings">
        <Slider
          label="Border Width"
          value={profile.border?.width || 1}
          min={0}
          max={20}
          step={1}
          unit="px"
          on:change={(e) => updateProfile('border.width', e.detail)}
        />
        <ColorPicker
          label="Border Color"
          value={profile.border?.color || '#78728D'}
          on:change={(e) => updateProfile('border.color', e.detail)}
        />
        <Slider
          label="Border Opacity"
          value={profile.border?.opacity || 100}
          min={0}
          max={100}
          step={1}
          unit="%"
          on:change={(e) => updateProfile('border.opacity', e.detail)}
        />
        <Dropdown
          label="Border Style"
          value={profile.border?.style || 'Solid'}
          options={borderStyles}
          on:change={(e) => updateProfile('border.style', e.detail)}
        />
      </Card>
    </div>
  {:else if activeSubTab === 'layout'}
    <div class="grid">
      <Card title="Layout & Alignment">
        <div class="layout-preview">
          <button class="layout-btn" class:active={profile.layout?.type === 'Default'}>
            Default Layout
          </button>
          <button class="layout-btn" class:active={profile.layout?.type === 'Simple'}>
            Simple Layout
          </button>
        </div>
        <Dropdown
          label="Alignment"
          value={profile.layout?.alignment || 'Center'}
          options={alignments}
          on:change={(e) => updateProfile('layout.alignment', e.detail)}
        />
      </Card>
    </div>
  {/if}
</div>

<style>
  .box-page {
    padding: 24px 0;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 24px;
  }
  
  .layout-preview {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
  }
  
  .layout-btn {
    flex: 1;
    padding: 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition: all 200ms;
  }
  
  .layout-btn:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  .layout-btn.active {
    border-color: #3a7bef;
    background: rgba(58, 123, 239, 0.1);
    color: #3a7bef;
  }
</style>

