import { useEffect, useId, useRef, useState } from "react";

type DropdownErrorState = {
  message: string;
};

type DropdownOption<T extends string> = {
  value: T;
  title: string;
  description?: string;
  sectionStart?: React.ReactNode;
  sectionEnd?: React.ReactNode;
  disabled?: boolean;
};

type DropdownProps<T extends string> = {
  label: string;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  value?: T;
  name?: string;
  error?: DropdownErrorState;
  disabled?: boolean;
  searchable?: boolean;
};

const Dropdown = <T extends string>({
  label,
  options,
  onChange,
  value,
  name,
  error,
  disabled,
  searchable,
}: DropdownProps<T>) => {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const errorId = useId();
  const listId = useId();

  const filterOptions = (q: string) =>
    q
      ? options.filter((option) =>
          `${option.title} ${option.description ?? ""}`
            .toLowerCase()
            .includes(q.toLowerCase()),
        )
      : options;

  const visible = filterOptions(query);

  const selected = options.find((option) => option.value === value);
  const floated = open || selected !== undefined;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    rootRef.current
      ?.querySelector('[data-highlighted="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [open, highlight]);

  const firstEnabled = options.findIndex((option) => !option.disabled);

  const openList = () => {
    if (firstEnabled === -1) return;
    const index = options.findIndex((option) => option.value === value);
    setQuery("");
    setHighlight(index >= 0 ? index : firstEnabled);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const select = (option?: DropdownOption<T>) => {
    if (!option || option.disabled) return;
    onChange(option.value);
    close();
  };

  const moveHighlight = (from: number, direction: 1 | -1) => {
    let index = from + direction;
    while (visible[index]?.disabled) index += direction;
    if (visible[index]) setHighlight(index);
  };

  const onQueryChange = (next: string) => {
    setQuery(next);
    const list = filterOptions(next);
    setHighlight(Math.max(0, list.findIndex((option) => !option.disabled)));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      if (open) {
        e.stopPropagation();
        close();
      }
    } else if (e.key === "Tab") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (open) moveHighlight(highlight, 1);
      else openList();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (open) moveHighlight(highlight, -1);
      else openList();
    } else if (e.key === "Home" && open) {
      e.preventDefault();
      moveHighlight(-1, 1);
    } else if (e.key === "End" && open) {
      e.preventDefault();
      moveHighlight(visible.length, -1);
    } else if (
      e.key === "Enter" ||
      (e.key === " " && !(open && searchable))
    ) {
      e.preventDefault();
      if (open) select(visible[highlight]);
      else openList();
    }
  };

  return (
    <div ref={rootRef} className="relative w-full">
      {name && <input type="hidden" name={name} value={value ?? ""} />}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? `${listId}-${highlight}` : undefined}
        aria-invalid={error !== undefined}
        aria-describedby={error ? errorId : undefined}
        className={`relative block w-full cursor-pointer text-left border px-2.5 pt-5 pb-1.5 rounded-md outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed ${
          error
            ? "border-error outline-error border-2"
            : "border-field-border bg-field-bg outline-accent-2"
        } ${open ? "outline-2" : "focus-visible:outline-2"}`}
      >
        <span className="font-medium text-fg-1 min-h-6 flex items-center">
          {selected?.title ?? " "}
        </span>
        <span
          className={`absolute left-2.5 pointer-events-none transition-all ${
            error ? "text-error font-medium" : "text-fg-3"
          } ${floated ? "top-2 text-xs" : "top-1/2 -translate-y-1/2 text-base"}`}
        >
          {label}
        </span>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-fg-3 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06z" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full mt-2 w-full z-10 rounded-md border border-main-2 bg-main-1 shadow-sm animate-fade-in overflow-hidden">
          {searchable && (
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={onKeyDown}
              autoFocus
              placeholder="Search..."
              aria-controls={listId}
              aria-activedescendant={`${listId}-${highlight}`}
              className="w-full px-3 py-2.5 text-sm border-b border-main-2 outline-none bg-transparent text-fg-1 placeholder:text-fg-3"
            />
          )}
          <ul id={listId} role="listbox" className="max-h-60 overflow-y-auto">
            {visible.length === 0 && (
              <li className="px-3 py-2.5 text-sm text-fg-3">No results</li>
            )}
            {visible.map((option, index) => {
            const isSelected = option.value === value;
            const isHighlighted = index === highlight;

            return (
              <li
                key={option.value}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled}
                data-highlighted={isHighlighted}
                onClick={() => select(option)}
                onPointerMove={() => setHighlight(index)}
                className={`flex flex-row items-center gap-3 px-3 py-2.5 cursor-pointer ${
                  isHighlighted ? "bg-main-2" : ""
                } ${option.disabled ? "opacity-60 pointer-events-none" : ""}`}
              >
                {option.sectionStart}
                <div className="flex flex-col min-w-0">
                  <span
                    className={`font-medium truncate ${
                      isSelected ? "text-accent-2" : "text-fg-1"
                    }`}
                  >
                    {option.title}
                  </span>
                  {option.description && (
                    <span className="text-sm text-fg-2 truncate">
                      {option.description}
                    </span>
                  )}
                </div>
                {option.sectionEnd && (
                  <div className="ml-auto">{option.sectionEnd}</div>
                )}
              </li>
            );
          })}
          </ul>
        </div>
      )}

      {error && (
        <p id={errorId} className="mt-1 text-xs text-error">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
