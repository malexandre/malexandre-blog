---
title: "Mocking Redis & Expiration in Python"
date: 2017-10-08T14:09:44+02:00
categories: ["Code", "Tests", "Python", "Redis"]
author: Marc Alexandre
---

Recently, I had to use Redis for the first time. I heard of it, but never really played with it. But this time I had no choice, and I don't regret it at all, Redis is awesome. But having a new component means that I had to discover from scratch how to test it. I tried a few libraries, but one seemed really easy to use, at least to the point where I wanted to test that I was correctly using the expiration time for my data. But I'll tell you everything in this article.

<!-- more -->

## My tests configuration

After a few years, I'm becoming really efficient writing unit test in multiple languages, and in Python my test framework of choice is [Unittest]. It has a few advantages: It's available directly in the official libraries, it's simple yet powerful, and it does not go in your way. I also use pytest to run all the tests, just because I find it simpler to just call `pytest` instead of having to use the discover options from [Unittest]. I'm lazy like that.

[Unittest] also have the powerful [mock] library integrated (in Python 2.7 it still needs to be installed via pip as `mock`). Mocking is really important for unit tests, since they need to be fast and to only test one thing at a time. If an error in your module C crashes the test from your module A, it's not unit tests anymore. Mocking is really easy in Python:

```python
import unittest
from mock import MagicMock, patch

from src import SERVER_URL
from .. import mymodule


class TestClass(unittest.TestCase):
    @patch('requests.get', return_value=MagicMock(return_value=None)())
    def test_my_method(self, get):
        mymodule.my_method(5, '/test/url')
        get.assert_called_with('%s/test/url' % SERVER_URL)
        assert get.call_count == 5
```

Using the `@patch` annotation makes sure that every call to `requests.get` will go through the patch instead the real [requests] library. And then, [Unittest] send the patched method as an argument to our test method, in this case `get`, and from it we can test how many time it got called, the arguments it received, etc. All of this because we use another component of [mock], `MagicMock`. It's powerful and easy to write, and with all this, it becomes a pleasure to write tests. But sometimes, you have to mock a really complicated component, like [Redis], and you know it would take days, weeks or even months just to have a useful mock, not even a powerful one. And that's when you search for specific mocking libraries.

## mockredispy

There are a few libraries to mock [Redis] in Python. I tested fakeredis, pytest-redis and some others. If in a few minutes I couldn't do what I wanted, I would try another. I didn't want to lose too much time so I already made a shortlist that seemed to be well documented or used by enough people to be sure they were usable. But when I started to use [mockredispy], even though the documentation is almost inexistant, it was so easy to use, so easy to integrate with [mock] & [Unittest], I knew I was keeping it. You almost just need a simple patch: `@patch('redis.Redis', mock_redis_client)`, and that's it. In my project, I decided to use a full patcher, to avoid the repetition of this annotation:

```python
from datetime import datetime
from time import mktime
import unittest
from mock import patch
from mockredis import mock_redis_client

from .. import mymodule


class TestClass(unittest.TestCase):
    def setUp(self):
        redis_patcher = patch('redis.Redis', mock_redis_client)
        self.redis = redis_patcher.start()
        self.addCleanup(redis_patcher.stop)
        # Some script to initialize data inside of the mocked Redis instance available at self.redis

    def test_my_method(self):
        current_timestamp = int(mktime(datetime.now().timetuple()))
        mymodule.my_method(current_timestamp + 100 + 5)
        assert len(self.redis.zrange(mymodule.EXPIRATION_KEY, 0, -1)) == 4
```

And everything works so easily. You call the function/method to test, and then check that everything in the mocked [Redis] is as expected. And no test will write in your own [Redis] instance, everything is self contained, fast, and efficient.

## Testing expiration time

But then you want to make sure that your code manage the expiration properties of [Redis] correctly. And since there is no real documentation for [mockredispy], I started by searching Google. There is some old posts/stackoverflow questions, mentionning `do_expire`. It did not work. Litteraly nothing was happening. It seemed so simple that it should have worked, but no:

```python
    def test_expiration(self):
        mymodule.my_method('My Key', expiration_time=3)
        self.redis.do_expire(4)
        assert self.redis.get('My Key') is None
```

Even the comments inside [mockredispy] was talking about `do_expire`:

```python
class MockRedis(object):
    """
    A Mock for a redis-py Redis object
    Expire functionality must be explicitly
    invoked using do_expire(time). Automatic
    expiry is NOT supported.
    """
```

But clearly, these comments are not up to date anymore. When I read this `do_expire` method, there was no arguments in the definition:

```python
    def do_expire(self):
        """
        Expire objects assuming now == time
        """
```

By reading the method, and using the blame & history from GitHub, I knew that the time management was change entirely, but the comments were not updated, and nothing documented how to manage expiration now. But it all revolved around the new `Clock` class. And in fact, it's still easy to manage, once you read the code and not the comments. You just need to make your own verson of the `Clock`, make sure that the `now` method returns the datetime you want, and then call `do_expire` to check all the expiration properties against your clock value:

```python
from datetime import datetime, timedelta
from time import mktime
import unittest
from mock import patch
from mockredis import MockRedis, clock

from .. import mymodule


class CustomClock(clock.Clock):
    def __init__(self):
        self.timeout = 0

    def add_timeout(self, timeout):
        self.timeout += timeout

    def now(self):
        return datetime.now() + timedelta(seconds=self.timeout)


class TestClass(unittest.TestCase):
    def setUp(self):
        self.clock = CustomClock()

        redis_patcher = patch('redis.Redis', MockRedis(clock=self.clock))
        self.redis = redis_patcher.start()
        self.addCleanup(redis_patcher.stop)
        # Some script to initialize data inside of the mocked Redis instance available at self.redis

    def test_expiration(self):
        mymodule.my_method('My Key', expiration_time=3)
        self.clock.add_timeout(4)
        self.redis.do_expire()
        assert self.redis.get('My Key') is None
```

Of course you could make a more complicated `CustomClock`. For me, that's all I needed for my tests. And as you can see, it's not complicated at all. But having to search through the code and the project history just to know this is kind of a lot. It should be in the README of the project. While writing this post, I also made a [PR on the project](https://github.com/locationlabs/mockredis/pull/129). I hope it will go through, even though the project was not active in recent months.

Thank you for reading, and please comment or contact me if there is any error or misinformation in this article.


[mock]: https://docs.python.org/3/library/unittest.mock.html
[mockredispy]: https://github.com/locationlabs/mockredis
[Redis]: https://redis.io/
[requests]: http://docs.python-requests.org/en/master/
[Unittest]: https://docs.python.org/3/library/unittest.html
