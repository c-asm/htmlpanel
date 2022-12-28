console.log('main.js loaded')

const sleep = ms => new Promise(r => setTimeout(r, ms));

function dragElement(mainEl, dragEl) {
    console.log('Drag invoked for:');
    console.log(mainEl);
    console.log(dragEl);

    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    dragEl.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        console.log('Drag event started');
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        let new_top = (mainEl.offsetTop - pos2);
        mainEl.style.top = new_top + "px";
        let new_left = (mainEl.offsetLeft - pos1);
        mainEl.style.left = new_left + "px";
    }

    function closeDragElement() {
        console.log('Drag event set new top: ' + mainEl.style.top + ', left: ' + mainEl.style.left);
        console.log('Drag event finished');
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function formatHTML(html) {
    var tab = '\t';
    var result = '';
    var indent = '';

    html.split(/>\s*</).forEach(function(element) {
        if (element.match(/^\/\w/)) {
            indent = indent.substring(tab.length);
        }

        result += indent + '<' + element + '>\r\n';

        if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input")) {
            indent += tab;
        }
    });

    return result.substring(1, result.length - 3);
}

function minimizeWindow(element) {
    let panel_body = $(element).find('.htmlpanel-body')[0];
    if (panel_body.style.display != 'none') {
        panel_body.style.display = 'none';
    } else {
        panel_body.style.display = '';
    }
}

function closeWindow(element) {
    $(element)[0].style.display = 'none';
}

function showWindow(element) {
    $(element)[0].style.display = '';
}

function titleWindow(element, value) {
    let panel_head = $(element).find('header');
    panel_head.find('.drag-area')[0].innerHTML = value;
}

async function highlight(el, time) {
    $(el).addClass('glow');
    await sleep(time * 1000);
    $(el).removeClass('glow');
}

window.load_m = true;