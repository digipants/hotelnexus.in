! function(t) {
    t(function() {
        MPHB.DateRules = can.Construct.extend({}, {
            dates: {},
            init: function(t) {
                this.dates = t
            },
            canCheckIn: function(t) {
                var e = this.formatDate(t);
                return !this.dates.hasOwnProperty(e) || !this.dates[e].not_check_in && !this.dates[e].not_stay_in
            },
            canCheckOut: function(t) {
                var e = this.formatDate(t);
                return !this.dates.hasOwnProperty(e) || !this.dates[e].not_check_out
            },
            canStayIn: function(t) {
                var e = this.formatDate(t);
                return !this.dates.hasOwnProperty(e) || !this.dates[e].not_stay_in
            },
            getNearestNotStayInDate: function(e, a) {
                var i = MPHB.Utils.cloneDate(a),
                    n = t.datepick.formatDate("yyyy-mm-dd", e),
                    s = t.datepick.formatDate("yyyy-mm-dd", a);
                return t.each(this.dates, function(e, a) {
                    return !(e > s) && (n > e || (a.not_stay_in ? (i = t.datepick.parseDate("yyyy-mm-dd", e), !1) : void 0))
                }), i
            },
            formatDate: function(e) {
                return t.datepick.formatDate("yyyy-mm-dd", e)
            }
        }), can.Control("MPHB.Datepicker", {}, {
            form: null,
            hiddenElement: null,
            roomTypeId: null,
            init: function(t, e) {
                this.form = e.form, this.roomTypeId = e.hasOwnProperty("roomTypeId") ? e.roomTypeId : 0, this.setupHiddenElement(), this.initDatepick()
            },
            setupHiddenElement: function() {
                var e = this.element.attr("id") + "-hidden";
                if (this.hiddenElement = t("#" + e), this.hiddenElement.val()) {
                    var a = t.datepick.parseDate(MPHB._data.settings.dateTransferFormat, this.hiddenElement.val()),
                        i = t.datepick.formatDate(MPHB._data.settings.dateFormat, a);
                    this.element.val(i)
                } else;
            },
            initDatepick: function() {
                var e = {
                        dateFormat: MPHB._data.settings.dateFormat,
                        altFormat: MPHB._data.settings.dateTransferFormat,
                        altField: this.hiddenElement,
                        minDate: MPHB.HotelDataManager.myThis.today,
                        monthsToShow: MPHB._data.settings.numberOfMonthDatepicker,
                        firstDay: MPHB._data.settings.firstDay,
                        pickerClass: MPHB._data.settings.datepickerClass
                    },
                    a = t.extend(e, this.getDatepickSettings());
                this.element.datepick(a)
            },
            getDatepickSettings: function() {
                return {}
            },
            getDate: function() {
                var e = this.element.val(),
                    a = null;
                try {
                    a = t.datepick.parseDate(MPHB._data.settings.dateFormat, e)
                } catch (t) {
                    a = null
                }
                return a
            },
            getFormattedDate: function(e) {
                void 0 === e && (e = MPHB._data.settings.dateFormat);
                var a = this.getDate();
                return a ? t.datepick.formatDate(e, a) : ""
            },
            setDate: function(t) {
                this.element.datepick("setDate", t)
            },
            getOption: function(t) {
                return this.element.datepick("option", t)
            },
            setOption: function(t, e) {
                this.element.datepick("option", t, e)
            },
            getMinDate: function() {
                var t = this.getOption("minDate");
                return null !== t && "" !== t ? MPHB.Utils.cloneDate(t) : null
            },
            getMaxDate: function() {
                var t = this.getOption("maxDate");
                return null !== t && "" !== t ? MPHB.Utils.cloneDate(t) : null
            },
            clear: function() {
                this.element.datepick("clear")
            },
            formatDate: function(e, a) {
                return a = void 0 !== a ? a : "yyyy-mm-dd", t.datepick.formatDate(a, e)
            },
            refresh: function() {
                t.datepick._update(this.element[0], !0), t.datepick._updateInput(this.element[0], !1)
            }
        }), MPHB.FlexsliderGallery = can.Control.extend({}, {
            sliderEl: null,
            navSliderEl: null,
            groupId: null,
            init: function(e, a) {
                this.sliderEl = e, this.groupId = e.data("group");
                var i = t('.mphb-gallery-thumbnail-slider[data-group="' + this.groupId + '"]');
                i.length && (this.navSliderEl = i);
                var n = this;
                t(window).on("load", function() {
                    n.initSliders()
                })
            },
            initSliders: function() {
                var t = this.sliderEl.data("flexslider-atts");
                if (this.navSliderEl) {
                    var e = this.navSliderEl.data("flexslider-atts");
                    e.asNavFor = '.mphb-flexslider-gallery-wrapper[data-group="' + this.groupId + '"]', e.itemWidth = this.navSliderEl.find("ul > li img").width(), t.sync = '.mphb-gallery-thumbnail-slider[data-group="' + this.groupId + '"]', this.navSliderEl.addClass("flexslider mphb-flexslider mphb-gallery-thumbnails-slider").flexslider(e)
                }
                this.sliderEl.addClass("flexslider mphb-flexslider mphb-gallery-slider").flexslider(t)
            }
        }), MPHB.format_price = function(e, a) {
            a = a || {};
            var i = MPHB._data.settings.currency;
            a = t.extend({
                trim_zeros: !1
            }, i, a), e = MPHB.number_format(e, a.decimals, a.decimal_separator, a.thousand_separator);
            var n = a.price_format.replace("%s", e);
            if (a.trim_zeros) {
                var s = new RegExp("\\" + a.decimal_separator + "0+$|(\\" + a.decimal_separator + "\\d*[1-9])0+$");
                n = n.replace(s, "$1")
            }
            return '<span class="mphb-price">' + n + "</span>"
        }, MPHB.number_format = function(t, e, a, i) {
            var n, s, o, r, l, c = "";
            return e = e || 0, a = a || ".", i = i || ",", t < 0 && (c = "-", t *= -1), n = parseInt(t = (+t || 0).toFixed(e)) + "", (s = n.length) > 3 ? s %= 3 : s = 0, l = s ? n.substr(0, s) + i : "", o = n.substr(s).replace(/(\d{3})(?=\d)/g, "$1" + i), r = e ? a + Math.abs(t - n).toFixed(e).replace(/-/, 0).slice(2) : "", c + l + o + r
        }, can.Construct("MPHB.Season", {}, {
            startDate: null,
            endDate: null,
            allowedDays: [],
            init: function(e) {
                var a = MPHB._data.settings.dateTransferFormat;
                this.startDate = t.datepick.parseDate(a, e.start_date), this.endDate = t.datepick.parseDate(a, e.end_date), this.allowedDays = e.allowed_days
            },
            isContainDate: function(t) {
                return t >= this.startDate && t <= this.endDate && MPHB.Utils.inArray(t.getDay(), this.allowedDays)
            }
        }), MPHB.ReservationRulesChecker = can.Construct.extend({
            myThis: null
        }, {
            rules: {
                checkInDays: {},
                checkOutDays: {},
                minStay: {},
                maxStay: {}
            },
            init: function(e) {
                this.rules.checkInDays = t.map(e.check_in_days, function(t) {
                    return new MPHB.Rules.CheckInDayRule(t)
                }), this.rules.checkOutDays = t.map(e.check_out_days, function(t) {
                    return new MPHB.Rules.CheckOutDayRule(t)
                }), this.rules.minStay = t.map(e.min_stay_length, function(t) {
                    return new MPHB.Rules.MinDaysRule(t)
                }), this.rules.maxStay = t.map(e.max_stay_length, function(t) {
                    return new MPHB.Rules.MaxDaysRule(t)
                })
            },
            getActualRule: function(e, a, i) {
                var n = null;
                return t.each(this.rules[e], function(t, e) {
                    if (e.isActualRule(a, i)) return n = e, !1
                }), n
            },
            getActualCombinedRule: function(e, a) {
                var i = [],
                    n = [];
                return t.each(this.rules[e], function(t, e) {
                    var s = MPHB.Utils.arrayDiff(e.roomTypeIds, i);
                    if (s.length && e.isActualForDate(a)) return n.push(e), i = i.concat(s), !e.isAllRoomTypeRule() && (!!MPHB.Utils.arrayDiff(MPHB._data.allRoomTypeIds, i).length && void 0)
                }), this.combineRules(e, n)
            },
            combineRules: function(e, a) {
                var i;
                switch (e) {
                    case "checkInDays":
                        var n = [];
                        t.each(a, function(t, e) {
                            n = n.concat(e.days)
                        }), n = MPHB.Utils.arrayUnique(n), i = new MPHB.Rules.CheckInDayRule({
                            season_ids: [0],
                            room_type_ids: [0],
                            check_in_days: n
                        });
                        break;
                    case "checkOutDays":
                        var n = [];
                        t.each(a, function(t, e) {
                            n = n.concat(e.days)
                        }), n = MPHB.Utils.arrayUnique(n), i = new MPHB.Rules.CheckOutDayRule({
                            season_ids: [0],
                            room_type_ids: [0],
                            check_out_days: n
                        });
                        break;
                    case "minStay":
                        var s = MPHB.Utils.arrayMin(t.map(a, function(t) {
                            return t.min
                        }));
                        i = new MPHB.Rules.MinDaysRule({
                            season_ids: [0],
                            room_type_ids: [0],
                            min_stay_length: s
                        });
                        break;
                    case "maxStay":
                        var s = MPHB.Utils.arrayMax(t.map(a, function(t) {
                            return t.max
                        }));
                        i = new MPHB.Rules.MaxDaysRule({
                            season_ids: [0],
                            room_type_ids: [0],
                            max_stay_length: s
                        })
                }
                return i
            },
            isCheckInSatisfy: function(t, e) {
                return e ? this.getActualRule("checkInDays", t, e).verify(t) : this.getActualCombinedRule("checkInDays", t).verify(t)
            },
            isCheckOutSatisfy: function(t, e, a) {
                return a ? this.getActualRule("checkOutDays", t, a).verify(t, e) : this.getActualCombinedRule("checkOutDays", t).verify(t, e)
            },
            getMinStay: function(t, e) {
                return e ? this.getActualRule("minStay", t, e).min : this.getActualCombinedRule("minStay", t).min
            },
            getMaxStay: function(t, e) {
                return e ? this.getActualRule("maxStay", t, e).max : this.getActualCombinedRule("maxStay", t).max
            },
            getMinCheckOutDate: function(e, a) {
                var i = this.getMinStay(e, a);
                return t.datepick.add(MPHB.Utils.cloneDate(e), i, "d")
            },
            getMaxCheckOutDate: function(e, a) {
                var i = this.getMaxStay(e, a);
                return t.datepick.add(MPHB.Utils.cloneDate(e), i, "d")
            }
        }), MPHB.Rules = {}, MPHB.Rules.BasicRule = can.Construct.extend({}, {
            seasonIds: [],
            roomTypeIds: [],
            init: function(t) {
                this.seasonIds = t.season_ids, this.roomTypeIds = t.room_type_ids
            },
            isActualRule: function(t, e) {
                return this.isActualForRoomType(e) && this.isActualForDate(t)
            },
            isActualForRoomType: function(t) {
                return MPHB.Utils.inArray(t, this.roomTypeIds) || MPHB.Utils.inArray(0, this.roomTypeIds)
            },
            isActualForDate: function(e) {
                if (this.isAllSeasonRule()) return !0;
                var a = !1;
                return t.each(this.seasonIds, function(t, i) {
                    if (MPHB.HotelDataManager.myThis.seasons[i] && MPHB.HotelDataManager.myThis.seasons[i].isContainDate(e)) return a = !0, !1
                }), a
            },
            verify: function(t, e) {
                return !0
            },
            isAllSeasonRule: function() {
                return MPHB.Utils.inArray(0, this.seasonIds)
            },
            isAllRoomTypeRule: function() {
                return MPHB.Utils.inArray(0, this.roomTypeIds)
            },
            isGlobalRule: function() {
                return this.isAllSeasonRule() && this.isAllRoomTypeRule()
            }
        }), MPHB.Rules.BasicRule("MPHB.Rules.CheckInDayRule", {}, {
            days: [],
            init: function(t) {
                this._super(t), this.days = t.check_in_days
            },
            verify: function(t, e) {
                return MPHB.Utils.inArray(t.getDay(), this.days)
            }
        }), MPHB.Rules.BasicRule("MPHB.Rules.CheckOutDayRule", {}, {
            days: [],
            init: function(t) {
                this._super(t), this.days = t.check_out_days
            },
            verify: function(t, e) {
                return MPHB.Utils.inArray(e.getDay(), this.days)
            }
        }), MPHB.Rules.BasicRule("MPHB.Rules.MinDaysRule", {}, {
            min: null,
            init: function(t) {
                this._super(t), this.min = t.min_stay_length
            },
            verify: function(e, a) {
                var i = t.datepick.add(MPHB.Utils.cloneDate(e), this.min, "d");
                return MPHB.Utils.formatDateToCompare(a) >= MPHB.Utils.formatDateToCompare(i)
            }
        }), MPHB.Rules.BasicRule("MPHB.Rules.MaxDaysRule", {}, {
            max: null,
            init: function(t) {
                this._super(t), this.max = 0 != t.max_stay_length ? t.max_stay_length : 3652
            },
            verify: function(e, a) {
                var i = t.datepick.add(MPHB.Utils.cloneDate(e), this.max, "d");
                return MPHB.Utils.formatDateToCompare(a) <= MPHB.Utils.formatDateToCompare(i)
            }
        }), can.Construct("MPHB.HotelDataManager", {
            myThis: null,
            ROOM_STATUS_AVAILABLE: "available",
            ROOM_STATUS_NOT_AVAILABLE: "not-available",
            ROOM_STATUS_BOOKED: "booked",
            ROOM_STATUS_PAST: "past"
        }, {
            today: null,
            roomTypesData: {},
            translationIds: {},
            dateRules: null,
            typeRules: {},
            seasons: {},
            init: function(e) {
                MPHB.HotelDataManager.myThis = this, this.setToday(t.datepick.parseDate(MPHB._data.settings.dateTransferFormat, e.today)), this.initSeasons(e.seasons), this.initRoomTypesData(e.roomTypesData, e.rules), this.initRules(e.rules)
            },
            initRoomTypesData: function(e, a) {
                var i = this;
                t.each(e, function(e, n) {
                    e = parseInt(e);
                    var s = parseInt(n.originalId);
                    s != e && (i.translationIds.hasOwnProperty(s) || (i.translationIds[s] = []), i.translationIds[s].push(e));
                    var o = new MPHB.RoomTypeData(e, n);
                    t.each(a.dates, function(t, e) {
                        e.not_stay_in && o.blockAllRoomsOnDate(t)
                    }), a.blockedTypes.hasOwnProperty(s) && t.each(a.blockedTypes[s], function(t, e) {
                        e.not_stay_in && o.blockAllRoomsOnDate(t)
                    }), i.roomTypesData[e] = o
                })
            },
            initRules: function(e) {
                this.dateRules = new MPHB.DateRules(e.dates);
                var a = this;
                t.each(e.blockedTypes, function(e, i) {
                    a.typeRules[e] = new MPHB.DateRules(i), a.translationIds.hasOwnProperty(e) && t.each(a.translationIds[e], function(t, e) {
                        a.typeRules[e] = new MPHB.DateRules(i)
                    })
                }), this.reservationRules = new MPHB.ReservationRulesChecker(e.reservationRules)
            },
            initSeasons: function(e) {
                t.each(e, this.proxy(function(t, e) {
                    this.seasons[t] = new MPHB.Season(e)
                }))
            },
            setToday: function(t) {
                this.today = t
            },
            getRoomTypeData: function(t) {
                return !!this.roomTypesData.hasOwnProperty(t) && this.roomTypesData[t]
            },
            fillDateCellData: function(t, e, a, i) {
                i || (i = e);
                var n = [],
                    s = [],
                    o = t.roomTypeId;
                return this.notStayIn(e, o) && (n.push(MPHB._data.translations.notStayIn), s.push("mphb-not-stay-in-date")), "checkIn" == a && this.notCheckIn(e, o, i) && (n.push(MPHB._data.translations.notCheckIn), s.push("mphb-not-check-in-date")), "checkOut" == a && this.notCheckOut(e, o, i) && (n.push(MPHB._data.translations.notCheckOut), s.push("mphb-not-check-out-date")), n.length && (t.title += " " + MPHB._data.translations.rules + " " + n.join(", ")), s.length && (t.dateClass += (t.dateClass.length ? " " : "") + s.join(" ")), t
            },
            notStayIn: function(t, e) {
                var a = this.dateRules.canStayIn(t);
                return this.typeRules[e] && (a = a && this.typeRules[e].canStayIn(t)), !a
            },
            notCheckIn: function(t, e, a) {
                a || (a = t);
                var i = this.dateRules.canCheckIn(t);
                return i = i && this.reservationRules.isCheckInSatisfy(t, e), this.typeRules[e] && (i = i && this.typeRules[e].canCheckIn(t)), !i
            },
            notCheckOut: function(t, e, a) {
                var i = this.dateRules.canCheckOut(t);
                return i = i && this.reservationRules.isCheckOutSatisfy(a, t, e), this.typeRules[e] && (i = i && this.typeRules[e].canCheckOut(t)), !i
            }
        }), MPHB.TermsSwitcher = can.Construct.extend({}, {
            init: function(t, e) {
                var a = t.children(".mphb-terms-and-conditions");
                t.find(".mphb-terms-and-conditions-link").on("click", function(t) {
                    t.preventDefault(), a.toggleClass("mphb-active")
                })
            }
        }), MPHB.Utils = can.Construct.extend({
            formatDateToCompare: function(e) {
                return t.datepick.formatDate("yyyymmdd", e)
            },
            cloneDate: function(t) {
                return new Date(t.getTime())
            },
            arrayUnique: function(t) {
                return t.filter(function(t, e, a) {
                    return a.indexOf(t) === e
                })
            },
            arrayMin: function(t) {
                return Math.min.apply(null, t)
            },
            arrayMax: function(t) {
                return Math.max.apply(null, t)
            },
            arrayDiff: function(t, e) {
                return t.filter(function(t) {
                    return e.indexOf(t) < 0
                })
            },
            inArray: function(t, e) {
                return -1 !== e.indexOf(t)
            }
        }, {}), MPHB.Gateway = can.Construct.extend({}, {
            amount: 0,
            paymentDescription: "",
            init: function(t) {
                this.billingSection = t.billingSection, this.initSettings(t.settings)
            },
            initSettings: function(t) {
                this.amount = t.amount, this.paymentDescription = t.paymentDescription
            },
            canSubmit: function() {
                return !0
            },
            updateData: function(t) {
                this.amount = t.amount, this.paymentDescription = t.paymentDescription
            },
            afterSelection: function(t) {},
            cancelSelection: function() {}
        }), MPHB.BeanstreamGateway = MPHB.Gateway.extend({}, {
            scriptUrl: "",
            isCanSubmit: !1,
            loadHandler: null,
            validityHandler: null,
            tokenRequestHandler: null,
            tokenUpdatedHandler: null,
            initSettings: function(t) {
                this._super(t), this.scriptUrl = t.scriptUrl || "https://payform.beanstream.com/v1.1.0/payfields/beanstream_payfields.js", this.validityHandler = this.validityChanged.bind(this), this.tokenRequestHandler = this.tokenRequested.bind(this), this.tokenUpdatedHandler = this.tokenUpdated.bind(this)
            },
            canSubmit: function() {
                return this.isCanSubmit
            },
            afterSelection: function(e) {
                if (this._super(e), e.length > 0) {
                    var a = document.createElement("script");
                    a.id = "payfields-script", a.src = this.scriptUrl, a.dataset.submitform = "true", a.dataset.async = "true", null != this.loadHandler && t(document).off("beanstream_payfields_loaded", this.loadHandler), this.loadHandler = function(a) {
                        t("[data-beanstream-id]").appendTo(e)
                    }, t(document).on("beanstream_payfields_loaded", this.loadHandler), e.append(a), e.removeClass("mphb-billing-fields-hidden")
                }
                t(document).on("beanstream_payfields_inputValidityChanged", this.validityHandler).on("beanstream_payfields_tokenRequested", this.tokenRequestHandler).on("beanstream_payfields_tokenUpdated", this.tokenUpdatedHandler)
            },
            cancelSelection: function() {
                t(document).off("beanstream_payfields_inputValidityChanged", this.validityHandler).off("beanstream_payfields_tokenRequested", this.tokenRequestHandler).off("beanstream_payfields_tokenUpdated", this.tokenUpdatedHandler)
            },
            validityChanged: function(t) {
                (t.eventDetail || t.originalEvent.eventDetail).isValid || (this.isCanSubmit = !1)
            },
            tokenRequested: function(t) {
                this.billingSection.showPreloader()
            },
            tokenUpdated: function(t) {
                var e = t.eventDetail || t.originalEvent.eventDetail;
                e.success ? this.isCanSubmit = !0 : (this.isCanSubmit = !1, this.billingSection.showError(MPHB._data.translations.tokenizationFailure.replace("(%s)", e.message))), this.billingSection.hidePreloader()
            }
        }), MPHB.StripeGateway = MPHB.Gateway.extend({}, {
            publicKey: "",
            imageUrl: "",
            locale: "",
            allowRememberMe: !1,
            needBillingAddress: !1,
            useBitcoin: !1,
            panelLabel: "",
            handler: null,
            init: function(t) {
                this._super(t), this.initHandler()
            },
            initSettings: function(t) {
                this._super(t), this.publicKey = t.publicKey, this.imageUrl = t.checkoutImageUrl, this.allowRememberMe = t.allowRememberMe, this.needBillingAddress = t.needBillingAddress, this.useBitcoin = t.useBitcoin, this.locale = t.locale
            },
            initHandler: function() {
                var t = this,
                    e = {
                        key: this.publicKey,
                        image: this.imageUrl,
                        locale: this.locale,
                        name: MPHB._data.settings.siteName,
                        bitcoin: this.useBitcoin,
                        currency: MPHB._data.settings.currency.code.toLowerCase(),
                        billingAddress: this.needBillingAddress,
                        allowRememberMe: this.allowRememberMe
                    };
                t.panelLabel && (e.panelLabel = t.panelLabel), this.handler = StripeCheckout.configure(e), window.addEventListener("popstate", function() {
                    t.handler.close()
                })
            },
            openModal: function() {
                var t = this;
                this.handler.open({
                    amount: t.amount,
                    description: t.paymentDescription,
                    token: function(e, a) {
                        t.storeToken(e), t.needBillingAddress && t.storeBillingData(a), t.storeEmail(e.email), t.billingSection.parentForm.element.submit(), t.billingSection.showPreloader()
                    }
                })
            },
            canSubmit: function() {
                if (this.isTokenStored()) return !0;
                try {
                    this.openModal()
                } catch (t) {
                    console.log("error:", t)
                }
                return !1
            },
            storeToken: function(t) {
                this.billingSection.billingFieldsWrapperEl.find('[name="mphb_stripe_token"]').val(t.id)
            },
            isTokenStored: function() {
                var t = this.billingSection.billingFieldsWrapperEl.find('[name="mphb_stripe_token"]');
                return t.length && "" !== t.val()
            },
            storeEmail: function(t) {
                this.billingSection.billingFieldsWrapperEl.find('[name="mphb_stripe_email"]').val(t)
            },
            storeBillingData: function(e) {
                var a = this,
                    i = ["billing_address_city", "billing_address_country", "billing_address_country_code", "billing_address_line1", "billing_address_line2", "billing_address_state", "billing_address_zip", "billing_name"];
                t.each(i, function(t, i) {
                    if (e.hasOwnProperty(i)) {
                        var n = a.billingSection.billingFieldsWrapperEl.find('[name="mphb_stripe_' + i + '"]');
                        n.length && n.val(e[i])
                    }
                })
            }
        }), MPHB.BillingSection = can.Control.extend({}, {
            updateBillingFieldsTimeout: null,
            parentForm: null,
            billingFieldsWrapperEl: null,
            gateways: {},
            lastGatewayId: null,
            init: function(t, e) {
                this.parentForm = e.form, this.billingFieldsWrapperEl = this.element.find(".mphb-billing-fields"), this.initGateways(e.gateways)
            },
            initGateways: function(e) {
                var a = this;
                t.each(e, function(t, e) {
                    var i = null;
                    switch (t) {
                        case "stripe":
                            i = new MPHB.StripeGateway({
                                billingSection: a,
                                settings: MPHB._data.gateways[t]
                            });
                            break;
                        case "braintree":
                            i = new MPHB.BraintreeGateway({
                                billingSection: a,
                                settings: MPHB._data.gateways[t]
                            });
                            break;
                        case "beanstream":
                            i = new MPHB.BeanstreamGateway({
                                billingSection: a,
                                settings: MPHB._data.gateways[t]
                            });
                            break;
                        default:
                            i = new MPHB.Gateway({
                                billingSection: a,
                                settings: MPHB._data.gateways[t]
                            })
                    }
                    void 0 !== i && (a.gateways[t] = i)
                }), this.notifySelectedGateway()
            },
            '[name="mphb_gateway_id"] change': function(e, a) {
                var i = this,
                    n = e.val();
                this.showPreloader(), this.billingFieldsWrapperEl.empty().addClass("mphb-billing-fields-hidden"), clearTimeout(this.updateBillingFieldsTimeout), this.updateBillingFieldsTimeout = setTimeout(function() {
                    var e = i.parentForm.parseFormToJSON();
                    t.ajax({
                        url: MPHB._data.ajaxUrl,
                        type: "GET",
                        dataType: "json",
                        data: {
                            action: "mphb_get_billing_fields",
                            mphb_nonce: MPHB._data.nonces.mphb_get_billing_fields,
                            mphb_gateway_id: n,
                            formValues: e
                        },
                        success: function(t) {
                            t.hasOwnProperty("success") ? t.success ? (i.lastGatewayId && i.gateways[i.lastGatewayId].cancelSelection(), i.billingFieldsWrapperEl.html(t.data.fields), t.data.hasVisibleFields ? i.billingFieldsWrapperEl.removeClass("mphb-billing-fields-hidden") : i.billingFieldsWrapperEl.addClass("mphb-billing-fields-hidden"), i.notifySelectedGateway(n)) : i.showError(t.data.message) : i.showError(MPHB._data.translations.errorHasOccured)
                        },
                        error: function(t) {
                            i.showError(MPHB._data.translations.errorHasOccured)
                        },
                        complete: function(t) {
                            i.hidePreloader()
                        }
                    })
                }, 500)
            },
            hideErrors: function() {
                this.parentForm.hideErrors()
            },
            showError: function(t) {
                this.parentForm.showError(t)
            },
            showPreloader: function() {
                this.parentForm.showPreloader()
            },
            hidePreloader: function() {
                this.parentForm.hidePreloader()
            },
            canSubmit: function() {
                var t = this.getSelectedGateway();
                return !this.gateways.hasOwnProperty(t) || this.gateways[t].canSubmit()
            },
            getSelectedGateway: function() {
                var t = this.element.find('[name="mphb_gateway_id"]');
                return (1 === t.length ? t : t.filter(":checked")).val()
            },
            notifySelectedGateway: function(t) {
                t = t || this.getSelectedGateway(), t && this.gateways[t].afterSelection(this.billingFieldsWrapperEl), this.lastGatewayId = t
            },
            updateGatewaysData: function(e) {
                var a = this;
                t.each(e, function(t, e) {
                    a.gateways.hasOwnProperty(t) && a.gateways[t].updateData(e)
                })
            }
        }), MPHB.BraintreeGateway = MPHB.Gateway.extend({}, {
            clientToken: "",
            checkout: null,
            initSettings: function(t) {
                this._super(t), this.clientToken = t.clientToken
            },
            canSubmit: function() {
                return this.isNonceStored()
            },
            storeNonce: function(t) {
                this.billingSection.billingFieldsWrapperEl.find('[name="mphb_braintree_payment_nonce"]').val(t)
            },
            isNonceStored: function() {
                var t = this.billingSection.billingFieldsWrapperEl.find('[name="mphb_braintree_payment_nonce"]');
                return t.length && "" != t.val()
            },
            afterSelection: function(t) {
                if (this._super(t), void 0 != braintree) {
                    var e = "mphb-braintree-container-" + this.clientToken.substr(0, 8);
                    t.append('<div id="' + e + '"></div>');
                    var a = this;
                    braintree.setup(this.clientToken, "dropin", {
                        container: e,
                        onReady: function(t) {
                            a.checkout = t
                        },
                        onPaymentMethodReceived: function(t) {
                            a.storeNonce(t.nonce), a.billingSection.parentForm.element.submit(), a.billingSection.showPreloader()
                        }
                    }), t.removeClass("mphb-billing-fields-hidden")
                }
            },
            cancelSelection: function() {
                if (this._super(), null != this.checkout) {
                    var t = this;
                    this.checkout.teardown(function() {
                        t.checkout = null
                    })
                }
            }
        }), MPHB.CouponSection = can.Control.extend({}, {
            applyCouponTimeout: null,
            parentForm: null,
            appliedCouponEl: null,
            couponEl: null,
            messageHolderEl: null,
            init: function(t, e) {
                this.parentForm = e.form, this.couponEl = t.find('[name="mphb_coupon_code"]'), this.appliedCouponEl = t.find('[name="mphb_applied_coupon_code"]'), this.messageHolderEl = t.find(".mphb-coupon-message")
            },
            ".mphb-apply-coupon-code-button click": function(e, a) {
                a.preventDefault(), a.stopPropagation(), this.clearMessage();
                var i = this.couponEl.val();
                if (!i.length) return void this.showMessage(MPHB._data.translations.emptyCouponCode);
                this.appliedCouponEl.val("");
                var n = this;
                this.showPreloader(), clearTimeout(this.applyCouponTimeout), this.applyCouponTimeout = setTimeout(function() {
                    var e = n.parentForm.parseFormToJSON();
                    t.ajax({
                        url: MPHB._data.ajaxUrl,
                        type: "POST",
                        dataType: "json",
                        data: {
                            action: "mphb_apply_coupon",
                            mphb_nonce: MPHB._data.nonces.mphb_apply_coupon,
                            mphb_coupon_code: i,
                            formValues: e
                        },
                        success: function(t) {
                            t.hasOwnProperty("success") ? t.success ? (n.parentForm.setCheckoutData(t.data), n.couponEl.val(""), n.appliedCouponEl.val(t.data.coupon.applied_code), n.showMessage(t.data.coupon.message)) : n.showMessage(t.data.message) : n.showMessage(MPHB._data.translations.errorHasOccured)
                        },
                        error: function(t) {
                            n.showMessage(MPHB._data.translations.errorHasOccured)
                        },
                        complete: function(t) {
                            n.hidePreloader()
                        }
                    })
                }, 500)
            },
            removeCoupon: function() {
                this.appliedCouponEl.val(""), this.clearMessage()
            },
            showPreloader: function() {
                this.parentForm.showPreloader()
            },
            hidePreloader: function() {
                this.parentForm.hidePreloader()
            },
            clearMessage: function() {
                this.messageHolderEl.html("").addClass("mphb-hide")
            },
            showMessage: function(t) {
                this.messageHolderEl.html(t).removeClass("mphb-hide")
            }
        }), MPHB.CheckoutForm = can.Control.extend({
            myThis: null
        }, {
            priceBreakdownTableEl: null,
            bookBtnEl: null,
            errorsWrapperEl: null,
            preloaderEl: null,
            billingSection: null,
            couponSection: null,
            waitResponse: !1,
            updateInfoTimeout: null,
            updateRatesTimeout: null,
            freeBooking: !1,
            currentInfoAjax: null,
            init: function(t, e) {
                MPHB.CheckoutForm.myThis = this, this.bookBtnEl = this.element.find("input[type=submit]"), this.errorsWrapperEl = this.element.find(".mphb-errors-wrapper"), this.preloaderEl = this.element.find(".mphb-preloader"), this.priceBreakdownTableEl = this.element.find("table.mphb-price-breakdown"), MPHB._data.settings.useBilling && (this.billingSection = new MPHB.BillingSection(this.element.find("#mphb-billing-details"), {
                    form: this,
                    gateways: MPHB._data.gateways
                })), MPHB._data.settings.useCoupons && (this.couponSection = new MPHB.CouponSection(this.element.find("#mphb-coupon-details"), {
                    form: this
                }))
            },
            setTotal: function(t) {
                var e = this.element.find(".mphb-total-price-field");
                e.length && e.html(t)
            },
            setDeposit: function(t) {
                var e = this.element.find(".mphb-deposit-amount-field");
                e.length && e.html(t)
            },
            setupPriceBreakdown: function(t) {
                this.priceBreakdownTableEl.replaceWith(t), this.priceBreakdownTableEl = this.element.find("table.mphb-price-breakdown")
            },
            updateCheckoutInfo: function() {
                var e = this;
                e.hideErrors(), e.showPreloader(), clearTimeout(this.updateInfoTimeout), this.updateInfoTimeout = setTimeout(function() {
                    var a = e.parseFormToJSON();
                    e.currentInfoAjax = t.ajax({
                        url: MPHB._data.ajaxUrl,
                        type: "GET",
                        dataType: "json",
                        data: {
                            action: "mphb_update_checkout_info",
                            mphb_nonce: MPHB._data.nonces.mphb_update_checkout_info,
                            formValues: a
                        },
                        beforeSend: function() {
                            null != e.currentInfoAjax && (e.currentInfoAjax.abort(), e.hideErrors())
                        },
                        success: function(t) {
                            t.hasOwnProperty("success") ? t.success ? e.setCheckoutData(t.data) : e.showError(t.data.message) : e.showError(MPHB._data.translations.errorHasOccured)
                        },
                        error: function(t) {
                            e.showError(MPHB._data.translations.errorHasOccured)
                        },
                        complete: function(t) {
                            e.hidePreloader(), e.currentInfoAjax = null
                        }
                    })
                }, 500)
            },
            setCheckoutData: function(t) {
                this.setTotal(t.total), this.setupPriceBreakdown(t.priceBreakdown), MPHB._data.settings.useBilling && (this.setDeposit(t.deposit), this.billingSection.updateGatewaysData(t.gateways), t.isFree ? this.setFreeMode() : this.unsetFreeMode())
            },
            setFreeMode: function() {
                this.freeBooking = !0, this.billingSection.element.addClass("mphb-hide"), this.element.append(t("<input />", {
                    type: "hidden",
                    name: "mphb_gateway_id",
                    value: "manual",
                    id: "mphb-manual-payment-input"
                }))
            },
            unsetFreeMode: function() {
                this.freeBooking = !1, this.billingSection.element.removeClass("mphb-hide"), this.element.find("#mphb-manual-payment-input").remove()
            },
            updateRatePrices: function(e) {
                if (e && e.length) {
                    var a = parseInt(e.attr("data-index")),
                        i = e.find(".mphb_sc_checkout-rate"),
                        n = t.map(i, function(t) {
                            return parseInt(t.value)
                        });
                    if (!(n.length <= 1)) {
                        var s = this.parseFormToJSON(),
                            o = s.mphb_room_details[a],
                            r = o.adults || "",
                            l = o.children || "";
                        clearTimeout(this.updateRatesTimeout), this.updateRatesTimeout = setTimeout(function() {
                            t.ajax({
                                url: MPHB._data.ajaxUrl,
                                type: "GET",
                                dataType: "json",
                                data: {
                                    action: "mphb_update_rate_prices",
                                    mphb_nonce: MPHB._data.nonces.mphb_update_rate_prices,
                                    rates: n,
                                    adults: r,
                                    children: l,
                                    check_in_date: s.mphb_check_in_date,
                                    check_out_date: s.mphb_check_out_date
                                },
                                success: function(e) {
                                    if (e.hasOwnProperty("success")) {
                                        var a = e.data;
                                        t.each(i, function(e, i) {
                                            var n = i.value;
                                            if (void 0 != a[n]) {
                                                var s = t(i).parent().children("strong");
                                                s.children(".mphb-price").remove(), s.append(a[n])
                                            }
                                        })
                                    }
                                }
                            })
                        }, 500)
                    }
                }
            },
            ".mphb_checkout-guests-chooser change": function(t, e) {
                this.updateRatePrices(t.closest(".mphb-room-details")), this.updateCheckoutInfo()
            },
            ".mphb_checkout-rate change": function(t, e) {
                this.updateCheckoutInfo()
            },
            ".mphb_checkout-service, .mphb_checkout-service-adults change": function(t, e) {
                this.updateCheckoutInfo()
            },
            ".mphb_checkout-service-quantity input": function(t, e) {
                this.updateCheckoutInfo()
            },
            ".mphb-price-breakdown-expand click": function(e, a) {
                a.preventDefault(), t(e).blur();
                var i = t(e).parents("tr.mphb-price-breakdown-group");
                i.find(".mphb-price-breakdown-rate").toggleClass("mphb-hide"), i.nextUntil("tr.mphb-price-breakdown-group").toggleClass("mphb-hide"), t(e).children(".mphb-inner-icon").toggleClass("mphb-hide")
            },
            hideErrors: function() {
                this.errorsWrapperEl.empty().addClass("mphb-hide")
            },
            showError: function(t) {
                this.errorsWrapperEl.html(t).removeClass("mphb-hide")
            },
            showPreloader: function() {
                this.waitResponse = !0, this.bookBtnEl.attr("disabled", "disabled"), this.preloaderEl.removeClass("mphb-hide")
            },
            hidePreloader: function() {
                this.waitResponse = !1, this.bookBtnEl.removeAttr("disabled"), this.preloaderEl.addClass("mphb-hide")
            },
            parseFormToJSON: function() {
                return this.element.serializeJSON()
            },
            submit: function(t, e) {
                return !this.waitResponse && (!(MPHB._data.settings.useBilling && !this.freeBooking && !this.billingSection.canSubmit()) && void 0)
            },
            "#mphb-price-details .mphb-remove-coupon click": function(t, e) {
                e.preventDefault(), e.stopPropagation(), MPHB._data.settings.useCoupons && (this.couponSection.removeCoupon(), this.updateCheckoutInfo())
            }
        }), MPHB.DirectBooking = can.Control.extend({}, {
            reservationForm: null,
            elementsToHide: null,
            quantitySection: null,
            wrapperWithSelect: null,
            wrapperWithoutSelect: null,
            quantitySelect: null,
            availableLabel: null,
            typeId: 0,
            init: function(t, e) {
                this.reservationForm = e.reservationForm, this.elementsToHide = t.find(".mphb-reserve-room-section, .mphb-rooms-quantity-wrapper"), this.quantitySection = t.find(".mphb-reserve-room-section"), this.wrapperWithSelect = this.quantitySection.find(".mphb-rooms-quantity-wrapper").first(), this.wrapperWithoutSelect = this.quantitySection.find(".mphb-rooms-quantity-wrapper").last(), this.quantitySelect = this.quantitySection.find(".mphb-rooms-quantity"), this.availableLabel = this.quantitySection.find(".mphb-available-rooms-count"), this.typeId = t.find('input[name="mphb_room_type_id"]').val(), this.typeId = parseInt(this.typeId)
            },
            hideQuantitySection: function() {
                this.elementsToHide.addClass("mphb-hide")
            },
            showQuantitySection: function() {
                this.quantitySection.removeClass("mphb-hide")
            },
            resetQuantityOptions: function(t) {
                this.quantitySelect.empty();
                for (var e = 1; e <= t; e++) {
                    var a = '<option value="' + e + '">' + e + "</option>";
                    this.quantitySelect.append(a)
                }
                this.quantitySelect.val(1), this.availableLabel.text(t), t > 1 ? this.wrapperWithSelect.removeClass("mphb-hide") : this.wrapperWithoutSelect.removeClass("mphb-hide")
            },
            showError: function(t) {
                this.hideQuantitySection(), this.reservationForm.showError(t)
            },
            "input.mphb-datepick change": function(t, e) {
                this.hideQuantitySection()
            },
            ".mphb-reserve-btn click": function(e, a) {
                a.preventDefault(), a.stopPropagation(), this.reservationForm.clearErrors(), this.reservationForm.setFormWaitingMode();
                var i = this.reservationForm.checkInDatepicker.getDate(),
                    n = this.reservationForm.checkOutDatepicker.getDate();
                if (!i || !n) return i ? this.showError(MPHB._data.translations.checkOutNotValid) : this.showError(MPHB._data.translations.checkInNotValid), void this.reservationForm.setFormNormalMode();
                var s = this;
                t.ajax({
                    url: MPHB._data.ajaxUrl,
                    type: "GET",
                    dataType: "json",
                    data: {
                        action: "mphb_get_free_accommodations_amount",
                        mphb_nonce: MPHB._data.nonces.mphb_get_free_accommodations_amount,
                        typeId: this.typeId,
                        checkInDate: t.datepick.formatDate(MPHB._data.settings.dateTransferFormat, i),
                        checkOutDate: t.datepick.formatDate(MPHB._data.settings.dateTransferFormat, n)
                    },
                    success: function(t) {
                        t.success ? (s.resetQuantityOptions(t.data.freeCount), s.showQuantitySection()) : s.showError(t.data.message)
                    },
                    error: function(t) {
                        s.showError(MPHB._data.translations.errorHasOccured)
                    },
                    complete: function(t) {
                        s.reservationForm.setFormNormalMode()
                    }
                })
            }
        }), MPHB.ReservationForm = can.Control.extend({
            MODE_SUBMIT: "submit",
            MODE_NORMAL: "normal",
            MODE_WAITING: "waiting"
        }, {
            formEl: null,
            checkInDatepicker: null,
            checkOutDatepicker: null,
            reserveBtn: null,
            reserveBtnPreloader: null,
            errorsWrapper: null,
            isDirectBooking: !1,
            directBooking: null,
            mode: null,
            roomTypeId: null,
            searchRoomTypeId: null,
            roomTypeData: null,
            setup: function(t, e) {
                this._super(t, e), this.mode = MPHB.ReservationForm.MODE_NORMAL
            },
            init: function(e, a) {
                this.formEl = e, this.roomTypeId = parseInt(this.formEl.attr("id").replace(/^booking-form-/, "")), this.isDirectBooking = "1" == MPHB._data.settings.isDirectBooking, this.roomTypeData = MPHB.HotelDataManager.myThis.getRoomTypeData(this.roomTypeId), this.originalRoomTypeId = this.roomTypeData.originalId, this.searchRoomTypeId = this.isDirectBooking ? this.originalRoomTypeId : 0, this.errorsWrapper = this.formEl.find(".mphb-errors-wrapper"), this.initCheckInDatepicker(), this.initCheckOutDatepicker(), this.initReserveBtn(), this.isDirectBooking && (this.directBooking = new MPHB.DirectBooking(e, {
                    reservationForm: this
                })), t(window).on("mphb-update-date-room-type-" + this.roomTypeId, this.proxy(function() {
                    this.refreshDatepickers()
                })), this.checkInDatepicker.getDate() && this.updateCheckOutLimitations()
            },
            proceedToCheckout: function() {
                this.mode = MPHB.ReservationForm.MODE_SUBMIT, this.unlock(), this.formEl.submit()
            },
            showError: function(e) {
                this.clearErrors();
                var a = t("<p>", {
                    class: "mphb-error",
                    html: e
                });
                this.errorsWrapper.append(a).removeClass("mphb-hide")
            },
            clearErrors: function() {
                this.errorsWrapper.empty().addClass("mphb-hide")
            },
            lock: function() {
                this.element.find("[name]").attr("disabled", "disabled"), this.reserveBtn.attr("disabled", "disabled").addClass("mphb-disabled"), this.reserveBtnPreloader.removeClass("mphb-hide")
            },
            unlock: function() {
                this.element.find("[name]").removeAttr("disabled"), this.reserveBtn.removeAttr("disabled").removeClass("mphb-disabled"), this.reserveBtnPreloader.addClass("mphb-hide")
            },
            setFormWaitingMode: function() {
                this.mode = MPHB.ReservationForm.MODE_WAITING, this.lock()
            },
            setFormNormalMode: function() {
                this.mode = MPHB.ReservationForm.MODE_NORMAL, this.unlock()
            },
            initCheckInDatepicker: function() {
                var t = this.formEl.find('input[type="text"][id^=mphb_check_in_date]');
                this.checkInDatepicker = new MPHB.RoomTypeCheckInDatepicker(t, {
                    form: this,
                    roomTypeId: this.searchRoomTypeId
                })
            },
            initCheckOutDatepicker: function() {
                var t = this.formEl.find('input[type="text"][id^=mphb_check_out_date]');
                this.checkOutDatepicker = new MPHB.RoomTypeCheckOutDatepicker(t, {
                    form: this,
                    roomTypeId: this.searchRoomTypeId
                })
            },
            initReserveBtn: function() {
                this.reserveBtn = this.formEl.find(".mphb-reserve-btn"),
                    this.reserveBtnPreloader = this.formEl.find(".mphb-preloader"), this.setFormNormalMode()
            },
            updateCheckOutLimitations: function(t) {
                void 0 === t && (t = !0);
                var e = this.retrieveCheckOutLimitations(this.checkInDatepicker.getDate(), this.checkOutDatepicker.getDate());
                this.checkOutDatepicker.setOption("minDate", e.minDate), this.checkOutDatepicker.setOption("maxDate", e.maxDate), this.checkOutDatepicker.setDate(t ? e.date : null)
            },
            retrieveCheckOutLimitations: function(t, e) {
                var a = MPHB.HotelDataManager.myThis.today,
                    i = null,
                    n = null;
                return null !== t && (a = MPHB.HotelDataManager.myThis.reservationRules.getMinCheckOutDate(t, this.searchRoomTypeId), i = MPHB.HotelDataManager.myThis.reservationRules.getMaxCheckOutDate(t, this.searchRoomTypeId), this.isDirectBooking && (i = this.roomTypeData.getNearestLockedCheckOutDate(t, i), i = this.roomTypeData.getNearestHaveNotPriceDate(t, i)), i = MPHB.HotelDataManager.myThis.dateRules.getNearestNotStayInDate(t, i), n = this.isCheckOutDateNotValid(t, e, a, i) ? this.retrieveRecommendedCheckOutDate(t, a, i) : e), {
                    minDate: a,
                    maxDate: i,
                    date: n
                }
            },
            retrieveRecommendedCheckOutDate: function(e, a, i) {
                for (var n = null, s = MPHB.Utils.cloneDate(a); MPHB.Utils.formatDateToCompare(s) <= MPHB.Utils.formatDateToCompare(i);) {
                    var o = t.datepick.add(MPHB.Utils.cloneDate(s), -1, "d");
                    if (!this.isCheckOutDateNotValid(e, s, a, i) && (!this.isDirectBooking || this.roomTypeData.hasPriceForDate(o))) {
                        n = s;
                        break
                    }
                    s = t.datepick.add(s, 1, "d")
                }
                return n
            },
            isCheckOutDateNotValid: function(t, e, a, i) {
                return null === e || MPHB.Utils.formatDateToCompare(e) < MPHB.Utils.formatDateToCompare(a) || MPHB.Utils.formatDateToCompare(e) > MPHB.Utils.formatDateToCompare(i) || !MPHB.HotelDataManager.myThis.reservationRules.isCheckOutSatisfy(t, e, this.searchRoomTypeId) || !MPHB.HotelDataManager.myThis.dateRules.canCheckOut(e)
            },
            clearDatepickers: function() {
                this.checkInDatepicker.clear(), this.checkOutDatepicker.clear()
            },
            refreshDatepickers: function() {
                this.checkInDatepicker.refresh(), this.checkOutDatepicker.refresh()
            },
            onDatepickChange: function() {
                null != this.directBooking && this.directBooking.hideQuantitySection()
            }
        }), MPHB.RoomTypeCalendar = can.Control.extend({}, {
            roomTypeData: null,
            roomTypeId: null,
            init: function(e, a) {
                this.roomTypeId = parseInt(e.attr("id").replace(/^mphb-calendar-/, "")), this.roomTypeData = MPHB.HotelDataManager.myThis.getRoomTypeData(this.roomTypeId);
                var i = MPHB._data.settings.numberOfMonthCalendar,
                    n = e.attr("data-monthstoshow");
                if (n) {
                    var s = n.split(",");
                    i = 1 == s.length ? parseInt(n) : s
                }
                e.hide().datepick({
                    onDate: this.proxy(function(t, e) {
                        var a = {
                            selectable: !1,
                            dateClass: "mphb-date-cell",
                            title: "",
                            roomTypeId: this.roomTypeId
                        };
                        return e ? a = this.roomTypeData.fillDateData(a, t) : a.dateClass += " mphb-extra-date", a
                    }),
                    minDate: MPHB.HotelDataManager.myThis.today,
                    monthsToShow: i,
                    firstDay: MPHB._data.settings.firstDay,
                    pickerClass: MPHB._data.settings.datepickerClass
                }).show(), t(window).on("mphb-update-room-type-data-" + this.roomTypeId, this.proxy(function(t) {
                    this.refresh()
                }))
            },
            refresh: function() {
                this.element.hide(), t.datepick._update(this.element[0], !0), this.element.show()
            }
        }), MPHB.Datepicker("MPHB.RoomTypeCheckInDatepicker", {}, {
            isDirectBooking: !1,
            init: function(t, e) {
                this._super(t, e), this.isDirectBooking = "1" == MPHB._data.settings.isDirectBooking
            },
            getDatepickSettings: function() {
                return {
                    onDate: this.proxy(function(t, e) {
                        var a = {
                            dateClass: "mphb-date-cell",
                            selectable: !1,
                            title: "",
                            roomTypeId: this.roomTypeId
                        };
                        if (e) {
                            var i = MPHB.HotelDataManager.myThis.reservationRules.isCheckInSatisfy(t, this.roomTypeId) && MPHB.HotelDataManager.myThis.dateRules.canCheckIn(t);
                            this.isDirectBooking ? (a = this.form.roomTypeData.fillDateData(a, t, "checkIn"), i = i && this.form.roomTypeData.canCheckIn(t)) : (this.form.roomTypeData.isEarlierThanToday(t) && (a.dateClass += " mphb-past-date", a.title += " " + MPHB._data.translations.past), a = MPHB.HotelDataManager.myThis.fillDateCellData(a, t, "checkIn")), i && (a.selectable = !0)
                        } else a.dateClass += " mphb-extra-date";
                        return a.selectable && (a.dateClass += " mphb-date-selectable"), a
                    }),
                    onSelect: this.proxy(function(t) {
                        this.form.updateCheckOutLimitations(), this.form.onDatepickChange()
                    }),
                    pickerClass: "mphb-datepick-popup mphb-check-in-datepick " + MPHB._data.settings.datepickerClass
                }
            },
            setDate: function(t) {
                return null == t ? this._super(t) : MPHB.HotelDataManager.myThis.reservationRules.isCheckInSatisfy(t, this.roomTypeId) && MPHB.HotelDataManager.myThis.dateRules.canCheckIn(t) ? this._super(t) : this._super(null)
            }
        }), MPHB.RoomTypeCheckOutDatepicker = MPHB.Datepicker.extend({}, {
            getDatepickSettings: function() {
                return {
                    onDate: this.proxy(function(t, e) {
                        var a = {
                            dateClass: "mphb-date-cell",
                            selectable: !1,
                            title: "",
                            roomTypeId: this.roomTypeId
                        };
                        if (e) {
                            var i = this.form.checkInDatepicker.getDate(),
                                n = null !== this.getMinDate() && MPHB.Utils.formatDateToCompare(t) < MPHB.Utils.formatDateToCompare(this.getMinDate()),
                                s = null !== this.getMaxDate() && MPHB.Utils.formatDateToCompare(t) > MPHB.Utils.formatDateToCompare(this.getMaxDate());
                            if (null !== i && MPHB.Utils.formatDateToCompare(t) === MPHB.Utils.formatDateToCompare(i) && (a.dateClass += " mphb-check-in-date", a.title += MPHB._data.translations.checkInDate), n) {
                                var o = !!i && MPHB.HotelDataManager.myThis.reservationRules.getMinCheckOutDate(i, this.roomTypeId);
                                MPHB.Utils.formatDateToCompare(t) < MPHB.Utils.formatDateToCompare(i) ? a.dateClass += " mphb-earlier-min-date mphb-earlier-check-in-date" : o && MPHB.Utils.formatDateToCompare(t) < MPHB.Utils.formatDateToCompare(o) && (a.dateClass += " mphb-earlier-min-date", a.title += (a.title.length ? " " : "") + MPHB._data.translations.lessThanMinDaysStay)
                            }
                            if (s) {
                                var r = !!i && MPHB.HotelDataManager.myThis.reservationRules.getMaxCheckOutDate(i, this.roomTypeId);
                                !r || MPHB.Utils.formatDateToCompare(t) < MPHB.Utils.formatDateToCompare(r) ? a.title += (a.title.length ? " " : "") + MPHB._data.translations.laterThanMaxDate : a.title += (a.title.length ? " " : "") + MPHB._data.translations.moreThanMaxDaysStay, a.dateClass += " mphb-later-max-date"
                            }
                            this.isDirectBooking ? a = this.form.roomTypeData.fillDateData(a, t, "checkOut", i) : (this.form.roomTypeData.isEarlierThanToday(t) && (a.dateClass += " mphb-past-date", a.title += " " + MPHB._data.translations.past), a = MPHB.HotelDataManager.myThis.fillDateCellData(a, t, "checkOut", i));
                            !n && !s && MPHB.HotelDataManager.myThis.reservationRules.isCheckOutSatisfy(i, t, this.roomTypeId) && MPHB.HotelDataManager.myThis.dateRules.canCheckOut(t) && (a.selectable = !0)
                        } else a.dateClass += " mphb-extra-date";
                        return a.selectable ? a.dateClass += " mphb-selectable-date" : a.dateClass += " mphb-unselectable-date", a
                    }),
                    onSelect: this.proxy(function(t) {
                        this.form.onDatepickChange()
                    }),
                    pickerClass: "mphb-datepick-popup mphb-check-out-datepick " + MPHB._data.settings.datepickerClass
                }
            },
            setDate: function(t) {
                if (null == t) return this._super(t);
                var e = this.form.checkInDatepicker.getDate();
                return MPHB.HotelDataManager.myThis.reservationRules.isCheckOutSatisfy(e, t, this.roomTypeId) && MPHB.HotelDataManager.myThis.dateRules.canCheckOut(t) ? this._super(t) : this._super(null)
            }
        }), MPHB.RoomTypeData = can.Construct.extend({}, {
            id: null,
            originalId: null,
            bookedDates: {},
            checkInDates: {},
            checkOutDates: {},
            blockedDates: {},
            havePriceDates: {},
            activeRoomsCount: 0,
            init: function(t, e) {
                this.id = t, this.originalId = e.originalId, this.setRoomsCount(e.activeRoomsCount), this.setDates(e.dates)
            },
            update: function(e) {
                e.hasOwnProperty("activeRoomsCount") && this.setRoomsCount(e.activeRoomsCount), e.hasOwnProperty("dates") && this.setDates(e.dates), t(window).trigger("mphb-update-room-type-data-" + this.id)
            },
            setRoomsCount: function(t) {
                this.activeRoomsCount = t
            },
            setDates: function(t) {
                this.bookedDates = t.hasOwnProperty("booked") ? t.booked : {}, this.checkInDates = t.hasOwnProperty("checkIns") ? t.checkIns : {}, this.checkOutDates = t.hasOwnProperty("checkOuts") ? t.checkOuts : {}, this.blockedDates = t.hasOwnProperty("blocked") ? t.blocked : {}, this.havePriceDates = t.hasOwnProperty("havePrice") ? t.havePrice : {}
            },
            blockAllRoomsOnDate: function(t) {
                this.blockedDates[t] = this.activeRoomsCount
            },
            getNearestLockedCheckOutDate: function(e, a) {
                var i = a,
                    n = this.activeRoomsCount,
                    s = t.datepick.formatDate("yyyy-mm-dd", e),
                    o = t.datepick.formatDate("yyyy-mm-dd", a);
                return t.each(this.getLockedCheckoutDates(), function(e, a) {
                    return !(o < e) && (s > e || (a >= n ? (i = t.datepick.parseDate("yyyy-mm-dd", e), !1) : void 0))
                }), i
            },
            getLockedCheckoutDates: function() {
                var e = t.extend({}, this.bookedDates);
                return t.each(this.blockedDates, function(t, a) {
                    e.hasOwnProperty(t) ? e[t] += a : e[t] = a
                }), e
            },
            getNearestHaveNotPriceDate: function(e, a) {
                for (var i = MPHB.Utils.cloneDate(a), n = MPHB.Utils.cloneDate(e); MPHB.Utils.formatDateToCompare(n) <= MPHB.Utils.formatDateToCompare(a);) {
                    if (!this.hasPriceForDate(n)) {
                        i = n;
                        break
                    }
                    n = t.datepick.add(n, 1, "d")
                }
                return i
            },
            getHavePriceDates: function() {
                var e = {};
                return t.extend(e, this.havePriceDates)
            },
            getDateStatus: function(t) {
                var e = MPHB.HotelDataManager.ROOM_STATUS_AVAILABLE;
                return this.isEarlierThanToday(t) ? e = MPHB.HotelDataManager.ROOM_STATUS_PAST : this.isDateBooked(t) ? e = MPHB.HotelDataManager.ROOM_STATUS_BOOKED : this.hasPriceForDate(t) ? this.getAvailableRoomsCount(t) || (e = MPHB.HotelDataManager.ROOM_STATUS_NOT_AVAILABLE) : e = MPHB.HotelDataManager.ROOM_STATUS_NOT_AVAILABLE, e
            },
            canCheckIn: function(t) {
                return this.getDateStatus(t) == MPHB.HotelDataManager.ROOM_STATUS_AVAILABLE
            },
            isDateBooked: function(e) {
                var a = t.datepick.formatDate("yyyy-mm-dd", e);
                return this.bookedDates.hasOwnProperty(a) && this.bookedDates[a] >= this.activeRoomsCount
            },
            isDateBookingCheckIn: function(e) {
                var a = t.datepick.formatDate("yyyy-mm-dd", e);
                return this.checkInDates.hasOwnProperty(a)
            },
            isDateBookingCheckOut: function(e) {
                var a = t.datepick.formatDate("yyyy-mm-dd", e);
                if (!this.checkOutDates.hasOwnProperty(a)) return !1;
                if (this.bookedDates.hasOwnProperty(a)) {
                    return this.checkOutDates[a] + this.bookedDates[a] >= this.activeRoomsCount
                }
                return this.checkOutDates[a] >= this.activeRoomsCount
            },
            hasPriceForDate: function(e) {
                var a = t.datepick.formatDate("yyyy-mm-dd", e);
                return MPHB.Utils.inArray(a, this.havePriceDates)
            },
            getAvailableRoomsCount: function(e) {
                var a = t.datepick.formatDate("yyyy-mm-dd", e),
                    i = this.activeRoomsCount;
                return this.bookedDates.hasOwnProperty(a) && (i -= this.bookedDates[a]), this.blockedDates.hasOwnProperty(a) && (i -= this.blockedDates[a]), i < 0 && (i = 0), i
            },
            fillDateData: function(t, e, a, i) {
                i || (i = e);
                var n = this.getDateStatus(e),
                    s = [],
                    o = [];
                switch (n) {
                    case MPHB.HotelDataManager.ROOM_STATUS_PAST:
                        o.push("mphb-past-date"), s.push(MPHB._data.translations.past);
                        break;
                    case MPHB.HotelDataManager.ROOM_STATUS_AVAILABLE:
                        o.push("mphb-available-date"), s.push(MPHB._data.translations.available + "(" + this.getAvailableRoomsCount(e) + ")"), this.isDateBookingCheckOut(e) && o.push("mphb-date-check-out");
                        break;
                    case MPHB.HotelDataManager.ROOM_STATUS_NOT_AVAILABLE:
                        o.push("mphb-not-available-date"), s.push(MPHB._data.translations.notAvailable);
                        break;
                    case MPHB.HotelDataManager.ROOM_STATUS_BOOKED:
                        o.push("mphb-booked-date"), s.push(MPHB._data.translations.booked), this.isDateBookingCheckIn(e) && o.push("mphb-date-check-in"), this.isDateBookingCheckOut(e) && o.push("mphb-date-check-out")
                }
                return t.dateClass += (t.dateClass.length ? " " : "") + o.join(" "), t.title += (t.title.length ? ", " : "") + s.join(", "), t = MPHB.HotelDataManager.myThis.fillDateCellData(t, e, a, i)
            },
            appendRulesToTitle: function(t, e) {
                var a = [];
                return MPHB.HotelDataManager.myThis.dateRules.canStayIn(t) || a.push(MPHB._data.translations.notStayIn), MPHB.HotelDataManager.myThis.dateRules.canCheckIn(t) || a.push(MPHB._data.translations.notCheckIn), MPHB.HotelDataManager.myThis.dateRules.canCheckOut(t) || a.push(MPHB._data.translations.notCheckOut), a.length && (e += " " + MPHB._data.translations.rules + " " + a.join(", ")), e
            },
            isEarlierThanToday: function(t) {
                return MPHB.Utils.formatDateToCompare(t) < MPHB.Utils.formatDateToCompare(MPHB.HotelDataManager.myThis.today)
            }
        }), MPHB.SearchCheckInDatepicker = MPHB.Datepicker.extend({}, {
            getDatepickSettings: function() {
                return {
                    onSelect: this.proxy(function(t) {
                        this.form.updateCheckOutLimitations()
                    }),
                    onDate: this.proxy(function(t, e) {
                        var a = {
                            dateClass: "mphb-date-cell",
                            selectable: !1,
                            title: ""
                        };
                        if (e) {
                            MPHB.HotelDataManager.myThis.reservationRules.isCheckInSatisfy(t, this.roomTypeId) && MPHB.HotelDataManager.myThis.dateRules.canCheckIn(t) && (a.selectable = !0), a = MPHB.HotelDataManager.myThis.fillDateCellData(a, t, "checkIn")
                        } else a.dateClass += " mphb-extra-date";
                        return a.selectable ? a.dateClass += " mphb-selectable-date" : a.dateClass += " mphb-unselectable-date", a
                    }),
                    pickerClass: "mphb-datepick-popup mphb-check-in-datepick " + MPHB._data.settings.datepickerClass
                }
            }
        }), MPHB.SearchCheckOutDatepicker = MPHB.Datepicker.extend({}, {
            getDatepickSettings: function() {
                return {
                    onDate: this.proxy(function(t, e) {
                        var a = {
                            dateClass: "mphb-date-cell",
                            selectable: !1,
                            title: ""
                        };
                        if (e) {
                            var i = this.form.checkInDatepicker.getDate(),
                                n = null !== this.getMinDate() && MPHB.Utils.formatDateToCompare(t) < MPHB.Utils.formatDateToCompare(this.getMinDate()),
                                s = null !== this.getMaxDate() && MPHB.Utils.formatDateToCompare(t) > MPHB.Utils.formatDateToCompare(this.getMaxDate());
                            if (null !== i && MPHB.Utils.formatDateToCompare(t) === MPHB.Utils.formatDateToCompare(i) && (a.dateClass += " mphb-check-in-date", a.title += MPHB._data.translations.checkInDate), n && (MPHB.Utils.formatDateToCompare(t) < MPHB.Utils.formatDateToCompare(i) ? a.dateClass += " mphb-earlier-min-date mphb-earlier-check-in-date" : (a.dateClass += " mphb-earlier-min-date", a.title += (a.title.length ? " " : "") + MPHB._data.translations.lessThanMinDaysStay)), s) {
                                var o = !!i && MPHB.HotelDataManager.myThis.reservationRules.getMaxCheckOutDate(i, this.roomTypeId);
                                !o || MPHB.Utils.formatDateToCompare(t) < MPHB.Utils.formatDateToCompare(o) ? a.title += (a.title.length ? " " : "") + MPHB._data.translations.laterThanMaxDate : a.title += (a.title.length ? " " : "") + MPHB._data.translations.moreThanMaxDaysStay, a.dateClass += " mphb-later-max-date"
                            }
                            a = MPHB.HotelDataManager.myThis.fillDateCellData(a, t, "checkOut", i);
                            !n && !s && MPHB.HotelDataManager.myThis.reservationRules.isCheckOutSatisfy(i, t, this.roomTypeId) && MPHB.HotelDataManager.myThis.dateRules.canCheckOut(t) && (a.selectable = !0)
                        } else a.dateClass += " mphb-extra-date";
                        return a.selectable ? a.dateClass += " mphb-selectable-date" : a.dateClass += " mphb-unselectable-date", a
                    }),
                    pickerClass: "mphb-datepick-popup mphb-check-out-datepick " + MPHB._data.settings.datepickerClass
                }
            }
        }), MPHB.SearchForm = can.Control.extend({}, {
            checkInDatepickerEl: null,
            checkOutDatepickerEl: null,
            checkInDatepicker: null,
            checkOutDatepicker: null,
            init: function(t, e) {
                this.checkInDatepickerEl = this.element.find('.mphb-datepick[id^="mphb_check_in_date"]'), this.checkOutDatepickerEl = this.element.find('.mphb-datepick[id^="mphb_check_out_date"]'), this.checkInDatepicker = new MPHB.SearchCheckInDatepicker(this.checkInDatepickerEl, {
                    form: this
                }), this.checkOutDatepicker = new MPHB.SearchCheckOutDatepicker(this.checkOutDatepickerEl, {
                    form: this
                }), this.checkInDatepicker.getDate() && this.updateCheckOutLimitations()
            },
            updateCheckOutLimitations: function(t) {
                void 0 === t && (t = !0);
                var e = this.retrieveCheckOutLimitations(this.checkInDatepicker.getDate(), this.checkOutDatepicker.getDate());
                this.checkOutDatepicker.setOption("minDate", e.minDate), this.checkOutDatepicker.setOption("maxDate", e.maxDate), this.checkOutDatepicker.setDate(t ? e.date : null)
            },
            retrieveCheckOutLimitations: function(t, e) {
                var a = MPHB.HotelDataManager.myThis.today,
                    i = null,
                    n = null;
                if (null !== t) {
                    var a = MPHB.HotelDataManager.myThis.reservationRules.getMinCheckOutDate(t),
                        i = MPHB.HotelDataManager.myThis.reservationRules.getMaxCheckOutDate(t);
                    i = MPHB.HotelDataManager.myThis.dateRules.getNearestNotStayInDate(t, i), n = this.isCheckOutDateNotValid(t, e, a, i) ? this.retrieveRecommendedCheckOutDate(t, a, i) : e
                }
                return {
                    minDate: a,
                    maxDate: i,
                    date: n
                }
            },
            retrieveRecommendedCheckOutDate: function(e, a, i) {
                for (var n = null, s = MPHB.Utils.cloneDate(a); MPHB.Utils.formatDateToCompare(s) <= MPHB.Utils.formatDateToCompare(i);) {
                    if (!this.isCheckOutDateNotValid(e, s, a, i)) {
                        n = s;
                        break
                    }
                    s = t.datepick.add(s, 1, "d")
                }
                return n
            },
            isCheckOutDateNotValid: function(t, e, a, i) {
                return null === e || MPHB.Utils.formatDateToCompare(e) < MPHB.Utils.formatDateToCompare(a) || MPHB.Utils.formatDateToCompare(e) > MPHB.Utils.formatDateToCompare(i) || !MPHB.HotelDataManager.myThis.reservationRules.isCheckOutSatisfy(t, e) || !MPHB.HotelDataManager.myThis.dateRules.canCheckOut(e)
            }
        }), MPHB.RoomBookSection = can.Control.extend({}, {
            roomTypeId: null,
            roomTitle: "",
            roomPrice: 0,
            quantitySelect: null,
            bookButton: null,
            confirmButton: null,
            removeButton: null,
            messageHolder: null,
            messageWrapper: null,
            form: null,
            init: function(t, e) {
                this.reservationCart = e.reservationCart, this.roomTypeId = parseInt(t.attr("data-room-type-id")), this.roomTitle = t.attr("data-room-type-title"), this.roomPrice = parseFloat(t.attr("data-room-price")), this.confirmButton = t.find(".mphb-confirm-reservation"), this.quantitySelect = t.find(".mphb-rooms-quantity"), this.messageWrapper = t.find(".mphb-rooms-reservation-message-wrapper"), this.messageHolder = t.find(".mphb-rooms-reservation-message")
            },
            getRoomTypeId: function() {
                return this.roomTypeId
            },
            getPrice: function() {
                return this.roomPrice
            },
            ".mphb-book-button click": function(t, e) {
                e.preventDefault(), e.stopPropagation();
                var a = parseInt(this.quantitySelect.val());
                this.reservationCart.addToCart(this.roomTypeId, a);
                var i = 1 == a ? MPHB._data.translations.roomsAddedToReservation_singular : MPHB._data.translations.roomsAddedToReservation_plural,
                    n = i.replace("%1$d", a).replace("%2$s", this.roomTitle);
                this.messageHolder.html(n), this.element.addClass("mphb-rooms-added")
            },
            ".mphb-remove-from-reservation click": function(t, e) {
                e.preventDefault(), e.stopPropagation(), this.reservationCart.removeFromCart(this.roomTypeId), this.messageHolder.empty(), this.element.removeClass("mphb-rooms-added")
            },
            ".mphb-confirm-reservation click": function(t, e) {
                e.preventDefault(), e.stopPropagation(), this.reservationCart.confirmReservation()
            }
        }), MPHB.ReservationCart = can.Control.extend({}, {
            cartForm: null,
            cartDetails: null,
            roomBookSections: {},
            cartContents: {},
            init: function(t, e) {
                this.cartForm = t.find("#mphb-reservation-cart"), this.cartDetails = t.find(".mphb-reservation-details"), this.initRoomBookSections(t.find(".mphb-reserve-room-section"))
            },
            initRoomBookSections: function(e) {
                var a, i = this;
                t.each(e, function(e, n) {
                    a = new MPHB.RoomBookSection(t(n), {
                        reservationCart: i
                    }), i.roomBookSections[a.getRoomTypeId()] = a
                })
            },
            addToCart: function(t, e) {
                this.cartContents[t] = e, this.updateCartView(), this.updateCartInputs()
            },
            removeFromCart: function(t) {
                delete this.cartContents[t], this.updateCartView(), this.updateCartInputs()
            },
            calcRoomsInCart: function() {
                var e = 0;
                return t.each(this.cartContents, function(t, a) {
                    e += a
                }), e
            },
            calcTotalPrice: function() {
                var e = 0,
                    a = 0,
                    i = this;
                return t.each(this.cartContents, function(t, n) {
                    a = i.roomBookSections[t].getPrice(), e += a * n
                }), e
            },
            updateCartView: function() {
                if (t.isEmptyObject(this.cartContents)) this.cartForm.addClass("mphb-empty-cart");
                else {
                    var e = this.calcRoomsInCart(),
                        a = 1 == e ? MPHB._data.translations.countRoomsSelected_singular : MPHB._data.translations.countRoomsSelected_plural,
                        i = a.replace("%s", e);
                    this.cartDetails.find(".mphb-cart-message").html(i);
                    var n = this.calcTotalPrice(),
                        s = MPHB.format_price(n, {
                            trim_zeros: !0
                        });
                    this.cartDetails.find(".mphb-cart-total-price>.mphb-cart-total-price-value").html(s), this.cartForm.removeClass("mphb-empty-cart")
                }
            },
            updateCartInputs: function() {
                this.cartForm.find('[name^="mphb_rooms_details"]').remove();
                var e = this;
                t.each(this.cartContents, function(a, i) {
                    var n = t("<input />", {
                        name: "mphb_rooms_details[" + a + "]",
                        type: "hidden",
                        value: i
                    });
                    e.cartForm.prepend(n)
                })
            },
            confirmReservation: function() {
                this.cartForm.submit()
            }
        }), new MPHB.HotelDataManager(MPHB._data), MPHB._data.page.isCheckoutPage ? new MPHB.CheckoutForm(t(".mphb_sc_checkout-form")) : MPHB._data.page.isCreateBookingPage && new MPHB.CheckoutForm(t(".mphb_cb_checkout_form")), MPHB._data.page.isSearchResultsPage && new MPHB.ReservationCart(t(".mphb_sc_search_results-wrapper"));
        var e = t(".mphb-calendar.mphb-datepick");
        t.each(e, function(e, a) {
            new MPHB.RoomTypeCalendar(t(a))
        });
        var a = t(".mphb-booking-form");
        t.each(a, function(e, a) {
            new MPHB.ReservationForm(t(a))
        });
        var i = t("form.mphb_sc_search-form, form.mphb_widget_search-form, form.mphb_cb_search_form");
        t.each(i, function(e, a) {
            new MPHB.SearchForm(t(a))
        });
        var n = t(".mphb-flexslider-gallery-wrapper");
        t.each(n, function(t, e) {
            new MPHB.FlexsliderGallery(e)
        });
        var s = t(".mphb-checkout-terms-wrapper");
        s.length > 0 && new MPHB.TermsSwitcher(s), void 0 == t.ui && (t.ui = {}), void 0 == t.ui.version && (t.ui.version = "1.5-")
    })
}(jQuery);