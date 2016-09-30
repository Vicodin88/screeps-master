var thisDoesNothing = -1;
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTower = require('role.tower');

module.exports.loop = function () {
    var tower = Game.getObjectById('57ed6f3f0453f1743a647520');
    console.log(tower);
    roleTower.run(tower);

    /*if(Game.spawns['Spawn1'].canCreateCreep(Game.spawns['Spawn1'].memory.bot0)==0)
    {
        var currentBot = Game.spawns['Spawn1'].memory.queue.pop();
        console.log('Spawning '+currentBot+', '+Game.spawns['Spawn1'].memory.bot0)
        console.log(Game.spawns['Spawn1'].createCreep(Game.spawns['Spawn1'].memory.bot0,null,{role:currentBot}));
        Game.spawns['Spawn1'].memory.queue.unshift(currentBot);
    }*/

    for (var creepName in Game.creeps) {
        var creep = Game.creeps[creepName];


        /*var objectUnderCreep = creep.room.lookForAt(LOOK_STRUCTURES,creep.pos);
        var roadFoundUnderCreep = false;
        for (var object in objectUnderCreep) {
            var str = objectUnderCreep[object];
            if(str.structureType == STRUCTURE_ROAD)
            {
                roadFoundUnderCreep = true;
            }
        }
        
        if(!roadFoundUnderCreep)
        {
            creep.room.createConstructionSite(creep.pos,STRUCTURE_ROAD);
        }*/

        if (creep.ticksToLive < 1000) {
            Game.spawns['Spawn1'].renewCreep(creep);
        }

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}