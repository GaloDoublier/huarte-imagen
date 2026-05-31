"use client";

import { useEffect, useState } from "react";

interface AnnouncementBarProps {
  message: string;
  isActive: boolean;
  link?: string;
}

export function AnnouncementBar({ message, isActive, link }: AnnouncementBarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isActive || !message) return null;

  // Pasamos aria-hidden como prop para que ambos vagones sean hermanos directos en el Flexbox
  const MarqueeTrack = ({ isHidden = false }: { isHidden?: boolean }) => (
    <div 
      className="flex min-w-full shrink-0 items-center justify-around animate-marquee whitespace-nowrap"
      aria-hidden={isHidden ? "true" : undefined}
    >
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex items-center shrink-0">
          <span className="font-medium uppercase tracking-widest text-[11px] md:text-xs">
            {message}
          </span>
          <span aria-hidden="true" className="px-6 md:px-8 text-primary-foreground/40 text-xs">
            ♡
          </span>
        </div>
      ))}
    </div>
  );

  // Eliminamos 'block' de acá para que no rompa el flex layout del enlace
  const wrapperClasses = "bg-primary text-primary-foreground py-2 overflow-hidden flex flex-nowrap w-full";

  if (link) {
    return (
      <a href={link} className={`${wrapperClasses} hover:bg-primary/90 transition-colors cursor-pointer`}>
        <MarqueeTrack />
        <MarqueeTrack isHidden />
      </a>
    );
  }

  return (
    <div className={wrapperClasses}>
      <MarqueeTrack />
      <MarqueeTrack isHidden />
    </div>
  );
}