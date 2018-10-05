# Personal Blog

[![license](https://img.shields.io/github/license/ganesshkumar/ganesshkumar.github.io.svg)]()
[![Code Climate](https://codeclimate.com/github/ganesshkumar/ganesshkumar.github.io/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate)
[![Issue Count](https://codeclimate.com/github/ganesshkumar/ganesshkumar.github.io/badges/issue_count.svg)](https://codeclimate.com/github/codeclimate/codeclimate)

This is my personal blog powered by [Jekyll](https://jekyllrb.com/) using [Kasper](https://github.com/ganesshkumar/kasper)

## Running locally

To run this project locally install the following gems on your machine

```
$ gem install bundler jekyll
```

Run the follwing command to install the dependencies

```
$ bundler install
```

To start the server run the following command from the root folder of this repository

```
$ bundler exec jekyll serve
```

## Hosting on Github

- Simply push this git repository to a Github repository named `<username>.github.io`
- In the repository settings, enable Github Pages to publish the site to the world at `https://<username>.github.io`
- To use custom domain, modify the _CNAME_ file with your domain and configure your DNS to point to `<username>.github.io`

## Hosting on Gitlab

- Simply push this git repository to a Github repository named `<username>.gitlab.io`
- This repository has _gitlab-ci.yml_ configured to build and package the artifact
- From the repository settings enable CI/CD and Pages to publish the site to the world
- To use custom domain, add your domain to Pages under repository settings and configure your DNS to point to `<username>.gitlab.io`
