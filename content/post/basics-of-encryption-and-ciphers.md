---
title: "Basics of Encryption & Ciphers"
date: 2017-09-16T14:32:40+02:00
categories: ["Code", "Cryptography", "Python", "AES"]
author: Marc Alexandre
---

Trying to use a library to encrypt your data can be a lot to handle when you have no experience or knowledge about their inner workings. There is more than just selecting a cipher algorithm like Blowfish or AES. You also have to chose a mode, manage an initialization vector, and sometimes even more. As a memento, but also to help others, I will try to explain some of those concepts, and how to use them with PyCrypto, the main encryption library in Python.

If you just want to see how to use PyCrypto (or almost any other library in any other languages, it's always the same), go to the end of the post.

<!-- more -->

## The basics

There is a lot of way to encrypt data. Some are really ancient ([scytale](https://en.wikipedia.org/wiki/Scytale) or [Caesar's code](https://en.wikipedia.org/wiki/Caesar_cipher)), but they all have the same goal: Use a known key to encrypt data, making it unreadable for anyone without the key. We could write the algorithm ourselves, for example [Vigenère cipher](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher) (assuming we only use basic ASCII chars, Vigenère is pretty simple – I would advise to not use my implementation):

```python
def encrypt(plaintext, key):
    key_ord = [ord(char) - ord(' ') for char in list(key)]

    ciphertext = ''
    for i, char in enumerate(list(plaintext)):
        char_ord = ord(char) - ord(' ') + key_ord[i % len(key_ord)]
        char_ord = (char_ord % ord('~')) + ord(' ')
        ciphertext += chr(char_ord)

    return ciphertext


def decrypt(ciphertext, key):
    key_ord = [ord(char) - ord(' ') for char in list(key)]

    plaintext = ''
    for i, char in enumerate(list(ciphertext)):
        char_ord = ord(char) - ord(' ') - key_ord[i % len(key_ord)]
        char_ord = (char_ord % ord('~')) + ord(' ')
        plaintext += chr(char_ord)

    return plaintext
```

But we've come a long way, and now we have better & stronger algorithm. And they're already implemented, optimized and available for everyone. There are lots of algorithm out there. As of the publication of this post, the two algorithm I would advise would be AES or Twofish. I know Blowfish is still used a lot, and even though it has not be broken yet (at least at my knowledge) and is in the public domain, I really would recommend to stop using it. First, AES is so spread that it has undergone rigorous testing from both benevolent and malevolent attackers without any problem to this date. And then, even the creator of Blowfish himself said it was not the best solution anymore:

> At this point, though, I'm amazed it's still being used. If people ask, I recommend Twofish instead.
>
> — Bruce Schneier, Blowfish's creator, in [2007](https://www.schneier.com/news/archives/2007/12/bruce_almighty_schne.html)

Basically, most of the best algorithm only handle a short length of data. The AES standard states that a block size of 128 bits is recommanded. That's not a lot of data, so it's not that useful. But each of those algorithms can be combined using different "mode" to divide the data in those 128 bits blocks. I'll define each method in the next section, but to be simple, it's really just a rule to divide the data in 128 bits blocks and pass them through the algorithm to obtain an encrypted data. Since most of these methods use the result on the previous block to compute the current block, they also need an initialization vector, or IV, that will play the role of the first block in most cases.

![Shcema of block encryption](/img/basics-of-encryption-and-ciphers/block-cipher.png)

To summarize, first you have to be sure about what cipher you'll use. Then you have to chose the mode to combine the blocks. And finally you have to build an initialization vector, like a salt if you already know hashing. I'll redefine all the terminology in the next section, and then I'll show how to use AES with PyCrypto.

## Terminology

<dl>
    <dt>Cipher</dt>
    <dd>Algorithm for encryption &amp; decryption.</dd>

    <dt>Key</dt>
    <dd>Data used to encrypt or decrypt the message. Usually a random complex string.</dd>

    <dt>Symmetric Encryption</dt>
    <dd>Cipher using the same key to encrypt and decrypt. The key must be shared between every system that needs to be able to encrypt or decrypt a message.</dd>

    <dt>Asymmetric Encryption</dt>
    <dd>Cipher using two keys, one public and one private. Only the public keys are shared, and the messages cannot be decrypted without the private key of the receiver. It ensures that only the receiver, the only system knowing its own private key, can decrypt the message.</dd>

    <dt>Stream Cipher</dt>
    <dd>Cipher applying the key to data of any length to build a ciphertext of the same length, in such a way that we can compute the starting part of the ciphertext before the trailing part of the plaintext is known.</dd>

    <dt>Block Cipher</dt>
    <dd>Cipher applying the key to a small block. It always give the same result for the same block and the same key. To be more secure, there are different modes of getting the block through this cipher from a large chunk of data (see below).</dd>

    <dt>IV – Initialization Vector</dt>
    <dd>Block of bits that is used by several modes to randomize the encryption and make sure the same plaintext won't result in the same ciphertext every time.</dd>

    <dt>Padding</dt>
    <dd>Block Cipher need the message to be exactly the size of N*blocks. If the message is too short to complete the final block, data is added to make sure the cipher gets only full blocks. There is multiple padding method used to make sure the padding is easy to remove once the message is decrypted.</dd>

    <dt>ECB – Electronic Codebook</dt>
    <dd>The simplest block cipher mode, dividing the message into blocks and applying the cipher to each block. Not secure enough because identical block will result in identical ciphered block.</dd>

    <dt>CBC – Cipher Block Chaining</dt>
    <dd>Each block is XORed to the previous ciphered block, itself XORed to the previous plain block, before going through the cipher to ensure no pattern can be observed. The IV is used to XOR the first block.</dd>

    <dt>CFB – Cipher Feedback</dt>
    <dd>Similar to CBC, but instead of XORing the new block with the data from the previous block before the cipher, it does it after. Thus, you can prepare your algorithm before receiving new plain block. This mode makes a block cipher into a self-synchronizing stream cipher.</dd>

    <dt>OFB – Output Feedback</dt>
    <dd>Instead of passing the data to encrypt through the cipher, it only pass the key and IV, and then send the result to the cipher for the next block, and continue this process. Each result is then XORed to a block of plain data to get a ciphertext. Because of the symmetry of the XOR operation, encryption and decryption are exactly the same. Makes a block cipher into a synchronous stream cipher.</dd>

    <dt>CTR – Counter</dt>
    <dd>Exactly life OFB, but instead of using the result of the previous key cipher, it appends a counter to the IV to compute the current round of the cipher.</dd>
</dl>


## Example in Python: AES

Here is a basic usage of PyCrypto to use the AES algorithm:

```python
from Crypto import Random
from Crypto.Cipher import AES
import sys

KEY = b'your keyphrase'
BS = AES.block_size
PAD = lambda s: s + (BS - len(s) % BS) * chr(BS - len(s) % BS)
UNPAD = lambda s: s[:-ord(s[len(s) - 1:])]

def encrypt(plaintext):
    iv = Random.new().read(BS)
    cipher = AES.new(KEY, AES.MODE_CBC, iv)
    return iv + cipher.encrypt(PAD(plaintext))

def decrypt(ciphertext):
    iv = ciphertext[:BS]
    data = ciphertext[BS:]
    cipher = AES.new(KEY, AES.MODE_CBC, iv)
    return UNPAD(cipher.decrypt(data))
```

It can be made into a class to factorize the creaction of the cipher, but this is how you use most of the algorithms with PyCrypto. It would also be similar in most of languages, a least for the cipher & iv. If you want to be able to easily print or send the encrypted data, use a base64 encoding.
