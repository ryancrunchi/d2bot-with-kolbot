/*
* Pet by ryancrunchi
*/

function Pet() {
	var leader, leaderUnit, charClass, skill,
		classes = ["amazon", "sorceress", "necromancer", "paladin", "barbarian", "druid", "assassin"];
		var defaultTeleport = Pather.teleport;

	// Get leader's Party Unit
	this.getLeader = function (name) {
		var player = getParty();

		if (player) {
			do {
				if (player.name === name) {
					return player;
				}
			} while (player.getNext());
		}

		return false;
	};

	// Get leader's Unit
	this.getLeaderUnit = function (name) {
		var player = getUnit(0, name);

		if (player) {
			do {
				if (!player.dead) {
					return player;
				}
			} while (player.getNext());
		}

		return false;
	};

	// Get leader's act from Party Unit
	this.checkLeaderAct = function (unit) {
		while (unit.area == 0) {
			delay(100);
		}
		if (unit.area <= 39) {
			return 1;
		}

		if (unit.area >= 40 && unit.area <= 74) {
			return 2;
		}

		if (unit.area >= 75 && unit.area <= 102) {
			return 3;
		}

		if (unit.area >= 103 && unit.area <= 108) {
			return 4;
		}

		return 5;
	};

	// Change areas to where leader is
	this.checkExit = function (unit, area) {
		if (unit.inTown) {
			return false;
		}

		var target,
			exits = getArea().exits;

		for (var i = 0; i < exits.length; i += 1) {
			if (exits[i].target === area) {
				return 1;
			}
		}

		if (unit.inTown) {
			target = getUnit(2, "waypoint");

			if (target && getDistance(me, target) < 20) {
				return 3;
			}
		}

		target = getUnit(2, "portal");

		if (target) {
			do {
				if (target.objtype === area) {
					Pather.usePortal(null, null, target);

					return 2;
				}
			} while (target.getNext());
		}

		// Arcane<->Cellar portal
		if ((me.area === 74 && area === 54) || (me.area === 54 && area === 74)) {
			Pather.usePortal(null);

			return 4;
		}

		// Tal-Rasha's tomb->Duriel's lair
		if (me.area >= 66 && me.area <= 72 && area === 73) {
			Pather.useUnit(2, 100, area);

			return 4;
		}

		// Throne->Chamber
		if (me.area === 131 && area === 132) {
			target = getUnit(2, 563);

			if (target) {
				Pather.usePortal(null, null, target);

				return 4;
			}
		}

		return false;
	};

	// Talk to a NPC
	this.talk = function (name) {
		if (!me.inTown) {
			//say("I'm not in town!");

			return false;
		}

		if (typeof name === "string") {
			name = name.toLowerCase();
		} else {
			//say("No NPC name given.");

			return false;
		}

		var npc, names;

		switch (me.act) {
		case 1:
			names = [NPC.Gheed, NPC.Charsi, NPC.Akara, NPC.Kashya, NPC.Cain, NPC.Warriv];

			break;
		case 2:
			names = [NPC.Fara, NPC.Lysander, NPC.Greiz, NPC.Elzix, NPC.Jerhyn, NPC.Meshif, NPC.Drognan, NPC.Atma, NPC.Cain];

			break;
		case 3:
			names = [NPC.Alkor, NPC.Asheara, NPC.Ormus, NPC.Hratli, NPC.Cain];

			break;
		case 4:
			names = [NPC.Halbu, NPC.Tyrael, NPC.Jamella, NPC.Cain];

			break;
		case 5:
			names = [NPC.Larzuk, NPC.Malah, NPC.Qual_Kehk, NPC.Anya, NPC.Nihlathak, NPC.Cain];

			break;
		}

		if (names.indexOf(name) === -1) {
			//say("Invalid NPC.");

			return false;
		}

		if (!Town.move(name === NPC.Jerhyn ? "palace" : name)) {
			Town.move("portalspot");
			//say("Failed to move to town spot.");

			return false;
		}

		npc = getUnit(1);

		if (npc) {
			do {
				if (npc.name.replace(/ /g, "").toLowerCase().indexOf(name) > -1) {
					npc.openMenu();
					me.cancel();
					Town.move("portalspot");
					//say("Done talking.");

					return true;
				}
			} while (npc.getNext());
		}

		//say("NPC not found.");
		Town.move("portalspot");

		return false;
	};

	// Change act after completing last act quest
	this.changeAct = function (act) {
		var npc, preArea, target;

		preArea = me.area;

		switch (act) {
		case 2:
			if (me.area >= 40) {
				break;
			}

			Town.move(NPC.Warriv);

			npc = getUnit(1, 155);

			if (npc) {
				npc.openMenu();
				Misc.useMenu(0x0D36);
			}

			break;
		case 3:
			if (me.area >= 75) {
				break;
			}

			Town.move("palace");

			npc = getUnit(1, 201);

			if (npc) {
				npc.openMenu();
				me.cancel();
			}

			Town.move(NPC.Meshif);

			npc = getUnit(1, 210);

			if (npc) {
				npc.openMenu();
				Misc.useMenu(0x0D38);
			}

			break;
		case 4:
			if (me.area >= 103) {
				break;
			}

			if (me.inTown) {
				Town.move(NPC.Cain);

				npc = getUnit(1, 245);

				if (npc) {
					npc.openMenu();
					me.cancel();
				}

				Town.move("portalspot");
				Pather.usePortal(102, null);
			}

			delay(1500);

			target = getUnit(2, 342);

			if (target) {
				Pather.moveTo(target.x - 3, target.y - 1);
			}

			Pather.usePortal(null);

			break;
		case 5:
			if (me.area >= 109) {
				break;
			}

			Town.move(NPC.Tyrael);

			npc = getUnit(1, NPC.Tyrael);

			if (npc) {
				npc.openMenu();
				me.cancel();

				try {
					Pather.useUnit(2, 566, 109);
				} catch (a5e) {

				}
			}

			break;
		}

		delay(2000);

		while (!me.area) {
			delay(500);
		}

		if (me.area === preArea) {
			me.cancel();
			Town.move("portalspot");
			//say("Act change failed.");

			return false;
		}

		Town.move("portalspot");
		//say("Act change successful.");

		if (act === 2) {
			//say("Don't forget to talk to Drognan after getting the Viper Amulet!");
		}

		return true;
	};

	this.pickPotions = function (range) {
		if (me.dead) {
			return false;
		}

		Town.clearBelt();

		while (!me.idle) {
			delay(40);
		}

		var status,
			pickList = [],
			item = getUnit(4);

		if (item) {
			do {
				if ((item.mode === 3 || item.mode === 5) && item.itemType >= 76 && item.itemType <= 78 && getDistance(me, item) <= range) {
					pickList.push(copyUnit(item));
				}
			} while (item.getNext());
		}

		pickList.sort(Pickit.sortItems);

		while (pickList.length > 0) {
			item = pickList.shift();

			if (item && copyUnit(item).x) {
				status = Pickit.checkItem(item).result;

				if (status && Pickit.canPick(item)) {
					Pickit.pickItem(item, status);
				}
			}
		}

		return true;
	};

	// Override config values that use TP
	Config.TownCheck = false;
	Config.TownHP = 0;
	Config.TownMP = 0;
	charClass = classes[me.classid];

	for (var i = 0; i < 20; i += 1) {
		leader = this.getLeader(Config.Leader);

		if (leader) {
			break;
		}

		delay(1000);
	}

	if (!leader) {
		//say("Leader not found.");
		delay(1000);
		quit();
	} else {
		//say("Leader found.");
	}

	while (!Misc.inMyParty(Config.Leader)) {
		delay(500);
	}

	//say("Partied.");

	// Main Loop
	while (Misc.inMyParty(Config.Leader)) {
		if (me.mode === 17) {
			while (!me.inTown) {
				me.revive();
				delay(1000);
			}

			Town.move("portalspot");
			//say("I'm alive!");
		}

		var leaderAct = this.checkLeaderAct(leader);
		if (leaderAct !== me.act) {
			// go to leader act via wp, or try to talk to NPC to end act
			if (!Town.goToTown(leaderAct)) {
				this.changeAct(leaderAct);
			}
		}
		if (me.inTown) {
			if (leader.inTown) {
				Town.move("portalspot");
			}
			else {
				// use cows red portal if leader is in cow level and king dead or cain not saved or diablo not completed (classic) or baal not completed (expansion)
				var useCowRedPortal = leader.area == 39 &&
					(me.getQuest(4, 10) || !me.getQuest(4, 0) ||
					(me.gametype == 0 && !me.getQuest(26, 0)) ||
					(me.gametype == 1 && !me.getQuest(40, 0)));
				if (useCowRedPortal) {
					// go via red portal
					Town.goToTown(1);
					Town.move("stash");
					Pather.usePortal(39);
				}
				else {
					Town.move("portalspot");
					delay(1500);
					// wait 2 sec to see if leader did not make a tp to get in town
					if (!this.getLeader(Config.Leader).inTown) {
						Pather.usePortal(leader.area, leader.name);
					}
				}
			}
		}
		else {
			// I'm not in town
			if (leader.inTown) {
				// leader is in town
				// go to town by using leader's portal or by own means
				if (!Pather.usePortal(leader.area, leader.name)) {
					if (leaderAct !== me.act) {
						Town.goToTown(leaderAct);
					}
				}
				Town.doChores();
			}
			else {
				// leader is not in town
				if (!leaderUnit || !copyUnit(leaderUnit).x) {
					leaderUnit = this.getLeaderUnit(Config.Leader);

					if (leaderUnit) {
						//say("Leader unit found.");
					}
				}
			}

			if (!leaderUnit) {
				var player = getUnit(0);

				if (player) {
					do {
						if (player.name !== me.name) {
							var distance = getDistance(me.x, me.y, player.x, player.y);
							Pather.teleport = distance >= 30;
							Pather.moveToUnit(player, 0, 0, Config.Pet.Attack);
							Pather.teleport = true;

							break;
						}
					} while (player.getNext());
				}
			}

			if (leaderUnit) {
				var distance = getDistance(me.x, me.y, leaderUnit.x, leaderUnit.y);
				if (distance > 8) {
					Pather.teleport = distance >= 30;
					Pather.moveToUnit(leaderUnit, 0, 0, Config.Pet.Attack);
					Pather.teleport = true;
					this.pickPotions(20);
				}
			}

			if (Config.Pet.Attack) {
				Pather.teleport = true;
				Config.ClearType = 0;
				Attack.clear(20);
				this.pickPotions(20);
			}

			if (me.classid === 3 && Config.AttackSkill[2] > 0) {
				Skill.setSkill(Config.AttackSkill[2], 0);
			}

			if (leader.area !== me.area) {
				while (leader.area === 0) {
					delay(100);
				}

				var result = this.checkExit(leader, leader.area);

				switch (result) {
				case 1:
					//say("Taking exit.");
					delay(100);
					Pather.teleport = true;
					Pather.moveToExit(leader.area, true);

					break;
				case 2:
					//say("Taking portal.");

					break;
				case 3:
					//say("Taking waypoint.");
					delay(100);
					Pather.useWaypoint(leader.area, true);

					break;
				case 4:
					//say("Special transit.");

					break;
				}

				while (me.area === 0) {
					delay(100);
				}

				leaderUnit = this.getLeaderUnit(Config.Leader);
			}
		}

		delay(100);
	}
	
	return true;
}