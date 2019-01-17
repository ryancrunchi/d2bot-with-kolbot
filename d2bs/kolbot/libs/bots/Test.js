function Test() {
	print(ColorCodes.ORANGE + "TESTING");

	var c;

	function KeyDown(key) {
		if (key === 45) { // inser
			c = true;
		}
	}

	addEventListener("keydown", KeyDown);

	while (true) {
		if (c) {
			try {
				test();
			} catch (qq) {
				print('fail');
				print(qq + " " + qq.fileName + " " + qq.lineNumber);
			}

			c = false;
		}

		delay(100);
	}
}

function test() {
	print("test");
	var items = me.getItems();
	if (items) {
		for (var i=0; i<items.length; i++) {
			var item = items[i];
			/*if (item.bodylocation) {
				print("fname          "+item.fname.split("\n"));
				print("desc           "+Misc.getItemDesc(item));
				if (item.runeword) {
					print("runeword name          "+item.runeword);
					print("getStatEx              "+item.getStatEx(" + NTIPAliasStat[p_keyword] + "));
				}
				//print("getStat(-2)    "+item.getStat(-2));
				if (item.getFlag(0x4000000)) {
					print("    is runeword");
					//item.getColor();
				}
			}*/
			/*var bodyloc = JSON.stringify(Item.getBodyLoc(item));
			var tier = NTIP.GetTier(item);
			var mercTier = NTIP.GetMercTier(item);
			var keepWithoutTier = NTIP.ExistsWithoutTier(item);
			print(JSON.stringify({itemName: item.name, bodyLoc: bodyloc, tier: tier, mercTier: mercTier, existsWithoutTier: keepWithoutTier}));
			Pickit.checkItem(item);*/
		}
	}
	//Town.visitTown();
	print("done");
}
