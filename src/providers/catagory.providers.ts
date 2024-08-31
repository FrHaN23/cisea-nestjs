import { Category } from 'src/entity/category.entity';
import { DataSource } from 'typeorm';

export const CategoryProvider = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: ['DATA_SOURCE'],
  },
];
