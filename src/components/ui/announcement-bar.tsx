"use client";

import { useEffect, useState } from "react";

interface AnnouncementBarProps {
  message: string;
  isActive: boolean;
}

export function AnnouncementBar({ message, isActive }: AnnouncementBarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isActive || !message) return null;

  const content = (
    <div className="flex whitespace-nowrap animate-marquee">
      
      {[...Array(6)].map((_, i) => (
        <span key={i} className="mx-4 font-medium uppercase tracking-widest text-[11px] md:text-xs">
          {message}
          <span className="mx-4 text-primary-foreground/50">•</span>
        </span>
      ))}
    </div>
  );

  const wrapperClasses = "bg-primary text-primary-foreground py-2 md:py-2.5 overflow-hidden flex items-center";

  return (
    <div className={wrapperClasses}>
      {content}
    </div>
  );
}