const START = new Date('2026-09-21T12:00:00');
const TOTAL_DAYS = 28;

const exercises = {
  'Ankle circles': {steps:['Sit or stand supported.','Lift one foot slightly and draw slow circles with the ankle.','Do 10 circles each direction, then switch feet.'], feel:'Gentle ankle movement. No pinching or Achilles pain.', cue:'Move from the ankle, not the whole leg.'},
  'Heel-to-toe rocks': {steps:['Stand tall holding a counter or wall.','Rock gently forward toward the balls of your feet, then back toward your heels.','Keep the motion small and controlled for 10 reps.'], feel:'Easy ankle mobility, not a deep stretch.', cue:'No bouncing and no forcing the heel downward.'},
  'Shoulder rolls': {steps:['Stand or sit tall.','Roll both shoulders up, back, and down 10 times.','Reverse direction for 10 reps.'], feel:'Looser shoulders and upper back.', cue:'Keep your neck relaxed.'},
  'Standing hip flexor stretch': {steps:['Stand in a short split stance and hold a wall or chair if helpful.','Keep your torso upright and slightly bend the front knee.','Tuck your pelvis under — think “belt buckle up.”','Gently shift forward until you feel a stretch at the front of the hip on the back-leg side.','Hold 20–30 seconds and switch sides.'], feel:'Front of the hip/thigh on the back-leg side.', cue:'Do not arch your lower back. Let the back heel lift slightly if keeping it down tugs on the Achilles.'},
  'Figure-4 / seated glute stretch': {steps:['Sit near the front of a sturdy chair.','Cross one ankle over the opposite thigh.','Keep your back long and hinge forward slightly.','Hold 20–30 seconds, then switch.'], feel:'Outer hip and glute.', cue:'Do not push hard on the knee.'},
  'Hamstring stretch': {steps:['Place one heel slightly in front of you with a soft knee.','Hinge forward from the hips while keeping your back long.','Hold 20–30 seconds and switch.'], feel:'Back of the thigh.', cue:'No bouncing; stop before you feel pulling in the Achilles.'},
  'Chest opener': {steps:['Stand in a doorway with your forearms lightly supported, or clasp your hands behind you.','Gently open the chest without forcing your shoulders back.','Hold 20–30 seconds.'], feel:'Chest and front of shoulders.', cue:'Keep ribs stacked; do not overarch your back.'},
  'Upper-back rotation': {steps:['Sit or stand tall with arms crossed over your chest.','Rotate your rib cage gently to one side, return to center, then the other.','Do 5–8 per side.'], feel:'Gentle movement through the mid-back.', cue:'Keep hips mostly facing forward.'},
  'Leg press': {steps:['Set the seat so your knees start comfortably bent, not jammed toward your chest.','Place feet about hip-width on the platform.','Press the platform away without locking your knees.','Return slowly and under control.'], feel:'Thighs and glutes doing the work.', cue:'Start light. Keep knees tracking in the same direction as your toes.'},
  'Chest press machine': {steps:['Adjust the seat so handles are around mid-chest.','Keep shoulder blades gently against the pad.','Press forward smoothly, then return with control.'], feel:'Chest, shoulders, and triceps.', cue:'Do not shrug or lock the elbows.'},
  'Seated row machine': {steps:['Sit tall with chest supported if the machine provides a pad.','Pull the handles toward your ribs while drawing shoulder blades gently back.','Return slowly until arms are long.'], feel:'Upper back and the backs of the shoulders.', cue:'Do not yank or lean backward.'},
  'Hip abduction machine': {steps:['Sit tall with pads positioned comfortably outside the knees.','Press knees outward slowly.','Pause briefly, then return with control.'], feel:'Outer hips and glutes.', cue:'Use a range you can control without rocking.'},
  'Calf raises': {steps:['Stand with both feet parallel and hold support.','Rise onto the balls of both feet over about 2 seconds.','Lower over about 3 seconds.','Use only a comfortable range.'], feel:'Calf muscles working; Achilles should stay quiet.', cue:'Both feet together for now. No bouncing, no heel-drop off a step.'},
  'Bird dog': {steps:['Start on hands and knees with a neutral spine.','Reach one arm forward and the opposite leg back.','Pause, return, and switch sides.'], feel:'Core, glutes, and back stabilizers.', cue:'Keep hips level; make the movement smaller if you wobble.'},
  'Chair sit-to-stands': {steps:['Sit near the front of a sturdy chair with feet under your knees.','Lean slightly forward and stand up.','Sit back down slowly with control.'], feel:'Thighs and glutes.', cue:'Use your hands only as much as needed.'},
  'Wall / countertop push-ups': {steps:['Place hands on a wall or counter slightly wider than shoulder width.','Walk feet back until your body forms a straight line.','Bend elbows and bring chest toward the surface.','Press back to start.'], feel:'Chest, shoulders, and triceps.', cue:'Higher surface = easier. Keep your body in one line.'},
  'Bent-over row': {steps:['Hold light weights, bottles, or a band.','Hinge at the hips with a long spine.','Pull elbows back toward your ribs.','Lower slowly.'], feel:'Upper back and arms.', cue:'Keep shoulders away from ears.'},
  'Glute bridges': {steps:['Lie on your back with knees bent and feet flat.','Brace gently through your midsection.','Press through the feet and lift hips until your body forms a gentle line from shoulders to knees.','Lower slowly.'], feel:'Glutes and back of thighs.', cue:'Do not push so high that your lower back arches.'},
  'Seated leg curl': {steps:['Adjust the machine so the knee joint lines up with the machine pivot.','Curl the lower legs back smoothly.','Return slowly without letting the stack slam.'], feel:'Hamstrings at the back of the thighs.', cue:'Start light and keep hips against the pad.'},
  'Lat pulldown': {steps:['Sit tall and secure your thighs under the pad.','Grip the bar a little wider than shoulder width.','Pull the bar toward your upper chest while keeping elbows moving down.','Return slowly overhead.'], feel:'Upper back and arms.', cue:'Do not pull behind your neck.'},
  'Shoulder press machine': {steps:['Adjust the seat so handles start near shoulder level.','Press upward smoothly without locking elbows.','Lower with control.'], feel:'Shoulders and triceps.', cue:'Keep ribs down and avoid arching your back.'},
  'Hip abduction/adduction machine': {steps:['Set the machine for a comfortable starting range.','For abduction, press knees outward; for adduction, bring them inward.','Move slowly both directions.'], feel:'Outer hips for abduction; inner thighs for adduction.', cue:'Do not force the range.'},
  'Leg extension': {steps:['Adjust the pad so it rests above the ankles.','Straighten the knees through a comfortable range.','Lower slowly.'], feel:'Front of the thighs.', cue:'Use very light weight at first; skip if it bothers the knees.'},
  'Supported mini-squats': {steps:['Hold a counter, rail, or sturdy chair.','Sit your hips back a few inches and bend the knees slightly.','Stand back up.'], feel:'Thighs and glutes.', cue:'Keep it shallow and controlled.'},
  'Low step-ups': {steps:['Use a low step and hold a rail if available.','Place one whole foot on the step.','Press through that foot to step up, then step down slowly.','Repeat before switching sides.'], feel:'Thighs and glutes.', cue:'Keep the step low; stop if the Achilles becomes sore.'},
  'Shoulder press': {steps:['Hold light weights at shoulder level.','Press them overhead without locking the elbows.','Lower slowly.'], feel:'Shoulders and arms.', cue:'Keep ribs stacked and avoid leaning back.'},
  'Hip hinge / Romanian deadlift': {steps:['Stand with feet hip-width and weights close to the thighs.','Soften the knees, push hips backward, and slide the weights down the legs.','Stop when you feel hamstrings working, then squeeze glutes to stand.'], feel:'Glutes and hamstrings.', cue:'Think “hips back,” not “squat down.” Keep the spine long.'},
  'Standing side leg raises': {steps:['Hold a wall or chair.','Keep one leg straight and lift it a small distance out to the side.','Lower slowly and repeat.'], feel:'Outer hip of the moving leg.', cue:'Keep toes facing forward and torso upright.'},
  'Dead bug / seated knee lifts': {steps:['Dead bug: lie on your back with knees bent over hips and arms up; lower opposite arm and leg, then return.','Seated option: sit tall and lift one knee at a time without leaning back.'], feel:'Abdominals working without straining the neck.', cue:'Choose the version that lets you keep your back comfortable.'},
  'Ab machine': {steps:['Adjust the machine for a comfortable start.','Brace your abdomen and curl through the torso using the machine’s intended path.','Return slowly.'], feel:'Abdominals.', cue:'Use light resistance and avoid pulling with your arms.'},
  'Recumbent bike': {steps:['Adjust the seat so the knee stays slightly bent at the farthest pedal position.','Start with very light resistance for 3–5 minutes.','Pedal smoothly at a conversational effort.'], feel:'Legs working with very little impact.', cue:'A good fallback if the Achilles is irritated.'},
  'Treadmill / track walking': {steps:['Start easy for the first 3–5 minutes.','Walk tall with a natural stride and relaxed arms.','Keep most sessions around 4–6/10 effort.'], feel:'Breathing harder but still able to speak in sentences.', cue:'No incline needed early on; do not lengthen your stride to go faster.'},
  'Pool walking / easy swimming': {steps:['Use a comfortable pool depth.','Walk forward with normal steps or swim easy laps.','Keep the effort moderate and smooth.'], feel:'Cardio work with very low joint impact.', cue:'Great recovery option when the Achilles needs less load.'},
  'Walking intervals': {steps:['Warm up easy for 5 minutes.','Alternate 1 minute brisk walking with 2 minutes easy walking.','Repeat as prescribed, then cool down easy.'], feel:'Brisk portions should raise breathing without turning into a jog.', cue:'Brisk means faster walking — not running.'}
};

const mob5 = ['Ankle circles','Heel-to-toe rocks','Shoulder rolls','Standing hip flexor stretch','Figure-4 / seated glute stretch'];
const mob8 = [...mob5,'Hamstring stretch','Chest opener'];
const mobLong = [...mob8,'Upper-back rotation'];
const strengthA = {
  ymca:[['Leg press','8–12 reps'],['Chest press machine','8–12 reps'],['Seated row machine','8–12 reps'],['Hip abduction machine','10–12 reps'],['Calf raises','8–10 slow reps'],['Ab machine','8–12 reps']],
  home:[['Chair sit-to-stands','8–12 reps'],['Wall / countertop push-ups','8–12 reps'],['Bent-over row','8–12 reps'],['Glute bridges','10–12 reps'],['Calf raises','8–10 slow reps'],['Bird dog','5–8/side']]
};
const strengthB = {
  ymca:[['Seated leg curl','8–12 reps'],['Lat pulldown','8–12 reps'],['Shoulder press machine','8–12 reps'],['Hip abduction/adduction machine','10–12 each'],['Leg extension','8–10 very light reps'],['Calf raises','8–12 slow reps'],['Ab machine','8–12 reps']],
  home:[['Supported mini-squats','8–12 reps'],['Low step-ups','6–10/side'],['Shoulder press','8–12 reps'],['Hip hinge / Romanian deadlift','8–12 reps'],['Standing side leg raises','10/side'],['Dead bug / seated knee lifts','8–12 reps'],['Calf raises','8–12 slow reps']]
};

const rawPlan = [
['Home or neighborhood','10-minute easy walk','none','5','Keep this deliberately easy. The win is starting.'],
['YMCA','10–12 minutes treadmill or indoor track','A1','5','Use a comfortable walking pace; no incline needed.'],
['Home, outdoors, or YMCA track','12–15 minute easy walk','none','8','Walk at a conversational pace.'],
['YMCA','10 minutes recumbent bike OR easy treadmill','B1','5','Bike is a great Achilles-friendly option.'],
['Anywhere','15-minute easy walk','none','5','Finish feeling like you could have done more.'],
['YMCA optional','15–20 minutes pool walking or easy swimming','none','long','If you skip the Y, do a 15-minute easy walk instead.'],
['Recovery day','Rest OR 10-minute gentle stroll','none','long','Today is about recovery, not earning calories.'],
['YMCA','15 minutes treadmill or track','A2','5','Start Week 2 with an easy first 5 minutes.'],
['Anywhere','18–20 minute comfortable walk','none','5','Slightly brisker is fine if the Achilles feels normal.'],
['YMCA','10 minutes recumbent bike','B2','5','Keep strength weights conservative and smooth.'],
['Treadmill, track, or outdoors','20-minute steady walk','none','8','Aim for effort 4–5/10.'],
['YMCA','10 minutes easy cardio after strength','A2','5','If tired, do cardio before strength instead.'],
['Anywhere / YMCA','20–25 minute relaxed walk OR pool session','none','long','Choose the option that sounds enjoyable.'],
['Recovery day','Rest','none','long','Optional gentle beginner yoga if it feels good.'],
['YMCA','15 minutes treadmill','B2','5','Week 3: still controlled, now a little more substantial.'],
['Anywhere','25-minute steady walk','none','5','Effort 4–6/10; you should still be able to talk.'],
['YMCA','10–15 minutes recumbent bike','A2','5','Low-impact cardio plus strength.'],
['Track or treadmill','Intervals: 5 min easy, then 1 min brisk / 2 min easy × 5, then cool down','none','8','Brisk means faster walking, not jogging.'],
['YMCA','10 minutes easy cardio after strength','B2','5','Keep the Achilles quiet: smooth strides, no bouncing.'],
['Your choice','25–30 minutes pool walking, track, or outdoor walk','none','long','This is your longest steady session so far.'],
['Recovery day','Rest OR 10-minute recovery walk','none','long','Optional gentle yoga.'],
['YMCA','15 minutes easy cardio','A3','5','First 3-set day. Reduce weight if form deteriorates.'],
['Track, treadmill, or outdoors','30-minute steady walk','none','8','Effort about 5/10.'],
['YMCA','15 minutes bike or treadmill','B3','5','Three good sets matter more than heavy weight.'],
['Track or treadmill','Intervals: 5 min easy, 1 min brisk / 2 min easy × 5, then 5 min easy','none','8','If Week 3 intervals irritated the Achilles, do steady walking instead.'],
['YMCA','15–20 minutes easy cardio','A2','5','Slightly lighter strength day before the weekend.'],
['Anywhere / YMCA','30–35 minute comfortable walk OR pool session','none','long','No need to push pace. Build duration.'],
['Recovery + review','Rest OR gentle 15-minute stroll','none','long','Celebrate four weeks of consistency and note what you want to carry into Month 2.']
];

const plan = rawPlan.map((r,i)=>({day:i+1,where:r[0],cardio:r[1],strength:r[2],mob:r[3],focus:r[4]}));
const stateKey='maryFitness28';
let state = JSON.parse(localStorage.getItem(stateKey) || '{}');
if(!state.days) state.days={};
let currentDay = getTodayDay();
let strengthMode='ymca';

function getTodayDay(){
  const now = new Date(); now.setHours(12,0,0,0);
  const diff=Math.floor((now-START)/86400000)+1;
  return Math.min(TOTAL_DAYS,Math.max(1,diff));
}
function dateForDay(day){const d=new Date(START);d.setDate(d.getDate()+day-1);return d;}
function fmtDate(day){return dateForDay(day).toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric',year:'numeric'});}
function dayState(day){if(!state.days[day])state.days[day]={checks:{},notes:'',achilles:{before:'',after:'',next:''}};return state.days[day];}
function save(){localStorage.setItem(stateKey,JSON.stringify(state));renderProgress();renderDayGrid();}
function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
function checked(day,key){return !!dayState(day).checks[key];}
function task(day,key,label,detail='',exercise=''){
  return `<div class="task"><input type="checkbox" data-check="${key}" ${checked(day,key)?'checked':''}><div class="task-main">${exercise?`<button class="exercise-link" data-exercise="${exercise}">${label}</button>`:`<strong>${label}</strong>`}${detail?`<div class="small">${detail}</div>`:''}</div></div>`;
}
function cardioExercise(cardio){
  if(cardio.toLowerCase().includes('interval')) return 'Walking intervals';
  if(cardio.toLowerCase().includes('pool') || cardio.toLowerCase().includes('swimming')) return 'Pool walking / easy swimming';
  if(cardio.toLowerCase().includes('bike')) return 'Recumbent bike';
  if(cardio.toLowerCase().includes('walk') || cardio.toLowerCase().includes('treadmill') || cardio.toLowerCase().includes('track')) return 'Treadmill / track walking';
  return '';
}
function mobilityList(kind){return kind==='5'?mob5:kind==='8'?mob8:mobLong;}
function strengthInfo(code){if(code==='none')return null;return {type:code[0],sets:Number(code[1])};}
function render(){
  const p=plan[currentDay-1], ds=dayState(currentDay), s=strengthInfo(p.strength), mob=mobilityList(p.mob);
  const completed = isDayDone(currentDay);
  let html=`<div class="day-hero"><p class="eyebrow">Day ${p.day} • ${fmtDate(p.day)}</p><h2>${completed?'✓ ':''}${p.where}</h2><p class="focus">${p.focus}</p></div><div class="day-body">
  <div class="summary-grid"><div class="summary-item"><b>Cardio</b>${p.cardio}</div><div class="summary-item"><b>Strength</b>${s?`Strength ${s.type} • ${s.sets} set${s.sets>1?'s':''}`:'None today'}</div><div class="summary-item"><b>Mobility</b>${p.mob==='5'?'5 minutes':p.mob==='8'?'8 minutes':'10–15 minutes'}</div><div class="summary-item"><b>Where</b>${p.where}</div></div>`;
  const cex=cardioExercise(p.cardio);
  html+=`<div class="section"><h3>Cardio</h3>${task(currentDay,'cardio',p.cardio,'Keep most cardio around 4–6/10 effort: breathing harder, but still able to speak in sentences.',cex)}</div>`;
  if(s){
    const set = s.type==='A'?strengthA:strengthB;
    html+=`<div class="section"><h3>Strength ${s.type} • ${s.sets} set${s.sets>1?'s':''}</h3><p class="small">Rest about 45–75 seconds between exercises as needed. The last few reps should feel like work, but form should stay controlled.</p><div class="toggle"><button data-mode="ymca" class="${strengthMode==='ymca'?'active':''}">YMCA machines</button><button data-mode="home" class="${strengthMode==='home'?'active':''}">Home / free weights</button></div><div id="strengthTasks">`;
    set[strengthMode].forEach(([name,reps],idx)=>{html+=task(currentDay,`str-${s.type}-${strengthMode}-${idx}`,name,`${reps} • ${s.sets} set${s.sets>1?'s':''}`,name)});
    html+='</div></div>';
  }
  html+=`<div class="section"><h3>Mobility</h3>`;
  mob.forEach((name,idx)=>{const detail=name.includes('stretch')||name.includes('Chest')?'20–30 sec per side/position':name==='Upper-back rotation'?'5–8/side':'10 controlled reps';html+=task(currentDay,`mob-${slug(name)}`,name,detail,name)});
  html+=`</div><div class="section"><h3>Achilles check</h3><div class="achilles"><label>Before (0–10)<input inputmode="numeric" maxlength="2" data-achilles="before" value="${ds.achilles.before||''}"></label><label>After (0–10)<input inputmode="numeric" maxlength="2" data-achilles="after" value="${ds.achilles.after||''}"></label><label>Next morning (0–10)<input inputmode="numeric" maxlength="2" data-achilles="next" value="${ds.achilles.next||''}"></label></div><p class="tip">If pain is more than mild, changes your gait, or is clearly worse the next morning, reduce the next walking session and use the pool or bike instead. Avoid running, jumping, deep heel-drop stretches, and sudden incline increases this first month.</p></div>`;
  html+=`<div class="section"><h3>Notes</h3><textarea class="notes" id="notes" placeholder="Weights used, how it felt, what you want to remember…">${ds.notes||''}</textarea><button class="save-note" id="saveNotes">Save notes</button></div></div>`;
  document.getElementById('dayCard').innerHTML=html;
  bindDayEvents(); renderProgress(); renderDayGrid();
}
function bindDayEvents(){
  document.querySelectorAll('[data-check]').forEach(el=>el.addEventListener('change',e=>{dayState(currentDay).checks[e.target.dataset.check]=e.target.checked;save();render();}));
  document.querySelectorAll('[data-exercise]').forEach(el=>el.addEventListener('click',()=>openExercise(el.dataset.exercise)));
  document.querySelectorAll('[data-mode]').forEach(el=>el.addEventListener('click',()=>{strengthMode=el.dataset.mode;render();}));
  document.querySelectorAll('[data-achilles]').forEach(el=>el.addEventListener('change',e=>{dayState(currentDay).achilles[e.target.dataset.achilles]=e.target.value;save();}));
  document.getElementById('saveNotes').addEventListener('click',()=>{dayState(currentDay).notes=document.getElementById('notes').value;save();const b=document.getElementById('saveNotes');b.textContent='Saved ✓';setTimeout(()=>b.textContent='Save notes',1200);});
}
function isDayDone(day){const p=plan[day-1],ds=dayState(day),mob=mobilityList(p.mob); if(!ds.checks.cardio) return false; if(!mob.every(n=>ds.checks[`mob-${slug(n)}`])) return false; const s=strengthInfo(p.strength); if(s){const set=s.type==='A'?strengthA:strengthB; const anyMode=['ymca','home'].some(mode=>set[mode].every((x,idx)=>ds.checks[`str-${s.type}-${mode}-${idx}`])); if(!anyMode)return false;} return true;}
function renderProgress(){const done=plan.filter(p=>isDayDone(p.day)).length;document.getElementById('progressCard').innerHTML=`<div class="progress-row"><div><p class="eyebrow">Your progress</p><div class="big-number">${done} of 28 days complete</div></div><div class="big-number">${Math.round(done/28*100)}%</div></div><div class="progress-bar"><div class="progress-fill" style="width:${done/28*100}%"></div></div>`;}
function renderDayGrid(){const g=document.getElementById('dayGrid');g.innerHTML=plan.map(p=>`<button class="day-chip ${p.day===currentDay?'current':''} ${isDayDone(p.day)?'done':''}" data-day="${p.day}">${p.day}</button>`).join('');g.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{currentDay=Number(b.dataset.day);render();window.scrollTo({top:0,behavior:'smooth'});}));}
function openExercise(name){const x=exercises[name];if(!x)return;document.getElementById('dialogTitle').textContent=name;document.getElementById('dialogBody').innerHTML=`<h3>How to do it</h3><ol class="how-list">${x.steps.map(s=>`<li>${s}</li>`).join('')}</ol><div class="cue"><strong>What you should feel:</strong> ${x.feel}<br><br><strong>Form cue:</strong> ${x.cue}</div>`;document.getElementById('exerciseDialog').showModal();}
function renderLibrary(filter=''){const names=Object.keys(exercises).filter(n=>n.toLowerCase().includes(filter.toLowerCase())).sort();document.getElementById('libraryList').innerHTML=names.map(n=>`<button data-lib="${n}">${n}</button>`).join('')||'<p>No exercises found.</p>';document.querySelectorAll('[data-lib]').forEach(b=>b.addEventListener('click',()=>{document.getElementById('libraryDialog').close();openExercise(b.dataset.lib);}));}

document.getElementById('prevDay').addEventListener('click',()=>{currentDay=Math.max(1,currentDay-1);render();});
document.getElementById('nextDay').addEventListener('click',()=>{currentDay=Math.min(28,currentDay+1);render();});
document.getElementById('todayBtn').addEventListener('click',()=>{currentDay=getTodayDay();render();});
document.getElementById('closeDialog').addEventListener('click',()=>document.getElementById('exerciseDialog').close());
document.getElementById('libraryBtn').addEventListener('click',()=>{renderLibrary();document.getElementById('libraryDialog').showModal();});
document.getElementById('closeLibrary').addEventListener('click',()=>document.getElementById('libraryDialog').close());
document.getElementById('librarySearch').addEventListener('input',e=>renderLibrary(e.target.value));
if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
render();

// Non-destructive export of original local workout records.
function legacyBackupJSON(){
  const raw=localStorage.getItem('maryFitness28');
  if(!raw) throw new Error('No saved workout history found in this app.');
  const parsed=JSON.parse(raw);
  if(!parsed || typeof parsed!=='object' || !parsed.days) throw new Error('Saved history does not contain workout days.');
  return JSON.stringify(parsed,null,2);
}
function legacyBackupStatus(message){document.getElementById('legacyBackupStatus').textContent=message;}
document.getElementById('exportLegacyBackup').addEventListener('click',()=>{
  try{
    const json=legacyBackupJSON();
    const blob=new Blob([json],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download='stronger-by-disney-original-progress.json';
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),30000);
    legacyBackupStatus('Download requested. Check your phone’s Downloads/Files and open the file to confirm it contains your workout history. If nothing downloads, use Show Backup Text.');
  }catch(e){legacyBackupStatus(e.message)}
});
document.getElementById('showLegacyBackup').addEventListener('click',()=>{
  try{
    const json=legacyBackupJSON();
    document.getElementById('legacyBackupText').value=json;
    document.getElementById('legacyBackupTextPanel').hidden=false;
    const data=JSON.parse(json);
    legacyBackupStatus('Found '+Object.keys(data.days).length+' saved day record(s). Copy all the text into a private note or file.');
  }catch(e){legacyBackupStatus(e.message)}
});
document.getElementById('copyLegacyBackup').addEventListener('click',async()=>{
  const box=document.getElementById('legacyBackupText');
  try{await navigator.clipboard.writeText(box.value);legacyBackupStatus('Backup copied. Paste it into a private note and save it.');}
  catch(e){box.focus();box.select();legacyBackupStatus('Text selected. Use your phone’s Copy command, then paste into a private note.');}
});
