<script>
  import Card from '../components/Card.svelte';
  import FormInput from '../components/FormInput.svelte';
  import FileUpload from '../components/FileUpload.svelte';
  import Toggle from '../components/Toggle.svelte';
  import Modal from '../components/Modal.svelte';
  import { profileStore } from '../stores/profile.js';
  import { toast } from '../stores/toast.js';
  
  let profile = {};
  let showAddModal = false;
  let newTrack = {
    cover: '',
    title: '',
    audio: '',
    url: '',
    isHomeTrack: false
  };
  
  profileStore.subscribe(value => {
    profile = value;
  });
  
  function addTrack() {
    if (!newTrack.title) {
      toast.error('Please enter track title');
      return;
    }
    
    const trackCount = (profile.tracks || []).length;
    if (trackCount >= 5) {
      toast.error('Maximum 5 tracks allowed');
      return;
    }
    
    if (!profile.tracks) {
      profileStore.update(p => ({ ...p, tracks: [] }));
    }
    
    // If this is set as home track, unset others
    if (newTrack.isHomeTrack) {
      profileStore.update(p => ({
        ...p,
        tracks: (p.tracks || []).map(t => ({ ...t, isHomeTrack: false }))
      }));
    }
    
    const track = {
      id: Date.now(),
      ...newTrack
    };
    
    profileStore.update(p => ({
      ...p,
      tracks: [...(p.tracks || []), track]
    }));
    
    toast.success('Track added successfully');
    showAddModal = false;
    newTrack = { cover: '', title: '', audio: '', url: '', isHomeTrack: false };
  }
  
  function removeTrack(id) {
    profileStore.update(p => ({
      ...p,
      tracks: (p.tracks || []).filter(t => t.id !== id)
    }));
    toast.success('Track removed');
  }
  
  function updateTrack(id, key, value) {
    profileStore.update(p => ({
      ...p,
      tracks: (p.tracks || []).map(t => 
        t.id === id ? { ...t, [key]: value } : t
      )
    }));
  }
  
  function setHomeTrack(id) {
    profileStore.update(p => ({
      ...p,
      tracks: (p.tracks || []).map(t => ({
        ...t,
        isHomeTrack: t.id === id
      }))
    }));
    toast.success('Home track updated');
  }
  
  $: trackCount = (profile.tracks || []).length;
</script>

<div class="tracks-page">
  <div class="page-header">
    <div>
      <h2>Tracks</h2>
      <p class="track-counter">Tracks: {trackCount}/5</p>
    </div>
    <button class="btn-primary" on:click={() => showAddModal = true} disabled={trackCount >= 5}>
      + Add Track
    </button>
  </div>
  
  <div class="tracks-list">
    {#each (profile.tracks || []) as track, index}
      <Card>
        <div class="track-header">
          <div class="drag-handle">☰</div>
          <div class="track-number">#{index + 1}</div>
          {#if track.isHomeTrack}
            <span class="home-badge">Home Track</span>
          {/if}
        </div>
        
        <div class="track-cover-section">
          {#if track.cover}
            <img src={track.cover} alt="Cover" class="track-cover" />
            <FileUpload
              accept="image/*"
              maxSizeMB={25}
              value={track.cover}
              showRemoveBg={true}
              on:change={(e) => updateTrack(track.id, 'cover', e.detail)}
            />
          {:else}
            <FileUpload
              label="Cover Image"
              accept="image/*"
              maxSizeMB={25}
              value={track.cover}
              showRemoveBg={true}
              on:change={(e) => updateTrack(track.id, 'cover', e.detail)}
            />
          {/if}
        </div>
        
        <FormInput
          label="Track Title"
          value={track.title}
          maxlength={100}
          on:change={(e) => updateTrack(track.id, 'title', e.detail)}
          placeholder="Enter track title"
        />
        
        <div class="track-audio-section">
          {#if track.audio}
            <audio src={track.audio} controls class="track-player"></audio>
            <FileUpload
              label="Audio File (MP3, WAV, FLAC)"
              accept="audio/*"
              maxSizeMB={50}
              value={track.audio}
              on:change={(e) => updateTrack(track.id, 'audio', e.detail)}
            />
          {:else}
            <FileUpload
              label="Audio File (MP3, WAV, FLAC)"
              accept="audio/*"
              maxSizeMB={50}
              value={track.audio}
              on:change={(e) => updateTrack(track.id, 'audio', e.detail)}
            />
          {/if}
        </div>
        
        <FormInput
          label="Track URL (optional)"
          value={track.url}
          maxlength={250}
          on:change={(e) => updateTrack(track.id, 'url', e.detail)}
          placeholder="https://..."
        />
        
        <div class="track-actions">
          <Toggle
            label="Set as Home Track"
            value={track.isHomeTrack}
            on:change={(e) => {
              if (e.detail) {
                setHomeTrack(track.id);
              } else {
                updateTrack(track.id, 'isHomeTrack', false);
              }
            }}
          />
          <button class="btn-delete" on:click={() => removeTrack(track.id)}>Delete Track</button>
        </div>
      </Card>
    {:else}
      <div class="empty-state">
        <p>No tracks yet. Click "+ Add Track" to get started.</p>
      </div>
    {/each}
  </div>
</div>

<Modal open={showAddModal} title="Add Track" size="large" on:close={() => showAddModal = false}>
  <div class="add-track-form">
    <FileUpload
      label="Cover Image"
      accept="image/*"
      maxSizeMB={25}
      value={newTrack.cover}
      showRemoveBg={true}
      on:change={(e) => newTrack.cover = e.detail}
    />
    
    <FormInput
      label="Track Title"
      value={newTrack.title}
      maxlength={100}
      on:change={(e) => newTrack.title = e.detail}
      placeholder="Enter track title"
    />
    
    <FileUpload
      label="Audio File (MP3, WAV, FLAC)"
      accept="audio/*"
      maxSizeMB={50}
      value={newTrack.audio}
      on:change={(e) => newTrack.audio = e.detail}
    />
    
    {#if newTrack.audio}
      <audio src={newTrack.audio} controls class="track-player-preview"></audio>
    {/if}
    
    <FormInput
      label="Track URL (optional)"
      value={newTrack.url}
      maxlength={250}
      on:change={(e) => newTrack.url = e.detail}
      placeholder="https://..."
    />
    
    <Toggle
      label="Set as Home Track"
      value={newTrack.isHomeTrack}
      on:change={(e) => newTrack.isHomeTrack = e.detail}
    />
  </div>
  
  <div slot="footer">
    <button class="btn-secondary" on:click={() => showAddModal = false}>Cancel</button>
    <button class="btn-primary" on:click={addTrack}>Add Track</button>
  </div>
</Modal>

<style>
  .tracks-page {
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
  
  .track-counter {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    margin: 4px 0 0 0;
  }
  
  .tracks-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .track-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .drag-handle {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.4);
    cursor: grab;
  }
  
  .track-number {
    font-size: 18px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.6);
  }
  
  .home-badge {
    background: rgba(58, 123, 239, 0.2);
    color: #3a7bef;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
  }
  
  .track-cover-section {
    margin-bottom: 16px;
  }
  
  .track-cover {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .track-audio-section {
    margin: 16px 0;
  }
  
  .track-player,
  .track-player-preview {
    width: 100%;
    margin-bottom: 12px;
  }
  
  .track-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  .empty-state {
    text-align: center;
    padding: 48px;
    color: rgba(255, 255, 255, 0.4);
  }
  
  .add-track-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>

