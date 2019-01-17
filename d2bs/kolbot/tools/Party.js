/**
*	@filename	Party.js
*	@author		kolton
*	@desc		handle party procedure ingame
*/

include("OOG.js");
include("json2.js");
include("common/Config.js");
include("common/Cubing.js");
include("common/Runewords.js");
include("common/Misc.js");
include("common/Prototypes.js");
include("common/Town.js");
include("common/Enums.js");

function main() {
	Config.init();

	var i, otherParty, shitList, currScript, scriptList,
		classes = ["Amazon", "Sorceress", "Necromancer", "Paladin", "Barbarian", "Druid", "Assassin"],
		playerLevels = {},
		partyTick = getTickCount();

	let partyModeLoot = 0;
	let partyModeHostile = 1;
	let partyModeInviteAcceptCancel = 2;
	let partyModeLeaveParty = 3;
	let partyIdNotInParty = 65535;

	addEventListener("gameevent",
		function (mode, param1, param2, name1, name2) {
			var player;

			switch (mode) {
			case 0x02: // "%Name1(%Name2) joined our world. Diablo's minions grow stronger."
				if (Config.Greetings.length > 0) {
					try {
						player = getParty(name1);
					} catch (e1) {

					}

					if (player && player.name !== me.name) {
						say(Config.Greetings[rand(0, Config.Greetings.length - 1)].replace("$name", player.name).replace("$level", player.level).replace("$class", classes[player.classid]));
					}
				}

				break;
			case 0x06: // "%Name1 was Slain by %Name2"
				if (Config.DeathMessages.length > 0) {
					try {
						player = getParty(name1);
					} catch (e2) {

					}

					if (player && player.name !== me.name) {
						say(Config.DeathMessages[rand(0, Config.DeathMessages.length - 1)].replace("$name", player.name).replace("$level", player.level).replace("$class", classes[player.classid]).replace("$killer", name2));
					}
				}

				break;
			}
		});
	addEventListener("scriptmsg",
		function (msg) {
			var obj;

			try {
				obj = JSON.parse(msg);

				if (obj && obj.hasOwnProperty("currScript")) {
					currScript = obj.currScript;
				}
			} catch (e3) {

			}
		});

	addEventListener("keyup", function(key) {
		switch (key) {
			case 111: // "/"
				//if (!Config.PublicMode) {
				Config.PublicMode = (Config.PublicMode+1) %4;
				var text;
				switch (Config.PublicMode) {
					case 0:
						text = "disabled";
					break;

					case 1:
						text = "invite and accept";
					break;

					case 2:
						text = "accept only";
					break;

					case 3:
						text = "invite only";
					break;
				}
				print("Config.PublicMode = "+Config.PublicMode+" ("+text+")");
				/*}
				else {
					Config.PublicMode = 0;
				}*/
			break;
		}
	});

	let mode = Config.PublicMode
	print(ColorCodes.NEON_GREEN + "Party thread loaded. Mode: " + (Config.PublicMode === 2 ? "Accept" : "Invite"));

	if (Config.ShitList || Config.UnpartyShitlisted) {
		shitList = ShitList.read();

		print(shitList.length + " entries in shit list.");
	}

	if (Config.PartyAfterScript) {
		scriptList = [];

		for (i in Scripts) {
			if (Scripts.hasOwnProperty(i) && !!Scripts[i]) {
				scriptList.push(i);
			}
		}
	}
	
	var numberOfPlayersInParty = function(partyId) {
		return playersInParty(partyId).length;
	};
	
	// not counting myself
	var playersInParty = function(partyId) {
		if (partyId == partyIdNotInParty) {
			return [];
		}
		var player = getParty();
		var players = [];

		if (player) {
			while (player.getNext()) {
				if (player.partyid == partyId) {
					players.push(player);
				}
			}
		}
		return players;
	};

	var allParties = function() {
		var player = getParty();
		var parties = [];

		if (player) {
			if (player.partyid != partyIdNotInParty && parties.indexOf(player.partyid) == -1) {
				parties.push(player.partyid);
			}
			while (player.getNext()) {
				if (player.partyid != partyIdNotInParty && parties.indexOf(player.partyid) == -1) {
					parties.push(player.partyid);
				}
			}
		}
		return parties;
	};

	var playerWithName = function(name) {
		var player = getParty();
		do {
			if (player.name == name) {
				return player;
			}
		} while (player.getNext());
		return null;
	};

	// Main loop
	while (true) {
		if (me.gameReady && Config.PublicMode != 0 && (!Config.PartyAfterScript || scriptList.indexOf(currScript) > scriptList.indexOf(Config.PartyAfterScript))) {
			
			var player = getParty();
			var myPartyId = partyIdNotInParty;
			var meInParty = false;
			var canInvite = [1, 3].indexOf(Config.PublicMode) > -1;
			var canAccept = [1, 2].indexOf(Config.PublicMode) > -1;

			if (player) {
				myPartyId = player.partyid;
				meInParty = myPartyId != partyIdNotInParty;
			}

			let parties = allParties();
			var maxPartyMembers = 0;
			var bestPartyId = partyIdNotInParty;
			for (var p = 0; p < parties.length; p++) {
				let partyId = parties[p];
				let countInParty = numberOfPlayersInParty(partyId);
				if (countInParty > maxPartyMembers) {
					bestPartyId = partyId;
					maxPartyMembers = countInParty;
				}
			}

			if (bestPartyId != partyIdNotInParty) {
				if (meInParty && myPartyId != bestPartyId) {
					// I'm not in the best party, leave my party ?
					print("I'm not in the best party, should I leave my party ?");
				}
				else if (!meInParty) {
					//print("I'm not in a party, wait an invitation from best party");
					player = getParty();
					while (player.getNext()) {
						let playerPartyId = player.partyid;
						if (playerPartyId == bestPartyId) {
							let playerIsInParty = playerPartyId != partyIdNotInParty;
							let playerIsInMyParty = playerPartyId == myPartyId;
							let playerPartyFlag = player.partyflag;
							let canInvitePlayer = player.partyflag == 0;
							let playerHasInvitedMe = player.partyflag == 2;
							let canCancelInvitation = player.partyflag == 4;
							let playerIsHostile = getPlayerFlag(me.gid, player.gid, 8);
							if (playerIsHostile) {
								print("Player is hostile");
								if (Config.ShitList && shitList.indexOf(player.name) === -1) {
									print(player.name + " has been shitlisted.");
									shitList.push(player.name);
									ShitList.add(player.name);
								}
								else {

								}
							}
							if (playerHasInvitedMe && canAccept) {
								//print("Player has invited me, I accept");
								clickParty(player, partyModeInviteAcceptCancel);
								break;
							}
							else if (canAccept) {
								//delay(1000);
								// print("Player has not invited me, waiting...");
								delay(me.ping);
							}
							else {
								// print("Cannot accept invitations");
							}
						}
					}
				}
				else {
					// already in best party
					// print("Already in best party");
					if (canInvite) {
						// print("Let's invite others");
						player = getParty();
						while (player.getNext()) {
							let playerPartyId = player.partyid;
							let playerIsInParty = playerPartyId != partyIdNotInParty;
							let playerIsInMyParty = playerPartyId == myPartyId;
							let playerPartyFlag = player.partyflag;
							let canInvitePlayer = playerPartyFlag == 0;
							let playerHasInvitedMe = playerPartyFlag == 2;
							let canCancelInvitation = playerPartyFlag == 4;
							let playerIsHostile = getPlayerFlag(me.gid, player.gid, 8);
							
							if (playerIsHostile) {
								print("Player is hostile");
								if (Config.ShitList && shitList.indexOf(player.name) === -1) {
									print(player.name + " has been shitlisted.");
									shitList.push(player.name);
									ShitList.add(player.name);
								}
								else {

								}
							}
							if (canInvitePlayer) {
								// print("Inviting player in my party");
								clickParty(player, partyModeInviteAcceptCancel);
							}
							else if (playerIsInMyParty) {
								// print("Player is already in my party");
							}
							else if (playerIsInParty) {
								// print("Player is in another party, can't invite");
							}
							else if (canCancelInvitation) {
								// do not cancel, this is the best party invitation
								// print("Player already invited");
							}
							else {

							}
						}
					}
					else {
						// print("Cannot invite others");
					}
				}
			}
			else {
				// print("There are no parties");
				if (canInvite || canAccept) {
					// print("Let's try to make one by inviting or accepting");
					player = getParty();
					while (player.getNext()) {
						let playerPartyId = player.partyid;
						let playerIsInParty = playerPartyId != partyIdNotInParty;
						let playerIsInMyParty = playerPartyId == myPartyId;
						let playerPartyFlag = player.partyflag;
						let canInvitePlayer = playerPartyFlag == 0;
						let playerHasInvitedMe = playerPartyFlag == 2;
						let canCancelInvitation = playerPartyFlag == 4;
						let playerIsHostile = getPlayerFlag(me.gid, player.gid, 8);
						
						if (playerIsHostile) {
							print("Player is hostile");
							if (Config.ShitList && shitList.indexOf(player.name) === -1) {
								print(player.name + " has been shitlisted.");
								shitList.push(player.name);
								ShitList.add(player.name);
							}
							else {

							}
						}
						if ((canInvite && canInvitePlayer) || (canAccept && playerHasInvitedMe)) {
							clickParty(player, partyModeInviteAcceptCancel);
						}
						else if (canCancelInvitation) {
							// do not cancel, there are no parties
						}
					}
				}
				else {
					// print("Cannot invite or accept, leave me alone");
				}
			}

			if (Config.Congratulations.length > 0) {
				player = getParty();

				if (player) {
					do {
						if (player.name !== me.name) {
							if (!playerLevels[player.name]) {
								playerLevels[player.name] = player.level;
							}

							if (player.level > playerLevels[player.name]) {
								say(Config.Congratulations[rand(0, Config.Congratulations.length - 1)].replace("$name", player.name).replace("$level", player.level).replace("$class", classes[player.classid]));

								playerLevels[player.name] = player.level;
							}
						}
					} while (player.getNext());
				}
			}
		}

		delay(500);
	}

	print(ColorCodes.RED + "Party thread done.");
}