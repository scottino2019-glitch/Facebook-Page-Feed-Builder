import { FBPageData } from '../types';
import { defaultFBPageData } from '../data/defaultData';
import { normalizePostMedia } from './mediaUtils';

const LOCAL_STORAGE_KEY = 'fb_builder_page_data_v1';

export function loadPageData(): FBPageData {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.profile && Array.isArray(parsed.posts)) {
        parsed.posts = parsed.posts.map(normalizePostMedia);
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to load page data from localStorage", e);
  }
  return {
    ...defaultFBPageData,
    posts: defaultFBPageData.posts.map(normalizePostMedia)
  };
}

export function savePageData(data: FBPageData): void {
  try {
    const updatedData: FBPageData = {
      ...data,
      posts: data.posts ? data.posts.map(normalizePostMedia) : [],
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
  } catch (e) {
    console.error("Failed to save page data to localStorage", e);
  }
}

export function exportJsonFile(data: FBPageData, filename = 'facebook_feed.json'): void {
  const normalizedData: FBPageData = {
    ...data,
    posts: data.posts ? data.posts.map(normalizePostMedia) : [],
    updatedAt: new Date().toISOString()
  };
  const jsonStr = JSON.stringify(normalizedData, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function parseJsonString(jsonString: string): FBPageData {
  const parsed = JSON.parse(jsonString);
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Il file JSON non è un oggetto valido.');
  }
  if (!parsed.profile || typeof parsed.profile !== 'object') {
    throw new Error('Manca la sezione "profile" nel file JSON.');
  }
  if (!parsed.profile.name) {
    throw new Error('Il campo "profile.name" è obbligatorio.');
  }
  if (!Array.isArray(parsed.posts)) {
    throw new Error('La sezione "posts" deve essere un array.');
  }
  parsed.posts = parsed.posts.map(normalizePostMedia);
  return parsed as FBPageData;
}
