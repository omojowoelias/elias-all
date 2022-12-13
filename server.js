const express = require("express");
const app = express();
const { getusers, addusers } = require("./db.js");
let warning = false;
//const cookieParser = require("cookie-parse");

//app.use(cookieParser());

//handlebars Setup
const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
//End of setup

app.use(express.static((__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
//app.use(express.static());

app.get("/petition", (req, res) => {
    res.render("petition", {
        layouts: "main",
        warning: false,
    });
});


app.get("/thanks", (req, res) => {
    res.render("thanks", {
        layouts: "main",
    });
});

app.get("/signers", (req, res) => {
    res.render("signers", {
        layouts: "main",
    });
});

app.get("/register", (req, res) => {
    res.render("register", {
        getusers,
        layouts: "main",
    });
});
app.get("/Login", (req, res) => {
    res.render("login", {
        layouts: "main",
    });
});

/*app.post("/petition", (req, res) = {
let email = req.body.email,
let passwd = req.body.password;
});
*/
app.post("/petition", (req, res) => {
    let firstName = req.body.fname;
    let lastName = req.body.lname;
    let signature = req.body.signature;
    //let passwd = req.body.password;
    const data = { firstName, lastName, signature};
    console.log(data);

    if (firstName !== "" && lastName !== "" && !signature) {
        addSignature(firstName, lastName, signature)
            .then((data) => {
                console.log(data);
                warning === false;
            })
            .catch((err) => {
                console.log(`error found`);
            });
        res.redirect("./thanks/");
    } else {
        // warning === true;
         res.redirect("./thanks");
     //res.render("petition", {
      //      warning: true,
       // });
    }
});
app.listen(8083, console.log("App is running on port 8083"));
