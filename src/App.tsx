import React, { useState, useEffect } from 'react';
import { FBPageData, Friend, Post, ProfileInfo } from './types';
import { loadPageData, savePageData, exportJsonFile } from './utils/jsonStorage';
import { defaultFBPageData } from './data/defaultData';

// Components
import { HeaderNav } from './components/HeaderNav';
import { ProfileHeader } from './components/ProfileHeader';
import { IntroSidebar } from './components/IntroSidebar';
import { StoriesBentoBar } from './components/StoriesBentoBar';
import { CreatePostBox } from './components/CreatePostBox';
import { PostCard } from './components/PostCard';
import { EditProfileModal } from './components/EditProfileModal';
import { EditPostModal } from './components/EditPostModal';
import { JsonManagerModal } from './components/JsonManagerModal';
import { HtmlExporterModal } from './components/HtmlExporterModal';

// Sub-tabs
import { AboutTab } from './components/AboutTab';
import { PhotosTab } from './components/PhotosTab';
import { VideosTab } from './components/VideosTab';
import { ReelsTab } from './components/ReelsTab';
import { FriendsTab } from './components/FriendsTab';

export default function App() {
  const [pageData, setPageData] = useState<FBPageData>(() => loadPageData());
  const [mode, setMode] = useState<'admin' | 'live' | 'exporter'>('admin');
  const [activeTab, setActiveTab] = useState<'posts' | 'about' | 'friends' | 'photos' | 'videos' | 'reels'>('posts');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Dark Mode side effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Persist state updates
  const updatePageDataAndSave = (newData: FBPageData) => {
    setPageData(newData);
    savePageData(newData);
  };

  // Add new post
  const handleAddPost = (newPost: Post) => {
    const updatedPosts = [newPost, ...pageData.posts];
    const postSnippet = newPost.content 
      ? `"${newPost.content.substring(0, 30)}${newPost.content.length > 30 ? '...' : ''}"`
      : 'un nuovo elemento multimediale';
    const notif: NotificationItem = {
      id: `n-${Date.now()}`,
      avatar: newPost.authorAvatar || pageData.profile.avatarUrl,
      title: newPost.authorName || pageData.profile.name,
      text: `ha pubblicato un nuovo post: ${postSnippet}`,
      timestamp: 'Proprio ora',
      isUnread: true
    };
    updatePageDataAndSave({
      ...pageData,
      posts: updatedPosts,
      notifications: [notif, ...(pageData.notifications ?? [])]
    });
  };

  // Update existing post
  const handleUpdatePost = (updatedPost: Post) => {
    const updatedPosts = pageData.posts.map((p) => (p.id === updatedPost.id ? updatedPost : p));
    updatePageDataAndSave({
      ...pageData,
      posts: updatedPosts
    });
  };

  // Delete post
  const handleDeletePost = (postId: string) => {
    if (window.confirm("Sei sicuro di voler eliminare questo post dalla bacheca?")) {
      const updatedPosts = pageData.posts.filter((p) => p.id !== postId);
      updatePageDataAndSave({
        ...pageData,
        posts: updatedPosts
      });
    }
  };

  // Friends Handlers
  const handleAddFriend = (newFriend: Friend) => {
    const currentFriends = pageData.friendsList ?? [];
    const updated = [newFriend, ...currentFriends];
    const friendNotif: NotificationItem = {
      id: `n-${Date.now()}`,
      avatar: newFriend.avatar,
      title: newFriend.name,
      text: "ha accettato la tua richiesta di amicizia.",
      timestamp: "Proprio ora",
      isUnread: true
    };
    updatePageDataAndSave({
      ...pageData,
      friendsList: updated,
      notifications: [friendNotif, ...(pageData.notifications ?? [])],
      profile: {
        ...pageData.profile,
        friendsCount: `${updated.length} amici`
      }
    });
  };

  const handleDeleteFriend = (friendId: string) => {
    const currentFriends = pageData.friendsList ?? [];
    const updated = currentFriends.filter((f) => f.id !== friendId);
    updatePageDataAndSave({
      ...pageData,
      friendsList: updated,
      profile: {
        ...pageData.profile,
        friendsCount: `${updated.length} amici`
      }
    });
  };

  // Save profile info
  const handleSaveProfile = (updatedProfile: ProfileInfo) => {
    updatePageDataAndSave({
      ...pageData,
      profile: updatedProfile
    });
  };

  // Delete featured photo
  const handleDeleteFeaturedPhoto = (photoUrl: string) => {
    const updatedFeatured = (pageData.profile.featuredPhotos || []).filter((url) => url !== photoUrl);
    updatePageDataAndSave({
      ...pageData,
      profile: {
        ...pageData.profile,
        featuredPhotos: updatedFeatured
      }
    });
  };

  // JSON Import & Reset
  const handleImportJson = (importedData: FBPageData) => {
    updatePageDataAndSave(importedData);
  };

  const handleResetDefault = () => {
    if (window.confirm("Vuoi ripristinare la pagina con i dati e post di esempio? Le modifiche non salvate andranno perse.")) {
      updatePageDataAndSave(defaultFBPageData);
    }
  };

  const handleExportJson = () => {
    exportJsonFile(pageData, 'facebook_feed.json');
  };

  // Notifications Handlers
  const handleMarkNotificationsRead = () => {
    const notifications = (pageData.notifications ?? []).map((n) => ({
      ...n,
      isUnread: false
    }));
    updatePageDataAndSave({
      ...pageData,
      notifications
    });
  };

  const handleAddNotification = (newNotif: any) => {
    const notifications = [newNotif, ...(pageData.notifications ?? [])];
    updatePageDataAndSave({
      ...pageData,
      notifications
    });
  };

  const friendsList = pageData.friendsList ?? defaultFBPageData.friendsList ?? [];
  const notificationsList = pageData.notifications ?? defaultFBPageData.notifications ?? [];

  // Filter posts by search query
  const filteredPosts = pageData.posts.filter((post) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      post.content?.toLowerCase().includes(q) ||
      post.authorName?.toLowerCase().includes(q) ||
      post.videoTitle?.toLowerCase().includes(q) ||
      post.linkTitle?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#F0F2F5] dark:bg-[#18191A] text-gray-900 dark:text-[#E4E6EB] transition-colors font-sans antialiased">
      
      {/* Top Header Navigation */}
      <HeaderNav
        mode={mode}
        setMode={setMode}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        profile={pageData.profile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        notifications={notificationsList}
        onMarkNotificationsRead={handleMarkNotificationsRead}
        onAddNotification={handleAddNotification}
        onOpenJsonModal={() => setIsJsonModalOpen(true)}
        onExportJson={handleExportJson}
        onOpenEditProfile={() => setIsEditProfileOpen(true)}
      />

      {/* Main Container */}
      <main className="pb-16">
        
        {/* Profile Banner & Cover */}
        <ProfileHeader
          profile={pageData.profile}
          mode={mode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenEditProfile={() => setIsEditProfileOpen(true)}
          onExportJson={handleExportJson}
        />

        {/* Content Area */}
        <div className="max-w-6xl mx-auto px-2 sm:px-4 mt-4">
          
          {/* EXPORTER MODE */}
          {mode === 'exporter' ? (
            <HtmlExporterModal onClose={() => setMode('admin')} />
          ) : (
            /* REGULAR TABS DISPLAY */
            <>
              {/* 1. POSTS TAB */}
              {activeTab === 'posts' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  
                  {/* Left Column: Intro Sidebar */}
                  <div className="md:col-span-5">
                    <IntroSidebar
                      intro={pageData.profile.intro}
                      featuredPhotos={pageData.profile.featuredPhotos}
                      mode={mode}
                      onOpenEditProfile={() => setIsEditProfileOpen(true)}
                    />
                  </div>

                  {/* Right Column: Main Feed */}
                  <div className="md:col-span-7 space-y-4">
                    
                    {/* Bento Stories Row */}
                    <StoriesBentoBar profile={pageData.profile} />

                    {/* Create Post Box (Admin Only) */}
                    {mode === 'admin' && (
                      <CreatePostBox
                        profile={pageData.profile}
                        onAddPost={handleAddPost}
                      />
                    )}

                    {/* Search Feedback Banner */}
                    {searchQuery && (
                      <div className="bg-white dark:bg-[#242526] p-4 rounded-xl shadow border border-[#1877F2]/30 flex items-center justify-between">
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          Risultati per: <span className="font-bold text-[#1877F2]">"{searchQuery}"</span> ({filteredPosts.length} post trovati)
                        </p>
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="text-xs font-semibold bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-lg"
                        >
                          Mostra Tutti
                        </button>
                      </div>
                    )}

                    {/* Posts List */}
                    {filteredPosts && filteredPosts.length > 0 ? (
                      filteredPosts.map((post) => (
                        <PostCard
                          key={post.id}
                          post={post}
                          mode={mode}
                          onUpdatePost={handleUpdatePost}
                          onDeletePost={handleDeletePost}
                          onOpenEditModal={(p) => setEditingPost(p)}
                        />
                      ))
                    ) : (
                      <div className="bg-white dark:bg-[#242526] p-8 rounded-lg shadow text-center border border-gray-200 dark:border-[#393A3B]">
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                          {searchQuery ? `Nessun risultato trovato per "${searchQuery}".` : 'Nessun post presente sulla bacheca.'}
                        </p>
                        {mode === 'admin' && !searchQuery && (
                          <p className="text-xs text-[#1877F2] mt-1 font-semibold">
                            Usa il box in alto per pubblicare il tuo primo post!
                          </p>
                        )}
                      </div>
                    )}

                  </div>

                </div>
              )}

              {/* 2. ABOUT TAB */}
              {activeTab === 'about' && (
                <AboutTab
                  profile={pageData.profile}
                  onOpenEditProfile={() => setIsEditProfileOpen(true)}
                  mode={mode}
                />
              )}

              {/* 3. FRIENDS TAB */}
              {activeTab === 'friends' && (
                <FriendsTab 
                  profile={pageData.profile}
                  friendsList={friendsList}
                  mode={mode}
                  onAddFriend={handleAddFriend}
                  onDeleteFriend={handleDeleteFriend}
                />
              )}

              {/* 4. PHOTOS TAB */}
              {activeTab === 'photos' && (
                <PhotosTab 
                  posts={pageData.posts} 
                  profile={pageData.profile} 
                  mode={mode}
                  onDeletePost={handleDeletePost}
                  onDeleteFeaturedPhoto={handleDeleteFeaturedPhoto}
                />
              )}

              {/* 5. VIDEOS TAB */}
              {activeTab === 'videos' && (
                <VideosTab 
                  posts={pageData.posts} 
                  mode={mode}
                  onDeletePost={handleDeletePost}
                />
              )}

              {/* 6. REELS TAB */}
              {activeTab === 'reels' && (
                <ReelsTab 
                  posts={pageData.posts} 
                  mode={mode}
                  onDeletePost={handleDeletePost}
                />
              )}
            </>
          )}

        </div>

      </main>

      {/* MODALS */}

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <EditProfileModal
          profile={pageData.profile}
          onSave={handleSaveProfile}
          onClose={() => setIsEditProfileOpen(false)}
        />
      )}

      {/* Edit Post Modal */}
      {editingPost && (
        <EditPostModal
          post={editingPost}
          onSave={handleUpdatePost}
          onClose={() => setEditingPost(null)}
        />
      )}

      {/* JSON Manager Modal */}
      {isJsonModalOpen && (
        <JsonManagerModal
          pageData={pageData}
          onImportJson={handleImportJson}
          onExportJson={handleExportJson}
          onResetDefault={handleResetDefault}
          onClose={() => setIsJsonModalOpen(false)}
        />
      )}

    </div>
  );
}
