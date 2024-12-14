---
title: "New jQuery Content Rotator Plugin"
description: "Description of the post"
date: 2011-02-12T18:11:26+00:00
draft: false
---

# New jQuery Content Rotator Plugin

This is an official release of a jQuery plugin I wrote some time ago and have been using and updating a lot lately. I’ve decided to release it here, and on jQuery, because I’ve finally got all of the bugs out and it has enough options and methods to work for any job. As devlopers we get a lot of requests for some image slideshow or content slideshow at the top of the homepage or some subsequent page. I’ve browsed jQuery’s image rotator options a dozen times and had a really hard time finding something that just worked. Lots of authors out there are creating plugins that are styled one way by default, come with too many requirements for the layout, or that just break; and so I’m throwing my hat into the ring. This plugin creates an image (or content) slideshow based on any nested element.

So you can create a slideshow from a nested list (like many others will do) or you can nest divs and target the top containing div. You could nest spans if you’d like (don’t know why) but any DOM element will work. You can make it auto rotate, loop infinitely, set the delay, set the transition speed and control the movement with external controls via it’s public methods. I know that if you need some content on the stage to scroll for any reason, in any direction, and need any control over it that this is the plugin that works and will do it.

Below is the documentation for the plugin. Included in the zip is a demo page, a slightly styled demo with most of the options set, the documentation again, and jQuery 1.4.2 as well as an uncompressed and compressed version of the plugin. The uncompressed version is documented as well.

View it on GitHub

jQuery-Content-Rotator
1 0 0
A configurable rotator plugin for jQuery — Read More
Latest commit to master on 13/5/2013
 

Public Methods

MethodDescription

rotator	Creates a new instance of the rotator plugin
goNext	Sends the rotator to the next child index
goToIndex	Sends the rotator to the user defined index in the parameter
onError	Dispatches an error object relaying the target failure and error message
pause	Pauses the rotator.
start	Starts the rotator.
Public Properties (options)

PropertyDescription

arrows	The class of the left and right arrow controls with unique number 0 indexed
tranSpeed	The time a transition should last in milliseconds
delay	The time a child should display before the transition in milliseconds
auto	Sets auto scrolling through rotator. true starts animation automatically. false disables auto rotating
loop	Infinite scroll on or off, default true infinitely loops
backwards	sets the rotator to run backwards. Loop must be set to true to run backwards
onChange	onChange event fires when the transition animation begins
endChange	endChange event fires when the transition animation ends
Method Detail

rotator

Description: Creates a new instance of the rotator plugin

$(“.slider”).rotator();

goNext

Description: Sends the rotator to the next child index

$(“.slider”).data(‘rotator’).goNext();

goNext also accepts a parameter of 1 or -1. This will cause the rotator to either rotate backwards to the previous child or continue forwards.

goToIndex

Description: Sends the rotator to the next child index

$(“.slider”).data(‘rotator’).goToIndex(2);

The rotator will animate to the child specified. If the child is out of range an error is thrown and the rotator will continue on like normal.

onError

Description: Dispatches an error object relaying the target failure and error message

$(“.slider”).data(‘rotator’).onError = function(e){alert(“error in “+e.target)}

The error object contains two properties; target and error. The target is where the rotator failed. For example, it may be in the initializing
where too few children are present in the slider ( the target would be init) or when goToIndex is called with an index out of range (target is goToIndex).
The error is a descriptive error message of the failure.

pause

Description: Pauses the rotator

$(“.slider”).data(‘rotator’).pause();

Clears the interval at which the slider is rotating if auto is true (default).

start

Description: Starts the rotator

$(“.slider”).data(‘rotator’).start();

Starts the rotator rotating regardless of auto. Can be used to restart a paused rotator
or start a rotator whose auto property is set to false. This will set auto to true and the
rotator will continue rotating until paused again.

Property Detail

arrows

Description: The class of the left and right arrow controls with unique number 0 indexed

$(“.slider”).rotator({arrows:{left:”.leftArrow”,right:”.rightArrow”}});

arrows is an object containing class identifiers for the left and right arrow DOM objects.

Default: {left:”.leftArrow”+i,right:”.rightArrow”+i}

Where i is the 0 based increment of the number of sliders on the page.

tranSpeed

Description: The time a transition should last in milliseconds

$(“.slider”).rotator({tranSpeed:400});

Default: 800

delay

Description: The time a child should display before the transition in milliseconds

$(“.slider”).rotator({delay:10000});

Default: 4000

auto

Description: Sets auto scrolling through rotator. true starts animation automatically. false disables auto rotating

$(“.slider”).rotator({auto:false});

Default: true

loop

Description: Infinite scroll on or off, default true infinitely loops

$(“.slider”).rotator({loop:false});

If set to false the slider will scroll back to the 0 index when it has reached the last child

Default: true

backwards

Description: Sets the rotator to run backwards. Loop must be set to true to run backwards

$(“.slider”).rotator({backwards:false});

The rotator will rotate from left to right instead of right to left by default

Default: false

onChange

Description: onChange event fires when the transition animation begins

$(“.slider”).rotator({onChange:function(i){alert(‘next’)}});

When the onChange event is fired a parameter is passed containing the new index of the rotator

Default: function(){}

endChange

Description: endChange event fires when the transition animation ends

$(“.slider”).rotator({endChange:function(i){alert(‘next’)}});

When the endChange event is fired a parameter is passed containing the new index of the rotator

Default: function(){}

Download the plugin!

