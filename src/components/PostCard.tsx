import React, { useState } from 'react';
import { 
  Globe, 
  Users, 
  Lock, 
  Pin, 
  MoreHorizontal, 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Trash2, 
  Edit3, 
  Send, 
  Film, 
  Volume2, 
  Play, 
  ExternalLink,
  CheckCircle2,
  Heart,
  Maximize2,
  X
} from 'lucide-react';
import { Post, ReactionType, PrivacyOption, Comment } from '../types';

interface PostCardProps {
  post: Post;
  mode: 'admin' | 'live' | 'exporter';
  onUpdatePost: (updated: Post) => void;
  onDeletePost: (postId: string) => void;
  onOpenEditModal: (post: Post) => void;
}

const REACTION_EMOJIS: Record<ReactionType, { emoji: string; label: string; color: string }> = {
  like: { emoji: '👍', label: 'Mi piace', color: 'text-[#1877F2]' },
  love: { emoji: '❤️', label: 'Love', color: 'text-red-500' },
  care: { emoji: '🤗', label: 'Abbraccio', color: 'text-amber-500' },
  haha: { emoji: '😄', label: 'Ahah', color: 'text-amber-500' },
  wow: { emoji: '😮', label: 'Wow', color: 'text-amber-500' },
  sad: { emoji: '😢', label: 'Sigh', color: 'text-amber-500' },
  angry: { emoji: '😡', label: 'Grr', color: 'text-orange-600' },
};

export const PostCard: React.FC<PostCardProps> = ({
  post,
  mode,
  onUpdatePost,
  onDeletePost,
  onOpenEditModal
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showReactionsPicker, setShowReactionsPicker] = useState(false);
  const [showComments, setShowComments] = useState(Boolean(post.comments && post.comments.length > 0));
  const [newCommentText, setNewCommentText] = useState('');
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  // Handle Privacy Icon
  const getPrivacyIcon = (privacy: PrivacyOption) => {
    switch (privacy) {
      case 'friends':
        return <Users className="w-3 h-3 text-gray-500" title="Amici" />;
      case 'only_me':
        return <Lock className="w-3 h-3 text-gray-500" title="Solo io" />;
      case 'public':
      default:
        return <Globe className="w-3 h-3 text-gray-500" title="Pubblico" />;
    }
  };

  // Toggle or select reaction
  const handleSelectReaction = (type: ReactionType) => {
    const currentReaction = post.userReaction;
    const updatedReactions = { ...post.reactions };

    if (currentReaction) {
      updatedReactions[currentReaction] = Math.max(0, (updatedReactions[currentReaction] || 0) - 1);
    }

    let nextReaction: ReactionType | undefined = type;
    if (currentReaction === type) {
      // Toggle off
      nextReaction = undefined;
    } else {
      updatedReactions[type] = (updatedReactions[type] || 0) + 1;
    }

    onUpdatePost({
      ...post,
      reactions: updatedReactions,
      userReaction: nextReaction
    });

    setShowReactionsPicker(false);
  };

  // Handle Pin Toggle
  const handleTogglePin = () => {
    onUpdatePost({
      ...post,
      isPinned: !post.isPinned
    });
    setShowMenu(false);
  };

  // Handle Add Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      authorName: post.authorName,
      authorAvatar: post.authorAvatar,
      text: newCommentText.trim(),
      timestamp: 'Pochi secondi fa',
      likesCount: 0
    };

    onUpdatePost({
      ...post,
      comments: [...post.comments, newComment]
    });

    setNewCommentText('');
    setShowComments(true);
  };

  // Handle Share Count
  const handleShare = () => {
    onUpdatePost({
      ...post,
      sharesCount: (post.sharesCount || 0) + 1
    });
  };

  // Calculate Total Reactions
  const r = post.reactions || { like: 0, love: 0, care: 0, haha: 0, wow: 0, sad: 0, angry: 0 };
  const totalReactions = (Number(r.like) || 0) + (Number(r.love) || 0) + (Number(r.care) || 0) + (Number(r.haha) || 0) + (Number(r.wow) || 0) + (Number(r.sad) || 0) + (Number(r.angry) || 0);

  return (
    <div className="bg-white dark:bg-[#242526] rounded-lg shadow border border-gray-200 dark:border-[#393A3B] transition-colors overflow-hidden">
      
      {/* Post Header */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <img 
              src={post.authorAvatar} 
              alt={post.authorName} 
              className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700" 
            />
            <div>
              <div className="flex items-center gap-1 font-bold text-sm text-gray-900 dark:text-gray-100">
                <span>{post.authorName}</span>
                {post.isVerified && (
                  <CheckCircle2 className="w-4 h-4 text-[#1877F2] fill-[#1877F2] text-white" />
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-[#B0B3B8] mt-0.5">
                <span>{post.timestamp}</span>
                <span>•</span>
                {getPrivacyIcon(post.privacy)}

                {post.isPinned && (
                  <span className="ml-2 text-[#1877F2] font-semibold flex items-center gap-1">
                    <Pin className="w-3 h-3" />
                    <span>Post fissato</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Admin Menu Control */}
          <div className="relative">
            {mode === 'admin' && (
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-500 dark:text-gray-300 rounded-full transition-colors"
                title="Opzioni Post"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
            )}

            {/* Menu Dropdown */}
            {showMenu && mode === 'admin' && (
              <div className="absolute right-0 top-10 z-20 w-48 bg-white dark:bg-[#242526] rounded-lg shadow-xl border border-gray-200 dark:border-[#393A3B] py-1 text-xs font-semibold text-gray-700 dark:text-gray-200">
                <button
                  onClick={() => { onOpenEditModal(post); setShowMenu(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4 text-[#1877F2]" />
                  <span>Modifica Post</span>
                </button>

                <button
                  onClick={handleTogglePin}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-2"
                >
                  <Pin className="w-4 h-4 text-amber-500" />
                  <span>{post.isPinned ? 'Rimuovi Pin' : 'Fissa in alto'}</span>
                </button>

                <hr className="border-gray-200 dark:border-[#393A3B] my-1" />

                <button
                  onClick={() => { onDeletePost(post.id); setShowMenu(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Elimina Post</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Post Text Content */}
        {post.content && (
          <div className={`mt-3 text-sm whitespace-pre-wrap leading-relaxed ${
            post.textBackgroundPreset 
              ? `fb-${post.textBackgroundPreset} text-white font-bold text-xl text-center p-8 rounded-lg my-2 shadow-inner` 
              : 'text-gray-800 dark:text-gray-100'
          }`}>
            {post.content}
          </div>
        )}
      </div>

      {/* Media Content Rendering */}
      
      {/* 1. Single Image or Gallery */}
      {post.type === 'image' && post.imageUrls && post.imageUrls.length > 0 && (
        <div 
          onClick={() => setLightboxUrl(post.imageUrls![0])}
          className="mt-2 bg-[#0f0f0f] relative group cursor-pointer overflow-hidden flex justify-center items-center"
        >
          <img 
            src={post.imageUrls[0]} 
            alt="Media post" 
            className="w-full h-auto max-h-[650px] object-contain transition-transform duration-200 group-hover:scale-[1.01]"
          />
          <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Ingrandisci Foto</span>
          </div>
        </div>
      )}

      {/* 2. Video Player or Embed */}
      {post.type === 'video' && post.videoUrl && (
        <div className="mt-2 bg-black">
          {post.isEmbedIframe || post.videoUrl.includes('youtube') || post.videoUrl.includes('embed') ? (
            <div className="aspect-video w-full">
              <iframe 
                src={post.videoUrl} 
                title={post.videoTitle || 'Video Embed'} 
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
          ) : (
            <video 
              src={post.videoUrl} 
              controls 
              className="w-full max-h-[500px] mx-auto"
            />
          )}
          {post.videoTitle && (
            <div className="p-3 bg-gray-900 text-white text-xs font-semibold">
              {post.videoTitle}
            </div>
          )}
        </div>
      )}

      {/* 3. Reel Video Player (Vertical 9:16 Aspect) */}
      {post.type === 'reel' && post.videoUrl && (
        <div className="mt-2 relative bg-black flex justify-center py-4 overflow-hidden group">
          <div className="relative w-[280px] sm:w-[320px] aspect-[9/16] rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <video 
              src={post.videoUrl} 
              controls 
              loop
              className="w-full h-full object-cover"
            />
            {/* Reel Badge Overlay */}
            <div className="absolute top-3 left-3 bg-pink-600 text-white px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 shadow">
              <Film className="w-3 h-3" />
              <span>REEL</span>
            </div>

            {/* Audio Track Overlay */}
            {post.reelAudioTitle && (
              <div className="absolute bottom-12 left-3 right-3 text-white text-xs bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded-md flex items-center gap-2 truncate">
                <Volume2 className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
                <span className="truncate font-medium">{post.reelAudioTitle}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Link Card Preview */}
      {post.type === 'link' && post.linkUrl && (
        <a 
          href={post.linkUrl} 
          target="_blank" 
          rel="noreferrer"
          className="block mt-2 border-t border-b border-gray-200 dark:border-[#393A3B] bg-gray-50 dark:bg-[#3A3B3C]/40 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors group"
        >
          {post.linkImage && (
            <img src={post.linkImage} alt="Anteprima Link" className="w-full h-48 object-cover" />
          )}
          <div className="p-3">
            <span className="text-xs uppercase text-gray-500 font-bold block truncate">
              {post.linkDomain || new URL(post.linkUrl).hostname}
            </span>
            <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 group-hover:text-[#1877F2] transition-colors line-clamp-2">
              {post.linkTitle || post.linkUrl}
            </h4>
          </div>
        </a>
      )}

      {/* Engagement Counters Info Bar */}
      <div className="px-4 py-2 border-t border-gray-100 dark:border-[#393A3B] text-xs text-gray-500 dark:text-[#B0B3B8] flex items-center justify-between">
        
        {/* Left: Reactions total with emoji badges */}
        <div className="flex items-center gap-1.5 cursor-pointer">
          <div className="flex items-center -space-x-1">
            <span className="w-4 h-4 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[9px] shadow-sm">👍</span>
            <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[9px] shadow-sm">❤️</span>
            <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[9px] shadow-sm">🤗</span>
          </div>
          <span className="font-medium hover:underline">
            {totalReactions > 0 ? totalReactions : '0'}
          </span>
        </div>

        {/* Right: Comments and Shares counts */}
        <div className="flex items-center gap-3">
          <button onClick={() => setShowComments(!showComments)} className="hover:underline">
            {post.comments.length} commenti
          </button>
          <span>•</span>
          <button onClick={handleShare} className="hover:underline">
            {post.sharesCount || 0} condivisioni
          </button>
        </div>

      </div>

      <hr className="border-gray-200 dark:border-[#393A3B] mx-4" />

      {/* Action Buttons Bar (Mi piace, Commenta, Condividi) */}
      <div className="relative px-2 py-1 flex items-center justify-between text-xs sm:text-sm font-semibold text-gray-600 dark:text-[#B0B3B8]">
        
        {/* Reaction Hover / Touch Picker Container */}
        <div 
          className="relative flex-1"
          onMouseEnter={() => setShowReactionsPicker(true)}
          onMouseLeave={() => setShowReactionsPicker(false)}
        >
          {/* Reaction Floating Picker Box */}
          {showReactionsPicker && (
            <div className="absolute bottom-full left-0 mb-1 z-30 bg-white dark:bg-[#242526] p-1.5 rounded-full shadow-2xl border border-gray-200 dark:border-[#393A3B] flex items-center gap-2 animate-bounce-short">
              {(Object.keys(REACTION_EMOJIS) as ReactionType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => handleSelectReaction(type)}
                  className="hover:scale-125 transition-transform text-2xl p-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#3A3B3C]"
                  title={REACTION_EMOJIS[type].label}
                >
                  {REACTION_EMOJIS[type].emoji}
                </button>
              ))}
            </div>
          )}

          {/* Main Like Button */}
          <button
            onClick={() => handleSelectReaction(post.userReaction || 'like')}
            className={`w-full py-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center justify-center gap-2 transition-colors ${
              post.userReaction ? REACTION_EMOJIS[post.userReaction].color : ''
            }`}
          >
            {post.userReaction ? (
              <span className="text-base">{REACTION_EMOJIS[post.userReaction].emoji}</span>
            ) : (
              <ThumbsUp className="w-4 h-4" />
            )}
            <span>{post.userReaction ? REACTION_EMOJIS[post.userReaction].label : 'Mi piace'}</span>
          </button>
        </div>

        {/* Comment Button */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center justify-center gap-2 transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Commenta</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex-1 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center justify-center gap-2 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>Condividi</span>
        </button>

      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="bg-gray-50/70 dark:bg-[#18191A]/60 p-4 border-t border-gray-200 dark:border-[#393A3B] space-y-3">
          
          {/* Comment Input Box */}
          <form onSubmit={handleAddComment} className="flex items-center gap-2">
            <img 
              src={post.authorAvatar} 
              alt="Avatar" 
              className="w-8 h-8 rounded-full object-cover" 
            />
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={newCommentText} 
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Scrivi un commento pubblico..." 
                className="w-full bg-white dark:bg-[#3A3B3C] text-xs sm:text-sm pl-3 pr-10 py-2 rounded-full border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-[#1877F2]/50 text-gray-800 dark:text-gray-100"
              />
              <button 
                type="submit" 
                disabled={!newCommentText.trim()}
                className="absolute right-2 top-2 text-[#1877F2] disabled:opacity-30 hover:scale-110 transition-transform"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* List of Comments */}
          {post.comments && post.comments.length > 0 ? (
            <div className="space-y-2.5 pt-2">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-2.5 text-xs">
                  <img 
                    src={comment.authorAvatar} 
                    alt={comment.authorName} 
                    className="w-7 h-7 rounded-full object-cover mt-1" 
                  />
                  <div>
                    <div className="bg-white dark:bg-[#3A3B3C] p-2.5 rounded-2xl shadow-sm inline-block">
                      <span className="font-bold text-gray-900 dark:text-gray-100 block">
                        {comment.authorName}
                      </span>
                      <p className="text-gray-800 dark:text-gray-200 font-normal mt-0.5">
                        {comment.text || (comment as any).content || ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-gray-500 dark:text-gray-400 mt-1 pl-2">
                      <button className="hover:underline font-semibold">Mi piace</button>
                      <button className="hover:underline font-semibold">Rispondi</button>
                      <span>{comment.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic text-center py-2">
              Nessun commento finora. Sii il primo a commentare!
            </p>
          )}

        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxUrl && (
        <div 
          onClick={() => setLightboxUrl(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <button 
            onClick={() => setLightboxUrl(null)}
            className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 p-2 rounded-full transition-colors z-10"
            title="Chiudi"
          >
            <X className="w-6 h-6" />
          </button>
          <img 
            src={lightboxUrl} 
            alt="Foto ingrandita" 
            className="max-w-full max-h-[92vh] object-contain rounded-lg shadow-2xl select-none"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

    </div>
  );
};
