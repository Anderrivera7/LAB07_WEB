import User from '../models/User.js';

class UserRepository {
  async create(data) {
    return await User.create(data);
  }

  async findByEmail(email) {
    return await User.findOne({ email }).populate('roles');
  }

  async findAll() {
    return await User.find().populate('roles');
  }

  async findById(id) {
    return await User.findById(id).populate('roles');
  }

  async updateById(id, data) {
    return await User.findByIdAndUpdate(id, data, {
      new: true
    }).populate('roles');
  }
}

export default new UserRepository();