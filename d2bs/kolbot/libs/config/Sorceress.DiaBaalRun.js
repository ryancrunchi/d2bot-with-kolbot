// Sorceress config file

/* Brief instructions:
 * Notepad++ is HIGHLY recommended to use for editing these files. Visit http://notepad-plus-plus.org/
 * To comment out something, put // in front of that line
 * !!!Never comment out something you're not sure about, set it to false or disable as noted in description if you don't want to use it.
 * true and false are case sensitive. Good: Config.SomeVar = true; Bad: Config.SomeVar = True;
 */

function LoadConfig() {

	Scripts.Diablo = me.diff == 2;
		Config.Diablo.WalkClear = false; // Disable teleport while clearing to protect leechers
		Config.Diablo.Entrance = false; // Start from entrance
		Config.Diablo.SealWarning = "";
		Config.Diablo.EntranceTP = "";
		Config.Diablo.StarTP = "";
		Config.Diablo.DiabloMsg = "";

	
	Scripts.Baal = true;
		Config.Baal.HotTPMessage = "";
		Config.Baal.SafeTPMessage = "";
		Config.Baal.BaalMessage = "";
		Config.Baal.SoulQuit = false; // End script if Souls (Undead Soul Killers) are found.
		Config.Baal.DollQuit = false; // End script if Dolls (Undead Stigyan Dolls) are found.
		Config.Baal.KillBaal = true; // Kill Baal. Leaves game after wave 5 if false.

	// Town settings
	Config.HealHP = 90; // Go to a healer if under designated percent of life.
	Config.HealMP = 50; // Go to a healer if under designated percent of mana.
	Config.HealStatus = true; // Go to a healer if poisoned or cursed
	Config.UseMerc = true; // Use merc. This is ignored and always false in d2classic.
	Config.MercWatch = false; // Instant merc revive during battle.

	// Potion settings
	Config.UseHP = 70; // Drink a healing potion if life is under designated percent.
	Config.UseRejuvHP = 45;  // Drink a rejuvenation potion if life is under designated percent.
	Config.UseMP = 20; // Drink a mana potion if mana is under designated percent.
	Config.UseRejuvMP = -1; // Drink a rejuvenation potion if mana is under designated percent.
	Config.UseMercHP = 60; // Give a healing potion to your merc if his/her life is under designated percent.
	Config.UseMercRejuv = 20; // Give a rejuvenation potion to your merc if his/her life is under designated percent.
	Config.HPBuffer = 0; // Number of healing potions to keep in inventory.
	Config.MPBuffer = 0; // Number of mana potions to keep in inventory.
	Config.RejuvBuffer = 0; // Number of rejuvenation potions to keep in inventory.

	// Chicken settings
	Config.LifeChicken = 30; // Exit game if life is less or equal to designated percent.
	Config.ManaChicken = -1; // Exit game if mana is less or equal to designated percent.
	Config.MercChicken = -1; // Exit game if merc's life is less or equal to designated percent.
	Config.TownHP = 15; // Go to town if life is under designated percent.
	Config.TownMP = 0; // Go to town if mana is under designated percent.

	/* Inventory lock configuration. !!!READ CAREFULLY!!!
	 * 0 = item is locked and won't be moved. If item occupies more than one slot, ALL of those slots must be set to 0 to lock it in place.
	 * Put 0s where your torch, annihilus and everything else you want to KEEP is.
	 * 1 = item is unlocked and will be dropped, stashed or sold.
	 * If you don't change the default values, the bot won't stash items.
	 */
	Config.Inventory[0] = [1,1,1,1,1,1,1,1,1,0];
	Config.Inventory[1] = [1,1,1,1,1,1,1,1,1,0];
	Config.Inventory[2] = [1,1,1,1,1,1,1,1,1,0];
	Config.Inventory[3] = [1,1,1,1,1,1,1,1,1,0];

	Config.StashGold = 100000; // Minimum amount of gold to stash.

	/* Potion types for belt columns from left to right.
	 * Rejuvenation potions must always be rightmost.
	 * Supported potions - Healing ("hp"), Mana ("mp") and Rejuvenation ("rv")
	 */
	Config.BeltColumn[0] = "hp";
	Config.BeltColumn[1] = "mp";
	Config.BeltColumn[2] = "mp";
	Config.BeltColumn[3] = "rv";

	/* Minimum amount of potions. If we have less, go to vendor to purchase more.
	 * Set rejuvenation columns to 0, because they can't be bought.
	 */
	Config.MinColumn[0] = 2;
	Config.MinColumn[1] = 2;
	Config.MinColumn[2] = 2;
	Config.MinColumn[3] = 0;

	// Pickit config. Default folder is kolbot/pickit.
	// Config.PickitFiles.push("kolton.nip");
	// Config.PickitFiles.push("LLD.nip");

	Config.PickitFiles.push("ladder_reset/normal.nip");
	Config.PickitFiles.push("ladder_reset/magic_rare.nip");
	Config.PickitFiles.push("ladder_reset/set.nip");
	Config.PickitFiles.push("ladder_reset/unique.nip");
	Config.PickitFiles.push("ladder_reset/craft.nip");
	Config.PickitFiles.push("ladder_reset/runewords.nip");

	Config.PickitFiles.push("temp_need.nip");

	// Config.PickitFiles.push("advance/normal.nip");
	// Config.PickitFiles.push("advance/magic_rare.nip");
	// Config.PickitFiles.push("advance/set.nip");
	// Config.PickitFiles.push("advance/unique.nip");
	// Config.PickitFiles.push("advance/craft.nip");
	// Config.PickitFiles.push("advance/runewords.nip");
	// Config.PickitFiles.push("advance/spirit_packs.nip");

	Config.PickRange = 40; // Pick radius
	Config.FastPick = true; // Check and pick items between attacks

	// Additional item info log settings. All info goes to \logs\ItemLog.txt
	Config.ItemInfo = true; // Log kept items.
	Config.ItemInfoQuality = [1, 2, 3, 4, 5, 6, 7, 8]; // The quality of kept items to log. See NTItemAlias.dbl for values. Example: Config.ItemInfoQuality = [6, 7, 8];

	// Log item sold
	Config.SoldItemInfo = true;
	Config.SoldItemInfoQuality = [7, 8]; // The quality of sold items to log

	// Item identification settings
	Config.CainID.Enable = false; // Identify items at Cain
	Config.CainID.MinGold = 0; // Minimum gold (stash + character) to have in order to use Cain.
	Config.CainID.MinUnids = 1; // Minimum number of unid items in order to use Cain.
	Config.FieldID = false; // Identify items in the field instead of going to town.
	Config.DroppedItemsAnnounce.Enable = false;	// Announce Dropped Items to in-game newbs
	Config.DroppedItemsAnnounce.Quality = []; // Quality of item to announce. See NTItemAlias.dbl for values. Example: Config.DroppedItemsAnnounce.Quality = [6, 7, 8];

	// Manager Item Log Screen
	Config.LogKeys = true;
	Config.LogOrgans = true;
	Config.LogLowRunes = true; // show/hide low runes (El - Dol) on the item log screen
	Config.LogMiddleRunes = true; // show/hide middle runes (Hel - Mal) on the item log screen
	Config.LogHighRunes = true; // show/hide high runes (Ist - Zod) on the item log screen
	Config.LogLowGems = false; // show/hide low gems (chipped, flawed, normal) on the item log screen
	Config.LogHighGems = false; // show/hide high gems (flawless, perfect) on the item log screen
	Config.ShowCubingInfo = true; // show/hide the cubing messages on console and item log screen
	// Repair settings
	Config.CubeRepair = false; // Repair weapons with Ort and armor with Ral rune. Don't use it if you don't understand the risk of losing items.
	Config.RepairPercent = 20; // Durability percent of any equipped item that will trigger repairs.

	// Gambling config
	Config.Gamble = false;
	Config.GambleGoldStart = 2500000;
	Config.GambleGoldStop = 500000;

	// List of item names or classids for gambling. Check libs/NTItemAlias.dbl file for other item classids.
	Config.GambleItems.push("Amulet");
	Config.GambleItems.push("Ring");
	Config.GambleItems.push("Circlet");
	Config.GambleItems.push("Coronet");

	/* Cubing config. All recipe names are available in Templates/Cubing.txt. For item names/classids check NTItemAlias.dbl
	 * The format is Config.Recipes.push([recipe_name, item_name_or_classid, etherealness]). Etherealness is optional and only applies to some recipes.
	 */
	Config.Cubing = true; // Set to true to enable cubing.

	// Ingredients for the following recipes will be auto-picked, for classids check libs/NTItemAlias.dbl

	// Config.Recipes.push([Recipe.Gem, "Chipped Amethyst"]);
	// Config.Recipes.push([Recipe.Gem, "Flawed Amethyst"]);
	// Config.Recipes.push([Recipe.Gem, "Amethyst"]);
	// Config.Recipes.push([Recipe.Gem, "Flawless Amethyst"]);

	// Config.Recipes.push([Recipe.Gem, "Chipped Topaz"]);
	// Config.Recipes.push([Recipe.Gem, "Flawed Topaz"]);
	// Config.Recipes.push([Recipe.Gem, "Topaz"]);
	// Config.Recipes.push([Recipe.Gem, "Flawless Topaz"]);

	// Config.Recipes.push([Recipe.Gem, "Chipped Sapphire"]);
	// Config.Recipes.push([Recipe.Gem, "Flawed Sapphire"]);
	// Config.Recipes.push([Recipe.Gem, "Sapphire"]);
	// Config.Recipes.push([Recipe.Gem, "Flawless Sapphire"]);

	// Config.Recipes.push([Recipe.Gem, "Chipped Emerald"]);
	// Config.Recipes.push([Recipe.Gem, "Flawed Emerald"]);
	// Config.Recipes.push([Recipe.Gem, "Emerald"]);
	// Config.Recipes.push([Recipe.Gem, "Flawless Emerald"]);

	// Config.Recipes.push([Recipe.Gem, "Chipped Ruby"]);
	// Config.Recipes.push([Recipe.Gem, "Flawed Ruby"]);
	// Config.Recipes.push([Recipe.Gem, "Ruby"]);
	// Config.Recipes.push([Recipe.Gem, "Flawless Ruby"]);

	// Config.Recipes.push([Recipe.Gem, "Chipped Diamond"]);
	// Config.Recipes.push([Recipe.Gem, "Flawed Diamond"]);
	// Config.Recipes.push([Recipe.Gem, "Diamond"]);
	// Config.Recipes.push([Recipe.Gem, "Flawless Diamond"]);

	// Config.Recipes.push([Recipe.Gem, "Chipped Skull"]);
	// Config.Recipes.push([Recipe.Gem, "Flawed Skull"]);
	// Config.Recipes.push([Recipe.Gem, "Skull"]);
	// Config.Recipes.push([Recipe.Gem, "Flawless Skull"]);

	// Config.Recipes.push([Recipe.Token]); // Make Token of Absolution

	// Config.Recipes.push([Recipe.Rune, "El Rune"]); // Upgrade El to Eld
	// Config.Recipes.push([Recipe.Rune, "Eld Rune"]); // Upgrade Eld to Tir
	// Config.Recipes.push([Recipe.Rune, "Ort Rune"]); // Upgrade Ort to Amn
	// Config.Recipes.push([Recipe.Rune, "Amn Rune"]); // Upgrade Amn to Sol
	// Config.Recipes.push([Recipe.Rune, "Lem Rune"]); // Upgrade Lem to Pul
	// Config.Recipes.push([Recipe.Rune, "Pul Rune"]); // Upgrade Pul to Um
	// Config.Recipes.push([Recipe.Rune, "Um Rune"]); // Upgrade Um to Mal
	// Config.Recipes.push([Recipe.Rune, "Mal Rune"]); // Upgrade Mal to Ist
	//Config.Recipes.push([Recipe.Rune, "Ist Rune"]); // Upgrade Ist to Gul
	Config.Recipes.push([Recipe.Rune, "Gul Rune"]); // Upgrade Gul to Vex
	// Config.Recipes.push([Recipe.Rune, "Sur Rune"]); // Upgrade Sur to Ber

	// Config.Recipes.push([Recipe.Blood.Amulet]); // Craft Blood Amulet
	// Config.Recipes.push([Recipe.Caster.Amulet]); // Craft Caster Amulet

	// Config.Recipes.push([Recipe.Blood.Ring]); // Craft Blood Ring
	// Config.Recipes.push([Recipe.Caster.Ring]); // Craft Caster Ring

	//Config.Recipes.push([Recipe.Blood.Helm, "Armet"]); // Craft Blood Armet

	// Config.Recipes.push([Recipe.Blood.Gloves, "Heavy Gloves"]); // Craft Blood Heavy Gloves
	// Config.Recipes.push([Recipe.Blood.Gloves, "Sharkskin Gloves"]); // Craft Blood Sharkskin Gloves
	// Config.Recipes.push([Recipe.Blood.Gloves, "Vampirebone Gloves"]); // Craft Blood Vampirebone Gloves
	//Config.Recipes.push([Recipe.HitPower.Gloves, "Vambraces"]); // Craft Hit Power Vambraces

	// Config.Recipes.push([Recipe.Blood.Belt, "Mesh Belt"]); // Craft Blood Mesh Belt
	// Config.Recipes.push([Recipe.Blood.Belt, "Mithril Coil"]); // Craft Blood Mithril Coil
	// Config.Recipes.push([Recipe.Caster.Belt, "Sharkskin Belt"]); // Craft Caster Sharkskin Belt
	// Config.Recipes.push([Recipe.Caster.Belt, "Vampirefang Belt"]); // Craft Caster Vampirefang Belt

	// Config.Recipes.push([Recipe.Caster.Boots, "Demonhide Boots"]); // Craft Caster Demonhide Boots
	// Config.Recipes.push([Recipe.Caster.Boots, "Wyrmhide Boots"]); // Craft Caster Wyrmhide Boots

	// The gems not used by other recipes will be used for magic item rerolling.

	//Config.Recipes.push([Recipe.Reroll.Magic, "Diadem"]); // Reroll magic Diadem
	// Config.Recipes.push([Recipe.Reroll.Magic, "Grand Charm"]); // Reroll magic Grand Charm (ilvl 91+)

	//Config.Recipes.push([Recipe.Reroll.Rare, "Diadem"]); // Reroll rare Diadem

	/* Base item for the following recipes must be in pickit. The rest of the ingredients will be auto-picked.
	 * Use Roll.Eth, Roll.NonEth or Roll.All to determine what kind of base item to roll - ethereal, non-ethereal or all.
	 */
	//Config.Recipes.push([Recipe.Socket.Weapon, "Thresher", Roll.Eth]); // Socket ethereal Thresher
	Config.Recipes.push([Recipe.Socket.Weapon, "Colossus Voulge", Roll.Eth]); // Socket ethereal Colossus Voulge
	Config.Recipes.push([Recipe.Socket.Weapon, "Cryptic Axe", Roll.Eth]); // Socket ethereal Cryptic Axe
	Config.Recipes.push([Recipe.Socket.Weapon, "Great Poleaxe", Roll.Eth]); // Socket ethereal Great Poleaxe

	Config.Recipes.push([Recipe.Socket.Armor, "Ornate Plate", Roll.Eth]); // Socket ethereal Great Hauberk
	Config.Recipes.push([Recipe.Socket.Armor, "Dusk Shroud", Roll.Eth]); // Socket ethereal Great Hauberk
	Config.Recipes.push([Recipe.Socket.Armor, "Wyrmhide", Roll.Eth]); // Socket ethereal Great Hauberk
	Config.Recipes.push([Recipe.Socket.Armor, "Scarab Husk", Roll.Eth]); // Socket ethereal Great Hauberk
	Config.Recipes.push([Recipe.Socket.Armor, "Wire Fleece", Roll.Eth]); // Socket ethereal Great Hauberk
	Config.Recipes.push([Recipe.Socket.Armor, "Diamond Mail", Roll.Eth]); // Socket ethereal Great Hauberk
	Config.Recipes.push([Recipe.Socket.Armor, "Loricated Mail", Roll.Eth]); // Socket ethereal Great Hauberk
	Config.Recipes.push([Recipe.Socket.Armor, "Great Hauberk", Roll.Eth]); // Socket ethereal Great Hauberk
	Config.Recipes.push([Recipe.Socket.Armor, "Boneweave", Roll.Eth]); // Socket ethereal Boneweave
	Config.Recipes.push([Recipe.Socket.Armor, "Balrog Skin", Roll.Eth]); // Socket ethereal Balrog Skin
	Config.Recipes.push([Recipe.Socket.Armor, "Archon Plate", Roll.Eth]); // Socket ethereal Archon Plate
	Config.Recipes.push([Recipe.Socket.Armor, "Kraken Shell", Roll.Eth]); // Socket ethereal Kraken Shell
	Config.Recipes.push([Recipe.Socket.Armor, "Hellforge Plate", Roll.Eth]); // Socket ethereal Hellforge Plate
	Config.Recipes.push([Recipe.Socket.Armor, "Lacquered Plate", Roll.Eth]); // Socket ethereal Lacquered Plate
	Config.Recipes.push([Recipe.Socket.Armor, "Shadow Plate", Roll.Eth]); // Socket ethereal Shadow Plate
	Config.Recipes.push([Recipe.Socket.Armor, "Sacred Armor", Roll.Eth]); // Socket ethereal Sacred Armor

	Config.Recipes.push([Recipe.Socket.Shield, "Sacred Targe", Roll.Eth]); // Socket ethereal Sacred Targe
	Config.Recipes.push([Recipe.Socket.Shield, "Sacred Rondache", Roll.Eth]); // Socket ethereal Sacred Rondache
	Config.Recipes.push([Recipe.Socket.Shield, "Kurast Shield", Roll.Eth]); // Socket ethereal Kurast Shield
	Config.Recipes.push([Recipe.Socket.Shield, "Zakarum Shield", Roll.Eth]); // Socket ethereal Zakarum Shield
	Config.Recipes.push([Recipe.Socket.Shield, "Vortex Shield", Roll.Eth]); // Socket ethereal Vortex Shield

	Config.Recipes.push([Recipe.Unique.Armor.ToExceptional, "Heavy Gloves", Roll.NonEth]); // Upgrade Bloodfist to Exceptional
	Config.Recipes.push([Recipe.Unique.Armor.ToExceptional, "Light Gauntlets", Roll.NonEth]); // Upgrade Magefist to Exceptional
	Config.Recipes.push([Recipe.Unique.Armor.ToExceptional, "Boots", Roll.NonEth]); // Upgrade Hotspur to Exceptional
	Config.Recipes.push([Recipe.Unique.Armor.ToExceptional, "Light Plated Boots", Roll.NonEth]); // Upgrade Goblin toes to Exceptional
	Config.Recipes.push([Recipe.Unique.Armor.ToElite, "Sharkskin Gloves", Roll.NonEth]); // Upgrade Bloodfist or Grave Palm to Elite
	Config.Recipes.push([Recipe.Unique.Armor.ToElite, "Battle Gauntlets", Roll.NonEth]); // Upgrade Magefist or Lavagout to Elite
	Config.Recipes.push([Recipe.Unique.Armor.ToElite, "War Boots", Roll.NonEth]); // Upgrade Gore Rider to Elite
	Config.Recipes.push([Recipe.Unique.Armor.ToElite, "Demonhide Boots", Roll.NonEth]); // Upgrade Hotspur to Elite
	Config.Recipes.push([Recipe.Unique.Armor.ToElite, "Serpentskin Armor", Roll.NonEth]); // Upgrade Viper to Elite

	/* Runeword config. All recipes are available in Templates/Runewords.txt
	 * Keep lines follow pickit format and any given runeword is tested vs ALL lines so you don't need to repeat them
	 */
	Config.MakeRunewords = true; // Set to true to enable runeword making/rerolling

	// Config.Runewords.push([Runeword.Black, "Flail"]);
		Config.KeepRunewords.push("[name] == flail # [itemcrushingblow] == 40 && [ias] == 15");

	// Config.Runewords.push([Runeword.Treachery, "Mage Plate"]);
	// Config.Runewords.push([Runeword.Treachery, "Archon Plate"]);
	// Config.Runewords.push([Runeword.Treachery, "Dusk Shroud"]);
	// Config.Runewords.push([Runeword.Treachery, "Ornate Plate", Roll.Eth]);
	// Config.Runewords.push([Runeword.Treachery, "Dusk Shroud", Roll.Eth]);
	// Config.Runewords.push([Runeword.Treachery, "Wyrmhide", Roll.Eth]);
	// Config.Runewords.push([Runeword.Treachery, "Scarab Husk", Roll.Eth]);
	// Config.Runewords.push([Runeword.Treachery, "Wire Fleece", Roll.Eth]);
	// Config.Runewords.push([Runeword.Treachery, "Diamond Mail", Roll.Eth]);
	// Config.Runewords.push([Runeword.Treachery, "Loricated Mail", Roll.Eth]);
	// Config.Runewords.push([Runeword.Treachery, "Great Hauberk", Roll.Eth]);
	// Config.Runewords.push([Runeword.Treachery, "Boneweave", Roll.Eth]);
	// Config.Runewords.push([Runeword.Treachery, "Balrog Skin", Roll.Eth]);
	// Config.Runewords.push([Runeword.Treachery, "Archon Plate", Roll.Eth]);
	// Config.Runewords.push([Runeword.Treachery, "Kraken Shell", Roll.Eth]);
	// Config.Runewords.push([Runeword.Treachery, "Hellforge Plate", Roll.Eth]);
	// Config.Runewords.push([Runeword.Treachery, "Lacquered Plate", Roll.Eth]);
	// Config.Runewords.push([Runeword.Treachery, "Shadow Plate", Roll.Eth]);
	// Config.Runewords.push([Runeword.Treachery, "Sacred Armor", Roll.Eth]);
		Config.KeepRunewords.push("[Type] == armor # [assassinskills] == 2 && [ias] == 45");

	// Config.Runewords.push([Runeword.Treachery, "Mage Plate"]);
	// Config.Runewords.push([Runeword.Treachery, "Archon Plate"]);
	// Config.Runewords.push([Runeword.Treachery, "Dusk Shroud"]);
		Config.KeepRunewords.push("([Name] == ArchonPlate || [Name] == DuskShroud) # [assassinskills] == 2 && [ias] == 45");

	// Config.Runewords.push([Runeword.Lore, "Cap"]);
	// Config.Runewords.push([Runeword.Lore, "Mask"]);
	// Config.Runewords.push([Runeword.Lore, "Bone Helm"]);
	// Config.Runewords.push([Runeword.Lore, "Death Mask"]);
	// Config.Runewords.push([Runeword.Lore, "Grim Helm"]);
	// Config.Runewords.push([Runeword.Lore, "Shako"]);
		Config.KeepRunewords.push("[type] == helm # [itemallskills] == 1 && [energy] == 10");

	// Config.Runewords.push([Runeword.Stealth, "Quilted Armor"]);
	// Config.Runewords.push([Runeword.Stealth, "Leather Armor"]);
	// Config.Runewords.push([Runeword.Stealth, "Hard Leather Armor"]);
		Config.KeepRunewords.push("[type] == armor # [frw] == 25 && [fcr] == 25 && [fhr] == 25");

	// Config.Runewords.push([Runeword.AncientsPledge, "Large Shield"]);
	// Config.Runewords.push([Runeword.AncientsPledge, "Kite Shield"]);
		Config.KeepRunewords.push("[type] == shield # [lightresist] == 48");

	// Config.Runewords.push([Runeword.Rhyme, "Small Shield"]);
	// Config.Runewords.push([Runeword.Rhyme, "Large Shield"]);
	// Config.Runewords.push([Runeword.Rhyme, "Kite Shield"]);
	// Config.Runewords.push([Runeword.Rhyme, "Barbed Shield"]);
		Config.KeepRunewords.push("[type] == shield # [fbr] == 40 && [lightresist] == 25");

	// Config.Runewords.push([Runeword.Insight, "Poleaxe", Roll.Eth]);
	// Config.Runewords.push([Runeword.Insight, "Halberd", Roll.Eth]);
	// Config.Runewords.push([Runeword.Insight, "Partizan", Roll.Eth]);
	Config.Runewords.push([Runeword.Insight, "Colossus Voulge", Roll.Eth]);
	Config.Runewords.push([Runeword.Insight, "Thresher", Roll.Eth]); // Make Insight Thresher
	Config.Runewords.push([Runeword.Insight, "Cryptic Axe", Roll.Eth]); // Make Insight Cryptic Axe
		Config.KeepRunewords.push("[type] == polearm # [meditationaura] >= 12");
		// Config.KeepRunewords.push("[type] == polearm # [meditationaura] == 17");
		// Config.KeepRunewords.push("[type] == polearm # [meditationaura] == 17 && [enhanceddamage] == 260 && [itemtohitpercent] == 250");

	// Config.Runewords.push([Runeword.Grief, "Phase Blade", Roll.NonEth]);
		Config.KeepRunewords.push("[Name] == PhaseBlade # [ias] >= 30 && [itemignoretargetac] > 0 && [itemdamagedemonperlevel] > 0");

	// Config.Runewords.push([Runeword.Spirit, "Long Sword"]); // Make Spirit Crystal Sword
	// Config.Runewords.push([Runeword.Spirit, "Crystal Sword"]); // Make Spirit Crystal Sword
	Config.Runewords.push([Runeword.Spirit, "Monarch"]); // Make Spirit Monarch
	// Make Spirit any pala shield for bo
	// Config.Runewords.push([Runeword.Spirit, "Targe"]);
	// Config.Runewords.push([Runeword.Spirit, "Rondache"]);
	// Config.Runewords.push([Runeword.Spirit, "Akaran Targe"]);
	// Config.Runewords.push([Runeword.Spirit, "Akaran Rondache"]);
	// Config.Runewords.push([Runeword.Spirit, "Sacred Targe"]);
	// Config.Runewords.push([Runeword.Spirit, "Sacred Rondache"]);
	// Config.Runewords.push([Runeword.Spirit, "Heraldic Shield"]);
	// Config.Runewords.push([Runeword.Spirit, "Aerin Shield"]);
	// Config.Runewords.push([Runeword.Spirit, "Crown Shield"]);
	// Config.Runewords.push([Runeword.Spirit, "Protector Shield"]);
	// Config.Runewords.push([Runeword.Spirit, "Gilded Shield"]);
	// Config.Runewords.push([Runeword.Spirit, "Royal Shield"]);
	// Config.Runewords.push([Runeword.Spirit, "Kurast Shield"]);
	// Config.Runewords.push([Runeword.Spirit, "Zakarum Shield"]);
	// Config.Runewords.push([Runeword.Spirit, "Vortex Shield"]);
		// Config.KeepRunewords.push("[type] == auricshields # [fcr] >= 25 # [maxquantity] == 1"); // Pala shield spirit for bo
		// Config.KeepRunewords.push("[type] == sword # [fcr] >= 25 # [maxquantity] == 1"); // Any Spirit
		// Config.KeepRunewords.push("[type] == shield # [fcr] == 35");
		Config.KeepRunewords.push("[type] == shield # [fcr] == 35 && [maxmana] == 112");
		// Config.KeepRunewords.push("[type] == shield || [type] == auricshields || [type] == sword # [fcr] == 35 && [maxmana] == 112 && [itemabsorbmagic] == 8");

	// Public game options

	// If LocalChat is enabled, chat can be sent via 'sendCopyData' instead of BNET
	// To allow 'say' to use BNET, use 'say("msg", true)', the 2nd parameter will force BNET
	// LocalChat messages will only be visible on clients running on the same PC
	Config.LocalChat.Enabled = true; // enable the LocalChat system
	Config.LocalChat.Toggle = false; // optional, set to KEY value to toggle through modes 0, 1, 2
	Config.LocalChat.Mode = 1; // 0 = disabled, 1 = chat from 'say' (recommended), 2 = all chat (for manual play)
	// If Config.Leader is set, the bot will only accept invites from leader. If Config.PublicMode is not 0, Baal and Diablo script will open Town Portals.
	Config.PublicMode = 1; // 1 = invite and accept, 2 = accept only, 3 = invite only, 0 = disable
	// Party message settings. Each setting represents an array of messages that will be randomly chosen.
	// $name, $level, $class and $killer are replaced by the player's name, level, class and killer
	Config.Greetings = []; // Example: ["Hello, $name (level $level $class)"]
	Config.DeathMessages = []; // Example: ["Watch out for that $killer, $name!"]
	Config.Congratulations = []; // Example: ["Congrats on level $level, $name!"]
	Config.ShitList = false; // Blacklist hostile players so they don't get invited to party.
	Config.UnpartyShitlisted = false; // Leave party if someone invited a blacklisted player.

	// General config
	Config.AutoMap = true; // Set to true to open automap at the beginning of the game.
	Config.LastMessage = ""; // Message or array of messages to say at the end of the run. Use $nextgame to say next game - "Next game: $nextgame" (works with lead entry point)
	Config.MinGameTime = 60; // Min game time in seconds. Bot will TP to town and stay in game if the run is completed before.
	Config.MaxGameTime = 1800; // Maximum game time in seconds. Quit game when limit is reached.
	Config.TeleSwitch = false; // Switch to slot II when teleporting more than 1 node.
	Config.OpenChests = true; // Open chests. Controls key buying.
	Config.MiniShopBot = true; // Scan items in NPC shops.
	Config.PacketShopping = false; // Use packets to shop. Improves shopping speed.
	Config.TownCheck = true; // Go to town if out of potions
	Config.LogExperience = true; // Print experience statistics in the manager.
	Config.PingQuit = [{Ping: 0, Duration: 0}]; // Quit if ping is over the given value for over the given time period in seconds.

	// Shrine Scanner - scan for shrines while moving.
	// Put the shrine types in order of priority (from highest to lowest). For a list of types, see sdk/shrines.txt

	Config.ScanShrines = [
		Shrines.MONSTER,
		Shrines.GEM,
		Shrines.PORTAL,
		Shrines.REFILLING,
		Shrines.HEALTH,
		Shrines.MANA,
		Shrines.EXPERIENCE,
		Shrines.SKILL,
		Shrines.MANA_RECHARGE,
		Shrines.ARMOR,
		Shrines.RESIST_LIGHTNING,
		Shrines.RESIST_FIRE,
		Shrines.RESIST_COLD,
		Shrines.RESIST_POISON,
		Shrines.COMBAT,
		Shrines.HEALTH_EXCHANGE,
		Shrines.MANA_EXCHANGE,
		Shrines.STAMINA
	];

	// MF Switch
	Config.MFSwitchPercent = 0; // Boss life % to switch weapons at. Set to 0 to disable.
	Config.MFSwitch = 0; // MF weapon slot: 0 = slot I, 1 = slot II

	// Speedup config. Full packet casting is not recommended for melee skills.
	Config.FCR = 0;//200; // 0 - disable, 1 to 255 - set value of Faster Cast Rate.
	Config.FHR = 255;//142; // 0 - disable, 1 to 255 - set value of Faster Hit Recovery.
	Config.FBR = 255;//200; // 0 - disable, 1 to 255 - set value of Faster Block Recovery.
	Config.IAS = 0;//255; // 0 - disable, 1 to 255 - set value of Increased Attack Speed.
	Config.PacketCasting = 0; // 0 = disable, 1 = packet teleport, 2 = full packet casting.
	Config.WaypointMenu = true; // Set to true for Single and private realms

	// Anti-hostile config
	Config.AntiHostile = false; // Enable anti-hostile.
	Config.HostileAction = 0; // 0 - quit immediately, 1 - quit when hostile player is sighted, 2 - attack hostile.
	Config.TownOnHostile = false; // Go to town instead of quitting when HostileAction is 0 or 1.
	Config.RandomPrecast = false; // Anti-PK measure, only supported in Baal and BaalHelper and BaalAssisstant at the moment.
	Config.ViperCheck = false; // Quit if revived Tomb Vipers are sighted.

	// DClone config
	Config.StopOnDClone = true; // Go to town and idle as soon as Diablo walks the Earth
	Config.SoJWaitTime = 5; // Time in minutes to wait for another SoJ sale before leaving game. 0 = disabled
	Config.KillDclone = false; // Go to Palace Cellar 3 and try to kill Diablo Clone. Pointless if you already have Annihilus.
	Config.DCloneQuit = false; // 1 = quit when Diablo walks, 2 = quit on soj sales, 0 = disabled

	// Monster skip config
	// Skip immune monsters. Possible options: "fire", "cold", "lightning", "poison", "physical", "magic".
	// You can combine multiple resists with "and", for example - "fire and cold", "physical and cold and poison"
	Config.SkipImmune = ["fire and cold"];
	// Skip enchanted monsters. Possible options: "extra strong", "extra fast", "cursed", "magic resistant", "fire enchanted", "lightning enchanted", "cold enchanted", "mana burn", "teleportation", "spectral hit", "stone skin", "multiple shots".
	// You can combine multiple enchantments with "and", for example - "cursed and extra fast", "mana burn and extra strong and lightning enchanted"
	Config.SkipEnchant = [];
	// Skip monsters with auras. Possible options: "fanaticism", "might", "holy fire", "blessed aim", "holy freeze", "holy shock". Conviction is bugged, don't use it.
	Config.SkipAura = [];
	// Uncomment the following line to always attempt to kill these bosses despite immunities and mods
	//Config.SkipException = [getLocaleString(2851), getLocaleString(2852), getLocaleString(2853)]; // vizier, de seis, infector

	/* Attack config
	 * To disable an attack, set it to -1
	 * Skills MUST be POSITIVE numbers. For reference see http://pastebin.com/baShRwWM
	 */
	Config.AttackSkill[0] = Skills.Sorceress.METEOR; // Preattack skill.
	Config.AttackSkill[1] = Skills.Sorceress.FROZEN_ORB; // Primary skill to bosses.
	Config.AttackSkill[2] = Skills.Sorceress.FIRE_BALL; // Primary untimed skill to bosses. Keep at -1 if Config.AttackSkill[1] is untimed skill.
	Config.AttackSkill[3] = Skills.Sorceress.FROZEN_ORB; // Primary skill to others.
	Config.AttackSkill[4] = Skills.Sorceress.FIRE_BALL; // Primary untimed skill to others. Keep at -1 if Config.AttackSkill[3] is untimed skill.
	Config.AttackSkill[5] = Skills.Sorceress.METEOR; // Secondary skill if monster is immune to primary.
	Config.AttackSkill[6] = Skills.Sorceress.GLACIAL_SPIKE; // Secondary untimed skill if monster is immune to primary untimed.

	// Low mana skills - these will be used if main skills can't be cast.
	Config.LowManaSkill[0] = -1; // Timed low mana skill.
	Config.LowManaSkill[1] = -1; // Untimed low mana skill.

	/* Advanced Attack config. Allows custom skills to be used on custom monsters.
	 *	Format: "Monster Name": [timed skill id, untimed skill id]
	 *	Example: "Baal": [38, -1] to use charged bolt on Baal
	 *	Multiple entries are separated by commas
	 */
	Config.CustomAttack = {
		//"Monster Name": [-1, -1]
	};

	Config.Dodge = true; // Move away from monsters that get too close. Don't use with short-ranged attacks like Poison Dagger.
	Config.DodgeRange = 8; // Distance to keep from monsters.
	Config.DodgeHP = 100; // Dodge only if HP percent is less than or equal to Config.DodgeHP. 100 = always dodge.
	Config.BossPriority = true; // Set to true to attack Unique/SuperUnique monsters first when clearing
	Config.ClearType = 0x7; // Monster spectype to kill in level clear scripts (ie. Mausoleum). 0xF = skip normal, 0x7 = champions/bosses, 0 = all
	Config.TeleStomp = false; // Use merc to attack bosses if they're immune to attacks, but not to physical damage

	// Wereform setup. Make sure you read Templates/Attacks.txt for attack skill format.
	Config.Wereform = false; // 0 / false - don't shapeshift, 1 / "Werewolf" - change to werewolf, 2 / "Werebear" - change to werebear

	// Class specific config
	Config.CastStatic = 55; // Cast static until the target is at designated life percent. 100 = disabled.
	// List of monster NAMES or CLASSIDS to static. Example: Config.StaticList = ["Andariel", 243];
	Config.StaticList = [
        "Blood Raven", "The Countess", "Bishibosh", "Griswold", "Bone Ash", "Rakanishu", "Andariel", // Act 1
        "Radament", "Beetleburst", "Coldworm the Burrower", "Summoner", "Duriel", // Act 2
        "Stormtree", "Battlemaid Sarina", "Bremm Sparkfist", "Wyand Voidbringer", "Maffer Dragonhand", "Mephisto", 345, 346, 347, // Act 3
        "Izual", "Hephasto the Armorer", "Diablo", // Act 4 "Infector of Souls", "Lord De Seis", "Venom Lord", "Doom Knight", "Oblivion Knight", 
        "Nihlathak", "Lister the Tormenter", "Talic", "Korlic", "Madawc", "Eldritch the Rectifier", "Shenk the Overseer", "Pindleskin", 105, 381, 557, 558, "Baal" // Act 5
    ];
}