'use client';

import { useEffect, useRef } from "react";

const RightSidebarSquareDisplayAd = () => {
  const adRef = useRef<HTMLModElement>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    const loadAd = () => {
      // Prevent multiple initializations for this specific ad instance
      if (isInitializedRef.current || !adRef.current) return;
      
      try {
        // Check if AdSense script is loaded
        // @ts-expect-error AdSense global type is not defined in TS
        if (typeof window.adsbygoogle !== 'undefined') {
          // Each ad instance can safely call push() - AdSense handles multiple calls
          // @ts-expect-error AdSense global type is not defined in TS
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          isInitializedRef.current = true;
        } else {
          // If AdSense script is not loaded yet, try again after a short delay
          setTimeout(loadAd, 100);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Adsense error", e);
      }
    };

    // Small delay to ensure the component is mounted
    const timer = setTimeout(loadAd, 100);
    
    return () => {
      clearTimeout(timer);
      // Reset only this instance's initialization state
      isInitializedRef.current = false;
    };
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-3836620974568941"
      data-ad-slot="6801319201"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default RightSidebarSquareDisplayAd;
