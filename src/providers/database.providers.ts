import { Catagory } from 'src/entity/catagory.entity';
import { District } from 'src/entity/district.entity';
import { User } from 'src/entity/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mssql',
        host: 'localhost',
        port: 1433,
        username: 'sa',
        password: 'Sqls2022!',
        database: 'csie',
        entities: [User, Catagory, District],
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
