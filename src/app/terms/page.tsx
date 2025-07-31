import React from 'react';
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
const processTermsContent = async () => {
  const markdownContent = `
These Terms of Use ("Terms") govern your use of ganesshkumar.com (the "Website") operated by us. By accessing or using the Website, you agree to be bound by these Terms.

## Acceptance of Terms

By accessing and using this Website, you accept and agree to be bound by the terms and provision of this agreement. **⚠️ Important**: If you do not agree to abide by the above, please do not use this service.

## Use License

Permission is granted to temporarily download one copy of the materials on this Website for **personal, non-commercial transitory viewing only**. This is the grant of a license, not a transfer of title, and under this license you may not:

- Modify or copy the materials
- Use the materials for any commercial purpose or for any public display (commercial or non-commercial)
- Attempt to decompile or reverse engineer any software contained on the Website
- Remove any copyright or other proprietary notations from the materials

This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.

## Content and Intellectual Property

All content published on this Website, including but not limited to articles, code samples, images, and documentation, is owned by **ganesshkumar.com** unless otherwise stated.

### Code Samples and Technical Content

Code samples and technical tutorials published on this Website are provided for **educational purposes**. You may use these code samples in your own projects with the following conditions:

- **Attribution Required**: You must provide appropriate credit, provide a link to the original article, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests ganesshkumar.com endorses you or your use.
- **No Warranty**: Code samples are provided "as is" without warranty of any kind. We make no representations or warranties about the accuracy, completeness, or suitability of the code for any particular purpose.

### Articles and Written Content

Written articles and blog posts are **protected by copyright** and are provided for informational purposes only. You may link to articles but may not reproduce substantial portions without explicit permission.

## User Conduct

**You agree not to use the Website to:**

- Violate any applicable laws or regulations
- Infringe on the rights of others
- Distribute spam, viruses, or other harmful content
- Attempt to gain unauthorized access to the Website or its related systems
- Use automated scripts or bots to access the Website
- Interfere with the normal operation of the Website

## Third-Party Links and Services

This Website may contain links to third-party websites or services. **We are not responsible** for the content, privacy policies, or practices of any third-party sites. Your use of third-party sites is at your own risk.

### Contact Form Service

The contact form on this Website is powered by **Formspree**. By using the contact form, you agree to Formspree's terms of service and privacy policy.

## Disclaimers and Limitation of Liability

**⚠️ IMPORTANT NOTICE**: The information on this Website is provided on an "as is" basis. To the fullest extent permitted by law, we exclude:

- All representations, warranties, conditions and other terms which might otherwise be implied by statute, common law, or the law of equity
- Any liability for any direct, indirect, or consequential loss or damage incurred by any user in connection with the Website or in connection with the use, inability to use, or results of the use of the Website

### Professional Advice Disclaimer

The content on this Website is for **informational purposes only** and should not be considered professional advice. We recommend consulting with qualified professionals for specific technical, legal, or business decisions.

### No Warranty for Technical Content

**We make no representations or warranties regarding:**

- The accuracy or completeness of code samples
- The suitability of any technical solutions for your specific use case
- The security implications of implementing any code or techniques described
- Compatibility with your specific environment or requirements

You acknowledge that you implement any code or techniques **at your own risk** and are responsible for testing and validation in your environment.

## Indemnification

You agree to **indemnify, defend, and hold harmless** ganesshkumar.com, its operators, and contributors from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney's fees) arising from:

- Your use of and access to the Website
- Your violation of any term of these Terms
- Your violation of any third-party right, including without limitation any copyright, property, or privacy right
- Any claim that your use caused damage to a third party

## Privacy

Your privacy is important to us. Please review our **Privacy Policy**, which also governs your use of the Website, to understand our practices.

## Termination

We may **terminate or suspend your access** to the Website immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.

## Changes to Terms

We reserve the right, at our sole discretion, to **modify or replace these Terms** at any time without prior notice. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.

Your continued use of the Website after any changes constitutes **acceptance of the new Terms**.

## Governing Law

These Terms shall be interpreted and governed by the laws of our jurisdiction, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.

## Severability

If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.

## Contact Information

If you have any questions about these Terms, please contact us at **${SITE_CONFIG.author.email}**. Note that contacting us does not create any legal obligation on our part to respond or modify these terms.

## Limitation of Our Obligations

**⚠️ Important**: By using this Website, you acknowledge that:

- We have **no obligation** to monitor or moderate content
- We have **no obligation** to maintain the Website or keep it operational
- We have **no obligation** to provide support or assistance
- We reserve the right to **discontinue the Website** at any time without notice
- These Terms constitute the **entire agreement** between you and ganesshkumar.com

Your use of this Website is entirely **at your own risk and discretion**.
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
const termsHtmlContent = await processTermsContent();

const pageTitle = "Terms of Use | Ganessh Kumar";
const pageDescription = "Terms of Use for ganesshkumar.com - Guidelines for using our website content, including articles, code samples, and intellectual property policies.";
const canonicalUrl = `${SITE_CONFIG.url}/terms`;

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
    "terms of use",
    "terms of service",
    "website terms",
    "intellectual property",
    "code samples",
    "attribution",
    "acceptable use",
    "disclaimer"
  ],
  ldSchema,
});

// Component that receives the processed HTML as prop
interface TermsContentProps {
  htmlContent: string;
}

function TermsContent({ htmlContent }: TermsContentProps) {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Use</h1>
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

export default function TermsPage() {
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
          currentUrl="/terms"
        />
      }
      content={<TermsContent htmlContent={termsHtmlContent} />}
      footer={<Footer />}
      maxWidthClass="max-w-6xl"
    />
  );
}
