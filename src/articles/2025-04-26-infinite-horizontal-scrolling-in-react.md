---
title: "Creating an Infinite Horizontal Scrolling Component in React with Framer Motion"
description: "Learn how to build a smooth, infinitely scrolling component from right to left using React and Framer Motion animations."
author: "Ganessh Kumar"
date: 2025-04-26
pubDate: 2025-04-26
modified_date: 2025-04-26
image:
  - url: /assets/images/2025-04-26-infinite-scroll/infinite-scroll-demo.png
  - alt: "Creating an Infinite Horizontal Scrolling Component in React with Framer Motion"
disqus: false
tags:
  - React
  - Framer Motion
  - Animation
  - Frontend
categories:
  - technology
thumbnail: banner/infinite-scroll-demo.jpeg
---

While redesigning the homepage of **ObsidianStats.com**, I stumbled upon a challenge. The "Trending Plugins" section with a bunch of cards was visually blending into the rest of the page. Similar card layouts were already used in other sections, and frankly, it started to feel repetitive.

I knew I needed something subtle but dynamic — something that draws the user's eye naturally without shouting for attention. I considered typical solutions like sliders, carousels, and even dynamic grids. But somehow, they either felt too cliché or disturbed the reading flow I had carefully built for the homepage.

That’s when the idea of an **infinite horizontal scroll** hit me.

---

## Why Infinite Scroll?

When you want a section to feel alive but not overpower the rest of the page, infinite scrolling is a magic trick. It makes content dynamic, yet lets the user focus on their own pace.

Plus, it's lightweight when done right. That was important because at ObsidianStats, I always try to keep loading times snappy.


---

## The fun part!
First, I needed the basics: a container that holds items in a straight horizontal line. Simple `flex` and `overflow: hidden` CSS did the trick:

```tsx
<div style={{ display: 'flex', overflow: 'hidden', whiteSpace: 'nowrap' }}>
  {/* Scrolling content */}
</div>
```

Then came the real fun part — animating the scroll.

Instead of complex timers, I used `useAnimationFrame` from Framer Motion. It updates smoothly every frame, keeping motion consistent even on low-end devices:

```tsx
const [offsetX, setOffsetX] = useState(0);
const speed = 0.05;

useAnimationFrame((_, delta) => {
  if (!isHovered) {
    setOffsetX((prev) => prev - delta * speed);
  }
});
```

You won't believe how much better it felt immediately — butter-smooth motion without any lag.


---

## Making It Loop Infinitely

One problem I faced initially was abrupt jumps when resetting scroll. It broke the immersion.

After few late-night experiments, I cracked it. By duplicating the list twice side by side, and translating it by the modulus of total width, I got a clean, continuous loop.

```tsx
const translateX = offsetX % totalContentWidth;
```

It felt like magic when I first saw it working properly — no stutter, no jarring jump.


---

## Hover to Pause

I realized some users might want to interact with a card (like clicking on a trending plugin). So I added hover detection to pause scrolling whenever needed:

```tsx
<div 
  onMouseEnter={() => setIsHovered(true)} 
  onMouseLeave={() => setIsHovered(false)}
>
  {/* Card Content */}
</div>
```

Simple touches like this made it feel much more thoughtful and polished.


---

## Full React Example

Putting everything together, here’s a clean reusable InfiniteScroll component:

```tsx
import { useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const InfiniteScroll = ({ items }: { items: string[] }) => {
  const [offsetX, setOffsetX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const speed = 0.05;
  const cardWidth = 200;
  const gap = 10;
  const totalWidth = items.length * (cardWidth + gap);

  useAnimationFrame((_, delta) => {
    if (!isHovered) {
      setOffsetX((prev) => prev - delta * speed);
    }
  });

  const translateX = offsetX % totalWidth;

  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
      <motion.div
        style={{
          display: "flex",
          gap: `${gap}px`,
          transform: `translateX(${translateX}px)`,
        }}
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              width: `${cardWidth}px`,
              height: "120px",
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteScroll;
```

After plugging it into ObsidianStats, the difference was immediately visible.

- The "Trending Plugins" section started drawing attention naturally.
- Users spent more time hovering and exploring.
- It added a living, breathing element to the otherwise static homepage.

And honestly, it became one of my favourite parts of the new design. A small animation that added a signature feel to the site, without me even planning for it initially.


---

Sometimes small UI touches make the biggest difference.

By building this lightweight infinite scroll with **Framer Motion**, I kept the homepage fast, smooth, and visually richer.

If you are working on any feature where you want to subtly highlight items — give this technique a try. You might be surprised at how big an impact such a tiny detail can make!

Thanks for reading, and stay tuned — next time I’ll share more behind-the-scenes stories and practical UI tips!

---

_What would you like me to cover next — marquee text, animated carousels, or maybe entrance animations? Tell me in the comments!_

