import { writable } from 'svelte/store';

export const profileStore = writable({
  nickname: 'Stenchikes',
  tagline: 'VFX Artist & Developer',
  status: 'Online',
  avatarSrc: '/src/assets/avatar.jpg',
  bannerSrc: '/src/assets/willow-banner.jpg',
  
  // Appearance
  typography: {
    font: 'Inter',
    fontSize: 16,
    primaryTextColor: '#ffffff',
    letterSpacing: 0
  },
  colors: {
    primary: '#3a7bef',
    secondary: '#aba29e',
    accent: '#3a7bef',
    background: '#090909'
  },
  effects: {
    usernameSparkles: 'None',
    avatarGlow: false,
    avatarGlowIntensity: 50,
    backgroundParallax: false,
    backgroundZoom: false,
    backgroundZoomIntensity: 50,
    filmGrain: false,
    filmGrainIntensity: 50,
    vignette: false
  },
  animations: {
    pageOverlay: 'None',
    pageEnter: 'None',
    pageEnterSpeed: 400,
    pageTitleAnimation: 'None',
    pageTitleSpeed: 400
  },
  
  // Media
  banner: {
    src: '',
    opacity: 100,
    blur: 0
  },
  background: {
    src: '',
    size: 'Cover',
    blur: 0,
    opacity: 100,
    color: '#090909'
  },
  avatar: {
    src: '',
    decoration: 'None',
    radius: 50,
    glow: false,
    glowColor: '#3a7bef',
    borderGlow: false,
    rotation: false,
    rotationSpeed: 5
  },
  favicon: {
    src: ''
  },
  
  // Box & Layout
  box: {
    tilt: 'None',
    width: 750,
    innerSpacing: 16,
    radius: 8,
    blur: 0,
    color: '#141414',
    opacity: 100,
    shadowColor: '#090909',
    shadowOpacity: 50
  },
  border: {
    width: 1,
    color: '#78728D',
    opacity: 100,
    style: 'Solid'
  },
  layout: {
    type: 'Default',
    alignment: 'Center'
  },
  
  // Embeds
  embeds: [],
  
  // Badges & Tags
  badges: [],
  tags: [],
  
  // Links
  links: [],
  
  // Tracks
  tracks: [],
  
  // Reveal Screen
  revealScreen: {
    blur: 15,
    text: ''
  },
  
  // Settings
  cursor: {
    style: 'System',
    trail: 'None',
    trailColor: '#3a7bef'
  },
  metadata: {
    title: '',
    description: '',
    language: 'EN'
  }
});

export function loadProfile() {
  try {
    const saved = localStorage.getItem('admin-profile');
    if (saved) {
      profileStore.set(JSON.parse(saved));
    }
  } catch (e) {
    console.warn('Failed to load profile', e);
  }
}

export function saveProfile(profile) {
  try {
    localStorage.setItem('admin-profile', JSON.stringify(profile));
    profileStore.set(profile);
  } catch (e) {
    console.warn('Failed to save profile', e);
  }
}

