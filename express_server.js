const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

const urlDatabase = {
    "b2xVn2": "http://www.lighthouselabs.ca",
     "9sm5xK": "http://www.google.com"

};

function generateRandomString() {
    let rand = Math.random().toString(36).substring(7, 1);
    return rand;
}

app.get("/" , (req, res)=>{
    res.send("Hello");
});

app.get("/urls.json" , (req, res)=>{
    res.json(urlDatabase);
});

app.get("/hello", (req,res)=>{
    res.send("<html><body>Hello <b>World</b></body></html>\n")
})

app.get("/urls", (req, res) => {
    const templateVars = { urls: urlDatabase };
    res.render("urls_index", templateVars);
  });

  app.get("/urls/new", (req, res) => {
    res.render("urls_new");
  });

  app.get("/urls/:shortURL", (req, res) => {
    const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL]  };
    // console.log(urlDatabase);
    res.render("urls_show", templateVars);
  });

  app.get("/u/:shortURL", (req, res) => {
    const shortURL = req.params.shortURL;
    const longURL = urlDatabase[shortURL];
    res.redirect(longURL);
    
  });
 // Edit
 app.post('/urls/:shortURL', (req,res)=>{
    const shortURL = req.params.shortURL;
  // console.log(urlDatabase);
   console.log(req.params.shortURL)
   console.log(urlDatabase)
   
  //  for(let url in urlDatabase){
      
  urlDatabase[shortURL] = req.body.newUrl;
  // console.log(req.body.newUrl);
       
   //}
   res.redirect(`/urls`);

})

  app.post("/urls", (req, res) => {
    const generatedUrl = generateRandomString();
    urlDatabase[generatedUrl] = {
        longURL: req.body.longURL
    };
    res.redirect(`/urls/${generatedUrl}`);
  });
// Delete
 app.post("/urls/:shortURL/delete" , (req, res)=>{
    const shortURL = req.params.shortURL;
    delete urlDatabase[shortURL];
    res.redirect(`/urls`)
     
 });

 

app.listen(PORT , ()=>{
    console.log(`Example app listening on port ${PORT}`);
});