import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

interface SocialLinksProps {
  title?: string;
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ 
  title = "Connect with Me", 
  className = "" 
}) => {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href={`https://github.com/${SITE_CONFIG.author.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          <Github className="w-5 h-5" />
          GitHub
        </Link>
        <Link
          href={`https://linkedin.com/in/${SITE_CONFIG.author.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Linkedin className="w-5 h-5" />
          LinkedIn
        </Link>
        <Link
          href={`https://twitter.com/${SITE_CONFIG.author.twitter.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors duration-200"
        >
          <Twitter className="w-5 h-5" />
          Twitter
        </Link>
        <Link
          href={`mailto:${SITE_CONFIG.author.email}`}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          <Mail className="w-5 h-5" />
          Email
        </Link>
      </div>
    </div>
  );
};

export default SocialLinks;
