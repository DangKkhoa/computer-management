module.exports = (req, res, next) => {
    const { customer } = req.query;
    // console.log(req.session.user);
    if(req.session.user || customer === 'true') {
        return next();
    }
    return res.redirect('/auth/login');
}