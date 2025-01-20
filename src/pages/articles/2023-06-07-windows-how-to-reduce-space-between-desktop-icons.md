---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Windows - How to Reduce Space Between Desktop Icons"
description: "Adjust Windows desktop icon spacing for a compact layout by tweaking registry settings. Follow this guide to reduce gaps and improve desktop organization."
author: Ganessh Kumar
pubDate: 2023-06-07
date: 2023-06-07
modified_date: 2023-06-07
image: 
disqus: false
tags:
  - desktop-icons
  - troubleshooting
  - Windows
categories:
  - technology
  - tutorials
---

Have you ever encountered the issue of having too much space between your desktop icons? Despite your attempts to drag and drop the icons, they stubbornly remain far apart from each other. In this article, we will explore a solution to remove the wide space between icons on your desktop. If you're tired of the excessive gaps, read on to find out how you can achieve a more compact and visually pleasing layout.

## Modifying Registry Settings

Modifying the registry settings can provide more control over the spacing between desktop icons. Please note that editing the registry should be approached with caution and is recommended for advanced users. Follow these steps:

1. Press the Windows key on your keyboard and type "regedit" in the taskbar search.
2. Open the "Registry Editor" from the search results.
3. Navigate to the following path: `HKEY_CURRENT_USER\Control Panel\Desktop\WindowMetrics`.
4. Locate the values "IconSpacing" and "IconVerticalSpacing."
    - **IconSpacing**: Controls the horizontal spacing between icons.
    - **IconVerticalSpacing**: Controls the vertical spacing between icons.
5. Double-click on each value to modify them.
6. Set the values to `-1125` (minus one thousand one hundred twenty-five) for both "IconSpacing" and "IconVerticalSpacing."
7. Click "OK" to save the changes.

After modifying the registry settings, you need to log out of your account and log in again for the changes to take effect. Once you log back in, the wide space between your desktop icons should be significantly reduced, creating a more compact and visually appealing arrangement.

## Important Reminder

Before proceeding with any changes to the registry, it is crucial to exercise caution. Modifying the registry incorrectly can lead to serious system problems. Therefore, it is recommended to back up the registry or create a system restore point before making any modifications. This precautionary measure ensures that you can restore the registry if any unexpected issues occur.


By following the method outlined in this article, you can regain control over the spacing between your desktop icons.