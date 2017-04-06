var knex = require('../database/connection');

export class Trainer {
  trainers(args) {
    return knex('trainers').where(args);
  }

  createTrainer(args) {
    return knex.returning('id').insert({
      name: args.name,
    }).into('trainers').then(id => {
      return knex('trainers').where({ id: id[0] }).first();
    });
  }

  updateTrainer(args) {
    return knex('trainers').where({ id: args.id }).returning('id').update({
      name: args.name,
    }).then(id => {
      return knex('trainers').where({ id: id[0] }).first();
    });
  }

  deleteTrainer(args) {
    return knex('trainers').where({ id: args.id }).del()
  }
}

