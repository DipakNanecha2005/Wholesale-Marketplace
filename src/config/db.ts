import { connect } from 'mongoose';
import { MONGODB_URL } from './config';

(async () => {
  const conn = await connect(MONGODB_URL);
  console.log(`Database connected: ${conn.connection.host}`);
})();
