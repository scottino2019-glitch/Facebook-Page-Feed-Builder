import React from 'react';
import { 
  Camera, 
  CheckCircle2, 
  Plus, 
  MessageCircle, 
  Edit3, 
  MoreHorizontal,
  Download,
  Share2,
  Film,
  Video,
  Image as ImageIcon,
  UserCheck,
  Info
} from 'lucide-react';
import { ProfileInfo } from '../types';

interface ProfileHeaderProps {
  profile: ProfileInfo;
  mode: 'admin' | 'live' | 'exporter';
  activeTab: 'posts' | 'about' | 'friends' | 'photos' | 'videos' | 'reels';
  setActiveTab: (tab: 'posts' | 'about' | 'friends' | 'photos' | 'videos' | 'reels') => void;
  onOpenEditProfile: () => void;
  onExportJson: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  mode,
  activeTab,
  setActiveTab,
  onOpenEditProfile,
  onExportJson
}) => {
  return (
    <div className="bg-white dark:bg-[#242526] shadow border-b border-gray-200 dark:border-[#393A3B] transition-colors">
      <div className="max-w-6xl mx-auto">
        
        {/* Cover Photo Container */}
        <div className="relative h-48 sm:h-72 md:h-80 lg:h-96 w-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-slate-800 dark:to-slate-900 overflow-hidden sm:rounded-b-lg group">
          <img 
            src={profile.coverUrl} 
            alt="Foto di Copertina" 
            className="w-full h-full object-cover transition-all duration-300"
          />

          {/* Edit Cover Photo Overlay Button in Admin Mode */}
          {mode === 'admin' && (
            <button 
              onClick={onOpenEditProfile}
              className="absolute bottom-4 right-4 bg-white/90 dark:bg-[#242526]/90 hover:bg-white dark:hover:bg-[#3A3B3C] text-gray-800 dark:text-gray-100 font-medium px-3.5 py-2 rounded-md text-xs sm:text-sm flex items-center gap-2 shadow-md backdrop-blur-sm transition-all"
            >
              <Camera className="w-4 h-4 text-[#1877F2]" />
              <span>Modifica copertina</span>
            </button>
          )}
        </div>

        {/* Profile Info Bar */}
        <div className="px-4 sm:px-8 pb-2">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between -mt-16 sm:-mt-20 md:-mt-12 mb-4 gap-4">
            
            {/* Left: Avatar & Text details */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 text-center md:text-left">
              
              {/* Profile Avatar with Camera Icon overlay */}
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full border-4 border-white dark:border-[#242526] overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-md flex-shrink-0 group">
                <img 
                  src={profile.avatarUrl} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                />
                {mode === 'admin' && (
                  <button 
                    onClick={onOpenEditProfile}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                    title="Modifica Foto Profilo"
                  >
                    <Camera className="w-8 h-8" />
                  </button>
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center md:justify-start gap-2">
                  <span>{profile.name}</span>
                  {profile.isVerified && (
                    <CheckCircle2 className="w-5 h-5 text-[#1877F2] fill-[#1877F2] text-white flex-shrink-0" />
                  )}
                </h1>

                {profile.category && (
                  <p className="text-gray-500 dark:text-[#B0B3B8] text-sm font-medium mt-0.5">
                    {profile.category}
                  </p>
                )}

                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 dark:text-[#B0B3B8] text-xs sm:text-sm mt-1">
                  <span>{profile.friendsCount}</span>
                  {profile.mutualFriendsCount && (
                    <>
                      <span>•</span>
                      <span>{profile.mutualFriendsCount}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center flex-wrap justify-center gap-2">
              {mode === 'admin' ? (
                <>
                  <button 
                    onClick={onOpenEditProfile}
                    className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-medium px-4 py-2 rounded-md text-sm flex items-center gap-2 shadow-sm transition-all"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Modifica Profilo</span>
                  </button>

                  <button 
                    onClick={onExportJson}
                    className="bg-gray-100 hover:bg-gray-200 dark:bg-[#3A3B3C] dark:hover:bg-[#4E4F50] text-gray-800 dark:text-gray-200 font-medium px-4 py-2 rounded-md text-sm flex items-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4 text-[#1877F2]" />
                    <span>Esporta JSON</span>
                  </button>
                </>
              ) : (
                <>
                  <button className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-medium px-4 py-2 rounded-md text-sm flex items-center gap-2 shadow-sm transition-all">
                    <Plus className="w-4 h-4" />
                    <span>Aggiungi alla storia</span>
                  </button>

                  <button 
                    onClick={() => window.open(profile.telegramUrl || 'https://t.me/telegram', '_blank')}
                    className="bg-gray-200 dark:bg-[#3A3B3C] hover:bg-gray-300 dark:hover:bg-[#4E4F50] text-gray-800 dark:text-gray-200 font-medium px-4 py-2 rounded-md text-sm flex items-center gap-2 transition-all"
                    title={`Invia un messaggio su Telegram (${profile.telegramUrl || 'https://t.me'})`}
                  >
                    <MessageCircle className="w-4 h-4 text-[#0088cc]" />
                    <span>Messaggio (Telegram)</span>
                  </button>

                  <button className="bg-gray-200 dark:bg-[#3A3B3C] hover:bg-gray-300 dark:hover:bg-[#4E4F50] text-gray-800 dark:text-gray-200 font-medium p-2 rounded-md transition-all">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

          </div>

          <hr className="border-gray-200 dark:border-[#393A3B] my-2" />

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-sm font-semibold text-gray-600 dark:text-[#B0B3B8]">
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-4 py-3 rounded-md transition-all whitespace-nowrap flex items-center gap-2 border-b-4 ${
                activeTab === 'posts'
                  ? 'text-[#1877F2] border-[#1877F2] bg-blue-50/50 dark:bg-blue-900/10'
                  : 'border-transparent hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'
              }`}
            >
              Post
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`px-4 py-3 rounded-md transition-all whitespace-nowrap flex items-center gap-2 border-b-4 ${
                activeTab === 'about'
                  ? 'text-[#1877F2] border-[#1877F2] bg-blue-50/50 dark:bg-blue-900/10'
                  : 'border-transparent hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'
              }`}
            >
              <Info className="w-4 h-4" />
              Informazioni
            </button>

            <button
              onClick={() => setActiveTab('friends')}
              className={`px-4 py-3 rounded-md transition-all whitespace-nowrap flex items-center gap-2 border-b-4 ${
                activeTab === 'friends'
                  ? 'text-[#1877F2] border-[#1877F2] bg-blue-50/50 dark:bg-blue-900/10'
                  : 'border-transparent hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Amici
            </button>

            <button
              onClick={() => setActiveTab('photos')}
              className={`px-4 py-3 rounded-md transition-all whitespace-nowrap flex items-center gap-2 border-b-4 ${
                activeTab === 'photos'
                  ? 'text-[#1877F2] border-[#1877F2] bg-blue-50/50 dark:bg-blue-900/10'
                  : 'border-transparent hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Foto
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`px-4 py-3 rounded-md transition-all whitespace-nowrap flex items-center gap-2 border-b-4 ${
                activeTab === 'videos'
                  ? 'text-[#1877F2] border-[#1877F2] bg-blue-50/50 dark:bg-blue-900/10'
                  : 'border-transparent hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'
              }`}
            >
              <Video className="w-4 h-4" />
              Video
            </button>

            <button
              onClick={() => setActiveTab('reels')}
              className={`px-4 py-3 rounded-md transition-all whitespace-nowrap flex items-center gap-2 border-b-4 ${
                activeTab === 'reels'
                  ? 'text-[#1877F2] border-[#1877F2] bg-blue-50/50 dark:bg-blue-900/10'
                  : 'border-transparent hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'
              }`}
            >
              <Film className="w-4 h-4" />
              Reel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
