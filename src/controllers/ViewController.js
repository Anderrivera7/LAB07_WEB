class ViewController {
  signIn(req, res) {
    res.render('signin');
  }

  signUp(req, res) {
    res.render('signup');
  }

  profile(req, res) {
    res.render('profile');
  }

  userDashboard(req, res) {
    res.render('dashboard-user');
  }

  adminDashboard(req, res) {
    res.render('dashboard-admin');
  }

  forbidden(req, res) {
    res.status(403).render('403');
  }
}

export default new ViewController();