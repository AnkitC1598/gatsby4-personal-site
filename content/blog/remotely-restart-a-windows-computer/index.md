---
tags:
  - powershell
  - windows
published: true
date: 2020-11-30T15:40:35.835Z
title: Remotely Restart a Windows Computer
---

As I'm working from home now I often need to log in to my workstation at the office. Typically I use Remote Desktop over VPN to do this, but occasionally the remote PC does not respond. For whatever reason, restarting it tends to resolve the issue. But how do you restart a remote PC that does not respond to Remote Desktop?

First check to see whether any users are logged in on the remote workstation. The `Restart-Computer` cmdlet will not work unless there are no active user sessions.

```powershell
PS> query user /server:<host.domain.com>
```

If the result includes a list of active user sessions then they must be forcibly logged off before we can restart.

For each listed user session, force a logoff with the following command:

```powershell
PS> logoff <sessionID> /server:<host.domain.com>
```

If the result is "No User exists for \*" then it means there are no active sessions, and we can proceed with the restart:

```powershell
PS> Restart-Computer -ComputerName <host.domain.com> -Credential (Get-Credential)
```

If this command returns nothing then the restart was successful and we should now be able to log in with Remote Desktop.

If not, then there may be something else going on, but that is beyond the scope of this note.
