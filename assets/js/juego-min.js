const miModulo = (() => { "use strict"; let e = []; const t = ["C", "D", "H", "S"],
        r = ["A", "J", "Q", "K"],
        n = document.querySelector("#btnPedir"),
        l = document.querySelector("#btnNuevo"),
        o = document.querySelector("#btnDetener"); let s = [],
        c = document.querySelectorAll(".divCartas"); const i = document.querySelectorAll("small"),
        d = (t = 2) => { e = a(), s = []; for (let e = 0; e < t; e++) s.push(0);
            i.forEach(e => e.innerText = 0), c.forEach(e => e.innerText = " "), n.disabled = !1, o.disabled = !1 },
        a = () => { e = []; for (let r = 2; r <= 10; r++)
                for (let n of t) e.push(r + n); for (let n of t)
                for (const t of r) e.push(t + n); return _.shuffle(e) },
        u = () => { if (0 === e.length) throw "no hay cartas en el deck"; return e.pop() },
        S = (e, t) => (s[t] = s[t] + ((e, t) => { const r = e.substring(0, e.length - 1); return isNaN(r) ? "A" === r ? t <= 10 ? 11 : 1 : 10 : 1 * r })(e, s[t]), i[t].innerText = s[t], s[t]),
        f = (e, t) => { const r = document.createElement("img");
            r.src = `./assets/cartas/${e}.png`, r.classList.add("carta"), c[t].append(r) },
        E = e => { let t = 0;
            do { const e = u();
                t = S(e, s.length - 1), f(e, s.length - 1) } while (t < e && e <= 21);
            (() => { const [e, t] = s;
                setTimeout(() => { t === e ? Swal.fire({ icon: "question", title: e + " PUNTOS", text: "NADIE GANA ES UN EMPATE : " }) : e > 21 ? Swal.fire({ icon: "error", title: e + " PUNTOS", text: "PERDISTE ! " }) : t > 21 ? Swal.fire({ icon: "success", title: e + " PUNTOS", text: "FELICIDADES GANASTE" }) : Swal.fire({ icon: "error", title: "PERDISTE", text: "COMPUTADORA GANA!" }) }, 200) })() }; return n.addEventListener("click", () => { const e = u(),
            t = S(e, 0);
        f(e, 0), t > 21 ? (n.disabled = !0, o.disabled = !0, E(t)) : 21 === t && (n.disabled = !0, o.disabled = !0, E(t)) }), o.addEventListener("click", () => { n.disabled = !0, o.disabled = !0, E(s[0]) }), l.addEventListener("click", () => { d() }), { nuevoJuego: d } })();