'use client';

import React from 'react';
import ResponsiveLayout from '@/components/ResponsiveLayout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NAVIGATION_LINKS, SITE_CONFIG } from '@/lib/constants';
import { Mail, MapPin, Clock } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import SocialLinks from '@/components/SocialLinks';

const ContactForm: React.FC = () => {
  const [state, handleSubmit] = useForm("myzpwegv"); // Replace with your actual form ID

  if (state.succeeded) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center py-8">
          <div className="mb-4">
            <Mail className="w-16 h-16 mx-auto text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Thank you!</h3>
          <p className="text-muted-foreground">
            Your message has been sent successfully. I&apos;ll get back to you soon!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Send me a message</CardTitle>
        <CardDescription>
          Fill out the form below and I&apos;ll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none"
                placeholder="Your full name"
              />
              <ValidationError 
                prefix="Name" 
                field="name"
                errors={state.errors}
                className="text-sm text-red-600 mt-1"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address *
              </label>
              <input
                id="email"
                type="email" 
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none"
                placeholder="your.email@example.com"
              />
              <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
                className="text-sm text-red-600 mt-1"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none"
              placeholder="What's this about?"
            />
            <ValidationError 
              prefix="Subject" 
              field="subject"
              errors={state.errors}
              className="text-sm text-red-600 mt-1"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none resize-vertical"
              placeholder="Tell me about your project, question, or just say hello!"
            />
            <ValidationError 
              prefix="Message" 
              field="message"
              errors={state.errors}
              className="text-sm text-red-600 mt-1"
            />
          </div>

          <Button 
            type="submit" 
            disabled={state.submitting}
            className="w-full md:w-auto"
          >
            {state.submitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const ContactPage: React.FC = () => {
  const content = (
    <div className="py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Get in <span className="text-primary">Touch</span>
        </h1>
        <p className="text-lg text-muted-foreground ">
          Have a project in mind, a question to ask, or just want to say hello? 
          I&apos;d love to hear from you. Welcome to give feedback or ask questions. 
          Let&apos;s start a conversation!
        </p>
      </div>

      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact Info Cards */}
          <Card>
            <CardContent className="text-center py-6">
              <Mail className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">
                {SITE_CONFIG.author.email}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="text-center py-6">
              <MapPin className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-sm text-muted-foreground">
                Remote & Flexible
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="text-center py-6">
              <Clock className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Response Time</h3>
              <p className="text-sm text-muted-foreground">
                Within 24 hours
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Form */}
      <ContactForm />

      {/* Social Links */}
      <SocialLinks title="Connect with me" className="mt-12 text-center flex flex-col items-center" />
    </div>
  );

  return (
    <ResponsiveLayout
      nav={<Navbar links={NAVIGATION_LINKS} />}
      content={content}
      footer={<Footer />}
    />
  );
};

export default ContactPage;
