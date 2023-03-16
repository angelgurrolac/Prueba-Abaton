const createError = require("http-errors");
const express = require("express");
const nocache = require("nocache");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");
const puppeteer = require("puppeteer");

// use it before all route definitions
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(nocache());
app.use(
    session({
        secret: "7GektrFcMSHfFCeys5DH6f8f",
        resave: true,
        saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    sassMiddleware({
        src: path.join(__dirname, "public"),
        dest: path.join(__dirname, "public"),
        indentedSyntax: false,
        sourceMap: true
    })
);

const rel = o => express.static(path.join(__dirname, "/node_modules/" + o));
app.use(express.static(path.join(__dirname, "public")));

app.use("/fonts", rel("@fontsource"));
app.use("/jquery", rel("jquery/dist"));
app.use("/jquery", rel("datatables/media"));
app.use("/bootstrap", rel("bootstrap/dist"));
app.use("/bootstrap", rel("bootstrap-icons"));
app.use("/chartjs", rel("chart.js/dist"));
app.use("/moment", rel("moment"));
app.use("/moment", rel("moment-timezone/builds"));
app.use("/animate", rel("animate.css"));
app.use("/chartjs-chart-sankey", rel("chartjs-chart-sankey/dist"));

app.use("/", require("./routes/index"));
app.use("/dash", require("./routes/dash"));
app.use("/api", require("./routes/api"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
