// Remove.bg API integration
const REMOVE_BG_API_KEY = import.meta.env.VITE_REMOVE_BG_API_KEY || '';
const REMOVE_BG_API_URL = 'https://api.remove.bg/v1.0/removebg';

export async function removeBackground(imageFile) {
  if (!REMOVE_BG_API_KEY) {
    throw new Error('Remove.bg API key not configured. Please set VITE_REMOVE_BG_API_KEY in .env');
  }
  
  const formData = new FormData();
  formData.append('image_file', imageFile);
  formData.append('size', 'auto');
  
  try {
    const response = await fetch(REMOVE_BG_API_URL, {
      method: 'POST',
      headers: {
        'X-Api-Key': REMOVE_BG_API_KEY
      },
      body: formData
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.title || 'Failed to remove background');
    }
    
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Remove background error:', error);
    throw error;
  }
}

// Alternative: Use local rembg (requires backend endpoint)
export async function removeBackgroundLocal(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  try {
    const response = await fetch('/api/remove-background', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove background');
    }
    
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Remove background error:', error);
    throw error;
  }
}

