export function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function validateImageFile(file, maxSizeMB = 25) {
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
  const maxSize = maxSizeMB * 1024 * 1024;
  
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: `Invalid file type. Allowed: PNG, JPG, GIF, WEBP` };
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: `File too large. Max size: ${maxSizeMB}MB` };
  }
  
  return { valid: true };
}

export function validateAudioFile(file, maxSizeMB = 50) {
  const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/flac'];
  const maxSize = maxSizeMB * 1024 * 1024;
  
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: `Invalid file type. Allowed: MP3, WAV, FLAC` };
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: `File too large. Max size: ${maxSizeMB}MB` };
  }
  
  return { valid: true };
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

