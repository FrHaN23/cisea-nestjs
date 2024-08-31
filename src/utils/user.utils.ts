import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

export async function findUserByUsername(
  userRepository: Repository<User>,
  username: string,
): Promise<User | null> {
  return userRepository.findOne({ where: { username } });
}
