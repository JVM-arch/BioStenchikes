<script>
  import { readFileAsDataURL, validateImageFile, validateAudioFile, formatFileSize } from '../utils/fileUpload.js';
  import { removeBackground } from '../utils/removeBg.js';
  import { toast } from '../stores/toast.js';
  import Modal from './Modal.svelte';
  
  export let accept = 'image/*';
  export let maxSizeMB = 25;
  export let label = '';
  export let showRemoveBg = false;
  export let value = '';
  
  let dragging = false;
  let preview = value;
  let file = null;
  let processing = false;
  let showRemoveBgModal = false;
  let originalImage = '';
  let processedImage = '';
  
  $: if (value) preview = value;
  
  function handleDragOver(e) {
    e.preventDefault();
    dragging = true;
  }
  
  function handleDragLeave() {
    dragging = false;
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dragging = false;
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }
  
  function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }
  
  async function handleFile(selectedFile) {
    const isImage = accept.includes('image');
    const validation = isImage 
      ? validateImageFile(selectedFile, maxSizeMB)
      : validateAudioFile(selectedFile, maxSizeMB);
    
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }
    
    file = selectedFile;
    
    try {
      const dataURL = await readFileAsDataURL(selectedFile);
      preview = dataURL;
      dispatch('change', dataURL);
      toast.success(`File uploaded: ${selectedFile.name}`);
    } catch (error) {
      toast.error('Failed to read file');
    }
  }
  
  async function handleRemoveBackground() {
    if (!file) {
      toast.error('Please upload an image first');
      return;
    }
    
    processing = true;
    originalImage = preview;
    
    try {
      const processed = await removeBackground(file);
      processedImage = processed;
      showRemoveBgModal = true;
      toast.success('Background removed successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to remove background');
    } finally {
      processing = false;
    }
  }
  
  function useProcessedImage() {
    preview = processedImage;
    dispatch('change', processedImage);
    showRemoveBgModal = false;
    toast.success('Processed image applied');
  }
  
  function deleteFile() {
    preview = '';
    file = null;
    dispatch('change', '');
    toast.info('File removed');
  }
  
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="file-upload">
  {#if label}
    <label class="file-label">{label}</label>
  {/if}
  
  {#if !preview}
    <div
      class="upload-zone"
      class:dragging
      on:dragover={handleDragOver}
      on:dragleave={handleDragLeave}
      on:drop={handleDrop}
    >
      <div class="upload-content">
        <div class="upload-icon">📁</div>
        <p class="upload-text">Drag files here or click to browse</p>
        <button class="upload-button" type="button" on:click={() => document.getElementById('file-input').click()}>
          Browse
        </button>
        <input
          id="file-input"
          type="file"
          accept={accept}
          class="file-input-hidden"
          on:change={handleFileSelect}
        />
        <p class="upload-hint">Max size: {maxSizeMB}MB</p>
      </div>
    </div>
  {:else}
    <div class="preview-container">
      {#if accept.includes('image')}
        <img src={preview} alt="Preview" class="preview-image" />
      {:else if accept.includes('audio')}
        <audio src={preview} controls class="preview-audio" />
      {/if}
      <div class="preview-info">
        {#if file}
          <span class="preview-size">{formatFileSize(file.size)}</span>
        {/if}
        <div class="preview-actions">
          {#if showRemoveBg && accept.includes('image')}
            <button
              class="btn-remove-bg"
              on:click={handleRemoveBackground}
              disabled={processing}
            >
              {#if processing}
                Processing...
              {:else}
                ✨ Remove Background
              {/if}
            </button>
          {/if}
          <button class="btn-delete" on:click={deleteFile}>Delete</button>
        </div>
      </div>
    </div>
  {/if}
</div>

<Modal open={showRemoveBgModal} title="Remove Background Preview" size="large">
  <div class="remove-bg-preview">
    <div class="preview-side">
      <h4>Original</h4>
      <img src={originalImage} alt="Original" />
    </div>
    <div class="preview-side">
      <h4>Processed</h4>
      <img src={processedImage} alt="Processed" />
    </div>
  </div>
  <div slot="footer">
    <button class="btn-secondary" on:click={() => showRemoveBgModal = false}>Cancel</button>
    <button class="btn-primary" on:click={useProcessedImage}>Use Processed Image</button>
  </div>
</Modal>

<style>
  .file-upload {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .file-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
  }
  
  .upload-zone {
    border: 2px dashed rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    padding: 48px 24px;
    text-align: center;
    background: rgba(255, 255, 255, 0.02);
    transition: all 200ms;
    cursor: pointer;
  }
  
  .upload-zone.dragging {
    border-color: #3a7bef;
    background: rgba(58, 123, 239, 0.1);
  }
  
  .upload-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  
  .upload-icon {
    font-size: 48px;
  }
  
  .upload-text {
    font-size: 16px;
    color: #ffffff;
    margin: 0;
  }
  
  .upload-button {
    background: linear-gradient(135deg, #3a7bef 0%, #2d6fd9 100%);
    color: #ffffff;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 200ms;
  }
  
  .upload-button:hover {
    filter: brightness(1.1);
    box-shadow: 0 8px 16px rgba(58, 123, 239, 0.4);
  }
  
  .file-input-hidden {
    display: none;
  }
  
  .upload-hint {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
    margin: 0;
  }
  
  .preview-container {
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.02);
  }
  
  .preview-image {
    width: 100%;
    max-width: 400px;
    height: auto;
    border-radius: 8px;
    margin-bottom: 12px;
  }
  
  .preview-audio {
    width: 100%;
    margin-bottom: 12px;
  }
  
  .preview-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  
  .preview-size {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
  }
  
  .preview-actions {
    display: flex;
    gap: 8px;
  }
  
  .btn-remove-bg {
    background: rgba(139, 92, 246, 0.2);
    color: #a78bfa;
    border: 1px solid rgba(139, 92, 246, 0.5);
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: all 200ms;
  }
  
  .btn-remove-bg:hover:not(:disabled) {
    background: rgba(139, 92, 246, 0.3);
    border-color: rgba(139, 92, 246, 0.7);
  }
  
  .btn-remove-bg:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .btn-delete {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.5);
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: all 200ms;
  }
  
  .btn-delete:hover {
    background: rgba(239, 68, 68, 0.3);
    border-color: rgba(239, 68, 68, 0.7);
  }
  
  .remove-bg-preview {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  
  .preview-side {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .preview-side h4 {
    font-size: 16px;
    color: #ffffff;
    margin: 0;
  }
  
  .preview-side img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
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
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: 768px) {
    .remove-bg-preview {
      grid-template-columns: 1fr;
    }
  }
</style>

