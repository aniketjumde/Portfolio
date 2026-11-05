import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Accurate brand marks (lucide removed brand icons). */
export function GithubIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.4-3.88-1.4-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.19a11 11 0 0 1 5.79 0c2.2-1.5 3.17-1.19 3.17-1.19.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.35.78 1.05.78 2.12v3.15c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function LeetcodeIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...props}>
      <path d="M13.48 0a1.37 1.37 0 0 0-.98.42L7.4 5.6l-4.3 4.36a5.1 5.1 0 0 0 0 7.16l5.28 5.35A5 5 0 0 0 11.96 24a5 5 0 0 0 3.58-1.52l2.5-2.54a1.4 1.4 0 0 0-1.99-1.98l-2.5 2.54a2.2 2.2 0 0 1-3.17 0l-5.28-5.35a2.3 2.3 0 0 1 0-3.2l4.3-4.36 5.1-5.18a1.4 1.4 0 0 0-.99-2.4Zm2.94 5.02a1.4 1.4 0 0 0-.99.41 1.4 1.4 0 0 0 0 1.98l1.86 1.89H9.06a1.4 1.4 0 1 0 0 2.8h8.23l-1.86 1.88a1.4 1.4 0 0 0 1.99 1.98l4.3-4.35a1.4 1.4 0 0 0 0-1.98l-4.3-4.35a1.4 1.4 0 0 0-.99-.42Z" />
    </svg>
  );
}

export function GmailIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...props}>
      <path d="M24 5.46v13.1A2.44 2.44 0 0 1 21.56 21h-2.9V9.4L12 14.17 5.34 9.4V21h-2.9A2.44 2.44 0 0 1 0 18.56V5.46c0-1.9 2.17-2.98 3.68-1.84L12 9.94l8.32-6.32C21.83 2.48 24 3.56 24 5.46Z" />
    </svg>
  );
}

/** Java-ish monogram mark used as a decorative hero element. */
export function JavaMark({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className} {...props}>
      <defs>
        <linearGradient id="jm-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(158 74% 46%)" />
          <stop offset="55%" stopColor="hsl(190 88% 55%)" />
          <stop offset="100%" stopColor="hsl(264 78% 66%)" />
        </linearGradient>
      </defs>
      <path
        d="M24 4.5c3.4 5.2 8.9 8.7 8.9 15.3 0 3.9-2.5 7-6 7-3.3 0-5.5-2.3-5.5-5.4 0-2.2 1-4 2.6-6.4-4.7 2.7-7.6 7-7.6 11.6 0 4.6 3 8.4 7.6 8.4 4.9 0 8.6-3.7 8.6-9.2 0-5.3-3.4-8.6-8.6-15.3Z"
        stroke="url(#jm-grad)"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <path d="M14 43.2h20M17.5 38.4h13" stroke="url(#jm-grad)" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}
