import React from 'react';
import { Film, Play, Trash2, AlertCircle } from 'lucide-react';
import { Post } from '../types';

interface ReelsTabProps {
  posts: Post[];
  mode: 'admin' | 'live' | 'exporter';
  onDeletePost: (postId: string) => void;
}

export const ReelsTab: React.FC<ReelsTabProps> = ({ posts, mode, onDeletePost }) => {
  const reelPosts = posts.filter((p) => p.type === 'reel' && p.videoUrl);

  const handleDelete = (postId: string) => {
    if (window.confirm("Sei sicuro di voler eliminare questo Reel dalla bacheca?")) {
      onDeletePost(postId);
    }
  };

  return (
    <div className="bg-white dark:bg-[#242526] p-4 sm:p-6 rounded-lg shadow border border-gray-200 dark:border-[#393A3B] space-y-4">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#393A3B] pb-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Film className="w-5 h-5 text-pink-600" />
            Tutti i Reel ({reelPosts.length})
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            I Reel verticali pubblicati nel profilo.
          </p>
        </div>
      </div>

      {reelPosts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {reelPosts.map((post) => (
            <div key={post.id} className="relative aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-lg border border-gray-800 group">
              <video src={post.videoUrl} controls loop className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-pink-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md">
                REEL
              </div>

              {/* Delete Button (Admin Mode) */}
              {mode === 'admin' && (
                <button
                  onClick={() => handleDelete(post.id)}
                  className="absolute top-2 right-2 z-10 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow-md transition-all opacity-90 hover:scale-105"
                  title="Elimina Reel"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}

              {post.reelViewsCount && (
                <div className="absolute bottom-2 left-2 text-white text-[11px] font-bold flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded backdrop-blur-xs">
                  <Play className="w-3 h-3 fill-white" />
                  <span>{post.reelViewsCount.toLocaleString()}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-12">
          <AlertCircle className="w-10 h-10 mx-auto text-gray-400 mb-2" />
          <p className="font-medium">Nessun Reel pubblicato.</p>
        </div>
      )}
    </div>
  );
};
