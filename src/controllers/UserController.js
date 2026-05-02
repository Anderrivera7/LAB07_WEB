import UserService from '../services/UserService.js';

class UserController {
  async me(req, res, next) {
    try {
      const user = await UserService.me(req.userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateMe(req, res, next) {
    try {
      const user = await UserService.updateMe(req.userId, req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const users = await UserService.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();