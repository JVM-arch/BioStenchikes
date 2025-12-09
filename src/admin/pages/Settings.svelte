<script>
  import TabNavigation from '../components/TabNavigation.svelte';
  import Card from '../components/Card.svelte';
  import Dropdown from '../components/Dropdown.svelte';
  import ColorPicker from '../components/ColorPicker.svelte';
  import FormInput from '../components/FormInput.svelte';
  import { profileStore } from '../stores/profile.js';
  import { toast } from '../stores/toast.js';
  
  let activeSubTab = 'cursor';
  let profile = {};
  
  profileStore.subscribe(value => {
    profile = value;
  });
  
  const subTabs = [
    { id: 'cursor', label: 'Cursor' },
    { id: 'metadata', label: 'Page Metadata' },
    { id: 'export', label: 'Export & Import' },
    { id: 'account', label: 'Account' }
  ];
  
  const cursorStyles = [
    { value: 'System', label: 'System' },
    { value: 'Default', label: 'Default' },
    { value: 'Pointer', label: 'Pointer' },
    { value: 'Crosshair', label: 'Crosshair' },
    { value: 'Custom', label: 'Custom' }
  ];
  
  const cursorTrails = [
    { value: 'None', label: 'None' },
    { value: 'Stars', label: 'Stars' },
    { value: 'Dots', label: 'Dots' },
    { value: 'Light', label: 'Light' },
    { value: 'Fire', label: 'Fire' },
    { value: 'Custom', label: 'Custom' }
  ];
  
  const languages = [
    { value: 'EN', label: 'English' },
    { value: 'RU', label: 'Russian' },
    { value: 'DE', label: 'German' },
    { value: 'FR', label: 'French' },
    { value: 'ES', label: 'Spanish' },
    { value: 'ZH', label: 'Chinese' },
    { value: 'JA', label: 'Japanese' }
  ];
  
  function updateProfile(key, value) {
    profileStore.update(p => {
      const newProfile = { ...p };
      const keys = key.split('.');
      let obj = newProfile;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = {};
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return newProfile;
    });
  }
  
  function exportSettings() {
    const data = JSON.stringify(profile, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `profile-settings-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Settings exported successfully');
  }
  
  function importSettings() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (confirm('This will replace all current settings. Continue?')) {
            profileStore.set(data);
            toast.success('Settings imported successfully');
          }
        } catch (error) {
          toast.error('Invalid file format');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }
</script>

<div class="settings-page">
  <TabNavigation tabs={subTabs} activeTab={activeSubTab} on:tabChange={(e) => activeSubTab = e.detail} />
  
  {#if activeSubTab === 'cursor'}
    <div class="grid">
      <Card title="Cursor Settings">
        <Dropdown
          label="Cursor Style"
          value={profile.cursor?.style || 'System'}
          options={cursorStyles}
          on:change={(e) => updateProfile('cursor.style', e.detail)}
        />
        <Dropdown
          label="Cursor Trail"
          value={profile.cursor?.trail || 'None'}
          options={cursorTrails}
          on:change={(e) => updateProfile('cursor.trail', e.detail)}
        />
        {#if profile.cursor?.trail !== 'None'}
          <ColorPicker
            label="Cursor Trail Color"
            value={profile.cursor?.trailColor || '#3a7bef'}
            on:change={(e) => updateProfile('cursor.trailColor', e.detail)}
          />
        {/if}
        <div class="cursor-preview">
          <label>Preview</label>
          <div class="preview-area" style="cursor: {profile.cursor?.style?.toLowerCase() || 'default'};">
            Hover over this area to see cursor preview
          </div>
        </div>
      </Card>
    </div>
    
  {:else if activeSubTab === 'metadata'}
    <div class="grid">
      <Card title="Page Metadata">
        <FormInput
          label="Page Title"
          value={profile.metadata?.title || ''}
          maxlength={100}
          on:change={(e) => updateProfile('metadata.title', e.detail)}
          placeholder="My Bio Page"
        />
        <FormInput
          label="Page Description"
          value={profile.metadata?.description || ''}
          maxlength={500}
          on:change={(e) => updateProfile('metadata.description', e.detail)}
          placeholder="A brief description of your profile"
        />
        <Dropdown
          label="Page Language"
          value={profile.metadata?.language || 'EN'}
          options={languages}
          on:change={(e) => updateProfile('metadata.language', e.detail)}
        />
      </Card>
    </div>
    
  {:else if activeSubTab === 'export'}
    <div class="grid">
      <Card title="Export & Import Settings">
        <p class="section-description">
          Export your settings to a JSON file for backup or transfer to another device.
        </p>
        <div class="export-actions">
          <button class="btn-primary" on:click={exportSettings}>
            📥 Export Settings
          </button>
          <button class="btn-secondary" on:click={importSettings}>
            📤 Import Settings
          </button>
        </div>
        <p class="section-hint">
          Importing will replace all current settings. Make sure to export first if you want to keep a backup.
        </p>
      </Card>
    </div>
    
  {:else if activeSubTab === 'account'}
    <div class="grid">
      <Card title="Account Settings">
        <div class="account-links">
          <a href="#" class="account-link">
            <span class="link-icon">👤</span>
            <span class="link-text">Account Settings</span>
            <span class="link-arrow">→</span>
          </a>
          <a href="#" class="account-link">
            <span class="link-icon">🔒</span>
            <span class="link-text">Privacy Settings</span>
            <span class="link-arrow">→</span>
          </a>
        </div>
      </Card>
    </div>
  {/if}
</div>

<style>
  .settings-page {
    padding: 24px 0;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 24px;
  }
  
  .cursor-preview {
    margin-top: 20px;
  }
  
  .cursor-preview label {
    display: block;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  .preview-area {
    padding: 32px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
  }
  
  .section-description {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 20px;
  }
  
  .export-actions {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .section-hint {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
  }
  
  .account-links {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .account-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    text-decoration: none;
    color: #ffffff;
    transition: all 200ms;
  }
  
  .account-link:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  .link-icon {
    font-size: 24px;
  }
  
  .link-text {
    flex: 1;
    font-weight: 500;
  }
  
  .link-arrow {
    color: rgba(255, 255, 255, 0.4);
  }
</style>

