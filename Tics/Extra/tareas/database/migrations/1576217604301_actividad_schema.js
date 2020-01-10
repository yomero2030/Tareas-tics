'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActividadSchema extends Schema {
  up () {
    this.create('actividads', (table) => {
      table.increments()
      table.increments()
      table.string('actividad',250).notNullable()
      table.date('fecha').notNullable()
      table.time('hora').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('actividads')
  }
}

module.exports = ActividadSchema
