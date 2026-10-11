---
title: "Understanding GPT-2 Token Embeddings"
description: "I knew an embedding layer turned token IDs into vectors. I wanted to find out whether GPT-2 learned those vectors with the rest of the model or used an embedding created elsewhere."
author: "Ganessh Kumar"
pubDate: 2026-10-11
type: primer
math: false
disqus: false
tags:
  - gpt-2
  - embeddings
  - llm
categories:
  - artificial-intelligence
series:
  name: "Notes From a Software Engineer Learning LLMs"
  slug: software-engineer-learning-llms
  order: 3
---

In the [previous article](/articles/2026-10-11-understanding-gpt2-tokenization/), I followed text through GPT-2's tokenizer and got token IDs. The next step was to turn each ID into a vector.

What I did not know was where that vector came from. Was the embedding created separately and then chosen for GPT-2? Or was it part of GPT-2 and trained with the rest of the model?

## The Embedding Table Is Inside GPT-2

The token embedding layer is available at `model.transformer.wte`:

```python
from transformers import AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained("gpt2")
token_embedding_layer = model.transformer.wte

print(token_embedding_layer)
print(token_embedding_layer.weight.shape)
```

The checked GPT-2 Small model returned:

```text
Embedding(50257, 768)
torch.Size([50257, 768])
```

`wte.weight` is a matrix inside the model. It has one row for each of the 50,257 vocabulary entries and 768 values in each row. The [GPT-2 configuration](https://huggingface.co/docs/transformers/model_doc/gpt2) names 50,257 as its vocabulary size and 768 as its embedding and hidden-state size.

That matrix contains:

```text
50,257 × 768 = 38,597,376
```

learned parameters.

<figure>
  <div class="wide-figure-scroll" tabindex="0">
    <img src="/assets/images/articles/2026-10-11-understanding-gpt2-token-embeddings/token-embedding-lookup.webp" width="1200" height="900" alt="Token IDs select rows from GPT-2's trainable embedding matrix." />
  </div>
  <figcaption>Embedding lookup selects rows during inference. The matrix itself is updated during training.</figcaption>
</figure>

## Looking Up a Row

A small matrix makes the operation easier to inspect:

```python
import torch

embedding_matrix = torch.tensor([
    [ 0.2,  0.7, -0.1],  # cat: 0
    [ 0.3,  0.8, -0.2],  # dog: 1
    [-0.8,  0.1,  0.5],  # car: 2
    [ 0.1, -0.4,  0.9],  # tree: 3
    [-0.6,  0.3,  0.7],  # computer: 4
])

token_ids = torch.tensor([0, 1, 3])
embeddings = embedding_matrix[token_ids]
```

The IDs select rows `0`, `1` and `3`:

```text
tensor([
    [ 0.2000,  0.7000, -0.1000],
    [ 0.3000,  0.8000, -0.2000],
    [ 0.1000, -0.4000,  0.9000]
])
```

There is no calculation that turns the number `3` into the vector for `tree`. It means: retrieve row `3`.

PyTorch describes [`nn.Embedding`](https://docs.pytorch.org/docs/2.14/generated/torch.nn.Embedding.html) as a lookup table with learnable weights. GPT-2 uses the same operation at a much larger scale.

## The Five-Token Prompt

I kept the prompt from the first article:

```text
Software is changing how we
```

The tokenizer returns:

```text
[25423, 318, 5609, 703, 356]
```

This tensor starts with shape `[1, 5]`: one prompt containing five tokens.

```python
input_ids = tokenizer(
    "Software is changing how we",
    return_tensors="pt",
)["input_ids"]

embedding_matrix = model.transformer.wte.weight

manual = embedding_matrix[input_ids]
from_layer = model.transformer.wte(input_ids)

print(torch.equal(manual, from_layer))
print(from_layer.shape)
```

Output:

```text
True
torch.Size([1, 5, 768])
```

Direct indexing and the embedding layer returned the same tensor. Each of the five IDs selected one 768-value row, so the new dimension appeared at the end.

For token ID `25423`, which is `Software`, the first eight values were:

```text
[0.052651, 0.010756, 0.010448, -0.022184,
 0.138050, 0.143493, -0.216310, -0.039968]
```

These values came from GPT-2 revision `607a30d783dfa663caf39e06633721c8d4cfcd7e` with Transformers 5.17.0. Another checkpoint can contain different values in row `25423`.

## Learned With the Model

Finding `wte` inside GPT-2 answered where the table lived. The part that made this click for me was connecting it to backpropagation.

`wte.weight` is a registered model parameter and it requires a gradient:

```python
wte_weight = model.transformer.wte.weight

registered = any(
    parameter is wte_weight
    for parameter in model.parameters()
)

print(registered)
print(wte_weight.requires_grad)
```

Both values are `True`.

A training step makes the connection visible:

```python
model.train()
model.zero_grad(set_to_none=True)

loss = model(
    input_ids=input_ids,
    labels=input_ids,
).loss

loss.backward()

print(wte_weight.grad is not None)
print(wte_weight.grad.shape)
```

Output:

```text
True
torch.Size([50257, 768])
```

The embedding matrix is not a separate fixed dictionary attached after training. Its values are weights learned with GPT-2.

The original [OpenAI GPT-2 implementation](https://github.com/openai/gpt-2/blob/master/src/model.py) defines `wte` inside the model, retrieves its rows for the input tokens and reuses the same matrix to produce output logits. Because of that weight sharing, the gradient in this check includes `wte`'s output role too. I am only using it to confirm that the table participates in model training.

## What I Took Away

I expected the embedding layer to produce a vector. I had seen embeddings used as separate components elsewhere, so I thought one might be added in front of GPT-2. That was wrong. GPT-2's embedding layer is part of the model and its weights are learned with the other parameters during training.

`wte.weight` contains one learned row for every token ID. Lookup selects those rows during inference and backpropagation updates the matrix during training.

The lookup still knows only the token ID. Token ID `318` selects the same row whether it appears first or last. The next part adds a second learned table so GPT-2 can also represent each token's position.
