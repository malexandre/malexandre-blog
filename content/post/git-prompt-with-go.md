---
title: "Git Prompt With Go"
date: 2017-09-02T14:24:27+02:00
author: Marc Alexandre
categories: ["Bash", "Git", "Go"]
---

Some years ago, I wrote a custom git prompt with bash. I upgrade it a few times to fix bugs or add some features, but more and more I was discourage to rework it only because it was in Bash. My knowledge of Bash is slowly decreasing as now I make most of my scripts in Python or Javascript, and having to remember everytime how to do simple things like doing a loop or extracting values from a string demotivates me every time. It's not like it's just another syntax, Bash is a whole different beast from my everyday languages. But I still wanted to upgrade & fix my prompt.

This week I read a blog post saying how switching to Go made the prompt feel so much snappier for someone who had its previous prompt in Python or Ruby, can't remember. Reading this made me start to rewrite my prompt in Go. I knew it would not be such a tremendous upgrade in performance, as my Go script would call Bash command too. But it was time to make it easier to maintain, and it's a good little exercise for my Go.

<!-- more -->

## The result

First, I'll show the result.

<figure>
    <img src="/img/git-prompt-with-go/old-git-prompt.png" alt="My old prompt, with less info and more bugs">
    <figcaption>My old prompt, with less info and more bugs</figcaption>
</figure>

<figure>
    <img src="/img/git-prompt-with-go/new-git-prompt.png" alt="My new prompt">
    <figcaption>My new prompt</figcaption>
</figure>

<figure>
    <img src="/img/git-prompt-with-go/performance.png" alt="Final performance. I ran it twice each.">
    <figcaption>Final performance. I ran it twice each.</figcaption>
</figure>

As you can see, both version are quite simple. I don't want to bloat my prompt with informatons. Most of my staging & commits are made with the official Git gui or with VSCode. In my terminal, I mostly manage my branches, rebases & everything relating to the git workflow. I focused my prompt around the informations interesting for those tasks. You can see the current version [here](https://github.com/malexandre/gogit-prompt)

## Starting the rewrite

My first step was to achieve the exact same prompt. I only have small experience in Go. I made a small web application that takes a number in GET parameters and returns a GS1-128 barcode, and that's all. I had to learn how to manage my Bash calls. It was easy, but I still forgot to manage code return from my calls. For example, testing if a git project is available in the current path is as simple as calling `git status`. If there is no git project, the command returns a string starting by "fatal". But it also returns an error code 128, and the basic `exec.Command` in python won't return this text, but only a Go error. In my case, I want to always get the returned string from the command, even if it's an error. I also wanted to avoid splitting my command everytime to send it to `exec.Command`. I think my solution came up quite nicely:

```go
func readCommand(cmdName string) string {
    split := strings.Split(cmdName, " ")
    cmd := exec.Command(split[0], split[1:]...)

    var out bytes.Buffer
    var stderr bytes.Buffer

    cmd.Stdout = &out
    cmd.Stderr = &stderr

    err := cmd.Run()
    if err != nil {
        return stderr.String()
    }

    return out.String()
}
```

Then I simply needed to exit the program if git status started with "fatal", and parse `git status --porcelain -b` results since it has quite a lot informations I need: current & remote branch name and if there is any changes not commited. There is also the state regarding the remote branch (commits behind & ahead), but for now my script will manage this later. Now is the time to find out if there is a master branch, because my Bash script only display commits diff with the `origin/master` if there was one, or with the current remote branch if there is not. Searching master in `git branch --list master` is enough. Finally, I need to find out the difference with the right remote branch. `git rev-list --left-right BRANCH...REMOTE` gives us everything:

```go
func countStringsWithPrefixInList(lines []string, prefix string) int64 {
    count := int64(0)
    for _, line := range lines {
        if (strings.HasPrefix(line, prefix)) {
            count += 1
        }
    }

    return count
}

func countCommitDiff(branch string, againstBranch string) (int64, int64) {
    gitCommits := readCommand("git rev-list --left-right " + branch + "..." + againstBranch)
    commits := strings.Split(gitCommits, "\n")
    return countStringsWithPrefixInList(commits, "<"), countStringsWithPrefixInList(commits, ">")
}
```

And voilà, I only need to comcatenate all this informations in a string and print it. It has the same data: current branch name, is there uncommited changes, diff vs master or remote, and even the "(no master)" to tell me that the diff is not from the master.

## Adding more informations

Now that I have the same results (minus the bugs, already), I can start adding more informations. I wanted to be able to see the commits diff from both the remote and master branch at the same time. When I'm in the master, no need to display the diff twice. And since I'm always showing both, no need for the "(no master)" string. Nothing too complicated with everything that's already been done, the only "hard part" is to chose a good format, simple enough to take as less space as possible in my prompt, but clear enough to be understood at a glance. I simply prefixed each diff by its first letter: R for remote and M for master, and I find the result quite efficient.

## Problems I encountered

I tried to apply [special fonts](https://github.com/gabrielelana/awesome-terminal-fonts) to make it easier on the eyes. But I'm not sure how to call the Bash variables from my Go script, and don't want to reference directly the character codes, as it can change in future releases. I'll try to fix that, and will use the Github push icon for the remote, and forked for the master.

Also, I'm not happy with the "*" to show changes waiting to be commited. Maybe I'll use the pen from the fonts, still not sure.

Finally, I can make one less call to bash in my Go script. For the current remote branch, I call `git rev-list`, but the diff is already displayed in the `git status`. All I have to do is parse it. I'm not confortable enough with go for the moment, since the displayed informations are not always in the same format (nothing if there is no diff, "[ahead 1]" or "[behind 1]" or "[ahead 1, behind 1]"), so I preferred to keep my old way by managing it the same way I use for `origin/master`. But I will learn go, and I will be able to optimize this.
