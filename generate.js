/* --- Define PanelItem class and content generator / parser for markup --- */
class PanelItem {
    constructor(type, direction = null, children = [], params = {}) {
        this.type = type;
        this.direction = direction;
        this.children = children;
        this.params = params;
    }
}
var _old = PanelItem;
PanelItem = function(...args) { return new _old(...args) };
// panel_element is used in parser - search this file for " Note* "
panel_element = $('.htmlpanel')[0]
function ParseMarkup(d, level = 0) {
    result = '';
    for (let item in d) {
        item = d[item];
        console.log('  '.repeat(level) + `Type: ${item.type}, Direction: ${item.direction}`);
        local_end = '';
        if (item.type == 'body') {
            result += "<div class=\"container htmlpanel-body\">";
			// Note*
			// Experimental: set panel size (only for 'body' type items)
            if (item.params.panel_width) { panel_element.style.width = item.params.panel_width; }
            if (item.params.panel_height) { panel_element.style.height = item.params.panel_height; }
            end = "</div>";
        } else {
            result += "<div class=\"panelitem ";
            end = "</div>";
            if (item.direction == 'row') {
                result += "row"
            } else if (item.direction == 'column') {
                result += "col"
            } else {
                result += "item"
            }
            result += "\" style=\"";
            if (item.params.color) { result += "background: " + item.params.color + ";"; }
            if (item.params.border) {
                if (['left', 'right', 'top', 'bottom'].includes(item.params.border)) {
                    result += "border-" + item.params.border + ": 1px #999 solid;";
                } else if (item.params.border == 'all') {
                    result += "border: 1px #999 solid;";
                }
            }
            if (item.params.fontSize) { result += "font-size: " + item.params.fontSize + ";"; }
            if (item.params.underline) { result += "text-decoration: underline;"; }
            if (item.params.bold) { result += "font-weight: bold;"; }
            result += '\">';
            if (item.type == 'checkbutton') {
                result += '<button class="checkbutton" onclick="' + item.params.onclick + '"></button>';
            }
            if (item.type == 'checkmark') {
                result += '<input type="checkbox" onchange="' + item.params.onclick + '">';
            }
            if (item.type == 'button') {
                result += '<button class="button" onclick="' + item.params.onclick + '">' + item.params.text + '</button>';
            }
            if (item.params.text && item.type != 'input' && item.type != 'button') {
                // result += item.params.text;
                result += '<span>' + item.params.text + '</span>';
            }
            result += local_end;
            if (item.type == 'input') {
                result += '<input placeholder="' + item.params.text + ':" onkeyup="' + item.params.onclick + '" type="text">';
            }
        }
        if (item.children.length > 0) {
            console.log('  '.repeat(level) + `Parsing children...`);
            result += ParseMarkup(item.children, level + 1);
        }
        result += end;
    }
    return result;
}
function initBody(m) {
	/* Parse markup and generate html code */
	code = formatHTML(ParseMarkup(m))
	/* Fill panel body with generated html */
	panel_body = $('.htmlpanel')[0]
	panel_body.innerHTML += code
}



/* --- User created (human readable) markup  --- */
example_markup = [
    PanelItem('body', 'column', [
        PanelItem('', 'column', [
            PanelItem('', 'row', [
                PanelItem('', 'column', [
                    PanelItem('text', '', [], { 'text': 'Test area', 'underline': true, 'bold': true, 'fontSize': '18px' }),
                    PanelItem('button', '', [], { 'onclick': "alert('Test')", 'text': 'Show alert' }),
                    PanelItem('button', '', [], { 'onclick': "highlight($('.htmlpanel'), 3)", 'text': 'Glow panel' }),
                    PanelItem('checkmark', '', [], { 'onclick': "console.log('New checkmark = ', this.checked)", 'text': 'Check test' })
                ], { 'border': 'right' }),
                PanelItem('', 'column', [
                    PanelItem('text', '', [], { 'text': 'This window', 'underline': true, 'bold': true, 'fontSize': '18px', }),
                    PanelItem('checkbutton', '', [], { 'onclick': "minimizeWindow($('.htmlpanel')[0])", 'text': 'Minimize' }),
                    PanelItem('input', '', [], { 'onclick': "titleWindow($('.htmlpanel')[0], this.value)", 'text': 'Title' })
                ])
            ])
        ])
    ], { 'panel_width': '300px' })
]

markup = example_markup;

/* Generate and fill panel body from markup */
initBody(markup);