import { User } from 'src/entity/user.entity';
import { DataSource } from 'typeorm';

export const UserProvider = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
