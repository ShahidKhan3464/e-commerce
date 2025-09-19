import app from './app.js';
import { connectDB } from './src/config/dbConfig.js';
import { seedAdmin } from './src/seeders/seedSuperAdmin.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    // Seed super admin (optional: only in dev)
    if (process.env.NODE_ENV !== 'production') {
      await seedAdmin();
    }

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
