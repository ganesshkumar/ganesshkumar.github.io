---
title: "Starting With GPT-2: One Token at a Time"
description: "I use GPT-2 as a black box, trace one prompt into token IDs and logits and implement the loop that generates text one token at a time."
author: "Ganessh Kumar"
pubDate: 2026-10-10
type: primer
math: true
disqus: false
tags:
  - gpt-2
  - llm
  - language-models
categories:
  - artificial-intelligence
---

I wanted to understand large language models by getting my hands dirty, not by only reading about them. While looking for a model I could inspect end to end, GPT-2 felt like the right starting point: simple enough to run and study, but complete enough to observe the next-token interface used during generation.

GPT-2 also gives me a practical route into the Transformer ideas introduced by [Attention Is All You Need](https://arxiv.org/abs/1706.03762). I can first make its one-token-at-a-time generation loop concrete, then open its attention, embeddings and other internal parts before comparing them with newer models.

Before starting, I already had the broad mental model. Give the model some tokens, ask it for the next token, append that token and ask again. What remained unclear was hidden inside the phrase "some deep learning."

In this article, I am keeping that deep learning machinery as a black box. I want to trace one prompt through GPT-2, inspect its next-token scores and make the input and output contract concrete.

<figure>
  <img src="/assets/images/articles/2026-10-10-how-gpt2-predicts-one-token-at-a-time/gpt2-black-box.webp" width="1200" height="675" alt="The prompt becomes token IDs, GPT-2 returns logits and one token is chosen." />
  <figcaption>The black-box contract for this article: token IDs go in, vocabulary scores come out and one token is selected.</figcaption>
</figure>

## Start With a Prompt

I will use this prompt throughout the article:

```text
The meaning of life is
```

Here is the smallest useful GPT-2 setup:

```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("gpt2")
model = AutoModelForCausalLM.from_pretrained("gpt2")
model.eval()

prompt = "The meaning of life is"
input_ids = tokenizer(prompt, return_tensors="pt")["input_ids"]

with torch.no_grad():
    logits = model(input_ids).logits
```

The two `from_pretrained` calls hide some useful setup. If the files are not already cached, the Transformers library downloads the GPT-2 tokenizer files, configuration and pretrained weights from the Hugging Face Hub. The library contains the Python implementation of the GPT-2 architecture. The downloaded weights contain the values GPT-2 learned during training.

`AutoModelForCausalLM` reads the configuration, creates that architecture and loads the weights into it. It does not train GPT-2 on my machine.

The tokenizer turns the prompt into five token IDs:

```text
[464, 3616, 286, 1204, 318]
```

Decoded separately, those IDs represent:

```text
"The"
" meaning"
" of"
" life"
" is"
```

The spaces are part of the decoded token pieces. I am leaving the tokenization details for the next article. Here, GPT-2 receives these integers rather than the Python string.

The `input_ids` tensor has shape `[1, 5]`: one prompt with five token positions.

Using $B$ for batch size and $T$ for sequence length:

$$
\texttt{input\_ids} \in \mathbb{N}^{B \times T}
$$

For this prompt, $B = 1$ and $T = 5$.

## Look at the Logits

The model returns a `logits` tensor with this shape:

```text
[1, 5, 50257]
```

Using $\mathbf{Z}$ for the logits tensor and $V$ for vocabulary size, the general form is:

$$
\mathbf{Z} = \operatorname{GPT2}(\texttt{input\_ids}),
\qquad
\mathbf{Z} \in \mathbb{R}^{B \times T \times V}
$$

The base GPT-2 configuration uses $V = 50{,}257$. For this run, the shape means one prompt, five token positions and `50,257` vocabulary scores at each position.

I had expected one set of next-token scores. Instead, GPT-2 returned one set at every input position.

Each score answers a narrow question:

> How suitable is this vocabulary token as the token that follows this position?

These scores are called **logits**. They are not probabilities yet and they do not need to add up to `1`.

## Why Take the Last Position?

When generating text, we want the prediction made after GPT-2 has seen the complete prompt. That is the final position:

```python
next_token_logits = logits[0, -1, :]
```

Its shape is:

```text
[50,257]
```

In this slice:

- `0`: the first prompt in the batch.
- `-1`: the final token position.
- `:`: every vocabulary score.

In mathematical notation, that slice is one vector in $\mathbb{R}^{V}$:

$$
\mathbf{z}_{\text{next}} = \mathbf{Z}_{0,-1,:}
$$

For the five-token prompt, GPT-2 gives us five different prediction points:

| Position    | Prefix available to GPT-2  | What its logits predict                 |
| ----------- | -------------------------- | --------------------------------------- |
| `0`         | `"The"`                    | The token after `"The"`                 |
| `1`         | `"The meaning"`            | The token after `"The meaning"`         |
| `2`         | `"The meaning of"`         | The token after `"The meaning of"`      |
| `3`         | `"The meaning of life"`    | The token after `"The meaning of life"` |
| `4` or `-1` | `"The meaning of life is"` | The new token after the full prompt     |

The first four positions predict tokens inside a sequence we already supplied. They matter during training, when GPT-2 learns from every position. During generation, position `-1` is the one that continues beyond the supplied prompt.

## Turn the Scores Into Probabilities

Softmax turns the logits into a probability distribution:

```python
probabilities = torch.softmax(next_token_logits, dim=-1)
```

For vocabulary entry $i$, the calculation is:

$$
p_i = \frac{e^{z_i}}{\sum_{j=1}^{V} e^{z_j}}
$$

Here, $z_i$ is the logit for token $i$, while the denominator includes all $V$ vocabulary logits.

The resulting `50,257` probabilities add up to approximately `1`.

For this prompt, one checked run produced these leading candidates:

```text
" not"   0.108805
" to"    0.082914
" the"   0.051284
" that"  0.048244
" a"     0.039578
```

Those numbers are from one checked run. They can change with the model revision and software environment.

## Pick the Next Token

The simplest decoding rule is greedy decoding:

```python
next_token_id = torch.argmax(
    next_token_logits,
    dim=-1,
)
```

This chooses the highest-scoring token. I do not need softmax before `argmax` because softmax preserves the ordering of the logits.

For the sample above, the selected token is ID `407`, which decodes to `" not"`.

Appending it changes the input from:

```text
The meaning of life is
```

to:

```text
The meaning of life is not
```

## Repeat

To generate more than one token, we repeat the same operation in a loop:

```python
generated_ids = input_ids

for _ in range(30):
    with torch.no_grad():
        logits = model(generated_ids).logits

    next_token_logits = logits[:, -1, :]
    next_token_id = torch.argmax(
        next_token_logits,
        dim=-1,
        keepdim=True,
    )

    generated_ids = torch.cat(
        [generated_ids, next_token_id],
        dim=1,
    )
```

<figure>
  <img src="/assets/images/articles/2026-10-10-how-gpt2-predicts-one-token-at-a-time/generation-loop.webp" width="1200" height="675" alt="GPT-2 runs, one token is chosen and appended and the loop starts again." />
  <figcaption>Generation repeats the same contract after appending each selected token.</figcaption>
</figure>

This code reruns GPT-2 over the whole sequence on every pass. Production inference can reuse earlier work, but that optimization does not change the next-token contract.

Greedy decoding can become repetitive because it always takes the locally highest-scoring option. Sampling and temperature would change the choice, not the loop.

## The Black Box Is Still Closed

I stopped at these two shape transformations:

$$
\underbrace{\text{token IDs}}_{B \times T}
\xrightarrow{\text{GPT-2}}
\underbrace{\text{logits}}_{B \times T \times V}
$$

For generation, I kept the scores at the final position and applied a decoding rule:

$$
\underbrace{\mathbf{Z}_{:,-1,:}}_{B \times V}
\xrightarrow{\text{decoding rule}}
\underbrace{\text{next token IDs}}_{B \times 1}
$$

## What I Took Away

My starting model was right but incomplete. GPT-2 does not return only one set of scores for the whole prompt. It returns scores at every input position. The generation loop takes the last set, picks one token and runs again.

The next article in the series will open the first part of that black box: how the tokenizer turns text into the token IDs GPT-2 receives.

## Sources

- [GPT-2 model documentation](https://huggingface.co/docs/transformers/model_doc/gpt2)
- [Base GPT-2 configuration](https://huggingface.co/openai-community/gpt2/blob/main/config.json)
- [Transformers generation strategies](https://huggingface.co/docs/transformers/main/en/generation_strategies)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Language Models are Unsupervised Multitask Learners](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)
