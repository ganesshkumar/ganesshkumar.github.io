---
date: 2014/01/02 00:00:00 +05:30
title: Installing Dropbox From Source Code
layout: post
disqus: true
tags:
  - linux
  - dropbox
  - installation
categories:
  - computer
  - software
  - dropbox
---


If you are installing Dropbox from source code, you must have read this [help page](https://www.dropbox.com/help/247/en). It is not a detailed documentation. You might run into few well known issues.

From my experience of installing Dropbox on Arch Linux,

*  Download the source code from [official repository](https://www.dropbox.com/download?dl=packages/nautilus-dropbox-1.4.0.tar.bz2)
*  Extract the tarball
  `tar xvjf ./nautilus-dropbox-1.4.0.tar.bz2`
*  Switch your working directory to the extracted source code directory  
  `cd ./nautilus-dropbox-1.4.0`
*  Make sure that you are using python2(docgen.py uses execfile() function which is deprecated in python3). Dropbox installation is not supported by python3
*  Run `./configure`
*  Copy the dropbox.in file to dropbox  
   `cp dropbox.in dropbox`  
   We do this because, when you execute `make`, docgen.py will depend on a file named "dropbox" but it is present as "dropbox.in" in the source code
*  Run `make`
*  When I ran make I ran into another error from "dropbox" file. Around line 285  
    box_logo_pixbuf = @IMAGEDATA64@  
    window_icon = @IMAGEDATA16@  
   it was not able to resolve @IMAGEDATA64@ and @IMAGEDATA16@ but as these are just icon and logo images I commented out these lines.
*  Run `make install`

Have fun with Dropbox :)
