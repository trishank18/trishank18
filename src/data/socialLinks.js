import { Github, Linkedin, Mail, Globe } from 'lucide-react';
import { profile } from './profile.js';
export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Trishank18', icon: Github },
  { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin },
  { label: 'Email', href: profile.email ? `mailto:${profile.email}` : '', icon: Mail },
  { label: 'Portfolio', href: profile.portfolio, icon: Globe }
];
