---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Installing Jupyter in WSL"
description: "Learn how to enable WSL, install a Linux distribution, and set up Jupyter Notebook on your Windows machine with this step-by-step guide."
author: "Ganessh Kumar"
date: 2024-04-05
pubDate: 2024-04-05
modified_date: 2024-04-05
image:
    url: /assets/images/posts/random-img.jpg
    alt: "Installing Jupyter in WSL"
disqus: false
tags:
  - python
  - jupyter
  - wsl
categories:
  - programming
thumbnail: banner/learn-unlearn-relearn.jpeg
---

### 1: Enable WSL and Install a Linux Distribution

First, ensure WSL is enabled on your Windows machine. This feature lets you run a Linux distribution alongside your Windows system. Follow [Microsoft's instructions](https://learn.microsoft.com/en-us/windows/wsl/install) to enable it. Head to the Microsoft Store and install a Linux distribution, like Ubuntu. You're free to choose any that fits your requirements.

### 2: Update and Upgrade

After installing Linux, open the terminal and run these commands to update your system:

```bash
sudo apt update
sudo apt upgrade
```

### 3: Install Python
Python isn't pre-installed with WSL, so let's fix that. Use this command to install Python and pip:

```bash
sudo apt install python3 python3-pip
```

### 4: Install Jupyter

Next, install Jupyter using pip:

```bash
pip3 install jupyter
```

### 5: Set Up an Alias
Make launching Jupyter Notebook easier by setting up an alias. Run this command:

```bash
echo 'alias jupyter-notebook="~/.local/bin/jupyter-notebook --no-browser"' >> ~/.bashrc
```

### 6: Start Jupyter Notebook
Now, start Jupyter Notebook:

```bash
jupyter-notebook
```

### Authentication

When you run it for the first time, you'll see a login screen. Head back to your WSL terminal, use the token provided to set your password.

### Explore Jupyter Paths
To explore where Jupyter stores its configuration files and data, run the following command:

```bash
~/.local/bin/jupyter --path
```

And that's it! With these straightforward steps, you can integrate Jupyter Notebook into their Windows environment using Windows Subsystem for Linux (WSL). Happy coding!
