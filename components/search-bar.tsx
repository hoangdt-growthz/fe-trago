"use client";

import { FormEvent, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { addSearchHistory } from "@/lib/user-state";

interface SearchBarProps {
  defaultValue?: string;
  placeholder?: string;
}

export default function SearchBar({
  defaultValue = "",
  placeholder = "Tim quan, mon, dia diem..."
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (value) addSearchHistory(value);
    router.push(value ? `/listing?q=${encodeURIComponent(value)}` : "/listing");
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <button
        type="submit"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:bg-muted"
        aria-label="Open search results"
      >
        <SlidersHorizontal className="h-4 w-4" />
      </button>
    </form>
  );
}
