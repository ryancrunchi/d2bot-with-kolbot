//	/d2bs/kolbot/libs/config/Builds/Class.Build.js

/**
*
* Instructions:	See /d2bs/kolbot/libs/config/Builds/README.txt
*
* Skill IDs:	See /d2bs/kolbot/sdk/skills.txt for a list of skill IDs.
*
* Stat IDs:
*
* 	Strength	= 0
* 	Energy		= 1
* 	Dexterity	= 2
* 	Vitality	= 3
*
*/
js_strict(true);

if (!isIncluded("NTItemParser.dbl")) { include("NTItemParser.dbl"); }
if (!isIncluded("common/Cubing.js")) { include("common/Cubing.js"); }
if (!isIncluded("common/Prototypes.js")) { include("common/Prototypes.js"); }
if (!isIncluded("common/Runewords.js")) { include("common/Runewords.js"); }
if (!isIncluded("common/Misc.js")) { include("common/Misc.js"); }

var previousCountess = Scripts.Countess;

var AutoBuildTemplate = {

	1:	{	
		//SkillPoints: [-1],								// This doesn't matter. We don't have skill points to spend at lvl 1
		//StatPoints: [-1, -1, -1, -1, -1],						// This doesn't matter. We don't have stat points to spend at lvl 1
		Update: function () {
			Config.LowGold = 1000;
			Config.StashGold = 200;
			var item = Item.getEquippedItem(4).item;
			var attack = 0;
			if (item && item.itemType == 26) {
				attack = 36; // At level 1 we start with a +1 Fire Bolt staff
			}
			Config.AttackSkill = [-1, attack, -1, attack, -1, 0, -1];
			Config.LowManaSkill = [0, -1];
			Config.BeltColumn = ["hp", "hp", "mp", "mp"];
			Config.MinColumn = [1, 1, 1, 1];

			Config.HealHP = 99; // Go to a healer if under designated percent of life.
			Config.HealMP = 99; // Go to a healer if under designated percent of mana.
			Config.HealStatus = true; // Go to a healer if poisoned or cursed

			// Potion settings
			//Config.UseHP = 45; // Drink a healing potion if life is under designated percent.
			//Config.UseRejuvHP = 35;  // Drink a rejuvenation potion if life is under designated percent.
			Config.UseMP = 25; // Drink a mana potion if mana is under designated percent.
			Config.UseRejuvMP = 0; // Drink a rejuvenation potion if mana is under designated percent.
			Config.UseMercHP = -1; // Give a healing potion to your merc if his/her life is under designated percent.
			//Config.UseMercRejuv = -1; // Give a rejuvenation potion to your merc if his/her life is under designated percent.
			Config.HPBuffer = 4; // Number of healing potions to keep in inventory.
			Config.MPBuffer = 4; // Number of mana potions to keep in inventory.
			Config.RejuvBuffer = 4; // Number of rejuvenation potions to keep in inventory.

			// Chicken settings
			Config.LifeChicken = 20; // Exit game if life is less or equal to designated percent.
			Config.ManaChicken = -1; // Exit game if mana is less or equal to designated percent.
			Config.MercChicken = -1; // Exit game if merc's life is less or equal to designated percent.
			Config.TownHP = 0; // Go to town if life is under designated percent.
			Config.TownMP = 0; // Go to town if mana is under designated percent.
			
			Config.ClearAnyArea.AreaList = [2,8]; // List of area ids to clear. See sdk/areas.txt

			Config.PickitFiles.push("autoequip/sorceress.blizzard.nip");
			Config.PickitFiles.push("autoequip/base.nip");

			Config.Dodge = me.diff > 0; // Move away from monsters that get too close. Don't use with short-ranged attacks like Poison Dagger.
			//Config.DodgeRange = 8; // Distance to keep from monsters.
			//Config.DodgeHP = 100; // Dodge only if HP percent is less than or equal to Config.DodgeHP. 100 = always dodge.
			Config.BossPriority = false; // Set to true to attack Unique/SuperUnique monsters first when clearing

			Config.FastPick = true; // Check and pick items between attacks

			Config.UseMerc = me.getQuest(2, 0) || me.diff > 0;

			Config.Cubing = me.getQuest(10, 0) || me.diff > 0;

			Config.ClearType = 0; // Monster spectype to kill in level clear scripts (ie. Mausoleum). 0xF = skip normal, 0x7 = champions/bosses, 0 = all

			/*Scripts.Andariel = me.getQuest(7, 0) && Config.AutoSmurf.TeamSize < 2;
			Scripts.Countess = me.getQuest(7, 0) && Config.AutoSmurf.TeamSize < 2;
			Scripts.Duriel = me.getQuest(15, 0) && Config.AutoSmurf.TeamSize < 2;
			Scripts.Mephisto = me.getQuest(23, 0) && Config.AutoSmurf.TeamSize < 2;
				Config.Mephisto.MoatTrick = false;
				Config.Mephisto.KillCouncil = true;
				Config.Mephisto.TakeRedPortal = true;*/
		}
	},

	2:	{	
	SkillPoints: [39], // ice bolt
	StatPoints: [0, 0, 0, 0, 0],
		Update: function () {
			Config.AttackSkill = [-1,39,-1,39,-1,0,-1];
		}
	},

	3:	{
		SkillPoints: [40], // frozen armor
		StatPoints: [0, 0, 0, 0, 0],
		Update: function () {

		}
	},

	4:	{
		SkillPoints: [37], // warmth
		StatPoints: [0, 0, 0, 0, 0],
		Update: function () {

		}
	},

	5:	{
		SkillPoints: [-1],
		StatPoints: [0, 0, 0, 0, 0],
		Update: function () {
			
		}
	},

	6:	{
		SkillPoints: [42,45], // static, ice blast
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {
			Config.AttackSkill = [-1,45,-1,45,-1,0,-1];
			Config.CastStatic = me.diff ? 55 : 45; // Cast static until the target is at designated life percent. 100 = disabled.
			Config.StaticList.push(365); // static griswold
			Config.StaticList.push("Bloodraven"); // static Bloodraven
			Config.TownCheck = true; // Go to town if out of potions
		}
	},

	7:	{
		SkillPoints: [43], // telekinesis
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	8:	{
		SkillPoints: [44], // frost nova
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {
			
		}
	},

	9:	{
		SkillPoints: [45],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {
			Config.LifeChicken = 25; // Exit game if life is less or equal to designated percent.
			//Config.UseRejuvHP = 35;  // Drink a rejuvenation potion if life is under designated percent.
		}
	},

	10:	{
		SkillPoints: [45],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {
			// Config.LowGold = 5000;
			Config.StashGold = 1000;
			Config.HPBuffer = 2; // Number of healing potions to keep in inventory.
			Config.RejuvBuffer = 2; // Number of rejuvenation potions to keep in inventory.
		}
	},

	11:	{	
		SkillPoints: [45],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	12:	{
		SkillPoints: [50], // shiver armor
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {
			Config.BeltColumn = ["hp", "mp", "mp", "mp"];
		}
	},

	13:	{
		SkillPoints: [45],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	14:	{
		SkillPoints: [45],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {
			Config.StashGold = 3000;
		}
	},

	15:	{
		SkillPoints: [45],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {
			
		}
	},

	16:	{
		SkillPoints: [45],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	17:	{
		SkillPoints: [45],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	18:	{
		SkillPoints: [54,55], // teleport, glacial spike (there should be act 1 skill quest (den))
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {
			Config.ClearType = 0x7; // Monster spectype to kill in level clear scripts (ie. Mausoleum). 0xF = skip normal, 0x7 = champions/bosses, 0 = all
			//Scripts.Andariel = true;
			Scripts.Countess = true;
		}
	},

	19:	{
		SkillPoints: [45],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	20:	{
		SkillPoints: [45],
		StatPoints: [3, 3, 1, 1, 0],
		Update: function () {
			// Config.LowGold = 10000;
			Config.StashGold = 5000;
		}
	},

	21:	{	
		SkillPoints: [45],
		StatPoints: [3, 3, 1, 1, 0],
		Update: function () {

		}
	},

	22:	{
		SkillPoints: [45],
		StatPoints: [3, 3, 1, 1, 0],
		Update: function () {

		}
	},

	23:	{
		SkillPoints: [45],
		StatPoints: [3, 3, 1, 1, 0],
		Update: function () {

		}
	},

	24:	{
		SkillPoints: [59],
		StatPoints: [3, 3, 1, 1, 0],
		Update: function () {
			Config.AttackSkill = [59,59,45,59,45,-1,-1];
			Config.LowManaSkill = [-1, -1];
			Config.ClearType = 0xF; // Monster spectype to kill in level clear scripts (ie. Mausoleum). 0xF = skip normal, 0x7 = champions/bosses, 0 = all
		}
	},

	25:	{
		SkillPoints: [59],
		StatPoints: [3, 3, 1, 1, 0],
		Update: function () {
			
		}
	},

	26:	{
		SkillPoints: [59],
		StatPoints: [3, 3, 1, 1, 0],
		Update: function () {

		}
	},

	27:	{
		SkillPoints: [59],
		StatPoints: [3, 3, 1, 1, 0],
		Update: function () {

		}
	},

	28:	{
		SkillPoints: [59],
		StatPoints: [3, 3, 1, 1, 0],
		Update: function () {

		}
	},

	29:	{
		SkillPoints: [59],
		StatPoints: [3, 3, 1, 1, 0],
		Update: function () {

		}
	},

	30:	{
		SkillPoints: [65, 59, 59], // izual quest, cold mastery
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {
			// Config.LowGold = 20000;
			/*Scripts.Mephisto = true;
				Config.Mephisto.MoatTrick = true;
				Config.Mephisto.KillCouncil = true;
				Config.Mephisto.TakeRedPortal = false;*/
			Scripts.Countess = previousCountess;
		}
	},

	31:	{	
		SkillPoints: [59],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	32:	{
		SkillPoints: [59],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	33:	{
		SkillPoints: [59],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	34:	{
		SkillPoints: [59],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	35:	{
		SkillPoints: [59],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	36:	{
		SkillPoints: [59],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	37:	{
		SkillPoints: [59],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	38:	{
		SkillPoints: [59],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	39:	{
		SkillPoints: [59],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	40:	{
		SkillPoints: [59],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {
			Config.StashGold = 50000;
		}
	},

	41:	{	
		SkillPoints: [59],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	42:	{
		SkillPoints: [59], // izual quest
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	43:	{
		SkillPoints: [65],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	44:	{
		SkillPoints: [65],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	45:	{
		SkillPoints: [65],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {
			Config.BeltColumn = ["hp", "mp", "mp", "rv"];
		}
	},

	46:	{
		SkillPoints: [65],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	47:	{
		SkillPoints: [65],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	48:	{
		SkillPoints: [65],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	49:	{
		SkillPoints: [65],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	50:	{
		SkillPoints: [65],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	51:	{	
		SkillPoints: [65],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	52:	{
		SkillPoints: [65],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	53:	{
		SkillPoints: [65],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	54:	{
		SkillPoints: [65],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {
			Config.ClearType = 0x7;
			Config.OpenChests = true;
			/*Scripts.Andariel = true;
			Scripts.Countess = true;
			Scripts.Mephisto = true;
			Scripts.Pit = true;
			Scripts.Pindleskin = true;
			Scripts.Eldritch = true;
			Scripts.Baal = true;
				Config.Baal.KillBaal = false; // Kill Baal. Leaves game after wave 5 if false.*/
		}
	},

	55:	{
		SkillPoints: [65],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	56:	{
		SkillPoints: [65],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	57:	{
		SkillPoints: [65],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	58:	{
		SkillPoints: [65],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	59:	{
		SkillPoints: [65],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	60:	{
		SkillPoints: [65],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {
			Config.HPBuffer = 0; // Number of healing potions to keep in inventory.
			Config.MPBuffer = 0; // Number of mana potions to keep in inventory.
			Config.RejuvBuffer = 0; // Number of rejuvenation potions to keep in inventory.
			Config.BeltColumn = ["hp", "mp", "rv", "rv"];
			Config.BossPriority = true;
			Config.StashGold = 150000;
		}
	},

	61:	{	
		SkillPoints: [65],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	62:	{
		SkillPoints: [45],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	63:	{
		SkillPoints: [45],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	64:	{
		SkillPoints: [45, 45, 45],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	65:	{
		SkillPoints: [55],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	66:	{
		SkillPoints: [55],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {
			Config.ClearType = 0xF;
			Config.OpenChests = false;
			/*Scripts.Andariel = false;
			Scripts.Countess = false;
			Scripts.Mephisto = false;
			Scripts.Pit = false;
			Scripts.Pindleskin = false;
			Scripts.Eldritch = false;
			Scripts.Baal = false;*/
		}
	},

	67:	{
		SkillPoints: [55],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	68:	{
		SkillPoints: [55],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	69:	{
		SkillPoints: [55],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	70:	{
		SkillPoints: [55],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	71:	{	
		SkillPoints: [55],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	72:	{
		SkillPoints: [55],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	73:	{
		SkillPoints: [55],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	74:	{
		SkillPoints: [55],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	75:	{
		SkillPoints: [55],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	76:	{
		SkillPoints: [55],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	77:	{
		SkillPoints: [55],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	78:	{
		SkillPoints: [55],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	79:	{
		SkillPoints: [55],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	80:	{
		SkillPoints: [55],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	81:	{	
		SkillPoints: [55],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	82:	{
		SkillPoints: [55],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	83:	{
		SkillPoints: [55],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	84:	{
		SkillPoints: [-1],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	85:	{
		SkillPoints: [-1],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	86:	{
		SkillPoints: [-1],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	87:	{
		SkillPoints: [-1],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	88:	{
		SkillPoints: [-1],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	89:	{
		SkillPoints: [-1],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	90:	{
		SkillPoints: [-1],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	91:	{	
		SkillPoints: [-1],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	92:	{
		SkillPoints: [-1],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	93:	{
		SkillPoints: [-1],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	94:	{
		SkillPoints: [-1],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	95:	{
		SkillPoints: [-1],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	96:	{
		SkillPoints: [-1],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	97:	{
		SkillPoints: [-1],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	98:	{
		SkillPoints: [-1],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	},

	99:	{
		SkillPoints: [-1],
		StatPoints: [3, 3, 3, 3, 1],
		Update: function () {

		}
	}
};
