const express = require('express');
const itemsRoutes = require('./routes');
const morgan = require('morgan');

const app = express();


app.use(express.json());
app.use(morgan('dev'));
app.use('/items',itemsRoutes);

app.use((req,res,next) => {
    const e = new ExpressError("Page not found",404);
    next(e);
})

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
  
    return res.json({
      error: err,
      message: err.message,
    });
});

module.exports= app;
