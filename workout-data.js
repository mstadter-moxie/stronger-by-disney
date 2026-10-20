const START = new Date('2026-09-21T12:00:00');
const TOTAL_DAYS = 28;

const exercises = {
  'Ankle circles': {steps:['Sit or stand supported.','Lift one foot slightly and draw slow circles with the ankle.','Do 10 circles each direction, then switch feet.'], feel:'Gentle ankle movement. No sharp or worsening pain.', cue:'Move from the ankle, not the whole leg.'},
  'Heel-to-toe rocks': {steps:['Stand tall holding a counter or wall.','Rock gently forward toward the balls of your feet, then back toward your heels.','Keep the motion small and controlled for 10 reps.'], feel:'Easy ankle mobility, not a deep stretch.', cue:'No bouncing and no forcing the heel downward.'},
  'Shoulder rolls': {steps:['Stand or sit tall.','Roll both shoulders up, back, and down 10 times.','Reverse direction for 10 reps.'], feel:'Looser shoulders and upper back.', cue:'Keep your neck relaxed.'},
  'Standing hip flexor stretch': {steps:['Stand in a short split stance and hold a wall or chair if helpful.','Keep your torso upright and slightly bend the front knee.','Tuck your pelvis under — think “belt buckle up.”','Gently shift forward until you feel a stretch at the front of the hip on the back-leg side.','Hold 20–30 seconds and switch sides.'], feel:'Front of the hip/thigh on the back-leg side.', cue:'Do not arch your lower back; use a comfortable stance.'},
  'Figure-4 / seated glute stretch': {steps:['Sit near the front of a sturdy chair.','Cross one ankle over the opposite thigh.','Keep your back long and hinge forward slightly.','Hold 20–30 seconds, then switch.'], feel:'Outer hip and glute.', cue:'Do not push hard on the knee.'},
  'Hamstring stretch': {steps:['Place one heel slightly in front of you with a soft knee.','Hinge forward from the hips while keeping your back long.','Hold 20–30 seconds and switch.'], feel:'Back of the thigh.', cue:'No bouncing; stop before discomfort.'},
  'Chest opener': {steps:['Stand in a doorway with your forearms lightly supported, or clasp your hands behind you.','Gently open the chest without forcing your shoulders back.','Hold 20–30 seconds.'], feel:'Chest and front of shoulders.', cue:'Keep ribs stacked; do not overarch your back.'},
  'Upper-back rotation': {steps:['Sit or stand tall with arms crossed over your chest.','Rotate your rib cage gently to one side, return to center, then the other.','Do 5–8 per side.'], feel:'Gentle movement through the mid-back.', cue:'Keep hips mostly facing forward.'},
  'Leg press': {steps:['Set the seat so your knees start comfortably bent, not jammed toward your chest.','Place feet about hip-width on the platform.','Press the platform away without locking your knees.','Return slowly and under control.'], feel:'Thighs and glutes doing the work.', cue:'Start light. Keep knees tracking in the same direction as your toes.'},
  'Chest press machine': {steps:['Adjust the seat so handles are around mid-chest.','Keep shoulder blades gently against the pad.','Press forward smoothly, then return with control.'], feel:'Chest, shoulders, and triceps.', cue:'Do not shrug or lock the elbows.'},
  'Seated row machine': {steps:['Sit tall with chest supported if the machine provides a pad.','Pull the handles toward your ribs while drawing shoulder blades gently back.','Return slowly until arms are long.'], feel:'Upper back and the backs of the shoulders.', cue:'Do not yank or lean backward.'},
  'Hip abduction machine': {steps:['Sit tall with pads positioned comfortably outside the knees.','Press knees outward slowly.','Pause briefly, then return with control.'], feel:'Outer hips and glutes.', cue:'Use a range you can control without rocking.'},
  'Calf raises': {steps:['Stand with both feet parallel and hold support.','Rise onto the balls of both feet over about 2 seconds.','Lower over about 3 seconds.','Use only a comfortable range.'], feel:'Calf muscles working without sharp pain.', cue:'Move slowly and use a comfortable range.'},
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
  'Low step-ups': {steps:['Use a low step and hold a rail if available.','Place one whole foot on the step.','Press through that foot to step up, then step down slowly.','Repeat before switching sides.'], feel:'Thighs and glutes.', cue:'Keep the step low and stop if painful.'},
  'Shoulder press': {steps:['Hold light weights at shoulder level.','Press them overhead without locking the elbows.','Lower slowly.'], feel:'Shoulders and arms.', cue:'Keep ribs stacked and avoid leaning back.'},
  'Hip hinge / Romanian deadlift': {steps:['Stand with feet hip-width and weights close to the thighs.','Soften the knees, push hips backward, and slide the weights down the legs.','Stop when you feel hamstrings working, then squeeze glutes to stand.'], feel:'Glutes and hamstrings.', cue:'Think “hips back,” not “squat down.” Keep the spine long.'},
  'Standing side leg raises': {steps:['Hold a wall or chair.','Keep one leg straight and lift it a small distance out to the side.','Lower slowly and repeat.'], feel:'Outer hip of the moving leg.', cue:'Keep toes facing forward and torso upright.'},
  'Dead bug / seated knee lifts': {steps:['Dead bug: lie on your back with knees bent over hips and arms up; lower opposite arm and leg, then return.','Seated option: sit tall and lift one knee at a time without leaning back.'], feel:'Abdominals working without straining the neck.', cue:'Choose the version that lets you keep your back comfortable.'},
  'Ab machine': {steps:['Adjust the machine for a comfortable start.','Brace your abdomen and curl through the torso using the machine’s intended path.','Return slowly.'], feel:'Abdominals.', cue:'Use light resistance and avoid pulling with your arms.'},
  'Recumbent bike': {steps:['Adjust the seat so the knee stays slightly bent at the farthest pedal position.','Start with very light resistance for 3–5 minutes.','Pedal smoothly at a conversational effort.'], feel:'Legs working with very little impact.', cue:'A low-impact cardio option.'},
  'Treadmill / track walking': {steps:['Start easy for the first 3–5 minutes.','Walk tall with a natural stride and relaxed arms.','Keep most sessions around 4–6/10 effort.'], feel:'Breathing harder but still able to speak in sentences.', cue:'No incline needed early on; do not lengthen your stride to go faster.'},
  'Pool walking / easy swimming': {steps:['Use a comfortable pool depth.','Walk forward with normal steps or swim easy laps.','Keep the effort moderate and smooth.'], feel:'Cardio work with very low joint impact.', cue:'A low-impact recovery option.'},
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
['YMCA','10 minutes recumbent bike OR easy treadmill','B1','5','Choose the option that feels comfortable.'],
['Anywhere','15-minute easy walk','none','5','Finish feeling like you could have done more.'],
['YMCA optional','15–20 minutes pool walking or easy swimming','none','long','If you skip the Y, do a 15-minute easy walk instead.'],
['Recovery day','Rest OR 10-minute gentle stroll','none','long','Today is about recovery, not earning calories.'],
['YMCA','15 minutes treadmill or track','A2','5','Start Week 2 with an easy first 5 minutes.'],
['Anywhere','18–20 minute comfortable walk','none','5','Slightly brisker is fine if comfortable.'],
['YMCA','10 minutes recumbent bike','B2','5','Keep strength weights conservative and smooth.'],
['Treadmill, track, or outdoors','20-minute steady walk','none','8','Aim for effort 4–5/10.'],
['YMCA','10 minutes easy cardio after strength','A2','5','If tired, do cardio before strength instead.'],
['Anywhere / YMCA','20–25 minute relaxed walk OR pool session','none','long','Choose the option that sounds enjoyable.'],
['Recovery day','Rest','none','long','Optional gentle beginner yoga if it feels good.'],
['YMCA','15 minutes treadmill','B2','5','Week 3: still controlled, now a little more substantial.'],
['Anywhere','25-minute steady walk','none','5','Effort 4–6/10; you should still be able to talk.'],
['YMCA','10–15 minutes recumbent bike','A2','5','Low-impact cardio plus strength.'],
['Track or treadmill','Intervals: 5 min easy, then 1 min brisk / 2 min easy × 5, then cool down','none','8','Brisk means faster walking, not jogging.'],
['YMCA','10 minutes easy cardio after strength','B2','5','Keep your strides smooth and controlled.'],
['Your choice','25–30 minutes pool walking, track, or outdoor walk','none','long','This is your longest steady session so far.'],
['Recovery day','Rest OR 10-minute recovery walk','none','long','Optional gentle yoga.'],
['YMCA','15 minutes easy cardio','A3','5','First 3-set day. Reduce weight if form deteriorates.'],
['Track, treadmill, or outdoors','30-minute steady walk','none','8','Effort about 5/10.'],
['YMCA','15 minutes bike or treadmill','B3','5','Three good sets matter more than heavy weight.'],
['Track or treadmill','Intervals: 5 min easy, 1 min brisk / 2 min easy × 5, then 5 min easy','none','8','Choose steady walking instead if intervals feel uncomfortable.'],
['YMCA','15–20 minutes easy cardio','A2','5','Slightly lighter strength day before the weekend.'],
['Anywhere / YMCA','30–35 minute comfortable walk OR pool session','none','long','No need to push pace. Build duration.'],
['Recovery + review','Rest OR gentle 15-minute stroll','none','long','Celebrate four weeks of consistency and note what you want to carry into Month 2.']
];

const plan = rawPlan.map((r,i)=>({day:i+1,where:r[0],cardio:r[1],strength:r[2],mob:r[3],focus:r[4]}));
