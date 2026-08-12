import React, { useState } from 'react';
import { X, Upload, Save, User, Camera, Image as ImageIcon, Briefcase, GraduationCap, Home, MapPin, Globe } from 'lucide-react';
import { ProfileInfo } from '../types';

interface EditProfileModalProps {
  profile: ProfileInfo;
  onSave: (updatedProfile: ProfileInfo) => void;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ profile, onSave, onClose }) => {
  const [formData, setFormData] = useState<ProfileInfo>({ ...profile });

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setFormData((prev) => ({
          ...prev,
          avatarUrl: uploadEvent.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setFormData((prev) => ({
          ...prev,
          coverUrl: uploadEvent.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#242526] w-full max-w-2xl rounded-xl shadow-2xl border border-gray-200 dark:border-[#393A3B] overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#393A3B]">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <User className="w-5 h-5 text-[#1877F2]" />
            Modifica Informazioni Profilo
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto text-sm">
          
          {/* Photos Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 border-b pb-1">Immagini del Profilo</h3>

            {/* Avatar URL / Upload */}
            <div className="space-y-2">
              <label className="font-semibold text-gray-700 dark:text-gray-300 block">Foto Profilo:</label>
              <div className="flex items-center gap-3">
                <img src={formData.avatarUrl} alt="Avatar" className="w-14 h-14 rounded-full object-cover border" />
                <input 
                  type="text" 
                  value={formData.avatarUrl} 
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                  placeholder="URL Foto Profilo"
                  className="flex-1 bg-gray-50 dark:bg-[#3A3B3C] p-2 rounded border border-gray-200 dark:border-gray-700 outline-none"
                />
                <label className="bg-[#1877F2] text-white px-3 py-2 rounded text-xs font-semibold cursor-pointer flex items-center gap-1">
                  <Upload className="w-3.5 h-3.5" /> Sfoglia
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Cover URL / Upload */}
            <div className="space-y-2">
              <label className="font-semibold text-gray-700 dark:text-gray-300 block">Foto di Copertina:</label>
              <div className="flex items-center gap-3">
                <img src={formData.coverUrl} alt="Cover" className="w-20 h-12 rounded object-cover border" />
                <input 
                  type="text" 
                  value={formData.coverUrl} 
                  onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
                  placeholder="URL Foto Copertina"
                  className="flex-1 bg-gray-50 dark:bg-[#3A3B3C] p-2 rounded border border-gray-200 dark:border-gray-700 outline-none"
                />
                <label className="bg-[#1877F2] text-white px-3 py-2 rounded text-xs font-semibold cursor-pointer flex items-center gap-1">
                  <Upload className="w-3.5 h-3.5" /> Sfoglia
                  <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* Basic Details */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 border-b pb-1">Dati Principali</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Nome e Cognome:</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-[#3A3B3C] p-2 rounded border border-gray-200 dark:border-gray-700 outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Categoria / Sottotitolo:</label>
                <input 
                  type="text" 
                  value={formData.category} 
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-[#3A3B3C] p-2 rounded border border-gray-200 dark:border-gray-700 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Conteggio Amici:</label>
                <input 
                  type="text" 
                  value={formData.friendsCount} 
                  onChange={(e) => setFormData({ ...formData, friendsCount: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-[#3A3B3C] p-2 rounded border border-gray-200 dark:border-gray-700 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Link Telegram (per Messenger):</label>
                <input 
                  type="text" 
                  value={formData.telegramUrl || ''} 
                  onChange={(e) => setFormData({ ...formData, telegramUrl: e.target.value })}
                  placeholder="es. https://t.me/tuonome"
                  className="w-full bg-gray-50 dark:bg-[#3A3B3C] p-2 rounded border border-gray-200 dark:border-gray-700 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center pt-2">
              <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.isVerified} 
                  onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                  className="w-4 h-4 text-[#1877F2] rounded"
                />
                <span>Mostra Badge Verificato (Spunta Blu ☑️)</span>
              </label>
            </div>
          </div>

          {/* Intro Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 border-b pb-1">Sezione Introduzione</h3>

            <div>
              <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Biografia Bio:</label>
              <textarea 
                value={formData.intro.bio} 
                onChange={(e) => setFormData({
                  ...formData,
                  intro: { ...formData.intro, bio: e.target.value }
                })}
                rows={3}
                className="w-full bg-gray-50 dark:bg-[#3A3B3C] p-2 rounded border border-gray-200 dark:border-gray-700 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Lavoro / Posizione:</label>
                <input 
                  type="text" 
                  value={formData.intro.work || ''} 
                  onChange={(e) => setFormData({
                    ...formData,
                    intro: { ...formData.intro, work: e.target.value }
                  })}
                  className="w-full bg-gray-50 dark:bg-[#3A3B3C] p-2 rounded border border-gray-200 dark:border-gray-700 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Istruzione / Università:</label>
                <input 
                  type="text" 
                  value={formData.intro.education || ''} 
                  onChange={(e) => setFormData({
                    ...formData,
                    intro: { ...formData.intro, education: e.target.value }
                  })}
                  className="w-full bg-gray-50 dark:bg-[#3A3B3C] p-2 rounded border border-gray-200 dark:border-gray-700 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Città attuale:</label>
                <input 
                  type="text" 
                  value={formData.intro.livesIn || ''} 
                  onChange={(e) => setFormData({
                    ...formData,
                    intro: { ...formData.intro, livesIn: e.target.value }
                  })}
                  className="w-full bg-gray-50 dark:bg-[#3A3B3C] p-2 rounded border border-gray-200 dark:border-gray-700 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Città d'origine:</label>
                <input 
                  type="text" 
                  value={formData.intro.fromLocation || ''} 
                  onChange={(e) => setFormData({
                    ...formData,
                    intro: { ...formData.intro, fromLocation: e.target.value }
                  })}
                  className="w-full bg-gray-50 dark:bg-[#3A3B3C] p-2 rounded border border-gray-200 dark:border-gray-700 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Sito Web / Link:</label>
                <input 
                  type="text" 
                  value={formData.intro.website || ''} 
                  onChange={(e) => setFormData({
                    ...formData,
                    intro: { ...formData.intro, website: e.target.value }
                  })}
                  className="w-full bg-gray-50 dark:bg-[#3A3B3C] p-2 rounded border border-gray-200 dark:border-gray-700 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Follower / Seguaci:</label>
                <input 
                  type="text" 
                  value={formData.intro.followersCount || ''} 
                  onChange={(e) => setFormData({
                    ...formData,
                    intro: { ...formData.intro, followersCount: e.target.value }
                  })}
                  className="w-full bg-gray-50 dark:bg-[#3A3B3C] p-2 rounded border border-gray-200 dark:border-gray-700 outline-none"
                />
              </div>
            </div>
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
              Salva Modifiche
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
