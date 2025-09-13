"use client";
import React, { useEffect, useState } from "react";
import {
  ChatCircleIcon,
  ListIcon,
  MagnifyingGlassIcon,
  PaperclipIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import Dropdown, { FilterOption } from "./dropdown";
import { Loading } from "./loading";
import { AnimatedCounter } from "./animate-counter";
import { FileResultCard, UserResultCard } from "./result-card";
import { ResultSkeleton } from "./result-skeleton";
import { mockUsers, mockFiles } from "../data/mockData";

type Tab = {
  id: string;
  label: string;
  count: number;
  icon?: React.ComponentType<any>;
};

const INITIAL_OPTIONS: FilterOption[] = [
  { id: "files", label: "Files", icon: PaperclipIcon, count: 6 },
  { id: "people", label: "People", icon: UserIcon, count: 3 },
  {
    id: "chats",
    label: "Chats",
    icon: ChatCircleIcon,
    count: 0,
    disabled: true,
  },
  { id: "lists", label: "Lists", icon: ListIcon, count: 0, disabled: true },
];

export default function Search() {
  const [filterOptions, setFilterOptions] =
    useState<FilterOption[]>(INITIAL_OPTIONS);

  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>(
    () =>
      INITIAL_OPTIONS.reduce(
        (acc, o) => {
          acc[o.id] = !!(o.id === "files" || o.id === "people");
          return acc;
        },
        {} as Record<string, boolean>,
      ),
  );

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchValue, setSearchValue] = useState("");
  const [revealed, setRevealed] = useState(0);

  // tweak stagger/load here
  const STAGGER_MS = 50;
  const LOAD_MS = 5000;

  // make slices stable so memo/ effects don't rerun every render
  const selectedUsers = React.useMemo(() => mockUsers.slice(0, 2), []);
  const selectedFiles = React.useMemo(() => mockFiles.slice(0, 3), []);

  const combinedResults = React.useMemo(
    () => [
      ...selectedUsers.map((user) => ({
        type: "user" as const,
        id: user.id,
        data: user,
      })),
      ...selectedFiles.map((file) => ({
        type: "file" as const,
        id: file.id,
        data: file,
      })),
    ],
    [selectedUsers, selectedFiles],
  );

  const handleToggle = (id: string, checked?: boolean) => {
    setActiveFilters((prev) => {
      const newValue = typeof checked === "boolean" ? checked : !prev[id];
      setFilterOptions((prevOptions) =>
        prevOptions.map((o) =>
          o.id === id ? { ...o, disabled: !newValue } : o,
        ),
      );
      return { ...prev, [id]: newValue };
    });
  };

  const tabs: Tab[] = React.useMemo(() => {
    const allCount = filterOptions.reduce((sum, o) => sum + (o.count ?? 0), 0);

    return [
      { id: "all", label: "All", count: allCount },
      ...filterOptions
        .filter((o) => activeFilters[o.id])
        .map((o) => ({
          id: o.id,
          label: o.label,
          count: o.count ?? 0,
          icon: o.icon,
        })),
    ];
  }, [activeFilters, filterOptions]);

  // Combined effect: handles loading, showResults and staggered reveal timers.
  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];
    let loadTimer: ReturnType<typeof setTimeout> | null = null;

    if (open) {
      setLoading(true);
      setShowResults(false);
      setRevealed(0);

      loadTimer = setTimeout(() => {
        setLoading(false);
        setShowResults(true);

        // start stagger reveal after results are ready
        combinedResults.forEach((_, i) => {
          const t = setTimeout(() => {
            setRevealed((prev) => Math.max(prev, i + 1));
          }, i * STAGGER_MS);
          timers.push(t);
        });
      }, LOAD_MS);
    } else {
      // immediate reset when closing
      setLoading(false);
      setShowResults(false);
      setRevealed(0);
    }

    return () => {
      if (loadTimer) clearTimeout(loadTimer);
      timers.forEach((t) => clearTimeout(t));
    };
  }, [open, combinedResults]);

  const handleClear = () => {
    setSearchValue("");
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (!open) setOpen(true);
  };

  return (
    <motion.div
      initial={false}
      animate={{ height: open ? "400px" : "64px" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      exit={{ height: "64px" }}
      className="w-full max-w-md border rounded-xl border-gray-100 bg-white shadow-sm overflow-hidden"
    >
      <div className="p-4 flex items-center gap-4">
        <div className="flex items-center gap-2 flex-1">
          {loading && <Loading />}
          {!loading && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <MagnifyingGlassIcon
                className="size-5 text-gray-400"
                weight="bold"
              />
            </motion.div>
          )}

          <input
            type="text"
            placeholder="Searching is easier"
            className="focus:outline-none focus:ring-0 placeholder:text-gray-400 text-lg placeholder:text-lg w-full"
            onChange={handleChange}
            value={searchValue}
          />
        </div>

        {!open && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium text-gray-500 size-6 flex justify-center items-center border border-gray-400 rounded-lg bg-white shadow-[0_2px_0_0_rgba(0,0,0,0.28)]">
              S
            </span>
            <p className="text-sm text-gray-400 font-medium">quick access</p>
          </div>
        )}

        {open && (
          <motion.button
            className="text-black underline font-medium text-xs underline-offset-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onClick={handleClear}
          >
            Clear
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="px-4 border-b border-gray-100"
            >
              <div className="flex items-center gap-6">
                {tabs.map((t) => (
                  <motion.button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`relative flex items-center gap-2 py-3 text-sm font-medium transition-colors ${
                      activeTab === t.id
                        ? "text-black"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {t.icon && <t.icon className="size-4 text-gray-400" />}
                    <span>{t.label}</span>
                    <span
                      className={`text-xs px-1.5 font-medium rounded ${
                        activeTab === t.id
                          ? "bg-gray-100 text-gray-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <AnimatedCounter value={t.count} />
                    </span>
                    {activeTab === t.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full"
                        initial={false}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </motion.button>
                ))}

                <div className="ml-auto">
                  <Dropdown
                    options={filterOptions}
                    active={activeFilters}
                    onToggle={handleToggle}
                  />
                </div>
              </div>
            </motion.div>

            <motion.ul
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="divide-y divide-gray-100 px-5 overflow-y-scroll"
            >
              {combinedResults.map((slot, index) => {
                const isRevealed = index < revealed;

                if (isRevealed && showResults) {
                  return (
                    <motion.li
                      key={slot.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      {slot.type === "user" ? (
                        <UserResultCard data={slot.data} />
                      ) : (
                        <FileResultCard data={slot.data} />
                      )}
                    </motion.li>
                  );
                }

                return (
                  <li key={slot.id}>
                    <ResultSkeleton />
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
