(function(){
  const qs = new URLSearchParams(location.search);
  const el = (id)=>document.getElementById(id);
  const year = new Date().getFullYear();
  el('year').textContent = year;

  const blessings = [
    '愿你被温柔以待，被幸运拥抱。',
    '平安喜乐常在，所念皆如愿。',
    '岁岁平安，事事顺心，天天好心情。',
    '愿长夜有星，前路有光，心中有爱。',
    '愿你被世界爱着，也被自己温柔以待。',
    '愿风带来好运，雪送来宁静。',
    '愿所求皆所愿，所行化坦途。',

    '愿你今晚睡得安稳，明天醒来满是好消息。',
    '愿你把烦恼交给夜色，把期待交给清晨。',
    '愿你眼里有光，心中有暖，脚下有路。',
    '愿你在平凡日子里，也能收获不平凡的幸福。',
    '愿你有人惦记，有人懂你，有人爱你。',
    '愿你遇见的都是善意，拥有的都是惊喜。',
    '愿你所行皆坦途，所遇皆温柔。',
    '愿你不慌不忙，岁月静好。',
    '愿你往后余生，平安是底色，快乐是常态。',
    '愿你把热爱揉进生活，把温柔留给自己。',
    '愿你把好运装进口袋，把笑容挂在脸上。',

    '平安夜到，送你一颗“平安果”，愿你一生平安顺遂。',
    '愿你在这个冬夜，被温暖围绕，被幸福点亮。',
    '愿你抬头是星光，低头有希望。',
    '愿你今夜不再疲惫，明天继续闪闪发光。',
    '愿你所有的努力，都在不远的将来开花结果。',
    '愿你所念的人，都在身边；想见的人，都能相见。',
    '愿你不被岁月催促，仍能从容且热烈。',
    '愿你心里有火，眼里有光，手里有糖。',
    '愿你生活甜一点，烦恼少一点，快乐多一点。',
    '愿你每一次奔赴，都不负热爱。',

    '愿你与美好不期而遇，与平安不离不弃。',
    '愿你把遗憾留在昨天，把温柔带去明天。',
    '愿你被偏爱，也能自爱。',
    '愿你被理解，也能释怀。',
    '愿你有勇气开始，也有底气坚持。',
    '愿你所有的等待，都值得。',
    '愿你所得皆所期，所失亦无碍。',
    '愿你遇见更好的自己，也遇见更好的生活。',
    '愿你平安健康，快乐常伴。',
    '愿你平安夜有糖，圣诞节有光，未来都有方向。',

    '愿你今夜的心愿，都被悄悄实现。',
    '愿你不必奔跑也能被拥抱，不必讨好也能被喜欢。',
    '愿你把生活过成喜欢的样子。',
    '愿你身边有人可依，远方有梦可追。',
    '愿你一路生花，一路平安。',
    '愿你被这个世界温柔相待，也愿你温柔以待自己。',
    '愿你快乐不止今晚，平安不止今夜。',
    '愿你每一天都能把“平安”握在手心。',
    '愿你在冬天里也能感受到春天的温度。',
    '愿你今晚收下祝福，明天收获幸福。',
  ];

  const to = (qs.get('to')||'朋友').trim();
  const from = (qs.get('from')||'我').trim();
  const msgRaw = (qs.get('msg')||'').trim();
  const msg = msgRaw || blessings[Math.floor(Math.random()*blessings.length)];

  const toLine = el('toLine');
  const messageEl = el('message');
  const fromLine = el('fromLine');
  const wishList = el('wishList');

  toLine.textContent = `亲爱的 ${to}：`;
  const fullMessage = `在这个温暖的平安夜，送你一颗平安果。${msg}`;
  fromLine.textContent = `—— 来自 ${from}`;

  // Form interactions
  const form = el('customForm');
  const customizeBtn = el('customizeBtn');
  const closeFormBtn = el('closeFormBtn');
  const buildLinkBtn = el('buildLinkBtn');
  const toInput = el('toInput');
  const fromInput = el('fromInput');
  const msgInput = el('msgInput');

  toInput.value = to === '朋友' ? '' : to;
  fromInput.value = from === '我' ? '' : from;
  msgInput.value = msgRaw;

  customizeBtn.addEventListener('click', ()=>{
    form.classList.toggle('hidden');
  });
  closeFormBtn.addEventListener('click', ()=>{
    form.classList.add('hidden');
  });

  function buildShareUrl(vals){
    const url = new URL(location.href);
    const p = new URLSearchParams();
    if(vals.to) p.set('to', vals.to);
    if(vals.from) p.set('from', vals.from);
    if(vals.msg) p.set('msg', vals.msg);
    url.search = p.toString();
    return url.toString();
  }

  async function copy(text){
    try{
      await navigator.clipboard.writeText(text);
      return true;
    }catch{
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try{ document.execCommand('copy'); return true; }catch{ return false; }
      finally{ document.body.removeChild(ta); }
    }
  }

  el('copyBtn').addEventListener('click', async ()=>{
    const ok = await copy(location.href);
    toast(ok? '链接已复制，去微信粘贴分享吧~' : '复制失败，请手动复制地址栏链接');
  });

  buildLinkBtn.addEventListener('click', async ()=>{
    const url = buildShareUrl({
      to: toInput.value.trim(),
      from: fromInput.value.trim(),
      msg: msgInput.value.trim(),
    });
    const ok = await copy(url);
    toast(ok? '个性链接已复制，快分享给TA吧~' : '复制失败，请手动复制生成的链接');
  });

  // Entrance interaction: reveal + typing + list
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function sleep(ms){ return new Promise((r)=>setTimeout(r, ms)); }

  function showReveal(key){
    const node = document.querySelector(`[data-reveal="${key}"]`);
    if(node) node.classList.add('is-visible');
  }

  async function typewriter(text, target, speed){
    target.textContent = '';
    if(prefersReduced){
      target.textContent = text;
      return;
    }
    const chars = Array.from(text);
    for(let i=0;i<chars.length;i++){
      target.textContent += chars[i];
      await sleep(speed);
    }
  }

  function pickListItems(count){
    const pool = blessings.filter((x)=>x !== msg);
    const out = [];
    const used = new Set();
    while(out.length < count && used.size < pool.length){
      const candidate = pool[Math.floor(Math.random()*pool.length)];
      if(used.has(candidate)) continue;
      used.add(candidate);
      out.push(candidate);
    }
    return out;
  }

  const orbital = document.querySelector('.orbital');
  const orbit = wishList;
  let orbitRadius = 170;
  let spinBaseDeg = Math.random() * 360;
  const spinSpeedDegPerSec = 26; // feels 3D but readable

  function getOrbitRadius(){
    if(!orbital) return 170;
    const rect = orbital.getBoundingClientRect();
    // Leave room for apple + bubble width.
    const base = Math.min(rect.width, rect.height) / 2;
    const radius = base - 58; // padding/halo
    return Math.max(120, Math.min(220, radius));
  }

  function positionOrbitItems(){
    if(!wishList) return;
    orbitRadius = getOrbitRadius();
    const items = Array.from(wishList.querySelectorAll('li'));
    for(let i=0;i<items.length;i++){
      const li = items[i];
      const a0 = Number(li.dataset.baseAngleDeg || li.dataset.angleDeg || '0');
      li.dataset.baseAngleDeg = String(a0);
      li.style.setProperty('--a', `${a0}deg`);
      li.style.setProperty('--r', `${Math.max(120, orbitRadius)}px`);
    }
  }

  function setTilt(tiltXDeg, tiltYDeg){
    if(!orbital) return;
    orbital.style.setProperty('--tiltX', `${tiltXDeg.toFixed(2)}deg`);
    orbital.style.setProperty('--tiltY', `${tiltYDeg.toFixed(2)}deg`);
  }

  function clamp(v, min, max){
    return Math.max(min, Math.min(max, v));
  }

  function clearTwinkles(){
    if(!orbital) return;
    orbital.querySelectorAll('.twinkle').forEach((n)=>n.remove());
  }

  function spawnTwinkles(){
    if(!orbital || prefersReduced) return;
    clearTwinkles();
    const count = 14;
    for(let i=0;i<count;i++){
      const s = document.createElement('span');
      s.className = 'twinkle';
      const angle = Math.random() * Math.PI * 2;
      // Put them around the ring area; keep within container.
      const r = 38 + Math.random() * 42; // percentage radius
      const x = 50 + Math.cos(angle) * r;
      const y = 50 + Math.sin(angle) * r;
      s.style.left = `${x}%`;
      s.style.top = `${y}%`;
      s.style.animationDelay = `${Math.random() * 2.6}s`;
      s.style.opacity = '0';
      orbital.appendChild(s);
      // Stagger visibility so it feels alive.
      setTimeout(()=>{ s.style.opacity = '1'; }, 80 + i*35);
    }
  }

  async function renderWishList(){
    wishList.innerHTML = '';
    const items = pickListItems(8);
    const offset = Math.random() * 360;
    const step = 360 / items.length;
    for(let i=0;i<items.length;i++){
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = items[i];
      li.appendChild(span);
      li.dataset.baseAngleDeg = String(offset + step * i);
      wishList.appendChild(li);
      if(prefersReduced){
        li.classList.add('show');
        continue;
      }
      // After first paint we set angle/radius.
      positionOrbitItems();
      await sleep(150);
      li.classList.add('show');
    }
    // Final adjustment once all nodes exist.
    positionOrbitItems();
    spawnTwinkles();
  }

  let rafId = 0;
  function animateOrbit(ts){
    if(!orbit || prefersReduced){
      rafId = requestAnimationFrame(animateOrbit);
      return;
    }
    const t = ts / 1000;
    const spin = (spinBaseDeg + t * spinSpeedDegPerSec) % 360;
    orbit.style.setProperty('--spinY', `${spin}deg`);

    const items = Array.from(orbit.querySelectorAll('li'));
    for(const li of items){
      const a0 = Number(li.dataset.baseAngleDeg || '0');
      const at = (a0 + spin) % 360;
      li.style.setProperty('--at', `${at}deg`);

      const rad = (at * Math.PI) / 180;
      const depth = (Math.cos(rad) + 1) / 2;

      // Far side: hide almost completely
      const visible = depth > 0.32;
      li.style.opacity = visible ? '' : '0';

      const opacity = Math.pow(depth, 1.6); // emphasize front
      const blur = (1 - depth) * 2.8;
      const y = Math.sin(rad) * 18;

      li.style.setProperty('--o', clamp(opacity, 0, 1).toFixed(2));
      li.style.setProperty('--blur', `${blur.toFixed(2)}px`);
      li.style.setProperty('--y', `${y.toFixed(1)}px`);
    }

    rafId = requestAnimationFrame(animateOrbit);
  }

  async function runEntrance(){
    // Ensure base elements are revealed in a pleasing order.
    showReveal('title');
    await sleep(prefersReduced ? 0 : 120);
    showReveal('subtitle');
    await sleep(prefersReduced ? 0 : 140);
    showReveal('apple');
    await sleep(prefersReduced ? 0 : 160);
    showReveal('to');
    await sleep(prefersReduced ? 0 : 140);

    messageEl.classList.add('is-visible');
    await typewriter(fullMessage, messageEl, 38);
    await sleep(prefersReduced ? 0 : 140);
    await renderWishList();
    await sleep(prefersReduced ? 0 : 120);
    showReveal('from');
    await sleep(prefersReduced ? 0 : 120);
    showReveal('actions');
  }

  // Kick it off after initial paint.
  requestAnimationFrame(()=>{ runEntrance(); });

  // Recompute orbit on resize.
  window.addEventListener('resize', ()=>{
    positionOrbitItems();
    spawnTwinkles();
  });

  // Start 3D spin loop
  rafId = requestAnimationFrame(animateOrbit);

  // Scheme B: mouse + device orientation tilt
  if(!prefersReduced && orbital){
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    function smoothTilt(){
      currentTiltX += (targetTiltX - currentTiltX) * 0.08;
      currentTiltY += (targetTiltY - currentTiltY) * 0.08;
      setTilt(currentTiltX, currentTiltY);
      requestAnimationFrame(smoothTilt);
    }
    requestAnimationFrame(smoothTilt);

    window.addEventListener('mousemove', (e)=>{
      const rect = orbital.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      const nx = (e.clientX - cx) / (rect.width/2);
      const ny = (e.clientY - cy) / (rect.height/2);
      targetTiltY = clamp(nx * 10, -10, 10);
      targetTiltX = clamp(-ny * 8, -8, 8);
    }, {passive:true});

    // iOS requires user gesture to request permission; we'll try gracefully.
    async function enableDeviceTilt(){
      try{
        const anyDeviceMotion = DeviceMotionEvent;
        if(anyDeviceMotion && typeof anyDeviceMotion.requestPermission === 'function'){
          // Ask once when user first taps anywhere.
          const onFirstTap = async ()=>{
            document.removeEventListener('click', onFirstTap);
            try{ await anyDeviceMotion.requestPermission(); }catch{}
          };
          document.addEventListener('click', onFirstTap, {once:true});
        }
      }catch{}
    }
    enableDeviceTilt();

    window.addEventListener('deviceorientation', (e)=>{
      if(typeof e.beta !== 'number' || typeof e.gamma !== 'number') return;
      // beta: front-back (-180..180), gamma: left-right (-90..90)
      const bx = clamp(e.beta, -20, 20);
      const gy = clamp(e.gamma, -25, 25);
      // Blend device tilt in; keep it subtle.
      targetTiltX = clamp(targetTiltX + (-bx * 0.18), -10, 10);
      targetTiltY = clamp(targetTiltY + (gy * 0.22), -12, 12);
    }, {passive:true});
  }

  function toast(text){
    const t = document.createElement('div');
    t.textContent = text;
    Object.assign(t.style,{
      position:'fixed',left:'50%',top:'18px',transform:'translateX(-50%)',
      background:'rgba(0,0,0,.72)',color:'#fff',padding:'10px 14px',
      borderRadius:'10px',zIndex:10,fontSize:'14px'
    });
    document.body.appendChild(t);
    setTimeout(()=>{t.style.opacity='0'; t.style.transition='opacity .3s';},1500);
    setTimeout(()=>{t.remove();},1900);
  }

  // Audio (WebAudio) — synthesized to avoid external assets/copyright.
  const audioBtn = el('audioBtn');
  let audioCtx = null;
  let masterGain = null;
  let musicGain = null;
  let sfxGain = null;
  let sfxEchoIn = null;
  let musicOn = false;
  let musicTimer = null;
  let unlocked = false;

  function ensureAudio(){
    if(audioCtx) return true;
    try{
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if(!Ctx) return false;
      audioCtx = new Ctx();
      masterGain = audioCtx.createGain();
      musicGain = audioCtx.createGain();
      sfxGain = audioCtx.createGain();
      sfxEchoIn = audioCtx.createGain();
      masterGain.gain.value = 0.55;
      musicGain.gain.value = 0.16;
      sfxGain.gain.value = 0.55;

      // SFX spatial feel: short echo + filtered feedback (subtle, but reduces "toy" dryness)
      const delay = audioCtx.createDelay(1.0);
      delay.delayTime.value = 0.085;
      const fb = audioCtx.createGain();
      fb.gain.value = 0.22;
      const lp = audioCtx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 1600;
      const hp = audioCtx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 120;

      // route: sfxEchoIn -> delay -> filters -> fb -> delay, and mix into master
      sfxEchoIn.connect(delay);
      delay.connect(lp);
      lp.connect(hp);
      hp.connect(fb);
      fb.connect(delay);

      // mix levels
      const echoMix = audioCtx.createGain();
      echoMix.gain.value = 0.22;
      hp.connect(echoMix);
      echoMix.connect(masterGain);

      // dry + echo
      musicGain.connect(masterGain);
      sfxGain.connect(masterGain);
      masterGain.connect(audioCtx.destination);
      return true;
    } catch {
      return false;
    }
  }

  async function unlockAudio(){
    if(unlocked) return;
    if(!ensureAudio()){
      toast('当前浏览器不支持音频播放');
      return;
    }
    try{
      if(audioCtx.state !== 'running') await audioCtx.resume();
      // tiny silent ping to fully unlock on some browsers
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      g.gain.value = 0.0001;
      osc.connect(g).connect(masterGain);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.02);
      unlocked = true;
    } catch {
      // ignore
    }
  }

  function setMusicUI(on){
    if(!audioBtn) return;
    audioBtn.textContent = on ? '音乐：开' : '音乐：关';
    audioBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
  setMusicUI(false);

  function stopMusic(){
    if(musicTimer){
      clearInterval(musicTimer);
      musicTimer = null;
    }
    musicOn = false;
    setMusicUI(false);
  }

  function bellTone(at, freq, dur, vol){
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    const f = audioCtx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = 2200;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, at);

    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), at + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);

    // add a subtle shimmer with detune
    osc.detune.setValueAtTime(rand(-6, 6), at);

    osc.connect(f);
    f.connect(g);
    g.connect(musicGain);
    osc.start(at);
    osc.stop(at + dur + 0.02);
  }

  function noiseBurst(at, dur, vol, hpHz){
    const bufferSize = Math.floor(audioCtx.sampleRate * dur);
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for(let i=0;i<bufferSize;i++){
      const decay = 1 - i / bufferSize;
      data[i] = (Math.random()*2 - 1) * decay;
    }
    const src = audioCtx.createBufferSource();
    src.buffer = buffer;
    const hp = audioCtx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(hpHz, at);
    const g = audioCtx.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), at + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    src.connect(hp).connect(g).connect(sfxGain);
    src.start(at);
    src.stop(at + dur);
  }

  function pop(at, strength){
    // Firecracker-like sharp pop: tiny thump + very short bright noise.
    const s = Math.max(0.05, Math.min(1, strength ?? 0.35));
    // thump
    {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(140, at);
      o.frequency.exponentialRampToValueAtTime(70, at + 0.06);
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(0.35 * s, at + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, at + 0.10);
      o.connect(g).connect(sfxGain);
      o.start(at);
      o.stop(at + 0.11);
    }
    // crack
    noiseBurst(at, 0.032, 0.60 * s, 2800);
    // tiny tick (adds “啪”的脆感)
    {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'square';
      o.frequency.setValueAtTime(rand(1800, 4200), at);
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(0.10 * s, at + 0.002);
      g.gain.exponentialRampToValueAtTime(0.0001, at + 0.02);
      o.connect(g).connect(sfxGain);
      o.start(at);
      o.stop(at + 0.022);
    }

    // send a bit into echo
    if(sfxEchoIn){
      const g = audioCtx.createGain();
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(0.10 * s, at + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, at + 0.18);
      // excite the echo line with a short noise burst
      const bufferSize = Math.floor(audioCtx.sampleRate * 0.08);
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for(let i=0;i<bufferSize;i++){
        const decay = 1 - i / bufferSize;
        data[i] = (Math.random()*2 - 1) * decay;
      }
      const src = audioCtx.createBufferSource();
      src.buffer = buffer;
      src.connect(g).connect(sfxEchoIn);
      src.start(at);
      src.stop(at + 0.09);
    }
  }

  function startMusic(){
    if(prefersReduced){
      toast('已开启“减少动态效果”，默认不自动播放音乐');
      return;
    }
    if(!ensureAudio()){
      toast('当前浏览器不支持音频播放');
      return;
    }
    musicOn = true;
    setMusicUI(true);

    // Christmas-like vibe (original): bright bells + classic major progression + walking bass + clear sleigh-bell groove.
    const bpm = 96;
    const stepMs = (60_000 / bpm) / 2; // eighth
    const baseHz = 261.63; // C4

    // I - V - vi - IV (very common Christmas pop feel, but melody remains original)
    const chordProg = [
      [0, 4, 7],        // C
      [7, 11, 2],       // G
      [9, 0, 4],        // Am
      [5, 9, 0],        // F
    ];
    // a simple original motif (scale degrees), avoids quoting any known melody
    const motif = [0, 2, 4, 7, 9, 7, 4, 2];
    let step = 0;

    function noteHz(semi, octave){
      return baseHz * Math.pow(2, (semi/12) + octave);
    }

    function sleighTick(at, strong){
      noiseBurst(at, 0.028, strong ? 0.18 : 0.11, 5200);
    }

    function bassNote(at, semi){
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      const lp = audioCtx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 220;
      o.type = 'sine';
      o.frequency.setValueAtTime(noteHz(semi, -1), at);
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(0.10, at + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, at + 0.22);
      o.connect(lp).connect(g).connect(musicGain);
      o.start(at);
      o.stop(at + 0.24);
    }

    function chordPad(at, chord){
      // soft pad to thicken harmony
      const dur = 0.95;
      chord.forEach((semi, idx)=>{
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        const lp = audioCtx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 900;
        o.type = 'triangle';
        o.frequency.setValueAtTime(noteHz(semi, idx === 0 ? -1 : 0), at);
        g.gain.setValueAtTime(0.0001, at);
        g.gain.exponentialRampToValueAtTime(0.028, at + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
        o.connect(lp).connect(g).connect(musicGain);
        o.start(at);
        o.stop(at + dur + 0.02);
      });
    }

    function sched(){
      if(!audioCtx || audioCtx.state !== 'running') return;
      const now = audioCtx.currentTime;

      // schedule next 1 bar (8 eighth notes)
      for(let i=0;i<8;i++){
        const s = step + i;
        const t = now + i * (stepMs/1000);
        const bar = Math.floor(s / 8);
        const inBar = s % 8;
        const chord = chordProg[bar % chordProg.length];

        // pad once per bar
        if(inBar === 0) chordPad(t, chord);

        // bass on beats (1 and 3)
        if(inBar === 0) bassNote(t, chord[0]);
        if(inBar === 4) bassNote(t, chord[0] + 12);

        // sleigh bell groove (off-beats)
        if(inBar % 2 === 1) sleighTick(t + 0.006, inBar === 7);

        // bell melody: motif transposed to current chord root area
        const m = motif[inBar];
        const octave = (inBar < 4) ? 1 : 0;
        const freq = noteHz((m + chord[0]) % 12, octave);
        const vol = (inBar === 0 || inBar === 4) ? 0.12 : 0.08;
        const dur = (inBar === 0) ? 0.30 : 0.20;
        bellTone(t, freq, dur, vol);

        // light harmony bell (3rd/5th) on certain steps
        if(inBar === 2 || inBar === 6){
          bellTone(t + 0.012, noteHz(chord[1], 0), 0.16, 0.05);
        }
      }

      step += 8;
    }

    sched();
    musicTimer = setInterval(sched, stepMs * 8);
  }

  function toggleMusic(){
    if(!ensureAudio()){
      toast('当前浏览器不支持音频播放');
      return;
    }
    if(musicOn){
      stopMusic();
      return;
    }
    // must unlock by gesture
    unlockAudio().then(()=>{
      if(audioCtx && audioCtx.state === 'running') startMusic();
      else toast('请再点一次以开启音乐');
    });
  }

  if(audioBtn){
    audioBtn.addEventListener('click', ()=>{ toggleMusic(); });
  }

  function playFireworkSfx(){
    if(prefersReduced) return;
    if(!ensureAudio() || !unlocked) return;
    const t0 = audioCtx.currentTime;

    // Firecracker-like: a few big pops + dense random crackle train.
    pop(t0, 1.0);
    pop(t0 + 0.06, 0.85);
    pop(t0 + 0.11, 0.75);

    // Add an "air" burst tail (gives outdoor feel)
    noiseBurst(t0 + 0.02, 0.16, 0.22, 900);

    // Dense crackle train (爆竹连响)
    const n = 36;
    let tt = t0 + 0.16;
    for(let i=0;i<n;i++){
      tt += rand(0.016, 0.030);
      const strength = 0.18 + Math.random() * 0.55;
      pop(tt, strength);
    }
  }

  function playRocketWhoosh(durSec){
    if(prefersReduced) return;
    if(!ensureAudio() || !unlocked) return;
    const t0 = audioCtx.currentTime;
    const t1 = t0 + Math.max(0.45, Math.min(1.2, durSec || 0.85));

    // Rising "biu~" tone
    {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      const bp = audioCtx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.Q.value = 1.2;
      bp.frequency.setValueAtTime(600, t0);
      bp.frequency.exponentialRampToValueAtTime(1800, t1);

      o.type = 'sawtooth';
      o.frequency.setValueAtTime(240, t0);
      o.frequency.exponentialRampToValueAtTime(1200, t1);

      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.18, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t1);

      o.connect(bp).connect(g).connect(sfxGain);
      o.start(t0);
      o.stop(t1 + 0.02);
    }

    // Noise tail (air whoosh)
    noiseBurst(t0, (t1 - t0) * 0.9, 0.10, 1200);
  }

  // Auto-unlock audio on first user gesture (WeChat/mobile policy)
  const unlockOnce = async ()=>{
    document.removeEventListener('click', unlockOnce);
    document.removeEventListener('touchstart', unlockOnce);
    await unlockAudio();
  };
  document.addEventListener('click', unlockOnce, {once:true});
  document.addEventListener('touchstart', unlockOnce, {once:true, passive:true});

  // Snow effect (Canvas)
  const canvas = document.getElementById('snow');
  const ctx = canvas.getContext('2d');
  let w=0,h=0, flakes=[];
  function resize(){ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; }
  window.addEventListener('resize', resize); resize();

  function makeFlake(){
    return {
      x: Math.random()*w,
      y: -10 - Math.random()*h,
      r: 1 + Math.random()*2.2,
      spdY: 0.6 + Math.random()*1.2,
      spdX: -0.4 + Math.random()*0.8,
      alpha: 0.7 + Math.random()*0.3
    };
  }
  function initFlakes(){
    const count = Math.min(140, Math.floor(w*h/12000));
    flakes = Array.from({length:count}, makeFlake);
  }
  initFlakes();

  function tick(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    for(let f of flakes){
      f.x += f.spdX; f.y += f.spdY; if(f.y>h+5){ Object.assign(f, makeFlake(), {y:-10}); }
      ctx.globalAlpha = f.alpha;
      ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();

  // Fireworks effect (Canvas)
  const fxCanvas = document.getElementById('fx');
  const fxCtx = fxCanvas.getContext('2d');
  let fwW = 0;
  let fwH = 0;
  const particles = [];
  const rockets = [];
  const rings = [];
  let flashA = 0;

  function resizeFx(){
    fwW = fxCanvas.width = window.innerWidth;
    fwH = fxCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeFx);
  resizeFx();

  function rand(min, max){ return min + Math.random()*(max-min); }
  function chance(p){ return Math.random() < p; }

  function easeOutCubic(t){
    const u = 1 - t;
    return 1 - u*u*u;
  }

  function spawnBurst(x, y, opts){
    if(prefersReduced) return;
    const count = opts?.count ?? 70;
    const power = opts?.power ?? 6.5;
    const hueBase = opts?.hueBase ?? rand(330, 45); // around red/gold
    const mode = opts?.mode ?? 'chrys';
    for(let i=0;i<count;i++){
      let a = Math.random() * Math.PI * 2;
      // shape tuning
      if(mode === 'chrys'){
        // fuller sphere
        a += rand(-0.10, 0.10);
      }
      const sp = power * (mode === 'willow' ? rand(0.35, 0.75) : (mode === 'palm' ? rand(0.75, 1.35) : rand(0.55, 1.25)));
      const hue = (hueBase + rand(-18, 18) + (i%7)*2) % 360;
      const streak = chance(mode === 'glitter' ? 0.15 : 0.45);
      const glitter = mode === 'glitter' || chance(0.18);
      const life = mode === 'palm'
        ? rand(1100, 1700)
        : (glitter ? rand(900, 1450) : rand(520, 980));
      const grav = mode === 'willow'
        ? rand(0.030, 0.060)
        : (mode === 'palm' ? rand(0.026, 0.050) : rand(0.020, 0.048));
      const drag = mode === 'willow'
        ? rand(0.988, 0.994)
        : (mode === 'palm' ? rand(0.990, 0.996) : rand(0.983, 0.992));
      particles.push({
        x, y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        r: mode === 'palm' ? rand(1.6, 3.2) : rand(1.2, 2.6),
        life,
        age: 0,
        hue,
        alpha: 1,
        drag,
        grav,
        tw: glitter ? rand(0.06, 0.14) : rand(0.015, 0.05),
        streak: mode === 'palm' ? true : streak,
        glitter,
        kind: mode
      });
    }
  }

  function spawnTrailSpark(x, y, hue){
    particles.push({
      x, y,
      vx: rand(-0.5, 0.5),
      vy: rand(-0.6, 0.2),
      r: rand(0.8, 1.6),
      life: rand(220, 360),
      age: 0,
      hue,
      alpha: 1,
      drag: rand(0.94, 0.97),
      grav: rand(0.010, 0.020),
      tw: rand(0.03, 0.06)
    });
  }

  function spawnRing(x, y, hue){
    rings.push({
      x, y,
      r: 10,
      vr: rand(0.55, 0.75),
      life: 520,
      age: 0,
      hue
    });
  }

  function spawnStarDust(x, y, hue){
    // a thin expanding glitter halo
    spawnBurst(x, y, {count: 34, power: 3.2, hueBase: hue, mode: 'glitter'});
  }

  function spawnPalm(x, y, hueBase){
    if(prefersReduced) return;
    // Palm: a few thick long branches
    const branches = 7 + Math.floor(Math.random() * 3);
    for(let b=0;b<branches;b++){
      const a = (Math.PI * 2) * (b/branches) + rand(-0.18, 0.18);
      const count = 10 + Math.floor(Math.random() * 6);
      for(let i=0;i<count;i++){
        const sp = rand(4.6, 7.8) * (0.92 + i*0.03);
        const hue = (hueBase + rand(-10, 10)) % 360;
        particles.push({
          x, y,
          vx: Math.cos(a + rand(-0.06, 0.06)) * sp,
          vy: Math.sin(a + rand(-0.06, 0.06)) * sp,
          r: rand(1.8, 3.6),
          life: rand(1200, 1900),
          age: 0,
          hue,
          alpha: 1,
          drag: rand(0.991, 0.996),
          grav: rand(0.030, 0.055),
          tw: rand(0.010, 0.030),
          streak: true,
          glitter: false,
          kind: 'palm'
        });
      }
    }
  }

  function spawnMultiColor(x, y){
    if(prefersReduced) return;
    // Multi-layer rainbow burst (inner -> outer)
    const hues = [
      rand(35, 55),     // gold
      rand(330, 355),   // red
      rand(195, 220),   // cyan
      rand(120, 150),   // green
      rand(265, 300),   // purple
    ];
    const powers = [4.3, 5.6, 6.8, 8.0, 9.1];
    const counts = [32, 40, 46, 54, 62];
    for(let i=0;i<hues.length;i++){
      spawnBurst(x, y, {count: counts[i], power: powers[i], hueBase: hues[i], mode: 'chrys'});
    }
    // add glitter edge
    spawnStarDust(x, y, 45);
  }

  function spawnRocket(targetX, targetY, opts){
    if(prefersReduced) return;
    const startX = targetX + rand(-40, 40);
    const startY = fwH + 30;
    const hue = opts?.hue ?? rand(30, 55); // golden tail
    // audio: rising whoosh during launch
    if(unlocked){
      playRocketWhoosh(((opts?.life ?? 820) / 1000) * 0.95);
    }
    rockets.push({
      sx: startX,
      sy: startY,
      ex: targetX,
      ey: targetY,
      x: startX,
      y: startY,
      px: startX,
      py: startY,
      age: 0,
      life: opts?.life ?? rand(700, 900),
      hue
    });
  }

  let lastFx = performance.now();
  function fxLoop(now){
    const dt = Math.min(34, now - lastFx);
    lastFx = now;

    // Fade previous frame without tinting the page (keeps trails)
    fxCtx.globalCompositeOperation = 'destination-out';
    fxCtx.globalAlpha = 0.18;
    fxCtx.fillRect(0, 0, fwW, fwH);
    fxCtx.globalAlpha = 1;
    fxCtx.globalCompositeOperation = 'source-over';

    // Update rockets (rise with trail)
    if(rockets.length){
      for(let i=rockets.length-1;i>=0;i--){
        const r = rockets[i];
        r.age += dt;
        const t = Math.min(1, r.age / r.life);
        const k = easeOutCubic(t);
        r.px = r.x; r.py = r.y;
        r.x = r.sx + (r.ex - r.sx) * k;
        r.y = r.sy + (r.ey - r.sy) * k;

        // draw trail sparks along path segment
        const steps = 3;
        for(let s=0;s<steps;s++){
          const u = s / steps;
          const tx = r.px + (r.x - r.px) * u;
          const ty = r.py + (r.y - r.py) * u;
          spawnTrailSpark(tx, ty, r.hue);
        }

        // rocket head glow + subtle streak
        fxCtx.globalAlpha = 0.9;
        fxCtx.globalCompositeOperation = 'lighter';
        fxCtx.fillStyle = `hsla(${r.hue}, 95%, 70%, 1)`;
        fxCtx.beginPath();
        fxCtx.arc(r.x, r.y, 2.4, 0, Math.PI*2);
        fxCtx.fill();
        fxCtx.globalAlpha = 0.35;
        fxCtx.beginPath();
        fxCtx.arc(r.x, r.y, 10, 0, Math.PI*2);
        fxCtx.fill();

        fxCtx.globalAlpha = 0.35;
        fxCtx.strokeStyle = `hsla(${r.hue}, 95%, 72%, 1)`;
        fxCtx.lineWidth = 2;
        fxCtx.beginPath();
        fxCtx.moveTo(r.x, r.y);
        fxCtx.lineTo(r.px, r.py);
        fxCtx.stroke();

        fxCtx.globalCompositeOperation = 'source-over';
        fxCtx.globalAlpha = 1;

        if(t >= 1){
          rockets.splice(i,1);
          // explode
          const hueBase = rand(345, 35);
          // Multi-color layered core
          spawnMultiColor(r.ex, r.ey);

          // Palm branches (thick long trails)
          spawnPalm(r.ex + rand(-6, 6), r.ey + rand(-6, 6), rand(35, 60));

          // A few willow tails for depth
          spawnBurst(r.ex + rand(-8, 8), r.ey + rand(-8, 8), {count: 46, power: 5.4, hueBase: hueBase, mode: 'willow'});

          // ring + extra glow
          spawnRing(r.ex, r.ey, 45);
          flashA = Math.max(flashA, 0.18);
          playFireworkSfx();
        }
      }
    }

    // Update rings
    if(rings.length){
      fxCtx.globalCompositeOperation = 'lighter';
      for(let i=rings.length-1;i>=0;i--){
        const ring = rings[i];
        ring.age += dt;
        if(ring.age >= ring.life){ rings.splice(i,1); continue; }
        const t = ring.age / ring.life;
        ring.r += ring.vr * dt;
        const alpha = (t < 0.5) ? (t / 0.5) : (1 - (t - 0.5) / 0.5);
        const lw = 2.2 * (1 - t) + 0.6;
        fxCtx.globalAlpha = alpha * 0.55;
        fxCtx.strokeStyle = `hsla(${ring.hue}, 95%, 70%, 1)`;
        fxCtx.lineWidth = lw;
        fxCtx.beginPath();
        fxCtx.arc(ring.x, ring.y, ring.r, 0, Math.PI*2);
        fxCtx.stroke();

        fxCtx.globalAlpha = alpha * 0.22;
        fxCtx.lineWidth = lw * 5.5;
        fxCtx.beginPath();
        fxCtx.arc(ring.x, ring.y, ring.r, 0, Math.PI*2);
        fxCtx.stroke();
      }
      fxCtx.globalCompositeOperation = 'source-over';
      fxCtx.globalAlpha = 1;
    }

    if(particles.length){
      fxCtx.globalCompositeOperation = 'lighter';
      for(let i=particles.length-1;i>=0;i--){
        const p = particles[i];
        p.age += dt;
        if(p.age >= p.life){ particles.splice(i,1); continue; }
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.grav * dt;
        p.x += p.vx * (dt/16.7);
        p.y += p.vy * (dt/16.7);

        const t = p.age / p.life;
        const fade = (t < 0.55) ? 1 : (1 - (t - 0.55) / 0.45);
        const twinkle = p.glitter
          ? (0.55 + 0.45 * Math.sin((now/1000) * (12 + p.hue*0.02) + p.age * p.tw))
          : (0.80 + 0.20 * Math.sin((now/1000) * (8 + p.hue*0.02) + p.age * p.tw));
        const a = Math.max(0, fade) * Math.max(0.05, twinkle);

        // streak / point
        fxCtx.globalAlpha = a;
        fxCtx.strokeStyle = `hsla(${p.hue}, 95%, 68%, 1)`;
        fxCtx.fillStyle = `hsla(${p.hue}, 95%, 68%, 1)`;

        if(p.streak){
          const lx = p.x - p.vx * 2.2;
          const ly = p.y - p.vy * 2.2;
          fxCtx.lineWidth = Math.max(1, p.r * (p.glitter ? 0.9 : 1.1));
          fxCtx.beginPath();
          fxCtx.moveTo(lx, ly);
          fxCtx.lineTo(p.x, p.y);
          fxCtx.stroke();
        } else {
          fxCtx.beginPath();
          fxCtx.arc(p.x, p.y, p.r, 0, Math.PI*2);
          fxCtx.fill();
        }

        // soft glow bloom
        fxCtx.globalAlpha = a * (p.glitter ? 0.28 : 0.22);
        fxCtx.fillStyle = `hsla(${p.hue}, 95%, 72%, 1)`;
        fxCtx.beginPath();
        fxCtx.arc(p.x, p.y, p.r * (p.glitter ? 3.0 : 2.4), 0, Math.PI*2);
        fxCtx.fill();
      }
      fxCtx.globalCompositeOperation = 'source-over';
      fxCtx.globalAlpha = 1;
    }

    // Screen flash (subtle)
    if(flashA > 0.001){
      flashA *= 0.86;
      fxCtx.globalAlpha = Math.min(0.22, flashA);
      fxCtx.fillStyle = 'rgba(255, 233, 170, 1)';
      fxCtx.fillRect(0, 0, fwW, fwH);
      fxCtx.globalAlpha = 1;
    }

    requestAnimationFrame(fxLoop);
  }
  requestAnimationFrame(fxLoop);

  function fireAtApple(){
    const apple = document.querySelector('.apple');
    if(!apple) return;
    const rect = apple.getBoundingClientRect();
    const x = rect.left + rect.width/2;
    const y = rect.top + rect.height*0.42;
    // rocket(s) rise then explode near the apple
    spawnRocket(x, y, {life: rand(720, 900), hue: rand(35, 60)});
    setTimeout(()=>spawnRocket(x + rand(-18, 18), y + rand(-10, 10), {life: rand(760, 980), hue: rand(30, 55)}), 180);
  }

  // Bind apple click / keyboard
  const appleBtn = document.querySelector('.apple');
  if(appleBtn){
    appleBtn.addEventListener('click', ()=>{
      if(prefersReduced){ toast('已开启“减少动态效果”，烟花已禁用'); return; }
      unlockAudio();
      fireAtApple();
    });
    appleBtn.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        if(prefersReduced){ toast('已开启“减少动态效果”，烟花已禁用'); return; }
        unlockAudio();
        fireAtApple();
      }
    });
  }
})();
