---
tags:
  - windows
  - command line
  - robocopy
  - data management
  - dos
  - powershell
published: true
date: 2020-09-02T19:00:42.836Z
title: Friendly reminder about robocopy
---

Recently I have been experimenting with my media servers at home, moving large numbers of files between servers on the same local network to test performance.

Initially I was using ctrl+c, ctrl+v to move files from place to place, but this tends to distort the files' metadata, especially if the source OS/filesystem differs from that of the destination (this claim needs fact-checking).

Today I learned about `robocopy`, a command-line tool (from DOS) for copying files from one place to another that allows for granular control over what metadata is copied with the files, and even allows you to watch a folder for changes.

### Syntax

```powershell
robocopy <source> <destination> [<file>[ ...]] [<options>]robocopy <source> <destination> [<file>[ ...]] [<options>]
```

### Simple Example

Copy all files from from `\\Share\Media\Photos` to `D:\Pictures` and preserve the directory structure, file attributes and timestamps:

```powershell
robocopy \\Share\Media\Photos D:\Pictures /copy:DAT /mt /z /mir /v /bytes
```

- `copy:DAT` - copy Data, Attributes, and Timestamps (but not Security, Owner, or Audit information)
- `mt` - spawn multiple threads to improve performance. The default is 8 threads.
- `/z` - Perform the copy in such a way that it can be resumed if canceled or if an error occurs.
- `/mir` - contraction of the `/e` and `/purge` flags. Deletes any files that exist in the destination that are not in the source, and copies files recursively, preserving the subdirectory structure of the source.
- `/v` - verbose output, printing one line per file
- `/bytes` - prints file size in bytes in output

## [robocopy Documentation (Microsoft)](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/robocopy)
