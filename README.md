<div align="center">
  <h1>Infinite Gallery</h1>  
</div>

[![pl](https://img.shields.io/badge/lang-pl-red.svg)](https://github.com/Karo1808/infinite-gallery/blob/master/README.pl.md)

### Description

Infinite Gallery is a web application featuring an infinite scroll gallery. It is built using Vite and React, leveraging the Unsplash API to fetch images dynamically.

### Demo

[Website link](https://infinite-gallery-nqv7.vercel.app/)

### Features

- **Infinite Scroll:** Users can scroll endlessly through the gallery, dynamically loading more images as they navigate.
- **Search Functionality:** Enables users to search for specific images based on keywords.
- **Masonry Layout:** Images are displayed in a visually appealing masonry layout, optimizing space and aesthetics.
- **Direct Links:** Each image has a direct link for easy sharing or bookmarking.
- **Modals:** Detailed image viewing is facilitated through modals on desktop to medium sized devices, allowing users to view images in a larger format.
- **Share and Download Button:** Provides users with the option to share images or download them directly.
- **Blurred Image Placeholders:** Utilizes blurred image placeholders to enhance the loading experience and provide visual feedback to users.
- **Fully Responsive:** The application is designed to adapt seamlessly to various screen sizes and devices.

### Technologies used

- **Vite:** A fast build tool for creating modern Single Page Applications.
- **React:** A JavaScript library for building user interfaces.
- **Typescript:** A superset of JavaScript that adds static typing to the language.
- **CSS Modules:** Allows for scoped styling by automatically generating unique class names.
- **React Query:** Provides tools for managing, caching, and synchronizing server state in React applications.
- **React Router:** A routing library for React applications, enabling navigation between different views.
- **Blurhash:** An image placeholder that utilizes a blurred version of the image to enhance the user experience.
- **Unsplash API SDK:** An official SDK for integrating the Unsplash API into applications.

### Installation

Clone the repository locally

```bash
git clone https://github.com/Karo1808/infinite-gallery.git
```

Install the required dependencies

```bash
npm install
```

Create an .env.local file and add the following environment variables

```bash
VITE_UNSPLASH_ACCESS_KEY=
VITE_UNSPLASH_ACCESS_KEY2=

VITE_FACEBOOK_ID=
```

Run the website locally

```bash
npm run dev
```
