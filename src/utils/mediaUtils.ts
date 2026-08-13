export function getYouTubeEmbedUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();

  // Already embed URL
  if (trimmed.includes('youtube.com/embed/')) {
    return trimmed;
  }

  // Handle youtube.com/watch?v=VIDEO_ID, youtu.be/VIDEO_ID, youtube.com/shorts/VIDEO_ID
  const match = trimmed.match(/(?:youtube\.com\/(?:watch\?.*v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }

  // Fallback: if watch?v= was used with extra params
  if (trimmed.includes('watch?v=')) {
    const videoId = trimmed.split('watch?v=')[1]?.split('&')[0];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }

  return trimmed;
}

export function isYouTubeUrl(url: string): boolean {
  if (!url) return false;
  return url.includes('youtube.com') || url.includes('youtu.be');
}

/**
 * Normalizes post image arrays and video URLs so both `imageUrls` and `images` 
 * are guaranteed to be populated and consistent across import/export/render.
 */
export function normalizePostMedia(post: any): any {
  if (!post) return post;

  // Gather all possible image sources
  let imgs: string[] = [];
  if (Array.isArray(post.imageUrls) && post.imageUrls.length > 0) {
    imgs = post.imageUrls;
  } else if (Array.isArray(post.images) && post.images.length > 0) {
    imgs = post.images;
  } else if (post.imageUrl) {
    imgs = [post.imageUrl];
  } else if (post.mediaUrl && post.type === 'image') {
    imgs = [post.mediaUrl];
  }

  const normalized = { ...post };

  if (imgs.length > 0) {
    normalized.imageUrls = imgs;
    normalized.images = imgs;
    normalized.imageUrl = imgs[0];
    normalized.mediaUrl = imgs[0];
  }

  if (post.type === 'video' && post.videoUrl) {
    if (isYouTubeUrl(post.videoUrl)) {
      normalized.videoUrl = getYouTubeEmbedUrl(post.videoUrl);
      normalized.isEmbedIframe = true;
    }
  }

  return normalized;
}
