const express = require('express');
const router = express.Router();

let id = 0;
const lions = [];

router.param('id', function(req, res, next, id){
    const lion = lions.find(lion => lion.id === id);

    if (!lion) {
        res.status(404).send('NOT FOUND');
    } else {
        req.lion = lion;
        next();
    }
});

router.get('/', (req, res) => {
    try {
        res.send(lions);
    } catch (error) {
        res.send(error);
    }
});

router.get('/:id', (req, res) => {
    res.send(req.lion);
});

router.post('/', (req, res) => {
    const lion = req.body;
    id++;
    lion.id = id + '';

    lions.push(lion);

    res.send(lions);
});

router.put('/:id', (req, res) => {
    const update = req.body;
    const lion = lions.findIndex(lion => lion.id === req.params.id);

    if (!lions[lion]) {
        res.status(404).send('NOT FOUND !')
    } else {
        const updatedLion = Object.assign(lions[lion], update);

        res.send(updatedLion)
    }
});

router.delete('/:id', (req, res) => {
    const newLions = lions.filter(lion => lion.id !== req.params.id);

    res.send(newLions)
});

module.exports = router;
