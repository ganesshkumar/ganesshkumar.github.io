
import React, { ReactNode } from "react";

interface ResponsiveLayoutProps {
  nav?: ReactNode;
  hero?: ReactNode;
  content?: ReactNode;
  leftSidebar?: ReactNode;
  rightSidebar?: ReactNode;
  footer?: ReactNode;
  /**
   * Tailwind max-width class for the main container (e.g., 'max-w-screen-xl').
   * Default: 'max-w-screen-xl 2xl:max-w-screen-2xl'
   */
  maxWidthClass?: string;
  /**
   * Tailwind width class for sidebars (e.g., 'w-64'). Default: 'w-64'
   */
  sidebarWidthClass?: string;
  /**
   * If true, navbar will occupy 100% width (no max-width container)
   */
  navFullWidth?: boolean;
  /**
   * If true, main area will occupy 100% width (no max-width container)
   */
  mainFullWidth?: boolean;
  /**
   * If true, footer will occupy 100% width (no max-width container)
   */
  footerFullWidth?: boolean;
}

/**
 * ResponsiveLayout component
 *
 * Layout:
 *  - Top navbar (centered)
 *  - Hero/callout section (centered)
 *  - Main area: left sidebar | content | right sidebar (right sidebar empty by default)
 *  - Footer (optional)
 */
const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  nav,
  hero,
  content,
  leftSidebar,
  rightSidebar,
  footer,
  maxWidthClass = 'max-w-screen-lg',
  sidebarWidthClass = 'w-64',
  navFullWidth = false,
  mainFullWidth = false,
  footerFullWidth = false,
}) => {
  // Helper for container classes
  const containerClass = (fullWidth: boolean) =>
    fullWidth ? 'w-full' : `w-full ${maxWidthClass} mx-auto`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      {nav && (
        <nav className="w-full flex justify-center items-center py-4 bg-background z-10">
          <div className={containerClass(navFullWidth) + ' flex justify-center'}>{nav}</div>
        </nav>
      )}

      {/* Hero Section */}
      {hero && (
        <section className="w-full flex justify-center items-center bg-background">
          <div className={containerClass(mainFullWidth) + ' flex justify-center'}>{hero}</div>
        </section>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full flex justify-center items-stretch px-2 md:px-0">
        <div
          className={
            [
              'w-full flex flex-row gap-6 py-8',
              mainFullWidth ? '' : `${maxWidthClass} mx-auto`
            ].join(' ')
          }
        >
          {/* Left Sidebar (only render and allocate space if present) */}
          {leftSidebar && (
            <aside className={`hidden md:block ${sidebarWidthClass} flex-shrink-0`}>{leftSidebar}</aside>
          )}

          {/* Main Content - responsive max-widths */}
          <section
            className={
              [
                'flex-1 min-w-0',
                leftSidebar ? '' : 'md:ml-0',
                rightSidebar ? '' : 'md:mr-0',
                // Responsive max-widths for content area
                'sm:w-full',
                'md:w-full',
                'lg:max-w-screen-lg',
                'xl:max-w-screen-xl',
                '2xl:max-w-screen-2xl',
                '3xl:max-w-[1920px]'
              ].join(' ')
            }
          >
            {content}
          </section>

          {/* Right Sidebar (only render and allocate space if present) */}
          {rightSidebar && (
            <aside className={`hidden md:block ${sidebarWidthClass} flex-shrink-0`}>{rightSidebar}</aside>
          )}
        </div>
      </main>

      {/* Footer */}
      {footer && (
        <footer className="w-full flex justify-center items-center py-4 bg-background">
          <div className={containerClass(footerFullWidth) + ' flex justify-center'}>{footer}</div>
        </footer>
      )}
    </div>
  );
};

export default ResponsiveLayout;
