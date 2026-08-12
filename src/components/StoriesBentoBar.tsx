import React from 'react';
import { Plus } from 'lucide-react';
import { ProfileInfo } from '../types';

interface StoriesBentoBarProps {
  profile: ProfileInfo;
}

export const StoriesBentoBar: React.FC<StoriesBentoBarProps> = ({ profile }) => {
  const mockStories = [
    {
      id: 's-1',
      authorName: 'Luca Costa',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bgImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 's-2',
      authorName: 'Anna Bianchi',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      bgImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 's-3',
      authorName: 'Giulia Verdi',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
      bgImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80',
    }
  ];

  return (
    <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
      {/* Create Story Card */}
      <div className="w-28 sm:w-32 h-44 sm:h-48 bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-200 dark:border-[#393A3B] relative overflow-hidden flex flex-col group cursor-pointer flex-shrink-0 transition-transform duration-200 hover:-translate-y-0.5">
        <div className="h-3/4 bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
          <img 
            src={profile.avatarUrl} 
            alt={profile.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        </div>
        <div className="absolute top-28 sm:top-32 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full border-4 border-white dark:border-[#242526] bg-[#1877F2] flex items-center justify-center text-white shadow-md">
          <Plus className="w-5 h-5 stroke-[3]" />
        </div>
        <div className="flex-1 flex items-end justify-center pb-2 px-1 text-center">
          <span className="text-[11px] sm:text-xs font-semibold text-gray-800 dark:text-gray-200 leading-tight">
            Crea storia
          </span>
        </div>
      </div>

      {/* User Stories */}
      {mockStories.map((story) => (
        <div 
          key={story.id} 
          className="w-28 sm:w-32 h-44 sm:h-48 bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-[#393A3B] relative overflow-hidden cursor-pointer flex-shrink-0 group transition-transform duration-200 hover:-translate-y-0.5"
        >
          <img 
            src={story.bgImage} 
            alt={story.authorName} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
          <div className="absolute top-2.5 left-2.5 w-8 h-8 rounded-full border-2 border-[#1877F2] overflow-hidden bg-white z-20 shadow-md">
            <img src={story.avatar} alt={story.authorName} className="w-full h-full object-cover" />
          </div>
          <span className="absolute bottom-2.5 left-2.5 right-2.5 text-white text-[11px] sm:text-xs font-semibold z-20 truncate drop-shadow-sm">
            {story.authorName}
          </span>
        </div>
      ))}
    </div>
  );
};
