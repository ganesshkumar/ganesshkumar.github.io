import { Github, Linkedin, Mail, Twitter, type LucideIcon } from "lucide-react";

/**
 * Maps a social link label (from `SOCIAL_NAV` in navigation.ts) to its brand
 * icon. Shared by the intro and footer social rows so both stay in sync.
 */
export const SOCIAL_ICONS: Record<string, LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  X: Twitter,
  Twitter: Twitter,
  Email: Mail,
};
