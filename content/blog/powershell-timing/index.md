---
tags:
  - powershell
published: true
date: 2020-04-23T14:54:32.556Z
title: PowerShell Timing
---

Recently I learned how to use timers in PowerShell scripts to track how long an operation is taking. I've started adding the below snippet to all of my long-running scripts so that when they've finished I can get a sense of how long it actually took.

The snippet has two parts:

1. Start the timer
2. Stop the timer and report on the duration

```powershell
# Start the Timer
[DateTime]$ScriptStartTime = Get-Date

# Do stuff (script body)

<#
    Chris's Fun End-of-Script Timing Snippet
#>
$ScriptEndTime = Get-Date
$ScriptDuration = New-TimeSpan -Start $ScriptStartTime -End $ScriptEndTime
Write-Host @"
Start Time: $($ScriptStartTime.ToShortDateString()) $($ScriptStartTime.ToShortTimeString())
End Time: $($ScriptEndTime.ToShortDateString()) $($ScriptEndTime.ToShortTimeString())
Total Seconds: $($ScriptDuration.TotalSeconds)
Total Minutes: $($ScriptDuration.Totalminutes)
Total Hours: $($ScriptDuration.TotalHours)
"@ -ForegroundColor Magenta
```
