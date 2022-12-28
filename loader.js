(async function() {
    var panelStaticRoot = 'https://cdn.jsdelivr.net/gh/c-asm/htmlpanel'
    var panelStaticRoot = '.'

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    function createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        // console.log(htmlString.trim());
        // console.log(div, div.childNodes);
        // Change this to div.childNodes to support multiple top-level nodes.
        // return div.firstChild;
        return div.childNodes;
    }


    function createPanel(parent_el, markup) {
        let preload = createElementFromHTML(`<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js">    </script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
		<link rel="stylesheet" href="${panelStaticRoot}/main.css"><script src="${panelStaticRoot}/main.js"></script>`);
        let main_load = createElementFromHTML(`
		<header><div class="drag-area"> Window title </div><div class="button-area"><i class="fa-solid fa-minus"></i></div><div class="button-area"><i class="fa-solid fa-xmark"></i></div></header>
		<script src="${panelStaticRoot}/init_logic.js"></script>
		<script src="${panelStaticRoot}/generate.js"></script>`);
        parent_el.innerHTML += '<!-- HTML PANEL START -->';

        [...preload].forEach((e) => {
            if (e.tagName == 'SCRIPT') {
                console.log('Loading script...', e);
                var fileref = document.createElement('script');
                fileref.setAttribute("type", "text/javascript");
                fileref.setAttribute("src", e.src);
                fileref.innerHTML = e.innerHTML;
                // document.getElementsByTagName("head")[0].appendChild(fileref);
                parent_el.appendChild(fileref);
            } else {
                console.log('Loading element...', e);
                parent_el.appendChild(e);
            }
        });
        panelbody = document.createElement('div');
        panelbody.className = 'htmlpanel';
        parent_el.appendChild(panelbody);
        [...main_load].forEach((e) => {
            if (e.tagName == 'SCRIPT') {
                console.log('Loading script...', e);
                var fileref = document.createElement('script');
                fileref.setAttribute("type", "text/javascript");
                fileref.setAttribute("src", e.src);
                fileref.innerHTML = e.innerHTML;
                // document.getElementsByTagName("head")[0].appendChild(fileref);
                panelbody.appendChild(fileref);
            } else {
                console.log('Loading element...', e);
                panelbody.appendChild(e);
            }
        });
        parent_el.innerHTML += '<!-- HTML PANEL END -->';
    }

    createPanel(document.body, null);

    // wait for everything to load
    window.load_g = false;
    window.load_m = false;
    window.load_2 = false;
	window.panel_loaded = false;
    while (!(window.load_g && window.load_m && window.load_2)) {
        await sleep(50);
    }
	window.panel_loaded = true;
    console.log('init finished')
})();