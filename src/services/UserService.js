import userRepository from '../repositories/UserRepository.js';

class UserService {
  async me(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      const err = new Error('Usuario no encontrado');
      err.status = 404;
      throw err;
    }
    return user;
  }

  async updateMe(userId, data) {
    const user = await userRepository.updateById(userId, data);
    if (!user) {
      const err = new Error('Usuario no encontrado');
      err.status = 404;
      throw err;
    }
    return user;
  }

  async findAll() {
    return await userRepository.findAll();
  }
}

export default new UserService();