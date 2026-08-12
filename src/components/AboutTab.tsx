import React from 'react';
import { Briefcase, GraduationCap, Home, MapPin, Heart, Calendar, Globe, Mail, Phone, Users } from 'lucide-react';
import { ProfileInfo } from '../types';

interface AboutTabProps {
  profile: ProfileInfo;
  onOpenEditProfile: () => void;
  mode: 'admin' | 'live' | 'exporter';
}

export const AboutTab: React.FC<AboutTabProps> = ({ profile, onOpenEditProfile, mode }) => {
  const { intro } = profile;

  return (
    <div className="bg-white dark:bg-[#242526] p-6 rounded-lg shadow border border-gray-200 dark:border-[#393A3B] space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#393A3B] pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Informazioni</h2>
          <p className="text-xs text-gray-500">Dettagli generali sul profilo e informazioni di contatto</p>
        </div>
        {mode === 'admin' && (
          <button 
            onClick={onOpenEditProfile} 
            className="bg-[#1877F2] hover:bg-[#166FE5] text-white px-3.5 py-1.5 rounded-md text-xs font-bold"
          >
            Modifica Informazioni
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-800 dark:text-gray-200">
        
        {/* Work & Education */}
        <div className="space-y-3">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base border-b pb-2 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#1877F2]" />
            Lavoro e istruzione
          </h3>
          {intro.work && (
            <div className="flex items-start gap-3">
              <Briefcase className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="font-semibold">{intro.work}</p>
                <span className="text-xs text-gray-500">Occupazione principale</span>
              </div>
            </div>
          )}
          {intro.education && (
            <div className="flex items-start gap-3">
              <GraduationCap className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="font-semibold">{intro.education}</p>
                <span className="text-xs text-gray-500">Percorso universitario</span>
              </div>
            </div>
          )}
        </div>

        {/* Places Lived */}
        <div className="space-y-3">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base border-b pb-2 flex items-center gap-2">
            <Home className="w-5 h-5 text-[#1877F2]" />
            Luoghi in cui hai vissuto
          </h3>
          {intro.livesIn && (
            <div className="flex items-start gap-3">
              <Home className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="font-semibold">{intro.livesIn}</p>
                <span className="text-xs text-gray-500">Città attuale</span>
              </div>
            </div>
          )}
          {intro.fromLocation && (
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="font-semibold">{intro.fromLocation}</p>
                <span className="text-xs text-gray-500">Città d'origine</span>
              </div>
            </div>
          )}
        </div>

        {/* Contact & Web Info */}
        <div className="space-y-3">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base border-b pb-2 flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#1877F2]" />
            Informazioni di contatto
          </h3>
          {intro.website && (
            <div className="flex items-start gap-3">
              <Globe className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <a href={intro.website.startsWith('http') ? intro.website : `https://${intro.website}`} target="_blank" rel="noreferrer" className="font-semibold text-[#1877F2] hover:underline">
                  {intro.website}
                </a>
                <span className="text-xs text-gray-500 block">Sito Web ufficiale</span>
              </div>
            </div>
          )}
          {intro.followersCount && (
            <div className="flex items-start gap-3">
              <Users className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="font-semibold">{intro.followersCount}</p>
                <span className="text-xs text-gray-500">Seguaci totali</span>
              </div>
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className="space-y-3">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base border-b pb-2 flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#1877F2]" />
            Relazioni e biografia
          </h3>
          {intro.relationshipStatus && (
            <div className="flex items-start gap-3">
              <Heart className="w-4 h-4 text-red-500 mt-1" />
              <div>
                <p className="font-semibold">{intro.relationshipStatus}</p>
                <span className="text-xs text-gray-500">Stato sentimentale</span>
              </div>
            </div>
          )}
          {intro.joinedDate && (
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="font-semibold">{intro.joinedDate}</p>
                <span className="text-xs text-gray-500">Data iscrizione a Facebook</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
