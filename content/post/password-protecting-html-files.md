---
title: "AIR3 In Flash CS5 For iOS / Android"
description: "Description of the post"
date: 2011-01-25T16:31:56+00:00
draft: false
---

# Password Protecting HTML Files

The other day I was doing some work on a back-end system for a client and ran into the problem of having a ton of html files that needed to be accessible only by administrators. Why would I have a bunch of html files you ask? For practical reasons you may have any number of files you don.t want displayed on the web to just anyone. I happened to have a large library of code documented with ASDoc. Anyone who has used, or is interested in using ASDoc knows it creates a large number of html files. My particular project has been one spanning several years and consists of thousands of lines of code and a hundred or more classes across dozens of packages. But, that.s sort of irrelevant. What is important is that I had a hundred or so html files I suddenly needed to protect online.

What I used:

.htaccess
php
Yeah, I know that.s not a big list. But it.s all you need. If you already have a back-end system put together this is a fairly easy thing to implement. Here is the code for the .htaccess file:

<IfModule mod_rewrite.c>

Options +FollowSymlinks
RewriteEngine On

RewriteRule !\.(js|ico|txt|gif|jpg|png|css|swf|pdf)$ index.php

</IfModule>
Okay, fairly simple I hope. Basically this says rewrite anything in this directory that isn.t a javascript file, an icon, a text document. and so on and so forth to index.php. This means any requests made for files in this directory or sub-directories should be redirected to the index.php file. You can add files to exclude or include as well. These were just the ones I didn.t want redirected. This is really the basis of a bootstrap configuration and one I use quite often!

The index.php file is really pretty simple. And here is it:

<?php
session_start();
if( !$_SESSION['test'] ){
header("Location: ../");
exit;
}

$url=strip_tags($_SERVER["REQUEST_URI"]);
$url_array=explode("/",$url);
array_shift($url_array); //the first one is empty anyway

if($url_array[0] == "my-admin")
array_shift($url_array);
if($url_array[0] == "ASDoc")
array_shift($url_array);

if($url_array[0] != ""){
echo file_get_contents($url_array[0]);
exit;
}
?>
Hopefully that looks simple enough. Obviously right off the bat you.ll notice I.m starting a session and checking a session variable I.ve named test. This means you.ll have had to authenticated the user somewhere else and set the session variable test to true. If the user isn.t authenticated you can see that we.re throwing them back to the the subfolder; effectively kicking them out of our back-end system.

The next part is a little less explanatory simply because there are a dozen ways to do this. The way I.m handling requests and know what files to look for is all based on the REQUEST_URI. What I did here was split the the URL into an array, then with a couple of if statements I threw away the first values in the array until I got to the folder I.m working with. In the above example assume the html file we.re requesting are at http://www.test.com/my-admin/ASDoc/test.html. The if($url_array[0] == .my-admin.)array_shift($url_array); gets rid of the value my-admin in the url_array variable. Then next line takes out ASDoc. Everything after that that is left in $url_array is a request for a page in the relevant folder. Hopefully that makes sense.

Next we.re just checking that the request wasn.t for the index and if not we.re going to grab the contents of the file at $url_array[0]; and echo them out. You don.t necessarily want to check that that the request isn.t for the index though. For instance, you could check that it is the index they are requesting and then serve a login page. Anyway, there are endless possibilities with this and protecting html files is just one of them.

