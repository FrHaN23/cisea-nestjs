import { District } from 'src/entity/district.entity';
import { DataSource } from 'typeorm';

export const DistrictProvider = [
  {
    provide: 'DISTRICT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(District),
    inject: ['DATA_SOURCE'],
  },
];
