/* global jQuery */

'use strict';

(function ($) {
    var _idx1 = 0;
    $.fn.stringListInput = function (options) {
        const prefix = 'string-list-input';

        var defaults = {
            // Options
            _: function(x) {return x;},
            addText: 'Add',
            cursor: 'move',
            distance: 5,
            hide: true,
            labelText: 'Expression',
            opacity: .5,
            removeText: 'Delete',
            suggestions: [],
            // Events
            onUpdate: undefined,
        };

        var settings = $.extend({}, defaults, options);
        this.each(function (idx1, mainInput) {
            var _idx2 = 0;
            idx1 = _idx1++;
            mainInput = $(mainInput);
            var rootInput = mainInput.parent();

            function getItems() {
                return JSON.parse(mainInput.val());
            }

            function setItems() {
                const configurations = $(`#${prefix}-items-${idx1} input`).toArray().map(item => $(item).val());
                mainInput.val(JSON.stringify(configurations));
                if (settings.onUpdate != undefined) {
                    settings.onUpdate(configurations);
                }
            }

            function createItem(input) {
                const idx2 = _idx2++;
                const id_item = `${prefix}-item-${idx1}-${idx2}`;
                const id_input = `${prefix}-input-${idx1}-${idx2}`;
                const _ = settings._;
                $(`#${prefix}-items-${idx1}`).append(`
                    <div id="${id_item}" class="form-group ${prefix}-item">
                        <label class="control-label requiredField">
                            <i class="fa fa-bars"></i>
                            <span>${_(settings.labelText)}</span>
                            <button class="btn btn-xs btn-danger ${prefix}-delete" for="${idx2}">${_(settings.removeText)}</button>
                        </label>
                        <div class="controls">
                            <input id="${id_input}" class="form-control textinput textInput form-control" value="${input || ''}" type="text"/>
                        </div>
                    </div>
                `);
                $(`#${id_item} button.${prefix}-delete`).click(function(ev) {
                    ev.preventDefault();
                    $(`#${prefix}-item-${idx1}-${idx2}`).remove();
                    setItems();
                });
                $(`#${id_input}`).change(setItems);
                if ($.fn.textcomplete && settings.suggestions) {
                    $(`#${id_input}`).textcomplete([{
                        index: 1,
                        match: /\b(\w{2,})$/,
                        properties: settings.suggestions,
                        replace: mention => mention + ' ',
                        search: function (term, callback) {
                            callback($.map(this.properties, function (mention) {
                                return mention.indexOf(term) === 0 ? mention : null;
                            }));
                        },
                    }]);
                }
            }

            function init() {
                const _ = settings._;
                if (settings.hide) {
                    mainInput.hide();
                }
                rootInput.after(`
                    <div id="${prefix}-${idx1}" class="${prefix} form-group">
                        <div id="${prefix}-items-${idx1}"></div>
                        <input id="${prefix}-add-${idx1}" type="button" name="" value="${_(settings.addText)}" class="btn btn m-b"/>
                    </div>
                `);
                getItems().forEach(createItem);
                $(`#${prefix}-add-${idx1}`).click(function() {
                    createItem();
                    setItems();
                });
                $(`#${prefix}-items-${idx1}`).sortable({
                    // Options
                    cursor: settings.cursor,
                    distance: settings.distance,
                    opacity: settings.opacity,
                    // Events
                    update: setItems,
                });
            }
            init();
        });
    };
})(jQuery);
