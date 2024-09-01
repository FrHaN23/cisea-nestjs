import { Penerimaan } from 'src/entity/penerimaan.entity';
import { DataSource } from 'typeorm';

export const PenerimaanProvider = [
  {
    provide: 'PENERIMAAN_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Penerimaan),
    inject: ['DATA_SOURCE'],
  },
];
