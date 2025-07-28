import ResponsiveLayout from '@/components/ResponsiveLayout';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { NAVIGATION_LINKS, SITE_CONFIG } from '@/lib/constants';
import { generateSEOMetadata, generatePersonLDSchema } from '@/lib/seo';
import Image from 'next/image';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';

const pageTitle = "About | Ganessh Kumar";
const pageDescription = "Learn about Ganessh Kumar, a full-stack software engineer at Microsoft building AI-powered solutions and modern web applications. Passionate about performance, user experience, and creating tools that make people&apos;s lives easier.";
const canonicalUrl = `${SITE_CONFIG.url}/about`;

const ldSchema = generatePersonLDSchema({
  canonicalUrl,
  title: pageTitle,
  description: pageDescription,
  publishedTime: "2013-01-01",
  modifiedTime: new Date().toISOString().split("T")[0],
});

export const metadata = generateSEOMetadata({
  title: pageTitle,
  description: pageDescription,
  canonicalUrl,
  type: 'profile',
  keywords: [
    "TypeScript",
    "React",
    "Next.js",
    "Obsidian Plugins",
    "Microsoft Fabric",
    "Full Stack Development",
    "AI Solutions"
  ],
  ldSchema,
});

export default function AboutPage() {
  const aboutContent = (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ldSchema)
        }}
      />
      <div className="w-full max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
      </header>
      
      <div className="prose prose-lg mx-auto">
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            My name is <strong>Ganessh Kumar</strong> and I am a software engineer at <strong>Microsoft</strong>. 
            I am a full-stack developer passionate about building AI-powered solutions and modern web applications, with a strong emphasis on performance and user experience.
          </p>
          
          <p>I am currently working on{' '}
            <Link 
              href="https://www.microsoft.com/en-us/microsoft-fabric" 
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Fabric
            </Link>, a unified analytics platform that empowers organizations to get the most value from their data and accelerate their AI journey. I love creating solutions that make people&apos;s lives easier and more productive.
          </p>

          <p>
            In my free time, I enjoy building{' '}
            <Link 
              href="https://obsidian-plugin-stats.ganesshkumar.com" 
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              ObsidianStats
            </Link>, a platform to find the best Obsidian plugins for a workflow and also to stay up-to-date on Obsidian plugins and themes. I also love creating plugins for <strong>Obsidian</strong>.
            I have created a few plugins that enhance the functionality of Obsidian, such as:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <Link 
                href="https://github.com/ganesshkumar/obsidian-excel-to-markdown-table" 
                className="text-blue-600 hover:text-blue-800 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Obsidian Excel to Markdown table
              </Link>
            </li>
            <li>
              <Link 
                href="https://github.com/ganesshkumar/obsidian-table-editor" 
                className="text-blue-600 hover:text-blue-800 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Obsidian Markdown Table Editor
              </Link>
            </li>
            <li>
              <Link 
                href="https://github.com/ganesshkumar/obsidian-bookmarklet-maker" 
                className="text-blue-600 hover:text-blue-800 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Obsidian Bookmarklet Maker
              </Link>
            </li>
          </ul>

          <p>
            You can find all my plugins on the Obsidian community hub or on my{' '}
            <Link 
              href="https://github.com/ganesshkumar" 
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub page
            </Link>. 
            I hope you find them useful and feel free to give me feedback or suggestions.
          </p>

          <p>
            On this blog, I will share my thoughts and experiences on software development, my learnings, productivity, Obsidian, 
            and other topics that interest me. I hope you enjoy reading my posts and learn something 
            new along the way. Thank you for visiting and stay tuned for more!
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills</h2>
          
          {/* Frontend */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Frontend</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { name: 'TypeScript', icon: 'https://skillicons.dev/icons?i=ts&theme=light' },
                { name: 'JavaScript', icon: 'https://skillicons.dev/icons?i=js&theme=light' },
                { name: 'HTML', icon: 'https://skillicons.dev/icons?i=html&theme=light' },
                { name: 'CSS', icon: 'https://skillicons.dev/icons?i=css&theme=light' },
                { name: 'React', icon: 'https://skillicons.dev/icons?i=react&theme=light' },
                { name: 'Next.js', icon: 'https://skillicons.dev/icons?i=nextjs&theme=light' },
                { name: 'Redux', icon: 'https://skillicons.dev/icons?i=redux&theme=light' },
                { name: 'Tailwind', icon: 'https://skillicons.dev/icons?i=tailwind&theme=light' }
              ].map((skill) => (
                <div 
                  key={skill.name}
                  className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2 text-sm font-medium text-gray-700"
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-6 h-6" 
                  />
                  {skill.name}
                </div>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Backend</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { name: 'Node.js', icon: 'https://skillicons.dev/icons?i=nodejs&theme=light' },
                { name: 'NestJS', icon: 'https://skillicons.dev/icons?i=nestjs&theme=light' },
                { name: 'Java', icon: 'https://skillicons.dev/icons?i=java&theme=light' },
                { name: 'Kotlin', icon: 'https://skillicons.dev/icons?i=kotlin&theme=light' },
                { name: 'Spring', icon: 'https://skillicons.dev/icons?i=spring&theme=light' },
                { name: 'Python', icon: 'https://skillicons.dev/icons?i=py&theme=light' },
                { name: 'Flask', icon: 'https://skillicons.dev/icons?i=flask&theme=light' },
                { name: 'C#', icon: 'https://skillicons.dev/icons?i=cs&theme=light' },
                { name: '.NET', icon: 'https://skillicons.dev/icons?i=dotnet&theme=light' },
                { name: 'GraphQL', icon: 'https://skillicons.dev/icons?i=graphql&theme=light' }
              ].map((skill) => (
                <div 
                  key={skill.name}
                  className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2 text-sm font-medium text-gray-700"
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-6 h-6" 
                  />
                  {skill.name}
                </div>
              ))}
            </div>
          </div>

          {/* Database & Tools */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Database & Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { name: 'Prisma', icon: 'https://skillicons.dev/icons?i=prisma&theme=light' },
                { name: 'Supabase', icon: 'https://skillicons.dev/icons?i=supabase&theme=light' },
                { name: 'PostgreSQL', icon: 'https://skillicons.dev/icons?i=postgres&theme=light' },
                { name: 'MongoDB', icon: 'https://skillicons.dev/icons?i=mongodb&theme=light' }
              ].map((skill) => (
                <div 
                  key={skill.name}
                  className="flex items-center gap-2 bg-yellow-50 rounded-lg px-3 py-2 text-sm font-medium text-gray-700"
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-6 h-6" 
                  />
                  {skill.name}
                </div>
              ))}
            </div>
          </div>

          {/* Cloud & DevOps */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Cloud & DevOps</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { name: 'AWS', icon: 'https://skillicons.dev/icons?i=aws&theme=light' },
                { name: 'Azure', icon: 'https://skillicons.dev/icons?i=azure&theme=light' },
                { name: 'Vercel', icon: 'https://skillicons.dev/icons?i=vercel&theme=light' },
                { name: 'Docker', icon: 'https://skillicons.dev/icons?i=docker&theme=light' },
                { name: 'Kubernetes', icon: 'https://skillicons.dev/icons?i=kubernetes&theme=light' },
                { name: 'Ansible', icon: 'https://skillicons.dev/icons?i=ansible&theme=light' }
              ].map((skill) => (
                <div 
                  key={skill.name}
                  className="flex items-center gap-2 bg-purple-50 rounded-lg px-3 py-2 text-sm font-medium text-gray-700"
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-6 h-6" 
                  />
                  {skill.name}
                </div>
              ))}
            </div>
          </div>

          {/* Operating Systems */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Operating Systems</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { name: 'Linux', icon: 'https://skillicons.dev/icons?i=linux&theme=light' }
              ].map((skill) => (
                <div 
                  key={skill.name}
                  className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 text-sm font-medium text-gray-700"
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-6 h-6" 
                  />
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect with Me</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="https://github.com/ganesshkumar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/ganessh-kumar-r-p-676a4719/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </Link>
            <Link
              href="https://twitter.com/ganesshkumar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors duration-200"
            >
              <Twitter className="w-5 h-5" />
              Twitter
            </Link>
            <Link
              href="mailto:rpganesshkumar@gmail.com"
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <Mail className="w-5 h-5" />
              Email
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
  
  return (
    <ResponsiveLayout
      nav={
        <Navbar
          logo={
            <span className="font-bold text-xl">
              <Image src="/android-chrome-512x512.png" alt="Logo" width={32} height={32} />
            </span>
          }
          links={NAVIGATION_LINKS}
          currentUrl="/about"
        />
      }
      content={aboutContent}
      footer={<Footer />}
      maxWidthClass="max-w-6xl"
    />
  );
}
