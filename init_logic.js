function createHandlers(panel) {
	console.log('Found jquery:', jQuery, $);
	panel.ready(
		function() {
			/* Make panel draggable */
			// let panel = $(panel);
			dragElement(panel[0], $('div.htmlpanel>header>.drag-area')[0]);
			/* Assign button actions */
			let buttons = $('.button-area');
			$(buttons[0]).on('click', () => minimizeWindow(panel));
			$(buttons[1]).on('click', () => closeWindow(panel));
			/* Log */
			console.log('Window created');
			window.load_2 = true;
		}
	);
}

(async function() {
    console.log('js logic loading');
    function waitforjquery() {
        if (window.jQuery && window.load_m) {
			createHandlers($('div.htmlpanel'));
        } else {
            setTimeout(function() { waitforjquery() }, 100);
        }
    }
    waitforjquery();
})();