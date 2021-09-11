const {get, change } = require('./models/tool')

let express = require("express");

let md5 = require("blueimp-md5");

const User = require("./models/user");



let router = express.Router();


let getDiaryDate = ""



router.get("/", function(req, res) {
    res.render("login.html");
});

router.get("/index", function(req, res) {
    let user = req.session.user
    if (user) {
        res.render("index.html", { user: user.nickname });
    } else {
        res.redirect("/");
    }
});

router.get("/pay", function(req, res) {
    let user = req.session.user

    if (user) {
        res.render("pay.html", { user: user.nickname });
    } else {
        res.redirect("/");
    }
});



router.get("/write", function(req, res) {
    let user = req.session.user

    if (user) {
        res.render("write.html", { user: user.nickname });
    } else {
        res.redirect("/");
    }
});


router.get("/detail", function(req, res) {
    let user = req.session.user

    if (user) {
        let resArr;
        let renderStr = ``;
        User.findOne({ Email: user.Email }, function(err, data) {
            if (err) {}
            if (data) {
                resArr = data.diary;
                resArr.forEach((item, index) => {
                    if (item.date == getDiaryDate) {

                        let article = get(item.article).split("\n");
                        article.forEach((item) => {
                            renderStr += `<p class="article">${item}</p>`;
                        });
                    }
                })

                res.render("detail.html", {
                    user: user.nickname,
                    article: renderStr,
                    date: getDiaryDate,
                });
            }
        });
    } else {
        res.redirect("/");
    }

});


router.get("/register", function(req, res) {
    res.render("register.html");
});

router.get("/logout", function(req, res) {
    req.session.user = null;
    res.redirect("/");
});

//---------------------
router.post("/detail", function(req, res) {

    getDiaryDate = req.body.dateStr;
    if (req.session.user) {

        User.findOne({ Email: req.session.user.Email }, function(err, data) {
            if (err) {}
            if (data) {
                return res.status(200).send(JSON.stringify({ code: "success" }));
            }
        });
    }
});


router.post("/getDiary", function(req, res) {
    if (req.session.user) {
        let resArr;
        User.findOne({ Email: req.session.user.Email }, function(err, data) {
            if (err) {}
            if (data) {
                resArr = data.diary;
                resArr.forEach((item, index) => { item.article = get(item.article) })
                return res.status(200).send(JSON.stringify(resArr));
            }
        });
    }
});

router.post("/register", function(req, res) {

    var body = req.body;
    body.psdconfirm = md5(md5(md5(body.psdconfirm)));
    body.psd = md5(md5(md5(body.psd)));

    User.findOne({ Email: body.Email }, function(err, data) {
        if (err) {
            return res.status(500).json({ message: "serve err", err_code: 0 });
        }

        if (data) {
            return res
                .status(200)
                .send(JSON.stringify({ message: "already exists", err_code: 1 }));
        }
        new User(body).save(function(err, data) {
            if (err) {
                return res.status(500).json({ message: "serve err", err_code: 0 });
            }
            let result = {
                Email: data.Email,
                nickname: data.nickname,
            };
            req.session.user = result;
            res.status(200).send({ message: "register success", err_code: 2 });
        });
    });
});

router.post("/login", function(req, res) {
    var body = req.body;
    User.findOne({ Email: body.Email, psd: md5(md5(md5(body.psd))) },
        function(err, data) {
            if (err) {
                return res.status(500).json({ message: "serve err", err_code: 0 });
            }
            if (!data) {
                return res
                    .status(200)
                    .send(
                        JSON.stringify({ message: "email or psd is invalid", err_code: 1 })
                    );
            }
            let result = {
                Email: data.Email,
                nickname: data.nickname,
            };
            req.session.user = result;
            res.status(200).json({ message: "ok", err_code: 2 });
        }
    );
});


//----------------------------
router.post("/writeDiary", function(req, res) {
    var body = req.body;

    body.article = change(body.article)


    if (!req.session.user) {
        console.log("no login,but request");
        return;
    }

    let theUser = req.session.user.Email;

    User.findOne({ Email: theUser }, function(err, data) {
        if (err) {
            return res.status(500).json({ message: "serve err", err_code: 0 });
        }
        if (data) {
            User.updateOne({ Email: theUser }, { $push: { diary: body } },
                function(err, data) {}
            );
            return res
                .status(200)
                .send(JSON.stringify({ message: "save success ", err_code: 2 }));
        }
    });
});






router.post("/edit", function(req, res) {
    var body = req.body;
    let article = change(body.article)
    if (!req.session.user) {
        console.log("no login,but request");
        return;
    }

    let theUser = req.session.user.Email;
    let temDate = body.date;

    User.updateOne({ Email: theUser, "diary.date": temDate }, {
        $set: {
            'diary.$.article': article,
        },
    }, function(err, data) {
        if (err) {
            console.log(err)
        }
        if (data) {

            return res
                .status(200)
                .send(JSON.stringify({ message: "save success ", err_code: 2 }));

        }
    })




});

router.post("/del", function(req, res) {
    var body = req.body;
    if (!req.session.user) {
        console.log("no login,but request");
        return;
    }

    let theUser = req.session.user.Email;
    let temDate = body.date;




    User.updateMany({ Email: theUser }, {
            $pull: {
                diary: {
                    date: { $in: [temDate] }
                }
            }
        },
        function(err, data) {
            if (err) return console.log(err);
            res
                .status(200)
                .send(JSON.stringify({ message: "save success ", err_code: 2 }));
        }
    );
});


router.post("/paypage", function(req, res) {
    if (req.session.user) {
        let resStr;
        User.findOne({ Email: req.session.user.Email }, function(err, data) {
            if (err) {}
            if (data) {
                resStr = data.pay;
                return res.status(200).send(JSON.stringify(resStr));
            }
        });
    }
});
//----------------------------
router.post("/pay", function(req, res) {
    var body = req.body;
    if (!req.session.user) {
        console.log("no login,but request");
        return;
    }
    let theUser = req.session.user.Email;
    User.findOne({ Email: theUser }, function(err, data) {
        if (err) {
            return res.status(500).json({ message: "serve err", err_code: 0 });
        }
        if (data) {
            User.updateOne({ Email: theUser }, { $push: { pay: body } },
                function(err, data) {}
            );
            return res
                .status(200)
                .send(JSON.stringify({ message: "save success ", err_code: 2 }));
        }
    });
});


//----------------------------
router.post("/delelepay", function(req, res) {

    if (!req.session.user) {
        console.log("no login,but request");
        return;
    }
    let theUser = req.session.user.Email;
    User.updateOne({ Email: theUser }, {
        $set: {
            pay: [],
        },
    }, function(err, data) {
        if (err) {
            console.log(err)
        }
        if (data) {
            console.log(data)
            return res
                .status(200)
                .send(JSON.stringify({ message: "del success ", err_code: 2 }));

        }
    })

});


module.exports = router;