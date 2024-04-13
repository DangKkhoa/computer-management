module.exports = (req, res, next) => {
    console.log(req.user);
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()) {
        // console.log("I am here");
        return next();
    }
    // console.log("I am outside");
    return res.redirect('/auth/login');
}