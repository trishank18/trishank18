import { GitBranch, BriefcaseBusiness, Mail, Globe } from 'lucide-react';
import { profile } from './profile.js';
export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Trishank18', icon: GitBranch },
  { label: 'LinkedIn', href: profile.linkedin, icon: BriefcaseBusiness },
  { label: 'Email', href: profile.email ? `mailto:${profile.email}` : '', icon: Mail },
  { label: 'Portfolio', href: profile.portfolio, icon: Globe }
];
