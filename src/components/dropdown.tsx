"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { GearSixIcon } from "@phosphor-icons/react";
import type { IconProps } from "@phosphor-icons/react";
import Toggle from "./toggle";

export type FilterOption = {
  id: string;
  label: string;
  icon?: React.ComponentType<IconProps>;
  disabled?: boolean;
  count?: number;
};

interface DropdownProps {
  options: FilterOption[];
  active: Record<string, boolean>;
  onToggle: (id: string, checked?: boolean) => void;
}

export default function Dropdown({ options, active, onToggle }: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative inline-block text-left">
      <motion.button
        onClick={() => setOpen((p) => !p)}
        className="p-1.5 text-gray-400 hover:bg-gray-200/40 rounded-lg hover:text-gray-600 transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
        type="button"
      >
        <motion.div whileTap={{ rotate: 75 }}>
          <GearSixIcon
            className="size-5 text-gray-400 hover:text-gray-500 transition-colors duration-100 ease-in"
            weight="bold"
          />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-52 rounded-lg bg-white shadow-sm border border-gray-100 z-10"
            role="menu"
          >
            <ul className="py-2">
              {options.map((opt) => {
                const Icon = opt.icon;
                const isActive = !!active[opt.id];

                return (
                  <motion.li
                    key={opt.id}
                    className={`flex items-center justify-between px-4 py-2 text-sm rounded-md ${
                      opt.disabled
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-50 cursor-pointer"
                    }`}
                    role="menuitem"
                    aria-disabled={opt.disabled}
                  >
                    <div
                      className="flex items-center gap-2"
                      onClick={() => {
                        if (opt.disabled) return;
                        onToggle(opt.id);
                      }}
                    >
                      {Icon && <Icon className="size-4 text-gray-500" />}
                      <span>{opt.label}</span>
                    </div>

                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Toggle
                        checked={isActive}
                        onChange={(checked) => onToggle(opt.id, checked)}
                        variant="primary"
                        disabled={false}
                      />
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
