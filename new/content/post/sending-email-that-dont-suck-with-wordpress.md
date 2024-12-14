---
title: "Sending Emails That Don't Suck With WordPress"
description: "Description of the post"
date: 2011-01-25T16:31:56+00:00
draft: false
---

# Sending Emails That Don’t Suck With WordPress

I’ve wondered about emailing in WordPress for a while but never did anything about it. How does WordPress send emails? What functions can we hook to for emails? What if I want to setup a template with a form and email someone? And, what if I want to send nice html emails and not just plain-text formatted ones? These are all good questions and definitely what I have been wondering. Let me start out by answering the first question. WordPress doesn’t do anything fancy for sending emails. Nope, no SMTP connections, no html headers, nothing. WordPress just uses the mail function like any PHP application would and sends a regular old plain-text email. Well that’s cool for WordPress, but sometimes that sucks!

Let me just disclaim right here I’m glad WordPress does this. WordPress is a lighter codebase than some of the bigger CMS systems out there. And, I know WordPress is a “blog” system. But let’s face it, WordPress is more than that to a lot of people including myself. Right now you’re probably thinking, “Okay Michael, but how do I send emails that don’t suck?” I am going to recommend several ways. The first option is to add your own email system. And, I’m going to recommend Manuel Lemos‘ html email class for sending good html emails. I don’t know where this guy came from; but I love his email classes. I’ve taken his class and wrapped it so I can send standard html emails through an SMTP server and have been doing this for a couple years now. He definitely has no idea who I am. But I hope he knows he’s helped at least one other guy in the community and that’s me!

Using his class is how I’d typically send any emails. And, I was putting it into my WordPress theme folder and including it and sending emails that way. That works. But, there has to be a better way still right? Well of course! If there weren’t it wouldn’t be worth a blog post. I recently came into a bit of work that required some emails to be sent out of WordPress. And, they had to be html/plain-text formatted. I thought, surely there’s a plugin out there that will let me build a form and then capture the data and send a nice email based on the user input right? Wrong! I couldn’t find anything. I know there are tons of contact form scripts, and there’s Contact Form 7 (which is good) but what if you’re going all custom here? What if the form is complex, needs some cool styling, has to send some serious emails, and you have to build it from scratch?

Well, in this case I’m going to recommend starting with a cool plugin I found simply called html emails by Mohammad Jangda. Here’s another guy who I have no affiliation with that has done something right! You’ll have to go to his plugins page to download the plugin.

A bit about this plugin

Html emails is a pretty basic plugin and it doesn’t do what we’re wanting to accomplish out of the box. What it does do is extend the current WordPress email system by sending html and plain text formatted emails based on a template system. Not only does it do that well, but it’s easy to extend and use to send your own awesome emails! Plus, you can edit the main templates for the general WordPress emails so every email that comes from your site is just as awesome as the last! There is one more bonus to his plugin; it shows you all of the hooks for the current email system which I didn’t even know how to go about finding. As an aside here I love the WP codex but sometimes it’s a) a bit incomplete and b) doesn’t come up first in the Googles because some other guy wrote too much on the function or filter or hook or action or whatever!

I could go on about all of this information but why? I know you’re reading this to save some time. So lets get to how to send your own emails while utilizing this plugin. Here’s some code:

if ( !function_exists('send_my_test_email') ) :
function send_my_test_email($to, $args) {
 
$to = filter_var($to, FILTER_VALIDATE_EMAIL);
 
$subject = 'New Test Email';
 
$email_data = array(
'email_title' =&gt; 'This goes in my template as the title',
'email_subtitle' =&gt; 'and a subtitle',
'email_templates' =&gt; array( 'send_my_test_email.php' )
);
 
$email_data['email_data'] = array(
'user' =&gt; $args["user"],
'link' =&gt; $args["link"]
);
 
$message = htmlize_message( $email_data );
$from = "From: \"Myself\" &lt;donotreply@me.com&gt;";
$message_headers = "$from\n";
$message_headers .= htmlize_get_message_headers();
 
return wp_mail($to, $subject, $message, $message_headers);
 
}
endif;
Okay, what’s this? Well, it’s pretty much a shortened rip-off of what’s in the plugin. You can integrate this any way you want. Make a new plugin and put this in there to call from your scripts is probably a good way. Or, for simplicities sake, just throw it in your themes functions.php file to test. Let me help you break this down further. This part:

if ( !function_exists('send_my_test_email') ) :
function send_my_test_email($to, $args) {
 
$to = filter_var($to, FILTER_VALIDATE_EMAIL);
 
$subject = 'New Test Email';
 
$email_data = array(
'email_title' =&gt; 'This goes in my template as the title',
'email_subtitle' =&gt; 'and a subtitle',
'email_templates' =&gt; array( 'send_my_test_email.php' )
);
defines the function “send_my_test_email” with two parameters (to and args). $to is who it’s to. $args is an array of arguments to parse so that we’re not accepting a dozen parameters. You could pass $arg(“to”=>”Me@my.com”) if you wanted and omit the $to but it helps you visualize what’s happening better. Once inside the function we filter the email with filter_var for those of you with php 5.3+. You can do what you will there. Then we define the subject. We could easily just pass the subject in with the args. I did, but for simplicities sake once again let’s write it out here. The next part is important and is crucial; the $email_data variable. This variable will be extracted and presented for use in the “MAIN HTML TEMPLATE WRAP”

WHAT????!!!! MAIN HTML TEMPLATE WRAP

Yep, there is a main template wrapper. This plugin sends emails by utilizing 2 templates. First, a wrapper that will declare the header and footer, and second a body template. So this first array will inject these variables into the main template. As a note, the plugin uses php’s extract on the array before including the template so your array keys will become variables to be used in the template. Oh, the email_templates key is also pretty crucial. This key tells the plugin what template to look for. It’s obviously just the name of the file. The plugin states that this file can reside in the plugin tempates folder or the current themes folder; so you choose on that one. I used the plugin template folder.

So what about the rest of the function:

$email_data['email_data'] = array(
'user' =&gt; $args["user"],
'link' =&gt; $args["link"]
);
 
$message = htmlize_message( $email_data );
$from = "From: \"Myself\" &lt;donotreply@me.com&gt;";
$message_headers = "$from\n";
$message_headers .= htmlize_get_message_headers();
 
return wp_mail($to, $subject, $message, $message_headers);
 
}
endif;
Well, the next variable, $email_data['email_data'], is actually just another key in the main template variable array. This key holds another array. These values in the array are, you guessed it, going to become variables in the second template; the body template. This means that the variables $user and $link will be available in our body email template.

The next section actually composes the email. htmlize_message( $email_data ); is a function in the plugin that turns your array into an email. Then you can add any headers you want and use the plugin function htmlize_get_message_headers(); to make sure that your email goes out in both html and plain text versions. And lastly, you can send the email using wp_mail which is WordPress’s mail equivalent. (Don’t get excited here, there isn’t much to wp_mail)

So what about these templates? Well, I’m not going to waste any time on that really. Just know that there are 5 templates included with the plugin. The template file “html_email.php” is the “MAIN HTML TEMPLATE WRAP” I was yelling about. You don’t have to use it, I did so I didn’t cover not using it. The other template files are all body template files. If you’re wanting to just test out my code real quick then do this:

GET TO TESTING QUICK!

Paste the whole code block at the top of this post into your themes functions.php file. Then, go to the html-email plugin folder, open up the templates folder, and copy/paste the new_user_user.php and rename it to send_my_test_email.php. Then, edit this file to say:

&lt;?php echo $user; ?&gt;&lt;br/&gt;
&lt;?php echo $link; ?&gt;
That’s it. You can put a bunch of html in there but you’ll want to test out these variables so you can figure out what’s happening quickly. Then, go back to your functions.php file and add this:

send_my_test_email("someemail@internet.com", array("user"=&gt;"This is the user variable","link"=&gt;"http://mneilsworld.com/");
Obviously, replace the first parameter with a real email address! Then, go to any page on your blog. Since it’s in the functions it’s included on any page. Don’t go to 20 pages, just go to one. If you go to more, you’ll get more of the same email! And there you have it. Quick, awesome, html emails from your WordPress site.