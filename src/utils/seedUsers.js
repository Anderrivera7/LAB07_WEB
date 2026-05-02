import bcrypt from 'bcrypt';
import userRepository from '../repositories/UserRepository.js';
import roleRepository from '../repositories/RoleRepository.js';

export default async function seedUsers() {
  const adminExists = await userRepository.findByEmail('admin@test.com');
  if (adminExists) return;

  const adminRole = await roleRepository.findByName('admin');
  const hashedPassword = await bcrypt.hash('Admin123*', 10);

  await userRepository.create({
    name: 'Admin',
    lastName: 'Principal',
    email: 'admin@test.com',
    password: hashedPassword,
    phoneNumber: '999999999',
    birthdate: new Date('2000-01-01'),
    address: 'Lima, Perú',
    url_profile: '',
    roles: [adminRole._id]
  });

  console.log('Admin user seeded');
}