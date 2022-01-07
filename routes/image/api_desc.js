const fs = require('fs');
const fetch = require('node-fetch');
const sharp = require('sharp');


exports.resize = async(req, res, next) => {
    console.log(req.body.url);
    try {
        const response = await fetch(req.body.url);
        try {
            const buffer = await response.buffer();
            try {
                sharp(buffer).resize(50, 50).jpeg({ quality: 50 }).toFile('./img/image_thumb.jpeg');
                res.status(200)
                    .send("Image resized https://toddlef322.herokuapp.com/image_thumb.jpeg");

            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        console.log(error)
    }

}