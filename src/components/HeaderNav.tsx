import React, { useState } from 'react';
import { 
  FileCode, 
  Download, 
  Upload, 
  Sun, 
  Moon, 
  Eye, 
  Edit3, 
  Search, 
  Home, 
  Tv, 
  Store, 
  Users, 
  Bell, 
  MessageCircle, 
  X, 
  Check, 
  Plus, 
  Send
} from 'lucide-react';
import { ProfileInfo, NotificationItem } from '../types';

interface HeaderNavProps {
  mode: 'admin' | 'live' | 'exporter';
  setMode: (mode: 'admin' | 'live' | 'exporter') => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  profile: ProfileInfo;
  activeTab: 'posts' | 'about' | 'friends' | 'photos' | 'videos' | 'reels';
  setActiveTab: (tab: 'posts' | 'about' | 'friends' | 'photos' | 'videos' | 'reels') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notifications: NotificationItem[];
  onMarkNotificationsRead: () => void;
  onAddNotification: (notif: NotificationItem) => void;
  onOpenJsonModal: () => void;
  onExportJson: () => void;
  onOpenEditProfile: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  mode,
  setMode,
  darkMode,
  setDarkMode,
  profile,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  notifications,
  onMarkNotificationsRead,
  onAddNotification,
  onOpenJsonModal,
  onExportJson,
  onOpenEditProfile
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddNotifModal, setShowAddNotifModal] = useState(false);

  // New notification state
  const [newNotifTitle, setNewNotifTitle] = useState('');
  const [newNotifText, setNewNotifText] = useState('');

  const unreadCount = notifications.filter((n) => n.isUnread !== false).length;

  const handleOpenMessengerTelegram = () => {
    const telegramUrl = profile.telegramUrl || 'https://t.me/telegram';
    window.open(telegramUrl, '_blank');
  };

  const handleCreateNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotifTitle.trim() || !newNotifText.trim()) return;

    const notif: NotificationItem = {
      id: `n-${Date.now()}`,
      avatar: profile.avatarUrl,
      title: newNotifTitle,
      text: newNotifText,
      timestamp: 'Adesso',
      isUnread: true
    };

    onAddNotification(notif);
    setNewNotifTitle('');
    setNewNotifText('');
    setShowAddNotifModal(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#242526] border-b border-gray-200 dark:border-[#393A3B] shadow-sm px-3 sm:px-4 h-14 flex items-center justify-between select-none transition-colors">
      
      {/* Left: FB Logo + Search + Mode Switcher */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* FB Logo */}
        <div 
          onClick={() => { setActiveTab('posts'); setSearchQuery(''); }}
          className="flex items-center gap-1 cursor-pointer group" 
          title="Torna alla Bacheca Home"
        >
          <div className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center text-white font-black text-2xl tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
            f
          </div>
        </div>

        {/* Facebook Search Bar */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cerca su Facebook..." 
            className="bg-[#F0F2F5] dark:bg-[#3A3B3C] text-sm pl-9 pr-8 py-2 rounded-full outline-none w-56 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-[#1877F2]/50 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')} 
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mode Selector Pill Switcher */}
        <div className="flex items-center bg-[#F0F2F5] dark:bg-[#3A3B3C] p-1 rounded-full text-xs font-semibold ml-1 sm:ml-2">
          <button
            onClick={() => setMode('admin')}
            className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
              mode === 'admin' 
                ? 'bg-[#1877F2] text-white shadow-sm' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
            title="Modalità Editor: modifica profilo e post"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Modifica (Admin)</span>
          </button>

          <button
            onClick={() => setMode('live')}
            className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
              mode === 'live' 
                ? 'bg-[#1877F2] text-white shadow-sm' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
            title="Modalità Anteprima Reale Facebook"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Vista Reale</span>
          </button>

          <button
            onClick={() => setMode('exporter')}
            className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
              mode === 'exporter' 
                ? 'bg-[#1877F2] text-white shadow-sm' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
            title="Genera codice HTML standalone per il tuo sito"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Codice HTML</span>
          </button>
        </div>
      </div>

      {/* Center Navigation Icons (Interactive Menu) */}
      <div className="hidden md:flex items-center gap-1 h-full">
        <button 
          onClick={() => setActiveTab('posts')}
          className={`h-full px-6 sm:px-8 flex items-center justify-center transition-colors relative ${
            activeTab === 'posts' 
              ? 'text-[#1877F2] border-b-4 border-[#1877F2]' 
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-lg'
          }`}
          title="Home / Post"
        >
          <Home className="w-6 h-6" />
        </button>

        <button 
          onClick={() => setActiveTab('videos')}
          className={`h-full px-6 sm:px-8 flex items-center justify-center transition-colors relative ${
            activeTab === 'videos' || activeTab === 'reels'
              ? 'text-[#1877F2] border-b-4 border-[#1877F2]' 
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-lg'
          }`}
          title="Watch / Video & Reel"
        >
          <Tv className="w-6 h-6" />
        </button>

        <button 
          onClick={() => setActiveTab('photos')}
          className={`h-full px-6 sm:px-8 flex items-center justify-center transition-colors relative ${
            activeTab === 'photos'
              ? 'text-[#1877F2] border-b-4 border-[#1877F2]' 
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-lg'
          }`}
          title="Galleria Foto"
        >
          <Store className="w-6 h-6" />
        </button>

        <button 
          onClick={() => setActiveTab('friends')}
          className={`h-full px-6 sm:px-8 flex items-center justify-center transition-colors relative ${
            activeTab === 'friends'
              ? 'text-[#1877F2] border-b-4 border-[#1877F2]' 
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-lg'
          }`}
          title="Lista Amici"
        >
          <Users className="w-6 h-6" />
        </button>
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">

        {/* Messenger Icon (Telegram Link) */}
        <button
          onClick={handleOpenMessengerTelegram}
          className="w-9 h-9 rounded-full bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] flex items-center justify-center text-gray-700 dark:text-gray-200 transition-all relative"
          title={`Apri Telegram (${profile.telegramUrl || 'https://t.me'})`}
        >
          <MessageCircle className="w-5 h-5 text-[#0088cc]" />
          <span className="absolute -bottom-0.5 -right-0.5 bg-[#0088cc] text-white text-[9px] font-bold px-1 rounded-full">
            TG
          </span>
        </button>

        {/* Bell Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-full bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] flex items-center justify-center text-gray-700 dark:text-gray-200 transition-all relative"
            title="Notifiche"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-md animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#242526] rounded-xl shadow-2xl border border-gray-200 dark:border-[#393A3B] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-3.5 border-b border-gray-200 dark:border-[#393A3B] flex items-center justify-between">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#1877F2]" />
                  <span>Notifiche</span>
                </h3>
                <div className="flex items-center gap-2">
                  {mode === 'admin' && (
                    <button 
                      onClick={() => setShowAddNotifModal(true)}
                      className="text-xs bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] px-2 py-1 rounded-md font-semibold flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Aggiungi
                    </button>
                  )}
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-[#393A3B]">
                {notifications && notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div 
                      key={n.id} 
                      className={`p-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] transition-colors cursor-pointer ${
                        n.isUnread ? 'bg-blue-50/40 dark:bg-blue-900/10' : ''
                      }`}
                    >
                      <img src={n.avatar} alt={n.title} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                      <div className="flex-1 text-xs">
                        <p className="text-gray-900 dark:text-gray-100">
                          <span className="font-bold">{n.title}</span> {n.text}
                        </p>
                        <span className="text-[11px] text-gray-400 mt-1 block">{n.timestamp}</span>
                      </div>
                      {n.isUnread && (
                        <span className="w-2.5 h-2.5 bg-[#1877F2] rounded-full flex-shrink-0 mt-2"></span>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="p-6 text-center text-xs text-gray-500">Nessuna notifica al momento.</p>
                )}
              </div>

              <div className="p-2 bg-gray-50 dark:bg-[#3A3B3C]/50 text-center border-t border-gray-200 dark:border-[#393A3B]">
                <button 
                  onClick={onMarkNotificationsRead} 
                  className="text-xs text-[#1877F2] font-semibold hover:underline flex items-center justify-center gap-1 mx-auto"
                >
                  <Check className="w-3.5 h-3.5" />
                  Segna tutte come lette
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick JSON Action Buttons */}
        <button
          onClick={onExportJson}
          className="bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] dark:bg-[#1877F2]/20 dark:hover:bg-[#1877F2]/30 font-medium px-2.5 sm:px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 transition-all"
          title="Scarica il file facebook_feed.json"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">Scarica JSON</span>
        </button>

        <button
          onClick={onOpenJsonModal}
          className="bg-gray-100 hover:bg-gray-200 dark:bg-[#3A3B3C] dark:hover:bg-[#4E4F50] text-gray-700 dark:text-gray-200 font-medium px-2.5 sm:px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 transition-all"
          title="Gestisci o carica un nuovo file JSON"
        >
          <Upload className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">Carica / Gestisci JSON</span>
        </button>

        {/* Theme Switcher */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-9 h-9 rounded-full bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] flex items-center justify-center text-gray-700 dark:text-gray-200 transition-all"
          title={darkMode ? "Passa a Tema Chiaro" : "Passa a Tema Scuro"}
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
        </button>

        {/* Profile Avatar Button */}
        <button 
          onClick={onOpenEditProfile}
          className="relative group p-0.5 rounded-full hover:ring-2 hover:ring-[#1877F2] transition-all"
          title="Profilo & Impostazioni"
        >
          <img 
            src={profile.avatarUrl} 
            alt={profile.name} 
            className="w-9 h-9 rounded-full object-cover border border-gray-300 dark:border-gray-600"
          />
          {mode === 'admin' && (
            <span className="absolute -bottom-1 -right-1 bg-[#1877F2] text-white p-0.5 rounded-full text-[10px]">
              <Edit3 className="w-2.5 h-2.5" />
            </span>
          )}
        </button>
      </div>

      {/* Modal create notification in Admin mode */}
      {showAddNotifModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#242526] rounded-xl shadow-2xl border border-gray-200 dark:border-[#393A3B] w-full max-w-md p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#393A3B] pb-3">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#1877F2]" />
                Invia una nuova notifica
              </h3>
              <button onClick={() => setShowAddNotifModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNotification} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Mittente / Titolo
                </label>
                <input 
                  type="text" 
                  value={newNotifTitle}
                  onChange={(e) => setNewNotifTitle(e.target.value)}
                  placeholder="es. Laura Bianchi" 
                  className="w-full bg-[#F0F2F5] dark:bg-[#3A3B3C] px-3 py-2 rounded-lg text-sm outline-none text-gray-900 dark:text-gray-100"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Testo Notifica
                </label>
                <textarea 
                  value={newNotifText}
                  onChange={(e) => setNewNotifText(e.target.value)}
                  placeholder="es. ha condiviso il tuo post." 
                  rows={3}
                  className="w-full bg-[#F0F2F5] dark:bg-[#3A3B3C] px-3 py-2 rounded-lg text-sm outline-none text-gray-900 dark:text-gray-100"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddNotifModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-lg"
                >
                  Annulla
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-xs font-semibold bg-[#1877F2] text-white hover:bg-[#166FE5] rounded-lg flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Invia Notifica
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </header>
  );
};
