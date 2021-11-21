---
tags:
  - powershell
  - linux
  - ubuntu
  - vscode
  - snippet
published: true
date: 2020-12-08T22:50:43.214Z
title: Install PowerShell on Ubuntu 20.04
---

I wanted to install PowerShell on my remote\* development server, which runs Ubuntu, so I can do all my dev work in the same environment. Since PowerShell is supported on all platforms now, that should be fairly simple.

The following snippet is clipped from the below page:

<https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-linux?view=powershell-7.1#ubuntu-2004>

## Installation via Package Repository - Ubuntu 20.04

```shell
# Update the list of packages
sudo apt-get update
# Install pre-requisite packages.
sudo apt-get install -y wget apt-transport-https
# Download the Microsoft repository GPG keys
wget -q https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb
# Register the Microsoft repository GPG keys
sudo dpkg -i packages-microsoft-prod.deb
# Update the list of products
sudo apt-get update
# Enable the "universe" repositories
sudo add-apt-repository universe
# Install PowerShell
sudo apt-get install -y powershell
# Start PowerShell
pwsh
```

As superuser, register the Microsoft repository once. After registration, you can update PowerShell with `sudo apt-get install powershell`.

---

\* I say "remote" but it's actually just down the hall from my bedroom.
