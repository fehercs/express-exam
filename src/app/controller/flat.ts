import { Flat } from '../model/flat';
import { Request, Response} from 'express';
import { database } from '../../lib/database';
import { QueryBuilder } from 'knex';
import * as flatSerializer from '../serializer/flat';

export const index = async (req: Request, res: Response) => {
  try {
    let query: QueryBuilder = database('flats').select();
    if (req.query.limit) {
      query = query.limit(req.query.limit);
    }
    if (req.query.offset) {
      query = query.offset(req.query.offset);
    }
    const flats: Array<Flat> = await query;
    res.json(flats);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const flat: Flat = await database('flats').select().where({ id: req.params.id }).first();
    flat ? res.json(flatSerializer.show(flat)) : res.sendStatus(404);    
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const flat: Flat = {
      title: req.body.title,
      price: req.body.price,
      floorArea: req.body.floorArea,
      country: req.body.country,
      zip: req.body.zip,
      city: req.body.cit,
      street: req.body.street
    };
    await database('flats').insert(flat);
    return res.sendStatus(201);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    let flat: Flat = await database('flats').select().where({ id: req.params.id }).first();
    if (flat) {
      flat = {
        title: req.body.title ? req.body.title : flat.title,
        price: req.body.price ? req.body.price : flat.price,
        floorArea: req.body.floorArea,
        country: req.body.country,
        zip: req.body.zip,
        city: req.body.cit,
        street: req.body.street
      };
      database('flats').update(flat).where({ id: req.params.id });
      return res.sendStatus(200);
    } else {
      return res.sendStatus(404);
    }    
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    let flat: Flat = await database('flats').select().where({ id: req.params.id }).first();
    if (flat) {
      database('flats').delete().where({ id: req.params.id });
      return res.sendStatus(204);
    } else {
      return res.sendStatus(404);
    }    
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}