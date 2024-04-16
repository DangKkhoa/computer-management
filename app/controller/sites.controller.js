

class sitesController {
    index(req, res) {
        res.render('home', {user: req.session.user});
    }
}

module.exports = new sitesController;