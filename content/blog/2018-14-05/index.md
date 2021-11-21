---
title: "My second blog post"
tags: ["powershell"]
published: true
date: "2018-05-14"
---

Today I made some major changes to the content of the home page. It's been the same for several years and, while I'd like to make it a little more stupendous, I have not yet been able to find the time for it.

Meanwhile, I have been doing lots of interesting things with SharePoint and PowerShell, and writing a ton of literature and scripts to help my own learning. I would like to start posting some of those here, as as a way to help others learn and also pad out this site, which is painfully thin on content.

One thing I learned today is that, when you are referencing SharePoint List items in PowerShell, you use brackets to get the item's properties, and name each column by its \`DisplayName\`.

For example:

```powershell
$web = Get-SPWeb "chris.com/projects"
$list = $web.Lists[ "Cool List" ]

$item = $list.Items[ 0 ]

Write-Host $item[ 'Modified' ]
```
