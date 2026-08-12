import React, { useState } from 'react';
import { X, Save, Edit3, Image as ImageIcon, Video, Film, Palette, Upload } from 'lucide-react';
import { Post, PrivacyOption, PostType } from '../types';

interface EditPostModalProps {
  post: Post;
  onSave: (updatedPost: Post) => void;
  onClose: () => void;
}

export const EditPostModal: React.FC<EditPostModalProps> = ({ post, onSave, onClose }) => {
  const [content, setContent] = useState(post.content || '');
  const [privacy, setPrivacy] = useState<PrivacyOption>(post.privacy || 'public');
  const [timestamp, setTimestamp] = useState(post.timestamp || '');
  const [isPinned, setIsPinned] = useState(!!post.isPinned);
  const [textBackgroundPreset, setTextBackgroundPreset] = useState<string | undefined>(post.textBackgroundPreset);
  
  const [imageUrl, setImageUrl] = useState(post.imageUrls?.[0] || '');
  const [videoUrl, setVideoUrl] = useState(post.videoUrl || '');
  const [videoTitle, setVideoTitle] = useState(post.videoTitle || '');
  const [reelAudioTitle, setReelAudioTitle] = useState(post.reelAudioTitle || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedPost: Post = {
      ...post,
      content,
      privacy,
      timestamp,
      isPinned,
      textBackgroundPreset: post.type === 'text' ? textBackgroundPreset : undefined,
      imageUrls: imageUrl ? [imageUrl] : undefined,
      videoUrl: videoUrl || undefined,
      videoTitle: videoTitle || undefined,
      reelAudioTitle: post.type === 'reel' ? reelAudioTitle : undefined
    };

    onSave(updatedPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#242526] w-full max-w-lg rounded-xl shadow-2xl border border-gray-200 dark:border-[#393A3B] overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#393A3B]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-[#1877F2]" />
            Modifica Post
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] p-2 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
          
          {/* Post Text Content */}
          <div>
            <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Testo del Post:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className={`w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 outline-none text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-[#3A3B3C] ${
                textBackgroundPreset ? `fb-${textBackgroundPreset} text-white font-bold text-center py-6` : ''
              }`}
            />
          </div>

          {/* Background Gradient for Text Posts */}
          {post.type === 'text' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5" /> Sfondo sfumato:
              </span>
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => setTextBackgroundPreset(undefined)} className="w-6 h-6 rounded-full border bg-white dark:bg-[#3A3B3C]">🚫</button>
                <button type="button" onClick={() => setTextBackgroundPreset('gradient-purple')} className="w-6 h-6 rounded-full fb-gradient-purple" />
                <button type="button" onClick={() => setTextBackgroundPreset('gradient-blue')} className="w-6 h-6 rounded-full fb-gradient-blue" />
                <button type="button" onClick={() => setTextBackgroundPreset('gradient-pink')} className="w-6 h-6 rounded-full fb-gradient-pink" />
                <button type="button" onClick={() => setTextBackgroundPreset('gradient-green')} className="w-6 h-6 rounded-full fb-gradient-green" />
              </div>
            </div>
          )}

          {/* Media URL if Image / Video */}
          {post.type === 'image' && (
            <div>
              <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">URL Immagine:</label>
              <input 
                type="text" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#3A3B3C] p-2 rounded border border-gray-200 dark:border-gray-700 outline-none"
              />
            </div>
          )}

          {(post.type === 'video' || post.type === 'reel') && (
            <div className="space-y-2">
              <label className="font-semibold text-gray-700 dark:text-gray-300 block">URL Video / Embed:</label>
              <input 
                type="text" 
                value={videoUrl} 
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#3A3B3C] p-2 rounded border border-gray-200 dark:border-gray-700 outline-none"
              />
              {post.type === 'video' && (
                <input 
                  type="text" 
                  value={videoTitle} 
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="Titolo Video"
                  className="w-full bg-gray-50 dark:bg-[#3A3B3C] p-2 rounded border border-gray-200 dark:border-gray-700 outline-none"
                />
              )}
              {post.type === 'reel' && (
                <input 
                  type="text" 
                  value={reelAudioTitle} 
                  onChange={(e) => setReelAudioTitle(e.target.value)}
                  placeholder="Titolo Traccia Audio"
                  className="w-full bg-gray-50 dark:bg-[#3A3B3C] p-2 rounded border border-gray-200 dark:border-gray-700 outline-none"
                />
              )}
            </div>
          )}

          {/* Privacy & Timestamp Settings */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Privacy:</label>
              <select 
                value={privacy} 
                onChange={(e) => setPrivacy(e.target.value as PrivacyOption)}
                className="w-full bg-gray-50 dark:bg-[#3A3B3C] p-2 rounded border border-gray-200 dark:border-gray-700 outline-none"
              >
                <option value="public">🌍 Pubblico</option>
                <option value="friends">👥 Amici</option>
                <option value="only_me">🔒 Solo io</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Orario di pubblicazione:</label>
              <input 
                type="text" 
                value={timestamp} 
                onChange={(e) => setTimestamp(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#3A3B3C] p-2 rounded border border-gray-200 dark:border-gray-700 outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
              <input 
                type="checkbox" 
                checked={isPinned} 
                onChange={(e) => setIsPinned(e.target.checked)}
                className="rounded text-[#1877F2]"
              />
              <span>Fissa questo post in alto nella bacheca</span>
            </label>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-gray-200 dark:border-[#393A3B] flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-[#3A3B3C] text-gray-800 dark:text-gray-200 font-semibold"
            >
              Annulla
            </button>
            <button 
              type="submit"
              className="px-6 py-2 rounded-lg bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold flex items-center gap-2 shadow"
            >
              <Save className="w-4 h-4" />
              Salva Post
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
