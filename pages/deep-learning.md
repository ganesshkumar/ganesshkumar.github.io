---
layout: page
title: Deep Learning
mathjax: true
permalink: /deep-learning.html
---

## Practical aspects of Deep Learning

## Setting up your ML application

#### Train/Dev/Test sets

* layers
* hidden units
* learning rate
* activation functions

Data is split into
* train data
* dev(validation or hold-out) data
* test data

Olden days 60% - 20% - 20% split  
Using more data 99% - 1% - 1% split

Mismatched data
- Training the model using cat pictures from internet
- Test/Dev using user's cat pictures from applications

#### Bias vs Variance
(need some images here)
* high bias - under fit
* just right fit
* high variance - overfit

Variable to look for bias and variance
* Training set error
* Dev set error

|Training error|Dev error|Observation|
|:--:|:--:|:--|
|15%|16%|underfit - high bias|
|1%|11%|overfit - high variance|
|15%|30%|high bias and high variance|
|0.5%|1%|low bias and low variance|

Optimal or base error ~= 0% (close to human performance)

#### Basic recipe for ML

(Flowchart insert)

Bigger network - reduces bias and has no effect on variance
More data - reduces variance and has no effect on bias

## Regularizing your neural network

#### Regularization
If your network has high variance or over fitting one the the first things to try is regularization.
You can also get more training data to reduce high variance.

**Logistic regression**

$$ min(w,b) J(w,b) $$

$$ J(w,b) = {1 \over m} \sum_{i=1}^m L(\hat{y}^{(i)}, y^{(i)}) $$

$$ w \; \epsilon \; \mathbb{R}^{n_x} and \; b \; \epsilon \; \mathbb{R} $$

Adding regularization

**L2 regularization(most common type)**

$$ J(w,b) = {1 \over m} \sum_{i=1}^m L(\hat{y}^{(i)}, y^{(i)}) + {\lambda \over 2m} {\Vert w \Vert}_2^2 $$

$$ {\Vert w \Vert}_2^2 = \sum_{j=1}^{n_x} w_j^2 = w^Tw $$

**L1 regularization**

$$ J(w,b) = {1 \over m} \sum_{i=1}^m L(\hat{y}^{(i)}, y^{(i)}) + {\lambda \over 2m} {\Vert w \Vert}_1 $$

$$ {\Vert w \Vert}_1 = \sum_{j=1}^{n_x} w_j^1 $$

L1 -> w will be sparse. This will help compressing the model as few parameters go to 0.

In practise you can regularize b as well but you can comfortably omit it.

> $$ \lambda $$ is regularization parameter. Another hyper parameter

**Neural network**

$$ J(w^{[1]}, b^{[1]}, ..., w^{[L]}, b^{[L]}) = {1 \over m} \sum_{i=1}^m L(\hat{y}^{(i)}, y^{(i)}) + {\lambda \over 2m} \sum_{l=1}^L \Vert w^{[l]} \Vert^2 $$

$$ \Vert w^{[l]} \Vert^2 = \sum_{i=1}^{n^{[l-1]}} \sum_{j=1}^{n^{[l]}}  { \bigl( w_{ij}^{[l]} \bigr)}^2, \, where \, size \, of \, w: \bigl( n^{[l]}, n^{[l-1]} \bigr) $$

It is called `Frobenius norm` of a matrix $$ \Vert X \Vert_F^2 $$

Gradient descent

$$ dw^{[l]} = (from \, back \, propagation) + {\lambda \over m} W^{[l]} $$

$$ w^{[l]} = w^{[l]} - \alpha dw^{[l-1]} $$

L2 is also called weight decay

#### Why regularization reduces overfitting?
(diagram)

* Setting bigger $$ \lambda $$ will set $$ w^{[l]} \simeq 0 $$. so the network is simplified or becomes smaller and takes it towards high bias case.

(diagram tanh)

If $$ \lambda $$ is large, $$ w^{[l]} $$ will be small. Therefore g(z) will be closer to z, making the curve almost linear. Every layer is roughly linear
