const router = require('express').Router();

let QRcode = require('../models/qrcode.model');

router.route('/').get((req,res) =>{
    QRcode.find()
        .then(codes => res.json(codes))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const description = req.body.description;
    const code = req.body.code;
    const date = Date.parse(req.body.date)

    const newQRcode = new QRcode({
        username,
        description,
        code,
        date
    });
    
    newQRcode.save()
        .then(() => res.json('QR code added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').get((req,res)=>{
    QRcode.findById(req.params.id)
        .then(qrcode => res.json(qrcode))
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router