const CONSTANTS = require("./constants.js");
var fs = require("fs");
var { promisify } = require("util");

var sqlite3 = require("sqlite3");
var { open } = require("sqlite");
var express = require("express");
var cookieParser = require("cookie-parser");

(async () => {
    // open the database
    const db = await open({
        filename: 'posts',
        driver: sqlite3.Database
    });

    try {
        await db.exec(`
         CREATE TABLE reqs ( ${Object.values(TABLE_FIELDS).map(({name, sql}) => name + " " + sql).join(", ")} )
        `);
    } catch (e) {
        console.log(e);
    }

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded());
    app.use(cookieParser());

    app.post("/api", async function (req, res) {
        var body = req.body;
        var date = Date.now();
        console.log(body);
        var obj = {}
        Object.values(TABLE_FIELDS).forEach(({ name, generate }) => {
            if (generate == null) return;
            obj[":" + name] = generate(body[name]);
        });
        try {
            await db.run(`INSERT INTO
                           reqs( ${Object.keys(TABLE_FIELDS).join(", ")} )
                                VALUES
                               ( ${Object.keys(TABLE_FIELDS).map(x => ":" + x).join(", ")} )`
                , obj
            );
            res.redirect(301, body.returnto || "https://edinburghems.com/request/thank-you");
        } catch (e) {
            res.redirect(301, "https://edinburghems.com/request/uh-oh");
        }
    });

    app.get("/api/edit", async function (req, res) {
        var { id, field, value } = req.query;
        id = parseInt(id);
        console.log(id, field, value);

        if (isNaN(id) || field == null || value == null) {
            res.status(401).send("isnan id");
        }

        if (!(/[a-z_]+/.test(field))) {
            res.status(401).send("invalid field");
        }

        await db.run(`UPDATE reqs SET ${field} = ? WHERE id = ?`, [value, id]);

        res.json({});
    });

    app.get("/api", async function (req, res) {
        var { sessionid } = req.cookies;
        var rows = await db.all('SELECT * FROM reqs');
        console.log(rows);
        res.json(rows);
    });

    app.use(express.static("static"));

    app.listen(8800);
})()
