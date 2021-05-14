---
title: "Adding MSL Shell to Windows Terminal"
description: "Adding MSL Shell to Windows Terminal"
date: '2019/08/07'
modified_date: '2019/08/07'
image: /assets/images/posts/random-img.jpg
disqus: true
tags:
  - windows
  - windows-terminal
categories:
  - productivity
---

After installing any flavors of Linux using Windows Subsystem for Linux, WSL, on Windows 10, you open Microsoft's latest Windows Terminal and do not find your linux shell in it? 

Then this guide is for you.

* Make sure you have installed your desired version of Linux from the Windows Store.

![Ubuntu-18.04](@@baseUrl@@/assets/images/2019-08-14-adding-msl-tab-to-windows-terminal/ubuntu.png)

* In Windows Terminal click the dropdown icon and select settings. Alternatively, you can open it with `Ctrl + ,` shortcut.
This will open `profiles.json` file in your text editor

![Terminal](@@baseUrl@@/assets/images/2019-08-14-adding-msl-tab-to-windows-terminal/terminal.png)

* In the profiles.json file, find the `profiles` section. profiles is an array where each element in the array maps to a shell (powershell or cmd or any linux shell)
```json
    "profiles" : 
    [
        {
            "acrylicOpacity" : 0.5,
            "background" : "#012456",
            "closeOnExit" : true,
            "colorScheme" : "Campbell",
            "commandline" : "powershell.exe",
            "cursorColor" : "#FFFFFF",
            "cursorShape" : "bar",
            "fontFace" : "Consolas",
            "fontSize" : 10,
            "guid" : "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
            "historySize" : 9001,
            "icon" : "ms-appx:///ProfileIcons/{61c54bbd-c2c6-5271-96e7-009a87ff44bf}.png",
            "name" : "Windows PowerShell",
            "padding" : "0, 0, 0, 0",
            "snapOnInput" : true,
            "startingDirectory" : "%USERPROFILE%",
            "useAcrylic" : false
        },
        {
            "acrylicOpacity" : 0.75,
            "closeOnExit" : true,
            "colorScheme" : "Campbell",
            "commandline" : "cmd.exe",
            "cursorColor" : "#FFFFFF",
            "cursorShape" : "bar",
            "fontFace" : "Consolas",
            "fontSize" : 10,
            "guid" : "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
            "historySize" : 9001,
            "icon" : "ms-appx:///ProfileIcons/{0caa0dad-35be-5f56-a8ff-afceeeaa6101}.png",
            "name" : "cmd",
            "padding" : "0, 0, 0, 0",
            "snapOnInput" : true,
            "startingDirectory" : "%USERPROFILE%",
            "useAcrylic" : true
        }
    ],
```

* Add an entry in this array for your linux shell. To populate this, you need the following values
   * Command to start your shell
     * To get list of WSL shells run the command `wsl.exe --list`
     * To start a particular WSL shell run `wsl.exe -d <shell_name_from_above>`
     * To set the home directory as default directory add `~` to the wsl.exe command
     * Our command to start Ubuntu-18.04 is `wsl.exe ~ -d Ubuntu-18.04`
   * A new GUID (unique id in this array)
     * A random GUID can be generated from the linux shell by running `uuidgen` command
     * Replace `<guid>` in the below snippet with your new GUID (leave the paranthesis intact)
   * Name and icon for the entry
     * Give an identifiable name like `Ubuntu-18.04`
     * For icon, you can give any file system path in the system. I am opting to use the default linux penguine logo that has been packaged along with the Windows Terminal. Hence, I set `ms-appx:///ProfileIcons/{9acb9455-ca41-5af7-950f-6bca1bc9722f}.png` as my icon path.

```json
        {
            "acrylicOpacity":0.75,
            "closeOnExit":true,
            "colorScheme":"Campbell",
            "commandline":"wsl.exe ~ -d Ubuntu-18.04",
            "cursorColor":"#FFFFFF",
            "cursorShape":"bar",
            "fontFace":"Consolas",
            "fontSize":12,
            "guid":"{<guid>}",
            "historySize":9001,
            "icon" : "ms-appx:///ProfileIcons/{9acb9455-ca41-5af7-950f-6bca1bc9722f}.png",
            "name":"Ubuntu-18.04",
            "padding":"0, 0, 0, 0",
            "snapOnInput":true,
            "startingDirectory":"%USERPROFILE%",
            "useAcrylic":true
        }

```
* As soon as you save the `profiles.json` file, the changes will be picked up by the Windows Terminal and you can see your WSL shell.

![Ubuntu in Terminal](@@baseUrl@@/assets/images/2019-08-14-adding-msl-tab-to-windows-terminal/ubuntu-terminal.png)

* Start a shell and start configuring it. I have configure my shell to be `zsh` shell with `oh-my-zsh` extension.

![Zsh in Terminal](@@baseUrl@@/assets/images/2019-08-14-adding-msl-tab-to-windows-terminal/zsh-terminal.png)