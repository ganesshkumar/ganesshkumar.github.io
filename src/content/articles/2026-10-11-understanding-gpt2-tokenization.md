---
title: "Understanding GPT-2 Tokenization"
description: "I expected a space to be its own token. GPT-2 showed me why hello and a space before hello have different token IDs and how it handles a word outside its vocabulary."
author: "Ganessh Kumar"
pubDate: 2026-10-11
type: primer
math: false
disqus: false
tags:
  - gpt-2
  - tokenization
  - llm
categories:
  - artificial-intelligence
series:
  name: "Notes From a Software Engineer Learning LLMs"
  slug: software-engineer-learning-llms
  order: 2
---

In the [first GPT-2 article](/articles/2026-10-10-how-gpt2-predicts-one-token-at-a-time/), I treated the tokenizer as a black box. Text went in and token IDs came out.

I expected the space before a word to become its own token. Instead, `"hello"` and `" hello"` each became one token with a different ID.

I also wanted to see what GPT-2 does when a misspelled or unseen word is missing from its vocabulary.

## A Space Is Not Always a Separate Token

We can start with the GPT-2 tokenizer from Hugging Face Transformers:

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("gpt2")

for text in ["hello", " hello"]:
    token_ids = tokenizer.encode(text)
    tokens = tokenizer.convert_ids_to_tokens(token_ids)

    print(repr(text), token_ids, tokens)
```

```text
'hello'  [31373]  ['hello']
' hello' [23748]  ['Ġhello']
```

We get one token for both inputs but the IDs change from `31373` to `23748`. When we decode `23748`, we get `" hello"` with the space intact.

The `Ġ` in `Ġhello` is not a character from the input. GPT-2's tokenizer uses a reversible mapping that gives every byte a visible Unicode representation. In that internal representation, we can read `Ġ` as the byte value `32`, which is an ASCII space.

```text
"hello"  → [104, 101, 108, 108, 111]
" hello" → [32, 104, 101, 108, 108, 111]
             ^^
             space
```

GPT-2's initial text matching pattern can group one leading space with the letters that follow it. Byte pair encoding then applies learned merge rules to that group. We end up with one token for each input because the vocabulary contains both `hello` and `Ġhello`.

<figure>
  <img src="/assets/images/articles/2026-10-11-understanding-gpt2-tokenization/bpe-space-token.webp" width="1200" height="675" alt="A leading space changes the token ID." />
  <figcaption>The leading space is part of a different byte sequence and can become part of the merged token.</figcaption>
</figure>

## Between Text and Token IDs

<figure>
  <img src="/assets/images/articles/2026-10-11-understanding-gpt2-tokenization/bpe-pipeline.webp" width="1200" height="675" alt="The GPT-2 tokenization pipeline." />
  <figcaption>GPT-2 maps text chunks to bytes, applies its learned BPE merges and looks up the resulting token IDs.</figcaption>
</figure>

**BPE** stands for byte pair encoding. It starts with small symbols and uses a ranked list of learned merges. When adjacent pieces have a merge rule, the tokenizer joins them. Frequent byte sequences can eventually become one vocabulary token while less common sequences remain split across several tokens.

This process works with byte sequences, not meanings. We should not read `hello` as a greeting from the tokenizer's point of view. It only follows merge paths that end at two different vocabulary entries for the bytes behind `hello` and ` hello`.

The merge list is fixed after tokenizer training. Encoding the same text with the same GPT-2 tokenizer is deterministic.

## A Word Outside the Vocabulary

For my second question, I used my name without a space:

```python
text = "ganesshkumar"

print(text in tokenizer.get_vocab())
print(tokenizer.encode(text))
print(tokenizer.convert_ids_to_tokens(tokenizer.encode(text)))
```

```text
False
[1030, 408, 71, 74, 44844]
['gan', 'ess', 'h', 'k', 'umar']
```

When we decode all five IDs together, we get `ganesshkumar` exactly.

GPT-2 does not need one vocabulary entry for every name, misspelling or identifier. If the complete text is absent, BPE leaves it as smaller pieces. GPT-2's BPE has a base representation for all 256 byte values. Valid UTF-8 text can be represented even when the whole word has never become one token.

The same process handles source code identifiers, new words and names. Learned merge rules determine the split.

The base GPT-2 tokenizer has `50,257` vocabulary entries. We can look up ID `31373` to get `"hello"`, ID `23748` to get `" hello"` and ID `1030` to get `"gan"`. The numeric size of an ID says nothing about how the tokens are related.

This is the same `50,257` dimension I saw in the logits earlier. It contains one score for each vocabulary entry.

Tokenization also determines `T`, the sequence length. `"hello"` occupies one position. `"ganesshkumar"` occupies five positions in this checked run. GPT-2 receives those five IDs before any attention or other model computation begins.

## What I Took Away

I started with a model of separate words and spaces: a word would become a token and its leading space would be another token. GPT-2's tokenizer does not keep that boundary.

A token can contain a leading space. A word can be one token or several reusable pieces. If the whole word is missing, the tokenizer can continue down to smaller byte pieces and still reconstruct the original text.

The output is still a list of arbitrary integer IDs. The next question is how GPT-2 turns those IDs into vectors that the model can actually work with.

## Sources

- [OpenAI GPT-2 reference encoder](https://github.com/openai/gpt-2/blob/master/src/encoder.py)
- [Hugging Face tokenization algorithms](https://huggingface.co/docs/transformers/main/en/tokenizer_summary)
- [Hugging Face GPT-2 documentation](https://huggingface.co/docs/transformers/model_doc/gpt2)
- [Neural Machine Translation of Rare Words with Subword Units](https://arxiv.org/abs/1508.07909)
