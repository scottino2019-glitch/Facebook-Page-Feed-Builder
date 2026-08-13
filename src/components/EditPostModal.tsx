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
  const [imageUrls, setImageUrls] = useState<string[]>(post.imageUrls || (post.imageUrls?.[0] ? [post.imageUrls[0]] : []));
  const [videoUrl, setVideoUrl] = useState(post.videoUrl || '');
  const [videoTitle, setVideoTitle] = useState(post.videoTitle || '');
  const [reelAudioTitle, setReelAudioTitle] = useState(post.reelAudioTitle || '');

  const handleMultipleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const promises = fileArray.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (uploadEvent) => {
            resolve(uploadEvent.target?.result as string);
          };
          reader.readAsDataURL(file);
        });
      });
      Promise.all(promises).then((newUrls) => {
        setImageUrls((prev) => [...prev, ...newUrls]);
      });
    }
  };

  const removeImageAt = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalImages = imageUrls.length > 0 ? imageUrls : (imageUrl ? [imageUrl] : undefined);

    const updatedPost: Post = {
      ...post,
      content,
      privacy,
      timestamp,
      isPinned,
      textBackgroundPreset: post.type === 'text' ? textBackgroundPreset : undefined,
      imageUrls: finalImages,
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

          {/* SFONDO COLORATO SELEZIONE */}
          <div className="bg-gray-50 dark:bg-[#3A3B3C]/50 p-3 rounded-xl border border-gray-200/80 dark:border-gray-700 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-purple-500" />
                <span>Sfondo sfumato:</span>
              </span>
              {textBackgroundPreset && (
                <button 
                  type="button" 
                  onClick={() => setTextBackgroundPreset(undefined)}
                  className="text-[#1877F2] hover:underline text-[11px] font-bold"
                >
                  Rimuovi Sfondo
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
              <button
                type="button"
                onClick={() => setTextBackgroundPreset(undefined)}
                className={`w-8 h-8 rounded-lg border-2 border-gray-300 dark:border-gray-500 bg-white dark:bg-[#242526] text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center justify-center flex-shrink-0 ${!textBackgroundPreset ? 'ring-2 ring-[#1877F2] border-[#1877F2]' : ''}`}
                title="Nessuno"
              >
                Aa
              </button>
              <button
                type="button"
                onClick={() => setTextBackgroundPreset('gradient-purple')}
                className={`w-8 h-8 rounded-lg fb-gradient-purple flex-shrink-0 transition-transform active:scale-95 ${textBackgroundPreset === 'gradient-purple' ? 'ring-2 ring-offset-2 ring-[#1877F2] scale-105' : 'opacity-90 hover:opacity-100'}`}
              />
              <button
                type="button"
                onClick={() => setTextBackgroundPreset('gradient-blue')}
                className={`w-8 h-8 rounded-lg fb-gradient-blue flex-shrink-0 transition-transform active:scale-95 ${textBackgroundPreset === 'gradient-blue' ? 'ring-2 ring-offset-2 ring-[#1877F2] scale-105' : 'opacity-90 hover:opacity-100'}`}
              />
              <button
                type="button"
                onClick={() => setTextBackgroundPreset('gradient-pink')}
                className={`w-8 h-8 rounded-lg fb-gradient-pink flex-shrink-0 transition-transform active:scale-95 ${textBackgroundPreset === 'gradient-pink' ? 'ring-2 ring-offset-2 ring-[#1877F2] scale-105' : 'opacity-90 hover:opacity-100'}`}
              />
              <button
                type="button"
                onClick={() => setTextBackgroundPreset('gradient-green')}
                className={`w-8 h-8 rounded-lg fb-gradient-green flex-shrink-0 transition-transform active:scale-95 ${textBackgroundPreset === 'gradient-green' ? 'ring-2 ring-offset-2 ring-[#1877F2] scale-105' : 'opacity-90 hover:opacity-100'}`}
              />
              <button
                type="button"
                onClick={() => setTextBackgroundPreset('gradient-dark')}
                className={`w-8 h-8 rounded-lg fb-gradient-dark flex-shrink-0 transition-transform active:scale-95 ${textBackgroundPreset === 'gradient-dark' ? 'ring-2 ring-offset-2 ring-[#1877F2] scale-105' : 'opacity-90 hover:opacity-100'}`}
              />
            </div>
          </div>

          {/* Media URL if Image */}
          {post.type === 'image' && (
            <div className="p-3 bg-gray-50 dark:bg-[#3A3B3C]/50 rounded-xl space-y-3 border border-gray-200 dark:border-[#393A3B]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Foto del Post (Selezione Multipla):
                </label>
                {imageUrls.length > 0 && (
                  <button 
                    type="button" 
                    onClick={() => setImageUrls([])} 
                    className="text-xs font-semibold text-red-500 hover:underline"
                  >
                    Rimuovi tutte
                  </button>
                )}
              </div>

              {imageUrls.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {imageUrls.map((url, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 group">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => removeImageAt(idx)}
                        className="absolute top-1 right-1 bg-black/70 hover:bg-black text-white p-1 rounded-full shadow transition-all"
                        title="Rimuovi"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-square border-2 border-dashed border-[#1877F2] bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-100/50 rounded-lg flex flex-col items-center justify-center cursor-pointer p-1 text-[#1877F2]">
                    <Upload className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold">+ Aggiungi</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      onChange={handleMultipleImageUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>
              ) : (
                <div className="space-y-2">
                  <input 
                    type="text" 
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Incolla URL immagine..." 
                    className="w-full bg-white dark:bg-[#3A3B3C] text-xs p-2 rounded border border-gray-200 dark:border-[#393A3B] outline-none"
                  />
                  <label className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white py-2 px-3 rounded-lg text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5 shadow-sm">
                    <Upload className="w-4 h-4" />
                    <span>Sfoglia e Carica Foto (Scelta Multipla)</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      onChange={handleMultipleImageUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>
              )}
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
