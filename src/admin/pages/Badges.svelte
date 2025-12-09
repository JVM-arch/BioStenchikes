<script>
  import TabNavigation from '../components/TabNavigation.svelte';
  import Card from '../components/Card.svelte';
  import FormInput from '../components/FormInput.svelte';
  import ColorPicker from '../components/ColorPicker.svelte';
  import Dropdown from '../components/Dropdown.svelte';
  import FileUpload from '../components/FileUpload.svelte';
  import Modal from '../components/Modal.svelte';
  import { profileStore } from '../stores/profile.js';
  import { toast } from '../stores/toast.js';
  
  let activeSubTab = 'custom';
  let profile = {};
  let showBadgeModal = false;
  let showTagModal = false;
  let newBadge = {
    name: '',
    icon: '',
    color: '#3a7bef',
    iconSize: 'Medium'
  };
  let newTag = {
    name: '',
    icon: '⭐',
    color: '#3a7bef'
  };
  
  profileStore.subscribe(value => {
    profile = value;
  });
  
  const subTabs = [
    { id: 'custom', label: 'Custom Badges' },
    { id: 'standard', label: 'Standard Badges' },
    { id: 'tags', label: 'Personal Tags' }
  ];
  
  const iconSizeOptions = [
    { value: 'Small', label: 'Small (20px)' },
    { value: 'Medium', label: 'Medium (32px)' },
    { value: 'Large', label: 'Large (48px)' }
  ];
  
  const emojiOptions = ['⭐', '🔥', '💎', '🎯', '⚡', '🌟', '💫', '✨', '🎨', '🚀'];
  
  function addBadge() {
    if (!newBadge.name || !newBadge.icon) {
      toast.error('Please fill in name and icon');
      return;
    }
    
    if (!profile.badges) {
      profileStore.update(p => ({ ...p, badges: [] }));
    }
    
    const badge = {
      id: Date.now(),
      ...newBadge
    };
    
    profileStore.update(p => ({
      ...p,
      badges: [...(p.badges || []), badge]
    }));
    
    toast.success('Badge created successfully');
    showBadgeModal = false;
    newBadge = { name: '', icon: '', color: '#3a7bef', iconSize: 'Medium' };
  }
  
  function removeBadge(id) {
    profileStore.update(p => ({
      ...p,
      badges: (p.badges || []).filter(b => b.id !== id)
    }));
    toast.success('Badge removed');
  }
  
  function addTag() {
    if (!newTag.name) {
      toast.error('Please enter tag name');
      return;
    }
    
    const tagCount = (profile.tags || []).length;
    if (tagCount >= 25) {
      toast.error('Maximum 25 tags allowed');
      return;
    }
    
    if (!profile.tags) {
      profileStore.update(p => ({ ...p, tags: [] }));
    }
    
    const tag = {
      id: Date.now(),
      ...newTag
    };
    
    profileStore.update(p => ({
      ...p,
      tags: [...(p.tags || []), tag]
    }));
    
    toast.success('Tag added successfully');
    showTagModal = false;
    newTag = { name: '', icon: '⭐', color: '#3a7bef' };
  }
  
  function removeTag(id) {
    profileStore.update(p => ({
      ...p,
      tags: (p.tags || []).filter(t => t.id !== id)
    }));
    toast.success('Tag removed');
  }
  
  $: tagCount = (profile.tags || []).length;
</script>

<div class="badges-page">
  <TabNavigation tabs={subTabs} activeTab={activeSubTab} on:tabChange={(e) => activeSubTab = e.detail} />
  
  {#if activeSubTab === 'custom'}
    <div class="section-header">
      <h3>Custom Badges</h3>
      <button class="btn-primary" on:click={() => showBadgeModal = true}>
        + Create Badge
      </button>
    </div>
    
    <div class="badges-grid">
      {#each (profile.badges || []) as badge}
        <Card>
          <div class="badge-preview" style="background-color: {badge.color}20; border-color: {badge.color};">
            <span class="badge-icon" style="font-size: {badge.iconSize === 'Small' ? '20px' : badge.iconSize === 'Medium' ? '32px' : '48px'};">
              {badge.icon}
            </span>
            <span class="badge-name">{badge.name}</span>
          </div>
          <button class="btn-delete" on:click={() => removeBadge(badge.id)}>Delete</button>
        </Card>
      {:else}
        <div class="empty-state">No custom badges yet</div>
      {/each}
    </div>
    
    <div class="shop-link">
      <a href="https://example.com/shop" target="_blank" class="btn-secondary">Shop More Badges →</a>
    </div>
    
  {:else if activeSubTab === 'standard'}
    <div class="section-header">
      <h3>Standard Badges</h3>
    </div>
    <div class="standard-badges-grid">
      <Card>
        <div class="standard-badge">Verified ✓</div>
        <button class="btn-primary small">Activate</button>
      </Card>
      <Card>
        <div class="standard-badge">Premium ⭐</div>
        <button class="btn-primary small">Purchase</button>
      </Card>
      <Card>
        <div class="standard-badge">Pro 🚀</div>
        <button class="btn-primary small">Purchase</button>
      </Card>
    </div>
    
  {:else if activeSubTab === 'tags'}
    <div class="section-header">
      <div>
        <h3>Personal Tags</h3>
        <p class="tag-counter">Tags: {tagCount}/25</p>
      </div>
      <button class="btn-primary" on:click={() => showTagModal = true} disabled={tagCount >= 25}>
        + Add Tag
      </button>
    </div>
    
    <div class="tags-grid">
      {#each (profile.tags || []) as tag}
        <Card>
          <div class="tag-preview" style="background-color: {tag.color}20; border-color: {tag.color};">
            <span class="tag-icon">{tag.icon}</span>
            <span class="tag-name">{tag.name}</span>
          </div>
          <button class="btn-delete" on:click={() => removeTag(tag.id)}>Delete</button>
        </Card>
      {:else}
        <div class="empty-state">No tags yet</div>
      {/each}
    </div>
  {/if}
</div>

<!-- Badge Modal -->
<Modal open={showBadgeModal} title="Create Badge" on:close={() => showBadgeModal = false}>
  <div class="modal-form">
    <FormInput
      label="Badge Name"
      value={newBadge.name}
      maxlength={50}
      on:change={(e) => newBadge.name = e.detail}
      placeholder="Enter badge name"
    />
    <FileUpload
      label="Badge Icon"
      accept="image/*"
      maxSizeMB={5}
      value={newBadge.icon}
      on:change={(e) => newBadge.icon = e.detail}
    />
    <ColorPicker
      label="Badge Color"
      value={newBadge.color}
      on:change={(e) => newBadge.color = e.detail}
    />
    <Dropdown
      label="Icon Size"
      value={newBadge.iconSize}
      options={iconSizeOptions}
      on:change={(e) => newBadge.iconSize = e.detail}
    />
    <div class="badge-preview-modal" style="background-color: {newBadge.color}20; border-color: {newBadge.color};">
      <span class="badge-icon" style="font-size: {newBadge.iconSize === 'Small' ? '20px' : newBadge.iconSize === 'Medium' ? '32px' : '48px'};">
        {newBadge.icon || '⭐'}
      </span>
      <span class="badge-name">{newBadge.name || 'Preview'}</span>
    </div>
  </div>
  <div slot="footer">
    <button class="btn-secondary" on:click={() => showBadgeModal = false}>Cancel</button>
    <button class="btn-primary" on:click={addBadge}>Save</button>
  </div>
</Modal>

<!-- Tag Modal -->
<Modal open={showTagModal} title="Add Tag" on:close={() => showTagModal = false}>
  <div class="modal-form">
    <FormInput
      label="Tag Name"
      value={newTag.name}
      maxlength={30}
      on:change={(e) => newTag.name = e.detail}
      placeholder="Enter tag name"
    />
    <ColorPicker
      label="Tag Background Color"
      value={newTag.color}
      on:change={(e) => newTag.color = e.detail}
    />
    <div class="emoji-picker">
      <label>Icon (Emoji)</label>
      <div class="emoji-grid">
        {#each emojiOptions as emoji}
          <button
            class="emoji-btn"
            class:active={newTag.icon === emoji}
            on:click={() => newTag.icon = emoji}
          >
            {emoji}
          </button>
        {/each}
      </div>
      <input
        type="text"
        class="emoji-input"
        bind:value={newTag.icon}
        placeholder="Or enter emoji"
        maxlength="2"
      />
    </div>
    <div class="tag-preview-modal" style="background-color: {newTag.color}20; border-color: {newTag.color};">
      <span class="tag-icon">{newTag.icon || '⭐'}</span>
      <span class="tag-name">{newTag.name || 'Preview'}</span>
    </div>
  </div>
  <div slot="footer">
    <button class="btn-secondary" on:click={() => showTagModal = false}>Cancel</button>
    <button class="btn-primary" on:click={addTag}>Save</button>
  </div>
</Modal>

<style>
  .badges-page {
    padding: 24px 0;
  }
  
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  
  .section-header h3 {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
  }
  
  .tag-counter {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    margin: 4px 0 0 0;
  }
  
  .badges-grid,
  .tags-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .standard-badges-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }
  
  .badge-preview,
  .tag-preview {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    border: 2px solid;
    border-radius: 8px;
    margin-bottom: 12px;
  }
  
  .badge-icon,
  .tag-icon {
    font-size: 32px;
  }
  
  .badge-name,
  .tag-name {
    font-weight: 600;
    color: #ffffff;
  }
  
  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 48px;
    color: rgba(255, 255, 255, 0.4);
  }
  
  .shop-link {
    text-align: center;
    margin-top: 24px;
  }
  
  .standard-badge {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 12px;
  }
  
  .btn-primary.small {
    padding: 8px 16px;
    font-size: 14px;
  }
  
  .modal-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .badge-preview-modal,
  .tag-preview-modal {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    border: 2px solid;
    border-radius: 8px;
    margin-top: 8px;
  }
  
  .emoji-picker {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .emoji-picker label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
  }
  
  .emoji-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
  }
  
  .emoji-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 12px;
    font-size: 24px;
    cursor: pointer;
    transition: all 200ms;
  }
  
  .emoji-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  .emoji-btn.active {
    border-color: #3a7bef;
    background: rgba(58, 123, 239, 0.2);
  }
  
  .emoji-input {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 12px 16px;
    color: #ffffff;
    font-size: 20px;
    text-align: center;
    outline: none;
  }
  
  .emoji-input:focus {
    border-color: #3a7bef;
    box-shadow: 0 0 0 3px rgba(58, 123, 239, 0.1);
  }
</style>

