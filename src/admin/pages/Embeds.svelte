<script>
  import Card from '../components/Card.svelte';
  import FormInput from '../components/FormInput.svelte';
  import Dropdown from '../components/Dropdown.svelte';
  import Modal from '../components/Modal.svelte';
  import { profileStore } from '../stores/profile.js';
  import { toast } from '../stores/toast.js';
  
  let profile = {};
  let showAddModal = false;
  let newEmbed = {
    type: 'discord',
    serverId: '',
    inviteLink: '',
    size: 'Large',
    trackId: '',
    playlistId: '',
    trackUrl: '',
    playlistUrl: '',
    videoId: '',
    videoUrl: '',
    customHtml: ''
  };
  
  profileStore.subscribe(value => {
    profile = value;
  });
  
  const embedTypes = [
    { value: 'discord', label: 'Discord Invite', icon: '💬' },
    { value: 'spotify-track', label: 'Spotify Track', icon: '🎵' },
    { value: 'spotify-playlist', label: 'Spotify Playlist', icon: '🎶' },
    { value: 'soundcloud-track', label: 'SoundCloud Track', icon: '🔊' },
    { value: 'soundcloud-playlist', label: 'SoundCloud Playlist', icon: '🔉' },
    { value: 'youtube', label: 'YouTube', icon: '📺' },
    { value: 'custom', label: 'Custom Embed', icon: '⚙️' }
  ];
  
  const sizeOptions = [
    { value: 'Large', label: 'Large' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Small', label: 'Small' }
  ];
  
  function addEmbed() {
    if (!profile.embeds) {
      profileStore.update(p => ({ ...p, embeds: [] }));
    }
    
    const embed = {
      id: Date.now(),
      type: newEmbed.type,
      ...newEmbed
    };
    
    profileStore.update(p => ({
      ...p,
      embeds: [...(p.embeds || []), embed]
    }));
    
    toast.success('Embed added successfully');
    showAddModal = false;
    resetNewEmbed();
  }
  
  function removeEmbed(id) {
    profileStore.update(p => ({
      ...p,
      embeds: (p.embeds || []).filter(e => e.id !== id)
    }));
    toast.success('Embed removed');
  }
  
  function resetNewEmbed() {
    newEmbed = {
      type: 'discord',
      serverId: '',
      inviteLink: '',
      size: 'Large',
      trackId: '',
      playlistId: '',
      trackUrl: '',
      playlistUrl: '',
      videoId: '',
      videoUrl: '',
      customHtml: ''
    };
  }
  
  function getEmbedIcon(type) {
    const embed = embedTypes.find(e => e.value === type);
    return embed ? embed.icon : '🔗';
  }
  
  function getEmbedLabel(type) {
    const embed = embedTypes.find(e => e.value === type);
    return embed ? embed.label : type;
  }
</script>

<div class="embeds-page">
  <div class="page-header">
    <h2>Embeds</h2>
    <button class="btn-primary" on:click={() => showAddModal = true}>
      + Add Embed
    </button>
  </div>
  
  <div class="embeds-grid">
    {#each (profile.embeds || []) as embed}
      <Card>
        <div class="embed-header">
          <span class="embed-icon">{getEmbedIcon(embed.type)}</span>
          <span class="embed-label">{getEmbedLabel(embed.type)}</span>
          <button class="btn-delete" on:click={() => removeEmbed(embed.id)}>Delete</button>
        </div>
        
        {#if embed.type === 'discord'}
          <div class="embed-preview">
            <iframe
              src="https://discord.com/widget?id={embed.serverId}&theme=dark"
              width="350"
              height="500"
              allowtransparency="true"
              frameborder="0"
            ></iframe>
          </div>
          <div class="embed-info">
            <p><strong>Server ID:</strong> {embed.serverId}</p>
            <p><strong>Invite Link:</strong> {embed.inviteLink}</p>
            <p><strong>Size:</strong> {embed.size}</p>
          </div>
        {:else if embed.type === 'spotify-track'}
          <div class="embed-preview">
            <iframe
              src="https://open.spotify.com/embed/track/{embed.trackId}"
              width="100%"
              height="352"
              frameborder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
          </div>
        {:else if embed.type === 'spotify-playlist'}
          <div class="embed-preview">
            <iframe
              src="https://open.spotify.com/embed/playlist/{embed.playlistId}"
              width="100%"
              height="352"
              frameborder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
          </div>
        {:else if embed.type === 'soundcloud-track'}
          <div class="embed-preview">
            <iframe
              width="100%"
              height="300"
              scrolling="no"
              frameborder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url={embed.trackUrl}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            ></iframe>
          </div>
        {:else if embed.type === 'soundcloud-playlist'}
          <div class="embed-preview">
            <iframe
              width="100%"
              height="300"
              scrolling="no"
              frameborder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url={embed.playlistUrl}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            ></iframe>
          </div>
        {:else if embed.type === 'youtube'}
          <div class="embed-preview">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/{embed.videoId}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        {:else if embed.type === 'custom'}
          <div class="embed-preview">
            {@html embed.customHtml}
          </div>
        {/if}
      </Card>
    {:else}
      <div class="empty-state">
        <p>No embeds yet. Click "+ Add Embed" to get started.</p>
      </div>
    {/each}
  </div>
</div>

<Modal open={showAddModal} title="Add Embed" size="large" on:close={() => showAddModal = false}>
  <div class="add-embed-form">
    <Dropdown
      label="Embed Type"
      value={newEmbed.type}
      options={embedTypes}
      on:change={(e) => newEmbed.type = e.detail}
    />
    
    {#if newEmbed.type === 'discord'}
      <FormInput
        label="Discord Server ID"
        value={newEmbed.serverId}
        on:change={(e) => newEmbed.serverId = e.detail}
        placeholder="123456789012345678"
      />
      <FormInput
        label="Invite Link"
        value={newEmbed.inviteLink}
        on:change={(e) => newEmbed.inviteLink = e.detail}
        placeholder="https://discord.gg/..."
      />
      <Dropdown
        label="Size"
        value={newEmbed.size}
        options={sizeOptions}
        on:change={(e) => newEmbed.size = e.detail}
      />
    {:else if newEmbed.type === 'spotify-track'}
      <FormInput
        label="Track ID or URL"
        value={newEmbed.trackId}
        on:change={(e) => newEmbed.trackId = e.detail}
        placeholder="4iV5W9uYEdYUVa79Axb7Rh"
      />
    {:else if newEmbed.type === 'spotify-playlist'}
      <FormInput
        label="Playlist ID or URL"
        value={newEmbed.playlistId}
        on:change={(e) => newEmbed.playlistId = e.detail}
        placeholder="37i9dQZF1DXcBWIGoYBM5M"
      />
    {:else if newEmbed.type === 'soundcloud-track'}
      <FormInput
        label="Track URL"
        value={newEmbed.trackUrl}
        on:change={(e) => newEmbed.trackUrl = e.detail}
        placeholder="https://soundcloud.com/..."
      />
    {:else if newEmbed.type === 'soundcloud-playlist'}
      <FormInput
        label="Playlist URL"
        value={newEmbed.playlistUrl}
        on:change={(e) => newEmbed.playlistUrl = e.detail}
        placeholder="https://soundcloud.com/..."
      />
    {:else if newEmbed.type === 'youtube'}
      <FormInput
        label="Video ID or URL"
        value={newEmbed.videoId}
        on:change={(e) => newEmbed.videoId = e.detail}
        placeholder="dQw4w9WgXcQ"
      />
    {:else if newEmbed.type === 'custom'}
      <label class="textarea-label">HTML/iframe Code</label>
      <textarea
        class="custom-html-input"
        bind:value={newEmbed.customHtml}
        placeholder="<iframe src='...'></iframe>"
        rows="6"
      ></textarea>
    {/if}
  </div>
  
  <div slot="footer">
    <button class="btn-secondary" on:click={() => { showAddModal = false; resetNewEmbed(); }}>Cancel</button>
    <button class="btn-primary" on:click={addEmbed}>Add Embed</button>
  </div>
</Modal>

<style>
  .embeds-page {
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
  
  .btn-primary {
    background: linear-gradient(135deg, #3a7bef 0%, #2d6fd9 100%);
    color: #ffffff;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 200ms;
  }
  
  .btn-primary:hover {
    filter: brightness(1.1);
    box-shadow: 0 8px 16px rgba(58, 123, 239, 0.4);
  }
  
  .embeds-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 24px;
  }
  
  .embed-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .embed-icon {
    font-size: 24px;
  }
  
  .embed-label {
    flex: 1;
    font-weight: 600;
    color: #ffffff;
  }
  
  .btn-delete {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.5);
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: all 200ms;
  }
  
  .btn-delete:hover {
    background: rgba(239, 68, 68, 0.3);
  }
  
  .embed-preview {
    margin: 16px 0;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .embed-preview iframe {
    border-radius: 8px;
  }
  
  .embed-info {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
  }
  
  .embed-info p {
    margin: 8px 0;
  }
  
  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 48px;
    color: rgba(255, 255, 255, 0.4);
  }
  
  .add-embed-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .textarea-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  .custom-html-input {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 12px 16px;
    color: #ffffff;
    font-size: 14px;
    font-family: 'JetBrains Mono', monospace;
    width: 100%;
    resize: vertical;
    outline: none;
  }
  
  .custom-html-input:focus {
    border-color: #3a7bef;
    box-shadow: 0 0 0 3px rgba(58, 123, 239, 0.1);
  }
  
  .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 200ms;
  }
  
  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.15);
  }
</style>
