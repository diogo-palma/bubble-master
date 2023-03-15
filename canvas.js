var lr = Object.defineProperty;
var sr = (e, t, n) => t in e ? lr(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : e[t] = n;
var m = (e, t, n) => (sr(e, typeof t != "symbol" ? t + "" : t, n),
    n);
(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const u of document.querySelectorAll('link[rel="modulepreload"]'))
        r(u);
    new MutationObserver(u => {
        for (const o of u)
            if (o.type === "childList")
                for (const i of o.addedNodes)
                    i.tagName === "LINK" && i.rel === "modulepreload" && r(i)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function n(u) {
        const o = {};
        return u.integrity && (o.integrity = u.integrity),
            u.referrerpolicy && (o.referrerPolicy = u.referrerpolicy),
            u.crossorigin === "use-credentials" ? o.credentials = "include" : u.crossorigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin",
            o
    }

    function r(u) {
        if (u.ep)
            return;
        u.ep = !0;
        const o = n(u);
        fetch(u.href, o)
    }
})();
const H = {};

function cr(e) {
    H.context = e
}
const on = (e, t) => e === t,
    fe = Symbol("solid-proxy"),
    st = Symbol("solid-track"),
    Oe = {
        equals: on
    };
let ln = fn;
const J = 1,
    Re = 2,
    sn = {
        owned: null,
        cleanups: null,
        context: null,
        owner: null
    };
var P = null;
let he = null,
    D = null,
    M = null,
    G = null,
    Ct = 0;

function le(e, t) {
    const n = D,
        r = P,
        u = e.length === 0,
        o = u ? sn : {
            owned: null,
            cleanups: null,
            context: null,
            owner: t || r
        },
        i = u ? e : () => e(() => ue(() => _t(o)));
    P = o,
        D = null;
    try {
        return we(i, !0)
    } finally {
        D = n,
            P = r
    }
}

function v(e, t) {
    t = t ? Object.assign({}, Oe, t) : Oe;
    const n = {
            value: e,
            observers: null,
            observerSlots: null,
            comparator: t.equals || void 0
        },
        r = u => (typeof u == "function" && (u = u(n.value)),
            hn(n, u));
    return [dn.bind(n), r]
}

function x(e, t, n) {
    const r = Ke(e, t, !1, J);
    ve(r)
}

function I(e, t, n) {
    ln = pr;
    const r = Ke(e, t, !1, J);
    r.user = !0,
        G ? G.push(r) : ve(r)
}

function E(e, t, n) {
    n = n ? Object.assign({}, Oe, n) : Oe;
    const r = Ke(e, t, !0, 0);
    return r.observers = null,
        r.observerSlots = null,
        r.comparator = n.equals || void 0,
        ve(r),
        dn.bind(r)
}

function ar(e, t = on, n) {
    const r = new Map,
        u = Ke(o => {
            const i = e();
            for (const [l, c] of r.entries())
                if (t(l, i) !== t(l, o))
                    for (const s of c.values())
                        s.state = J,
                        s.pure ? M.push(s) : G.push(s);
            return i
        }, void 0, !0, J);
    return ve(u),
        o => {
            const i = D;
            if (i) {
                let l;
                (l = r.get(o)) ? l.add(i): r.set(o, l = new Set([i])),
                    X(() => {
                        l.delete(i),
                            !l.size && r.delete(o)
                    })
            }
            return t(o, u.value)
        }
}

function dr(e) {
    return we(e, !1)
}

function ue(e) {
    const t = D;
    D = null;
    try {
        return e()
    } finally {
        D = t
    }
}

function hr(e, t, n) {
    const r = Array.isArray(e);
    let u, o = n && n.defer;
    return i => {
        let l;
        if (r) {
            l = Array(e.length);
            for (let s = 0; s < e.length; s++)
                l[s] = e[s]()
        } else
            l = e();
        if (o) {
            o = !1;
            return
        }
        const c = ue(() => t(l, u, i));
        return u = l,
            c
    }
}

function cn(e) {
    I(() => ue(e))
}

function X(e) {
    return P === null || (P.cleanups === null ? P.cleanups = [e] : P.cleanups.push(e)),
        e
}

function an() {
    return D
}

function fr(e) {
    const t = E(e),
        n = E(() => ct(t()));
    return n.toArray = () => {
            const r = n();
            return Array.isArray(r) ? r : r != null ? [r] : []
        },
        n
}

function dn() {
    const e = he;
    if (this.sources && (this.state || e))
        if (this.state === J || e)
            ve(this);
        else {
            const t = M;
            M = null,
                we(() => je(this), !1),
                M = t
        }
    if (D) {
        const t = this.observers ? this.observers.length : 0;
        D.sources ? (D.sources.push(this),
                D.sourceSlots.push(t)) : (D.sources = [this],
                D.sourceSlots = [t]),
            this.observers ? (this.observers.push(D),
                this.observerSlots.push(D.sources.length - 1)) : (this.observers = [D],
                this.observerSlots = [D.sources.length - 1])
    }
    return this.value
}

function hn(e, t, n) {
    let r = e.value;
    return (!e.comparator || !e.comparator(r, t)) && (e.value = t,
            e.observers && e.observers.length && we(() => {
                for (let u = 0; u < e.observers.length; u += 1) {
                    const o = e.observers[u],
                        i = he && he.running;
                    i && he.disposed.has(o),
                        (i && !o.tState || !i && !o.state) && (o.pure ? M.push(o) : G.push(o),
                            o.observers && gn(o)),
                        i || (o.state = J)
                }
                if (M.length > 1e6)
                    throw M = [],
                        new Error
            }, !1)),
        t
}

function ve(e) {
    if (!e.fn)
        return;
    _t(e);
    const t = P,
        n = D,
        r = Ct;
    D = P = e,
        gr(e, e.value, r),
        D = n,
        P = t
}

function gr(e, t, n) {
    let r;
    try {
        r = e.fn(t)
    } catch (u) {
        e.pure && (e.state = J),
            mn(u)
    }
    (!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? hn(e, r) : e.value = r,
        e.updatedAt = n)
}

function Ke(e, t, n, r = J, u) {
    const o = {
        fn: e,
        state: r,
        updatedAt: null,
        owned: null,
        sources: null,
        sourceSlots: null,
        cleanups: null,
        value: t,
        owner: P,
        context: null,
        pure: n
    };
    return P === null || P !== sn && (P.owned ? P.owned.push(o) : P.owned = [o]),
        o
}

function Ve(e) {
    const t = he;
    if (e.state === 0 || t)
        return;
    if (e.state === Re || t)
        return je(e);
    if (e.suspense && ue(e.suspense.inFallback))
        return e.suspense.effects.push(e);
    const n = [e];
    for (;
        (e = e.owner) && (!e.updatedAt || e.updatedAt < Ct);)
        (e.state || t) && n.push(e);
    for (let r = n.length - 1; r >= 0; r--)
        if (e = n[r],
            e.state === J || t)
            ve(e);
        else if (e.state === Re || t) {
        const u = M;
        M = null,
            we(() => je(e, n[0]), !1),
            M = u
    }
}

function we(e, t) {
    if (M)
        return e();
    let n = !1;
    t || (M = []),
        G ? n = !0 : G = [],
        Ct++;
    try {
        const r = e();
        return mr(n),
            r
    } catch (r) {
        M || (G = null),
            mn(r)
    }
}

function mr(e) {
    if (M && (fn(M),
            M = null),
        e)
        return;
    const t = G;
    G = null,
        t.length && we(() => ln(t), !1)
}

function fn(e) {
    for (let t = 0; t < e.length; t++)
        Ve(e[t])
}

function pr(e) {
    let t, n = 0;
    for (t = 0; t < e.length; t++) {
        const r = e[t];
        r.user ? e[n++] = r : Ve(r)
    }
    for (H.context && cr(),
        t = 0; t < n; t++)
        Ve(e[t])
}

function je(e, t) {
    const n = he;
    e.state = 0;
    for (let r = 0; r < e.sources.length; r += 1) {
        const u = e.sources[r];
        u.sources && (u.state === J || n ? u !== t && Ve(u) : (u.state === Re || n) && je(u, t))
    }
}

function gn(e) {
    const t = he;
    for (let n = 0; n < e.observers.length; n += 1) {
        const r = e.observers[n];
        (!r.state || t) && (r.state = Re,
            r.pure ? M.push(r) : G.push(r),
            r.observers && gn(r))
    }
}

function _t(e) {
    let t;
    if (e.sources)
        for (; e.sources.length;) {
            const n = e.sources.pop(),
                r = e.sourceSlots.pop(),
                u = n.observers;
            if (u && u.length) {
                const o = u.pop(),
                    i = n.observerSlots.pop();
                r < u.length && (o.sourceSlots[i] = r,
                    u[r] = o,
                    n.observerSlots[r] = i)
            }
        }
    if (e.owned) {
        for (t = 0; t < e.owned.length; t++)
            _t(e.owned[t]);
        e.owned = null
    }
    if (e.cleanups) {
        for (t = 0; t < e.cleanups.length; t++)
            e.cleanups[t]();
        e.cleanups = null
    }
    e.state = 0,
        e.context = null
}

function br(e) {
    return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error")
}

function mn(e) {
    throw e = br(e),
        e
}

function ct(e) {
    if (typeof e == "function" && !e.length)
        return ct(e());
    if (Array.isArray(e)) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
            const r = ct(e[n]);
            Array.isArray(r) ? t.push.apply(t, r) : t.push(r)
        }
        return t
    }
    return e
}
const Cr = Symbol("fallback");

function Tt(e) {
    for (let t = 0; t < e.length; t++)
        e[t]()
}

function _r(e, t, n = {}) {
    let r = [],
        u = [],
        o = [],
        i = 0,
        l = t.length > 1 ? [] : null;
    return X(() => Tt(o)),
        () => {
            let c = e() || [],
                s, d;
            return c[st],
                ue(() => {
                    let p = c.length,
                        _, C, y, F, k, N, R, j, oe;
                    if (p === 0)
                        i !== 0 && (Tt(o),
                            o = [],
                            r = [],
                            u = [],
                            i = 0,
                            l && (l = [])),
                        n.fallback && (r = [Cr],
                            u[0] = le(rt => (o[0] = rt,
                                n.fallback())),
                            i = 1);
                    else if (i === 0) {
                        for (u = new Array(p),
                            d = 0; d < p; d++)
                            r[d] = c[d],
                            u[d] = le(f);
                        i = p
                    } else {
                        for (y = new Array(p),
                            F = new Array(p),
                            l && (k = new Array(p)),
                            N = 0,
                            R = Math.min(i, p); N < R && r[N] === c[N]; N++)
                        ;
                        for (R = i - 1,
                            j = p - 1; R >= N && j >= N && r[R] === c[j]; R--,
                            j--)
                            y[j] = u[R],
                            F[j] = o[R],
                            l && (k[j] = l[R]);
                        for (_ = new Map,
                            C = new Array(j + 1),
                            d = j; d >= N; d--)
                            oe = c[d],
                            s = _.get(oe),
                            C[d] = s === void 0 ? -1 : s,
                            _.set(oe, d);
                        for (s = N; s <= R; s++)
                            oe = r[s],
                            d = _.get(oe),
                            d !== void 0 && d !== -1 ? (y[d] = u[s],
                                F[d] = o[s],
                                l && (k[d] = l[s]),
                                d = C[d],
                                _.set(oe, d)) : o[s]();
                        for (d = N; d < p; d++)
                            d in y ? (u[d] = y[d],
                                o[d] = F[d],
                                l && (l[d] = k[d],
                                    l[d](d))) : u[d] = le(f);
                        u = u.slice(0, i = p),
                            r = c.slice(0)
                    }
                    return u
                });

            function f(p) {
                if (o[d] = p,
                    l) {
                    const [_, C] = v(d);
                    return l[d] = C,
                        t(c[d], _)
                }
                return t(c[d])
            }
        }
}

function a(e, t) {
    return ue(() => e(t || {}))
}

function O(e) {
    const t = "fallback" in e && {
        fallback: () => e.fallback
    };
    return E(_r(() => e.each, e.children, t || void 0))
}

function A(e) {
    let t = !1;
    const n = e.keyed,
        r = E(() => e.when, void 0, {
            equals: (u, o) => t ? u === o : !u == !o
        });
    return E(() => {
        const u = r();
        if (u) {
            const o = e.children,
                i = typeof o == "function" && o.length > 0;
            return t = n || i,
                i ? ue(() => o(u)) : o
        }
        return e.fallback
    })
}

function Ze(e) {
    let t = !1,
        n = !1;
    const r = fr(() => e.children),
        u = E(() => {
            let o = r();
            Array.isArray(o) || (o = [o]);
            for (let i = 0; i < o.length; i++) {
                const l = o[i].when;
                if (l)
                    return n = !!o[i].keyed,
                        [i, l, o[i]]
            }
            return [-1]
        }, void 0, {
            equals: (o, i) => o[0] === i[0] && (t ? o[1] === i[1] : !o[1] == !i[1]) && o[2] === i[2]
        });
    return E(() => {
        const [o, i, l] = u();
        if (o < 0)
            return e.fallback;
        const c = l.children,
            s = typeof c == "function" && c.length > 0;
        return t = n || s,
            s ? ue(() => c(i)) : c
    })
}

function Y(e) {
    return e
}
const yr = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"],
    vr = new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...yr]),
    wr = new Set(["innerHTML", "textContent", "innerText", "children"]),
    $r = Object.assign(Object.create(null), {
        className: "class",
        htmlFor: "for"
    }),
    It = Object.assign(Object.create(null), {
        class: "className",
        formnovalidate: "formNoValidate",
        ismap: "isMap",
        nomodule: "noModule",
        playsinline: "playsInline",
        readonly: "readOnly"
    }),
    Ar = new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]),
    xr = {
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace"
    };

function Fr(e, t, n) {
    let r = n.length,
        u = t.length,
        o = r,
        i = 0,
        l = 0,
        c = t[u - 1].nextSibling,
        s = null;
    for (; i < u || l < o;) {
        if (t[i] === n[l]) {
            i++,
            l++;
            continue
        }
        for (; t[u - 1] === n[o - 1];)
            u--,
            o--;
        if (u === i) {
            const d = o < r ? l ? n[l - 1].nextSibling : n[o - l] : c;
            for (; l < o;)
                e.insertBefore(n[l++], d)
        } else if (o === l)
            for (; i < u;)
                (!s || !s.has(t[i])) && t[i].remove(),
                i++;
        else if (t[i] === n[o - 1] && n[l] === t[u - 1]) {
            const d = t[--u].nextSibling;
            e.insertBefore(n[l++], t[i++].nextSibling),
                e.insertBefore(n[--o], d),
                t[u] = n[o]
        } else {
            if (!s) {
                s = new Map;
                let f = l;
                for (; f < o;)
                    s.set(n[f], f++)
            }
            const d = s.get(t[i]);
            if (d != null)
                if (l < d && d < o) {
                    let f = i,
                        p = 1,
                        _;
                    for (; ++f < u && f < o && !((_ = s.get(t[f])) == null || _ !== d + p);)
                        p++;
                    if (p > d - l) {
                        const C = t[i];
                        for (; l < d;)
                            e.insertBefore(n[l++], C)
                    } else
                        e.replaceChild(n[l++], t[i++])
                } else
                    i++;
            else
                t[i++].remove()
        }
    }
}
const Ot = "_$DX_DELEGATE";

function kr(e, t, n, r = {}) {
    let u;
    return le(o => {
            u = o,
                t === document ? e() : h(t, e(), t.firstChild ? null : void 0, n)
        }, r.owner),
        () => {
            u(),
                t.textContent = ""
        }
}

function g(e, t, n) {
    const r = document.createElement("template");
    r.innerHTML = e;
    let u = r.content.firstChild;
    return n && (u = u.firstChild),
        u
}

function V(e, t = window.document) {
    const n = t[Ot] || (t[Ot] = new Set);
    for (let r = 0, u = e.length; r < u; r++) {
        const o = e[r];
        n.has(o) || (n.add(o),
            t.addEventListener(o, Sr))
    }
}

function B(e, t, n) {
    n == null ? e.removeAttribute(t) : e.setAttribute(t, n)
}

function Er(e, t, n, r) {
    r == null ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r)
}

function T(e, t) {
    t == null ? e.removeAttribute("class") : e.className = t
}

function De(e, t, n, r) {
    if (r)
        Array.isArray(n) ? (e[`$$${t}`] = n[0],
            e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
    else if (Array.isArray(n)) {
        const u = n[0];
        e.addEventListener(t, n[0] = o => u.call(e, n[1], o))
    } else
        e.addEventListener(t, n)
}

function Br(e, t, n = {}) {
    const r = Object.keys(t || {}),
        u = Object.keys(n);
    let o, i;
    for (o = 0,
        i = u.length; o < i; o++) {
        const l = u[o];
        !l || l === "undefined" || t[l] || (Rt(e, l, !1),
            delete n[l])
    }
    for (o = 0,
        i = r.length; o < i; o++) {
        const l = r[o],
            c = !!t[l];
        !l || l === "undefined" || n[l] === c || !c || (Rt(e, l, !0),
            n[l] = c)
    }
    return n
}

function Je(e, t, n) {
    if (!t)
        return n ? B(e, "style") : t;
    const r = e.style;
    if (typeof t == "string")
        return r.cssText = t;
    typeof n == "string" && (r.cssText = n = void 0),
        n || (n = {}),
        t || (t = {});
    let u, o;
    for (o in n)
        t[o] == null && r.removeProperty(o),
        delete n[o];
    for (o in t)
        u = t[o],
        u !== n[o] && (r.setProperty(o, u),
            n[o] = u);
    return n
}

function w(e, t = {}, n, r) {
    const u = {};
    return r || x(() => u.children = Ce(e, t.children, u.children)),
        x(() => t.ref && t.ref(e)),
        x(() => Lr(e, t, n, !0, u, !0)),
        u
}

function se(e, t, n) {
    return ue(() => e(t, n))
}

function h(e, t, n, r) {
    if (n !== void 0 && !r && (r = []),
        typeof t != "function")
        return Ce(e, t, r, n);
    x(u => Ce(e, t(), u, n), r)
}

function Lr(e, t, n, r, u = {}, o = !1) {
    t || (t = {});
    for (const i in u)
        if (!(i in t)) {
            if (i === "children")
                continue;
            u[i] = Vt(e, i, null, u[i], n, o)
        }
    for (const i in t) {
        if (i === "children") {
            r || Ce(e, t.children);
            continue
        }
        const l = t[i];
        u[i] = Vt(e, i, l, u[i], n, o)
    }
}

function Dr(e) {
    return e.toLowerCase().replace(/-([a-z])/g, (t, n) => n.toUpperCase())
}

function Rt(e, t, n) {
    const r = t.trim().split(/\s+/);
    for (let u = 0, o = r.length; u < o; u++)
        e.classList.toggle(r[u], n)
}

function Vt(e, t, n, r, u, o) {
    let i, l, c;
    if (t === "style")
        return Je(e, n, r);
    if (t === "classList")
        return Br(e, n, r);
    if (n === r)
        return r;
    if (t === "ref")
        o || n(e);
    else if (t.slice(0, 3) === "on:") {
        const s = t.slice(3);
        r && e.removeEventListener(s, r),
            n && e.addEventListener(s, n)
    } else if (t.slice(0, 10) === "oncapture:") {
        const s = t.slice(10);
        r && e.removeEventListener(s, r, !0),
            n && e.addEventListener(s, n, !0)
    } else if (t.slice(0, 2) === "on") {
        const s = t.slice(2).toLowerCase(),
            d = Ar.has(s);
        if (!d && r) {
            const f = Array.isArray(r) ? r[0] : r;
            e.removeEventListener(s, f)
        }
        (d || n) && (De(e, s, n, d),
            d && V([s]))
    } else if ((c = wr.has(t)) || !u && (It[t] || (l = vr.has(t))) || (i = e.nodeName.includes("-")))
        t === "class" || t === "className" ? T(e, n) : i && !l && !c ? e[Dr(t)] = n : e[It[t] || t] = n;
    else {
        const s = u && t.indexOf(":") > -1 && xr[t.split(":")[0]];
        s ? Er(e, s, t, n) : B(e, $r[t] || t, n)
    }
    return n
}

function Sr(e) {
    const t = `$$${e.type}`;
    let n = e.composedPath && e.composedPath()[0] || e.target;
    for (e.target !== n && Object.defineProperty(e, "target", {
            configurable: !0,
            value: n
        }),
        Object.defineProperty(e, "currentTarget", {
            configurable: !0,
            get() {
                return n || document
            }
        }),
        H.registry && !H.done && (H.done = !0,
            document.querySelectorAll("[id^=pl-]").forEach(r => r.remove())); n !== null;) {
        const r = n[t];
        if (r && !n.disabled) {
            const u = n[`${t}Data`];
            if (u !== void 0 ? r.call(n, u, e) : r.call(n, e),
                e.cancelBubble)
                return
        }
        n = n.host && n.host !== n && n.host instanceof Node ? n.host : n.parentNode
    }
}

function Ce(e, t, n, r, u) {
    for (H.context && !n && (n = [...e.childNodes]); typeof n == "function";)
        n = n();
    if (t === n)
        return n;
    const o = typeof t,
        i = r !== void 0;
    if (e = i && n[0] && n[0].parentNode || e,
        o === "string" || o === "number") {
        if (H.context)
            return n;
        if (o === "number" && (t = t.toString()),
            i) {
            let l = n[0];
            l && l.nodeType === 3 ? l.data = t : l = document.createTextNode(t),
                n = pe(e, n, r, l)
        } else
            n !== "" && typeof n == "string" ? n = e.firstChild.data = t : n = e.textContent = t
    } else if (t == null || o === "boolean") {
        if (H.context)
            return n;
        n = pe(e, n, r)
    } else {
        if (o === "function")
            return x(() => {
                    let l = t();
                    for (; typeof l == "function";)
                        l = l();
                    n = Ce(e, l, n, r)
                }),
                () => n;
        if (Array.isArray(t)) {
            const l = [],
                c = n && Array.isArray(n);
            if (at(l, t, n, u))
                return x(() => n = Ce(e, l, n, r, !0)),
                    () => n;
            if (H.context) {
                if (!l.length)
                    return n;
                for (let s = 0; s < l.length; s++)
                    if (l[s].parentNode)
                        return n = l
            }
            if (l.length === 0) {
                if (n = pe(e, n, r),
                    i)
                    return n
            } else
                c ? n.length === 0 ? jt(e, l, r) : Fr(e, n, l) : (n && pe(e),
                    jt(e, l));
            n = l
        } else if (t instanceof Node) {
            if (H.context && t.parentNode)
                return n = i ? [t] : t;
            if (Array.isArray(n)) {
                if (i)
                    return n = pe(e, n, r, t);
                pe(e, n, null, t)
            } else
                n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
            n = t
        }
    }
    return n
}

function at(e, t, n, r) {
    let u = !1;
    for (let o = 0, i = t.length; o < i; o++) {
        let l = t[o],
            c = n && n[o];
        if (l instanceof Node)
            e.push(l);
        else if (!(l == null || l === !0 || l === !1))
            if (Array.isArray(l))
                u = at(e, l, c) || u;
            else if (typeof l == "function")
            if (r) {
                for (; typeof l == "function";)
                    l = l();
                u = at(e, Array.isArray(l) ? l : [l], Array.isArray(c) ? c : [c]) || u
            } else
                e.push(l),
                u = !0;
        else {
            const s = String(l);
            c && c.nodeType === 3 && c.data === s ? e.push(c) : e.push(document.createTextNode(s))
        }
    }
    return u
}

function jt(e, t, n = null) {
    for (let r = 0, u = t.length; r < u; r++)
        e.insertBefore(t[r], n)
}

function pe(e, t, n, r) {
    if (n === void 0)
        return e.textContent = "";
    const u = r || document.createTextNode("");
    if (t.length) {
        let o = !1;
        for (let i = t.length - 1; i >= 0; i--) {
            const l = t[i];
            if (u !== l) {
                const c = l.parentNode === e;
                !o && !i ? c ? e.replaceChild(u, l) : e.insertBefore(u, n) : c && l.remove()
            } else
                o = !0
        }
    } else
        e.insertBefore(u, n);
    return [u]
}
const Nr = "http://www.w3.org/2000/svg";

function Mr(e, t = !1) {
    return t ? document.createElementNS(Nr, e) : document.createElement(e)
}

function pn(e) {
    const {
        useShadow: t
    } = e, n = document.createTextNode(""), r = e.mount || document.body;

    function u() {
        if (H.context) {
            const [o, i] = v(!1);
            return queueMicrotask(() => i(!0)),
                () => o() && e.children
        } else
            return () => e.children
    }
    if (r instanceof HTMLHeadElement) {
        const [o, i] = v(!1), l = () => i(!0);
        le(c => h(r, () => o() ? c() : u()(), null)),
            X(() => {
                H.context ? queueMicrotask(l) : l()
            })
    } else {
        const o = Mr(e.isSVG ? "g" : "div", e.isSVG),
            i = t && o.attachShadow ? o.attachShadow({
                mode: "open"
            }) : o;
        Object.defineProperty(o, "host", {
                get() {
                    return n.parentNode
                },
                configurable: !0
            }),
            h(i, u()),
            r.appendChild(o),
            e.ref && e.ref(o),
            X(() => r.removeChild(o))
    }
    return n
}
const dt = Symbol("store-raw"),
    Be = Symbol("store-node"),
    Pr = Symbol("store-name");

function bn(e, t) {
    let n = e[fe];
    if (!n && (Object.defineProperty(e, fe, {
                value: n = new Proxy(e, Ir)
            }),
            !Array.isArray(e))) {
        const r = Object.keys(e),
            u = Object.getOwnPropertyDescriptors(e);
        for (let o = 0, i = r.length; o < i; o++) {
            const l = r[o];
            if (u[l].get) {
                const c = u[l].get.bind(n);
                Object.defineProperty(e, l, {
                    enumerable: u[l].enumerable,
                    get: c
                })
            }
        }
    }
    return n
}

function ce(e) {
    let t;
    return e != null && typeof e == "object" && (e[fe] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e))
}

function _e(e, t = new Set) {
    let n, r, u, o;
    if (n = e != null && e[dt])
        return n;
    if (!ce(e) || t.has(e))
        return e;
    if (Array.isArray(e)) {
        Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
        for (let i = 0, l = e.length; i < l; i++)
            u = e[i],
            (r = _e(u, t)) !== u && (e[i] = r)
    } else {
        Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
        const i = Object.keys(e),
            l = Object.getOwnPropertyDescriptors(e);
        for (let c = 0, s = i.length; c < s; c++)
            o = i[c],
            !l[o].get && (u = e[o],
                (r = _e(u, t)) !== u && (e[o] = r))
    }
    return e
}

function yt(e) {
    let t = e[Be];
    return t || Object.defineProperty(e, Be, {
            value: t = {}
        }),
        t
}

function ht(e, t, n) {
    return e[t] || (e[t] = _n(n))
}

function zr(e, t) {
    const n = Reflect.getOwnPropertyDescriptor(e, t);
    return !n || n.get || !n.configurable || t === fe || t === Be || t === Pr || (delete n.value,
            delete n.writable,
            n.get = () => e[fe][t]),
        n
}

function Cn(e) {
    if (an()) {
        const t = yt(e);
        (t._ || (t._ = _n()))()
    }
}

function Tr(e) {
    return Cn(e),
        Reflect.ownKeys(e)
}

function _n(e) {
    const [t, n] = v(e, {
        equals: !1,
        internal: !0
    });
    return t.$ = n,
        t
}
const Ir = {
    get(e, t, n) {
        if (t === dt)
            return e;
        if (t === fe)
            return n;
        if (t === st)
            return Cn(e),
                n;
        const r = yt(e),
            u = r.hasOwnProperty(t);
        let o = u ? r[t]() : e[t];
        if (t === Be || t === "__proto__")
            return o;
        if (!u) {
            const i = Object.getOwnPropertyDescriptor(e, t);
            an() && (typeof o != "function" || e.hasOwnProperty(t)) && !(i && i.get) && (o = ht(r, t, o)())
        }
        return ce(o) ? bn(o) : o
    },
    has(e, t) {
        return t === dt || t === fe || t === st || t === Be || t === "__proto__" ? !0 : (this.get(e, t, e),
            t in e)
    },
    set() {
        return !0
    },
    deleteProperty() {
        return !0
    },
    ownKeys: Tr,
    getOwnPropertyDescriptor: zr
};

function W(e, t, n, r = !1) {
    if (!r && e[t] === n)
        return;
    const u = e[t],
        o = e.length;
    n === void 0 ? delete e[t] : e[t] = n;
    let i = yt(e),
        l;
    (l = ht(i, t, u)) && l.$(() => n),
        Array.isArray(e) && e.length !== o && (l = ht(i, "length", o)) && l.$(e.length),
        (l = i._) && l.$()
}

function yn(e, t) {
    const n = Object.keys(t);
    for (let r = 0; r < n.length; r += 1) {
        const u = n[r];
        W(e, u, t[u])
    }
}

function Or(e, t) {
    if (typeof t == "function" && (t = t(e)),
        t = _e(t),
        Array.isArray(t)) {
        if (e === t)
            return;
        let n = 0,
            r = t.length;
        for (; n < r; n++) {
            const u = t[n];
            e[n] !== u && W(e, n, u)
        }
        W(e, "length", r)
    } else
        yn(e, t)
}

function Fe(e, t, n = []) {
    let r, u = e;
    if (t.length > 1) {
        r = t.shift();
        const i = typeof r,
            l = Array.isArray(e);
        if (Array.isArray(r)) {
            for (let c = 0; c < r.length; c++)
                Fe(e, [r[c]].concat(t), n);
            return
        } else if (l && i === "function") {
            for (let c = 0; c < e.length; c++)
                r(e[c], c) && Fe(e, [c].concat(t), n);
            return
        } else if (l && i === "object") {
            const {
                from: c = 0,
                to: s = e.length - 1,
                by: d = 1
            } = r;
            for (let f = c; f <= s; f += d)
                Fe(e, [f].concat(t), n);
            return
        } else if (t.length > 1) {
            Fe(e[r], t, [r].concat(n));
            return
        }
        u = e[r],
            n = [r].concat(n)
    }
    let o = t[0];
    typeof o == "function" && (o = o(u, n),
        o === u) || r === void 0 && o == null || (o = _e(o),
        r === void 0 || ce(u) && ce(o) && !Array.isArray(o) ? yn(u, o) : W(e, r, o))
}

function Se(...[e, t]) {
    const n = _e(e || {}),
        r = Array.isArray(n),
        u = bn(n);

    function o(...i) {
        dr(() => {
            r && i.length === 1 ? Or(n, i[0]) : Fe(n, i)
        })
    }
    return [u, o]
}
const ft = Symbol("store-root");

function be(e, t, n, r, u) {
    const o = t[n];
    if (e === o)
        return;
    if (!ce(e) || !ce(o) || u && e[u] !== o[u]) {
        if (e !== o) {
            if (n === ft)
                return e;
            W(t, n, e)
        }
        return
    }
    if (Array.isArray(e)) {
        if (e.length && o.length && (!r || u && e[0][u] != null)) {
            let c, s, d, f, p, _, C, y;
            for (d = 0,
                f = Math.min(o.length, e.length); d < f && (o[d] === e[d] || u && o[d][u] === e[d][u]); d++)
                be(e[d], o, d, r, u);
            const F = new Array(e.length),
                k = new Map;
            for (f = o.length - 1,
                p = e.length - 1; f >= d && p >= d && (o[f] === e[p] || u && o[f][u] === e[p][u]); f--,
                p--)
                F[p] = o[f];
            if (d > p || d > f) {
                for (s = d; s <= p; s++)
                    W(o, s, e[s]);
                for (; s < e.length; s++)
                    W(o, s, F[s]),
                    be(e[s], o, s, r, u);
                o.length > e.length && W(o, "length", e.length);
                return
            }
            for (C = new Array(p + 1),
                s = p; s >= d; s--)
                _ = e[s],
                y = u ? _[u] : _,
                c = k.get(y),
                C[s] = c === void 0 ? -1 : c,
                k.set(y, s);
            for (c = d; c <= f; c++)
                _ = o[c],
                y = u ? _[u] : _,
                s = k.get(y),
                s !== void 0 && s !== -1 && (F[s] = o[c],
                    s = C[s],
                    k.set(y, s));
            for (s = d; s < e.length; s++)
                s in F ? (W(o, s, F[s]),
                    be(e[s], o, s, r, u)) : W(o, s, e[s])
        } else
            for (let c = 0, s = e.length; c < s; c++)
                be(e[c], o, c, r, u);
        o.length > e.length && W(o, "length", e.length);
        return
    }
    const i = Object.keys(e);
    for (let c = 0, s = i.length; c < s; c++)
        be(e[i[c]], o, i[c], r, u);
    const l = Object.keys(o);
    for (let c = 0, s = l.length; c < s; c++)
        e[l[c]] === void 0 && W(o, l[c], void 0)
}

function Rr(e, t = {}) {
    const {
        merge: n,
        key: r = "id"
    } = t, u = _e(e);
    return o => {
        if (!ce(o) || !ce(u))
            return u;
        const i = be(u, {
            [ft]: o
        }, ft, n, r);
        return i === void 0 ? o : i
    }
}

function vn(e, t) {
    return fetch("/backend/" + e, t)
}
class vt {
    constructor() {
        m(this, "abortController", null)
    }
    abort() {
        this.abortController && (this.abortController.abort(),
            this.abortController = null)
    }
    get(t) {
        this.abort();
        try {
            this.abortController = new AbortController
        } catch (n) {}
        return new Promise(async (n, r) => {
            var u;
            try {
                const o = await vn(t, {
                    signal: (u = this.abortController) == null ? void 0 : u.signal
                });
                n(await o.json())
            } catch (o) {
                (o == null ? void 0 : o.name) !== "AbortError" && r(o)
            }
        })
    }
}

function Vr(e) {
    return e && e.colors ? e.colors : "red-green"
}
let jr = Date.now();

function wn() {
    return `${jr++}`
}

function ae(e, t) {
    return {
        id: wn(),
        name: "",
        color: "performance",
        content: "performance",
        size: t,
        period: e
    }
}

function Wr(e) {
    if (e && e.configurations2 && e.configurations2.length > 0) {
        const t = e.configurations2;
        for (const n of t)
            n.period === "min1" && (n.period = "min5");
        return t
    } else
        return [ae("hour", "performance"), ae("day", "performance"), ae("week", "performance"), ae("month", "performance"), ae("year", "performance"), ae("week", "marketcap")]
}

function Hr(e) {
    return e && e.currencyFilter && e.currencyFilter.type ? e.currencyFilter : {
        type: "slice",
        from: 1,
        to: 100
    }
}
const $n = {
        id: "en",
        flag: "\u{1F1FA}\u{1F1F8}",
        name: "English",
        loading: "Content is loading...",
        currencyName: "Name",
        settings: "Settings",
        currency: "Currency",
        language: "Language",
        colors: "Colors",
        red_green: "Red + Green",
        yellow_blue: "Yellow + Blue",
        rank: "Rank",
        marketcap: "Market Cap",
        volume: "24h Volume",
        price: "Price",
        dominance: "Dominance",
        performance: "Performance",
        neutral: "Neutral",
        period_hour: "Hour",
        period_day: "Day",
        period_week: "Week",
        period_month: "Month",
        period_year: "Year",
        favorites: "Favorites",
        add_favorite: "Add to favorites",
        remove_favorite: "Remove from favorites",
        search_crypto: "Search cryptocurrency",
        bubble_size: "Bubble size",
        bubble_content: "Bubble content",
        bubble_color: "Bubble color",
        period: "Period",
        description: "Interactive bubble chart for the TOP 1000 cryptocurrencies",
        support_my_work: "Support my work",
        window_close: "Close window",
        window_toggleExpand: "Toggle expansion",
        configuration_add: "Add chart",
        configuration_edit: "Edit chart",
        copy: "Copy",
        not_found: "Not found in the TOP 1000",
        scroll_toast: "Search + List",
        links: "Links",
        exchanges: "Exchanges",
        pages: "Pages",
        empty_list: 'List "(name)" is empty',
        delete: "Delete",
        lists: "Lists",
        show: "Show",
        hide: "Hide",
        watchlist_add: "Add Watchlist",
        add_to_list: "Add to List",
        blocklist: "Blocklist",
        watchlist: "Watchlist",
        watchlists: "Watchlists",
        cancel: "Cancel",
        confirm: "Confirm",
        trade: "Trade",
        cmc_tooltip: "View (currency) on CoinMarketCap",
        trade_tooltip: "Trade (currency) on (exchange)",
        show_more: "Show More"
    },
    Ur = {
        id: "de",
        flag: "\u{1F1E9}\u{1F1EA}",
        name: "Deutsch",
        loading: "Inhalte werden geladen...",
        currencyName: "Name",
        settings: "Einstellungen",
        currency: "W\xE4hrung",
        language: "Sprache",
        colors: "Farben",
        red_green: "Rot + Gr\xFCn",
        yellow_blue: "Gelb + Blau",
        rank: "Rang",
        marketcap: "Marktkap.",
        volume: "Tagesvolumen",
        price: "Kurs",
        dominance: "Dominanz",
        performance: "Performance",
        neutral: "Neutral",
        period_hour: "Stunde",
        period_day: "Tag",
        period_week: "Woche",
        period_month: "Monat",
        period_year: "Jahr",
        favorites: "Favoriten",
        add_favorite: "Zu Favoriten hinzuf\xFCgen",
        remove_favorite: "Von Favoriten entfernen",
        search_crypto: "Kryptow\xE4hrung suchen",
        bubble_size: "Bubble Gr\xF6\xDFe",
        bubble_content: "Bubble Inhalt",
        bubble_color: "Bubble Farbe",
        period: "Zeitraum",
        description: "Interaktiver Bubblechart f\xFCr die TOP 1000 Kryptow\xE4hrungen",
        support_my_work: "Unterst\xFCtze mein Projekt",
        window_close: "Dialog schlie\xDFen",
        window_toggleExpand: "Dialog auf/zuklappen",
        configuration_add: "Chart hinzuf\xFCgen",
        configuration_edit: "Chart bearbeiten",
        copy: "Kopieren",
        not_found: "Nicht in den TOP 1000 gefunden",
        scroll_toast: "Suche + Liste",
        links: "Links",
        exchanges: "B\xF6rsen",
        pages: "Seiten",
        empty_list: 'Liste "(name)" ist leer',
        delete: "L\xF6schen",
        lists: "Listen",
        show: "Anzeigen",
        hide: "Ausblenden",
        watchlist_add: "Merkliste hinzuf\xFCgen",
        add_to_list: "Zu einer Liste hinzuf\xFCgen",
        blocklist: "Blockierliste",
        watchlist: "Merkliste",
        watchlists: "Merklisten",
        cancel: "Abbrechen",
        confirm: "Best\xE4tigen",
        trade: "Handeln",
        cmc_tooltip: "(currency) auf CoinMarketCap anschauen",
        trade_tooltip: "(currency) auf (exchange) handeln",
        show_more: "Mehr anzeigen"
    },
    Xr = {
        id: "pl",
        flag: "\u{1F1F5}\u{1F1F1}",
        name: "Polski",
        loading: "Zawarto\u015B\u0107 \u0142aduje si\u0119...",
        currencyName: "Nazwa",
        settings: "Ustawienia",
        currency: "Waluta",
        language: "J\u0119zyki",
        colors: "Kolory",
        red_green: "Czerwony + Zielony",
        yellow_blue: "\u017B\xF3\u0142ty + Niebieski",
        rank: "Miejsce",
        marketcap: "Kapitalizacja",
        volume: "Wolumen",
        price: "Cena",
        dominance: "Udzia\u0142 w rynku",
        performance: "Wydajno\u015B\u0107",
        neutral: "Neutralny",
        period_hour: "Godzina",
        period_day: "Dzie\u0144",
        period_week: "Tydzie\u0144",
        period_month: "Miesi\u0105c",
        period_year: "Rok",
        favorites: "Ulubione",
        add_favorite: "Dodaj do ulubionych",
        remove_favorite: "Usu\u0144 z ulubionych",
        search_crypto: "Szukaj kryptowalut",
        bubble_size: "Rozmiar b\u0105belka",
        bubble_content: "Zawarto\u015B\u0107 b\u0105belka",
        bubble_color: "Kolor b\u0105belka",
        period: "Okres",
        description: "Interaktywny wykres b\u0105belkowy dla TOP 1000 kryptowalut",
        support_my_work: "Wesprzyj moj\u0105 prac\u0119",
        window_close: "Zamknij okno",
        window_toggleExpand: "Rozszerzenie Toogle",
        configuration_add: "Dodaj wykres",
        configuration_edit: "Edytuj wykres",
        copy: "Kopia",
        not_found: "Nie znalaz\u0142 si\u0119 w TOP 1000",
        scroll_toast: "Szukaj + Lista",
        links: "Linki",
        exchanges: "Gie\u0142dy",
        pages: "Strony",
        empty_list: 'Lista "(name)" jest pusta',
        delete: "Usu\u0144",
        lists: "Listy",
        show: "Poka\u017C",
        hide: "Ukryj",
        watchlist_add: "Dodaj do obserwowanych",
        add_to_list: "Dodaj do listy",
        blocklist: "Lista blokowanych",
        watchlist: "Lista obserwowanych",
        watchlists: "Listy obserwowanych",
        cancel: "Anuluj",
        confirm: "Potwierd\u017A",
        trade: "Handel",
        cmc_tooltip: "Zobacz (currency) na CoinMarketCap",
        trade_tooltip: "Handluj (currency) na (exchange)",
        show_more: "Poka\u017C wi\u0119cej"
    },
    qr = {
        id: "pt",
        flag: "\u{1F1F5}\u{1F1F9}",
        name: "Portugues",
        loading: "O conte\xFAdo est\xE1 carregando...",
        currencyName: "Nome",
        settings: "Configura\xE7\xF5es",
        currency: "Moeda",
        language: "Idioma",
        colors: "Cores",
        red_green: "Vermelho + Verde",
        yellow_blue: "Amarelo + Azul",
        rank: "Posi\xE7\xE3o",
        marketcap: "Cap de Mercado",
        volume: "Volume em 24h",
        price: "Valor",
        dominance: "Domina\xE7\xE3o",
        performance: "Desempenho",
        neutral: "Neutra",
        period_hour: "Hora",
        period_day: "Dia",
        period_week: "Semana",
        period_month: "M\xEAs",
        period_year: "Ano",
        favorites: "Favoritos",
        add_favorite: "Adicionar aos Favoritos",
        remove_favorite: "Remover dos Favoritos",
        search_crypto: "Pesquisar Criptomoeda",
        bubble_size: "Tamanho da bolha",
        bubble_content: "Conte\xFAdo de bolha",
        bubble_color: "Cor da bolha",
        period: "Per\xEDodo",
        description: "Gr\xE1fico interativo para as 1000 principais criptomoedas",
        support_my_work: "Ap\xF3ie meu trabalho",
        window_close: "Fechar a janela",
        window_toggleExpand: "Alternar expans\xE3o",
        configuration_add: "Adicionar gr\xE1fico",
        configuration_edit: "Editar gr\xE1fico",
        copy: "C\xF3piar",
        not_found: "N\xE3o encontrado no TOP 1000",
        scroll_toast: "Pesquisa + Lista",
        links: "Liga\xE7\xF5es",
        exchanges: "Bolsas",
        pages: "P\xE1ginas",
        empty_list: 'Lista "(name)" vazia',
        delete: "Excluir",
        lists: "Listas",
        show: "Mostrar",
        hide: "Ocultar",
        watchlist_add: "Adicionar \xE0 lista de observa\xE7\xE3o",
        add_to_list: "Adicionar \xE0 lista",
        blocklist: "Lista de bloqueio",
        watchlist: "Lista de observa\xE7\xE3o",
        watchlists: "Listas de observa\xE7\xE3o",
        cancel: "Cancelar",
        confirm: "Confirmar",
        trade: "Negociar",
        cmc_tooltip: "Ver (currency) em CoinMarketCap",
        trade_tooltip: "Negociar (currency) em (exchange)",
        show_more: "Mostrar mais"
    },
    Yr = {
        id: "ru",
        flag: "\u{1F1F7}\u{1F1FA}",
        name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439",
        loading: "\u0421\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442\u0441\u044F...",
        currencyName: "\u0418\u043C\u044F",
        settings: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
        currency: "\u0412\u0430\u043B\u044E\u0442\u0430",
        language: "\u042F\u0437\u044B\u043A",
        colors: "\u0426\u0432\u0435\u0442\u0430",
        red_green: "\u041A\u0440\u0430\u0441\u043D\u044B\u0439 + \u0417\u0435\u043B\u0435\u043D\u044B\u0439",
        yellow_blue: "\u0416\u0435\u043B\u0442\u044B\u0439 + \u0441\u0438\u043D\u0438\u0439",
        rank: "\u0420\u0435\u0439\u0442\u0438\u043D\u0433",
        marketcap: "\u041E\u0431\u044A\u0451\u043C \u0440\u044B\u043D\u043A\u0430",
        volume: "24\u0447 \u041E\u0431\u044A\u0451\u043C",
        price: "\u0426\u0435\u043D\u0430",
        dominance: "\u0414\u043E\u043C\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435",
        performance: "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C",
        neutral: "\u041D\u0435\u0439\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439",
        period_hour: "\u0447\u0430\u0441",
        period_day: "\u0434\u0435\u043D\u044C",
        period_week: "\u043D\u0435\u0434\u0435\u043B\u044F",
        period_month: "\u043C\u0435\u0441\u044F\u0446",
        period_year: "\u0433\u043E\u0434",
        favorites: "\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435",
        add_favorite: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435",
        remove_favorite: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0438\u0437 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435",
        search_crypto: "\u041F\u043E\u0438\u0441\u043A \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u044B",
        bubble_size: "\u0440\u0430\u0437\u043C\u0435\u0440 \u043F\u0443\u0437\u044B\u0440\u044F",
        bubble_content: "\u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u043F\u0443\u0437\u044B\u0440\u044F",
        bubble_color: "\u0426\u0432\u0435\u0442 \u043F\u0443\u0437\u044B\u0440\u044F",
        period: "\u041F\u0435\u0440\u0438\u043E\u0434",
        description: "\u0418\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0433\u0440\u0430\u0444\u0438\u043A \u043F\u0443\u0437\u044B\u0440\u0435\u0439 \u0434\u043B\u044F \u0422\u041E\u041F-1000 \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442",
        support_my_work: "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0442\u0435 \u043C\u043E\u044E \u0440\u0430\u0431\u043E\u0442\u0443",
        window_close: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043E\u043A\u043D\u043E",
        window_toggleExpand: "\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u0438\u044F",
        configuration_add: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0433\u0440\u0430\u0444\u0438\u043A\u0430",
        configuration_edit: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0433\u0440\u0430\u0444\u0438\u043A\u0430",
        copy: "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
        not_found: "\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0432 \u0422\u041E\u041F-1000",
        scroll_toast: "\u041F\u043E\u0438\u0441\u043A + \u0421\u043F\u0438\u0441\u043E\u043A",
        links: "\u0421\u0441\u044B\u043B\u043A\u0438",
        exchanges: "\u0411\u0438\u0440\u0436\u0438",
        pages: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u044B",
        empty_list: '\u0421\u043F\u0438\u0441\u043E\u043A "(name)" \u043F\u0443\u0441\u0442',
        delete: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
        lists: "\u0421\u043F\u0438\u0441\u043A\u0438",
        show: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C",
        hide: "\u0421\u043A\u0440\u044B\u0442\u044C",
        watchlist_add: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u0441\u043F\u0438\u0441\u043E\u043A \u043D\u0430\u0431\u043B\u044E\u0434\u0435\u043D\u0438\u044F",
        add_to_list: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u0441\u043F\u0438\u0441\u043E\u043A",
        blocklist: "\u0421\u043F\u0438\u0441\u043E\u043A \u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043A\u0438",
        watchlist: "\u0421\u043F\u0438\u0441\u043E\u043A \u043D\u0430\u0431\u043B\u044E\u0434\u0435\u043D\u0438\u044F",
        watchlists: "\u0421\u043F\u0438\u0441\u043A\u0438 \u043D\u0430\u0431\u043B\u044E\u0434\u0435\u043D\u0438\u044F",
        cancel: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",
        confirm: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C",
        trade: "\u0422\u043E\u0440\u0433\u043E\u0432\u043B\u044F",
        cmc_tooltip: "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 (currency) \u043D\u0430 CoinMarketCap",
        trade_tooltip: "\u0422\u043E\u0440\u0433\u043E\u0432\u043B\u044F (currency) \u043D\u0430 (exchange)",
        show_more: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435"
    },
    Gr = {
        id: "es",
        flag: "\u{1F1EA}\u{1F1F8}",
        name: "Espa\xF1ol",
        loading: "Contenido est\xE1 cargando...",
        currencyName: "Nombre",
        settings: "Configuraci\xF3n",
        currency: "Moneda",
        language: "Idioma",
        colors: "Colores",
        red_green: "Rojo + Verde",
        yellow_blue: "Amarillo + Azul",
        rank: "Rango",
        marketcap: "Cap de Mercado",
        volume: "Volumen en 24h",
        price: "Valor",
        dominance: "Dominaci\xF3n",
        performance: "Rendimiento",
        neutral: "Neutral",
        period_hour: "Hora",
        period_day: "D\xEDa",
        period_week: "Semana",
        period_month: "Mes",
        period_year: "A\xF1o",
        favorites: "Favoritos",
        add_favorite: "Agregar a favoritos",
        remove_favorite: "Retirar de favoritos",
        search_crypto: "Busque Criptomoneda",
        bubble_size: "Tama\xF1o de Burbuja",
        bubble_content: "Contenido de Burbuja",
        bubble_color: "Color de Burbuja",
        period: "Per\xEDodo",
        description: "Gr\xE1fico interactivo para las principales 1000 criptomonedas",
        support_my_work: "Apoya mi trabajo",
        window_close: "Cerrar ventana",
        window_toggleExpand: "Alternar Expansi\xF3n",
        configuration_add: "Agregar gr\xE1fico",
        configuration_edit: "Editar gr\xE1fico",
        copy: "Copiar",
        not_found: "No se encuentra en el TOP 1000",
        scroll_toast: "B\xFAsqueda + Lista",
        links: "Enlaces",
        exchanges: "Bolsa",
        pages: "P\xE1ginas",
        empty_list: 'La lista "(name)" est\xE1 vac\xEDa',
        delete: "Eliminar",
        lists: "Listas",
        show: "Mostrar",
        hide: "Ocultar",
        watchlist_add: "A\xF1adir a lista de seguimiento",
        add_to_list: "A\xF1adir a lista",
        blocklist: "Lista de bloqueados",
        watchlist: "Lista de seguimiento",
        watchlists: "Listas de seguimiento",
        cancel: "Cancelar",
        confirm: "Confirmar",
        trade: "Negociar",
        cmc_tooltip: "Ver (currency) en CoinMarketCap",
        trade_tooltip: "Negociar (currency) en (exchange)",
        show_more: "Mostrar m\xE1s"
    },
    Kr = {
        id: "fr",
        flag: "\u{1F1EB}\u{1F1F7}",
        name: "Fran\xE7ais",
        loading: "Le contenu est en cours de chargement...",
        currencyName: "Nom",
        settings: "Param\xE8tres",
        currency: "Monnaie",
        language: "Langue",
        colors: "Couleurs",
        red_green: "Rouge + Vert",
        yellow_blue: "Jaune + Bleu",
        rank: "Rank",
        marketcap: "Capitalisation",
        volume: "24h Volume",
        price: "Prix",
        dominance: "Dominance",
        performance: "Performance",
        neutral: "Neutre",
        period_hour: "Heure",
        period_day: "Jour",
        period_week: "Semaine",
        period_month: "Mois",
        period_year: "Ann\xE9e",
        favorites: "Favoris",
        add_favorite: "Ajouter aux favoris",
        remove_favorite: "Retirer des favoris",
        search_crypto: "Rechercher crypto-monnaie",
        bubble_size: "Taille de la bulle",
        bubble_content: "Contenu de bulle",
        bubble_color: "Couleur de la bulle",
        period: "Periode",
        description: "Graphique \xE0 bulles interactif pour le TOP 1000 des crypto-monnaies",
        support_my_work: "Soutenez mon travail",
        window_close: "Fermer la fen\xEAtre",
        window_toggleExpand: "Basculer l'expansion",
        configuration_add: "Ajouter un graphique",
        configuration_edit: "Modifier le graphique",
        copy: "Copier",
        not_found: "Non trouv\xE9 dans le TOP 1000",
        scroll_toast: "Recherche + Liste",
        links: "Liens",
        exchanges: "Bourses",
        pages: "Pages",
        empty_list: 'La liste "(name)" est vide',
        delete: "Supprimer",
        lists: "Listes",
        show: "Afficher",
        hide: "Masquer",
        watchlist_add: "Ajouter \xE0 la liste de surveillance",
        add_to_list: "Ajouter \xE0 une liste",
        blocklist: "Liste noire",
        watchlist: "Liste de surveillance",
        watchlists: "Listes de surveillance",
        cancel: "Annuler",
        confirm: "Confirmer",
        trade: "Trader",
        cmc_tooltip: "Voir (currency) sur CoinMarketCap",
        trade_tooltip: "Trader (currency) sur (exchange)",
        show_more: "Afficher plus"
    },
    Zr = {
        id: "it",
        flag: "\u{1F1EE}\u{1F1F9}",
        name: "Italian",
        loading: "Caricamento in corso...",
        currencyName: "Nome",
        settings: "Impostazioni",
        currency: "Valuta",
        language: "Lingua",
        colors: "Colori",
        red_green: "Rosso + Verde",
        yellow_blue: "Giallo + Blu",
        rank: "Rank",
        marketcap: "Cap di mercato",
        volume: "Volume 24h",
        price: "Prezzo",
        dominance: "Dominance",
        performance: "Rendimento",
        neutral: "Neutrale",
        period_hour: "Ora",
        period_day: "Giorno",
        period_week: "Settimana",
        period_month: "Mese",
        period_year: "Anno",
        favorites: "Preferiti",
        add_favorite: "Aggiungi ai preferiti",
        remove_favorite: "Rimuovi dai preferiti",
        search_crypto: "Cerca criptovalute",
        bubble_size: "Grandezza bolla",
        bubble_content: "Contenuto bolla",
        bubble_color: "Colore bolla",
        period: "Periodo",
        description: "Grafico interattivo a bolle per le TOP 1000 criptovalute",
        support_my_work: "Supporta il mio lavoro",
        window_close: "Chiudi finestra",
        window_toggleExpand: "Espansione Toggle",
        configuration_add: "Aggiungi grafico",
        configuration_edit: "Modifica grafico",
        copy: "Copia",
        not_found: "Non si trova nella TOP 1000",
        scroll_toast: "Ricerca + Elenco",
        links: "Link",
        exchanges: "Borse",
        pages: "Pagine",
        empty_list: 'La lista "(name)" \xE8 vuota',
        delete: "Elimina",
        lists: "Liste",
        show: "Mostra",
        hide: "Nascondi",
        watchlist_add: "Aggiungi alla lista di osservazione",
        add_to_list: "Aggiungi a una lista",
        blocklist: "Lista di blocco",
        watchlist: "Lista di osservazione",
        watchlists: "Liste di osservazione",
        cancel: "Annulla",
        confirm: "Conferma",
        trade: "Commercio",
        cmc_tooltip: "Visualizza (currency) su CoinMarketCap",
        trade_tooltip: "Scambia (currency) su (exchange)",
        show_more: "Mostra di pi\xF9"
    },
    Jr = {
        id: "ja",
        flag: "\u{1F1EF}\u{1F1F5}",
        name: "\u65E5\u672C\u8A9E",
        loading: "\u30B3\u30F3\u30C6\u30F3\u30C4\u3092\u30ED\u30FC\u30C9\u4E2D\u2026",
        currencyName: "\u540D\u524D",
        settings: "\u8A2D\u5B9A",
        currency: "\u901A\u8CA8",
        language: "\u8A00\u8A9E",
        colors: "\u30AB\u30E9\u30FC",
        red_green: "\u8D64\uFF0B\u7DD1",
        yellow_blue: "\u9EC4\uFF0B\u9752",
        rank: "\u9806\u4F4D",
        marketcap: "\u6642\u4FA1\u7DCF\u984D",
        volume: "24h \u53D6\u5F15\u9AD8",
        price: "\u5024\u6BB5",
        dominance: "\u5360\u6709\u7387",
        performance: "\u5909\u52D5\u7387",
        neutral: "\u7121\u5F69\u8272",
        period_hour: "\u6642\u9593",
        period_day: "\u65E5",
        period_week: "\u9031\u9593",
        period_month: "\u30F6\u6708",
        period_year: "\u5E74",
        favorites: "\u304A\u6C17\u306B\u5165\u308A",
        add_favorite: "\u304A\u6C17\u306B\u5165\u308A\u306B\u52A0\u3048\u308B",
        remove_favorite: "\u304A\u6C17\u306B\u5165\u308A\u304B\u3089\u9664\u304F",
        search_crypto: "\u6697\u53F7\u901A\u8CA8\u3092\u63A2\u3059",
        bubble_size: "\u30D0\u30D6\u30EB \u30B5\u30A4\u30BA",
        bubble_content: "\u30D0\u30D6\u30EB \u30B3\u30F3\u30C6\u30F3\u30C4",
        bubble_color: "\u30D0\u30D6\u30EB \u30AB\u30E9\u30FC",
        period: "\u671F\u9593",
        description: "\u30C8\u30C3\u30D71000\u4F4D\u306E\u6697\u53F7\u901A\u8CA8\u306B\u95A2\u3059\u308B\u30A4\u30F3\u30BF\u30E9\u30AF\u30C6\u30A3\u30D6\u30D0\u30D6\u30EB\u30C1\u30E3\u30FC\u30C8",
        support_my_work: "\u79C1\u306E\u4ED5\u4E8B\u3092\u652F\u63F4\u3059\u308B",
        window_close: "\u30A6\u30A3\u30F3\u30C9\u30A6\u3092\u9589\u3058\u308B",
        window_toggleExpand: "\u30C8\u30B0\u30EB \u62E1\u5F35",
        configuration_add: "\u30C1\u30E3\u30FC\u30C8\u306B\u52A0\u3048\u308B",
        configuration_edit: "\u30C1\u30E3\u30FC\u30C8\u3092\u7DE8\u96C6\u3059\u308B",
        copy: "\u30B3\u30D4\u30FC",
        not_found: "TOP1000\u306B\u5165\u3063\u3066\u3044\u306A\u3044",
        scroll_toast: "\u691C\u7D22\uFF0B\u30EA\u30B9\u30C8",
        links: "\u30EA\u30F3\u30AF",
        exchanges: "\u8A3C\u5238\u53D6\u5F15\u6240",
        pages: "\u30DA\u30FC\u30B8",
        empty_list: '\u30EA\u30B9\u30C8"(name)"\u306F\u7A7A\u3067\u3059',
        delete: "\u524A\u9664",
        lists: "\u30EA\u30B9\u30C8",
        show: "\u8868\u793A\u3059\u308B",
        hide: "\u975E\u8868\u793A\u306B\u3059\u308B",
        watchlist_add: "\u30A6\u30A9\u30C3\u30C1\u30EA\u30B9\u30C8\u306B\u8FFD\u52A0",
        add_to_list: "\u30EA\u30B9\u30C8\u306B\u8FFD\u52A0\u3059\u308B",
        blocklist: "\u30D6\u30ED\u30C3\u30AF\u30EA\u30B9\u30C8",
        watchlist: "\u30A6\u30A9\u30C3\u30C1\u30EA\u30B9\u30C8",
        watchlists: "\u30A6\u30A9\u30C3\u30C1\u30EA\u30B9\u30C8",
        cancel: "\u30AD\u30E3\u30F3\u30BB\u30EB",
        confirm: "\u78BA\u8A8D",
        trade: "\u53D6\u5F15\u3059\u308B",
        cmc_tooltip: "CoinMarketCap\u3067(currency)\u3092\u898B\u308B",
        trade_tooltip: "(exchange)\u3067(currency)\u3092\u53D6\u5F15\u3059\u308B",
        show_more: "\u3082\u3063\u3068\u898B\u308B"
    },
    Qr = {
        id: "nl",
        flag: "\u{1F1F3}\u{1F1F1}",
        name: "Nederlands",
        loading: "Inhoud wordt geladen...",
        currencyName: "Naam",
        settings: "Instellingen",
        currency: "Valuta",
        language: "Taal",
        colors: "Kleuren",
        red_green: "Rood + Groen",
        yellow_blue: "Geel + Blauw",
        rank: "Rang",
        marketcap: "Marktkapitalisatie",
        volume: "24h Volume",
        price: "Prijs",
        dominance: "Dominantie",
        performance: "Prestatie",
        neutral: "Neutraal",
        period_hour: "Uur",
        period_day: "Dag",
        period_week: "Week",
        period_month: "Maand",
        period_year: "Jaar",
        favorites: "Favorieten",
        add_favorite: "Toevoegen aan favorieten",
        remove_favorite: "Verwijderen uit favorieten",
        search_crypto: "Zoek cryptocurrencies",
        bubble_size: "Bubble grote",
        bubble_content: "Bubble inhoud",
        bubble_color: "Bubble kleur",
        period: "Periode",
        description: "Interactieve bubble chart TOP 1000 cryptocurrencies",
        support_my_work: "Ondersteun mijn werk",
        window_close: "Sluit venster",
        window_toggleExpand: "Meer/minder informatie",
        configuration_add: "Overzicht toevoegen",
        configuration_edit: "Overzicht bewerken",
        copy: "Kopi\xEBren",
        not_found: "Niet gevonden in de TOP 1000",
        scroll_toast: "Zoeken + Lijst",
        links: "Links",
        exchanges: "Beurzen",
        pages: "Pagina's",
        empty_list: 'Lijst "(name)" is leeg',
        delete: "Verwijderen",
        lists: "Lijsten",
        show: "Tonen",
        hide: "Verbergen",
        watchlist_add: "Toevoegen aan watchlist",
        add_to_list: "Toevoegen aan lijst",
        blocklist: "Blocklist",
        watchlist: "Watchlist",
        watchlists: "Watchlists",
        cancel: "Annuleren",
        confirm: "Bevestigen",
        trade: "Handelen",
        cmc_tooltip: "(currency) op CoinMarketCap bekijken",
        trade_tooltip: "(currency) op (exchange) handelen",
        show_more: "Meer tonen"
    },
    eu = {
        id: "fa",
        flag: "\u{1F1EE}\u{1F1F7}",
        name: "\u0641\u0627\u0631\u0633\u06CC",
        loading: "...\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u06CC\u0631\u06CC \u0645\u062D\u062A\u0648\u0627",
        currencyName: "\u0631\u0645\u0632\u0627\u0631\u0632",
        settings: "\u062A\u0646\u0638\u06CC\u0645\u0627\u062A",
        currency: "\u0648\u0627\u062D\u062F \u067E\u0648\u0644",
        language: "\u0632\u0628\u0627\u0646",
        colors: "\u0631\u0646\u06AF\u0647\u0627",
        red_green: "\u0642\u0631\u0645\u0632 + \u0633\u0628\u0632",
        yellow_blue: "\u0632\u0631\u062F + \u0622\u0628\u06CC",
        rank: "\u0631\u062A\u0628\u0647 \u0628\u0646\u062F\u06CC",
        marketcap: "\u0633\u0631\u0645\u0627\u06CC\u0647 \u0628\u0627\u0632\u0627\u0631",
        volume: "\u062D\u062C\u0645 \u0631\u0648\u0632\u0627\u0646\u0647",
        price: "\u0642\u06CC\u0645\u062A",
        dominance: "\u062A\u0633\u0644\u0637",
        performance: "\u067E\u0631\u0641\u0648\u0631\u0645\u0646\u0633",
        neutral: "\u062E\u0646\u062B\u06CC",
        period_hour: "\u0633\u0627\u0639\u062A",
        period_day: "\u0631\u0648\u0632",
        period_week: "\u0647\u0641\u062A\u0647",
        period_month: "\u0645\u0627\u0647",
        period_year: "\u0633\u0627\u0644",
        favorites: "\u0639\u0644\u0627\u0642\u0647 \u0645\u0646\u062F\u06CC \u0647\u0627",
        add_favorite: "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0639\u0644\u0627\u0642\u0647 \u0645\u0646\u062F\u06CC \u0647\u0627",
        remove_favorite: "\u0627\u0632 \u0639\u0644\u0627\u0642\u0647 \u0645\u0646\u062F\u06CC \u0647\u0627 \u062D\u0630\u0641 \u0634\u0648\u062F",
        search_crypto: "\u0631\u0645\u0632 \u0627\u0631\u0632 \u0631\u0627 \u062C\u0633\u062A\u062C\u0648 \u06A9\u0646\u06CC\u062F",
        bubble_size: "\u0627\u0646\u062F\u0627\u0632\u0647 \u062D\u0628\u0627\u0628",
        bubble_content: "\u0645\u062D\u062A\u0648\u0627\u06CC \u062D\u0628\u0627\u0628",
        bubble_color: "\u0631\u0646\u06AF \u062D\u0628\u0627\u0628",
        period: "\u0628\u0627\u0632\u0647 \u0632\u0645\u0627\u0646\u06CC",
        description: "\u0646\u0645\u0648\u062F\u0627\u0631 \u062D\u0628\u0627\u0628\u06CC \u062A\u0639\u0627\u0645\u0644\u06CC \u0628\u0631\u0627\u06CC \u06F5\u06F0\u06F0 \u0631\u0645\u0632 \u0627\u0631\u0632\u0647\u0627\u06CC \u0628\u0631\u062A\u0631",
        support_my_work: "\u0627\u0632 \u067E\u0631\u0648\u0698\u0647 \u0645\u0646 \u062D\u0645\u0627\u06CC\u062A \u06A9\u0646\u06CC\u062F",
        window_close: "\u0628\u0633\u062A\u0646 \u067E\u0646\u062C\u0631\u0647",
        window_toggleExpand: "\u067E\u0646\u062C\u0631\u0647 \u0631\u0627 \u0628\u0627\u0632 / \u0628\u0633\u062A\u0647 \u06A9\u0646\u06CC\u062F",
        configuration_add: "\u0646\u0645\u0648\u062F\u0627\u0631 \u0627\u0636\u0627\u0641\u0647 \u06A9\u0646\u06CC\u062F",
        configuration_edit: "\u0646\u0645\u0648\u062F\u0627\u0631 \u0631\u0627 \u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0646\u06CC\u062F",
        copy: "\u06A9\u067E\u06CC",
        not_found: "\u062F\u0631 TOP 1000 \u06CC\u0627\u0641\u062A \u0646\u0634\u062F",
        scroll_toast: "\u062C\u0633\u062A\u062C\u0648 + \u0644\u06CC\u0633\u062A",
        links: "\u067E\u06CC\u0648\u0646\u062F\u0647\u0627",
        exchanges: "\u0645\u0628\u0627\u062F\u0644\u0627\u062A",
        pages: "\u0635\u0641\u062D\u0627\u062A",
        empty_list: '\u0644\u06CC\u0633\u062A "(name)" \u062E\u0627\u0644\u06CC \u0627\u0633\u062A',
        delete: "\u062D\u0630\u0641",
        lists: "\u0644\u06CC\u0633\u062A \u0647\u0627",
        show: "\u0646\u0645\u0627\u06CC\u0634",
        hide: "\u0645\u062E\u0641\u06CC \u06A9\u0631\u062F\u0646",
        watchlist_add: "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0644\u06CC\u0633\u062A \u0646\u0638\u0627\u0631\u062A",
        add_to_list: "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0644\u06CC\u0633\u062A",
        blocklist: "\u0644\u06CC\u0633\u062A \u0645\u0633\u062F\u0648\u062F",
        watchlist: "\u0644\u06CC\u0633\u062A \u0646\u0638\u0627\u0631\u062A",
        watchlists: "\u0644\u06CC\u0633\u062A \u0647\u0627\u06CC \u0646\u0638\u0627\u0631\u062A\u06CC",
        cancel: "\u0644\u063A\u0648",
        confirm: "\u062A\u0623\u06CC\u06CC\u062F",
        trade: "\u0645\u0639\u0627\u0645\u0644\u0647",
        cmc_tooltip: "(currency) \u0631\u0627 \u062F\u0631 CoinMarketCap \u0645\u0634\u0627\u0647\u062F\u0647 \u06A9\u0646\u06CC\u062F",
        trade_tooltip: "(currency) \u0631\u0627 \u062F\u0631 (exchange) \u0645\u0639\u0627\u0645\u0644\u0647 \u06A9\u0646\u06CC\u062F",
        show_more: "\u0646\u0645\u0627\u06CC\u0634 \u0628\u06CC\u0634\u062A\u0631"
    },
    tu = {
        id: "tr",
        flag: "\u{1F1F9}\u{1F1F7}",
        name: "T\xFCrk\xE7e",
        loading: "\u0130\xE7erik y\xFCkleniyor...",
        currencyName: "\u0130sim",
        settings: "Ayarlar",
        currency: "Para birimi",
        language: "Dil",
        colors: "Renkler",
        red_green: "K\u0131rm\u0131z\u0131 + Ye\u015Fil",
        yellow_blue: "Sar\u0131 + Mavi",
        rank: "S\u0131ralama",
        marketcap: "Piyasa De\u011Feri",
        volume: "24s Hacim",
        price: "De\u011Fer",
        dominance: "Pazar Hakimiyeti",
        performance: "Performans",
        neutral: "N\xF6tr",
        period_hour: "Saat",
        period_day: "G\xFCn",
        period_week: "Hafta",
        period_month: "Ay",
        period_year: "Y\u0131l",
        favorites: "Favoriler",
        add_favorite: "Favorilere ekle",
        remove_favorite: "Favorilerden \xE7\u0131kar",
        search_crypto: "Kriptopara ara",
        bubble_size: "Baloncuk boyutu",
        bubble_content: "Baloncuk i\xE7eri\u011Fi",
        bubble_color: "Baloncuk rengi",
        period: "D\xF6nem",
        description: "\u0130LK 1000 kripto para birimi i\xE7in etkile\u015Fimli balon grafi\u011Fi",
        support_my_work: "\xC7al\u0131\u015Fmalar\u0131m\u0131z\u0131 destekleyin",
        window_close: "Pencereyi kapat",
        window_toggleExpand: "Ge\xE7i\u015F geni\u015Flet",
        configuration_add: "Grafik ekle",
        configuration_edit: "Grafik d\xFCzenle",
        copy: "Kopya",
        not_found: "\u0130lk 1000'de bulunamad\u0131",
        scroll_toast: "Arama + Liste",
        links: "Ba\u011Flant\u0131lar",
        exchanges: "Takaslar",
        pages: "Sayfalar",
        empty_list: '"(name)" listesi bo\u015F',
        delete: "Sil",
        lists: "Listeler",
        show: "G\xF6ster",
        hide: "Gizle",
        watchlist_add: "\u0130zleme listesine ekle",
        add_to_list: "Listeye ekle",
        blocklist: "Engelleme listesi",
        watchlist: "\u0130zleme listesi",
        watchlists: "\u0130zleme listeleri",
        cancel: "\u0130ptal",
        confirm: "Onayla",
        trade: "\u0130\u015Flem yap",
        cmc_tooltip: "(currency) i\xE7in CoinMarketCap'te g\xF6r\xFCnt\xFCle",
        trade_tooltip: "(currency) i\xE7in (exchange) borsas\u0131nda i\u015Flem yap",
        show_more: "Daha fazla g\xF6ster"
    },
    nu = {
        id: "ar",
        flag: "\u{1F1F8}\u{1F1E6}",
        name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
        loading: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649...",
        currencyName: "\u0623\u0633\u0645",
        settings: "\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A",
        currency: "\u0639\u0645\u0644\u0629",
        language: "\u0644\u063A\u0629",
        colors: "\u0627\u0644\u0623\u0644\u0648\u0627\u0646",
        red_green: "\u0623\u062D\u0645\u0631 + \u0623\u062E\u0636\u0631",
        yellow_blue: "\u0623\u0635\u0641\u0631 + \u0623\u0632\u0631\u0642",
        rank: "\u0627\u0644\u0631\u062A\u0628\u0629",
        marketcap: "\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0633\u0648\u0642\u064A\u0629",
        volume: "\u0627\u0644\u062D\u062C\u0645 \u063324",
        price: "\u0627\u0644\u0633\u0639\u0631",
        dominance: "\u0627\u0644\u0647\u064A\u0645\u0646\u0629",
        performance: "\u0627\u0644\u0627\u062F\u0627\u0621",
        neutral: "\u0637\u0628\u064A\u0639\u064A",
        period_hour: "\u0633\u0627\u0639\u0629",
        period_day: "\u064A\u0648\u0645",
        period_week: "\u0623\u0633\u0628\u0648\u0639",
        period_month: "\u0634\u0647\u0631",
        period_year: "\u0633\u0646\u0629",
        favorites: "\u0627\u0644\u0645\u0641\u0636\u0644\u0629",
        add_favorite: "\u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u0641\u0636\u0644\u0629",
        remove_favorite: "\u062D\u0630\u0641 \u0645\u0646 \u0627\u0644\u0645\u0641\u0636\u0644\u0629",
        search_crypto: "\u0627\u0644\u0628\u062D\u062B \u0639\u0646 \u0627\u0644\u0639\u0645\u0644\u0629 \u0627\u0644\u0631\u0642\u0645\u064A\u0629",
        bubble_size: "\u062D\u062C\u0645 \u0627\u0644\u0641\u0642\u0627\u0639\u0629",
        bubble_content: "\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0641\u0642\u0627\u0639\u0629",
        bubble_color: "\u0644\u0648\u0646 \u0627\u0644\u0641\u0642\u0627\u0639\u0629",
        period: "\u0627\u0644\u0648\u0642\u062A",
        description: "\u0623\u0643\u062B\u0631 1000 \u0641\u0642\u0627\u0639\u0629 \u0646\u0634\u0637\u0629",
        support_my_work: "\u0644\u062F\u0639\u0645 \u0627\u0644\u0645\u0634\u0631\u0648\u0639",
        window_close: "\u0644\u0648\u0646 \u0627\u0644\u0646\u0627\u0641\u0630\u0629",
        window_toggleExpand: "\u062A\u0642\u0644\u064A\u0635 \u0627\u0644\u062A\u0648\u0633\u0639",
        configuration_add: "\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u0644\u0629",
        configuration_edit: "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0633\u0644\u0629",
        copy: "\u0646\u0633\u062E",
        not_found: "\u0644\u064A\u0633 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0627\u0641\u0636\u0644 1000 \u0639\u0645\u0644\u0629",
        scroll_toast: "\u0627\u0644\u0628\u062D\u062B + \u0642\u0627\u0626\u0645\u0629",
        links: "\u0627\u0644\u0631\u0648\u0627\u0628\u0637",
        exchanges: "\u0627\u0644\u062A\u0628\u0627\u062F\u0644\u0627\u062A",
        pages: "\u0627\u0644\u0635\u0641\u062D\u0627\u062A",
        empty_list: '\u0627\u0644\u0642\u0627\u0626\u0645\u0629 "(name)" \u0641\u0627\u0631\u063A\u0629',
        delete: "\u062D\u0630\u0641",
        lists: "\u0642\u0648\u0627\u0626\u0645",
        show: "\u0639\u0631\u0636",
        hide: "\u0625\u062E\u0641\u0627\u0621",
        watchlist_add: "\u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0631\u0627\u0642\u0628\u0629",
        add_to_list: "\u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0642\u0627\u0626\u0645\u0629",
        blocklist: "\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0638\u0631",
        watchlist: "\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0631\u0627\u0642\u0628\u0629",
        watchlists: "\u0642\u0648\u0627\u0626\u0645 \u0627\u0644\u0645\u0631\u0627\u0642\u0628\u0629",
        cancel: "\u0625\u0644\u063A\u0627\u0621",
        confirm: "\u062A\u0623\u0643\u064A\u062F",
        trade: "\u062A\u062F\u0627\u0648\u0644",
        cmc_tooltip: "\u0639\u0631\u0636 (currency) \u0639\u0644\u0649 CoinMarketCap",
        trade_tooltip: "\u062A\u062F\u0627\u0648\u0644 (currency) \u0639\u0644\u0649 (exchange)",
        show_more: "\u0639\u0631\u0636 \u0627\u0644\u0645\u0632\u064A\u062F"
    },
    ru = {
        id: "cn",
        flag: "\u{1F1E8}\u{1F1F3}",
        name: "\u7B80\u4F53\u4E2D\u6587",
        loading: "\u5185\u5BB9\u6B63\u5728\u52A0\u8F7D...",
        currencyName: "\u8D27\u5E01\u540D\u79F0",
        settings: "\u8BBE\u7F6E",
        currency: "\u8D27\u5E01",
        language: "\u8BED\u8A00",
        colors: "\u989C\u8272",
        red_green: "\u7EA2+\u7EFF",
        yellow_blue: "\u9EC4\u8272+\u84DD\u8272",
        rank: "\u6392\u540D",
        marketcap: "\u5E02\u503C",
        volume: "24\u5C0F\u65F6\u6210\u4EA4\u91CF",
        price: "\u4EF7\u683C",
        dominance: "\u652F\u914D\u5730\u4F4D",
        performance: "\u6027\u80FD",
        neutral: "\u4E2D\u6027",
        period_hour: "\u5C0F\u65F6",
        period_day: "\u5929",
        period_week: "\u5468",
        period_month: "\u6708",
        period_year: "\u5E74",
        favorites: "\u6536\u85CF\u5939",
        add_favorite: "\u6DFB\u52A0\u5230\u6536\u85CF\u5939",
        remove_favorite: "\u4ECE\u6536\u85CF\u4E2D\u5220\u9664",
        search_crypto: "\u641C\u7D22\u52A0\u5BC6\u8D27\u5E01",
        bubble_size: "\u6C14\u6CE1\u5927\u5C0F",
        bubble_content: "\u6C14\u6CE1\u5185\u5BB9",
        bubble_color: "\u6C14\u6CE1\u989C\u8272",
        period: "\u671F\u95F4",
        description: "TOP1000\u52A0\u5BC6\u8D27\u5E01\u7684\u4EA4\u4E92\u5F0F\u6C14\u6CE1\u56FE",
        support_my_work: "\u652F\u6301\u6211\u7684\u5DE5\u4F5C",
        window_close: "\u5173\u95ED\u7A97\u53E3",
        window_toggleExpand: "\u5207\u6362\u6269\u5C55",
        configuration_add: "\u6DFB\u52A0\u56FE\u8868",
        configuration_edit: "\u7F16\u8F91\u56FE\u8868",
        copy: "\u590D\u5236",
        not_found: "\u5728 TOP 1000 \u4E2D\u627E\u4E0D\u5230",
        scroll_toast: "\u641C\u7D22+\u5217\u8868",
        links: "\u94FE\u63A5",
        exchanges: "\u4EA4\u6D41",
        pages: "\u9875\u9762",
        empty_list: "\u6E05\u5355\u201C(name)\u201D\u4E3A\u7A7A",
        delete: "\u5220\u9664",
        lists: "\u5217\u8868",
        show: "\u663E\u793A",
        hide: "\u9690\u85CF",
        watchlist_add: "\u6DFB\u52A0\u76D1\u89C6\u5217\u8868",
        add_to_list: "\u6DFB\u52A0\u5230\u5217\u8868",
        blocklist: "\u5C4F\u853D\u5217\u8868",
        watchlist: "\u76D1\u89C6\u5217\u8868",
        watchlists: "\u76D1\u89C6\u5217\u8868",
        cancel: "\u53D6\u6D88",
        confirm: "\u786E\u8BA4",
        trade: "\u4EA4\u6613",
        cmc_tooltip: "\u5728CoinMarketCap\u4E0A\u67E5\u770B(currency)",
        trade_tooltip: "\u5728(exchange)\u4E0A\u4EA4\u6613(currency)",
        show_more: "\u663E\u793A\u66F4\u591A"
    },
    uu = g('<svg viewBox="0 0 2500 2500"><path fill="#fdd430" d="M764.48,1050.52,1250,565l485.75,485.73,282.5-282.5L1250,0,482,768l282.49,282.5M0,1250,282.51,967.45,565,1249.94,282.49,1532.45Zm764.48,199.51L1250,1935l485.74-485.72,282.65,282.35-.14.15L1250,2500,482,1732l-.4-.4,282.91-282.12M1935,1250.12l282.51-282.51L2500,1250.1,2217.5,1532.61Z"></path><path fill="#fdd430" d="M1536.52,1249.85h.12L1250,963.19,1038.13,1175h0l-24.34,24.35-50.2,50.21-.4.39.4.41L1250,1536.81l286.66-286.66.14-.16-.26-.14"></path></svg>'),
    ou = e => (() => {
        const t = uu.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    iu = g('<svg viewBox="0 0 24 24"><path fill="#24ae8f" d="m7.9 12 7.1 6.5 4.5-4.1a2 1.9 0 1 1 2.9 2.6l-5.9 5.4a2.1 1.9 0 0 1-2.9 0l-8.5-7.8v4.7a2 1.9 0 1 1-4.1 0v-15a2 1.9 0 1 1 4.1 0v4.7l8.5-7.8a2.1 1.9 0 0 1 2.9 0l5.9 5.4a2 1.9 0 1 1-2.9 2.6l-4.5-4.1zm7.1-1.9a2 1.9 0 1 0 2 1.9 2 1.9 0 0 0-2-1.9z"></path></svg>'),
    lu = e => (() => {
        const t = iu.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    su = g('<svg viewBox="8 8 84 84"><path fill="#F7A600" d="m69.17248,54.28325l0,-22.3572l4.4939,0l0,22.3572l-4.4939,0z"></path><path fill="white" d="m16.79825,60.92435l-9.63407,0l0,-22.35719l9.24666,0c4.49394,0 7.11244,2.44919 7.11244,6.28029c0,2.4799 -1.6817,4.0825 -2.8457,4.6161c1.3894,0.6277 3.1679,2.0404 3.1679,5.0249c0,4.1749 -2.9407,6.4359 -7.04723,6.4359zm-0.74311,-18.4628l-4.39706,0l0,5.1497l4.39706,0c1.90714,0 2.97424,-1.0364 2.97424,-2.5757c0,-1.5376 -1.0671,-2.574 -2.97424,-2.574zm0.29055,9.0749l-4.68761,0l0,5.4952l4.68761,0c2.03739,0 3.00589,-1.2553 3.00589,-2.7638c0,-1.5068 -0.9703,-2.7314 -3.00589,-2.7314z"></path><path fill="white" d="m37.55238,51.75535l0,9.169l-4.4622,0l0,-9.169l-6.9187,-13.18819l4.8813,0l4.3002,9.01159l4.2351,-9.01159l4.8813,0l-6.917,13.18819z"></path><path fill="white" d="m57.20988,60.92435l-9.6341,0l0,-22.35719l9.2467,0c4.4939,0 7.1124,2.44919 7.1124,6.28029c0,2.4799 -1.6817,4.0825 -2.8457,4.6161c1.3894,0.6277 3.168,2.0404 3.168,5.0249c0,4.1749 -2.9408,6.4359 -7.0473,6.4359zm-0.7431,-18.4628l-4.3971,0l0,5.1497l4.3971,0c1.9071,0 2.9742,-1.0364 2.9742,-2.5757c0,-1.5376 -1.0671,-2.574 -2.9742,-2.574zm0.2905,9.0749l-4.6876,0l0,5.4952l4.6876,0c2.0374,0 3.0059,-1.2553 3.0059,-2.7638c0,-1.5068 -0.9685,-2.7314 -3.0059,-2.7314z"></path><path fill="white" d="m88.15018,42.46155l0,18.4645l-4.4939,0l0,-18.4645l-6.0136,0l0,-3.89439l16.5211,0l0,3.89439l-6.0136,0z"></path></svg>'),
    cu = e => (() => {
        const t = su.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    au = g('<svg viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" fill="#000"></rect><rect x="6" y="6" width="4" height="4" fill="#fff"></rect><rect x="14" y="6" width="4" height="4" fill="#fff"></rect><rect x="10" y="10" width="4" height="4" fill="#fff"></rect><rect x="6" y="14" width="4" height="4" fill="#fff"></rect><rect x="14" y="14" width="4" height="4" fill="#fff"></rect></svg>'),
    du = e => (() => {
        const t = au.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    hu = g('<svg viewBox="0 0 2500 2500"><path d="M2459.7,1566.6l-540.6-937.7c-118.5-195.5-407.5-197.5-521.9,8.3l-567.6,975.2 c-106,178.8,25,403.3,237.1,403.3H2204C2418.1,2015.7,2578.2,1784.9,2459.7,1566.6z" fill="#3156AA"></path><path d="M1680,1639.4l-33.3-58.2c-31.2-54.1-99.8-170.5-99.8-170.5l-457.4-794.3C971,439.7,690.3,425.1,571.8,647.6 L39.5,1568.7c-110.2,193.4,20.8,444.9,259.9,447h1131.1h482.4h286.9C1906.7,2017.8,1813.1,1866,1680,1639.4L1680,1639.4z" fill="#1972E2"></path><linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="703" y1="1211" x2="1935" y2="727.2267" gradientTransform="matrix(1 0 0 -1 0 2497.8899)"><stop offset="0" style="stop-color:#264CA2;stop-opacity:0"></stop><stop offset="1" style="stop-color:#234588"></stop></linearGradient><path d="M1680.1,1639.4l-33.3-58.2c-31.2-54.1-99.8-170.5-99.8-170.5l-295.3-519.8l-424.2,723.6 c-106,178.8,25,403.4,237,403.4h363.9h482.4h289C1904.6,2015.7,1813.1,1866,1680.1,1639.4L1680.1,1639.4z" fill="url(#gradient)"></path></svg>'),
    fu = e => (() => {
        const t = hu.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    gu = g('<svg viewBox="0 0 229 229"><path fill="#2354e6" d="M114.475154,177.475321 C79.7034538,177.475321 51.5151256,149.282841 51.5151256,114.500713 C51.5151256,79.7209602 79.7034538,51.5237291 114.475154,51.5237291 L114.475154,-0.000950201555 C51.2515057,-0.000950201555 -1.68750626e-14,51.2624237 -1.68750626e-14,114.500713 C-1.68750626e-14,177.736626 51.2515057,229 114.475154,229 C177.696428,229 228.950308,177.736626 228.950308,114.500713 L177.435183,114.500713 C177.435183,149.282841 149.246855,177.475321 114.475154,177.475321"></path><polygon fill="#17E6A1" points="114.474679 114.499287 177.434708 114.499287 177.434708 51.5246793 114.474679 51.5246793"></polygon></svg>'),
    mu = e => (() => {
        const t = gu.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    pu = g('<svg viewBox="62 62 900 900"><path d="M512.147 692C412.697 692 332.146 611.45 332.146 512C332.146 412.55 412.697 332 512.147 332C601.247 332 675.197 396.95 689.447 482H870.797C855.497 297.2 700.846 152 512.147 152C313.396 152 152.146 313.25 152.146 512C152.146 710.75 313.396 872 512.147 872C700.846 872 855.497 726.8 870.797 542H689.297C675.047 627.05 601.247 692 512.147 692Z" fill="#fff"></path></svg>'),
    bu = e => (() => {
        const t = pu.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    St = class {};
let S = St;
m(S, "baseCurrencyUSD", {
        id: "usd",
        symbol: "$",
        code: "USD"
    }),
    m(S, "baseCurrencies", [St.baseCurrencyUSD, {
        id: "eur",
        symbol: "\u20AC",
        code: "EUR"
    }, {
        id: "rub",
        symbol: "\u20BD",
        code: "RUB"
    }, {
        id: "brl",
        symbol: "R$",
        code: "BRL"
    }, {
        id: "gbp",
        symbol: "\xA3",
        code: "GBP"
    }, {
        id: "inr",
        symbol: "\u20B9",
        code: "INR"
    }, {
        id: "aud",
        symbol: "$",
        code: "AUD"
    }, {
        id: "cad",
        symbol: "$",
        code: "CAD"
    }, {
        id: "pln",
        symbol: "Z\u0142",
        code: "PLN"
    }, {
        id: "try",
        symbol: "\u20BA",
        code: "TRY"
    }, {
        id: "btc",
        symbol: "\u20BF",
        code: "BTC"
    }, {
        id: "eth",
        symbol: "\u039E",
        code: "ETH"
    }]),
    m(S, "translations", [$n, Yr, qr, Kr, Ur, eu, Xr, Gr, Qr, Zr, nu, tu, Jr, ru]),
    m(S, "periods", ["min5", "min15", "hour", "day", "week", "month", "year"]),
    m(S, "exchanges", [{
        id: "binance",
        name: "Binance",
        referralUrl: "https://www.binance.com/en/register?ref=BRM28YZ5",
        getSpotTradeUrl: t => {
            function n(r) {
                switch (r.id) {
                    case "pt":
                        return "pt-BR";
                    case "cn":
                        return "zh-CN";
                    case "nl":
                    case "fa":
                    case "de":
                    case "ja":
                        return "en";
                    default:
                        return r.id
                }
            }
            return `https://www.binance.com/${n(b())}/trade/${t}?layout=pro&ref=BRM28YZ5&type=spot`
        },
        iconComponent: ou
    }, {
        id: "kucoin",
        name: "Kucoin",
        referralUrl: "https://www.kucoin.com/r/P8Neuc",
        getSpotTradeUrl: t => `https://www.kucoin.com/trade/${t}?rcode=P8Neuc`,
        iconComponent: lu
    }, {
        id: "bybit",
        name: "Bybit",
        referralUrl: "https://www.bybit.com/register?affiliate_id=46162&group_id=69922&group_type=1",
        getSpotTradeUrl: t => `https://www.bybit.com/trade/spot/${t}?affiliate_id=46162&group_id=0&group_type=1`,
        iconComponent: cu
    }, {
        id: "okx",
        name: "OKX",
        getSpotTradeUrl: t => `https://www.okx.com/trade-spot/${t.toLowerCase()}?channelid=61710443`,
        iconComponent: du
    }, {
        id: "mexc",
        name: "MEXC",
        getSpotTradeUrl: t => `https://www.mexc.com/exchange/${t}?inviteCode=mexc-1WaJ1`,
        iconComponent: fu
    }, {
        id: "gateio",
        name: "Gate.io",
        getSpotTradeUrl: t => `https://www.gate.io/trade/${t}?ref=7393347`,
        iconComponent: mu
    }, {
        id: "coinbase",
        name: "Coinbase",
        getSpotTradeUrl: t => `https://www.coinbase.com/advanced-trade/${t}`,
        iconComponent: bu
    }]);

function Cu(e) {
    return S.baseCurrencies.find(n => n.id === (e == null ? void 0 : e.baseCurrency)) || S.baseCurrencyUSD
}

function _u(e, t) {
    if (e && e.configurationId2)
        return e.configurationId2; {
        let n = t.findIndex(r => r.period === "day" && r.size === "performance");
        return n === -1 && (n = 0),
            t[n].id
    }
}

function yu(e) {
    const t = S.translations.find(n => n.id === (e == null ? void 0 : e.translation));
    if (t)
        return t;
    if (navigator.language) {
        const n = navigator.language.toLowerCase();
        for (const r of S.translations)
            if (n.startsWith(r.id.toLowerCase()))
                return r
    }
    return $n
}

function Qe(e) {
    const t = {};
    for (const n of e)
        t[n] = !0;
    return t
}

function vu(e) {
    return e != null && e.favoritesCMC ? Qe(e.favoritesCMC) : {}
}

function lt(e) {
    const t = [];
    for (const n in e)
        e[n] && t.push(n);
    return t
}
const Wt = "settings";
let Ht = "";
class An {
    static save() {
        const t = ge.map(u => ({
                id: u.id,
                name: u.name,
                items: lt(u.record)
            })),
            n = {
                baseCurrency: K().id,
                translation: b().id,
                configurations2: Z,
                configurationId2: wt(),
                favoritesCMC: lt(et),
                listBlock: lt(tt),
                listsWatch: t,
                currencyFilter: me(),
                colors: ee(),
                hideStables: $t()
            },
            r = JSON.stringify(n);
        if (Ht !== r)
            try {
                localStorage.setItem(Wt, r),
                    Ht = r
            } catch (u) {}
    }
    static load() {
        try {
            const t = localStorage.getItem(Wt);
            if (t) {
                const n = JSON.parse(t);
                if (n) {
                    if (n.configurations2) {
                        let r = !0;
                        for (const u of n.configurations2)
                            if (!u.name.startsWith("Chart #")) {
                                r = !1;
                                break
                            }
                        r && (n.configurations2 = void 0)
                    }
                    return n
                }
            }
        } catch (t) {}
        return null
    }
}

function wu(e) {
    return e && typeof e.hideStables == "boolean" ? e.hideStables : !1
}

function $u(e) {
    return e != null && e.listBlock ? Qe(e.listBlock) : {}
}

function xn() {
    return {
        id: wn(),
        name: "",
        record: {}
    }
}

function Au(e) {
    return e != null && e.listsWatch ? e.listsWatch.map(t => ({
        id: t.id,
        name: t.name,
        record: Qe(t.items)
    })) : [xn()]
}
const Q = An.load(),
    Fn = Wr(Q),
    kn = Cu(Q),
    [K, xu] = v(kn),
    [me, Fu] = v(Hr(Q)),
    [b, ku] = v(yu(Q)),
    [ee, Eu] = v(Vr(Q)),
    [Z, ie] = Se(Fn),
    [wt, gt] = v(_u(Q, Fn)),
    [et, Bu] = Se(vu(Q)),
    [tt, Lu] = Se($u(Q)),
    [ge, Te] = Se(Au(Q)),
    [$t, Du] = v(wu(Q)),
    [At, Su] = Se([]),
    [Ee, Nu] = v("bubbles"),
    [En, Bn] = v(null),
    [We, mt] = v("loading"),
    [pt, Mu] = v(null),
    [Ln, Dn] = v(kn),
    Pu = new vt;

function xt() {
    const e = Ln(),
        t = `data/bubbles1000.${e.id}.json`;
    Pu.get(t).then(n => {
        for (const r of n)
            r.image = "/backend/" + r.image,
            r.nameUpper = r.name.toUpperCase();
        xu(e),
            Su(Rr(n)),
            mt("loaded")
    }).catch(() => {
        mt("loading-failed"),
            Dn(() => K())
    })
}

function Ut(e, t) {
    vn(e, {
        method: "POST",
        body: t
    })
}
class He {
    constructor() {
        m(this, "listeners", [])
    }
    register(t) {
        this.listeners.push(t)
    }
    unregister(t) {
        this.listeners = this.listeners.filter(n => n !== t)
    }
    fire(t) {
        for (const n of this.listeners)
            n(t)
    }
}
const Xt = "abcdefghjiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
class L {
    static create(t) {
        const n = navigator.userAgent.toLowerCase(),
            r = n.indexOf("android") !== -1,
            u = n.indexOf("iphone") !== -1 || n.indexOf("ipad") !== -1;
        this.isWeb = t === "web" || t === "pwa",
            this.isMobile = r || u || t === "android" || t === "ios",
            this.isDesktop = !this.isMobile,
            this.isMissingAndroidApp = t === "web" && r,
            this.isMissingIosApp = t === "web" && u,
            this.generateId(),
            this.addListeners(),
            this.postAccess(t)
    }
    static generateId() {
        for (let t = 0; t < 6; t++)
            this.id += Xt[Math.floor(Math.random() * Xt.length)]
    }
    static addListeners() {
        window.onCryptoBubblesBack = () => this.closeWindow(),
            window.addEventListener("error", t => this.handleError(t)),
            window.addEventListener("keydown", t => {
                t.key === "Escape" && this.closeWindow()
            })
    }
    static postAccess(t) {
        const n = new FormData;
        n.append("session", this.id),
            n.append("isMobile", this.isMobile ? "1" : "0"),
            n.append("translation", b().id),
            n.append("basecurrency", K().id),
            document.referrer && n.append("referer", document.referrer);
        const r = [t, "2023-2-21-17-27"];
        n.append("env", r.join("-")),
            Ut("access.php", n)
    }
    static closeWindow() {
        return this.closeListener ? (this.closeListener(),
            this.closeListener = null,
            !1) : !0
    }
    static handleError(t) {
        if (this.errorsLeft > 0) {
            const {
                filename: n,
                lineno: r,
                colno: u,
                message: o
            } = t;
            this.errorsLeft--,
                this.logAction("ERROR", `${n}:${r}:${u} ${o}`)
        }
    }
    static logAction(t, n = null) {
        const r = new FormData;
        r.append("session", this.id),
            r.append("type", t),
            n !== null && r.append("extra", n),
            Ut("action.php", r)
    }
    static registerCloseListener(t) {
        this.closeListener && this.closeListener !== t && this.closeListener(),
            this.closeListener = t
    }
    static unregisterCloseListener(t) {
        this.closeListener === t && (this.closeListener = null)
    }
    static updateData() {
        xt(),
            this.eventUpdateData.fire()
    }
}
m(L, "isWeb"),
    m(L, "isMobile"),
    m(L, "isDesktop"),
    m(L, "isMissingAndroidApp"),
    m(L, "isMissingIosApp"),
    m(L, "eventUpdateData", new He),
    m(L, "errorsLeft", 3),
    m(L, "id", ""),
    m(L, "closeListener", null);
const zu = g('<svg viewBox="0 0 24 24"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"></path></svg>'),
    Sn = e => (() => {
        const t = zu.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    Tu = g('<a target="_blank" rel="noopener"></a>');

function U(e) {
    function t() {
        L.logAction("CLICK_LINK", e.name),
            e.onClick && e.onClick()
    }
    return (() => {
        const n = Tu.cloneNode(!0);
        return n.$$click = t,
            h(n, () => e.children),
            x(r => {
                const u = e.href,
                    o = e.title,
                    i = e.class;
                return u !== r._v$ && B(n, "href", r._v$ = u),
                    o !== r._v$2 && B(n, "title", r._v$2 = o),
                    i !== r._v$3 && T(n, r._v$3 = i),
                    r
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }),
            n
    })()
}
V(["click"]);
const Iu = g("<span>Download App</span>");

function Ou() {
    return a(U, {
        class: "banner",
        href: "https://play.google.com/store/apps/details?id=net.cryptobubbles",
        title: "Download App",
        name: "GooglePlay_Banner",
        get children() {
            return [Iu.cloneNode(!0), a(Sn, {
                class: "banner-icon"
            })]
        }
    })
}
const Ru = g('<svg viewBox="4 4 42 42"><path d="M 14 3.9902344 C 8.4886661 3.9902344 4 8.4789008 4 13.990234 L 4 35.990234 C 4 41.501568 8.4886661 45.990234 14 45.990234 L 36 45.990234 C 41.511334 45.990234 46 41.501568 46 35.990234 L 46 13.990234 C 46 8.4789008 41.511334 3.9902344 36 3.9902344 L 14 3.9902344 z M 14 5.9902344 L 36 5.9902344 C 40.430666 5.9902344 44 9.5595687 44 13.990234 L 44 35.990234 C 44 40.4209 40.430666 43.990234 36 43.990234 L 14 43.990234 C 9.5693339 43.990234 6 40.4209 6 35.990234 L 6 13.990234 C 6 9.5595687 9.5693339 5.9902344 14 5.9902344 z M 22.572266 11.892578 C 22.187855 11.867986 21.790969 11.952859 21.433594 12.162109 C 20.480594 12.721109 20.161703 13.947391 20.720703 14.900391 L 22.53125 17.990234 L 16.666016 28 L 12 28 C 10.896 28 10 28.896 10 30 C 10 31.104 10.896 32 12 32 L 27.412109 32 C 27.569109 31.237 27.473203 30.409531 27.033203 29.644531 L 27.029297 29.640625 C 26.642297 28.966625 26.105469 28.416 25.480469 28 L 21.302734 28 L 28.978516 14.898438 C 29.536516 13.945438 29.216672 12.720109 28.263672 12.162109 C 27.309672 11.604109 26.085344 11.923953 25.527344 12.876953 L 24.849609 14.033203 L 24.171875 12.876953 C 23.8225 12.281328 23.212949 11.933564 22.572266 11.892578 z M 28.310547 19.941406 L 27.484375 21.314453 C 26.572375 22.830453 26.542953 24.706859 27.376953 26.255859 L 33.673828 37.001953 C 34.045828 37.637953 34.713391 37.990234 35.400391 37.990234 C 35.743391 37.990234 36.092156 37.902797 36.410156 37.716797 C 37.363156 37.158797 37.682047 35.933469 37.123047 34.980469 L 35.376953 32 L 38 32 C 39.104 32 40 31.104 40 30 C 40 28.896 39.104 28 38 28 L 33.033203 28 L 28.310547 19.941406 z M 14.625 34.003906 C 14.068 33.987906 13.526719 34.074328 13.011719 34.236328 L 12.566406 34.994141 C 12.007406 35.946141 12.32825 37.172469 13.28125 37.730469 C 13.59925 37.917469 13.946063 38.005859 14.289062 38.005859 C 14.976062 38.005859 15.644578 37.650625 16.017578 37.015625 L 17.09375 35.179688 C 16.50875 34.496688 15.653859 34.033906 14.630859 34.003906 L 14.625 34.003906 z"></path></svg>'),
    Nn = e => (() => {
        const t = Ru.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    Vu = g("<span>Download App</span>");

function ju() {
    return a(U, {
        class: "banner",
        href: "https://apps.apple.com/app/id1599892658",
        title: "Download App",
        name: "AppStore_Banner",
        get children() {
            return [Vu.cloneNode(!0), a(Nn, {
                class: "banner-icon"
            })]
        }
    })
}

function Wu(e) {
    const {
        name: t,
        url: n,
        title: r,
        thumbnail: u
    } = e.ad;
    return {
        name: t,
        url: n,
        title: r,
        thumbnail: u
    }
}

function Hu() {
    const [e, t] = v(null), n = new vt;

    function r(u) {
        fetch("https://request-global.czilladx.com/serve/native.php?z=731608d8efc3f1e3998").then(o => {
            o.status === 200 ? o.json().then(i => {
                t(Wu(i)),
                    fetch(i.ad.impressionUrl)
            }).catch(() => t(u)) : t(u)
        }).catch(() => t(u))
    }
    return n.get("text.php").then(u => {
            u.exclusive ? t(u) : r(u)
        }).catch(() => r({
            name: "Binance",
            url: "https://www.binance.com/en/register?ref=BRM28YZ5",
            title: "Most Popular Exchange with low fees",
            thumbnail: "/images/binance.png"
        })),
        e
}

function z(...e) {
    return e.filter(t => Boolean(t)).join(" ")
}
const Uu = g("<img>"),
    Xu = g('<a target="_blank" rel="nofollow"><span class="grow"></span><span>AD</span></a>');

function qu() {
    const e = Hu();

    function t() {
        const n = e();
        n && L.logAction("CLICK_LINK", `NativeAd-${n.name}`)
    }
    return (() => {
        const n = Xu.cloneNode(!0),
            r = n.firstChild;
        return n.$$click = t,
            h(n, a(A, {
                get when() {
                    return e()
                },
                get children() {
                    const u = Uu.cloneNode(!0);
                    return x(o => {
                            var c, s;
                            const i = (c = e()) == null ? void 0 : c.thumbnail,
                                l = (s = e()) == null ? void 0 : s.name;
                            return i !== o._v$ && B(u, "src", o._v$ = i),
                                l !== o._v$2 && B(u, "alt", o._v$2 = l),
                                o
                        }, {
                            _v$: void 0,
                            _v$2: void 0
                        }),
                        u
                }
            }), r),
            h(r, () => {
                var u;
                return (u = e()) == null ? void 0 : u.title
            }),
            x(u => {
                var c, s;
                const o = z("banner-native-ad", !e() && "empty"),
                    i = (c = e()) == null ? void 0 : c.url,
                    l = (s = e()) == null ? void 0 : s.title;
                return o !== u._v$3 && T(n, u._v$3 = o),
                    i !== u._v$4 && B(n, "href", u._v$4 = i),
                    l !== u._v$5 && B(n, "title", u._v$5 = l),
                    u
            }, {
                _v$3: void 0,
                _v$4: void 0,
                _v$5: void 0
            }),
            n
    })()
}
V(["click"]);

function Yu() {
    return a(Ze, {
        get fallback() {
            return a(qu, {})
        },
        get children() {
            return [a(Y, {
                get when() {
                    return L.isMissingAndroidApp
                },
                get children() {
                    return a(Ou, {})
                }
            }), a(Y, {
                get when() {
                    return L.isMissingIosApp
                },
                get children() {
                    return a(ju, {})
                }
            })]
        }
    })
}
class $ {}
m($, "appName", "Crypto Bubbles"),
    m($, "usernameTwitter", "CryptoBubbles"),
    m($, "usernameInstagram", "cryptobubbles"),
    m($, "usernameTelegram", "CryptoBubbles"),
    m($, "emailAddress", "contact@cryptobubbles.net"),
    m($, "imageLogo", "/images/logo64.png"),
    m($, "bubbleCanvasPadding", Math.round(window.devicePixelRatio * 2)),
    m($, "bubbleBorderWidth", Math.round(window.devicePixelRatio * 2)),
    m($, "bubbleExtraHitbox", Math.round(window.devicePixelRatio * 4));
const Gu = g("<button></button>");

function re(e) {
    return (() => {
        const t = Gu.cloneNode(!0);
        return De(t, "click", e.onClick, !0),
            h(t, () => e.children),
            x(n => {
                const r = z("icon-button", e.small && "small", e.active && "active", e.class),
                    u = e.title;
                return r !== n._v$ && T(t, n._v$ = r),
                    u !== n._v$2 && B(t, "title", n._v$2 = u),
                    n
            }, {
                _v$: void 0,
                _v$2: void 0
            }),
            t
    })()
}
V(["click"]);
const Ku = g('<div class="data-updater"></div>');

function Zu() {
    let e;
    const t = () => {
        window.clearTimeout(e),
            e = window.setTimeout(() => requestAnimationFrame(t), 7e4),
            L.updateData()
    };
    return (() => {
        const n = Ku.cloneNode(!0);
        return n.addEventListener("animationiteration", t),
            n
    })()
}
const Ju = g('<svg viewBox="0 0 24 24"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"></path></svg>'),
    Ft = e => (() => {
        const t = Ju.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    Qu = g('<ul class="menu"></ul>');

function Mn(e) {
    return (() => {
        const t = Qu.cloneNode(!0);
        return h(t, () => e.children),
            t
    })()
}
const eo = g('<li class="menu-item"><span></span></li>');

function Ue(e) {
    return (() => {
        const t = eo.cloneNode(!0),
            n = t.firstChild;
        return De(t, "click", e.onClick, !0),
            h(t, () => e.left, n),
            h(n, () => e.text),
            h(t, () => e.right, null),
            t
    })()
}
V(["click"]);
const to = g('<svg width="24" height="12" viewBox="0 6 24 12"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>'),
    Pn = e => (() => {
        const t = to.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    no = g('<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>'),
    ro = e => (() => {
        const t = no.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    uo = g('<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>'),
    zn = e => (() => {
        const t = uo.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    oo = g('<svg viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>'),
    io = e => (() => {
        const t = oo.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    lo = g('<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>'),
    so = e => (() => {
        const t = lo.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    co = g("<div></div>");

function Tn(e) {
    const [t, n] = v(!1);
    window.setTimeout(() => n(!0), 20);
    let r;

    function u() {
        e.onClose()
    }
    document.addEventListener("click", u),
        X(() => {
            document.removeEventListener("click", u)
        });
    const o = E(() => {
            const l = e.anchor.getBoundingClientRect(),
                c = l.x + l.width / 2,
                s = l.y + l.height / 2,
                d = c > window.innerWidth / 2,
                f = s > window.innerHeight / 2,
                p = d ? f ? [1, 0, -1, -1] : [1, 1, -1, 0] : f ? [0, 0, 0, -1] : [0, 1, 0, 0],
                _ = Math.round(l.left + l.width * p[0]),
                C = Math.round(l.top + l.height * p[1]),
                y = `${Math.round(p[2] * 100)}%`,
                F = `${Math.round(p[3] * 100)}%`;
            return {
                left: _,
                top: C,
                transformX: y,
                transformY: F,
                sideY: f
            }
        }),
        i = E(() => {
            const l = o(),
                c = [`translate(${l.transformX},${l.transformY})`, `scaleY(${t() ? 1 : .6})`],
                s = [`left:${l.left}px`, `top:${l.top}px`, `transform:${c.join(" ")}`, `opacity:${t() ? 1 : 0}`, `transform-origin:0 ${l.sideY ? "100%" : "0%"}`];
            return e.width && s.push(`width:${e.width}px`),
                s.join(";")
        });
    return a(pn, {
        get children() {
            const l = co.cloneNode(!0),
                c = r;
            return typeof c == "function" ? se(c, l) : r = l,
                h(l, () => e.children),
                x(s => {
                    const d = z("popup", e.anchor && "open"),
                        f = i();
                    return d !== s._v$ && T(l, s._v$ = d),
                        s._v$2 = Je(l, f, s._v$2),
                        s
                }, {
                    _v$: void 0,
                    _v$2: void 0
                }),
                l
        }
    })
}

function qt(e) {
    const t = () => e.options[e.index];
    return a(A, {
        get when() {
            return t()
        },
        get children() {
            return a(re, {
                class: "select-navigator",
                get title() {
                    return t().label
                },
                onClick: () => e.onChange(t().value),
                get children() {
                    return e.children
                }
            })
        }
    })
}
const ao = g("<button></button>");

function $e(e) {
    return (() => {
        const t = ao.cloneNode(!0);
        return De(t, "click", e.onClick, !0),
            h(t, () => e.children),
            x(n => {
                const r = z("solid-button", e.active && "active", e.class),
                    u = e.title;
                return r !== n._v$ && T(t, n._v$ = r),
                    u !== n._v$2 && B(t, "title", n._v$2 = u),
                    n
            }, {
                _v$: void 0,
                _v$2: void 0
            }),
            t
    })()
}
V(["click"]);
const ho = g('<fieldset class="select-options"><legend class="select-options-label"></legend></fieldset>');

function ke(e) {
    return (() => {
        const t = ho.cloneNode(!0),
            n = t.firstChild;
        return h(n, () => e.label),
            h(t, a(O, {
                get each() {
                    return e.children
                },
                children: r => a($e, {
                    get active() {
                        return r.value === e.value
                    },
                    class: "select-option",
                    onClick: () => e.onChange(r.value),
                    get children() {
                        return [a(A, {
                            keyed: !0,
                            get when() {
                                return r.iconComponent
                            },
                            children: u => a(u, {})
                        }), E(() => r.label)]
                    }
                })
            }), null),
            t
    })()
}
const fo = g('<div class="select-popup"></div>');

function Ne(e) {
    const [t, n] = v(null);

    function r(c) {
        e.onChange(c)
    }
    const u = E(() => JSON.stringify(e.value)),
        o = E(() => {
            const c = [];
            for (const s of e.children)
                for (const d of s.options)
                    c.push(d);
            return c
        }),
        i = E(() => {
            let c = 0;
            for (const s of e.children)
                for (const d of s.options) {
                    if (JSON.stringify(d.value) === u())
                        return {
                            index: c,
                            option: d
                        };
                    c++
                }
            return {
                index: 0,
                option: e.children[0].options[0]
            }
        }),
        l = () => e.children.length > 1 || e.children[0].options.length > 5;
    return [a(A, {
        get when() {
            return e.withNavigator
        },
        get children() {
            return a(qt, {
                get index() {
                    return i().index - 1
                },
                get options() {
                    return o()
                },
                onChange: r,
                get children() {
                    return a(ro, {})
                }
            })
        }
    }), a($e, {
        get class() {
            return z("select-button", t() && "open")
        },
        onClick: c => n(c.currentTarget),
        get children() {
            return [a(A, {
                keyed: !0,
                get when() {
                    return i().option.iconComponent
                },
                children: c => a(c, {})
            }), E(() => i().option.label), a(Pn, {
                class: "select-button-arrow"
            })]
        }
    }), a(A, {
        get when() {
            return e.withNavigator
        },
        get children() {
            return a(qt, {
                get index() {
                    return i().index + 1
                },
                get options() {
                    return o()
                },
                onChange: r,
                get children() {
                    return a(zn, {})
                }
            })
        }
    }), a(A, {
        keyed: !0,
        get when() {
            return t()
        },
        children: c => a(Tn, {
            anchor: c,
            get width() {
                return l() ? 600 : void 0
            },
            onClose: () => n(null),
            get children() {
                return a(A, {
                    get when() {
                        return l()
                    },
                    get fallback() {
                        return a(Mn, {
                            get children() {
                                return a(O, {
                                    get each() {
                                        return e.children[0].options
                                    },
                                    children: s => a(Ue, {
                                        get left() {
                                            return a(A, {
                                                get when() {
                                                    return JSON.stringify(s.value) === u()
                                                },
                                                get fallback() {
                                                    return a(so, {})
                                                },
                                                get children() {
                                                    return a(io, {
                                                        class: "color-primary"
                                                    })
                                                }
                                            })
                                        },
                                        get text() {
                                            return s.label
                                        },
                                        onClick: () => r(s.value)
                                    })
                                })
                            }
                        })
                    },
                    get children() {
                        const s = fo.cloneNode(!0);
                        return h(s, a(O, {
                                get each() {
                                    return e.children
                                },
                                children: d => a(ke, {
                                    get label() {
                                        return d.label
                                    },
                                    get value() {
                                        return u()
                                    },
                                    onChange: f => r(JSON.parse(f)),
                                    get children() {
                                        return d.options.map(f => ({
                                            ...f,
                                            value: JSON.stringify(f.value)
                                        }))
                                    }
                                })
                            })),
                            s
                    }
                })
            }
        })
    })]
}
const go = g('<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"></path></svg>'),
    In = e => (() => {
        const t = go.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    mo = g('<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>'),
    On = e => (() => {
        const t = mo.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    po = g('<svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>'),
    Rn = e => (() => {
        const t = po.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })();

function Vn(e) {
    return `${b().watchlist} ${e + 1}`
}

function jn(e, t) {
    return e.name.trim().length > 0 ? e.name : Vn(t)
}

function Wn() {
    return [{
        name: b().favorites,
        filter: {
            type: "list",
            list: ["favorite"]
        },
        record: et,
        iconComponent: On,
        toggleCurrency: e => Bu(e.id, t => !t)
    }, ...ge.map((e, t) => ({
        name: jn(e, t),
        filter: {
            type: "list",
            list: ["watch", e.id]
        },
        record: e.record,
        iconComponent: Rn,
        toggleCurrency: n => Te(t, "record", n.id, r => !r)
    })), {
        name: b().blocklist,
        filter: {
            type: "list",
            list: ["block"]
        },
        record: tt,
        iconComponent: In,
        toggleCurrency: e => Lu(e.id, t => !t)
    }]
}

function Hn(e) {
    return a(Ne, {
        get value() {
            return me()
        },
        onChange: Fu,
        get withNavigator() {
            return e.withNavigator
        },
        get children() {
            return [{
                label: b().pages,
                options: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1e3].map(t => ({
                    label: `TOP ${t}`,
                    value: {
                        type: "slice",
                        from: t - 99,
                        to: t
                    }
                }))
            }, {
                label: b().lists,
                options: Wn().map(t => ({
                    label: t.name,
                    value: t.filter,
                    iconComponent: t.iconComponent
                }))
            }, {
                label: b().exchanges,
                options: S.exchanges.map(t => ({
                    label: t.name,
                    value: {
                        type: "exchange",
                        exchange: t.id
                    },
                    iconComponent: t.iconComponent
                }))
            }]
        }
    })
}

function bo(e, t) {
    I(() => {
        t() && (L.registerCloseListener(e),
            X(() => L.unregisterCloseListener(e)))
    })
}
const Co = g('<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>'),
    kt = e => (() => {
        const t = Co.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    _o = g('<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>'),
    yo = e => (() => {
        const t = _o.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    vo = g('<div class="window-content"></div>'),
    wo = g("<section><header></header></section>");

function Et(e) {
    const [t, n] = v(!0);
    return bo(e.onClose, () => !0),
        (() => {
            const r = wo.cloneNode(!0),
                u = r.firstChild;
            return h(u, a(re, {
                    get class() {
                        return z("expand-button", t() && "expanded")
                    },
                    onClick: () => n(!t()),
                    get title() {
                        return b().window_toggleExpand
                    },
                    get children() {
                        return a(yo, {})
                    }
                }), null),
                h(u, () => e.header, null),
                h(u, a(re, {
                    get onClick() {
                        return e.onClose
                    },
                    get title() {
                        return b().window_close
                    },
                    get children() {
                        return a(kt, {})
                    }
                }), null),
                h(r, a(A, {
                    get when() {
                        return t()
                    },
                    get children() {
                        const o = vo.cloneNode(!0);
                        return h(o, () => e.children),
                            o
                    }
                }), null),
                x(() => T(r, z("window", e.class))),
                r
        })()
}
const $o = g('<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>'),
    Yt = e => (() => {
        const t = $o.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    Ao = g("<button></button>");

function Bt(e) {
    const [t, n] = v(null);
    return [(() => {
        const r = Ao.cloneNode(!0);
        return r.$$click = u => n(u.currentTarget),
            h(r, () => e.content),
            x(u => {
                const o = z(e.solid ? "solid-button" : "icon-button", "button-menu", t() && "open", e.class),
                    i = e.title;
                return o !== u._v$ && T(r, u._v$ = o),
                    i !== u._v$2 && B(r, "title", u._v$2 = i),
                    u
            }, {
                _v$: void 0,
                _v$2: void 0
            }),
            r
    })(), a(A, {
        keyed: !0,
        get when() {
            return t()
        },
        children: r => a(Tn, {
            anchor: r,
            onClose: () => n(null),
            get children() {
                return a(Mn, {
                    get children() {
                        return e.children
                    }
                })
            }
        })
    })]
}
V(["click"]);

function Un(e) {
    return a(Bt, {
        get title() {
            return b().delete
        },
        get content() {
            return a(Yt, {})
        },
        get children() {
            return [a(Ue, {
                get left() {
                    return a(Yt, {})
                },
                get text() {
                    return b().confirm
                },
                onClick: () => e.onDelete()
            }), a(Ue, {
                get left() {
                    return a(kt, {})
                },
                get text() {
                    return b().cancel
                }
            })]
        }
    })
}
const xo = g('<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>'),
    Xe = e => (() => {
        const t = xo.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    Fo = g('<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>'),
    nt = e => (() => {
        const t = Fo.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    ko = g('<svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>'),
    Eo = e => (() => {
        const t = ko.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    Bo = g('<div><input size="1"></div>');

function Me(e) {
    const [t, n] = v(!1);
    let r;

    function u() {
        document.execCommand("copy") && n(!0)
    }

    function o() {
        if (r) {
            const {
                value: c
            } = r;
            if (c) {
                r.select();
                try {
                    navigator.clipboard.writeText(c).then(() => n(!0)).catch(u)
                } catch (s) {
                    u()
                }
            }
        }
    }

    function i(c) {
        e.onInput && e.onInput(c)
    }

    function l() {
        r && (e.readonly ? r.select() : r.focus())
    }
    return (() => {
        const c = Bo.cloneNode(!0),
            s = c.firstChild;
        c.$$click = l,
            h(c, a(A, {
                keyed: !0,
                get when() {
                    return e.iconComponent
                },
                children: f => a(f, {
                    class: "input-icon"
                })
            }), s),
            s.$$input = f => i(f.currentTarget.value);
        const d = r;
        return typeof d == "function" ? se(d, s) : r = s,
            h(c, a(Ze, {
                get children() {
                    return [a(Y, {
                        get when() {
                            return e.action === "clear"
                        },
                        get children() {
                            return a(re, {
                                get title() {
                                    return b().delete
                                },
                                class: "input-action",
                                get active() {
                                    return t()
                                },
                                onClick: () => i(""),
                                get children() {
                                    return a(kt, {})
                                }
                            })
                        }
                    }), a(Y, {
                        get when() {
                            return e.action === "copy"
                        },
                        get children() {
                            return a(re, {
                                get title() {
                                    return b().copy
                                },
                                class: "input-action",
                                get active() {
                                    return t()
                                },
                                onClick: o,
                                get children() {
                                    return a(Eo, {})
                                }
                            })
                        }
                    })]
                }
            }), null),
            x(f => {
                const p = z("input", e.value.length === 0 && "input-empty", e.class),
                    _ = e.type,
                    C = e.placeholder;
                return p !== f._v$ && T(c, f._v$ = p),
                    _ !== f._v$2 && B(s, "type", f._v$2 = _),
                    C !== f._v$3 && B(s, "placeholder", f._v$3 = C),
                    f
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }),
            x(() => s.value = e.value),
            c
    })()
}
V(["click", "input"]);
const Gt = Qe(["BTC", "ETH"]);

function Lo() {
    return a(Ne, {
        get value() {
            return Ln()
        },
        onChange: Dn,
        get children() {
            return [{
                label: "Fiat",
                options: S.baseCurrencies.filter(e => !Gt[e.code]).map(e => ({
                    value: e,
                    label: `${e.symbol} ${e.code}`
                }))
            }, {
                label: "Crypto",
                options: S.baseCurrencies.filter(e => Gt[e.code]).map(e => ({
                    value: e,
                    label: `${e.symbol} ${e.code}`
                }))
            }]
        }
    })
}

function Do() {
    return a(Ne, {
        get value() {
            return ee()
        },
        onChange: Eu,
        get children() {
            return [{
                label: "",
                options: [{
                    value: "red-green",
                    label: b().red_green
                }, {
                    value: "yellow-blue",
                    label: b().yellow_blue
                }]
            }]
        }
    })
}

function So() {
    return a(Ne, {
        get value() {
            return b()
        },
        onChange: ku,
        get children() {
            return [{
                label: "",
                options: S.translations.map(e => ({
                    value: e,
                    label: `${e.flag} ${e.name}`
                }))
            }]
        }
    })
}
const No = g('<ul class="settings-page"><li><span></span></li><li><span></span></li><li><span></span></li><li><span>Stablecoins</span></li><li class="watchlists"><span></span></li></ul>'),
    Mo = g('<div class="watchlist"></div>');

function Xn() {
    return (() => {
        const e = No.cloneNode(!0),
            t = e.firstChild,
            n = t.firstChild,
            r = t.nextSibling,
            u = r.firstChild,
            o = r.nextSibling,
            i = o.firstChild,
            l = o.nextSibling;
        l.firstChild;
        const c = l.nextSibling,
            s = c.firstChild;
        return h(n, () => b().currency),
            h(t, a(Lo, {}), null),
            h(u, () => b().language),
            h(r, a(So, {}), null),
            h(i, () => b().colors),
            h(o, a(Do, {}), null),
            h(l, a(Ne, {
                get value() {
                    return $t()
                },
                onChange: Du,
                get children() {
                    return [{
                        label: "",
                        options: [{
                            value: !1,
                            label: b().show
                        }, {
                            value: !0,
                            label: b().hide
                        }]
                    }]
                }
            }), null),
            h(s, () => b().watchlists),
            h(c, a(re, {
                class: "button-add",
                get title() {
                    return b().watchlist_add
                },
                onClick: () => Te(d => [...d, xn()]),
                get children() {
                    return a(Xe, {})
                }
            }), null),
            h(e, a(O, {
                each: ge,
                children: (d, f) => (() => {
                    const p = Mo.cloneNode(!0);
                    return h(p, a(Me, {
                            get value() {
                                return d.name
                            },
                            action: "clear",
                            iconComponent: nt,
                            get placeholder() {
                                return Vn(f())
                            },
                            onInput: _ => Te(f(), "name", _)
                        }), null),
                        h(p, a(Un, {
                            onDelete: () => Te(_ => _.filter(C => C.id !== d.id))
                        }), null),
                        p
                })()
            }), null),
            e
    })()
}
const Po = g('<span class="settings-window-title"></span>');

function zo(e) {
    return a(Et, {
        class: "settings-window",
        get onClose() {
            return e.onClose
        },
        get header() {
            return [a(Ft, {}), (() => {
                const t = Po.cloneNode(!0);
                return h(t, () => b().settings),
                    t
            })()]
        },
        get children() {
            return a(Xn, {})
        }
    })
}
const To = g("<div></div>");

function Lt(e) {
    const [t, n] = v(""), [r, u] = v(null);
    I(() => {
        e.value ? (window.setTimeout(() => n("in"), 20),
            u(() => e.value)) : (n("out"),
            window.setTimeout(() => u(null), 400))
    });
    const o = E(() => e.value || r());
    return a(A, {
        get when() {
            return o()
        },
        get children() {
            return a(pn, {
                get children() {
                    const i = To.cloneNode(!0);
                    return h(i, a(e.component, {
                            get value() {
                                return o()
                            },
                            get onClose() {
                                return e.onClose
                            }
                        })),
                        x(() => T(i, z("window-host", t()))),
                        i
                }
            })
        }
    })
}
const Io = g('<div class="grow"></div>'),
    Oo = g('<header class="header"><img class="logo"><h1></h1></header>');

function Ro() {
    const [e, t] = v(!1);
    return (() => {
        const n = Oo.cloneNode(!0),
            r = n.firstChild,
            u = r.nextSibling;
        return h(u, () => $.appName),
            h(n, a(A, {
                get when() {
                    return L.isDesktop
                },
                get children() {
                    return [Io.cloneNode(!0), a(Hn, {
                        withNavigator: !0
                    }), a(re, {
                        get active() {
                            return e()
                        },
                        class: "button-settings",
                        onClick: () => t(o => !o),
                        get title() {
                            return b().settings
                        },
                        get children() {
                            return a(Ft, {})
                        }
                    }), a(Lt, {
                        get value() {
                            return e()
                        },
                        component: zo,
                        onClose: () => t(!1)
                    })]
                }
            }), null),
            h(n, a(Zu, {}), null),
            x(o => {
                const i = $.imageLogo,
                    l = $.appName,
                    c = `Logo of ${$.appName}`;
                return i !== o._v$ && B(r, "src", o._v$ = i),
                    l !== o._v$2 && B(r, "alt", o._v$2 = l),
                    c !== o._v$3 && B(r, "title", o._v$3 = c),
                    o
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }),
            n
    })()
}
const Vo = g('<svg viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"></path></svg>'),
    jo = e => (() => {
        const t = Vo.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    Wo = g('<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>'),
    Ho = e => (() => {
        const t = Wo.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    Uo = g('<svg viewBox="0 0 24 24"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"></path></svg>'),
    Xo = e => (() => {
        const t = Uo.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    qo = g('<div class="support-crypto"><div class="support-crypto-options"></div></div>'),
    Yo = g("<p>Version </p>"),
    Go = [{
        name: "BTC",
        address: "bc1q8pep7zf7txjcjrslse7crqlgr0f36fwuxnzad0"
    }, {
        name: "ETH",
        address: "0x1e365DA3123718E703ffA316775e7f982EB1EfF3"
    }, {
        name: "BSC",
        address: "0x1e365DA3123718E703ffA316775e7f982EB1EfF3"
    }, {
        name: "SOL",
        address: "7bWCETt2r6bM7CitSahqiujAM9UR2o14QMyw3xB4QDox"
    }, {
        name: "XRP",
        address: "rpeeapKyDQE9JhRPkRZA3WtzmiYCxZ3jCL"
    }, {
        name: "LTC",
        address: "LX7Bzbn2aEEt64DZZzW653tkSvYBQ7cs6q"
    }, {
        name: "XLM",
        address: "GALMTBOTY4FQ4GBZW5X4XH3673SWEAYB3CPMEVGTX67NNXNV6DV77BWN"
    }, {
        name: "XMR",
        address: "4ARo28zbpru9PqFqd1XGSyPipH83PG38eKj9uSinwPgKMfAYKehgR5SFyrQDEN9A7VdBcUQMPnfcZARm5yNWfxXdGNeZfj6"
    }];

function Ko() {
    const [e, t] = v(null);
    return (() => {
        const n = qo.cloneNode(!0),
            r = n.firstChild;
        return h(r, a(O, {
                each: Go,
                children: u => a($e, {
                    get active() {
                        return e() === u
                    },
                    onClick: () => t(o => o === u ? null : u),
                    get children() {
                        return u.name
                    }
                })
            })),
            h(n, a(A, {
                keyed: !0,
                get when() {
                    return e()
                },
                get fallback() {
                    return (() => {
                        const u = Yo.cloneNode(!0);
                        return u.firstChild,
                            h(u, "2023-2-21-17-27", null),
                            u
                    })()
                },
                children: u => a(Me, {
                    readonly: !0,
                    action: "copy",
                    get value() {
                        return u.address
                    }
                })
            }), null),
            n
    })()
}
const Zo = g('<svg viewBox="0 0 512 512"><path d="m484.689 98.231-69.417 327.37c-5.237 23.105-18.895 28.854-38.304 17.972L271.2 365.631l-51.034 49.086c-5.647 5.647-10.372 10.372-21.256 10.372l7.598-107.722L402.539 140.23c8.523-7.598-1.848-11.809-13.247-4.21L146.95 288.614 42.619 255.96c-22.694-7.086-23.104-22.695 4.723-33.579L455.423 65.166c18.893-7.085 35.427 4.209 29.266 33.065z"></path></svg>'),
    Jo = e => (() => {
        const t = Zo.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    Qo = g('<footer><section><p class="footer-header"><img class="footer-logo" width="32" height="32"><span></span></p><h2></h2><p>Crypto Bubbles is available as website at cryptobubbles.net, Android App on the Play Store and iOS App on the App Store.</p><p>No financial advice. Do your own research!</p><p>Ulrich Stark, 92637 Weiden, Germany<br></p><nav></nav></section><section class="support-my-work"><h2></h2><nav class="support-links"></nav></section></footer>');

function Kt() {
    return (() => {
        const e = Qo.cloneNode(!0),
            t = e.firstChild,
            n = t.firstChild,
            r = n.firstChild,
            u = r.nextSibling,
            o = n.nextSibling,
            i = o.nextSibling,
            l = i.nextSibling,
            c = l.nextSibling;
        c.firstChild.nextSibling;
        const d = c.nextSibling,
            f = t.nextSibling,
            p = f.firstChild,
            _ = p.nextSibling;
        return h(u, () => $.appName),
            h(o, () => b().description),
            h(c, () => $.emailAddress, null),
            h(d, a(A, {
                get when() {
                    return L.isWeb
                },
                get children() {
                    return [a(U, {
                        class: "icon-button",
                        href: "https://play.google.com/store/apps/details?id=net.cryptobubbles",
                        title: "Play Store",
                        name: "PlayStore",
                        get children() {
                            return a(Sn, {})
                        }
                    }), a(U, {
                        class: "icon-button",
                        href: "https://apps.apple.com/app/id1599892658",
                        title: "App Store",
                        name: "AppStore",
                        get children() {
                            return a(Nn, {})
                        }
                    })]
                }
            }), null),
            h(d, a(U, {
                class: "icon-button",
                get href() {
                    return `mailto:${$.emailAddress}`
                },
                get title() {
                    return $.emailAddress
                },
                name: "Mail",
                get children() {
                    return a(Ho, {})
                }
            }), null),
            h(d, a(U, {
                class: "icon-button",
                get href() {
                    return `https://instagram.com/${$.usernameInstagram}`
                },
                get title() {
                    return `@${$.usernameInstagram}`
                },
                name: "Instagram",
                get children() {
                    return a(jo, {})
                }
            }), null),
            h(d, a(U, {
                class: "icon-button",
                get href() {
                    return `https://t.me/${$.usernameTelegram}`
                },
                get title() {
                    return `@${$.usernameTelegram}`
                },
                name: "Telegram",
                get children() {
                    return a(Jo, {})
                }
            }), null),
            h(d, a(U, {
                class: "icon-button",
                get href() {
                    return `https://twitter.com/${$.usernameTwitter}`
                },
                get title() {
                    return `@${$.usernameTwitter}`
                },
                name: "Twitter",
                get children() {
                    return a(Xo, {})
                }
            }), null),
            h(p, () => b().support_my_work),
            h(_, a(O, {
                get each() {
                    return S.exchanges
                },
                children: C => a(A, {
                    keyed: !0,
                    get when() {
                        return C.referralUrl
                    },
                    children: y => a(U, {
                        class: "solid-button",
                        href: y,
                        get name() {
                            return C.name
                        },
                        get children() {
                            return [a(C.iconComponent, {}), "Register on ", E(() => C.name)]
                        }
                    })
                })
            })),
            h(f, a(Ko, {}), null),
            x(C => {
                const y = $.imageLogo,
                    F = $.appName,
                    k = `Logo of ${$.appName}`;
                return y !== C._v$ && B(r, "src", C._v$ = y),
                    F !== C._v$2 && B(r, "alt", C._v$2 = F),
                    k !== C._v$3 && B(r, "title", C._v$3 = k),
                    C
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }),
            e
    })()
}

function qn(e) {
    Bn(t => t === e ? null : e)
}

function ne(e, t) {
    e < 0 && (e = 0);
    let n = e === 0 ? 2 : 3 - Math.ceil(Math.log10(e));
    n < 0 && (n = 0),
        n > 10 && (n = 10),
        n === 1 && (n = 2),
        e > 1e6 && (n = 2),
        Number.isFinite(n) || (n = 0);
    const r = {
        style: "currency",
        currency: t.code,
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: n,
        maximumFractionDigits: n
    };
    e > 1e6 && (r.notation = "compact");
    try {
        return e.toLocaleString(void 0, r)
    } catch (u) {
        return r.currencyDisplay = "symbol",
            e.toLocaleString(void 0, r)
    }
}

function ye(e, t, n) {
    if (e !== 0)
        return e > 0 ? t === "yellow-blue" ? n ? "#16d" : "#4af" : n ? "#282" : "#3f3" : t === "yellow-blue" ? n ? "#d91" : "#fb1" : n ? "#b44" : "#f66"
}

function Dt(e, t, n, r) {
    if (e === null)
        return {
            text: "-"
        };
    e *= .01;
    const u = Math.abs(e);
    u < 5e-4 && (e = .001 * Math.sign(e));
    const o = u >= 1 ? 0 : 1,
        c = {
            style: "percent",
            signDisplay: n || e === 0 ? "never" : "always",
            maximumFractionDigits: o
        },
        d = e.toLocaleString(void 0, c).replace(/\u00a0/, ""),
        f = ye(e, t, r);
    return {
        text: d,
        color: f
    }
}

function qe(e, t) {
    return t[e.id] === !0
}

function bt(e) {
    return qe(e, tt)
}

function Yn(e) {
    return qe(e, et)
}
const ei = g('<svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>'),
    ti = e => (() => {
        const t = ei.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })();

function Gn(e) {
    const t = () => {
        const n = [];
        bt(e.currency) && n.push(In),
            Yn(e.currency) && n.push(On);
        for (const r of ge)
            if (qe(e.currency, r.record)) {
                n.push(Rn);
                break
            }
        return n
    };
    return a(Bt, {
        class: "button-lists",
        get title() {
            return b().add_to_list
        },
        get content() {
            return [a(Xe, {}), a(O, {
                get each() {
                    return t()
                },
                children: n => a(n, {
                    class: "color-secondary"
                })
            })]
        },
        get children() {
            return a(O, {
                get each() {
                    return Wn()
                },
                children: n => a(Ue, {
                    get text() {
                        return n.name
                    },
                    get left() {
                        return a(n.iconComponent, {})
                    },
                    get right() {
                        return a(A, {
                            get when() {
                                return qe(e.currency, n.record)
                            },
                            get fallback() {
                                return a(Xe, {
                                    class: "color-secondary"
                                })
                            },
                            get children() {
                                return a(ti, {
                                    class: "color-primary"
                                })
                            }
                        })
                    },
                    onClick: r => {
                        n.toggleCurrency(e.currency),
                            r.stopImmediatePropagation()
                    }
                })
            })
        }
    })
}
const ni = g('<svg viewBox="0 0 41 41"><path d="m35.124 24.5c-0.715 0.452-1.557 0.508-2.197 0.147-0.813-0.459-1.26-1.534-1.26-3.029v-4.473c0-2.16-0.854-3.697-2.282-4.112-2.42-0.705-4.24 2.256-4.924 3.368l-4.268 6.92v-8.458c-0.048-1.946-0.68-3.11-1.88-3.461-0.794-0.232-1.982-0.139-3.136 1.627l-9.562 15.354c-1.2801-2.4302-1.9475-5.1363-1.944-7.883 0-9.249 7.412-16.773 16.522-16.773s16.521 7.524 16.521 16.773c0 0.016 4e-3 0.03 5e-3 0.045 0 0.016-3e-3 0.03-2e-3 0.046 0.086 1.791-0.494 3.216-1.593 3.91zm5.261-3.999v-0.047l-1e-3 -0.046c-0.051-11.264-9.088-20.408-20.192-20.408-11.133 0-20.192 9.196-20.192 20.5 0 11.303 9.059 20.5 20.193 20.5 5.109 0 9.985-1.942 13.728-5.467 0.744-0.7 0.788-1.879 0.098-2.633-0.68394-0.7542-1.854-0.79931-2.594-0.1-3.0339 2.873-7.0536 4.4738-11.232 4.473-4.878 0-9.267-2.159-12.294-5.583l8.623-13.846v6.383c0 3.066 1.189 4.057 2.186 4.347 0.998 0.29 2.523 0.092 4.124-2.508l4.743-7.689c0.152-0.248 0.292-0.462 0.42-0.647v3.888c0 2.866 1.148 5.158 3.149 6.287 1.804 1.018 4.072 0.926 5.92-0.24 2.24-1.415 3.447-4.022 3.321-7.164z" fill="#fff"></path></svg>'),
    ri = e => (() => {
        const t = ni.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })();

function ui(e) {
    switch (e.id) {
        case "pt":
            return "pt-br";
        case "cn":
            return "zh";
        case "fa":
            return "en";
        default:
            return e.id
    }
}

function oi(e) {
    let t = `currencies/${e}`;
    const n = ui(b());
    return n !== "en" && (t = `${n}/${t}`),
        `https://coinmarketcap.com/${t}`
}

function ii(e) {
    return a(U, {
        get href() {
            return oi(e.currency.slug)
        },
        get title() {
            return b().cmc_tooltip.replace("(currency)", e.currency.name)
        },
        name: "CMC",
        class: "solid-button",
        get children() {
            return [a(ri, {}), "Info"]
        }
    })
}
const li = g('<div style="width:1.2em"></div>'),
    si = g("<span></span>");

function ci(e) {
    function t(u) {
        return b().trade_tooltip.replace("(currency)", e.currency.name).replace("(exchange)", u)
    }
    const n = E(() => {
            const u = [];
            let o = 0;
            for (const i of S.exchanges) {
                const l = e.currency.symbols[i.id];
                u.push({
                        exchange: i,
                        symbol: l
                    }),
                    l && o++
            }
            return {
                items: u,
                count: o
            }
        }),
        r = () => {
            const u = n().items.filter(o => o.symbol).map(o => o.exchange.name);
            return t(u.join(", "))
        };
    return a(A, {
        get when() {
            return n().count > 0
        },
        get children() {
            return a(Bt, {
                solid: !0,
                get title() {
                    return r()
                },
                get content() {
                    return [E(() => b().trade), a(O, {
                        get each() {
                            return n().items
                        },
                        children: u => a(A, {
                            get when() {
                                return u.symbol
                            },
                            get fallback() {
                                return a(A, {
                                    get when() {
                                        return e.insertUnlistedDummys
                                    },
                                    get children() {
                                        return li.cloneNode(!0)
                                    }
                                })
                            },
                            get children() {
                                return a(u.exchange.iconComponent, {})
                            }
                        })
                    })]
                },
                get children() {
                    return a(O, {
                        get each() {
                            return n().items
                        },
                        children: u => a(A, {
                            keyed: !0,
                            get when() {
                                return u.symbol
                            },
                            children: o => a(U, {
                                class: "menu-item",
                                get href() {
                                    return u.exchange.getSpotTradeUrl(o)
                                },
                                get title() {
                                    return t(u.exchange.name)
                                },
                                get name() {
                                    return `${u.exchange.name}_Trade`
                                },
                                get children() {
                                    return [a(u.exchange.iconComponent, {}), (() => {
                                        const i = si.cloneNode(!0);
                                        return h(i, () => u.exchange.name),
                                            i
                                    })(), a(zn, {
                                        class: "color-secondary"
                                    })]
                                }
                            })
                        })
                    })
                }
            })
        }
    })
}
const ai = g('<div class="currency-links"></div>');

function Kn(e) {
    return (() => {
        const t = ai.cloneNode(!0);
        return h(t, a(ii, {
                get currency() {
                    return e.currency
                }
            }), null),
            h(t, a(ci, {
                get currency() {
                    return e.currency
                },
                get insertUnlistedDummys() {
                    return e.tabular
                }
            }), null),
            t
    })()
}

function di(e, t, n) {
    return e + (t - e) * n
}
class Zn {
    constructor(t, n) {
        m(this, "duration");
        m(this, "startValue");
        m(this, "endValue");
        m(this, "startTime");
        this.duration = n,
            this.startValue = 0,
            this.endValue = t,
            this.startTime = null
    }
    get() {
        if (this.startTime === null)
            return this.endValue; {
            const t = Date.now() - this.startTime;
            if (t >= this.duration)
                return this.startTime = null,
                    this.endValue;
            const n = t / this.duration;
            return di(this.startValue, this.endValue, n)
        }
    }
    set(t, n = !1) {
        n ? this.startTime = null : (this.startValue = this.get(),
                this.startTime = Date.now()),
            this.endValue = t
    }
    isDone() {
        return this.startTime === null ? !0 : Date.now() >= this.startTime + this.duration ? (this.startTime = null,
            !0) : !1
    }
}
const hi = g('<strong class="number"></strong>');

function Ye(e) {
    const [t, n] = v(e.children), [r, u] = v(e.children), [o, i] = v(""), l = new Zn(e.children, 500);
    let c = null;
    const s = () => {
        l.isDone() ? (u(t()),
            i(""),
            c = null) : (u(l.get()),
            c = requestAnimationFrame(s))
    };
    I(() => {
            const f = t(),
                p = e.children;
            if (f !== p) {
                n(p),
                    l.set(p);
                const _ = p - f,
                    C = e.reverseColor ? -_ : _,
                    y = ye(C, ee());
                i(y ? `color: ${y}` : ""),
                    c = requestAnimationFrame(s)
            }
        }),
        X(() => {
            c !== null && (cancelAnimationFrame(c),
                c = null)
        });
    const d = () => {
        switch (e.format) {
            case "currency":
                return ne(r(), K());
            default:
                return Math.round(r())
        }
    };
    return (() => {
        const f = hi.cloneNode(!0);
        return h(f, d),
            x(p => Je(f, o(), p)),
            f
    })()
}
const fi = g('<svg width="24" height="12" viewBox="0 6 24 12"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path></svg>'),
    gi = e => (() => {
        const t = fi.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    Zt = g('<span class="currency-rank-change"></span>'),
    mi = g('<span class="currency-rank"></span>');

function Jn(e) {
    const t = () => ye(e.currency.rankChange, ee());
    return (() => {
        const n = mi.cloneNode(!0);
        return h(n, a(A, {
                get when() {
                    return e.currency.rankChange < 0
                },
                get children() {
                    const r = Zt.cloneNode(!0);
                    return h(r, () => Math.abs(e.currency.rankChange), null),
                        h(r, a(Pn, {}), null),
                        x(() => r.style.setProperty("color", t())),
                        r
                }
            }), null),
            h(n, a(A, {
                get when() {
                    return e.currency.rankChange > 0
                },
                get children() {
                    const r = Zt.cloneNode(!0);
                    return h(r, a(gi, {}), null),
                        h(r, () => e.currency.rankChange, null),
                        x(() => r.style.setProperty("color", t())),
                        r
                }
            }), null),
            h(n, a(A, {
                get when() {
                    return e.animate
                },
                get fallback() {
                    return e.currency.rank
                },
                get children() {
                    return a(Ye, {
                        format: "integer",
                        reverseColor: !0,
                        get children() {
                            return e.currency.rank
                        }
                    })
                }
            }), null),
            n
    })()
}
const pi = g('<div class="currency-header"><img><span></span></div>');

function Qn(e) {
    return (() => {
        const t = pi.cloneNode(!0),
            n = t.firstChild,
            r = n.nextSibling;
        return h(r, () => e.currency.name),
            x(u => {
                const o = e.currency.image,
                    i = e.currency.name,
                    l = `Logo of ${e.currency.name}`;
                return o !== u._v$ && B(n, "src", u._v$ = o),
                    i !== u._v$2 && B(n, "alt", u._v$2 = i),
                    l !== u._v$3 && B(n, "title", u._v$3 = l),
                    u
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }),
            t
    })()
}
const bi = g('<td class="center"></td>'),
    Ci = g('<tr><td class="right"></td><td><div class="name-cell"></div></td><td class="right"></td><td class="right"></td><td class="right volume"></td><td></td></tr>');

function _i(e) {
    function t(n) {
        const {
            text: r,
            color: u
        } = Dt(n, ee(), !1, !0);
        return (() => {
            const o = bi.cloneNode(!0);
            return o.style.setProperty("background-color", u),
                h(o, r),
                o
        })()
    }
    return (() => {
        const n = Ci.cloneNode(!0),
            r = n.firstChild,
            u = r.nextSibling,
            o = u.firstChild,
            i = u.nextSibling,
            l = i.nextSibling,
            c = l.nextSibling,
            s = c.nextSibling;
        return h(r, a(Jn, {
                get currency() {
                    return e.currency
                }
            })),
            h(o, a(Gn, {
                get currency() {
                    return e.currency
                }
            }), null),
            h(o, a($e, {
                onClick: () => qn(e.currency.id),
                get children() {
                    return a(Qn, {
                        get currency() {
                            return e.currency
                        }
                    })
                }
            }), null),
            h(i, () => ne(e.currency.price, K())),
            h(l, () => ne(e.currency.marketcap, K())),
            h(c, () => ne(e.currency.volume, K())),
            h(n, () => t(e.currency.performance.hour), s),
            h(n, () => t(e.currency.performance.day), s),
            h(n, () => t(e.currency.performance.week), s),
            h(n, () => t(e.currency.performance.month), s),
            h(n, () => t(e.currency.performance.year), s),
            h(s, a(Kn, {
                get currency() {
                    return e.currency
                },
                tabular: !0
            })),
            n
    })()
}
const yi = g('<svg viewBox="0 0 24 24"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></svg>'),
    Ge = e => (() => {
        const t = yi.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })();

function vi(e) {
    Mu(t => t && t.column === e ? t.direction === "asc" ? null : {
        ...t,
        direction: "asc"
    } : {
        column: e,
        direction: "desc"
    })
}
const wi = g('<div class="scroll-container"><table><thead><tr><th></th></tr></thead><tbody></tbody></table></div>'),
    $i = g("<th><div><span></span></div></th>"),
    Ai = [{
        label: () => "#",
        sortComparator: (e, t) => t.rank - e.rank
    }, {
        label: () => b().currencyName,
        sortComparator: (e, t) => t.name.localeCompare(e.name)
    }, {
        label: () => b().price,
        sortComparator: (e, t) => t.price - e.price
    }, {
        label: () => b().marketcap,
        sortComparator: (e, t) => t.marketcap - e.marketcap
    }, {
        label: () => b().volume,
        sortComparator: (e, t) => t.volume - e.volume
    }, {
        label: () => b().period_hour,
        sortComparator: (e, t) => {
            var n, r;
            return ((n = t.performance.hour) != null ? n : 0) - ((r = e.performance.hour) != null ? r : 0)
        }
    }, {
        label: () => b().period_day,
        sortComparator: (e, t) => {
            var n, r;
            return ((n = t.performance.day) != null ? n : 0) - ((r = e.performance.day) != null ? r : 0)
        }
    }, {
        label: () => b().period_week,
        sortComparator: (e, t) => {
            var n, r;
            return ((n = t.performance.week) != null ? n : 0) - ((r = e.performance.week) != null ? r : 0)
        }
    }, {
        label: () => b().period_month,
        sortComparator: (e, t) => {
            var n, r;
            return ((n = t.performance.month) != null ? n : 0) - ((r = e.performance.month) != null ? r : 0)
        }
    }, {
        label: () => b().period_year,
        sortComparator: (e, t) => {
            var n, r;
            return ((n = t.performance.year) != null ? n : 0) - ((r = e.performance.year) != null ? r : 0)
        }
    }];

function xi(e) {
    const [t, n] = v("");
    let r, u;
    const o = () => {
            var c;
            return `sorted-${(c = pt()) == null ? void 0 : c.direction}`
        },
        i = ar(() => {
            var c;
            return (c = pt()) == null ? void 0 : c.column
        });

    function l() {
        if (!r) {
            const c = document.querySelector("header");
            c && (r = c.offsetHeight - 2)
        }
        if (u && r) {
            const c = u.getBoundingClientRect().top * -1,
                s = Math.max(0, Math.round(c + r));
            n(`transform:translateY(${s}px)`)
        }
    }
    return window.addEventListener("scroll", l),
        X(() => window.removeEventListener("scroll", l)),
        (() => {
            const c = wi.cloneNode(!0),
                s = c.firstChild,
                d = s.firstChild,
                f = d.firstChild,
                p = f.firstChild,
                _ = d.nextSibling,
                C = u;
            return typeof C == "function" ? se(C, s) : u = s,
                h(f, a(O, {
                    each: Ai,
                    children: y => (() => {
                        const F = $i.cloneNode(!0),
                            k = F.firstChild,
                            N = k.firstChild;
                        return F.$$click = () => vi(y),
                            h(k, a(Ge, {}), N),
                            h(N, () => y.label()),
                            x(() => T(F, z("sortable", i(y) && o()))),
                            F
                    })()
                }), p),
                h(p, () => b().links),
                h(_, a(O, {
                    get each() {
                        return e.rows
                    },
                    children: y => a(_i, {
                        currency: y
                    })
                })),
                x(y => Je(d, t(), y)),
                c
        })()
}
V(["click"]);

function Fi(e) {
    switch (e.list[0]) {
        case "block":
            return tt;
        case "watch": {
            const t = e.list[1],
                n = ge.find(r => r.id === t);
            if (n)
                return n.record
        }
    }
    return et
}

function ki(e) {
    switch (e.type) {
        case "list":
            const t = Fi(e);
            return n => t[n.id];
        case "slice":
            return n => n.rank >= e.from && n.rank <= e.to;
        case "exchange":
            return n => n.symbols[e.exchange] !== null;
        default:
            return n => n.rank > 0 && n.rank <= 100
    }
}
const Le = le(() => E(() => {
        const e = me(),
            t = ki(e);
        let n = t;
        return e.type !== "list" && ($t() ? n = r => !r.stable && !bt(r) && t(r) : n = r => !bt(r) && t(r)),
            At.filter(n)
    })),
    de = le(() => E(() => {
        const e = wt();
        return Z.find(t => t.id === e) || Z[0]
    })),
    Ei = le(() => E(() => {
        const e = En();
        return e && At.find(t => t.id === e) || null
    }));

function Bi() {
    const e = me();
    if (e.type === "list") {
        const {
            list: t
        } = e;
        switch (t[0]) {
            case "block":
                return b().blocklist;
            case "watch":
                const n = t[1],
                    r = ge.findIndex(u => u.id === n);
                if (r !== -1)
                    return jn(ge[r], r)
        }
    }
    return b().favorites
}

function er() {
    return b().empty_list.replace("(name)", Bi())
}
const Li = g('<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>'),
    Di = e => (() => {
        const t = Li.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    Si = g('<div class="search-container"></div>'),
    Ni = g('<div class="center-container"></div>'),
    Mi = g('<div class="center-container"><p></p></div>'),
    Jt = 50,
    Pi = 50,
    zi = 10;

function Qt() {
    const [e, t] = v(""), [n, r] = v(Jt), u = () => e().trim().toUpperCase();
    I(hr(me, () => {
        r(Jt)
    }));
    const o = E(() => {
        const i = u(),
            l = pt();
        let c = n(),
            s = Le();
        if (i && (c = zi,
                s = At.filter(d => d.nameUpper.includes(i) || d.symbol.includes(i))),
            l) {
            const {
                sortComparator: d
            } = l.column;
            s = [...s].sort(l.direction === "asc" ? (f, p) => d(p, f) : d)
        }
        return s.slice(0, c)
    });
    return a(A, {
        get when() {
            return We() === "loaded"
        },
        get children() {
            return [(() => {
                const i = Si.cloneNode(!0);
                return h(i, a(Me, {
                        get value() {
                            return e()
                        },
                        action: "clear",
                        iconComponent: Di,
                        get placeholder() {
                            return b().search_crypto
                        },
                        onInput: t
                    })),
                    i
            })(), a(A, {
                get when() {
                    return o().length > 0
                },
                get fallback() {
                    return (() => {
                        const i = Mi.cloneNode(!0),
                            l = i.firstChild;
                        return h(l, (() => {
                                const c = E(() => u().length === 0);
                                return () => c() ? er() : b().not_found
                            })()),
                            i
                    })()
                },
                get children() {
                    return [a(xi, {
                        get rows() {
                            return o()
                        }
                    }), a(A, {
                        get when() {
                            return E(() => Le().length > n())() && u().length === 0
                        },
                        get children() {
                            const i = Ni.cloneNode(!0);
                            return h(i, a($e, {
                                    onClick: () => r(l => l + Pi),
                                    get children() {
                                        return [a(Ge, {}), E(() => b().show_more)]
                                    }
                                })),
                                i
                        }
                    })]
                }
            })]
        }
    })
}

function Ie(e, t, n) {
    return e < t ? t : e > n ? n : e
}
const en = {
    red: 127,
    green: 127,
    blue: 127
};

function Ti(e, t, n) {
    const {
        color: r,
        period: u,
        colors: o
    } = t;
    switch (r) {
        case "neutral":
            return en;
        case "performance": {
            const i = e.currency.performance[u];
            if (i === null)
                return en;
            const l = n === 0 ? 1 : Math.abs(i) / n,
                c = Math.min(1, Math.max(.2, l)),
                s = Math.floor(127 * (1 - c)),
                d = Math.floor(155 + 100 * c);
            return i > 0 ? o === "yellow-blue" ? {
                red: s,
                green: s + 70,
                blue: d
            } : {
                red: s,
                green: d,
                blue: s
            } : o === "yellow-blue" ? {
                red: d,
                green: d,
                blue: s
            } : {
                red: d,
                green: s,
                blue: s
            }
        }
    }
}

function Ii(e) {
    return `${(e * 100).toFixed(2)}%`
}

function Oi(e, t) {
    const {
        content: n,
        period: r,
        baseCurrency: u
    } = t;
    switch (n) {
        case "name":
            return e.currency.name;
        case "price":
            return ne(e.currency.price, u);
        case "marketcap":
            return ne(e.currency.marketcap, u);
        case "volume":
            return ne(e.currency.volume, u);
        case "performance": {
            const o = e.currency.performance[r];
            return Dt(o, "red-green").text
        }
        case "rank":
            return e.currency.rank.toString();
        case "dominance":
            return Ii(e.currency.dominance)
    }
}

function Ri(e, t) {
    const {
        size: n,
        period: r
    } = t;
    switch (n) {
        case "marketcap":
            return e.currency.marketcap;
        case "volume":
            return e.currency.volume;
        case "performance": {
            const u = Math.abs(e.currency.performance[r] || 0);
            return Math.min(5e3, u)
        }
    }
}

function tn() {
    return Math.random() * 2 - 1
}
class tr {
    static get(t) {
        let n = this.images[t];
        if (!n) {
            const r = document.createElement("img");
            let u = !1;
            r.addEventListener("load", () => {
                    u = !0
                }),
                r.src = t,
                n = () => u ? r : null,
                this.images[t] = n
        }
        return n
    }
}
m(tr, "images", {});
class Vi {
    constructor(t) {
        m(this, "context");
        m(this, "canvas");
        m(this, "padding");
        m(this, "size", null);
        m(this, "imageBitmap", null);
        this.canvas = document.createElement("canvas"),
            this.context = this.canvas.getContext("2d"),
            this.padding = t
    }
    begin(t) {
        const n = t + this.padding * 2;
        this.size !== n ? (this.size = n,
            this.canvas.width = n,
            this.canvas.height = n) : this.context.clearRect(0, 0, n, n)
    }
    end() {
        this.imageBitmap = null;
        try {
            createImageBitmap(this.canvas).then(t => this.imageBitmap = t).catch(() => {})
        } catch (t) {}
    }
    createRadialGradient(t, n, r, u, o, i) {
        return this.context.createRadialGradient(t + this.padding, n + this.padding, r, u + this.padding, o + this.padding, i)
    }
    circle(t, n, r) {
        this.context.beginPath(),
            this.context.arc(t + this.padding, n + this.padding, r, 0, 2 * Math.PI),
            this.context.closePath()
    }
    stroke(t, n) {
        this.context.lineWidth = n,
            this.context.strokeStyle = t,
            this.context.stroke()
    }
    fill(t) {
        this.context.fillStyle = t,
            this.context.fill()
    }
    fillText(t, n, r, u) {
        this.context.font = `${Math.ceil(u)}px Arial`,
            this.context.fillText(t, n + this.padding, r + this.padding)
    }
    drawImage(t, n, r, u, o) {
        this.context.drawImage(t, n + this.padding, r + this.padding, u, o)
    }
    getImage() {
        return this.imageBitmap || this.canvas
    }
}
class ji {
    constructor(t) {
        m(this, "lastFingerprint", "");
        m(this, "canvas");
        m(this, "lazyImage");
        m(this, "radiusTween", new Zn(0, 1e3));
        m(this, "color", "");
        m(this, "transition", null);
        m(this, "currency");
        m(this, "posX", 0);
        m(this, "posY", 0);
        m(this, "speedX", 0);
        m(this, "speedY", 0);
        m(this, "size", 0);
        m(this, "radius", 0);
        m(this, "content", "");
        m(this, "visible", !1);
        m(this, "latestPush", 0);
        m(this, "renderFavoriteBorder", !0);
        this.currency = t,
            this.canvas = new Vi($.bubbleCanvasPadding),
            this.lazyImage = tr.get(t.image)
    }
    applyForce(t, n) {
        this.speedX += t,
            this.speedY += n
    }
    setRadius(t, n) {
        this.radiusTween.set(t, n),
            n || (this.transition = {
                rerendered: !1,
                radius: Math.max(t, this.radius)
            })
    }
    setColor(t) {
        const {
            red: n,
            green: r,
            blue: u
        } = t;
        this.color = `${Math.round(n)}, ${Math.round(r)}, ${Math.round(u)}`
    }
    setContent(t) {
        this.content = t
    }
    update() {
        this.radius = this.radiusTween.get(),
            this.visible = this.radius > 0
    }
    rerender(t) {
        const n = this.lazyImage(),
            r = Math.round(t),
            u = this.renderFavoriteBorder && Yn(this.currency),
            o = `${this.color} ${r} ${this.content} ${Boolean(n)} ${u}`;
        if (o !== this.lastFingerprint) {
            this.lastFingerprint = o;
            const i = r * 2;
            this.canvas.begin(i);
            const l = this.canvas.createRadialGradient(r, r, 0, r, r, r);
            if (l.addColorStop(0, `rgba(${this.color}, 0.05)`),
                l.addColorStop(.8, `rgba(${this.color}, 0.1)`),
                l.addColorStop(.9, `rgba(${this.color}, 0.4)`),
                l.addColorStop(1, `rgb(${this.color})`),
                this.canvas.circle(r, r, r),
                this.canvas.fill(l),
                u) {
                const C = ee() === "red-green" ? "yellow" : "#f4a";
                this.canvas.circle(r, r, r),
                    this.canvas.stroke(C, $.bubbleBorderWidth)
            }
            const c = r > 30,
                s = r * (c ? .55 : 1.2),
                d = n ? n.width / n.height : 1,
                f = s * d,
                p = (i - f) * .5,
                _ = (i - s) * (c ? .14 : .5);
            if (n)
                this.canvas.drawImage(n, p, _, f, s);
            else {
                const C = s * .5;
                this.canvas.circle(p + C, _ + C, C),
                    this.canvas.fill("#bbb")
            }
            if (c) {
                this.canvas.context.textAlign = "center",
                    this.canvas.context.fillStyle = "white";
                const C = this.currency.symbol.length < 5 ? .55 : .35,
                    y = r * C;
                this.canvas.fillText(this.currency.symbol, r, r * 1.25, y);
                const F = this.content.length > 8 ? .24 : .3,
                    k = r * F;
                this.canvas.fillText(this.content, r, r * 1.65, k)
            }
            this.canvas.end()
        }
    }
    render(t) {
        const {
            canvas: n,
            posX: r,
            posY: u,
            radius: o,
            radiusTween: i,
            transition: l
        } = this, c = o + $.bubbleCanvasPadding, s = r - c, d = u - c;
        if (l) {
            l.rerendered || (l.rerendered = !0,
                this.rerender(l.radius));
            const f = c * 2;
            t.drawImage(n.getImage(), s, d, f, f),
                i.isDone() && (this.transition = null)
        } else
            this.rerender(o),
            t.drawImage(n.getImage(), s, d)
    }
}
class nr {
    constructor(t) {
        m(this, "container");
        m(this, "frameHandle", null);
        m(this, "lastTime", null);
        m(this, "elementWidth", 0);
        m(this, "elementHeight", 0);
        m(this, "nextContainerFill", 0);
        m(this, "canvas");
        m(this, "context");
        m(this, "width", 0);
        m(this, "height", 0);
        m(this, "eventResize", new He);
        m(this, "eventFrame", new He);
        this.canvas = t,
            this.container = t.parentElement,
            this.context = t.getContext("2d"),
            this.frame = this.frame.bind(this),
            this.fillContainer = this.fillContainer.bind(this)
    }
    start() {
        window.addEventListener("resize", this.fillContainer),
            this.fillContainer(),
            this.requestFrame()
    }
    stop() {
        window.removeEventListener("resize", this.fillContainer),
            this.frameHandle !== null && cancelAnimationFrame(this.frameHandle)
    }
    frame(t) {
        this.frameHandle = null;
        let n = 0;
        this.lastTime !== null && (n = Math.min((t - this.lastTime) * .001, .1)),
            this.lastTime = t,
            this.nextContainerFill < Date.now() && this.fillContainer(),
            this.eventFrame.fire(n)
    }
    fillContainer() {
        this.nextContainerFill = Date.now() + 1e3;
        const t = this.container.clientWidth,
            n = this.container.clientHeight,
            r = t * window.devicePixelRatio,
            u = n * window.devicePixelRatio;
        (this.elementWidth !== t || this.elementHeight !== n) && (this.canvas.style.width = `${t}px`,
            this.canvas.style.height = `${n}px`,
            this.elementWidth = t,
            this.elementHeight = n),
        (this.width !== r || this.height !== u) && (this.canvas.width = r,
            this.canvas.height = u,
            this.width = r,
            this.height = u,
            this.eventResize.fire())
    }
    clear() {
        const {
            context: t,
            width: n,
            height: r
        } = this;
        t.clearRect(0, 0, n, r)
    }
    requestFrame() {
        this.frameHandle === null && (this.frameHandle = requestAnimationFrame(this.frame))
    }
}
class Wi extends nr {
    constructor(n, r) {
        super(n);
        m(this, "needsRecalculation", !1);
        m(this, "recalculationCount", 0);
        m(this, "latestPush", 0);
        m(this, "bubbles", []);
        m(this, "bubblesDict", {});
        m(this, "properties");
        m(this, "pointerX", -1);
        m(this, "pointerY", -1);
        m(this, "hoveredBubble", null);
        m(this, "draggedBubble", null);
        m(this, "possibleSelectedBubble", null);
        m(this, "timePointerDown", 0);
        m(this, "timeLastWakeUp", Date.now());
        m(this, "selectedCurrencyId", null);
        m(this, "renderFavoriteBorder", !0);
        m(this, "eventSelect", new He);
        this.eventResize.register(() => {
                this.needsRecalculation = !0,
                    this.requestFrame()
            }),
            this.eventFrame.register(u => {
                this.needsRecalculation && this.recalculcate(),
                    this.update(u),
                    this.render();
                const o = Date.now() - this.timeLastWakeUp,
                    i = Math.round(o / 150 - 20),
                    l = Ie(i, 0, 80);
                l > 0 ? window.setTimeout(() => this.requestFrame(), l) : this.requestFrame()
            }),
            this.properties = r,
            n.addEventListener("pointerdown", u => this.handlePointerDown(u), {
                passive: !1
            }),
            n.addEventListener("pointermove", u => this.handlePointerMove(u)),
            n.addEventListener("touchmove", u => this.handleTouchMove(u), {
                passive: !1
            }),
            n.addEventListener("pointerup", u => this.handlePointerUp(u)),
            n.addEventListener("pointercancel", () => this.handlePointerCancel())
    }
    updatePointerPosition(n) {
        this.pointerX = n.offsetX * window.devicePixelRatio,
            this.pointerY = n.offsetY * window.devicePixelRatio
    }
    wakeUp() {
        this.timeLastWakeUp = Date.now()
    }
    getFocusedBubble() {
        for (let n = this.bubbles.length - 1; n >= 0; n--) {
            const r = this.bubbles[n];
            if (r.visible) {
                const u = r.posX - this.pointerX,
                    o = r.posY - this.pointerY,
                    i = u * u + o * o,
                    l = r.radius + $.bubbleExtraHitbox;
                if (l * l >= i)
                    return r
            }
        }
        return null
    }
    handlePointerDown(n) {
        !n.isPrimary || (this.timePointerDown = Date.now(),
            this.canvas.setPointerCapture(n.pointerId),
            n.pointerType === "mouse" ? this.draggedBubble = this.hoveredBubble : (this.updatePointerPosition(n),
                this.draggedBubble = this.getFocusedBubble()),
            this.draggedBubble ? this.possibleSelectedBubble = this.draggedBubble : this.launchExplosion(),
            n.preventDefault())
    }
    handlePointerMove(n) {
        if (!n.isPrimary)
            return;
        this.updatePointerPosition(n);
        const r = this.getFocusedBubble();
        if (n.pointerType === "mouse") {
            this.hoveredBubble = r;
            const u = this.draggedBubble || this.hoveredBubble;
            this.canvas.style.cursor = u ? "pointer" : "auto"
        }
        this.possibleSelectedBubble !== r && (this.possibleSelectedBubble = null)
    }
    handleTouchMove(n) {
        this.draggedBubble && n.preventDefault()
    }
    handlePointerUp(n) {
        if (!!n.isPrimary) {
            if (this.possibleSelectedBubble && Date.now() - this.timePointerDown < 1e3) {
                const {
                    currency: u
                } = this.possibleSelectedBubble;
                this.possibleSelectedBubble = null,
                    this.eventSelect.fire(u.id)
            }
            this.draggedBubble = null
        }
    }
    handlePointerCancel() {
        this.hoveredBubble = null,
            this.draggedBubble = null
    }
    launchExplosion() {
        for (const n of this.bubbles) {
            const r = n.posX - this.pointerX,
                u = n.posY - this.pointerY,
                o = Math.max(1, Math.sqrt(r * r + u * u)),
                i = 5e3 / o / o;
            n.applyForce(r * i, u * i)
        }
        this.wakeUp()
    }
    update(n) {
        const r = Math.pow(.5, n),
            u = Math.min(this.width, this.height) * .001;
        for (const o of this.bubbles)
            o.update();
        for (let o = 0; o < this.bubbles.length; o++) {
            const i = this.bubbles[o];
            if (!!i.visible) {
                for (let l = o + 1; l < this.bubbles.length; l++) {
                    const c = this.bubbles[l];
                    if (!c.visible)
                        continue;
                    const s = i.posX - c.posX,
                        d = i.posY - c.posY,
                        f = Math.max(1, Math.sqrt(s * s + d * d)),
                        p = i.radius + c.radius;
                    if (f < p) {
                        const _ = 6 / f,
                            C = s * _,
                            y = d * _,
                            F = 1 - i.radius / p,
                            k = c.radius / p - 1;
                        i.applyForce(C * F, y * F),
                            c.applyForce(C * k, y * k)
                    }
                }
                i.applyForce(tn() * u, tn() * u)
            }
        }
        if (this.draggedBubble) {
            const o = this.pointerX - this.draggedBubble.posX,
                i = this.pointerY - this.draggedBubble.posY,
                c = 5 / Math.max(1, Math.sqrt(o * o + i * i));
            this.draggedBubble.applyForce(o * c, i * c),
                this.wakeUp()
        }
        for (const o of this.bubbles)
            o.speedX *= r,
            o.speedY *= r,
            o.posX += o.speedX * n,
            o.posY += o.speedY * n,
            o.posX < o.radius && (o.posX = o.radius,
                o.speedX *= -.7),
            o.posY < o.radius && (o.posY = o.radius,
                o.speedY *= -.7),
            o.posX > this.width - o.radius && (o.posX = this.width - o.radius,
                o.speedX *= -.7),
            o.posY > this.height - o.radius && (o.posY = this.height - o.radius,
                o.speedY *= -.7)
    }
    renderBubbleBorder(n, r, u = 1) {
        this.context.beginPath(),
            this.context.arc(n.posX, n.posY, n.radius, 0, 2 * Math.PI),
            this.context.closePath(),
            this.context.lineWidth = $.bubbleBorderWidth * u,
            this.context.strokeStyle = r,
            this.context.stroke()
    }
    render() {
        this.clear();
        let n = null;
        for (const r of this.bubbles)
            if (r.renderFavoriteBorder = this.renderFavoriteBorder,
                r.visible) {
                if (r.currency.id === this.selectedCurrencyId) {
                    n = r;
                    continue
                }
                if (this.draggedBubble === r)
                    continue;
                r.render(this.context)
            }
        if (this.draggedBubble ? this.draggedBubble !== n && (this.draggedBubble.render(this.context),
                this.renderBubbleBorder(this.draggedBubble, "white")) : this.hoveredBubble && this.renderBubbleBorder(this.hoveredBubble, "white"),
            n) {
            n.render(this.context);
            const r = Math.sin(Date.now() * .008) * .5 + .5,
                u = r + 2,
                o = `rgb(${Math.floor(r * 255)}, ${Math.floor(r * 160) + 95}, 255)`;
            this.renderBubbleBorder(n, o, u)
        }
    }
    recalculcate() {
        if (this.needsRecalculation = !1,
            this.bubbles.length === 0)
            return;
        const n = this.recalculationCount === 0;
        let r = 0,
            u = 0;
        for (const l of this.bubbles) {
            const c = l.latestPush === this.latestPush;
            if (l.size = c ? Ri(l, this.properties) : 0,
                l.size > 0) {
                r += l.size;
                const s = l.currency.performance[this.properties.period];
                s && s > u && (u = s)
            }
        }
        u = Math.min(20, u);
        const o = this.width * this.height,
            i = r === 0 ? 0 : o / r * .6;
        for (const l of this.bubbles) {
            const c = Math.sqrt(l.size * i / Math.PI);
            l.setRadius(c, n),
                l.setColor(Ti(l, this.properties, u)),
                l.setContent(Oi(l, this.properties)),
                l.posX = Ie(l.posX, c, this.width - c),
                l.posY = Ie(l.posY, c, this.height - c)
        }
        this.recalculationCount++,
            this.wakeUp()
    }
    setProperties(n) {
        this.properties = n,
            this.needsRecalculation = !0
    }
    pushCurrencies(n) {
        this.latestPush++;
        for (const r of n) {
            const {
                id: u
            } = r;
            let o = this.bubblesDict[u];
            o ? o.currency = r : (o = new ji(r),
                    o.posX = Math.random() * this.width,
                    o.posY = Math.random() * this.height,
                    this.bubbles.push(o),
                    this.bubblesDict[u] = o),
                o.latestPush = this.latestPush
        }
        this.recalculcate()
    }
}
const Hi = g('<svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path></svg>'),
    Ui = e => (() => {
        const t = Hi.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    Xi = g('<div class="loading"><img class="logo" width="64" height="64"><span></span></div>'),
    qi = g('<div class="loading"><span>No internet connection</span></div>');

function Yi() {
    function e() {
        mt("loading"),
            xt()
    }
    return a(Ze, {
        get children() {
            return [a(Y, {
                get when() {
                    return We() === "loading"
                },
                get children() {
                    const t = Xi.cloneNode(!0),
                        n = t.firstChild,
                        r = n.nextSibling;
                    return h(r, () => b().loading),
                        x(u => {
                            const o = $.imageLogo,
                                i = $.appName,
                                l = `Logo of ${$.appName}`;
                            return o !== u._v$ && B(n, "src", u._v$ = o),
                                i !== u._v$2 && B(n, "alt", u._v$2 = i),
                                l !== u._v$3 && B(n, "title", u._v$3 = l),
                                u
                        }, {
                            _v$: void 0,
                            _v$2: void 0,
                            _v$3: void 0
                        }),
                        t
                }
            }), a(Y, {
                get when() {
                    return We() === "loading-failed"
                },
                get children() {
                    const t = qi.cloneNode(!0),
                        n = t.firstChild;
                    return t.$$click = e,
                        h(t, a(Ui, {}), n),
                        t
                }
            })]
        }
    })
}
V(["click"]);

function Gi() {
    const e = me();
    return e.type === "list" && e.list[0] === "favorite"
}
const Ki = g('<div class="bubble-chart"><canvas></canvas><p></p></div>');

function Zi() {
    let e, t, n, r;
    const u = E(() => ({
            size: de().size,
            color: de().color,
            content: de().content,
            period: de().period,
            baseCurrency: K(),
            colors: ee()
        })),
        o = () => {
            n && n.wakeUp()
        };
    cn(() => {
            if (e) {
                const l = e,
                    c = () => {
                        const s = L.isDesktop ? 0 : 55,
                            d = Math.floor(document.documentElement.clientHeight - l.offsetTop - s);
                        l.style.height = `${d}px`
                    };
                r = window.setInterval(c, 1e3),
                    c()
            }
            t && (n = new Wi(t, u()),
                n.eventSelect.register(l => qn(l)),
                n.start(),
                window.addEventListener("focus", o))
        }),
        X(() => {
            window.clearInterval(r),
                n && (n.stop(),
                    window.removeEventListener("focus", o))
        }),
        I(() => {
            n && n.pushCurrencies(Le())
        }),
        I(() => {
            n && n.setProperties(u())
        }),
        I(() => {
            n && (n.selectedCurrencyId = En())
        }),
        I(() => {
            n && (n.renderFavoriteBorder = !Gi())
        });
    const i = () => me().type === "list" && We() === "loaded" && Le().length === 0;
    return (() => {
        const l = Ki.cloneNode(!0),
            c = l.firstChild,
            s = c.nextSibling,
            d = e;
        typeof d == "function" ? se(d, l) : e = l;
        const f = t;
        return typeof f == "function" ? se(f, c) : t = c,
            h(s, er),
            h(l, a(Yi, {}), null),
            x(() => T(s, z("toast", i() && "open"))),
            l
    })()
}

function Pe(e, t) {
    switch (e) {
        case "hour":
            return t.period_hour;
        case "day":
            return t.period_day;
        case "month":
            return t.period_month;
        case "year":
            return t.period_year;
        case "min15":
            return "15 min";
        case "min5":
            return "5 min";
        case "week":
        default:
            return t.period_week
    }
}

function Ji(e, t) {
    switch (e.content) {
        case "dominance":
            return t.dominance;
        case "marketcap":
            return t.marketcap;
        case "volume":
            return t.volume;
        case "name":
            return t.currencyName;
        case "price":
            return t.price;
        case "rank":
            return t.rank;
        case "performance":
        default:
            return Pe(e.period, t)
    }
}

function Qi(e, t) {
    switch (e.size) {
        case "marketcap":
            return t.marketcap;
        case "volume":
            return t.volume;
        case "performance":
        default:
            return Pe(e.period, t)
    }
}

function rr(e, t) {
    const n = Qi(e, t),
        r = Ji(e, t);
    return n === r ? n : `${n} + ${r}`
}

function el(e) {
    const t = () => Z.length >= 2,
        n = s => {
            const d = Z.findIndex(f => f.id === e.value.id);
            d !== -1 && s(d)
        },
        r = () => {
            t() && n(s => {
                const d = e.value,
                    f = Z[Math.max(s - 1, 0)];
                e.onClose(),
                    gt(f.id),
                    ie(p => p.filter(_ => _.id !== d.id))
            })
        },
        u = s => {
            n(d => ie(d, "name", s))
        },
        o = s => {
            n(d => ie(d, "size", s))
        },
        i = s => {
            n(d => ie(d, "content", s))
        },
        l = s => {
            n(d => ie(d, "color", s))
        },
        c = s => {
            n(d => ie(d, "period", s))
        };
    return a(Et, {
        class: "configuration-window",
        get onClose() {
            return e.onClose
        },
        get header() {
            return [a(Me, {
                get value() {
                    return e.value.name
                },
                action: "clear",
                iconComponent: nt,
                get placeholder() {
                    return rr(e.value, b())
                },
                onInput: u
            }), a(A, {
                get when() {
                    return t()
                },
                get children() {
                    return a(Un, {
                        onDelete: r
                    })
                }
            })]
        },
        get children() {
            return [a(ke, {
                get label() {
                    return b().period
                },
                get value() {
                    return e.value.period
                },
                onChange: c,
                get children() {
                    return S.periods.map(s => ({
                        value: s,
                        label: Pe(s, b())
                    }))
                }
            }), a(ke, {
                get label() {
                    return b().bubble_size
                },
                get value() {
                    return e.value.size
                },
                onChange: o,
                get children() {
                    return [{
                        value: "performance",
                        label: b().performance
                    }, {
                        value: "marketcap",
                        label: b().marketcap
                    }, {
                        value: "volume",
                        label: b().volume
                    }]
                }
            }), a(ke, {
                get label() {
                    return b().bubble_content
                },
                get value() {
                    return e.value.content
                },
                onChange: i,
                get children() {
                    return [{
                        value: "performance",
                        label: b().performance
                    }, {
                        value: "marketcap",
                        label: b().marketcap
                    }, {
                        value: "volume",
                        label: b().volume
                    }, {
                        value: "price",
                        label: b().price
                    }, {
                        value: "rank",
                        label: b().rank
                    }, {
                        value: "name",
                        label: b().currencyName
                    }, {
                        value: "dominance",
                        label: b().dominance
                    }]
                }
            }), a(ke, {
                get label() {
                    return b().bubble_color
                },
                get value() {
                    return e.value.color
                },
                onChange: l,
                get children() {
                    return [{
                        value: "performance",
                        label: b().performance
                    }, {
                        value: "neutral",
                        label: b().neutral
                    }]
                }
            })]
        }
    })
}

function tl(e, t, n) {
    const r = {
        left: t,
        top: n,
        behavior: "smooth"
    };
    try {
        e.scrollTo(r)
    } catch (u) {
        try {
            e.scrollTo(t, n)
        } catch (o) {
            try {
                e.scroll(r)
            } catch (i) {
                try {
                    e.scroll(t, n)
                } catch (l) {}
            }
        }
    }
}

function nl(e, t) {
    return e.name && e.name.trim().length > 0 ? e.name : rr(e, t)
}

function rl(e, t) {
    const n = Z.find(u => u.id === e),
        r = Z.find(u => u.id === t);
    n && r && ie(Z.map(u => u.id === e ? r : u.id === t ? n : u))
}
const ul = g("<button></button>");

function ol(e) {
    let t;
    const n = () => {
            let u = 0;
            if (e.configuration.color !== "neutral")
                for (const o of Le()) {
                    const i = o.performance[e.configuration.period];
                    u += Math.sign(i || 0)
                }
            return ye(u, ee())
        },
        r = E(() => de().id === e.configuration.id);
    return I(() => {
            r() && t && e.onScrollTo(t)
        }),
        (() => {
            const u = ul.cloneNode(!0);
            u.addEventListener("drop", i => {
                    if (i.preventDefault(),
                        i.currentTarget.classList.remove("drop"),
                        i.dataTransfer) {
                        const l = i.dataTransfer.getData("text/plain");
                        rl(l, e.configuration.id)
                    }
                }),
                u.addEventListener("dragleave", i => i.currentTarget.classList.remove("drop")),
                u.addEventListener("dragenter", i => i.currentTarget.classList.add("drop")),
                u.addEventListener("dragover", i => i.preventDefault()),
                u.addEventListener("dragend", i => i.currentTarget.classList.remove("drag")),
                u.addEventListener("dragstart", i => {
                    i.dataTransfer && (i.dataTransfer.setData("text/plain", e.configuration.id),
                        i.currentTarget.classList.add("drag"))
                }),
                u.$$click = () => e.onClick(e.configuration);
            const o = t;
            return typeof o == "function" ? se(o, u) : t = u,
                B(u, "draggable", !0),
                h(u, () => nl(e.configuration, b())),
                x(i => {
                    const l = z("tab", r() && "selected"),
                        c = n();
                    return l !== i._v$ && T(u, i._v$ = l),
                        c !== i._v$2 && u.style.setProperty("border-color", i._v$2 = c),
                        i
                }, {
                    _v$: void 0,
                    _v$2: void 0
                }),
                u
        })()
}
V(["click"]);
const il = g('<div class="bubble-chart-header"><div class="configuration-tabs scroll-container"></div></div>');

function ll() {
    let e;
    const [t, n] = v(!1), r = i => {
        wt() === i.id ? n(!t()) : gt(i.id)
    }, u = i => {
        e && tl(e, i.offsetLeft - 64, 0)
    }, o = () => {
        const i = ae("week", "performance");
        ie(l => [...l, i]),
            gt(i.id),
            n(!0)
    };
    return (() => {
        const i = il.cloneNode(!0),
            l = i.firstChild,
            c = e;
        return typeof c == "function" ? se(c, l) : e = l,
            h(l, a(O, {
                each: Z,
                children: s => a(ol, {
                    configuration: s,
                    onClick: r,
                    onScrollTo: u
                })
            })),
            h(i, a(re, {
                small: !0,
                get active() {
                    return t()
                },
                onClick: () => n(!t()),
                get title() {
                    return b().configuration_edit
                },
                get children() {
                    return a(nt, {})
                }
            }), null),
            h(i, a(re, {
                small: !0,
                onClick: o,
                get title() {
                    return b().configuration_add
                },
                get children() {
                    return a(Xe, {})
                }
            }), null),
            h(i, a(Lt, {
                get value() {
                    return E(() => !!t())() ? de() : null
                },
                component: el,
                onClose: () => n(!1)
            }), null),
            i
    })()
}

function nn() {
    return [a(ll, {}), a(Zi, {})]
}

function sl(e) {
    try {
        const t = localStorage.getItem(e);
        return Boolean(t)
    } catch (t) {}
    return !1
}

function cl(e) {
    try {
        localStorage.setItem(e, "1")
    } catch (t) {}
}

function al(e) {
    const [t, n] = v(sl(e));
    return [t, () => {
        n(!0),
            cl(e)
    }]
}

function dl() {
    try {
        window.scrollBy({
            top: 400,
            behavior: "smooth"
        })
    } catch (t) {
        window.scrollBy(0, 400)
    }
}
const hl = g("<p><span></span></p>");

function fl() {
    const [e, t] = al("1631714779047"), [n, r] = v(!0);
    if (e())
        return null;
    const u = window.setTimeout(() => r(!1), 1e4),
        o = () => {
            t(),
                r(!0),
                window.clearTimeout(u),
                window.removeEventListener("scroll", o)
        };
    return window.addEventListener("scroll", o),
        X(o),
        (() => {
            const i = hl.cloneNode(!0),
                l = i.firstChild;
            return De(i, "click", dl, !0),
                h(i, a(Ge, {}), l),
                h(l, () => b().scroll_toast),
                h(i, a(Ge, {}), null),
                x(() => T(i, z("toast", "scroll-toast", n() && "closed"))),
                i
        })()
}
V(["click"]);
const ze = g("<main></main>"),
    rn = g('<div class="nav-filler"></div>');

function gl() {
    return a(Ze, {
        get children() {
            return [a(Y, {
                get when() {
                    return L.isDesktop
                },
                get children() {
                    return [(() => {
                        const e = ze.cloneNode(!0);
                        return h(e, a(nn, {}), null),
                            h(e, a(Qt, {}), null),
                            h(e, a(fl, {}), null),
                            e
                    })(), a(Kt, {})]
                }
            }), a(Y, {
                get when() {
                    return Ee() === "bubbles"
                },
                get children() {
                    const e = ze.cloneNode(!0);
                    return h(e, a(nn, {})),
                        e
                }
            }), a(Y, {
                get when() {
                    return Ee() === "list"
                },
                get children() {
                    return [(() => {
                        const e = ze.cloneNode(!0);
                        return h(e, a(Qt, {})),
                            e
                    })(), rn.cloneNode(!0)]
                }
            }), a(Y, {
                get when() {
                    return Ee() === "settings"
                },
                get children() {
                    return [(() => {
                        const e = ze.cloneNode(!0);
                        return h(e, a(Xn, {})),
                            e
                    })(), a(Kt, {}), rn.cloneNode(!0)]
                }
            })]
        }
    })
}
class ml extends nr {
    constructor(n) {
        super(n);
        m(this, "quotes", null);
        m(this, "baseCurrency", null);
        m(this, "period", null);
        m(this, "colors", "red-green");
        m(this, "pointerX", null);
        this.eventFrame.register(() => this.render()),
            this.eventResize.register(() => this.render()),
            this.canvas.addEventListener("pointermove", r => this.handlePointerUpdate(r)),
            this.canvas.addEventListener("pointerdown", r => this.handlePointerUpdate(r)),
            this.canvas.addEventListener("pointerout", r => this.handlePointerOut(r))
    }
    handlePointerUpdate(n) {
        if (n.isPrimary) {
            const r = Math.round(n.offsetX * window.devicePixelRatio);
            r !== this.pointerX && (this.pointerX = r,
                this.render())
        }
    }
    handlePointerOut(n) {
        n.isPrimary && this.pointerX !== null && (this.pointerX = null,
            this.render())
    }
    drawPointOnChart(n, r, u, o) {
        const {
            context: i,
            width: l,
            height: c
        } = this, {
            x: s,
            y: d
        } = r, f = window.devicePixelRatio, p = l * .5, _ = c * .5, C = ne(n, u);
        i.beginPath(),
            i.arc(s, d, 5 * f, 0, 2 * Math.PI),
            i.fillStyle = o,
            i.fill(),
            i.textAlign = s < p ? "left" : "right",
            i.fillText(C, s + (s < p ? 8 : -8) * f, d + (d < _ ? -10 : 10) * f)
    }
    render() {
        const {
            quotes: n,
            baseCurrency: r,
            period: u,
            context: o,
            width: i,
            height: l,
            pointerX: c
        } = this, s = window.devicePixelRatio;
        if (this.clear(),
            r === null || u === null || n === null || n.length === 0)
            return;
        const d = i / (n.length - 1);
        let f = n[0].p,
            p = n[0].p;
        for (const te of n)
            te.p > p && (p = te.p),
            te.p < f && (f = te.p);
        const _ = p - f;
        let C = 0,
            y = {
                x: 0,
                y: 0
            },
            F = {
                x: 0,
                y: 0
            },
            k = null,
            N = null;
        o.beginPath();
        for (const te of n) {
            const Ae = te.p,
                q = (.8 - (Ae - f) / _ * .7) * l;
            Ae === f && (y.x = C,
                    y.y = q),
                Ae === p && (F.x = C,
                    F.y = q),
                c && !k && c < C + d / 2 && (k = {
                        x: C,
                        y: q
                    },
                    N = te),
                C === 0 ? o.moveTo(C, q + 1) : o.lineTo(C, q + 1),
                C += d
        }
        o.lineWidth = 2 * s,
            o.strokeStyle = "white",
            o.lineJoin = "round",
            o.stroke(),
            o.lineTo(C, l),
            o.lineTo(0, l),
            o.closePath();
        const R = o.createLinearGradient(0, 0, 0, l);
        R.addColorStop(0, "rgba(0, 100, 255, 1)"),
            R.addColorStop(1, "rgba(0, 100, 255, 0)"),
            o.fillStyle = R,
            o.fill();
        const j = Math.round(20 * s);
        o.font = `${j}px Arial`,
            o.textBaseline = "middle";
        const oe = ye(1, this.colors) || "#3f3",
            rt = ye(-1, this.colors) || "#f55";
        if (this.drawPointOnChart(f, y, r, rt),
            this.drawPointOnChart(p, F, r, oe),
            k && N) {
            const {
                p: te,
                t: Ae
            } = N, ut = ne(te, r);
            let q = 0;
            try {
                q = o.measureText(ut).width
            } catch (ir) {}
            q = q || 150;
            const Nt = s * 6,
                Mt = s * 4,
                ot = q + Nt * 2,
                or = j + Mt * 2,
                Pt = Ie(k.x - ot / 2, 0, i - ot),
                zt = 0;
            o.strokeStyle = "#666",
                o.beginPath(),
                o.moveTo(k.x, 0),
                o.lineTo(k.x, l),
                o.closePath(),
                o.stroke(),
                o.fillStyle = "white",
                o.beginPath(),
                o.arc(k.x, k.y, 5 * s, 0, 2 * Math.PI),
                o.closePath(),
                o.fill(),
                o.fillStyle = "#666",
                o.fillRect(Pt, zt, ot, or),
                o.textAlign = "left",
                o.textBaseline = "top",
                o.fillStyle = "white",
                o.fillText(ut, Pt + Nt, zt + Mt);
            const xe = new Date(Ae * 1e3);
            xe.setSeconds(0),
                (u === "week" || u === "month") && xe.setMinutes(0);
            let it = xe.toLocaleString();
            if (u === "year")
                it = xe.toLocaleDateString();
            else
                try {
                    it = xe.toLocaleString(void 0, {
                        dateStyle: "medium",
                        timeStyle: "short"
                    })
                } catch (ir) {}
            o.textAlign = "right",
                o.textBaseline = "bottom",
                o.fillStyle = "#ccc",
                o.fillText(it, i - s * 6, l - s * 6)
        }
    }
}
const pl = g("<div><canvas></canvas><img><p></p></div>");

function bl(e) {
    let t, n;
    const r = new vt,
        [u, o] = v(null),
        i = () => {
            const l = `data/charts/${e.period}/${e.currency.id}/${K().id.toUpperCase()}.json`;
            r.get(l).then(o)
        };
    return cn(() => {
            t && (n = new ml(t),
                    n.start()),
                L.eventUpdateData.register(i)
        }),
        X(() => {
            n && n.stop(),
                L.eventUpdateData.unregister(i),
                r.abort()
        }),
        I(() => {
            o(null),
                i()
        }),
        I(() => {
            n && (n.quotes = u(),
                n.colors = ee(),
                n.baseCurrency = K(),
                n.period = e.period,
                n.requestFrame())
        }),
        (() => {
            const l = pl.cloneNode(!0),
                c = l.firstChild,
                s = c.nextSibling,
                d = s.nextSibling,
                f = t;
            return typeof f == "function" ? se(f, c) : t = c,
                h(d, () => Pe(e.period, b())),
                x(p => {
                    const _ = z("price-chart", u() && "loaded"),
                        C = e.currency.image,
                        y = e.currency.name;
                    return _ !== p._v$ && T(l, p._v$ = _),
                        C !== p._v$2 && B(s, "src", p._v$2 = C),
                        y !== p._v$3 && B(s, "alt", p._v$3 = y),
                        p
                }, {
                    _v$: void 0,
                    _v$2: void 0,
                    _v$3: void 0
                }),
                l
        })()
}

function Cl(e, t) {
    try {
        const n = Number.parseFloat(e);
        if (Number.isFinite(n) && !Number.isNaN(n))
            return n
    } catch (n) {}
    return t
}
const _l = g('<p class="bubble-window-price"><span></span></p>');

function yl(e) {
    const [t, n] = v("1"), r = () => {
        let u = Cl(t(), 1);
        return u < 0 && (u = 1),
            e.currency.price * u
    };
    return (() => {
        const u = _l.cloneNode(!0),
            o = u.firstChild;
        return h(u, a(Me, {
                get value() {
                    return t()
                },
                iconComponent: nt,
                placeholder: "1",
                type: "number",
                onInput: n
            }), o),
            h(o, () => `${e.currency.symbol} =`),
            h(u, a(Ye, {
                format: "currency",
                get children() {
                    return r()
                }
            }), null),
            u
    })()
}
const vl = g('<div class="bubble-window-details"><p><span></span></p><p><span></span></p><p><span></span></p></div>'),
    wl = g('<div class="bubble-window-performance"></div>'),
    $l = g('<div class="grow"></div>'),
    Al = g("<p><span></span><span></span></p>"),
    un = ["hour", "day", "week", "month", "year"];

function xl(e) {
    const [t, n] = v("week");
    return I(() => {
            const r = de().period;
            un.includes(r) ? n(r) : n("hour")
        }),
        a(Et, {
            class: "bubble-window",
            get onClose() {
                return e.onClose
            },
            get header() {
                return [a(Qn, {
                    get currency() {
                        return e.value
                    }
                }), a(Gn, {
                    get currency() {
                        return e.value
                    }
                }), $l.cloneNode(!0)]
            },
            get children() {
                return [a(Kn, {
                    get currency() {
                        return e.value
                    }
                }), a(A, {
                    keyed: !0,
                    get when() {
                        return e.value.id
                    },
                    get children() {
                        return a(yl, {
                            get currency() {
                                return e.value
                            }
                        })
                    }
                }), (() => {
                    const r = vl.cloneNode(!0),
                        u = r.firstChild,
                        o = u.firstChild,
                        i = u.nextSibling,
                        l = i.firstChild,
                        c = i.nextSibling,
                        s = c.firstChild;
                    return h(o, () => b().rank),
                        h(u, a(A, {
                            keyed: !0,
                            get when() {
                                return e.value.id
                            },
                            get children() {
                                return a(Jn, {
                                    animate: !0,
                                    get currency() {
                                        return e.value
                                    }
                                })
                            }
                        }), null),
                        h(l, () => b().marketcap),
                        h(i, a(A, {
                            keyed: !0,
                            get when() {
                                return e.value.id
                            },
                            get children() {
                                return a(Ye, {
                                    format: "currency",
                                    get children() {
                                        return e.value.marketcap
                                    }
                                })
                            }
                        }), null),
                        h(s, () => b().volume),
                        h(c, a(A, {
                            keyed: !0,
                            get when() {
                                return e.value.id
                            },
                            get children() {
                                return a(Ye, {
                                    format: "currency",
                                    get children() {
                                        return e.value.volume
                                    }
                                })
                            }
                        }), null),
                        r
                })(), a(bl, {
                    get period() {
                        return t()
                    },
                    get currency() {
                        return e.value
                    }
                }), (() => {
                    const r = wl.cloneNode(!0);
                    return h(r, a(O, {
                            each: un,
                            children: u => {
                                const o = E(() => {
                                    const i = e.value.performance[u];
                                    return Dt(i, ee(), !0)
                                });
                                return (() => {
                                    const i = Al.cloneNode(!0),
                                        l = i.firstChild,
                                        c = l.nextSibling;
                                    return i.$$click = () => n(u),
                                        h(l, () => Pe(u, b())),
                                        h(c, () => o().text),
                                        x(s => {
                                            const d = z(u === t() && "selected"),
                                                f = o().color;
                                            return d !== s._v$ && T(i, s._v$ = d),
                                                f !== s._v$2 && c.style.setProperty("color", s._v$2 = f),
                                                s
                                        }, {
                                            _v$: void 0,
                                            _v$2: void 0
                                        }),
                                        i
                                })()
                            }
                        })),
                        r
                })()]
            }
        })
}
V(["click"]);
const Fl = g('<svg viewBox="0 0 24 24"><circle cx="7.2" cy="14.4" r="3.2"></circle><circle cx="14.8" cy="18" r="2"></circle><circle cx="15.2" cy="8.8" r="4.8"></circle></svg>'),
    kl = e => (() => {
        const t = Fl.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    El = g('<svg viewBox="2 2 20 20"><path d="M7,9H2V7h5V9z M7,12H2v2h5V12z M20.59,19l-3.83-3.83C15.96,15.69,15.02,16,14,16c-2.76,0-5-2.24-5-5s2.24-5,5-5s5,2.24,5,5 c0,1.02-0.31,1.96-0.83,2.75L22,17.59L20.59,19z M17,11c0-1.65-1.35-3-3-3s-3,1.35-3,3s1.35,3,3,3S17,12.65,17,11z M2,19h10v-2H2 V19z"></path></svg>'),
    Bl = e => (() => {
        const t = El.cloneNode(!0);
        return w(t, e, !0, !0),
            t
    })(),
    Ll = g('<div class="navigation"><div></div><div class="navigation-pages"></div></div>'),
    Dl = [{
        page: "bubbles",
        iconComponent: kl
    }, {
        page: "list",
        iconComponent: Bl
    }, {
        page: "settings",
        iconComponent: Ft
    }];

function Sl() {
    function e(t) {
        Ee() !== t && (Nu(t),
            window.scroll(0, 0))
    }
    return (() => {
        const t = Ll.cloneNode(!0),
            n = t.firstChild,
            r = n.nextSibling;
        return h(n, a(Hn, {})),
            h(r, a(O, {
                each: Dl,
                children: u => a($e, {
                    get active() {
                        return Ee() === u.page
                    },
                    onClick: () => e(u.page),
                    get children() {
                        return a(u.iconComponent, {})
                    }
                })
            })),
            t
    })()
}

function Nl() {
    return I(() => An.save()),
        I(() => xt()),
        [a(Yu, {}), a(Ro, {}), a(gl, {}), a(A, {
            get when() {
                return L.isMobile
            },
            get children() {
                return a(Sl, {})
            }
        }), a(Lt, {
            get value() {
                return Ei()
            },
            component: xl,
            onClose: () => Bn(null)
        })]
}
const Ml = window.matchMedia("(display-mode: standalone)").matches,
    ur = document.getElementById("app"),
    Pl = Ml ? "pwa" : ur.className;
L.create(Pl);
window.addEventListener("load", () => {
    kr(() => a(Nl, {}), ur),
        L.isWeb && "serviceWorker" in navigator && navigator.serviceWorker.register("./sw.js")
});