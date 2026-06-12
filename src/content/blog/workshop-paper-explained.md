---
title: '[FILL: workshop paper title], explained'
date: 2026-06-12
summary: 'A plain-language walkthrough of the paper: the problem, the method, and what the results actually say.'
draft: false
---

> **This is a stub post.** Replace everything on this page with the real
> text. The equation and code block below exist only to verify that math and
> syntax highlighting render correctly — delete them too.

The paper asks a simple question: once a model has seen enough unlabelled
tokamak signal, how much labelled data do you actually need for the tasks
people care about?

Inline math renders like $x_t \in \mathbb{R}^d$, and display math like:

$$
\mathcal{L}(\theta) = -\sum_{t=1}^{T} \log p_\theta\!\left(x_{t+1} \mid x_{\le t}\right)
$$

Code renders through Shiki:

```python
def patchify(x, patch_len: int):
    """Split a multichannel signal into non-overlapping patches."""
    T = x.shape[-1] - x.shape[-1] % patch_len
    return x[..., :T].reshape(*x.shape[:-1], -1, patch_len)
```
