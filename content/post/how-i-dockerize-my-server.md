---
title: "How I Dockerize My Server"
date: 2017-09-09T15:44:54+02:00
author: Marc Alexandre
categories: ["Blog", "Docker", "Git", "Nginx", "OVH"]
---

To host this blog, I bought a [VPS SSD 2 server on OVH](https://www.ovh.com/us/vps/vps-ssd.xml). It's 7€ per month, has a decent amount of storage for my current needs, and I will be able to build some apps on it. I could have gone with a classic shared hosting, but I wanted to be able to build my blog directly from my server. To do that, I dockerized everything.

<!-- more -->

## But why?

First, for a simple reason: To be able to test my configuration locally before deploying it. Docker take care of the environment, so you know you will have the same on every machine you use your docker config. By testing my nginx configuration & my build setup directly on my computer, it was easier to fix the issues, and also it was faster because of my high end processor. Once I was sure everything worked, I launched my docker-compose on the server, and I was done.

Second, it means I have a minimal installation on my server. The only things I need are Docker and Git. My whole server configuration is on [GitHub](https://github.com/malexandre/personal-server), so I needed an easy way to fetch it and upate it on my server. Using git was logic, as I'm already using it for versioning. If I change the configuration, a simple `git pull` updates everything and I just have to `docker-compose up`, and leave my ssh session.

It also means that I can switch to another server/provider anytime I want. All I need is a server with git & Docker, and mostly all linux server can handle that. It's also easy to switch to a container service, but for now I want to have my own server.

## How?

For now, there is only my blog, so the config is pretty straightforward. I plan to had a custom Node app to be able to write my article directly one the server, commit them & rebuild the site by a simple click, but that project is not ready at all, I just planned it. To serve my blog, I used nginx. Here's my docker compose configuration:

```yaml

version: '2'
services:
    web:
        image: nginx:alpine
        command: nginx
        restart: always
        ports:
            - 80:80
        volumes:
            - ./www:/usr/share/nginx/html:ro
            - ./nginx.conf:/etc/nginx/nginx.conf:ro
    blog:
        build:
            context: ./blog-context
        volumes:
            - ./www/blog:/blog/public
    # blog-admin:
    #     build:
    #         context: ./empty-context
    #         dockerfile: Dockerfile-blog-admin
```

As you can see, I already planned my blog-admin app, even though it's not ready. For nginx, I didn't even need to create my own docker image, using the official (on alpine for a smaller size) is enough. The only thing I needed was to give my own configuration & files to serve. Side note, the official docker-compose package on Debian 9 is not up to date, so I was forced to keep using the 2nd version of the `docker.compose.yaml`. But with a simple configuration like mine, it's not a problem. I used the restart policy to make sure my nginx boots up with my system.

Then, for my blog, I made my own Dockerfile. Starting from Alpine, again, I installed everything I needed, uninstalled what was only needed to build some gulp dependencies, and made own entrypoint script to build a new version of the blog everytime I launch the container. Some things are maybe too much (adding yarn makes the image bigger, and it just speeds up the build, it's not essential), and I think I could optimize the build steps with some caching, but for now it's enough. I could also just have used a scripts form my package.json, but at least like this my blog is not linked to my build configuration for Docker.

With all this configuration, I simply need to `docker-compose run blog` from my server, and everything is up to date.

```Dockerfile
FROM alpine

RUN mkdir -p /blog
WORKDIR /blog

RUN apk add nodejs nodejs-npm git py-pygments openssh-client build-base file nasm autoconf --no-cache
RUN apk add --no-cache -X http://dl-4.alpinelinux.org/alpine/edge/main automake zlib-dev
RUN apk add --no-cache -X http://dl-4.alpinelinux.org/alpine/edge/community hugo
RUN npm install -g gulp yarn
RUN git clone --recursive https://github.com/malexandre/malexandre-blog.git .
RUN yarn
RUN apk del build-base file nasm autoconf automake zlib-dev

ADD build.sh /blog/build.sh

CMD ["sh", "build.sh"]
```

```bash
git pull
yarn theme
yarn
gulp build
hugo
```

# Next steps

Currently, I need my computer to write a new article on my blog. I can ssh from my phone easily, but writing an article with git is not that simple. I can write it directly on Github, but if I want to add images, it starts to be too cumbersome to really do it. That's why I want to build an app to manage everything easily, on any computer or mobile device. I know there is some solutions already out there, but I also want to keep working on more Preact & Node apps, so it's a good excuse. I also think I will build a custom app to organize board games nights with my friends, as most of them don't like Facebook or are not ready to check a slack community every once in a while. My app would be entirely usable with emails, by notification and answering to those notifications, so maybe it will be more adopted. If not, it will still be a good exercise.

And regarding the performance on my server, for now my blog does not have a big enough reach for it to be a problem. Nginx uses only 4% of my processor, and 25% RAM, nothing critical. We'll see with time, and especially with more node app, if it will be enough, but I'm pretty sure it will.
