import type { IConfig } from '../@types/index.interface';

const config: IConfig = {
  MONGO: {
    URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/todo'
  },
  PORT: process.env.PORT || '9876',
};

export default config; 