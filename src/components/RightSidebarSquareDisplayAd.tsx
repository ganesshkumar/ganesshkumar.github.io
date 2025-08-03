'use client';

import { useEffect } from "react";

const RightSidebarSquareDisplayAd = () => {
  useEffect(() => {
    try {
      // Tells AdSense to re-scan for ads
      // @ts-expect-error AdSense global type is not defined in TS
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Adsense error", e);
    }
  }, []);

  return (
    <ins
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
