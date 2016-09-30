var functions = require('functions');

var roleUpgrader =
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

        if (!creep.memory.upgrading) {
            creep.memory.upgrading = false;
        }

        if (creep.carry.energy < creep.carryCapacity && !creep.memory.upgrading && !creep.memory.shouldRepair) {
            var closestTarget = functions.closestTarget(creep.room.find(FIND_SOURCES, { filter: function (source) { return source.energy > 0; } }), creep);

            if (closestTarget != null) {
                if (creep.harvest(closestTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget);
                }
            }
        }
        else if (!creep.memory.shouldRepair) {
            if (creep.carry.energy > 0) {
                creep.memory.upgrading = true;
            }
            else {
                creep.memory.upgrading = false;
            }
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTROLLER);
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
}

module.exports = roleUpgrader;