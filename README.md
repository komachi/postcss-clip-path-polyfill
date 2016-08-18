# postcss-clip-path-polyfill

>PostCSS plugin which add SVG hack for clip-path property to make it work in Firefox. Currently supports only `polygon()`.


```css
/* Input */
.test1 {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}
```

```css
/* Output */
.test1 {
  clip-path: url('data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3CclipPath id="p" clipPathUnits="objectBoundingBox"%3E%3Cpolygon points="0.5 0, 0 1, 1 1" /%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E#p');
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}
```

 It doesn't add vendor prefixes so you should use it with [autoprefixer](https://github.com/postcss/autoprefixer).

## Installation

```
npm i postcss-clip-path-polyfill --save-dev
```

## Usage

Check out [PostCSS documentation](https://github.com/postcss/postcss#usage) on how to use PostCSS plugins.
