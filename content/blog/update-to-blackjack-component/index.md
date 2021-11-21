---
tags:
    - git
    - gatsby
    - blackjack
published: true
date: 2021-03-18T23:29:48.841Z
title: Update to blackjack component
---

Today I learned how to use git modules:

First you add the submodule reference to `.gitconfig` & `.gitmodules`:

`$ git submodule add <remote_url> <destination_folder>`

Then pull the submodule when it updates:

`$ git submodule update --remote --merge`

Incidentally, I am now using this method to make `codegard1/blackjack` a submodule of this site's repo. Consequently, I don't have to manually copy over the source code for blackjack to include it on this site anymore.
