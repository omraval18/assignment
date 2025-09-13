import React, { useState } from "react";

interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error";
  children?: React.ReactNode;
  className?: string;
}

export default function Toggle({
  checked = false,
  onChange,
  disabled = false,
  variant = "default",
  children,
  className = "",
}: ToggleProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    if (disabled) return;
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  React.useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const getVariantColors = () => {
    switch (variant) {
      case "primary":
        return isChecked
          ? "bg-black border-black"
          : "bg-gray-200 border-gray-300";
      case "secondary":
        return isChecked
          ? "bg-gray-600 border-gray-600"
          : "bg-gray-200 border-gray-300";
      case "accent":
        return isChecked
          ? "bg-purple-600 border-purple-600"
          : "bg-gray-200 border-gray-300";
      case "success":
        return isChecked
          ? "bg-green-600 border-green-600"
          : "bg-gray-200 border-gray-300";
      case "warning":
        return isChecked
          ? "bg-yellow-500 border-yellow-500"
          : "bg-gray-200 border-gray-300";
      case "error":
        return isChecked
          ? "bg-red-600 border-red-600"
          : "bg-gray-200 border-gray-300";
      default:
        return isChecked
          ? "bg-gray-800 border-gray-800"
          : "bg-gray-200 border-gray-300";
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div
        onClick={handleToggle}
        className={`
          relative inline-flex h-5 w-9 items-center rounded-full border-2 transition-all duration-200 cursor-pointer
          ${disabled ? "opacity-30 cursor-not-allowed" : ""}
          ${getVariantColors()}
          focus-within:outline-none
        `}
        role="switch"
        aria-checked={isChecked}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => {}}
          disabled={disabled}
          className="sr-only"
          tabIndex={-1}
        />

        <div
          className={`
            absolute top-0.5 left-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out
            ${isChecked ? "translate-x-4" : "translate-x-0"}
            ${disabled ? "shadow-none" : "shadow-md"}
          `}
        >
          {/* Icon container */}
          <div className="flex h-full w-full items-center justify-center">
            {children && (
              <div
                className={`
                text-[8px] transition-all duration-200
                ${isChecked ? "opacity-100 rotate-0" : "opacity-0 rotate-12"}
              `}
              >
                {children}
              </div>
            )}
          </div>
        </div>

        <div
          className={`
          absolute inset-0 rounded-full transition-opacity duration-200
          ${isChecked ? "opacity-10" : "opacity-0"}
        `}
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}
