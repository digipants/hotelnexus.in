/*!
 * CanJS - 2.3.22
 * http://canjs.com/
 * Copyright (c) 2016 Bitovi
 * Fri, 08 Apr 2016 17:39:50 GMT
 * Licensed MIT

 * Includes: can/construct/construct,can/control/control,can/construct/super/super,can/construct/proxy/proxy
 * Download from: http://bitbuilder.herokuapp.com/can.custom.js?configuration=jquery&minify=true&plugins=can%2Fconstruct%2Fconstruct&plugins=can%2Fcontrol%2Fcontrol&plugins=can%2Fconstruct%2Fsuper%2Fsuper&plugins=can%2Fconstruct%2Fproxy%2Fproxy
 */
/*[global-shim-start]*/
! function(exports, global) {
    var origDefine = global.define,
        get = function(e) {
            var o, l = e.split("."),
                n = global;
            for (o = 0; o < l.length && n; o++) n = n[l[o]];
            return n
        },
        modules = global.define && global.define.modules || global._define && global._define.modules || {},
        ourDefine = global.define = function(e, o, l) {
            var n;
            "function" == typeof o && (l = o, o = []);
            var r, t = [];
            for (r = 0; r < o.length; r++) t.push(exports[o[r]] ? get(exports[o[r]]) : modules[o[r]] || get(o[r]));
            if (!o.length && l.length) {
                n = {
                    exports: {}
                };
                var i = function(e) {
                    return exports[e] ? get(exports[e]) : modules[e]
                };
                t.push(i, n.exports, n)
            } else t[0] || "exports" !== o[0] ? t[0] || "module" !== o[0] || (t[0] = {
                id: e
            }) : (n = {
                exports: {}
            }, t[0] = n.exports, "module" === o[1] && (t[1] = n));
            global.define = origDefine;
            var a = l ? l.apply(null, t) : void 0;
            global.define = ourDefine, modules[e] = n && n.exports ? n.exports : a
        };
    global.define.orig = origDefine, global.define.modules = modules, global.define.amd = !0, ourDefine("@loader", [], function() {
        var noop = function() {};
        return {
            get: function() {
                return {
                    prepareGlobal: noop,
                    retrieveGlobal: noop
                }
            },
            global: global,
            __exec: function(__load) {
                eval("(function() { " + __load.source + " \n }).call(global);")
            }
        }
    })
}({}, window);
/*can/util/can*/
define("can/util/can", [], function() {
    var e = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : global,
        n = {};
    ("undefined" == typeof GLOBALCAN || GLOBALCAN !== !1) && (e.can = n), n.global = e, n.k = function() {}, n.isDeferred = n.isPromise = function(e) {
        return e && "function" == typeof e.then && "function" == typeof e.pipe
    }, n.isMapLike = function(e) {
        return n.Map && (e instanceof n.Map || e && e.___get)
    };
    var t = 0;
    n.cid = function(e, n) {
        return e._cid || (t++, e._cid = (n || "") + t), e._cid
    }, n.VERSION = "@EDGE", n.simpleExtend = function(e, n) {
        for (var t in n) e[t] = n[t];
        return e
    }, n.last = function(e) {
        return e && e[e.length - 1]
    }, n.isDOM = function(e) {
        return (e.ownerDocument || e) === n.global.document
    }, n.childNodes = function(e) {
        var n = e.childNodes;
        if ("length" in n) return n;
        for (var t = e.firstChild, o = []; t;) o.push(t), t = t.nextSibling;
        return o
    };
    var o = Function.prototype.bind;
    o ? n.proxy = function(e, n) {
        return o.call(e, n)
    } : n.proxy = function(e, n) {
        return function() {
            return e.apply(n, arguments)
        }
    }, n.frag = function(e, t) {
        var o, r = t || n.document || n.global.document;
        return e && "string" != typeof e ? 11 === e.nodeType ? e : "number" == typeof e.nodeType ? (o = r.createDocumentFragment(), o.appendChild(e), o) : "number" == typeof e.length ? (o = r.createDocumentFragment(), n.each(e, function(e) {
            o.appendChild(n.frag(e))
        }), n.childNodes(o).length || o.appendChild(r.createTextNode("")), o) : (o = n.buildFragment("" + e, r), n.childNodes(o).length || o.appendChild(r.createTextNode("")), o) : (o = n.buildFragment(null == e ? "" : "" + e, r), o.childNodes.length || o.appendChild(r.createTextNode("")), o)
    }, n.scope = n.viewModel = function(e, t, o) {
        e = n.$(e);
        var r = n.data(e, "scope") || n.data(e, "viewModel");
        switch (r || (r = new n.Map, n.data(e, "scope", r), n.data(e, "viewModel", r)), arguments.length) {
            case 0:
            case 1:
                return r;
            case 2:
                return r.attr(t);
            default:
                return r.attr(t, o), e
        }
    };
    var r = function(e) {
        var n = String(e).replace(/^\s+|\s+$/g, "").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
        return n ? {
            href: n[0] || "",
            protocol: n[1] || "",
            authority: n[2] || "",
            host: n[3] || "",
            hostname: n[4] || "",
            port: n[5] || "",
            pathname: n[6] || "",
            search: n[7] || "",
            hash: n[8] || ""
        } : null
    };
    return n.joinURIs = function(e, n) {
        function t(e) {
            var n = [];
            return e.replace(/^(\.\.?(\/|$))+/, "").replace(/\/(\.(\/|$))+/g, "/").replace(/\/\.\.$/, "/../").replace(/\/?[^\/]*/g, function(e) {
                "/.." === e ? n.pop() : n.push(e)
            }), n.join("").replace(/^\//, "/" === e.charAt(0) ? "/" : "")
        }
        return n = r(n || ""), e = r(e || ""), n && e ? (n.protocol || e.protocol) + (n.protocol || n.authority ? n.authority : e.authority) + t(n.protocol || n.authority || "/" === n.pathname.charAt(0) ? n.pathname : n.pathname ? (e.authority && !e.pathname ? "/" : "") + e.pathname.slice(0, e.pathname.lastIndexOf("/") + 1) + n.pathname : e.pathname) + (n.protocol || n.authority || n.pathname ? n.search : n.search || e.search) + n.hash : null
    }, n["import"] = function(e, t) {
        var o = new n.Deferred;
        return "object" == typeof window.System && n.isFunction(window.System["import"]) ? window.System["import"](e, {
            name: t
        }).then(n.proxy(o.resolve, o), n.proxy(o.reject, o)) : window.define && window.define.amd ? window.require([e], function(e) {
            o.resolve(e)
        }) : window.steal ? steal.steal(e, function(e) {
            o.resolve(e)
        }) : window.require ? o.resolve(window.require(e)) : o.resolve(), o.promise()
    }, n.__observe = function() {}, n.isNode = "object" == typeof process && "[object process]" === {}.toString.call(process), n.isBrowserWindow = "undefined" != typeof window && "undefined" != typeof document && "undefined" == typeof SimpleDOM, n.isWebWorker = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope, n
});
/*can/util/attr/attr*/
define("can/util/attr/attr", ["can/util/can"], function(t) {
    var e = t.global.setImmediate || function(t) {
            return setTimeout(t, 0)
        },
        r = {
            input: !0,
            textarea: !0,
            select: !0
        },
        n = function(e, n) {
            return n in e || t.document && r[e.nodeName.toLowerCase()]
        },
        a = {
            MutationObserver: t.global.MutationObserver || t.global.WebKitMutationObserver || t.global.MozMutationObserver,
            map: {
                "class": function(t, e) {
                    return e = e || "", "http://www.w3.org/2000/svg" === t.namespaceURI ? t.setAttribute("class", e) : t.className = e, e
                },
                value: "value",
                innertext: "innerText",
                innerhtml: "innerHTML",
                textcontent: "textContent",
                "for": "htmlFor",
                checked: !0,
                disabled: !0,
                readonly: function(t, e) {
                    return t.readOnly = !0, e
                },
                required: !0,
                src: function(t, e) {
                    return null == e || "" === e ? (t.removeAttribute("src"), null) : (t.setAttribute("src", e), e)
                },
                style: function() {
                    var e = t.global.document && document.createElement("div");
                    return e && e.style && "cssText" in e.style ? function(t, e) {
                        return t.style.cssText = e || ""
                    } : function(t, e) {
                        return t.setAttribute("style", e)
                    }
                }()
            },
            defaultValue: ["input", "textarea"],
            setAttrOrProp: function(t, e, r) {
                e = e.toLowerCase();
                var n = a.map[e];
                n !== !0 || r ? this.set(t, e, r) : this.remove(t, e)
            },
            setSelectValue: function(t, e) {
                if (null != e)
                    for (var r = t.getElementsByTagName("option"), n = 0; n < r.length; n++)
                        if (e == r[n].value) return void(r[n].selected = !0);
                t.selectedIndex = -1
            },
            set: function(e, r, u) {
                var o = t.isDOM(e) && a.MutationObserver;
                r = r.toLowerCase();
                var i;
                o || (i = a.get(e, r));
                var s, l = a.map[r];
                "function" == typeof l ? s = l(e, u) : l === !0 && n(e, r) ? (s = e[r] = !0, "checked" === r && "radio" === e.type && t.inArray((e.nodeName + "").toLowerCase(), a.defaultValue) >= 0 && (e.defaultChecked = !0)) : "string" == typeof l && n(e, l) ? (s = u, (e[l] !== u || "OPTION" === e.nodeName.toUpperCase()) && (e[l] = u), "value" === l && t.inArray((e.nodeName + "").toLowerCase(), a.defaultValue) >= 0 && (e.defaultValue = u)) : a.setAttribute(e, r, u), o || s === i || a.trigger(e, r, i)
            },
            setAttribute: function() {
                var e = t.global.document;
                if (e && document.createAttribute) try {
                    e.createAttribute("{}")
                } catch (r) {
                    var n = {},
                        a = document.createElement("div");
                    return function(t, e, r) {
                        var u, o, i = e.charAt(0);
                        "{" !== i && "(" !== i && "*" !== i || !t.setAttributeNode ? t.setAttribute(e, r) : (u = n[e], u || (a.innerHTML = "<div " + e + '=""></div>', u = n[e] = a.childNodes[0].attributes[0]), o = u.cloneNode(), o.value = r, t.setAttributeNode(o))
                    }
                }
                return function(t, e, r) {
                    t.setAttribute(e, r)
                }
            }(),
            trigger: function(r, n, a) {
                return t.data(t.$(r), "canHasAttributesBindings") ? (n = n.toLowerCase(), e(function() {
                    t.trigger(r, {
                        type: "attributes",
                        attributeName: n,
                        target: r,
                        oldValue: a,
                        bubbles: !1
                    }, [])
                })) : void 0
            },
            get: function(t, e) {
                e = e.toLowerCase();
                var r = a.map[e];
                return "string" == typeof r && n(t, r) ? t[r] : r === !0 && n(t, e) ? t[e] : t.getAttribute(e)
            },
            remove: function(t, e) {
                e = e.toLowerCase();
                var r;
                a.MutationObserver || (r = a.get(t, e));
                var u = a.map[e];
                "function" == typeof u && u(t, void 0), u === !0 && n(t, e) ? t[e] = !1 : "string" == typeof u && n(t, u) ? t[u] = "" : t.removeAttribute(e), a.MutationObserver || null == r || a.trigger(t, e, r)
            },
            has: function() {
                var e = t.global.document && document.createElement("div");
                return e && e.hasAttribute ? function(t, e) {
                    return t.hasAttribute(e)
                } : function(t, e) {
                    return null !== t.getAttribute(e)
                }
            }()
        };
    return a
});
/*can/event/event*/
define("can/event/event", ["can/util/can"], function(t) {
    return t.addEvent = function(t, n) {
        var e = this.__bindEvents || (this.__bindEvents = {}),
            i = e[t] || (e[t] = []);
        return i.push({
            handler: n,
            name: t
        }), this
    }, t.listenTo = function(n, e, i) {
        var r = this.__listenToEvents;
        r || (r = this.__listenToEvents = {});
        var s = t.cid(n),
            o = r[s];
        o || (o = r[s] = {
            obj: n,
            events: {}
        });
        var a = o.events[e];
        a || (a = o.events[e] = []), a.push(i), t.bind.call(n, e, i)
    }, t.stopListening = function(n, e, i) {
        var r = this.__listenToEvents,
            s = r,
            o = 0;
        if (!r) return this;
        if (n) {
            var a = t.cid(n);
            if ((s = {})[a] = r[a], !r[a]) return this
        }
        for (var v in s) {
            var l, h = s[v];
            n = r[v].obj, e ? (l = {})[e] = h.events[e] : l = h.events;
            for (var u in l) {
                var d = l[u] || [];
                for (o = 0; o < d.length;) i && i === d[o] || !i ? (t.unbind.call(n, u, d[o]), d.splice(o, 1)) : o++;
                d.length || delete h.events[u]
            }
            t.isEmptyObject(h.events) && delete r[v]
        }
        return this
    }, t.removeEvent = function(t, n, e) {
        if (!this.__bindEvents) return this;
        for (var i, r = this.__bindEvents[t] || [], s = 0, o = "function" == typeof n; s < r.length;) i = r[s], (e ? e(i, t, n) : o && i.handler === n || !o && (i.cid === n || !n)) ? r.splice(s, 1) : s++;
        return this
    }, t.dispatch = function(t, n) {
        var e = this.__bindEvents;
        if (e) {
            var i;
            "string" == typeof t ? (i = t, t = {
                type: t
            }) : i = t.type;
            var r = e[i];
            if (r) {
                r = r.slice(0);
                var s = [t];
                n && s.push.apply(s, n);
                for (var o = 0, a = r.length; a > o; o++) r[o].handler.apply(this, s);
                return t
            }
        }
    }, t.one = function(n, e) {
        var i = function() {
            return t.unbind.call(this, n, i), e.apply(this, arguments)
        };
        return t.bind.call(this, n, i), this
    }, t.event = {
        on: function() {
            return 0 === arguments.length && t.Control && this instanceof t.Control ? t.Control.prototype.on.call(this) : t.addEvent.apply(this, arguments)
        },
        off: function() {
            return 0 === arguments.length && t.Control && this instanceof t.Control ? t.Control.prototype.off.call(this) : t.removeEvent.apply(this, arguments)
        },
        bind: t.addEvent,
        unbind: t.removeEvent,
        delegate: function(n, e, i) {
            return t.addEvent.call(this, e, i)
        },
        undelegate: function(n, e, i) {
            return t.removeEvent.call(this, e, i)
        },
        trigger: t.dispatch,
        one: t.one,
        addEvent: t.addEvent,
        removeEvent: t.removeEvent,
        listenTo: t.listenTo,
        stopListening: t.stopListening,
        dispatch: t.dispatch
    }, t.event
});
/*can/util/fragment*/
define("can/util/fragment", ["can/util/can"], function(e) {
    var t = /^\s*<(\w+)[^>]*>/,
        i = {}.toString,
        l = function(l, n, r) {
            void 0 === n && (n = t.test(l) && RegExp.$1), l && "[object Function]" === i.call(l.replace) && (l = l.replace(/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, "<$1></$2>"));
            var d = r.createElement("div"),
                a = r.createElement("div");
            "tbody" === n || "tfoot" === n || "thead" === n || "colgroup" === n ? (a.innerHTML = "<table>" + l + "</table>", d = 3 === a.firstChild.nodeType ? a.lastChild : a.firstChild) : "col" === n ? (a.innerHTML = "<table><colgroup>" + l + "</colgroup></table>", d = 3 === a.firstChild.nodeType ? a.lastChild : a.firstChild.firstChild) : "tr" === n ? (a.innerHTML = "<table><tbody>" + l + "</tbody></table>", d = 3 === a.firstChild.nodeType ? a.lastChild : a.firstChild.firstChild) : "td" === n || "th" === n ? (a.innerHTML = "<table><tbody><tr>" + l + "</tr></tbody></table>", d = 3 === a.firstChild.nodeType ? a.lastChild : a.firstChild.firstChild.firstChild) : "option" === n ? (a.innerHTML = "<select>" + l + "</select>", d = 3 === a.firstChild.nodeType ? a.lastChild : a.firstChild) : d.innerHTML = "" + l;
            var o = {},
                h = e.childNodes(d);
            o.length = h.length;
            for (var c = 0; c < h.length; c++) o[c] = h[c];
            return [].slice.call(o)
        };
    return e.buildFragment = function(e, t) {
            if (e && 11 === e.nodeType) return e;
            t ? t.length && (t = t[0]) : t = document;
            for (var i = l(e, void 0, t), n = (t || document).createDocumentFragment(), r = 0, d = i.length; d > r; r++) n.appendChild(i[r]);
            return n
        },
        function() {
            var t = "<-\n>",
                i = e.buildFragment(t, document);
            if (t !== i.firstChild.nodeValue) {
                var l = e.buildFragment;
                e.buildFragment = function(e, t) {
                    var i = l(e, t);
                    return 1 === i.childNodes.length && 3 === i.childNodes[0].nodeType && (i.childNodes[0].nodeValue = e), i
                }
            }
        }(), e
});
/*can/util/array/isArrayLike*/
define("can/util/array/isArrayLike", ["can/util/can"], function(n) {
    n.isArrayLike = function(n) {
        var e = n && "boolean" != typeof n && "number" != typeof n && "length" in n && n.length;
        return "function" != typeof arr && (0 === e || "number" == typeof e && e > 0 && e - 1 in n)
    }
});
/*can/util/array/each*/
define("can/util/array/each", ["can/util/can", "can/util/array/isArrayLike"], function(a) {
    return a.each = function(e, t, r) {
        var i, n, l, c = 0;
        if (e)
            if (a.isArrayLike(e))
                if (a.List && e instanceof a.List)
                    for (n = e.attr("length"); n > c && (l = e.attr(c), t.call(r || l, l, c, e) !== !1); c++);
                else
                    for (n = e.length; n > c && (l = e[c], t.call(r || l, l, c, e) !== !1); c++);
        else if ("object" == typeof e)
            if (a.Map && e instanceof a.Map || e === a.route) {
                var f = a.Map.keys(e);
                for (c = 0, n = f.length; n > c && (i = f[c], l = e.attr(i), t.call(r || l, l, i, e) !== !1); c++);
            } else
                for (i in e)
                    if (Object.prototype.hasOwnProperty.call(e, i) && t.call(r || e[i], e[i], i, e) === !1) break;
        return e
    }, a
});
/*can/util/inserted/inserted*/
define("can/util/inserted/inserted", ["can/util/can"], function(e) {
    e.inserted = function(n, r) {
        if (n.length) {
            n = e.makeArray(n);
            for (var i, t, a = r || n[0].ownerDocument || n[0], d = !1, o = e.$(a.contains ? a : a.body), s = 0; void 0 !== (t = n[s]); s++) {
                if (!d) {
                    if (!t.getElementsByTagName) continue;
                    if (!e.has(o, t).length) return;
                    d = !0
                }
                if (d && t.getElementsByTagName) {
                    i = e.makeArray(t.getElementsByTagName("*")), e.trigger(t, "inserted", [], !1);
                    for (var f, c = 0; void 0 !== (f = i[c]); c++) e.trigger(f, "inserted", [], !1)
                }
            }
        }
    }, e.appendChild = function(n, r, i) {
        var t;
        t = 11 === r.nodeType ? e.makeArray(e.childNodes(r)) : [r], n.appendChild(r), e.inserted(t, i)
    }, e.insertBefore = function(n, r, i, t) {
        var a;
        a = 11 === r.nodeType ? e.makeArray(e.childNodes(r)) : [r], n.insertBefore(r, i), e.inserted(a, t)
    }
});
/*can/util/jquery/jquery*/
define("can/util/jquery/jquery", ["jquery/dist/jquery", "can/util/can", "can/util/attr/attr", "can/event/event", "can/util/fragment", "can/util/array/each", "can/util/inserted/inserted"], function(t, e, n, r) {
    var i = function(t) {
        return t.nodeName && (1 === t.nodeType || 9 === t.nodeType) || t == window || t.addEventListener
    };
    t = t || window.jQuery, t.extend(e, t, {
        trigger: function(n, r, a, s) {
            i(n) ? t.event.trigger(r, a, n, !s) : n.trigger ? n.trigger(r, a) : ("string" == typeof r && (r = {
                type: r
            }), r.target = r.target || n, a && (a.length && "string" == typeof a ? a = [a] : a.length || (a = [a])), a || (a = []), e.dispatch.call(n, r, a))
        },
        event: e.event,
        addEvent: e.addEvent,
        removeEvent: e.removeEvent,
        buildFragment: e.buildFragment,
        $: t,
        each: e.each,
        bind: function(n, r) {
            return this.bind && this.bind !== e.bind ? this.bind(n, r) : i(this) ? t.event.add(this, n, r) : e.addEvent.call(this, n, r), this
        },
        unbind: function(n, r) {
            return this.unbind && this.unbind !== e.unbind ? this.unbind(n, r) : i(this) ? t.event.remove(this, n, r) : e.removeEvent.call(this, n, r), this
        },
        delegate: function(n, r, a) {
            return this.delegate ? this.delegate(n, r, a) : i(this) ? t(this).delegate(n, r, a) : e.bind.call(this, r, a), this
        },
        undelegate: function(n, r, a) {
            return this.undelegate ? this.undelegate(n, r, a) : i(this) ? t(this).undelegate(n, r, a) : e.unbind.call(this, r, a), this
        },
        proxy: e.proxy,
        attr: n
    }), e.on = e.bind, e.off = e.unbind, t.each(["append", "filter", "addClass", "remove", "data", "get", "has"], function(t, n) {
        e[n] = function(t) {
            return t[n].apply(t, e.makeArray(arguments).slice(1))
        }
    });
    var a = t.cleanData;
    t.cleanData = function(n) {
        t.each(n, function(t, n) {
            n && e.trigger(n, "removed", [], !1)
        }), a(n)
    };
    var s, u = t.fn.domManip;
    t.fn.domManip = function(t, e, n) {
        for (var r = 1; r < arguments.length; r++)
            if ("function" == typeof arguments[r]) {
                s = r;
                break
            }
        return u.apply(this, arguments)
    }, t(document.createElement("div")).append(document.createElement("div"));
    var d = function(t) {
        var n = t.childNodes;
        if ("length" in n) return e.makeArray(n);
        for (var r = t.firstChild, i = []; r;) i.push(r), r = r.nextSibling;
        return i
    };
    void 0 === s ? (t.fn.domManip = u, e.each(["after", "prepend", "before", "append", "replaceWith"], function(n) {
        var r = t.fn[n];
        t.fn[n] = function() {
            var t = [],
                n = e.makeArray(arguments);
            null != n[0] && ("string" == typeof n[0] && (n[0] = e.buildFragment(n[0])), t = 11 === n[0].nodeType ? d(n[0]) : e.isArrayLike(n[0]) ? e.makeArray(n[0]) : [n[0]]);
            var i = r.apply(this, n);
            return e.inserted(t), i
        }
    })) : t.fn.domManip = 2 === s ? function(t, n, r) {
        return u.call(this, t, n, function(t) {
            var n;
            11 === t.nodeType && (n = e.makeArray(e.childNodes(t)));
            var i = r.apply(this, arguments);
            return e.inserted(n ? n : [t]), i
        })
    } : function(t, n) {
        return u.call(this, t, function(t) {
            var r;
            11 === t.nodeType && (r = e.makeArray(e.childNodes(t)));
            var i = n.apply(this, arguments);
            return e.inserted(r ? r : [t]), i
        })
    };
    var l = t.attr;
    t.attr = function(t, n) {
        if (e.isDOM(t) && e.attr.MutationObserver) return l.apply(this, arguments);
        var r, i;
        arguments.length >= 3 && (r = l.call(this, t, n));
        var a = l.apply(this, arguments);
        return arguments.length >= 3 && (i = l.call(this, t, n)), i !== r && e.attr.trigger(t, n, r), a
    };
    var o = t.removeAttr;
    return t.removeAttr = function(t, n) {
        if (e.isDOM(t) && e.attr.MutationObserver) return o.apply(this, arguments);
        var r = l.call(this, t, n),
            i = o.apply(this, arguments);
        return null != r && e.attr.trigger(t, n, r), i
    }, t.event.special.attributes = {
        setup: function() {
            if (e.isDOM(this) && e.attr.MutationObserver) {
                var t = this,
                    n = new e.attr.MutationObserver(function(n) {
                        n.forEach(function(n) {
                            var r = e.simpleExtend({}, n);
                            e.trigger(t, r, [])
                        })
                    });
                n.observe(this, {
                    attributes: !0,
                    attributeOldValue: !0
                }), e.data(e.$(this), "canAttributesObserver", n)
            } else e.data(e.$(this), "canHasAttributesBindings", !0)
        },
        teardown: function() {
            e.isDOM(this) && e.attr.MutationObserver ? (e.data(e.$(this), "canAttributesObserver").disconnect(), t.removeData(this, "canAttributesObserver")) : t.removeData(this, "canHasAttributesBindings")
        }
    }, t.event.special.inserted = {}, t.event.special.removed = {}, e
});
/*can/util/util*/
define("can/util/util", ["can/util/jquery/jquery"], function(u) {
    return u
});
/*can/util/string/string*/
define("can/util/string/string", ["can/util/util"], function(e) {
    var r = /_|-/,
        n = /\=\=/,
        t = /([A-Z]+)([A-Z][a-z])/g,
        a = /([a-z\d])([A-Z])/g,
        u = /([a-z\d])([A-Z])/g,
        i = /\{([^\}]+)\}/g,
        c = /"/g,
        o = /'/g,
        l = /-+(.)?/g,
        p = /[a-z][A-Z]/g,
        f = function(e, r, n) {
            var t = e[r];
            return void 0 === t && n === !0 && (t = e[r] = {}), t
        },
        g = function(e) {
            return /^f|^o/.test(typeof e)
        },
        d = function(e) {
            var r = null === e || void 0 === e || isNaN(e) && "" + e == "NaN";
            return "" + (r ? "" : e)
        };
    return e.extend(e, {
        esc: function(e) {
            return d(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(c, "&#34;").replace(o, "&#39;")
        },
        getObject: function(r, n, t) {
            var a, u, i, c, o = r ? r.split(".") : [],
                l = o.length,
                p = 0;
            if (n = e.isArray(n) ? n : [n || window], c = n.length, !l) return n[0];
            for (p; c > p; p++) {
                for (a = n[p], i = void 0, u = 0; l > u && g(a); u++) i = a, a = f(i, o[u]);
                if (void 0 !== i && void 0 !== a) break
            }
            if (t === !1 && void 0 !== a && delete i[o[u - 1]], t === !0 && void 0 === a)
                for (a = n[0], u = 0; l > u && g(a); u++) a = f(a, o[u], !0);
            return a
        },
        capitalize: function(e, r) {
            return e.charAt(0).toUpperCase() + e.slice(1)
        },
        camelize: function(e) {
            return d(e).replace(l, function(e, r) {
                return r ? r.toUpperCase() : ""
            })
        },
        hyphenate: function(e) {
            return d(e).replace(p, function(e, r) {
                return e.charAt(0) + "-" + e.charAt(1).toLowerCase()
            })
        },
        underscore: function(e) {
            return e.replace(n, "/").replace(t, "$1_$2").replace(a, "$1_$2").replace(u, "_").toLowerCase()
        },
        sub: function(r, n, t) {
            var a = [];
            return r = r || "", a.push(r.replace(i, function(r, u) {
                var i = e.getObject(u, n, t === !0 ? !1 : void 0);
                return void 0 === i || null === i ? (a = null, "") : g(i) && a ? (a.push(i), "") : "" + i
            })), null === a ? a : a.length <= 1 ? a[0] : a
        },
        replacer: i,
        undHash: r
    }), e
});
/*can/construct/construct*/
define("can/construct/construct", ["can/util/string/string"], function(t) {
    var n, e = 0;
    try {
        Object.getOwnPropertyDescriptor({}), n = !0
    } catch (r) {
        n = !1
    }
    var o = function(t, n) {
            var e = Object.getOwnPropertyDescriptor(t, n);
            return e && (e.get || e.set) ? e : null
        },
        s = function(n, e, r) {
            r = r || n;
            var s;
            for (var i in n)(s = o(n, i)) ? this._defineProperty(r, e, i, s) : t.Construct._overwrite(r, e, i, n[i])
        },
        i = function(n, e, r) {
            r = r || n;
            for (var o in n) t.Construct._overwrite(r, e, o, n[o])
        };
    return t.Construct = function() {
        return arguments.length ? t.Construct.extend.apply(t.Construct, arguments) : void 0
    }, t.extend(t.Construct, {
        constructorExtends: !0,
        newInstance: function() {
            var t, n = this.instance();
            return n.setup && (n.__inSetup = !0, t = n.setup.apply(n, arguments), delete n.__inSetup), n.init && n.init.apply(n, t || arguments), n
        },
        _inherit: n ? s : i,
        _defineProperty: function(t, n, e, r) {
            Object.defineProperty(t, e, r)
        },
        _overwrite: function(t, n, e, r) {
            t[e] = r
        },
        setup: function(n, e) {
            this.defaults = t.extend(!0, {}, n.defaults, this.defaults)
        },
        instance: function() {
            e = 1;
            var t = new this;
            return e = 0, t
        },
        extend: function(n, r, o) {
            function s() {
                return e ? void 0 : this.constructor !== a && arguments.length && a.constructorExtends ? a.extend.apply(a, arguments) : a.newInstance.apply(a, arguments)
            }
            var i = n,
                u = r,
                c = o;
            "string" != typeof i && (c = u, u = i, i = null), c || (c = u, u = null), c = c || {};
            var a, p, f, l, h, d, y, m, g, v = this,
                _ = this.prototype;
            g = this.instance(), t.Construct._inherit(c, _, g), i ? (p = i.split("."), y = p.pop()) : u && u.shortName ? y = u.shortName : this.shortName && (y = this.shortName), "undefined" == typeof constructorName && (a = function() {
                return s.apply(this, arguments)
            });
            for (d in v) v.hasOwnProperty(d) && (a[d] = v[d]);
            t.Construct._inherit(u, v, a), i && (f = t.getObject(p.join("."), window, !0), m = f, l = t.underscore(i.replace(/\./g, "_")), h = t.underscore(y), f[y] = a), t.extend(a, {
                constructor: a,
                prototype: g,
                namespace: m,
                _shortName: h,
                fullName: i,
                _fullName: l
            }), void 0 !== y && (a.shortName = y), a.prototype.constructor = a;
            var w = [v].concat(t.makeArray(arguments)),
                C = a.setup.apply(a, w);
            return a.init && a.init.apply(a, C || w), a
        }
    }), t.Construct.prototype.setup = function() {}, t.Construct.prototype.init = function() {}, t.Construct
});
/*can/control/control*/
define("can/control/control", ["can/util/util", "can/construct/construct"], function(t) {
    var n, e = function(n, e, o) {
            return t.bind.call(n, e, o),
                function() {
                    t.unbind.call(n, e, o)
                }
        },
        o = t.isFunction,
        s = t.extend,
        r = t.each,
        i = [].slice,
        u = /\{([^\}]+)\}/g,
        c = t.getObject("$.event.special", [t]) || {},
        l = function(n, e, o, s) {
            return t.delegate.call(n, e, o, s),
                function() {
                    t.undelegate.call(n, e, o, s)
                }
        },
        a = function(n, o, s, r) {
            return r ? l(n, t.trim(r), o, s) : e(n, o, s)
        },
        h = t.Control = t.Construct({
            setup: function() {
                if (t.Construct.setup.apply(this, arguments), t.Control) {
                    var n, e = this;
                    e.actions = {};
                    for (n in e.prototype) e._isAction(n) && (e.actions[n] = e._action(n))
                }
            },
            _shifter: function(n, e) {
                var s = "string" == typeof e ? n[e] : e;
                return o(s) || (s = n[s]),
                    function() {
                        return n.called = e, s.apply(n, [this.nodeName ? t.$(this) : this].concat(i.call(arguments, 0)))
                    }
            },
            _isAction: function(t) {
                var n = this.prototype[t],
                    e = typeof n;
                return "constructor" !== t && ("function" === e || "string" === e && o(this.prototype[n])) && !!(c[t] || f[t] || /[^\w]/.test(t))
            },
            _action: function(e, o) {
                if (u.lastIndex = 0, o || !u.test(e)) {
                    var s = o ? t.sub(e, this._lookup(o)) : e;
                    if (!s) return null;
                    var r = t.isArray(s),
                        i = r ? s[1] : s,
                        c = i.split(/\s+/g),
                        l = c.pop();
                    return {
                        processor: f[l] || n,
                        parts: [i, c.join(" "), l],
                        delegate: r ? s[0] : void 0
                    }
                }
            },
            _lookup: function(t) {
                return [t, window]
            },
            processors: {},
            defaults: {}
        }, {
            setup: function(n, e) {
                var o, r = this.constructor,
                    i = r.pluginName || r._fullName;
                return this.element = t.$(n), i && "can_control" !== i && this.element.addClass(i), o = t.data(this.element, "controls"), o || (o = [], t.data(this.element, "controls", o)), o.push(this), this.options = s({}, r.defaults, e), this.on(), [this.element, this.options]
            },
            on: function(n, e, o, s) {
                if (!n) {
                    this.off();
                    var r, i, u = this.constructor,
                        c = this._bindings,
                        l = u.actions,
                        h = this.element,
                        f = t.Control._shifter(this, "destroy");
                    for (r in l) l.hasOwnProperty(r) && (i = l[r] || u._action(r, this.options, this), i && (c.control[r] = i.processor(i.delegate || h, i.parts[2], i.parts[1], r, this)));
                    return t.bind.call(h, "removed", f), c.user.push(function(n) {
                        t.unbind.call(n, "removed", f)
                    }), c.user.length
                }
                return "string" == typeof n && (s = o, o = e, e = n, n = this.element), void 0 === s && (s = o, o = e, e = null), "string" == typeof s && (s = t.Control._shifter(this, s)), this._bindings.user.push(a(n, o, s, e)), this._bindings.user.length
            },
            off: function() {
                var t = this.element[0],
                    n = this._bindings;
                n && (r(n.user || [], function(n) {
                    n(t)
                }), r(n.control || {}, function(n) {
                    n(t)
                })), this._bindings = {
                    user: [],
                    control: {}
                }
            },
            destroy: function() {
                if (null !== this.element) {
                    var n, e = this.constructor,
                        o = e.pluginName || e._fullName;
                    this.off(), o && "can_control" !== o && this.element.removeClass(o), n = t.data(this.element, "controls"), n.splice(t.inArray(this, n), 1), t.trigger(this, "destroyed"), this.element = null
                }
            }
        }),
        f = t.Control.processors;
    return n = function(n, e, o, s, r) {
        return a(n, e, t.Control._shifter(r, s), o)
    }, r(["change", "click", "contextmenu", "dblclick", "keydown", "keyup", "keypress", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "reset", "resize", "scroll", "select", "submit", "focusin", "focusout", "mouseenter", "mouseleave", "touchstart", "touchmove", "touchcancel", "touchend", "touchleave", "inserted", "removed", "dragstart", "dragenter", "dragover", "dragleave", "drag", "drop", "dragend"], function(t) {
        f[t] = n
    }), h
});
/*can/construct/super/super*/
define("can/construct/super/super", ["can/util/util", "can/construct/construct"], function(t, n) {
    var r = t.isFunction,
        e = /xyz/.test(function() {
            return this.xyz
        }) ? /\b_super\b/ : /.*/,
        u = ["get", "set"],
        c = function(t, n, r) {
            return function() {
                var e, u = this._super;
                return this._super = t[n], e = r.apply(this, arguments), this._super = u, e
            }
        };
    return t.Construct._defineProperty = function(n, e, s, i) {
        var o = Object.getOwnPropertyDescriptor(e, s);
        o && t.each(u, function(t) {
            r(o[t]) && r(i[t]) ? i[t] = c(o, t, i[t]) : r(i[t]) || (i[t] = o[t])
        }), Object.defineProperty(n, s, i)
    }, t.Construct._overwrite = function(t, n, u, s) {
        t[u] = r(s) && r(n[u]) && e.test(s) ? c(n, u, s) : s
    }, t
});
/*can/construct/proxy/proxy*/
define("can/construct/proxy/proxy", ["can/util/util", "can/construct/construct"], function(r, t) {
    var n = (r.isFunction, r.isArray),
        o = r.makeArray,
        c = function(r) {
            var t, c = o(arguments);
            return r = c.shift(), n(r) || (r = [r]), t = this,
                function() {
                    for (var u, a, e = c.concat(o(arguments)), s = r.length, i = 0; s > i; i++) a = r[i], a && (u = "string" == typeof a, e = (u ? t[a] : a).apply(t, e || []), s - 1 > i && (e = !n(e) || e._use_call ? [e] : e));
                    return e
                }
        };
    r.Construct.proxy = r.Construct.prototype.proxy = c;
    for (var u = [r.Map, r.Control, r.Model], a = 0; a < u.length; a++) u[a] && (u[a].proxy = c);
    return r
});
/*[global-shim-end]*/
! function() {
    window._define = window.define, window.define = window.define.orig
}();