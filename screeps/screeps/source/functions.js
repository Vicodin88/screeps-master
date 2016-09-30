/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('functions');
 * mod.thing == 'a thing'; // true
 */

var functions = class {
    static closestTarget(targets, creep) {
        if (targets.length == 0) {
            return null;
        }

        var closestTarget;

        var minDistance = 9999;
        for (var target in targets) {

            var currentTarget = targets[target];

            var currentDistance = creep.room.findPath(creep.pos, currentTarget.pos).length;

            if (currentDistance < minDistance) {
                closestTarget = currentTarget;
                minDistance = currentDistance;
            }
        }

        return closestTarget;

    }

    static repairIfNeeded(creep) {
        if (creep.ticksToLive < 300) {
            creep.memory.shouldRepair = true;
        }
        else if (creep.ticksToLive > 1100) {
            creep.memory.shouldRepair = false;
        }
    }

    static getBestPowerSource(creep) {
        var targets = creep.room.find(FIND_SOURCES, { filter: function (source) { return source.energy > 0; } });

        var targets2 = creep.room.find(FIND_STRUCTURES, {
            filter: function (structure) {
                var containerHasPower = false;
                if (structure.store !== undefined) {
                    containerHasPower = structure.store[RESOURCE_ENERGY] > 0;
                }

                return (structure.structureType == STRUCTURE_CONTAINER) && (containerHasPower);
            }
        });

        var finalTargets = targets.concat(targets2);

        return finalTargets;
    }

};

module.exports = functions;