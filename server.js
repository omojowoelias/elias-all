const express = require("express");
const app = express();
const { getSignature, addSignature } = require("./db.js");
const cookieSession = require("cookie-session");
const { hashPass, compare} = require("./encrypt");
let warning = false;
//let signatureId;
//const cookieParser = require("cookie-parse");

//app.use(cookieParser());

//handlebars Setup
const { engine } = require("express-handlebars");
const { hassPass } = require("./encrypt.js");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

//End of setup

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

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
    getSignature()
        .then((data) => {
            console.log(data.rows);
            console.log(req.session.signatureId);
            const signatureRow = data.rows.find(row  => {
            return   row.id === req.session.signatureId;
            })
            imgUrl = signatureRow.signature;
            res.render("thanks", {
                layouts: "main",
                imgUrl,
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

app.get("/signers", (req, res) => {
    res.render("signers", {
        layouts: "main",
    });
});

app.get("/register", (req, res) => {
    res.render("register", {
        layouts: "main",
    });
});

app.post("/register", (req, res) => {
    let firstNname = req.body.fname;
    let lastNname = req.body.lname;
    let email = req.body.email;
    let password = req.body.password;
     const result = { firstNname, lastNname, email, password };
     console.log(result);
    hashPass(password).then((hashedPassword) => {
        console.log(hashedPassword);
    });
     res.render("register", {
        diplay: true,
     } );
});

app.get("/login", (req, res) => {
    res.render("login", {
        layouts: "main",
    });
});

app.post("/login", (req, res) => {
le
})

app.post("/petition", (req, res) => {
    let firstName = req.body.fname;
    let lastName = req.body.lname;
    let signature = req.body.signature;
    //let passwd = req.body.password;
    const data = { firstName, lastName, signature };
    console.log(data);

    if (firstName !== "" && lastName !== "" && signature) {
        addSignature(firstName, lastName, signature)
            .then((data) => {
                console.log(data);
                warning === false;
                req.session.signatureId = data.rows[0].id;
                console.log(data.rows[0].id);
                res.redirect("/thanks/");
            })
            .catch((err) => {
                console.log(`error found`, err);
            });
    } else {
        res.render("petition", {
            warning: true,
        });
    }
});
app.listen(8088, console.log("App is running on port 8088"));
