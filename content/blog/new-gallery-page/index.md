---
tags:
    - react
    - gatsby
    - fluentui
published: true
date: 2021-09-13T11:18:28.811Z
title: New Gallery Page Added
---

I wanted to see if I could achieve some independence by self-hosting my Instagram profile.

Hence the [Gallery Page](/gallery), which uses the Fluent UI List control to display a number of images stored in Azure. The storage cost for less than one hundred images that are accessed as infrequently as these is basically nil, so this is an effective "backup" solution.

Gatsby-image-sharp has a variety of features that make it possible to generate thumbnails with arbitrary dimensions and modifications, so it is ideal for this kind of application.

I also extracted the gallery into a separate gatsby-based project and dockerized it. That can be found on Github here: https://github.com/codegard1/imagal3
