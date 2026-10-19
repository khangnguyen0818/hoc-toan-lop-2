'use strict';
/* Nội dung bám theo SGK Toán 2 – bộ sách Kết nối tri thức với cuộc sống (NXB Giáo dục Việt Nam).
   Mỗi bài: learn (thẻ bài học), game (trò chơi), gen() sinh câu hỏi cho trò chơi & bài kiểm tra. */

/* ---- bộ sinh câu hỏi dùng lại ---- */
function addNC2() { // cộng không nhớ, phạm vi 100
  for (;;) { const t1 = R(1, 8), o1 = R(0, 9), t2 = R(1, 9 - t1), o2 = R(0, 9 - o1); return [t1 * 10 + o1, t2 * 10 + o2]; }
}
function subNB2() { // trừ không nhớ, phạm vi 100
  const t1 = R(2, 9), o1 = R(1, 9), t2 = R(1, t1 - 1), o2 = R(0, o1); return [t1 * 10 + o1, t2 * 10 + o2];
}
function add20() { const a = R(2, 9), b = R(11 - a, 9); return [a, b]; }
function sub20() { const a = R(11, 18), o = a - 10, b = R(Math.max(o + 1, a - 9), 9); return [a, b]; }

function wpThem(maxSum) {
  const n = pick(NAMES), t = pick(THINGS);
  const a = R(3, maxSum - 3), b = R(2, maxSum - a);
  return pick([
    () => inp(`<p class="wp">${n} có ${a} ${t.n}. Mẹ cho ${n} thêm ${b} ${t.n}. Hỏi ${n} có tất cả bao nhiêu ${t.n}?</p>${maxSum <= 20 ? vObjs(t.e, a) + '<p class="plus-sign">+</p>' + vObjs(t.e, b) : ''}`, a + b, giai(`Số ${t.n} ${n} có tất cả`, `${a} + ${b}`, a + b, t.n)),
    () => inp(`<p class="wp">Trong bể có ${a} con cá. Bố thả thêm vào bể ${b} con cá nữa. Hỏi trong bể có tất cả bao nhiêu con cá?</p>`, a + b, giai('Số con cá trong bể có tất cả', `${a} + ${b}`, a + b, 'con cá')),
    () => inp(`<p class="wp">Sân trường có ${a} bạn đang chơi, sau đó có thêm ${b} bạn chạy tới. Hỏi trên sân có tất cả bao nhiêu bạn?</p>`, a + b, giai('Số bạn trên sân có tất cả', `${a} + ${b}`, a + b, 'bạn'))
  ])();
}
function wpBot(max) {
  const n = pick(NAMES), t = pick(THINGS);
  const a = R(8, max), b = R(2, a - 2);
  return pick([
    () => inp(`<p class="wp">${n} có ${a} ${t.n}. ${n} cho bạn ${b} ${t.n}. Hỏi ${n} còn lại bao nhiêu ${t.n}?</p>${max <= 20 ? vTen(a, 0, b) : ''}`, a - b, giai(`Số ${t.n} ${n} còn lại`, `${a} − ${b}`, a - b, t.n)),
    () => inp(`<p class="wp">Trên cành cây có ${a} con chim đậu, sau đó ${b} con bay đi. Hỏi trên cành còn lại bao nhiêu con chim?</p>`, a - b, giai('Số con chim còn lại trên cành', `${a} − ${b}`, a - b, 'con chim')),
    () => inp(`<p class="wp">Cửa hàng có ${a} chiếc xe đạp, đã bán ${b} chiếc. Hỏi cửa hàng còn lại bao nhiêu chiếc xe đạp?</p>`, a - b, giai('Số xe đạp cửa hàng còn lại', `${a} − ${b}`, a - b, 'chiếc xe đạp'))
  ])();
}
function wpHonKem(max, carry) {
  const n1 = pick(NAMES); let n2 = pick(NAMES); while (n2 === n1) n2 = pick(NAMES);
  const t = pick(THINGS);
  let a, b;
  if (max <= 20) { a = R(5, 12); b = R(2, Math.min(8, max - a)); }
  else if (carry) { [a, b] = (() => { const o1 = R(2, 9), t1 = R(1, 6); const x = t1 * 10 + o1; const y = R(10 - o1, 9); return [x, y]; })(); }
  else { [a, b] = addNC2(); b = b % 10 || 3; }
  if (Math.random() < .5) {
    return inp(`<p class="wp">${n1} có ${a} ${t.n}. ${n2} có nhiều hơn ${n1} ${b} ${t.n}. Hỏi ${n2} có bao nhiêu ${t.n}?</p>`, a + b, giai(`Số ${t.n} ${n2} có`, `${a} + ${b}`, a + b, t.n) + '<p class="tip">“Nhiều hơn” thì làm phép cộng.</p>');
  }
  const big = a + b;
  return inp(`<p class="wp">${n1} có ${big} ${t.n}. ${n2} có ít hơn ${n1} ${b} ${t.n}. Hỏi ${n2} có bao nhiêu ${t.n}?</p>`, a, giai(`Số ${t.n} ${n2} có`, `${big} − ${b}`, a, t.n) + '<p class="tip">“Ít hơn” thì làm phép trừ.</p>');
}

function addC100(two) { // cộng có nhớ
  if (!two) { const t = R(1, 8), o = R(2, 9); const b = R(10 - o, 9); return [t * 10 + o, b]; }
  const o1 = R(2, 9), o2 = R(10 - o1, 9), t1 = R(1, 7), t2 = R(1, 8 - t1); return [t1 * 10 + o1, t2 * 10 + o2];
}
function subC100(two) { // trừ có nhớ
  if (!two) { const t = R(2, 9), o = R(0, 8); return [t * 10 + o, R(o + 1, 9)]; }
  const t1 = R(3, 9), o1 = R(0, 8), t2 = R(1, t1 - 1), o2 = R(o1 + 1, 9); return [t1 * 10 + o1, t2 * 10 + o2];
}
function add1000(carry) {
  if (!carry) { const h1 = R(1, 8), h2 = R(1, 9 - h1), t1 = R(0, 9), t2 = R(0, 9 - t1), o1 = R(0, 9), o2 = R(0, 9 - o1); return [h1 * 100 + t1 * 10 + o1, h2 * 100 + t2 * 10 + o2]; }
  if (Math.random() < .5) { // nhớ từ hàng đơn vị
    const h1 = R(1, 7), h2 = R(0, 8 - h1), t1 = R(0, 7), t2 = R(0, 8 - t1), o1 = R(2, 9), o2 = R(10 - o1, 9);
    return [h1 * 100 + t1 * 10 + o1, h2 * 100 + t2 * 10 + o2];
  }
  const h1 = R(1, 7), h2 = R(1, 8 - h1), t1 = R(2, 9), t2 = R(10 - t1, 9), o1 = R(0, 9), o2 = R(0, 9 - o1);
  return [h1 * 100 + t1 * 10 + o1, h2 * 100 + t2 * 10 + o2];
}
function sub1000(borrow) {
  if (!borrow) { const h1 = R(2, 9), h2 = R(1, h1 - 1), t1 = R(0, 9), t2 = R(0, t1), o1 = R(0, 9), o2 = R(0, o1); return [h1 * 100 + t1 * 10 + o1, h2 * 100 + t2 * 10 + o2]; }
  if (Math.random() < .5) { // nhớ ở hàng đơn vị
    const h1 = R(2, 9), h2 = R(1, h1 - 1), t1 = R(1, 9), t2 = R(0, t1 - 1), o1 = R(0, 8), o2 = R(o1 + 1, 9);
    return [h1 * 100 + t1 * 10 + o1, h2 * 100 + t2 * 10 + o2];
  }
  const h1 = R(3, 9), h2 = R(1, h1 - 2), t1 = R(0, 8), t2 = R(t1 + 1, 9), o1 = R(0, 9), o2 = R(0, o1);
  return [h1 * 100 + t1 * 10 + o1, h2 * 100 + t2 * 10 + o2];
}
const memoList = ids => '<ul class="recap">' + ids.map(id => { const l = BYID_RAW[id]; return `<li><b>Bài ${l.so}. ${l.title}</b><br>${l.memo}</li>`; }).join('') + '</ul>';
const BYID_RAW = {};

/* ================= TẬP MỘT ================= */
const BOOK = [
{ tap: 1, name: 'Tập một', topics: [

{ id: 'c1', no: 1, name: 'Ôn tập và bổ sung', hue: 1, lessons: [
{ id: 'b1', so: 1, title: 'Ôn tập các số đến 100', game: 'sort', sort: [10, 99],
  memo: 'Số có hai chữ số gồm chục và đơn vị. So sánh chục trước, rồi mới so sánh đơn vị.',
  learn: [
    { t: 'Chục và đơn vị', h: `<p>Mỗi <b>thanh</b> là <b>1 chục</b> (gồm 10 khối nhỏ). Mỗi <b>khối nhỏ</b> là <b>1 đơn vị</b>.</p>${vBlocks(0, 3, 6)}<p>Có 3 chục và 6 đơn vị. Ta viết số <b class="hl">36</b>, đọc là <i>ba mươi sáu</i>.</p>` },
    { t: 'Đọc, viết số', h: `<div class="scrollx"><table class="tbl"><tr><th>Chục</th><th>Đơn vị</th><th>Viết số</th><th>Đọc số</th></tr><tr><td>2</td><td>1</td><td><b>21</b></td><td>hai mươi mốt</td></tr><tr><td>4</td><td>5</td><td><b>45</b></td><td>bốn mươi lăm</td></tr><tr><td>7</td><td>4</td><td><b>74</b></td><td>bảy mươi tư</td></tr><tr><td>9</td><td>0</td><td><b>90</b></td><td>chín mươi</td></tr></table></div><p class="tip">Chú ý: 21 đọc là “hai mươi <b>mốt</b>”, 45 đọc là “bốn mươi <b>lăm</b>”, 74 đọc là “bảy mươi <b>tư</b>”.</p>` },
    { t: 'So sánh hai số', h: `<p>Số nào có <b>số chục lớn hơn</b> thì số đó lớn hơn:</p><p class="eq">58 &gt; 39</p><p>Nếu số chục bằng nhau thì so sánh <b>số đơn vị</b>:</p><p class="eq">64 &lt; 67</p><div class="memo"><b>Ghi nhớ:</b> dấu &gt; đọc là “lớn hơn”, dấu &lt; đọc là “bé hơn”. Đầu nhọn luôn chỉ về số bé hơn.</div>` },
    { t: 'Số 100', h: `${vBlocks(1, 0, 0)}<p><b>10 chục</b> bằng <b>1 trăm</b>, viết là <b class="hl">100</b>, đọc là <i>một trăm</i>.</p><p>Số bé nhất có hai chữ số là <b>10</b>. Số lớn nhất có hai chữ số là <b>99</b>.</p>` }
  ],
  gen() { return pick([
    () => { const n = R(11, 99), t = Math.floor(n / 10), o = n % 10; return inp(`<p>Số gồm <b>${t} chục</b> và <b>${o} đơn vị</b> là số nào?</p>${vBlocks(0, t, o)}`, n, `${t} chục và ${o} đơn vị viết là ${n}.`); },
    () => { const n = R(11, 99), rev = (n % 10) * 10 + Math.floor(n / 10); return mc(`<p>Số “<b>${docSo(n)}</b>” viết là:</p>`, n, fill4(n, [rev, n + 1, n - 1, n + 10], 10, 99), `“${docSo(n)}” viết là ${n}.`); },
    () => { const n = R(21, 99); return mc(`<p>Số <b class="hl">${n}</b> đọc là:</p>`, docSo(n), [docSo(n), docSo(n + 1 > 99 ? n - 2 : n + 1), docSo((n % 10) * 10 + Math.floor(n / 10) || 12), docSo(n - 10)].filter((v, i, a) => a.indexOf(v) === i).concat(['mười chín']).slice(0, 4), `${n} đọc là “${docSo(n)}”.`); },
    () => { const a = R(10, 99); let b = Math.random() < .4 ? Math.floor(a / 10) * 10 + R(0, 9) : R(10, 99); return cmpQ(a, b); },
    () => { const s = shuffle([...new Set(Array.from({ length: 6 }, () => R(10, 99)))]).slice(0, 4); const big = Math.random() < .5; const ans = big ? Math.max(...s) : Math.min(...s); return mc(`<p>Số <b>${big ? 'lớn nhất' : 'bé nhất'}</b> trong các số: ${s.join(', ')} là:</p>`, ans, s, `Số ${big ? 'lớn nhất' : 'bé nhất'} là ${ans}.`); },
    () => { const n = R(11, 99); const askT = Math.random() < .5; return inp(`<p>Số <b>${n}</b> gồm mấy ${askT ? 'chục' : 'đơn vị'}? (${askT ? 'chục' : 'đơn vị'} là chữ số ${askT ? 'bên trái' : 'bên phải'})</p>`, askT ? Math.floor(n / 10) : n % 10, `${n} gồm ${Math.floor(n / 10)} chục và ${n % 10} đơn vị.`); }
  ])(); } },

{ id: 'b2', so: 2, title: 'Tia số. Số liền trước, số liền sau', game: 'race',
  memo: 'Số liền sau thì thêm 1, số liền trước thì bớt 1.',
  learn: [
    { t: 'Tia số', h: `${vLine(0, 10)}<p>Trên tia số, các số được xếp theo thứ tự <b>từ bé đến lớn</b>, từ trái sang phải. Số 0 là gốc của tia số.</p>` },
    { t: 'Số liền trước, số liền sau', h: `${vLine(40, 1, [], 45)}<p>Số liền <b>trước</b> của 45 là <b class="hl">44</b> (45 − 1).</p><p>Số liền <b>sau</b> của 45 là <b class="hl">46</b> (45 + 1).</p><div class="memo"><b>Ghi nhớ:</b> 44, 45, 46 là ba số liên tiếp. Số liền trước bé hơn 1 đơn vị, số liền sau lớn hơn 1 đơn vị.</div>` },
    { t: 'Đếm thêm trên tia số', h: `${vLine(20, 2)}<p>Có thể đếm thêm 2: 20, 22, 24, 26… hoặc đếm thêm 10: 0, 10, 20, 30…</p><p class="tip">Nhìn hai vạch liền nhau để biết tia số đếm thêm mấy.</p>` }
  ],
  gen() { return pick([
    () => { const st = pick([1, 1, 2, 10]); const start = st === 10 ? 0 : R(0, 8) * 10 + (st === 2 ? 0 : R(0, 5)); const i = R(1, 10); const v = start + i * st; return inp(`<p>Số thích hợp ở ô <b>?</b> là:</p>${vLine(start, st, [v])}`, v, `Tia số đếm thêm ${st}, nên số ở ô ? là ${v}.`); },
    () => { const n = R(10, 98); return mc(`<p>Số liền <b>sau</b> của <b class="hl">${n}</b> là:</p>`, n + 1, fill4(n + 1, [n - 1, n + 10, n + 2]), `Số liền sau của ${n} là ${n} + 1 = ${n + 1}.`); },
    () => { const n = R(11, 99); return inp(`<p>Số liền <b>trước</b> của <b class="hl">${n}</b> là số nào?</p>`, n - 1, `Số liền trước của ${n} là ${n} − 1 = ${n - 1}.`); },
    () => { const n = R(11, 98); return inp(`<p>Số ở giữa <b>${n - 1}</b> và <b>${n + 1}</b> là số nào?</p>`, n, `${n - 1}, ${n}, ${n + 1} là ba số liên tiếp.`); },
    () => { const n = R(11, 98); return inp(`<p>Điền số còn thiếu: <span class="eq">${n - 1}, <span class="slot">?</span>, ${n + 1}</span></p>`, n, `Ba số liên tiếp: ${n - 1}, ${n}, ${n + 1}.`); }
  ])(); } },

{ id: 'b3', so: 3, title: 'Các thành phần của phép cộng, phép trừ', game: 'balloon',
  memo: 'Số hạng + Số hạng = Tổng. Số bị trừ − Số trừ = Hiệu.',
  learn: [
    { t: 'Phép cộng', h: `<div class="parts"><div><b>35</b><small>Số hạng</small></div><div class="op">+</div><div><b>24</b><small>Số hạng</small></div><div class="op">=</div><div><b>59</b><small>Tổng</small></div></div><p><b>35 + 24</b> cũng được gọi là <b>tổng</b>.</p>` },
    { t: 'Phép trừ', h: `<div class="parts"><div><b>68</b><small>Số bị trừ</small></div><div class="op">−</div><div><b>23</b><small>Số trừ</small></div><div class="op">=</div><div><b>45</b><small>Hiệu</small></div></div><p><b>68 − 23</b> cũng được gọi là <b>hiệu</b>.</p>` },
    { t: 'Ghi nhớ', h: `<div class="memo"><b>Muốn tìm tổng</b> ta lấy các số hạng cộng với nhau.<br><b>Muốn tìm hiệu</b> ta lấy số bị trừ trừ đi số trừ.</div><p>Ví dụ: Tìm tổng, biết các số hạng là 42 và 15: <b>42 + 15 = 57</b>.</p>` }
  ],
  gen() { return pick([
    () => { const [a, b] = addNC2(); const k = R(0, 2); const nm = ['Số hạng', 'Số hạng', 'Tổng'][k]; const v = [a, b, a + b][k]; return mc(`<p>Trong phép cộng <b class="eq">${a} + ${b} = ${a + b}</b>, số <b class="hl">${v}</b> được gọi là:</p>`, nm, ['Số hạng', 'Tổng', 'Hiệu'], `${a} và ${b} là số hạng, ${a + b} là tổng.`); },
    () => { const [a, b] = subNB2(); const k = R(0, 2); const nm = ['Số bị trừ', 'Số trừ', 'Hiệu'][k]; const v = [a, b, a - b][k]; return mc(`<p>Trong phép trừ <b class="eq">${a} − ${b} = ${a - b}</b>, số <b class="hl">${v}</b> được gọi là:</p>`, nm, ['Số bị trừ', 'Số trừ', 'Hiệu', 'Tổng'], `${a} là số bị trừ, ${b} là số trừ, ${a - b} là hiệu.`); },
    () => { const [a, b] = addNC2(); return inp(`<p>Tìm <b>tổng</b>, biết các số hạng là <b>${a}</b> và <b>${b}</b>.</p>`, a + b, `Tổng là: ${a} + ${b} = ${a + b}.`); },
    () => { const [a, b] = subNB2(); return inp(`<p>Tìm <b>hiệu</b>, biết số bị trừ là <b>${a}</b>, số trừ là <b>${b}</b>.</p>`, a - b, `Hiệu là: ${a} − ${b} = ${a - b}.`); }
  ])(); } },

{ id: 'b4', so: 4, title: 'Hơn, kém nhau bao nhiêu', game: 'fish',
  memo: 'Muốn biết hơn, kém nhau bao nhiêu, ta lấy số lớn trừ số bé.',
  learn: [
    { t: 'So sánh hai hàng', h: `${vRows([{ label: 'Táo', e: '🍎', n: 7 }, { label: 'Cam', e: '🍊', n: 4 }])}<p>Có 7 quả táo và 4 quả cam. Táo nhiều hơn cam: <b class="eq">7 − 4 = 3</b> (quả).</p><p>Ta nói: 7 <b>hơn</b> 4 là 3; 4 <b>kém</b> 7 là 3.</p>` },
    { t: 'Ghi nhớ', h: `<div class="memo"><b>Muốn tìm</b> số lớn hơn số bé bao nhiêu (hay số bé kém số lớn bao nhiêu), ta lấy <b>số lớn trừ đi số bé</b>.</div><p>Ví dụ: 45 hơn 23 là: 45 − 23 = <b>22</b>.</p>` }
  ],
  gen() { return pick([
    () => { const a = R(5, 10), b = R(2, a - 1), t1 = pick(THINGS), t2 = pick(THINGS.filter(x => x !== t1)); return inp(`<p>Số ${t1.n} nhiều hơn số ${t2.n} bao nhiêu?</p>${vRows([{ label: '', e: t1.e, n: a }, { label: '', e: t2.e, n: b }])}`, a - b, `${a} − ${b} = ${a - b}`); },
    () => { const [a, b] = subNB2(); return inp(`<p><b>${a}</b> hơn <b>${b}</b> bao nhiêu?</p>`, a - b, `${a} − ${b} = ${a - b}. Vậy ${a} hơn ${b} là ${a - b}.`); },
    () => { const [a, b] = subNB2(); return mc(`<p><b>${b}</b> kém <b>${a}</b> bao nhiêu?</p>`, a - b, numChoices(a - b), `${a} − ${b} = ${a - b}. Vậy ${b} kém ${a} là ${a - b}.`); },
    () => { const n1 = pick(NAMES), n2 = pick(NAMES.filter(x => x !== n1)); const a = R(95, 120), b = R(88, a - 1); return inp(`<p class="wp">${n1} cao ${a} cm, ${n2} cao ${b} cm. Hỏi ${n1} cao hơn ${n2} bao nhiêu xăng-ti-mét?</p>`, a - b, giai(`${n1} cao hơn ${n2} số xăng-ti-mét`, `${a} − ${b}`, a - b, 'cm')); }
  ])(); } },

{ id: 'b5', so: 5, title: 'Ôn tập phép cộng, phép trừ (không nhớ) trong phạm vi 100', game: 'memory',
  memo: 'Đặt tính thẳng cột, tính từ phải sang trái: đơn vị trước, chục sau.',
  learn: [
    { t: 'Đặt tính rồi tính phép cộng', h: `<div class="pair2">${vCol(42, 35, '+', '77')}<div><p>Viết các chữ số <b>thẳng cột</b>: đơn vị thẳng đơn vị, chục thẳng chục.</p><p>Tính <b>từ phải sang trái</b>:<br>• 2 cộng 5 bằng 7, viết 7.<br>• 4 cộng 3 bằng 7, viết 7.</p></div></div>` },
    { t: 'Đặt tính rồi tính phép trừ', h: `<div class="pair2">${vCol(68, 25, '−', '43')}<div><p>• 8 trừ 5 bằng 3, viết 3.<br>• 6 trừ 2 bằng 4, viết 4.</p><p>Vậy <b>68 − 25 = 43</b>.</p></div></div>` },
    { t: 'Tính nhẩm số tròn chục', h: `<p class="eq">30 + 50 = 80</p><p>Nhẩm: 3 chục + 5 chục = 8 chục.</p><p class="eq">90 − 40 = 50</p><p>Nhẩm: 9 chục − 4 chục = 5 chục.</p>` }
  ],
  gen() { return pick([
    () => { const [a, b] = addNC2(); return calcQ(a, b, '+', { col: Math.random() < .5 }); },
    () => { const [a, b] = subNB2(); return calcQ(a, b, '-', { col: Math.random() < .5 }); },
    () => { const a = R(1, 8) * 10, b = R(1, 9 - a / 10) * 10; return Math.random() < .5 ? calcQ(a, b, '+') : calcQ(a + b, b, '-'); }
  ])(); } },

{ id: 'b6', so: 6, title: 'Luyện tập chung', game: 'race', mix: ['b1', 'b2', 'b3', 'b4', 'b5'] }
]},

{ id: 'c2', no: 2, name: 'Phép cộng, phép trừ trong phạm vi 20', hue: 2, lessons: [
{ id: 'b7', so: 7, title: 'Phép cộng (qua 10) trong phạm vi 20', game: 'balloon',
  memo: 'Tách số để cộng cho đủ 10 trước: 9 + 5 = 9 + 1 + 4 = 14.',
  learn: [
    { t: 'Gộp cho đủ 10', h: `${vTen(9, 5)}<p>Có 9 chấm cam, thêm 5 chấm xanh. Lấy <b>1</b> chấm xanh cho đủ <b>10</b>, còn lại <b>4</b> chấm.</p><p class="eq">9 + 5 = 9 + 1 + 4 = 14</p>` },
    { t: 'Cách tách số', h: `<p class="eq">8 + 6 = ?</p>${vTen(8, 6)}<p>8 cần thêm <b>2</b> để được 10. Tách 6 = <b>2</b> + 4.</p><p>8 + 2 = 10; 10 + 4 = <b class="hl">14</b>.</p>` },
    { t: 'Ghi nhớ', h: `<div class="memo"><b>Cộng qua 10:</b> tách số thứ hai thành hai phần, một phần để cộng với số thứ nhất cho <b>đủ 10</b>, rồi cộng 10 với phần còn lại.</div>` }
  ],
  gen() { return pick([
    () => { const [a, b] = add20(); const q = calcQ(a, b, '+'); q.q += vTen(a, b); q.ex = `Tách ${b} = ${10 - a} + ${b - (10 - a)}. ${a} + ${10 - a} = 10; 10 + ${b - (10 - a)} = ${a + b}.`; return q; },
    () => { const [a, b] = add20(); return calcQ(a, b, '+'); },
    () => { const [a, b] = add20(); const k = 10 - a; return inp(`<p>Điền số vào ô trống:</p><p class="eq">${a} + ${b} = ${a} + ${k} + <span class="slot">?</span></p>`, b - k, `${b} = ${k} + ${b - k}.`); },
    () => { const [a, b] = add20(); const c = R(11, 18); const q = cmpQ(a + b, c); q.q = q.q.replace(`${a + b} <span`, `${a} + ${b} <span`); q.ex = `${a} + ${b} = ${a + b}; ${q.ex}`; return q; }
  ])(); } },

{ id: 'b8', so: 8, title: 'Bảng cộng (qua 10)', game: 'memory',
  memo: 'Thuộc bảng cộng qua 10 giúp tính nhanh. Đổi chỗ các số hạng thì tổng không đổi.',
  learn: [
    { t: 'Bảng cộng qua 10', h: `<div class="addtab">${[9, 8, 7, 6, 5, 4, 3, 2].map(a => `<div><b class="ah">${a} cộng với một số</b>${Array.from({ length: 8 }, (_, i) => i + 2).filter(b => a + b > 10).map(b => `<span>${a} + ${b} = <b>${a + b}</b></span>`).join('')}</div>`).join('')}</div>` },
    { t: 'Đổi chỗ số hạng', h: `<p class="eq">8 + 5 = 13</p><p class="eq">5 + 8 = 13</p><div class="memo"><b>Ghi nhớ:</b> Khi đổi chỗ các số hạng trong một tổng thì tổng <b>không thay đổi</b>.</div>` }
  ],
  gen() { return pick([
    () => { const [a, b] = add20(); return calcQ(a, b, '+'); },
    () => { const s = R(11, 17); const a = R(s - 9, 9), b = s - a; const ch = new Set([`${a} + ${b}`]); while (ch.size < 4) { const x = R(2, 9), y = R(2, 9); if (x + y !== s) ch.add(`${x} + ${y}`); } return mc(`<p>Phép tính nào có kết quả bằng <b class="hl">${s}</b>?</p>`, `${a} + ${b}`, [...ch], `${a} + ${b} = ${s}`); },
    () => { const [a, b] = add20(); return inp(`<p class="eq">${a} + ${b} = ${b} + <span class="slot">?</span></p>`, a, 'Đổi chỗ các số hạng thì tổng không đổi.'); }
  ])(); } },

{ id: 'b9', so: 9, title: 'Bài toán về thêm, bớt một số đơn vị', game: 'race',
  memo: '“Thêm” thì làm phép cộng, “bớt” (cho đi, bay đi, bán đi) thì làm phép trừ.',
  learn: [
    { t: 'Bài toán thêm', h: `<p class="wp">Trên cành có 6 con chim, có thêm 5 con chim bay đến. Hỏi trên cành có tất cả bao nhiêu con chim?</p>${vObjs('🐦', 6)}<p class="plus-sign">+</p>${vObjs('🐦', 5)}${giai('Số con chim có tất cả', '6 + 5', 11, 'con chim')}` },
    { t: 'Bài toán bớt', h: `<p class="wp">Có 12 quả bóng, bé cho bạn 4 quả. Hỏi bé còn lại bao nhiêu quả bóng?</p>${vTen(12, 0, 4)}${giai('Số quả bóng còn lại', '12 − 4', 8, 'quả bóng')}` },
    { t: 'Cách trình bày', h: `<div class="memo"><b>Các bước giải:</b><br>1. Đọc kĩ đề, tìm cái đã cho và cái cần tìm.<br>2. Viết câu lời giải.<br>3. Viết phép tính, đơn vị đặt trong ngoặc.<br>4. Viết đáp số.</div>` }
  ],
  gen() { return Math.random() < .5 ? wpThem(20) : wpBot(20); } },

{ id: 'b10', so: 10, title: 'Luyện tập chung', game: 'balloon', mix: ['b7', 'b8', 'b9'] },

{ id: 'b11', so: 11, title: 'Phép trừ (qua 10) trong phạm vi 20', game: 'fish',
  memo: 'Trừ để về 10 trước: 13 − 5 = 13 − 3 − 2 = 8.',
  learn: [
    { t: 'Trừ về 10 trước', h: `${vTen(13, 0, 5)}<p>Có 13 chấm, bớt đi 5 chấm. Bớt <b>3</b> chấm trước để còn 10, rồi bớt tiếp <b>2</b> chấm.</p><p class="eq">13 − 5 = 13 − 3 − 2 = 8</p>` },
    { t: 'Cách thứ hai', h: `<p class="eq">15 − 7 = ?</p><p>Tách 15 = 10 + 5. Lấy 10 − 7 = 3, rồi 3 + 5 = <b class="hl">8</b>.</p>${vTen(15, 0, 7)}` },
    { t: 'Ghi nhớ', h: `<div class="memo"><b>Trừ qua 10:</b> tách số trừ thành hai phần: phần đầu bằng số đơn vị của số bị trừ (để được 10), rồi lấy 10 trừ phần còn lại.</div>` }
  ],
  gen() { return pick([
    () => { const [a, b] = sub20(); const q = calcQ(a, b, '-'); q.q += vTen(a, 0, b); q.ex = `${a} − ${a - 10} = 10; 10 − ${b - (a - 10)} = ${a - b}.`; return q; },
    () => { const [a, b] = sub20(); return calcQ(a, b, '-'); },
    () => { const [a, b] = sub20(); const k = a - 10; return inp(`<p>Điền số vào ô trống:</p><p class="eq">${a} − ${b} = ${a} − ${k} − <span class="slot">?</span></p>`, b - k, `${b} = ${k} + ${b - k}.`); }
  ])(); } },

{ id: 'b12', so: 12, title: 'Bảng trừ (qua 10)', game: 'memory',
  memo: 'Từ phép cộng suy ra phép trừ: 8 + 5 = 13 nên 13 − 5 = 8 và 13 − 8 = 5.',
  learn: [
    { t: 'Bảng trừ qua 10', h: `<div class="scrollx"><table class="tbl small"><tr><td>11 − 2 = <b>9</b></td><td>12 − 3 = <b>9</b></td><td>13 − 4 = <b>9</b></td><td>14 − 5 = <b>9</b></td></tr><tr><td>11 − 3 = <b>8</b></td><td>12 − 4 = <b>8</b></td><td>13 − 5 = <b>8</b></td><td>14 − 6 = <b>8</b></td></tr><tr><td>11 − 4 = <b>7</b></td><td>12 − 5 = <b>7</b></td><td>13 − 6 = <b>7</b></td><td>15 − 8 = <b>7</b></td></tr><tr><td>16 − 7 = <b>9</b></td><td>17 − 8 = <b>9</b></td><td>18 − 9 = <b>9</b></td><td>16 − 9 = <b>7</b></td></tr></table></div>` },
    { t: 'Cộng và trừ là “anh em”', h: `<div class="parts"><div><b>8 + 5 = 13</b></div></div><p>Từ phép cộng trên, ta có hai phép trừ:</p><p class="eq">13 − 5 = 8</p><p class="eq">13 − 8 = 5</p>` }
  ],
  gen() { return pick([
    () => { const [a, b] = sub20(); return calcQ(a, b, '-'); },
    () => { const [a, b] = add20(); return inp(`<p>Biết <b>${a} + ${b} = ${a + b}</b>. Vậy:</p><p class="eq">${a + b} − ${b} = <span class="slot">?</span></p>`, a, `Lấy tổng trừ số hạng này thì được số hạng kia.`); }
  ])(); } },

{ id: 'b13', so: 13, title: 'Bài toán về nhiều hơn, ít hơn một số đơn vị', game: 'race',
  memo: '“Nhiều hơn” làm tính cộng, “ít hơn” làm tính trừ.',
  learn: [
    { t: 'Bài toán về nhiều hơn', h: `<p class="wp">Hàng trên có 6 bông hoa, hàng dưới nhiều hơn hàng trên 3 bông. Hỏi hàng dưới có bao nhiêu bông hoa?</p>${vRows([{ label: 'Trên', e: '🌸', n: 6 }, { label: 'Dưới', e: '🌼', n: 9 }])}${giai('Số bông hoa hàng dưới có', '6 + 3', 9, 'bông hoa')}` },
    { t: 'Bài toán về ít hơn', h: `<p class="wp">Lan có 15 viên bi, Hùng có ít hơn Lan 6 viên bi. Hỏi Hùng có bao nhiêu viên bi?</p>${giai('Số viên bi Hùng có', '15 − 6', 9, 'viên bi')}<div class="memo"><b>Nhiều hơn</b> → phép cộng. <b>Ít hơn</b> → phép trừ.</div>` }
  ],
  gen() { return wpHonKem(20); } },

{ id: 'b14', so: 14, title: 'Luyện tập chung', game: 'fish', mix: ['b11', 'b12', 'b13', 'b7'] }
]},

{ id: 'c3', no: 3, name: 'Làm quen với khối lượng, dung tích', hue: 3, lessons: [
{ id: 'b15', so: 15, title: 'Ki-lô-gam', game: 'balloon',
  memo: 'Ki-lô-gam (kg) là đơn vị đo khối lượng. Cân đĩa thăng bằng thì hai bên nặng bằng nhau.',
  learn: [
    { t: 'Nặng hơn, nhẹ hơn', h: `${vScale('🍉', '🍎', -1)}<p>Đĩa cân bên nào <b>thấp xuống</b> thì vật bên đó <b>nặng hơn</b>. Quả dưa nặng hơn quả táo.</p>` },
    { t: 'Ki-lô-gam', h: `<p>Để biết vật nặng bao nhiêu, ta dùng đơn vị <b>ki-lô-gam</b>, viết tắt là <b class="hl">kg</b>.</p><div class="row-c">${KG(1)}${KG(2)}${KG(5)}</div><p>Các quả cân 1 kg, 2 kg, 5 kg.</p>` },
    { t: 'Đọc cân', h: `${vScale('🎃', KG(2) + KG(1), 0)}<p>Cân thăng bằng: quả bí nặng bằng 2 kg + 1 kg = <b class="hl">3 kg</b>.</p><div class="memo"><b>Ghi nhớ:</b> Ta cộng, trừ số đo kg như cộng, trừ số bình thường, rồi viết thêm “kg”: 5 kg + 3 kg = 8 kg.</div>` }
  ],
  gen() { return pick([
    () => { const ws = shuffle([1, 2, 5]).slice(0, R(1, 2)); const extra = Math.random() < .4 ? [pick([1, 2])] : []; const all = [...ws, ...extra]; const s = all.reduce((x, y) => x + y, 0); const it = pick(['🎃', '🍉', '🍍', '🥥', '🐱', '🎒']); return inp(`<p>Cân thăng bằng. Vật bên trái nặng mấy ki-lô-gam?</p>${vScale(it, all.map(KG).join(''), 0)}`, s, `${all.join(' kg + ')} kg = ${s} kg.`); },
    () => { const a = pick(['🍉', '🎃', '🍍']), b = pick(['🍎', '🍋', '🍓']); const left = Math.random() < .5; return mc(`<p>Vật nào <b>nặng hơn</b>?</p>${vScale(left ? a : b, left ? b : a, -1)}`, left ? a : b, [a, b], 'Đĩa cân bên nào thấp hơn thì vật bên đó nặng hơn.'); },
    () => { const a = R(3, 12), b = R(2, 20 - a); return calcQ(a, b, '+', { unit: 'kg' }); },
    () => { const [a, b] = sub20(); return calcQ(a, b, '-', { unit: 'kg' }); },
    () => { const a = R(10, 40), b = R(2, 9); return inp(`<p class="wp">Bao gạo cân nặng ${a} kg, bao ngô nhẹ hơn bao gạo ${b} kg. Hỏi bao ngô cân nặng bao nhiêu ki-lô-gam?</p>`, a - b, giai('Bao ngô cân nặng', `${a} − ${b}`, a - b, 'kg')); }
  ])(); } },

{ id: 'b16', so: 16, title: 'Lít', game: 'fish',
  memo: 'Lít (l) là đơn vị đo dung tích (lượng nước, sữa, dầu…).',
  learn: [
    { t: 'Lít là gì?', h: `${vJugs([1, 2, 5])}<p>Để đo lượng nước, sữa, dầu… ta dùng đơn vị <b>lít</b>, viết tắt là <b class="hl">l</b>.</p><p>Ca 1 l, can 2 l, can 5 l.</p>` },
    { t: 'Rót nước', h: `<p>Can này chứa đầy nước, rót ra được 5 ca 1 l. Vậy can chứa <b class="hl">5 l</b> nước.</p>${vJugs([1, 1, 1, 1, 1])}<div class="memo"><b>Ghi nhớ:</b> 3 l + 2 l = 5 l; 10 l − 4 l = 6 l.</div>` }
  ],
  gen() { return pick([
    () => { const arr = Array.from({ length: R(2, 4) }, () => pick([1, 2, 5])); const s = arr.reduce((x, y) => x + y, 0); return inp(`<p>Các can đều đựng đầy nước. Có tất cả bao nhiêu lít nước?</p>${vJugs(arr)}`, s, `${arr.join(' l + ')} l = ${s} l.`); },
    () => { const a = R(3, 12), b = R(2, 20 - a); return calcQ(a, b, '+', { unit: 'l' }); },
    () => { const [a, b] = sub20(); return calcQ(a, b, '-', { unit: 'l' }); },
    () => { const n = R(2, 9); return inp(`<p class="wp">Mỗi ca chứa 1 l nước. Rót nước từ can ra được đầy ${n} ca. Hỏi can chứa bao nhiêu lít nước?</p>${vJugs(Array(n).fill(1))}`, n, `${n} ca × 1 l = ${n} l.`); },
    () => { const a = R(10, 20), b = R(2, 8); return inp(`<p class="wp">Thùng có ${a} l nước. Mẹ dùng hết ${b} l để nấu ăn. Hỏi thùng còn lại bao nhiêu lít nước?</p>`, a - b, giai('Số lít nước còn lại', `${a} − ${b}`, a - b, 'l')); }
  ])(); } },

{ id: 'b18', so: 18, title: 'Luyện tập chung', game: 'race', mix: ['b15', 'b16'] }
]},

{ id: 'c4', no: 4, name: 'Phép cộng, phép trừ (có nhớ) trong phạm vi 100', hue: 4, lessons: [
{ id: 'b19', so: 19, title: 'Phép cộng (có nhớ) số có hai chữ số với số có một chữ số', game: 'balloon',
  memo: 'Đơn vị cộng được từ 10 trở lên thì viết chữ số đơn vị, nhớ 1 sang hàng chục.',
  learn: [
    { t: 'Đặt tính 37 + 5', h: `<div class="pair2">${vCol(37, 5, '+', '42')}<div><p>• 7 cộng 5 bằng 12, viết <b>2</b>, <b class="red">nhớ 1</b>.</p><p>• 3 thêm 1 bằng <b>4</b>, viết 4.</p><p>Vậy <b>37 + 5 = 42</b>.</p></div></div>` },
    { t: 'Nhìn bằng que tính', h: `${vBlocks(0, 3, 7)}<p class="plus-sign">+</p>${vBlocks(0, 0, 5)}<p>7 que + 5 que = 12 que, bó 10 que thành <b>1 chục</b>. Ta có 4 chục và 2 que lẻ: <b class="hl">42</b>.</p>` },
    { t: 'Ghi nhớ', h: `<div class="memo">Chữ số đơn vị của số có một chữ số phải viết <b>thẳng cột</b> với chữ số đơn vị của số có hai chữ số. Nhớ cộng thêm phần “nhớ” vào hàng chục!</div>` }
  ],
  gen() { return pick([
    () => { const [a, b] = addC100(false); return calcQ(a, b, '+', { col: true }); },
    () => { const [a, b] = addC100(false); return calcQ(a, b, '+'); },
    () => { const [a, b] = addC100(false); const n = pick(NAMES); return inp(`<p class="wp">Lớp 2A có ${a} học sinh, sau đó có thêm ${b} bạn chuyển đến. Hỏi lớp 2A có bao nhiêu học sinh?</p>`, a + b, giai('Số học sinh lớp 2A có', `${a} + ${b}`, a + b, 'học sinh')); }
  ])(); } },

{ id: 'b20', so: 20, title: 'Phép cộng (có nhớ) số có hai chữ số với số có hai chữ số', game: 'memory',
  memo: '38 + 25: 8 + 5 = 13 viết 3 nhớ 1; 3 + 2 = 5, thêm 1 bằng 6 → 63.',
  learn: [
    { t: 'Đặt tính 38 + 25', h: `<div class="pair2">${vCol(38, 25, '+', '63')}<div><p>• 8 cộng 5 bằng 13, viết <b>3</b>, <b class="red">nhớ 1</b>.</p><p>• 3 cộng 2 bằng 5, thêm 1 bằng <b>6</b>, viết 6.</p><p>Vậy <b>38 + 25 = 63</b>.</p></div></div>` },
    { t: 'Kiểm tra lại', h: `<p>Ước lượng: 38 gần 40, 25 gần 25 → kết quả khoảng 65. Kết quả 63 là hợp lí!</p><div class="memo">Tính từ <b>phải sang trái</b>. Đừng quên <b>cộng phần nhớ</b> vào hàng chục.</div>` }
  ],
  gen() { return pick([
    () => { const [a, b] = addC100(true); return calcQ(a, b, '+', { col: true }); },
    () => { const [a, b] = addC100(true); return calcQ(a, b, '+'); },
    () => { const [a, b] = addC100(true); return inp(`<p class="wp">Thùng thứ nhất có ${a} l dầu, thùng thứ hai có ${b} l dầu. Hỏi cả hai thùng có bao nhiêu lít dầu?</p>`, a + b, giai('Cả hai thùng có', `${a} + ${b}`, a + b, 'l')); }
  ])(); } },

{ id: 'b21', so: 21, title: 'Luyện tập chung', game: 'balloon', mix: ['b19', 'b20'] },

{ id: 'b22', so: 22, title: 'Phép trừ (có nhớ) số có hai chữ số cho số có một chữ số', game: 'fish',
  memo: 'Đơn vị không trừ được thì lấy 1 chục ra: 2 không trừ được 7, lấy 12 trừ 7.',
  learn: [
    { t: 'Đặt tính 32 − 7', h: `<div class="pair2">${vCol(32, 7, '−', '25')}<div><p>• 2 không trừ được 7, lấy <b>12 trừ 7</b> bằng 5, viết <b>5</b>, <b class="red">nhớ 1</b>.</p><p>• 3 trừ 1 bằng <b>2</b>, viết 2.</p><p>Vậy <b>32 − 7 = 25</b>.</p></div></div>` },
    { t: 'Nhìn bằng que tính', h: `${vBlocks(0, 3, 2)}<p>Có 3 bó chục và 2 que. Muốn bớt 7 que, ta tháo 1 bó ra được 12 que lẻ, bớt 7 que còn 5 que. Còn lại 2 bó chục và 5 que: <b class="hl">25</b>.</p>` }
  ],
  gen() { return pick([
    () => { const [a, b] = subC100(false); return calcQ(a, b, '-', { col: true }); },
    () => { const [a, b] = subC100(false); return calcQ(a, b, '-'); },
    () => { const [a, b] = subC100(false); return inp(`<p class="wp">Trên bãi cỏ có ${a} con bò, ${b} con bò đã về chuồng. Hỏi trên bãi cỏ còn lại bao nhiêu con bò?</p>`, a - b, giai('Số con bò còn lại', `${a} − ${b}`, a - b, 'con bò')); }
  ])(); } },

{ id: 'b23', so: 23, title: 'Phép trừ (có nhớ) số có hai chữ số cho số có hai chữ số', game: 'race',
  memo: '52 − 28: 12 − 8 = 4 viết 4 nhớ 1; 2 thêm 1 bằng 3, 5 − 3 = 2 → 24.',
  learn: [
    { t: 'Đặt tính 52 − 28', h: `<div class="pair2">${vCol(52, 28, '−', '24')}<div><p>• 2 không trừ được 8, lấy 12 trừ 8 bằng 4, viết <b>4</b>, <b class="red">nhớ 1</b>.</p><p>• 2 thêm 1 bằng 3; 5 trừ 3 bằng <b>2</b>, viết 2.</p><p>Vậy <b>52 − 28 = 24</b>.</p></div></div>` },
    { t: 'Thử lại bằng phép cộng', h: `<p>Lấy hiệu cộng số trừ, nếu được số bị trừ là đúng:</p><p class="eq">24 + 28 = 52 ✓</p>` }
  ],
  gen() { return pick([
    () => { const [a, b] = subC100(true); return calcQ(a, b, '-', { col: true }); },
    () => { const [a, b] = subC100(true); return calcQ(a, b, '-'); },
    () => { const [a, b] = subC100(true); return inp(`<p class="wp">Một cửa hàng có ${a} kg đường, đã bán ${b} kg. Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam đường?</p>`, a - b, giai('Số đường còn lại', `${a} − ${b}`, a - b, 'kg')); }
  ])(); } },

{ id: 'b24', so: 24, title: 'Luyện tập chung', game: 'fish', mix: ['b19', 'b20', 'b22', 'b23'], extra() { return wpHonKem(100, true); } }
]},

{ id: 'c5', no: 5, name: 'Làm quen với hình phẳng', hue: 5, lessons: [
{ id: 'b25', so: 25, title: 'Điểm, đoạn thẳng, đường thẳng, đường cong, ba điểm thẳng hàng', game: 'balloon',
  memo: 'Đoạn thẳng có hai đầu; đường thẳng kéo dài mãi về hai phía; ba điểm thẳng hàng cùng nằm trên một đường thẳng.',
  learn: [
    { t: 'Điểm và đoạn thẳng', h: `${vFig('pt')}<p>Đây là <b>điểm M</b>. Ta dùng chữ in hoa để gọi tên điểm.</p>${vFig('seg')}<p>Nối điểm A với điểm B ta được <b>đoạn thẳng AB</b>.</p>` },
    { t: 'Đường thẳng, đường cong', h: `${vFig('line')}<p>Kéo dài đoạn thẳng AB về hai phía ta được <b>đường thẳng AB</b>.</p>${vFig('curve')}<p>Đây là <b>đường cong</b>.</p>` },
    { t: 'Ba điểm thẳng hàng', h: `${vPts(true)}<p>Ba điểm cùng nằm trên <b>một đường thẳng</b> gọi là ba điểm <b>thẳng hàng</b>.</p><p class="tip">Mẹo: đặt thước kẻ qua hai điểm, nếu điểm thứ ba cũng nằm sát mép thước thì ba điểm thẳng hàng.</p>` }
  ],
  gen() { return pick([
    () => { const k = pick(['seg', 'line', 'curve']); const ans = { seg: 'Đoạn thẳng AB', line: 'Đường thẳng AB', curve: 'Đường cong' }[k]; return mc(`<p>Hình vẽ dưới đây là:</p>${vFig(k)}`, ans, ['Đoạn thẳng AB', 'Đường thẳng AB', 'Đường cong'], `Đây là ${ans.toLowerCase()}.`); },
    () => { const c = Math.random() < .5; return mc(`<p>Ba điểm A, B, C có <b>thẳng hàng</b> không?</p>${vPts(c)}`, c ? 'Có' : 'Không', ['Có', 'Không'], c ? 'Ba điểm cùng nằm trên một đường thẳng.' : 'Ba điểm không cùng nằm trên một đường thẳng.'); },
    () => { const k = pick([['tri', 3, 'Hình tam giác'], ['quad', 4, 'Hình tứ giác']]); return inp(`<p>${k[2]} dưới đây có mấy <b>đoạn thẳng</b> (cạnh)?</p><div class="shapes one"><svg viewBox="0 0 92 84" class="shp" aria-hidden="true">${SHP[k[0]]()}</svg></div>`, k[1], `${k[2]} có ${k[1]} cạnh, là ${k[1]} đoạn thẳng.`); },
    () => mc('<p>Đoạn thẳng có mấy điểm đầu mút?</p>' + vFig('seg'), '2', ['1', '2', '3', '0'], 'Đoạn thẳng AB có hai đầu là điểm A và điểm B.')
  ])(); } },

{ id: 'b26', so: 26, title: 'Đường gấp khúc. Hình tứ giác', game: 'race',
  memo: 'Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng. Hình tứ giác có 4 cạnh.',
  learn: [
    { t: 'Đường gấp khúc', h: `${vPoly([3, 4, 2])}<p>Đường gấp khúc <b>ABCD</b> gồm 3 đoạn thẳng: AB, BC, CD.</p><p>Độ dài đường gấp khúc ABCD là: <b>3 + 4 + 2 = 9 (cm)</b>.</p><div class="memo"><b>Ghi nhớ:</b> Độ dài đường gấp khúc là <b>tổng độ dài</b> các đoạn thẳng của nó.</div>` },
    { t: 'Hình tứ giác', h: `${vShapes(['quad', 'quad', 'quad', 'quad'])}<p>Các hình trên đều là <b>hình tứ giác</b>. Hình tứ giác có <b>4 cạnh</b> và <b>4 đỉnh</b>.</p><p class="tip">Hình vuông, hình chữ nhật cũng là hình tứ giác.</p>` }
  ],
  gen() { return pick([
    () => { const n = R(2, 4); const ls = Array.from({ length: n }, () => R(2, 9)); const s = ls.reduce((a, b) => a + b, 0); return inp(`<p>Tính độ dài đường gấp khúc ${'ABCDE'.slice(0, n + 1)}:</p>${vPoly(ls)}`, s, `${ls.join(' + ')} = ${s} (cm)`); },
    () => { const others = shuffle(['tri', 'circ', 'pent', 'hex']).slice(0, 3); const arr = shuffle(['quad', ...others]); const k = arr.indexOf('quad'); return mc(`<p>Hình nào là <b>hình tứ giác</b>?</p>${vShapes(arr)}`, 'ABCD'[k], ['A', 'B', 'C', 'D'], `Hình ${'ABCD'[k]} có 4 cạnh nên là hình tứ giác.`); },
    () => { const n = R(2, 4); const ls = Array.from({ length: n }, () => R(2, 6)); return inp(`<p>Đường gấp khúc dưới đây gồm mấy đoạn thẳng?</p>${vPoly(ls)}`, n, `Đếm các đoạn: ${n} đoạn thẳng.`); },
    () => { const a = R(10, 30), b = R(10, 30), c = R(10, 30); return inp(`<p class="wp">Con kiến bò theo đường gấp khúc ABCD, biết AB = ${a} cm, BC = ${b} cm, CD = ${c} cm. Hỏi con kiến bò được bao nhiêu xăng-ti-mét?</p>`, a + b + c, `${a} + ${b} + ${c} = ${a + b + c} (cm)`); }
  ])(); } },

{ id: 'b28', so: 28, title: 'Luyện tập chung', game: 'balloon', mix: ['b25', 'b26'] }
]},

{ id: 'c6', no: 6, name: 'Ngày – giờ, giờ – phút, ngày – tháng', hue: 6, lessons: [
{ id: 'b29', so: 29, title: 'Ngày – giờ, giờ – phút', game: 'balloon',
  memo: '1 ngày có 24 giờ, 1 giờ có 60 phút. 13 giờ còn gọi là 1 giờ chiều.',
  learn: [
    { t: 'Một ngày có 24 giờ', h: `<div class="scrollx"><table class="tbl"><tr><th>Buổi</th><th>Giờ</th></tr><tr><td>Sáng ☀️</td><td>1 giờ → 10 giờ</td></tr><tr><td>Trưa 🍚</td><td>11 giờ → 12 giờ</td></tr><tr><td>Chiều 🌇</td><td>13 giờ (1 giờ chiều) → 18 giờ (6 giờ chiều)</td></tr><tr><td>Tối 🌙</td><td>19 giờ (7 giờ tối) → 21 giờ (9 giờ tối)</td></tr><tr><td>Đêm 🌌</td><td>22 giờ (10 giờ đêm) → 24 giờ (12 giờ đêm)</td></tr></table></div><div class="memo"><b>1 ngày = 24 giờ.</b> 15 giờ còn gọi là 3 giờ chiều; 20 giờ còn gọi là 8 giờ tối.</div>` },
    { t: 'Xem đồng hồ', h: `<div class="row-c">${vClock(8, 0, 150)}${vClock(8, 30, 150)}</div><p>Kim <b>ngắn</b> chỉ giờ, kim <b>dài</b> chỉ phút. Đồng hồ thứ nhất chỉ <b>8 giờ</b>, đồng hồ thứ hai chỉ <b>8 giờ 30 phút</b> (8 giờ rưỡi).</p>` },
    { t: 'Giờ và phút', h: `<div class="row-c">${vClock(3, 15, 150)}</div><p>Kim dài chỉ số 3 là <b>15 phút</b>, chỉ số 6 là <b>30 phút</b>, chỉ số 12 là giờ đúng. Đồng hồ chỉ <b>3 giờ 15 phút</b>.</p><div class="memo"><b>1 giờ = 60 phút.</b></div>` }
  ],
  gen() { const lab = (h, m) => m ? `${h} giờ ${m} phút` : `${h} giờ`; return pick([
    () => { const h = R(1, 12), m = pick([0, 0, 15, 30, 30]); const c = new Set([lab(h, m)]); [0, 15, 30].forEach(x => c.add(lab(h, x))); c.add(lab(h % 12 + 1, m)); return mc(`<p>Đồng hồ chỉ mấy giờ?</p><div class="row-c">${vClock(h, m)}</div>`, lab(h, m), [...c].slice(0, 4), `Kim ngắn chỉ ${m ? 'quá số ' + h : 'số ' + h}, kim dài chỉ số ${m ? m / 5 : 12}: ${lab(h, m)}${m === 30 ? ' (' + h + ' giờ rưỡi)' : ''}.`); },
    () => { const h = R(13, 23); return inp(`<p><b>${h} giờ</b> còn gọi là mấy giờ ${h <= 18 ? 'chiều' : h <= 21 ? 'tối' : 'đêm'}?</p>`, h - 12, `${h} − 12 = ${h - 12}. ${h} giờ còn gọi là ${h - 12} giờ ${h <= 18 ? 'chiều' : h <= 21 ? 'tối' : 'đêm'}.`); },
    () => pick([inp('<p class="eq">1 ngày = <span class="slot">?</span> giờ</p>', 24, '1 ngày có 24 giờ.'), inp('<p class="eq">1 giờ = <span class="slot">?</span> phút</p>', 60, '1 giờ có 60 phút.')]),
    () => { const h = R(1, 10), k = R(1, 2); return inp(`<p>Đồng hồ đang chỉ ${h} giờ. Sau ${k} giờ nữa là mấy giờ?</p><div class="row-c">${vClock(h, 0, 140)}</div>`, h + k, `${h} + ${k} = ${h + k} giờ.`); }
  ])(); } },

{ id: 'b30', so: 30, title: 'Ngày – tháng', game: 'race',
  memo: 'Xem lịch để biết một ngày là thứ mấy. Một năm có 12 tháng.',
  learn: [
    { t: 'Tờ lịch tháng', h: `${vCal(2026, 10, 19)}<p>Đây là tờ lịch tháng 10 năm 2026. Tháng 10 có <b>31 ngày</b>. Ngày <b>19</b> tháng 10 là <b>Thứ Hai</b>.</p>` },
    { t: 'Số ngày trong tháng', h: `<div class="scrollx"><table class="tbl small"><tr><th>Tháng</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td></tr><tr><th>Số ngày</th><td>31</td><td>28 hoặc 29</td><td>31</td><td>30</td><td>31</td><td>30</td><td>31</td><td>31</td><td>30</td><td>31</td><td>30</td><td>31</td></tr></table></div><p class="tip">Mẹo nắm tay: đốt lồi là tháng có 31 ngày, chỗ lõm là tháng có 30 ngày (hoặc tháng 2).</p>` },
    { t: 'Một tuần lễ', h: `<p>Một tuần có <b>7 ngày</b>: Thứ Hai, Thứ Ba, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy, Chủ nhật.</p><div class="memo">Thứ Hai tuần này là ngày 5 thì Thứ Hai tuần sau là ngày <b>5 + 7 = 12</b>.</div>` }
  ],
  gen() { const y = 2026, m = R(1, 12), days = new Date(y, m, 0).getDate(); return pick([
    () => { const d = R(1, days); const w = THU[new Date(y, m - 1, d).getDay()]; return mc(`<p>Xem tờ lịch. Ngày <b>${d}</b> tháng ${m} là thứ mấy?</p>${vCal(y, m, d)}`, w, fill4(w, THU), `Ngày ${d} tháng ${m} năm ${y} là ${w}.`); },
    () => inp(`<p>Tháng ${m} năm ${y} có bao nhiêu ngày?</p>${vCal(y, m)}`, days, `Nhìn ngày cuối cùng trên tờ lịch: ${days}.`),
    () => { let c = 0, f = 0; for (let d = 1; d <= days; d++) if (new Date(y, m - 1, d).getDay() === 0) { c++; if (!f) f = d; } return inp(`<p>Tháng ${m} năm ${y} có mấy ngày <b>Chủ nhật</b>?</p>${vCal(y, m)}`, c, `Các ngày Chủ nhật nằm ở cột CN: có ${c} ngày.`); },
    () => { const d = R(1, 20); return inp(`<p>Thứ Hai tuần này là ngày ${d}. Thứ Hai tuần sau là ngày bao nhiêu?</p>`, d + 7, `Một tuần có 7 ngày: ${d} + 7 = ${d + 7}.`); },
    () => mc('<p>Một tuần lễ có mấy ngày?</p>', '7', ['5', '6', '7', '10'], 'Một tuần có 7 ngày.')
  ])(); } },

{ id: 'b32', so: 32, title: 'Luyện tập chung', game: 'fish', mix: ['b29', 'b30'] }
]},

{ id: 'c7', no: 7, name: 'Ôn tập học kì 1', hue: 7, lessons: [
{ id: 'on1', so: '33–36', title: 'Ôn tập học kì 1', game: 'race', mixTopics: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'] }
]}
]},

/* ================= TẬP HAI ================= */
{ tap: 2, name: 'Tập hai', topics: [

{ id: 'c8', no: 8, name: 'Phép nhân, phép chia', hue: 1, lessons: [
{ id: 'b37', so: 37, title: 'Phép nhân', game: 'balloon',
  memo: '2 × 3 nghĩa là 2 được lấy 3 lần: 2 + 2 + 2 = 6.',
  learn: [
    { t: 'Các nhóm bằng nhau', h: `${vGroups('🍊', 2, 3)}<p>Có 3 đĩa, mỗi đĩa có 2 quả cam. Có tất cả: 2 + 2 + 2 = 6 (quả).</p>` },
    { t: 'Phép nhân', h: `<p>2 + 2 + 2 là tổng của <b>3 số hạng</b>, mỗi số hạng đều bằng <b>2</b>. Ta viết thành phép nhân:</p><p class="eq">2 × 3 = 6</p><p>Đọc là: <i>hai nhân ba bằng sáu</i>. Dấu <b>×</b> là dấu nhân.</p>` },
    { t: 'Ghi nhớ', h: `${vGroups('⭐', 5, 2)}<p class="eq">5 + 5 = 5 × 2 = 10</p><div class="memo">Viết tổng các số hạng <b>bằng nhau</b> thành phép nhân: <b>số hạng × số lần</b>.</div>` }
  ],
  gen() { let k = R(2, 5), n = R(2, 5); while (n === k) n = R(2, 5); const e = pick(THINGS); return pick([
    () => mc(`<p>Có ${n} nhóm, mỗi nhóm có ${k} ${e.n}. Phép nhân nào đúng?</p>${vGroups(e.e, k, n)}`, `${k} × ${n}`, [`${k} × ${n}`, `${n} × ${k}`, `${k} + ${n}`, `${k} × ${k}`], `${k} được lấy ${n} lần: ${k} × ${n} = ${k * n}.`),
    () => inp(`<p>Viết tổng thành phép nhân:</p><p class="eq">${Array(n).fill(k).join(' + ')} = ${k} × <span class="slot">?</span></p>`, n, `${k} được lấy ${n} lần.`),
    () => inp(`<p>Có tất cả bao nhiêu ${e.n}?</p>${vGroups(e.e, k, n)}<p class="eq">${k} × ${n} = <span class="slot">?</span></p>`, k * n, `${Array(n).fill(k).join(' + ')} = ${k * n}.`),
    () => mc(`<p>Phép nhân <b>${k} × ${n}</b> bằng tổng nào?</p>`, Array(n).fill(k).join(' + '), [Array(n).fill(k).join(' + '), Array(k).fill(n).join(' + '), `${k} + ${n}`, Array(n).fill(k + 1).join(' + ')], `${k} × ${n} là ${k} được lấy ${n} lần.`)
  ])(); } },

{ id: 'b38', so: 38, title: 'Thừa số, tích', game: 'fish',
  memo: 'Thừa số × Thừa số = Tích.',
  learn: [
    { t: 'Tên gọi', h: `<div class="parts"><div><b>2</b><small>Thừa số</small></div><div class="op">×</div><div><b>5</b><small>Thừa số</small></div><div class="op">=</div><div><b>10</b><small>Tích</small></div></div><p><b>2 × 5</b> cũng gọi là <b>tích</b>.</p>` },
    { t: 'Tìm tích', h: `<p>Tìm tích, biết hai thừa số là 5 và 3:</p><p class="eq">5 × 3 = 15</p><p>vì 5 + 5 + 5 = 15.</p>` }
  ],
  gen() { const a = pick([2, 5]), b = R(2, 10); return pick([
    () => { const k = R(0, 2); const nm = ['Thừa số', 'Thừa số', 'Tích'][k]; return mc(`<p>Trong phép nhân <b class="eq">${a} × ${b} = ${a * b}</b>, số <b class="hl">${[a, b, a * b][k]}</b> gọi là:</p>`, nm, ['Thừa số', 'Tích', 'Tổng', 'Số hạng'], `${a} và ${b} là thừa số, ${a * b} là tích.`); },
    () => inp(`<p>Tìm <b>tích</b>, biết hai thừa số là <b>${a}</b> và <b>${b}</b>.</p>`, a * b, `${a} × ${b} = ${a * b}.`),
    () => calcQ(a, b, '×')
  ])(); } },

{ id: 'b39', so: 39, title: 'Bảng nhân 2', game: 'memory',
  memo: 'Mỗi lần thừa số thứ hai tăng 1 thì tích tăng 2.',
  learn: [
    { t: 'Bảng nhân 2', h: `<div class="mtab">${Array.from({ length: 10 }, (_, i) => `<span>2 × ${i + 1} = <b>${2 * (i + 1)}</b></span>`).join('')}</div><p class="tip">Đếm thêm 2: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20.</p>` },
    { t: 'Ví dụ', h: `<p class="wp">Mỗi con gà có 2 chân. Hỏi 6 con gà có bao nhiêu chân?</p>${vObjs('🐔', 6, 6)}${giai('6 con gà có số chân', '2 × 6', 12, 'chân')}` }
  ],
  gen() { const b = R(1, 10); return pick([
    () => calcQ(2, b, '×'),
    () => inp(`<p class="eq">2 × <span class="slot">?</span> = ${2 * b}</p>`, b, `2 × ${b} = ${2 * b}.`),
    () => { const n = R(3, 9); return inp(`<p class="wp">Mỗi đôi đũa có 2 chiếc. Hỏi ${n} đôi đũa có bao nhiêu chiếc đũa?</p>`, 2 * n, giai(`${n} đôi đũa có số chiếc`, `2 × ${n}`, 2 * n, 'chiếc đũa')); }
  ])(); } },

{ id: 'b40', so: 40, title: 'Bảng nhân 5', game: 'race',
  memo: 'Đếm thêm 5: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50.',
  learn: [
    { t: 'Bảng nhân 5', h: `<div class="mtab">${Array.from({ length: 10 }, (_, i) => `<span>5 × ${i + 1} = <b>${5 * (i + 1)}</b></span>`).join('')}</div><p class="tip">Tích của bảng nhân 5 luôn có chữ số tận cùng là 0 hoặc 5.</p>` },
    { t: 'Ví dụ', h: `<p class="wp">Mỗi bàn tay có 5 ngón. Hỏi 4 bàn tay có bao nhiêu ngón?</p>${vObjs('🖐️', 4, 4)}${giai('4 bàn tay có số ngón', '5 × 4', 20, 'ngón tay')}` }
  ],
  gen() { const b = R(1, 10); return pick([
    () => calcQ(5, b, '×'),
    () => inp(`<p class="eq">5 × <span class="slot">?</span> = ${5 * b}</p>`, b, `5 × ${b} = ${5 * b}.`),
    () => { const n = R(2, 9); return inp(`<p class="wp">Mỗi bó có 5 bông hoa. Hỏi ${n} bó có bao nhiêu bông hoa?</p>${vGroups('🌷', 5, Math.min(n, 9))}`, 5 * n, giai(`${n} bó có số bông hoa`, `5 × ${n}`, 5 * n, 'bông hoa')); },
    () => { const c = R(2, 9); const d = pick([5 * c, R(10, 50)]); const q = cmpQ(5 * c, d); q.q = q.q.replace(`${5 * c} <span`, `5 × ${c} <span`); q.ex = `5 × ${c} = ${5 * c}; ${q.ex}`; return q; }
  ])(); } },

{ id: 'b41', so: 41, title: 'Phép chia', game: 'balloon',
  memo: 'Chia đều 8 cái kẹo cho 2 bạn, mỗi bạn 4 cái: 8 : 2 = 4.',
  learn: [
    { t: 'Chia đều', h: `${vGroups('🍬', 4, 2)}<p>Chia đều 8 cái kẹo cho 2 bạn, mỗi bạn được 4 cái kẹo.</p><p class="eq">8 : 2 = 4</p><p>Đọc là: <i>tám chia hai bằng bốn</i>. Dấu <b>:</b> là dấu chia.</p>` },
    { t: 'Từ phép nhân đến phép chia', h: `<p class="eq">4 × 2 = 8</p><p>Từ phép nhân trên, ta có hai phép chia:</p><p class="eq">8 : 2 = 4 &nbsp;&nbsp; 8 : 4 = 2</p>` }
  ],
  gen() { const d = pick([2, 5]), q = R(1, 10); return pick([
    () => { const e = pick(THINGS); return inp(`<p>Chia đều ${d * q} ${e.n} vào ${d} đĩa. Mỗi đĩa có mấy ${e.n}?</p>${q <= 6 ? vGroups(e.e, q, d) : ''}`, q, `${d * q} : ${d} = ${q}.`); },
    () => inp(`<p>Biết <b>${q} × ${d} = ${d * q}</b>. Vậy:</p><p class="eq">${d * q} : ${d} = <span class="slot">?</span></p>`, q, `Từ ${q} × ${d} = ${d * q} suy ra ${d * q} : ${d} = ${q}.`),
    () => calcQ(d * q, d, ':')
  ])(); } },

{ id: 'b42', so: 42, title: 'Số bị chia, số chia, thương', game: 'fish',
  memo: 'Số bị chia : Số chia = Thương.',
  learn: [
    { t: 'Tên gọi', h: `<div class="parts"><div><b>10</b><small>Số bị chia</small></div><div class="op">:</div><div><b>2</b><small>Số chia</small></div><div class="op">=</div><div><b>5</b><small>Thương</small></div></div><p><b>10 : 2</b> cũng gọi là <b>thương</b>.</p>` },
    { t: 'Tìm thương', h: `<p>Số bị chia là 15, số chia là 5. Thương là:</p><p class="eq">15 : 5 = 3</p>` }
  ],
  gen() { const d = pick([2, 5]), q = R(1, 10); return pick([
    () => { const k = R(0, 2); const nm = ['Số bị chia', 'Số chia', 'Thương'][k]; return mc(`<p>Trong phép chia <b class="eq">${d * q} : ${d} = ${q}</b>, số <b class="hl">${[d * q, d, q][k]}</b> gọi là:</p>`, nm, ['Số bị chia', 'Số chia', 'Thương', 'Tích'], `${d * q} là số bị chia, ${d} là số chia, ${q} là thương.`); },
    () => inp(`<p>Tìm <b>thương</b>, biết số bị chia là <b>${d * q}</b>, số chia là <b>${d}</b>.</p>`, q, `${d * q} : ${d} = ${q}.`)
  ])(); } },

{ id: 'b43', so: 43, title: 'Bảng chia 2', game: 'memory',
  memo: 'Dựa vào bảng nhân 2 để nhớ bảng chia 2.',
  learn: [
    { t: 'Bảng chia 2', h: `<div class="mtab">${Array.from({ length: 10 }, (_, i) => `<span>${2 * (i + 1)} : 2 = <b>${i + 1}</b></span>`).join('')}</div>` },
    { t: 'Ví dụ', h: `<p class="wp">Có 12 cái bánh chia đều vào 2 hộp. Hỏi mỗi hộp có mấy cái bánh?</p>${vGroups('🧁', 6, 2)}${giai('Mỗi hộp có số cái bánh', '12 : 2', 6, 'cái bánh')}` }
  ],
  gen() { const q = R(1, 10); return pick([
    () => calcQ(2 * q, 2, ':'),
    () => { const n = pick(NAMES); return inp(`<p class="wp">${n} có ${2 * q} cái kẹo, chia đều cho 2 em. Hỏi mỗi em được mấy cái kẹo?</p>`, q, giai('Mỗi em được số cái kẹo', `${2 * q} : 2`, q, 'cái kẹo')); }
  ])(); } },

{ id: 'b44', so: 44, title: 'Bảng chia 5', game: 'race',
  memo: 'Dựa vào bảng nhân 5 để nhớ bảng chia 5.',
  learn: [
    { t: 'Bảng chia 5', h: `<div class="mtab">${Array.from({ length: 10 }, (_, i) => `<span>${5 * (i + 1)} : 5 = <b>${i + 1}</b></span>`).join('')}</div>` },
    { t: 'Ví dụ', h: `<p class="wp">Có 20 bông hoa cắm đều vào 5 lọ. Hỏi mỗi lọ có mấy bông hoa?</p>${vGroups('🌷', 4, 5)}${giai('Mỗi lọ có số bông hoa', '20 : 5', 4, 'bông hoa')}` }
  ],
  gen() { const q = R(1, 10); return pick([
    () => calcQ(5 * q, 5, ':'),
    () => inp(`<p class="wp">Có ${5 * q} học sinh xếp đều thành 5 hàng. Hỏi mỗi hàng có bao nhiêu học sinh?</p>`, q, giai('Mỗi hàng có số học sinh', `${5 * q} : 5`, q, 'học sinh')),
    () => inp(`<p class="eq"><span class="slot">?</span> : 5 = ${q}</p>`, 5 * q, `${q} × 5 = ${5 * q}, nên ${5 * q} : 5 = ${q}.`)
  ])(); } },

{ id: 'b45', so: 45, title: 'Luyện tập chung', game: 'balloon', mix: ['b37', 'b38', 'b39', 'b40', 'b41', 'b42', 'b43', 'b44'] }
]},

{ id: 'c9', no: 9, name: 'Làm quen với hình khối', hue: 2, lessons: [
{ id: 'b46', so: 46, title: 'Khối trụ, khối cầu', game: 'fish',
  memo: 'Lon nước có dạng khối trụ, quả bóng có dạng khối cầu.',
  learn: [
    { t: 'Khối trụ', h: `<div class="row-c"><svg viewBox="0 0 120 140" width="110" class="solid" aria-hidden="true"><path d="M15 25 V115 A45 15 0 0 0 105 115 V25" class="sl-side"/><ellipse cx="60" cy="25" rx="45" ry="15" class="sl-top"/></svg><span class="big-e">🥫 🧻 🥁</span></div><p>Đây là <b>khối trụ</b>. Lon nước, cuộn giấy, cái trống có dạng khối trụ.</p>` },
    { t: 'Khối cầu', h: `<div class="row-c"><svg viewBox="0 0 120 120" width="110" class="solid" aria-hidden="true"><circle cx="60" cy="60" r="50" class="sl-ball"/><ellipse cx="60" cy="60" rx="50" ry="14" class="sl-eq"/><ellipse cx="42" cy="38" rx="12" ry="8" class="sl-shine"/></svg><span class="big-e">⚽ 🏀 🌍</span></div><p>Đây là <b>khối cầu</b>. Quả bóng, quả địa cầu có dạng khối cầu.</p>` },
    { t: 'Phân biệt', h: `<div class="memo">Khối cầu <b>lăn được về mọi phía</b>. Khối trụ đặt nằm thì <b>lăn được</b>, đặt đứng thì <b>đứng yên</b>. Khối hộp chữ nhật 📦 và khối lập phương 🎲 không lăn được.</div>` }
  ],
  gen() { const CYL = ['🥫', '🧻', '🥁', '🔋'], SPH = ['⚽', '🏀', '🌍', '🎱', '🏐'], BOX = ['📦', '🎁', '🎲']; return pick([
    () => { const a = pick(CYL); return mc('<p>Đồ vật nào có dạng <b>khối trụ</b>?</p>', a, [a, pick(SPH), pick(BOX), pick(SPH.filter(x => x !== a))], `${a} có dạng khối trụ.`); },
    () => { const a = pick(SPH); return mc('<p>Đồ vật nào có dạng <b>khối cầu</b>?</p>', a, [a, pick(CYL), pick(BOX), pick(CYL)].filter((v, i, x) => x.indexOf(v) === i).concat(['📚']).slice(0, 4), `${a} có dạng khối cầu.`); },
    () => { const c = R(1, 4), s = R(1, 4), b = R(1, 3); const items = shuffle([...Array(c).fill(0).map(() => pick(CYL)), ...Array(s).fill(0).map(() => pick(SPH)), ...Array(b).fill(0).map(() => pick(BOX))]); const askC = Math.random() < .5; return inp(`<p>Có bao nhiêu đồ vật dạng <b>${askC ? 'khối trụ' : 'khối cầu'}</b>?</p><div class="big-e mix">${items.join(' ')}</div>`, askC ? c : s, `Có ${askC ? c : s} đồ vật dạng ${askC ? 'khối trụ' : 'khối cầu'}.`); },
    () => mc('<p>Khối nào <b>lăn được về mọi phía</b>?</p>', 'Khối cầu', ['Khối cầu', 'Khối trụ', 'Khối lập phương', 'Khối hộp chữ nhật'], 'Khối cầu lăn được về mọi phía.')
  ])(); } },

{ id: 'b47', so: 47, title: 'Luyện tập chung', game: 'balloon', mix: ['b46', 'b25', 'b26'] }
]},

{ id: 'c10', no: 10, name: 'Các số trong phạm vi 1000', hue: 3, lessons: [
{ id: 'b48', so: 48, title: 'Đơn vị, chục, trăm, nghìn', game: 'balloon',
  memo: '10 đơn vị = 1 chục; 10 chục = 1 trăm; 10 trăm = 1 nghìn.',
  learn: [
    { t: 'Từ đơn vị đến nghìn', h: `<div class="ladder"><div>${vBlocks(0, 0, 1)}<b>1 đơn vị</b></div><div>${vBlocks(0, 1, 0)}<b>1 chục = 10 đơn vị</b></div><div>${vBlocks(1, 0, 0)}<b>1 trăm = 10 chục</b></div><div><span class="thou">${'<i class="bh"></i>'.repeat(10)}</span><b>1 nghìn = 10 trăm</b></div></div>` },
    { t: 'Viết số 1000', h: `<p>10 trăm bằng <b>1 nghìn</b>, viết là <b class="hl">1000</b>, đọc là <i>một nghìn</i>.</p><div class="memo">10 đơn vị = 1 chục · 10 chục = 1 trăm · 10 trăm = 1 nghìn</div>` }
  ],
  gen() { return pick([
    () => pick([mc('<p class="eq">10 đơn vị = <span class="slot">?</span></p>', '1 chục', ['1 chục', '1 trăm', '10 chục', '1 nghìn'], '10 đơn vị = 1 chục.'), mc('<p class="eq">10 chục = <span class="slot">?</span></p>', '1 trăm', ['1 chục', '1 trăm', '10 trăm', '1 nghìn'], '10 chục = 1 trăm.'), mc('<p class="eq">10 trăm = <span class="slot">?</span></p>', '1 nghìn', ['1 chục', '1 trăm', '100 chục', '1 nghìn'], '10 trăm = 1 nghìn.')]),
    () => { const h = R(1, 9); return inp(`<p>Có mấy trăm? Viết số.</p>${vBlocks(h, 0, 0)}`, h * 100, `${h} trăm viết là ${h * 100}.`); },
    () => { const t = R(1, 9); return inp(`<p>Có mấy chục? Viết số.</p>${vBlocks(0, t, 0)}`, t * 10, `${t} chục viết là ${t * 10}.`); },
    () => inp('<p>1 nghìn bằng bao nhiêu trăm?</p>', 10, '1 nghìn = 10 trăm.')
  ])(); } },

{ id: 'b49', so: 49, title: 'Các số tròn trăm, tròn chục', game: 'fish',
  memo: 'Số tròn trăm có hai chữ số 0 ở cuối (300). Số tròn chục có chữ số 0 ở cuối (240).',
  learn: [
    { t: 'Số tròn trăm', h: `${vBlocks(3, 0, 0)}<p>3 trăm viết là <b class="hl">300</b>. Các số tròn trăm: 100, 200, 300, …, 900. Số tròn trăm có <b>hai chữ số 0</b> tận cùng.</p>` },
    { t: 'Số tròn chục', h: `${vBlocks(2, 4, 0)}<p>2 trăm và 4 chục viết là <b class="hl">240</b>. Số tròn chục có chữ số <b>0</b> ở hàng đơn vị: 110, 120, 240, 350…</p>` }
  ],
  gen() { return pick([
    () => { const h = R(1, 9); const ans = h * 100; return mc('<p>Số nào là <b>số tròn trăm</b>?</p>', ans, [ans, R(1, 9) * 100 + R(1, 9) * 10, R(101, 999), R(1, 9) * 100 + R(1, 9)].map(String), `${ans} có hai chữ số 0 tận cùng.`); },
    () => { const h = R(1, 9), t = R(1, 9); return inp(`<p>Viết số thích hợp:</p>${vBlocks(h, t, 0)}`, h * 100 + t * 10, `${h} trăm ${t} chục viết là ${h * 100 + t * 10}.`); },
    () => { const n = R(10, 98) * 10; return inp(`<p>Số tròn chục liền sau của <b>${n}</b> là số nào?</p>`, n + 10, `${n} + 10 = ${n + 10}.`); },
    () => { const s = R(1, 4) * 100; const st = pick([10, 100]); const start = st === 100 ? 0 : s; const v = start + R(1, 9) * st; return inp(`<p>Số thích hợp ở ô <b>?</b> là:</p>${vLine(start, st, [v])}`, v, `Tia số đếm thêm ${st}.`); }
  ])(); } },

{ id: 'b50', so: 50, title: 'So sánh các số tròn trăm, tròn chục', game: 'race', sort: [1, 9],
  memo: 'So sánh hàng trăm trước; nếu bằng nhau thì so sánh hàng chục.',
  learn: [
    { t: 'So sánh số tròn trăm', h: `<div class="row-c">${vBlocks(2, 0, 0)}<span class="eq">&lt;</span>${vBlocks(4, 0, 0)}</div><p class="eq">200 &lt; 400</p><p>2 trăm ít hơn 4 trăm.</p>` },
    { t: 'So sánh số tròn chục', h: `<p class="eq">350 &gt; 320</p><p>Hàng trăm bằng nhau (3 trăm), so sánh hàng chục: 5 chục &gt; 2 chục.</p><div class="memo">So sánh <b>từ trái sang phải</b>: trăm → chục → đơn vị.</div>` }
  ],
  gen() { return pick([
    () => cmpQ(R(1, 9) * 100, R(1, 9) * 100),
    () => { const h = R(1, 9); return cmpQ(h * 100 + R(0, 9) * 10, (Math.random() < .7 ? h : R(1, 9)) * 100 + R(0, 9) * 10); },
    () => { const s = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4).map(x => x * 100); const big = Math.random() < .5; const a = big ? Math.max(...s) : Math.min(...s); return mc(`<p>Số <b>${big ? 'lớn nhất' : 'bé nhất'}</b> trong các số: ${s.join(', ')} là:</p>`, a, s, `Số ${big ? 'lớn nhất' : 'bé nhất'} là ${a}.`); }
  ])(); } },

{ id: 'b51', so: 51, title: 'Số có ba chữ số', game: 'balloon',
  memo: 'Số có ba chữ số gồm trăm, chục, đơn vị. 507 đọc là “năm trăm linh bảy”.',
  learn: [
    { t: 'Trăm, chục, đơn vị', h: `${vBlocks(2, 4, 3)}<div class="scrollx"><table class="tbl"><tr><th>Trăm</th><th>Chục</th><th>Đơn vị</th><th>Viết số</th><th>Đọc số</th></tr><tr><td>2</td><td>4</td><td>3</td><td><b>243</b></td><td>hai trăm bốn mươi ba</td></tr></table></div>` },
    { t: 'Đọc số có ba chữ số', h: `<div class="scrollx"><table class="tbl"><tr><th>Viết số</th><th>Đọc số</th></tr><tr><td>315</td><td>ba trăm mười lăm</td></tr><tr><td>507</td><td>năm trăm <b>linh</b> bảy</td></tr><tr><td>621</td><td>sáu trăm hai mươi <b>mốt</b></td></tr><tr><td>854</td><td>tám trăm năm mươi <b>tư</b></td></tr></table></div><p class="tip">Hàng chục là 0 thì đọc là “linh”.</p>` }
  ],
  gen() { return pick([
    () => { const h = R(1, 9), t = R(0, 9), o = R(0, 9); return inp(`<p>Viết số gồm ${h} trăm, ${t} chục, ${o} đơn vị:</p>${vBlocks(h, t, o)}`, h * 100 + t * 10 + o, `${h} trăm ${t} chục ${o} đơn vị viết là ${h * 100 + t * 10 + o}.`); },
    () => { const n = R(101, 999); const s = String(n); const alt = [+(s[0] + s[2] + s[1]), +(s[1] !== '0' ? s[1] + s[0] + s[2] : s[0] + s[0] + s[2]), n + 10]; return mc(`<p>Số “<b>${docSo(n)}</b>” viết là:</p>`, n, fill4(n, alt, 100, 999), `“${docSo(n)}” viết là ${n}.`); },
    () => { const n = R(1, 9) * 100 + R(0, 9) * 10 + R(0, 9); const c = new Set([docSo(n)]); [n + 1, n + 10, n - 10, n + 100].forEach(v => { if (v >= 100 && v < 1000 && c.size < 4) c.add(docSo(v)); }); return mc(`<p>Số <b class="hl">${n}</b> đọc là:</p>`, docSo(n), [...c], `${n} đọc là “${docSo(n)}”.`); },
    () => { const n = R(100, 999); const k = R(0, 2); const nm = ['trăm', 'chục', 'đơn vị'][k]; return inp(`<p>Chữ số hàng <b>${nm}</b> của số <b>${n}</b> là:</p>`, String(n)[k], `${n}: ${String(n)[0]} trăm, ${String(n)[1]} chục, ${String(n)[2]} đơn vị.`); }
  ])(); } },

{ id: 'b52', so: 52, title: 'Viết số thành tổng các trăm, chục, đơn vị', game: 'memory',
  memo: '457 = 400 + 50 + 7.',
  learn: [
    { t: 'Viết thành tổng', h: `${vBlocks(4, 5, 7)}<p class="eq">457 = 400 + 50 + 7</p><p>457 gồm 4 trăm, 5 chục, 7 đơn vị.</p>` },
    { t: 'Chú ý chữ số 0', h: `<p class="eq">608 = 600 + 8</p><p class="eq">350 = 300 + 50</p><p class="tip">Chữ số 0 thì không cần viết vào tổng.</p>` }
  ],
  gen() { const h = R(1, 9), t = R(1, 9), o = R(1, 9), n = h * 100 + t * 10 + o; return pick([
    () => inp(`<p class="eq">${n} = ${h * 100} + <span class="slot">?</span> + ${o}</p>`, t * 10, `${n} gồm ${h} trăm, ${t} chục, ${o} đơn vị.`),
    () => ({ q: `<p class="eq">${h * 100} + ${t * 10} + ${o} = <span class="slot">?</span></p>`, a: String(n), input: Math.random() < .5, choices: fill4(n, [h * 100 + o * 10 + t, t * 100 + h * 10 + o, n + 10], 100, 999), pair: [`${h * 100}+${t * 10}+${o}`, String(n)], ex: `${h * 100} + ${t * 10} + ${o} = ${n}` }),
    () => { const m = h * 100 + o; return mc(`<p>Viết số <b>${m}</b> thành tổng:</p>`, `${h * 100} + ${o}`, [`${h * 100} + ${o}`, `${h * 100} + ${o * 10}`, `${h * 10} + ${o}`, `${h} + ${o}`], `${m} gồm ${h} trăm, 0 chục, ${o} đơn vị.`); }
  ])(); } },

{ id: 'b53', so: 53, title: 'So sánh các số có ba chữ số', game: 'sort', sort: [100, 999],
  memo: 'So sánh hàng trăm → hàng chục → hàng đơn vị.',
  learn: [
    { t: 'Cách so sánh', h: `<p class="eq">425 &lt; 532</p><p>Hàng trăm: 4 &lt; 5.</p><p class="eq">367 &gt; 359</p><p>Hàng trăm bằng nhau; hàng chục: 6 &gt; 5.</p><p class="eq">748 &lt; 749</p><p>Trăm, chục bằng nhau; đơn vị: 8 &lt; 9.</p>` },
    { t: 'Ghi nhớ', h: `<div class="memo">Số nào có hàng trăm lớn hơn thì lớn hơn. Nếu hàng trăm bằng nhau thì so sánh hàng chục; nếu hàng chục cũng bằng nhau thì so sánh hàng đơn vị.</div>` }
  ],
  gen() { return pick([
    () => { const a = R(100, 999); const b = pick([a, Math.floor(a / 100) * 100 + R(0, 99), Math.floor(a / 10) * 10 + R(0, 9), R(100, 999)]); return cmpQ(a, b); },
    () => { const s = [...new Set(Array.from({ length: 6 }, () => R(100, 999)))].slice(0, 4); const big = Math.random() < .5; const a = big ? Math.max(...s) : Math.min(...s); return mc(`<p>Số <b>${big ? 'lớn nhất' : 'bé nhất'}</b> trong các số: ${s.join(', ')} là:</p>`, a, s, `Số ${big ? 'lớn nhất' : 'bé nhất'} là ${a}.`); },
    () => { const h = R(1, 9), t = R(0, 9); return inp(`<p>Tìm chữ số thích hợp: <span class="eq">${h}${t}<span class="slot">?</span> &gt; ${h}${t}8</span></p>`, 9, `Chỉ có 9 &gt; 8, nên chữ số cần điền là 9.`); }
  ])(); } },

{ id: 'b54', so: 54, title: 'Luyện tập chung', game: 'race', mix: ['b48', 'b49', 'b50', 'b51', 'b52', 'b53'] }
]},

{ id: 'c11', no: 11, name: 'Độ dài và đơn vị đo độ dài. Tiền Việt Nam', hue: 4, lessons: [
{ id: 'b55', so: 55, title: 'Đề-xi-mét. Mét. Ki-lô-mét', game: 'race',
  memo: '1 dm = 10 cm; 1 m = 10 dm = 100 cm; 1 km = 1000 m.',
  learn: [
    { t: 'Đề-xi-mét', h: `${vRuler(10)}<p>Đoạn thẳng dài <b>10 cm</b> là <b>1 đề-xi-mét</b>, viết tắt là <b class="hl">dm</b>.</p><p class="eq">1 dm = 10 cm</p>` },
    { t: 'Mét', h: `<p><b>Mét</b> viết tắt là <b class="hl">m</b>. Cái bàn học dài khoảng 1 m, cửa ra vào cao khoảng 2 m.</p><p class="eq">1 m = 10 dm &nbsp; 1 m = 100 cm</p>` },
    { t: 'Ki-lô-mét', h: `<p>Để đo quãng đường dài ta dùng <b>ki-lô-mét</b>, viết tắt là <b class="hl">km</b>.</p><p class="eq">1 km = 1000 m</p><p>Quãng đường Hà Nội – Hải Phòng dài khoảng 100 km.</p>` },
    { t: 'Ghi nhớ', h: `<div class="memo">cm → dm → m → km: đơn vị càng lớn dùng để đo những thứ càng dài.<br>1 dm = 10 cm · 1 m = 10 dm = 100 cm · 1 km = 1000 m</div>` }
  ],
  gen() { const k = R(2, 9); return pick([
    () => { const c = pick([['1 dm', 'cm', 10], ['1 m', 'dm', 10], ['1 m', 'cm', 100], ['1 km', 'm', 1000], [`${k} dm`, 'cm', k * 10], [`${k} m`, 'dm', k * 10], [`${k * 10} cm`, 'dm', k]]); return inp(`<p class="eq">${c[0]} = <span class="slot">?</span> ${c[1]}</p>`, c[2], `${c[0]} = ${c[2]} ${c[1]}.`); },
    () => { const c = pick([['Cây bút chì dài khoảng 15', 'cm'], ['Cái bàn học dài khoảng 1', 'm'], ['Hộp bút dài khoảng 2', 'dm'], ['Quãng đường Hà Nội – Hải Phòng dài khoảng 100', 'km'], ['Cột cờ ở sân trường cao khoảng 10', 'm'], ['Quyển sách Toán dài khoảng 3', 'dm'], ['Từ nhà em đến trường dài khoảng 2', 'km'], ['Chiếc lá bàng dài khoảng 20', 'cm']]); return mc(`<p>Chọn đơn vị thích hợp:</p><p class="wp">${c[0]} <span class="slot">?</span></p>`, c[1], ['cm', 'dm', 'm', 'km'], `${c[0]} ${c[1]}.`); },
    () => { const u = pick(['m', 'dm', 'km', 'cm']); const [a, b] = Math.random() < .5 ? addNC2() : subNB2(); const op = a > b && Math.random() < .5 ? '-' : '+'; return calcQ(a, b, op, { unit: u }); },
    () => { const L = R(3, 10); return inp('<p>Bút chì dài bao nhiêu xăng-ti-mét?</p>' + vRuler(L), L, `Đầu bút ở vạch 0, ngòi bút ở vạch ${L}: dài ${L} cm.`); },
    () => { const c = pick([['1 m', '100 cm', '='], ['1 dm', '12 cm', '<'], ['1 km', '900 m', '>'], ['5 dm', '50 cm', '='], ['2 m', '19 dm', '>'], ['80 cm', '1 m', '<'], ['3 dm', '35 cm', '<']]); return { q: `<p>Chọn dấu thích hợp (&gt;, &lt;, =):</p><p class="eq">${c[0]} <span class="slot">?</span> ${c[1]}</p>`, a: c[2], choices: ['>', '<', '='], ex: 'Đổi về cùng đơn vị rồi so sánh.' }; }
  ])(); } },

{ id: 'b56', so: 56, title: 'Giới thiệu tiền Việt Nam', game: 'fish',
  memo: 'Tờ 100 đồng, 200 đồng, 500 đồng, 1000 đồng. Đơn vị tiền Việt Nam là đồng.',
  learn: [
    { t: 'Các tờ tiền', h: `<div class="notes">${vNote(100)}${vNote(200)}${vNote(500)}${vNote(1000)}</div><p>Đơn vị của tiền Việt Nam là <b>đồng</b>. Em làm quen với các tờ tiền <b>100 đồng, 200 đồng, 500 đồng, 1000 đồng</b>.</p>` },
    { t: 'Đổi tiền', h: `<div class="notes">${vNote(1000)}<span class="eq">=</span>${vNote(500)}${vNote(500)}</div><div class="notes">${vNote(200)}<span class="eq">=</span>${vNote(100)}${vNote(100)}</div><div class="memo">1 tờ 1000 đồng đổi được 2 tờ 500 đồng, hoặc 5 tờ 200 đồng, hoặc 10 tờ 100 đồng.</div>` }
  ],
  gen() { return pick([
    () => { let arr; do { arr = Array.from({ length: R(2, 3) }, () => pick([100, 200, 500])); } while (arr.reduce((a, b) => a + b) > 1000); const s = arr.reduce((a, b) => a + b); return inp(`<p>Có tất cả bao nhiêu đồng?</p><div class="notes">${arr.map(vNote).join('')}</div>`, s, `${arr.join(' + ')} = ${s} (đồng)`); },
    () => { const p = R(1, 9) * 100; return inp(`<p class="wp">Mai mua một chiếc bút chì giá ${p} đồng. Mai đưa cô bán hàng tờ 1000 đồng. Hỏi cô bán hàng phải trả lại Mai bao nhiêu tiền?</p>${vNote(1000)}`, 1000 - p, giai('Số tiền trả lại', `1000 − ${p}`, 1000 - p, 'đồng')); },
    () => { const c = pick([[1000, 500, 2], [1000, 200, 5], [1000, 100, 10], [500, 100, 5], [200, 100, 2]]); return inp(`<p>1 tờ ${c[0]} đồng đổi được mấy tờ ${c[1]} đồng?</p><div class="notes">${vNote(c[0])}</div>`, c[2], `${c[1]} × ${c[2]} = ${c[0]}.`); },
    () => { const arr = shuffle([100, 200, 500, 1000]); return mc('<p>Tờ tiền nào có giá trị <b>lớn nhất</b>?</p>', '1000 đồng', arr.map(v => v + ' đồng'), 'Tờ 1000 đồng có giá trị lớn nhất.'); }
  ])(); } },

{ id: 'b58', so: 58, title: 'Luyện tập chung', game: 'balloon', mix: ['b55', 'b56'] }
]},

{ id: 'c12', no: 12, name: 'Phép cộng, phép trừ trong phạm vi 1000', hue: 5, lessons: [
{ id: 'b59', so: 59, title: 'Phép cộng (không nhớ) trong phạm vi 1000', game: 'balloon',
  memo: 'Đặt tính thẳng cột trăm – chục – đơn vị, cộng từ phải sang trái.',
  learn: [
    { t: 'Đặt tính 352 + 416', h: `<div class="pair2">${vCol(352, 416, '+', '768')}<div><p>• 2 cộng 6 bằng 8, viết 8.</p><p>• 5 cộng 1 bằng 6, viết 6.</p><p>• 3 cộng 4 bằng 7, viết 7.</p><p>Vậy <b>352 + 416 = 768</b>.</p></div></div>` },
    { t: 'Cộng nhẩm số tròn trăm', h: `<p class="eq">300 + 400 = 700</p><p>3 trăm + 4 trăm = 7 trăm.</p><p class="eq">250 + 30 = 280</p>` }
  ],
  gen() { return pick([
    () => { const [a, b] = add1000(false); return calcQ(a, b, '+', { col: true }); },
    () => { const [a, b] = add1000(false); return calcQ(a, b, '+'); },
    () => { const a = R(1, 8), b = R(1, 9 - a); return calcQ(a * 100, b * 100, '+'); }
  ])(); } },

{ id: 'b60', so: 60, title: 'Phép cộng (có nhớ) trong phạm vi 1000', game: 'memory',
  memo: 'Cộng hàng nào được từ 10 trở lên thì nhớ 1 sang hàng bên trái.',
  learn: [
    { t: 'Nhớ từ hàng đơn vị', h: `<div class="pair2">${vCol(326, 217, '+', '543')}<div><p>• 6 cộng 7 bằng 13, viết 3, <b class="red">nhớ 1</b>.</p><p>• 2 cộng 1 bằng 3, thêm 1 bằng 4, viết 4.</p><p>• 3 cộng 2 bằng 5, viết 5.</p></div></div>` },
    { t: 'Nhớ từ hàng chục', h: `<div class="pair2">${vCol(253, 182, '+', '435')}<div><p>• 3 cộng 2 bằng 5, viết 5.</p><p>• 5 cộng 8 bằng 13, viết 3, <b class="red">nhớ 1</b>.</p><p>• 2 cộng 1 bằng 3, thêm 1 bằng 4, viết 4.</p></div></div>` }
  ],
  gen() { return pick([
    () => { const [a, b] = add1000(true); return calcQ(a, b, '+', { col: true }); },
    () => { const [a, b] = add1000(true); return calcQ(a, b, '+'); },
    () => { const [a, b] = add1000(true); return inp(`<p class="wp">Trường em có ${a} học sinh nam và ${b} học sinh nữ. Hỏi trường em có tất cả bao nhiêu học sinh?</p>`, a + b, giai('Trường em có tất cả', `${a} + ${b}`, a + b, 'học sinh')); }
  ])(); } },

{ id: 'b61', so: 61, title: 'Phép trừ (không nhớ) trong phạm vi 1000', game: 'fish',
  memo: 'Trừ từ phải sang trái: đơn vị, chục, trăm.',
  learn: [
    { t: 'Đặt tính 687 − 254', h: `<div class="pair2">${vCol(687, 254, '−', '433')}<div><p>• 7 trừ 4 bằng 3, viết 3.</p><p>• 8 trừ 5 bằng 3, viết 3.</p><p>• 6 trừ 2 bằng 4, viết 4.</p><p>Vậy <b>687 − 254 = 433</b>.</p></div></div>` },
    { t: 'Trừ nhẩm', h: `<p class="eq">800 − 300 = 500</p><p class="eq">470 − 40 = 430</p>` }
  ],
  gen() { return pick([
    () => { const [a, b] = sub1000(false); return calcQ(a, b, '-', { col: true }); },
    () => { const [a, b] = sub1000(false); return calcQ(a, b, '-'); },
    () => { const a = R(3, 9), b = R(1, a - 1); return calcQ(a * 100, b * 100, '-'); }
  ])(); } },

{ id: 'b62', so: 62, title: 'Phép trừ (có nhớ) trong phạm vi 1000', game: 'race',
  memo: 'Hàng nào không trừ được thì mượn 1 ở hàng bên trái (cộng 10), rồi nhớ 1 vào số trừ ở hàng tiếp theo.',
  learn: [
    { t: 'Nhớ ở hàng đơn vị', h: `<div class="pair2">${vCol(452, 128, '−', '324')}<div><p>• 2 không trừ được 8, lấy 12 trừ 8 bằng 4, viết 4, <b class="red">nhớ 1</b>.</p><p>• 2 thêm 1 bằng 3; 5 trừ 3 bằng 2, viết 2.</p><p>• 4 trừ 1 bằng 3, viết 3.</p></div></div>` },
    { t: 'Nhớ ở hàng chục', h: `<div class="pair2">${vCol(536, 172, '−', '364')}<div><p>• 6 trừ 2 bằng 4, viết 4.</p><p>• 3 không trừ được 7, lấy 13 trừ 7 bằng 6, viết 6, <b class="red">nhớ 1</b>.</p><p>• 1 thêm 1 bằng 2; 5 trừ 2 bằng 3, viết 3.</p></div></div>` }
  ],
  gen() { return pick([
    () => { const [a, b] = sub1000(true); return calcQ(a, b, '-', { col: true }); },
    () => { const [a, b] = sub1000(true); return calcQ(a, b, '-'); },
    () => { const [a, b] = sub1000(true); return inp(`<p class="wp">Một cuộn dây dài ${a} m, người ta cắt đi ${b} m. Hỏi cuộn dây còn lại bao nhiêu mét?</p>`, a - b, giai('Cuộn dây còn lại', `${a} − ${b}`, a - b, 'm')); }
  ])(); } },

{ id: 'b63', so: 63, title: 'Luyện tập chung', game: 'balloon', mix: ['b59', 'b60', 'b61', 'b62'] }
]},

{ id: 'c13', no: 13, name: 'Làm quen với yếu tố thống kê, xác suất', hue: 6, lessons: [
{ id: 'b64', so: 64, title: 'Thu thập, phân loại, kiểm đếm số liệu', game: 'balloon',
  memo: 'Phân loại đồ vật theo nhóm rồi đếm số lượng từng nhóm.',
  learn: [
    { t: 'Phân loại', h: `<div class="big-e mix">🍎 🍌 🍎 🍇 🍌 🍎 🍇 🍎</div><p>Xếp các quả cùng loại vào một nhóm rồi đếm:</p><div class="scrollx"><table class="tbl"><tr><th>Loại quả</th><th>Kiểm đếm</th><th>Số lượng</th></tr><tr><td>🍎 Táo</td><td>||||</td><td>4</td></tr><tr><td>🍌 Chuối</td><td>||</td><td>2</td></tr><tr><td>🍇 Nho</td><td>||</td><td>2</td></tr></table></div>` },
    { t: 'Kiểm đếm', h: `<p>Mỗi lần đếm được một đồ vật, ta vạch một gạch <b>|</b>. Đếm số gạch để biết số lượng.</p><div class="memo">Thu thập → Phân loại → Kiểm đếm → Ghi kết quả.</div>` }
  ],
  gen() { const types = shuffle([['🍎', 'quả táo'], ['🍌', 'quả chuối'], ['🍇', 'chùm nho'], ['🍊', 'quả cam'], ['🍓', 'quả dâu']]).slice(0, 3); const cnt = shuffle([3, 4, 5, 6, 7, 8]).slice(0, 3); const items = shuffle(types.flatMap((t, i) => Array(cnt[i]).fill(t[0]))); const box = `<div class="big-e mix">${items.join(' ')}</div>`; return pick([
    () => { const i = R(0, 2); return inp(`<p>Đếm xem có bao nhiêu <b>${types[i][1]}</b> ${types[i][0]}?</p>${box}`, cnt[i], `Có ${cnt[i]} ${types[i][1]}.`); },
    () => { const mi = cnt.indexOf(Math.max(...cnt)); return mc(`<p>Loại quả nào có <b>nhiều nhất</b>?</p>${box}`, types[mi][0], types.map(t => t[0]), `Có ${cnt[mi]} ${types[mi][1]}, nhiều nhất.`); },
    () => { const s = cnt.reduce((a, b) => a + b); return inp(`<p>Có tất cả bao nhiêu quả?</p>${box}`, s, `${cnt.join(' + ')} = ${s}.`); }
  ])(); } },

{ id: 'b65', so: 65, title: 'Biểu đồ tranh', game: 'fish',
  memo: 'Đọc biểu đồ tranh: đếm số hình ở mỗi hàng.',
  learn: [
    { t: 'Biểu đồ tranh', h: `${vGraph([{ e: '🍉', label: 'Dưa hấu', n: 5 }, { e: '🥭', label: 'Xoài', n: 3 }, { e: '🍊', label: 'Cam', n: 6 }], 'Loại quả các bạn tổ 1 yêu thích')}<p>Có 5 bạn thích dưa hấu, 3 bạn thích xoài, 6 bạn thích cam. Quả cam được yêu thích <b>nhiều nhất</b>.</p>` },
    { t: 'Cách đọc', h: `<div class="memo">1. Đọc tên biểu đồ.<br>2. Xem mỗi hình biểu thị mấy.<br>3. Đếm số hình ở từng hàng rồi so sánh.</div>` }
  ],
  gen() { const fr = shuffle([['🍉', 'Dưa hấu'], ['🥭', 'Xoài'], ['🍊', 'Cam'], ['🍌', 'Chuối'], ['🍇', 'Nho']]).slice(0, 4); const ns = shuffle([2, 3, 4, 5, 6, 7, 8]).slice(0, 4); const rows = fr.map((f, i) => ({ e: f[0], label: f[1], n: ns[i] })); const g = vGraph(rows, 'Loại quả các bạn lớp 2A yêu thích'); return pick([
    () => { const i = R(0, 3); return inp(`<p>Có bao nhiêu bạn thích <b>${fr[i][1].toLowerCase()}</b>?</p>${g}`, ns[i], `Hàng ${fr[i][1]} có ${ns[i]} hình.`); },
    () => { const big = Math.random() < .5; const v = big ? Math.max(...ns) : Math.min(...ns); const i = ns.indexOf(v); return mc(`<p>Loại quả nào được yêu thích <b>${big ? 'nhiều nhất' : 'ít nhất'}</b>?</p>${g}`, fr[i][1], fr.map(f => f[1]), `${fr[i][1]}: ${v} bạn.`); },
    () => { const [i, j] = ns[0] > ns[1] ? [0, 1] : [1, 0]; return inp(`<p>Số bạn thích ${fr[i][1].toLowerCase()} nhiều hơn số bạn thích ${fr[j][1].toLowerCase()} là bao nhiêu?</p>${g}`, ns[i] - ns[j], `${ns[i]} − ${ns[j]} = ${ns[i] - ns[j]}.`); }
  ])(); } },

{ id: 'b66', so: 66, title: 'Chắc chắn, có thể, không thể', game: 'race',
  memo: 'Chắc chắn: luôn xảy ra. Có thể: lúc xảy ra, lúc không. Không thể: không bao giờ xảy ra.',
  learn: [
    { t: 'Hộp bóng', h: `<div class="row-c">${vBox(Array(5).fill('🔴'))}${vBox(['🔴', '🔴', '🔵', '🔵', '🔴'])}</div><p>Hộp 1 chỉ có bóng đỏ: lấy 1 quả, <b>chắc chắn</b> được bóng đỏ, <b>không thể</b> được bóng xanh.</p><p>Hộp 2 có bóng đỏ và xanh: lấy 1 quả, <b>có thể</b> được bóng đỏ.</p>` },
    { t: 'Ghi nhớ', h: `<div class="memo"><b>Chắc chắn</b>: việc đó luôn xảy ra.<br><b>Có thể</b>: việc đó có lúc xảy ra, có lúc không.<br><b>Không thể</b>: việc đó không bao giờ xảy ra.</div><p>Ví dụ: Con mèo biết bay → <b>không thể</b>.</p>` }
  ],
  gen() { const C = ['chắc chắn', 'có thể', 'không thể']; return pick([
    () => { const allR = Math.random() < .5; const balls = allR ? Array(5).fill('🔴') : shuffle(['🔴', '🔴', '🔵', '🔵', '🔴']); const askBlue = Math.random() < .5; const ans = allR ? (askBlue ? 'không thể' : 'chắc chắn') : 'có thể'; return mc(`<p>Lấy 1 quả bóng từ hộp. Quả bóng lấy ra <span class="slot">?</span> là bóng <b>${askBlue ? 'xanh 🔵' : 'đỏ 🔴'}</b>.</p>${vBox(balls)}`, ans, C, allR ? 'Hộp chỉ có bóng đỏ.' : 'Hộp có cả bóng đỏ và bóng xanh.'); },
    () => { const e = pick([['Ngày mai mặt trời mọc ở đằng đông.', 'chắc chắn'], ['Con mèo biết bay.', 'không thể'], ['Ngày mai trời mưa.', 'có thể'], ['Gieo xúc xắc được mặt 7 chấm.', 'không thể'], ['Gieo xúc xắc được mặt 3 chấm.', 'có thể'], ['Sau Thứ Hai là Thứ Ba.', 'chắc chắn'], ['Cá sống được trên cây.', 'không thể'], ['Tung đồng xu được mặt sấp.', 'có thể']]); return mc(`<p>Việc sau đây là <b>chắc chắn</b>, <b>có thể</b> hay <b>không thể</b> xảy ra?</p><p class="wp">${e[0]}</p>`, e[1], C, `Việc này ${e[1]} xảy ra.`); }
  ])(); } },

{ id: 'b67', so: 67, title: 'Luyện tập chung', game: 'balloon', mix: ['b64', 'b65', 'b66'] }
]},

{ id: 'c14', no: 14, name: 'Ôn tập cuối năm', hue: 7, lessons: [
{ id: 'on2', so: '68–75', title: 'Ôn tập cuối năm', game: 'race', mixTopics: ['c8', 'c9', 'c10', 'c11', 'c12', 'c13'] }
]}
]}
];

/* Gắn bài luyện tập chung / ôn tập */
BOOK.forEach(t => t.topics.forEach(tp => tp.lessons.forEach(l => { BYID_RAW[l.id] = l; l.topicRef = tp; })));
BOOK.forEach(t => t.topics.forEach(tp => tp.lessons.forEach(l => {
  let ids = null;
  if (l.mix) ids = l.mix;
  if (l.mixTopics) ids = BOOK.flatMap(b => b.topics).filter(x => l.mixTopics.includes(x.id)).flatMap(x => x.lessons).filter(x => !x.mix && !x.mixTopics).map(x => x.id);
  if (!ids) return;
  l.mixIds = ids;
  const extra = l.extra;
  l.gen = () => (extra && Math.random() < .25) ? extra() : BYID_RAW[pick(ids)].gen();
  l.memo = 'Ôn lại các bài đã học.';
  l.learn = [{ t: 'Nhớ lại kiến thức', h: `<p>Trong phần này con sẽ ôn lại:</p>${memoList(l.mixIds.slice(0, 8))}${l.mixIds.length > 8 ? `<p class="tip">… và ${l.mixIds.length - 8} bài khác.</p>` : ''}` }];
})));
