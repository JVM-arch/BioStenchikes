<script>
  import Card from '../components/Card.svelte';
  import FormInput from '../components/FormInput.svelte';
  import Dropdown from '../components/Dropdown.svelte';
  import Modal from '../components/Modal.svelte';
  import { profileStore } from '../stores/profile.js';
  import { toast } from '../stores/toast.js';
  
  let profile = {};
  let showAddModal = false;
  let newLink = {
    platform: 'custom',
    label: '',
    url: '',
    style: 'Icon+Text'
  };
  
  profileStore.subscribe(value => {
    profile = value;
  });
  
  const platforms = [
    { value: 'discord', label: 'Discord', icon: '💬' },
    { value: 'telegram', label: 'Telegram', icon: '✈️' },
    { value: 'twitter', label: 'Twitter', icon: '🐦' },
    { value: 'youtube', label: 'YouTube', icon: '📺' },
    { value: 'instagram', label: 'Instagram', icon: '📷' },
    { value: 'tiktok', label: 'TikTok', icon: '🎵' },
    { value: 'twitch', label: 'Twitch', icon: '🎮' },
    { value: 'reddit', label: 'Reddit', icon: '🤖' },
    { value: 'github', label: 'GitHub', icon: '💻' },
    { value: 'linkedin', label: 'LinkedIn', icon: '💼' },
    { value: 'custom', label: 'Custom', icon: '🔗' }
  ];
  
  const styleOptions = [
    { value: 'Icon', label: 'Icon Only' },
    { value: 'Text', label: 'Text Only' },
    { value: 'Icon+Text', label: 'Icon + Text' }
  ];
  
  function addLink() {
    if (!newLink.label || !newLink.url) {
      toast.error('Please fill in label and URL');
      return;
    }
    
    const linkCount = (profile.links || []).length;
    if (linkCount >= 25) {
      toast.error('Maximum 25 links allowed');
      return;
    }
    
    if (!profile.links) {
      profileStore.update(p => ({ ...p, links: [] }));
    }
    
    const link = {
      id: Date.now(),
      ...newLink
    };
    
    profileStore.update(p => ({
      ...p,
      links: [...(p.links || []), link]
    }));
    
    toast.success('Link added successfully');
    showAddModal = false;
    newLink = { platform: 'custom', label: '', url: '', style: 'Icon+Text' };
  }
  
  function removeLink(id) {
    profileStore.update(p => ({
      ...p,
      links: (p.links || []).filter(l => l.id !== id)
    }));
    toast.success('Link removed');
  }
  
  function getPlatformIcon(platform) {
    const p = platforms.find(pl => pl.value === platform);
    return p ? p.icon : '🔗';
  }
  
  function getPlatformLabel(platform) {
    const p = platforms.find(pl => pl.value === platform);
    return p ? p.label : platform;
  }
  
  $: linkCount = (profile.links || []).length;
</script>

<div class="links-page">
  <div class="page-header">
    <div>
      <h2>Links</h2>
      <p class="link-counter">Links: {linkCount}/25</p>
    </div>
    <button class="btn-primary" on:click={() => showAddModal = true} disabled={linkCount >= 25}>
      + Add Link
    </button>
  </div>
  
  <div class="links-grid">
    {#each (profile.links || []) as link, index}
      <Card>
        <div class="link-header">
          <div class="link-info">
            <span class="link-icon">{getPlatformIcon(link.platform)}</span>
            <div>
              <div class="link-label">{link.label || getPlatformLabel(link.platform)}</div>
              <div class="link-url">{link.url}</div>
            </div>
          </div>
          <div class="link-number">#{index + 1}</div>
        </div>
        <div class="link-preview">
          <div class="link-preview-item" class:icon-only={link.style === 'Icon'} class:text-only={link.style === 'Text'}>
            {#if link.style !== 'Text'}
              <span class="preview-icon">{getPlatformIcon(link.platform)}</span>
            {/if}
            {#if link.style !== 'Icon'}
              <span class="preview-text">{link.label || getPlatformLabel(link.platform)}</span>
            {/if}
          </div>
        </div>
        <div class="link-actions">
          <span class="link-style">{link.style}</span>
          <button class="btn-delete" on:click={() => removeLink(link.id)}>Delete</button>
        </div>
      </Card>
    {:else}
      <div class="empty-state">
        <p>No links yet. Click "+ Add Link" to get started.</p>
      </div>
    {/each}
  </div>
</div>

<Modal open={showAddModal} title="Add Link" on:close={() => showAddModal = false}>
  <div class="add-link-form">
    <Dropdown
      label="Platform"
      value={newLink.platform}
      options={platforms}
      on:change={(e) => newLink.platform = e.detail}
    />
    
    {#if newLink.platform === 'custom'}
      <FormInput
        label="Link Label"
        value={newLink.label}
        on:change={(e) => newLink.label = e.detail}
        placeholder="My Website"
        maxlength={50}
      />
    {/if}
    
    <FormInput
      label={newLink.platform === 'custom' ? 'URL' : `${getPlatformLabel(newLink.platform)} URL/ID/Username`}
      value={newLink.url}
      on:change={(e) => newLink.url = e.detail}
      placeholder={newLink.platform === 'custom' ? 'https://...' : `Enter ${getPlatformLabel(newLink.platform)} link`}
      maxlength={250}
    />
    
    <Dropdown
      label="Style"
      value={newLink.style}
      options={styleOptions}
      on:change={(e) => newLink.style = e.detail}
    />
    
    <div class="link-preview-section">
      <label>Preview</label>
      <div class="link-preview-item" class:icon-only={newLink.style === 'Icon'} class:text-only={newLink.style === 'Text'}>
        {#if newLink.style !== 'Text'}
          <span class="preview-icon">{getPlatformIcon(newLink.platform)}</span>
        {/if}
        {#if newLink.style !== 'Icon'}
          <span class="preview-text">{newLink.label || getPlatformLabel(newLink.platform)}</span>
        {/if}
      </div>
    </div>
  </div>
  
  <div slot="footer">
    <button class="btn-secondary" on:click={() => showAddModal = false}>Cancel</button>
    <button class="btn-primary" on:click={addLink}>Add Link</button>
  </div>
</Modal>

<style>
  .links-page {
    padding: 24px 0;
  }
  
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  
  .page-header h2 {
    font-size: 24px;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
  }
  
  .link-counter {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    margin: 4px 0 0 0;
  }
  
  .links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }
  
  .link-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  
  .link-info {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
  }
  
  .link-icon {
    font-size: 32px;
  }
  
  .link-label {
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 4px;
  }
  
  .link-url {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
    word-break: break-all;
  }
  
  .link-number {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.4);
    font-weight: 600;
  }
  
  .link-preview {
    margin: 16px 0;
    padding: 16px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
  }
  
  .link-preview-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: rgba(58, 123, 239, 0.1);
    border: 1px solid rgba(58, 123, 239, 0.3);
    border-radius: 8px;
  }
  
  .link-preview-item.icon-only {
    justify-content: center;
  }
  
  .link-preview-item.text-only {
    justify-content: center;
  }
  
  .preview-icon {
    font-size: 24px;
  }
  
  .preview-text {
    font-weight: 500;
    color: #ffffff;
  }
  
  .link-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
  }
  
  .link-style {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
  }
  
  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 48px;
    color: rgba(255, 255, 255, 0.4);
  }
  
  .add-link-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .link-preview-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .link-preview-section label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
  }
</style>

