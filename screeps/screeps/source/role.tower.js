var roleTower =
{
	run: function (tower) {
		var structs = tower.room.find(FIND_STRUCTURES, {
			filter: (s) => {
				return (s.hits < s.hitsMax) && (s.structureType != STRUCTURE_WALL);
			}
		});

		console.log(structs);
		console.log(tower.repair(structs[0]));
	}
}

module.exports = roleTower;