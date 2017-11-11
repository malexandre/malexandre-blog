---
title: "Dropbox Paper as a Knowledge Base"
date: 2017-11-11T14:50:23+01:00
categories: ["Knowledge", "Productivity", "Dropbox", "Google"]
author: Marc Alexandre
---

When I started working as a developper almost 10 years ago, there was so much to learn, and using books or the web was so useful it helped me progress quickly through my different tasks. It was hard ot find the right information, but once my knowledge was so small, it was easy to find it again later on. Then I moved from C to C++, did some PHP, then focused on Java, then Python and now Javascript. And during all that time, I encounter many problems, found so many solution, by myself, with others or by just finding the right external source. It can be hard at times to remember the right command for a specific task, or the right solution for a specific problem, and finding it again is now harder because my mind is bloated with much more informations. That's why I started using a knowledge base.

## Easily find the right information at the right moment

My goal is simple. For example, if I want to format and reinstall my Arch Linux on my XPS 13 in a year, or even if I want to help a coworker doing the same thing in a few months, I will never be able to remember exactly what I did to do it. It's not that hard, and most of it is just following the official documentation, but there was one specific problem that made me waste time: Secure boot & other bios configuration making the SSD not accessible from the USB bootable drive. And also, listing all the packages I like will help me make sure I get back to my favorite environment quickly.

All the solutions for this are available on the web already. But I will have to search through Google/DDG again, going through the same forums/articles, and wasting my time again, just because I can't remember everything, and what I did once, or what I do only once in a while, can get forgotten. For recent work, I'm a heaver user of bash history, or clipboard managers, git, etc. But for recurring problem, or problems that needs some long search before resolving it that might occur again one day, I wanted to have an easy way to find the right information again.

Google Keep is a good start: Great search capacities (well, it is a Google product), simple, accesible through multiple devices. It just misses on formatting. And formatting is way too important for a knowledge base, especially as a developper. And also I might want to share this knowledge base a times, not note by note, but the whole base. And I'm not a fan of Evernote, for different non-important reasons. Then I thought of using a Ghost Blog with a "Google Keep" theme. But hosted Ghost is too costly for this, it would be lot of work to host it myself, a lot of work for the theme too, and I'm not too sure about the way to manage the search.

Then I thought about creating my own app. It's an easy app, the only complicated aspect would be the search, but providing a field with keywords/key expressions, and using elastic search or something like that would not be that complicated. Frankly, I think it's a really small app that would have been fun to make. And I could even transform it into a SaaS product easily in the future. But again, too much work for now, and surely it's impossible that there is not already something sufficent enough besides Evernote.

## Dropbox Paper

A friend of mine guided me to Paper, and it was a good call. Same simplicity and accessibility from Googke Keep, same powerful search, but with formatting. And not costly at all (well, I'm using the free version right now). I like the ergonomics (working on block is so easy), I can share it to some people, and it got interesting features (files, external app connector, etc.) I didn't even considered. I've been using it for the last month, for example to avoid having to search every time [how to use the community repo in Alpine](https://paper.dropbox.com/doc/Alpine-Add-package-form-edge-hsdKUqhs19jhmwKZxipO1?_tk=share_copylink), and even trickled with my idea of a "keywords/key expressions" field by writing it on the last line of my notes to help the Paper search engine.

Everything's not perfect: I'm dependant on Dropbox. If one day they decide to become evil, too bad for me. Also, the sharing is too much of an "all or nothing". I would like to have a "public version" of my notes, a "friend version" (with them able to comment for example), and my version. And I'm not sure about the scalability of the solution. But for now, it's the solution I'm using. I will surely work on my own app one day, just because it seems fun, but I'm pleased with Paper right now.

My friend also talked about Notion.so, and how he loves it so much and it could be perfect for my needs. But Dropbox Paper was enough for me, so I'm using it for now. And what's cool is that I can export all my notes into markdown if I want to leave Paper one day, that's nice. And as for sharing, I also use this blog, and sometimes a note can become a blog post by itself. For example, I think I'll make a blog post about my Arch Linux installation, it might help people with the XPS 13.

And what about you, how do you make sure you can find again the information you feel can come in handy?
