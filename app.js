function modelOf(raw) {
  var s = String(raw || "").toLowerCase().replace(/ё/g, "е");
  if (!s.trim()) return "Не указано";
  s = s.replace(/(^|[^а-я])а(?=\d)/g, "$1a");
  if (/ipad|айпад/.test(s)) return "iPad";
  if (/macbook|мак ?бук|imac|\bmac\b/.test(s)) return "MacBook";
  if (/watch|\baw\b|часы/.test(s)) return "Apple Watch";
  if (/airpods|аирподс/.test(s)) return "AirPods";
  if (/ray ?ban|пылесос|колонк|книг|алкотест|мышк|ноут|\basus\b|dji|планшет|vove|электро|кабель|стекло и/.test(s)) return "Прочая техника";
  if (/samsung|самсунг|galaxy|\bs\d{2}\s?(fe|ultra|plus)?\b|\ba\d{2,3}\b|\bm\d{2}s?\b|\bfold\b|\bflip\b/.test(s)) return "Samsung";
  if (/poco|xiaomi|redmi|\bmi\b|mi ?pad|pova|infinix|tecno|techno|реалм|realme|oppo|vivo|oneplus|pixel|honor|хонор|huawei|huawey|хуавей|nova|zte|nokia|meizu|blackview|oukit|окител|android|китайск|\bp\d{2}\b|\bnote ?\d{2}/.test(s)) return "Android (другое)";
  var multi = s.match(/(?:^|[^\d])(1[0-7]|[5-9])\s*(?:pm|pro|max|plus|mini|p)?\s*\//g);
  if (multi && multi.length >= 1 && /\/.*\d/.test(s.split(/[а-я]/)[0] || s)) {
    var nums = (s.match(/(?:^|[\/\s])(1[0-7]|[5-9]|x[rs]?)\s*(?:pm|pro|max|plus|mini|p)?(?=\/|\s|$)/g) || []);
    if (nums.length >= 2) return "Несколько устройств";
  }
  var m = s.match(/(?:^|[^\d])(1[0-7]|[5-9])(?=\s*(?:pm\b|pro\b|max\b|plus\b|mini\b|p\b|e\b)|[^\d]|$)/);
  if (m) {
    var n = +m[1];
    if (n <= 8) return "iPhone 8 и старше";
    return "iPhone " + n;
  }
  if (/(^|[^a-z0-9])x(?:s|r)?(?:\s?m(?:ax)?)?(?=$|[^a-z0-9])/.test(s)) return "iPhone X / XS / XR";
  if (/(^|[^a-z0-9])se(?=$|[^a-z])/.test(s)) return "iPhone SE";
  if (/iphone|айфон/.test(s)) return "iPhone (другое)";
  if (/(^|[^a-zа-я0-9])[aа]\d{4}(?=$|[^0-9])/.test(s)) return "Apple (по номеру A…)";
  return "Прочее";
}
var WORK = [
  ["Свап", /свап|swap|фул/],
  ["Реболл", /ребол|реболл|ребл|reball|перекат/],
  ["Микропайка и платы", /микросхем|резистор|прожиг|половинк|беспровод|микрух|кодек|тристар|тристан|буст|контрол|конденсатор|(?:^|[^а-яa-z0-9])кз(?=$|[^а-яa-z0-9])|модем|nand|нанд|флеш|флкш|чип|паял|пайк|проц|питани|тигр|аваго|драйвер|межплат|плат[аыуе]|фейс|face ?id|датчик|светодиод|гидра|(?:^|[^а-яa-z0-9])сд(?=$|[^а-яa-z0-9])|вай ?фай|wifi|антенн|nfc|удален|выжиган/],
  ["Аккумулятор", /акб|аккум|батар/],
  ["Дисплей и стекло", /диспле|дисп|экран|\bлцд\b|\blcd\b|(?:^|[^а-я])тач|тачскрин|стекл|подсвет|матриц|переклей/],
  ["Крышка и корпус", /крышк|корпус|рамк/],
  ["Разъёмы, кнопки, SIM", /зарядк|разъ|разь|коннект|конект|порт|шлейф|кабел|лотк|лоток|type-?c|ридер|(?:^|[^а-яa-z0-9])сим(?=$|[^а-яa-z0-9])|кнопк|home/],
  ["Влага и чистка", /дунул|просушил|почистил|флюд|вод[аеуы]|залит|влаг|окисл|чистк|ультразвук|коррози|фильтр/],
  ["Камера", /камер|линз/],
  ["Звук", /аудио|динамик|микрофон|звук|разговорн|слуховой/],
  ["Прошивка и разблокировка", /откат|разлок|разблок|нрп|прошил|прошив|сброс|данные|сеть|перенос|приложен|icloud|айклауд|пароль|обновл|восстанов|ошибк|привяз|функци/],
  ["Диагностика", /диагност|осмотр|проверк|(?:^|[^а-яa-z0-9])рма(?=$|[^а-яa-z0-9])|\brma\b/],
  ["Сборка, плёнки, гравировка", /гравиров|пленк|сборк|дособ|клей|перкле|продул|разлом|механизм|зарядили|склеи|перебор/]
];
function workOf(note) {
  var s = String(note || "").toLowerCase().replace(/ё/g, "е");
  for (var i = 0; i < WORK.length; i++) if (WORK[i][1].test(s)) return WORK[i][0];
  if (byMaster(note)) return "Делал другой мастер";
  return "Без описания";
}
function byMaster(note) { return /коля|черных/i.test(String(note || "").replace(/ё/g, "е")); }


(function () {
  var MS = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
  var MF = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  var MG = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  var NF = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });

  var months = {};      // "2026-02" -> [entry]
  var rows = [];        // плоский список с вычисляемыми полями
  var keys = [];        // месяцы с записями, по возрастанию
  var loaded = false;
  var store = null;
  var tab = "log";
  var period = null;    // "all" или "YYYY-MM"
  var logMonth = null;  // "all" или "YYYY-MM"
  var query = "";
  var editing = null;   // id редактируемой записи
  var editingSeq = null;
  var sortBy = "got";
  var showAllModels = false;
  var onlyUnpaid = false;
  var statusFilter = null;
  var STATUSES = [{ id: "work", label: "Готов к выдаче" }, { id: "issued", label: "Выдан" }];
  function normStatus(s) { return s === "issued" ? "issued" : (/^(new|diag|wait|work|ready)$/.test(s || "") ? "work" : "issued"); }
  function statusLabel(id) { return id === "work" ? "Готов к выдаче" : "Выдан"; }
  var items = [];       // записи в том виде, как их хранит приложение
  var sb = null;        // клиент Supabase
  var loading = false;
  var whenTouched = false;

  var $ = function (id) { return document.getElementById(id); };
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  var now = new Date();
  var today = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());

  function h(tag, props) {
    var el = document.createElement(tag);
    for (var k in (props || {})) {
      var v = props[k];
      if (k === "class") el.className = v;
      else if (k.indexOf("on") === 0) el.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) el.setAttribute(k, v);
    }
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c != null && c !== false) el.append(c);
    }
    return el;
  }
  function S(tag, props, text) {
    var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (var k in (props || {})) el.setAttribute(k, props[k]);
    if (text != null) el.textContent = text;
    return el;
  }

  function plain(n) { return n == null ? "—" : NF.format(Math.round(n)); }
  function rubShort(n) {
    if (n == null) return "—";
    if (n >= 1e6) return (n / 1e6).toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "\u00a0млн\u00a0₽";
    return NF.format(Math.round(n)) + "\u00a0₽";
  }
  function rub(n) { return n == null ? "—" : NF.format(Math.round(n)) + " ₽"; }
  function pct(x) { return x == null || !isFinite(x) ? "—" : (x * 100).toLocaleString("ru-RU", { maximumFractionDigits: 1 }) + "%"; }
  function short(n) {
    if (n >= 1e6) return (n / 1e6).toLocaleString("ru-RU", { maximumFractionDigits: 1 }) + "М";
    if (n >= 1000) return Math.round(n / 1000) + "к";
    return String(Math.round(n));
  }
  function toNum(v) {
    v = String(v == null ? "" : v).replace(/\s/g, "").replace(",", ".");
    if (v === "") return null;
    var n = Number(v);
    return isFinite(n) ? n : null;
  }
  function dayNum(d) { return +d.slice(8, 10); }
  function dayLabel(d) {
    var base = dayNum(d) + " " + MG[+d.slice(5, 7) - 1];
    if (d.slice(0, 4) !== today.slice(0, 4)) base += " " + d.slice(0, 4);
    if (d === today) return "Сегодня · " + base;
    var y = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    if (d === y.getFullYear() + "-" + pad(y.getMonth() + 1) + "-" + pad(y.getDate())) return "Вчера · " + base;
    var wd = new Intl.DateTimeFormat("ru-RU", { weekday: "short" }).format(new Date(+d.slice(0, 4), +d.slice(5, 7) - 1, dayNum(d)));
    return base + " · " + wd;
  }
  function shortDate(d) {
    var s = dayNum(d) + " " + MS[+d.slice(5, 7) - 1].toLowerCase();
    return d.slice(0, 4) !== today.slice(0, 4) ? s + " " + d.slice(0, 4) : s;
  }
  function monthName(k) { return MF[+k.slice(5, 7) - 1]; }
  function monthShort(k) { return MS[+k.slice(5, 7) - 1]; }

  var toastTimer;
  function toast(msg) {
    var t = $("toast"); t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 3500);
  }

  /* ---------- данные ---------- */
  function rebuild() {
    months = {};
    items.forEach(function (e) { var k = String(e.date).slice(0, 7); (months[k] = months[k] || []).push(e); });
    var out = [];
    Object.keys(months).forEach(function (k) {
      (months[k] || []).forEach(function (e) {
        out.push({
          id: e.id, device: e.device || "", client: e.client || "", note: e.note || "",
          date: e.date || (k + "-01"), time: e.time || "", price: toNum(e.price), got: toNum(e.got), cost: toNum(e.cost),
          paid: (e.paid === true || e.paid === false) ? e.paid : (toNum(e.got) != null),
          paidAt: e.paidAt || null, status: "issued",
          seq: e.seq || 0, m: k,
          model: modelOf(e.device), work: workOf(e.note), master: byMaster(e.note)
        });
      });
    });
    out.sort(function (a, b) {
      if (a.date !== b.date) return a.date < b.date ? 1 : -1;
      if (a.time !== b.time) return a.time < b.time ? 1 : -1;
      return b.seq - a.seq;
    });
    out.forEach(function (r) { r.status = r.paid ? "issued" : "work"; });
    rows = out;
    keys = Object.keys(months).filter(function (k) { return months[k] && months[k].length; }).sort();
    var latest = keys[keys.length - 1] || null;
    if (latest && (!period || period === "all" || keys.indexOf(period) < 0)) period = latest;
    if (latest && (!logMonth || (logMonth !== "all" && keys.indexOf(logMonth) < 0))) logMonth = latest;
  }

  function findEntry(id) {
    for (var i = 0; i < rows.length; i++) if (rows[i].id === id) return rows[i];
    return null;
  }

  /* ---------- данные: база Supabase ---------- */
  var T = "repairs";
  function newId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 3 | 8)).toString(16);
    });
  }
  function fromDb(r) {
    return { id: r.id, device: r.device || "", client: r.client || "", note: r.note || "", date: r.date, time: r.time || "",
      price: r.amount == null ? null : Number(r.amount), got: r.got == null ? null : Number(r.got), paid: !!r.paid, paidAt: r.paid_at || null, cost: r.part_cost == null ? null : Number(r.part_cost), seq: Number(r.seq) || 0 };
  }
  function toDb(e) {
    return { device: e.device, client: e.client, note: e.note, date: e.date, time: e.time || null,
      amount: e.price, got: e.got, paid: !!e.paid, paid_at: e.paidAt || null, part_cost: e.cost == null ? null : e.cost, seq: e.seq };
  }
  function commit() { rebuild(); renderAll(); }
  async function loadAll() {
    if (loading) return;
    loading = true;
    try {
      var all = [], from = 0, step = 1000;
      for (;;) {
        var res = await sb.from(T).select("*").order("date", { ascending: false }).order("id").range(from, from + step - 1);
        if (res.error) throw res.error;
        all = all.concat(res.data || []);
        if (!res.data || res.data.length < step) break;
        from += step;
      }
      items = all.map(fromDb);
      loaded = true; commit();
    } finally { loading = false; }
  }
  function reloadQuietly() { loadAll().catch(function () {}); }
  function saveEntry(ent, isEdit) {
    items = isEdit ? items.map(function (e) { return e.id === ent.id ? ent : e; }) : items.concat([ent]);
    commit();
    var q = isEdit ? sb.from(T).update(toDb(ent)).eq("id", ent.id) : sb.from(T).insert(Object.assign({ id: ent.id }, toDb(ent)));
    return q.then(function (res) { if (res.error) { reloadQuietly(); throw res.error; } });
  }
  function patchPaid(id, next) {
    var pat = next ? today : null;
    items = items.map(function (e) { return e.id === id ? Object.assign({}, e, { paid: next, paidAt: pat }) : e; });
    commit();
    sb.from(T).update({ paid: next, paid_at: pat }).eq("id", id).then(function (res) {
      if (res.error) { toast("Не удалось сохранить отметку."); reloadQuietly(); }
    });
  }
  function removeEntry(id) {
    items = items.filter(function (e) { return e.id !== id; });
    commit();
    return sb.from(T).delete().eq("id", id).then(function (res) { if (res.error) { reloadQuietly(); throw res.error; } });
  }

  /* ---------- расчёты ---------- */
  function agg(list) {
    var a = { n: list.length, price: 0, got: 0, np: 0, sp: 0, sg: 0, nsh: 0, ngp: 0 };
    list.forEach(function (r) {
      if (r.price != null) { a.price += r.price; if (r.price > 0) a.np++; }
      if (r.got != null) { a.got += r.got; if (r.got > 0) a.ngp++; }
      if (r.price != null && r.got != null && r.price > 0) { a.sp += r.price; a.sg += r.got; a.nsh++; }
    });
    a.share = a.sp > 0 ? a.sg / a.sp : null;
    a.avg = a.np ? a.price / a.np : null;
    a.avgGot = a.ngp ? a.got / a.ngp : null;
    return a;
  }
  function rowsIn(p) { return p === "all" ? rows : rows.filter(function (r) { return r.m === p; }); }
  function flagOf(r) {
    if (r.price == null) return "нет суммы ремонта";
    if (r.got == null) return "Не оплачено";
    if (r.price > 0 && r.got > r.price) return "«Получил» больше суммы ремонта";
    return "";
  }
  function delta(a, b) { return b ? (a - b) / b : null; }
  function niceScale(max, n) {
    var raw = max / n, mag = Math.pow(10, Math.floor(Math.log10(raw))), norm = raw / mag;
    var step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
    return { step: step, max: Math.ceil(max / step) * step };
  }

  /* ---------- вкладки ---------- */
  function setTab(t) {
    tab = t;
    ["log", "stats"].forEach(function (id) {
      $("tab-" + id).setAttribute("aria-selected", String(id === t));
      $("panel-" + id).hidden = id !== t;
    });
    document.body.setAttribute("data-tab", t);
    $("tab-stats").setAttribute("aria-label", t === "stats" ? "Журнал" : "Статистика");
    renderAll();
  }
  $("tab-log").addEventListener("click", function () { setTab("log"); });
  $("tab-stats").addEventListener("click", function () { setTab("stats"); });
  $("brand").addEventListener("click", function () { setTab("log"); });
  var searchHide = null;
  function hideSearch() {
    $("searchbar").classList.remove("open"); $("q").value = ""; query = ""; renderLog();
    $("open-search").setAttribute("aria-pressed", "false");
  }
  $("open-search").addEventListener("click", function () {
    clearTimeout(searchHide);
    if (tab !== "log") setTab("log");
    $("searchbar").classList.add("open");
    $("open-search").setAttribute("aria-pressed", "true");
    window.scrollTo({ top: 0, behavior: "smooth" });
    $("q").focus();
  });
  // поиск закрывается сам, когда поле пустое и курсор из него ушёл
  $("q").addEventListener("blur", function () {
    clearTimeout(searchHide);
    searchHide = setTimeout(function () { if (!$("q").value && document.activeElement !== $("q")) hideSearch(); }, 300);
  });
  var IC_LIST = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/></svg>';
  var IC_CHART = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9h-9z"/><path d="M15 3.5A9 9 0 0 1 20.5 9H15z"/></svg>';

  function renderAll() {
    var a = agg(rows);
    $("sub").textContent = loaded ? NF.format(a.n) : "…";
    if (tab === "log") renderLog(); else renderStats();
  }

  /* ---------- журнал ---------- */
  var lastMonth = null;
  function renderLogChips() {
    var seq = keys.slice().reverse();
    var all = logMonth === "all";
    if (!all && (!logMonth || seq.indexOf(logMonth) < 0)) logMonth = seq[0] || null;
    var lm = all ? "all" : logMonth;
    if (!all && lm) lastMonth = lm;
    $("m-month").setAttribute("aria-pressed", String(!all)); $("m-all").setAttribute("aria-pressed", String(all));
    $("m-month").onclick = function () { logMonth = lastMonth && seq.indexOf(lastMonth) >= 0 ? lastMonth : (seq[0] || null); statusFilter = null; renderLog(); };
    $("m-all").onclick = function () { logMonth = "all"; statusFilter = null; renderLog(); };
        var idx = seq.indexOf(lm);
    $("mname").textContent = all ? "Всё время" : (lm ? monthName(lm) + " " + lm.slice(0, 4) : "—");
    $("mprev").disabled = all || idx < 0 || idx >= seq.length - 1;
    $("mnext").disabled = all || idx <= 0;
    $("mprev").style.visibility = $("mnext").style.visibility = all ? "hidden" : "";
    $("mprev").onclick = function () { if (idx < seq.length - 1) { logMonth = seq[idx + 1]; statusFilter = null; renderLog(); } };
    $("mnext").onclick = function () { if (idx > 0) { logMonth = seq[idx - 1]; statusFilter = null; renderLog(); } };
    var a = agg(lm ? rowsIn(lm) : rows);
    $("big").innerHTML = ""; $("big").append(NF.format(Math.round(a.got)) + " ", h("small", {}, "₽"));
  }
  function renderStatusChips() {
    var box = $("statuschips"); box.replaceChildren();
    var active = rows.filter(function (r) { return r.status !== "issued"; }).length;
    function chip(id, label, n) {
      box.append(h("button", { class: "chip", type: "button", "aria-pressed": String(statusFilter === id),
        onclick: function () { statusFilter = statusFilter === id ? null : id; onlyUnpaid = false; renderLog(); } }, label + " " + n));
    }
    box.append(h("button", { class: "chip", type: "button", "aria-pressed": String(!statusFilter),
      onclick: function () { statusFilter = null; onlyUnpaid = false; renderLog(); } }, "Все " + rows.length));
    STATUSES.forEach(function (s) {
      chip(s.id, s.label, rows.filter(function (r) { return r.status === s.id; }).length);
    });
  }
  var IC_X = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>';
  var IC_CHECK = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
  var IC_WRENCH = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0 5 5L21 9.6 18.4 7l1.6-1.6a4 4 0 0 0-5.3.9z"/><path d="M14 11 4.5 20.5a1.6 1.6 0 0 0 2.3 0L16 11.3"/></svg>';
  var knownIds = null, prevKnown = null, popId = null, lastBig = null, countTok = 0;
  var calm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function popFor(id) { popId = id; setTimeout(function () { popId = null; }, 1500); }
  function countUp(el, to) {
    var from = lastBig; lastBig = to; var tok = ++countTok;
    if (calm || from == null || from === to) return;
    var t0 = null, dur = 520;
    function step(ts) {
      if (tok !== countTok) return;
      if (t0 == null) t0 = ts;
      var k = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = NF.format(Math.round(from + (to - from) * e)) + " ₽";
      if (k < 1) requestAnimationFrame(step);
    }
    el.textContent = NF.format(Math.round(from)) + " ₽";
    requestAnimationFrame(step);
  }
  function entryRow(r) {
    var flag = flagOf(r);
    var label = r.paid ? "Оплачено. Нажмите, чтобы отметить как не оплаченное" : "Не оплачено. Нажмите, чтобы отметить как оплаченное";
    var dot = h("button", { class: "dot " + (r.paid ? "paid" : "unpaid"), type: "button", "aria-label": label, title: label });
    dot.innerHTML = r.paid ? IC_CHECK : IC_X;
    var isNew = !calm && prevKnown && !prevKnown[r.id];
    if (!calm && r.paid && (popId === r.id || isNew)) dot.className += " pop";
    var sub = [r.client, r.time].filter(Boolean).join(" · ");
    var main, second;
    if (r.got != null) { main = "+" + plain(r.got) + " ₽"; second = (r.price != null && r.price !== r.got) ? "из " + plain(r.price) : null; }
    else { main = r.price != null ? plain(r.price) + " ₽" : "—"; second = null; }
    return h("div", { class: "entry" + (isNew ? " enter" : ""), "data-id": r.id },
      dot,
      h("button", { class: "entry-main", type: "button" },
        h("div", { class: "e-left" },
          h("span", { class: "e-device" }, r.device || "Без названия"),
          r.client ? h("span", { class: "e-client" }, r.client) : null,
          r.note ? h("span", { class: "e-note" }, r.note) : null,
          (r.time || r.status !== "issued") ? h("span", { class: "e-sub" }, r.status !== "issued" ? h("span", { class: "e-work" }, "Готов к выдаче") : null, (r.time && r.status !== "issued") ? " · " : "", r.time || "") : null,
          flag ? h("span", { class: "e-flag" }, flag) : (r.paid ? h("span", { class: "e-flag e-ok" }, "Оплачено") : null)),
        h("div", { class: "e-right" },
          h("span", { class: "e-got" + (r.got == null ? " unpaid" : "") }, main),
          second ? h("span", { class: "e-price" }, second) : null)));
  }
  function togglePaid(id) {
    var r = findEntry(id); if (!r) return;
    if (!r.paid) popFor(id);
    patchPaid(id, !r.paid);
  }
  function onEntryClick(e) {
    var row = e.target.closest(".entry"); if (!row) return;
    var id = row.getAttribute("data-id");
    if (e.target.closest(".dot")) togglePaid(id);
    else if (e.target.closest(".entry-main")) openEdit(id);
  }
  function renderLog() {
    if (!loaded) { prevKnown = null; knownIds = null; }
    else {
      prevKnown = knownIds; knownIds = {}; rows.forEach(function (x) { knownIds[x.id] = 1; });
      if (prevKnown) { var cnt = 0; rows.forEach(function (x) { if (!prevKnown[x.id]) cnt++; }); if (cnt > 3) prevKnown = null; }
    }
    renderLogChips(); renderStatusChips();
    var list = $("list"); list.replaceChildren();
    if (!loaded) { list.append(h("p", { class: "empty" }, "Загружаю записи…")); return; }
    if (!rows.length) {
      list.append(h("p", { class: "empty" }, h("strong", {}, "Журнал пуст"), "Нажмите «+» внизу, чтобы добавить первый ремонт."));
      return;
    }
    var q = query.trim().toLowerCase();
    var shown = rows.filter(function (r) {
      if (q) return [r.device, r.client, r.note].join(" ").toLowerCase().indexOf(q) !== -1;
      if (logMonth && logMonth !== "all" && r.m !== logMonth) return false;
      if (statusFilter) return statusFilter === "active" ? r.status !== "issued" : r.status === statusFilter;
      return true;
    });
    if (!shown.length) { list.append(h("p", { class: "empty" }, onlyUnpaid && !q ? "Все записи оплачены." : (statusFilter && !q ? "В этом статусе заказов нет." : "Ничего не найдено."))); return; }
    var groups = [], cur = null;
    shown.forEach(function (r) {
      if (!cur || cur.date !== r.date) { cur = { date: r.date, rows: [] }; groups.push(cur); }
      cur.rows.push(r);
    });
    groups.forEach(function (g) {
      var a = agg(g.rows);
      var day = h("div", { class: "day" },
        h("h2", { class: "day-title" }, h("span", {}, dayLabel(g.date)), h("span", { class: "sum" }, "+" + plain(a.got) + " ₽")));
      g.rows.forEach(function (r) { day.append(entryRow(r)); });
      list.append(day);
    });
  }
  $("list").addEventListener("click", onEntryClick);
  $("q").addEventListener("input", function (e) { query = e.target.value; renderLog(); });

  /* ---------- форма ---------- */
  function nowTime() { return pad(new Date().getHours()) + ":" + pad(new Date().getMinutes()); }
  function syncPick() {
    var d = $("date").value, t = $("time").value;
    var dt = $("date-text"), tt = $("time-text");
    var pa = $("paidat").value, pt = $("paidat-text");
    pt.textContent = pa ? dayNum(pa) + " " + MS[+pa.slice(5, 7) - 1].toLowerCase() + " " + pa.slice(0, 4) : "Выберите дату";
    pt.className = "pick-text" + (pa ? "" : " empty");
    dt.textContent = d ? dayNum(d) + " " + MS[+d.slice(5, 7) - 1].toLowerCase() + " " + d.slice(0, 4) : "Выберите дату";
    dt.className = "pick-text" + (d ? "" : " empty");
    tt.textContent = t || "--:--";
    tt.className = "pick-text" + (t ? "" : " empty");
  }
  function capFirst(v) { v = String(v || "").trim(); return v ? v.charAt(0).toLocaleUpperCase("ru-RU") + v.slice(1) : v; }
  ["client", "note"].forEach(function (id) {
    $(id).addEventListener("blur", function () { $(id).value = capFirst($(id).value); });
  });
  function openSheet() { $("sheet").hidden = false; document.body.style.overflow = "hidden"; }
  function closeSheet() { $("sheet").hidden = true; document.body.style.overflow = ""; }
  function resetForm() {
    closeSheet();
    editing = null; editingSeq = null; whenTouched = false;
    ["device", "client", "note", "price", "got", "cost"].forEach(function (id) { $(id).value = ""; });
    $("date").value = today; $("time").value = nowTime();
    $("form-title").textContent = "Новая запись";
    $("save").textContent = "Записать";
    $("subactions").hidden = true;
    $("paidat-field").hidden = true; $("paidat").value = "";
    $("got-field").hidden = true; $("price-field").classList.add("full"); $("del").dataset.armed = "0"; $("del").textContent = "Удалить";
    gotTouched = false;
    updateShare(); syncPick();
  }
  var gotTouched = false;
  function profitOf(r) { return r.price == null ? null : (r.price - (r.cost || 0)) / 2; }
  function autoGot() {
    if (gotTouched || $("got-field").hidden) return;
    var p = toNum($("price").value); if (p == null) return;
    var v = profitOf({ price: p, cost: toNum($("cost").value) });
    $("got").value = v == null ? "" : (Math.round(v * 100) / 100);
  }
  function updateShare() {
    var p = toNum($("price").value), g = toNum($("got").value), c = toNum($("cost").value);
    var parts = [];
    if (p != null && c != null) parts.push("Моя доля: " + rub(profitOf({ price: p, cost: c })) + " (пополам от " + rub(p - c) + ")");
    else if (p > 0 && g != null) parts.push("Доля: " + pct(g / p));
    $("share").textContent = parts.join(" · ");
  }
  function openEdit(id) {
    var r = findEntry(id); if (!r) return;
    if (tab !== "log") setTab("log");
    editing = r.id; editingSeq = r.seq; whenTouched = true;
    $("device").value = r.device; $("client").value = r.client; $("note").value = r.note;
    $("date").value = r.date; $("time").value = r.time;
    $("price").value = r.price == null ? "" : r.price; $("got").value = r.got == null ? "" : r.got; $("cost").value = r.cost == null ? "" : r.cost; gotTouched = r.got != null;
    $("form-title").textContent = "Изменение записи";
    $("save").textContent = "Сохранить";
    $("subactions").hidden = false;
    $("paidat-field").hidden = !r.paid; $("paidat").value = r.paid ? (payDate(r) || "") : "";
    $("got-field").hidden = false; $("price-field").classList.remove("full"); $("del").dataset.armed = "0"; $("del").textContent = "Удалить";
    updateShare(); syncPick();
    openSheet();
  }
  $("price").addEventListener("input", function () { autoGot(); updateShare(); });
  $("cost").addEventListener("input", function () { autoGot(); updateShare(); });
  $("got").addEventListener("input", function () { gotTouched = true; updateShare(); });
  $("time").addEventListener("input", function () { whenTouched = true; syncPick(); });
  $("date").addEventListener("input", function () { whenTouched = true; syncPick(); });
  $("paidat").addEventListener("input", syncPick);
  $("f").addEventListener("focusin", function (e) {
    if (!editing && !whenTouched && e.target.id !== "time" && e.target.id !== "date") { $("date").value = today; $("time").value = nowTime(); syncPick(); }
  });
  $("cancel").addEventListener("click", resetForm);
  $("sheet-bg").addEventListener("click", resetForm);
  $("open-add").addEventListener("click", function () { resetForm(); openSheet(); });

  var delTimer;
  $("del").addEventListener("click", function () {
    var b = $("del");
    if (b.dataset.armed !== "1") {
      b.dataset.armed = "1"; b.textContent = "Точно удалить?";
      delTimer = setTimeout(function () { b.dataset.armed = "0"; b.textContent = "Удалить"; }, 4000);
      return;
    }
    clearTimeout(delTimer);
    var id = editing;
    removeEntry(id).then(function () { toast("Запись удалена"); resetForm(); })
      .catch(function () { toast("Не удалось удалить запись."); });
  });

  $("f").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!sb) return;
    var date = $("date").value;
    var device = $("device").value.trim();
    if (!date || !device) return;
    var id = editing || newId();
    var ent = {
      id: id, device: device, client: capFirst($("client").value), note: capFirst($("note").value),
      date: date, time: $("time").value || "", price: toNum($("price").value), got: toNum($("got").value), cost: toNum($("cost").value),
      seq: editingSeq || Date.now()
    };
    var wasEditing = !!editing;
    var old = wasEditing ? findEntry(id) : null;
    ent.paid = old ? old.paid : ent.got != null;
    ent.paidAt = (!$("paidat-field").hidden && $("paidat").value) ? $("paidat").value : (old && old.paidAt) || null;
    if (ent.got != null && ent.got > 0 && !ent.paid && (!old || old.got !== ent.got)) { ent.paid = true; ent.paidAt = today; if (ent.id) popFor(ent.id); }
    var btn = $("save"); btn.disabled = true;
    var slow = false, job = saveEntry(ent, wasEditing);
    job.catch(function () { if (slow) toast("Не удалось сохранить на сервере. Проверьте интернет и повторите."); });
    Promise.race([job, new Promise(function (res) { setTimeout(function () { slow = true; res(); }, 1200); })]).then(function () {
      toast(wasEditing ? "Изменения сохранены" : "Запись добавлена");
      logMonth = date.slice(0, 7);
      resetForm();
    }).catch(function (err) {
      toast("Не удалось сохранить. Проверьте интернет и попробуйте ещё раз.");
    }).then(function () { btn.disabled = false; });
  });

  /* ---------- статистика ---------- */
  function renderPeriodChips() {
    var box = $("pchips"); box.replaceChildren();
    var opts = keys.slice().reverse().map(function (k) { return { id: k, label: monthShort(k) }; });
    opts.forEach(function (o) {
      box.append(h("button", { class: "chip", type: "button", "aria-pressed": String(period === o.id), onclick: function () { period = o.id; renderStats(); } }, o.label));
    });
  }

  function periodTitle() {
    if (period === "all") return "Всё время";
    var list = rowsIn(period), last = list.length ? list[0].date : null;
    var t = monthName(period) + " " + period.slice(0, 4);
    if (period === today.slice(0, 7) && last) t += " · по " + dayNum(last) + " " + MG[+last.slice(5, 7) - 1];
    return t;
  }

  function kpi(label, value, sub) {
    return h("div", { class: "kpi" }, h("div", { class: "kpi-label" }, label), h("div", { class: "kpi-value" }, value), h("div", { class: "kpi-sub" }, sub || ""));
  }
  function deltaNode(a, b, prevName) {
    var d = delta(a, b);
    if (d == null) return "";
    var p = Math.abs(d * 100);
    if (p < 0.5) return "без изменений к " + prevName;
    return h("span", {}, h("span", { class: d > 0 ? "up" : "down" }, (d > 0 ? "▲ +" : "▼ −") + p.toLocaleString("ru-RU", { maximumFractionDigits: 0 }) + "%"), " к " + prevName);
  }

  function barChart(box, o) {
    box.replaceChildren();
    var W = Math.max(280, Math.floor(box.clientWidth || 320)), H = o.height || 200;
    var pl = 40, pr = 6, pt = 16, pb = 22, pw = W - pl - pr, ph = H - pt - pb;
    var max = 0; o.groups.forEach(function (g) { g.vals.forEach(function (v) { if (v > max) max = v; }); });
    var sc = niceScale(max || 1000, 4);
    var svg = S("svg", { width: W, height: H, viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": o.aria });
    for (var t = 0; t <= sc.max + 1e-6; t += sc.step) {
      var y = pt + ph - (t / sc.max) * ph;
      svg.append(S("line", { x1: pl, x2: W - pr, y1: y, y2: y, "class": t === 0 ? "axis" : "grid" }));
      svg.append(S("text", { x: pl - 6, y: y + 4, "text-anchor": "end" }, short(t)));
    }
    var n = o.groups.length, band = pw / n, ns = o.series.length;
    var bw = Math.min(o.maxBar || 18, (band * 0.8 - (ns - 1) * 2) / ns); if (bw < 2) bw = 2;
    o.groups.forEach(function (g, i) {
      var gx = pl + band * i + band / 2, total = ns * bw + (ns - 1) * 2, x0 = gx - total / 2;
      var dim = o.selected != null && o.selected !== i;
      var top = Infinity;
      g.vals.forEach(function (v, s) {
        var hh = v / sc.max * ph; if (v <= 0 || hh < 0.5) return;
        var x = x0 + s * (bw + 2), yy = pt + ph - hh, r = Math.min(4, hh, bw / 2);
        var d = "M" + x + "," + (yy + hh) + "V" + (yy + r) + "Q" + x + "," + yy + " " + (x + r) + "," + yy + "H" + (x + bw - r) + "Q" + (x + bw) + "," + yy + " " + (x + bw) + "," + (yy + r) + "V" + (yy + hh) + "Z";
        svg.append(S("path", { d: d, "class": o.series[s].cls + (dim ? " dim" : "") }));
        if (yy < top) top = yy;
      });
      if (o.xLabel(i)) svg.append(S("text", { x: gx, y: H - 6, "text-anchor": "middle" }, o.xLabel(i)));
      if (o.labelIdx.indexOf(i) >= 0 && top !== Infinity) svg.append(S("text", { x: gx, y: top - 4, "text-anchor": "middle", "class": "val" }, short(g.vals[ns - 1])));
    });
    function idxAt(ev) {
      var rect = svg.getBoundingClientRect();
      var i = Math.floor((ev.clientX - rect.left - pl) / band);
      return i >= 0 && i < n ? i : -1;
    }
    svg.addEventListener("pointermove", function (ev) { var i = idxAt(ev); if (i >= 0) o.onHover(i); });
    svg.addEventListener("pointerleave", function () { o.onHover(null); });
    svg.addEventListener("click", function (ev) { var i = idxAt(ev); if (i >= 0 && o.onPick) o.onPick(i); else if (i >= 0) o.onHover(i); });
    box.append(svg);
  }

  function breakdown(list, field) {
    var map = {};
    list.forEach(function (r) { (map[r[field]] = map[r[field]] || []).push(r); });
    return Object.keys(map).map(function (k) { var a = agg(map[k]); a.name = k; return a; })
      .sort(function (x, y) { return sortBy === "n" ? (y.n - x.n || y.got - x.got) : (y.got - x.got || y.n - x.n); });
  }
  function rankBlock(title, groups, limit, onMore) {
    var max = 0; groups.forEach(function (g) { var v = sortBy === "n" ? g.n : g.got; if (v > max) max = v; });
    var shown = limit ? groups.slice(0, limit) : groups;
    var box = h("div", { class: "block" },
      h("div", { class: "block-head" }, h("h2", {}, title)),
      h("div", { class: "rank" },
        h("div", { class: "rank-head" }, h("span", {}, "Название"), h("span", {}, "Шт"), h("span", {}, "Получил"), h("span", {}, "Доля"))));
    var rank = box.querySelector(".rank");
    shown.forEach(function (g) {
      var v = sortBy === "n" ? g.n : g.got;
      var bar = h("div", { class: "bar" }, h("i", { style: "width:" + (max ? Math.max(2, v / max * 100) : 0) + "%" }));
      rank.append(h("div", { class: "rank-row" },
        h("span", { class: "name" }, g.name), h("span", { class: "num" }, String(g.n)), h("span", { class: "num" }, plain(g.got)), h("span", { class: "num" }, pct(g.share)), bar));
    });
    if (limit && groups.length > limit) box.append(h("button", { class: "more", type: "button", onclick: onMore }, "Показать все (" + groups.length + ")"));
    return box;
  }

  function payDate(r) { return r.paidAt || ((r.paid || (r.got != null && r.got > 0)) ? r.date : null); }
  var statDay = null, statMode = "day";
  function addDays(d, n) {
    var t = new Date(+d.slice(0, 4), +d.slice(5, 7) - 1, dayNum(d) + n);
    return t.getFullYear() + "-" + pad(t.getMonth() + 1) + "-" + pad(t.getDate());
  }
  function addMonths(d, n) {
    var t = new Date(+d.slice(0, 4), +d.slice(5, 7) - 1 + n, 1);
    return t.getFullYear() + "-" + pad(t.getMonth() + 1) + "-01";
  }
  function rangeOf(mode, d) {
    if (mode === "day") return { from: d, to: d, label: dayLabel(d) };
    if (mode === "week") {
      var t = new Date(+d.slice(0, 4), +d.slice(5, 7) - 1, dayNum(d));
      var from = addDays(d, -((t.getDay() + 6) % 7)), to = addDays(from, 6);
      var lab = dayNum(from) + (from.slice(5, 7) === to.slice(5, 7) ? "" : " " + MG[+from.slice(5, 7) - 1]) + " – " + dayNum(to) + " " + MG[+to.slice(5, 7) - 1];
      return { from: from, to: to, label: lab };
    }
    if (mode === "month") {
      var f = d.slice(0, 7) + "-01", e = addDays(addMonths(f, 1), -1);
      return { from: f, to: e, label: monthName(d.slice(0, 7)) + " " + d.slice(0, 4) };
    }
    var yy = d.slice(0, 4);
    return { from: yy + "-01-01", to: yy + "-12-31", label: yy + " год" };
  }
  function stepRange(dir) {
    if (statMode === "day") statDay = addDays(statDay, dir);
    else if (statMode === "week") statDay = addDays(statDay, 7 * dir);
    else if (statMode === "month") statDay = addMonths(statDay.slice(0, 7) + "-01", dir);
    else if (statMode === "year") statDay = (+statDay.slice(0, 4) + dir) + "-01-01";
  }
  function pickSpan(rg) {
    if (statMode === "year") {
      var ys = {}; keys.forEach(function (k) { ys[k.slice(0, 4)] = 1; }); ys[today.slice(0, 4)] = 1; ys[statDay.slice(0, 4)] = 1;
      var sel = h("select", { "aria-label": "Выбрать год" });
      Object.keys(ys).sort().reverse().forEach(function (y) { var o = h("option", { value: y }, y); if (y === statDay.slice(0, 4)) o.selected = true; sel.append(o); });
      sel.addEventListener("change", function () { statDay = sel.value + "-01-01"; if (statDay > today) statDay = today; renderStats(); });
      return h("span", { class: "navpick" }, rg.label, sel);
    }
    var isM = statMode === "month";
    var inp = h("input", { type: isM ? "month" : "date", "aria-label": isM ? "Выбрать месяц" : "Выбрать дату" });
    inp.value = isM ? statDay.slice(0, 7) : statDay;
    inp.max = isM ? today.slice(0, 7) : today;
    inp.addEventListener("click", function () { try { if (inp.showPicker) inp.showPicker(); } catch (e) {} });
    inp.addEventListener("change", function () {
      var v = inp.value; if (!v) return;
      statDay = isM ? v + "-01" : v;
      if (statDay > today) statDay = today;
      renderStats();
    });
    return h("span", { class: "navpick" }, rg.label, inp);
  }
  function miniChart(rg) {
    var sums = {};
    rows.forEach(function (r) { var p = payDate(r); if (p && r.got) sums[p] = (sums[p] || 0) + r.got; });
    var WD = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    function wd(d) { return WD[(new Date(+d.slice(0, 4), +d.slice(5, 7) - 1, dayNum(d)).getDay() + 6) % 7]; }
    function dlab(d) { return dayNum(d) + " " + MG[+d.slice(5, 7) - 1]; }
    var items = [], i;
    if (statMode === "day" || statMode === "week") {
      var start = statMode === "week" ? rg.from : addDays(statDay, -6);
      for (i = 0; i < 7; i++) { var d1 = addDays(start, i); items.push({ v: sums[d1] || 0, x: wd(d1), t: wd(d1) + ", " + dlab(d1), cur: statMode === "day" && d1 === statDay }); }
    } else if (statMode === "month") {
      var dim = dayNum(rg.to);
      for (i = 1; i <= dim; i++) { var d2 = rg.from.slice(0, 7) + "-" + pad(i); items.push({ v: sums[d2] || 0, x: (i === 1 || i % 5 === 0) ? String(i) : "", t: dlab(d2) }); }
    } else {
      var yr = rg.from.slice(0, 4);
      for (i = 1; i <= 12; i++) {
        var mk = yr + "-" + pad(i), tot = 0;
        Object.keys(sums).forEach(function (k) { if (k.slice(0, 7) === mk) tot += sums[k]; });
        items.push({ v: tot, x: monthShort(mk), t: monthName(mk) + " " + yr });
      }
    }
    var max = 0, peak = -1;
    items.forEach(function (it, j) { if (it.v > max) { max = it.v; peak = j; } });
    var wrap = h("div", { class: "mini" + (items.length > 12 ? " dense" : "") });
    var bars = h("div", { class: "mini-bars" }), xs = h("div", { class: "mini-x" });
    var read = h("div", { class: "mini-read", "aria-live": "polite" });
    function show(j) {
      var it = items[j];
      read.textContent = it.t + ": " + (it.v ? NF.format(Math.round(it.v)) + " ₽" : "нет оплат");
      Array.prototype.forEach.call(bars.children, function (b, k) { b.classList.toggle("on", k === j); });
    }
    items.forEach(function (it, j) {
      var pc = max ? Math.max(5, Math.round(it.v / max * 100)) : 5;
      var b = h("button", { type: "button", class: "mbar" + (it.v ? "" : " z"), style: "--i:" + j, "aria-label": it.t + ": " + Math.round(it.v) + " ₽", onclick: function () { show(j); } }, h("i", { style: "height:" + pc + "%" }));
      bars.append(b);
      xs.append(h("span", {}, it.x));
    });
    wrap.append(bars, xs, read);
    var sel = peak >= 0 ? peak : -1;
    items.forEach(function (it, j) { if (it.cur && it.v) sel = j; });
    if (sel >= 0) show(sel); else read.textContent = "В этом периоде оплат нет";
    return wrap;
  }
  function dayBlock() {
    if (!statDay) statDay = today;
    var rg = rangeOf(statMode, statDay);
    var paidList = rows.filter(function (r) { var p = payDate(r); return p && p >= rg.from && p <= rg.to; });
    var a = agg(paidList);
    var taken = rows.filter(function (r) { return r.date >= rg.from && r.date <= rg.to; }).length;
    var bigEl = h("b", {}, NF.format(Math.round(a.got)) + " ₽"); countUp(bigEl, Math.round(a.got));
    var box = h("div", { class: "block dayblock" });
    var seg = h("div", { class: "seg", role: "group", "aria-label": "Период" });
    [["day", "День"], ["week", "Неделя"], ["month", "Месяц"], ["year", "Год"]].forEach(function (o) {
      seg.append(h("button", { type: "button", "aria-pressed": String(statMode === o[0]), onclick: function () { statMode = o[0]; renderStats(); } }, o[1]));
    });
    var all = false;
    var nav = h("div", { class: "pill nav" },
      h("button", { type: "button", "aria-label": "Раньше", disabled: all ? "" : false, onclick: function () { stepRange(-1); renderStats(); } }, h("span", { class: "chev" }, "‹")),
      pickSpan(rg),
      h("button", { type: "button", "aria-label": "Позже", disabled: (all || rg.to >= today) ? "" : false, onclick: function () { if (rg.to < today) { stepRange(1); renderStats(); } } }, h("span", { class: "chev" }, "›")));
    box.append(seg, nav,
      h("div", { class: "day-big" }, h("small", {}, "Получено"), bigEl),
      h("div", { class: "kpis" },
        kpi("Оплат", NF.format(a.n), "за период"),
        kpi("Сумма ремонтов", rubShort(a.price), "по этим оплатам"),
        kpi("Принято", NF.format(taken), "новых заявок")));
    return box;
  }
  function renderStats() {
    var body = $("statsbody"); body.replaceChildren();
    if (!loaded) { body.append(h("p", { class: "empty" }, "Загружаю…")); return; }
    if (!rows.length) { body.append(h("p", { class: "empty" }, h("strong", {}, "Пока нет данных"), "Добавьте ремонты на вкладке «Журнал», и здесь появятся итоги.")); return; }
    // статистика за день
    body.append(dayBlock());


    var rg0 = rangeOf(statMode, statDay || today);
    var isMonth = statMode === "month";
    var period = isMonth ? rg0.from.slice(0, 7) : null;
    var list = rows.filter(function (r) { return r.date >= rg0.from && r.date <= rg0.to; }), a = agg(list);
    var ptitle = rg0.label;
    if (isMonth && period === today.slice(0, 7)) ptitle += " · по " + dayNum(today) + " " + MG[+today.slice(5, 7) - 1];
    body.append(h("div", { class: "block-head" }, h("h2", {}, ptitle)));

    // сравнение с прошлым месяцем
    var cmp = null;
    if (isMonth) {
      var i = keys.indexOf(period);
      if (i > 0) {
        var prev = keys[i - 1], cur = list, pr = rowsIn(prev), dom = null;
        if (period === today.slice(0, 7)) {
          dom = dayNum(today);
          cur = cur.filter(function (r) { return dayNum(r.date) <= dom; });
          pr = pr.filter(function (r) { return dayNum(r.date) <= dom; });
        }
        cmp = { a: agg(cur), b: agg(pr), name: monthShort(prev).toLowerCase(), dom: dom };
      }
    }

    var costTotal = list.reduce(function (s, r) { return s + (r.cost || 0); }, 0);
    var profRows = list.filter(function (r) { return r.cost != null; });
    var profit = profRows.reduce(function (s, r) { return s + (profitOf(r) || 0); }, 0);
    var kp = h("div", { class: "kpis" },
      kpi("Ремонтов", NF.format(a.n), a.n && a.np ? "с суммой: " + NF.format(a.np) : ""),
      kpi("Сумма ремонтов", rub(a.price), cmp ? deltaNode(cmp.a.price, cmp.b.price, cmp.name) : ""),
      kpi("Получил", rub(a.got), cmp ? deltaNode(cmp.a.got, cmp.b.got, cmp.name) : ""),
      kpi("Доля", pct(a.share), "получил ÷ сумма ремонта"),
      kpi("Средний чек", rub(a.avg), "по записям с суммой"),
      costTotal > 0 ? kpi("Запчасти", rub(costTotal), "затраты на запчасти") : null,
      profRows.length ? kpi("Прибыль", rub(profit), "ваша половина после запчастей") : null,
      kpi("Не оплачено", rub(list.filter(function (r) { return !r.paid; }).reduce(function (s, r) { return s + (r.price || 0); }, 0)), list.filter(function (r) { return !r.paid; }).length + " рем."));
    body.append(kp);
    var notes = [];
    if (a.nsh < a.n) notes.push("В долю входят записи, где указаны сумма ремонта и «Получил»: " + NF.format(a.nsh) + " из " + NF.format(a.n) + ".");
    if (cmp && cmp.dom) notes.push("Месяц не закончен: сравнение с 1–" + cmp.dom + " числами " + MG[+period.slice(5, 7) - 2 < 0 ? 11 : +period.slice(5, 7) - 2].replace(/я$/, "я") + ".");
    if (notes.length) body.append(h("p", { class: "note" }, notes.join(" ")));

    // по месяцам
    var mdata = keys.map(function (k) { var x = agg(rowsIn(k)); x.key = k; return x; });
    var mbox = h("div", { class: "chart", id: "mchart" });
    var mread = h("p", { class: "readout", "aria-live": "polite" });
    function mText(i) {
      var x = mdata[i]; return h("span", {}, h("b", {}, monthName(x.key) + ": "), "сумма " + rub(x.price) + " · получил " + rub(x.got) + " · доля " + pct(x.share) + " · " + x.n + " рем.");
    }
    function setRead(node) { mread.replaceChildren(node || ""); }
    var sel = (isMonth && keys.indexOf(period) >= 0) ? keys.indexOf(period) : null;
    var maxIdx = 0; mdata.forEach(function (x, i) { if (x.got > mdata[maxIdx].got) maxIdx = i; });
    body.append(h("div", { class: "block" },
      h("div", { class: "block-head" }, h("h2", {}, "По месяцам"),
        h("div", { class: "legend" }, h("span", {}, h("i", { style: "background:var(--s1)" }), "Сумма ремонта"), h("span", {}, h("i", { style: "background:var(--s2)" }), "Получил"))),
      mbox, mread));
    var mTable = h("details", {}, h("summary", {}, "Таблица по месяцам"));
    var tb = h("table", {}, h("thead", {}, h("tr", {}, h("th", {}, "Месяц"), h("th", {}, "Шт"), h("th", {}, "Сумма"), h("th", {}, "Получил"), h("th", {}, "Доля"))));
    var tbody = h("tbody", {});
    mdata.forEach(function (x) { tbody.append(h("tr", {}, h("td", {}, monthName(x.key)), h("td", {}, String(x.n)), h("td", {}, plain(x.price)), h("td", {}, plain(x.got)), h("td", {}, pct(x.share)))); });
    var tot = agg(rows);
    tbody.append(h("tr", {}, h("td", {}, "Всего"), h("td", {}, String(tot.n)), h("td", {}, plain(tot.price)), h("td", {}, plain(tot.got)), h("td", {}, pct(tot.share))));
    tb.append(tbody); mTable.append(h("div", { class: "tablewrap" }, tb));
    body.append(mTable);
    function drawM() {
      barChart(mbox, {
        groups: mdata.map(function (x) { return { vals: [x.price, x.got] }; }),
        series: [{ cls: "b1" }, { cls: "b2" }], selected: sel, labelIdx: [sel == null ? maxIdx : sel],
        xLabel: function (i) { return monthShort(mdata[i].key); },
        aria: "Сумма ремонта и «Получил» по месяцам: " + mdata.map(function (x) { return monthName(x.key) + " " + plain(x.price) + " и " + plain(x.got); }).join("; "),
        onHover: function (i) { var j = i == null ? sel : i; setRead(j == null ? h("span", {}, "Нажмите на месяц, чтобы посмотреть его подробно.") : mText(j)); },
        onPick: function (i) { statMode = "month"; statDay = mdata[i].key + "-01"; renderStats(); window.scrollTo({ top: 0, behavior: "smooth" }); }
      });
      if (sel != null) setRead(mText(sel)); else setRead(h("span", {}, "Нажмите на месяц, чтобы посмотреть его подробно."));
    }
    drawM();

    // по дням выбранного месяца
    if (isMonth) {
      var y = +period.slice(0, 4), mo = +period.slice(5, 7), dim = new Date(y, mo, 0).getDate();
      var days = []; for (var d = 1; d <= dim; d++) days.push({ got: 0, price: 0, n: 0 });
      list.forEach(function (r) { var x = days[dayNum(r.date) - 1]; x.n++; x.got += r.got || 0; x.price += r.price || 0; });
      var dbox = h("div", { class: "chart" });
      var dread = h("p", { class: "readout", "aria-live": "polite" }, "Нажмите на столбец, чтобы увидеть день.");
      var dmax = 0; days.forEach(function (x, i) { if (x.got > days[dmax].got) dmax = i; });
      body.append(h("div", { class: "block" }, h("div", { class: "block-head" }, h("h2", {}, "По дням: получил")), dbox, dread));
      barChart(dbox, {
        groups: days.map(function (x) { return { vals: [x.got] }; }), series: [{ cls: "b2" }], maxBar: 14, labelIdx: [dmax],
        xLabel: function (i) { var n = i + 1; return (n === 1 || n % 5 === 0) ? String(n) : ""; },
        aria: "Сумма «Получил» по дням месяца",
        onHover: function (i) {
          if (i == null) return;
          var x = days[i]; dread.replaceChildren(h("span", {}, h("b", {}, (i + 1) + " " + MG[mo - 1] + ": "), x.n + " рем. · сумма " + rub(x.price) + " · получил " + rub(x.got)));
        }
      });
    }

    // сортировка + разбивки
    var sortRow = h("div", { class: "chips", role: "group", "aria-label": "Сортировка" },
      h("span", { class: "hint", style: "align-self:center;margin-right:4px" }, "Сортировка:"),
      h("button", { class: "chip", type: "button", "aria-pressed": String(sortBy === "got"), onclick: function () { sortBy = "got"; renderStats(); } }, "по сумме"),
      h("button", { class: "chip", type: "button", "aria-pressed": String(sortBy === "n"), onclick: function () { sortBy = "n"; renderStats(); } }, "по числу"));
    body.append(sortRow);
    body.append(rankBlock("Типы ремонта", breakdown(list, "work"), 0));
    var masters = agg(list.filter(function (r) { return r.master; }));
    if (masters.n) body.append(h("p", { class: "note" }, "В описании упомянуты Коля или Черных: " + masters.n + " записей, сумма " + rub(masters.price) + ", получил " + rub(masters.got) + " (" + pct(masters.share) + "). Типы ремонта определены по ключевым словам в описании."));
    else body.append(h("p", { class: "note" }, "Типы ремонта определены по ключевым словам в описании."));
    body.append(rankBlock("Устройства", breakdown(list, "model"), showAllModels ? 0 : 10, function () { showAllModels = true; renderStats(); }));

    // проверить
    var bad = list.filter(function (r) { return flagOf(r); });
    if (bad.length) {
      var chk = h("div", { class: "block" }, h("div", { class: "block-head" }, h("h2", {}, "Нужно проверить: " + bad.length)));
      var wrap = h("div", { class: "check" });
      bad.slice(0, 12).forEach(function (r) { wrap.append(entryRow(r)); });
      wrap.addEventListener("click", onEntryClick);
      chk.append(wrap);
      if (bad.length > 12) chk.append(h("p", { class: "note" }, "Показаны первые 12 из " + bad.length + "."));
      body.append(chk);
    }
  }

  function csvCell(v) {
    v = v == null ? "" : String(v);
    return /[";\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
  }
  function exportCsv() {
    if (!rows.length) return;
    var hd = ["Дата", "Время", "Устройство", "Клиент", "Описание проблемы и решение", "Сумма ремонта", "Получил", "Оплачено", "Статус", "Запчасти"];
    var lines = [hd.join(";")];
    rows.slice().sort(function (a, b) { return a.date === b.date ? a.seq - b.seq : (a.date < b.date ? -1 : 1); }).forEach(function (r) {
      var p = r.date.split("-");
      lines.push([p[2] + "." + p[1] + "." + p[0], r.time, r.device, r.client, r.note, r.price == null ? "" : r.price, r.got == null ? "" : r.got, r.paid ? "да" : "нет", statusLabel(r.status), r.cost == null ? "" : r.cost].map(csvCell).join(";"));
    });
    var name = "zhurnal-remontov-" + today + ".csv";
    var file = new File(["\ufeff" + lines.join("\r\n")], name, { type: "text/csv" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], title: name }).catch(function (e) { if (e && e.name !== "AbortError") toast("Не удалось сохранить файл."); });
      return;
    }
    var a = document.createElement("a");
    a.href = URL.createObjectURL(file); a.download = name;
    document.body.append(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
  }
  $("export").addEventListener("click", exportCsv);
  $("logout").addEventListener("click", function () { if (sb) sb.auth.signOut(); });

  var rz; window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(function () { if (tab === "stats" && loaded) renderStats(); }, 150); });

  function curTheme() { return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark"; }
  function paintTheme() {
    var dark = curTheme() === "dark";
    $("theme").setAttribute("aria-checked", String(dark));
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute("content", dark ? "#000000" : "#f2f2f7");
  }
  try { var savedTheme = localStorage.getItem("repairs-theme"); if (savedTheme === "dark" || savedTheme === "light") document.documentElement.setAttribute("data-theme", savedTheme); } catch (e) {}
  $("theme").addEventListener("click", function () {
    var next = curTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("repairs-theme", next); } catch (e) {}
    paintTheme();
    if (tab === "stats" && loaded) renderStats();
  });
  paintTheme();
  function setSettings(on) { $("settings").hidden = !on; document.body.style.overflow = on ? "hidden" : ""; }
  $("open-settings").addEventListener("click", function () { setSettings(true); });
  $("close-settings").addEventListener("click", function () { setSettings(false); });
  $("settings-bg").addEventListener("click", function () { setSettings(false); });

  /* ---------- заметки ---------- */
  var noteItems = [];
  var IC_TICK = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
  var IC_DEL = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg>';
  function noteDate(ts) {
    var d = new Date(ts || Date.now());
    return d.getDate() + " " + MG[d.getMonth()] + " · " + pad(d.getHours()) + ":" + pad(d.getMinutes());
  }
  function renderNotes() {
    var box = $("notes-list"); box.replaceChildren();
    var sorted = noteItems.slice().sort(function (a, b) { return (a.done - b.done) || (b.seq - a.seq); });
    if (!sorted.length) { box.append(h("p", { class: "empty" }, h("strong", {}, "Заметок пока нет"), "Запишите, кому дали в долг, какую запчасть нужно купить или что не забыть.")); }
    sorted.forEach(function (n) {
      var tick = h("button", { class: "ntick" + (n.done ? " on" : ""), type: "button", "aria-label": n.done ? "Вернуть в активные" : "Отметить выполненной", onclick: function () {
        n.done = !n.done; renderNotes(); notesOp("toggle", n); } });
      tick.innerHTML = n.done ? IC_TICK : "";
      var del = h("button", { class: "ndel", type: "button", "aria-label": "Удалить заметку", onclick: function () {
        noteItems = noteItems.filter(function (x) { return x.id !== n.id; }); renderNotes(); notesOp("remove", n); } });
      del.innerHTML = IC_DEL;
      box.append(h("div", { class: "nrow" + (n.done ? " done" : "") }, tick,
        h("div", { class: "ntext" }, h("span", { class: "nt" }, n.text), h("span", { class: "nd" }, noteDate(n.seq))), del));
    });
    $("notes-clear").hidden = !noteItems.some(function (n) { return n.done; });
  }
  function openNotes() { $("notes-sheet").hidden = false; document.body.style.overflow = "hidden"; renderNotes(); }
  function closeNotes() { $("notes-sheet").hidden = true; document.body.style.overflow = ""; }
  $("open-notes").addEventListener("click", openNotes);
  $("notes-bg").addEventListener("click", closeNotes);
  $("notes-close").addEventListener("click", closeNotes);
  function addNote() {
    var t = capFirst($("note-text").value); if (!t) return;
    var n = { id: newNoteId(), text: t, done: false, seq: Date.now() };
    noteItems.push(n); $("note-text").value = ""; renderNotes(); toast("Заметка добавлена"); notesOp("add", n);
    $("note-text").focus();
  }
  $("notes-form").addEventListener("submit", function (e) { e.preventDefault(); addNote(); });
  $("note-text").addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); addNote(); } });
  var lastAdd = 0;
  function tapAdd(e) {
    e.preventDefault();
    if (Date.now() - lastAdd < 400) return;
    lastAdd = Date.now();
    try { addNote(); } catch (err) { toast("Ошибка заметки: " + (err && err.message ? err.message : err)); }
  }
  $("notes-add").addEventListener("pointerdown", function (e) { e.preventDefault(); });
  $("notes-add").addEventListener("pointerup", tapAdd);
  $("notes-add").addEventListener("click", tapAdd);
  $("notes-clear").addEventListener("click", function () {
    noteItems = noteItems.filter(function (n) { return !n.done; }); renderNotes(); notesOp("clear");
  });

  var NT = "notes";
  function newNoteId() { return newId(); }
  function loadNotes() {
    return sb.from(NT).select("*").order("created_at", { ascending: false }).then(function (res) {
      if (res.error) return;
      noteItems = (res.data || []).map(function (r) { return { id: r.id, text: r.text, done: !!r.done, seq: Date.parse(r.created_at) || 0 }; });
      renderNotes();
    });
  }
  function notesOp(op, n) {
    if (!sb) return;
    var q;
    if (op === "add") q = sb.from(NT).insert({ id: n.id, text: n.text, done: false });
    else if (op === "toggle") q = sb.from(NT).update({ done: n.done }).eq("id", n.id);
    else if (op === "remove") q = sb.from(NT).delete().eq("id", n.id);
    else q = sb.from(NT).delete().eq("done", true);
    return q.then(function (res) { if (res.error) { toast("Не удалось сохранить заметку."); loadNotes(); } });
  }

  resetForm();
  renderAll();
  /* ---------- вход и запуск ---------- */
  function setName(u) {
    var n = u && ((u.user_metadata && u.user_metadata.name) || (u.email ? u.email.split("@")[0] : ""));
    $("top-name").textContent = n || "Журнал";
  }
  $("top-title").addEventListener("click", function () {
    var cur = $("top-name").textContent;
    var v = window.prompt("Как вас подписать вверху?", cur);
    if (v == null) return; v = v.trim(); if (!v) return;
    $("top-name").textContent = v;
    try { sb.auth.updateUser({ data: { name: v } }); } catch (e) {}
  });
  function showApp(on) { $("auth").hidden = on; $("app").hidden = !on; $("dock").hidden = !on; if (!on) { setSettings(false); closeSheet(); } }
  async function startSession() {
    showApp(true);
    try { sb.auth.getSession().then(function (r) { var u = r.data && r.data.session && r.data.session.user; $("acc-email").textContent = (u && u.email) || ""; }); } catch (e) {}
    try { sb.auth.getSession().then(function (r) { var u = r.data && r.data.session && r.data.session.user; setName(u); }); } catch (e) {}
    loadNotes();
    try { await loadAll(); } catch (e) { loaded = true; renderAll(); toast("Не удалось загрузить записи. Проверьте интернет."); }
  }
  var signup = false;
  function setAuthMode(on) {
    signup = on;
    $("login").textContent = on ? "Создать аккаунт" : "Войти";
    $("authswitch").textContent = on ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Зарегистрироваться";
    $("auth-lead").textContent = on ? "Создайте аккаунт: у вас будет свой личный журнал" : "Войдите, чтобы открыть свои записи";
    $("password").autocomplete = on ? "new-password" : "current-password";
    $("autherr").textContent = "";
  }
  $("authswitch").addEventListener("click", function () { setAuthMode(!signup); });
  $("authform").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!sb) return;
    var btn = $("login"); btn.disabled = true; $("autherr").textContent = "";
    var email = $("email").value.trim(), pw = $("password").value;
    var req = signup ? sb.auth.signUp({ email: email, password: pw }) : sb.auth.signInWithPassword({ email: email, password: pw });
    req.then(function (res) {
      if (res.error) {
        var m = String(res.error.message || "");
        $("autherr").textContent = signup
          ? (/registered|exists/i.test(m) ? "Такая почта уже зарегистрирована. Нажмите «Войти»." : (/password/i.test(m) ? "Пароль слишком короткий: нужно минимум 6 символов." : "Не удалось создать аккаунт: " + m))
          : "Неверная почта или пароль.";
        return;
      }
      if (signup && !(res.data && res.data.session)) { $("autherr").textContent = "Мы отправили письмо: подтвердите почту и вернитесь, чтобы войти."; setAuthMode(false); return; }
      $("password").value = "";
      startSession();
    }).catch(function () { $("autherr").textContent = "Нет связи. Проверьте интернет."; })
      .then(function () { btn.disabled = false; });
  });
  document.addEventListener("visibilitychange", function () { if (!document.hidden && sb && !$("app").hidden) { reloadQuietly(); loadNotes(); } });

  (async function init() {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(function () {});
    var cfg = window.APP_CONFIG || {};
    if (!window.supabase || !cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY || /ВСТАВЬТЕ/.test(cfg.SUPABASE_URL + cfg.SUPABASE_ANON_KEY)) {
      $("autherr").textContent = "Приложение не настроено: впишите адрес и ключ Supabase в файл config.js.";
      $("login").disabled = true; showApp(false); return;
    }
    sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    sb.auth.onAuthStateChange(function (ev) {
      if (ev === "SIGNED_OUT") { noteItems = []; items = []; loaded = false; rebuild(); showApp(false); }
    });
    var s = await sb.auth.getSession();
    if (s.data && s.data.session) startSession(); else showApp(false);
  })();
})();
