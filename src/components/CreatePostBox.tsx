import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Video, 
  Film, 
  Globe, 
  Users, 
  Lock, 
  Pin, 
  Palette, 
  Link as LinkIcon, 
  Upload, 
  Plus, 
  X, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { Post, PostType, PrivacyOption, ProfileInfo } from '../types';

interface CreatePostBoxProps {
  profile: ProfileInfo;
  onAddPost: (post: Post) => void;
}

export const CreatePostBox: React.FC<CreatePostBoxProps> = ({ profile, onAddPost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [postType, setPostType] = useState<PostType>('text');
  const [content, setContent] = useState('');
  const [privacy, setPrivacy] = useState<PrivacyOption>('public');
  const [timestamp, setTimestamp] = useState('Ora');
  const [isPinned, setIsPinned] = useState(false);
  
  // Custom Background Gradient Preset for text posts
  const [textBackgroundPreset, setTextBackgroundPreset] = useState<string | undefined>(undefined);

  // Media state
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [isEmbedIframe, setIsEmbedIframe] = useState(false);

  // Reel state
  const [reelAudioTitle, setReelAudioTitle] = useState('');

  // Link state
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [linkDomain, setLinkDomain] = useState('');
  const [linkImage, setLinkImage] = useState('');

  // File Upload Helper
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (target === 'image') {
          setImageUrl(result);
        } else {
          setVideoUrl(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !imageUrl && !videoUrl && !linkUrl) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorName: profile.name,
      authorAvatar: profile.avatarUrl,
      isVerified: profile.isVerified,
      timestamp: timestamp.trim() || 'Pochi secondi fa',
      privacy,
      isPinned,
      type: postType,
      content,
      textBackgroundPreset: postType === 'text' ? textBackgroundPreset : undefined,
      imageUrls: imageUrl ? [imageUrl] : undefined,
      videoUrl: videoUrl || undefined,
      videoTitle: videoTitle || undefined,
      isEmbedIframe: isEmbedIframe || videoUrl.includes('youtube') || videoUrl.includes('embed'),
      reelAudioTitle: postType === 'reel' ? (reelAudioTitle || `${profile.name} • Suono originale`) : undefined,
      reelViewsCount: postType === 'reel' ? 1200 : undefined,
      linkUrl: linkUrl || undefined,
      linkTitle: linkTitle || undefined,
      linkDomain: linkDomain || undefined,
      linkImage: linkImage || undefined,
      reactions: { like: 1, love: 0, care: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
      sharesCount: 0,
      comments: []
    };

    onAddPost(newPost);

    // Reset Form
    setContent('');
    setImageUrl('');
    setVideoUrl('');
    setVideoTitle('');
    setIsEmbedIframe(false);
    setReelAudioTitle('');
    setLinkUrl('');
    setLinkTitle('');
    setLinkDomain('');
    setLinkImage('');
    setTextBackgroundPreset(undefined);
    setIsOpen(false);
  };

  return (
    <div className="bg-white dark:bg-[#242526] p-4 rounded-lg shadow border border-gray-200 dark:border-[#393A3B] transition-colors">
      
      {/* Closed State Header Trigger */}
      {!isOpen ? (
        <div>
          <div className="flex items-center gap-3">
            <img 
              src={profile.avatarUrl} 
              alt={profile.name} 
              className="w-10 h-10 rounded-full object-cover"
            />
            <button
              onClick={() => setIsOpen(true)}
              className="flex-1 bg-[#F0F2F5] dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] text-gray-500 dark:text-[#B0B3B8] text-left px-4 py-2.5 rounded-full text-sm font-normal transition-colors"
            >
              A cosa stai pensando, {profile.name.split(' ')[0]}?
            </button>
          </div>

          <hr className="border-gray-200 dark:border-[#393A3B] my-3" />

          <div className="grid grid-cols-3 gap-1 text-xs font-semibold text-gray-600 dark:text-[#B0B3B8]">
            <button 
              onClick={() => { setPostType('image'); setIsOpen(true); }}
              className="flex items-center justify-center gap-2 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-md transition-colors text-emerald-600 dark:text-emerald-400"
            >
              <ImageIcon className="w-5 h-5" />
              <span>Foto / Galleria</span>
            </button>

            <button 
              onClick={() => { setPostType('reel'); setIsOpen(true); }}
              className="flex items-center justify-center gap-2 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-md transition-colors text-pink-600 dark:text-pink-400"
            >
              <Film className="w-5 h-5" />
              <span>Crea Reel</span>
            </button>

            <button 
              onClick={() => { setPostType('video'); setIsOpen(true); }}
              className="flex items-center justify-center gap-2 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-md transition-colors text-red-500"
            >
              <Video className="w-5 h-5" />
              <span>Video / Link</span>
            </button>
          </div>
        </div>
      ) : (
        /* Expanded Post Creation Form */
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#393A3B] pb-3">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">Crea un nuovo post</h3>
            <button 
              type="button" 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] p-1.5 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Post Type Tab Selector */}
          <div className="flex items-center gap-1 bg-[#F0F2F5] dark:bg-[#3A3B3C] p-1 rounded-lg text-xs font-semibold overflow-x-auto">
            <button
              type="button"
              onClick={() => setPostType('text')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 ${postType === 'text' ? 'bg-[#1877F2] text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}
            >
              Testo
            </button>
            <button
              type="button"
              onClick={() => setPostType('image')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 ${postType === 'image' ? 'bg-[#1877F2] text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}
            >
              <ImageIcon className="w-3.5 h-3.5" /> Foto
            </button>
            <button
              type="button"
              onClick={() => setPostType('video')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 ${postType === 'video' ? 'bg-[#1877F2] text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}
            >
              <Video className="w-3.5 h-3.5" /> Video
            </button>
            <button
              type="button"
              onClick={() => setPostType('reel')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 ${postType === 'reel' ? 'bg-pink-600 text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}
            >
              <Film className="w-3.5 h-3.5" /> Reel
            </button>
            <button
              type="button"
              onClick={() => setPostType('link')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 ${postType === 'link' ? 'bg-[#1877F2] text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}
            >
              <LinkIcon className="w-3.5 h-3.5" /> Link
            </button>
          </div>

          {/* Author & Settings Header */}
          <div className="flex items-center gap-3">
            <img src={profile.avatarUrl} alt={profile.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="space-y-1">
              <span className="font-bold text-sm text-gray-900 dark:text-gray-100">{profile.name}</span>
              <div className="flex items-center gap-2">
                {/* Privacy Selector */}
                <select 
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value as PrivacyOption)}
                  className="bg-gray-100 dark:bg-[#3A3B3C] text-xs font-semibold px-2 py-1 rounded text-gray-700 dark:text-gray-300 border-none outline-none"
                >
                  <option value="public">🌍 Pubblico</option>
                  <option value="friends">👥 Amici</option>
                  <option value="only_me">🔒 Solo io</option>
                </select>

                {/* Timestamp Selector */}
                <input 
                  type="text" 
                  value={timestamp} 
                  onChange={(e) => setTimestamp(e.target.value)}
                  placeholder="Orario (es. Ora, 2 ore fa)"
                  className="bg-gray-100 dark:bg-[#3A3B3C] text-xs px-2 py-1 rounded text-gray-700 dark:text-gray-300 w-32 outline-none"
                />

                {/* Pin toggle */}
                <label className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isPinned} 
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="rounded text-[#1877F2]"
                  />
                  <Pin className="w-3 h-3 text-[#1877F2]" />
                  <span>Fissa in alto</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Text Area */}
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`A cosa stai pensando, ${profile.name.split(' ')[0]}?`}
              className={`w-full p-3 rounded-lg text-sm border border-gray-200 dark:border-[#393A3B] outline-none focus:ring-2 focus:ring-[#1877F2]/50 text-gray-800 dark:text-gray-100 bg-transparent resize-none ${
                textBackgroundPreset 
                  ? `fb-${textBackgroundPreset} text-white font-bold text-xl text-center py-10 placeholder-white/70` 
                  : 'min-h-[100px]'
              }`}
            />
          </div>

          {/* Text Colorful Background Preset Picker */}
          {postType === 'text' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5" /> Sfondo sfumato:
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setTextBackgroundPreset(undefined)}
                  className={`w-6 h-6 rounded-full border border-gray-300 bg-white dark:bg-[#3A3B3C] text-[10px] ${!textBackgroundPreset ? 'ring-2 ring-[#1877F2]' : ''}`}
                  title="Nessuno"
                >
                  🚫
                </button>
                <button
                  type="button"
                  onClick={() => setTextBackgroundPreset('gradient-purple')}
                  className={`w-6 h-6 rounded-full fb-gradient-purple ${textBackgroundPreset === 'gradient-purple' ? 'ring-2 ring-white ring-offset-1' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setTextBackgroundPreset('gradient-blue')}
                  className={`w-6 h-6 rounded-full fb-gradient-blue ${textBackgroundPreset === 'gradient-blue' ? 'ring-2 ring-white ring-offset-1' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setTextBackgroundPreset('gradient-pink')}
                  className={`w-6 h-6 rounded-full fb-gradient-pink ${textBackgroundPreset === 'gradient-pink' ? 'ring-2 ring-white ring-offset-1' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setTextBackgroundPreset('gradient-green')}
                  className={`w-6 h-6 rounded-full fb-gradient-green ${textBackgroundPreset === 'gradient-green' ? 'ring-2 ring-white ring-offset-1' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setTextBackgroundPreset('gradient-dark')}
                  className={`w-6 h-6 rounded-full fb-gradient-dark ${textBackgroundPreset === 'gradient-dark' ? 'ring-2 ring-white ring-offset-1' : ''}`}
                />
              </div>
            </div>
          )}

          {/* Media Inputs based on postType */}
          {postType === 'image' && (
            <div className="p-3 bg-gray-50 dark:bg-[#3A3B3C]/50 rounded-lg space-y-2 border border-gray-200 dark:border-[#393A3B]">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">
                Seleziona o Inserisci Immagine:
              </label>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Incolla URL immagine (es. https://...)" 
                  className="flex-1 bg-white dark:bg-[#3A3B3C] text-xs p-2 rounded border border-gray-200 dark:border-[#393A3B] outline-none"
                />
                <label className="bg-[#1877F2] hover:bg-[#166FE5] text-white px-3 py-1.5 rounded text-xs font-semibold cursor-pointer flex items-center gap-1">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Sfoglia</span>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} className="hidden" />
                </label>
              </div>
              {imageUrl && (
                <div className="relative mt-2 max-h-48 overflow-hidden rounded border">
                  <img src={imageUrl} alt="Anteprima" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setImageUrl('')} className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {postType === 'video' && (
            <div className="p-3 bg-gray-50 dark:bg-[#3A3B3C]/50 rounded-lg space-y-2 border border-gray-200 dark:border-[#393A3B]">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">
                Seleziona o Inserisci Video (MP4, YouTube o Embed):
              </label>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={videoUrl} 
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Incolla URL Video (es. https://.../video.mp4 o YouTube)" 
                  className="flex-1 bg-white dark:bg-[#3A3B3C] text-xs p-2 rounded border border-gray-200 dark:border-[#393A3B] outline-none"
                />
                <label className="bg-[#1877F2] hover:bg-[#166FE5] text-white px-3 py-1.5 rounded text-xs font-semibold cursor-pointer flex items-center gap-1 flex-shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Sfoglia Video</span>
                  <input type="file" accept="video/*" onChange={(e) => handleFileUpload(e, 'video')} className="hidden" />
                </label>
              </div>
              {videoUrl && (
                <div className="text-xs text-green-600 dark:text-green-400 font-semibold flex items-center justify-between bg-green-50 dark:bg-green-900/20 p-2 rounded">
                  <span className="truncate max-w-[280px]">✓ Video selezionato: {videoUrl.substring(0, 45)}...</span>
                  <button type="button" onClick={() => setVideoUrl('')} className="text-red-500 hover:underline">Rimuovi</button>
                </div>
              )}
              <input 
                type="text" 
                value={videoTitle} 
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="Titolo opzionale del video" 
                className="w-full bg-white dark:bg-[#3A3B3C] text-xs p-2 rounded border border-gray-200 dark:border-[#393A3B] outline-none"
              />
              <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 cursor-pointer pt-1">
                <input 
                  type="checkbox" 
                  checked={isEmbedIframe} 
                  onChange={(e) => setIsEmbedIframe(e.target.checked)} 
                  className="rounded text-[#1877F2]"
                />
                <span>Usa Iframe Embed (per YouTube, Vimeo, ecc.)</span>
              </label>
            </div>
          )}

          {postType === 'reel' && (
            <div className="p-3 bg-pink-50/50 dark:bg-pink-950/20 rounded-lg space-y-2 border border-pink-200 dark:border-pink-900/50">
              <label className="text-xs font-bold text-pink-700 dark:text-pink-300 flex items-center gap-1 block">
                <Film className="w-4 h-4" /> Dettagli Reel (Formato Verticale 9:16):
              </label>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={videoUrl} 
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="URL Video Reel MP4 (Verticale)" 
                  className="flex-1 bg-white dark:bg-[#3A3B3C] text-xs p-2 rounded border border-gray-200 dark:border-[#393A3B] outline-none"
                />
                <label className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-1.5 rounded text-xs font-semibold cursor-pointer flex items-center gap-1">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Carica Reel</span>
                  <input type="file" accept="video/*" onChange={(e) => handleFileUpload(e, 'video')} className="hidden" />
                </label>
              </div>
              <input 
                type="text" 
                value={reelAudioTitle} 
                onChange={(e) => setReelAudioTitle(e.target.value)}
                placeholder="Titolo Traccia Audio (es. Suono originale - Nome)" 
                className="w-full bg-white dark:bg-[#3A3B3C] text-xs p-2 rounded border border-gray-200 dark:border-[#393A3B] outline-none"
              />
            </div>
          )}

          {postType === 'link' && (
            <div className="p-3 bg-gray-50 dark:bg-[#3A3B3C]/50 rounded-lg space-y-2 border border-gray-200 dark:border-[#393A3B]">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">
                Anteprima Link Esterno:
              </label>
              <input 
                type="text" 
                value={linkUrl} 
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="URL Link (es. https://mio-sito.it)" 
                className="w-full bg-white dark:bg-[#3A3B3C] text-xs p-2 rounded border border-gray-200 dark:border-[#393A3B] outline-none"
              />
              <input 
                type="text" 
                value={linkTitle} 
                onChange={(e) => setLinkTitle(e.target.value)}
                placeholder="Titolo del Link" 
                className="w-full bg-white dark:bg-[#3A3B3C] text-xs p-2 rounded border border-gray-200 dark:border-[#393A3B] outline-none"
              />
              <input 
                type="text" 
                value={linkImage} 
                onChange={(e) => setLinkImage(e.target.value)}
                placeholder="URL Immagine di Anteprima" 
                className="w-full bg-white dark:bg-[#3A3B3C] text-xs p-2 rounded border border-gray-200 dark:border-[#393A3B] outline-none"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold py-2.5 rounded-lg text-sm transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Pubblica sul Feed</span>
            </button>
          </div>
        </form>
      )}

    </div>
  );
};
