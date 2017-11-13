---
title: "AIR3 In Flash CS5 For iOS / Android"
description: "Description of the post"
date: 2013-05-29T23:18:04+00:00
draft: false
---

# MnCombine WP Plugin Release

MnCombine Asset Management Plugin!

I’ll cut to the chase. I love the WordPress community and there are plenty of cache/asset management/css compressors/javascript compilers out there. So why the $#!! would I write another one? Simple, because this one is obviously the best! I use the same technique all the time to management my javascript and css files. Monitor changes to the file on request, hash the files needed along with the times they were updated, look for a file if it exists or generate a new one then load it. Whether it’s with Stylus for Node, Asset Packager for Ruby, Cake or WordPress for PHP, or Webassets for Flask in Python it just makes sense to handle assets this way.

So I’ve packages up one of my libraries and gave it a nice interface in WordPress so others can use and enjoy it. This plugin gives you much greater control than WP Super Cache (which works well in tandem with this plugin) or wp minify does by allowing you to decide which assets to combine and optionally compress. You can try it out by searching mncombine in your admin plugins > add new screen or downloading it directly.

What is does

Finds all possible .js and .css files from a WP install available and allows you to combine and/or compress the files to reduce load time. The plugin can monitor file changes in “development” mode (by hashing file mtime) which allows the plugin to recompile the files when a file changes. Or, it can cache the files in “production” mode so that files are only recompiled if they are not found or are deleted manually from the cache folder. Additionally, this plugin will allow you to force the inclusion of javascript files into either the head or the foot of the page.

There are two modes, development and production, the ability to force the files to print in the header or footer*, the use of Google Closure as a JS compiler, and finally the ability to pick and choose which files, including dependencies, should be combined.

*forcing head compiles can fail on JS files queued after the call to wp_head(). The plugin will, in this case, render the late queued files in the footer as originally intended.