import {
  ArrowSquareOutIcon,
  LinkIcon,
  CheckIcon,
  FolderIcon,
  FileTextIcon,
  ImageIcon,
  VideoIcon,
  FilePdfIcon,
  CodeIcon,
  MusicNoteSimpleIcon,
} from "@phosphor-icons/react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserData, FileData } from "../data/mockData";

const EXIT_DUR = 0.28;
const OVERLAP = 0.08;
const ENTER_DELAY = Math.max(0, EXIT_DUR - OVERLAP);

const getFileIcon = (fileType?: string, type?: string) => {
  if (type === "folder") return FolderIcon;

  switch (fileType) {
    case "pdf":
      return FilePdfIcon;
    case "image":
      return ImageIcon;
    case "video":
      return VideoIcon;
    case "audio":
      return MusicNoteSimpleIcon;
    case "code":
      return CodeIcon;
    case "text":
    default:
      return FileTextIcon;
  }
};

export function FileResultCard({ data }: { data: FileData }) {
  const [showLinkTooltip, setShowLinkTooltip] = useState(false);
  const [showNewTabTooltip, setShowNewTabTooltip] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const IconComponent = getFileIcon(data.fileType, data.type);

  return (
    <div className="flex items-center gap-2 py-2 font-sans group">
      <div className="relative">
        <div className="size-8 rounded-lg bg-gray-200 flex items-center justify-center">
          <IconComponent className="size-5 text-gray-500" />
        </div>
      </div>
      <div className="flex flex-col justify-start">
        <span className="flex items-center gap-2">
          <h6 className="font-medium tracking-tight text-gray-900/80 text-sm">
            {data.name}
          </h6>
          {data.type === "folder" && data.fileCount && (
            <span className="px-[8px] rounded-sm bg-slate-100 text-xs font-sans tracking-tight">
              {data.fileCount} Files
            </span>
          )}
        </span>

        <div className="flex items-center text-gray-500 space-x-1 text-xs">
          <span>in {data.location}</span>
          <span className="text-gray-300 w-1 h-1 bg-gray-300 rounded-full inline-block" />
          <span>Edited {data.lastModified}</span>
        </div>
      </div>
      <div className="flex items-center ml-auto group-hover:opacity-100 opacity-0">
        <div className="relative">
          <button
            className="p-2 hover:bg-gray-200 rounded-lg flex items-center justify-center"
            onMouseEnter={() => !linkCopied && setShowLinkTooltip(true)}
            onMouseLeave={() => setShowLinkTooltip(false)}
            onClick={handleCopyLink}
          >
            <motion.div
              animate={{ rotate: linkCopied ? 360 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <LinkIcon className="size-4" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {(showLinkTooltip || linkCopied) && (
              <motion.div
                key={linkCopied ? "copied" : "copy"}
                initial={{ opacity: 0, scale: 0.92, y: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  y: 6,
                  transition: { duration: EXIT_DUR, ease: "easeInOut" },
                }}
                transition={
                  linkCopied
                    ? {
                        type: "tween",
                        duration: 0.12,
                        ease: "easeOut",
                        delay: ENTER_DELAY,
                      }
                    : {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }
                }
                className="absolute z-10 p-1 text-xs font-medium font-sans tracking-tight text-white bg-black/80 rounded-md shadow-xs -top-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
              >
                {linkCopied ? (
                  <span className="flex items-center gap-1">
                    <CheckIcon className="size-2 text-white" weight="bold" />
                    <p className="text-xs font-medium font-sans tracking-tight text-white ">
                      Link Copied!
                    </p>
                  </span>
                ) : (
                  <span>Copy Link</span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="relative">
          <button
            className="p-2 group/button rounded-lg flex items-center justify-center gap-2"
            onMouseEnter={() => setShowNewTabTooltip(true)}
            onMouseLeave={() => setShowNewTabTooltip(false)}
          >
            <ArrowSquareOutIcon className="size-4 text-gray-400 group-hover/button:text-gray-700 transition-colors duration-150 ease-out" />
            <p className="text-xs font-sans tracking-right text-gray-500 group-hover/button:text-gray-700">
              New Tab
            </p>
          </button>
          <AnimatePresence>
            {showNewTabTooltip && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  y: 6,
                  transition: { duration: EXIT_DUR, ease: "easeInOut" },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute z-10 p-1 text-xs font-medium font-sans tracking-tight text-white bg-black/80 rounded-md shadow-xs -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
              >
                Open in new tab
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const getStatusColor = (status: UserData["status"]) => {
  switch (status) {
    case "active":
      return "bg-green-400";
    case "away":
      return "bg-yellow-400";
    case "inactive":
      return "bg-red-400";
    default:
      return "bg-gray-400";
  }
};

const getStatusText = (status: UserData["status"], lastSeen?: string) => {
  switch (status) {
    case "active":
      return "Active Now";
    case "away":
      return lastSeen ? `Last active ${lastSeen}` : "Away";
    case "inactive":
      return lastSeen ? `Last seen ${lastSeen}` : "Offline";
    default:
      return "Unknown";
  }
};

export function UserResultCard({ data }: { data: UserData }) {
  const [showLinkTooltip, setShowLinkTooltip] = useState(false);
  const [showNewTabTooltip, setShowNewTabTooltip] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div className="flex items-center gap-2 py-2 font-sans group">
      <div className="relative">
        <img
          className="size-8 rounded-lg bg-gray-200"
          src={data.avatar}
          alt=""
        />
        <span
          className={`absolute bottom-0 left-6 transform translate-y-1/4 size-3 ${getStatusColor(data.status)} border-2 border-white rounded-full`}
        ></span>
      </div>
      <div className="flex flex-col justify-start">
        <h6 className="font-medium tracking-tight text-gray-900/80 text-sm">
          {data.name}
        </h6>
        <p className="text-xs text-gray-600 tracking-tight">
          {getStatusText(data.status, data.lastSeen)}
        </p>
      </div>
      <div className="flex items-center ml-auto group-hover:opacity-100 opacity-0">
        <div className="relative">
          <button
            className="p-2 hover:bg-gray-200 rounded-lg flex items-center justify-center"
            onMouseEnter={() => !linkCopied && setShowLinkTooltip(true)}
            onMouseLeave={() => setShowLinkTooltip(false)}
            onClick={handleCopyLink}
          >
            <motion.div
              animate={{ rotate: linkCopied ? 360 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <LinkIcon className="size-4" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {(showLinkTooltip || linkCopied) && (
              <motion.div
                key={linkCopied ? "copied" : "copy"}
                initial={{ opacity: 0, scale: 0.92, y: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  y: 6,
                  transition: { duration: EXIT_DUR, ease: "easeInOut" },
                }}
                transition={
                  linkCopied
                    ? {
                        type: "tween",
                        duration: 0.12,
                        ease: "easeOut",
                        delay: ENTER_DELAY,
                      }
                    : {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }
                }
                className="absolute z-10 p-1 text-xs font-medium font-sans tracking-tight text-white bg-black/80 rounded-md shadow-xs -top-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
              >
                {linkCopied ? (
                  <span className="flex items-center gap-1">
                    <CheckIcon className="size-2 text-white" weight="bold" />
                    <p className="text-xs font-medium font-sans tracking-tight text-white ">
                      Link Copied!
                    </p>
                  </span>
                ) : (
                  <span>Copy Link</span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="relative">
          <button
            className="p-2 group/button rounded-lg flex items-center justify-center gap-2"
            onMouseEnter={() => setShowNewTabTooltip(true)}
            onMouseLeave={() => setShowNewTabTooltip(false)}
          >
            <ArrowSquareOutIcon className="size-4 text-gray-400 group-hover/button:text-gray-700 transition-colors duration-150 ease-out" />
            <p className="text-xs font-sans tracking-right text-gray-500 group-hover/button:text-gray-700">
              New Tab
            </p>
          </button>
          <AnimatePresence>
            {showNewTabTooltip && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  y: 6,
                  transition: { duration: EXIT_DUR, ease: "easeInOut" },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute z-10 p-1 text-xs font-medium font-sans tracking-tight text-white bg-black/80 rounded-md shadow-xs -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
              >
                Open in new tab
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
