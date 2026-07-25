import { useState, useEffect, useRef } from "react";

const WORKOUTS = [
  {
    id: "legs", day: "01", name: "Legs & Abs", color: "#F59E0B", colorLight: "#FEF3C7",
    exercises: [
      { id: "leg-press-mch", name: "Leg Press Machine", category: "Quads" },
      { id: "lying-leg-press", name: "Lying Leg Press", category: "Quads" },
      { id: "leg-ext", name: "Leg Extension Machine", category: "Quads" },
      { id: "goblet-squat", name: "Goblet Squat (Dumbbell)", category: "Quads" },
      { id: "smith-squat", name: "Smith Machine Squat", category: "Quads" },
      { id: "db-lunge", name: "Dumbbell Lunges", category: "Quads" },
      { id: "db-bulgarian", name: "Bulgarian Split Squat (DB)", category: "Quads" },
      { id: "cable-squat", name: "Cable Glute Squat", category: "Quads" },
      { id: "hack-squat", name: "Hack Squat Machine", category: "Quads" },
      { id: "rdl-db", name: "Romanian Deadlift (Dumbbell)", category: "Hamstrings" },
      { id: "rdl-bb", name: "Romanian Deadlift (Barbell)", category: "Hamstrings" },
      { id: "lying-leg-curl", name: "Lying Leg Curl Machine", category: "Hamstrings" },
      { id: "seated-leg-curl", name: "Seated Leg Curl Machine", category: "Hamstrings" },
      { id: "cable-leg-curl", name: "Cable Standing Leg Curl", category: "Hamstrings" },
      { id: "cable-pull-through", name: "Cable Pull-Through", category: "Hamstrings" },
      { id: "cable-rdl", name: "Cable Romanian Deadlift", category: "Hamstrings" },
      { id: "adductor", name: "Adductor Machine", category: "Glutes" },
      { id: "abductor", name: "Abductor Machine", category: "Glutes" },
      { id: "cable-kickback", name: "Cable Glute Kickback", category: "Glutes" },
      { id: "cable-hip-abd", name: "Cable Hip Abduction", category: "Glutes" },
      { id: "hip-thrust-mch", name: "Hip Thrust Machine", category: "Glutes" },
      { id: "db-hip-thrust", name: "Dumbbell Hip Thrust", category: "Glutes" },
      { id: "standing-calf", name: "Standing Calf Raise", category: "Calves" },
      { id: "seated-calf", name: "Seated Calf Raise Machine", category: "Calves" },
      { id: "leg-press-calf", name: "Leg Press Calf Raise", category: "Calves" },
      { id: "cable-crunch", name: "Cable Crunches", category: "Abs" },
      { id: "plank", name: "Plank", category: "Abs", isTime: true },
      { id: "flutterkicks", name: "Flutter Kicks", category: "Abs" },
      { id: "legraise", name: "Lying Leg Lifts", category: "Abs" },
      { id: "in-and-outs", name: "Slow In & Outs", category: "Abs" },
      { id: "russian-twist", name: "Russian Twists (Weighted)", category: "Abs" },
      { id: "hanging-knee", name: "Hanging Knee Raises", category: "Abs" },
      { id: "ab-wheel", name: "Ab Wheel Rollout", category: "Abs" },
      { id: "cable-woodchop", name: "Cable Wood Chop", category: "Abs" },
    ]
  },
  {
    id: "back", day: "02", name: "Back", color: "#3B82F6", colorLight: "#DBEAFE",
    exercises: [
      { id: "lat-pulldown", name: "Lat Pulldown (Wide Grip)", category: "Lats" },
      { id: "close-pulldown", name: "Lat Pulldown (Close Grip)", category: "Lats" },
      { id: "rev-pulldown", name: "Lat Pulldown (Reverse Grip)", category: "Lats" },
      { id: "straight-arm-pd", name: "Straight-Arm Cable Pulldown", category: "Lats" },
      { id: "cable-pullover", name: "Cable Pullover", category: "Lats" },
      { id: "db-pullover", name: "Dumbbell Pullover", category: "Lats" },
      { id: "seated-row-wide", name: "Seated Cable Row (Wide)", category: "Mid Back" },
      { id: "seated-row-close", name: "Seated Cable Row (Close)", category: "Mid Back" },
      { id: "single-arm-cable-row", name: "Single-Arm Cable Row", category: "Mid Back" },
      { id: "chest-supported-row", name: "Chest-Supported Machine Row", category: "Mid Back" },
      { id: "db-row", name: "Dumbbell Row", category: "Mid Back" },
      { id: "bb-row", name: "Barbell Bent-Over Row", category: "Mid Back" },
      { id: "tbar-row", name: "T-Bar Row", category: "Mid Back" },
      { id: "smith-row", name: "Smith Machine Row", category: "Mid Back" },
      { id: "face-pull", name: "Face Pulls (Cable)", category: "Mid Back" },
      { id: "cable-rear-delt", name: "Cable Rear Delt Fly", category: "Mid Back" },
      { id: "bb-shrug", name: "Barbell Shrugs", category: "Traps" },
      { id: "db-shrug", name: "Dumbbell Shrugs", category: "Traps" },
      { id: "cable-shrug", name: "Cable Shrugs", category: "Traps" },
      { id: "cable-upright-row", name: "Cable Upright Row", category: "Traps" },
      { id: "bb-upright-row", name: "Barbell Upright Row", category: "Traps" },
    ]
  },
  {
    id: "arms", day: "03", name: "Arms", color: "#10B981", colorLight: "#D1FAE5",
    exercises: [
      { id: "bb-curl", name: "Barbell Curl", category: "Biceps" },
      { id: "ez-curl", name: "EZ Bar Curl", category: "Biceps" },
      { id: "db-curl-alt", name: "Alternating Dumbbell Curl", category: "Biceps" },
      { id: "hammer-curl", name: "Hammer Curl", category: "Biceps" },
      { id: "zottman-curl", name: "Zottman Curl", category: "Biceps" },
      { id: "incline-db-curl", name: "Incline Dumbbell Curl", category: "Biceps" },
      { id: "preacher-curl", name: "Preacher Curl (Machine)", category: "Biceps" },
      { id: "cable-curl", name: "Cable Curl", category: "Biceps" },
      { id: "cable-curl-rope", name: "Cable Curl (Rope)", category: "Biceps" },
      { id: "spider-curl", name: "Spider Curl", category: "Biceps" },
      { id: "conc-curl", name: "Concentration Curl", category: "Biceps" },
      { id: "reverse-curl", name: "Reverse Curl", category: "Biceps" },
      { id: "tricep-bar-pd", name: "Tricep Pushdown (Bar)", category: "Triceps" },
      { id: "tricep-rope-pd", name: "Tricep Pushdown (Rope)", category: "Triceps" },
      { id: "cable-oh-tricep", name: "Cable Overhead Tricep Extension", category: "Triceps" },
      { id: "skull-crusher", name: "Skull Crushers (EZ Bar)", category: "Triceps" },
      { id: "db-skull-crusher", name: "Dumbbell Skull Crusher", category: "Triceps" },
      { id: "oh-db-ext", name: "Overhead DB Tricep Extension", category: "Triceps" },
      { id: "close-grip-bench", name: "Close Grip Bench Press", category: "Triceps" },
      { id: "tricep-dips", name: "Tricep Dips", category: "Triceps" },
      { id: "bench-dips", name: "Bench Dips", category: "Triceps" },
      { id: "wrist-curl", name: "Wrist Curl (Barbell)", category: "Forearms" },
      { id: "reverse-wrist-curl", name: "Reverse Wrist Curl", category: "Forearms" },
    ]
  },
  {
    id: "chest", day: "04", name: "Chest & Shoulders", color: "#EF4444", colorLight: "#FEE2E2",
    exercises: [
      { id: "flat-bb-bench", name: "Flat Barbell Bench Press", category: "Chest" },
      { id: "incline-bb-bench", name: "Incline Barbell Bench Press", category: "Chest" },
      { id: "chest-press-mch", name: "Chest Press Machine", category: "Chest" },
      { id: "incline-chest-mch", name: "Incline Chest Press Machine", category: "Chest" },
      { id: "incline-db-press", name: "Incline Dumbbell Press", category: "Chest" },
      { id: "flat-db-press", name: "Flat Dumbbell Press", category: "Chest" },
      { id: "flat-db-fly", name: "Flat Dumbbell Fly", category: "Chest" },
      { id: "incline-db-fly", name: "Incline Dumbbell Fly", category: "Chest" },
      { id: "cable-fly-low", name: "Cable Fly (Low to High)", category: "Chest" },
      { id: "cable-fly-high", name: "Cable Fly (High to Low)", category: "Chest" },
      { id: "cable-fly-mid", name: "Cable Fly (Mid / Crossover)", category: "Chest" },
      { id: "pec-deck", name: "Pec Deck Machine", category: "Chest" },
      { id: "smith-bench", name: "Smith Machine Bench Press", category: "Chest" },
      { id: "db-pullover-chest", name: "Dumbbell Pullover", category: "Chest" },
      { id: "bb-ohp", name: "Barbell Overhead Press", category: "Shoulders" },
      { id: "db-ohp", name: "Dumbbell Shoulder Press", category: "Shoulders" },
      { id: "smith-ohp", name: "Smith Machine Shoulder Press", category: "Shoulders" },
      { id: "mch-ohp", name: "Machine Shoulder Press", category: "Shoulders" },
      { id: "arnold-press", name: "Arnold Press", category: "Shoulders" },
      { id: "db-lat-raise", name: "Dumbbell Lateral Raise", category: "Shoulders" },
      { id: "cable-lat-raise", name: "Cable Lateral Raise", category: "Shoulders" },
      { id: "mch-lat-raise", name: "Lateral Raise Machine", category: "Shoulders" },
      { id: "db-front-raise", name: "Dumbbell Front Raise", category: "Shoulders" },
      { id: "cable-front-raise", name: "Cable Front Raise", category: "Shoulders" },
      { id: "rear-delt-db", name: "Rear Delt Dumbbell Fly", category: "Shoulders" },
      { id: "rev-pec-deck", name: "Reverse Pec Deck (Rear Delt)", category: "Shoulders" },
      { id: "cable-face-pull", name: "Cable Face Pull", category: "Shoulders" },
    ]
  }
];

const CUSTOM_DAY = { id: "custom", day: "★", name: "Custom Day", color: "#8B5CF6", colorLight: "#EDE9FE" };
const DEFAULT_SETS = 4;

function lsSave(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { console.error(e); }
}
function lsGet(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}

const ALL_EXERCISES = WORKOUTS.flatMap(w =>
  w.exercises.map(ex => ({ ...ex, fromWorkout: w.name, fromColor: w.color, fromLight: w.colorLight }))
);

export default function WorkoutTracker() {
  const [view, setView] = useState("home");
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [history, setHistory] = useState(() => lsGet("wt-history-v3", []));
  const historyRef = useRef(lsGet("wt-history-v3", []));
  const [currentSets, setCurrentSets] = useState({});
  const currentSetsRef = useRef({});
  const [toast, setToast] = useState(null); // { msg, total }
  const [inputs, setInputs] = useState({});
  const [extraSets, setExtraSets] = useState({});
  const [adHocExercises, setAdHocExercises] = useState([]);
  const [quickAddName, setQuickAddName] = useState("");
  const [quickAddIsTime, setQuickAddIsTime] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [expandedHistory, setExpandedHistory] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [pickerWorkout, setPickerWorkout] = useState(null);
  const [pickerSelected, setPickerSelected] = useState([]);
  const [pickerSearch, setPickerSearch] = useState("");

  useEffect(() => { currentSetsRef.current = currentSets; }, [currentSets]);
  useEffect(() => { historyRef.current = history; }, [history]);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (view !== "workout" || !startTime) return;
    const iv = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(iv);
  }, [view, startTime]);

  const saveHistory = (h) => lsSave("wt-history-v3", h.slice(0, 200));

  const openPicker = (w) => {
    setPickerWorkout(w);
    setPickerSelected([]);
    setPickerSearch("");
    setView("picker");
  };

  const togglePick = (id) =>
    setPickerSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const startFromPicker = () => {
    const pool = pickerWorkout.id === "custom" ? ALL_EXERCISES : pickerWorkout.exercises;
    const chosen = pool.filter(e => pickerSelected.includes(e.id));
    startWorkout(pickerWorkout, chosen);
  };

  const startWorkout = (w, exercises) => {
    setActiveWorkout({ ...w, sessionExercises: exercises });
    setCurrentSets({}); currentSetsRef.current = {};
    setInputs({}); setExtraSets({});
    setAdHocExercises([]); setQuickAddName(""); setQuickAddIsTime(false);
    setStartTime(Date.now()); setElapsed(0);
    setView("workout");
  };

  const setInput = (exId, si, field, val) =>
    setInputs(p => ({ ...p, [exId]: { ...(p[exId] || {}), [si]: { ...((p[exId] || {})[si] || {}), [field]: val } } }));

  const logSet = (ex, si) => {
    const ip = ((inputs[ex.id] || {})[si]) || {};
    if (ex.isTime ? !ip.sec : !ip.reps) return;
    const s = { w: ip.w || null, reps: ip.reps || null, sec: ip.sec || null };
    setCurrentSets(p => {
      const arr = [...(p[ex.id] || [])]; arr[si] = s;
      const next = { ...p, [ex.id]: arr };
      currentSetsRef.current = next;
      return next;
    });
  };

  const unlogSet = (exId, si) =>
    setCurrentSets(p => {
      const arr = [...(p[exId] || [])]; arr[si] = null;
      const next = { ...p, [exId]: arr };
      currentSetsRef.current = next;
      return next;
    });

  const addExtraSet = (exId) => setExtraSets(p => ({ ...p, [exId]: (p[exId] || 0) + 1 }));

  const submitQuickAdd = () => {
    if (!quickAddName.trim()) return;
    setAdHocExercises(p => [...p, { id: `adhoc-${Date.now()}`, name: quickAddName.trim(), category: "Extra", isTime: quickAddIsTime, custom: true }]);
    setQuickAddName(""); setQuickAddIsTime(false);
  };

  const finishWorkout = () => {
    // Use refs so we always have the latest data regardless of React batching
    const snap = currentSetsRef.current;
    const allSets = {}; let total = 0;
    Object.entries(snap).forEach(([exId, arr]) => {
      if (!Array.isArray(arr)) return;
      const valid = arr.filter(Boolean);
      if (valid.length) { allSets[exId] = valid; total += valid.length; }
    });

    if (total > 0) {
      const w = activeWorkout;
      const entry = {
        id: Date.now(), workoutId: w.id, workoutName: w.name, workoutColor: w.color,
        date: new Date().toISOString(), durationMins: Math.round(elapsed / 60),
        sets: allSets, totalSets: total,
        exerciseNames: (w.sessionExercises || []).reduce((acc, e) => ({ ...acc, [e.id]: e.name }), {}),
      };
      // Use historyRef so we never lose previous entries to a stale closure
      const nh = [entry, ...historyRef.current];
      historyRef.current = nh;
      setHistory(nh);
      saveHistory(nh);
      // Show save confirmation toast
      setToast({ total, color: w.color });
      setTimeout(() => setToast(null), 3000);
    }
    setView("home");
  };

  const deleteWorkout = (id) => {
    if (pendingDelete === id) {
      const nh = history.filter(h => h.id !== id);
      setHistory(nh); saveHistory(nh); setPendingDelete(null);
    } else { setPendingDelete(id); }
  };

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const fmtDate = (iso) => new Date(iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const getLast = (wid) => history.find(h => h.workoutId === wid);
  const totalNow = Object.values(currentSets).reduce((s, a) => s + (Array.isArray(a) ? a.filter(Boolean).length : 0), 0);

  const BF = "'Barlow Condensed', sans-serif";
  const DF = "'DM Sans', system-ui, sans-serif";
  const bg = "#F4F5FB"; const card = "#FFFFFF"; const bdr = "#E8E8F2";
  const t1 = "#111128"; const t2 = "#6B7080";
  const shad = "0 2px 12px rgba(0,0,30,0.07)";
  const base = { background: bg, minHeight: "100vh", color: t1, fontFamily: DF };
  const inpSt = (extra = {}) => ({ padding: "9px 12px", background: "#F8F8FC", border: `1.5px solid ${bdr}`, borderRadius: 9, color: t1, fontSize: 13, fontFamily: DF, outline: "none", ...extra });

  const renderSetRows = (ex, w) => {
    const sets = currentSets[ex.id] || [];
    const logged = sets.filter(Boolean).length;
    const total = DEFAULT_SETS + (extraSets[ex.id] || 0);
    const done = logged === total && total > 0;
    return (
      <div key={ex.id} style={{ background: card, margin: "0 12px 10px", borderRadius: 14, overflow: "hidden", boxShadow: done ? `0 2px 14px ${w.color}33` : shad, border: `1.5px solid ${done ? w.color + "55" : bdr}` }}>
        <div style={{ padding: "12px 14px 10px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${bdr}` }}>
          <div style={{ flex: 1, paddingRight: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: t1 }}>{ex.name}</div>
            {ex.custom && <div style={{ fontSize: 9, color: w.color, letterSpacing: 1, marginTop: 1 }}>CUSTOM</div>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            {done && <span style={{ fontSize: 10, color: w.color, fontFamily: BF, fontWeight: 700, letterSpacing: 1 }}>✓ DONE</span>}
            <span style={{ fontFamily: BF, fontSize: 13, fontWeight: 700, color: logged > 0 ? w.color : "#CCCCDD" }}>{logged}/{total}</span>
          </div>
        </div>
        {Array.from({ length: total }).map((_, si) => {
          const lg = sets[si]; const ip = ((inputs[ex.id] || {})[si]) || {};
          const can = ex.isTime ? !!ip.sec : !!ip.reps;
          return (
            <div key={si} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderBottom: si < total - 1 ? `1px solid ${bdr}` : "none", background: lg ? w.colorLight : "transparent" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: BF, fontSize: 12, fontWeight: 800, background: lg ? w.color : "#F0F0F8", color: lg ? "#fff" : "#AAAACC" }}>{si + 1}</div>
              {lg ? (
                <>
                  <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: t1 }}>{ex.isTime ? `${lg.sec} sec` : `${lg.w ? `${lg.w} lbs × ` : ""}${lg.reps} reps`}</div>
                  <button onClick={() => unlogSet(ex.id, si)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: w.color, padding: "2px 6px" }}>✕</button>
                </>
              ) : (
                <>
                  {!ex.isTime && <input type="number" placeholder="lbs" value={ip.w || ""} onChange={e => setInput(ex.id, si, "w", e.target.value)} style={{ width: 58, padding: "7px 8px", background: "#F4F5FB", border: `1.5px solid ${bdr}`, borderRadius: 8, color: t1, fontSize: 13, fontFamily: DF, outline: "none" }} />}
                  <input type="number" placeholder={ex.isTime ? "sec" : "reps"} value={ex.isTime ? (ip.sec || "") : (ip.reps || "")} onChange={e => setInput(ex.id, si, ex.isTime ? "sec" : "reps", e.target.value)} style={{ width: ex.isTime ? undefined : 58, flex: ex.isTime ? 1 : undefined, padding: "7px 8px", background: "#F4F5FB", border: `1.5px solid ${bdr}`, borderRadius: 8, color: t1, fontSize: 13, fontFamily: DF, outline: "none" }} />
                  <button onClick={() => logSet(ex, si)} style={{ flex: ex.isTime ? undefined : 1, padding: "7px 10px", background: can ? w.color : "#F0F0F8", color: can ? "#fff" : "#CCCCDD", border: "none", borderRadius: 8, cursor: can ? "pointer" : "default", fontFamily: BF, fontWeight: 800, fontSize: 12, letterSpacing: 1, whiteSpace: "nowrap" }}>LOG</button>
                </>
              )}
            </div>
          );
        })}
        <button onClick={() => addExtraSet(ex.id)} style={{ width: "100%", padding: "8px", background: "none", border: "none", color: w.color, fontFamily: BF, fontSize: 11, fontWeight: 700, letterSpacing: 1, cursor: "pointer", borderTop: `1px dashed ${bdr}` }}>+ ADD SET</button>
      </div>
    );
  };

  // HOME
  if (view === "home") return (
    <div style={base}>
      {/* Save confirmation toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
          zIndex: 999, background: toast.color, color: "#fff",
          padding: "12px 24px", borderRadius: 50,
          fontFamily: BF, fontSize: 14, fontWeight: 800, letterSpacing: 1,
          boxShadow: `0 4px 20px ${toast.color}66`,
          animation: "fadeIn 0.2s ease",
          whiteSpace: "nowrap",
        }}>
          ✓ SAVED — {toast.total} SETS LOGGED
        </div>
      )}
      <div style={{ padding: "52px 18px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ fontFamily: BF, fontSize: 11, letterSpacing: 4, color: "#AAAACC", textTransform: "uppercase", marginBottom: 4 }}>YOUR PROGRAM</div>
          <div style={{ fontFamily: BF, fontSize: 42, fontWeight: 900, lineHeight: 0.92, letterSpacing: -1, color: t1 }}>WORKOUT<br />TRACKER</div>
        </div>
        <button onClick={() => { setPendingDelete(null); setView("history"); }} style={{ background: card, border: `1.5px solid ${bdr}`, borderRadius: 12, padding: "9px 16px", color: t2, fontSize: 11, cursor: "pointer", fontFamily: BF, letterSpacing: 2, textTransform: "uppercase", boxShadow: shad }}>History</button>
      </div>
      <div style={{ padding: "22px 18px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {WORKOUTS.map((w) => {
          const last = getLast(w.id);
          const cats = [...new Set(w.exercises.map(e => e.category))];
          return (
            <div key={w.id} onClick={() => openPicker(w)} style={{ background: card, border: `1.5px solid ${bdr}`, borderRadius: 20, overflow: "hidden", boxShadow: shad, cursor: "pointer" }}>
              <div style={{ background: w.color, height: 6 }} />
              <div style={{ padding: "14px 14px 16px" }}>
                <div style={{ fontFamily: BF, fontSize: 10, letterSpacing: 3, color: "#AAAACC", textTransform: "uppercase", marginBottom: 4 }}>DAY {w.day}</div>
                <div style={{ fontFamily: BF, fontSize: 20, fontWeight: 800, lineHeight: 1.1, marginBottom: 10, color: t1 }}>{w.name.toUpperCase()}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
                  {cats.map(c => <span key={c} style={{ fontSize: 8, padding: "3px 6px", background: w.colorLight, borderRadius: 4, color: w.color, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>{c}</span>)}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 10, color: t2 }}>{last ? `Last: ${fmtDate(last.date)}` : `${w.exercises.length} exercises`}</div>
                  <div style={{ background: w.color, color: "#fff", fontFamily: BF, fontSize: 11, fontWeight: 800, letterSpacing: 1, padding: "5px 12px", borderRadius: 7 }}>PICK</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ padding: "14px 18px 0" }}>
        <div onClick={() => openPicker(CUSTOM_DAY)} style={{ background: card, border: `1.5px solid ${bdr}`, borderRadius: 20, overflow: "hidden", boxShadow: shad, cursor: "pointer" }}>
          <div style={{ background: "linear-gradient(90deg,#8B5CF6,#EC4899)", height: 6 }} />
          <div style={{ padding: "16px 16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: BF, fontSize: 10, letterSpacing: 3, color: "#AAAACC", textTransform: "uppercase", marginBottom: 4 }}>CUSTOM DAY ★</div>
              <div style={{ fontFamily: BF, fontSize: 20, fontWeight: 800, color: t1, marginBottom: 4 }}>BUILD YOUR OWN</div>
              <div style={{ fontSize: 11, color: t2 }}>Pick from all {ALL_EXERCISES.length} exercises</div>
            </div>
            <div style={{ background: "#EDE9FE", color: "#8B5CF6", border: "1.5px solid #C4B5FD", borderRadius: 8, padding: "7px 16px", fontFamily: BF, fontSize: 12, fontWeight: 800, letterSpacing: 1, flexShrink: 0 }}>PICK</div>
          </div>
        </div>
      </div>
      {history.length > 0 && (
        <div style={{ padding: "20px 18px 48px" }}>
          <div style={{ fontFamily: BF, fontSize: 10, letterSpacing: 3, color: "#AAAACC", textTransform: "uppercase", marginBottom: 12 }}>RECENT</div>
          {history.slice(0, 4).map(h => (
            <div key={h.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${bdr}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 4, height: 36, background: h.workoutColor, borderRadius: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: t1 }}>{h.workoutName}</div>
                  <div style={{ fontSize: 10, color: t2, marginTop: 1 }}>{fmtDate(h.date)} · {h.durationMins}m</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: BF, fontSize: 22, fontWeight: 800, color: h.workoutColor, lineHeight: 1 }}>{h.totalSets}</div>
                <div style={{ fontSize: 9, color: t2, letterSpacing: 1 }}>SETS</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // PICKER
  if (view === "picker") {
    const w = pickerWorkout;
    const isCustom = w.id === "custom";
    const pool = isCustom ? ALL_EXERCISES : w.exercises;
    const filtered = pickerSearch.trim()
      ? pool.filter(e => e.name.toLowerCase().includes(pickerSearch.toLowerCase()) || e.category.toLowerCase().includes(pickerSearch.toLowerCase()))
      : pool;
    const cats = [...new Set(filtered.map(e => e.category))];
    const ac = w.color;
    return (
      <div style={base}>
        <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(244,245,251,0.97)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${bdr}`, padding: "12px 16px 10px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <button onClick={() => setView("home")} style={{ background: "none", border: "none", color: t2, cursor: "pointer", fontFamily: DF, fontSize: 13, padding: 0 }}>← Back</button>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: BF, fontSize: 16, fontWeight: 800, letterSpacing: 1, color: ac }}>{w.name.toUpperCase()}</div>
              <div style={{ fontSize: 10, color: t2 }}>{pickerSelected.length === 0 ? "Tap to select exercises" : `${pickerSelected.length} selected`}</div>
            </div>
            {pickerSelected.length > 0
              ? <button onClick={() => setPickerSelected([])} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontFamily: BF, fontSize: 11, letterSpacing: 1 }}>CLEAR</button>
              : <div style={{ width: 48 }} />}
          </div>
          <input value={pickerSearch} onChange={e => setPickerSearch(e.target.value)} placeholder="Search exercises..." style={inpSt({ width: "100%", boxSizing: "border-box" })} />
        </div>
        <div style={{ paddingBottom: 110 }}>
          {cats.length === 0 && <div style={{ padding: 40, textAlign: "center", color: t2, fontSize: 13 }}>No exercises found</div>}
          {cats.map(cat => (
            <div key={cat}>
              <div style={{ padding: "14px 16px 6px", fontFamily: BF, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: ac }}>{cat}</div>
              {filtered.filter(e => e.category === cat).map(ex => {
                const sel = pickerSelected.includes(ex.id);
                return (
                  <div key={ex.id} onClick={() => togglePick(ex.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: `1px solid ${bdr}`, background: sel ? (w.colorLight || "#EDE9FE") : card, cursor: "pointer", transition: "background 0.15s" }}>
                    <div style={{ width: 24, height: 24, borderRadius: 7, border: `2px solid ${sel ? ac : "#D1D5DB"}`, background: sel ? ac : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                      {sel && <span style={{ color: "#fff", fontSize: 13, lineHeight: 1, fontWeight: 700 }}>✓</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, color: t1, fontWeight: sel ? 500 : 400 }}>{ex.name}</div>
                      {isCustom && <div style={{ marginTop: 3 }}><span style={{ background: ex.fromLight, color: ex.fromColor, padding: "2px 6px", borderRadius: 4, fontSize: 9, letterSpacing: 1, fontWeight: 600, textTransform: "uppercase" }}>{ex.fromWorkout}</span></div>}
                      {ex.isTime && <div style={{ fontSize: 10, color: t2, marginTop: 2 }}>Time-based</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {pickerSelected.length > 0 && (
          <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "12px 16px 28px", background: "rgba(244,245,251,0.97)", backdropFilter: "blur(10px)", borderTop: `1px solid ${bdr}` }}>
            <button onClick={startFromPicker} style={{ width: "100%", padding: "14px", background: isCustom ? "linear-gradient(90deg,#8B5CF6,#EC4899)" : ac, color: "#fff", border: "none", borderRadius: 13, fontFamily: BF, fontSize: 15, fontWeight: 800, letterSpacing: 1, cursor: "pointer" }}>
              START — {pickerSelected.length} EXERCISE{pickerSelected.length !== 1 ? "S" : ""} SELECTED →
            </button>
          </div>
        )}
      </div>
    );
  }

  // WORKOUT
  if (view === "workout") {
    const w = activeWorkout;
    const exercises = w.sessionExercises || [];
    const cats = [...new Set(exercises.map(e => e.category))];
    const isCustom = w.id === "custom";
    return (
      <div style={base}>
        <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(244,245,251,0.97)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${bdr}`, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => setView("home")} style={{ background: "none", border: "none", color: t2, cursor: "pointer", fontFamily: DF, fontSize: 13, padding: 0 }}>← Back</button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: BF, fontSize: 17, fontWeight: 800, letterSpacing: 1, ...(isCustom ? { background: "linear-gradient(90deg,#8B5CF6,#EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } : { color: w.color }) }}>{w.name.toUpperCase()}</div>
            <div style={{ fontSize: 11, color: t2, marginTop: 1 }}><span style={{ color: t1, fontFamily: BF, fontWeight: 700 }}>{fmt(elapsed)}</span> · {totalNow} sets</div>
          </div>
          <button onClick={finishWorkout} style={{ background: isCustom ? "linear-gradient(90deg,#8B5CF6,#EC4899)" : w.color, color: "#fff", border: "none", borderRadius: 8, padding: "7px 13px", fontFamily: BF, fontSize: 12, fontWeight: 800, letterSpacing: 1, cursor: "pointer" }}>DONE</button>
        </div>
        <div style={{ paddingBottom: 60 }}>
          {cats.map(cat => (
            <div key={cat}>
              <div style={{ padding: "18px 16px 8px", fontFamily: BF, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: w.color }}>{cat}</div>
              {exercises.filter(e => e.category === cat).map(ex => renderSetRows(ex, w))}
            </div>
          ))}
          {adHocExercises.length > 0 && (
            <div>
              <div style={{ padding: "18px 16px 8px", fontFamily: BF, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: w.color }}>ADDED THIS SESSION</div>
              {adHocExercises.map(ex => renderSetRows(ex, w))}
            </div>
          )}
          <div style={{ margin: "16px 12px 32px", background: card, border: `1.5px dashed ${bdr}`, borderRadius: 16, padding: "16px 14px" }}>
            <div style={{ fontFamily: BF, fontSize: 12, fontWeight: 700, letterSpacing: 2, color: w.color, textTransform: "uppercase", marginBottom: 12 }}>+ ADD AN EXERCISE</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <input value={quickAddName} onChange={e => setQuickAddName(e.target.value)} onKeyDown={e => e.key === "Enter" && submitQuickAdd()} placeholder="Exercise name..." style={inpSt({ flex: 1 })} />
              <button onClick={submitQuickAdd} style={{ padding: "9px 16px", background: quickAddName.trim() ? w.color : "#F0F0F8", color: quickAddName.trim() ? "#fff" : "#CCCCDD", border: "none", borderRadius: 9, cursor: quickAddName.trim() ? "pointer" : "default", fontFamily: BF, fontSize: 13, fontWeight: 800, letterSpacing: 1, whiteSpace: "nowrap" }}>ADD</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div onClick={() => setQuickAddIsTime(p => !p)} style={{ width: 32, height: 18, borderRadius: 9, cursor: "pointer", background: quickAddIsTime ? w.color : "#E0E0F0", position: "relative", transition: "all 0.2s", flexShrink: 0 }}>
                <div style={{ position: "absolute", top: 2, left: quickAddIsTime ? 13 : 2, width: 13, height: 13, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
              </div>
              <div style={{ fontSize: 11, color: t2 }}>Time-based (seconds)</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // HISTORY
  if (view === "history") {
    const allDefs = [...WORKOUTS, CUSTOM_DAY];
    const grouped = {};
    history.forEach(h => { if (!grouped[h.workoutId]) grouped[h.workoutId] = []; grouped[h.workoutId].push(h); });
    return (
      <div style={base}>
        <div style={{ padding: "52px 18px 16px", display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => { setView("home"); setPendingDelete(null); }} style={{ background: "none", border: "none", color: t2, cursor: "pointer", fontFamily: DF, fontSize: 13, padding: 0 }}>← Back</button>
          <div style={{ fontFamily: BF, fontSize: 32, fontWeight: 900, letterSpacing: -0.5, color: t1 }}>HISTORY</div>
        </div>
        {history.length === 0 ? (
          <div style={{ padding: 48, textAlign: "center", color: t2, fontSize: 13, lineHeight: 1.8 }}>No workouts yet.<br />Start your first session!</div>
        ) : (
          <div style={{ paddingBottom: 48 }}>
            {allDefs.map(w => {
              const sessions = grouped[w.id] || [];
              if (!sessions.length) return null;
              return (
                <div key={w.id} style={{ marginBottom: 8 }}>
                  <div style={{ padding: "14px 18px 10px", fontFamily: BF, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: w.color, borderTop: `1px solid ${bdr}`, display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: w.color }} />
                    {w.name} — {sessions.length} session{sessions.length !== 1 ? "s" : ""}
                  </div>
                  {sessions.map(s => {
                    const exIds = Object.keys(s.sets || {}).filter(id => (s.sets[id] || []).length > 0);
                    const isOpen = expandedHistory === s.id;
                    const isPDel = pendingDelete === s.id;
                    return (
                      <div key={s.id}>
                        <div style={{ background: card, margin: "0 12px 8px", borderRadius: 14, overflow: "hidden", border: `1.5px solid ${isPDel ? "#FCA5A5" : bdr}`, boxShadow: shad }}>
                          <div onClick={() => { setExpandedHistory(isOpen ? null : s.id); setPendingDelete(null); }} style={{ padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ width: 3, height: 38, background: w.color, borderRadius: 2, flexShrink: 0 }} />
                              <div>
                                <div style={{ fontSize: 13, fontWeight: 500, color: t1 }}>{fmtDate(s.date)}</div>
                                <div style={{ fontSize: 10, color: t2, marginTop: 2 }}>{s.durationMins}m · {exIds.length} exercises · {s.totalSets} sets</div>
                              </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ textAlign: "right" }}>
                                <div style={{ fontFamily: BF, fontSize: 24, fontWeight: 800, color: w.color, lineHeight: 1 }}>{s.totalSets}</div>
                                <div style={{ fontSize: 9, color: t2, letterSpacing: 1 }}>SETS</div>
                              </div>
                              <div style={{ color: "#CCCCDD", fontSize: 10 }}>{isOpen ? "▲" : "▼"}</div>
                            </div>
                          </div>
                          <div style={{ borderTop: `1px solid ${bdr}`, padding: "8px 14px", display: "flex", justifyContent: "flex-end" }}>
                            <button onClick={(e) => { e.stopPropagation(); deleteWorkout(s.id); }} style={{ background: isPDel ? "#EF4444" : "#FEF2F2", color: isPDel ? "#fff" : "#EF4444", border: `1px solid ${isPDel ? "#EF4444" : "#FECACA"}`, borderRadius: 7, padding: "5px 12px", cursor: "pointer", fontFamily: BF, fontSize: 11, fontWeight: 700, letterSpacing: 1, transition: "all 0.15s" }}>
                              {isPDel ? "TAP TO CONFIRM DELETE" : "🗑 DELETE"}
                            </button>
                          </div>
                          {isOpen && (
                            <div style={{ padding: "12px 14px 14px", borderTop: `1px solid ${bdr}`, background: "#FAFAFD" }}>
                              {exIds.map(exId => {
                                const name = (s.exerciseNames || {})[exId] || ALL_EXERCISES.find(e => e.id === exId)?.name || exId;
                                const sets = s.sets[exId] || [];
                                return (
                                  <div key={exId} style={{ marginBottom: 12 }}>
                                    <div style={{ fontSize: 11, color: t2, fontWeight: 600, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>{name}</div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                                      {sets.map((set, i) => (
                                        <div key={i} style={{ background: w.colorLight || "#EDE9FE", border: `1px solid ${w.color}44`, borderRadius: 6, padding: "4px 9px", fontSize: 11, color: w.color, fontWeight: 500 }}>
                                          <span style={{ opacity: 0.6, fontSize: 9 }}>#{i + 1} </span>
                                          {set.sec ? `${set.sec}s` : `${set.w ? `${set.w} lbs × ` : ""}${set.reps} reps`}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
