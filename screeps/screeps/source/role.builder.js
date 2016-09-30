var functions = require('functions');

var roleBuilder =
{
    run: function (creep) {

        if (creep.ticksToLive < 500) {
            creep.memory.shouldRepair = true;
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN);
                }
            });
            if (targets.length > 0) {
                creep.moveTo(targets[0]);
            }
            return;
        }
        else if (creep.ticksToLive > 1000) {
            creep.memory.shouldRepair = false;
        }

        if (!creep.memory.building) {
            creep.memory.building = false;
        }

        if (creep.carry.energy < creep.carryCapacity && !creep.memory.building && !creep.memory.shouldRepair) {

            //var closestTarget = functions.closestTarget(creep.room.find(FIND_SOURCES,{filter:function(source){return source.energy>0;}}),creep);
            var closestTarget = functions.closestTarget(functions.getBestPowerSource(creep), creep);

            if (closestTarget != null) {

                if (creep.harvest(closestTarget) == ERR_NOT_IN_RANGE || creep.withdraw(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget);
                }
            }
        }
        else if (!creep.memory.shouldRepair) {
            if (creep.carry.energy > 0) {
                creep.memory.building = true;
            }
            else {
                creep.memory.building = false;
            }
            var target = functions.closestTarget(creep.room.find(FIND_MY_CONSTRUCTION_SITES), creep);
            if (target != null) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
}

module.exports = roleBuilder;