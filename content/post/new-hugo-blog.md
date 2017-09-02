---
title: "New Hugo Blog"
author: Marc Alexandre
date: 2017-08-20T12:05:57+02:00
categories: ["Blog", "Ghost", "Hugo", "Pelican"]
---

I created lots of blogs in my life, about a lots of subjects. I did movies & video games reviews, personal, company & technical blogs. I used a lot of blogging solutions. One of my last blog, already hosted on my current domain, was I think my best blog. Maybe because I know more about my subject, but also by its technical aspect. Built with [Pelican], it was a static site. It got a lot of traffic. I would have kept its content in this new blog, basically the same blog with a different theme and a different site generator, but I messed up and lost all its content. I never pushed my old blog to git, for no reason. I had to format my computer with all the blog data (it was a company computer, and I was given a new one). I deleted my two backups from my USB drive & external hard drive, because of some partition type. And I forgot to renew my hosting, losing the built site himself. I wanted to blog again for a long time. In fact, I never wanted to stop, but I had a hard time finding the right work/life balance. Now I'm confident that I found it, and it's time to blog again. I'll start by telling why I chose to build my blog with [Hugo].

<!-- more -->

## Why a static blog

For a long time, I was tempted by Medium. Even today, writing this blog post, I'm still thinking maybe I would be better off with only using Medium. It gots a nice UX for writing post, a good UI for reading them, a big tech & non-tech community, and a kind of easy to reach audience. But I prefered to make my own blog. Because I own the design, I'm not dependant on the mood of Medium. Because my posts will be forever owned exclusively by me. And because I'm only dependant on myself, not a third party. I know how using a third party can be awesome and relieve you from a lot of boring tasks, but for this specific case, owning all parts of my blog is something important for me.

![Analytics stats](/img/new-hugo-blog/analytics.png)

Now that I established why I'm not using Medium, let me get back about my [Pelican] blog. I made the theme myself, wrote posts in my favorite editor, and deployed everything to the most basic OVH shared hosting. At only 25€/year, it handled 1.5k unique visitors in less than an hour without any hiccup (I got to the top of HackerNews, didn't expect that much traffic). Way before that, I had a [wordpress] blog in the same hosting, but I had lots of MySQL errors when I reached only 30-50 daily users. It was a long time ago, [Wordpress] has gotten better since, OVH too. But those experiences made me realize one of the power of a static blog: there is almost no server load.

Another surprise came with [Pelican]. Without doing any SEO, I was getting high on Google searches. For example, I wrote a post about using Debian as a media center with a specific motherboard. There was a lot of problem to solve, finding the right packages, the right repos for every codecs to work. There was a lot of activity in the official Debian forums and wiki about this subject. But my blog post was the first result for everything related to this, and even on some similar topics but not directly linked. Google favors performance a lot, and by having fast response and not trying to manipulate their algorithms, I won the first place.

Finally, I love writing in markdown. I love being able to write with my favorite editor. I even got a linter for my English ([write-good](https://github.com/btford/write-good)). I love using versioning even on my blog posts, and I love git as a versioning tool. I also want to be able to handle as much traffic as I could, and I'm kind of cheap, so Ghost is too costly for me. Hosting it myself could be a good condition, but it would mean managing the server load myself, and managing the updates, and I don't want to do any of this.

## Why [Hugo]

Being sure I want a static blog generator was the first step. Then come the time to chose the right one. I wanted to see another solution from [Pelican]. If you don't know it, go check it. It's one of the best solution out there, and if you can write Python, it's easy to extend it. But since I fell in love with Javascript, I wanted to find a Javascript generator. I started playing with [Hexo], the most popular one. The first steps were easy. [Hexo] seemed powerful and highly customizable. But then, I started to have some problem creating a new theme and using specific tools during the build (mostly renderer like handlebars or mustache). But there is a great community around [Hexo], so after half a day working with it, I was almost ready to focus on creating a theme. And then, working on my post typography, I saw a bug in the syntax highlighting. At first I thought it was something with my markdown or my css, but no, it's in [Hexo]'s syntax renderer. I tried a lot of things, other renderer, trying to use a npm package, but after a few hours, I gave up. I knew I could find a solution, but why. Why do I have to fight so much for such a basic needs in a static site generator. If syntax highlighting needed me to work so hard, what will I have to do when I'll try to make something complex/already done by other tools?

<figure>
    <img src="/img/new-hugo-blog/hexo-bug.png" alt="Bug encountered with Hexo">
    <figcaption>Bug encountered with Hexo</figcaption>
</figure>

Then I tried [Metalsmith], another popular node generator. This time I wanted to be able to do basic things out of the box. After an hour I gave up this one too. It seems powerful, but not centered around a theme. At first, it does nothing more than moving files from your source folder to your public folder. You have to pick every part of your build, configure it. It's awesome for customization, espacially with easy to make extensions. But I want someting that works out of the box. I just want to make a theme, and write blog posts.

As the other Javascript alternatives seemed to be similar to [Hexo] or [Metalsmith], I decided to try [Hugo], one of the most popular static site generator with [Hexo] & [Jekyll](https://jekyllrb.com/). [Hugo] is in Go, and it's [really REALLY fast](https://www.youtube.com/watch?v=CdiDYZ51a2o). I have dabbled in go a few times, and even plan to make some local scripts with it because I want them to be performant, and I thought I could make some [Hugo] extensions if needed. But [Hugo] doesn't work like that. It gots a lot of powerful module (like a great syntax highligher, with integrated themes), but you can't add your own. It's easy to add custom "shortcodes", but you can't use sass inside of your [Hugo] build for example. But that's okay. You sholdn't have to build your sass everytime you build your site, even if your sass did not change. I think it's logical to have your theme already built with minified CSS & everything needed. [Hugo] should just manage your content and include it in your template, not building everything around it. By limiting its scope, [Hugo] can do the best it can on its own scope. And it does it very well.

To describe my experience with [Hugo]: it simply works. The documentation is good, giving my 80-90% of the answers I seek. The internal modules are easy to use and powerful, the templating logic is natural and easy to use (no more hacks around outside template engine). From the installation of [Hugo] to the state where I was with Hexo after almost a day, it took me maybe an hour. Then almost everything after that was just working on the typography & style of my blog, which is totally indepedant from the generator. I'm now a fan, and you can read my blog thanks to [Hugo].

[Hexo]: https://hexo.io/
[Hugo]: https://gohugo.io/
[Metalsmith]: http://www.metalsmith.io/
[Pelican]: https://blog.getpelican.com/
[Wordpress]: https://wordpress.org/
