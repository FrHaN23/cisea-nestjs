import { Inject, Injectable } from '@nestjs/common';
import { Catagory } from 'src/entity/catagory.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class CatagoryServices {
  constructor(
    @Inject('CATAGORY_REPOSITORY')
    private readonly catagoryRepos: Repository<Catagory>,
  ) {}

  async getCatagories() {}
}
