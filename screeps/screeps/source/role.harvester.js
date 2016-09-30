/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

var functions = require('functions');


var roleHarvester =
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

		if (creep.carry.energy < creep.carryCapacity && !creep.memory.shouldRepair && !creep.memory.isWorking) {
			var closestTarget = functions.closestTarget(creep.room.find(FIND_SOURCES, { filter: function (source) { return source.energy > 0; } }), creep);

			if (closestTarget != null) {
				if (creep.harvest(closestTarget) == ERR_NOT_IN_RANGE) {
					creep.moveTo(closestTarget);
				}
			}
		}
		else if (!creep.memory.shouldRepair) {
			if (creep.carry.energy > 0 && !creep.memory.isWorking) {
				creep.memory.isWorking = true;
			}
			else if (creep.carry.energy == 0 && creep.memory.isWorking) {
				creep.memory.isWorking = false;
			}

			var targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					var notFull = true;


					if (structure.structureType == STRUCTURE_CONTAINER) {
						notFull = false;//zatim nepozivat structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
					}
					else if (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) {
						notFull = structure.energy < structure.energyCapacity;
					}

					return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_CONTAINER) &&
						(notFull);
				}
			});
			if (targets.length > 0) {
				if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0]);
				}
			}
			else {
				//park somewhere
				creep.moveTo(25, 25);
			}
		}
	}
}

module.exports = roleHarvester;