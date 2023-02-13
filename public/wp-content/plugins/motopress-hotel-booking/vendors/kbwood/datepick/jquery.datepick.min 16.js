/* http://keith-wood.name/datepick.html
   Date picker for jQuery v5.0.1.
   Written by Keith Wood (kbwood{at}iinet.com.au) February 2010.
   Licensed under the MIT (http://keith-wood.name/licence.html) licence.
   Please attribute the author if you use it. */
(function($) {
    var E = 'datepick';
    $.JQPlugin.createPlugin({
        name: E,
        defaultRenderer: {
            picker: '<div class="datepick">' + '<div class="datepick-nav">{link:prev}{link:today}{link:next}</div>{months}' + '{popup:start}<div class="datepick-ctrl">{link:clear}{link:close}</div>{popup:end}' + '<div class="datepick-clear-fix"></div></div>',
            monthRow: '<div class="datepick-month-row">{months}</div>',
            month: '<div class="datepick-month"><div class="datepick-month-header">{monthHeader}</div>' + '<table><thead>{weekHeader}</thead><tbody>{weeks}</tbody></table></div>',
            weekHeader: '<tr>{days}</tr>',
            dayHeader: '<th>{day}</th>',
            week: '<tr>{days}</tr>',
            day: '<td>{day}</td>',
            monthSelector: '.datepick-month',
            daySelector: 'td',
            rtlClass: 'datepick-rtl',
            multiClass: 'datepick-multi',
            defaultClass: '',
            selectedClass: 'datepick-selected',
            highlightedClass: 'datepick-highlight',
            todayClass: 'datepick-today',
            otherMonthClass: 'datepick-other-month',
            weekendClass: 'datepick-weekend',
            commandClass: 'datepick-cmd',
            commandButtonClass: '',
            commandLinkClass: '',
            disabledClass: 'datepick-disabled'
        },
        commands: {
            prev: {
                text: 'prevText',
                status: 'prevStatus',
                keystroke: {
                    keyCode: 33
                },
                enabled: function(a) {
                    var b = a.curMinDate();
                    return (!b || F.add(F.day(F._applyMonthsOffset(F.add(F.newDate(a.drawDate), 1 - a.options.monthsToStep, 'm'), a), 1), -1, 'd').getTime() >= b.getTime())
                },
                date: function(a) {
                    return F.day(F._applyMonthsOffset(F.add(F.newDate(a.drawDate), -a.options.monthsToStep, 'm'), a), 1)
                },
                action: function(a) {
                    F.changeMonth(this, -a.options.monthsToStep)
                }
            },
            prevJump: {
                text: 'prevJumpText',
                status: 'prevJumpStatus',
                keystroke: {
                    keyCode: 33,
                    ctrlKey: true
                },
                enabled: function(a) {
                    var b = a.curMinDate();
                    return (!b || F.add(F.day(F._applyMonthsOffset(F.add(F.newDate(a.drawDate), 1 - a.options.monthsToJump, 'm'), a), 1), -1, 'd').getTime() >= b.getTime())
                },
                date: function(a) {
                    return F.day(F._applyMonthsOffset(F.add(F.newDate(a.drawDate), -a.options.monthsToJump, 'm'), a), 1)
                },
                action: function(a) {
                    F.changeMonth(this, -a.options.monthsToJump)
                }
            },
            next: {
                text: 'nextText',
                status: 'nextStatus',
                keystroke: {
                    keyCode: 34
                },
                enabled: function(a) {
                    var b = a.get('maxDate');
                    return (!b || F.day(F._applyMonthsOffset(F.add(F.newDate(a.drawDate), a.options.monthsToStep, 'm'), a), 1).getTime() <= b.getTime())
                },
                date: function(a) {
                    return F.day(F._applyMonthsOffset(F.add(F.newDate(a.drawDate), a.options.monthsToStep, 'm'), a), 1)
                },
                action: function(a) {
                    F.changeMonth(this, a.options.monthsToStep)
                }
            },
            nextJump: {
                text: 'nextJumpText',
                status: 'nextJumpStatus',
                keystroke: {
                    keyCode: 34,
                    ctrlKey: true
                },
                enabled: function(a) {
                    var b = a.get('maxDate');
                    return (!b || F.day(F._applyMonthsOffset(F.add(F.newDate(a.drawDate), a.options.monthsToJump, 'm'), a), 1).getTime() <= b.getTime())
                },
                date: function(a) {
                    return F.day(F._applyMonthsOffset(F.add(F.newDate(a.drawDate), a.options.monthsToJump, 'm'), a), 1)
                },
                action: function(a) {
                    F.changeMonth(this, a.options.monthsToJump)
                }
            },
            current: {
                text: 'currentText',
                status: 'currentStatus',
                keystroke: {
                    keyCode: 36,
                    ctrlKey: true
                },
                enabled: function(a) {
                    var b = a.curMinDate();
                    var c = a.get('maxDate');
                    var d = a.selectedDates[0] || F.today();
                    return (!b || d.getTime() >= b.getTime()) && (!c || d.getTime() <= c.getTime())
                },
                date: function(a) {
                    return a.selectedDates[0] || F.today()
                },
                action: function(a) {
                    var b = a.selectedDates[0] || F.today();
                    F.showMonth(this, b.getFullYear(), b.getMonth() + 1)
                }
            },
            today: {
                text: 'todayText',
                status: 'todayStatus',
                keystroke: {
                    keyCode: 36,
                    ctrlKey: true
                },
                enabled: function(a) {
                    var b = a.curMinDate();
                    var c = a.get('maxDate');
                    return (!b || F.today().getTime() >= b.getTime()) && (!c || F.today().getTime() <= c.getTime())
                },
                date: function(a) {
                    return F.today()
                },
                action: function(a) {
                    F.showMonth(this)
                }
            },
            clear: {
                text: 'clearText',
                status: 'clearStatus',
                keystroke: {
                    keyCode: 35,
                    ctrlKey: true
                },
                enabled: function(a) {
                    return true
                },
                date: function(a) {
                    return null
                },
                action: function(a) {
                    F.clear(this)
                }
            },
            close: {
                text: 'closeText',
                status: 'closeStatus',
                keystroke: {
                    keyCode: 27
                },
                enabled: function(a) {
                    return true
                },
                date: function(a) {
                    return null
                },
                action: function(a) {
                    F.hide(this)
                }
            },
            prevWeek: {
                text: 'prevWeekText',
                status: 'prevWeekStatus',
                keystroke: {
                    keyCode: 38,
                    ctrlKey: true
                },
                enabled: function(a) {
                    var b = a.curMinDate();
                    return (!b || F.add(F.newDate(a.drawDate), -7, 'd').getTime() >= b.getTime())
                },
                date: function(a) {
                    return F.add(F.newDate(a.drawDate), -7, 'd')
                },
                action: function(a) {
                    F.changeDay(this, -7)
                }
            },
            prevDay: {
                text: 'prevDayText',
                status: 'prevDayStatus',
                keystroke: {
                    keyCode: 37,
                    ctrlKey: true
                },
                enabled: function(a) {
                    var b = a.curMinDate();
                    return (!b || F.add(F.newDate(a.drawDate), -1, 'd').getTime() >= b.getTime())
                },
                date: function(a) {
                    return F.add(F.newDate(a.drawDate), -1, 'd')
                },
                action: function(a) {
                    F.changeDay(this, -1)
                }
            },
            nextDay: {
                text: 'nextDayText',
                status: 'nextDayStatus',
                keystroke: {
                    keyCode: 39,
                    ctrlKey: true
                },
                enabled: function(a) {
                    var b = a.get('maxDate');
                    return (!b || F.add(F.newDate(a.drawDate), 1, 'd').getTime() <= b.getTime())
                },
                date: function(a) {
                    return F.add(F.newDate(a.drawDate), 1, 'd')
                },
                action: function(a) {
                    F.changeDay(this, 1)
                }
            },
            nextWeek: {
                text: 'nextWeekText',
                status: 'nextWeekStatus',
                keystroke: {
                    keyCode: 40,
                    ctrlKey: true
                },
                enabled: function(a) {
                    var b = a.get('maxDate');
                    return (!b || F.add(F.newDate(a.drawDate), 7, 'd').getTime() <= b.getTime())
                },
                date: function(a) {
                    return F.add(F.newDate(a.drawDate), 7, 'd')
                },
                action: function(a) {
                    F.changeDay(this, 7)
                }
            }
        },
        defaultOptions: {
            pickerClass: '',
            showOnFocus: true,
            showTrigger: null,
            showAnim: 'show',
            showOptions: {},
            showSpeed: 'normal',
            popupContainer: null,
            alignment: 'bottom',
            fixedWeeks: false,
            firstDay: 0,
            calculateWeek: null,
            monthsToShow: 1,
            monthsOffset: 0,
            monthsToStep: 1,
            monthsToJump: 12,
            useMouseWheel: true,
            changeMonth: true,
            yearRange: 'c-10:c+10',
            shortYearCutoff: '+10',
            showOtherMonths: false,
            selectOtherMonths: false,
            defaultDate: null,
            selectDefaultDate: false,
            minDate: null,
            maxDate: null,
            dateFormat: 'mm/dd/yyyy',
            autoSize: false,
            rangeSelect: false,
            rangeSeparator: ' - ',
            multiSelect: 0,
            multiSeparator: ',',
            onDate: null,
            onShow: null,
            onChangeMonthYear: null,
            onSelect: null,
            onClose: null,
            altField: null,
            altFormat: null,
            constrainInput: true,
            commandsAsDateFormat: false,
            commands: {}
        },
        regionalOptions: {
            '': {
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                dateFormat: 'mm/dd/yyyy',
                firstDay: 0,
                renderer: {},
                prevText: '&lt;Prev',
                prevStatus: 'Show the previous month',
                prevJumpText: '&lt;&lt;',
                prevJumpStatus: 'Show the previous year',
                nextText: 'Next&gt;',
                nextStatus: 'Show the next month',
                nextJumpText: '&gt;&gt;',
                nextJumpStatus: 'Show the next year',
                currentText: 'Current',
                currentStatus: 'Show the current month',
                todayText: 'Today',
                todayStatus: 'Show today\'s month',
                clearText: 'Clear',
                clearStatus: 'Clear all the dates',
                closeText: 'Close',
                closeStatus: 'Close the datepicker',
                yearStatus: 'Change the year',
                earlierText: '&#160;&#160;▲',
                laterText: '&#160;&#160;▼',
                monthStatus: 'Change the month',
                weekText: 'Wk',
                weekStatus: 'Week of the year',
                dayStatus: 'Select DD, M d, yyyy',
                defaultStatus: 'Select a date',
                isRTL: false
            }
        },
        _getters: ['getDate', 'isDisabled', 'isSelectable', 'retrieveDate'],
        _disabled: [],
        _popupClass: E + '-popup',
        _triggerClass: E + '-trigger',
        _disableClass: E + '-disable',
        _monthYearClass: E + '-month-year',
        _curMonthClass: E + '-month-',
        _anyYearClass: E + '-any-year',
        _curDoWClass: E + '-dow-',
        _ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
        _msPerDay: 24 * 60 * 60 * 1000,
        ATOM: 'yyyy-mm-dd',
        COOKIE: 'D, dd M yyyy',
        FULL: 'DD, MM d, yyyy',
        ISO_8601: 'yyyy-mm-dd',
        JULIAN: 'J',
        RFC_822: 'D, d M yy',
        RFC_850: 'DD, dd-M-yy',
        RFC_1036: 'D, d M yy',
        RFC_1123: 'D, d M yyyy',
        RFC_2822: 'D, d M yyyy',
        RSS: 'D, d M yy',
        TICKS: '!',
        TIMESTAMP: '@',
        W3C: 'yyyy-mm-dd',
        formatDate: function(f, g, h) {
            if (typeof f !== 'string') {
                h = g;
                g = f;
                f = ''
            }
            if (!g) {
                return ''
            }
            f = f || this.defaultOptions.dateFormat;
            h = h || {};
            var i = h.dayNamesShort || this.defaultOptions.dayNamesShort;
            var j = h.dayNames || this.defaultOptions.dayNames;
            var k = h.monthNamesShort || this.defaultOptions.monthNamesShort;
            var l = h.monthNames || this.defaultOptions.monthNames;
            var m = h.calculateWeek || this.defaultOptions.calculateWeek;
            var n = function(a, b) {
                var c = 1;
                while (s + c < f.length && f.charAt(s + c) === a) {
                    c++
                }
                s += c - 1;
                return Math.floor(c / (b || 1)) > 1
            };
            var o = function(a, b, c, d) {
                var e = '' + b;
                if (n(a, d)) {
                    while (e.length < c) {
                        e = '0' + e
                    }
                }
                return e
            };
            var p = function(a, b, c, d) {
                return (n(a) ? d[b] : c[b])
            };
            var q = '';
            var r = false;
            for (var s = 0; s < f.length; s++) {
                if (r) {
                    if (f.charAt(s) === "'" && !n("'")) {
                        r = false
                    } else {
                        q += f.charAt(s)
                    }
                } else {
                    switch (f.charAt(s)) {
                        case 'd':
                            q += o('d', g.getDate(), 2);
                            break;
                        case 'D':
                            q += p('D', g.getDay(), i, j);
                            break;
                        case 'o':
                            q += o('o', this.dayOfYear(g), 3);
                            break;
                        case 'w':
                            q += o('w', m(g), 2);
                            break;
                        case 'm':
                            q += o('m', g.getMonth() + 1, 2);
                            break;
                        case 'M':
                            q += p('M', g.getMonth(), k, l);
                            break;
                        case 'y':
                            q += (n('y', 2) ? g.getFullYear() : (g.getFullYear() % 100 < 10 ? '0' : '') + g.getFullYear() % 100);
                            break;
                        case '@':
                            q += Math.floor(g.getTime() / 1000);
                            break;
                        case '!':
                            q += g.getTime() * 10000 + this._ticksTo1970;
                            break;
                        case "'":
                            if (n("'")) {
                                q += "'"
                            } else {
                                r = true
                            }
                            break;
                        default:
                            q += f.charAt(s)
                    }
                }
            }
            return q
        },
        parseDate: function(g, h, j) {
            if (h == null) {
                throw 'Invalid arguments';
            }
            h = (typeof h === 'object' ? h.toString() : h + '');
            if (h === '') {
                return null
            }
            g = g || this.defaultOptions.dateFormat;
            j = j || {};
            var k = j.shortYearCutoff || this.defaultOptions.shortYearCutoff;
            k = (typeof k !== 'string' ? k : this.today().getFullYear() % 100 + parseInt(k, 10));
            var l = j.dayNamesShort || this.defaultOptions.dayNamesShort;
            var m = j.dayNames || this.defaultOptions.dayNames;
            var n = j.monthNamesShort || this.defaultOptions.monthNamesShort;
            var o = j.monthNames || this.defaultOptions.monthNames;
            var p = -1;
            var q = -1;
            var r = -1;
            var s = -1;
            var t = false;
            var u = false;
            var v = function(a, b) {
                var c = 1;
                while (A + c < g.length && g.charAt(A + c) === a) {
                    c++
                }
                A += c - 1;
                return Math.floor(c / (b || 1)) > 1
            };
            var w = function(a, b) {
                var c = v(a, b);
                var d = [2, 3, c ? 4 : 2, 11, 20]['oy@!'.indexOf(a) + 1];
                var e = new RegExp('^-?\\d{1,' + d + '}');
                var f = h.substring(z).match(e);
                if (!f) {
                    throw 'Missing number at position {0}'.replace(/\{0\}/, z);
                }
                z += f[0].length;
                return parseInt(f[0], 10);
            };
            var x = function(a, b, c, d) {
                var e = (v(a, d) ? c : b);
                for (var i = 0; i < e.length; i++) {
                    if (h.substr(z, e[i].length).toLowerCase() === e[i].toLowerCase()) {
                        z += e[i].length;
                        return i + 1;
                    }
                }
                throw 'Unknown name at position {0}'.replace(/\{0\}/, z);
            };
            var y = function() {
                if (h.charAt(z) !== g.charAt(A)) {
                    throw 'Unexpected literal at position {0}'.replace(/\{0\}/, z);
                }
                z++;
            };
            var z = 0;
            for (var A = 0; A < g.length; A++) {
                if (u) {
                    if (g.charAt(A) === "'" && !v("'")) {
                        u = false;
                    } else {
                        y();
                    }
                } else {
                    switch (g.charAt(A)) {
                        case 'd':
                            r = w('d');
                            break;
                        case 'D':
                            x('D', l, m);
                            break;
                        case 'o':
                            s = w('o');
                            break;
                        case 'w':
                            w('w');
                            break;
                        case 'm':
                            q = w('m');
                            break;
                        case 'M':
                            q = x('M', n, o);
                            break;
                        case 'y':
                            var B = A;
                            t = !v('y', 2);
                            A = B;
                            p = w('y', 2);
                            break;
                        case '@':
                            var C = this._normaliseDate(new Date(w('@') * 1000));
                            p = C.getFullYear();
                            q = C.getMonth() + 1;
                            r = C.getDate();
                            break;
                        case '!':
                            var C = this._normaliseDate(new Date((w('!') - this._ticksTo1970) / 10000));
                            p = C.getFullYear();
                            q = C.getMonth() + 1;
                            r = C.getDate();
                            break;
                        case '*':
                            z = h.length;
                            break;
                        case "'":
                            if (v("'")) {
                                y();
                            } else {
                                u = true;
                            }
                            break;
                        default:
                            y();
                    }
                }
            }
            if (z < h.length) {
                throw 'Additional text found at end';
            }
            if (p === -1) {
                p = this.today().getFullYear();
            } else if (p < 100 && t) {
                p += (k === -1 ? 1900 : this.today().getFullYear() - this.today().getFullYear() % 100 - (p <= k ? 0 : 100));
            }
            if (s > -1) {
                q = 1;
                r = s;
                for (var D = this.daysInMonth(p, q); r > D; D = this.daysInMonth(p, q)) {
                    q++;
                    r -= D;
                }
            }
            var C = this.newDate(p, q, r);
            if (C.getFullYear() !== p || C.getMonth() + 1 !== q || C.getDate() !== r) {
                throw 'Invalid date';
            }
            return C;
        },
        determineDate: function(f, g, h, i, j) {
            if (h && typeof h !== 'object') {
                j = i;
                i = h;
                h = null;
            }
            if (typeof i !== 'string') {
                j = i;
                i = '';
            }
            var k = function(a) {
                try {
                    return F.parseDate(i, a, j);
                } catch (e) {}
                a = a.toLowerCase();
                var b = (a.match(/^c/) && h ? F.newDate(h) : null) || F.today();
                var c = /([+-]?[0-9]+)\s*(d|w|m|y)?/g;
                var d = null;
                while (d = c.exec(a)) {
                    b = F.add(b, parseInt(d[1], 10), d[2] || 'd');
                }
                return b;
            };
            g = (g ? F.newDate(g) : null);
            f = (f == null ? g : (typeof f === 'string' ? k(f) : (typeof f === 'number' ? (isNaN(f) || f === Infinity || f === -Infinity ? g : F.add(F.today(), f, 'd')) : F.newDate(f))));
            return f;
        },
        daysInMonth: function(a, b) {
            b = (a.getFullYear ? a.getMonth() + 1 : b);
            a = (a.getFullYear ? a.getFullYear() : a);
            return this.newDate(a, b + 1, 0).getDate();
        },
        dayOfYear: function(a, b, c) {
            var d = (a.getFullYear ? a : F.newDate(a, b, c));
            var e = F.newDate(d.getFullYear(), 1, 1);
            return Math.floor((d.getTime() - e.getTime()) / F._msPerDay) + 1;
        },
        iso8601Week: function(a, b, c) {
            var d = (a.getFullYear ? new Date(a.getTime()) : F.newDate(a, b, c));
            d.setDate(d.getDate() + 4 - (d.getDay() || 7));
            var e = d.getTime();
            d.setMonth(0, 1);
            return Math.floor(Math.round((e - d) / F._msPerDay) / 7) + 1;
        },
        today: function() {
            return this._normaliseDate(new Date());
        },
        newDate: function(a, b, c) {
            return (!a ? null : (a.getFullYear ? this._normaliseDate(new Date(a.getTime())) : new Date(a, b - 1, c, 12)));
        },
        _normaliseDate: function(a) {
            if (a) {
                a.setHours(12, 0, 0, 0);
            }
            return a;
        },
        year: function(a, b) {
            a.setFullYear(b);
            return this._normaliseDate(a);
        },
        month: function(a, b) {
            a.setMonth(b - 1);
            return this._normaliseDate(a);
        },
        day: function(a, b) {
            a.setDate(b);
            return this._normaliseDate(a);
        },
        add: function(a, b, c) {
            if (c === 'd' || c === 'w') {
                this._normaliseDate(a);
                a.setDate(a.getDate() + b * (c === 'w' ? 7 : 1));
            } else {
                var d = a.getFullYear() + (c === 'y' ? b : 0);
                var e = a.getMonth() + (c === 'm' ? b : 0);
                a.setTime(F.newDate(d, e + 1, Math.min(a.getDate(), this.daysInMonth(d, e + 1))).getTime());
            }
            return a;
        },
        _applyMonthsOffset: function(a, b) {
            var c = b.options.monthsOffset;
            if ($.isFunction(c)) {
                c = c.apply(b.elem[0], [a]);
            }
            return F.add(a, -c, 'm');
        },
        _init: function() {
            this.defaultOptions.commands = this.commands;
            this.defaultOptions.calculateWeek = this.iso8601Week;
            this.regionalOptions[''].renderer = this.defaultRenderer;
            this._super();
        },
        _instSettings: function(b, c) {
            return {
                selectedDates: [],
                drawDate: null,
                pickingRange: false,
                inline: ($.inArray(b[0].nodeName.toLowerCase(), ['div', 'span']) > -1),
                get: function(a) {
                    if ($.inArray(a, ['defaultDate', 'minDate', 'maxDate']) > -1) {
                        return F.determineDate(this.options[a], null, this.selectedDates[0], this.options.dateFormat, this.getConfig());
                    }
                    return this.options[a];
                },
                curMinDate: function() {
                    return (this.pickingRange ? this.selectedDates[0] : this.get('minDate'));
                },
                getConfig: function() {
                    return {
                        dayNamesShort: this.options.dayNamesShort,
                        dayNames: this.options.dayNames,
                        monthNamesShort: this.options.monthNamesShort,
                        monthNames: this.options.monthNames,
                        calculateWeek: this.options.calculateWeek,
                        shortYearCutoff: this.options.shortYearCutoff
                    };
                }
            };
        },
        _postAttach: function(a, b) {
            if (b.inline) {
                b.drawDate = F._checkMinMax(F.newDate(b.selectedDates[0] || b.get('defaultDate') || F.today()), b);
                b.prevDate = F.newDate(b.drawDate);
                this._update(a[0]);
                if ($.fn.mousewheel) {
                    a.mousewheel(this._doMouseWheel);
                }
            } else {
                this._attachments(a, b);
                a.on('keydown.' + b.name, this._keyDown).on('keypress.' + b.name, this._keyPress).on('keyup.' + b.name, this._keyUp);
                if (a.attr('disabled')) {
                    this.disable(a[0]);
                }
            }
        },
        _optionsChanged: function(b, c, d) {
            if (d.calendar && d.calendar !== c.options.calendar) {
                var e = function(a) {
                    return (typeof c.options[a] === 'object' ? null : c.options[a]);
                };
                d = $.extend({
                    defaultDate: e('defaultDate'),
                    minDate: e('minDate'),
                    maxDate: e('maxDate')
                }, d);
                c.selectedDates = [];
                c.drawDate = null;
            }
            var f = c.selectedDates;
            $.extend(c.options, d);
            this.setDate(b[0], f, null, false, true);
            c.pickingRange = false;
            c.drawDate = F.newDate(this._checkMinMax((c.options.defaultDate ? c.get('defaultDate') : c.drawDate) || c.get('defaultDate') || F.today(), c));
            if (!c.inline) {
                this._attachments(b, c);
            }
            if (c.inline || c.div) {
                this._update(b[0]);
            }
        },
        _attachments: function(a, b) {
            a.off('focus.' + b.name);
            if (b.options.showOnFocus) {
                a.on('focus.' + b.name, this.show);
            }
            if (b.trigger) {
                b.trigger.remove();
            }
            var c = b.options.showTrigger;
            b.trigger = (!c ? $([]) : $(c).clone().removeAttr('id').addClass(this._triggerClass)[b.options.isRTL ? 'insertBefore' : 'insertAfter'](a).click(function() {
                if (!F.isDisabled(a[0])) {
                    F[F.curInst === b ? 'hide' : 'show'](a[0]);
                }
            }));
            this._autoSize(a, b);
            var d = this._extractDates(b, a.val());
            if (d) {
                this.setDate(a[0], d, null, true);
            }
            var e = b.get('defaultDate');
            if (b.options.selectDefaultDate && e && b.selectedDates.length === 0) {
                this.setDate(a[0], F.newDate(e || F.today()));
            }
        },
        _autoSize: function(d, e) {
            if (e.options.autoSize && !e.inline) {
                var f = F.newDate(2009, 10, 20);
                var g = e.options.dateFormat;
                if (g.match(/[DM]/)) {
                    var h = function(a) {
                        var b = 0;
                        var c = 0;
                        for (var i = 0; i < a.length; i++) {
                            if (a[i].length > b) {
                                b = a[i].length;
                                c = i;
                            }
                        }
                        return c;
                    };
                    f.setMonth(h(e.options[g.match(/MM/) ? 'monthNames' : 'monthNamesShort']));
                    f.setDate(h(e.options[g.match(/DD/) ? 'dayNames' : 'dayNamesShort']) + 20 - f.getDay());
                }
                e.elem.attr('size', F.formatDate(g, f, e.getConfig()).length);
            }
        },
        _preDestroy: function(a, b) {
            if (b.trigger) {
                b.trigger.remove();
            }
            a.empty().off('.' + b.name);
            if (b.inline && $.fn.mousewheel) {
                a.unmousewheel();
            }
            if (!b.inline && b.options.autoSize) {
                a.removeAttr('size');
            }
        },
        multipleEvents: function(b) {
            var c = arguments;
            return function(a) {
                for (var i = 0; i < c.length; i++) {
                    c[i].apply(this, arguments);
                }
            };
        },
        enable: function(b) {
            b = $(b);
            if (!b.hasClass(this._getMarker())) {
                return;
            }
            var c = this._getInst(b);
            if (c.inline) {
                b.children('.' + this._disableClass).remove().end().find('button,select').prop('disabled', false).end().find('a').attr('href', 'javascript:void(0)');
            } else {
                b.prop('disabled', false);
                c.trigger.filter('button.' + this._triggerClass).prop('disabled', false).end().filter('img.' + this._triggerClass).css({
                    opacity: '1.0',
                    cursor: ''
                });
            }
            this._disabled = $.map(this._disabled, function(a) {
                return (a === b[0] ? null : a);
            });
        },
        disable: function(b) {
            b = $(b);
            if (!b.hasClass(this._getMarker())) {
                return;
            }
            var c = this._getInst(b);
            if (c.inline) {
                var d = b.children(':last');
                var e = d.offset();
                var f = {
                    left: 0,
                    top: 0
                };
                d.parents().each(function() {
                    if ($(this).css('position') === 'relative') {
                        f = $(this).offset();
                        return false;
                    }
                });
                var g = b.css('zIndex');
                g = (g === 'auto' ? 0 : parseInt(g, 10)) + 1;
                b.prepend('<div class="' + this._disableClass + '" style="' + 'width: ' + d.outerWidth() + 'px; height: ' + d.outerHeight() + 'px; left: ' + (e.left - f.left) + 'px; top: ' + (e.top - f.top) + 'px; z-index: ' + g + '"></div>').find('button,select').prop('disabled', true).end().find('a').removeAttr('href');
            } else {
                b.prop('disabled', true);
                c.trigger.filter('button.' + this._triggerClass).prop('disabled', true).end().filter('img.' + this._triggerClass).css({
                    opacity: '0.5',
                    cursor: 'default'
                });
            }
            this._disabled = $.map(this._disabled, function(a) {
                return (a === b[0] ? null : a);
            });
            this._disabled.push(b[0]);
        },
        isDisabled: function(a) {
            return (a && $.inArray(a, this._disabled) > -1);
        },
        show: function(a) {
            a = $(a.target || a);
            var b = F._getInst(a);
            if (F.curInst === b) {
                return;
            }
            if (F.curInst) {
                F.hide(F.curInst, true);
            }
            if (!$.isEmptyObject(b)) {
                b.lastVal = null;
                b.selectedDates = F._extractDates(b, a.val());
                b.pickingRange = false;
                b.drawDate = F._checkMinMax(F.newDate(b.selectedDates[0] || b.get('defaultDate') || F.today()), b);
                b.prevDate = F.newDate(b.drawDate);
                F.curInst = b;
                F._update(a[0], true);
                var c = F._checkOffset(b);
                b.div.css({
                    left: c.left,
                    top: c.top
                });
                var d = b.options.showAnim;
                var e = b.options.showSpeed;
                e = (e === 'normal' && $.ui && parseInt($.ui.version.substring(2)) >= 8 ? '_default' : e);
                if ($.effects && ($.effects[d] || ($.effects.effect && $.effects.effect[d]))) {
                    var f = b.div.data();
                    for (var g in f) {
                        if (g.match(/^ec\.storage\./)) {
                            f[g] = b._mainDiv.css(g.replace(/ec\.storage\./, ''));
                        }
                    }
                    b.div.data(f).show(d, b.options.showOptions, e);
                } else {
                    b.div[d || 'show'](d ? e : 0);
                }
            }
        },
        _extractDates: function(a, b) {
            if (b === a.lastVal) {
                return;
            }
            a.lastVal = b;
            b = b.split(a.options.multiSelect ? a.options.multiSeparator : (a.options.rangeSelect ? a.options.rangeSeparator : '\x00'));
            var c = [];
            for (var i = 0; i < b.length; i++) {
                try {
                    var d = F.parseDate(a.options.dateFormat, b[i], a.getConfig());
                    if (d) {
                        var f = false;
                        for (var j = 0; j < c.length; j++) {
                            if (c[j].getTime() === d.getTime()) {
                                f = true;
                                break;
                            }
                        }
                        if (!f) {
                            c.push(d);
                        }
                    }
                } catch (e) {}
            }
            c.splice(a.options.multiSelect || (a.options.rangeSelect ? 2 : 1), c.length);
            if (a.options.rangeSelect && c.length === 1) {
                c[1] = c[0];
            }
            return c;
        },
        _update: function(a, b) {
            a = $(a.target || a);
            var c = F._getInst(a);
            if (!$.isEmptyObject(c)) {
                if (c.inline || F.curInst === c) {
                    if ($.isFunction(c.options.onChangeMonthYear) && (!c.prevDate || c.prevDate.getFullYear() !== c.drawDate.getFullYear() || c.prevDate.getMonth() !== c.drawDate.getMonth())) {
                        c.options.onChangeMonthYear.apply(a[0], [c.drawDate.getFullYear(), c.drawDate.getMonth() + 1]);
                    }
                }
                if (c.inline) {
                    var d = $('a, :input', a).index($(':focus', a));
                    a.html(this._generateContent(a[0], c));
                    var e = a.find('a, :input');
                    e.eq(Math.max(Math.min(d, e.length - 1), 0)).focus();
                } else if (F.curInst === c) {
                    if (!c.div) {
                        c.div = $('<div></div>').addClass(this._popupClass).css({
                            display: (b ? 'none' : 'static'),
                            position: 'absolute',
                            left: a.offset().left,
                            top: a.offset().top + a.outerHeight()
                        }).appendTo($(c.options.popupContainer || 'body'));
                        if ($.fn.mousewheel) {
                            c.div.mousewheel(this._doMouseWheel);
                        }
                    }
                    c.div.html(this._generateContent(a[0], c));
                    a.focus();
                }
            }
        },
        _updateInput: function(a, b) {
            var c = this._getInst(a);
            if (!$.isEmptyObject(c)) {
                var d = '';
                var e = '';
                var f = (c.options.multiSelect ? c.options.multiSeparator : c.options.rangeSeparator);
                var g = c.options.altFormat || c.options.dateFormat;
                for (var i = 0; i < c.selectedDates.length; i++) {
                    d += (b ? '' : (i > 0 ? f : '') + F.formatDate(c.options.dateFormat, c.selectedDates[i], c.getConfig()));
                    e += (i > 0 ? f : '') + F.formatDate(g, c.selectedDates[i], c.getConfig());
                }
                if (!c.inline && !b) {
                    $(a).val(d);
                }
                $(c.options.altField).val(e);
                if ($.isFunction(c.options.onSelect) && !b && !c.inSelect) {
                    c.inSelect = true;
                    c.options.onSelect.apply(a, [c.selectedDates]);
                    c.inSelect = false;
                }
            }
        },
        _getBorders: function(b) {
            var c = function(a) {
                return {
                    thin: 1,
                    medium: 3,
                    thick: 5
                }[a] || a;
            };
            return [parseFloat(c(b.css('border-left-width'))), parseFloat(c(b.css('border-top-width')))];
        },
        _checkOffset: function(a) {
            var b = (a.elem.is(':hidden') && a.trigger ? a.trigger : a.elem);
            var c = b.offset();
            var d = $(window).width();
            var e = $(window).height();
            if (d === 0) {
                return c;
            }
            var f = false;
            $(a.elem).parents().each(function() {
                f |= $(this).css('position') === 'fixed';
                return !f;
            });
            var g = document.documentElement.scrollLeft || document.body.scrollLeft;
            var h = document.documentElement.scrollTop || document.body.scrollTop;
            var i = c.top - (f ? h : 0) - a.div.outerHeight();
            var j = c.top - (f ? h : 0) + b.outerHeight();
            var k = c.left - (f ? g : 0);
            var l = c.left - (f ? g : 0) + b.outerWidth() - a.div.outerWidth();
            var m = (c.left - g + a.div.outerWidth()) > d;
            var n = (c.top - h + a.elem.outerHeight() + a.div.outerHeight()) > e;
            a.div.css('position', f ? 'fixed' : 'absolute');
            var o = a.options.alignment;
            if (o === 'topLeft') {
                c = {
                    left: k,
                    top: i
                };
            } else if (o === 'topRight') {
                c = {
                    left: l,
                    top: i
                };
            } else if (o === 'bottomLeft') {
                c = {
                    left: k,
                    top: j
                };
            } else if (o === 'bottomRight') {
                c = {
                    left: l,
                    top: j
                };
            } else if (o === 'top') {
                c = {
                    left: (a.options.isRTL || m ? l : k),
                    top: i
                };
            } else {
                c = {
                    left: (a.options.isRTL || m ? l : k),
                    top: (n ? i : j)
                };
            }
            c.left = Math.max((f ? 0 : g), c.left);
            c.top = Math.max((f ? 0 : h), c.top);
            return c;
        },
        _checkExternalClick: function(a) {
            if (!F.curInst) {
                return;
            }
            var b = $(a.target);
            if (b.closest('.' + F._popupClass + ',.' + F._triggerClass).length === 0 && !b.hasClass(F._getMarker())) {
                F.hide(F.curInst);
            }
        },
        hide: function(a, b) {
            if (!a) {
                return;
            }
            var c = this._getInst(a);
            if ($.isEmptyObject(c)) {
                c = a;
            }
            if (c && c === F.curInst) {
                var d = (b ? '' : c.options.showAnim);
                var e = c.options.showSpeed;
                e = (e === 'normal' && $.ui && parseInt($.ui.version.substring(2)) >= 8 ? '_default' : e);
                var f = function() {
                    if (!c.div) {
                        return;
                    }
                    c.div.remove();
                    c.div = null;
                    F.curInst = null;
                    if ($.isFunction(c.options.onClose)) {
                        c.options.onClose.apply(a, [c.selectedDates]);
                    }
                };
                c.div.stop();
                if ($.effects && ($.effects[d] || ($.effects.effect && $.effects.effect[d]))) {
                    c.div.hide(d, c.options.showOptions, e, f);
                } else {
                    var g = (d === 'slideDown' ? 'slideUp' : (d === 'fadeIn' ? 'fadeOut' : 'hide'));
                    c.div[g]((d ? e : ''), f);
                }
                if (!d) {
                    f();
                }
            }
        },
        _keyDown: function(a) {
            var b = (a.data && a.data.elem) || a.target;
            var c = F._getInst(b);
            var d = false;
            if (c.inline || c.div) {
                if (a.keyCode === 9) {
                    F.hide(b);
                } else if (a.keyCode === 13) {
                    F.selectDate(b, $('a.' + c.options.renderer.highlightedClass, c.div)[0]);
                    d = true;
                } else {
                    var e = c.options.commands;
                    for (var f in e) {
                        var g = e[f];
                        if (g.keystroke.keyCode === a.keyCode && !!g.keystroke.ctrlKey === !!(a.ctrlKey || a.metaKey) && !!g.keystroke.altKey === a.altKey && !!g.keystroke.shiftKey === a.shiftKey) {
                            F.performAction(b, f);
                            d = true;
                            break;
                        }
                    }
                }
            } else {
                var g = c.options.commands.current;
                if (g.keystroke.keyCode === a.keyCode && !!g.keystroke.ctrlKey === !!(a.ctrlKey || a.metaKey) && !!g.keystroke.altKey === a.altKey && !!g.keystroke.shiftKey === a.shiftKey) {
                    F.show(b);
                    d = true;
                }
            }
            c.ctrlKey = ((a.keyCode < 48 && a.keyCode !== 32) || a.ctrlKey || a.metaKey);
            if (d) {
                a.preventDefault();
                a.stopPropagation();
            }
            return !d;
        },
        _keyPress: function(a) {
            var b = F._getInst((a.data && a.data.elem) || a.target);
            if (!$.isEmptyObject(b) && b.options.constrainInput) {
                var c = String.fromCharCode(a.keyCode || a.charCode);
                var d = F._allowedChars(b);
                return (a.metaKey || b.ctrlKey || c < ' ' || !d || d.indexOf(c) > -1);
            }
            return true;
        },
        _allowedChars: function(a) {
            var b = (a.options.multiSelect ? a.options.multiSeparator : (a.options.rangeSelect ? a.options.rangeSeparator : ''));
            var c = false;
            var d = false;
            var e = a.options.dateFormat;
            for (var i = 0; i < e.length; i++) {
                var f = e.charAt(i);
                if (c) {
                    if (f === "'" && e.charAt(i + 1) !== "'") {
                        c = false;
                    } else {
                        b += f;
                    }
                } else {
                    switch (f) {
                        case 'd':
                        case 'm':
                        case 'o':
                        case 'w':
                            b += (d ? '' : '0123456789');
                            d = true;
                            break;
                        case 'y':
                        case '@':
                        case '!':
                            b += (d ? '' : '0123456789') + '-';
                            d = true;
                            break;
                        case 'J':
                            b += (d ? '' : '0123456789') + '-.';
                            d = true;
                            break;
                        case 'D':
                        case 'M':
                        case 'Y':
                            return null;
                        case "'":
                            if (e.charAt(i + 1) === "'") {
                                b += "'";
                            } else {
                                c = true;
                            }
                            break;
                        default:
                            b += f;
                    }
                }
            }
            return b;
        },
        _keyUp: function(a) {
            var b = (a.data && a.data.elem) || a.target;
            var c = F._getInst(b);
            if (!$.isEmptyObject(c) && !c.ctrlKey && c.lastVal !== c.elem.val()) {
                try {
                    var d = F._extractDates(c, c.elem.val());
                    if (d.length > 0) {
                        F.setDate(b, d, null, true);
                    }
                } catch (a) {}
            }
            return true;
        },
        _doMouseWheel: function(a, b) {
            var c = (F.curInst && F.curInst.elem[0]) || $(a.target).closest('.' + F._getMarker())[0];
            if (F.isDisabled(c)) {
                return;
            }
            var d = F._getInst(c);
            if (d.options.useMouseWheel) {
                b = (b < 0 ? -1 : +1);
                F.changeMonth(c, -d.options[a.ctrlKey ? 'monthsToJump' : 'monthsToStep'] * b);
            }
            a.preventDefault();
        },
        clear: function(a) {
            var b = this._getInst(a);
            if (!$.isEmptyObject(b)) {
                b.selectedDates = [];
                this.hide(a);
                var c = b.get('defaultDate');
                if (b.options.selectDefaultDate && c) {
                    this.setDate(a, F.newDate(c || F.today()));
                } else {
                    this._updateInput(a);
                }
            }
        },
        getDate: function(a) {
            var b = this._getInst(a);
            return (!$.isEmptyObject(b) ? b.selectedDates : []);
        },
        setDate: function(a, b, c, d, e) {
            var f = this._getInst(a);
            if (!$.isEmptyObject(f)) {
                if (!$.isArray(b)) {
                    b = [b];
                    if (c) {
                        b.push(c);
                    }
                }
                var g = f.get('minDate');
                var h = f.get('maxDate');
                var k = f.selectedDates[0];
                f.selectedDates = [];
                for (var i = 0; i < b.length; i++) {
                    var l = F.determineDate(b[i], null, k, f.options.dateFormat, f.getConfig());
                    if (l) {
                        if ((!g || l.getTime() >= g.getTime()) && (!h || l.getTime() <= h.getTime())) {
                            var m = false;
                            for (var j = 0; j < f.selectedDates.length; j++) {
                                if (f.selectedDates[j].getTime() === l.getTime()) {
                                    m = true;
                                    break;
                                }
                            }
                            if (!m) {
                                f.selectedDates.push(l);
                            }
                        }
                    }
                }
                f.selectedDates.splice(f.options.multiSelect || (f.options.rangeSelect ? 2 : 1), f.selectedDates.length);
                if (f.options.rangeSelect) {
                    switch (f.selectedDates.length) {
                        case 1:
                            f.selectedDates[1] = f.selectedDates[0];
                            break;
                        case 2:
                            f.selectedDates[1] = (f.selectedDates[0].getTime() > f.selectedDates[1].getTime() ? f.selectedDates[0] : f.selectedDates[1]);
                            break;
                    }
                    f.pickingRange = false;
                }
                f.prevDate = (f.drawDate ? F.newDate(f.drawDate) : null);
                f.drawDate = this._checkMinMax(F.newDate(f.selectedDates[0] || f.get('defaultDate') || F.today()), f);
                if (!e) {
                    this._update(a);
                    this._updateInput(a, d);
                }
            }
        },
        isSelectable: function(a, b) {
            var c = this._getInst(a);
            if ($.isEmptyObject(c)) {
                return false;
            }
            b = F.determineDate(b, c.selectedDates[0] || this.today(), null, c.options.dateFormat, c.getConfig());
            return this._isSelectable(a, b, c.options.onDate, c.get('minDate'), c.get('maxDate'));
        },
        _isSelectable: function(a, b, c, d, e) {
            var f = (typeof c === 'boolean' ? {
                selectable: c
            } : (!$.isFunction(c) ? {} : c.apply(a, [b, true])));
            return (f.selectable !== false) && (!d || b.getTime() >= d.getTime()) && (!e || b.getTime() <= e.getTime());
        },
        performAction: function(a, b) {
            var c = this._getInst(a);
            if (!$.isEmptyObject(c) && !this.isDisabled(a)) {
                var d = c.options.commands;
                if (d[b] && d[b].enabled.apply(a, [c])) {
                    d[b].action.apply(a, [c]);
                }
            }
        },
        showMonth: function(a, b, c, d) {
            var e = this._getInst(a);
            if (!$.isEmptyObject(e) && (d != null || (e.drawDate.getFullYear() !== b || e.drawDate.getMonth() + 1 !== c))) {
                e.prevDate = F.newDate(e.drawDate);
                var f = this._checkMinMax((b != null ? F.newDate(b, c, 1) : F.today()), e);
                e.drawDate = F.newDate(f.getFullYear(), f.getMonth() + 1, (d != null ? d : Math.min(e.drawDate.getDate(), F.daysInMonth(f.getFullYear(), f.getMonth() + 1))));
                this._update(a);
            }
        },
        changeMonth: function(a, b) {
            var c = this._getInst(a);
            if (!$.isEmptyObject(c)) {
                var d = F.add(F.newDate(c.drawDate), b, 'm');
                this.showMonth(a, d.getFullYear(), d.getMonth() + 1);
            }
        },
        changeDay: function(a, b) {
            var c = this._getInst(a);
            if (!$.isEmptyObject(c)) {
                var d = F.add(F.newDate(c.drawDate), b, 'd');
                this.showMonth(a, d.getFullYear(), d.getMonth() + 1, d.getDate());
            }
        },
        _checkMinMax: function(a, b) {
            var c = b.get('minDate');
            var d = b.get('maxDate');
            a = (c && a.getTime() < c.getTime() ? F.newDate(c) : a);
            a = (d && a.getTime() > d.getTime() ? F.newDate(d) : a);
            return a;
        },
        retrieveDate: function(a, b) {
            var c = this._getInst(a);
            return ($.isEmptyObject(c) ? null : this._normaliseDate(new Date(parseInt(b.className.replace(/^.*dp(-?\d+).*$/, '$1'), 10))));
        },
        selectDate: function(a, b) {
            var c = this._getInst(a);
            if (!$.isEmptyObject(c) && !this.isDisabled(a)) {
                var d = this.retrieveDate(a, b);
                if (c.options.multiSelect) {
                    var e = false;
                    for (var i = 0; i < c.selectedDates.length; i++) {
                        if (d.getTime() === c.selectedDates[i].getTime()) {
                            c.selectedDates.splice(i, 1);
                            e = true;
                            break;
                        }
                    }
                    if (!e && c.selectedDates.length < c.options.multiSelect) {
                        c.selectedDates.push(d);
                    }
                } else if (c.options.rangeSelect) {
                    if (c.pickingRange) {
                        c.selectedDates[1] = d;
                    } else {
                        c.selectedDates = [d, d];
                    }
                    c.pickingRange = !c.pickingRange;
                } else {
                    c.selectedDates = [d];
                }
                c.prevDate = c.drawDate = F.newDate(d);
                this._updateInput(a);
                if (c.inline || c.pickingRange || c.selectedDates.length < (c.options.multiSelect || (c.options.rangeSelect ? 2 : 1))) {
                    this._update(a);
                } else {
                    this.hide(a);
                }
            }
        },
        _generateContent: function(h, i) {
            var j = i.options.monthsToShow;
            j = ($.isArray(j) ? j : [1, j]);
            i.drawDate = this._checkMinMax(i.drawDate || i.get('defaultDate') || F.today(), i);
            var k = F._applyMonthsOffset(F.newDate(i.drawDate), i);
            var l = '';
            for (var m = 0; m < j[0]; m++) {
                var n = '';
                for (var o = 0; o < j[1]; o++) {
                    n += this._generateMonth(h, i, k.getFullYear(), k.getMonth() + 1, i.options.renderer, (m === 0 && o === 0));
                    F.add(k, 1, 'm');
                }
                l += this._prepare(i.options.renderer.monthRow, i).replace(/\{months\}/, n);
            }
            var p = this._prepare(i.options.renderer.picker, i).replace(/\{months\}/, l).replace(/\{weekHeader\}/g, this._generateDayHeaders(i, i.options.renderer));
            var q = function(a, b, c, d, e) {
                if (p.indexOf('{' + a + ':' + d + '}') === -1) {
                    return;
                }
                var f = i.options.commands[d];
                var g = (i.options.commandsAsDateFormat ? f.date.apply(h, [i]) : null);
                p = p.replace(new RegExp('\\{' + a + ':' + d + '\\}', 'g'), '<' + b + (f.status ? ' title="' + i.options[f.status] + '"' : '') + ' class="' + i.options.renderer.commandClass + ' ' + i.options.renderer.commandClass + '-' + d + ' ' + e + (f.enabled(i) ? '' : ' ' + i.options.renderer.disabledClass) + '">' + (g ? F.formatDate(i.options[f.text], g, i.getConfig()) : i.options[f.text]) + '</' + c + '>');
            };
            for (var r in i.options.commands) {
                q('button', 'button type="button"', 'button', r, i.options.renderer.commandButtonClass);
                q('link', 'a href="javascript:void(0)"', 'a', r, i.options.renderer.commandLinkClass);
            }
            p = $(p);
            if (j[1] > 1) {
                var s = 0;
                $(i.options.renderer.monthSelector, p).each(function() {
                    var a = ++s % j[1];
                    $(this).addClass(a === 1 ? 'first' : (a === 0 ? 'last' : ''));
                });
            }
            var t = this;

            function removeHighlight() {
                (i.inline ? $(this).closest('.' + t._getMarker()) : i.div).find(i.options.renderer.daySelector + ' a').removeClass(i.options.renderer.highlightedClass);
            }
            p.find(i.options.renderer.daySelector + ' a').hover(function() {
                removeHighlight.apply(this);
                $(this).addClass(i.options.renderer.highlightedClass);
            }, removeHighlight).click(function() {
                t.selectDate(h, this);
            }).end().find('select.' + this._monthYearClass + ':not(.' + this._anyYearClass + ')').change(function() {
                var a = $(this).val().split('/');
                t.showMonth(h, parseInt(a[1], 10), parseInt(a[0], 10));
            }).end().find('select.' + this._anyYearClass).click(function() {
                $(this).css('visibility', 'hidden').next('input').css({
                    left: this.offsetLeft,
                    top: this.offsetTop,
                    width: this.offsetWidth,
                    height: this.offsetHeight
                }).show().focus();
            }).end().find('input.' + t._monthYearClass).change(function() {
                try {
                    var a = parseInt($(this).val(), 10);
                    a = (isNaN(a) ? i.drawDate.getFullYear() : a);
                    t.showMonth(h, a, i.drawDate.getMonth() + 1, i.drawDate.getDate());
                } catch (e) {
                    alert(e);
                }
            }).keydown(function(a) {
                if (a.keyCode === 13) {
                    $(a.elem).change();
                } else if (a.keyCode === 27) {
                    $(a.elem).hide().prev('select').css('visibility', 'visible');
                    i.elem.focus();
                }
            });
            var u = {
                elem: i.elem[0]
            };
            p.keydown(u, this._keyDown).keypress(u, this._keyPress).keyup(u, this._keyUp);
            p.find('.' + i.options.renderer.commandClass).click(function() {
                if (!$(this).hasClass(i.options.renderer.disabledClass)) {
                    var a = this.className.replace(new RegExp('^.*' + i.options.renderer.commandClass + '-([^ ]+).*$'), '$1');
                    F.performAction(h, a);
                }
            });
            if (i.options.isRTL) {
                p.addClass(i.options.renderer.rtlClass);
            }
            if (j[0] * j[1] > 1) {
                p.addClass(i.options.renderer.multiClass);
            }
            if (i.options.pickerClass) {
                p.addClass(i.options.pickerClass);
            }
            $('body').append(p);
            var v = 0;
            p.find(i.options.renderer.monthSelector).each(function() {
                v += $(this).outerWidth();
            });
            p.width(v / j[0] + 1);
            if ($.isFunction(i.options.onShow)) {
                i.options.onShow.apply(h, [p, i]);
            }
            return p;
        },
        _generateMonth: function(a, b, c, d, e, f) {
            var g = F.daysInMonth(c, d);
            var h = b.options.monthsToShow;
            h = ($.isArray(h) ? h : [1, h]);
            var j = b.options.fixedWeeks || (h[0] * h[1] > 1);
            var k = b.options.firstDay;
            var l = (F.newDate(c, d, 1).getDay() - k + 7) % 7;
            var m = (j ? 6 : Math.ceil((l + g) / 7));
            var n = b.options.selectOtherMonths && b.options.showOtherMonths;
            var o = (b.pickingRange ? b.selectedDates[0] : b.get('minDate'));
            var p = b.get('maxDate');
            var q = e.week.indexOf('{weekOfYear}') > -1;
            var r = F.today();
            var s = F.newDate(c, d, 1);
            F.add(s, -l - (j && (s.getDay() === k) ? 7 : 0), 'd');
            var t = s.getTime();
            var u = '';
            for (var v = 0; v < m; v++) {
                var w = (!q ? '' : '<span class="dp' + t + '">' + ($.isFunction(b.options.calculateWeek) ? b.options.calculateWeek(s) : 0) + '</span>');
                var x = '';
                for (var y = 0; y < 7; y++) {
                    var z = false;
                    if (b.options.rangeSelect && b.selectedDates.length > 0) {
                        z = (s.getTime() >= b.selectedDates[0] && s.getTime() <= b.selectedDates[1]);
                    } else {
                        for (var i = 0; i < b.selectedDates.length; i++) {
                            if (b.selectedDates[i].getTime() === s.getTime()) {
                                z = true;
                                break;
                            }
                        }
                    }
                    var A = (!$.isFunction(b.options.onDate) ? {} : b.options.onDate.apply(a, [s, s.getMonth() + 1 === d]));
                    var B = (n || s.getMonth() + 1 === d) && this._isSelectable(a, s, A.selectable, o, p);
                    x += this._prepare(e.day, b).replace(/\{day\}/g, (B ? '<a href="javascript:void(0)"' : '<span') + ' class="dp' + t + ' ' + (A.dateClass || '') + (z && (n || s.getMonth() + 1 === d) ? ' ' + e.selectedClass : '') + (B ? ' ' + e.defaultClass : '') + ((s.getDay() || 7) < 6 ? '' : ' ' + e.weekendClass) + (s.getMonth() + 1 === d ? '' : ' ' + e.otherMonthClass) + (s.getTime() === r.getTime() && (s.getMonth() + 1) === d ? ' ' + e.todayClass : '') + (s.getTime() === b.drawDate.getTime() && (s.getMonth() + 1) === d ? ' ' + e.highlightedClass : '') + '"' + (A.title || (b.options.dayStatus && B) ? ' title="' + (A.title || F.formatDate(b.options.dayStatus, s, b.getConfig())) + '"' : '') + '>' + (b.options.showOtherMonths || (s.getMonth() + 1) === d ? A.content || s.getDate() : '&#160;') + (B ? '</a>' : '</span>'));
                    F.add(s, 1, 'd');
                    t = s.getTime();
                }
                u += this._prepare(e.week, b).replace(/\{days\}/g, x).replace(/\{weekOfYear\}/g, w);
            }
            var C = this._prepare(e.month, b).match(/\{monthHeader(:[^\}]+)?\}/);
            C = (C[0].length <= 13 ? 'MM yyyy' : C[0].substring(13, C[0].length - 1));
            C = (f ? this._generateMonthSelection(b, c, d, o, p, C, e) : F.formatDate(C, F.newDate(c, d, 1), b.getConfig()));
            var D = this._prepare(e.weekHeader, b).replace(/\{days\}/g, this._generateDayHeaders(b, e));
            return this._prepare(e.month, b).replace(/\{monthHeader(:[^\}]+)?\}/g, C).replace(/\{weekHeader\}/g, D).replace(/\{weeks\}/g, u);
        },
        _generateDayHeaders: function(a, b) {
            var c = '';
            for (var d = 0; d < 7; d++) {
                var e = (d + a.options.firstDay) % 7;
                c += this._prepare(b.dayHeader, a).replace(/\{day\}/g, '<span class="' + this._curDoWClass + e + '" title="' + a.options.dayNames[e] + '">' + a.options.dayNamesMin[e] + '</span>');
            }
            return c;
        },
        _generateMonthSelection: function(b, c, d, e, f, g) {
            if (!b.options.changeMonth) {
                return F.formatDate(g, F.newDate(c, d, 1), b.getConfig());
            }
            var h = b.options['monthNames' + (g.match(/mm/i) ? '' : 'Short')];
            var i = g.replace(/m+/i, '\\x2E').replace(/y+/i, '\\x2F');
            var j = '<select class="' + this._monthYearClass + '" title="' + b.options.monthStatus + '">';
            for (var m = 1; m <= 12; m++) {
                if ((!e || F.newDate(c, m, F.daysInMonth(c, m)).getTime() >= e.getTime()) && (!f || F.newDate(c, m, 1).getTime() <= f.getTime())) {
                    j += '<option value="' + m + '/' + c + '"' + (d === m ? ' selected="selected"' : '') + '>' + h[m - 1] + '</option>';
                }
            }
            j += '</select>';
            i = i.replace(/\\x2E/, j);
            var k = b.options.yearRange;
            if (k === 'any') {
                j = '<select class="' + this._monthYearClass + ' ' + this._anyYearClass + '" title="' + b.options.yearStatus + '">' + '<option>' + c + '</option></select>' + '<input class="' + this._monthYearClass + ' ' + this._curMonthClass + d + '" value="' + c + '">';
            } else {
                k = k.split(':');
                var l = F.today().getFullYear();
                var n = (k[0].match('c[+-].*') ? c + parseInt(k[0].substring(1), 10) : ((k[0].match('[+-].*') ? l : 0) + parseInt(k[0], 10)));
                var o = (k[1].match('c[+-].*') ? c + parseInt(k[1].substring(1), 10) : ((k[1].match('[+-].*') ? l : 0) + parseInt(k[1], 10)));
                j = '<select class="' + this._monthYearClass + '" title="' + b.options.yearStatus + '">';
                n = F.add(F.newDate(n + 1, 1, 1), -1, 'd');
                o = F.newDate(o, 1, 1);
                var p = function(y, a) {
                    if (y !== 0) {
                        j += '<option value="' + d + '/' + y + '"' + (c === y ? ' selected="selected"' : '') + '>' + (a || y) + '</option>';
                    }
                };
                if (n.getTime() < o.getTime()) {
                    n = (e && e.getTime() > n.getTime() ? e : n).getFullYear();
                    o = (f && f.getTime() < o.getTime() ? f : o).getFullYear();
                    var q = Math.floor((o - n) / 2);
                    if (!e || e.getFullYear() < n) {
                        p(n - q, b.options.earlierText);
                    }
                    for (var y = n; y <= o; y++) {
                        p(y);
                    }
                    if (!f || f.getFullYear() > o) {
                        p(o + q, b.options.laterText);
                    }
                } else {
                    n = (f && f.getTime() < n.getTime() ? f : n).getFullYear();
                    o = (e && e.getTime() > o.getTime() ? e : o).getFullYear();
                    var q = Math.floor((n - o) / 2);
                    if (!f || f.getFullYear() > n) {
                        p(n + q, b.options.earlierText);
                    }
                    for (var y = n; y >= o; y--) {
                        p(y);
                    }
                    if (!e || e.getFullYear() < o) {
                        p(o - q, b.options.laterText);
                    }
                }
                j += '</select>';
            }
            i = i.replace(/\\x2F/, j);
            return i;
        },
        _prepare: function(e, f) {
            var g = function(a, b) {
                while (true) {
                    var c = e.indexOf('{' + a + ':start}');
                    if (c === -1) {
                        return;
                    }
                    var d = e.substring(c).indexOf('{' + a + ':end}');
                    if (d > -1) {
                        e = e.substring(0, c) + (b ? e.substr(c + a.length + 8, d - a.length - 8) : '') + e.substring(c + d + a.length + 6);
                    }
                }
            };
            g('inline', f.inline);
            g('popup', !f.inline);
            var h = /\{l10n:([^\}]+)\}/;
            var i = null;
            while (i = h.exec(e)) {
                e = e.replace(i[0], f.options[i[1]]);
            }
            return e;
        }
    });
    var F = $.datepick;
    $(function() {
        $(document).on('mousedown.' + E, F._checkExternalClick).on('resize.' + E, function() {
            F.hide(F.curInst)
        })
    })
})(jQuery);