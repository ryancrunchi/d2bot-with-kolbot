/**
*	@filename	HeartBeat.js
*	@author		kolton
*	@desc		Keep a link with d2bot#. If it's lost, the d2 window is killed
*/

include("oog.js");
include("json2.js");
include("common/misc.js");
include("common/Enums.js");

function main() {
	D2Bot.init();
	print("Heartbeat loaded");

	function togglePause() {
		var script = getScript();

		if (script) {
			do {
				if (script.name.indexOf(".dbj") > -1) {
					if (script.running) {
						print(ColorCodes.RED + "Pausing " + ColorCodes.WHITE + script.name);
						script.pause();
					} else {
						print(ColorCodes.NEON_GREEN + "Resuming " + ColorCodes.WHITE + script.name);
						script.resume();
					}
				}
			} while (script.getNext());
		}

		return true;
	}

	// Event functions
	function KeyEvent(key) {
		switch (key) {
		case 19:
			if (me.ingame) {
				break;
			}

			togglePause();

			break;
		}
	}

	addEventListener("keyup", KeyEvent);

	while (true) {
		D2Bot.heartBeat();
		delay(1000);
	}
}