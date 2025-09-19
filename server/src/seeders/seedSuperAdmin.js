import dotenv from 'dotenv';
import { encryptPassword } from '../utils/general.js';
import { createUser, findUserByEmail } from '../repositories/user.js';
dotenv.config();

const superAdmin = {
  role: 'admin',
  name: 'Shahid Khan',
  email: process.env.SUPERADMIN_EMAIL,
  password: process.env.SUPERADMIN_PASSWORD
};

export const seedAdmin = async () => {
  try {
    const existingAdmin = await findUserByEmail(superAdmin.email);
    if (existingAdmin) {
      console.log('Super Admin already exists');
      return;
    }

    const hashedPassword = await encryptPassword(superAdmin.password);
    createUser({ ...superAdmin, password: hashedPassword });
    console.log('Super Admin created successfully');
  } catch (err) {
    process.exit(1);
  }
};
