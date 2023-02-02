const express = require("express");
const router = new express.Router();
const ExpressError = require('./express-error');
const fakeDb = require('./fakeDb');

router.get('/',(req,res,next) => {
    try{
        return res.json(fakeDb);
    }catch(e){
        next(e);
    }
    
});

router.post('/',(req,res,next) => {
    try{
        if((! req.body.name) || (! req.body.price)){
            throw new ExpressError('nums are required',400);
        }else{
            fakeDb.push(req.body)
            res.json({"added": {"name": `${req.body.name}`, "price": `${req.body.price}`}})
        }

    }catch(e){
        next(e);
    }
});

router.get('/:name', (req, res, next) => {
    try{
        for(let x in fakeDb){
            if(Object.values(fakeDb[x]).includes(req.params.name)){
                return res.json(fakeDb[x]);
            }
        }
        throw new ExpressError("Item not found! - Try another route", 404)
        
    }catch(e){
        next(e)
    }
});

router.patch("/:name", function (req, res) {
    const foundItem = fakeDb.find(e => e.name === req.params.name)
    if (foundItem === undefined) {
      throw new ExpressError("Cat not found", 404)
    }
    foundItem.name = req.body.name 
    res.json({ fakeDb: foundItem });
  })


router.delete('/:name', (req, res, next) => {
    const foundItem = fakeDb.findIndex(e => e.name === req.params.name)
    if (foundItem === -1) {
      throw new ExpressError("Cat not found", 404)
    }
    fakeDb.splice(foundItem, 1)
    res.json({ message: "Deleted" })

});
  


module.exports = router;