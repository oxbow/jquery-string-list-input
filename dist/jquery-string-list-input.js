"use strict";!function(t){var n=0;t.fn.stringListInput=function(e){var i="string-list-input",a={_:function(t){return t},addText:"Add",cursor:"move",distance:5,hide:!0,labelText:"Expression",opacity:.5,removeText:"Delete",suggestions:[],onUpdate:void 0},r=t.extend({},a,e);this.each(function(e,a){function o(){return JSON.parse(a.val())}function s(){var n=t("#"+i+"-items-"+e+" input").toArray().map(function(n){return t(n).val()});a.val(JSON.stringify(n)),void 0!=r.onUpdate&&r.onUpdate(n)}function c(n){var a=u++,o=i+"-item-"+e+"-"+a,c=i+"-input-"+e+"-"+a,d=r._;t("#"+i+"-items-"+e).append('\n                    <div id="'+o+'" class="form-group '+i+'-item">\n                        <label class="control-label requiredField">\n                            <i class="fa fa-bars"></i>\n                            <span>'+d(r.labelText)+'</span>\n                            <button class="btn btn-xs btn-danger '+i+'-delete" for="'+a+'">'+d(r.removeText)+'</button>\n                        </label>\n                        <div class="controls">\n                            <input id="'+c+'" class="form-control textinput textInput form-control" value="'+(n||"")+'" type="text"/>\n                        </div>\n                    </div>\n                '),t("#"+o+" button."+i+"-delete").click(function(n){n.preventDefault(),t("#"+i+"-item-"+e+"-"+a).remove(),s()}),t("#"+c).change(s),t.fn.textcomplete&&r.suggestions&&t("#"+c).textcomplete([{index:1,match:/\b(\w{2,})$/,properties:r.suggestions,replace:function(t){return t+" "},search:function(n,e){e(t.map(this.properties,function(t){return 0===t.indexOf(n)?t:null}))}}])}var u=0;e=n++,a=t(a);var d=a.parent();!function(){var n=r._;r.hide&&a.hide(),d.after('\n                    <div id="'+i+"-"+e+'" class="'+i+' form-group">\n                        <div id="'+i+"-items-"+e+'"></div>\n                        <input id="'+i+"-add-"+e+'" type="button" name="" value="'+n(r.addText)+'" class="btn btn m-b"/>\n                    </div>\n                '),o().forEach(c),t("#"+i+"-add-"+e).click(function(){c(),s()}),t("#"+i+"-items-"+e).sortable({cursor:r.cursor,distance:r.distance,opacity:r.opacity,update:s})}()})}}(jQuery);