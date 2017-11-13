---
title: "Mobile Framework Roundup"
description: "Description of the post"
date: 2011-01-25T16:31:56+00:00
draft: false
---

# Mobile Framework Roundup

I’ve been working at this office in Bakersfield for about 2 years now after my foray into the freelance world which I did also for 2 years. And while I still freelance on the side it’s nice to work with a team of people I see everyday. It also provides me the opportunity to start taking more time out and writing about the work I do and things I love. Recently at the office I built our towns first mobile app. It is geared primarily for the iPhone although I’ve heard rumor it runs pretty well on Android as well. In building this mobile app I ran into a lot of hardships and created quite a few workarounds to problems that may have been easier to fix than I made them. However, it was a learning process as it was my first mobile app and it turned out to be a pretty awesome one at that!

IN THE BEGINNING

Let me start by listing the frameworks I tried:

jQuery Mobile
jQTouch
Sencha Touch


Note: I have recently scrubbed this post for all references to my previous employers at a request. If you’re just dying to see the app so you can compare it to what I’m talking about please email me and we can discuss it.

If you’ve heard of any of these before this post and understand JavaScript well then you’ll have no problem relating to my issues. You also shouldn’t have a problem building an application yourself. Maybe I don’t know JavaScript as well as I thought (prototypes and makeshift classes should have been second nature coming all the way back from flash 5 and AS1), but I had real issues with these frameworks.

I started with jQTouch since I bought a book about compiling JavaScript, html, and css with Phonegap that recommended it. I had used it in the past to test little things and get a feel for the mobile browsing experience. From that I understood that a mobile app was little more than a JavaScript app running in one page hijacking user interaction and running animations. Here was my first problem:

I don’t own an iPhone, nor do I care to own one after using one to build this app.

I started with jQTouch and had received an old iPhone 3g that had been wiped clean to work with. No one told me that Safari Mobile on the 3g in it’s original format displayed html and ran JavaScript about as well as Microsoft Outlook! I didn’t update the phone, and so jQTouch was not working properly. I pulled on my hair for about 2 hours, yelling, cursing, and condemning the iPhone. After this time a friend of mine recommended Sencha.

THE DECISION

This decision was brought upon me by a false pretense. At this point jQTouch wasn’t working because Safari was old but I did not know this! So at the recommendation of Sencha I decided to give up jQTouch and at least explore other options. Silas had never used Sencha, however, he did know something I didn’t; it’s from the guys who make ExtJS. And, anyone who likes pretty JavaScript powered graphs knows ExtJS is library to use. The other avenue I decided to explore was using jQuery Mobile. I mean, all the other frameworks are running on this framework, so why wouldn’t it be the obvious choice? After scouring the documentation of both Sencha and jQuery Mobile I decided on the going with the recommendation of Sencha. So why not use jQuery mobile?

I’m sorry, I love jQuery, but get real with the documentation. I’m trying to build a web app and it’s presenting the documentation in a very difficult to use phone based layout. The docs layout on my screen like I’m using the iPad 2000. If I can’t navigate the documentation then how can I read or understand it? And jQuery isn’t rocket science. It’s built off of jQuery after all. But the jQuery docs are manageable and easy to get through. The jQuery Mobile documentation is enough to make this iPhone hating developer want to write my own Mobile JavaScript Framework from scratch.

The Sencha documentation didn’t turn out to be much better. However, the layout was built on ExtJS and at least it was fairly easy, albeit hard at times, to find what I needed.

THE BUILD

I had some issues with Sencha. Some of them were because the layout was atypical, others because the framework fell short, and many because I didn’t yet have a full understanding of the Sencha framework. When I initially loaded up the first Sencha sample files and tested them on the iPhone I was provided I thought things had changed for the better. Everything worked like it promised, the examples were easy to follow, and the Sencha layout controller made me reminisce about the Yahoo Astra HBox,VBox and Menu panes for Flash.

However, as I slowly worked away from examples and into my own layout I ran into trouble. Not to drag this out much further; it was because Safari wasn’t updated. I know someone will read this and wonder how an iPhone hater like myself even managed to pull off a web app with so little knowledge of the phone itself. Well, let me tell you. After I updated the phone all I needed was some fancy JavaScript work and very little interaction with the iPhone itself.

Sencha is far from perfect. I had quite a few issues with it and here’s a list of those issues and the workarounds:

THE ISSUES

Sencha provides a fullscreen property that only works on one item. And, if you’re expecting a fullscreen app at several points you’d better set the outermost container to fullscreen or it’s not happening.
Fullscreen also seemed to require the property layout to be set to fit. Try finding that in the docs! Fortunately, they have forums and lots of information can be found in others struggles.
A layout container inside a layout container won’t resize properly in fullscreen mode if you’re loading content using any of Sencha’s Data models or floated images.
Accessing items inside of different layout containers was difficult and I couldn’t find documentation on it. I found myself resorting to setting classes on layout items and referencing them there using jQuery and the few load event handlers I could find for items.
The events seemed ill conceived. In plain old JavaScript an onClick event is an onClick event on any bound element supported by the DOM. Sencha has onLoad, onReady, handler, click and a slurry of other events and onLoad works for card layouts but not on tab bars and onReady works on sub items but not parent items and I didn’t find documentation on any of it. Trial and error lead me to find events. That and logging object properties in the console.
THE FIXES

When building anything with Sencha set the outermost layout container to layout:’fit’ and fullscreen:true. And when something isn’t laying out properly don’t assume any child is inheriting properties of the parent, because it probably isn’t.
Card layouts worked great in fullscreen, but you must have the parent container set as mentioned in the above fix. This helped tremendously with layout.
The nested layouts not resizing ended up being a big one. If you want to read more about this read the section below titled THE HACK
Apparently there’s an easy way to access container items but I didn’t find it until the end. I found the reference for the tab bar to most helpful in listing methods that worked. One method I used to access items was getItem(). I also found first() and last() however, they never really helped since I didn’t often need first or last items in a list. Also, most of the examples won’t show you that it’s best to create items as new components if you’re going to reference them later instead of just new objects.
I don’t know what’s up with the events?! If anyone knows why most of the events I tried on different components never fired please feel free to tell me why I missed it!
THE HACK

The largest problem I ran into was the container not resizing when you loaded content via ajax. I loaded content via ajax to 1) speed up initial load times since we are after all on a phone and 2) to help make referencing items easier in Sencha once they’re loaded. In particular, I loaded a set of images for each of our pages and bound a load event to each image since I coudn’t seem to get it done with Sencha. If you check out the app at on your mobile device you”ll see that 10 images load initially and clicking those takes you to another page that loads a larger version of the image. By binding onLoad events directly to the images before loading them I could monitor exactly when the image loaded. Sencha had an event for when the data was loaded, but if that data were images it was too soon for me. The onLoad event bound to the image would then set the orientation of Sencha causing it to recalculate the layout of the page. If I didn’t do this then once the image loaded if it were taller than the viewable area you coudn’t scroll it! Apparently this is a real problem for other Sencha users so hopefully my workaround will help. The exact methods I called when the image loaded were:

web.doLayout();
web.getActiveItem().doLayout();
web.setOrientation(Ext.getOrientation(),window.innerWidth,window.innerHeight);
web is a reference to the layout component I resized.