import { Category } from 'src/entity/category.entity';
import { District } from 'src/entity/district.entity';
import { User } from 'src/entity/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mssql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User, Category, District],
        synchronize: true,
        extra: {
          trustServerCertificate: true,
        },
      });
      try {
        if (!dataSource.isInitialized) {
          console.log('awaiting DB');
          await dataSource.initialize();
        }
      } catch (error) {
        console.error(error?.message);
      }
      console.log('DB Connected');
      return dataSource;
    },
  },
];
