import React from 'react';
import { Video, Trash2, AlertCircle } from 'lucide-react';
import { Post } from '../types';

interface VideosTabProps {
  posts: Post[];
  mode: 'admin' | 'live' | 'exporter';
  onDeletePost: (postId: string) => void;
}

export const VideosTab: React.FC<VideosTabProps> = ({ posts, mode, onDeletePost }) => {
  const videoPosts = posts.filter((p) => p.type === 'video' && p.videoUrl);

  const handleDelete = (postId: string) => {
    if (window.confirm("Sei sicuro di voler eliminare questo video dalla bacheca?")) {
      onDeletePost(postId);
    }
  };

  return (
    <div className="bg-white dark:bg-[#242526] p-4 sm:p-6 rounded-lg shadow border border-gray-200 dark:border-[#393A3B] space-y-4">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#393A3B] pb-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Video className="w-5 h-5 text-red-500" />
            Tutti i Video ({videoPosts.length})
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            I video caricati o pubblicati nella bacheca.
          </p>
        </div>
      </div>

      {videoPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {videoPosts.map((post) => (
            <div key={post.id} className="bg-gray-50 dark:bg-[#3A3B3C]/50 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm flex flex-col relative group">
              {/* Delete Button (Admin Mode) */}
              {mode === 'admin' && (
                <button
                  onClick={() => handleDelete(post.id)}
                  className="absolute top-2 right-2 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md transition-all opacity-90 hover:scale-105"
                  title="Elimina video"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              {post.isEmbedIframe || post.videoUrl?.includes('youtube') || post.videoUrl?.includes('embed') ? (
                <div className="aspect-video w-full bg-black">
                  <iframe src={post.videoUrl} title={post.videoTitle || 'Video'} className="w-full h-full" allowFullScreen />
                </div>
              ) : (
                <div className="aspect-video w-full bg-black flex items-center justify-center">
                  <video src={post.videoUrl} controls className="w-full h-full object-contain" />
                </div>
              )}

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 line-clamp-2">
                    {post.videoTitle || post.content || 'Video Facebook'}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{post.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-12">
          <AlertCircle className="w-10 h-10 mx-auto text-gray-400 mb-2" />
          <p className="font-medium">Nessun video presente nella bacheca.</p>
        </div>
      )}
    </div>
  );
};
