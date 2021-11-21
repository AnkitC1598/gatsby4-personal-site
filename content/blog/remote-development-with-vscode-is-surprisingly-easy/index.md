---
tags:
  - vscode
  - linux
published: true
date: 2020-10-07T23:04:39.110Z
title: Remote Development with VSCode is Surprisingly Easy
---

Today I decided to look into remote development again, after becoming frustrated with the amount of time I spend waiting for packages to install and build on my local machine.

I Bing'd up [this page](https://code.visualstudio.com/docs/remote/remote-overview), which has all the relevant information. Apparently you cannot use Windows as the remote dev server, but Ubuntu Server 20 is just fine. So within an hour I had an Ubuntu VM running on my ESXi host at home and was able to link it to my GitHub account during the install. From there, it was trivial to connect from my local machine and start cloning repositories.

Since the remote VM is running Linux there are a few caveats: namely, that you have to install `nvm` with `apt`, then install a specific version of `npm` before you can install and manage packages as expected.

Anyway, I'm happy to say that the remote VM is much faster than my local machine, and I'm hoping this will be viable as a part of my regular workflow going forward.
