import React, { useState } from 'react';
import { Image as ImageIcon, Trash2, Maximize2, X, AlertCircle } from 'lucide-react';
import { Post, ProfileInfo } from '../types';

interface PhotoItem {
  id: string;
  url: string;
  label: string;
  postId?: string;
  isFeatured?: boolean;
}

interface PhotosTabProps {
  posts: Post[];
  profile: ProfileInfo;
  mode: 'admin' | 'live' | 'exporter';
  onDeletePost: (postId: string) => void;
  onDeleteFeaturedPhoto?: (photoUrl: string) => void;
}

export const PhotosTab: React.FC<PhotosTabProps> = ({ 
  posts, 
  profile, 
  mode, 
  onDeletePost, 
  onDeleteFeaturedPhoto 
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Build structured photo list with source metadata
  const items: PhotoItem[] = [];

  if (profile.avatarUrl) {
    items.push({ id: 'avatar', url: profile.avatarUrl, label: 'Foto Profilo' });
  }

  if (profile.coverUrl) {
    items.push({ id: 'cover', url: profile.coverUrl, label: 'Foto di Copertina' });
  }

  if (profile.featuredPhotos) {
    profile.featuredPhotos.forEach((url, i) => {
      items.push({ id: `featured-${i}`, url, label: 'Foto in Evidenza', isFeatured: true });
    });
  }

  posts.forEach((p) => {
    if (p.imageUrls && p.imageUrls.length > 0) {
      p.imageUrls.forEach((url, i) => {
        items.push({ 
          id: `post-${p.id}-${i}`, 
          url, 
          label: `Post (${p.timestamp})`, 
          postId: p.id 
        });
      });
    }
  });

  // Deduplicate by URL while keeping first meta
  const uniqueItemsMap = new Map<string, PhotoItem>();
  items.forEach((item) => {
    if (!uniqueItemsMap.has(item.url)) {
      uniqueItemsMap.set(item.url, item);
    }
  });

  const photoList = Array.from(uniqueItemsMap.values());

  const handleDelete = (item: PhotoItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.postId) {
      if (window.confirm("Sei sicuro di voler eliminare il post contenente questa foto?")) {
        onDeletePost(item.postId);
      }
    } else if (item.isFeatured && onDeleteFeaturedPhoto) {
      if (window.confirm("Sei sicuro di voler rimuovere questa foto dalle foto in evidenza?")) {
        onDeleteFeaturedPhoto(item.url);
      }
    } else {
      alert("La foto profilo o di copertina può essere modificata facendo clic su 'Modifica Profilo'.");
    }
  };

  return (
    <div className="bg-white dark:bg-[#242526] p-4 sm:p-6 rounded-lg shadow border border-gray-200 dark:border-[#393A3B] space-y-4">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#393A3B] pb-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#1877F2]" />
            Tutte le Foto ({photoList.length})
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Clicca su una foto per vederla a schermo intero senza tagli.
          </p>
        </div>
      </div>

      {photoList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {photoList.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedImage(item.url)}
              className="group relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm cursor-pointer border border-gray-200 dark:border-gray-700/60 transition-all hover:shadow-md"
            >
              <img 
                src={item.url} 
                alt={item.label} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />

              {/* Label Badge */}
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md pointer-events-none">
                {item.label}
              </div>

              {/* Actions Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button 
                  onClick={() => setSelectedImage(item.url)}
                  className="bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg transition-transform hover:scale-110"
                  title="Ingrandisci a schermo intero"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {mode === 'admin' && (item.postId || item.isFeatured) && (
                  <button 
                    onClick={(e) => handleDelete(item, e)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110"
                    title="Elimina foto/post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-12">
          <AlertCircle className="w-10 h-10 mx-auto text-gray-400 mb-2" />
          <p className="font-medium">Nessuna foto trovata nei post o nel profilo.</p>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/90 p-2.5 rounded-full transition-colors z-10"
            title="Chiudi"
          >
            <X className="w-6 h-6" />
          </button>

          <img 
            src={selectedImage} 
            alt="Foto a risoluzione intera" 
            className="max-w-full max-h-[92vh] object-contain rounded-lg shadow-2xl select-none"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
};
