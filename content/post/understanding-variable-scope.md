---
title: "AIR3 In Flash CS5 For iOS / Android"
description: "Description of the post"
date: 2011-01-25T16:31:56+00:00
draft: false
---

# Understanding Variable Scope

This week I saw a lot of problems on forums, and at our office related to scope. So I’ve decided to write on scope as it relates to a few languages and discuss why understanding variable scope can save you a lot of headache. I know there are already quite a few articles online about it; but while most only discuss how to keep variables in scope and use them, most don’t talk about the importance of it. And, more importantly, I don’t see a lot of articles discussing scope as it relates to variable declaration and in some cases datatyping. Let’s get right to it.

Suppose in JavaScript:

function sete(){
e = 0;
e ++;
console.log("E: "+e);
}
sete();
console.log(e);
We’ll get this log:
E: 1
1

Okay, that’s fine. But is e in sete supposed to be the same as e outside of the function? And, what if we called sete after using e? We get an error, undefined variable. That is why it’s very important to declare all variables within their scope. JavaScript is a pretty loose example; which is why I don’t particularly care for these scripting languages in examples like this. If what I’m saying makes sense then I’ll save you some time and tell you this article isn’t for you. If you’re wondering what just happened then don’t re-read it until you do. Instead, keep reading.

Let’s take a stricter language, ActionScript 3. Suppose you tried the same code above from the JavaScript example in Flash using ActionScript 3.

function sete(){
e = 0;
e ++;
trace("E: "+e);
}
sete();
trace(e);
All I’ve done is replace the console with trace. This won’t compile. And it shouldn’t. e has never been properly declared in any scope. AS3, like JS and PHP classes can all accept declaring a variable with the word var. PHP won’t allow this outside of a class although I often wish it did. And, when available to you, whether required or not, you should declare your variables using var. This would change both our examples to:

JS:

var e = 0;
function sete(){
e++;
console.log("E: "+e);
}
console.log(e);sete();
AS3

var e = 0;
function sete(){
e = 0;
e ++;
trace("E: "+e);
}
sete();
I’m not showing any PHP examples at this point because I think it’s confusing to my point of declaring when available since PHP can’t declare in the same manner as the others outside of classes. And, classes may convolute the example. But, both of these work and are valid. We’re declaring the variable e to be global. Now I often see the word global used, and properly so, but this is not to be confused with PHP’s global declaration or ActionScripts as well. Global has been removed in AS3 and likely because it’s the cause of a lot of bad code and isn’t needed. Let’s take variable declaration one step further before we delve deep into scope. AS3 lets you datatype a variable at declaration. Both PHP and JS will datatype but they are done at execution and therefore can change type during runtime where AS3 cannot do this. Both ways have their advantages but lets take a look at datayping:

AS3

var e:int = 0;
function sete(){
e = 0;
e ++;
trace("E: "+e);
}
sete();
trace(e);
The difference with this block and the last is simply the appendage of :int to the variable name. We’ve now told the Flash compiler we’re using this variable as an integer and it should only devote enough resources to do so. The advantage to this is speed; both in execution and compiling. It does something else though that can’t be measured; and that is help keep you sane! Take the below examples in each JS, AS3 and PHP:

JS:

var e = 0;
function sete(){
var e = 10.5;
e ++;
console.log("E: "+e);
}
sete();
console.log(e);
Outputs
E: 11.5
0

PHP

var e = 0;
function sete(){
var e = 10.5;
e ++;
console.log("E: "+e);
}
sete();
console.log(e);
Outputs
E: 11.5
0

AS3

var e:int = 0;function sete(){
var e:Number = 10.5;
e++;
trace("E: "+e);
}
sete();
trace(e);
Outputs:
E: 11.5
0

So what’s the big deal? Each outputs the same information right? Yeah. But, we’ve now declared e twice in each example. And, it’s coming out as two different values which is what it should do. The AS3 version in my opinion illustrates scope the best because you can see that I’ve set two completely different datatypes for the variable e. Keep in mind these definitely are not the same variable. And, datatyping helps declare that visually to the developer. Sometimes this gets lost, especially when you’re just starting, when using scripting languages with loose datatypes that change at execution. Now, we may want e in the function sete to increment the global e set outside of the function. And, that’s fine and doesn’t apply to this example. We also couldn’t have two datatypes that way like we do in flash. Hopefully that illustrates why declaration and datatyping (when available) are a best practice.

Okay, but that didn’t explain a lot about scope. Looking back at the examples we can see that anytime we declared a variable with the word var we created a new instance of that variable. And, that it was only effected when it was used in the area it was declared. Variables declared inside of a function are not available outside of that function. Variables declared in the documents root or base document are available everywhere as long as they’re not redeclared inside another function. And, substitute the word function for class and take it deeper and substitute method for function again and it’s the same. Variable instances declared in the method of a class are not available outside that method. And class variables are not available outside of the class (of course public variables can be but that’s really not for this article).

PHP has a special exception to some of these rules in that it relies on the global declaration for scope inside of functions, classes, and methods. That means that a variable declared in the base document in PHP isn’t available automatically to functions without being declared global. That means that the following throws an error:

$e = 0;
function sete(){
$e ++;
echo "E: ".$e;
}
sete();
echo "&lt;br/&gt;";
echo $e;
However, if we use the global statement we can access $e:

$e = 0;
function sete(){
global $e;
$e ++;
echo "E: ".$e;
}
sete();
echo "&lt;br/&gt;";
echo $e;
Outputs:
E: 1
1

This has become a lengthy enough article and full of information many may not want to hear but it’s absolutely imperative that you understand variable declaration to understand variable scope and I hope that helped get somebody there. Understanding declaration will help you resolve and understand scope issues and save you a lot of time in the future. If this helped, or you have questions, or you see a mistake let me know below!