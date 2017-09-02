---
title: From AngularJS to Preact
author: Marc Alexandre
categories: ["Code", "AngularJS", "React", "Preact"]
date: 2017-08-24T22:37:00+02:00
---
For the last 5 years, I've been working at [LumApps] with AngularJS. I've done lots of projects, from simple websites to powerful applications like our products. I also built [LumX](https://ui.lumapps.com/) with the help of our lead designer. But after all this time, I now want to switch to another one.

<!-- more -->

## Why I want to stop using [AngularJS]

[AngularJS] is a great framework. It helped me become a better Javascript developper, helped our business grow at [LumApps], and has awesome features. But as I grew as a web developper, I slowly but surely began to want something else. The obvious first reason is that [AngularJS] will start being more and more deprecated with the rise of [Angular], especially since [Angular] 4 and the assurance of continuity for the next releases. But that's not all. I think [AngularJS] has some outdated logic, and it makes building heavy application harder than it should be.

First, the digest. Even if you optimize your application perfectly, with a digest as fast as it could, making sure a digest loop only use formatted data and can never update the data by itself, there will still be two digest cycle. I know that's core to the framework, but I think it's tremendously expensive. [AngularJS] was meant to make your work easier, but this puts a new difficulty you have to manage yourself in your application logic.

Then there is the dataflow. Two way data-binding is a core part of [AngularJS]. It appears to be so magical at first, but it's an anti-pattern so dangerous that I don't want it anymore. Granted, you could make a one-way dataflow, you could even do redux-like data-flow. But it's like using a bazooka to kill a fly. It works, but you're leaving aside a lot of the framework, and it would be easier with another one, [Angular] included.

And, to keep it short, I want to work with a framework fully component oriented, with a clear separation between the view and the logic. I want code splitting, PRPL pattern, and a lot of things that is possible with [AngularJS], but not without a lot of hassle. I think it's too complex where it shouldn't be, too lackluster where it should shine, too much without solving enough (especially in comparison to the alternatives). Finally, I find the syntax of [AngularJS] too heavy.

I won't go too deep into why I didn't switch to [Angular], it's mainly because there is still a digest loop behind it and that I think it's still too big even minified, and because I wanted to test something else entirely.

## Here comes [React]

Around the same time Google took the lead around [AngularJS], Facebook created [React]. But it became open source only in 2013. The framework does a lot of things exactly how I want it: light syntax, totally component oriented, view separated from the logic. In fact, it's so close to how I wanted things that I grasped it instantaneously.

That's not to say everything is perfect in the [React] world. First, and it's a BIG BIG PROBLEM, the BSD license + patents. I won't talk too much about this, because there is already way too much discussion about this, and by people with way more qualification regarding the subject. But come on, using the open source community to be a legal monster, that's low.

Then there is the size. This is a component base framework. It should be really focused on delivering the lighter applications possible. But even for the small applications I wrote with it, the minified version was way to big for what it is. I know using Bootstrap CSS for those small applications didn't help too, but it should be way ligher.

And finally, there is some logic problem that I don't understand (not being able to call `this.setState` in the constructor for example), but that's something you should never encounter if you use Flux/Redux, which you should as it fixes almost all those kinds of problem by adding even more separation of concerns, which is awesome. And the performance? Forget the digest cycle, you're only working on the shadow DOM, and the actual DOM updates are focused on the component concerned by the updates, not the whole DOM. Way better and logical.

But I loved this framework so much, and the community is so active and awesome, I really want to continue using it. And there is a solution for both the license and the size.

## [Preact]

[Preact] is like [React], but better (in my opinion). First, it tries to stay way closer to the browsers. It tries to push the PRPL pattern, tries to be as fast as it can on every devices. It keeps almost the same syntax as [React], but tries again to be closer to the Web Components. And while being different from [React] in its way to approach each problems in its core, it also tries to stay compatible with the [React] eco-system. And if [Preact] is not compatible by himself, Preact-compat will fix almost all compatibility problem, with again a small sized plugin. And regarding the license? MIT, like most of open source projects. It's like [React], but without the bad sides.

Now that I'm starting new projects, I will be able to fully embrace [Preact] and learn it as much as I learnt [AngularJS]. I can't wait.

[Angular]: https://angular.io/
[AngularJS]: https://angularjs.org/
[LumApps]: https://www.lumapps.com/
[Preact]: https://preactjs.com/
[React]: https://facebook.github.io/react/
