---
title: "Dealing With Credit Card Gateways"
description: "Description of the post"
date: 2012-10-16T22:25:22+00:00
draft: false
---

# Dealing With Credit Card Gateways

I’ve processed thousands of credit card payments. Well, not me really, but my code has. And in doing so I’ve started to find a flow; a list if you will, of things that you absolutely must do to keep your visitor’s heads from exploding when trying to send you money!

Make It Easy

But what does that mean? Everyone knows that people tend to take the easy route. And your payment flow is no different. Recently I tackled an issue for a client where they accepted two payments types: check or credit card. Check processing online has a much lower cost to process than credit cards and that’s mostly due to the shear amount of information necessary to accept a check online. Most people don’t by with their bank account on anything other than utility bills. And besides the fact that paying a bill is not fun in and of itself it’s even less fun when you have to pay with your checking account. You’ve got a 13 digit routing number and a variable length account number to enter and often times you must also collect a users phone number, address, and sometimes even driver’s license number depending on the processor you’ve chosen. So what does all of this information mean and how does it effect you or me in our workflows?

Setup A Flow

All of this data we have to collect makes the conversion rate for online payments by check instantly drop without the right presentation and flow. For instance, the setup I was dealing with involved the user registering, entering a bill, entering their payment information, accepting a bunch of terms, then receiving a confirmation. During that flow they could also apply credits and choose a payment method. The conversion rate was so bad in fact that we opted to default on credit card payments for users even though the fees we paid were higher than the check processing fees. But, with a little design, and some UX leg work I was able to help turn that trend around and get us processing checks; and saving money!

How Was It Done?

I simply applied a few rules I’ve learned over the years along with my own experience and user feedback on paying bills online. Our major issue was that the flow was too confusing. You had to enter the payment screen and enter your bill amount, then enter all of your payment information like your name and address, then you had to choose a payment method and enter your driver’s license, state, bank name, state, routing number, account number and on and on and on. And, you had to do this each time you paid a bill! To simplify things I started by remembering and pulling the users data when they went to pay a bill.

If you’re not remembering your users information then you’re wasting their time.

So now the user only has to enter their general billing information once. If you’re not remembering your users information then you’re wasting their time.