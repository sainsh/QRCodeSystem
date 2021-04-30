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

router.route('/:id').delete((req, res) => {
    QRcode.findByIdAndDelete(req.params.id)
        .then(() => res.json('QR code deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res) => {
    QRcode.findById(req.params.id)
        .then(qrcode => {
            qrcode.username = req.body.username;
            qrcode.description = req.body.description;
            qrcode.code = req.body.code;
            qrcode.date = Date.parse(req.body.date);

            qrcode.save()
                .then(() => res.json('QR code updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));

});



module.exports = router