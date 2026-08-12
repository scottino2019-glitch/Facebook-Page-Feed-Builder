import React from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Home, 
  MapPin, 
  Heart, 
  Calendar, 
  Globe, 
  Users, 
  Edit3, 
  Camera,
  Image as ImageIcon
} from 'lucide-react';
import { IntroInfo } from '../types';

interface IntroSidebarProps {
  intro: IntroInfo;
  featuredPhotos: string[];
  mode: 'admin' | 'live' | 'exporter';
  onOpenEditProfile: () => void;
}

export const IntroSidebar: React.FC<IntroSidebarProps> = ({
  intro,
  featuredPhotos,
  mode,
  onOpenEditProfile
}) => {
  return (
    <div className="space-y-4">
      {/* Introduzione Box */}
      <div className="bg-white dark:bg-[#242526] p-4 rounded-lg shadow border border-gray-200 dark:border-[#393A3B] transition-colors">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Introduzione
          </h2>
          {mode === 'admin' && (
            <button 
              onClick={onOpenEditProfile}
              className="text-[#1877F2] hover:bg-blue-50 dark:hover:bg-[#3A3B3C] p-1.5 rounded-full transition-colors"
              title="Modifica Introduzione"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Bio */}
        {intro.bio ? (
          <p className="text-center text-sm text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap leading-relaxed font-normal">
            {intro.bio}
          </p>
        ) : (
          <p className="text-center text-xs text-gray-400 italic mb-3">
            Nessuna biografia inserita.
          </p>
        )}

        {/* Intro Attributes List */}
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          {intro.work && (
            <div className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8] flex-shrink-0 mt-0.5" />
              <span className="leading-tight">{intro.work}</span>
            </div>
          )}

          {intro.education && (
            <div className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8] flex-shrink-0 mt-0.5" />
              <span className="leading-tight">{intro.education}</span>
            </div>
          )}

          {intro.livesIn && (
            <div className="flex items-start gap-3">
              <Home className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8] flex-shrink-0 mt-0.5" />
              <span className="leading-tight">{intro.livesIn}</span>
            </div>
          )}

          {intro.fromLocation && (
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8] flex-shrink-0 mt-0.5" />
              <span className="leading-tight">{intro.fromLocation}</span>
            </div>
          )}

          {intro.relationshipStatus && (
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8] flex-shrink-0 mt-0.5" />
              <span className="leading-tight">{intro.relationshipStatus}</span>
            </div>
          )}

          {intro.joinedDate && (
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8] flex-shrink-0 mt-0.5" />
              <span className="leading-tight">{intro.joinedDate}</span>
            </div>
          )}

          {intro.website && (
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8] flex-shrink-0 mt-0.5" />
              <a 
                href={intro.website.startsWith('http') ? intro.website : `https://${intro.website}`} 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#1877F2] hover:underline leading-tight truncate"
              >
                {intro.website}
              </a>
            </div>
          )}

          {intro.followersCount && (
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8] flex-shrink-0 mt-0.5" />
              <span className="leading-tight">{intro.followersCount}</span>
            </div>
          )}
        </div>

        {/* Edit Bio Button */}
        {mode === 'admin' && (
          <button 
            onClick={onOpenEditProfile}
            className="w-full mt-4 bg-gray-100 hover:bg-gray-200 dark:bg-[#3A3B3C] dark:hover:bg-[#4E4F50] text-gray-800 dark:text-gray-200 font-medium py-2 rounded-md text-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <Edit3 className="w-4 h-4 text-[#1877F2]" />
            Modifica dettagli
          </button>
        )}
      </div>

      {/* Featured Photos Section */}
      <div className="bg-white dark:bg-[#242526] p-4 rounded-lg shadow border border-gray-200 dark:border-[#393A3B] transition-colors">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#1877F2]" />
            Foto in evidenza
          </h2>
          {mode === 'admin' && (
            <button 
              onClick={onOpenEditProfile}
              className="text-[#1877F2] hover:underline text-xs font-semibold"
            >
              Modifica
            </button>
          )}
        </div>

        {featuredPhotos && featuredPhotos.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
            {featuredPhotos.map((url, idx) => (
              <div key={idx} className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded overflow-hidden group">
                <img 
                  src={url} 
                  alt={`Evidenza ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 italic text-center py-4">
            Nessuna foto in evidenza.
          </p>
        )}
      </div>
    </div>
  );
};
