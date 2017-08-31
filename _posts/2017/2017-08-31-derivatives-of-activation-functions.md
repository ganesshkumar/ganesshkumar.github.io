---
date: 2017/08/31 21:11:24 +05:30
title: "Derivatives of Activation functions"
layout: post
disqus: true
mathjax: true
tags:
  - neural network
  - calculus
categories:
  - neural network
---

Here is my attempt at finding the derivatives of common activation functions of neural network namely sigmoid, tanh, ReLU and leaky ReLU functions.

**1. Sigmoid function**

$$ f(x) = {1 \over \sigma(x)} = 1 + e ^ {-x} $$

Differentiating both sides,

$$ f'(x) = {d \over dx} \biggl( { 1 \over \sigma(x)} \biggr) = {d \over dx} \bigl( 1 + e ^ {-x} \bigr) $$

$$ - {\sigma'(x) \over \sigma(x) ^ 2} = -e ^ {-x} $$

$$ - {\sigma'(x) \over \sigma(x) ^ 2} = 1 - f(x) $$

$$ - {\sigma'(x) \over \sigma(x) ^ 2} = 1 - f(x) $$

$$ - {\sigma'(x) \over \sigma(x) ^ 2} = 1 - {1 \over \sigma(x)} $$

$$ - {\sigma'(x) \over \sigma(x) ^ 2} = {\sigma(x) - 1 \over \sigma(x)} $$

Rearranging the terms,

$$ {\sigma'(x) \over \sigma(x) ^ 2} = {1 - \sigma(x) \over \sigma(x)} $$

$$ \sigma'(x) = \sigma(x) ^ 2 \biggl( {1 - \sigma(x) \over \sigma(x)} \biggr) $$

$$ \boxed {\sigma'(x) = \sigma(x) ( {1 - \sigma(x)} ) }$$

---

**2. tanh function**

$$ f(x) = tanh(x) = {e^x - e^{-x} \over e^x + e^{-x}} $$

Differentiating both sides,

$$ {d \over dx} tanh(x) = {d \over dx} \biggl( {sinh(x) \over cosh(x)} \biggr) $$

Using quotient rule, 

$$ tanh'(x) = ( cosh(x) {d \over dx} sinh(x) - sinh(x) {d \over dx} cosh(x) )  /  cosh^2(x) $$

$$ tanh'(x) = ( cosh(x)cosh(x) - sinh(x)sinh(x) ) / cosh^2(x) $$

$$ \boxed { tanh'(x) = 1 - tanh^2(x) } $$

---

**3. ReLU function**

$$ f(x) = max(0, x) $$

$$ f'(x) = 
\begin{cases}
1, & \text{if $x$ > 0} \\
0, & \text{otherwise}
\end{cases} $$

Note: In software, we can use f'(x) = 1 for x = 0 (Prof. Andrew NG in Deep Learning Coursera Course)

---

**4. Leaky ReLU function**

$$ f(x) = max(0.01, x) $$

$$ f'(x) =
\begin{cases}
1, & \text{if x > 0} \\
0.01, & \text{otherwise}
\end{cases} $$

Note: In software, we can use f'(x) = 1 or 0.01 for x = 0 (Prof. Andrew NG in Deep Learning Coursera Course)

