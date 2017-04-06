var knex = require('../database/connection');

export class Pokemon {
  pokemons(args) {
    return knex('pokemons').where(args);
  }

  createPokemon(args) {
    return knex.returning('id').insert({
      url: args.url,
      name: args.name,
      trainer_id: args.trainer_id,
    }).into('pokemons').then(id => {
      return knex('pokemons').where({ id: id[0] }).first();
    });
  }

  updatePokemon(args) {
    return knex('pokemons').where({ id: args.id }).returning('id').update({
      url: args.url,
      name: args.name,
      trainer_id: args.trainer_id,
    }).then(id => {
      return knex('pokemons').where({ id: id[0] }).first();
    });
  }

  deletePokemon(args) {
    return knex('pokemons').where({ id: args.id }).del()
  }
}
