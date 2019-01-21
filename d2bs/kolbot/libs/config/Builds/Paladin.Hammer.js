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

var AutoBuildTemplate = {

	1:	{	
		//SkillPoints: [],								// This doesn't matter. We don't have skill points to spend at lvl 1
		//StatPoints: [-1, -1, -1, -1, -1],						// This doesn't matter. We don't have stat points to spend at lvl 1
		Update: function () {
			Config.LowGold = 1000;
			Config.StashGold = 200;
			var item = Item.getEquippedItem(4).item;
			var attack = 0;
			Config.AttackSkill[0] = attack; // Preattack skill.
			Config.AttackSkill[1] = attack; // Primary skill to bosses.
			Config.AttackSkill[2] = -1; // Primary aura to bosses
			Config.AttackSkill[3] = attack; // Primary skill to others.
			Config.AttackSkill[4] = -1; // Primary aura to others.
			Config.AttackSkill[5] = -1; // Secondary skill if monster is immune to primary.
			Config.AttackSkill[6] = -1; // Secondary aura.
			Config.LowManaSkill = [0, -1];
			Config.BeltColumn = ["hp", "hp", "hp", "mp"];
			Config.MinColumn = [1, 1, 1, 1];

			Config.HealHP = 99; // Go to a healer if under designated percent of life.
			Config.HealMP = 99; // Go to a healer if under designated percent of mana.
			Config.HealStatus = true; // Go to a healer if poisoned or cursed

			// Potion settings
			Config.UseHP = 45; // Drink a healing potion if life is under designated percent.
			Config.UseRejuvHP = 35;  // Drink a rejuvenation potion if life is under designated percent.
			Config.UseMP = 25; // Drink a mana potion if mana is under designated percent.
			Config.UseRejuvMP = 0; // Drink a rejuvenation potion if mana is under designated percent.
			Config.UseMercHP = -1; // Give a healing potion to your merc if his/her life is under designated percent.
			Config.UseMercRejuv = -1; // Give a rejuvenation potion to your merc if his/her life is under designated percent.
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

			Config.PickitFiles.push("autoequip/paladin.hammer.nip");
			Config.PickitFiles.push("autoequip/base.nip");

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
	SkillPoints: [97], // smite
	StatPoints: [0, 0, 0, 0, 0],
		Update: function () {

		}
	},

	3:	{
		SkillPoints: [98], // might
		StatPoints: [0, 0, 0, 0, 0],
		Update: function () {
			Config.AttackSkill[0] = 0; // Preattack skill.
			Config.AttackSkill[1] = 0; // Primary skill to bosses.
			Config.AttackSkill[2] = 98; // Primary aura to bosses
			Config.AttackSkill[3] = 0; // Primary skill to others.
			Config.AttackSkill[4] = 98; // Primary aura to others.
		}
	},

	4:	{
		SkillPoints: [99], // prayer
		StatPoints: [0, 0, 0, 0, 0],
		Update: function () {

		}
	},

	5:	{
		SkillPoints: [],
		StatPoints: [0, 0, 0, 0, 0],
		Update: function () {
			
		}
	},

	6:	{
		SkillPoints: [101, 104], // holy bolt, defiance
		StatPoints: [0, 0, 0, 0, 0],
		Update: function () {
			Config.CastStatic = me.diff ? 55 : 45; // Cast static until the target is at designated life percent. 100 = disabled.
			Config.StaticList.push(365); // static griswold
			Config.StaticList.push("Bloodraven"); // static Bloodraven
			Config.TownCheck = true; // Go to town if out of potions
		}
	},

	7:	{
		SkillPoints: [],
		StatPoints: [0, 0, 0, 0, 0],
		Update: function () {

		}
	},

	8:	{
		SkillPoints: [],
		StatPoints: [0, 0, 0, 0, 0],
		Update: function () {
			
		}
	},

	9:	{
		SkillPoints: [],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {
			Config.LifeChicken = 25; // Exit game if life is less or equal to designated percent.
			Config.UseHP = 45; // Drink a healing potion if life is under designated percent.
			Config.UseRejuvHP = 35;  // Drink a rejuvenation potion if life is under designated percent.
		}
	},

	10:	{
		SkillPoints: [],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {
			// Config.LowGold = 5000;
			Config.StashGold = 1000;
			Config.HPBuffer = 2; // Number of healing potions to keep in inventory.
			Config.RejuvBuffer = 2; // Number of rejuvenation potions to keep in inventory.
		}
	},

	11:	{	
		SkillPoints: [],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	12:	{
		SkillPoints: [107, 108, 109], // charge, blessed aim, cleansing
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {
			Config.BeltColumn = ["hp", "mp", "mp", "mp"];
		}
	},

	13:	{
		SkillPoints: [],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	14:	{
		SkillPoints: [],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {
			Config.StashGold = 3000;
		}
	},

	15:	{
		SkillPoints: [],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {
			
		}
	},

	16:	{
		SkillPoints: [],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	17:	{
		SkillPoints: [],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	18:	{
		SkillPoints: [112,113,115], // hammer, concentration, vigor (there should be act 1 skill quest (den))
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {
			Config.ClearType = 0x7; // Monster spectype to kill in level clear scripts (ie. Mausoleum). 0xF = skip normal, 0x7 = champions/bosses, 0 = all
			//Scripts.Andariel = true;
			Config.AttackSkill[0] = 112; // Preattack skill.
			Config.AttackSkill[1] = 112; // Primary skill to bosses.
			Config.AttackSkill[2] = 113; // Primary aura to bosses
			Config.AttackSkill[3] = 112; // Primary skill to others.
			Config.AttackSkill[4] = 113; // Primary aura to others.
			Config.AttackSkill[5] = -1; // Secondary skill if monster is immune to primary.
			Config.AttackSkill[6] = 113; // Secondary aura.
		}
	},

	19:	{
		SkillPoints: [112,113],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	20:	{
		SkillPoints: [112,113],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {
			// Config.LowGold = 10000;
			Config.StashGold = 5000;
			//Scripts.Countess = true;
		}
	},

	21:	{	
		SkillPoints: [112,113],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	22:	{
		SkillPoints: [112,113],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	23:	{
		SkillPoints: [112,113],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	24:	{
		SkillPoints: [112, 117], // holly shield
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {
			Config.LowManaSkill = [-1, -1];
			Config.ClearType = 0xF; // Monster spectype to kill in level clear scripts (ie. Mausoleum). 0xF = skip normal, 0x7 = champions/bosses, 0 = all
		}
	},

	25:	{
		SkillPoints: [112],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {
			
		}
	},

	26:	{
		SkillPoints: [112],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	27:	{
		SkillPoints: [112],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	28:	{
		SkillPoints: [112],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	29:	{
		SkillPoints: [112],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	30:	{
		SkillPoints: [112], // izual quest
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {
			// Config.LowGold = 20000;
			/*Scripts.Mephisto = true;
				Config.Mephisto.MoatTrick = true;
				Config.Mephisto.KillCouncil = true;
				Config.Mephisto.TakeRedPortal = false;*/
		}
	},

	31:	{	
		SkillPoints: [112],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	32:	{
		SkillPoints: [112],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	33:	{
		SkillPoints: [112],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	34:	{
		SkillPoints: [112],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	35:	{
		SkillPoints: [112],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	36:	{
		SkillPoints: [112],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	37:	{
		SkillPoints: [112],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	38:	{
		SkillPoints: [113],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	39:	{
		SkillPoints: [113],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	40:	{
		SkillPoints: [113],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {
			Config.StashGold = 50000;
		}
	},

	41:	{	
		SkillPoints: [113],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	42:	{
		SkillPoints: [113, 115], // izual quest
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	43:	{
		SkillPoints: [113],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	44:	{
		SkillPoints: [113],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	45:	{
		SkillPoints: [113],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {
			Config.BeltColumn = ["hp", "mp", "mp", "rv"];
		}
	},

	46:	{
		SkillPoints: [113],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	47:	{
		SkillPoints: [113],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	48:	{
		SkillPoints: [113],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	49:	{
		SkillPoints: [113],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	50:	{
		SkillPoints: [113],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	51:	{	
		SkillPoints: [113],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	52:	{
		SkillPoints: [115],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	53:	{
		SkillPoints: [115],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	54:	{
		SkillPoints: [115],
		StatPoints: [3, 3, 3, 3, 3],
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
		SkillPoints: [115],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	56:	{
		SkillPoints: [115],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	57:	{
		SkillPoints: [115],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	58:	{
		SkillPoints: [115],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	59:	{
		SkillPoints: [115],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	60:	{
		SkillPoints: [115],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {
			Config.HPBuffer = 0; // Number of healing potions to keep in inventory.
			Config.MPBuffer = 0; // Number of mana potions to keep in inventory.
			Config.RejuvBuffer = 0; // Number of rejuvenation potions to keep in inventory.
		}
	},

	61:	{	
		SkillPoints: [115],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	62:	{
		SkillPoints: [115],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	63:	{
		SkillPoints: [115],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	64:	{
		SkillPoints: [115],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	65:	{
		SkillPoints: [115],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	66:	{
		SkillPoints: [115, 115, 115, 115],
		StatPoints: [3, 3, 3, 3, 3],
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
		SkillPoints: [108],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	68:	{
		SkillPoints: [108],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	69:	{
		SkillPoints: [108],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	70:	{
		SkillPoints: [108],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	71:	{	
		SkillPoints: [108],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	72:	{
		SkillPoints: [108],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	73:	{
		SkillPoints: [108],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	74:	{
		SkillPoints: [108],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	75:	{
		SkillPoints: [108],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	76:	{
		SkillPoints: [108],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	77:	{
		SkillPoints: [108],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	78:	{
		SkillPoints: [108],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	79:	{
		SkillPoints: [108],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	80:	{
		SkillPoints: [108],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	81:	{	
		SkillPoints: [108],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	82:	{
		SkillPoints: [108],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	83:	{
		SkillPoints: [108],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	84:	{
		SkillPoints: [108],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	85:	{
		SkillPoints: [108],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	86:	{
		SkillPoints: [117],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	87:	{
		SkillPoints: [117],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	88:	{
		SkillPoints: [117],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	89:	{
		SkillPoints: [117],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	90:	{
		SkillPoints: [117],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	91:	{	
		SkillPoints: [117],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	92:	{
		SkillPoints: [117],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	93:	{
		SkillPoints: [],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	94:	{
		SkillPoints: [],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	95:	{
		SkillPoints: [],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	96:	{
		SkillPoints: [],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	97:	{
		SkillPoints: [],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	98:	{
		SkillPoints: [],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	},

	99:	{
		SkillPoints: [],
		StatPoints: [3, 3, 3, 3, 3],
		Update: function () {

		}
	}
};
