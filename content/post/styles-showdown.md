---
title: "Styles showdown"
author: Marc Alexandre
categories: ["Blog"]
date: 2017-08-20 17:42:00+02:00
---
I open sourced my theme, and everyone can use it with their Hugo setup. I think it's also easy to port to another blog platform if you want. Here is an example of all the styles available.

<!-- more -->

## Headings

# A h1 header

## A h2 header

### A h3 header

#### A h4 header

##### A h5 header

###### A h6 header

---


## Text

### Full sentence

**Pellentesque habitant morbi tristique** senectus  et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. _Aenean ultricies mi vitae est._ Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, `commodo vitae`, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. [Donec non enim](#) in turpis pulvinar facilisis. Ut felis.

### Text-level semantics

The [a element](#) example

The <abbr>abbr element</abbr> and <abbr title="Title text">abbr element with title</abbr> examples

The **b element** example

The <cite>cite element</cite> example

The `code element` example

The <del>del element</del> example

The <dfn>dfn element</dfn> and <dfn title="Title text">dfn element with title</dfn> examples

The _em element_ example

The _i element_ example

The <ins>ins element</ins> example

The <kbd>kbd element</kbd> example

The <mark>mark element</mark> example

The <q>q element <q>inside</q> a q element</q> example

The <s>s element</s> example

The <samp>samp element</samp> example

The <small>small element</small> example

The <span>span element</span> example

The **strong element** example

The <sub>sub element</sub> example

The <sup>sup element</sup> example

The <var>var element</var> example

The <u>u element</u> example

---

## Blockquotes

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.

## Pullquote

<blockquote class="pullquote">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida.</p>
</blockquote>

**Markup**

```html
<blockquote class="pullquote">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida.</p>
</blockquote>
```

---

## Lists

### Ordered List

1. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
1. [Aliquam tincidunt mauris eu risus.](# "#")
1. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. This bullet tests content going onto two lines

### Un-ordered list

* Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
* [Aliquam tincidunt mauris eu risus.](# "#")
* Lorem ipsum dolor sit amet, consectetuer adipiscing elit. This bullet tests content going onto two lines

### Definition List

<dl>
    <dt>Definition Title</dt>
    <dd>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</dd>
    <dt>Lorem ipsum dolor sit amet</dt>
    <dd>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris commodo consequat.</dd>
</dl>

### Nested Lists

* Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.
* Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.
  * Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
  * Aliquam tincidunt mauris eu risus:
      1. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      1. Aliquam tincidunt mauris eu risus.
      1. Vestibulum auctor dapibus neque.
  * Vestibulum auctor dapibus neque.
* Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.
* Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.

---

## Media

### Image

![Kitten](http://placekitten.com/450/300)

[![Kitten](http://placekitten.com/450/350)](#)

### Figure

<figure><img src="http://placekitten.com/800/350"><figcaption>Figcaption content</figcaption></figure>

---

## Code and Syntax Highlight

```c
int charArrayToInt32Array(char * clearText, unsigned int * int32result) {
  int i = 0, j = 0, total = 0;
  int dec[4] = {24, 16, 8, 0};
  unsigned int returnedInteger = 0;

  // A comment
  for (i=0; clearText[i]; i+=4) {
    returnedInteger = 0;
    for (j=0; j <= 3 ; j++) {
      returnedInteger |= (unsigned int) (clearText[i+j] << dec[j]) ;
    }

    int32result[total] = returnedInteger;
    total++;
  }
  return total;
}
```

```html
<div class="wrapper">
  <!-- a comment -->
  <p><b>HTML</b> syntax highlighting</p>
</div>
```

```css
.wrapper {
  /* a comment */
  width: 960px;
  margin: 0 auto;
}
```

```js
// a comment
var s = "JavaScript syntax highlighting";
alert(s);
```

```
<!-- no comment -->
No language indicated, so no syntax highlighting.
But let's throw in a <b>tag</b>.
```

---

## Tables

<table>
  <thead>
    <tr>
      <th>Markdown</th>
      <th>Less</th>
      <th>Pretty</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><em>Still</em></td>
      <td><code>renders</code></td>
      <td><strong>nicely</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>2</td>
      <td>3</td>
    </tr>
  </tbody>
</table>

---

## Button

<button>Button example</button>

I used the basic button from [Pure.css](https://purecss.io/).
