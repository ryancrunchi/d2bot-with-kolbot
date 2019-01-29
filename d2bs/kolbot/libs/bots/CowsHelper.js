/**
*	@filename	CowsHelper.js
*	@author		ryancrunchi
*	@desc		wait for cow portal at act1 stash and clear the Moo Moo Farm without killing the Cow King
*/

function CowsHelper() {
	this.waitCowLevel = function() {
		Town.move("stash");
		
		//Pather.usePortal(39);

		for (var i = 0; i < Config.CowsHelper.Wait; i += 1) {
			if (Pather.getPortal(39) && Pather.usePortal(39)) {
				if (me.classid == 5) {
					if (!Pather.moveTo(me.x+1, me.y+1)) {
						if (!Pather.moveTo(me.x-1, me.y-1)) {
							
						}
					}
				}
				break;
			}

			delay(1000);
		}

		if (i === Config.CowsHelper.Wait) {
			throw new Error("Cow level wait timed out (no cow level portal)");
		}
	};

	this.buildCowRooms = function () {
		var i, j, room, kingPreset, badRooms, badRooms2,
			finalRooms = [],
			indexes = [];

		kingPreset = getPresetUnit(me.area, 1, 773);
		badRooms = getRoom(kingPreset.roomx * 5 + kingPreset.x, kingPreset.roomy * 5 + kingPreset.y).getNearby();

		for (i = 0; i < badRooms.length; i += 1) {
			badRooms2 = badRooms[i].getNearby();

			for (j = 0; j < badRooms2.length; j += 1) {
				if (indexes.indexOf(badRooms2[j].x + "" + badRooms2[j].y) === -1) {
					indexes.push(badRooms2[j].x + "" + badRooms2[j].y);
				}
			}
		}

		room = getRoom();

		do {
			if (indexes.indexOf(room.x + "" + room.y) === -1) {
				finalRooms.push([room.x * 5 + room.xsize / 2, room.y * 5 + room.ysize / 2]);
			}
		} while (room.getNext());

		return finalRooms;
	};

	this.clearCowLevel = function () {
		if (Config.MFLeader) {
			Pather.makePortal();
			say("cows");
		}

		var room, result, myRoom,
			rooms = this.buildCowRooms();

		function RoomSort(a, b) {
			return getDistance(myRoom[0], myRoom[1], a[0], a[1]) - getDistance(myRoom[0], myRoom[1], b[0], b[1]);
		}

		var king;
		while (rooms.length > 0) {
			// get the first room + initialize myRoom var
			if (!myRoom) {
				room = getRoom(me.x, me.y);
			}

			if (room) {
				if (room instanceof Array) { // use previous room to calculate distance
					myRoom = [room[0], room[1]];
				} else { // create a new room to calculate distance (first room, done only once)
					myRoom = [room.x * 5 + room.xsize / 2, room.y * 5 + room.ysize / 2];
				}
			}

			rooms.sort(RoomSort);
			room = rooms.shift();

			result = Pather.getNearestWalkable(room[0], room[1], 10, 2);

			if (result) {
				Pather.moveTo(result[0], result[1], 3);

				king = getPresetUnit(me.area, 1, 773);
				if (king) {
					var distance = getDistance(me, king);
					print("Found king at "+distance);
					if (distance > 80) {
						if (!Attack.clear(30)) {
							return false;
						}
					}
				}
				else {
					if (!Attack.clear(30)) {
						return false;
					}
				}
			}
		}

		return true;
	};

	Town.goToTown(1);
	Town.doChores();

	this.waitCowLevel();
	Precast.doPrecast(false);
	this.clearCowLevel();

	return true;
}