import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  :root {
    --color-jade: #00a86b;
    --color-persian-green: #00ac98;
    --color-puerto-rico: #4ac1b4;
    --color-buttercup: #f4a41d;
    --color-pomegranate: #ee4523;
    --color-flamingo: #f16132;
    --color-claret: #7c1541;
    --font-family-content: Avenir, sans-serif;
    --font-family-header: Avenir, sans-serif;
    --font-family-code: "Fira Code", source-code-pro, Menlo, Monaco, Consolas,
      "Courier New", monospace;
    --color-primary: var(--color-buttercup);
    --color-success: var(--color-persian-green);
    --color-danger: var(--color-pomegranate);
    --color-link: var(--color-jade);
    --color-link-hover: var(--color-flamingo);
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  html {
    box-sizing: border-box;
    font-size: 18px;
    height: 100%;
    scroll-behavior: smooth;
  }
  body {
    font-family: var(--font-family-content);
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
  }
  code {
    font-family: var(--font-family-code);
    word-wrap: break-word;
  }
  p {
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  a {
    color: var(--color-link);
    text-decoration: none;
    transition: 0.2s;
  }
  a:hover {
    color: var(--color-link-hover);
  }

  a.active-link {
    text-decoration: underline;
  }
  h1,
  h2,
  h3,
  h4 {
    font-family: var(--font-family-header);
    font-weight: 900;
    color: var(--color-jade);
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.17rem;
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 1.12rem;
    margin-bottom: 1rem;
  }

  .emphasize {
    font-style: italic;
    font-weight: bold;
  }

  .slick-prev:before,
  .slick-next:before {
    color: #00a86b;
  }

  ul.slick-dots {
    position: relative;
    margin: 0.5rem auto 1rem;
    bottom: 0px;
  }

  .slide-caption {
    width: 100%;
    line-height: 10vw;
    color: var(--color-claret);
    font-family: Arial, sans-serif;
    text-align: center;
    font-size: 0.8em;
    margin: auto;
  .slick-track {
    display: flex;
  }
  .slick-track .slick-slide {
    display: flex;
    height: auto;
    align-items: center;
    justify-content: center;
  }

  .superscript { 
    position: relative; 
    top: -0.5em; 
    font-size: 80%; 
    color: blue;
  }

  .citation-table {
    font-size: 0.8em;
    font-family: "Times New Roman", Times, serif 
  }

  .citation-table td:first-child {
    font-weight: bold;
  }

  .citation-attr td {
    padding: 5px;
    text-align: left;
  }

  .citation-table tr th {
    margin-bottom: 5px;
  }

  table {
    margin: auto;
  }

  #ssg-table th, #ssg-table td, #jam-table td {
    border: 1px solid black;
    padding: 0.9rem;
    text-align: center;
  }

  #jam-table tr:last-child {
    background-color: var(--color-claret);
    color: white;
    font-weight: bold;
  }

  #jam-table tr:first-child {
    background-color: var(--color-pomegranate);
  }

  #ssg-table th {
    font-weight: bold;
  }

  .span-wrapper {
    margin-right: 0.5rem;
  }
`

export default GlobalStyles