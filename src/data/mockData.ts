export interface UserData {
  id: string;
  name: string;
  avatar: string;
  status: 'active' | 'inactive' | 'away';
  lastSeen?: string;
}

export interface FileData {
  id: string;
  name: string;
  type: 'file' | 'folder';
  fileCount?: number;
  location: string;
  lastModified: string;
  fileType?: 'text' | 'image' | 'video' | 'audio' | 'pdf' | 'code';
}

export const mockUsers: UserData[] = [
  {
    id: 'user-1',
    name: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/300?img=1',
    status: 'active',
  },
  {
    id: 'user-2', 
    name: 'Michael Rodriguez',
    avatar: 'https://i.pravatar.cc/300?img=3',
    status: 'away',
    lastSeen: '2 hours ago'
  },
  {
    id: 'user-3',
    name: 'Emma Thompson',
    avatar: 'https://i.pravatar.cc/300?img=5',
    status: 'inactive',
    lastSeen: '2 days ago'
  },
  {
    id: 'user-4',
    name: 'Alex Kumar',
    avatar: 'https://i.pravatar.cc/300?img=7',
    status: 'active',
  },
];

export const mockFiles: FileData[] = [
  {
    id: 'file-1',
    name: 'Project Requirements.pdf',
    type: 'file',
    fileType: 'pdf',
    location: 'Documents',
    lastModified: '14 min ago'
  },
  {
    id: 'file-2',
    name: 'Design Assets',
    type: 'folder',
    fileCount: 24,
    location: 'Creative',
    lastModified: '1 hr ago'
  },
  {
    id: 'file-3',
    name: 'meeting-notes.txt',
    type: 'file',
    fileType: 'text',
    location: 'Work/Notes',
    lastModified: '15 min ago'
  },
  {
    id: 'file-4',
    name: 'Components',
    type: 'folder',
    fileCount: 12,
    location: 'Projects/React',
    lastModified: '3 hrs ago'
  },
  {
    id: 'file-5',
    name: 'avatar.png',
    type: 'file',
    fileType: 'image',
    location: 'Images',
    lastModified: '1 day ago'
  },
];