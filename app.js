"use strict";
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const blank=()=>({schemaVersion:1,settings:{frequency:3,preferred:[],goal:'For Life',goalDate:''},workouts:{},milestones:[],legacy:null});
let db=null,account=null,progress=blank(),saving=false,dirty=false,revision=0,authMode='signin',authGeneration=0;
const show=(id,yes)=>$(id).hidden=!yes;
const msg=(id,text)=>$(id).textContent=text;
function validProgress(p){return p&&typeof p==='object'&&p.workouts&&typeof p.workouts==='object'&&p.settings?{...blank(),...p,settings:{...blank().settings,...p.settings}}:blank();}
function localKey(){return 'sfl2-account-'+account.id;}
function status(s){msg('syncStatus',s);}
function changed(){if(!account)return;revision++;localStorage.setItem(localKey(),JSON.stringify(progress));dirty=true;status('Saving changes…');queueSave();}
let saveTimer;
function queueSave(){clearTimeout(saveTimer);saveTimer=setTimeout(flush,650);}
async function flush(){if(!db||!account||saving||!dirty)return;
  saving=true;dirty=false;const currentRevision=revision,owner=account.id, snapshot=JSON.parse(JSON.stringify(progress));
  try{const {error}=await db.from('user_progress').upsert({user_id:owner,data:snapshot,updated_at:new Date().toISOString()},{onConflict:'user_id'});if(error)throw error;
    if(account?.id===owner)status(currentRevision===revision?'Saved securely to your account ✓':'Saving newer changes…');
  }catch(e){if(account?.id===owner){dirty=true;status('Not synced — changes saved on this device. '+e.message)}}
  finally{saving=false;if(dirty&&account?.id===owner)queueSave()}
}
async function enterSession(session){const generation=++authGeneration;account=session?.user||null;clearTimeout(saveTimer);dirty=false;revision=0;
  show('auth',!account);show('app',!!account);show('userMenu',!!account);show('setup',false);
  if(!account)return;
  $('userEmail').textContent=account.email||'Account';status('Loading your account…');
  const owner=account.id;
  const {data,error}=await db.from('user_progress').select('data').eq('user_id',owner).maybeSingle();
  if(generation!==authGeneration||account?.id!==owner)return;
  if(error){status('Unable to load account: '+error.message);show('app',false);return;}
  if(data?.data){progress=validProgress(data.data);localStorage.setItem(localKey(),JSON.stringify(progress));status('Account synced ✓');}
  else {progress=blank();status('New account ready. Choose your weekly plan!');changed();}
  $('workoutDate').value=today();showTab('dashboard');renderAll();
}
async function boot(){const c=window.SFL_CONFIG||{};
  if(!c.supabaseUrl||!c.supabaseAnonKey||!window.supabase){show('setup',true);if(c.supabaseUrl&&!window.supabase)$('setup').insertAdjacentHTML('beforeend','<p>Supabase library could not load. Check your connection or content blocker.</p>');return;}
  db=window.supabase.createClient(c.supabaseUrl,c.supabaseAnonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  const {data,error}=await db.auth.getSession();if(error)msg('authMessage',error.message);
  await enterSession(data?.session);
  db.auth.onAuthStateChange((event,session)=>{if(event==='SIGNED_IN'&&session?.user.id!==account?.id)enterSession(session);if(event==='SIGNED_OUT')enterSession(null)});
}
function showTab(tab){document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));document.querySelectorAll('.tab-panel').forEach(el=>show(el.id,el.id===tab));if(tab==='workout')renderWorkout();if(tab==='progress')renderProgress();if(tab==='settings')renderSettings();}
function monday(date){const d=new Date(date+'T12:00:00');d.setDate(d.getDate()-((d.getDay()+6)%7));return todayFromDate(d)}
function todayFromDate(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function thisWeekDates(){const start=new Date(monday(today())+'T12:00:00');return Array.from({length:7},(_,i)=>{const d=new Date(start);d.setDate(start.getDate()+i);return todayFromDate(d)})}
function complete(w){return !!(w?.checks&&w.required?.length&&w.required.every(k=>w.checks[k]));}
function started(w){return !!(w&&((w.required||[]).some(k=>w.checks?.[k])||w.notes?.trim()||Object.values(w.weights||{}).some(v=>v!=='')))}
function isWorkout(w){return w&&w.type!=='mobility'}
function renderDashboard(){const s=progress.settings,dates=thisWeekDates(),count=dates.filter(d=>isWorkout(progress.workouts[d])&&complete(progress.workouts[d])).length,startedCount=dates.filter(d=>isWorkout(progress.workouts[d])&&started(progress.workouts[d])).length,target=Number(s.frequency)||3;
  $('stats').innerHTML=`<div class="stat"><b>${count} / ${target}</b><span>Workouts completed this week</span></div><div class="stat"><b>${Math.round(count/target*100)}%</b><span>Of your chosen weekly goal</span></div><div class="stat"><b>${startedCount}</b><span>Workouts started</span></div>`;
  msg('weekMessage',`${count} completed toward ${target} planned workout${target===1?'':'s'}. ${count>=target?'You met your commitment — nice work!':'Rest days never count as misses.'}`);
  const pref=s.preferred||[];
  $('weekDays').innerHTML=dates.map((d,i)=>{const w=progress.workouts[d],planned=pref.includes((i+1)%7),done=isWorkout(w)&&complete(w),inProgress=isWorkout(w)&&started(w)&&!done;return `<div class="weekday ${done?'done':inProgress?'started':planned?'planned':''}"><strong>${days[(i+1)%7]}</strong><span>${d.slice(8)}</span><small>${done?'✓ Done':inProgress?'Started':planned?'Planned':'Rest / flex'}</small></div>`}).join('');
  const g=s.goal||'For Life';msg('goalHeading',g.toLowerCase()==='for life'?'Stronger for Life':'Stronger By '+g);
  if(s.goalDate){const delta=Math.ceil((new Date(s.goalDate+'T12:00:00')-new Date(today()+'T12:00:00'))/86400000);msg('goalSub',delta>0?`${delta} days until your goal date`:delta===0?'Your goal date is today — celebrate how far you have come!':'Your goal date has passed. Celebrate your progress and choose your next chapter.')}else msg('goalSub','Every workout counts. No deadline required.');
}
function workoutExercises(type,mode){if(type==='A'||type==='B')return (type==='A'?strengthA:strengthB)[mode].map(([name,reps])=>({key:'strength:'+name,name,reps,weighted:true}));if(type==='cardio')return [{key:'cardio',name:'Cardio / movement session',reps:'Walk, cycle, swim or your preferred movement'}];return [{key:'mobility',name:'Mobility / recovery session',reps:'Gentle mobility, stretching or yoga'}]}
function workoutEntry(){return progress.workouts[$('workoutDate').value]}
function renderWorkout(){const date=$('workoutDate').value||today();$('workoutDate').value=date;const existing=progress.workouts[date],type=existing?.type||$('workoutType').value,mode=existing?.mode||$('workoutMode').value;
  $('workoutType').value=type;$('workoutMode').value=mode;show('modeLabel',type==='A'||type==='B');
  const items=workoutExercises(type,mode),previous=Object.values(progress.workouts).filter(w=>w.date<date).sort((a,b)=>b.date.localeCompare(a.date));
  $('workoutTasks').innerHTML=items.map(it=>{const checked=!!existing?.checks?.[it.key];const last=previous.find(w=>w.weights?.[it.key]);const suggested=last?.weights?.[it.key]||'';const value=existing?.weights?.[it.key]??'';
    return `<div class="exercise"><label class="checkline"><input type="checkbox" data-check="${esc(it.key)}" ${checked?'checked':''}><span><b>${esc(it.name)}</b><small>${esc(it.reps)}</small></span></label>${it.weighted?`<label class="weight-field">Weight used (lb) <input type="number" min="0" max="2000" step="0.5" data-weight="${esc(it.key)}" value="${esc(value)}" placeholder="${esc(suggested||'—')}"></label>${suggested?`<small class="muted">Previous: ${esc(suggested)} lb</small>`:''}`:''}</div>`}).join('');
  $('workoutNotes').value=existing?.notes||'';msg('workoutMessage',existing?'Editing saved workout.':'Check exercises as you finish, then save.');
}
function saveWorkout(){const date=$('workoutDate').value;if(!date){msg('workoutMessage','Please choose a date.');return}const type=$('workoutType').value,mode=$('workoutMode').value,items=workoutExercises(type,mode),old=progress.workouts[date]||{};
  const checks={},weights={};document.querySelectorAll('[data-check]').forEach(x=>checks[x.dataset.check]=x.checked);
  document.querySelectorAll('[data-weight]').forEach(x=>{if(x.value!==''&&Number.isFinite(Number(x.value))&&Number(x.value)>=0)weights[x.dataset.weight]=Number(x.value)});
  progress.workouts[date]={date,type,mode,required:items.map(x=>x.key),checks,weights,notes:$('workoutNotes').value.slice(0,2000),updatedAt:new Date().toISOString()};changed();renderDashboard();renderWorkout();msg('workoutMessage',complete(progress.workouts[date])?'Workout completed! 🎉 Saved to your account.':'Workout saved as started / in progress.');
}
function renderProgress(){const ws=Object.values(progress.workouts).filter(w=>w?.date).sort((a,b)=>b.date.localeCompare(a.date));
  $('history').innerHTML=ws.length?ws.map(w=>`<div class="history-row"><span><b>${esc(w.date)}</b> · ${esc(w.type==='A'?'Strength A':w.type==='B'?'Strength B':w.type==='cardio'?'Cardio':'Mobility')}</span><span>${complete(w)?'✓ Complete':started(w)?'In progress':'Not started'}</span><button data-edit="${esc(w.date)}" class="quiet">Edit</button></div>`).join(''):'<p class="muted">Your first workout will appear here.</p>';
  $('history').querySelectorAll('[data-edit]').forEach(b=>b.addEventListener('click',()=>{$('workoutDate').value=b.dataset.edit;showTab('workout')}));
  const weights={};ws.forEach(w=>Object.entries(w.weights||{}).forEach(([k,v])=>{(weights[k]??=[]).push(`${w.date}: ${v} lb`)}));
  $('weightHistory').innerHTML=Object.keys(weights).length?Object.entries(weights).map(([k,arr])=>`<details><summary>${esc(k.replace('strength:',''))} (${arr.length})</summary><ul>${arr.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details>`).join(''):'<p class="muted">Weights you log during strength workouts will appear here.</p>';
  $('milestones').innerHTML=(progress.milestones||[]).length?progress.milestones.slice().reverse().map(m=>`<div class="history-row"><span>⭐ ${esc(m.text)} <small class="muted">${esc(m.date)}</small></span></div>`).join(''):'<p class="muted">Celebrate the wins that matter to you.</p>';
}
function renderSettings(){const s=progress.settings;$('frequency').value=String(s.frequency||3);$('preferredDays').innerHTML=days.map((d,i)=>`<label class="day-option"><input type="checkbox" value="${i}" ${s.preferred?.includes(i)?'checked':''}>${d}</label>`).join('');$('goalName').value=s.goal||'For Life';$('goalDate').value=s.goalDate||'';
  let old=null;try{old=JSON.parse(localStorage.getItem('maryFitness28')||'null')}catch(e){}
  const n=old?.days?Object.keys(old.days).length:0;
  msg('legacyStatus',n?`Found original history for ${n} day(s) in this browser. ${progress.legacy?'An import is already saved; importing again replaces the imported snapshot.':'Ready to import.'}`:'No original history found in this browser. Open this page on the device/browser where you used the old app, at the same GitHub Pages address.');$('importLegacy').disabled=!n;
}
function bind(){document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>showTab(b.dataset.tab)));
  $('startWorkout').onclick=()=>showTab('workout');$('editGoal').onclick=()=>showTab('settings');
  $('workoutDate').onchange=renderWorkout;
  $('workoutType').onchange=()=>{delete progress.workouts['__none__'];renderWorkoutTypeChange()};
  $('workoutMode').onchange=renderWorkoutTypeChange;
  $('saveWorkout').onclick=saveWorkout;
  $('settingsForm').onsubmit=e=>{e.preventDefault();const selected=[...$('preferredDays').querySelectorAll(':checked')].map(x=>Number(x.value));const frequency=Number($('frequency').value);if(selected.length&&selected.length!==frequency){alert('Choose exactly '+frequency+' preferred days, or leave all unchecked for a flexible schedule.');return;}progress.settings.frequency=frequency;progress.settings.preferred=selected;changed();renderDashboard();alert('Weekly plan saved.');};
  $('goalForm').onsubmit=e=>{e.preventDefault();progress.settings.goal=$('goalName').value.trim().slice(0,90)||'For Life';progress.settings.goalDate=$('goalDate').value;changed();renderDashboard();alert('Goal saved.');};
  $('milestoneForm').onsubmit=e=>{e.preventDefault();const v=$('milestoneText').value.trim();if(!v)return;progress.milestones.push({date:today(),text:v.slice(0,180)});$('milestoneText').value='';changed();renderProgress();};
  $('importLegacy').onclick=()=>{let old;try{old=JSON.parse(localStorage.getItem('maryFitness28')||'null')}catch(e){}if(!old?.days)return msg('importMessage','No original history found.');if(!confirm('Import a snapshot of your old 28-day progress into this account? Your original browser data will not be changed.'))return;progress.legacy={importedAt:new Date().toISOString(),originalStart:'2026-09-21',days:old.days};changed();msg('importMessage',`Imported ${Object.keys(old.days).length} day records into your private account.`);renderSettings()};
  $('importLegacyFile').onclick=async()=>{
    const file=$('legacyFile').files?.[0];
    if(!file)return msg('importMessage','Choose the original backup JSON file first.');
    if(file.size>2_000_000)return msg('importMessage','Backup is unexpectedly large; please check the file.');
    try{
      const old=JSON.parse(await file.text());
      if(!old || typeof old!=='object' || !old.days || typeof old.days!=='object' || Array.isArray(old.days))throw Error('This is not a Stronger By Disney progress backup.');
      const entries=Object.entries(old.days);
      if(!entries.length)throw Error('This backup has no recorded workout days.');
      if(entries.some(([k,v])=>!/^([1-9]|1\d|2[0-8])$/.test(k)||!v||typeof v!=='object'))throw Error('The backup contains unexpected workout-day data.');
      if(!confirm(`Import ${entries.length} day record(s) into your account as a historical snapshot? Existing imported history will be replaced, but new workouts will not be changed.`))return;
      progress.legacy={importedAt:new Date().toISOString(),originalStart:'2026-09-21',days:old.days};
      changed();msg('importMessage',`Imported ${entries.length} original day records. Keep the backup file until cloud sync is confirmed.`);renderSettings();
    }catch(e){msg('importMessage','Could not import: '+e.message)}
  };
  $('exportData').onclick=()=>{const blob=new Blob([JSON.stringify(progress,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='stronger-for-life-backup-'+today()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000)};
  $('authSwitch').onclick=()=>{authMode=authMode==='signin'?'signup':'signin';$('authSubmit').textContent=authMode==='signin'?'Sign in':'Create account';$('authSwitch').textContent=authMode==='signin'?'Need an account? Sign up':'Already have an account? Sign in';msg('authMessage','')};
  $('authForm').onsubmit=async e=>{e.preventDefault();if(!db)return;const email=$('email').value.trim(),password=$('password').value;msg('authMessage','Please wait…');$('authSubmit').disabled=true;
    try{const result=authMode==='signin'?await db.auth.signInWithPassword({email,password}):await db.auth.signUp({email,password});if(result.error)throw result.error;if(result.data.session)await enterSession(result.data.session);else msg('authMessage','Account created. Check your email for a confirmation link, then sign in.')}catch(err){msg('authMessage',err.message)}finally{$('authSubmit').disabled=false}};
  $('signOut').onclick=async()=>{if(dirty)await flush();const {error}=await db.auth.signOut();if(error)alert(error.message);else await enterSession(null)};
}
function renderWorkoutTypeChange(){// Change form controls without loading the saved workout for this date.
  const type=$('workoutType').value,mode=$('workoutMode').value;
  show('modeLabel',type==='A'||type==='B');const previous=Object.values(progress.workouts).filter(w=>w.date<$('workoutDate').value).sort((a,b)=>b.date.localeCompare(a.date));
  $('workoutTasks').innerHTML=workoutExercises(type,mode).map(it=>{const last=previous.find(w=>w.weights?.[it.key]);return `<div class="exercise"><label class="checkline"><input type="checkbox" data-check="${esc(it.key)}"><span><b>${esc(it.name)}</b><small>${esc(it.reps)}</small></span></label>${it.weighted?`<label class="weight-field">Weight used (lb) <input type="number" min="0" max="2000" step="0.5" data-weight="${esc(it.key)}" placeholder="${esc(last?.weights?.[it.key]||'—')}"></label>`:''}</div>`}).join('');
}
function renderAll(){renderDashboard();renderProgress();renderSettings();renderWorkout();}
bind();boot();
