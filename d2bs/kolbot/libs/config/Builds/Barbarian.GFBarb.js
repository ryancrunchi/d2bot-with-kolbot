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
		//SkillPoints: [-1],								// This doesn't matter. We don't have skill points to spend at lvl 1
		//StatPoints: [-1,-1,-1,-1,-1],						// This doesn't matter. We don't have stat points to spend at lvl 1
		Update: function () {
			Config.LowGold = 1000;
			Config.StashGold = 200;
			var attack = 0;
			Config.AttackSkill = [-1, attack, -1, attack, -1];
			Config.LowManaSkill = [0, -1];
			Config.BeltColumn = ["hp", "hp", "hp", "mp"];
			Config.MinColumn = [1, 1, 1, 0];

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
			Config.HPBuffer = 6; // Number of healing potions to keep in inventory.
			Config.MPBuffer = 0; // Number of mana potions to keep in inventory.
			Config.RejuvBuffer = 4; // Number of rejuvenation potions to keep in inventory.

			// Chicken settings
			Config.LifeChicken = 20; // Exit game if life is less or equal to designated percent.
			Config.ManaChicken = -1; // Exit game if mana is less or equal to designated percent.
			Config.MercChicken = -1; // Exit game if merc's life is less or equal to designated percent.
			Config.TownHP = 0; // Go to town if life is under designated percent.
			Config.TownMP = 0; // Go to town if mana is under designated percent.
			
			Config.ClearAnyArea.AreaList = [2,8]; // List of area ids to clear. See sdk/areas.txt

			Config.PickitFiles.push("autoequip/barbarian.goldfind.nip");
			Config.PickitFiles.push("autoequip/base.nip");

			Config.BossPriority = false; // Set to true to attack Unique/SuperUnique monsters first when clearing

			Config.FastPick = false; // Check and pick items between attacks

			Config.UseMerc = me.getQuest(2, 0) || me.diff > 0;

			Config.Cubing = me.getQuest(10, 0) || me.diff > 0;

			/*Scripts.Andariel = me.getQuest(7, 0) && Config.AutoSmurf.TeamSize < 2;
			Scripts.Countess = me.getQuest(7, 0) && Config.AutoSmurf.TeamSize < 2;
			Scripts.Duriel = me.getQuest(15, 0) && Config.AutoSmurf.TeamSize < 2;
			Scripts.Mephisto = me.getQuest(23, 0) && Config.AutoSmurf.TeamSize < 2;
				Config.Mephisto.MoatTrick = false;
				Config.Mephisto.KillCouncil = true;
				Config.Mephisto.TakeRedPortal = true;*/
		}
	},

	2:   {   
		SkillPoints: [126],
		StatPoints: [1,1,1,1,1],
		Update: function () {
			//Config.AttackSkill = [-1, 126, -1, 126, -1, -1, -1];
			Config.LowManaSkill = [0,-1];  
		}
	},

	3:   {
		SkillPoints: [130],
		StatPoints: [1,1,1,1,1],
		Update: function () {           
		}
	},

	4:   {
		SkillPoints: [127],
		StatPoints: [1,1,1,1,1],
		Update: function () {
		}
	},

	5:   {
		SkillPoints: [128],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	6:   {
		SkillPoints: [129,138],
		StatPoints: [3,3,1,1,0],
		Update: function () {
			Config.TownCheck = true; // Go to town if out of potions
		}
	},

	7:   {
		SkillPoints: [138],
		StatPoints: [3,3,1,1,0],
		Update: function () {
		}
	},

	8:   {
		SkillPoints: [138],
		StatPoints: [3,3,1,1,0],
		Update: function () {

		}
	},

	9:   {
		SkillPoints: [138],
		StatPoints: [3,3,1,1,0],
		Update: function () {
			Config.LifeChicken = 25; // Exit game if life is less or equal to designated percent.
			Config.UseHP = 45; // Drink a healing potion if life is under designated percent.
			Config.UseRejuvHP = 35;  // Drink a rejuvenation potion if life is under designated percent.
		}
	},

	10:   {
		SkillPoints: [138],
		StatPoints: [3,3,1,1,0],
		Update: function () {
			Config.StashGold = 1000;
            Config.HPBuffer = 4; // Number of healing potions to keep in inventory.
			Config.RejuvBuffer = 2; // Number of rejuvenation potions to keep in inventory.
		}
	},

	11:   {   
		SkillPoints: [138],
		StatPoints: [3,3,3,1,0],
		Update: function () {

		}
	},

	12:   {
		SkillPoints: [141],
		StatPoints: [3,3,3,1,0],
		Update: function () {

		}
	},

	13:   {
		SkillPoints: [138],
		StatPoints: [3,3,3,1,0],
		Update: function () {

		}
	},

	14:   {
		SkillPoints: [138],
		StatPoints: [3,3,3,1,0],
		Update: function () {
            Config.StashGold = 3000;
		}
	},

	15:   {
		SkillPoints: [138],
		StatPoints: [3,3,3,1,0],
		Update: function () {

		}
	},

	16:   {
		SkillPoints: [138],
		StatPoints: [3,3,3,3,1],
		Update: function () {

		}
	},

	17:   {
		SkillPoints: [137],
		StatPoints: [3,3,3,3,1],
		Update: function () {

		}
	},

	18:   {
		SkillPoints: [145,146],
		StatPoints: [3,3,3,3,1],
		Update: function () {
		}
	},

	19:   {
		SkillPoints: [146],
		StatPoints: [3,3,3,1,1],
		Update: function () {
		}
	},

	20:   {
		SkillPoints: [146],
		StatPoints: [3,3,3,1,1],
		Update: function () {
			Config.StashGold = 5000;
		}
	},

	21:   {   
		SkillPoints: [146],
		StatPoints: [3,3,3,1,1],
		Update: function () {

		}
	},

	22:   {
		SkillPoints: [146],
		StatPoints: [3,3,3,1,1],
		Update: function () {
		}
	},

	23:   {
		SkillPoints: [],
		StatPoints: [3,3,3,1,1],
		Update: function () {

		}
	},

	24:   {
		SkillPoints: [148,149],
		StatPoints: [3,3,3,1,1],
		Update: function () {

		}
	},

	25:   {
		SkillPoints: [149],
		StatPoints: [3,3,3,1,1],
		Update: function () {
		}
	},

	26:   {
		SkillPoints: [149],
		StatPoints: [3,3,3,3,1],
		Update: function () {
		}
	},

	27:   {
		SkillPoints: [149],
		StatPoints: [3,3,3,3,1],
		Update: function () {
		}
	},

	28:   {
		SkillPoints: [149],
		StatPoints: [3,3,3,3,1],
		Update: function () {
		}
	},

	29:   {
		SkillPoints: [149],
		StatPoints: [3,3,3,3,1],
		Update: function () {
		}
	},

	30:   {
		SkillPoints: [155],
		StatPoints: [3,3,3,3,1],
		Update: function () {
			//Config.AttackSkill = [-1, 154, -1, 154, -1, -1, -1];
			Config.LowManaSkill = [0,-1];	
			//Config.AutoEquip = false;			
		}
	},

	31:   {   
		SkillPoints: [149],
		StatPoints: [3,3,3,3,1],
		Update: function () {
		}
	},

	32:   {
		SkillPoints: [149],
		StatPoints: [3,3,3,3,1],
		Update: function () {
		}
	},

	33:   {
		SkillPoints: [149],
		StatPoints: [3,3,3,3,1],
		Update: function () {
		}
	},

	34:   {
		SkillPoints: [149],
		StatPoints: [3,3,3,3,1],
		Update: function () {
		}
	},

	35:   {
		SkillPoints: [149],
		StatPoints: [3,3,3,3,1],
		Update: function () {
		}
	},

	36:   {
		SkillPoints: [149],
		StatPoints: [3,3,3,3,1],
		Update: function () {

		}
	},

	37:   {
		SkillPoints: [149],
		StatPoints: [3,3,3,3,1],
		Update: function () {

		}
	},

	38:   {
		SkillPoints: [149],
		StatPoints: [3,3,3,3,1],
		Update: function () {
		}
	},

	39:   {
		SkillPoints: [149],
		StatPoints: [3,3,3,3,1],
		Update: function () {
		}
	},

	40:   {
		SkillPoints: [149],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	41:   {   
		SkillPoints: [149],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	42:   {
		SkillPoints: [149],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	43:   {
		SkillPoints: [149],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	44:   {
		SkillPoints: [149],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	45:   {
		SkillPoints: [155],
		StatPoints: [0,0,0,0,0],
		Update: function () {
			Config.BeltColumn = ["hp", "hp", "mp", "rv"];
		}
	},

	46:   {
		SkillPoints: [155],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	47:   {
		SkillPoints: [155],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	48:   {
		SkillPoints: [155],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	49:   {
		SkillPoints: [155],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	50:   {
		SkillPoints: [155],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	51:   {   
		SkillPoints: [155],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	52:   {
		SkillPoints: [155],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	53:   {
		SkillPoints: [155],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	54:   {
		SkillPoints: [155],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	55:   {
		SkillPoints: [155],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	56:   {
		SkillPoints: [155],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	57:   {
		SkillPoints: [155],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	58:   {
		SkillPoints: [155],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	59:   {
		SkillPoints: [155],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	60:   {
		SkillPoints: [155],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	61:   {   
		SkillPoints: [155],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	62:   {
		SkillPoints: [155],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	63:   {
		SkillPoints: [155],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	64:   {
		SkillPoints: [138],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	65:   {
		SkillPoints: [138],
		StatPoints: [0,0,0,0,0],
		Update: function () {
		}
	},

	66:   {
		SkillPoints: [138],
		StatPoints: [0,3,3,3,3],
		Update: function () {
		}
	},

	67:   {
		SkillPoints: [138],
		StatPoints: [3,3,3,3,3],
		Update: function () {
		}
	},

	68:   {
		SkillPoints: [138],
		StatPoints: [3,3,3,3,3],
		Update: function () {
		}
	},

	69:   {
		SkillPoints: [138],
		StatPoints: [3,3,3,3,3],
		Update: function () {
		}
	},

	70:   {
		SkillPoints: [138],
		StatPoints: [3,3,3,3,3],
		Update: function () {
		}
	},

	71:   {   
		SkillPoints: [138],
		StatPoints: [3,3,3,3,3],
		Update: function () {
		}
	},

	72:   {
		SkillPoints: [138],
		StatPoints: [3,3,3,3,3],
		Update: function () {
		}
	},

	73:   {
		SkillPoints: [138],
		StatPoints: [3,3,3,3,3],
		Update: function () {
		}
	},

	74:   {
		SkillPoints: [137],
		StatPoints: [3,3,3,3,3],
		Update: function () {
		}
	},

	75:   {
		SkillPoints: [137],
		StatPoints: [3,3,3,3,3],
		Update: function () {
		}
	},

	76:   {
		SkillPoints: [137],
		StatPoints: [3,3,3,3,3],
		Update: function () {
		}
	},

	77:   {
		SkillPoints: [137],
		StatPoints: [3,3,3,3,3],
		Update: function () {
		}
	},

	78:   {
		SkillPoints: [137],
		StatPoints: [3,3,3,3,3],
		Update: function () {
		}
	},

	79:   {
		SkillPoints: [137],
		StatPoints: [3,3,3,3,3],
		Update: function () {
		}
	},

	80:   {
		SkillPoints: [137],
		StatPoints: [3,3,3,3,3],
		Update: function () {
		}
	},

	81:   {   
		SkillPoints: [146],
		StatPoints: [3,3,3,3,3],
		Update: function () {
		}
	},

	82:   {
		SkillPoints: [154],
		StatPoints: [3,3,3,3,3],
		Update: function () {
		}
	},

	83:   {
		SkillPoints: [154],
		StatPoints: [3,3,3,3,3],
		Update: function () {
			;
		}
	},

	84:   {
		SkillPoints: [154],
		StatPoints: [3,3,3,3,3],
		Update: function () {

		}
	},

	85:   {
		SkillPoints: [154],
		StatPoints: [3,3,3,3,3],
		Update: function () {

		}
	},

	86:   {
		SkillPoints: [154],
		StatPoints: [3,3,3,3,3],
		Update: function () {

		}
	},

	87:   {
		SkillPoints: [154],
		StatPoints: [3,3,3,3,3],
		Update: function () {

		}
	},

	88:   {
		SkillPoints: [146],
		StatPoints: [3,3,3,3,3],
		Update: function () {

		}
	},

	89:   {
		SkillPoints: [146],
		StatPoints: [3,3,3,3,3],
		Update: function () {

		}
	},

	90:   {
		SkillPoints: [146],
		StatPoints: [3,3,3,3,3],
		Update: function () {

		}
	},

	91:   {   
		SkillPoints: [130],
		StatPoints: [3,3,3,3,3],
		Update: function () {

		}
	},

	92:   {
		SkillPoints: [130],
		StatPoints: [3,3,3,3,3],
		Update: function () {

		}
	},

	93:   {
		SkillPoints: [130],
		StatPoints: [3,3,3,3,3],
		Update: function () {

		}
	},

	94:   {
		SkillPoints: [130],
		StatPoints: [3,3,3,3,3],
		Update: function () {

		}
	},

	95:   {
		SkillPoints: [130],
		StatPoints: [3,3,3,3,3],
		Update: function () {

		}
	},

	96:   {
		SkillPoints: [130],
		StatPoints: [3,3,3,3,3],
		Update: function () {

		}
	},

	97:   {
		SkillPoints: [130],
		StatPoints: [3,3,3,3,3],
		Update: function () {

		}
	},

	98:   {
		SkillPoints: [130],
		StatPoints: [3,3,3,3,3],
		Update: function () {

		}
	},

	99:   {
		SkillPoints: [130],
		StatPoints: [3,3,3,3,3],
		Update: function () {

		}
	}
};
