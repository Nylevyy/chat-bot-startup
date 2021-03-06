import { getUserModel, UserCreationAttr, UserModelType } from '../models/User';

import { db } from './DBService';

class UserService {
  private userModel: UserModelType;

  constructor() {
    this.userModel = getUserModel(db);
  }

  async init() {
    await db.authenticate();
    await db.sync();
  }

  async addUser(user: UserCreationAttr) {
    try {
      const newUser = await this.userModel.create(user);
      return newUser;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getUsersByCar(car: string) {
    const users = await this.userModel.findAll({
      where: {
        preferredCar: car,
      },
    });
    return users;
  }

  // !WARNING temporary method
  async refresh() {
    await db.drop();
  }
}

export { UserService };
