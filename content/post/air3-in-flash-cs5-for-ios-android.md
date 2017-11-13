---
title: "AIR3 In Flash CS5 For iOS / Android"
description: "Description of the post"
date: 2010-08-06T16:59:41+00:00
draft: false
---

# AIR3 In Flash CS5 For iOS / Android

Still slacking. But I just thought about this blog and thought I would put up my recent troubles.

Adobe has been touting lately that the new version of AIR is so powerful that people are porting over intense Flash games for iOS. Being an avid AS3 developer I didn’t want to miss out on testing AIR for iOS and Android both. We’ve been able to do development for both these platforms for nearly 2 years now so I’m not going to tell you anything revolutionary or cutting edge. Instead, I’m going to help out the few, or more likely many who just haven’t come forward, who want to develop iOS apps in the latest version of AIR (currently 3) but are using the Flash IDE. There’s a few resources out there for Flash/Flex Builder and CS5.5 but not a lot pertaining to how to get your old run-down AS3 projects built in Flash CS5 into AIR3.

I’m doing the leg-work, but the harder stuff was figured out for me.

http://blog.prevail.co.nz/2011/06/21/overlaying-air2-7-in-flash-cs5/

Over at the prevail blog (and I don’t really know who or what prevail is) I found a great article some time ago about getting AIR 2.7 to compile in CS5. That’s super because CS5 only gives you AIR2 capabilities and little documentation exists anymore as to how to update it to something better.

But wait!? I said AIR3 not 2.7

True, and part of why I’m writing this is because currently the last post on that link above asks if anyone has got AIR3 to work yet. I responded, and have yet to be approved! So I’m telling it here in a little more length. If you follow the precise steps laid out in the blog above you can upgrade CS5 to 2.7. And, you must do that before updating to 3. Once the steps have been taken to update to 2.7, and you’ve compiled an app to 2.7 successfully, then you need to go to the adobe site: http://kb2.adobe.com/cps/908/cpsid_90810.html and follow the instructions for updating Adobe CS5.5 to AIR3. Now, obviously we’re updating CS5, not 5.5. But, if you just pretend the everywhere on the Adobe site that CS5.5 reads CS5 then you’ll get AIR3 updated successfully and be able to compile from the Flash CS5 IDE.

UPDATES

So I know that things change and pages update. In fact, the only reason I bothered figuring out how to get AIR3 installed was because I was having trouble getting 2.6 installed to run an older project after formatting my computer and thought, “why not just go all the way to 3?” So if Adobe has jacked the link above, or updated AIR once more, then here are the steps below:

Download the latest AIR3 SDK (http://www.adobe.com/products/air/sdk/).
Archives of the AIR SDK’s are here if 3 is no longer the current version: http://kb2.adobe.com/cps/853/cpsid_85304.html
Close Flash Professional CS5.
Browse to either of the following to locate the AIR2.6 folder:
C:\Program Files\Adobe\Adobe Flash CS5\ (Win)
Applications/Adobe Flash CS5/ (Mac)
Change the AIR2.6 folder name to AIR2.6OLD or delete it if you don’t want to save a copy of it.
Rename the unzipped folder (SDK folder) to AIR2.6.
Place the folder in either of the following locations:
C:\Program Files\Adobe\Adobe Flash CS5\ (Win)
Applications/Adobe Flash CS5/ (Mac)
Browse to the AIR2.6/frameworks/libs/air/ folder in the Adobe Flash CS5 folder and copy airglobal.swc.
Paste the SWC file in Adobe Flash CS5/Common/Configuration/ActionScript 3.0/AIR2.6/ to overwrite the existing airglobal.swc file.
Open AdobeAIR2_6.xml, AiriPhone.xml, or Android.xml inside Adobe Flash CS5.5/Common/Configuration/Players/ using any text editor.
Change the version attribute of the player tag from 11 to 13 and save the file. Make sure that it looks as follows for the relevant file:
Android.xml<player id="android_0" version="13" asversion="3" minasversion="3">AiriPhone.xml<player id="PFI1_0" version="13" asversion="3" minasversion="3">AdobeAIR2_6.xml<player id="AdobeAIR2_6" version="13" asversion="3" minasversion="3">
The above steps were pulled from Adobe directly and modified by me to read CS5 instead of CS5.5 and I removed a couple of nonsensical steps that adobe had at the end that didn’t need to be done if we followed the steps from the prevail blog. Now let’s just how prevail doesn’t change their post!