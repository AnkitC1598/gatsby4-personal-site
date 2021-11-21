---
title: "Configuring Office Online Server with SharePoint 2016"
tags: ["powershell", "sharepoint"]
published: true
date: "2021-10-18"
---

# Gist

This page includes notes about the installation and setup of Office Online Server

# What is OOS?

Office Online Server, formerly known as Office Web Apps Server, provides the ability to view and edit Office files in the browser using Skype for Business, Exchange, and SharePoint on premises. Basically the same functionality you get with Office 365. Full details can be found [here](https://blogs.office.com/2016/05/04/office-online-server-now-available/).

# How to get the installer package

The first step is to log into your Volume Licensing Service Center (VLSC) and go to the [Downloads and Keys section](https://www.microsoft.com/Licensing/servicecenter/Downloads/DownloadsandKeys.aspx). If you do not have access to the VLSC, ask for permissions from someone who does in your organization. Note: Office Online Server requires a Volume Licensing Account.

Once there, you may think searching for Office Online Server is the next step, but that won’t turn up any results. Instead, locate “Office Professional Plus 2016” in your Product list and select Download.

Next, select your download options. For Download Method, I suggest “Download Manager” to ensure the download won’t be corrupt. Choose your language, but Operating System Type will be irrelevant.

Finally you will be presented with a list of downloads, and there will be “Office Online Server”! Click the download button.

The last step will be to get the product key. Simply click Key next to “Office Professional Plus” and you will see your key for “Office Online Server”.

# Install Process

Below is a very general overview of the install process for OOS.

1. Add required Windows Features and Roles to the Server
1. Install OOS from media
1. Install updates (kb4011027)
1. Get a certificate from the Certificate Authority server (DEV) or purchase an SSL certificate (PROD) for the OOS Server's external url (**officeonline.contoso.com**) and import it to the Personal Certificate Store on CONTOSO-OOS.CONTOSO.COM.
   - <span style="text-decoration:line-through">Don't forget to grant the Network Service account access to the cert's private keys (Local CA only)</span>
   - <span style="text-decoration:line-through">Export the cert to the SharePoint WEB server (Local CA only)</span>
1. Create the OWA Farm with PowerShell
1. Configure the Farm with PowerShell
   - On OOS Server, Set OWA Hosts
   - On OOS Server, Set OWA Excel BI Server
   - On WEB, set the `WopiLegacySoapSupport` property for the Farm
   - On WEB, set the WOPI Zone to `external-https`
   - On WEB, create SPWOPI Bindings pointing to the OOS Server

## Required Windows Features and Roles (Windows Server 2016)

These features and roles must all be installed on the OOS server before OOS itself can be installed. The prerequisites for earlier versions of Windows Server are different, but not documented here.

- Web-Server
- Web-Mgmt-Tools
- Web-Mgmt-Console
- Web-WebServer
- Web-Common-Http
- Web-Default-Doc
- Web-Static-Content
- Web-Performance
- Web-Stat-Compression
- Web-Dyn-Compression
- Web-Security
- Web-Filtering
- Web-Windows-Auth
- Web-App-Dev
- Web-Net-Ext45
- Web-Asp-Net45
- Web-ISAPI-Ext
- Web-ISAPI-Filter
- Web-Includes
- NET-Framework-Features
- NET-Framework-45-Features
- NET-Framework-Core
- NET-Framework-45-Core
- NET-HTTP-Activation
- NET-Non-HTTP-Activ
- NET-WCF-HTTP-Activation45
- Windows-Identity-Foundation
- Server-Media-Foundation

### Target Server

CONTOSO-OOS

## Steps

1. Run the below PowerShell to install necessary Roles & Features on the server

### Windows Server 2012 R2

```powershell
Add-WindowsFeature Web-Server,Web-Mgmt-Tools,Web-Mgmt-Console,Web-WebServer,Web-Common-Http,Web-Default-Doc,Web-Static-Content,Web-Performance,Web-Stat-Compression,Web-Dyn-Compression,Web-Security,Web-Filtering,Web-Windows-Auth,Web-App-Dev,Web-Net-Ext45,Web-Asp-Net45,Web-ISAPI-Ext,Web-ISAPI-Filter,Web-Includes,InkandHandwritingServices,NET-Framework-Features,NET-Framework-Core,NET-HTTP-Activation,NET-Non-HTTP-Activ,NET-WCF-HTTP-Activation45,Windows-Identity-Foundation,Server-Media-Foundation
```

### Windows Server 2016

```powershell
Add-WindowsFeature Web-Server,Web-Mgmt-Tools,Web-Mgmt-Console,Web-WebServer,Web-Common-Http,Web-Default-Doc,Web-Static-Content,Web-Performance,Web-Stat-Compression,Web-Dyn-Compression,Web-Security,Web-Filtering,Web-Windows-Auth,Web-App-Dev,Web-Net-Ext45,Web-Asp-Net45,Web-ISAPI-Ext,Web-ISAPI-Filter,Web-Includes,NET-Framework-Features,NET-Framework-45-Features,NET-Framework-Core,NET-Framework-45-Core,NET-HTTP-Activation,NET-Non-HTTP-Activ,NET-WCF-HTTP-Activation45,Windows-Identity-Foundation,Server-Media-Foundation
```

1. From the OOS, run the below PowerShell to import the OOS Module

   ```powershell
   import-module “C:\Program Files\Microsoft Office Web Apps\AdminModule\OfficeWebApps\OfficeWebApps.psd1”
   ```

1. Install OOS on the server's C:\ drive. Use the version bundled with Office 2019 Pro Plus (in Volume License Sevice Center)

1. From the OOS, run the below PowerShell to create a new OWA Farm:

```powershell
New-OfficeWebAppsFarm -InternalUrl "http://contoso-dev-sql2.contoso.com"  -AllowHttp -EditingEnabled
```

###Important Parameters

- InternalURL
  - `http://contoso-dev-sql2.contoso.com`
- ExternalURL
- AllowHttp
  - `$true`
- CacheLocation
  - `D:\OfficeOnlineServer\d`
- CacheSizeInGB
- EditingEnabled
  - `$true`
- ExcelRestExternalDataEnabled
  - `$true`
- OpenFromUrlEnabled
  - `$true`
- OpenFromUncEnabled
  - `$true`
- RemovePersonalInformationFromLogs
  - `$true`
- RenderingLocalCacheLocation
  - `D:\OfficeOnlineServer\waccache`

## Alternate command

`New-OfficeWebAppsFarm -InternalURL "http://contoso-dev-sql2.contoso.com" -AllowHttp:$true -EditingEnabled:$true -CacheLocation "D:\OfficeOnlineServer\d" -ExcelRestExternalDataEnabled:$true -OpenFromUrlEnabled:$true -OpenFromUncEnabled:$true -RemovePersonalInformationFromLogs:$true -RenderingLocalCacheLocation "D:\OfficeOnlineServer\waccache" -Verbose`

- Output:

```
FarmOU                                       :
InternalURL                                  : https://contoso-oos.contoso.com/
ExternalURL                                  : https://officeonline.contoso.com/
AllowHTTP                                    : False
AllowOutboundHttp                            : False
SSLOffloaded                                 : False
CertificateName                              : OOS SSL
S2SCertificateName                           : OOS Cert
EditingEnabled                               : True
LogLocation                                  : D:\LOGS\ULS
LogRetentionInDays                           : 7
LogVerbosity                                 :
Proxy                                        :
CacheLocation                                : C:\ProgramData\Microsoft\OfficeWebApps\Working\d
MaxMemoryCacheSizeInMB                       : 75
DocumentInfoCacheSize                        : 5000
CacheSizeInGB                                : 15
ClipartEnabled                               : False
OnlinePictureEnabled                         : True
OnlineVideoEnabled                           : False
TranslationEnabled                           : False
MaxTranslationCharacterCount                 : 125000
TranslationServiceAppId                      :
TranslationServiceAddress                    :
RenderingLocalCacheLocation                  : C:\ProgramData\Microsoft\OfficeWebApps\Working\waccache
RecycleActiveProcessCount                    : 5
AllowCEIP                                    : False
OfficeAddinEnabled                           : False
ExcelRequestDurationMax                      : 300
ExcelSessionTimeout                          : 450
ExcelWorkbookSizeMax                         : 30
ExcelPrivateBytesMax                         : -1
ExcelConnectionLifetime                      : 1800
ExcelExternalDataCacheLifetime               : 300
ExcelAllowExternalData                       : True
ExcelUseEffectiveUserName                    : True
ExcelWarnOnDataRefresh                       : True
ExcelUdfsAllowed                             : False
ExcelMemoryCacheThreshold                    : 85
ExcelUnusedObjectAgeMax                      : -1
ExcelCachingUnusedFiles                      : True
ExcelAbortOnRefreshOnOpenFail                : True
ExcelEnableCrossForestKerberosAuthentication : False
ExcelAutomaticVolatileFunctionCacheLifeTime  : 300
ExcelConcurrentDataRequestsPerSessionMax     : 5
ExcelDefaultWorkbookCalcMode                 : File
ExcelRestExternalDataEnabled                 : True
ExcelChartAndImageSizeMax                    : 1
OpenFromUrlEnabled                           : True
OpenFromUncEnabled                           : True
OpenFromUrlThrottlingEnabled                 : True
PicturePasteDisabled                         : False
RemovePersonalInformationFromLogs            : False
AllowHttpSecureStoreConnections              : False
Machines                                     : {CONTOSO-OOS}
```

1. Confirm that the Farm was created successfully by visiting `http://contoso-dev-sql2/hosting/discovery`. "If Office Online Server is working as expected, you should see a Web Application Open Platform Interface Protocol (WOPI)-discovery XML file in your web browser."

1. "If you're planning to use the Secure Store service in SharePoint Server in an HTTP environment, there's a parameter that you need to set to enable this. (If you're not planning to use Secure Store in SharePoint Server with Excel Online, you can skip this step.)

   When Office Online Server attempts to refresh data in a workbook or ODC file that is stored in an HTTP path, that data refresh will fail if you have not configured Office Online Server to allow Secure Store connections over HTTP.

   Use the Set-OfficeWebAppsFarm cmdlet to configure the Secure Store over HTTP settings:"

   ```powershell
   Set-OfficeWebAppsFarm -AllowHttpSecureStoreConnections:$true
   ```

1. On an SP Server, open an elevated PowerShell prompt and run the below command, using the Fully-Qualified Domain name of the OOS server (`contoso-dev-sql2.contoso.com`).

   ```powershell
   New-SPWOPIBinding -ServerName <WacServerName> -AllowHTTP -Verbose
   ```

1. Confirm that the WOPI Zone is set to `internal-http`. Forst, run `Get-SPWOPIZone` to see what the current zone is. If it is not `internal-http` then run the below command to change it.

   ```powershell
   Set-SPWOPIZone -zone "internal-http"
   ```

1. Confirm that the `AllowOAuthOverHttp` setting is set to True.
   "To use Office Online with SharePoint Server 2016 over HTTP in a test environment, you need to set AllowOAuthOverHttp to True. Otherwise Office Online won't work. You can check the current status by running the following example."

   ```powershell
   (Get-SPSecurityTokenServiceConfig).AllowOAuthOverHttp
   ```

   If this command returns False, run the following commands to set this to True.

   ```powershell
   $config = (Get-SPSecurityTokenServiceConfig)
   $config.AllowOAuthOverHttp = $true
   $config.Update()
   ```

   Run the following command again to verify that the AllowOAuthOverHttp setting is now set to True.

   ```powershell
   (Get-SPSecurityTokenServiceConfig).AllowOAuthOverHttp
   ```

1. Enable the Excel SOAP API
   "The Excel SOAP API is needed for scheduled data refresh with Excel Online, and for Excel Web Part rendering. To enable the Excel SOAP API, you need to add the WopiLegacySoapSupport property to the SharePoint Server farm properties using by PowerShell. The input parameter is the URL to ExcelServiceInternal.asmx. This URL can address multiple OOS servers via load balancing. Simply replace the with your Office Online Server path."

   "To enable the Excel SOAP API, run the following PowerShell with the URL of your Office Online Server farm. (For example, http://OfficeOnlineServer.contoso.com.)"

   ```powershell
   $Farm = Get-SPFarm
   $Farm.Properties.Add("WopiLegacySoapSupport", "<URL>/x/_vti_bin/ExcelServiceInternal.asmx");
   $Farm.Update();
   ```

1. Finally the OOS should be working. Open a document library in SharePoint and create or edit a Word, Excel, or PowerPoint document to confirm.

1. Follow instructions on the following page to establish trust between the OOS Server and SharePoint.
   [Configure server-to-server authentication between Office Online Server and SharePoint Server 2016](https://docs.microsoft.com/en-us/officeonlineserver/configure-office-online-server-for-sharepoint-server-2016/configure-server-to-server-authentication-between-office-online-server-and-share)

   1. On OOS, get a self-signed certificate from the Certificate Authority (e.g. `CONTOSO-CA-01-CA`) through Microsoft Management Console

   1. Import the Certificate into the "Trusted Root Certification Authorities", as well as the "Personal" directories

   1. Export the Certificate to somewhere accessible from DEV-WEB (the SharePoint Web Front-End Server)

   1. Still on OOS, Use the Microsoft Management Console (MMC) to grant the network service permissions to use the private key. ([Link](https://docs.microsoft.com/en-us/officeonlineserver/configure-office-online-server-for-sharepoint-server-2016/configure-server-to-server-authentication-between-office-online-server-and-share#to-grant-network-service-permissions-to-use-the-private-key))

   1. On the SharePoint Server, specify the S2S certificate for Office Online Server with PowerShell ([Link](https://docs.microsoft.com/en-us/officeonlineserver/configure-office-online-server-for-sharepoint-server-2016/configure-server-to-server-authentication-between-office-online-server-and-share#configure-office-online-server-to-use-the-certificate-for-server-to-server-authentication))

   1. Configure SharePoint Server to use the certificate for server-to-server authentication ([Link](https://docs.microsoft.com/en-us/officeonlineserver/configure-office-online-server-for-sharepoint-server-2016/configure-server-to-server-authentication-between-office-online-server-and-share#configure-sharepoint-server-to-use-the-certificate-for-server-to-server-authentication))
      - Must be run twice, once for SQL and once for SharePoint. The GUIDS to use are given, but you must still specify the name of each server.

## SSL Certificate

We purchased an SSL Certificate for **https://officeonline.contoso.com** from [Entrust](https://www.entrustdatacard.com/) on 5/19/2019, which is valid for 1 year. This certificate is installed on CONTOSO-OOS.CONTOSO.COM.

- The friendly name for the certificate is `OOS SSL`
- Note that the SSL Certificate is bound to the OOS Server's IIS site when you update the `CertificateName` property of the Farm using `Set-OfficeWebAppsFarm`. In other words, **do not manually bind the SSL certificate to the IIS site!** Just let the PowerShell cmdlet do it for you.

## Create the OWA Farm (PowerShell)

```powershell
# Config
$InternalUrl = "https://contoso-oos.contoso.com"
$ExternalUrl = "https://officeonline.contoso.com"
$CertName = "OOS SSL"

# Create the farm
New-OfficeWebAppsFarm `
-InternalURL $InternalUrl `
-ExternalURL $ExternalUrl `
-CertificateName $CertName `
# -S2SCertificateName $CertName `
-AllowHttp:$false `
-AllowOutboundHttp:$false `
-EditingEnabled:$true `
-OnlinePictureEnabled:$true `
-ExcelAllowExternalData:$true `
-ExcelUseEffectiveUserName:$true `
-AllowHttpSecureStoreConnections:$false `
-OpenFromUrlEnabled:$true `
-Verbose

# Set which domains are allowed to make requests
New-OfficeWebAppsHost -Domain "CONTOSO.COM"
New-OfficeWebAppsHost -Domain "Contoso.com"
New-OfficeWebAppsHost -Domain "contoso.com"
New-OfficeWebAppsHost -Domain "contoso.net"

# the SSAS server
New-OfficeWebAppsExcelBIServer -ServerId contoso.net-dev-sql2.contoso.com
```

## Add OWA Hosts (PowerShell)

This step is necessary to let the OOS Server know which domains are safe to accept requests from. Run the below PowerShell on the OOS Server:

```powershell
New-OfficeWebAppsHost -Domain "CONTOSO.COM"
New-OfficeWebAppsHost -Domain "Contoso.com"
New-OfficeWebAppsHost -Domain "contoso.com"
New-OfficeWebAppsHost -Domain "contoso.net"
```

## Enable the Excel SOAP API (PowerShell)

The Excel SOAP API is needed for scheduled data refresh with Excel Online, and for Excel Web Part rendering. To enable the Excel SOAP API, you need to add the WopiLegacySoapSupport property to the SharePoint Server farm properties using by PowerShell. The input parameter is the URL to ExcelServiceInternal.asmx. This URL can address multiple OOS servers via load balancing. Simply replace the with your Office Online Server path.

To enable the Excel SOAP API, run the following PowerShell where is the URL of your Office Online Server farm. (For example, http://OfficeOnlineServer.contoso.com.)

```powershell
$Farm = Get-SPFarm
$Farm.Properties.Add("WopiLegacySoapSupport", "<URL>/x/_vti_bin/ExcelServiceInternal.asmx");
$Farm.Update();
```

## Ad Hoc configuration

These steps were taken after the above to troubleshoot the OWA server.

### Add domains

Use the [New-OfficeWebAppsHost](https://docs.microsoft.com/en-us/powershell/module/officewebapps/new-officewebappshost?view=officewebapps-ps) cmdlet to add `contoso.net` as a domain.

```powershell
New-OfficeWebAppsHost -Domain "contoso.net" -Verbose
New-OfficeWebAppsHost -Domain "contoso.com" -Verbose
```

### Add Excel BI Server

This is a server with Analysis Services installed that handles Excel BI operations.

```powershell
New-OfficeWebAppsExcelBIServer -ServerId "CONTOSO-DEV-SQL2"
```

From the documentation:

<blockquote>The New-OfficeWebAppsHost cmdlet adds a host domain to the list of host domains to which Office Online Server allows file operations requests, such as file retrieval, metadata retrieval, and file changes. This list, known as the Allow List, is a security feature that prevents unwanted hosts from connecting to a Office Online Server farm and using it for file operations without your knowledge.</blockquote>

### Configure Analysis Services EffectiveUserName in Excel Online

<blockquote>EffectiveUserName is a SQL Server Analysis Services connection string property that contains the name of the user who is accessing a report. In Office Online Server, you can use this property in conjunction with Excel Online to pass the identity of the user who is viewing the report to Analysis Services. This allows per-user identity without the need to configure Kerberos constrained delegation.</blockquote>
- Connect to Analysis Services on the OWA Server using the 2016 version of SSMS, right-click the server name and select properties, then go to the Security Page
- Add `SP16_Farm` & `SP16_Services` as Administrator user accounts
- Add `CONTOSO-DEV-SQL2` as an administrator Computer Account
- Run the below command in PowerShell to enable EffectiveUserName
   ```powershell
   Set-OfficeWebAppsFarm -ExcelUseEffectiveUserName:$True
   ```

### Forcing OOS to use TLS 1.2

This is a security measure. According to documentation:

<blockquote>
Using TLS 1.1 and TLS 1.2 with Office Online Server requires strong cryptography in .NET Framework 4.5 or higher.
</blockquote>

This involves setting several Registry Keys so that SSL 2.0 & 3.0, and TLS 1.0 and 1.1 are disabled on the server. Follow the instructions on this page to do it: [Enable TLS 1.1 and TLS 1.2 support in Office Online Server](https://docs.microsoft.com/en-us/officeonlineserver/enable-tls-1-1-and-tls-1-2-support-in-office-online-server)

### Updating Office Online Server

Somewhat inconveniently, installing an update to OOS requires re-creating the OOS farm. Therefore the server running OOS should be configured _not to automatically install updates_. According to documentation:

<blockquote>
If Office Online Server updates are applied automatically, users may be unable to view or edit documents in Office Online. If this happens, you have to rebuild your Office Online Server farm.
</blockquote>

#### How to update a single-machine farm

1. Remove the machine from the farm using `Remove-OfficeWebAppsMachine` on the server where OOS is installed
1. If the update is a new release of OOS (i.e. you downloaded an install disc from the Volume License Center) then uninstall OOS completely, restart, and reinstall from media. Otherwise, just install the patch file.
1. Re-create the farm with `New-OfficeWebAppsFarm` and apply options to configure it the same as it was before the update

### Config Gotchas

Below is a list of (possibly untrue) options that I learned, through trial and error

- It is not necessary to configure SPTrustedSecurityTokenIssuer entries or App Principal permissions on the SP WEB server (the official documentation makes it seem like these are required steps, but in fact they are not.)
- The S2S Certificate configuration steps are also not necessary, even though the documentation makes it seem like they are.
- Use `external-https` as the WOPI zone so that the OOS Server can be accessed from outside the LAN
- When creating the OWA farm, **do not** move the locations of the log or cache files from the C:\ drive. For some undocumented reason, locating them elsewhere causes problems with OOS.
- Add all possible domains for machines that are in the contoso.com AD forest and might access the OOS server:
  - CONTOSO.COM
  - Contoso.com
  - contoso.com
  - contoso.net
- Set the WMI Performance Adapter service to Automatically start, and then restarted the WACS service (on OOS)
  `PS> Restart-Service WACSM`

# See Also

- [Apply software updates to Office Online Server](https://docs.microsoft.com/en-us/officeonlineserver/apply-software-updates-to-office-online-server)
- [Configure Office Online Server for SharePoint Server](https://docs.microsoft.com/en-us/officeonlineserver/configure-office-online-server-for-sharepoint-server-2016/configure-office-online-server-for-sharepoint-server-2016)
- [Deploy Office Online Server](https://docs.microsoft.com/en-us/officeonlineserver/deploy-office-online-server)
- [How to Get Office Web Apps Server 2013 to Report a Healthy Health Status](https://blogs.technet.microsoft.com/dodeitte/2014/01/12/how-to-get-office-web-apps-server-2013-to-report-a-healthy-health-status/)
- [Installing Office Online Server on Windows 2012 R2 Server](https://www.getfilecloud.com/supportdocs/display/cloud/Installing+Office+Online+Server+on+Windows+2012+R2+Server)
- [New-OfficeWebAppsFarm](https://docs.microsoft.com/en-us/powershell/module/officewebapps/new-officewebappsfarm?view=officewebapps-ps)
- [Office Online Server now available](https://www.microsoft.com/en-us/microsoft-365/blog/2016/05/04/office-online-server-now-available/)
- [Office Web Apps Server 2013 - machines are always reported as Unhealthy](http://www.wictorwilen.se/office-web-apps-server-2013---machines-are-always-reported-as-unhealthy)
- [Remove a server from a farm in SharePoint Servers 2016 or 2019](https://docs.microsoft.com/en-us/sharepoint/administration/remove-a-server-from-a-farm-in-sharepoint-server-2016)
- [Troubleshooting Office Online Server and Office Web Apps Server](http://blogs.catapultsystems.com/kshah/archive/2018/05/17/troubleshooting-office-online-server-and-office-web-apps-server/)
- [Where to download Office Online Server 2016](https://blog.nowmicro.com/2017/01/18/where-to-download-office-online-server-2016/)

---
