/**
*	@filename	Prototypes.js
*	@author		kolton
*	@desc		various 'Unit' and 'me' prototypes
*/

// Shuffle Array
// http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
Array.prototype.shuffle = function () {
	var temp, index,
		counter = this.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter -= 1;

		// And swap the last element with it
		temp = this[counter];
		this[counter] = this[index];
		this[index] = temp;
	}

	return this;
};

// https://tc39.github.io/ecma262/#sec-array.prototype.findindex
if (!Array.prototype.findIndex) {
	Object.defineProperty(Array.prototype, 'findIndex', {
		value: function (predicate) {
			// 1. Let O be ? ToObject(this value).
			if (this == null) {
				throw new TypeError('"this" is null or not defined');
			}

			var o = Object(this);

			// 2. Let len be ? ToLength(? Get(O, "length")).
			var len = o.length >>> 0;

			// 3. If IsCallable(predicate) is false, throw a TypeError exception.
			if (typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}

			// 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
			var thisArg = arguments[1];

			// 5. Let k be 0.
			var k = 0;

			// 6. Repeat, while k < len
			while (k < len) {
				// a. Let Pk be ! ToString(k).
				// b. Let kValue be ? Get(O, Pk).
				// c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
				// d. If testResult is true, return k.
				var kValue = o[k];
				if (predicate.call(thisArg, kValue, k, o)) {
					return k;
				}
				// e. Increase k by 1.
				k++;
			}

			// 7. Return -1.
			return -1;
		},
		configurable: true,
		writable: true
	});
}

// Trim String
String.prototype.trim = function () {
	return this.replace(/^\s+|\s+$/g, "");
};

// Check if unit is idle
Unit.prototype.__defineGetter__("idle",
	function () {
		if (this.type > 0) {
			throw new Error("Unit.idle: Must be used with player units.");
		}

		return (this.mode === 1 || this.mode === 5 || this.mode === 17); // Dead is pretty idle too
	});

Unit.prototype.__defineGetter__("gold",
	function () {
		return this.getStat(14) + this.getStat(15);
	});

// Death check
Unit.prototype.__defineGetter__("dead",
	function () {
		switch (this.type) {
		case 0: // Player
			return this.mode === 0 || this.mode === 17;
		case 1: // Monster
			return this.mode === 0 || this.mode === 12;
		default:
			return false;
		}
	});

// Check if unit is in town
Unit.prototype.__defineGetter__("inTown",
	function () {
		if (this.type > 0) {
			throw new Error("Unit.inTown: Must be used with player units.");
		}

		return [1, 40, 75, 103, 109].indexOf(this.area) > -1;
	});

// Check if party unit is in town
Party.prototype.__defineGetter__("inTown",
	function () {
		return [1, 40, 75, 103, 109].indexOf(this.area) > -1;
	});

Unit.prototype.__defineGetter__("attacking",
	function () {
		if (this.type > 0) {
			throw new Error("Unit.attacking: Must be used with player units.");
		}

		return [7, 8, 10, 11, 12, 13, 14, 15, 16, 18].indexOf(this.mode) > -1;
	});

// Open NPC menu
Unit.prototype.openMenu = function (addDelay) {
	if (Config.PacketShopping) {
		return Packet.openMenu(this);
	}

	if (this.type !== 1) {
		throw new Error("Unit.openMenu: Must be used on NPCs.");
	}

	if (addDelay === undefined) {
		addDelay = 0;
	}

	if (getUIFlag(0x08)) {
		return true;
	}

	var i, tick;

	for (i = 0; i < 5; i += 1) {
		if (getDistance(me, this) > 4) {
			Pather.moveToUnit(this);
		}

		Misc.click(0, 0, this);
		tick = getTickCount();

		while (getTickCount() - tick < 5000) {
			if (getUIFlag(0x08)) {
				delay(Math.max(700 + me.ping, 500 + me.ping * 2 + addDelay * 500));

				return true;
			}

			if (getInteractedNPC() && getTickCount() - tick > 1000) {
				me.cancel();
			}

			delay(100);
		}

		sendPacket(1, 0x2f, 4, 1, 4, this.gid);
		delay((me.ping || 0.5) * 2);
		sendPacket(1, 0x30, 4, 1, 4, this.gid);
		delay((me.ping || 0.5) * 2);
		Packet.flash(me.gid);
	}

	return false;
};

// mode = "Gamble", "Repair" or "Shop"
Unit.prototype.startTrade = function (mode) {
	if (Config.PacketShopping) {
		return Packet.startTrade(this, mode);
	}

	if (this.type !== 1) {
		throw new Error("Unit.startTrade: Must be used on NPCs.");
	}

	if (getUIFlag(0x0C)) {
		return true;
	}

	var i, tick,
		menuId = mode === "Gamble" ? 0x0D46 : mode === "Repair" ? 0x0D06 : 0x0D44;

	for (i = 0; i < 3; i += 1) {
		if (this.openMenu(i)) { // Incremental delay on retries
			Misc.useMenu(menuId);

			tick = getTickCount();

			while (getTickCount() - tick < 1000) {
				if (getUIFlag(0x0C) && this.itemcount > 0) {
					delay(200);

					return true;
				}

				delay(25);
			}

			me.cancel();
		}
	}

	return false;
};

Unit.prototype.buy = function (shiftBuy, gamble) {
	if (Config.PacketShopping) {
		return Packet.buyItem(this, shiftBuy, gamble);
	}

	if (this.type !== 4) { // Check if it's an item we want to buy
		throw new Error("Unit.buy: Must be used on items.");
	}

	if (!getUIFlag(0xC) || (this.getParent() && this.getParent().gid !== getInteractedNPC().gid)) { // Check if it's an item belonging to a NPC
		throw new Error("Unit.buy: Must be used in shops.");
	}

	if (me.getStat(14) + me.getStat(15) < this.getItemCost(0)) { // Can we afford the item?
		return false;
	}

	var i = 0, result;

	do {
		result = this.shop(shiftBuy ? 6 : 2);
		delay(2*me.ping);
		i += 1;
	} while (i < 3 && !result);

	return result;
};

// Item owner name
Unit.prototype.__defineGetter__("parentName",
	function () {
		if (this.type !== 4) {
			throw new Error("Unit.parentName: Must be used with item units.");
		}

		var parent = this.getParent();

		if (parent) {
			return parent.name;
		}

		return false;
	});

// You MUST use a delay after Unit.sell() if using custom scripts. delay(500) works best, dynamic delay is used when identifying/selling (500 - item id time)
Unit.prototype.sell = function () {
	if (Config.PacketShopping) {
		return Packet.sellItem(this);
	}

	if (this.type !== 4) { // Check if it's an item we want to buy
		throw new Error("Unit.sell: Must be used on items.");
	}

	if (!getUIFlag(0xC)) { // Check if it's an item belonging to a NPC
		throw new Error("Unit.sell: Must be used in shops.");
	}

	var i, tick,
		itemCount = me.itemcount;

	for (i = 0; i < 5; i += 1) {
		this.shop(1);

		tick = getTickCount();

		while (getTickCount() - tick < 2000) {
			if (me.itemcount !== itemCount) {
				//delay(500);

				return true;
			}

			delay(10);
		}
	}

	return false;
};

Unit.prototype.toCursor = function () {
	if (this.type !== 4) {
		throw new Error("Unit.toCursor: Must be used with items.");
	}

	if (me.itemoncursor && this.mode === 4) {
		return true;
	}

	var i, tick;

	if (this.location === 7) {
		Town.openStash();
	}

	if (this.location === 6) {
		Cubing.openCube();
	}

	for (i = 0; i < 3; i += 1) {
		try {
			if (this.mode === 1) {
				clickItem(0, this.bodylocation); // fix for equipped items (cubing viper staff for example)
			} else {
				clickItem(0, this);
			}
		} catch (e) {
			return false;
		}

		tick = getTickCount();

		while (getTickCount() - tick < 1000) {
			if (me.itemoncursor) {
				delay(200);

				return true;
			}

			delay(10);
		}
	}

	return false;
};

Unit.prototype.drop = function () {
	if (this.type !== 4) {
		throw new Error("Unit.drop: Must be used with items.");
	}

	var i, tick, timeout;

	if (!this.toCursor()) {
		return false;
	}

	tick = getTickCount();
	timeout = Math.max(1000, me.ping * 6);

	while (getUIFlag(0x1a) || getUIFlag(0x19) || !me.gameReady) {
		if (getTickCount() - tick > timeout) {
			return false;
		}

		if (getUIFlag(0x1a) || getUIFlag(0x19)) {
			me.cancel(0);
		}

		delay(me.ping * 2 + 100);
	}

	for (i = 0; i < 3; i += 1) {
		clickMap(0, 0, me.x, me.y);
		delay(40);
		clickMap(2, 0, me.x, me.y);

		tick = getTickCount();

		while (getTickCount() - tick < 500) {
			if (!me.itemoncursor) {
				delay(200);

				return true;
			}

			delay(10);
		}
	}

	return false;
};

me.findItem = function (id, mode, loc, quality) {
	if (id === undefined) {
		id = -1;
	}

	if (mode === undefined) {
		mode = -1;
	}

	if (loc === undefined) {
		loc = -1;
	}

	if (quality === undefined) {
		quality = -1;
	}

	var item = me.getItem(id, mode);

	if (item) {
		do {
			if ((loc === -1 || item.location === loc) && (quality === -1 || item.quality === quality)) {
				return item;
			}
		} while (item.getNext());
	}

	return false;
};

me.findItems = function (id, mode, loc) {
	if (id === undefined) {
		id = -1;
	}

	if (mode === undefined) {
		mode = -1;
	}

	if (loc === undefined) {
		loc = false;
	}

	var list = [],
		item = me.getItem(id, mode);

	if (!item) {
		return false;
	}

	do {
		if (loc) {
			if (item.location === loc) {
				list.push(copyUnit(item));
			}
		} else {
			list.push(copyUnit(item));
		}
	} while (item.getNext());

	return list;
};

Unit.prototype.getPrefix = function (id) {
	var i;

	switch (typeof id) {
	case "number":
		if (typeof this.prefixnums !== "object") {
			return this.prefixnum === id;
		}

		for (i = 0; i < this.prefixnums.length; i += 1) {
			if (id === this.prefixnums[i]) {
				return true;
			}
		}

		break;
	case "string":
		if (typeof this.prefixes !== "object") {
			return this.prefix.replace(/\s+/g, "").toLowerCase() === id.replace(/\s+/g, "").toLowerCase();
		}

		for (i = 0; i < this.prefixes.length; i += 1) {
			if (id.replace(/\s+/g, "").toLowerCase() === this.prefixes[i].replace(/\s+/g, "").toLowerCase()) {
				return true;
			}
		}

		break;
	}

	return false;
};

Unit.prototype.getSuffix = function (id) {
	var i;

	switch (typeof id) {
	case "number":
		if (typeof this.suffixnums !== "object") {
			return this.suffixnum === id;
		}

		for (i = 0; i < this.suffixnums.length; i += 1) {
			if (id === this.suffixnums[i]) {
				return true;
			}
		}

		break;
	case "string":
		if (typeof this.suffixes !== "object") {
			return this.suffix.replace(/\s+/g, "").toLowerCase() === id.replace(/\s+/g, "").toLowerCase();
		}

		for (i = 0; i < this.suffixes.length; i += 1) {
			if (id.replace(/\s+/g, "").toLowerCase() === this.suffixes[i].replace(/\s+/g, "").toLowerCase()) {
				return true;
			}
		}

		break;
	}

	return false;
};

Unit.prototype.__defineGetter__("dexreq",
	function () {
		var finalReq,
			ethereal = this.getFlag(0x400000),
			reqModifier = this.getStat(91),
			baseReq = getBaseStat("items", this.classid, "reqdex");

		finalReq = baseReq + Math.floor(baseReq * reqModifier / 100);

		if (ethereal) {
			finalReq -= 10;
		}

		return Math.max(finalReq, 0);
	});

Unit.prototype.__defineGetter__("strreq",
	function () {
		var finalReq,
			ethereal = this.getFlag(0x400000),
			reqModifier = this.getStat(91),
			baseReq = getBaseStat("items", this.classid, "reqstr");

		finalReq = baseReq + Math.floor(baseReq * reqModifier / 100);

		if (ethereal) {
			finalReq -= 10;
		}

		return Math.max(finalReq, 0);
	});

Unit.prototype.__defineGetter__('itemclass',
	function () {
		if (getBaseStat(0, this.classid, 'code') === undefined) {
			return 0;
		}

		if (getBaseStat(0, this.classid, 'code') === getBaseStat(0, this.classid, 'ultracode')) {
			return 2;
		}

		if (getBaseStat(0, this.classid, 'code') === getBaseStat(0, this.classid, 'ubercode')) {
			return 1;
		}

		return 0;
	});

Unit.prototype.getStatEx = function (id, subid) {
	var i, temp, rval, regex;

	switch (id) {
	case 20: // toblock
		switch (this.classid) {
		case 328: // buckler
			return this.getStat(20);
		case 413: // preserved
		case 483: // mummified
		case 503: // minion
			return this.getStat(20) - 3;
		case 329: // small
		case 414: // zombie
		case 484: // fetish
		case 504: // hellspawn
			return this.getStat(20) - 5;
		case 331: // kite
		case 415: // unraveller
		case 485: // sexton
		case 505: // overseer
			return this.getStat(20) - 8;
		case 351: // spiked
		case 374: // deefender
		case 416: // gargoyle
		case 486: // cantor
		case 506: // succubus
		case 408: // targe
		case 478: // akaran t
			return this.getStat(20) - 10;
		case 330: // large
		case 375: // round
		case 417: // demon
		case 487: // hierophant
		case 507: // bloodlord
			return this.getStat(20) - 12;
		case 376: // scutum
			return this.getStat(20) - 14;
		case 409: // rondache
		case 479: // akaran r
			return this.getStat(20) - 15;
		case 333: // goth
		case 379: // ancient
			return this.getStat(20) - 16;
		case 397: // barbed
			return this.getStat(20) - 17;
		case 377: // dragon
			return this.getStat(20) - 18;
		case 502: // vortex
			return this.getStat(20) - 19;
		case 350: // bone
		case 396: // grim
		case 445: // luna
		case 467: // blade barr
		case 466: // troll
		case 410: // heraldic
		case 480: // protector
			return this.getStat(20) - 20;
		case 444: // heater
		case 447: // monarch
		case 411: // aerin
		case 481: // gilded
		case 501: // zakarum
			return this.getStat(20) - 22;
		case 332: // tower
		case 378: // pavise
		case 446: // hyperion
		case 448: // aegis
		case 449: // ward
			return this.getStat(20) - 24;
		case 412: // crown
		case 482: // royal
		case 500: // kurast
			return this.getStat(20) - 25;
		case 499: // sacred r
			return this.getStat(20) - 28;
		case 498: // sacred t
			return this.getStat(20) - 30;
		}

		break;
	case 21: // plusmindamage
	case 22: // plusmaxdamage
		if (subid === 1) {
			temp = this.getStat(-1);
			rval = 0;

			for (i = 0; i < temp.length; i += 1) {
				switch (temp[i][0]) {
				case id: // plus one handed dmg
				case id + 2: // plus two handed dmg
					// There are 2 occurrences of min/max if the item has +damage. Total damage is the sum of both.
					// First occurrence is +damage, second is base item damage.

					if (rval) { // First occurence stored, return if the second one exists
						return rval;
					}

					if (this.getStat(temp[i][0]) > 0 && this.getStat(temp[i][0]) > temp[i][2]) {
						rval = temp[i][2]; // Store the potential +dmg value
					}

					break;
				}
			}

			return 0;
		}

		break;
	case 31: // plusdefense
		if (subid === 0) {
			if ([0, 1].indexOf(this.mode) < 0) {
				break;
			}

			switch (this.itemType) {
			case 58: // jewel
			case 82: // charms
			case 83:
			case 84:
				// defense is the same as plusdefense for these items
				return this.getStat(31);
			}

			temp = this.description.split("\n");
			regex = new RegExp("\\+\\d+ " + getLocaleString(3481).replace(/^\s+|\s+$/g, ""));

			for (i = 0; i < temp.length; i += 1) {
				if (temp[i].match(regex, "i")) {
					return parseInt(temp[i].replace(/ÿc[0-9!"+<;.*]/, ""), 10);
				}
			}

			return 0;
		}

		break;
	case 57:
		if (subid === 1) {
			return Math.round(this.getStat(57) * this.getStat(59) / 256);
		}

		break;
	case 83: // itemaddclassskills
		if (subid === undefined) {
			for (i = 0; i < 7; i += 1) {
				if (this.getStat(83, i)) {
					return this.getStat(83, i);
				}
			}

			return 0;
		}

		break;
	case 188: // itemaddskilltab
		if (subid === undefined) {
			temp = [0, 1, 2, 8, 9, 10, 16, 17, 18, 24, 25, 26, 32, 33, 34, 40, 41, 42, 48, 49, 50];

			for (i = 0; i < temp.length; i += 1) {
				if (this.getStat(Stats.ITEM_ADDSKILL_TAB, temp[i])) {
					return this.getStat(Stats.ITEM_ADDSKILL_TAB, temp[i]);
				}
			}

			return 0;
		}

		break;
	case 195: // itemskillonattack
	case 198: // itemskillonhit
	case 204: // itemchargedskill
		if (subid === undefined) {
			temp = this.getStat(-2);

			if (temp.hasOwnProperty(id)) {
				if (temp[id] instanceof Array) {
					for (i = 0; i < temp[id].length; i += 1) {
						if (temp[id][i] !== undefined) {
							return temp[id][i].skill;
						}
					}
				} else {
					return temp[id].skill;
				}
			}

			return 0;
		}

		break;
	}

	if (this.getFlag(0x04000000)) { // Runeword
		switch (id) {
		case 16: // enhanceddefense
			if ([0, 1].indexOf(this.mode) < 0) {
				break;
			}

			temp = this.description.split("\n");

			for (i = 0; i < temp.length; i += 1) {
				if (temp[i].match(getLocaleString(3520).replace(/^\s+|\s+$/g, ""), "i")) {
					return parseInt(temp[i].replace(/ÿc[0-9!"+<;.*]/, ""), 10);
				}
			}

			return 0;
		case 18: // enhanceddamage
			if ([0, 1].indexOf(this.mode) < 0) {
				break;
			}

			temp = this.description.split("\n");

			for (i = 0; i < temp.length; i += 1) {
				if (temp[i].match(getLocaleString(10038).replace(/^\s+|\s+$/g, ""), "i")) {
					return parseInt(temp[i].replace(/ÿc[0-9!"+<;.*]/, ""), 10);
				}
			}

			return 0;
		}
	}

	if (subid === undefined) {
		return this.getStat(id);
	}

	return this.getStat(id, subid);
};

/*
	_NTIPAliasColor["black"] = 3;
	_NTIPAliasColor["lightblue"] = 4;
	_NTIPAliasColor["darkblue"] = 5;
	_NTIPAliasColor["crystalblue"] = 6;
	_NTIPAliasColor["lightred"] = 7;
	_NTIPAliasColor["darkred"] = 8;
	_NTIPAliasColor["crystalred"] = 9;
	_NTIPAliasColor["darkgreen"] = 11;
	_NTIPAliasColor["crystalgreen"] = 12;
	_NTIPAliasColor["lightyellow"] = 13;
	_NTIPAliasColor["darkyellow"] = 14;
	_NTIPAliasColor["lightgold"] = 15;
	_NTIPAliasColor["darkgold"] = 16;
	_NTIPAliasColor["lightpurple"] = 17;
	_NTIPAliasColor["orange"] = 19;
	_NTIPAliasColor["white"] = 20;
*/

Unit.prototype.getColor = function () {
	var i, colors,
		Color = {
			black: 3,
			lightblue: 4,
			darkblue: 5,
			crystalblue: 6,
			lightred: 7,
			darkred: 8,
			crystalred: 9,
			darkgreen: 11,
			crystalgreen: 12,
			lightyellow: 13,
			darkyellow: 14,
			lightgold: 15,
			darkgold: 16,
			lightpurple: 17,
			orange: 19,
			white: 20
		};

	// check type
	if ([2, 3, 15, 16, 19, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 42, 43, 44, 67, 68, 71, 72, 85, 86, 87, 88].indexOf(this.itemType) === -1) {
		return -1;
	}

	let isRuneword = this.getFlag(0x4000000);

	// check quality
	if ([4, 5, 6, 7].indexOf(this.quality) === -1 && !isRuneword) {
		return -1;
	}
	if (isRuneword) {
		return Color.darkgold;
	}

	let isRuneword = this.getFlag(0x4000000);
	if (isRuneword) {
		return Color.darkgold;
	}

	if (this.quality === 4 || this.quality === 6) {
		colors = {
			"Screaming": Color.orange,
			"Howling": Color.orange,
			"Wailing": Color.orange,
			"Sapphire": Color.lightblue,
			"Snowy": Color.lightblue,
			"Shivering": Color.lightblue,
			"Boreal": Color.lightblue,
			"Hibernal": Color.lightblue,
			"Ruby": Color.lightred,
			"Amber": Color.lightyellow,
			"Static": Color.lightyellow,
			"Glowing": Color.lightyellow,
			"Buzzing": Color.lightyellow,
			"Arcing": Color.lightyellow,
			"Shocking": Color.lightyellow,
			"Emerald": Color.crystalgreen,
			"Saintly": Color.darkgold,
			"Holy": Color.darkgold,
			"Godly": Color.darkgold,
			"Visionary": Color.white,
			"Mnemonic": Color.crystalblue,
			"Bowyer's": Color.lightgold,
			"Gymnastic": Color.lightgold,
			"Spearmaiden's": Color.lightgold,
			"Archer's": Color.lightgold,
			"Athlete's": Color.lightgold,
			"Lancer's": Color.lightgold,
			"Charged": Color.lightgold,
			"Blazing": Color.lightgold,
			"Freezing": Color.lightgold,
			"Glacial": Color.lightgold,
			"Powered": Color.lightgold,
			"Volcanic": Color.lightgold,
			"Blighting": Color.lightgold,
			"Noxious": Color.lightgold,
			"Mojo": Color.lightgold,
			"Cursing": Color.lightgold,
			"Venomous": Color.lightgold,
			"Golemlord's": Color.lightgold,
			"Warden's": Color.lightgold,
			"Hawk Branded": Color.lightgold,
			"Commander's": Color.lightgold,
			"Marshal's": Color.lightgold,
			"Rose Branded": Color.lightgold,
			"Guardian's": Color.lightgold,
			"Veteran's": Color.lightgold,
			"Resonant": Color.lightgold,
			"Raging": Color.lightgold,
			"Echoing": Color.lightgold,
			"Furious": Color.lightgold,
			"Master's": Color.lightgold, // there's 2x masters...
			"Caretaker's": Color.lightgold,
			"Terrene": Color.lightgold,
			"Feral": Color.lightgold,
			"Gaean": Color.lightgold,
			"Communal": Color.lightgold,
			"Keeper's": Color.lightgold,
			"Sensei's": Color.lightgold,
			"Trickster's": Color.lightgold,
			"Psychic": Color.lightgold,
			"Kenshi's": Color.lightgold,
			"Cunning": Color.lightgold,
			"Shadow": Color.lightgold,
			"Faithful": Color.white,
			"Priest's": Color.crystalgreen,
			"Dragon's": Color.crystalblue,
			"Vulpine": Color.crystalblue,
			"Shimmering": Color.lightpurple,
			"Rainbow": Color.lightpurple,
			"Scintillating": Color.lightpurple,
			"Prismatic": Color.lightpurple,
			"Chromatic": Color.lightpurple,
			"Hierophant's": Color.crystalgreen,
			"Berserker's": Color.crystalgreen,
			"Necromancer's": Color.crystalgreen,
			"Witch-hunter's": Color.crystalgreen,
			"Arch-Angel's": Color.crystalgreen,
			"Valkyrie's": Color.crystalgreen,
			"Massive": Color.darkgold,
			"Savage": Color.darkgold,
			"Merciless": Color.darkgold,
			"Ferocious": Color.black,
			"Grinding": Color.white,
			"Cruel": Color.black,
			"Gold": Color.lightgold,
			"Platinum": Color.lightgold,
			"Meteoric": Color.lightgold,
			"Strange": Color.lightgold,
			"Weird": Color.lightgold,
			"Knight's": Color.darkgold,
			"Lord's": Color.darkgold,
			"Fool's": Color.white,
			"King's": Color.darkgold,
			//"Master's": Color.darkgold,
			"Elysian": Color.darkgold,
			"Fiery": Color.darkred,
			"Smoldering": Color.darkred,
			"Smoking": Color.darkred,
			"Flaming": Color.darkred,
			"Condensing": Color.darkred,
			"Septic": Color.darkgreen,
			"Foul": Color.darkgreen,
			"Corrosive": Color.darkgreen,
			"Toxic": Color.darkgreen,
			"Pestilent": Color.darkgreen,
			"of Quickness": Color.darkyellow,
			"of the Glacier": Color.darkblue,
			"of Winter": Color.darkblue,
			"of Burning": Color.darkred,
			"of Incineration": Color.darkred,
			"of Thunder": Color.darkyellow,
			"of Storms": Color.darkyellow,
			"of Carnage": Color.black,
			"of Slaughter": Color.black,
			"of Butchery": Color.black,
			"of Evisceration": Color.black,
			"of Performance": Color.black,
			"of Transcendence": Color.black,
			"of Pestilence": Color.darkgreen,
			"of Anthrax": Color.darkgreen,
			"of the Locust": Color.crystalred,
			"of the Lamprey": Color.crystalred,
			"of the Wraith": Color.crystalred,
			"of the Vampire": Color.crystalred,
			"of Icebolt": Color.lightblue,
			"of Nova": Color.crystalblue,
			"of the Mammoth": Color.crystalred,
			"of Frost Shield": Color.lightblue,
			"of Nova Shield": Color.crystalblue,
			"of Wealth": Color.lightgold,
			"of Fortune": Color.lightgold,
			"of Luck": Color.lightgold,
			"of Perfection": Color.darkgold,
			"of Regrowth": Color.crystalred,
			"of Spikes": Color.orange,
			"of Razors": Color.orange,
			"of Swords": Color.orange,
			"of Stability": Color.darkyellow,
			"of the Colosuss": Color.crystalred,
			"of the Squid": Color.crystalred,
			"of the Whale": Color.crystalred,
			"of Defiance": Color.darkred,
			"of the Titan": Color.darkgold,
			"of Atlas": Color.darkgold,
			"of Wizardry": Color.darkgold
		};

		switch (this.itemType) {
		case 15: // boots
			colors["of Precision"] = Color.darkgold;

			break;
		case 16: // gloves
			colors["of Alacrity"] = Color.darkyellow;
			colors["of the Leech"] = Color.crystalred;
			colors["of the Bat"] = Color.crystalred;
			colors["of the Giant"] = Color.darkgold;

			break;
		}
	} else if (this.quality === 5) { // Set
		if (this.getFlag(0x10)) {
			for (i = 0; i < 127; i += 1) {
				if (this.fname.split("\n").reverse()[0].indexOf(getLocaleString(getBaseStat(16, i, 3))) > -1) {
					return getBaseStat(16, i, 12) > 20 ? -1 : getBaseStat(16, i, 12);
				}
			}
		} else {
			return Color.lightyellow; // Unidentified set item
		}
	} else if (this.quality === 7) { // Unique
		for (i = 0; i < 401; i += 1) {
			if (this.code === getBaseStat(17, i, 4).replace(/^\s+|\s+$/g, "") && this.fname.split("\n").reverse()[0].indexOf(getLocaleString(getBaseStat(17, i, 2))) > -1) {
				return getBaseStat(17, i, 13) > 20 ? -1 : getBaseStat(17, i, 13);
			}
		}
	}

	if (this.suffixes) {
		for (i = 0; i < this.suffixes.length; i += 1) {
			if (colors.hasOwnProperty(this.suffixes[i])) {
				return colors[this.suffixes[i]];
			}
		}
	}

	if (this.prefixes) {
		for (i = 0; i < this.prefixes.length; i += 1) {
			if (colors.hasOwnProperty(this.prefixes[i])) {
				return colors[this.prefixes[i]];
			}
		}
	}

	return -1;
};

Object.defineProperty(Unit.prototype, "skinCode", {
	get: function() {
		var code;
		if (this.getFlag(0x10)) {
			switch (this.quality) {
			case 5: // Set
				switch (this.classid) {
				case 27: // Angelic sabre
					code = "inv9sbu";

					break;
				case 74: // Arctic short war bow
					code = "invswbu";

					break;
				case 308: // Berserker's helm
					code = "invhlmu";

					break;
				case 330: // Civerb's large shield
					code = "invlrgu";

					break;
				case 31: // Cleglaw's long sword
				case 227: // Szabi's cryptic sword
					code = "invlsdu";

					break;
				case 329: // Cleglaw's small shield
					code = "invsmlu";

					break;
				case 328: // Hsaru's buckler
					code = "invbucu";

					break;
				case 306: // Infernal cap / Sander's cap
					code = "invcapu";

					break;
				case 30: // Isenhart's broad sword
					code = "invbsdu";

					break;
				case 309: // Isenhart's full helm
					code = "invfhlu";

					break;
				case 333: // Isenhart's gothic shield
					code = "invgtsu";

					break;
				case 326: // Milabrega's ancient armor
				case 442: // Immortal King's sacred armor
					code = "invaaru";

					break;
				case 331: // Milabrega's kite shield
					code = "invkitu";

					break;
				case 332: // Sigon's tower shield
					code = "invtowu";

					break;
				case 325: // Tancred's full plate mail
					code = "invfulu";

					break;
				case 3: // Tancred's military pick
					code = "invmpiu";

					break;
				case 113: // Aldur's jagged star
					code = "invmstu";

					break;
				case 234: // Bul-Kathos' colossus blade
					code = "invgsdu";

					break;
				case 372: // Grizwold's ornate plate
					code = "invxaru";

					break;
				case 366: // Heaven's cuirass
				case 215: // Heaven's reinforced mace
				case 449: // Heaven's ward
				case 426: // Heaven's spired helm
					code = "inv" + this.code + "s";

					break;
				case 357: // Hwanin's grand crown
					code = "invxrnu";

					break;
				case 195: // Nalya's scissors suwayyah
					code = "invskru";

					break;
				case 395: // Nalya's grim helm
				case 465: // Trang-Oul's bone visage
					code = "invbhmu";

					break;
				case 261: // Naj's elder staff
					code = "invcstu";

					break;
				case 375: // Orphan's round shield
					code = "invxmlu";

					break;
				case 12: // Sander's bone wand
					code = "invbwnu";

					break;
				}

				break;
			case 7: // Unique
				for (var i = 0; i < 401; i += 1) {
					if (this.fname.split("\n").reverse()[0].indexOf(getLocaleString(getBaseStat(17, i, 2))) > -1) {
						code = getBaseStat(17, i, "invfile");

						break;
					}
				}

				break;
			}
		}

		if (!code) {
			if (["ci2", "ci3"].indexOf(this.code) > -1) { // Tiara/Diadem
				code = this.code;
			} else {
				code = getBaseStat(0, this.classid, 'normcode') || this.code;
			}

			code = code.replace(" ", "");

			if ([10, 12, 58, 82, 83, 84].indexOf(this.itemType) > -1) { // ring/amu/jewel/sc/lc/gc
				code += (this.gfx + 1);
			}
		}
		
		return code;
	},
	enumerable: true
});

// Object.assign polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign !== 'function') {
	Object.defineProperty(Object, "assign", {
		value: function assign (target) {
			if (target === null) {
				throw new TypeError('Cannot convert undefined or null to object');
			}

			var to = Object(target);

			for (var index = 1; index < arguments.length; index++) {
				var nextSource = arguments[index];

				if (nextSource !== null) {
					for (var nextKey in nextSource) {
						if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
							to[nextKey] = nextSource[nextKey];
						}
					}
				}
			}

			return to;
		},
		writable: true,
		configurable: true
	});
}

// Array.find polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
if (!Array.prototype.find) {
	Object.defineProperty(Array.prototype, 'find', {
		value: function (predicate) {
			if (this === null) {
				throw new TypeError('"this" is null or not defined');
			}

			var o = Object(this);

			var len = o.length >>> 0;

			if (typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}

			var thisArg = arguments[1];

			var k = 0;

			while (k < len) {
				var kValue = o[k];

				if (predicate.call(thisArg, kValue, k, o)) {
					return kValue;
				}

				k++;
			}

			return undefined;
		},
		configurable: true,
		writable: true
	});
}

/**
 * @description Return the first element or undefined
 * @return undefined|*
 */
if (!Array.prototype.first) {
	Array.prototype.first = function () {
		return this.length > 0 ? this[0] : undefined;
	};
}

/**
 * @description Return the items of a player, or an empty array
 * @param args
 * @returns Unit[]
 */
Unit.prototype.getItems = function (...args) {
	let item = this.getItem.apply(this, args), items = [];

	if (item) {
		do {
			items.push(copyUnit(item));
		} while (item.getNext());
	}

	return items;
};

/**
 * @description Used upon item units like ArachnidMesh.castChargedSkill([skillId]) or directly on the "me" unit me.castChargedSkill(278);
 * @param {int} skillId = undefined
 * @param {int} x = undefined
 * @param {int} y = undefined
 * @return boolean
 * @throws Error
 */
Unit.prototype.castChargedSkill = function (...args) {
	let skillId, x, y, unit, chargedItem, charge,
		chargedItems = [],
		validCharge = function (itemCharge) {
			return itemCharge.skill === skillId && itemCharge.charges;
		};

	switch (args.length) {
	case 0: // item.castChargedSkill()
		break;
	case 1:
		if (args[0] instanceof Unit) { // hellfire.castChargedSkill(monster);
			unit = args[0];
		} else {
			skillId = args[0];
		}

		break;
	case 2:
		if (typeof args[0] === 'number') {
			if (args[1] instanceof Unit) { // me.castChargedSkill(skillId,unit)
				[skillId, unit] = [...args];
			} else if (typeof args[1] === 'number') { // item.castChargedSkill(x,y)
				[x, y] = [...args];
			}
		} else {
			throw new Error(' invalid arguments, expected (skillId, unit) or (x, y)');
		}

		break;
	case 3:
		// If all arguments are numbers
		if (typeof args[0] === 'number' && typeof args[1] === 'number' && typeof args[2] === 'number') {
			[skillId, x, y] = [...args];
		}

		break;
	default:
		throw new Error("invalid arguments, expected 'me' object or 'item' unit");
	}

	// Charged skills can only be casted on x, y coordinates
	unit && ([x, y] = [unit.x, unit.y]);

	if (this !== me && this.type === 4) {
		throw Error("invalid arguments, expected 'me' object or 'item' unit");
	}

	if (this === me) { // Called the function the unit, me.
		if (!skillId) {
			throw Error('Must supply skillId on me.castChargedSkill');
		}

		chargedItems = [];

		this.getItems(-1) // Item must be in inventory, or a charm in inventory
			.filter(item => item && (item.location === 1 || (item.location === 3 && item.itemType === 82)))
			.forEach(function (item) {
				let stats = item.getStat(-2);

				if (!stats.hasOwnProperty(204)) {
					stats = stats[204].filter(validCharge);
					stats.length && chargedItems.push({
						charge: stats.first(),
						item: item
					});
				}
			});

		if (chargedItems.length === 0) {
			throw Error("Don't have the charged skill (" + skillId + "), or not enough charges");
		}

		chargedItem = chargedItems.sort((a, b) => a.charge.level - b.charge.level).first().item;

		return chargedItem.castChargedSkill.apply(chargedItem, args);
	} else if (this.type === 4) {
		charge = this.getStat(-2)[204]; // WARNING. Somehow this gives duplicates

		if (!charge) {
			throw Error('No charged skill on this item');
		}

		if (skillId) {
			charge = charge.filter(item => (skillId && item.skill === skillId) && !!item.charges); // Filter out all other charged skills
		} else if (charge.length > 1) {
			throw new Error('multiple charges on this item without a given skillId');
		}

		charge = charge.first();

		if (charge) {
			// Setting skill on hand
			if (!Config.PacketCasting || Config.PacketCasting === 1 && skillId !== 54) {
				return Skill.cast(skillId, 0, x || me.x, y || me.y, this); // Non packet casting
			}

			// Packet casting
			sendPacket(1, 0x3c, 2, charge.skill, 1, 0x0, 1, 0x00, 4, this.gid);
			// No need for a delay, since its TCP, the server recv's the next statement always after the send cast skill packet

			// The result of "successfully" casted is different, so we cant wait for it here. We have to assume it worked
			sendPacket(1, 0x0C, 2, x || me.x, 2, y || me.y); // Cast the skill

			return true;
		}
	}

	return false;
};

/**
* @description Return the items of a player, or an empty array
* @param args
* @returns Unit[]
*/
Unit.prototype.getItemsEx = function (...args) {
   let item = this.getItem.apply(this, args), items = [];

   if (item) {
	   do {
		   items.push(copyUnit(item));
	   } while (item.getNext());
	   return items;
   }

   return [];
};

Unit.prototype.sellOrDrop = function (log = false) {
	if (getUIFlag(0xC) || (Config.PacketShopping && getInteractedNPC() && getInteractedNPC().itemcount > 0)) {
		log && Misc.itemLogger("Sold", this);
		this.sell();
	} else {
		log && Misc.itemLogger("Dropped", this);
		this.drop();
	}
};

Object.defineProperties(me, {
	sizeX: {
		value: 2,
		enumerable: true,
		writable: false,
		configurable: false
	},
	sizeY: {
		value: 2,
		enumerable: true,
		writable: false,
		configurable: false
	},
	highestAct: {
		get: function () {
			return [true, me.getQuest(7, 0), me.getQuest(15, 0), me.getQuest(23, 0), me.getQuest(28, 0)]
				.findIndex(i => !i);
		}
	},
	lowGold: {
		get: function () {
			var low = false;
			var total = 0;

			// TODO: take lower merchant prices stat into account, sdk.stats.Goldbonus
			const TPTomePrice = 450;
			const IDTomePrice = 280;
			const TPScrollPrice = 100;
			const IDScrollPrice = 80;

			var tomes = [
				{id: sdk.items.tptome, price: TPTomePrice, scrollPrice: TPScrollPrice, defaultQuantity: 4},
				{id: sdk.items.idtome, price: IDTomePrice, scrollPrice: IDScrollPrice, defaultQuantity: 2}
			];

			// you are low in gold if you don't have and can't buy tome or can't refill it
			for (var tome of tomes) {
				//TODO : maybe we have tome elsewhere, should we use it ? what if we are doing cow level with tp tome ?
				var have = me.findItem(tome.id, sdk.itemmode.inStorage, sdk.storage.Inventory);
				let missing = have ? 20-have.getStat(sdk.stats.Quantity) : tome.defaultQuantity;
				let price = missing*tome.scrollPrice + (have ? 0 : tome.price);
				total += price;
				if (me.gold < price) {
					low = true;
				}
			}


			
			// you are low in gold if you can't buy potions you need to fill belt and buffer
			let missingPotsInBelt = Town.checkColumns(Storage.BeltSize()).reduce((acc, c) => acc+c, 0);
			//TODO: get price of each pot type that should go in belt, for now easy calculation
			let price = missingPotsInBelt*450; // price of greater mana potion
			total += price;
			if (me.gold < price) {
				low = true;
			}


			// you are low in gold if you can't repair
			var repairCost = me.getRepairCost();
			total += repairCost;
			if (me.gold < repairCost) {
				low = true;
			}

			// you are low in gold if you can't revive merc
			var mercCost = me.mercrevivecost;
			total += mercCost;
			if (me.gold < mercCost) {
				low = true;
			}
			return low;
		}
	}
});

// Filter null or undefined objects in array
Array.prototype.filterNull = function () {
	return this.filter(x => x);
};

// Map the objects with the callback function and filter null values after mapping.
Array.prototype.compactMap = function (callback) {
	return this.map((x, i, array) => {
		if (x == null) {
			return null;
		}
		return callback(x, i, array);
	})
	.filterNull();
};

// Returns a random object in array
Array.prototype.random = function () {
	return this[Math.floor((Math.random() * this.length))];
};

Array.prototype.includes = function (e) {
	return this.indexOf(e) > -1;
};

Array.prototype.contains = Array.prototype.includes;

Array.prototype.intersection = function (other) {
	return this.filter(e => other.includes(e))
};

Array.prototype.difference = function (other) {
	return this.filter(e => !other.includes(e))
};

Array.prototype.symmetricDifference = function (other) {
	return this
		.filter(e => !other.includes(e))
		.concat(other.filter(e => !this.includes(e)))
};

Array.prototype.doForEach = function (callback) {
	this.forEach(callback);
	return this;
};

function getUnits(type, nameOrItemCodeOrClassId = null, mode = null, globalId = null) {
	let units = [], unit = getUnit(type, nameOrItemCodeOrClassId, mode, globalId);

	if (!unit) {
		return [];
	}
	do {
		units.push(copyUnit(unit));
	} while (unit.getNext());
	return units;
};

/**
 * {
"type":3,
"classid":90, // missile id, see missiles.txt
"mode":3,
"name":"Unknown",
"act":1,
"gid":256,
"x":4449,
"y":5730,
"targetx":4454,
"targety":5701,
"area":2,
"hp":0,
"hpmax":0,
"mp":0,
"mpmax":0,
"stamina":0,
"staminamax":0,
"charlvl":0,
"owner":1, // gid of owner unit
"ownertype":0,
"direction":41,
"uniqueid":-1}
 */
function getMissiles() {
	return getUnits(sdk.unittype.Missiles);
};

function getMyMissiles() {
	return getMissiles().filter(m => {
		let owner = m.ownerUnit;
		return owner && owner == me;
	});
};

function getMonsterMissiles() {
	return getMissiles().filter(m => m.ownertype == sdk.unittype.Monsters);
};

function getHostileMissiles() {
	return getMissiles().filter(m => {
		let owner = m.ownerUnit;
		return m.ownertype == sdk.unittype.Player && owner && owner.isHostile;
	});
};

Object.defineProperty(Unit.prototype, "ownerUnit", {
	get: function() {
		if (this.owner == undefined || this.ownertype == undefined) {
			return undefined;
		}
		return getUnit(this.ownertype, null, null, this.owner);
	},
	enumerable: true
});

Object.defineProperty(Unit.prototype, 'equals', {
	value: function (other) {
		if (other == undefined || other == null) {
			return false;
		}
		return other.constructor == this.constructor &&
			other.type == this.type &&
			other.classid == this.classid &&
			other.gid == this.gid;
	}
});

function Collision(u1, u2, frames) {
	this.u1 = u1;
	this.u2 = u2;
	this.frames = frames;
};

function Point(x, y) {
	this.x = x;
	this.y = y;

	this.closestPointOnLine = function (a, b) {
		var da = b.y - a.y;
		var db = a.x - b.x;
		var c1 = da * a.x + db * a.y;
		var c2 = -db * this.x + da * this.y;
		var det = da * da + db * db;
		var cx = 0;
		var cy = 0;

		if (det != 0) {
			cx = (da * c1 - db * c2) / det;
			cy = (da * c2 + db * c1) / det;
		} else {
			// I'm already on line
			cx = this.x;
			cy = this.y;
		}

		return new Point(cx, cy);
	};

	this.manhattanDistanceTo = function (other) {
		let x = Math.abs(other.x - this.x);
		let y =  Math.abs(other.y - this.y);
		return x+y;
	};

	this.distance2To = function (other) {
		let x = other.x - this.x;
		let y = other.y - this.y;
		return (x * x) + (y * y);
	};

	this.distanceTo = function (other) {
		return Math.sqrt(this.distance2To(other));
	};
};

Object.defineProperty(Unit.prototype, 'collisionWith', {
	value: function (other) {
		if (this.type != sdk.unittype.Missiles) {
			return null;
		}
		if (other.constructor != Unit) {
			return null;
		}
		// manhattan distance
		var dist = this.manhattanDistanceTo(other);

		var size = this.size;
		var otherSize = other.size;
		var sr = size + otherSize;

		if (dist < sr) {
			// units are already colliding
			return new Collision(this, other, 0);
		}

		// optimizing: unit with same velocity will never collide
		// TODO: velocity of missile
		/*if (this.velocityYPFx == other.velocityYPFx && this.velocityYPFy == other.velocityYPFy) {
			return null;
		}*/

		// We change the reference coordinates for "other" unit to be at origin (0,0)
		// That way, "other" is not moving
		var x = this.x - other.x;
		var y = this.y - other.y;
		var myp = new Point(x, y);
		// TODO: velocities
		var velocityX = (this.targetx - this.x) * this.velocityUnitPerFrame;
		var velocityY = (this.targety - this.y) * this.velocityUnitPerFrame;

		var otherVelocityX = (other.targetx - other.x) * other.velocityUnitPerFrame;
		var otherVelocityY = (other.targety - other.y) * other.velocityUnitPerFrame;
		
		var vx = velocityX - otherVelocityX;
		var vy = velocityY - otherVelocityY;
		var up = new Point(0, 0)

		// Searching the closest point to "other" (0,0) on the line given by our velocity vector
		var p = up.closestPointOnLine(myp, new Point(x + vx, y + vy));

		// squared distance between "other" and the closest point on line
		var pdist = up.distance2To(p);

		// squared distance between "this" and the closed point on line
		var mypdist = myp.distance2To(p);

		// If distance between "other" and this line is lower than radii sum, there may be a collision
		if (pdist < sr) {
			// our speed on the line
			var length = Math.sqrt(vx * vx + vy * vy);

			// we move the point on the line to find the impact point
			var backdist = Math.sqrt(sr - pdist);
			p.x = p.x - backdist * (vx / length);
			p.y = p.y - backdist * (vy / length);

			// If the point is further than previously, our speed is not in the right direction
			if (myp.distance2To(p) > mypdist) {
				return null;
			}

			pdist = p.distanceTo(myp);

			// impact point is further than what we can move in a frame time
			if (pdist > length) {
				return null;
			}

			// Needed frames to reach impact point
			var t = pdist / length;

			return new Collision(this, other, t);
		}

		return null;
	}
});

Object.defineProperty(Unit.prototype, 'isHostile', {
	get: function () {
		if (this.gid == undefined || this.gid == null) return false;
		return getPlayerFlag(me.gid, this.gid, sdk.partyFlags.Hostile);
	},
	enumerable: true
});

Object.defineProperty(Unit.prototype, 'distance2To', {
	value: function (other) {
		if (other.constructor != Unit) {
			return Infinity;
		}
		let x = other.x - this.x;
		let y = other.y - this.y;
		return (x * x) + (y * y);
	}
});

Object.defineProperty(Unit.prototype, 'distanceTo', {
	value: function (other) {
		return Math.sqrt(this.distance2To(other));
	}
});

Object.defineProperty(Unit.prototype, 'manhattanDistanceTo', {
	value: function (other) {
		let x = Math.abs(other.x - this.x);
		let y =  Math.abs(other.y - this.y);
		return x+y;
	}
});

Object.defineProperty(Unit.prototype, 'sizeX', {
	get: function () {
		if (this.type == sdk.unittype.Monsters) {
			let baseId = getBaseStat("monstats", this.classid, "baseid");
			return getBaseStat("monstats2", baseId, "SizeX");
		}
		return this.sizex;
	},
	enumerable: true,
	configurable: false
});

Object.defineProperty(Unit.prototype, 'sizeY', {
	get: function () {
		if (this.type == sdk.unittype.Monsters) {
			let baseId = getBaseStat("monstats", this.classid, "baseid");
			return getBaseStat("monstats2", baseId, "SizeY");
		}
		return this.sizey;
	},
	enumerable: true,
	configurable: false
});

Object.defineProperty(Unit.prototype, 'size', {
	get: function () {
		if (this.type == sdk.unittype.Missiles) {
			return getBaseStat("missiles", this.classid, "Size");
		}
		return this.sizeX;
	},
	enumerable: true,
	configurable: false
});

Object.defineProperty(Unit.prototype, 'velocity', { // units/sec
	get: function () {
		if (this.type == sdk.unittype.Missiles) {
			return getBaseStat("missiles", this.classid, "Vel");
		}
		if (this.type == sdk.unittype.Monsters) {
			return getBaseStat("monstats", this.classid, (this.running ? "Run" : "Velocity"));
		}
		if (this.type == sdk.unittype.Player) {
			return this.running ? 9 : 6; //TODO: frw
		}
		return undefined;
	},
	enumerable: true,
	configurable: false
});

Object.defineProperty(Unit.prototype, 'velocityUnitPerFrame', {
	get: function () {
		if (this.velocity != undefined) {
			return this.velocity * 0.04; // units/s to unit/frame
		}
		return undefined;
	},
	enumerable: true,
	configurable: false
});

Object.defineProperty(Unit.prototype, 'running', {
	get: function () {
		const runningTypes = [sdk.unittype.Player, sdk.unittype.Monsters, sdk.unittype.Missiles];
		return runningTypes.indexOf(this.type) > -1 ? this.mode == sdk.unitmode.Running : false;
	},
	enumerable: true,
	configurable: false
});

Object.defineProperty(Unit.prototype, 'attackable', {
	get: function () {
		if (this.type === 0 && this.mode !== 17 && this.mode !== 0) { //ToDo: build in here a check if player is hostiled
			return true;
		}
		if (this.hp === 0 || this.mode === 0 || this.mode === 12) { // Dead monster
			return false;
		}
		if (this.getStat(172) === 2) {	// Friendly monster/NPC
			return false;
		}
		if (this.charlvl < 1) { // catapults were returning a level of 0 and hanging up clear scripts
			return false;
		}
		if (getBaseStat("monstats", this.classid, "neverCount")) { // neverCount base stat - hydras, traps etc.
			return false;
		}
		// Monsters that are in flight
		if ([110, 111, 112, 113, 144, 608].indexOf(this.classid) > -1 && this.mode === 8) {
			return false;
		}
		// Monsters that are Burrowed/Submerged
		if ([68, 69, 70, 71, 72, 258, 258, 259, 260, 261, 262, 263].indexOf(this.classid) > -1 && this.mode === 14) {
			return false;
		}
		return [sdk.monsters.ThroneBaal].indexOf(this.classid) <= -1;
	},
	enumerable: true,
	configurable: false
});