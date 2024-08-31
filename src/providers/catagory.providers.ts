import { Catagory } from 'src/entity/catagory.entity';
import { DataSource } from 'typeorm';

export const UserProvider = [
  {
    provide: 'CATAGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Catagory),
    inject: ['DATA_SOURCE'],
  },
];
