import Joi from '@hapi/joi';
import { notFound } from '@hapi/boom';

import { Hero } from '../../models';
import { METHODS } from '../../config/constants';
import { assert } from '../../helpers';
import config from '../../config';

export const getHeroes = {
  method: METHODS.GET,
  path: '/heroes',
  validate: {
    query: {
      skip: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1).default(10),
    },
  },
  async handler(req, res) {
    const { count, rows } = await Hero.findAndCountAll({ limit: req.query.limit, offset: req.query.skip });
    res.json({
      data: rows.map((row) => {
        const rowData = row.toJSON();
        return { ...rowData, image: `${config.app.domain}/img/${rowData.images}` };
      }),
      total: count,
    });
  },
};

export const getHero = {
  method: METHODS.GET,
  path: '/heroes/:id',
  validate: {
    params: {
      id: Joi.string().required(),
    },
  },
  async handler(req, res) {
    const hero = await Hero.findByPk(req.params.id);
    assert(hero, notFound, 'Hero not found');
    const rowData = hero.toJSON();
    res.json({
      data: { ...rowData, image: `${config.app.domain}/img/${hero.images}` },
    });
  },
};

export const createHero = {
  method: METHODS.POST,
  path: '/heroes',
  validate: {
    file: {
      buffer: Joi.binary().max(50 * 1024 * 1024),
    },
    body: {
      fileData: Joi.array(),
    },
  },
  async handler(req, res) {
    const heroData = {
      nickName: req.body.fileData[0],
      realName: req.body.fileData[1],
      originDescription: req.body.fileData[2],
      superpowers: req.body.fileData[3],
      catchPhrase: req.body.fileData[4],
      images: req.file.originalname,
    };
    await Hero.create(heroData);
    res.json({
      data: 'Hero added to the library',
      code: 200,
    });
  },
};

export const updateHero = {
  method: METHODS.PATCH,
  path: '/heroes/:id',
  validate: {
    file: {
      buffer: Joi.binary().max(50 * 1024 * 1024),
    },
    params: {
      id: Joi.string().required(),
    },
  },
  async handler(req, res) {
    const hero = await Hero.findByPk(req.params.id);
    assert(hero, notFound, 'Hero not found');
    hero.update({ images: req.file.originalname });
    await hero.save();
    const rowData = hero.toJSON();
    res.json({
      data: { ...rowData, image: `${config.app.domain}/img/${hero.images}` },
    });
  },
};

export const deleteHero = {
  method: METHODS.DELETE,
  path: '/heroes/:id',
  validate: {
    params: {
      id: Joi.string().required(),
    },
  },
  async handler(req, res) {
    const hero = await Hero.findByPk(req.params.id);
    assert(hero, notFound, 'Hero not found');
    await hero.destroy();
    res.json({ data: hero, code: 200 });
  },
};
