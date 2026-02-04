---
title: "Clean Obsidian Vault: OneDrive Sync Conflicts and Orphaned Plugins"
description: "OneDrive sync creates conflict files in Obsidian. Uninstalled plugins leave empty folders behind. Two Node.js scripts to automate the cleanup."
author: "Ganessh Kumar"
date: 2026-02-04
pubDate: 2026-02-04
modified_date: 2026-02-04
image:
    url: /assets/images/2026-02-04-clean-obsidian-vault/clean-obsidian-vault.webp
    alt: "Obsidian vault cleanup script for OneDrive sync conflicts"
disqus: true
tags:
  - obsidian
  - nodejs
  - onedrive
  - automation
  - vault-maintenance
categories:
  - technology
  - development
  - tips
coverImage: /assets/images/2026-02-04-clean-obsidian-vault/clean-obsidian-vault.webp
---

I sync my Obsidian vault with OneDrive. I have my work laptop, Surface at home and sometimes my desktop. All of them need access to the same notes. OneDrive handles the sync but it has no idea that Obsidian is running on these machines. When two devices write to the same config file before sync completes, OneDrive creates a conflict copy.

After few months my `.obsidian` folder was full of files like `community-plugins (SurfaceBook's conflicted copy 2025-12-15).json` and `workspace (Desktop's conflicted copy 2026-01-03).json`. Not harmful but annoying to look at.

The plugins folder had another issue. I install and try many Obsidian plugins. Most of them I remove after few days. But when I uninstall a plugin from Obsidian settings, the folder sometimes stays. Files inside get deleted but the empty folder remains. Obsidian removes the plugin from `community-plugins.json` but doesn't clean up the directory properly.

Got tired of deleting these manually. Wrote two simple Node.js scripts to do it for me.

---

## Orphaned plugin folders in Obsidian

When you uninstall an Obsidian plugin it gets removed from `community-plugins.json`. This file tracks which plugins are installed. The plugin folder in `.obsidian/plugins/` should also get deleted but sometimes it doesn't. In my vault the files inside would disappear but the folder stayed empty. I had a plugins directory full of ghost folders from plugins I removed months ago.

Checking each folder name against the installed list manually is boring. A script can do it in seconds.

---

## Script to cleanup orphaned plugins

```javascript
const fs = require('fs');
const path = require('path');

// Paths
const OBSIDIAN_PATH = path.join(process.cwd(), '.obsidian');
const PLUGINS_PATH = path.join(OBSIDIAN_PATH, 'plugins');
const COMMUNITY_PLUGINS_PATH = path.join(OBSIDIAN_PATH, 'community-plugins.json');

/**
 * Get list of installed plugins from community-plugins.json
 */
function getInstalledPlugins() {
    if (!fs.existsSync(COMMUNITY_PLUGINS_PATH)) {
        console.log('community-plugins.json not found. Assuming no plugins are installed.');
        return [];
    }

    const content = fs.readFileSync(COMMUNITY_PLUGINS_PATH, 'utf8');
    return JSON.parse(content);
}

/**
 * Get list of all plugin folders in .obsidian/plugins
 */
function getPluginFolders() {
    if (!fs.existsSync(PLUGINS_PATH)) {
        return [];
    }

    return fs.readdirSync(PLUGINS_PATH, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}

/**
 * Find orphaned plugin folders that are not in the installed list
 */
function findOrphanedPlugins() {
    const installedPlugins = getInstalledPlugins();
    const pluginFolders = getPluginFolders();

    return pluginFolders.filter(folder => !installedPlugins.includes(folder));
}

/**
 * Delete a single plugin folder by pluginId
 */
function cleanupPlugin(pluginId) {
    const pluginPath = path.join(PLUGINS_PATH, pluginId);

    if (!fs.existsSync(pluginPath)) {
        console.log(`Plugin folder not found: ${pluginId}`);
        return false;
    }

    fs.rmSync(pluginPath, { recursive: true, force: true });
    console.log(`Removed: ${pluginId}`);
    return true;
}

/**
 * Main function
 */
function main() {
    console.log('Scanning for orphaned plugins...\n');

    if (!fs.existsSync(PLUGINS_PATH)) {
        console.log('Plugins folder not found:', PLUGINS_PATH);
        return;
    }

    const orphanedPlugins = findOrphanedPlugins();

    if (orphanedPlugins.length === 0) {
        console.log('No orphaned plugin folders found. Everything is clean!');
        return;
    }

    console.log('Orphaned plugins to remove:', orphanedPlugins);
    console.log('');

    for (const pluginId of orphanedPlugins) {
        cleanupPlugin(pluginId);
    }

    console.log('\nCleanup complete!');
}

main();
```

The script reads `community-plugins.json` to get installed plugins list. Then it compares with actual folders in `.obsidian/plugins/`. Any folder not in the JSON file gets deleted.

| Function | What it does |
| --- | --- |
| `getInstalledPlugins()` | Reads `community-plugins.json` |
| `getPluginFolders()` | Lists all folders in plugins directory |
| `findOrphanedPlugins()` | Finds folders not in installed list |
| `cleanupPlugin(pluginId)` | Deletes one plugin folder |
| `main()` | Runs the cleanup |

---

## OneDrive sync conflict files in Obsidian

This is the OneDrive sync tax. I open Obsidian on work laptop. It writes to `workspace.json` to save open files. One hour later I open Obsidian on Surface at home. OneDrive sync hasn't completed yet. Both devices wrote to same file and OneDrive doesn't know which to keep. So it keeps both. Original file gets the latest write and older version becomes `workspace (SurfaceBook's conflicted copy 2026-01-15).json`.

These conflict files keep piling up. They are not dangerous but they are noise. Sometimes if conflict happens on `community-plugins.json` it can cause confusion about which plugins are installed. Cleaning them regularly keeps the vault tidy.

---

## Script to delete sync conflict files

```javascript
const fs = require('fs');
const path = require('path');

// Paths
const OBSIDIAN_PATH = path.join(process.cwd(), '.obsidian');

/**
 * Recursively find all files with "conflict" in their name
 */
function findConflictFiles(dir) {
    const conflictFiles = [];

    if (!fs.existsSync(dir)) {
        return conflictFiles;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            conflictFiles.push(...findConflictFiles(fullPath));
        } else if (entry.name.toLowerCase().includes('conflict')) {
            conflictFiles.push(fullPath);
        }
    }

    return conflictFiles;
}

/**
 * Delete a single conflict file
 */
function deleteConflictFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return false;
    }

    fs.rmSync(filePath);
    console.log(`Removed: ${path.relative(OBSIDIAN_PATH, filePath)}`);
    return true;
}

/**
 * Main function
 */
function main() {
    console.log('Scanning for conflict files in .obsidian...\n');

    if (!fs.existsSync(OBSIDIAN_PATH)) {
        console.log('.obsidian folder not found:', OBSIDIAN_PATH);
        return;
    }

    const conflictFiles = findConflictFiles(OBSIDIAN_PATH);

    if (conflictFiles.length === 0) {
        console.log('No conflict files found. Everything is clean!');
        return;
    }

    console.log(`Found ${conflictFiles.length} conflict file(s):\n`);

    for (const filePath of conflictFiles) {
        deleteConflictFile(filePath);
    }

    console.log('\nCleanup complete!');
}

main();
```

This script searches through `.obsidian` folder recursively and finds any file with 'conflict' in its name. Then deletes each one. The recursive search catches conflict files inside plugin folders and theme directories too.

---

## How to run the cleanup scripts

Put both scripts in a maintenance folder in your vault. I keep them in `95 maintainence/` so they stay at the end of my folder list.

Run from vault root directory:

```bash
node "95 maintainence/cleanup-plugins.js"
node "95 maintainence/cleanup-conflicts.js"
```

Scripts use `process.cwd()` to find `.obsidian` relative to where you run the command. So run them from vault root not from inside the maintenance folder.

---

## Is it safe?

Both scripts only touch files inside `.obsidian`. Your notes and attachments are not touched. Plugin cleanup only removes folders that are not in your installed plugins list. Conflict cleanup only removes files with 'conflict' in filename which is the pattern sync services use.

But always have a backup. These scripts delete files permanently. If you are not sure comment out the `fs.rmSync` lines and run the scripts first. You will see what they would delete without actually deleting.

---

## Commands to remember

```bash
# cleanup orphaned plugins
node "95 maintainence/cleanup-plugins.js"

# cleanup sync conflict files
node "95 maintainence/cleanup-conflicts.js"
```

You can create a shell alias to run both:

```bash
alias vault-cleanup='node "95 maintainence/cleanup-plugins.js" && node "95 maintainence/cleanup-conflicts.js"'
```

---

A clean vault is a fast vault. These scripts take few seconds to run and can save you from megabytes of dead plugin folders and confusing conflict files. Run them once in a while or set up a scheduled task to run automatically. Your `.obsidian` folder will be much cleaner.
