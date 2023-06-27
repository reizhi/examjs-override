/**
 * jQuery JSON plugin 2.4.0
 *
 * @author Brantley Harris, 2009-2011
 * @author Timo Tijhof, 2011-2012
 * @source This plugin is heavily influenced by MochiKit's serializeJSON, which is
 *         copyrighted 2005 by Bob Ippolito.
 * @source Brantley Harris wrote this plugin. It is based somewhat on the JSON.org
 *         website's http://www.json.org/json2.js, which proclaims:
 *         "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
 *         I uphold.
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 */

/******************************************
 * Websanova.com
 *
 * Resources for web entrepreneurs
 *
 * @author          Websanova
 * @copyright       Copyright (c) 2012 Websanova.
 * @license         This websanova wInput jQuery plug-in is dual licensed under the MIT and GPL licenses.
 * @link            http://www.websanova.com
 * @github          http://github.com/websanova/wInput
 * @version         Version 1.1.1
 *
 ******************************************/

//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

/**
 * @license RequireJS text 2.0.10 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

(function(e) {
    e.extend({
        xhrPost: function(t, n) {
            return e.post(baseUrl + t, n, "text")
        },
        rpcPost: function(t, n) {
            n = e.toJSON(n);
            var r = e.ajax({
                url: baseUrl + t,
                type: "POST",
                contentType: "application/json; charset=UTF-8",
                dataType: "text",
                data: n
            });
            return r
        },
        xhrPostJSON: function(t, n, r) {
            var i = this
              , s = e.ajax({
                url: baseUrl + t,
                type: "POST",
                dataType: "json",
                data: n,
                beforeSend: function(e, t) {
                    r && i._showLoading(200)
                },
                complete: function(e, t) {
                    r && i._hideLoading()
                }
            });
            return s
        },
        xhrGetNoLoading: function(t) {
            return e.get(baseUrl + t)
        },
        xhrGet: function(t, n) {
            var r = this
              , i = e.ajax({
                url: baseUrl + t,
                type: "GET",
                beforeSend: function(e, t) {
                    n && r._showLoading(200)
                },
                complete: function(e, t) {
                    n && r._hideLoading()
                }
            });
            return i
        },
        xhrGetJSON: function(t, n) {
            var r = this
              , i = e.ajax({
                url: baseUrl + t,
                type: "GET",
                dataType: "json",
                beforeSend: function(e, t) {
                    n && r._showLoading(200)
                },
                complete: function(e, t) {
                    n && r._hideLoading()
                }
            });
            return i
        },
        ajaxFormSubmit: function(t) {
            return e("#frmUpload").ajaxSubmit(t)
        },
        _getLoader: function() {
            return e("#loading").length > 0 || e("body").append('<div id="loading"></div>'),
            e("#loading")
        },
        _showLoading: function(t) {
            if (this._loadMsg)
                return;
            this._loadMsg = setTimeout(e.proxy(function() {
                this._getLoader().show(),
                this._loadMsg = 0
            }, this), t)
        },
        _hideLoading: function() {
            clearTimeout(this._loadMsg),
            this._loadMsg = 0,
            this._getLoader().hide()
        }
    })
}
)(jQuery),
define("ajax", ["jquery"], function(e) {
    return function() {
        var t, n;
        return t || e.ajax
    }
}(this)),
function($) {
    Function.prototype.ligerExtend = function(e, t) {
        if (typeof e != "function")
            return this;
        this.base = e.prototype,
        this.base.constructor = e;
        var n = function() {};
        n.prototype = e.prototype,
        this.prototype = new n,
        this.prototype.constructor = this,
        t && $.extend(this.prototype, t)
    }
    ,
    Function.prototype.ligerDefer = function(e, t, n) {
        var r = this;
        return setTimeout(function() {
            r.apply(e, n || [])
        }, t)
    }
    ,
    window.liger = $.ligerui = {
        version: "V1.2.0",
        managerCount: 0,
        managers: {},
        managerIdPrev: "ligerui",
        autoNewId: !0,
        error: {
            managerIsExist: "管理器id已经存在"
        },
        pluginPrev: "liger",
        getId: function(e) {
            e = e || this.managerIdPrev;
            var t = e + (1e3 + this.managerCount);
            return this.managerCount++,
            t
        },
        add: function(e) {
            if (arguments.length == 2) {
                var t = arguments[1];
                t.id = t.id || t.options.id || arguments[0].id,
                this.addManager(t);
                return
            }
            e.id || (e.id = this.getId(e.__idPrev())),
            this.managers[e.id] && (e.id = this.getId(e.__idPrev()));
            if (this.managers[e.id])
                throw new Error(this.error.managerIsExist);
            this.managers[e.id] = e
        },
        remove: function(e) {
            if (typeof e == "string" || typeof e == "number")
                delete liger.managers[e];
            else if (typeof e == "object")
                if (e instanceof liger.core.Component)
                    delete liger.managers[e.id];
                else {
                    if (!$(e).attr(this.idAttrName))
                        return !1;
                    delete liger.managers[$(e).attr(this.idAttrName)]
                }
        },
        get: function(e, t) {
            t = t || "ligeruiid";
            if (typeof e == "string" || typeof e == "number")
                return liger.managers[e];
            if (typeof e == "object") {
                var n = e.length ? e[0] : e
                  , r = n[t] || $(n).attr(t);
                return r ? liger.managers[r] : null
            }
            return null
        },
        find: function(e) {
            var t = [];
            for (var n in this.managers) {
                var r = this.managers[n];
                e instanceof Function ? r instanceof e && t.push(r) : e instanceof Array ? $.inArray(r.__getType(), e) != -1 && t.push(r) : r.__getType() == e && t.push(r)
            }
            return t
        },
        run: function(e, t, n) {
            if (!e)
                return;
            n = $.extend({
                defaultsNamespace: "ligerDefaults",
                methodsNamespace: "ligerMethods",
                controlNamespace: "controls",
                idAttrName: "ligeruiid",
                isStatic: !1,
                hasElement: !0,
                propertyToElemnt: null
            }, n || {}),
            e = e.replace(/^ligerGet/, ""),
            e = e.replace(/^liger/, "");
            if (this == null || this == window || n.isStatic)
                return liger.plugins[e] || (liger.plugins[e] = {
                    fn: $[liger.pluginPrev + e],
                    isStatic: !0
                }),
                new $.ligerui[n.controlNamespace][e]($.extend({}, $[n.defaultsNamespace][e] || {}, $[n.defaultsNamespace][e + "String"] || {}, t.length > 0 ? t[0] : {}));
            liger.plugins[e] || (liger.plugins[e] = {
                fn: $.fn[liger.pluginPrev + e],
                isStatic: !1
            });
            if (/Manager$/.test(e))
                return liger.get(this, n.idAttrName);
            this.each(function() {
                if (this[n.idAttrName] || $(this).attr(n.idAttrName)) {
                    var r = liger.get(this[n.idAttrName] || $(this).attr(n.idAttrName));
                    r && t.length > 0 && r.set(t[0]);
                    return
                }
                if (t.length >= 1 && typeof t[0] == "string")
                    return;
                var i = t.length > 0 ? t[0] : null
                  , s = $.extend({}, $[n.defaultsNamespace][e], $[n.defaultsNamespace][e + "String"], i);
                n.propertyToElemnt && (s[n.propertyToElemnt] = this),
                n.hasElement ? new $.ligerui[n.controlNamespace][e](this,s) : new $.ligerui[n.controlNamespace][e](s)
            });
            if (this.length == 0)
                return null;
            if (t.length == 0)
                return liger.get(this, n.idAttrName);
            if (typeof t[0] == "object")
                return liger.get(this, n.idAttrName);
            if (typeof t[0] == "string") {
                var r = liger.get(this, n.idAttrName);
                if (r == null)
                    return;
                if (t[0] != "option") {
                    var i = t[0];
                    if (!r[i])
                        return;
                    var s = Array.apply(null, t);
                    return s.shift(),
                    r[i].apply(r, s)
                }
                if (t.length == 2)
                    return r.get(t[1]);
                if (t.length >= 3)
                    return r.set(t[1], t[2])
            }
            return null
        },
        defaults: {},
        methods: {},
        core: {},
        controls: {},
        plugins: {}
    },
    $.ligerDefaults = {},
    $.ligerMethos = {},
    liger.defaults = $.ligerDefaults,
    liger.methods = $.ligerMethos,
    $.fn.liger = function(e) {
        return e ? liger.run.call(this, e, arguments) : liger.get(this)
    }
    ,
    liger.core.Component = function(e) {
        this.events = this.events || {},
        this.options = e || {},
        this.children = {}
    }
    ,
    $.extend(liger.core.Component.prototype, {
        __getType: function() {
            return "liger.core.Component"
        },
        __idPrev: function() {
            return "ligerui"
        },
        set: function(e, t) {
            if (!e)
                return;
            if (typeof e == "object") {
                var n;
                this.options != e ? ($.extend(this.options, e),
                n = e) : n = $.extend({}, e);
                if (t == undefined || t == 1)
                    for (var r in n)
                        r.indexOf("on") == 0 && this.set(r, n[r]);
                if (t == undefined || t == 0)
                    for (var r in n)
                        r.indexOf("on") != 0 && this.set(r, n[r]);
                return
            }
            var i = e;
            if (i.indexOf("on") == 0) {
                typeof t == "function" && this.bind(i.substr(2), t);
                return
            }
            this.options || (this.options = {});
            if (this.trigger("propertychange", [e, t]) == 0)
                return;
            this.options[i] = t;
            var s = "_set" + i.substr(0, 1).toUpperCase() + i.substr(1);
            this[s] && this[s].call(this, t),
            this.trigger("propertychanged", [e, t])
        },
        get: function(e) {
            var t = "_get" + e.substr(0, 1).toUpperCase() + e.substr(1);
            return this[t] ? this[t].call(this, e) : this.options[e]
        },
        hasBind: function(e) {
            var t = e.toLowerCase()
              , n = this.events[t];
            return n && n.length ? !0 : !1
        },
        trigger: function(e, t) {
            if (!e)
                return;
            var n = e.toLowerCase()
              , r = this.events[n];
            if (!r)
                return;
            t = t || [],
            t instanceof Array == 0 && (t = [t]);
            for (var i = 0; i < r.length; i++) {
                var s = r[i];
                if (s.handler.apply(s.context, t) == 0)
                    return !1
            }
        },
        bind: function(e, t, n) {
            if (typeof e == "object") {
                for (var r in e)
                    this.bind(r, e[r]);
                return
            }
            if (typeof t != "function")
                return !1;
            var i = e.toLowerCase()
              , s = this.events[i] || [];
            n = n || this,
            s.push({
                handler: t,
                context: n
            }),
            this.events[i] = s
        },
        unbind: function(e, t) {
            if (!e) {
                this.events = {};
                return
            }
            var n = e.toLowerCase()
              , r = this.events[n];
            if (!r || !r.length)
                return;
            if (!t)
                delete this.events[n];
            else
                for (var i = 0, s = r.length; i < s; i++)
                    if (r[i].handler == t) {
                        r.splice(i, 1);
                        break
                    }
        },
        destroy: function() {
            liger.remove(this)
        }
    }),
    liger.core.UIComponent = function(e, t) {
        liger.core.UIComponent.base.constructor.call(this, t);
        var n = this._extendMethods();
        n && $.extend(this, n),
        this.element = e,
        this._init(),
        this._preRender(),
        this.trigger("render"),
        this._render(),
        this.trigger("rendered"),
        this._rendered()
    }
    ,
    liger.core.UIComponent.ligerExtend(liger.core.Component, {
        __getType: function() {
            return "liger.core.UIComponent"
        },
        _extendMethods: function() {},
        _init: function() {
            this.type = this.__getType(),
            this.element ? this.id = this.options.id || this.element.id || liger.getId(this.__idPrev()) : this.id = this.options.id || liger.getId(this.__idPrev()),
            liger.add(this);
            if (!this.element)
                return;
            var attributes = this.attr();
            if (attributes && attributes instanceof Array)
                for (var i = 0; i < attributes.length; i++) {
                    var name = attributes[i];
                    this.options[name] = $(this.element).attr(name)
                }
            var p = this.options;
            if ($(this.element).attr("ligerui"))
                try {
                    var attroptions = $(this.element).attr("ligerui");
                    attroptions.indexOf("{") != 0 && (attroptions = "{" + attroptions + "}"),
                    eval("attroptions = " + attroptions + ";"),
                    attroptions && $.extend(p, attroptions)
                } catch (e) {}
        },
        _preRender: function() {},
        _render: function() {},
        _rendered: function() {
            this.element && $(this.element).attr("ligeruiid", this.id)
        },
        attr: function() {
            return []
        },
        destroy: function() {
            this.element && $(this.element).remove(),
            this.options = null,
            liger.remove(this)
        }
    }),
    liger.controls.Input = function(e, t) {
        liger.controls.Input.base.constructor.call(this, e, t)
    }
    ,
    liger.controls.Input.ligerExtend(liger.core.UIComponent, {
        __getType: function() {
            return "liger.controls.Input"
        },
        attr: function() {
            return ["nullText"]
        },
        setValue: function(e) {
            return this.set("value", e)
        },
        getValue: function() {
            return this.get("value")
        },
        _setReadonly: function(e) {
            var t = this.wrapper || this.text;
            if (!t || !t.hasClass("l-text"))
                return;
            var n = this.inputText;
            e ? (n && n.attr("readonly", "readonly"),
            t.addClass("l-text-readonly")) : (n && n.removeAttr("readonly"),
            t.removeClass("l-text-readonly"))
        },
        setEnabled: function() {
            return this.set("disabled", !1)
        },
        setDisabled: function() {
            return this.set("disabled", !0)
        },
        updateStyle: function() {},
        resize: function(e, t) {
            this.set({
                width: e,
                height: t
            })
        }
    }),
    liger.win = {
        top: !1,
        mask: function(e) {
            function t() {
                if (!liger.win.windowMask)
                    return;
                var e = $(document).width()
                  , t = $(window).width() + $(window).scrollLeft();
                t < e ? w = e : w = t,
                liger.win.windowMask.width(w)
            }
            function n() {
                if (!liger.win.windowMask)
                    return;
                var e = $(document).height() - 1
                  , t = $(window).height() + $(window).scrollTop();
                t < e ? h = e : h = t,
                liger.win.windowMask.height(h)
            }
            this.windowMask || (this.windowMask = $("<div class='l-window-mask' style='display: block;'></div>").appendTo("body"),
            $(window).bind("resize.ligeruiwin", n),
            $(window).bind("scroll", n)),
            this.windowMask.show(),
            t(),
            n(),
            this.masking = !0
        },
        unmask: function(e) {
            var t = $("body > .l-dialog:visible,body > .l-window:visible");
            for (var n = 0, r = t.length; n < r; n++) {
                var i = t.eq(n).attr("ligeruiid");
                if (e && e.id == i)
                    continue;
                var s = liger.get(i);
                if (!s)
                    continue;
                var o = s.get("modal");
                if (o)
                    return
            }
            this.windowMask && this.windowMask.hide(),
            this.masking = !1
        },
        createTaskbar: function() {
            return this.taskbar || (this.taskbar = $('<div class="l-taskbar"><div class="l-taskbar-tasks"></div><div class="l-clear"></div></div>').appendTo("body"),
            this.top && this.taskbar.addClass("l-taskbar-top"),
            this.taskbar.tasks = $(".l-taskbar-tasks:first", this.taskbar),
            this.tasks = {}),
            this.taskbar.show(),
            this.taskbar.animate({
                bottom: 0
            }),
            this.taskbar
        },
        removeTaskbar: function() {
            var e = this;
            e.taskbar.animate({
                bottom: -32
            }, function() {
                e.taskbar.remove(),
                e.taskbar = null
            })
        },
        activeTask: function(e) {
            for (var t in this.tasks) {
                var n = this.tasks[t];
                t == e.id ? n.addClass("l-taskbar-task-active") : n.removeClass("l-taskbar-task-active")
            }
        },
        getTask: function(e) {
            var t = this;
            if (!t.taskbar)
                return;
            return t.tasks[e.id] ? t.tasks[e.id] : null
        },
        addTask: function(e) {
            var t = this;
            t.taskbar || t.createTaskbar();
            if (t.tasks[e.id])
                return t.tasks[e.id];
            var n = e.get("title")
              , r = t.tasks[e.id] = $('<div class="l-taskbar-task"><div class="l-taskbar-task-icon"></div><div class="l-taskbar-task-content">' + n + "</div></div>");
            return t.taskbar.tasks.append(r),
            t.activeTask(e),
            r.bind("click", function() {
                t.activeTask(e),
                e.actived ? e.min() : e.active()
            }).hover(function() {
                $(this).addClass("l-taskbar-task-over")
            }, function() {
                $(this).removeClass("l-taskbar-task-over")
            }),
            r
        },
        hasTask: function() {
            for (var e in this.tasks)
                if (this.tasks[e])
                    return !0;
            return !1
        },
        removeTask: function(e) {
            var t = this;
            if (!t.taskbar)
                return;
            t.tasks[e.id] && (t.tasks[e.id].unbind(),
            t.tasks[e.id].remove(),
            delete t.tasks[e.id]),
            t.hasTask() || t.removeTaskbar()
        },
        setFront: function(e) {
            var t = liger.find(liger.core.Win);
            for (var n in t) {
                var r = t[n];
                r == e ? ($(r.element).css("z-index", "9200"),
                this.activeTask(r)) : $(r.element).css("z-index", "9100")
            }
        }
    },
    liger.core.Win = function(e, t) {
        liger.core.Win.base.constructor.call(this, e, t)
    }
    ,
    liger.core.Win.ligerExtend(liger.core.UIComponent, {
        __getType: function() {
            return "liger.controls.Win"
        },
        mask: function() {
            this.options.modal && liger.win.mask(this)
        },
        unmask: function() {
            this.options.modal && liger.win.unmask(this)
        },
        min: function() {},
        max: function() {},
        active: function() {}
    }),
    liger.draggable = {
        dragging: !1
    },
    liger.resizable = {
        reszing: !1
    },
    liger.toJSON = typeof JSON == "object" && JSON.stringify ? JSON.stringify : function(e) {
        var t = function(e) {
            return e < 10 ? "0" + e : e
        }
          , n = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
          , r = function(e) {
            return n.lastIndex = 0,
            n.test(e) ? '"' + e.replace(n, function(e) {
                var t = meta[e];
                return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        };
        if (e === null)
            return "null";
        var i = typeof e;
        if (i === "undefined")
            return undefined;
        if (i === "string")
            return r(e);
        if (i === "number" || i === "boolean")
            return "" + e;
        if (i === "object") {
            if (typeof e.toJSON == "function")
                return liger.toJSON(e.toJSON());
            if (e.constructor === Date)
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + t(this.getUTCMonth() + 1) + "-" + t(this.getUTCDate()) + "T" + t(this.getUTCHours()) + ":" + t(this.getUTCMinutes()) + ":" + t(this.getUTCSeconds()) + "Z" : null;
            var s = [];
            if (e.constructor === Array) {
                for (var o = 0, u = e.length; o < u; o++)
                    s.push(liger.toJSON(e[o]) || "null");
                return "[" + s.join(",") + "]"
            }
            var a, f;
            for (var l in e) {
                i = typeof l;
                if (i === "number")
                    a = '"' + l + '"';
                else {
                    if (i !== "string")
                        continue;
                    a = r(l)
                }
                i = typeof e[l];
                if (i === "function" || i === "undefined")
                    continue;
                f = liger.toJSON(e[l]),
                s.push(a + ":" + f)
            }
            return "{" + s.join(",") + "}"
        }
    }
    ,
    liger.getEditor = function(e) {
        var t = e.type
          , n = e.control;
        return t ? (n && (n = n.substr(0, 1).toUpperCase() + n.substr(1)),
        $.extend({
            create: function(r, i, s) {
                var o = i.field || i.column
                  , u = s || {}
                  , a = $.extend({}, e.options)
                  , f = $("<input type='text'/>");
                e.body && (f = e.body.clone()),
                f.appendTo(r);
                if (i.field) {
                    var l = o.name;
                    $.inArray(t, ["select", "combobox", "autocomplete", "popup"]) != -1 && (l = o.textField || o.comboboxName),
                    $.inArray(t, ["select", "combobox", "autocomplete", "popup", "radiolist", "checkboxlist", "listbox"]) != -1 && (a.valueFieldID = (u.prefixID || "") + o.name),
                    a.id = (u.prefixID || "") + o.name;
                    if (!e.body) {
                        var c = (u.prefixID || "") + l;
                        f.attr({
                            id: o.id || c,
                            name: c
                        })
                    }
                    $.extend(a, o.options)
                }
                if (o.editor) {
                    $.extend(a, o.editor.options),
                    o.editor.valueColumnName && (a.valueField = o.editor.valueColumnName),
                    o.editor.displayColumnName && (a.textField = o.editor.displayColumnName);
                    if (n) {
                        var h = liger.defaults[n];
                        for (var p in h)
                            p in o.editor && (a[p] = o.editor[p])
                    }
                    var d = o.editor.p || o.editor.ext;
                    d = typeof d == "function" ? d(i) : d,
                    $.extend(a, d)
                }
                return f["liger" + n](a)
            },
            getValue: function(e, t) {
                if (e.getValue)
                    return e.getValue()
            },
            setValue: function(e, t, n) {
                e.setValue && e.setValue(t)
            },
            getText: function(e, t) {
                if (e.getText)
                    return e.getText()
            },
            setText: function(e, t, n) {
                e.setText && e.setText(t)
            },
            getSelected: function(e, t) {
                if (e.getSelected)
                    return e.getSelected()
            },
            resize: function(e, t, n, r) {
                r.field && (t -= 2),
                e.resize && e.resize(t, n)
            },
            destroy: function(e, t) {
                e.destroy && e.destroy()
            }
        }, e)) : null
    }
    ,
    liger.editors = {
        text: {
            control: "TextBox"
        },
        date: {
            control: "DateEditor",
            setValue: function(editor, value, editParm) {
                typeof value == "string" && /^\/Date/.test(value) && (value = value.replace(/^\//, "new ").replace(/\/$/, ""),
                eval("value = " + value)),
                editor.setValue(value)
            }
        },
        combobox: {
            control: "ComboBox"
        },
        spinner: {
            control: "Spinner"
        },
        checkbox: {
            control: "CheckBox"
        },
        checkboxlist: {
            control: "CheckBoxList",
            body: $("<div></div>"),
            resize: function(e, t, n, r) {
                e.set("width", t - 2)
            }
        },
        radiolist: {
            control: "RadioList",
            body: $("<div></div>"),
            resize: function(e, t, n, r) {
                e.set("width", t - 2)
            }
        },
        listbox: {
            control: "ListBox",
            body: $("<div></div>"),
            resize: function(e, t, n, r) {
                e.set("width", t - 2)
            }
        },
        popup: {
            control: "PopupEdit"
        },
        number: {
            control: "TextBox",
            options: {
                number: !0
            }
        },
        currency: {
            control: "TextBox",
            options: {
                currency: !0
            }
        },
        digits: {
            control: "TextBox",
            options: {
                digits: !0
            }
        }
    },
    liger.editors.string = liger.editors.text,
    liger.editors.select = liger.editors.combobox,
    liger.editors["int"] = liger.editors.digits,
    liger.editors["float"] = liger.editors.number,
    liger.editors.chk = liger.editors.checkbox,
    liger.editors.popupedit = liger.editors.popup,
    $.fn.live = $.fn.on ? $.fn.on : $.fn.live;
    if (!$.browser) {
        var userAgent = navigator.userAgent.toLowerCase()
          , appVersion = navigator.appVersion;
        $.browser = {
            version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1],
            safari: /webkit/.test(userAgent),
            webkit: /webkit/.test(userAgent),
            opera: /opera/.test(userAgent),
            mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
        },
        /msie/.test(userAgent) && !/opera/.test(userAgent) ? $.browser.msie = parseFloat(appVersion.split("MSIE ")[1]) || undefined : $.browser.msie = undefined;
        var trident = parseFloat(appVersion.split("Trident/")[1]) || undefined;
        trident > 6 ? $.browser.trident = trident : $.browser.trident = undefined;
        var msedge = parseFloat(appVersion.split("Edge/")[1]) || undefined;
        msedge >= 12 ? $.browser.msedge = msedge : $.browser.msedge = undefined
    }
}(jQuery),
define("ligerBase", ["jquery"], function(e) {
    return function() {
        var t, n;
        return t || e.ligerBase
    }
}(this)),
function(e) {
    var t = e.ligerui;
    e.fn.ligerDrag = function(e) {
        return t.run.call(this, "ligerDrag", arguments, {
            idAttrName: "ligeruidragid",
            hasElement: !1,
            propertyToElemnt: "target"
        })
    }
    ,
    e.fn.ligerGetDragManager = function() {
        return t.run.call(this, "ligerGetDragManager", arguments, {
            idAttrName: "ligeruidragid",
            hasElement: !1,
            propertyToElemnt: "target"
        })
    }
    ,
    e.ligerDefaults.Drag = {
        onStartDrag: !1,
        onDrag: !1,
        onStopDrag: !1,
        handler: null,
        proxy: !0,
        revert: !1,
        animate: !0,
        onRevert: null,
        onEndRevert: null,
        receive: null,
        onDragEnter: null,
        onDragOver: null,
        onDragLeave: null,
        onDrop: null,
        disabled: !1,
        proxyX: null,
        proxyY: null
    },
    t.controls.Drag = function(e) {
        t.controls.Drag.base.constructor.call(this, null, e)
    }
    ,
    t.controls.Drag.ligerExtend(t.core.UIComponent, {
        __getType: function() {
            return "Drag"
        },
        __idPrev: function() {
            return "Drag"
        },
        _render: function() {
            var e = this
              , t = this.options;
            this.set(t),
            e.cursor = "move",
            e.handler.css("cursor", e.cursor),
            e.handler.bind("mousedown.drag", function(n) {
                if (t.disabled)
                    return;
                if (n.button == 2)
                    return;
                e._start.call(e, n)
            }).bind("mousemove.drag", function() {
                if (t.disabled)
                    return;
                e.handler.css("cursor", e.cursor)
            })
        },
        _rendered: function() {
            this.options.target.ligeruidragid = this.id
        },
        _start: function(n) {
            var r = this
              , i = this.options;
            if (r.reverting)
                return;
            if (i.disabled)
                return;
            r.current = {
                target: r.target,
                left: r.target.offset().left,
                top: r.target.offset().top,
                startX: n.pageX || n.screenX,
                startY: n.pageY || n.clientY
            };
            if (r.trigger("startDrag", [r.current, n]) == 0)
                return !1;
            r.cursor = "move",
            r._createProxy(i.proxy, n);
            if (i.proxy && !r.proxy)
                return !1;
            (r.proxy || r.handler).css("cursor", r.cursor),
            e(document).bind("selectstart.drag", function() {
                return !1
            }),
            e(document).bind("mousemove.drag", function() {
                r._drag.apply(r, arguments)
            }),
            t.draggable.dragging = !0,
            e(document).bind("mouseup.drag", function() {
                t.draggable.dragging = !1,
                r._stop.apply(r, arguments)
            })
        },
        _drag: function(t) {
            var n = this
              , r = this.options;
            if (!n.current)
                return;
            var i = t.pageX || t.screenX
              , s = t.pageY || t.screenY;
            n.current.diffX = i - n.current.startX,
            n.current.diffY = s - n.current.startY,
            (n.proxy || n.handler).css("cursor", n.cursor),
            n.receive && n.receive.each(function(r, o) {
                var u = e(o)
                  , a = u.offset();
                i > a.left && i < a.left + u.width() && s > a.top && s < a.top + u.height() ? n.receiveEntered[r] ? n.trigger("dragOver", [o, n.proxy || n.target, t]) : (n.receiveEntered[r] = !0,
                n.trigger("dragEnter", [o, n.proxy || n.target, t])) : n.receiveEntered[r] && (n.receiveEntered[r] = !1,
                n.trigger("dragLeave", [o, n.proxy || n.target, t]))
            }),
            n.hasBind("drag") ? n.trigger("drag", [n.current, t]) != 0 ? n._applyDrag() : n.proxy ? n._removeProxy() : n._stop() : n._applyDrag()
        },
        _stop: function(t) {
            var n = this
              , r = this.options;
            e(document).unbind("mousemove.drag"),
            e(document).unbind("mouseup.drag"),
            e(document).unbind("selectstart.drag"),
            n.receive && n.receive.each(function(e, r) {
                n.receiveEntered[e] && n.trigger("drop", [r, n.proxy || n.target, t])
            }),
            n.proxy && (r.revert ? n.hasBind("revert") ? n.trigger("revert", [n.current, t]) != 0 ? n._revert(t) : n._removeProxy() : n._revert(t) : (n._applyDrag(n.target),
            n._removeProxy())),
            n.cursor = "move",
            n.trigger("stopDrag", [n.current, t]),
            n.current = null,
            n.handler.css("cursor", n.cursor)
        },
        _revert: function(e) {
            var t = this;
            t.reverting = !0,
            t.proxy.animate({
                left: t.current.left,
                top: t.current.top
            }, function() {
                t.reverting = !1,
                t._removeProxy(),
                t.trigger("endRevert", [t.current, e]),
                t.current = null
            })
        },
        _applyDrag: function(e) {
            var t = this
              , n = this.options;
            e = e || t.proxy || t.target;
            var r = {}
              , i = !1
              , s = e == t.target;
            t.current.diffX && (s || n.proxyX == null ? r.left = t.current.left + t.current.diffX : r.left = t.current.startX + n.proxyX + t.current.diffX,
            i = !0),
            t.current.diffY && (s || n.proxyY == null ? r.top = t.current.top + t.current.diffY : r.top = t.current.startY + n.proxyY + t.current.diffY,
            i = !0),
            e == t.target && t.proxy && n.animate ? (t.reverting = !0,
            e.animate(r, function() {
                t.reverting = !1
            })) : e.css(r)
        },
        _setReceive: function(t) {
            this.receiveEntered = {};
            if (!t)
                return;
            typeof t == "string" ? this.receive = e(t) : this.receive = t
        },
        _setHandler: function(t) {
            var n = this
              , r = this.options;
            t ? n.handler = typeof t == "string" ? e(t, r.target) : t : n.handler = e(r.target)
        },
        _setTarget: function(t) {
            this.target = e(t)
        },
        _setCursor: function(e) {
            this.cursor = e,
            (this.proxy || this.handler).css("cursor", e)
        },
        _createProxy: function(t, n) {
            if (!t)
                return;
            var r = this
              , i = this.options;
            typeof t == "function" ? r.proxy = t.call(this.options.target, r, n) : t == "clone" ? (r.proxy = r.target.clone().css("position", "absolute"),
            r.proxy.appendTo("body")) : (r.proxy = e("<div class='l-draggable'></div>"),
            r.proxy.width(r.target.width()).height(r.target.height()),
            r.proxy.attr("dragid", r.id).appendTo("body")),
            r.proxy.css({
                left: i.proxyX == null ? r.current.left : r.current.startX + i.proxyX,
                top: i.proxyY == null ? r.current.top : r.current.startY + i.proxyY
            }).show()
        },
        _removeProxy: function() {
            var e = this;
            e.proxy && (e.proxy.remove(),
            e.proxy = null)
        }
    })
}(jQuery),
define("ligerDrag", ["jquery", "ligerBase"], function(e) {
    return function() {
        var t, n;
        return t || e.ligerDrag
    }
}(this)),
function(e) {
    function n(n) {
        for (var r in n)
            e("<img />").attr("src", t.DialogImagePath + n[r])
    }
    var t = e.ligerui;
    e.ligerDefaults.DebugString = {
        100: "Continue.&nbsp;&nbsp;初始的请求已经接受，客户应当继续发送请求的其余部分",
        101: "Switching Protocols.&nbsp;&nbsp;服务器将遵从客户的请求转换到另外一种协议",
        200: "OK.&nbsp;&nbsp;一切正常，对GET和POST请求的应答文档跟在后面",
        201: "Created.&nbsp;&nbsp;服务器已经创建了文档，Location头给出了它的URL。",
        202: "Accepted.&nbsp;&nbsp;已经接受请求，但处理尚未完成。",
        203: "Non-Authoritative Information.&nbsp;&nbsp;文档已经正常地返回，但一些应答头可能不正确，因为使用的是文档的拷贝",
        204: "No Content.&nbsp;&nbsp;没有新文档，浏览器应该继续显示原来的文档。如果用户定期地刷新页面，而Servlet可以确定用户文档足够新，这个状态代码是很有用的",
        205: "Reset Content.&nbsp;&nbsp;没有新的内容，但浏览器应该重置它所显示的内容。用来强制浏览器清除表单输入内容",
        206: "Partial Content.&nbsp;&nbsp;客户发送了一个带有Range头的GET请求，服务器完成了它",
        300: "Multiple Choices.&nbsp;&nbsp;客户请求的文档可以在多个位置找到，这些位置已经在返回的文档内列出。如果服务器要提出优先选择，则应该在Location应答头指明。",
        301: "Moved Permanently.&nbsp;&nbsp;客户请求的文档在其他地方，新的URL在Location头中给出，浏览器应该自动地访问新的URL。",
        302: "Found.&nbsp;&nbsp;类似于301，但新的URL应该被视为临时性的替代，而不是永久性的。",
        303: "See Other.&nbsp;&nbsp;类似于301/302，不同之处在于，如果原来的请求是POST，Location头指定的重定向目标文档应该通过GET提取",
        304: "Not Modified.&nbsp;&nbsp;客户端有缓冲的文档并发出了一个条件性的请求（一般是提供If-Modified-Since头表示客户只想比指定日期更新的文档）。服务器告诉客户，原来缓冲的文档还可以继续使用。",
        305: "Use Proxy.&nbsp;&nbsp;客户请求的文档应该通过Location头所指明的代理服务器提取",
        307: "Temporary Redirect.&nbsp;&nbsp;和302（Found）相同。许多浏览器会错误地响应302应答进行重定向，即使原来的请求是 POST，即使它实际上只能在POST请求的应答是303时才能重定向。由于这个原因，HTTP 1.1新增了307，以便更加清除地区分几个状态代码： 当出现303应答时，浏览器可以跟随重定向的GET和POST请求；如果是307应答，则浏览器只能跟随对GET请求的重定向。",
        400: "Bad Request.&nbsp;&nbsp;请求出现语法错误。",
        401: "Unauthorized.&nbsp;&nbsp;客户试图未经授权访问受密码保护的页面。应答中会包含一个WWW-Authenticate头，浏览器据此显示用户名字/密码对话框，然后在填写合适的Authorization头后再次发出请求。",
        403: "Forbidden.&nbsp;&nbsp;资源不可用。",
        404: "Not Found.&nbsp;&nbsp;无法找到指定位置的资源",
        405: "Method Not Allowed.&nbsp;&nbsp;请求方法（GET、POST、HEAD、Delete、PUT、TRACE等）对指定的资源不适用。",
        406: "Not Acceptable.&nbsp;&nbsp;指定的资源已经找到，但它的MIME类型和客户在Accpet头中所指定的不兼容",
        407: "Proxy Authentication Required.&nbsp;&nbsp;类似于401，表示客户必须先经过代理服务器的授权。",
        408: "Request Timeout.&nbsp;&nbsp;在服务器许可的等待时间内，客户一直没有发出任何请求。客户可以在以后重复同一请求。",
        409: "Conflict.&nbsp;&nbsp;通常和PUT请求有关。由于请求和资源的当前状态相冲突，因此请求不能成功。",
        410: "Gone.&nbsp;&nbsp;所请求的文档已经不再可用，而且服务器不知道应该重定向到哪一个地址。它和404的不同在于，返回407表示文档永久地离开了指定的位置，而404表示由于未知的原因文档不可用。",
        411: "Length Required.&nbsp;&nbsp;服务器不能处理请求，除非客户发送一个Content-Length头。",
        412: "Precondition Failed.&nbsp;&nbsp;请求头中指定的一些前提条件失败",
        413: "Request Entity Too Large.&nbsp;&nbsp;目标文档的大小超过服务器当前愿意处理的大小。如果服务器认为自己能够稍后再处理该请求，则应该提供一个Retry-After头",
        414: "Request URI Too Long.&nbsp;&nbsp;URI太长",
        416: "Requested Range Not Satisfiable.&nbsp;&nbsp;服务器不能满足客户在请求中指定的Range头",
        500: "Internal Server Error.&nbsp;&nbsp;服务器遇到了意料不到的情况，不能完成客户的请求",
        501: "Not Implemented.&nbsp;&nbsp;服务器不支持实现请求所需要的功能。例如，客户发出了一个服务器不支持的PUT请求",
        502: "Bad Gateway.&nbsp;&nbsp;服务器作为网关或者代理时，为了完成请求访问下一个服务器，但该服务器返回了非法的应答",
        503: "Service Unavailable.&nbsp;&nbsp;服务器由于维护或者负载过重未能应答。例如，Servlet可能在数据库连接池已满的情况下返回503。服务器返回503时可以提供一个Retry-After头",
        504: "Gateway Timeout.&nbsp;&nbsp;由作为代理或网关的服务器使用，表示不能及时地从远程服务器获得应答",
        505: "HTTP Version Not Supported.&nbsp;&nbsp;服务器不支持请求中所指明的HTTP版本",
        12001: "ERROR_INTERNET_OUT_OF_HANDLES.&nbsp;&nbsp;No more handles could be generated at this time.",
        12002: "ERROR_INTERNET_TIMEOUT.&nbsp;&nbsp;The request has timed out.",
        12003: "ERROR_INTERNET_EXTENDED_ERROR.&nbsp;&nbsp;An extended error was returned from the server. This is typically a string or buffer containing a verbose error message. Call InternetGetLastResponseInfo to retrieve the error text.",
        12004: "ERROR_INTERNET_INTERNAL_ERROR.&nbsp;&nbsp;An internal error has occurred.",
        12005: "ERROR_INTERNET_INVALID_URL.&nbsp;&nbsp;The URL is invalid.",
        12006: "ERROR_INTERNET_UNRECOGNIZED_SCHEME.&nbsp;&nbsp;The URL scheme could not be recognized or is not supported.",
        12007: "ERROR_INTERNET_NAME_NOT_RESOLVED.&nbsp;&nbsp;The server name could not be resolved.",
        12008: "ERROR_INTERNET_PROTOCOL_NOT_FOUND.&nbsp;&nbsp;The requested protocol could not be located.",
        12009: "ERROR_INTERNET_INVALID_OPTION.&nbsp;&nbsp;A request to InternetQueryOption or InternetSetOption specified an invalid option value.",
        12010: "ERROR_INTERNET_BAD_OPTION_LENGTH.&nbsp;&nbsp;The length of an option supplied to InternetQueryOption or InternetSetOption is incorrect for the type of option specified.",
        12011: "ERROR_INTERNET_OPTION_NOT_SETTABLE.&nbsp;&nbsp;The request option cannot be set, only queried.",
        12012: "ERROR_INTERNET_SHUTDOWN.&nbsp;&nbsp;The Win32 Internet function support is being shut down or unloaded.",
        12013: "ERROR_INTERNET_INCORRECT_USER_NAME.&nbsp;&nbsp;The request to connect and log on to an FTP server could not be completed because the supplied user name is incorrect.",
        12014: "ERROR_INTERNET_INCORRECT_PASSWORD.&nbsp;&nbsp;The request to connect and log on to an FTP server could not be completed because the supplied password is incorrect.",
        12015: "ERROR_INTERNET_LOGIN_FAILURE.&nbsp;&nbsp;The request to connect to and log on to an FTP server failed.",
        12016: "ERROR_INTERNET_INVALID_OPERATION.&nbsp;&nbsp;The requested operation is invalid.",
        12017: "ERROR_INTERNET_OPERATION_CANCELLED.&nbsp;&nbsp;The operation was canceled, usually because the handle on which the request was operating was closed before the operation completed.",
        12018: "ERROR_INTERNET_INCORRECT_HANDLE_TYPE.&nbsp;&nbsp;The type of handle supplied is incorrect for this operation.",
        12019: "ERROR_INTERNET_INCORRECT_HANDLE_STATE.&nbsp;&nbsp;The requested operation cannot be carried out because the handle supplied is not in the correct state.",
        12020: "ERROR_INTERNET_NOT_PROXY_REQUEST.&nbsp;&nbsp;The request cannot be made via a proxy.",
        12021: "ERROR_INTERNET_REGISTRY_VALUE_NOT_FOUND.&nbsp;&nbsp;A required registry value could not be located.",
        12022: "ERROR_INTERNET_BAD_REGISTRY_PARAMETER.&nbsp;&nbsp;A required registry value was located but is an incorrect type or has an invalid value.",
        12023: "ERROR_INTERNET_NO_DIRECT_ACCESS.&nbsp;&nbsp;Direct network access cannot be made at this time.",
        12024: "ERROR_INTERNET_NO_CONTEXT.&nbsp;&nbsp;An asynchronous request could not be made because a zero context value was supplied.",
        12025: "ERROR_INTERNET_NO_CALLBACK.&nbsp;&nbsp;An asynchronous request could not be made because a callback function has not been set.",
        12026: "ERROR_INTERNET_REQUEST_PENDING.&nbsp;&nbsp;The required operation could not be completed because one or more requests are pending.",
        12027: "ERROR_INTERNET_INCORRECT_FORMAT.&nbsp;&nbsp;The format of the request is invalid.",
        12028: "ERROR_INTERNET_ITEM_NOT_FOUND.&nbsp;&nbsp;The requested item could not be located.",
        12029: "ERROR_INTERNET_CANNOT_CONNECT.&nbsp;&nbsp;The attempt to connect to the server failed.",
        12030: "ERROR_INTERNET_CONNECTION_ABORTED.&nbsp;&nbsp;The connection with the server has been terminated.",
        12031: "ERROR_INTERNET_CONNECTION_RESET.&nbsp;&nbsp;The connection with the server has been reset.",
        12032: "ERROR_INTERNET_FORCE_RETRY.&nbsp;&nbsp;Calls for the Win32 Internet function to redo the request.",
        12033: "ERROR_INTERNET_INVALID_PROXY_REQUEST.&nbsp;&nbsp;The request to the proxy was invalid.",
        12036: "ERROR_INTERNET_HANDLE_EXISTS.&nbsp;&nbsp;The request failed because the handle already exists.",
        12037: "ERROR_INTERNET_SEC_CERT_DATE_INVALID.&nbsp;&nbsp;SSL certificate date that was received from the server is bad. The certificate is expired.",
        12038: "ERROR_INTERNET_SEC_CERT_CN_INVALID.&nbsp;&nbsp;SSL certificate common name (host name field) is incorrect. For example, if you entered www.server.com and the common name on the certificate says www.different.com.",
        12039: "ERROR_INTERNET_HTTP_TO_HTTPS_ON_REDIR.&nbsp;&nbsp;The application is moving from a non-SSL to an SSL connection because of a redirect.",
        12040: "ERROR_INTERNET_HTTPS_TO_HTTP_ON_REDIR.&nbsp;&nbsp;The application is moving from an SSL to an non-SSL connection because of a redirect.",
        12041: "ERROR_INTERNET_MIXED_SECURITY.&nbsp;&nbsp;Indicates that the content is not entirely secure. Some of the content being viewed may have come from unsecured servers.",
        12042: "ERROR_INTERNET_CHG_POST_IS_NON_SECURE.&nbsp;&nbsp;The application is posting and attempting to change multiple lines of text on a server that is not secure.",
        12043: "ERROR_INTERNET_POST_IS_NON_SECURE.&nbsp;&nbsp;The application is posting data to a server that is not secure.",
        12110: "ERROR_FTP_TRANSFER_IN_PROGRESS.&nbsp;&nbsp;The requested operation cannot be made on the FTP session handle because an operation is already in progress.",
        12111: "ERROR_FTP_DROPPED.&nbsp;&nbsp;The FTP operation was not completed because the session was aborted.",
        12130: "ERROR_GOPHER_PROTOCOL_ERROR.&nbsp;&nbsp;An error was detected while parsing data returned from the gopher server.",
        12131: "ERROR_GOPHER_NOT_FILE.&nbsp;&nbsp;The request must be made for a file locator.",
        12132: "ERROR_GOPHER_DATA_ERROR.&nbsp;&nbsp;An error was detected while receiving data from the gopher server.",
        12133: "ERROR_GOPHER_END_OF_DATA.&nbsp;&nbsp;The end of the data has been reached.",
        12134: "ERROR_GOPHER_INVALID_LOCATOR.&nbsp;&nbsp;The supplied locator is not valid.",
        12135: "ERROR_GOPHER_INCORRECT_LOCATOR_TYPE.&nbsp;&nbsp;The type of the locator is not correct for this operation.",
        12136: "ERROR_GOPHER_NOT_GOPHER_PLUS.&nbsp;&nbsp;The requested operation can only be made against a Gopher+ server or with a locator that specifies a Gopher+ operation.",
        12137: "ERROR_GOPHER_ATTRIBUTE_NOT_FOUND.&nbsp;&nbsp;The requested attribute could not be located.",
        12138: "ERROR_GOPHER_UNKNOWN_LOCATOR.&nbsp;&nbsp;The locator type is unknown.",
        12150: "ERROR_HTTP_HEADER_NOT_FOUND.&nbsp;&nbsp;The requested header could not be located.",
        12151: "ERROR_HTTP_DOWNLEVEL_SERVER.&nbsp;&nbsp;The server did not return any headers.",
        12152: "ERROR_HTTP_INVALID_SERVER_RESPONSE.&nbsp;&nbsp;The server response could not be parsed.",
        12153: "ERROR_HTTP_INVALID_HEADER.&nbsp;&nbsp;The supplied header is invalid.",
        12154: "ERROR_HTTP_INVALID_QUERY_REQUEST.&nbsp;&nbsp;The request made to HttpQueryInfo is invalid.",
        12155: "ERROR_HTTP_HEADER_ALREADY_EXISTS.&nbsp;&nbsp;The header could not be added because it already exists.",
        12156: "ERROR_HTTP_REDIRECT_FAILED.&nbsp;&nbsp;The redirection failed because either the scheme changed (for example, HTTP to FTP) or all attempts made to redirect failed (default is five attempts)."
    },
    e.ligerDialog = function() {
        return t.run.call(null, "ligerDialog", arguments, {
            isStatic: !0
        })
    }
    ,
    e.ligerui.DialogImagePath = "../../lib/ligerUI/skins/Aqua/images/win/",
    e.ligerDefaults.Dialog = {
        cls: null,
        id: null,
        buttons: null,
        isDrag: !0,
        width: 538,
        height: null,
        content: "",
        target: null,
        type: "none",
        left: null,
        top: null,
        modal: !0,
        allowClose: !0,
        opener: null,
        timeParmName: null,
        closeWhenEnter: null,
        isHidden: !1,
        show: !0,
        title: "提示",
        slide: e.browser.msie ? !1 : !0,
        fixedType: null,
        showType: null,
        onLoaded: null,
        onContentHeightChange: null,
        onClose: null,
        onClosed: null,
        onStopResize: null
    },
    e.ligerDefaults.DialogString = {
        titleMessage: "提示",
        ok: "确定",
        cancel: "取消",
        yes: "是",
        no: "否",
        okExam: "进入测试",
        cancelExam: "下次再考",
        close: "关闭",
        anonymousSave: "匿名提交",
        loginSave: "登录并提交",
        login: "登录",
        manualSave: "采用人工交卷方式",
        waittingMessage: "正在等待中,请稍候..."
    },
    e.ligerMethos.Dialog = e.ligerMethos.Dialog || {},
    t.controls.Dialog = function(e) {
        t.controls.Dialog.base.constructor.call(this, null, e)
    }
    ,
    t.controls.Dialog.ligerExtend(t.core.Win, {
        __getType: function() {
            return "Dialog"
        },
        __idPrev: function() {
            return "Dialog"
        },
        _extendMethods: function() {
            return e.ligerMethos.Dialog
        },
        _render: function() {
            var n = this
              , r = this.options
              , i = "";
            n.set(r, !0);
            var s = "";
            r.type == "dojo" ? s = '<div class="l-dialog l-dialog-' + r.width + '">' + '<div class="l-dialog-header">' + '<div class="l-dialog-title"></div>' + '<div class="l-dialog-winbtns"><div class="l-dialog-winbtn l-dialog-close"></div></div>' + "</div>" + '<div class="l-dialog-body">' + "</div>" + "</div>" : s = '<div class="l-dialog l-dialog-' + r.width + '">' + '<div class="l-dialog-header">' + '<div class="l-dialog-title"></div>' + '<div class="l-dialog-winbtns"><div class="l-dialog-winbtn l-dialog-close"></div></div>' + "</div>" + '<div class="l-dialog-body">' + '<div class="l-dialog-content"></div>' + '<div class="l-dialog-buttons"><div class="l-dialog-buttons-inner"></div></div></div>' + "</div>";
            var o = e(s);
            e("body").append(o),
            n.dialog = o,
            n.element = o[0],
            n.dialog.body = e(".l-dialog-body:first", n.dialog),
            n.dialog.header = e(".l-dialog-header:first", n.dialog),
            n.dialog.winbtns = e(".l-dialog-winbtns:first", n.dialog.header),
            n.dialog.buttons = e(".l-dialog-buttons:first", n.dialog),
            r.type == "dojo" ? n.dialog.content = e(".l-dialog-body:first", n.dialog) : n.dialog.content = e(".l-dialog-content:first", n.dialog),
            n.set(r, !1),
            r.allowClose == 0 && e(".l-dialog-close", n.dialog).remove();
            if (r.target || r.url || r.type == "none")
                r.type = null,
                n.dialog.addClass("l-dialog-win");
            r.cls && n.dialog.addClass(r.cls),
            r.id && n.dialog.attr("id", r.id),
            n.mask(),
            r.isDrag ? n._applyDrag() : (e(".l-dialog-image", n.dialog).remove(),
            n.dialog.content.addClass("l-dialog-content-noimage")),
            r.show || (n.unmask(),
            n.dialog.hide()),
            r.target && (n.dialog.content.prepend(r.target),
            e(r.target).show()),
            r.opener && (n.dialog.opener = r.opener),
            r.buttons ? (e(r.buttons).each(function(t, r) {
                var i = e('<button class="jq-button">' + r.text + "</button>");
                e(".l-dialog-buttons-inner", n.dialog.buttons).prepend(i),
                r.width && i.width(r.width),
                r.onclick && i.click(function() {
                    e(i).prop("disabled", !0).removeClass("jq-button-over"),
                    n.dialog.busyIcon.css({
                        visibility: "visible"
                    }),
                    r.onclick(r, n, t)
                })
            }),
            n.dialog.busyIcon = e('<span class="wheeling" style="visibility:hidden;">&nbsp;&nbsp;</span>'),
            e(".l-dialog-buttons-inner", n.dialog.buttons).prepend(n.dialog.busyIcon)) : n.dialog.buttons.remove(),
            e(".l-dialog-close", n.dialog).hover(function() {
                e(this).addClass("l-dialog-closeHover")
            }, function() {
                e(this).removeClass("l-dialog-closeHover")
            }),
            e(".jq-button", n.dialog).hover(function() {
                e(this).addClass("jq-button-over")
            }, function() {
                e(this).removeClass("jq-button-over")
            }),
            n.dialog.find("input:not(.noparse), textarea:not(.noparse)").wInput(),
            e(".l-dialog-title", n.dialog).bind("selectstart", function() {
                return !1
            }),
            n.dialog.click(function() {
                t.win.setFront(n)
            }),
            e(".l-dialog-close", n.dialog).click(function() {
                r.isHidden ? n.hide() : n.close()
            });
            if (!r.fixedType) {
                n.dialog.outerHeight() >= e(window).height() && n._setHeight(e(window).height());
                var u = 0
                  , a = 0
                  , f = n.dialog.outerWidth(!0);
                r.slide == 1 && (r.slide = "fast"),
                r.left != null ? u = r.left : r.left = u = Math.floor(.5 * (e(window).width() - f)) + e(window).scrollLeft(),
                r.top != null ? a = r.top : r.top = a = .5 * (e(window).height() - n.dialog.height()) + e(window).scrollTop(),
                u < 0 && (r.left = u = 0),
                a < 0 && (r.top = a = 0),
                n.dialog.css({
                    left: u,
                    top: a
                })
            }
            n.show(),
            i != "" && (e("#" + i).focus(),
            e("#" + i).remove())
        },
        _borderX: 12,
        _borderY: 24,
        active: function() {
            var n = this
              , r = this.options;
            if (n.minimize) {
                var i = n._width
                  , s = n._height
                  , o = n._left
                  , u = n._top;
                n.maximum && (i = e(window).width(),
                s = e(window).height(),
                o = u = 0,
                t.win.taskbar && (s -= t.win.taskbar.outerHeight(),
                t.win.top && (u += t.win.taskbar.outerHeight()))),
                r.slide ? (n.dialog.body.animate({
                    width: i - n._borderX
                }, r.slide),
                n.dialog.animate({
                    left: o,
                    top: u
                }, r.slide)) : n.set({
                    width: i,
                    height: s,
                    left: o,
                    top: u
                })
            }
            n.actived = !0,
            n.minimize = !1,
            t.win.setFront(n),
            n.show()
        },
        _setLeft: function(e) {
            if (!this.dialog)
                return;
            e != null && this.dialog.css({
                left: e
            })
        },
        _setTop: function(e) {
            if (!this.dialog)
                return;
            e != null && this.dialog.css({
                top: e
            })
        },
        _setWidth: function(e) {
            if (!this.dialog)
                return
        },
        _setHeight: function(e) {
            var t = this
              , n = this.options;
            if (!this.dialog)
                return;
            if (e >= this._borderY) {
                var r = 44
                  , i = 51
                  , s = 24
                  , o = e - this._borderY - r - i - s;
                if (t.trigger("ContentHeightChange", [o]) == 0)
                    return;
                t.dialog.content.height(o),
                t.trigger("ContentHeightChanged", [o])
            }
        },
        _removeDialog: function() {
            function r() {
                var n = e("iframe", t.dialog);
                if (n.length) {
                    var r = n[0];
                    r.src = "about:blank",
                    r.contentWindow.document.write(""),
                    e.browser.msie && CollectGarbage(),
                    n.remove()
                }
                t.dialog.remove()
            }
            var t = this
              , n = this.options;
            n.showType && n.fixedType ? t.dialog.animate({
                bottom: -1 * n.height
            }, function() {
                r()
            }) : r()
        },
        close: function() {
            var e = this
              , t = this.options;
            if (e.trigger("Close") == 0)
                return;
            e.doClose();
            if (e.trigger("Closed") == 0)
                return
        },
        doClose: function() {
            var e = this;
            t.win.removeTask(this),
            e.unmask(),
            e._removeDialog(),
            e.destroy()
        },
        destroy: function() {
            this.options = null,
            e.ligerui.remove(this)
        },
        _getVisible: function() {
            return this.dialog.is(":visible")
        },
        _setContent: function(e) {
            this.dialog.content.html(e)
        },
        _setTitle: function(t) {
            var n = this
              , r = this.options;
            t && e(".l-dialog-title", n.dialog).html(t)
        },
        _hideDialog: function() {
            var e = this
              , t = this.options;
            t.showType && t.fixedType ? e.dialog.animate({
                bottom: -1 * t.height
            }, function() {
                e.dialog.hide()
            }) : e.dialog.hide()
        },
        hidden: function() {
            var e = this;
            t.win.removeTask(e),
            e.dialog.hide(),
            e.unmask()
        },
        show: function() {
            var t = this
              , n = this.options;
            t.mask(),
            n.fixedType ? n.showType ? (t.dialog.css({
                bottom: -1 * n.height
            }).addClass("l-dialog-fixed"),
            t.dialog.show().animate({
                bottom: 0
            })) : t.dialog.show().css({
                bottom: 0
            }) : t.dialog.show(),
            e.ligerui.win.setFront.ligerDefer(e.ligerui.win, 100, [t])
        },
        _applyDrag: function() {
            var n = this
              , r = this.options;
            e.fn.ligerDrag && (n.draggable = n.dialog.ligerDrag({
                handler: ".l-dialog-title",
                animate: !1,
                onStartDrag: function() {
                    t.win.setFront(n);
                    var r = e("<div class='l-dragging-mask' style='display:block'></div>").height(n.dialog.height());
                    n.dialog.append(r),
                    n.dialog.content.addClass("l-dialog-content-dragging")
                },
                onDrag: function(e, t) {
                    var n = t.pageY || t.screenY;
                    if (n < 0)
                        return !1
                },
                onStopDrag: function() {
                    n.dialog.find("div.l-dragging-mask:first").remove(),
                    n.dialog.content.removeClass("l-dialog-content-dragging")
                }
            }))
        }
    }),
    t.controls.Dialog.prototype.hide = t.controls.Dialog.prototype.hidden,
    e.ligerDialog.open = function(t) {
        return e.ligerDialog(t)
    }
    ,
    e.ligerDialog.close = function() {
        var e = t.find(t.controls.Dialog.prototype.__getType());
        for (var n in e) {
            var r = e[n];
            r.destroy.ligerDefer(r, 5)
        }
        t.win.unmask()
    }
    ,
    e.ligerDialog.show = function(n) {
        var r = t.find(t.controls.Dialog.prototype.__getType());
        if (r.length)
            for (var i in r) {
                r[i].show();
                return
            }
        return e.ligerDialog(n)
    }
    ,
    e.ligerDialog.hide = function() {
        var e = t.find(t.controls.Dialog.prototype.__getType());
        for (var n in e) {
            var r = e[n];
            r.hide()
        }
    }
    ,
    e.ligerDialog.tip = function(t, n, r) {
        return p = {
            type: "none",
            title: n,
            content: r,
            width: t ? t : 698,
            buttons: null
        },
        e.extend(p, {
            showMax: !1,
            showToggle: !1,
            showMin: !1
        }),
        e.ligerDialog(p)
    }
    ,
    e.ligerDialog.alert = function(t, n, r, i, s) {
        r = r || "",
        typeof n == "function" ? (s = n,
        i = null) : typeof i == "function" && (s = i);
        var o = function(e, t, n) {
            t.close(),
            s && s(e, t, n)
        };
        return p = {
            content: r,
            width: t ? t : 538,
            buttons: [{
                text: e.ligerDefaults.DialogString.ok,
                onclick: o
            }]
        },
        typeof n == "string" && n != "" && (p.title = n),
        typeof i == "string" && i != "" && (p.type = i),
        e.extend(p, {
            showMax: !1,
            showToggle: !1,
            showMin: !1
        }),
        e.ligerDialog(p)
    }
    ,
    e.ligerDialog.question = function(t, n, r, i) {
        typeof n == "function" && (i = n,
        type = null);
        var s = function(e, t) {
            t.close(),
            i && e.type == "ok" && i()
        };
        return p = {
            type: "question",
            content: r,
            width: t ? t : 538,
            buttons: [{
                text: e.ligerDefaults.DialogString.cancel,
                onclick: s,
                type: "no"
            }, {
                text: e.ligerDefaults.DialogString.ok,
                onclick: s,
                type: "ok"
            }]
        },
        typeof n == "string" && n != "" && (p.title = n),
        e.extend(p, {
            showMax: !1,
            showToggle: !1,
            showMin: !1
        }),
        e.ligerDialog(p)
    }
    ,
    e.ligerDialog.confirm = function(t, n, r, i) {
        typeof n == "function" && (i = n,
        type = null);
        var s = function(e, t) {
            t.close(),
            i && e.type == "ok" && i()
        };
        return p = {
            type: "question",
            content: r,
            width: t ? t : 538,
            buttons: [{
                text: e.ligerDefaults.DialogString.no,
                onclick: s,
                type: "no"
            }, {
                text: e.ligerDefaults.DialogString.yes,
                onclick: s,
                type: "ok"
            }]
        },
        typeof n == "string" && n != "" && (p.title = n),
        e.extend(p, {
            showMax: !1,
            showToggle: !1,
            showMin: !1
        }),
        e.ligerDialog(p)
    }
    ,
    e.ligerDialog.countdownexam = function(t, n, r, i) {
        typeof n == "function" && (i = n,
        type = null);
        var s = function(e, t) {
            t.close(),
            i && e.type == "ok" && i()
        };
        return p = {
            type: "question",
            content: r,
            width: t ? t : 538,
            buttons: [{
                text: e.ligerDefaults.DialogString.cancelExam,
                onclick: s,
                type: "no"
            }, {
                text: e.ligerDefaults.DialogString.okExam,
                onclick: s,
                type: "ok"
            }]
        },
        typeof n == "string" && n != "" && (p.title = n),
        e.extend(p, {
            showMax: !1,
            showToggle: !1,
            showMin: !1
        }),
        e.ligerDialog(p)
    }
    ,
    e.ligerDialog.done = function(t, n, r, i) {
        typeof n == "function" && (i = n,
        type = null);
        var s = function(e, t) {
            t.close(),
            i && e.type == "ok" && i()
        };
        return p = {
            type: "done",
            content: r,
            width: t ? t : 538,
            buttons: [{
                text: e.ligerDefaults.DialogString.cancel,
                onclick: s,
                type: "no"
            }, {
                text: e.ligerDefaults.DialogString.ok,
                onclick: s,
                type: "ok"
            }]
        },
        typeof n == "string" && n != "" && (p.title = n),
        e.extend(p, {
            showMax: !1,
            showToggle: !1,
            showMin: !1
        }),
        e.ligerDialog(p)
    }
    ,
    e.ligerDialog.warning = function(t, n, r, i) {
        typeof n == "function" && (i = n,
        type = null);
        var s = function(e, t) {
            t.close(),
            i && i(e.type)
        };
        return p = {
            type: "question",
            content: r,
            buttons: [{
                text: e.ligerDefaults.DialogString.yes,
                onclick: s,
                type: "yes"
            }, {
                text: e.ligerDefaults.DialogString.no,
                onclick: s,
                type: "no"
            }, {
                text: e.ligerDefaults.DialogString.cancel,
                onclick: s,
                type: "cancel"
            }]
        },
        typeof n == "string" && n != "" && (p.title = n),
        e.extend(p, {
            showMax: !1,
            showToggle: !1,
            showMin: !1
        }),
        e.ligerDialog(p)
    }
    ,
    e.ligerDialog.waitting = function(t) {
        return t = t || e.ligerDefaults.Dialog.waittingMessage,
        e.ligerDialog.open({
            cls: "l-dialog-waittingdialog",
            type: "none",
            content: '<div style="padding:4px" class="successMsg">' + t + "</div>",
            allowClose: !0
        })
    }
    ,
    e.ligerDialog.closeWaitting = function() {
        var e = t.find(t.controls.Dialog);
        for (var n in e) {
            var r = e[n];
            r.dialog.hasClass("l-dialog-waittingdialog") && r.close()
        }
    }
    ,
    e.ligerDialog.success = function(n, r) {
        return r = "<span class='successMsg'>" + r + "</span>",
        p = {
            type: "success",
            content: r,
            buttons: null
        },
        p.width = 318,
        typeof n == "string" && n != "" && (p.title = n),
        e.extend(p, {
            showMax: !1,
            showToggle: !1,
            showMin: !1
        }),
        g = this,
        setTimeout(function() {
            var e = t.find(t.controls.Dialog);
            for (var n in e)
                e[n].close()
        }, 2e3),
        e.ligerDialog(p)
    }
    ,
    e.ligerDialog.error = function(t, n, r, i) {
        return e.ligerDialog.alert(t, n, r, "error", i)
    }
    ,
    e.ligerDialog.warn = function(t, n, r, i) {
        return e.ligerDialog.alert(t, n, r, "warn", i)
    }
    ,
    e.ligerDialog.prompt = function(t, n, r, i, s, o) {
        var u = e(r)
          , a = function(t, n, r) {
            i && (t.type == "yes" ? (i(e(u)),
            s || n.close()) : n.close())
        };
        return p = {
            type: "none",
            title: n,
            target: u,
            width: t ? t : 538,
            onClosed: o,
            buttons: [{
                text: e.ligerDefaults.DialogString.cancel,
                onclick: a,
                type: "cancel"
            }, {
                text: e.ligerDefaults.DialogString.ok,
                onclick: a,
                type: "yes"
            }]
        },
        e.ligerDialog(p)
    }
    ,
    e.ligerDialog.dojo = function(t, n, r) {
        return p = {
            type: "dojo",
            title: n,
            content: r,
            width: t ? t : 698,
            buttons: null
        },
        e.ligerDialog(p)
    }
    ,
    e.ligerDialog.callback = function(t, n, r, i) {
        return r = "<span class='successMsg'>" + r + "</span>",
        e.ligerDialog.alert(t, n, r, "success", i)
    }
    ,
    e.ligerDialog.errorback = function(t, n, r, i) {
        i || (i = "操作");
        var s = "";
        switch (t) {
        case "0":
            s = "很抱歉，" + i + "失败，请首先确认具有足够权限，并刷新页面后再重新尝试！";
            break;
        case "-1":
            s = "页面超时或失效，请重新登录。按「确定」按钮会自动刷新页面！";
            break;
        case "-2":
            s = "" + i + "失败！<br>原因：参数不符合格式要求。";
            break;
        default:
            s = "" + i + "失败！<br>原因：" + r + "。"
        }
        t == "-1" ? (s = "<span class='failMsg'>" + s + "</span>",
        e.ligerDialog.done(448, n, s, function() {
            window.location.reload()
        })) : (s = "<span class='failMsg'>" + s + "</span>",
        e.ligerDialog.error(448, n, s))
    }
    ,
    e.ligerDialog.debug = function(t, n, r, i) {
        var s = navigator.userAgent
          , o = navigator.appVersion
          , u = parseFloat(s.split("WebKit/")[1]) || undefined
          , a = parseFloat(s.split("Chrome/")[1]) || undefined
          , f = parseFloat(o.split("MSIE ")[1]) || undefined
          , l = parseFloat(o.split("Trident/")[1]) || undefined
          , c = parseFloat(s.split("Firefox/")[1]) || undefined
          , h = "";
        f ? h = "IE " + f : l > 6 ? h = "IE 11+, Trident " + l : a ? h = "Chrome " + a : c ? h = "Firefox " + c : u ? h = "WebKit " + u : h = s;
        var d = "";
        switch (t) {
        case "ajax":
            var v = "";
            n.status in e.ligerDefaults.DebugString ? v = e.ligerDefaults.DebugString[n.status] : v = "UNKNOWN.",
            d = "<b>(ajax)未能连接到服务器、或未能收到服务器的响应、或服务器报告出现错误，请首先检查本地电脑的互联网连接，并检查浏览器设置，然后重新尝试。</b><br><br><b>browser：</b>" + h + "<br><b>url：</b>" + r.url + "<br><b>code：</b>" + n.status + "<br><b>error：</b>" + v;
            break;
        case "InvalidResponse":
            d = "<b>从服务器收到的响应数据包格式不符合要求，可能因为互联网内容过滤、劫持、网络异常等原因而导致，请检查本地电脑的互联网连接后重新尝试。</b><br><br><b>browser：</b>" + h + "<br><b>url：</b>" + r.url + "<br><b>response：</b>" + e.escape(i);
            break;
        default:
            d = "<b>发生未知错误，请首先检查本地电脑的互联网连接，并检查浏览器设置，然后重新尝试。</b><br><br><b>browser：</b>" + h + "<br><b>url：</b>" + r.url
        }
        var m = ["<div>与examcoo&trade;服务器交互时出现错误：</div>", "<div class='debugMessage'>" + d + "</div>"].join("");
        if (typeof vp4fromAction == "undefined" || vp4fromAction != "exam" && vp4fromAction != "ebexam" && vp4fromAction != "exercise" || !RichText.showDebugExamDialog)
            return m += "<div>请检查网络故障和浏览器设置后重新尝试，或联系QQ(3449547)获得技术支持。</div>",
            e.ligerDialog.alert(538, "异常错误", m, "error");
        RichText.debugExamCount++,
        m += "<div>请检查网络故障和浏览器设置，并关闭此错误提示框后重试「交卷」操作。如果三次交还是失败的话，系统将会提供人工交卷的途径。<br>或者联系QQ(3449547)获得技术支持。</div>";
        if (RichText.debugExamCount >= 3) {
            var g = function(e, t) {
                t.close()
            }
              , y = function(e, t) {
                t.close(),
                RichText.plugins.examSave.execCommand("showManualSaveDialog")
            };
            return p = {
                type: "question",
                content: m,
                width: 538,
                buttons: [{
                    text: e.ligerDefaults.DialogString.close,
                    onclick: g,
                    type: "no"
                }, {
                    text: e.ligerDefaults.DialogString.manualSave,
                    onclick: y,
                    type: "ok"
                }]
            },
            p.title = "异常错误",
            e.extend(p, {
                showMax: !1,
                showToggle: !1,
                showMin: !1
            }),
            e.ligerDialog(p)
        }
        return e.ligerDialog.alert(538, "异常错误", m, "error")
    }
    ,
    e.ligerDialog.questionLogin = function(t, n, r, i, s) {
        typeof n == "function" && (s = n,
        type = null);
        var o = function(e, t) {
            t.close(),
            s && e.type == "ok" && s()
        }
          , u = function(e, t) {
            t.close(),
            i.setLoginDlg("loginSave", n, s)
        };
        return p = {
            type: "question",
            content: r,
            width: t ? t : 538,
            buttons: [{
                text: e.ligerDefaults.DialogString.cancel,
                onclick: o,
                type: "no"
            }, {
                text: e.ligerDefaults.DialogString.login,
                onclick: u,
                type: "ok"
            }, {
                text: e.ligerDefaults.DialogString.anonymousSave,
                onclick: o,
                type: "ok"
            }]
        },
        typeof n == "string" && n != "" && (p.title = n),
        e.extend(p, {
            showMax: !1,
            showToggle: !1,
            showMin: !1
        }),
        e.ligerDialog(p)
    }
    ,
    e.ligerDialog.login = function(t, n, r, i, s, o) {
        var u = e(r)
          , a = function(t, n) {
            s && (t.type == "ok" ? (s(e(u)),
            o || n.close()) : n.close())
        };
        return p = {
            type: "question",
            target: u,
            content: r,
            width: t ? t : 538,
            buttons: [{
                text: e.ligerDefaults.DialogString.cancel,
                onclick: a,
                type: "no"
            }, {
                text: e.ligerDefaults.DialogString[i],
                onclick: a,
                type: "ok"
            }]
        },
        typeof n == "string" && n != "" && (p.title = n),
        e.extend(p, {
            showMax: !1,
            showToggle: !1,
            showMin: !1
        }),
        e.ligerDialog(p)
    }
}(jQuery),
define("ligerDialog", ["jquery", "ligerBase", "ligerDrag"], function(e) {
    return function() {
        var t, n;
        return t || e.ligerDialog
    }
}(this)),
function($) {
    var escape = /["\\\x00-\x1f\x7f-\x9f]/g
      , meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }
      , hasOwn = Object.prototype.hasOwnProperty;
    $.toJSON = typeof JSON == "object" && JSON.stringify ? JSON.stringify : function(e) {
        if (e === null)
            return "null";
        var t, n, r, i, s = $.type(e);
        if (s === "undefined")
            return undefined;
        if (s === "number" || s === "boolean")
            return String(e);
        if (s === "string")
            return $.quoteString(e);
        if (typeof e.toJSON == "function")
            return $.toJSON(e.toJSON());
        if (s === "date") {
            var o = e.getUTCMonth() + 1
              , u = e.getUTCDate()
              , a = e.getUTCFullYear()
              , f = e.getUTCHours()
              , l = e.getUTCMinutes()
              , c = e.getUTCSeconds()
              , h = e.getUTCMilliseconds();
            return o < 10 && (o = "0" + o),
            u < 10 && (u = "0" + u),
            f < 10 && (f = "0" + f),
            l < 10 && (l = "0" + l),
            c < 10 && (c = "0" + c),
            h < 100 && (h = "0" + h),
            h < 10 && (h = "0" + h),
            '"' + a + "-" + o + "-" + u + "T" + f + ":" + l + ":" + c + "." + h + 'Z"'
        }
        t = [];
        if ($.isArray(e)) {
            for (n = 0; n < e.length; n++)
                t.push($.toJSON(e[n]) || "null");
            return "[" + t.join(",") + "]"
        }
        if (typeof e == "object") {
            for (n in e)
                if (hasOwn.call(e, n)) {
                    s = typeof n;
                    if (s === "number")
                        r = '"' + n + '"';
                    else {
                        if (s !== "string")
                            continue;
                        r = $.quoteString(n)
                    }
                    s = typeof e[n],
                    s !== "function" && s !== "undefined" && (i = $.toJSON(e[n]),
                    t.push(r + ":" + i))
                }
            return "{" + t.join(",") + "}"
        }
    }
    ,
    $.evalJSON = typeof JSON == "object" && JSON.parse ? JSON.parse : function(str) {
        return eval("(" + str + ")")
    }
    ,
    $.secureEvalJSON = typeof JSON == "object" && JSON.parse ? JSON.parse : function(str) {
        var filtered = str.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "");
        if (/^[\],:{}\s]*$/.test(filtered))
            return eval("(" + str + ")");
        throw new SyntaxError("Error parsing JSON, source is not valid.")
    }
    ,
    $.quoteString = function(e) {
        return e.match(escape) ? '"' + e.replace(escape, function(e) {
            var t = meta[e];
            return typeof t == "string" ? t : (t = e.charCodeAt(),
            "\\u00" + Math.floor(t / 16).toString(16) + (t % 16).toString(16))
        }) + '"' : '"' + e + '"'
    }
}(jQuery),
define("jquery-json", ["jquery"], function(e) {
    return function() {
        var t, n;
        return t || e.jquery - json
    }
}(this)),
function(e) {
    e.fn.extend({
        coffee: function(t) {
            for (var n in t)
                for (var r in t[n])
                    e(this).on(n, r, t[n][r])
        }
    }),
    e.extend({
        shortstr: function(t) {
            if (typeof t == "boolean" || typeof t == "object" || typeof t == "function" || typeof t == "undefined")
                return "";
            t = "" + t,
            t = t.replace(/&lt;/gm, "<").replace(/&gt;/gm, ">").replace(/&quot;/gm, '"').replace(/&#039;/gm, "'").replace(/&#39;/gm, "'").replace(/&amp;/gm, "&").replace(/&nbsp;/gm, " ");
            var n = /&nbsp;/g
              , r = /<br>/gmi;
            t = t.replace(n, " "),
            t = t.replace(r, "&");
            var i = / +/g
              , s = /&+/g;
            return t = t.replace(i, " "),
            t = t.replace(s, "&"),
            t = e.trim(t),
            t
        },
        escape: function(e) {
            return typeof e == "boolean" || typeof e == "object" || typeof e == "function" || typeof e == "undefined" ? "" : (e = "" + e,
            e = e.replace(/&(?!lt;|gt;|quot;|#039;|nbsp;|amp;)/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;").replace(/'/gm, "&#039;"),
            e)
        },
        escapeArgs: function(e) {
            return typeof e == "boolean" || typeof e == "object" || typeof e == "function" || typeof e == "undefined" ? "" : (e = "" + e,
            e = e.replace(/&(?!lt;|gt;|quot;|#039;|nbsp;|amp;)/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;").replace(/'/gm, "&#039;"),
            e = e.replace(/&/gm, "&amp;"),
            e)
        },
        escapeTitle: function(e) {
            return typeof e == "boolean" || typeof e == "object" || typeof e == "function" || typeof e == "undefined" ? "" : (e = "" + e,
            e = e.replace(/"/gm, "&quot;").replace(/'/gm, "&#039;"),
            e)
        },
        unescape: function(e) {
            return typeof e == "boolean" || typeof e == "object" || typeof e == "function" || typeof e == "undefined" ? "" : (e = "" + e,
            e = e.replace(/<br>/gmi, "\n"),
            e = e.replace(/&lt;/gm, "<").replace(/&gt;/gm, ">").replace(/&quot;/gm, '"').replace(/&#039;/gm, "'").replace(/&#39;/gm, "'").replace(/&amp;/gm, "&").replace(/&nbsp;/gm, " "),
            e)
        },
        trimSpace: function(t) {
            var n = !1;
            for (var r = 0; r < t.length; r++) {
                var i = t.charAt(r);
                if (/\u3000/.test(i))
                    continue;
                if (/\S/.test(i)) {
                    t = t.substr(r),
                    n = !0;
                    break
                }
            }
            if (!n)
                return "";
            for (var r = t.length - 1; r >= 0; r--) {
                var i = t.charAt(r);
                if (/\u3000/.test(i))
                    continue;
                if (/\S/.test(i)) {
                    t = t.substring(0, r + 1);
                    break
                }
            }
            return t = e.trim(t),
            t
        },
        trimSpace4mark: function(t) {
            return t = t.replace(/\u3000/g, " "),
            t = t.replace(/\s+/g, " "),
            t = e.trim(t),
            t = t.toLowerCase(),
            t = t.replace(/[‘’]/g, "'").replace(/[“”]/g, '"'),
            t
        },
        filterBrHtml: function(e) {
            return e = e.replace(/[\f\n\r\t\v]/gim, ""),
            e = e.replace(/<br class=["']?bogusBR["']?>/gim, ""),
            e = e.replace(/<!--.*?-->|<(head|title|script|style)[^>]*?>.*?<\/\1>|\t|(?:(<br)[^>]*?(>))|((?:<[^>]*?>))/gim, "$2$3"),
            e
        },
        filterSaveHtml: function(t) {
            return t = t.replace(/<br class=["']?bogusBR["']?>/gim, ""),
            t = t.replace(/<!--.*?-->|<(head|title|script|style)[^>]*?>.*?<\/\1>|\t|(?:(<br)[^>]*?(>))|((?:<img\s.*?_djrealurl=[^>]*?>))|(<u)[^>]*?(>)(.*?<\/u>)|(<sup)[^>]*?(>)(.*?<\/sup>)|(<sub)[^>]*?(>)(.*?<\/sub>)|(<\/?(?:table|caption|tbody|th|tr|td))([^>]*?)(>)|(?:<\/(?!table|caption|tbody|th|tr|td))[^>]*?>|(?:<(?!table|tbody|th|tr|td))[^>]*?>/gim, "$2$3$4$5$6$7$8$9$10$11$12$13$14$15$16"),
            t = this.filterHtmlAttr(t),
            t = t.replace(/[\r\n]/igm, ""),
            e.browser.msie || (t = t.replace(/<br[^>]*?>$/gim, "")),
            t = t.replace(/(?:(<img(?=\s).*?\ssrc=)("|')(.*?)\2)|(?:(<img\s.*?src=)([^"'][^ >]+))/gi, "$1$4$2$5$2"),
            t = e.filterCharCode(t),
            t
        },
        filterPasteHtml: function(t) {
            return t = t.replace(/[\r\n]/igm, ""),
            t = t.replace(/<br>/igm, ""),
            t = t.replace(/<!--.*?-->|<(head|title|script|style)[^>]*?>.*?<\/\1>|\t|((?:<img\s.*?_djrealurl=[^>]*?>))|(<\/?(?:table|caption|tbody|th|tr|td))([^>]*?)(>)|(?:<\/(?!table|caption|tbody|th|tr|td))[^>]*?>|(?:<(?!table|tbody|th|tr|td))[^>]*?>/gim, "$2$3$4$5"),
            t = this.filterHtmlAttr(t),
            t = e.filterCharCode(t),
            t
        },
        filterEnterHtml: function(e) {
            return e = e.replace(/[\r\n]/igm, ""),
            e = e.replace(/<!--.*?-->|<(head|title|script|style)[^>]*?>.*?<\/\1>|\t|((?:<img\s.*?_djrealurl=[^>]*?>))|(<u)[^>]*?(>)(.*?<\/u>)|(<sup)[^>]*?(>)(.*?<\/sup>)|(<sub)[^>]*?(>)(.*?<\/sub>)|(<\/?(?:table|caption|tbody|th|tr|td))([^>]*?)(>)|(?:<\/(?!table|caption|tbody|th|tr|td))[^>]*?>|(?:<(?!table|tbody|th|tr|td))[^>]*?>/gim, "$2$3$4$5$6$7$8$9$10$11$12$13$14"),
            e = this.filterHtmlAttr(e),
            e
        },
        filterHtmlAttr: function(e) {
            var t = /(<(?:img|table|caption|tbody|th|tr|td))(\s.*?)(on\w*?=)([^>]*?)(>)/gim;
            while (t.test(e))
                e = e.replace(t, "$1$2_dj=$4$5"),
                t = /(<(?:img|table|caption|tbody|th|tr|td))(\s.*?)(on\w*?=)([^>]*?)(>)/gim;
            return e = e.replace(/(<(?:img|table|caption|tbody|th|tr|td))(\s.*?)(class=)([^>]*?)(>)/gim, "$1$2_dj=$4$5"),
            e = e.replace(/(<(?:img|table|caption|tbody|th|tr|td))(\s.*?)(id=)([^>]*?)(>)/gim, "$1$2_dj=$4$5"),
            e
        },
        filterAllHtmlTag: function(e) {
            return e = e.replace(/<([^>]*)>|<\/\1>/gim, ""),
            e
        },
        filterSaveBlankHtml: function(e) {
            return e = e.replace(/<br class=["']?bogusBR["']?>/gim, ""),
            e = e.replace(/<!--.*?-->|<(head|title|script|style)[^>]*?>.*?<\/\1>|\t|(?:(<br)[^>]*?(>))|((?:<img\s.*?_djrealurl=[^>]*?>))|(<u)[^>]*?(>)(.*?<\/u>)|(<sup)[^>]*?(>)(.*?<\/sup>)|(<sub)[^>]*?(>)(.*?<\/sub>)|((?:<input[^>]*?>))|(<\/?(?:table|caption|tbody|th|tr|td))([^>]*?)(>)|(?:<\/(?!table|caption|tbody|th|tr|td))[^>]*?>|(?:<(?!table|tbody|th|tr|td))[^>]*?>/gim, "$2$3$4$5$6$7$8$9$10$11$12$13$14$15$16$17"),
            e = this.filterHtmlAttr(e),
            e = e.replace(/[\r\n]/igm, ""),
            e
        },
        toFixedFloat: function(e, t) {
            return e.length == 0 ? "" : isNaN(e) ? 0 : (t = t ? parseInt(t) : 0,
            !t || t <= 0 ? Math.round(e) : Math.round(e * Math.pow(10, t)) / Math.pow(10, t))
        },
        formatTime: function(e) {
            var t, n, r;
            e = parseInt(e, 10);
            var i = parseInt(e / 3600, 10);
            return i > 0 ? (t = i + ":",
            n = parseInt(e / 60, 10) - i * 60,
            n < 10 ? t = t + "0" + n + "'" : t = t + n + "'",
            r = parseInt(e % 60, 10),
            r < 10 ? t = t + "0" + r + "''" : t = t + r + "''") : (n = parseInt(e / 60, 10),
            n > 0 ? (t = n + "'",
            r = parseInt(e % 60, 10),
            r < 10 ? t = t + "0" + r + "''" : t = t + r + "''") : (r = parseInt(e % 60, 10),
            t = r + "''")),
            t
        },
        addEventListerPlayerImage: function(t, n, r) {
            e("img[role=audio]", t).each(function(t) {
                e(this).attr("id", "audioPlay_" + t),
                e(this).css("cursor", "pointer");
                var i = e(this).attr("_djrealurl");
                e(this).on("click", function() {
                    e.createAudioPlayer(e(this)[0], i, n, r)
                })
            }),
            e("div.audioplayer", t).each(function(t) {
                e(this).audioPlayer()
            })
        },
        createAudioPlayer: function(e, t, n, r) {
            var i = t;
            if (!i)
                return window.alert("无效的音频文件！"),
                !1;
            var s = ""
              , o = i.split("/");
            o.length == 5 && /^\/paper\//gi.test(i) ? s = r + i : o.length == 7 && /^\/uploads\//gi.test(i) ? s = r + "/paper/" + o[3] + "/" + o[5] + "/" + o[6] : o.length == 8 && /^\/uploads\//gi.test(i) ? s = r + "/paper/" + o[3] + "/" + o[5] + "/" + o[6] + "/" + o[7] : s = n + i;
            if (!s)
                return window.alert("无效的音频文件！"),
                !1;
            t = s;
            var u = !!document.createElement("audio").canPlayType;
            u ? this.creatHtml5Player(e, t) : this.creatHtml5PlayerNotSupported(e, t)
        },
        createAudioPlayer4aliyun: function(e, t, n) {
            var r = !!document.createElement("audio").canPlayType;
            r ? this.creatHtml5Player(e, t) : this.creatHtml5PlayerNotSupported(e, t)
        },
        creatHtml5Player: function(t, n) {
            var r = '<div class="audioplayer audioplayer-stopped"><audio src="' + n + '" controls="" preload="none" style="width:0px;height=0px;visibility:hidden"></audio>' + '<div class="audioplayer-playpause" title="Play"><a href="javascript:void(0);">Play</a></div>' + '<div class="audioplayer-time audioplayer-time-current">00:00</div>' + '<div class="audioplayer-bar">' + '<div class="audioplayer-bar-loaded"></div>' + '<div class="audioplayer-bar-played"></div>' + "</div>" + '<div class="audioplayer-time audioplayer-time-duration">…</div>' + "</div>";
            e(r).replaceAll(t).audioPlayer().find(".audioplayer-playpause").click()
        },
        creatHtml5PlayerNotSupported: function(t, n) {
            var r = '<div class="audioplayer audioplayer-stopped">&nbsp;浏览器版本太低，不支持HTML5音频</div>';
            e(r).replaceAll(t)
        },
        checkAll: function(t) {
            t || (t = "batchid"),
            e("input[type='checkbox'][name='" + t + "']").prop("checked", !0)
        },
        checkAllNo: function(t) {
            t || (t = "batchid"),
            e("input[type='checkbox'][name='" + t + "']").prop("checked", !1)
        },
        reserveCheck: function(t) {
            t || (t = "batchid"),
            e("input[type='checkbox'][name='" + t + "']").each(function(t, n) {
                e(this).prop("checked") ? e(this).prop("checked", !1) : e(this).prop("checked", !0)
            })
        },
        gmt2localtime: function(e) {
            var t = (new Date).getTimezoneOffset()
              , n = t * 60
              , r = parseInt(e, 10) - n;
            if (r > 0) {
                r *= 1e3;
                var i = new Date(r)
                  , s = i.getUTCMonth() + 1;
                s = s < 10 ? "0" + s : s;
                var o = i.getUTCDate();
                o = o < 10 ? "0" + o : o;
                var u = i.getUTCHours();
                u = u < 10 ? "0" + u : u;
                var a = i.getUTCMinutes();
                a = a < 10 ? "0" + a : a;
                var f = "";
                return f += i.getUTCFullYear() + "-" + s + "-" + o + "&nbsp;" + u + ":" + a,
                f
            }
            return ""
        },
        getCurrentTime: function() {
            var e, t;
            return e = new Date,
            t = e.getTime() / 1e3,
            t
        },
        replaceImg4Show: function(t, n, r) {
            var i = /(?:({img(?=\s).*?\s_djrealurl=)(\"|')(.*?)\2)(})/ig, s, o = [];
            while (s = i.exec(t))
                o.push(s);
            var u = []
              , a = []
              , f = []
              , l = []
              , c = o.length;
            if (c > 0) {
                for (var h = 0; h < c; h++)
                    u.push(o[h][3]),
                    a.push(o[h][0]),
                    f.push(o[h][0]);
                var p, d;
                e.each(u, function(e, t) {
                    t = "" + t,
                    p = t.lastIndexOf("/"),
                    d = t.substring(p + 1, t.length),
                    l.push("{img:" + d + "}")
                }),
                e.each(f, function(e, n) {
                    t = t.replace(n, l[e])
                })
            }
            t = this.escape(t),
            t = t.replace(/\n/gm, "<br>"),
            t = t.replace(/\r/gm, "");
            if (c > 0) {
                e.each(l, function(e, n) {
                    t = t.replace(n, a[e])
                });
                var v = "";
                t = t.replace(/(?:({)(img(?=\s).*?\s_djrealurl=)(\"|')(.*?)\3)(})/gmi, function(e, t, i, s, o) {
                    var u = o;
                    if (!u)
                        return "";
                    var a = ""
                      , f = u.split("/");
                    return f.length == 5 && (/^\/paper\//gi.test(u) || /^\/ask\//gi.test(u)) ? a = r + u : f.length == 6 && /^\/uploads\//gi.test(u) ? a = r + "/ask/" + f[3] + "/201512/" + f[5] : f.length == 7 && /^\/uploads\//gi.test(u) ? a = r + "/paper/" + f[3] + "/" + f[5] + "/" + f[6] : f.length == 8 && /^\/uploads\//gi.test(u) ? a = r + "/paper/" + f[3] + "/" + f[5] + "/" + f[6] + "/" + f[7] : a = n + u,
                    a ? /(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/gi.test(u) ? (v = "<" + i + s + o + s + ' src="' + a + '">',
                    v) : "" : ""
                })
            }
            return t = t.replace(/{br}/gmi, "<br>"),
            t
        },
        setLightbox: function(t, n, r) {
            t = t.replace(/(?:(<img(?=\s).*?\s)(src=)("|')(.*?)\3)/gim, "$1");
            var i = ""
              , s = "";
            return t = t.replace(/(?:(<img(?=\s).*?\s_djrealurl=)("|')([\w\/\.]*?)\2([^>]*?>))/gmi, function(t, o, u, a, f) {
                var l = a;
                if (!l)
                    return "";
                var c = ""
                  , h = l.split("/");
                h.length == 5 && /^\/paper\//gi.test(l) ? c = r + l : h.length == 7 && /^\/uploads\//gi.test(l) ? c = r + "/paper/" + h[3] + "/" + h[5] + "/" + h[6] : h.length == 8 && /^\/uploads\//gi.test(l) ? c = r + "/paper/" + h[3] + "/" + h[5] + "/" + h[6] + "/" + h[7] : c = n + l;
                if (!c)
                    return "";
                if (/(\.mp3|\.mp4)$/gi.test(l)) {
                    var p = !!document.createElement("audio").canPlayType;
                    return p ? i = '<div class="audioplayer audioplayer-stopped"><audio src="' + c + '" controls="" preload="none" style="width:0px;height=0px;visibility:hidden"></audio>' + '<div class="audioplayer-playpause" title="Play"><a href="javascript:void(0);">Play</a></div>' + '<div class="audioplayer-time audioplayer-time-current">00:00</div>' + '<div class="audioplayer-bar">' + '<div class="audioplayer-bar-loaded"></div>' + '<div class="audioplayer-bar-played"></div>' + "</div>" + '<div class="audioplayer-time audioplayer-time-duration">…</div>' + "</div>" : i = o + u + a + u + " src=" + u + n + "/themes/metro/images/v1_38.png" + u + f,
                    i
                }
                return /(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/gi.test(l) ? (e.browser.msie < 8 ? s = o + u + a + u + " src=" + u + c + u + f : s = '<a href="' + c + '" rel="lightbox" target="_blank">' + o + u + a + u + " src=" + u + c + u + f + "</a>",
                s) : ""
            }),
            s = "$1$2$3$4$2 src=$2$3$2$5",
            t = t.replace(/(?:(<img(?=\s).*?\s_djrealurl=)("|')(data:image\/(jpg|jpeg|png|gif);base64.*?)\2([^>]*?>))/gmi, s),
            t
        },
        resetImgSrc4Show: function(e, t, n) {
            e = e.replace(/(?:(<img(?=\s).*?\s)(src=)("|')(.*?)\3)/gim, "$1");
            var r = ""
              , i = "";
            return e = e.replace(/(?:(<img(?=\s).*?\s_djrealurl=)("|')([\w\/\.]*?)\2([^>]*?>))/gmi, function(e, s, o, u, a) {
                var f = u;
                if (!f)
                    return "";
                var l = ""
                  , c = f.split("/");
                return c.length == 5 && /^\/paper\//gi.test(f) ? l = n + f : c.length == 7 && /^\/uploads\//gi.test(f) ? l = n + "/paper/" + c[3] + "/" + c[5] + "/" + c[6] : c.length == 8 && /^\/uploads\//gi.test(f) ? l = n + "/paper/" + c[3] + "/" + c[5] + "/" + c[6] + "/" + c[7] : l = t + f,
                l ? /(\.mp3|\.mp4)$/gi.test(f) ? (r = s + o + u + o + " src=" + o + t + "/themes/metro/images/v1_38.png" + o + a,
                r) : /(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/gi.test(f) ? (i = s + o + u + o + " src=" + o + l + o + a,
                i) : "" : ""
            }),
            e
        },
        filterCharCode: function(e) {
            var t = e.length, n = [], r, i;
            for (var s = 0; s < t; s++) {
                r = e.charAt(s),
                i = e.charCodeAt(s);
                if (i >= 0 && i <= 31 && i != 9 && i != 10 && i != 13 || i == 127)
                    r = " ";
                n.push(r)
            }
            return e = n.join(""),
            e
        },
        validatePlayerCode: function(e) {
            e = e.replace(/[\r\n]/igm, "");
            var t, n = [], r = /(?:<iframe(?=\s).*?\ssrc=("|')(.*?)\1)([^<>]+><\/iframe>)/img;
            while (t = r.exec(e))
                n.push(t);
            if (n.length > 0) {
                var i = n.length;
                for (var s = 0; s < i; s++) {
                    var o = n[s][2];
                    if (!/^(https:\/\/)?player.youku.com\//i.test(o) && !/^(https:\/\/)?www.tudou.com\//i.test(o) && !/^(https:\/\/)?v.qq.com\//i.test(o) && !/^(https:\/\/)?imgcache.qq.com\//i.test(o) && !/^(https:\/\/)?open.iqiyi.com\//i.test(o) && !/^(https:\/\/)?player.video.qiyi.com\//i.test(o))
                        return !1
                }
                return !0
            }
            return !1
        },
        safePlayerCode: function(t) {
            return t = t.replace(/[\r\n]/igm, ""),
            t = e.trimSpace(t),
            t = t.replace(/\u3000/g, " "),
            t = t.replace(/\s+/g, " "),
            t = t.replace(/http:\/\/player.youku.com\//gi, "https://player.youku.com/"),
            t = t.replace(/http:\/\/www.tudou.com\//gi, "https://www.tudou.com/"),
            t = t.replace(/http:\/\/v.qq.com\//gi, "https://v.qq.com/"),
            t = t.replace(/http:\/\/imgcache.qq.com\//gi, "https://imgcache.qq.com/"),
            t = t.replace(/http:\/\/open.iqiyi.com\//gi, "https://open.iqiyi.com/"),
            t = t.replace(/http:\/\/player.video.qiyi.com\//gi, "https://player.video.qiyi.com/"),
            htmlLower = t.toLowerCase(),
            htmlLower.indexOf(" width=") == -1 && (t = t.replace(/ src=/i, ' width="510" src=')),
            htmlLower.indexOf(" height=") == -1 && (t = t.replace(/ src=/i, ' height="498" src=')),
            t = t.replace(/ width="100%"/i, ' width="510"'),
            t = t.replace(/ height="100%"/i, ' height="498"'),
            t = e.playerCodeHtml2Label(t),
            t = e.escape(t),
            t = e.playerCodeLabel2Html(t),
            t
        },
        playerCodeHtml2Label: function(t) {
            var n, r = [], i = /(?:<iframe(?=\s).*?\ssrc=("|')(.*?)\1)([^<>]+><\/iframe>)/img;
            while (n = i.exec(t))
                r.push(n);
            var s = []
              , o = r.length;
            for (var u = 0; u < o; u++) {
                var a = r[u][2];
                if (!/^(https:\/\/)?player.youku.com\//i.test(a) && !/^(https:\/\/)?www.tudou.com\//i.test(a) && !/^(https:\/\/)?v.qq.com\//i.test(a) && !/^(https:\/\/)?imgcache.qq.com\//i.test(a) && !/^(https:\/\/)?open.iqiyi.com\//i.test(a) && !/^(https:\/\/)?player.video.qiyi.com\//i.test(a))
                    continue;
                s.push(r[u][0])
            }
            if (s.length > 0) {
                var f = [];
                return e.each(s, function(e, t) {
                    t = t.replace(/</g, "{"),
                    t = t.replace(/>/g, "}"),
                    t = t.replace(/'/g, '"'),
                    f.push(t)
                }),
                e.each(s, function(e, n) {
                    t = t.replace(n, f[e])
                }),
                t
            }
            return t
        },
        playerCodeLabel2Html: function(t) {
            var n, r = [], i = /(?:{iframe(?=\s).*?\ssrc=(&quot;)(.*?)\1)([^{}]+}{\/iframe})/img;
            while (n = i.exec(t))
                r.push(n);
            var s = []
              , o = r.length;
            for (var u = 0; u < o; u++) {
                var a = r[u][2];
                if (!/^(https:\/\/)?player.youku.com\//i.test(a) && !/^(https:\/\/)?www.tudou.com\//i.test(a) && !/^(https:\/\/)?v.qq.com\//i.test(a) && !/^(https:\/\/)?imgcache.qq.com\//i.test(a) && !/^(https:\/\/)?open.iqiyi.com\//i.test(a) && !/^(https:\/\/)?player.video.qiyi.com\//i.test(a))
                    continue;
                s.push(r[u][0])
            }
            if (s.length > 0) {
                var f = [];
                return e.each(s, function(e, t) {
                    t = t.replace(/{/g, "<"),
                    t = t.replace(/}/g, ">"),
                    t = t.replace(/&quot;/g, '"'),
                    f.push(t)
                }),
                e.each(s, function(e, n) {
                    t = t.replace(n, f[e])
                }),
                t
            }
            return t
        },
        dataCheckIsEqualZero: function(e) {
            return e = "" + e,
            e == "0" ? !0 : !1
        },
        dataCheckIsGreaterZero: function(e) {
            return e = "" + e,
            /^[1-9]\d*$/.test(e) ? !0 : !1
        },
        dataCheckIsGreaterAndZero: function(e) {
            return e = "" + e,
            /^\d+$/.test(e) ? !0 : !1
        },
        dataCheckGetCidFromInbox: function(e) {
            var t = e - 2147483648;
            return t
        }
    })
}(jQuery),
define("jquery-base", ["jquery"], function(e) {
    return function() {
        var t, n;
        return t || e.jquery - base
    }
}(this)),
function(e) {
    function t(t, n) {
        this.$el = e(t),
        this.options = n,
        this.phState = !0,
        this.type = this.$el.prop("type").toLowerCase(),
        this.generate()
    }
    t.prototype = {
        generate: function() {
            var t = this;
            return this.$el.addClass("wInput wInput-" + this.$el.prop("tagName").toLowerCase()),
            this.setTheme(this.$el, this.options.theme),
            e.support.placeholder || e(document).ready(function() {
                var n = t.$el.attr("placeholder") || "";
                if (t.type === "password") {
                    var r = t.$el
                      , i = e("#" + r.attr("id") + "Placeholder");
                    i.remove(),
                    r.after('<input id="' + r.attr("id") + 'Placeholder" type="text" value="' + n + '" autocomplete="off" />'),
                    i = e("#" + r.attr("id") + "Placeholder"),
                    i.addClass("wInput wInput-input"),
                    t.setTheme(i, t.options.theme),
                    i.addClass("wInput-placeholder"),
                    i.focus(function() {
                        t.onFocus(i, "active")
                    }),
                    i.blur(function() {
                        t.onBlur(i, "active")
                    }),
                    i.hover(function() {
                        t.onFocus(i, "hover")
                    }, function() {
                        t.onBlur(i, "hover")
                    }),
                    i.show(),
                    r.hide(),
                    i.focus(function() {
                        i.hide(),
                        r.show(),
                        r.focus()
                    }),
                    r.blur(function() {
                        r.val() == "" && (i.show(),
                        r.hide())
                    })
                } else
                    t.$el.focus(function() {
                        var e = new RegExp("^" + n + "$|^$");
                        e.test(t.$el.val()) && t.$el.val("").removeClass("wInput-placeholder")
                    }).blur(function() {
                        t.$el.val() == n ? t.$el.addClass("wInput-placeholder") : t.$el.val().length == 0 && t.$el.val(n).addClass("wInput-placeholder")
                    }).blur()
            }),
            this.$el.focus(function() {
                t.onFocus(t.$el, "active")
            }),
            this.$el.blur(function() {
                t.onBlur(t.$el, "active")
            }),
            this.$el.hover(function() {
                t.onFocus(t.$el, "hover")
            }, function() {
                t.onBlur(t.$el, "hover")
            }),
            this.$el
        },
        onFocus: function(e, t) {
            t = t || "active",
            this.options.highlight && e.addClass("wInput-" + t)
        },
        onBlur: function(e, t) {
            t = t || "active",
            this.options.highlight && e.removeClass("wInput-" + t)
        },
        setTheme: function(e, t) {
            e.attr("class", e.attr("class").replace(/wInput-theme-.+\s|wInput-theme-.+$/, "")),
            e.addClass("wInput-theme-" + t)
        }
    },
    e.support.placeholder = "placeholder"in document.createElement("input"),
    e.fn.wInput = function(n, r) {
        function o(r) {
            var i = e.data(r, "wInput");
            if (!i) {
                var s = jQuery.extend(!0, {}, n);
                i = new t(r,s),
                e.data(r, "wInput", i)
            }
            return i
        }
        if (typeof n == "string") {
            var i = []
              , s = this.each(function() {
                var t = e(this).data("wInput");
                if (t) {
                    var s = (r ? "set" : "get") + n.charAt(0).toUpperCase() + n.substring(1).toLowerCase();
                    t[n] ? t[n].apply(t, [r]) : r ? (t[s] && t[s].apply(t, [r]),
                    t.options[n] && (t.options[n] = r)) : t[s] ? i.push(t[s].apply(t, [r])) : t.options[n] ? i.push(t.options[n]) : i.push(null)
                }
            });
            return i.length === 1 ? i[0] : i.length > 0 ? i : s
        }
        return n = e.extend({}, e.fn.wInput.defaults, n),
        this.each(function() {
            var t = e(this).prop("tagName").toLowerCase()
              , n = (e(this).prop("type") || "").toLowerCase();
            (t === "textarea" || t === "input" && (n === "text" || n === "password")) && o(this)
        })
    }
    ,
    e.fn.wInput.defaults = {
        theme: "classic",
        highlight: !0
    }
}(jQuery),
define("jquery-wInput", ["jquery"], function(e) {
    return function() {
        var t, n;
        return t || e.jquery - wInput
    }
}(this)),
function() {
    var e = this
      , t = e._
      , n = {}
      , r = Array.prototype
      , i = Object.prototype
      , s = Function.prototype
      , o = r.push
      , u = r.slice
      , a = r.concat
      , f = i.toString
      , l = i.hasOwnProperty
      , c = r.forEach
      , h = r.map
      , p = r.reduce
      , d = r.reduceRight
      , v = r.filter
      , m = r.every
      , g = r.some
      , y = r.indexOf
      , b = r.lastIndexOf
      , w = Array.isArray
      , E = Object.keys
      , S = s.bind
      , x = function(e) {
        if (e instanceof x)
            return e;
        if (!(this instanceof x))
            return new x(e);
        this._wrapped = e
    };
    typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = x),
    exports._ = x) : e._ = x,
    x.VERSION = "1.6.0";
    var T = x.each = x.forEach = function(e, t, r) {
        if (e == null)
            return e;
        if (c && e.forEach === c)
            e.forEach(t, r);
        else if (e.length === +e.length) {
            for (var i = 0, s = e.length; i < s; i++)
                if (t.call(r, e[i], i, e) === n)
                    return
        } else {
            var o = x.keys(e);
            for (var i = 0, s = o.length; i < s; i++)
                if (t.call(r, e[o[i]], o[i], e) === n)
                    return
        }
        return e
    }
    ;
    x.map = x.collect = function(e, t, n) {
        var r = [];
        return e == null ? r : h && e.map === h ? e.map(t, n) : (T(e, function(e, i, s) {
            r.push(t.call(n, e, i, s))
        }),
        r)
    }
    ;
    var N = "Reduce of empty array with no initial value";
    x.reduce = x.foldl = x.inject = function(e, t, n, r) {
        var i = arguments.length > 2;
        e == null && (e = []);
        if (p && e.reduce === p)
            return r && (t = x.bind(t, r)),
            i ? e.reduce(t, n) : e.reduce(t);
        T(e, function(e, s, o) {
            i ? n = t.call(r, n, e, s, o) : (n = e,
            i = !0)
        });
        if (!i)
            throw new TypeError(N);
        return n
    }
    ,
    x.reduceRight = x.foldr = function(e, t, n, r) {
        var i = arguments.length > 2;
        e == null && (e = []);
        if (d && e.reduceRight === d)
            return r && (t = x.bind(t, r)),
            i ? e.reduceRight(t, n) : e.reduceRight(t);
        var s = e.length;
        if (s !== +s) {
            var o = x.keys(e);
            s = o.length
        }
        T(e, function(u, a, f) {
            a = o ? o[--s] : --s,
            i ? n = t.call(r, n, e[a], a, f) : (n = e[a],
            i = !0)
        });
        if (!i)
            throw new TypeError(N);
        return n
    }
    ,
    x.find = x.detect = function(e, t, n) {
        var r;
        return C(e, function(e, i, s) {
            if (t.call(n, e, i, s))
                return r = e,
                !0
        }),
        r
    }
    ,
    x.filter = x.select = function(e, t, n) {
        var r = [];
        return e == null ? r : v && e.filter === v ? e.filter(t, n) : (T(e, function(e, i, s) {
            t.call(n, e, i, s) && r.push(e)
        }),
        r)
    }
    ,
    x.reject = function(e, t, n) {
        return x.filter(e, function(e, r, i) {
            return !t.call(n, e, r, i)
        }, n)
    }
    ,
    x.every = x.all = function(e, t, r) {
        t || (t = x.identity);
        var i = !0;
        return e == null ? i : m && e.every === m ? e.every(t, r) : (T(e, function(e, s, o) {
            if (!(i = i && t.call(r, e, s, o)))
                return n
        }),
        !!i)
    }
    ;
    var C = x.some = x.any = function(e, t, r) {
        t || (t = x.identity);
        var i = !1;
        return e == null ? i : g && e.some === g ? e.some(t, r) : (T(e, function(e, s, o) {
            if (i || (i = t.call(r, e, s, o)))
                return n
        }),
        !!i)
    }
    ;
    x.contains = x.include = function(e, t) {
        return e == null ? !1 : y && e.indexOf === y ? e.indexOf(t) != -1 : C(e, function(e) {
            return e === t
        })
    }
    ,
    x.invoke = function(e, t) {
        var n = u.call(arguments, 2)
          , r = x.isFunction(t);
        return x.map(e, function(e) {
            return (r ? t : e[t]).apply(e, n)
        })
    }
    ,
    x.pluck = function(e, t) {
        return x.map(e, x.property(t))
    }
    ,
    x.where = function(e, t) {
        return x.filter(e, x.matches(t))
    }
    ,
    x.findWhere = function(e, t) {
        return x.find(e, x.matches(t))
    }
    ,
    x.max = function(e, t, n) {
        if (!t && x.isArray(e) && e[0] === +e[0] && e.length < 65535)
            return Math.max.apply(Math, e);
        var r = -Infinity
          , i = -Infinity;
        return T(e, function(e, s, o) {
            var u = t ? t.call(n, e, s, o) : e;
            u > i && (r = e,
            i = u)
        }),
        r
    }
    ,
    x.min = function(e, t, n) {
        if (!t && x.isArray(e) && e[0] === +e[0] && e.length < 65535)
            return Math.min.apply(Math, e);
        var r = Infinity
          , i = Infinity;
        return T(e, function(e, s, o) {
            var u = t ? t.call(n, e, s, o) : e;
            u < i && (r = e,
            i = u)
        }),
        r
    }
    ,
    x.shuffle = function(e) {
        var t, n = 0, r = [];
        return T(e, function(e) {
            t = x.random(n++),
            r[n - 1] = r[t],
            r[t] = e
        }),
        r
    }
    ,
    x.sample = function(e, t, n) {
        return t == null || n ? (e.length !== +e.length && (e = x.values(e)),
        e[x.random(e.length - 1)]) : x.shuffle(e).slice(0, Math.max(0, t))
    }
    ;
    var k = function(e) {
        return e == null ? x.identity : x.isFunction(e) ? e : x.property(e)
    };
    x.sortBy = function(e, t, n) {
        return t = k(t),
        x.pluck(x.map(e, function(e, r, i) {
            return {
                value: e,
                index: r,
                criteria: t.call(n, e, r, i)
            }
        }).sort(function(e, t) {
            var n = e.criteria
              , r = t.criteria;
            if (n !== r) {
                if (n > r || n === void 0)
                    return 1;
                if (n < r || r === void 0)
                    return -1
            }
            return e.index - t.index
        }), "value")
    }
    ;
    var L = function(e) {
        return function(t, n, r) {
            var i = {};
            return n = k(n),
            T(t, function(s, o) {
                var u = n.call(r, s, o, t);
                e(i, u, s)
            }),
            i
        }
    };
    x.groupBy = L(function(e, t, n) {
        x.has(e, t) ? e[t].push(n) : e[t] = [n]
    }),
    x.indexBy = L(function(e, t, n) {
        e[t] = n
    }),
    x.countBy = L(function(e, t) {
        x.has(e, t) ? e[t]++ : e[t] = 1
    }),
    x.sortedIndex = function(e, t, n, r) {
        n = k(n);
        var i = n.call(r, t)
          , s = 0
          , o = e.length;
        while (s < o) {
            var u = s + o >>> 1;
            n.call(r, e[u]) < i ? s = u + 1 : o = u
        }
        return s
    }
    ,
    x.toArray = function(e) {
        return e ? x.isArray(e) ? u.call(e) : e.length === +e.length ? x.map(e, x.identity) : x.values(e) : []
    }
    ,
    x.size = function(e) {
        return e == null ? 0 : e.length === +e.length ? e.length : x.keys(e).length
    }
    ,
    x.first = x.head = x.take = function(e, t, n) {
        return e == null ? void 0 : t == null || n ? e[0] : t < 0 ? [] : u.call(e, 0, t)
    }
    ,
    x.initial = function(e, t, n) {
        return u.call(e, 0, e.length - (t == null || n ? 1 : t))
    }
    ,
    x.last = function(e, t, n) {
        return e == null ? void 0 : t == null || n ? e[e.length - 1] : u.call(e, Math.max(e.length - t, 0))
    }
    ,
    x.rest = x.tail = x.drop = function(e, t, n) {
        return u.call(e, t == null || n ? 1 : t)
    }
    ,
    x.compact = function(e) {
        return x.filter(e, x.identity)
    }
    ;
    var A = function(e, t, n) {
        return t && x.every(e, x.isArray) ? a.apply(n, e) : (T(e, function(e) {
            x.isArray(e) || x.isArguments(e) ? t ? o.apply(n, e) : A(e, t, n) : n.push(e)
        }),
        n)
    };
    x.flatten = function(e, t) {
        return A(e, t, [])
    }
    ,
    x.without = function(e) {
        return x.difference(e, u.call(arguments, 1))
    }
    ,
    x.partition = function(e, t, n) {
        t = k(t);
        var r = []
          , i = [];
        return T(e, function(e) {
            (t.call(n, e) ? r : i).push(e)
        }),
        [r, i]
    }
    ,
    x.uniq = x.unique = function(e, t, n, r) {
        x.isFunction(t) && (r = n,
        n = t,
        t = !1);
        var i = n ? x.map(e, n, r) : e
          , s = []
          , o = [];
        return T(i, function(n, r) {
            if (t ? !r || o[o.length - 1] !== n : !x.contains(o, n))
                o.push(n),
                s.push(e[r])
        }),
        s
    }
    ,
    x.union = function() {
        return x.uniq(x.flatten(arguments, !0))
    }
    ,
    x.intersection = function(e) {
        var t = u.call(arguments, 1);
        return x.filter(x.uniq(e), function(e) {
            return x.every(t, function(t) {
                return x.contains(t, e)
            })
        })
    }
    ,
    x.difference = function(e) {
        var t = a.apply(r, u.call(arguments, 1));
        return x.filter(e, function(e) {
            return !x.contains(t, e)
        })
    }
    ,
    x.zip = function() {
        var e = x.max(x.pluck(arguments, "length").concat(0))
          , t = new Array(e);
        for (var n = 0; n < e; n++)
            t[n] = x.pluck(arguments, "" + n);
        return t
    }
    ,
    x.object = function(e, t) {
        if (e == null)
            return {};
        var n = {};
        for (var r = 0, i = e.length; r < i; r++)
            t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
        return n
    }
    ,
    x.indexOf = function(e, t, n) {
        if (e == null)
            return -1;
        var r = 0
          , i = e.length;
        if (n) {
            if (typeof n != "number")
                return r = x.sortedIndex(e, t),
                e[r] === t ? r : -1;
            r = n < 0 ? Math.max(0, i + n) : n
        }
        if (y && e.indexOf === y)
            return e.indexOf(t, n);
        for (; r < i; r++)
            if (e[r] === t)
                return r;
        return -1
    }
    ,
    x.lastIndexOf = function(e, t, n) {
        if (e == null)
            return -1;
        var r = n != null;
        if (b && e.lastIndexOf === b)
            return r ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
        var i = r ? n : e.length;
        while (i--)
            if (e[i] === t)
                return i;
        return -1
    }
    ,
    x.range = function(e, t, n) {
        arguments.length <= 1 && (t = e || 0,
        e = 0),
        n = arguments[2] || 1;
        var r = Math.max(Math.ceil((t - e) / n), 0)
          , i = 0
          , s = new Array(r);
        while (i < r)
            s[i++] = e,
            e += n;
        return s
    }
    ;
    var O = function() {};
    x.bind = function(e, t) {
        var n, r;
        if (S && e.bind === S)
            return S.apply(e, u.call(arguments, 1));
        if (!x.isFunction(e))
            throw new TypeError;
        return n = u.call(arguments, 2),
        r = function() {
            if (this instanceof r) {
                O.prototype = e.prototype;
                var i = new O;
                O.prototype = null;
                var s = e.apply(i, n.concat(u.call(arguments)));
                return Object(s) === s ? s : i
            }
            return e.apply(t, n.concat(u.call(arguments)))
        }
    }
    ,
    x.partial = function(e) {
        var t = u.call(arguments, 1);
        return function() {
            var n = 0
              , r = t.slice();
            for (var i = 0, s = r.length; i < s; i++)
                r[i] === x && (r[i] = arguments[n++]);
            while (n < arguments.length)
                r.push(arguments[n++]);
            return e.apply(this, r)
        }
    }
    ,
    x.bindAll = function(e) {
        var t = u.call(arguments, 1);
        if (t.length === 0)
            throw new Error("bindAll must be passed function names");
        return T(t, function(t) {
            e[t] = x.bind(e[t], e)
        }),
        e
    }
    ,
    x.memoize = function(e, t) {
        var n = {};
        return t || (t = x.identity),
        function() {
            var r = t.apply(this, arguments);
            return x.has(n, r) ? n[r] : n[r] = e.apply(this, arguments)
        }
    }
    ,
    x.delay = function(e, t) {
        var n = u.call(arguments, 2);
        return setTimeout(function() {
            return e.apply(null, n)
        }, t)
    }
    ,
    x.defer = function(e) {
        return x.delay.apply(x, [e, 1].concat(u.call(arguments, 1)))
    }
    ,
    x.throttle = function(e, t, n) {
        var r, i, s, o = null, u = 0;
        n || (n = {});
        var a = function() {
            u = n.leading === !1 ? 0 : x.now(),
            o = null,
            s = e.apply(r, i),
            r = i = null
        };
        return function() {
            var f = x.now();
            !u && n.leading === !1 && (u = f);
            var l = t - (f - u);
            return r = this,
            i = arguments,
            l <= 0 ? (clearTimeout(o),
            o = null,
            u = f,
            s = e.apply(r, i),
            r = i = null) : !o && n.trailing !== !1 && (o = setTimeout(a, l)),
            s
        }
    }
    ,
    x.debounce = function(e, t, n) {
        var r, i, s, o, u, a = function() {
            var f = x.now() - o;
            f < t ? r = setTimeout(a, t - f) : (r = null,
            n || (u = e.apply(s, i),
            s = i = null))
        };
        return function() {
            s = this,
            i = arguments,
            o = x.now();
            var f = n && !r;
            return r || (r = setTimeout(a, t)),
            f && (u = e.apply(s, i),
            s = i = null),
            u
        }
    }
    ,
    x.once = function(e) {
        var t = !1, n;
        return function() {
            return t ? n : (t = !0,
            n = e.apply(this, arguments),
            e = null,
            n)
        }
    }
    ,
    x.wrap = function(e, t) {
        return x.partial(t, e)
    }
    ,
    x.compose = function() {
        var e = arguments;
        return function() {
            var t = arguments;
            for (var n = e.length - 1; n >= 0; n--)
                t = [e[n].apply(this, t)];
            return t[0]
        }
    }
    ,
    x.after = function(e, t) {
        return function() {
            if (--e < 1)
                return t.apply(this, arguments)
        }
    }
    ,
    x.keys = function(e) {
        if (!x.isObject(e))
            return [];
        if (E)
            return E(e);
        var t = [];
        for (var n in e)
            x.has(e, n) && t.push(n);
        return t
    }
    ,
    x.values = function(e) {
        var t = x.keys(e)
          , n = t.length
          , r = new Array(n);
        for (var i = 0; i < n; i++)
            r[i] = e[t[i]];
        return r
    }
    ,
    x.pairs = function(e) {
        var t = x.keys(e)
          , n = t.length
          , r = new Array(n);
        for (var i = 0; i < n; i++)
            r[i] = [t[i], e[t[i]]];
        return r
    }
    ,
    x.invert = function(e) {
        var t = {}
          , n = x.keys(e);
        for (var r = 0, i = n.length; r < i; r++)
            t[e[n[r]]] = n[r];
        return t
    }
    ,
    x.functions = x.methods = function(e) {
        var t = [];
        for (var n in e)
            x.isFunction(e[n]) && t.push(n);
        return t.sort()
    }
    ,
    x.extend = function(e) {
        return T(u.call(arguments, 1), function(t) {
            if (t)
                for (var n in t)
                    e[n] = t[n]
        }),
        e
    }
    ,
    x.pick = function(e) {
        var t = {}
          , n = a.apply(r, u.call(arguments, 1));
        return T(n, function(n) {
            n in e && (t[n] = e[n])
        }),
        t
    }
    ,
    x.omit = function(e) {
        var t = {}
          , n = a.apply(r, u.call(arguments, 1));
        for (var i in e)
            x.contains(n, i) || (t[i] = e[i]);
        return t
    }
    ,
    x.defaults = function(e) {
        return T(u.call(arguments, 1), function(t) {
            if (t)
                for (var n in t)
                    e[n] === void 0 && (e[n] = t[n])
        }),
        e
    }
    ,
    x.clone = function(e) {
        return x.isObject(e) ? x.isArray(e) ? e.slice() : x.extend({}, e) : e
    }
    ,
    x.tap = function(e, t) {
        return t(e),
        e
    }
    ;
    var M = function(e, t, n, r) {
        if (e === t)
            return e !== 0 || 1 / e == 1 / t;
        if (e == null || t == null)
            return e === t;
        e instanceof x && (e = e._wrapped),
        t instanceof x && (t = t._wrapped);
        var i = f.call(e);
        if (i != f.call(t))
            return !1;
        switch (i) {
        case "[object String]":
            return e == String(t);
        case "[object Number]":
            return e != +e ? t != +t : e == 0 ? 1 / e == 1 / t : e == +t;
        case "[object Date]":
        case "[object Boolean]":
            return +e == +t;
        case "[object RegExp]":
            return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
        }
        if (typeof e != "object" || typeof t != "object")
            return !1;
        var s = n.length;
        while (s--)
            if (n[s] == e)
                return r[s] == t;
        var o = e.constructor
          , u = t.constructor;
        if (o !== u && !(x.isFunction(o) && o instanceof o && x.isFunction(u) && u instanceof u) && "constructor"in e && "constructor"in t)
            return !1;
        n.push(e),
        r.push(t);
        var a = 0
          , l = !0;
        if (i == "[object Array]") {
            a = e.length,
            l = a == t.length;
            if (l)
                while (a--)
                    if (!(l = M(e[a], t[a], n, r)))
                        break
        } else {
            for (var c in e)
                if (x.has(e, c)) {
                    a++;
                    if (!(l = x.has(t, c) && M(e[c], t[c], n, r)))
                        break
                }
            if (l) {
                for (c in t)
                    if (x.has(t, c) && !(a--))
                        break;
                l = !a
            }
        }
        return n.pop(),
        r.pop(),
        l
    };
    x.isEqual = function(e, t) {
        return M(e, t, [], [])
    }
    ,
    x.isEmpty = function(e) {
        if (e == null)
            return !0;
        if (x.isArray(e) || x.isString(e))
            return e.length === 0;
        for (var t in e)
            if (x.has(e, t))
                return !1;
        return !0
    }
    ,
    x.isElement = function(e) {
        return !!e && e.nodeType === 1
    }
    ,
    x.isArray = w || function(e) {
        return f.call(e) == "[object Array]"
    }
    ,
    x.isObject = function(e) {
        return e === Object(e)
    }
    ,
    T(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(e) {
        x["is" + e] = function(t) {
            return f.call(t) == "[object " + e + "]"
        }
    }),
    x.isArguments(arguments) || (x.isArguments = function(e) {
        return !!e && !!x.has(e, "callee")
    }
    ),
    typeof /./ != "function" && (x.isFunction = function(e) {
        return typeof e == "function"
    }
    ),
    x.isFinite = function(e) {
        return isFinite(e) && !isNaN(parseFloat(e))
    }
    ,
    x.isNaN = function(e) {
        return x.isNumber(e) && e != +e
    }
    ,
    x.isBoolean = function(e) {
        return e === !0 || e === !1 || f.call(e) == "[object Boolean]"
    }
    ,
    x.isNull = function(e) {
        return e === null
    }
    ,
    x.isUndefined = function(e) {
        return e === void 0
    }
    ,
    x.has = function(e, t) {
        return l.call(e, t)
    }
    ,
    x.noConflict = function() {
        return e._ = t,
        this
    }
    ,
    x.identity = function(e) {
        return e
    }
    ,
    x.constant = function(e) {
        return function() {
            return e
        }
    }
    ,
    x.property = function(e) {
        return function(t) {
            return t[e]
        }
    }
    ,
    x.matches = function(e) {
        return function(t) {
            if (t === e)
                return !0;
            for (var n in e)
                if (e[n] !== t[n])
                    return !1;
            return !0
        }
    }
    ,
    x.times = function(e, t, n) {
        var r = Array(Math.max(0, e));
        for (var i = 0; i < e; i++)
            r[i] = t.call(n, i);
        return r
    }
    ,
    x.random = function(e, t) {
        return t == null && (t = e,
        e = 0),
        e + Math.floor(Math.random() * (t - e + 1))
    }
    ,
    x.now = Date.now || function() {
        return (new Date).getTime()
    }
    ;
    var _ = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;"
        }
    };
    _.unescape = x.invert(_.escape);
    var D = {
        escape: new RegExp("[" + x.keys(_.escape).join("") + "]","g"),
        unescape: new RegExp("(" + x.keys(_.unescape).join("|") + ")","g")
    };
    x.each(["escape", "unescape"], function(e) {
        x[e] = function(t) {
            return t == null ? "" : ("" + t).replace(D[e], function(t) {
                return _[e][t]
            })
        }
    }),
    x.result = function(e, t) {
        if (e == null)
            return void 0;
        var n = e[t];
        return x.isFunction(n) ? n.call(e) : n
    }
    ,
    x.mixin = function(e) {
        T(x.functions(e), function(t) {
            var n = x[t] = e[t];
            x.prototype[t] = function() {
                var e = [this._wrapped];
                return o.apply(e, arguments),
                F.call(this, n.apply(x, e))
            }
        })
    }
    ;
    var P = 0;
    x.uniqueId = function(e) {
        var t = ++P + "";
        return e ? e + t : t
    }
    ,
    x.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var H = /(.)^/
      , B = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }
      , j = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    x.template = function(e, t, n) {
        var r;
        n = x.defaults({}, n, x.templateSettings);
        var i = new RegExp([(n.escape || H).source, (n.interpolate || H).source, (n.evaluate || H).source].join("|") + "|$","g")
          , s = 0
          , o = "__p+='";
        e.replace(i, function(t, n, r, i, u) {
            return o += e.slice(s, u).replace(j, function(e) {
                return "\\" + B[e]
            }),
            n && (o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"),
            r && (o += "'+\n((__t=(" + r + "))==null?'':__t)+\n'"),
            i && (o += "';\n" + i + "\n__p+='"),
            s = u + t.length,
            t
        }),
        o += "';\n",
        n.variable || (o = "with(obj||{}){\n" + o + "}\n"),
        o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
        try {
            r = new Function(n.variable || "obj","_",o)
        } catch (u) {
            throw u.source = o,
            u
        }
        if (t)
            return r(t, x);
        var a = function(e) {
            return r.call(this, e, x)
        };
        return a.source = "function(" + (n.variable || "obj") + "){\n" + o + "}",
        a
    }
    ,
    x.chain = function(e) {
        return x(e).chain()
    }
    ;
    var F = function(e) {
        return this._chain ? x(e).chain() : e
    };
    x.mixin(x),
    T(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
        var t = r[e];
        x.prototype[e] = function() {
            var n = this._wrapped;
            return t.apply(n, arguments),
            (e == "shift" || e == "splice") && n.length === 0 && delete n[0],
            F.call(this, n)
        }
    }),
    T(["concat", "join", "slice"], function(e) {
        var t = r[e];
        x.prototype[e] = function() {
            return F.call(this, t.apply(this._wrapped, arguments))
        }
    }),
    x.extend(x.prototype, {
        chain: function() {
            return this._chain = !0,
            this
        },
        value: function() {
            return this._wrapped
        }
    }),
    typeof define == "function" && define.amd && define("underscore", [], function() {
        return x
    })
}
.call(this),
define("text", ["module"], function(e) {
    var t, n, r, i, s, o = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"], u = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, a = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, f = typeof location != "undefined" && location.href, l = f && location.protocol && location.protocol.replace(/\:/, ""), c = f && location.hostname, h = f && (location.port || undefined), p = {}, d = e.config && e.config() || {};
    t = {
        version: "2.0.10",
        strip: function(e) {
            if (e) {
                e = e.replace(u, "");
                var t = e.match(a);
                t && (e = t[1])
            } else
                e = "";
            return e
        },
        jsEscape: function(e) {
            return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
        },
        createXhr: d.createXhr || function() {
            var e, t, n;
            if (typeof XMLHttpRequest != "undefined")
                return new XMLHttpRequest;
            if (typeof ActiveXObject != "undefined")
                for (t = 0; t < 3; t += 1) {
                    n = o[t];
                    try {
                        e = new ActiveXObject(n)
                    } catch (r) {}
                    if (e) {
                        o = [n];
                        break
                    }
                }
            return e
        }
        ,
        parseName: function(e) {
            var t, n, r, i = !1, s = e.indexOf("."), o = e.indexOf("./") === 0 || e.indexOf("../") === 0;
            return s !== -1 && (!o || s > 1) ? (t = e.substring(0, s),
            n = e.substring(s + 1, e.length)) : t = e,
            r = n || t,
            s = r.indexOf("!"),
            s !== -1 && (i = r.substring(s + 1) === "strip",
            r = r.substring(0, s),
            n ? n = r : t = r),
            {
                moduleName: t,
                ext: n,
                strip: i
            }
        },
        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
        useXhr: function(e, n, r, i) {
            var s, o, u, a = t.xdRegExp.exec(e);
            return a ? (s = a[2],
            o = a[3],
            o = o.split(":"),
            u = o[1],
            o = o[0],
            (!s || s === n) && (!o || o.toLowerCase() === r.toLowerCase()) && (!u && !o || u === i)) : !0
        },
        finishLoad: function(e, n, r, i) {
            r = n ? t.strip(r) : r,
            d.isBuild && (p[e] = r),
            i(r)
        },
        load: function(e, n, r, i) {
            if (i.isBuild && !i.inlineText) {
                r();
                return
            }
            d.isBuild = i.isBuild;
            var s = t.parseName(e)
              , o = s.moduleName + (s.ext ? "." + s.ext : "")
              , u = n.toUrl(o)
              , a = d.useXhr || t.useXhr;
            if (u.indexOf("empty:") === 0) {
                r();
                return
            }
            !f || a(u, l, c, h) ? t.get(u, function(n) {
                t.finishLoad(e, s.strip, n, r)
            }, function(e) {
                r.error && r.error(e)
            }) : n([o], function(e) {
                t.finishLoad(s.moduleName + "." + s.ext, s.strip, e, r)
            })
        },
        write: function(e, n, r, i) {
            if (p.hasOwnProperty(n)) {
                var s = t.jsEscape(p[n]);
                r.asModule(e + "!" + n, "define(function () { return '" + s + "';});\n")
            }
        },
        writeFile: function(e, n, r, i, s) {
            var o = t.parseName(n)
              , u = o.ext ? "." + o.ext : ""
              , a = o.moduleName + u
              , f = r.toUrl(o.moduleName + u) + ".js";
            t.load(a, r, function(n) {
                var r = function(e) {
                    return i(f, e)
                };
                r.asModule = function(e, t) {
                    return i.asModule(e, f, t)
                }
                ,
                t.write(e, a, r, s)
            }, s)
        }
    };
    if (d.env === "node" || !d.env && typeof process != "undefined" && process.versions && !!process.versions.node && !process.versions["node-webkit"])
        n = require.nodeRequire("fs"),
        t.get = function(e, t, r) {
            try {
                var i = n.readFileSync(e, "utf8");
                i.indexOf("﻿") === 0 && (i = i.substring(1)),
                t(i)
            } catch (s) {
                r(s)
            }
        }
        ;
    else if (d.env === "xhr" || !d.env && t.createXhr())
        t.get = function(e, n, r, i) {
            var s = t.createXhr(), o;
            s.open("GET", e, !0);
            if (i)
                for (o in i)
                    i.hasOwnProperty(o) && s.setRequestHeader(o.toLowerCase(), i[o]);
            d.onXhr && d.onXhr(s, e),
            s.onreadystatechange = function(t) {
                var i, o;
                s.readyState === 4 && (i = s.status,
                i > 399 && i < 600 ? (o = new Error(e + " HTTP status: " + i),
                o.xhr = s,
                r(o)) : n(s.responseText),
                d.onXhrComplete && d.onXhrComplete(s, e))
            }
            ,
            s.send(null)
        }
        ;
    else if (d.env === "rhino" || !d.env && typeof Packages != "undefined" && typeof java != "undefined")
        t.get = function(e, t) {
            var n, r, i = "utf-8", s = new java.io.File(e), o = java.lang.System.getProperty("line.separator"), u = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s),i)), a = "";
            try {
                n = new java.lang.StringBuffer,
                r = u.readLine(),
                r && r.length() && r.charAt(0) === 65279 && (r = r.substring(1)),
                r !== null && n.append(r);
                while ((r = u.readLine()) !== null)
                    n.append(o),
                    n.append(r);
                a = String(n.toString())
            } finally {
                u.close()
            }
            t(a)
        }
        ;
    else if (d.env === "xpconnect" || !d.env && typeof Components != "undefined" && Components.classes && Components.interfaces)
        r = Components.classes,
        i = Components.interfaces,
        Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),
        s = "@mozilla.org/windows-registry-key;1"in r,
        t.get = function(e, t) {
            var n, o, u, a = {};
            s && (e = e.replace(/\//g, "\\")),
            u = new FileUtils.File(e);
            try {
                n = r["@mozilla.org/network/file-input-stream;1"].createInstance(i.nsIFileInputStream),
                n.init(u, 1, 0, !1),
                o = r["@mozilla.org/intl/converter-input-stream;1"].createInstance(i.nsIConverterInputStream),
                o.init(n, "utf-8", n.available(), i.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),
                o.readString(n.available(), a),
                o.close(),
                n.close(),
                t(a.value)
            } catch (f) {
                throw new Error((u && u.path || "") + ": " + f)
            }
        }
        ;
    return t
}),
define("mclass/paperanalysis", ["jquery"], function(e) {
    function t() {}
    return t.prototype = {
        tableTop: "",
        tableFirst: "",
        singleAry: [],
        examerList: [],
        formatedExamerList: [],
        examerTrs: "",
        paperData: [],
        examerData: [],
        step: 0,
        init: function() {
            this.step = 0,
            this.xhrGetMarkData()
        },
        xhrGetMarkData: function() {
            if (this.step > 25)
                return;
            var t = this
              , n = {
                pid: gPid,
                tid: gTid,
                cid: gCid,
                idpaging: gidpaging,
                step: this.step
            }
              , r = "/class/score/examcontent";
            e.xhrPost(r, n).done(function(e) {
                t.xhrGetExamContentDone(e)
            }).fail(function(t, n) {
                e.ligerDialog.debug("ajax", t, this)
            })
        },
        xhrGetExamContentDone: function(t) {
            if (typeof t != "object") {
                t = "" + t;
                switch (t) {
                case "0":
                case "-1":
                case "-2":
                    e.ligerDialog.errorback(t, "试卷分析");
                    break;
                case "-3":
                    var n = "没有足够权限，或页面已失效";
                    e.ligerDialog.errorback(t, "试卷分析", n);
                    break;
                default:
                    e.ligerDialog.debug("InvalidResponse", null, this, t)
                }
                return
            }
            this.mergeCallbackData(t),
            t["hasData"] == 1 && (this.step++,
            this.xhrGetMarkData())
        },
        mergeCallbackData: function(t) {
            this.step == 0 && (this.paperData = this.standardizeQid4js(t.paperData));
            var n = t.examerData
              , r = this.examerData;
            this.examerData = r.concat(n),
            r = null;
            if (!t.hasData) {
                r = this.examerData;
                var i;
                e.each(r, function(e, t) {
                    t["showorder"] == null ? i = 2001 : i = parseInt(t.showorder),
                    r[e].showorder = i
                }),
                r.sort(function(e, t) {
                    return e.showorder - t.showorder
                }),
                this.examerData = r,
                r = null,
                this.limitTime(0, 50)
            }
        },
        drawErrorPage: function() {
            e("#complexPane").html("没有已交已阅的答卷，未能分析").css("display", "block");
            var t = "100%";
            e("#progressBar").find(".progressBarFull").css("width", t),
            e("#progressBar").find(".progressBarLabel").html(t),
            setTimeout(function() {
                e("#paperanalysisContent").css("display", "block"),
                e("#progressPane").css("display", "none")
            }, 1e3)
        },
        drawAnalysisTable: function() {
            var t = "<table>"
              , n = "</table>"
              , r = '<tr><td nowrap colspan="3" rowspan="2" style="background-color:#7f94b6;color:white;padding-left:5px;padding-right:5px;">试卷对错率分析</td>'
              , i = "<tr>"
              , s = '<tr><td nowrap colspan="3" rowspan="2" style="background-color:#7f94b6;color:white;padding-left:5px;padding-right:5px;">各考生之答案和得分情况</td>'
              , o = "<tr>"
              , u = '<tr style="height:2px;line-height:2px;"><td colspan="3"></td>'
              , a = "<td colspan='" + this.singleAry.length + "'>&nbsp;</td>";
            u += a + "</tr>";
            var f = this
              , l = 0
              , c = 0
              , h = ""
              , p = ""
              , d = !1;
            e.each(this.paperData, function(t, n) {
                var u = n.id;
                if (/^b/.test(u)) {
                    d = !1,
                    h = p;
                    var a = n.c
                      , v = n.p;
                    switch (v) {
                    case "1":
                        d = !0,
                        a == "" ? p = "试题号" : p = f.filterPartContent(a);
                        break;
                    case "2":
                        l = 0,
                        d = !0,
                        a == "" ? p = "试题号" : p = f.filterPartContent(a);
                        break;
                    default:
                    }
                    d && c > 0 && (r = r + '<td nowrap colspan="' + c + '">' + e.escape(h) + "</td>",
                    s = s + '<td nowrap colspan="' + c + '">' + e.escape(h) + "</td>",
                    c = 0)
                } else
                    /^s/.test(u) && (c++,
                    l++,
                    i = i + "<td>" + l + "</td>",
                    o = o + "<td>" + l + "</td>")
            }),
            c > 0 && (r = r + '<td nowrap colspan="' + c + '">' + e.escape(p) + "</td>",
            s = s + '<td nowrap colspan="' + c + '">' + e.escape(p) + "</td>",
            c = 0),
            r += "</tr>",
            i += "</tr>";
            var v = '<tr class="ansTrClass"><td style="background-color:white;" nowrap colspan="3">标准答案／试题分数</td>' + this.drawRefAnswerCells() + "</tr>";
            s += "</tr>",
            o += "</tr>";
            var m = '<tr class="ansTrClass"><td style="background-color:white;padding-left:5px;padding-right:5px;" nowrap>账号／学号</td><td style="background-color:white;padding-left:5px;padding-right:5px;" nowrap>姓名</td><td style="background-color:white;padding-left:5px;padding-right:5px;" nowrap>总得分</td>' + this.drawRefAnswerCells() + "</tr>";
            this.tableTop = r + i + v + u,
            this.tableFirst = s + o + m + u;
            var g = this.drawAnswerCountTr()
              , y = this.drawErrorRatioTr()
              , b = this.drawDifficultyTr()
              , w = this.drawMemoTrs()
              , E = this.drawBlankLineTrs()
              , S = this.examerTrs
              , x = '<tr class="ansTrClass"><td style="background-color:white;" nowrap colspan="3">标准答案／试题分数</td>';
            x += this.drawRefAnswerCells();
            var T = t + this.tableTop + g + y + b + w + E + this.tableFirst + S + u + x + n;
            e("#complexPane").html(T).css("display", "block")
        },
        drawRefAnswerCells: function() {
            var t = "";
            return e.each(this.singleAry, function(e, n) {
                var r = n.showLabel;
                t += "<td>" + r + "</td>"
            }),
            t
        },
        drawAnswerCountTr: function() {
            var t = '<tr><td nowrap colspan="3">各选项人数统计</td>';
            return e.each(this.singleAry, function(n, r) {
                var i = ""
                  , s = r.id
                  , o = s.split("_")
                  , u = o[0].substr(1);
                switch (u) {
                case "1":
                case "2":
                    var a = r.answerCount
                      , f = 0
                      , l = a.length;
                    for (var c = 0; c < 26 && f < l; c++) {
                        var h = String.fromCharCode(65 + c);
                        for (var p = 0; p < l; p++) {
                            var d = a[p]
                              , v = d.label
                              , m = d.count;
                            if (v == h) {
                                f++,
                                i += v + "：" + m + "&nbsp;人<br>";
                                break
                            }
                        }
                    }
                    break;
                case "3":
                    var a = r.answerCount;
                    e.each(a, function(e, t) {
                        var n = t.label
                          , r = t.count;
                        r > 0 && (i += n + "：" + r + "&nbsp;人<br>")
                    });
                    break;
                case "4":
                case "5":
                    i += "&#12288;&#12288;"
                }
                t += '<td nowrap style="text-align:left;">' + i + "</td>"
            }),
            t += "</tr>",
            t
        },
        drawErrorRatioTr: function() {
            var t = this.formatedExamerList.length
              , n = '<tr><td nowrap colspan="3">错误率</td>';
            return e.each(this.singleAry, function(e, r) {
                var i = ""
                  , s = r.id
                  , o = s.split("_")
                  , u = o[0].substr(1);
                switch (u) {
                case "1":
                case "2":
                case "3":
                    var a = r.rightCount;
                    i = Math.floor(100 * (1 - a / t)) + "%";
                    break;
                case "4":
                case "5":
                    i = ""
                }
                n += "<td nowrap>" + i + "</td>"
            }),
            n += "</tr>",
            n
        },
        drawDifficultyTr: function() {
            var t = this.formatedExamerList.length
              , n = '<tr><td nowrap colspan="3">难度</td>'
              , r = this;
            return e.each(this.singleAry, function(r, i) {
                var s = ""
                  , o = i.sumScore;
                o < 0 && (o = 0);
                var u = o / t
                  , a = parseFloat(i.p);
                !isNaN(a) && a > 0 && (s = e.toFixedFloat(u / a, 2)),
                n += "<td nowrap>" + s + "</td>"
            }),
            n += "</tr>",
            n
        },
        drawBlankLineTrs: function() {
            var e = '<tr style="height:40px;line-height:40px;">'
              , t = this.singleAry.length
              , n = 3 + t
              , r = "<td colspan='" + n + "' style='border-left:1px solid white;border-right:1px solid white;'>&nbsp;</td>";
            return e += r + "</tr>",
            e
        },
        drawMemoTrs: function() {
            var e = "<tr>"
              , t = this.singleAry.length
              , n = 3 + t
              , r = "<td colspan='" + n + "' style='border:1px solid white;color:#ccc;text-align:left'>" + "&nbsp;*&nbsp;难度P=平均分/满分（范围0～1，P越大表示试题越简单，P越小表示试题越难。p值在0.3～0.7之间比较合适。 ）" + "</td>";
            return e += r + "</tr>",
            e
        },
        drawExamerTrs: function(t) {
            var n = []
              , r = this.formatedExamerList.length;
            if (r <= 0)
                return;
            for (var i = (Math.floor((r - 1) / 10) + 1) * t; i < r && i < (Math.floor((r - 1) / 10) + 1) * (t + 1); i++) {
                var s = this.formatedExamerList[i], o, u;
                s.rsstudentip != 0 && s.rsstudentname ? (e.dataCheckIsEqualZero(s.uid) ? o = s.rsstudentid : o = s.uid,
                u = s.rsstudentname) : (o = s.uid,
                s.userremark ? u = s.userremark : u = s.displayname),
                e.dataCheckIsEqualZero(o) && (o = "");
                var a = '<tr><td style="padding-left:5px;padding-right:5px;text-align:right;" nowrap>' + e.escape(o) + '</td><td style="padding-left:5px;padding-right:5px;text-align:left;" nowrap>' + e.escape(u) + '</td><td style="padding-left:5px;padding-right:5px;" nowrap>' + s.totalscore + "</td>";
                n.push(a);
                var f = s.drawlist;
                e.each(f, function(e, t) {
                    if (t) {
                        var r = t.showLabel
                          , i = "<td>" + r + "</td>";
                        n.push(i)
                    } else {
                        var i = "<td>&nbsp;</td>";
                        n.push(i)
                    }
                });
                var l = "</tr>";
                n.push(l)
            }
            return n.join("")
        },
        filterPartContent: function(t) {
            t = t.replace(/<([^>]*)>|<\/\1>/gim, "");
            var n = ["（", "(", "。", "：", "：", ":", "：", "{", "[", "(", "｛", "［", "（", "『", "【", "（", "｛", "【", "（"], r, i = n.length;
            t = "" + t;
            for (var s = 0; s < i; s++)
                r = t.indexOf(n[s]),
                r >= 0 && (t = t.substr(0, r));
            return t = t.replace(/&nbsp;/g, " "),
            t = t.replace(/\u3000/g, " "),
            t = t.replace(/\s+/g, " "),
            t = e.trim(t),
            t
        },
        getSingleAry: function(e) {
            var t = this.paperData.length;
            if (t <= 0)
                return;
            for (var n = (Math.floor((t - 1) / 10) + 1) * e; n < t && n < (Math.floor((t - 1) / 10) + 1) * (e + 1); n++) {
                var r = this.paperData[n]
                  , i = r.id;
                if (/^s/.test(i)) {
                    var s = this.setPaperLabel(r);
                    this.singleAry.push(s)
                }
            }
        },
        standardizeQid4js: function(t) {
            var n = 0;
            return e.each(t, function(e, t) {
                var r = t.id;
                if (/^s/.test(r)) {
                    n++;
                    var i = r.split("_")
                      , s = i[0] + "_" + i[1] + "_" + n;
                    t.id = s
                }
            }),
            t
        },
        issamesid: function(e, t) {
            return e == t ? !0 : !1
        },
        formatExamerData: function(t) {
            var n = this.examerData.length;
            if (n <= 0)
                return;
            for (var r = (Math.floor((n - 1) / 10) + 1) * t; r < n && r < (Math.floor((n - 1) / 10) + 1) * (t + 1); r++) {
                var i = this.examerData[r]
                  , s = e.parseJSON(i.logexam_content)
                  , o = e.parseJSON(i.mark_content);
                s = this.standardizeQid4js(s),
                o = this.standardizeQid4js(o);
                var u = []
                  , a = 0
                  , f = s.length
                  , l = 0
                  , c = o.length;
                for (; a < f; a++) {
                    var h = {}
                      , p = s[a]
                      , d = p.id;
                    for (; l < c; l++) {
                        var v = o[l];
                        if (this.issamesid(v.id, d)) {
                            l++;
                            break
                        }
                    }
                    var m = d.split("_")
                      , g = m[0].substr(1);
                    switch (g) {
                    case "1":
                    case "2":
                    case "3":
                        h.id = p.id,
                        h.answer = p.a,
                        h.score = v.s;
                        break;
                    case "4":
                    case "5":
                        h.id = p.id,
                        h.score = v.s;
                        break;
                    default:
                    }
                    u.push(h)
                }
                i.logexam_content = null,
                i.mark_content = null,
                i.exammark = u,
                this.examerList.push(i)
            }
        },
        formatExamerList: function(t) {
            var n = this.examerList.length;
            if (n <= 0)
                return;
            for (var r = (Math.floor((n - 1) / 10) + 1) * t; r < n && r < (Math.floor((n - 1) / 10) + 1) * (t + 1); r++) {
                var i = this.examerList[r]
                  , s = i.exammark
                  , o = []
                  , u = this;
                e.each(this.singleAry, function(e, t) {
                    var n = t.id
                      , r = s.length
                      , i = !1;
                    for (var a = 0; a < r; a++) {
                        var f = s[a]
                          , l = f.id;
                        if (u.issamesid(n, l)) {
                            i = !0;
                            break
                        }
                    }
                    i ? o.push(f) : o.push(null)
                }),
                i.exammark = null,
                i.drawlist = o,
                this.formatedExamerList.push(i)
            }
        },
        setPaperLabel: function(t) {
            var n = t.id
              , r = n.split("_")
              , i = r[0].substr(1)
              , s = "";
            switch (i) {
            case "1":
            case "2":
                var o = 0, u, a = t.a;
                while (a)
                    u = String.fromCharCode(65 + o),
                    (a & 1) == 1 && (s += u),
                    a >>= 1,
                    o++;
                t.rightCount = 0,
                t.errorRatio = 0;
                var f = [];
                t.answerCount = f;
                break;
            case "3":
                var a = t.a;
                switch (a) {
                case "0":
                    s = "";
                    break;
                case "1":
                    s = "√";
                    break;
                case "2":
                    s = "×";
                    break;
                default:
                }
                t.rightCount = 0,
                t.errorRatio = 0;
                var f = [{
                    label: "√",
                    count: 0
                }, {
                    label: "×",
                    count: 0
                }];
                t.answerCount = f;
                break;
            case "4":
                var l = t.p;
                s = e.toFixedFloat(l, 2),
                t.errorRatio = "";
                break;
            case "5":
                var l = t.p;
                s = e.toFixedFloat(l, 2),
                t.errorRatio = "";
                break;
            default:
            }
            return t.sumScore = 0,
            t.difficulty = 0,
            t.showLabel = s,
            t
        },
        computeAndStatistics: function(t) {
            var n = this.formatedExamerList.length;
            if (n <= 0)
                return;
            var r = this;
            for (var i = (Math.floor((n - 1) / 10) + 1) * t; i < n && i < (Math.floor((n - 1) / 10) + 1) * (t + 1); i++) {
                var s = this.formatedExamerList[i]
                  , o = s.drawlist;
                e.each(this.singleAry, function(e, t) {
                    var n = o[e];
                    n && (r.computeAnswerCount(t, n, e),
                    r.computeRatio(t, n, e),
                    r.computeSingleSumscore(t, n, e))
                })
            }
        },
        computeAnswerCount: function(t, n, r) {
            var i = t.id
              , s = i.split("_")
              , o = s[0].substr(1)
              , u = "";
            switch (o) {
            case "1":
            case "2":
                var a = 0, f, l = n.answer, c = [];
                while (l)
                    f = String.fromCharCode(65 + a),
                    (l & 1) == 1 && (u += f,
                    c.push(f)),
                    l >>= 1,
                    a++;
                var h = t.answerCount;
                e.each(c, function(t, n) {
                    var r = !1
                      , i = {};
                    e.each(h, function(e, t) {
                        var i = t.label;
                        n == i && (r = !0,
                        h[e].count++)
                    });
                    if (!r) {
                        var s = {};
                        s.label = n,
                        s.count = 1,
                        h.push(s)
                    }
                }),
                this.singleAry[r].answerCount = h;
                break;
            case "3":
                var l = n.answer;
                switch (l) {
                case "0":
                    u = "";
                    break;
                case "1":
                    u = "√";
                    break;
                case "2":
                    u = "×";
                    break;
                default:
                }
                var h = t.answerCount
                  , p = [];
                e.each(h, function(e, t) {
                    var n = t.label;
                    u == n && t.count++,
                    p.push(t)
                }),
                this.singleAry[r].answerCount = p;
                break;
            case "4":
                var d = n.score;
                d = "" + d;
                var v = 0;
                if (d.indexOf(",") > 0) {
                    var m = d.split(",");
                    e.each(m, function(e, t) {
                        v += parseFloat(t)
                    })
                } else
                    v = d;
                u = e.toFixedFloat(v, 2);
                break;
            case "5":
                var d = n.score;
                u = e.toFixedFloat(d, 2);
                break;
            default:
            }
            return n.showLabel = u,
            n
        },
        computeRatio: function(e, t, n) {
            var r = e.id
              , i = r.split("_")
              , s = i[0].substr(1);
            switch (s) {
            case "1":
            case "2":
            case "3":
                var o = e.a
                  , u = t.answer;
                o == u && this.singleAry[n].rightCount++;
                break;
            case "4":
            case "5":
                break;
            default:
            }
        },
        computeSingleSumscore: function(t, n, r) {
            var i = n.score;
            i = "" + i;
            var s = 0;
            if (i.indexOf(",") > 0) {
                var o = i.split(",");
                e.each(o, function(e, t) {
                    s += parseFloat(t)
                })
            } else
                s = i;
            this.singleAry[r].sumScore += parseFloat(s)
        },
        limitTime: function(t, n) {
            var r = this;
            setTimeout(function() {
                if (true)
                    return r.drawAnalysisTable(),
                    r.formatedExamerList = null,
                    e.browser.msie < 8 ? e("#paperanalysisContent").css("display", "block") : e("#paperanalysisContent").css("display", "table"),
                    e("#progressPane").css("display", "none"),
                    !0;
                var s = Math.floor(t) + "%";
                e("#progressBar").find(".progressBarFull").css("width", s),
                e("#progressBar").find(".progressBarLabel").html(s),
                r.limitTime(t, n)
            }, n)
        }
    },
    t
}),
require(["jquery", "mclass/paperanalysis"], function(e, t) {
    e(function() {
        var n = function() {};
        n.prototype = {},
        e.extend(n.prototype, t.prototype),
        window.paper = new n,
        window.paper.init()
    })
}),
define("mclass/main.paperanalysis", function() {});
