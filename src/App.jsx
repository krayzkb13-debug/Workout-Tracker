import { useState, useEffect } from "react";

const WORKOUTS = [
  {
    id: "legs", day: "01", name: "Legs & Abs", color: "#F59E0B", colorLight: "#FEF3C7",
    exercises: [
      { id: "legpress", name: "Leg Press Machine", category: "Legs" },
      { id: "glute-squats", name: "Cable Glute Squats", category: "Legs" },
      { id: "lying-leg-press", name: "Lying Leg Press", category: "Legs" },
      { id: "rdl", name: "Romanian Dumbbell Deadlift", category: "Legs" },
      { id: "hamstring-leg-curl", name: "Hamstring Leg Curl", category: "Legs" },
      { id: "seated-leg-curl", name: "Seated Leg Curl", category: "Legs" },
      { id: "leg-ext", name: "Leg Extension", category: "Legs" },
      { id: "adductor", name: "Adductor Machine", category: "Legs" },
      { id: "abductor", name: "Abductor Machine", category: "Legs" },
      { id: "standing-calf", name: "Standing Calf Raise", category: "Calves" },
      { id: "seated-calf", name: "Seated Calf Raise", category: "Calves" },
      { id: "cable-crunch", name: "Cable Crunches", category: "Abs" },
      { id: "plank", name: "Plank", category: "Abs", isTime: true },
      { id: "flutterkicks", name: "Flutter Kicks", category: "Abs" },
      { id: "legraise", name: "Lying Leg Lifts", category: "Abs" },
      { id: "in-and-outs", name: "Slow Alternating In and Outs", category: "Abs" },
    ]
  },
  {
    id: "back", day: "02", name: "Back", color: "#3B82F6", colorLight: "#DBEAFE",
    exercises: [
      { id: "lat-pulldown", name: "Lat Pulldown", category: "Lats" },
      { id: "wide-pulldown", name: "Wide Grip Pulldown", category: "Lats" },
      { id: "close-grip-pulldown", name: "Close Grip Pulldown", category: "Lats" },
      { id: "straight-arm-pulldown", name: "Straight-Arm Cable Pulldown", category: "Lats" },
      { id: "bb-bent-row", name: "Barbell Bent-Over Row", category: "Mid Back" },
      { id: "db-row", name: "Dumbbell Row", category: "Mid Back" },
      { id: "tbar-row", name: "T-Bar Row", category: "Mid Back" },
      { id: "seated-cable-row", name: "Seated Cable Row (Wide)", category: "Mid Back" },
      { id: "seated-cable-row-close", name: "Seated Cable Row (Close)", category: "Mid Back" },
      { id: "machine-row", name: "Chest-Supported Machine Row", category: "Mid Back" },
      { id: "face-pull", name: "Face Pulls", category: "Mid Back" },
      { id: "bb-shrug", name: "Barbell Shrugs", category: "Traps" },
      { id: "db-shrug", name: "Dumbbell Shrugs", category: "Traps" },
      { id: "cable-shrug", name: "Cable Shrugs", category: "Traps" },
    ]
  },
  {
    id: "arms", day: "03", name: "Arms", color: "#10B981", colorLight: "#D1FAE5",
    exercises: [
      { id: "bb-curl", name: "Barbell Curl", category: "Biceps" },
      { id: "ez-curl", name: "EZ Bar Curl", category: "Biceps" },
      { id: "alt-db-curl", name: "Alternating Dumbbell Curl", category: "Biceps" },
      { id: "hammer-curl", name: "Hammer Curl", category: "Biceps" },
      { id: "zottman-curl", name: "Zottman Curl", category: "Biceps" },
      { id: "incline-db-curl", name: "Incline Dumbbell Curl", category: "Biceps" },
      { id: "preacher-curl", name: "Preacher Curl", category: "Biceps" },
      { id: "cable-curl", name: "Cable Curl", category: "Biceps" },
      { id: "concentration-curl", name: "Concentration Curl", category: "Biceps" },
      { id: "tricep-bar-pd", name: "Tricep Pushdown (Bar)", category: "Triceps" },
      { id: "tricep-rope-pd", name: "Tricep Pushdown (Rope)", category: "Triceps" },
      { id: "skull-crusher", name: "Skull Crushers (EZ Bar)", category: "Triceps" },
      { id: "oh-db-ext", name: "Overhead DB Extension", category: "Triceps" },
      { id: "oh-cable-ext", name: "Overhead Cable Extension", category: "Triceps" },
      { id: "close-grip-bench", name: "Close Grip Bench Press", category: "Triceps" },
      { id: "tricep-dips", name: "Tricep Dips", category: "Triceps" },
    ]
  },
  {
    id: "chest", day: "04", name: "Chest & Shoulders", color: "#EF4444", colorLight: "#FEE2E2",
    exercises: [
      { id: "flat-bb", name: "Flat Barbell Bench Press", category: "Chest" },
      { id: "incline-bb", name: "Incline Barbell Bench Press", category: "Chest" },
      { id: "chestpress-mch", name: "Chest Press Machine", category: "Chest" },
      { id: "incline-db-press", name: "Incline Dumbbell Press", category: "Chest" },
      { id: "flat-db-press", name: "Flat Dumbbell Press", category: "Chest" },
      { id: "cable-fly-low", name: "Cable Fly (Low to High)", category: "Chest" },
      { id: "cable-fly-high", name: "Cable Fly (High to Low)", category: "Chest" },
      { id: "pec-deck", name: "Pec Deck / Machine Fly", category: "Chest" },
      { id: "bb-ohp", name: "Barbell Overhead Press", category: "Shoulders" },
      { id: "db-ohp", name: "Dumbbell Shoulder Press", category: "Shoulders" },
      { id: "arnold-press", name: "Arnold Press", category: "Shoulders" },
      { id: "db-lat-raise", name: "Dumbbell Lateral Raises", category: "Shoulders" },
      { id: "cable-lat-raise", name: "Cable Lateral Raise", category: "Shoulders" },
      { id: "db-front-raise", name: "Front Raises", category: "Shoulders" },
      { id: "rear-delt-fly", name: "Rear Delt Dumbbell Fly", category: "Shoulders" },
      { id: "rev-pec-deck", name: "Reverse Pec Deck", category: "Shoulders" },
    ]
  }
];

const DEFAULT_SETS = 4;

export default function WorkoutTracker() {
  const [view, setView] = useState("home");
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [history, setHistory] = useState([]);
  const [customExercises, setCustomExercises] = useState({});
  const [currentSets, setCurrentSets] = useState({});
  const [inputs, setInputs] = useState({});
  const [extraSets, setExtraSets] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expandedHistory, setExpandedHistory] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [editList, setEditList] = useState([]);
  const [newExName, setNewExName] = useState("");
  const [newExCat, setNewExCat] = useState("");
  const [newExIsTime, setNewExIsTime] = useState(false);
  const [addError, setAddError] = useState("");
  const [quickAddName, setQuickAddName] = useState("");
  const [quickAddIsTime, setQuickAddIsTime] = useState(false);
  const [adHocExercises, setAdHocExercises] = useState([]);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch {} };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const r1 = await window.storage.get("wt-v3");
        if (r1) setHistory(JSON.parse(r1.value));
        const r2 = await window.storage.get("wt-custom-v1");
        if (r2) setCustomExercises(JSON.parse(r2.value));
      } catch {}
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (view !== "workout" || !startTime) return;
    const iv = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(iv);
  }, [view, startTime]);

  const saveHistory = async (h) => { try { await window.storage.set("wt-v3", JSON.stringify(h.slice(0, 200))); } catch {} };
  const saveCustom = async (c) => { try { await window.storage.set("wt-custom-v1", JSON.stringify(c)); } catch {} };
  const getExercises = (wid) => customExercises[wid] || WORKOUTS.find(w => w.id === wid)?.exercises || [];

  const startWorkout = (w) => {
    setActiveWorkout(w); setCurrentSets({}); setInputs({}); setExtraSets({});
    setAdHocExercises([]); setQuickAddName(""); setQuickAddIsTime(false);
    setStartTime(Date.now()); setElapsed(0); setView("workout");
  };

  const submitQuickAdd = () => {
    if (!quickAddName.trim()) return;
    const ex = { id: `adhoc-${Date.now()}`, name: quickAddName.trim(), category: "Extra", isTime: quickAddIsTime, custom: true };
    setAdHocExercises(p => [...p, ex]);
    setQuickAddName(""); setQuickAddIsTime(false);
  };

  const openEdit = (w) => {
    setEditingWorkout(w); setEditList([...getExercises(w.id)]);
    setNewExName(""); setNewExCat(""); setNewExIsTime(false); setAddError("");
    setView("edit");
  };

  const setInput = (exId, setIdx, field, val) =>
    setInputs(p => ({ ...p, [exId]: { ...(p[exId] || {}), [setIdx]: { ...((p[exId] || {})[setIdx] || {}), [field]: val } } }));

  const logSet = (ex, setIdx) => {
    const inp = ((inputs[ex.id] || {})[setIdx]) || {};
    if (ex.isTime ? !inp.sec : !inp.reps) return;
    const s = { w: inp.w || null, reps: inp.reps || null, sec: inp.sec || null };
    setCurrentSets(p => { const arr = [...(p[ex.id] || [])]; arr[setIdx] = s; return { ...p, [ex.id]: arr }; });
  };

  const unlogSet = (exId, setIdx) =>
    setCurrentSets(p => { const arr = [...(p[exId] || [])]; arr[setIdx] = null; return { ...p, [exId]: arr }; });

  const addExtraSet = (exId) =>
    setExtraSets(p => ({ ...p, [exId]: (p[exId] || 0) + 1 }));

  const finishWorkout = () => {
    const allSets = {};
    let total = 0;
    Object.entries(currentSets).forEach(([exId, arr]) => {
      const valid = arr.filter(Boolean);
      if (valid.length) { allSets[exId] = valid; total += valid.length; }
    });
    if (total > 0) {
      const entry = {
        id: Date.now(), workoutId: activeWorkout.id,
        workoutName: activeWorkout.name, workoutColor: activeWorkout.color,
        date: new Date().toISOString(), durationMins: Math.round(elapsed / 60),
        sets: allSets, totalSets: total,
      };
      const nh = [entry, ...history];
      setHistory(nh); saveHistory(nh);
    }
    setView("home");
  };

  const deleteWorkout = (id) => {
    if (pendingDelete === id) {
      const nh = history.filter(h => h.id !== id);
      setHistory(nh); saveHistory(nh); setPendingDelete(null);
    } else {
      setPendingDelete(id);
    }
  };

  const saveEdit = () => {
    const updated = { ...customExercises, [editingWorkout.id]: editList };
    setCustomExercises(updated); saveCustom(updated); setView("home");
  };

  const addExercise = () => {
    if (!newExName.trim()) { setAddError("Enter an exercise name."); return; }
    if (!newExCat.trim()) { setAddError("Enter a category."); return; }
    setEditList(p => [...p, { id: `custom-${Date.now()}`, name: newExName.trim(), category: newExCat.trim(), isTime: newExIsTime, custom: true }]);
    setNewExName(""); setNewExCat(""); setNewExIsTime(false); setAddError("");
  };

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const fmtDate = (iso) => new Date(iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const getLast = (wid) => history.find(h => h.workoutId === wid);
  const totalNow = Object.values(currentSets).reduce((s, a) => s + (a || []).filter(Boolean).length, 0);

  const BF = "'Barlow Condensed', sans-serif";
  const DF = "'DM Sans', system-ui, sans-serif";
  const bg = "#F4F5FB";
  const cardBg = "#FFFFFF";
  const border = "#E8E8F2";
  const textPrimary = "#111128";
  const textSecondary = "#6B7080";
  const shadow = "0 2px 12px rgba(0,0,30,0.07)";
  const base = { background: bg, minHeight: "100vh", color: textPrimary, fontFamily: DF };

  const inputStyle = {
    padding: "8px 10px", background: "#F8F8FC", border: `1.5px solid ${border}`,
    borderRadius: 8, color: textPrimary, fontSize: 14, fontFamily: DF,
    outline: "none", width: "100%", boxSizing: "border-box",
  };

  if (loading) return <div style={{ ...base, display: "flex", alignItems: "center", justifyContent: "center", color: textSecondary, fontSize: 13 }}>Loading...</div>;

  if (view === "home") return (
    <div style={base}>
      <div style={{ padding: "32px 18px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ fontFamily: BF, fontSize: 11, letterSpacing: 4, color: "#AAAACC", textTransform: "uppercase", marginBottom: 4 }}>YOUR PROGRAM</div>
          <div style={{ fontFamily: BF, fontSize: 42, fontWeight: 900, lineHeight: 0.92, letterSpacing: -1, color: textPrimary }}>WORKOUT<br />TRACKER</div>
        </div>
        <button onClick={() => setView("history")} style={{ background: cardBg, border: `1.5px solid ${border}`, borderRadius: 12, padding: "9px 16px", color: textSecondary, fontSize: 11, cursor: "pointer", fontFamily: BF, letterSpacing: 2, textTransform: "uppercase", boxShadow: shadow }}>History</button>
      </div>
      <div style={{ padding: "22px 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {WORKOUTS.map((w) => {
          const last = getLast(w.id);
          const exList = getExercises(w.id);
          const cats = [...new Set(exList.map(e => e.category))];
          return (
            <div key={w.id} style={{ background: cardBg, border: `1.5px solid ${border}`, borderRadius: 20, overflow: "hidden", boxShadow: shadow, position: "relative" }}>
              <div style={{ background: w.color, height: 6 }} />
              <button onClick={(e) => { e.stopPropagation(); openEdit(w); }} style={{ position: "absolute", top: 16, right: 10, background: "rgba(255,255,255,0.9)", border: `1px solid ${border}`, borderRadius: 6, padding: "3px 7px", cursor: "pointer", fontFamily: BF, fontSize: 9, letterSpacing: 1, color: textSecondary, textTransform: "uppercase" }}>✎ Edit</button>
              <div style={{ padding: "14px 14px 16px" }} onClick={() => startWorkout(w)}>
                <div style={{ fontFamily: BF, fontSize: 10, letterSpacing: 3, color: "#AAAACC", textTransform: "uppercase", marginBottom: 4 }}>DAY {w.day}</div>
                <div style={{ fontFamily: BF, fontSize: 20, fontWeight: 800, lineHeight: 1.1, marginBottom: 10, color: textPrimary }}>{w.name.toUpperCase()}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
                  {cats.map(c => <span key={c} style={{ fontSize: 8, padding: "3px 6px", background: w.colorLight, borderRadius: 4, color: w.color, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>{c}</span>)}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 10, color: textSecondary }}>{last ? `Last: ${fmtDate(last.date)}` : `${exList.length} exercises`}</div>
                  <div style={{ background: w.color, color: "#fff", fontFamily: BF, fontSize: 11, fontWeight: 800, letterSpacing: 1, padding: "5px 12px", borderRadius: 7 }}>START</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {history.length > 0 && (
        <div style={{ padding: "0 18px 40px" }}>
          <div style={{ fontFamily: BF, fontSize: 10, letterSpacing: 3, color: "#AAAACC", textTransform: "uppercase", marginBottom: 12 }}>RECENT</div>
          {history.slice(0, 4).map(h => (
            <div key={h.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 4, height: 36, background: h.workoutColor, borderRadius: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: textPrimary }}>{h.workoutName}</div>
                  <div style={{ fontSize: 10, color: textSecondary, marginTop: 1 }}>{fmtDate(h.date)} · {h.durationMins}m</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: BF, fontSize: 22, fontWeight: 800, color: h.workoutColor, lineHeight: 1 }}>{h.totalSets}</div>
                <div style={{ fontSize: 9, color: textSecondary, letterSpacing: 1 }}>SETS</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (view === "edit") {
    const w = editingWorkout;
    const cats = [...new Set(editList.map(e => e.category))];
    const defaultCats = [...new Set(WORKOUTS.find(dw => dw.id === w.id).exercises.map(e => e.category))];
    return (
      <div style={base}>
        <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(244,245,251,0.97)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${border}`, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => setView("home")} style={{ background: "none", border: "none", color: textSecondary, cursor: "pointer", fontFamily: DF, fontSize: 13, padding: 0 }}>✕ Cancel</button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: BF, fontSize: 16, fontWeight: 800, color: w.color, letterSpacing: 1 }}>EDIT · {w.name.toUpperCase()}</div>
            <div style={{ fontSize: 10, color: textSecondary }}>{editList.length} exercises</div>
          </div>
          <button onClick={saveEdit} style={{ background: w.color, color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontFamily: BF, fontSize: 12, fontWeight: 800, letterSpacing: 1, cursor: "pointer" }}>SAVE</button>
        </div>
        <div style={{ paddingBottom: 80 }}>
          {cats.map(cat => (
            <div key={cat}>
              <div style={{ padding: "14px 16px 8px", fontFamily: BF, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: w.color }}>{cat}</div>
              {editList.filter(e => e.category === cat).map(ex => (
                <div key={ex.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: `1px solid ${border}`, background: cardBg }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: textPrimary }}>{ex.name}</div>
                    {ex.isTime && <div style={{ fontSize: 10, color: textSecondary, marginTop: 2 }}>Time-based</div>}
                    {ex.custom && <div style={{ fontSize: 9, color: w.color, marginTop: 2, letterSpacing: 1 }}>CUSTOM</div>}
                  </div>
                  <button onClick={() => setEditList(p => p.filter(e => e.id !== ex.id))} style={{ background: "#FEE2E2", border: "1px solid #FECACA", borderRadius: 7, padding: "5px 10px", cursor: "pointer", color: "#EF4444", fontFamily: BF, fontSize: 11, letterSpacing: 1, flexShrink: 0 }}>REMOVE</button>
                </div>
              ))}
            </div>
          ))}
          {editList.length === 0 && <div style={{ padding: "24px 16px", fontSize: 13, color: textSecondary, textAlign: "center" }}>All exercises removed. Add some below or reset.</div>}
          <div style={{ padding: "16px 16px 4px", textAlign: "center" }}>
            <button onClick={() => setEditList([...WORKOUTS.find(dw => dw.id === w.id).exercises])} style={{ background: "none", border: `1.5px solid ${border}`, borderRadius: 8, padding: "8px 16px", cursor: "pointer", color: textSecondary, fontFamily: BF, fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>↺ Reset to Defaults</button>
          </div>
          <div style={{ margin: "20px 16px 0", background: cardBg, border: `1.5px solid ${border}`, borderRadius: 16, padding: "18px 14px", boxShadow: shadow }}>
            <div style={{ fontFamily: BF, fontSize: 13, fontWeight: 700, letterSpacing: 2, color: w.color, textTransform: "uppercase", marginBottom: 14 }}>+ Add Exercise</div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, color: textSecondary, letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 }}>Exercise Name</div>
              <input value={newExName} onChange={e => { setNewExName(e.target.value); setAddError(""); }} placeholder="e.g. Smith Machine Squat" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, color: textSecondary, letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 }}>Category</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                {defaultCats.map(c => <button key={c} onClick={() => { setNewExCat(c); setAddError(""); }} style={{ padding: "4px 10px", background: newExCat === c ? w.color : "#F0F0F8", color: newExCat === c ? "#fff" : textSecondary, border: `1.5px solid ${newExCat === c ? w.color : border}`, borderRadius: 6, cursor: "pointer", fontFamily: BF, fontSize: 11, letterSpacing: 1 }}>{c}</button>)}
              </div>
              <input value={newExCat} onChange={e => { setNewExCat(e.target.value); setAddError(""); }} placeholder="Or type a custom category" style={inputStyle} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div onClick={() => setNewExIsTime(p => !p)} style={{ width: 36, height: 20, borderRadius: 10, cursor: "pointer", background: newExIsTime ? w.color : "#E0E0F0", position: "relative", transition: "all 0.2s" }}>
                <div style={{ position: "absolute", top: 2, left: newExIsTime ? 16 : 2, width: 14, height: 14, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
              </div>
              <div style={{ fontSize: 12, color: textSecondary }}>Time-based (seconds instead of reps)</div>
            </div>
            {addError && <div style={{ fontSize: 11, color: "#EF4444", marginBottom: 10 }}>{addError}</div>}
            <button onClick={addExercise} style={{ width: "100%", padding: "11px", background: newExName && newExCat ? w.color : "#E8E8F2", color: newExName && newExCat ? "#fff" : "#AAAACC", border: "none", borderRadius: 9, cursor: "pointer", fontFamily: BF, fontSize: 13, fontWeight: 800, letterSpacing: 1 }}>+ ADD TO WORKOUT</button>
          </div>
        </div>
      </div>
    );
  }

  if (view === "workout") {
    const w = activeWorkout;
    const exercises = getExercises(w.id);
    const cats = [...new Set(exercises.map(e => e.category))];
    return (
      <div style={base}>
        <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(244,245,251,0.97)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${border}`, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => setView("home")} style={{ background: "none", border: "none", color: textSecondary, cursor: "pointer", fontFamily: DF, fontSize: 13, padding: 0 }}>← Back</button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: BF, fontSize: 17, fontWeight: 800, color: w.color, letterSpacing: 1 }}>{w.name.toUpperCase()}</div>
            <div style={{ fontSize: 11, color: textSecondary, marginTop: 1 }}>
              <span style={{ color: textPrimary, fontFamily: BF, fontWeight: 700 }}>{fmt(elapsed)}</span>
              &nbsp;·&nbsp;{totalNow} set{totalNow !== 1 ? "s" : ""} logged
            </div>
          </div>
          <button onClick={finishWorkout} style={{ background: w.color, color: "#fff", border: "none", borderRadius: 8, padding: "7px 13px", fontFamily: BF, fontSize: 12, fontWeight: 800, letterSpacing: 1, cursor: "pointer" }}>DONE</button>
        </div>
        <div style={{ paddingBottom: 60 }}>
          {cats.map(cat => (
            <div key={cat}>
              <div style={{ padding: "18px 16px 8px", fontFamily: BF, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: w.color }}>{cat}</div>
              {exercises.filter(e => e.category === cat).map(ex => {
                const sets = currentSets[ex.id] || [];
                const loggedCount = sets.filter(Boolean).length;
                const total = DEFAULT_SETS + (extraSets[ex.id] || 0);
                const allDone = loggedCount === total;
                return (
                  <div key={ex.id} style={{ background: cardBg, margin: "0 12px 10px", borderRadius: 14, overflow: "hidden", boxShadow: allDone ? `0 2px 12px ${w.color}33` : shadow, border: allDone ? `1.5px solid ${w.color}66` : `1.5px solid ${border}` }}>
                    <div style={{ padding: "12px 14px 10px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${border}` }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: textPrimary }}>{ex.name}</div>
                        {ex.custom && <div style={{ fontSize: 9, color: w.color, letterSpacing: 1 }}>CUSTOM</div>}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {allDone && <div style={{ fontSize: 10, color: w.color, fontFamily: BF, fontWeight: 700, letterSpacing: 1 }}>✓ DONE</div>}
                        <div style={{ fontFamily: BF, fontSize: 13, fontWeight: 700, color: loggedCount > 0 ? w.color : "#CCCCDD" }}>{loggedCount}/{total}</div>
                      </div>
                    </div>
                    {Array.from({ length: total }).map((_, setIdx) => {
                      const logged = sets[setIdx];
                      const inp = ((inputs[ex.id] || {})[setIdx]) || {};
                      const canLog = ex.isTime ? !!inp.sec : !!inp.reps;
                      return (
                        <div key={setIdx} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderBottom: setIdx < total - 1 ? `1px solid ${border}` : "none", background: logged ? w.colorLight : "transparent", transition: "background 0.2s" }}>
                          <div style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: BF, fontSize: 12, fontWeight: 800, background: logged ? w.color : "#F0F0F8", color: logged ? "#fff" : "#AAAACC" }}>{setIdx + 1}</div>
                          {logged ? (
                            <>
                              <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: textPrimary }}>{ex.isTime ? `${logged.sec} sec` : `${logged.w ? `${logged.w} lbs  ×  ` : ""}${logged.reps} reps`}</div>
                              <button onClick={() => unlogSet(ex.id, setIdx)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: w.color, padding: "2px 6px" }}>✕</button>
                            </>
                          ) : (
                            <>
                              {!ex.isTime && <input type="number" placeholder="lbs" value={inp.w || ""} onChange={e => setInput(ex.id, setIdx, "w", e.target.value)} style={{ width: 58, padding: "7px 8px", background: "#F4F5FB", border: `1.5px solid ${border}`, borderRadius: 8, color: textPrimary, fontSize: 13, fontFamily: DF, outline: "none" }} />}
                              <input type="number" placeholder={ex.isTime ? "sec" : "reps"} value={ex.isTime ? (inp.sec || "") : (inp.reps || "")} onChange={e => setInput(ex.id, setIdx, ex.isTime ? "sec" : "reps", e.target.value)} style={{ width: ex.isTime ? undefined : 58, flex: ex.isTime ? 1 : undefined, padding: "7px 8px", background: "#F4F5FB", border: `1.5px solid ${border}`, borderRadius: 8, color: textPrimary, fontSize: 13, fontFamily: DF, outline: "none" }} />
                              <button onClick={() => logSet(ex, setIdx)} style={{ flex: ex.isTime ? undefined : 1, padding: "7px 10px", background: canLog ? w.color : "#F0F0F8", color: canLog ? "#fff" : "#CCCCDD", border: "none", borderRadius: 8, cursor: canLog ? "pointer" : "default", fontFamily: BF, fontWeight: 800, fontSize: 12, letterSpacing: 1, transition: "all 0.15s", whiteSpace: "nowrap" }}>LOG</button>
                            </>
                          )}
                        </div>
                      );
                    })}
                    <button onClick={() => addExtraSet(ex.id)} style={{ width: "100%", padding: "8px", background: "none", border: "none", color: w.color, fontFamily: BF, fontSize: 11, fontWeight: 700, letterSpacing: 1, cursor: "pointer", borderTop: `1px dashed ${border}` }}>+ ADD SET</button>
                  </div>
                );
              })}
            </div>
          ))}

          {/* Ad-hoc exercises added during this session */}
          {adHocExercises.length > 0 && (
            <div>
              <div style={{ padding: "18px 16px 8px", fontFamily: BF, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: w.color }}>ADDED THIS SESSION</div>
              {adHocExercises.map(ex => {
                const sets = currentSets[ex.id] || [];
                const loggedCount = sets.filter(Boolean).length;
                const total = DEFAULT_SETS + (extraSets[ex.id] || 0);
                const allDone = loggedCount === total;
                return (
                  <div key={ex.id} style={{ background: cardBg, margin: "0 12px 10px", borderRadius: 14, overflow: "hidden", boxShadow: allDone ? `0 2px 12px ${w.color}33` : shadow, border: allDone ? `1.5px solid ${w.color}66` : `1.5px solid ${border}` }}>
                    <div style={{ padding: "12px 14px 10px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${border}` }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: textPrimary }}>{ex.name}</div>
                        <div style={{ fontSize: 9, color: w.color, letterSpacing: 1, marginTop: 1 }}>CUSTOM</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {allDone && <div style={{ fontSize: 10, color: w.color, fontFamily: BF, fontWeight: 700, letterSpacing: 1 }}>✓ DONE</div>}
                        <div style={{ fontFamily: BF, fontSize: 13, fontWeight: 700, color: loggedCount > 0 ? w.color : "#CCCCDD" }}>{loggedCount}/{total}</div>
                      </div>
                    </div>
                    {Array.from({ length: total }).map((_, setIdx) => {
                      const logged = sets[setIdx];
                      const inp = ((inputs[ex.id] || {})[setIdx]) || {};
                      const canLog = ex.isTime ? !!inp.sec : !!inp.reps;
                      return (
                        <div key={setIdx} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderBottom: setIdx < total - 1 ? `1px solid ${border}` : "none", background: logged ? w.colorLight : "transparent", transition: "background 0.2s" }}>
                          <div style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: BF, fontSize: 12, fontWeight: 800, background: logged ? w.color : "#F0F0F8", color: logged ? "#fff" : "#AAAACC" }}>{setIdx + 1}</div>
                          {logged ? (
                            <>
                              <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: textPrimary }}>{ex.isTime ? `${logged.sec} sec` : `${logged.w ? `${logged.w} lbs  ×  ` : ""}${logged.reps} reps`}</div>
                              <button onClick={() => unlogSet(ex.id, setIdx)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: w.color, padding: "2px 6px" }}>✕</button>
                            </>
                          ) : (
                            <>
                              {!ex.isTime && <input type="number" placeholder="lbs" value={inp.w || ""} onChange={e => setInput(ex.id, setIdx, "w", e.target.value)} style={{ width: 58, padding: "7px 8px", background: "#F4F5FB", border: `1.5px solid ${border}`, borderRadius: 8, color: textPrimary, fontSize: 13, fontFamily: DF, outline: "none" }} />}
                              <input type="number" placeholder={ex.isTime ? "sec" : "reps"} value={ex.isTime ? (inp.sec || "") : (inp.reps || "")} onChange={e => setInput(ex.id, setIdx, ex.isTime ? "sec" : "reps", e.target.value)} style={{ width: ex.isTime ? undefined : 58, flex: ex.isTime ? 1 : undefined, padding: "7px 8px", background: "#F4F5FB", border: `1.5px solid ${border}`, borderRadius: 8, color: textPrimary, fontSize: 13, fontFamily: DF, outline: "none" }} />
                              <button onClick={() => logSet(ex, setIdx)} style={{ flex: ex.isTime ? undefined : 1, padding: "7px 10px", background: canLog ? w.color : "#F0F0F8", color: canLog ? "#fff" : "#CCCCDD", border: "none", borderRadius: 8, cursor: canLog ? "pointer" : "default", fontFamily: BF, fontWeight: 800, fontSize: 12, letterSpacing: 1, transition: "all 0.15s", whiteSpace: "nowrap" }}>LOG</button>
                            </>
                          )}
                        </div>
                      );
                    })}
                    <button onClick={() => addExtraSet(ex.id)} style={{ width: "100%", padding: "8px", background: "none", border: "none", color: w.color, fontFamily: BF, fontSize: 11, fontWeight: 700, letterSpacing: 1, cursor: "pointer", borderTop: `1px dashed ${border}` }}>+ ADD SET</button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick-add an exercise on the fly */}
          <div style={{ margin: "16px 12px 32px", background: cardBg, border: `1.5px dashed ${border}`, borderRadius: 16, padding: "16px 14px" }}>
            <div style={{ fontFamily: BF, fontSize: 12, fontWeight: 700, letterSpacing: 2, color: w.color, textTransform: "uppercase", marginBottom: 12 }}>+ ADD AN EXERCISE</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
              <input
                value={quickAddName}
                onChange={e => setQuickAddName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && submitQuickAdd()}
                placeholder="Exercise name..."
                style={{ flex: 1, padding: "9px 12px", background: "#F4F5FB", border: `1.5px solid ${border}`, borderRadius: 9, color: textPrimary, fontSize: 13, fontFamily: DF, outline: "none" }}
              />
              <button onClick={submitQuickAdd} style={{
                padding: "9px 16px", background: quickAddName.trim() ? w.color : "#F0F0F8",
                color: quickAddName.trim() ? "#fff" : "#CCCCDD",
                border: "none", borderRadius: 9, cursor: quickAddName.trim() ? "pointer" : "default",
                fontFamily: BF, fontSize: 13, fontWeight: 800, letterSpacing: 1,
                transition: "all 0.15s", whiteSpace: "nowrap",
              }}>ADD</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div onClick={() => setQuickAddIsTime(p => !p)} style={{ width: 32, height: 18, borderRadius: 9, cursor: "pointer", background: quickAddIsTime ? w.color : "#E0E0F0", position: "relative", transition: "all 0.2s", flexShrink: 0 }}>
                <div style={{ position: "absolute", top: 2, left: quickAddIsTime ? 13 : 2, width: 13, height: 13, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
              </div>
              <div style={{ fontSize: 11, color: textSecondary }}>Time-based (track seconds)</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "history") {
    const grouped = {};
    history.forEach(h => { if (!grouped[h.workoutId]) grouped[h.workoutId] = []; grouped[h.workoutId].push(h); });
    return (
      <div style={base}>
        <div style={{ padding: "28px 18px 16px", display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => { setView("home"); setPendingDelete(null); }} style={{ background: "none", border: "none", color: textSecondary, cursor: "pointer", fontFamily: DF, fontSize: 13, padding: 0 }}>← Back</button>
          <div style={{ fontFamily: BF, fontSize: 32, fontWeight: 900, letterSpacing: -0.5, color: textPrimary }}>HISTORY</div>
        </div>
        {history.length === 0 ? (
          <div style={{ padding: 48, textAlign: "center", color: textSecondary, fontSize: 13, lineHeight: 1.8 }}>No workouts logged yet.<br />Start your first session!</div>
        ) : (
          <div style={{ paddingBottom: 48 }}>
            {WORKOUTS.map(w => {
              const sessions = grouped[w.id] || [];
              if (!sessions.length) return null;
              return (
                <div key={w.id} style={{ marginBottom: 8 }}>
                  <div style={{ padding: "14px 18px 10px", fontFamily: BF, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: w.color, borderTop: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: w.color }} />
                    {w.name} ({sessions.length} sessions)
                  </div>
                  {sessions.map(s => {
                    const exIds = Object.keys(s.sets || {}).filter(id => (s.sets[id] || []).length > 0);
                    const isOpen = expandedHistory === s.id;
                    const isPendingDel = pendingDelete === s.id;
                    return (
                      <div key={s.id}>
                        <div style={{ background: cardBg, margin: "0 12px 8px", borderRadius: 14, overflow: "hidden", border: `1.5px solid ${isPendingDel ? "#FCA5A5" : border}`, boxShadow: shadow }}>
                          <div onClick={() => { setExpandedHistory(isOpen ? null : s.id); setPendingDelete(null); }} style={{ padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ width: 3, height: 38, background: w.color, borderRadius: 2, flexShrink: 0 }} />
                              <div>
                                <div style={{ fontSize: 13, fontWeight: 500, color: textPrimary }}>{fmtDate(s.date)}</div>
                                <div style={{ fontSize: 10, color: textSecondary, marginTop: 2 }}>{s.durationMins}m · {exIds.length} exercises</div>
                              </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ textAlign: "right" }}>
                                <div style={{ fontFamily: BF, fontSize: 24, fontWeight: 800, color: w.color, lineHeight: 1 }}>{s.totalSets}</div>
                                <div style={{ fontSize: 9, color: textSecondary, letterSpacing: 1 }}>SETS</div>
                              </div>
                              <div style={{ color: "#CCCCDD", fontSize: 10 }}>{isOpen ? "▲" : "▼"}</div>
                            </div>
                          </div>
                          <div style={{ borderTop: `1px solid ${border}`, padding: "8px 14px", display: "flex", justifyContent: "flex-end" }}>
                            <button onClick={(e) => { e.stopPropagation(); deleteWorkout(s.id); }} style={{ background: isPendingDel ? "#EF4444" : "#FEF2F2", color: isPendingDel ? "#fff" : "#EF4444", border: `1px solid ${isPendingDel ? "#EF4444" : "#FECACA"}`, borderRadius: 7, padding: "5px 12px", cursor: "pointer", fontFamily: BF, fontSize: 11, fontWeight: 700, letterSpacing: 1, transition: "all 0.15s" }}>
                              {isPendingDel ? "TAP TO CONFIRM DELETE" : "🗑 DELETE"}
                            </button>
                          </div>
                          {isOpen && (
                            <div style={{ padding: "12px 14px 14px", borderTop: `1px solid ${border}`, background: "#FAFAFD" }}>
                              {exIds.map(exId => {
                                const exercise = getExercises(w.id).find(e => e.id === exId);
                                const sets = s.sets[exId] || [];
                                return (
                                  <div key={exId} style={{ marginBottom: 12 }}>
                                    <div style={{ fontSize: 11, color: textSecondary, fontWeight: 600, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>{exercise?.name || exId}</div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                                      {sets.map((set, i) => (
                                        <div key={i} style={{ background: w.colorLight, border: `1px solid ${w.color}44`, borderRadius: 6, padding: "4px 9px", fontSize: 11, color: w.color, fontWeight: 500 }}>
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
