import React, { useState } from 'react';
import { UserCheck, Search, Plus, Trash2, X, UserPlus, Image as ImageIcon } from 'lucide-react';
import { Friend, ProfileInfo } from '../types';

interface FriendsTabProps {
  profile: ProfileInfo;
  friendsList: Friend[];
  mode: 'admin' | 'live' | 'exporter';
  onAddFriend?: (friend: Friend) => void;
  onDeleteFriend?: (id: string) => void;
}

export const FriendsTab: React.FC<FriendsTabProps> = ({
  profile,
  friendsList,
  mode,
  onAddFriend,
  onDeleteFriend
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // New Friend Form State
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState('');
  const [newMutual, setNewMutual] = useState('');

  const handleCreateFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newFriendObj: Friend = {
      id: `f-${Date.now()}`,
      name: newName.trim(),
      avatar: newAvatar.trim() || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      mutualFriends: newMutual.trim() ? `${newMutual.trim()} amici in comune` : '1 amico in comune'
    };

    if (onAddFriend) {
      onAddFriend(newFriendObj);
    }

    setNewName('');
    setNewAvatar('');
    setNewMutual('');
    setIsAddModalOpen(false);
  };

  const filteredFriends = friendsList.filter((f) => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-[#242526] p-6 rounded-lg shadow border border-gray-200 dark:border-[#393A3B] space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 dark:border-[#393A3B] pb-4 gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#1877F2]" />
            Amici ({friendsList.length || profile.friendsCount})
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Tutti gli amici collegati al profilo</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-60">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca tra gli amici..." 
              className="w-full bg-gray-100 dark:bg-[#3A3B3C] text-xs pl-9 pr-3 py-2 rounded-full outline-none text-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Add Friend Button (Admin Only) */}
          {mode === 'admin' && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#1877F2] hover:bg-[#166FE5] text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shadow-sm"
            >
              <UserPlus className="w-4 h-4" />
              <span>Aggiungi Amico</span>
            </button>
          )}
        </div>
      </div>

      {/* Friends Grid */}
      {filteredFriends.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredFriends.map((friend) => (
            <div 
              key={friend.id} 
              className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#3A3B3C]/30 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-all group"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <img 
                  src={friend.avatar} 
                  alt={friend.name} 
                  className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-600 flex-shrink-0" 
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 truncate">{friend.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{friend.mutualFriends || 'Amico su Facebook'}</p>
                </div>
              </div>

              {/* Actions */}
              {mode === 'admin' && onDeleteFriend && (
                <button 
                  onClick={() => onDeleteFriend(friend.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full transition-colors ml-2"
                  title="Rimuovi amico"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 text-sm">
          {searchQuery ? `Nessun amico trovato con "${searchQuery}"` : "Nessun amico presente nella lista."}
        </div>
      )}

      {/* Add Friend Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-[#242526] w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 dark:border-[#393A3B] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#393A3B]">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#1877F2]" />
                Aggiungi Nuovo Amico
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateFriend} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Nome e Cognome *
                </label>
                <input 
                  type="text" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Es. Mario Rossi"
                  required
                  className="w-full bg-gray-100 dark:bg-[#3A3B3C] text-sm p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-[#1877F2]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  URL Foto Avatar (Link Immagine)
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input 
                    type="url" 
                    value={newAvatar}
                    onChange={(e) => setNewAvatar(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-gray-100 dark:bg-[#3A3B3C] text-sm pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-[#1877F2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Amici in Comune (Opzionale)
                </label>
                <input 
                  type="text" 
                  value={newMutual}
                  onChange={(e) => setNewMutual(e.target.value)}
                  placeholder="Es. 15"
                  className="w-full bg-gray-100 dark:bg-[#3A3B3C] text-sm p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-[#1877F2]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-lg shadow-sm"
                >
                  Salva Amico
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
