---
title: "AS3 Remoting Class & AMFPHP"
description: "Description of the post"
date: 2010-08-06T16:59:41+00:00
draft: false
---

# AS3 Remoting Class & AMFPHP

So if you haven’t heard; AMFPHP has been a big deal. With Flex doing all of Flash’s heavy data lifting lately it’s been a real, crying, egregious shame that Adobe has left out the Remoting Components from AS2. Although, I’m not going to just sit here and ramble on about how Flash is still more than capable of remoting and how tons of people are still doing it. Instead, I’d like to offer first my solution, and second a list of places that helped me get there. This blog and access to my classes has recently stemmed from a conversation (email) I had with Josh Strike and his strike remoting class. I’ll admit I haven’t looked it all over or even used his class; but below I’ll offer my version which unknowingly to me grew out of his; or shrank I should say.

If you’re antsy, here’s the classes in all their glory: RemotingService

Now let’s briefly take a look at what we are/can going to do with this. First, you’ll need and want AMFPHP. I’m not going to explain what it is or what it does because there’s no time for that here and there are plenty of resources out there you can use for now to figure it out. Maybe that’s another post? To get started, you’ll want to unpack AMFPHP to a server, local or live, and you’ll need a “service” to get you started. Here’s an example service straight from the AMFPHP website:

class pizzaService {
 var $ordertable = "amfphp_orders"; // the orders table
 var $pizzatable = "amfphp_pizzas"; // the pizzas table
 /* mysql_connect and mysql_select_db are in the constructor */
 function getOrderList ()
 {
 $sql = "SELECT o.order_id as orderid, o.order_status as status, o.order_name as name, p.pizza_id as pizzaid, p.pizza_details as details, p.pizza_quantity as quantity FROM $this-&gt;ordertable o, $this-&gt;pizzatable p WHERE o.order_id = p.order_id AND o.order_status=1 ORDER BY o.order_time";
 return mysql_query($sql);
 } 
 
 /* Other methods below */}
If you’re not well versed in PHP that’s okay. This is just a class, like mine above in AS, that has a couple of properties (variables), and a method (function) that runs a MySQL query to return data from a database. You don’t need a database to do remoting! And, as I’m writing this I’m realizing we might keep it simpler; but that example above is just a small taste of the power of AMFPHP. Here’s a smaller example:

class pizzaService {
 
function whatIdSay ($s)
{
return "you said: $s";
}
 
/* Other methods below */}
That’s about as simple as it gets. The class pizzaService now has just it’s one method that returns what you sent to it back to you. Not very useful, but a good example. Let’s get to the good stuff, the actionscript. Open up a new flash project, or file, or whatever so you can get some code down and here’s the first bit:

import com.remoting.RemotingService;//remoting
 
var gatewayUrl:String = "http://localhost/amfphp/gateway.php";
var rs = new RemotingService();
rs.Connect(gatewayUrl);
RemotingService.Load("pizzaService.whatIdSay", Success, "BooYa");
This part is pretty straight forward I think but perhaps not. Import the class so we can use it. Start a new instance of the class and call the Connect method. And, lastly is why am I doing this? The class is public, but many methods/variables are static. This is a bit of the beauty of the class. If we just need to make one connection in one place to get one result at one time then this kinda sucks…. But, let’s assume, and this is what I needed, that I’m going to be making one connection to the gateway but calling services all over the place from different classes; then this method works best for me!

We still have a bit more code to write in order to get anything out of this though. We’ll need to get our information back from the server. Above, the Load function calls the class and method, sets the callback function, and passes in the parameter. The Success function could look something like this:

function Success(re){
trace(re.result);
}
//you said: BooYa
Anyone that’s used the remoting components or has worked with remoting and AS3 might notice that the amount of code is about the same with the class as without it, and may also wonder about calling other methods of the service or what happens to errors? Working backwards, errors are handled directly in the class in a fault method so no need to setup error handling. Also, Success is always called in the scope it was sent from. Finally, you can call dozens of methods this way with dozens of parameters. Another example – new service method:

function whatIdSay($s, $r)
{
return "you said: $s, and I said $r";
}
Now, assuming you’ve got the setup above in actionscript you could call the Load method again like:

RemotingService.Load("pizzaService.whatIdSay", Success, "BooYa", "Grandma");
You can pass any number of parameters to any service by just appending them in there. No need to construct a new object, write new services (If you’re migrating from AS2 components to AS3) or deal with any of that. The other nice thing about the class is that it’s static. So once connected in one class we can call Load from another without reestablishing a connection. This means over classes in one project you only need one connection; unless of course you’re switching gateways.

Lastly, people might remember how beautifully results came back from a database with the old components and now they’re confusing! Fortunately, this is where Josh Strike took over and did the parsing for us. I’ve put his basic parser into a utility class that will come in and return us some clean objects. Let’s say our service looked like:

class pizzaService {
var $ordertable = "amfphp_orders"; // the orders table
var $pizzatable = "amfphp_pizzas"; // the pizzas table
/* mysql_connect and mysql_select_db are in the constructor */
function getOrderList ($s, $r)
{
$sql = "SELECT o.order_id as orderid, o.order_status as status, o.order_name as name, p.pizza_id as pizzaid, p.pizza_details as details, p.pizza_quantity as quantity FROM $this-&gt;ordertable o, $this-&gt;pizzatable p WHERE o.order_id = p.order_id AND o.order_status=1 ORDER BY o.order_time";
return array("message"=&gt;"your said: $s, I said : $r", "query"=&gt;mysql_query($sql));
}
 
/* Other methods below */}
Now you’ve got some more serious data coming back. You’re sending an array containing a string and a query. Well, the Load still looks simple like:

RemotingService.Load("pizzaService.getOrderList", Success, "BooYa", "Grandma");
But, you’re Success will change slightly:

function Success(re){
trace("Message: "+re.result.message+", query: orderid:"+re.result.query[0].orderid+" , status:"+re.result.query[0].status);
}
//Message: you said: BooYa, query orderid: 1, status:sent
Honestly, I don’t know that orderid will be 1 or status will be sent but that’s how you’d retrieve the results. This is slightly different than the old re.result.getItemAt(0).id but it’s at least down to the same amount of code or even less stretched across a project.

Obviously, I mentioned Josh Strike a dozen times and his parser works well. His Remoting class looks to be the most substantial I’ve seen; although there may be others. Josh also mentions a proDevTips which is actually where I found his parser and I’m grateful for that post as well.

Josh Strike
Pro Dev Tips

So why use mine and not theirs? I don’ t know, for the love? No, there is a valid reason. Josh’s is by far the most complete with all sorts of added features like request timeout. And, the one at proDevTips is lightweight and only 1 class. However, mine is as easy to use as Josh’s (proDevTips has you passing objects with named values to call services and those services have to know what’s being passed and rewritten if you’re finally migrating from AS2 to AS3) and is still lightweight with the same amount of code as proDevTips’ except that it’s broken into two classes: the parser, the connection and calls.

Other AS3 remoting articles that helped me:

http://www.oscartrelles.com/archives/as3_flash_remoting_example

http://osflash.org/as3lrf

Update:
8/8/2010
Added new RemotingQueue class to queue multiple calls to the server at once and call them in the order they were received.