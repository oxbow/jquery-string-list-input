/* global jQuery */

'use strict';

(function ($) {
    var _idx1 = 0;
    $.fn.stringListInput = function (options) {
        var prefix = 'string-list-input';

        var defaults = {
            // Options
            _: function _(x) {
                return x;
            },
            addText: 'Add',
            cursor: 'move',
            distance: 5,
            hide: true,
            labelText: 'Expression',
            opacity: .5,
            removeText: 'Delete',
            suggestions: [],
            // Events
            onUpdate: undefined
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
                var configurations = $('#' + prefix + '-items-' + idx1 + ' input').toArray().map(function (item) {
                    return $(item).val();
                });
                mainInput.val(JSON.stringify(configurations));
                if (settings.onUpdate != undefined) {
                    settings.onUpdate(configurations);
                }
            }

            function createItem(input) {
                var idx2 = _idx2++;
                var id_item = prefix + '-item-' + idx1 + '-' + idx2;
                var id_input = prefix + '-input-' + idx1 + '-' + idx2;
                var _ = settings._;
                $('#' + prefix + '-items-' + idx1).append('\n                    <div id="' + id_item + '" class="form-group ' + prefix + '-item">\n                        <label class="control-label requiredField">\n                            <i class="fa fa-bars"></i>\n                            <span>' + _(settings.labelText) + '</span>\n                            <button class="btn btn-xs btn-danger ' + prefix + '-delete" for="' + idx2 + '">' + _(settings.removeText) + '</button>\n                        </label>\n                        <div class="controls">\n                            <input id="' + id_input + '" class="form-control textinput textInput form-control" value="' + (input || '') + '" type="text"/>\n                        </div>\n                    </div>\n                ');
                $('#' + id_item + ' button.' + prefix + '-delete').click(function (ev) {
                    ev.preventDefault();
                    $('#' + prefix + '-item-' + idx1 + '-' + idx2).remove();
                    setItems();
                });
                $('#' + id_input).change(setItems);
                if ($.fn.textcomplete && settings.suggestions) {
                    $('#' + id_input).textcomplete([{
                        index: 1,
                        match: /\b(\w{2,})$/,
                        properties: settings.suggestions,
                        replace: function replace(mention) {
                            return mention + ' ';
                        },
                        search: function search(term, callback) {
                            callback($.map(this.properties, function (mention) {
                                return mention.indexOf(term) === 0 ? mention : null;
                            }));
                        }
                    }]);
                }
            }

            function init() {
                var _ = settings._;
                if (settings.hide) {
                    mainInput.hide();
                }
                rootInput.after('\n                    <div id="' + prefix + '-' + idx1 + '" class="' + prefix + ' form-group">\n                        <div id="' + prefix + '-items-' + idx1 + '"></div>\n                        <input id="' + prefix + '-add-' + idx1 + '" type="button" name="" value="' + _(settings.addText) + '" class="btn btn m-b"/>\n                    </div>\n                ');
                getItems().forEach(createItem);
                $('#' + prefix + '-add-' + idx1).click(function () {
                    createItem();
                    setItems();
                });
                $('#' + prefix + '-items-' + idx1).sortable({
                    // Options
                    cursor: settings.cursor,
                    distance: settings.distance,
                    opacity: settings.opacity,
                    // Events
                    update: setItems
                });
            }
            init();
        });
    };
})(jQuery);