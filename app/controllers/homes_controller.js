exports.index = function(req, res, next) {
  res.render('homes/index', {
    title: 'Accounting',
    isLoggedIn: req.isAuthenticated(),
  })
}

exports.home = function(req, res, next) {
  res.render('homes/home', {
    title: 'Login',
    isLoggedIn: req.isAuthenticated(),
  })
}
