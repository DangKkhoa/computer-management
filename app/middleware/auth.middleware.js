exports.isLoggedIn = (req, res, next) => {
    const { customer } = req.query;
    // console.log(req.session.user);
    if(req.session.user || customer === 'true') {
        return next();
    }
    return res.redirect('/auth/login');
}


exports.roleAuth = (req, res, next) => {
    const user = req.session.user;
    
    if(user.role === 'ADMIN') {
        return next();
    }

    return res.status(403).send('<h1>Forbidden!</h1>');

}
