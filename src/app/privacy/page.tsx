import ResponsiveLayout from '@/components/ResponsiveLayout';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { NAVIGATION_LINKS, SITE_CONFIG } from '@/lib/constants';
import { generateSEOMetadata } from '@/lib/seo';
import Image from 'next/image';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';

// Process markdown content at module level (similar to getStaticProps)
const processPrivacyContent = async () => {
  const markdownContent = `
At ganesshkumar.com, we are committed to protecting your privacy and being transparent about how we collect and use information. This Privacy Policy explains what data is collected, how it's used, and your rights regarding your personal information.

## Information We Collect

### Contact Form Data

When you use the contact form on this website, we collect:
- **Your name**
- **Email address**
- **Subject line** (optional)
- **Message content**

This information is processed through **Formspree**, a third-party service, and is used solely to respond to your inquiries.

### Analytics Data

We use **self-hosted Plausible Analytics** to understand how visitors use this website. Plausible collects:
- Page views and site navigation patterns
- Referrer information (which site brought you here)
- General location data (country/region level only)
- Device and browser information
- **No personal identifiers or IP addresses are stored**

### Automatically Collected Information

Like most websites, this site automatically collects certain technical information through server logs, including:
- IP addresses (for security and analytics purposes)
- Browser type and version
- Operating system
- Pages visited and time spent
- Referring websites

## Third-Party Services

- **Formspree** - Processes contact form submissions. Please review their privacy policy at formspree.io for details on their data handling practices.
- **Plausible Analytics** - Self-hosted analytics solution that respects privacy by design. No personal data is tracked or stored.
- **External Content** - This website displays skill icons from skillicons.dev and profile images from Gravatar. These services may set their own cookies when content is loaded.
- **Social Media Links** - Links to GitHub, LinkedIn, Twitter, and email are provided but no social media tracking pixels or embedded content is used.

## Cookies and Tracking

This website uses minimal cookies:
- **Analytics cookies** from Plausible Analytics for understanding site usage
- **Functional cookies** for contact form operation
- **No social media tracking cookies** are currently used

## Data Retention

- **Contact form data**: Retained by Formspree for 30 days
- **Analytics data**: Retained according to Plausible Analytics retention settings
- **Server logs**: Retained as per standard web hosting practices

## Your Rights

You have the right to:
- Request deletion of your contact form submissions
- Opt out of analytics tracking
- Request information about what data we have collected about you
- Correct any inaccurate information

To exercise these rights, please contact us at **${SITE_CONFIG.author.email}**.

## Data Security

**⚠️ Important Notice**: While we strive to implement reasonable security measures to protect your personal information, we cannot guarantee absolute security. You acknowledge that you provide information to this website at your own risk and that no security measures are perfect or impenetrable.

**You are responsible for:**
- Maintaining the security of any login credentials (if applicable)
- The security of information you choose to submit
- Understanding that internet transmissions are never completely secure

## Data Breach Notification

In the unlikely event of a data breach, we will make reasonable efforts to notify affected users, but we make no guarantee regarding the timing or method of such notification.

## Children's Privacy

This website is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us immediately.

## International Users

This website is operated from and governed by the laws of our jurisdiction. If you are accessing this website from outside that jurisdiction, you acknowledge that your information may be transferred to, stored, and processed in a different country with different privacy laws.

## Changes to This Policy

We reserve the right to update this Privacy Policy at any time without prior notice. Changes will be effective immediately when posted on this page with an updated "Last Updated" date. Your continued use of the website after any changes constitutes acceptance of the new policy.

## Limitation of Liability Regarding Privacy

**⚠️ Important**: To the maximum extent permitted by law, we disclaim all liability for:
- Any unauthorized access to or use of your personal information
- Any errors or omissions in our privacy practices
- Any damages arising from your use of this website or submission of information

## Contact Information

If you have questions about this Privacy Policy, please contact us at **${SITE_CONFIG.author.email}**. Note that contacting us does not create any obligation on our part to respond or take any specific action.
  `;

  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdownContent);
  
  return result.toString();
};

// Get the processed HTML content at module level
const privacyHtmlContent = await processPrivacyContent();

const pageTitle = "Privacy Policy | Ganessh Kumar";
const pageDescription = "Privacy Policy for ganesshkumar.com - Learn how we collect, use, and protect your personal information when you visit our website.";
const canonicalUrl = `${SITE_CONFIG.url}/privacy`;

const ldSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: canonicalUrl,
  name: pageTitle,
  description: pageDescription,
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#WebSite`
  },
  author: {
    "@type": "Person",
    "@id": `${SITE_CONFIG.url}/#Person`,
    name: SITE_CONFIG.author.name,
  },
  datePublished: "2025-01-01",
  dateModified: new Date().toISOString().split("T")[0],
};

export const metadata = generateSEOMetadata({
  title: pageTitle,
  description: pageDescription,
  canonicalUrl,
  type: 'article',
  keywords: [
    "privacy policy",
    "data protection",
    "GDPR",
    "personal information",
    "website privacy",
    "data collection",
    "cookies",
    "analytics"
  ],
  ldSchema,
});

// Component that receives the processed HTML as prop
interface PrivacyContentProps {
  htmlContent: string;
}

function PrivacyContent({ htmlContent }: PrivacyContentProps) {
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ldSchema)
        }}
      />
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-500">
            Last Updated: {getCurrentDate()}
          </p>
        </header>
        
        <article className="prose prose-lg max-w-none">
          <div
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </div>
    </>
  );
}

export default async function PrivacyPage() {
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
          currentUrl="/privacy"
        />
      }
      content={<PrivacyContent htmlContent={privacyHtmlContent} />}
      footer={<Footer />}
      maxWidthClass="max-w-6xl"
    />
  );
}
