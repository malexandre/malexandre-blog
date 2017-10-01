---
title: "Node Web App Without Database"
date: 2017-10-01T15:39:01+02:00
author: Marc Alexandre
categories: ["Blog", "Code", "Docker", "Hugo", "Live-Hugo", "OVH", "Node", "Python"]
---

As I said in an earlier post, I'm currently working on a Node/Preact app to manage my Hugo blog without having to use my computer & editor. Since I'm alone on this, with no deadline, I can take my time, try different things, etc. At first, I was going to use a database to remember the files on the disk, make searching through them faster. But I decided to test if it was viable to manage everything without a database. TLDR: It is.

<!-- more -->

## App description

Hugo is a really interesting static site generator (SSG), but its content are mostly identical with other solutions. That's one of the nice side of the SSGs, you can switch from one to another pretty easily. I use only one folder for all of my posts, `content/post`. The app would have to be able to list all the files in this filder, filter them by their title (and why not more later), order them by their `date`, and return just the asked subset (to help manage pagination & client performance). This is very basic stuff for a database, but here we will have to open each files to parse the YAML Front Matter, and manage filtering & sorting in memory.

There is a lot of andvatages working directly with the files for my case:

- No risk of database desynchronization if I decide one day to add a post with GitHub for example
- Working directly with files will make my commit management easier
- No duplication of data in the server, and the one I use only have 20GB of storage
- I can launch Hugo generation directly without having to check if all my database data are up to date on the disk

But searching through the files is no easy task for an app. My server uses SSD, but is it fast enough to offer a smooth experience? I don't care about concurrency or disk load since it will be used by only one person, me. Those problem would be easy to deal with a database, not so much with my solution. So let's focus on the only potential problem: speed.

# Test definition

For the test, inspired by the [Hugo Benchmark](https://www.youtube.com/watch?v=CdiDYZ51a2o), I will write 5000 random posts, with a little more content than in the Hugo benchmark, since I want to make sure my solution can handle real world posts file, that are usually bigger. Then, using Nodejs, I will make 4 tests:

- Querying the first 10 files ordered by date (most recent)
- Querying the 5 post wiht "My Post" in the title, ordered by date (most recent)
- Querying the first 10 files ordered by date (older first)
- Querying 50 files from the 50th file ordered by date (older first)

And for comparison, I'll make the same test with Python 2.7. I'll make those test on my old desktop computer, using a 7 year old Western Digital 2TB Caviar Green (used a lot for gaming with constant download/delete with Steam), and then on my SSD Server from OVH. It's important to note that my current desktop computer is on Windows 7, and since I prefer working on Linux, I'll make those test in a Virtual Box ubuntu, making the performance even worse. Also, on my computer, I will test directly on my system, but also inside a dockerize solution. On my server, it will only be on a dockerize solution, since I don't want to pollute my server, which I'm using for example to serve you this blog.

You can find all the test code on GitHub: [test-node-file-listing-perf](https://github.com/malexandre/test-node-file-listing-perf)

# Results

I'm really impressed with the results. Also, I'm not sure what's happening with the Python version on native Virtual Box, especially when comparde with docker inside the same Virtual Box.

<figure>
    <img src="/img/node-web-app-without-database/old-hdd-direct.png" alt="Inside my Virtual Box, without Docker">
    <figcaption>Inside my Virtual Box, without Docker</figcaption>
</figure>

<figure>
    <img src="/img/node-web-app-without-database/old-hdd-docker.png" alt="Inside my Virtual Box, with Docker">
    <figcaption>Inside my Virtual Box, with Docker</figcaption>
</figure>

<figure>
    <img src="/img/node-web-app-without-database/live-server-docker.png" alt="On my server, with Docker">
    <figcaption>On my server, with Docker</figcaption>
</figure>

That's awesome! I will never have so much post, but even with 5000 posts, node serves the different request under a second. Of course, with a database, even sqlite I think, it would surely be clearly under 100ms, especially with only 5000 posts, but still, it's quite impressive. And I didn't finish my code, I still need to optimize some things (even though it won't be fully optimize for performance as I want to focus on readibility). And it's interesting to note that those results are happening on a really small server, the [VPS SSD 2](https://www.ovh.com/us/vps/vps-ssd.xml), so a better server would be even faster.

And with those results, I'm now sure that my solution will work without database.

PS: If you think what I did in my tests is not performant at all, I would be happy to hear your solution and update my post with it. What I did is currently very basic, and the libs I used may be not the best for the job, but they seemed quite efficient and easy to use. So really, feel free to contact me through the comment or directly, and I will happily update my tests and the results here.
