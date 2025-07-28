import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: "https://github.com/ganesshkumar",
      icon: Github,
      label: "GitHub"
    },
    {
      href: "https://linkedin.com/in/ganessh-kumar-r-p-676a4719/",
      icon: Linkedin,
      label: "LinkedIn"
    },
    {
      href: "https://twitter.com/ganesshkumar",
      icon: Twitter,
      label: "Twitter"
    },
    {
      href: "mailto:rpganesshkumar@gmail.com",
      icon: Mail,
      label: "Email"
    }
  ];

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/articles", label: "Articles" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" }
  ];

  const categories = [
    { href: "/articles?category=tech", label: "Tech" },
    { href: "/articles?category=programming", label: "Programming" },
    { href: "/articles?category=tutorials", label: "Tutorials" },
    { href: "/articles?category=reviews", label: "Reviews" }
  ];

  return (
    <div className="rounded-t-lg border-t border-x-0 border-b-0 bg-background/50 backdrop-blur-sm">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-8">
        {/* About Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-foreground">Ganessh Kumar</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Full-stack developer passionate about technology, programming, and sharing knowledge through articles and open-source projects.
          </p>
          {/* Social Links */}
          <div className="flex space-x-2">
            {socialLinks.map((social) => (
              <Button
                key={social.label}
                variant="ghost"
                size="sm"
                asChild
                className="p-2 h-9 w-9"
              >
                <Link 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-foreground">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Button variant="ghost" size="sm" asChild className="h-auto p-0 justify-start">
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-foreground">Categories</h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.href}>
                <Button variant="ghost" size="sm" asChild className="h-auto p-0 justify-start">
                  <Link 
                    href={category.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {category.label}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter/Contact */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-foreground">Get in Touch</h3>
          <p className="text-sm text-muted-foreground">
            Have a question or want to collaborate? Feel free to reach out!
          </p>
          <Button asChild className="w-full">
            <Link href="mailto:rpganesshkumar@gmail.com">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Link>
          </Button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="pt-6 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>© 2013-{currentYear} Ganessh Kumar.</span>
          </div>
          
          <div className="flex space-x-4 text-sm">
            <Button variant="ghost" size="sm" asChild className="h-auto p-0">
              <Link 
                href="https://codebuss.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                CodeBuss
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="h-auto p-0">
              <Link 
                href="https://www.obsidianstats.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ObsidianStats
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="h-auto p-0">
              <Link 
                href="/privacy" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="h-auto p-0">
              <Link 
                href="/terms" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Use
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
