'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useForm, ValidationError } from '@formspree/react';
import { Mail } from 'lucide-react';

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
            Your message has been sent successfully. I'll get back to you soon!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Send me a message</CardTitle>
        <CardDescription>
          Fill out the form below and I'll get back to you as soon as possible.
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

export default ContactForm;
