<script>
  import Card from '../components/Card.svelte';
  import Slider from '../components/Slider.svelte';
  import FormInput from '../components/FormInput.svelte';
  import { profileStore } from '../stores/profile.js';
  
  let profile = {};
  let revealText = '';
  
  profileStore.subscribe(value => {
    profile = value;
    revealText = value.revealScreen?.text || '';
  });
  
  function updateReveal(key, value) {
    profileStore.update(p => {
      const newProfile = { ...p };
      if (!newProfile.revealScreen) {
        newProfile.revealScreen = { blur: 15, text: '' };
      }
      newProfile.revealScreen[key] = value;
      return newProfile;
    });
  }
  
  function formatText(text) {
    // Support for [center]text[/center], **bold**, *italic*, _underline_
    return text
      .replace(/\[center\](.*?)\[\/center\]/g, '<div style="text-align: center;">$1</div>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<u>$1</u>');
  }
  
  function insertTag(tag) {
    const textarea = document.querySelector('.reveal-textarea');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = revealText;
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);
    
    let insert = '';
    if (tag === 'center') {
      insert = `[center]${selected}[/center]`;
    } else if (tag === 'bold') {
      insert = `**${selected}**`;
    } else if (tag === 'italic') {
      insert = `*${selected}*`;
    } else if (tag === 'underline') {
      insert = `_${selected}_`;
    }
    
    revealText = before + insert + after;
    updateReveal('text', revealText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + insert.length, start + insert.length);
    }, 0);
  }
</script>

<div class="reveal-page">
  <Card title="Reveal Screen Settings">
    <Slider
      label="Reveal Screen Blur"
      value={profile.revealScreen?.blur || 15}
      min={0}
      max={50}
      step={1}
      unit="px"
      on:change={(e) => updateReveal('blur', e.detail)}
    />
    
    <div class="blur-preview" style="filter: blur({profile.revealScreen?.blur || 15}px);">
      <div class="preview-content">
        <h3>Preview Content</h3>
        <p>This is how your content will look with the blur effect applied.</p>
      </div>
    </div>
  </Card>
  
  <Card title="Reveal Screen Text">
    <div class="text-formatting">
      <label>Text Formatting</label>
      <div class="format-buttons">
        <button class="format-btn" on:click={() => insertTag('center')}>[center]</button>
        <button class="format-btn" on:click={() => insertTag('bold')}>**bold**</button>
        <button class="format-btn" on:click={() => insertTag('italic')}>*italic*</button>
        <button class="format-btn" on:click={() => insertTag('underline')}>_underline_</button>
      </div>
    </div>
    
    <label class="textarea-label">Reveal Screen Text (max 1000 characters)</label>
    <textarea
      class="reveal-textarea"
      bind:value={revealText}
      maxlength={1000}
      rows="10"
      placeholder="Enter your reveal screen text here..."
      on:input={(e) => updateReveal('text', e.target.value)}
    ></textarea>
    <div class="char-count">{revealText.length}/1000</div>
    
    <div class="text-preview">
      <label>Preview</label>
      <div class="preview-text" class:empty={!revealText}>
        {#if revealText}
          {@html formatText(revealText)}
        {:else}
          Preview will appear here...
        {/if}
      </div>
    </div>
  </Card>
</div>

<style>
  .reveal-page {
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .blur-preview {
    margin-top: 16px;
    padding: 24px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    overflow: hidden;
  }
  
  .preview-content {
    padding: 20px;
    background: rgba(58, 123, 239, 0.1);
    border-radius: 8px;
  }
  
  .preview-content h3 {
    margin: 0 0 8px 0;
    color: #ffffff;
  }
  
  .preview-content p {
    margin: 0;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .text-formatting {
    margin-bottom: 16px;
  }
  
  .text-formatting label {
    display: block;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  .format-buttons {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  
  .format-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    padding: 6px 12px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 12px;
    font-family: 'JetBrains Mono', monospace;
    cursor: pointer;
    transition: all 200ms;
  }
  
  .format-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  .textarea-label {
    display: block;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  .reveal-textarea {
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 16px;
    color: #ffffff;
    font-size: 14px;
    font-family: inherit;
    resize: vertical;
    outline: none;
    transition: all 200ms;
  }
  
  .reveal-textarea:focus {
    border-color: #3a7bef;
    box-shadow: 0 0 0 3px rgba(58, 123, 239, 0.1);
  }
  
  .char-count {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
    text-align: right;
    margin-top: 4px;
  }
  
  .text-preview {
    margin-top: 24px;
  }
  
  .text-preview label {
    display: block;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  .preview-text {
    padding: 24px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    min-height: 100px;
    color: #ffffff;
    line-height: 1.6;
  }
  
  .preview-text.empty {
    color: rgba(255, 255, 255, 0.4);
    font-style: italic;
  }
  
  .preview-text :global(strong) {
    font-weight: 600;
  }
  
  .preview-text :global(em) {
    font-style: italic;
  }
  
  .preview-text :global(u) {
    text-decoration: underline;
  }
</style>

