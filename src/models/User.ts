import {
  DataTypes,
  Model,
  Sequelize,
} from 'sequelize';

export type User = {
  id: string;
  name: string;
  chatId: string;
  preferredCar: string;
  preferredWheelRadius: number;
};

export type UserCreationAttr = {
  name: string;
  chatId: number;
  preferredCar: string;
  preferredWheelRadius: number;
};

class UserModel extends Model<User, UserCreationAttr> {
  public id: number;
  public name: string;
  public chatId: number;
  public preferredCar: string;
  public preferredWheelRadius: number;
}

export type UserModelType = typeof UserModel;

export const getUserModel = (sequelize: Sequelize) => {
  return sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    chatId: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    name: { type: DataTypes.STRING },
    preferredCar: { type: DataTypes.STRING },
    preferredWheelRadius: { type: DataTypes.INTEGER },
  }) as UserModelType;
};
