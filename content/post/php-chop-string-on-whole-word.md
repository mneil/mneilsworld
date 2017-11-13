---
title: "Chop A String On a Whole Word With PHP"
description: "Description of the post"
date: 2011-08-09T00:24:24+00:00
draft: false
---

# Chop A String On a Whole Word With PHP

1 Comment
I’ve been slacking an not writing anything so I’m going to start trying to write much smaller posts starting with this one. A common need for template developers is chopping a string at a whole word. There’s a lot of functions out there on the web to tackle this problem and I went searching for one quickly today rather than just writing one. What I found was a bunch of functions that either a) didn’t work or b) didn’t work well enough. So most of the time you want to chop a string down to 35 characters or so right? For instance, you want to display a post title but you want it to display only on one line but some of the titles are going to break that line.

This function breaks a string on a whole word and makes sure that the string doesn’t go over the set amount of characters you set. This means you always get a string that fits where you want it to; ALWAYS.

function neat_trim($str, $n, $delim='.') {
  $len = strlen($str);
   if ($len > $n) {
       	preg_match('/(.{'.$n.'}).*?\b/', $str, $matches);
		if(strlen( trim( $matches[0] ) ) > $n)
			return substr( $matches[0],0, strrpos( trim( $matches[0] )," ") ) . $delim;
		else
			return $matches[0] . $delim;
   }else {
       return $str;
   }
}
It’s pretty straightforward I hope. You pass the string, the maximum characters your string can be, and a delimiter to display at the end of the string if you chop it. By default it displays … but if you don’t want anything just pass an empty string. I didn’t do all this myself (not that there’s much there). This is based off a broken example I found on the web. The word boundary in the regular expression was mis-used in the example I found so I fixed it, then made it so that the string never goes over n characters. The original would chop it at the next whole word it found which meant our string could be anywhere between n characters and n*E-10. You get the picture. I’m not a math wizard so that’s probably wrong ha ha. I mean what if you wanted to catch 30 characters on one line and the string you chopped was:

“this is my string of existentialism”

My function returns “this is my string of…” whereas most return “this is my string of existentialism” which can completely ruin a layout. Anyway, no need to beat this dead horse back to life. I hope this helps people. If you have a better, cooler, faster, shorter (or longer) way of doing this post it in the comments!