import { NextRequest, NextResponse } from "next/server";

type UserCard = {
  id: string;
  name: string;
  imageUrl: string;
  isActive: boolean;
  lastActive?: string;
};

type FileCard = {
  id: string;
  name: string;
  isFolder: boolean;
  folderItemCount?: number;
  lastEdited: string;
  parentFolder?: string;
};

type Card = UserCard | FileCard;

const mockUsers: UserCard[] = [
  {
    id: "u1",
    name: "Randall Johnsson",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    isActive: true,
  },
  {
    id: "u2",
    name: "Kristinge Karand",
    imageUrl: "https://randomuser.me/api/portraits/women/45.jpg",
    isActive: false,
    lastActive: "2025-09-11T09:30:00Z",
  },
  {
    id: "u3",
    name: "Michael Faraday",
    imageUrl: "https://randomuser.me/api/portraits/men/12.jpg",
    isActive: false,
    lastActive: "2025-09-12T18:15:00Z",
  },
  {
    id: "u4",
    name: "Ada Lovelace",
    imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    isActive: true,
  },
  {
    id: "u5",
    name: "Nikola Tesla",
    imageUrl: "https://randomuser.me/api/portraits/men/78.jpg",
    isActive: false,
    lastActive: "2025-09-10T21:00:00Z",
  },
  {
    id: "u6",
    name: "Grace Hopper",
    imageUrl: "https://randomuser.me/api/portraits/women/34.jpg",
    isActive: true,
  },
  {
    id: "u7",
    name: "Alan Turing",
    imageUrl: "https://randomuser.me/api/portraits/men/14.jpg",
    isActive: false,
    lastActive: "2025-09-09T12:44:00Z",
  },
  {
    id: "u8",
    name: "Sophie Wilson",
    imageUrl: "https://randomuser.me/api/portraits/women/20.jpg",
    isActive: false,
    lastActive: "2025-09-08T17:00:00Z",
  },
  {
    id: "u9",
    name: "Linus Torvalds",
    imageUrl: "https://randomuser.me/api/portraits/men/65.jpg",
    isActive: true,
  },
  {
    id: "u10",
    name: "Hedy Lamarr",
    imageUrl: "https://randomuser.me/api/portraits/women/50.jpg",
    isActive: false,
    lastActive: "2025-09-07T07:30:00Z",
  },
];

const mockFiles: FileCard[] = [
  {
    id: "f1",
    name: "Random Michal Folder",
    isFolder: true,
    folderItemCount: 12,
    lastEdited: "2025-09-12T14:30:00Z",
    parentFolder: "Photos",
  },
  {
    id: "f2",
    name: "creative_file_frandkies.jpg",
    isFolder: false,
    lastEdited: "2025-09-12T16:45:00Z",
    parentFolder: "Photos/Assets",
  },
  {
    id: "f3",
    name: "Project Documents",
    isFolder: true,
    folderItemCount: 8,
    lastEdited: "2025-09-11T10:20:00Z",
    parentFolder: "",
  },
  {
    id: "f4",
    name: "vacation_photo.png",
    isFolder: false,
    lastEdited: "2025-09-10T08:44:00Z",
    parentFolder: "Photos/Vacation",
  },
  {
    id: "f5",
    name: "notes.txt",
    isFolder: false,
    lastEdited: "2025-09-09T23:12:00Z",
    parentFolder: "",
  },
  {
    id: "f6",
    name: "Music Folder",
    isFolder: true,
    folderItemCount: 25,
    lastEdited: "2025-09-10T01:05:00Z",
    parentFolder: "Media",
  },
  {
    id: "f7",
    name: "video_clip.mov",
    isFolder: false,
    lastEdited: "2025-09-11T19:30:00Z",
    parentFolder: "Videos",
  },
  {
    id: "f8",
    name: "spreadsheet_report.xlsx",
    isFolder: false,
    lastEdited: "2025-09-12T22:00:00Z",
    parentFolder: "Work/Reports",
  },
  {
    id: "f9",
    name: "Archive Folder",
    isFolder: true,
    folderItemCount: 5,
    lastEdited: "2025-09-08T14:00:00Z",
    parentFolder: "Old Projects",
  },
  {
    id: "f10",
    name: "presentation.pptx",
    isFolder: false,
    lastEdited: "2025-09-07T12:30:00Z",
    parentFolder: "Work/Presentations",
  },
];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET(request: NextRequest) {
  await sleep(5000);

  const { searchParams } = new URL(request.url);
  const typeParam = searchParams.get("type");

  let data: Card[] = [];

  if (typeParam === "users") {
    data = mockUsers;
  } else if (typeParam === "files") {
    data = mockFiles;
  } else {
    data = [...mockUsers, ...mockFiles];
  }

  return NextResponse.json({ data }, { status: 200 });
}
