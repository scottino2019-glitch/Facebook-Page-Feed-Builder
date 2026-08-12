export type PrivacyOption = 'public' | 'friends' | 'only_me';

export type ReactionType = 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry';

export type PostType = 'text' | 'image' | 'video' | 'reel' | 'link';

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  timestamp: string;
  likesCount: number;
  userLiked?: boolean;
}

export interface ReactionCounts {
  like: number;
  love: number;
  care: number;
  haha: number;
  wow: number;
  sad: number;
  angry: number;
}

export interface Post {
  id: string;
  authorName: string;
  authorAvatar: string;
  isVerified?: boolean;
  timestamp: string;
  privacy: PrivacyOption;
  isPinned?: boolean;
  type: PostType;
  
  // Text content
  content: string;
  textBackgroundPreset?: string; // e.g. 'gradient-blue', 'gradient-purple', 'solid-black', etc.
  
  // Media content
  imageUrls?: string[];
  videoUrl?: string; // YouTube, MP4 URL, or iframe src
  videoTitle?: string;
  isEmbedIframe?: boolean;
  
  // Reel specific
  reelAudioTitle?: string;
  reelViewsCount?: number;
  
  // Link preview
  linkUrl?: string;
  linkTitle?: string;
  linkDomain?: string;
  linkImage?: string;
  
  // Engagement
  reactions: ReactionCounts;
  userReaction?: ReactionType;
  sharesCount: number;
  comments: Comment[];
}

export interface IntroInfo {
  bio: string;
  work?: string;
  education?: string;
  livesIn?: string;
  fromLocation?: string;
  relationshipStatus?: string;
  joinedDate?: string;
  website?: string;
  followersCount?: string;
}

export interface NotificationItem {
  id: string;
  avatar: string;
  title: string;
  text: string;
  timestamp: string;
  isUnread?: boolean;
}

export interface ProfileInfo {
  name: string;
  category: string;
  isVerified: boolean;
  avatarUrl: string;
  coverUrl: string;
  friendsCount: string;
  mutualFriendsCount?: string;
  telegramUrl?: string;
  intro: IntroInfo;
  featuredPhotos: string[];
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  mutualFriends?: string;
  profileUrl?: string;
}

export interface FBPageData {
  version: string;
  updatedAt: string;
  profile: ProfileInfo;
  friendsList?: Friend[];
  notifications?: NotificationItem[];
  posts: Post[];
}
