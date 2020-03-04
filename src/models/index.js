import { Sequelize, Model } from 'sequelize';

import HeroesSchema from './Heroes';
import config from '../config';

export const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  dialect: config.db.dialect,
  host: config.db.host,
  define: { timestamps: false },
  logging: false,
});

export class Hero extends Model {}

Hero.init(HeroesSchema.schema, { sequelize, tableName: HeroesSchema.tableName });
