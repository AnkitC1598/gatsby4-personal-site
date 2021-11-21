---
tags:
  - powershell
  - teams
  - exchange
  - office365
published: true
date: 2020-04-27T20:08:43.043Z
title: Expose Shared Mailbox and Calendar for Teams
---

Teams in MS Teams are really just Office 365 Groups with some special resources attached. This is why you can create new Teams from existing Office 365 Groups. It is also why every Team has a shared mailbox and calendar, although these are hidden from Exchange clients (like Outlook) by default.

In order to expose the shared mailbox and calendar for a Team, you need to use PowerShell commands to change settings on the Team's underlying `UnifiedGroup` object.

The relevant setting is `HiddenFromExchangeClientsEnabled`

(_Note_: to do this, you probably need to be the Teams admin, and/or the Exchange admin for your tenant.)

## Steps

1. From PowerShell, connect to Exchange Online

```powershell
    Set-ExecutionPolicy RemoteSigned
    If ( $null -eq $UserCredential ) { $UserCredential = Get-Credential }
    $Session = New-PSSession -ConfigurationName Microsoft.Exchange -ConnectionUri https://outlook.office365.com/powershell-liveid/ -Credential $UserCredential -Authentication Basic -AllowRedirection
    Import-PSSession $Session -DisableNameChecking    Set-ExecutionPolicy RemoteSigned
    If ( $null -eq $UserCredential ) { $UserCredential = Get-Credential }
    $Session = New-PSSession -ConfigurationName Microsoft.Exchange -ConnectionUri https://outlook.office365.com/powershell-liveid/ -Credential $UserCredential -Authentication Basic -AllowRedirection
    Import-PSSession $Session -DisableNameChecking
```

2. Get the Team's `UnifiedGroup` object by its display name or alias

```powershell
$g = Get-UnifiedGroup "My Fun Team"
# or
$g = Get-UnifiedGroup myfunteam1
```

3. Set the `HiddenFromExchangeClientsEnabled` property to `$false`

```powershell
Set-UnifiedGroup $g.id -HiddenFromExchangeClientsEnabled:$false
```

4. You may also want to set the primary SMTP (email) address for the group, since its default, machine-generated default address may not be as human-friendly as you would prefer.

```powershell
Set-UnifiedGroup $g.id -PrimarySmtpAddress "funteam@mytenant.com"
```

5. Finally, if you want the mailbox to be able to receive mail from people outside the organization (e.g. clients, vendors, etc.) then you would also need to set the `RequireSenderauthenticationEnabled` property to `$false`. Note that this property is boolean, not a switch, so you do not put a colon between the property name and its value.

```powershell
Set-UnifiedGroup $g.id -RequireSenderAuthenticationEnabled $false
```

6. Don't forget to log out of the Remote PS Session when you're done:

```powershell
Exit-PSSession
```

Source: [Set-UnifiedGroup (Exchange PowerShell)](https://docs.microsoft.com/en-us/powershell/module/exchange/users-and-groups/set-unifiedgroup?view=exchange-ps)
