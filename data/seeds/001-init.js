exports.seed = function (knex){
    const roles = [
        {name: 'user'},
    ];

    return knex('roles')
    .insert(roles)
    .then(()=> console.log('\n== Seed data for roles table added ==\n'))
}