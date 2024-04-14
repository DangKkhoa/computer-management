module.exports = (req, res, next) => {
    const { customer } = req.query;
    console.log(req.session.user);
    if(req.session.user || customer === 'true') {
        // console.log("I am here");
        return next();
    }
    // console.log("I am outside");
    return res.redirect('/auth/login');
}