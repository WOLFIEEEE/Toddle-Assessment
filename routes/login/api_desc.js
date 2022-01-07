const jwt = require("jsonwebtoken");
const db = require('../../database');

exports.login = async(req, res, next) => {
    console.log(req.body)

    try {
        let use = `INSERT INTO users (username, password)
        SELECT * FROM (SELECT ?, ?) AS tmp
        WHERE NOT EXISTS (SELECT username FROM users WHERE username=?) LIMIT 1`;
        // var create_user = `INSERT INTO users (username, password) VALUES(?,?)`;
        var use_params = [req.body.username, req.body.password, req.body.username];
        let after = `SELECT * FROM users WHERE username=? LIMIT 1`;
        let after_params = [req.body.username]

        db.serialize(function() {
            db.all(use, use_params, (err) => {
                if (err) {
                    console.log(err);
                }
            })
            db.all(after, after_params, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    // Assign a json web token
                    const tokenSecret = process.env.Token_Secret;
                    const jToken = jwt.sign({ userId: data[0].userId }, tokenSecret, {
                        expiresIn: "1d"
                    });

                    res.status(200)
                        .header("authorization", jToken)
                        .json(jToken);
                }
            })


        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
}