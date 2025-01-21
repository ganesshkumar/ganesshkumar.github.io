---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Git Submodules Cheat Sheet"
description: "A concise, experience-based cheat sheet for managing Git submodules—covering everything from adding and cloning to updating and removing."
author: "Ganessh Kumar"
date: 2025-01-15
pubDate: 2025-01-15
modified_date: 2025-01-15
image:
    url: /assets/images/2025-01-15-git-submodules-cheatsheet/submodules.png
    alt: "Git Submodules Cheat Sheet"
disqus: false
tags:
  - git
  - version control
categories:
  - technology
thumbnail: banner/git-submodules.jpeg
---


Git submodules let you include an entire Git repository inside another one as a subdirectory. They’re handy when you want to keep related projects organized but still separate. From my experience, I am putting up this set of commands for managing submodules in your workflow.

## **Adding a Submodule to an Existing Repository**
If you already have a main repository and want to bring in a new submodule, follow these steps:
```bash
cd /path/to/main-repo
git submodule add <repository-url> <submodule-path>
git add .gitmodules <submodule-path>
git commit -m "Added submodule <name>"
```
This adds the submodule to your main repo, and commits the necessary files so everything is tracked properly.

## **Cloning a Repository with Submodules**
When you clone a project that uses submodules, you can automatically pull them in like this:
```bash
git clone --recurse-submodules <repository-url>
```

## **Initializing and Updating Submodules After Cloning**
If you’ve already cloned the main repository but didn’t bring along the submodules, run:
```bash
git submodule init
git submodule update
```
This sets up your submodules locally and fetches their content.

## **Updating Submodules to Latest Changes**
To ensure your submodule is up to date with changes from its original repository:
```bash
cd <submodule-path>
git pull origin <branch>
cd ..
git add <submodule-path>
git commit -m "Updated submodule <name>"
```
Then your main repository will reflect the newest state of your submodule.

## **Updating All Submodules**
If you’ve got multiple submodules and want them all up to date, this command is a timesaver:
```bash
git submodule update --remote
git add <submodule-path>
git commit -m "Updated all submodules"
```

## **Pushing Changes in a Submodule**
When you make changes within a submodule, you have to commit and push in two places: inside the submodule itself, then in the main repository to record the updated reference.
```bash
cd <submodule-path>
git add <files>
git commit -m "Your message"
git push origin <branch>
cd ..
git add <submodule-path>
git commit -m "Updated submodule reference"
git push origin <branch>
```

## **Removing a Submodule**
If you no longer need a submodule, use these steps to remove it cleanly:
```bash
git config -f .gitmodules --remove-section submodule.<submodule-path>
git rm -r <submodule-path>
git config --remove-section submodule.<submodule-path>
git commit -m "Removed submodule <name>"
rm -rf .git/modules/<submodule-path>
```

## **Checking Submodule Status**
Need a quick look at the state of your submodules? Just run:
```bash
git submodule status
```

## **Running Commands in All Submodules**
If you want to run the same command in every submodule, this is your friend:
```bash
git submodule foreach <command>
```

## **Fetching and Merging Changes from Submodules**
To grab the latest changes and merge them directly into your local submodule:
```bash
cd <submodule-path>
git fetch origin
git merge origin/<branch>
cd ..
git add <submodule-path>
git commit -m "Merged changes from submodule"
```

## **Reinitializing Submodules**
Should you ever need to start fresh (for example, if something got messed up in your local submodule config):
```bash
git submodule deinit -f <submodule-path>
git submodule update --init
```

## **Cloning and Automatically Initializing Submodules**
If you haven’t yet cloned the main repository, you can grab everything in one line:
```bash
git clone --recurse-submodules <repository-url>
```

## **Pulling Changes and Updating Submodules Automatically**
To fetch updates from your main repo and submodules together:
```bash
git pull --recurse-submodules
```

## **Untracking a Submodule Without Deleting Files**
If you want to stop tracking the submodule in Git but keep its actual files locally:
```bash
git rm --cached <submodule-path>
```

Happy coding!