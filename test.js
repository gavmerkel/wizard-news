const express = require("express");
const app = express();
// const app = require('express')()
const volleyball = require('volleyball');
const postBank = require("./postBank");
// const morgan = require("morgan")
app.use(volleyball);
// app.use(morgan('dev'));
app.use(express.static('public'))
// app.get("/", (req, res) => res.send("Hello World!"));
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
//First, get the list of posts
app.get("/", (req, res, next) => {
  const posts = postBank.list();
//   const id = req.params.id
//   const post = postBank.find(id)
//   console.log(posts)
// if(!post.id){
//       // If the post wasn't found, set the HTTP status to 404 and send Not Found HTML
//       res.status(404)
//       const html = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Wizard News</title>
//         <link rel="stylesheet" href="/style.css" />
//       </head>
//       <body>
//         <header><img src="/logo.png"/>Wizard News</header>
//         <div class="not-found">
//           <p>Accio Page! :female_mage: ... Page Not Found</p>
//           <img src="/dumbledore-404.gif" />
//         </div>
//       </body>
//       </html>`
//       res.send(html)
// }
//   //Then, prepare some html to send as output
// else {
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>${post.title}
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
      ).join('')}
    </div>
  </body>
  </html>`
  //Finally, send response
  res.send(html)
// }
  })
  // app.get('/posts/:id', (req, res) => {
  //   const id = req.params.id
  //   const post = find(id)
  //   if (!post.id) {
  //     // If the post wasn't found, just throw an error
  //     throw new Error('Not Found')
  //   }
  app.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    const post = postBank.find(id);
  console.log(post)
if(!post.id){
      // If the post wasn't found, set the HTTP status to 404 and send Not Found HTML
      res.status(404)
      const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Wizard News</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <header><img src="/logo.png"/>Wizard News</header>
        <div class="not-found">
          <p>Accio Page! :female_mage: ... Page Not Found</p>
          <img src="/dumbledore-404.gif" />
        </div>
      </body>
      </html>`
      res.send(html)
}
  //Then, prepare some html to send as output
else {
    res.send(/* The HTML document string here */
        `<a href="/posts/${post.id}">${post.title}</a>`
      );
    }
  });
