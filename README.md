<!-- Please update value in the {}  -->

<h1 align="center">My unspla</h1>

<div align="center">
   Solution for a challenge from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://my-unsplash-indol.vercel.app/">
      Demo
    </a>
    <span> | </span>
    <a href="https://github.com/BillyRonico412/my-unsplash">
      Solution
    </a>
    <span> | </span>
    <a href="https://legacy.devchallenges.io/challenges/rYyhwJAxMfES5jNQ9YsP">
      Challenge
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- OVERVIEW -->

## Overview

![Screenshot](https://github.com/BillyRonico412/my-unsplash/assets/65350513/ae18d7a9-cf96-41cf-aecb-4124298b12d4)

My unsplash is a clone of unsplash with its famous Mansory layout. 
This is a Typescript full stack project built with React (with Tailwind) and tRPC (with node-json-db like database). 
I also used XState to manage app state, and appended Continuous Deploiement with Github Action.

- User story: I can see a list of photos in the masonry layout that I have added
- User story: I can add a new photo to the list - the new photo should be on top of the list
- User story: I can search for photos by label
- User story: When I hover a photo, I can see a label and a delete button
- User story: I can delete images
- User story (optional): When I delete an image, I can enter my password

### Built With

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- [React](https://reactjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [XState](https://xstate.js.org/docs/)
- [tRPC](https://trpc.io/)
- [Jotai](https://jotai.org/)
- [NodeJsonDb](https://www.npmjs.com/package/node-json-db)

## Features

<!-- List the features of your application or follow the template. Don't share the figma file here :) -->

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges) challenge. The [challenge](https://devchallenges.io/challenges/rYyhwJAxMfES5jNQ9YsP) was to build an application to complete the given user stories.

## How To Use

<!-- Example: -->

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/BillyRonico412/my-unsplash

# Server config
$ cd ./server
$ echo "PASSWORD=xxxxxxxxxx" > .env
$ npm i
$ npm run dev

# Client config
$ cd ../client
$ echo VITE_TRPC_URL="http://localhost:3000" > .env.local
$ npm i
$ npm run dev
```

## Acknowledgements

<!-- This section should list any articles or add-ons/plugins that helps you to complete the project. This is optional but it will help you in the future. For example: -->

- [Zod](https://devchallenges-blogs.web.app/how-to-replicate-design/)
- [tRPC](https://trpc.io/)
- [Github Actions SSH](https://github.com/appleboy/ssh-action)
- [Jotai](https://jotai.org/)
- [XState](https://xstate.js.org/docs/)

## Contact

- Website [ronico-billy.fr](https://ronico-billy.fr)
- GitHub [@BillyRonico412](https://github.com/BillyRonico412)
