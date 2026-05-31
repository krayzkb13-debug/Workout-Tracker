import { useState, useEffect } from "react";

const WORKOUTS = [
  {
    id: "legs", day: "01", name: "Legs & Abs", color: "#F59E0B",
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
    id: "back", day: "02", name: "Back", color: "#60A5FA",
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
    id: "arms", day: "03", name: "Arms", color: "#34D399",
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
    id: "chest", day: "04", name: "Chest & Shoulders", color: "#F87171",
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

// ── localStorage helpers ──────────────────────────────────────────────────────
const lsGet = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
};
const lsSet = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
};

export default function WorkoutTracker() {
  const [view, setView] = useState("home");
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [history, setHistory] = useState(() => lsGet("wt-history", []));
  const [customExercises, setCustomExercises] = useState(() => lsGet("wt-custom", {}));
  const [currentSets, setCurrentSets] = useState({});
  const [inputs, setInputs] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [expandedHistory, setExpandedHistory] = useState(null);

  // Edit mode state
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [editList, setEditList] = useState([]);
  const [newExName, setNewExName] = useState("");
  const [newExCat, setNewExCat] = useState("");
  const [newExIsTime, setNewExIsTime] = useState(false);
  const [addError, setAddError] = useState("");

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch {} };
  }, []);

  useEffect(() => {
    if (view !== "workout" || !startTime) return;
    const iv = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(iv);
  }, [view, startTime]);

  const saveHistory = (h) => lsSet("wt-history", h.slice(0, 200));
  const saveCustom = (c) => lsSet("wt-custom", c);

  const getExercises = (wid) => {
    const def = WORKOUTS.find(w => w.id === wid)?.exercises || [];
    return customExercises[wid] || def;
  };

  const startWorkout = (w) => {
    setActiveWorkout(w); setCurrentSets({}); setInputs({});
    setStartTime(Date.now()); setElapsed(0); setView("workout");
  };

  const openEdit = (w) => {
    setEditingWorkout(w);
    setEditList([...getExercises(w.id)]);
    setNewExName(""); setNewExCat(""); setNewExIsTime(false); setAddError("");
    setView("edit");
  };

  const removeFromEdit = (id) => setEditList(p => p.filter(e => e.id !== id));

  const addExercise = () => {
    if (!newExName.trim()) { setAddError("Enter an exercise name."); return; }
    if (!newExCat.trim()) { setAddError("Enter a category (e.g. Chest, Legs)."); return; }
    const newEx = {
      id: `custom-${Date.now()}`,
      name: newExName.trim(),
      category: newExCat.trim(),
      isTime: newExIsTime,
      custom: true,
    };
    setEditList(p => [...p, newEx]);
    setNewExName(""); setNewExCat(""); setNewExIsTime(false); setAddError("");
  };

  const saveEdit = () => {
    const updated = { ...customExercises, [editingWorkout.id]: editList };
    setCustomExercises(updated);
    saveCustom(updated);
    setView("home");
  };

  const resetToDefaults = () => {
    setEditList([...WORKOUTS.find(w => w.id === editingWorkout.id).exercises]);
  };

  const setInput = (exId, field, val) =>
    setInputs(p => ({ ...p, [exId]: { ...(p[exId] || {}), [field]: val } }));

  const logSet = (ex) => {
    const inp = inputs[ex.id] || {};
    if (ex.isTime ? !inp.sec : !inp.reps) return;
    const s = { w: inp.w || null, reps: inp.reps || null, sec: inp.sec || null };
    setCurrentSets(p => ({ ...p, [ex.id]: [...(p[ex.id] || []), s] }));
    setInputs(p => ({ ...p, [ex.id]: { w: inp.w || "", reps: "", sec: "" } }));
  };

  const deleteSet = (exId, i) =>
    setCurrentSets(p => ({ ...p, [exId]: (p[exId] || []).filter((_, j) => j !== i) }));

  const finishWorkout = () => {
    const totalSets = Object.values(currentSets).reduce((s, a) => s + a.length, 0);
    if (totalSets > 0) {
      const entry = {
        id: Date.now(), workoutId: activeWorkout.id,
        workoutName: activeWorkout.name, workoutColor: activeWorkout.color,
        date: new Date().toISOString(),
        durationMins: Math.round(elapsed / 60),
        sets: currentSets, totalSets,
      };
      const nh = [entry, ...history];
      setHistory(nh); saveHistory(nh);
    }
    setView("home");
  };

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const fmtDate = (iso) => new Date(iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const getLast = (wid) => history.find(h => h.workoutId === wid);
  const totalNow = Object.values(currentSets).reduce((s, a) => s + a.length, 0);

  const BF = "'Barlow Condensed', sans-serif";
  const DF = "'DM Sans', system-ui, sans-serif";
  const bg = "#080809";
  const base = { background: bg, minHeight: "100vh", color: "#F0F0F5", fontFamily: DF };

  const inputStyle = {
    padding: "9px 10px", background: "#111116", border: "1px solid #222230",
    borderRadius: 8, color: "#E0E0F0", fontSize: 13, fontFamily: DF,
    outline: "none", width: "100%", boxSizing: "border-box",
  };

  // ─── HOME ──────────────────────────────────────────────────────────────────
  if (view === "home") return (
    <div style={base}>
      <div style={{ padding: "48px 18px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ fontFamily: BF, fontSize: 11, letterSpacing: 4, color: "#444", textTransform: "uppercase", marginBottom: 4 }}>YOUR PROGRAM</div>
          <div style={{ fontFamily: BF, fontSize: 40, fontWeight: 900, lineHeight: 0.95, letterSpacing: -1, color: "#F5F5FA" }}>WORKOUT<br />TRACKER</div>
        </div>
        <button onClick={() => setView("history")} style={{
          background: "#111116", border: "1px solid #22222E", borderRadius: 10,
          padding: "8px 14px", color: "#888", fontSize: 11, cursor: "pointer",
          fontFamily: BF, letterSpacing: 2, textTransform: "uppercase",
        }}>History</button>
      </div>

      <div style={{ padding: "24px 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {WORKOUTS.map((w) => {
          const last = getLast(w.id);
          const exList = getExercises(w.id);
          const cats = [...new Set(exList.map(e => e.category))];
          const isCustomized = !!customExercises[w.id];
          return (
            <div key={w.id} style={{
              background: "#0E0E12", border: "1px solid #1C1C24",
              borderRadius: 18, padding: "18px 14px", cursor: "pointer",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: -14, right: 2,
                fontFamily: BF, fontSize: 88, fontWeight: 900, color: w.color,
                opacity: 0.07, lineHeight: 1, userSelect: "none", pointerEvents: "none",
              }}>{w.day}</div>

              <button onClick={(e) => { e.stopPropagation(); openEdit(w); }} style={{
                position: "absolute", top: 10, right: 10,
                background: "#1A1A22", border: "1px solid #28283A",
                borderRadius: 6, padding: "3px 7px", cursor: "pointer",
                fontFamily: BF, fontSize: 9, letterSpacing: 1, color: "#666",
                textTransform: "uppercase",
              }}>✎ Edit</button>

              <div style={{ position: "relative" }} onClick={() => startWorkout(w)}>
                <div style={{ fontFamily: BF, fontSize: 10, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 5 }}>DAY {w.day}</div>
                <div style={{ fontFamily: BF, fontSize: 21, fontWeight: 800, lineHeight: 1.1, marginBottom: 10, color: "#EEEEF5" }}>
                  {w.name.toUpperCase()}
                </div>
                {isCustomized && (
                  <div style={{ fontSize: 9, color: w.color, letterSpacing: 1, marginBottom: 6, opacity: 0.8 }}>✦ CUSTOMIZED</div>
                )}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
                  {cats.map(c => (
                    <span key={c} style={{ fontSize: 8, padding: "2px 5px", background: "#18181E", borderRadius: 4, color: "#555", letterSpacing: 1, textTransform: "uppercase" }}>{c}</span>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 10, color: "#555" }}>
                    {last ? `Last: ${fmtDate(last.date)}` : `${exList.length} exercises`}
                  </div>
                  <div style={{
                    background: w.color, color: "#000",
                    fontFamily: BF, fontSize: 11, fontWeight: 800, letterSpacing: 1,
                    padding: "5px 10px", borderRadius: 6,
                  }}>START</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {history.length > 0 && (
        <div style={{ padding: "0 18px 40px" }}>
          <div style={{ fontFamily: BF, fontSize: 10, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 14 }}>RECENT</div>
          {history.slice(0, 4).map(h => (
            <div key={h.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid #111116" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 3, height: 34, background: h.workoutColor, borderRadius: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#D8D8E8" }}>{h.workoutName}</div>
                  <div style={{ fontSize: 10, color: "#555", marginTop: 1 }}>{fmtDate(h.date)} · {h.durationMins}m</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: BF, fontSize: 20, fontWeight: 800, color: h.workoutColor, lineHeight: 1 }}>{h.totalSets}</div>
                <div style={{ fontSize: 9, color: "#555", letterSpacing: 1 }}>SETS</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ─── EDIT ──────────────────────────────────────────────────────────────────
  if (view === "edit") {
    const w = editingWorkout;
    const cats = [...new Set(editList.map(e => e.category))];
    const defaultCats = [...new Set(WORKOUTS.find(dw => dw.id === w.id).exercises.map(e => e.category))];

    return (
      <div style={base}>
        <div style={{
          position: "sticky", top: 0, zIndex: 20,
          background: "rgba(8,8,9,0.97)", backdropFilter: "blur(10px)",
          borderBottom: "1px solid #18181E",
          padding: "12px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <button onClick={() => setView("home")} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontFamily: DF, fontSize: 13, padding: 0 }}>
            ✕ Cancel
          </button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: BF, fontSize: 16, fontWeight: 800, color: w.color, letterSpacing: 1 }}>EDIT · {w.name.toUpperCase()}</div>
            <div style={{ fontSize: 10, color: "#555" }}>{editList.length} exercises</div>
          </div>
          <button onClick={saveEdit} style={{
            background: w.color, color: "#000", border: "none", borderRadius: 8,
            padding: "7px 14px", fontFamily: BF, fontSize: 12, fontWeight: 800,
            letterSpacing: 1, cursor: "pointer",
          }}>SAVE</button>
        </div>

        <div style={{ paddingBottom: 80 }}>
          {cats.map(cat => (
            <div key={cat}>
              <div style={{
                padding: "14px 16px 8px",
                fontFamily: BF, fontSize: 11, fontWeight: 700,
                letterSpacing: 3, textTransform: "uppercase", color: w.color,
              }}>{cat}</div>
              {editList.filter(e => e.category === cat).map(ex => (
                <div key={ex.id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 16px", borderBottom: "1px solid #0F0F14",
                  background: "#0C0C10",
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: "#D8D8E8" }}>{ex.name}</div>
                    {ex.isTime && <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>Time-based</div>}
                    {ex.custom && <div style={{ fontSize: 9, color: w.color, marginTop: 2, opacity: 0.7, letterSpacing: 1 }}>CUSTOM</div>}
                  </div>
                  <button onClick={() => removeFromEdit(ex.id)} style={{
                    background: "#1E1016", border: "1px solid #3A1A20",
                    borderRadius: 7, padding: "5px 10px", cursor: "pointer",
                    color: "#F87171", fontFamily: BF, fontSize: 11, letterSpacing: 1, flexShrink: 0,
                  }}>REMOVE</button>
                </div>
              ))}
            </div>
          ))}

          {editList.length === 0 && (
            <div style={{ padding: "24px 16px", fontSize: 13, color: "#444", textAlign: "center" }}>
              All exercises removed. Add some below or reset.
            </div>
          )}

          <div style={{ padding: "16px 16px 4px", textAlign: "center" }}>
            <button onClick={resetToDefaults} style={{
              background: "none", border: "1px solid #222230",
              borderRadius: 8, padding: "8px 16px", cursor: "pointer",
              color: "#555", fontFamily: BF, fontSize: 11, letterSpacing: 1, textTransform: "uppercase",
            }}>↺ Reset to Defaults</button>
          </div>

          <div style={{ margin: "20px 16px 0", background: "#0E0E14", border: "1px solid #1C1C26", borderRadius: 14, padding: "18px 14px" }}>
            <div style={{ fontFamily: BF, fontSize: 13, fontWeight: 700, letterSpacing: 2, color: w.color, textTransform: "uppercase", marginBottom: 14 }}>
              + Add Exercise
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, color: "#555", letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 }}>Exercise Name</div>
              <input value={newExName} onChange={e => { setNewExName(e.target.value); setAddError(""); }}
                placeholder="e.g. Smith Machine Squat" style={inputStyle} />
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, color: "#555", letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 }}>Category</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                {defaultCats.map(c => (
                  <button key={c} onClick={() => { setNewExCat(c); setAddError(""); }} style={{
                    padding: "4px 10px",
                    background: newExCat === c ? w.color : "#161620",
                    color: newExCat === c ? "#000" : "#666",
                    border: `1px solid ${newExCat === c ? w.color : "#22222E"}`,
                    borderRadius: 6, cursor: "pointer",
                    fontFamily: BF, fontSize: 11, letterSpacing: 1, transition: "all 0.15s",
                  }}>{c}</button>
                ))}
              </div>
              <input value={newExCat} onChange={e => { setNewExCat(e.target.value); setAddError(""); }}
                placeholder="Or type a custom category" style={inputStyle} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div onClick={() => setNewExIsTime(p => !p)} style={{
                width: 36, height: 20, borderRadius: 10, cursor: "pointer",
                background: newExIsTime ? w.color : "#1E1E28",
                border: `1px solid ${newExIsTime ? w.color : "#28283A"}`,
                position: "relative", transition: "all 0.2s",
              }}>
                <div style={{
                  position: "absolute", top: 2, left: newExIsTime ? 16 : 2,
                  width: 14, height: 14, borderRadius: "50%",
                  background: newExIsTime ? "#000" : "#444", transition: "left 0.2s",
                }} />
              </div>
              <div style={{ fontSize: 12, color: "#888" }}>Time-based (seconds instead of reps)</div>
            </div>

            {addError && <div style={{ fontSize: 11, color: "#F87171", marginBottom: 10 }}>{addError}</div>}

            <button onClick={addExercise} style={{
              width: "100%", padding: "11px",
              background: newExName && newExCat ? w.color : "#161620",
              color: newExName && newExCat ? "#000" : "#444",
              border: "none", borderRadius: 9, cursor: "pointer",
              fontFamily: BF, fontSize: 13, fontWeight: 800, letterSpacing: 1, transition: "all 0.2s",
            }}>+ ADD TO WORKOUT</button>
          </div>
        </div>
      </div>
    );
  }

  // ─── WORKOUT ───────────────────────────────────────────────────────────────
  if (view === "workout") {
    const w = activeWorkout;
    const exercises = getExercises(w.id);
    const cats = [...new Set(exercises.map(e => e.category))];
    return (
      <div style={base}>
        <div style={{
          position: "sticky", top: 0, zIndex: 20,
          background: "rgba(8,8,9,0.95)", backdropFilter: "blur(10px)",
          borderBottom: "1px solid #18181E", padding: "12px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <button onClick={() => setView("home")} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontFamily: DF, fontSize: 13, padding: 0 }}>← Back</button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: BF, fontSize: 17, fontWeight: 800, color: w.color, letterSpacing: 1 }}>{w.name.toUpperCase()}</div>
            <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>
              <span style={{ color: "#888", fontFamily: BF, fontWeight: 600 }}>{fmt(elapsed)}</span>
              &nbsp;·&nbsp;{totalNow} set{totalNow !== 1 ? "s" : ""} logged
            </div>
          </div>
          <button onClick={finishWorkout} style={{
            background: w.color, color: "#000", border: "none", borderRadius: 8,
            padding: "7px 13px", fontFamily: BF, fontSize: 12, fontWeight: 800,
            letterSpacing: 1, cursor: "pointer",
          }}>DONE</button>
        </div>

        <div style={{ paddingBottom: 60 }}>
          {cats.map(cat => (
            <div key={cat}>
              <div style={{
                padding: "18px 16px 8px",
                fontFamily: BF, fontSize: 11, fontWeight: 700,
                letterSpacing: 3, textTransform: "uppercase", color: w.color,
              }}>{cat}</div>
              {exercises.filter(e => e.category === cat).map(ex => {
                const sets = currentSets[ex.id] || [];
                const inp = inputs[ex.id] || {};
                const done = sets.length > 0;
                const canLog = ex.isTime ? !!inp.sec : !!inp.reps;
                return (
                  <div key={ex.id} style={{
                    background: done ? "#0C0F0E" : "#0C0C10",
                    borderLeft: `3px solid ${done ? w.color : "#1C1C24"}`,
                    padding: "14px 16px", marginBottom: 1,
                    transition: "background 0.2s, border-color 0.2s",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: done ? 500 : 400, color: done ? "#EEEEF8" : "#B0B0C0" }}>{ex.name}</div>
                        {ex.custom && <div style={{ fontSize: 9, color: w.color, opacity: 0.6, letterSpacing: 1, marginTop: 1 }}>CUSTOM</div>}
                      </div>
                      {done && <div style={{ fontFamily: BF, fontSize: 11, fontWeight: 700, color: w.color, letterSpacing: 1 }}>{sets.length} SET{sets.length > 1 ? "S" : ""}</div>}
                    </div>

                    {sets.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                        {sets.map((s, i) => (
                          <div key={i} onClick={() => deleteSet(ex.id, i)} style={{
                            background: "#181820", border: "1px solid #242430",
                            borderRadius: 6, padding: "4px 8px",
                            fontSize: 11, color: "#A0A0B8", cursor: "pointer",
                            display: "flex", alignItems: "center", gap: 5,
                          }}>
                            <span style={{ color: "#454558", fontSize: 9 }}>#{i + 1}</span>
                            {ex.isTime ? `${s.sec}s` : `${s.w ? `${s.w} lbs × ` : ""}${s.reps} reps`}
                            <span style={{ color: "#333", fontSize: 9, marginLeft: 2 }}>✕</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      {!ex.isTime && (
                        <input type="number" placeholder="lbs" value={inp.w || ""}
                          onChange={e => setInput(ex.id, "w", e.target.value)}
                          style={{ width: 60, padding: "8px", background: "#131318", border: "1px solid #222230", borderRadius: 8, color: "#E0E0F0", fontSize: 13, fontFamily: DF, outline: "none" }} />
                      )}
                      <input type="number" placeholder={ex.isTime ? "sec" : "reps"}
                        value={ex.isTime ? (inp.sec || "") : (inp.reps || "")}
                        onChange={e => setInput(ex.id, ex.isTime ? "sec" : "reps", e.target.value)}
                        style={{ width: ex.isTime ? "100%" : 60, padding: "8px", background: "#131318", border: "1px solid #222230", borderRadius: 8, color: "#E0E0F0", fontSize: 13, fontFamily: DF, outline: "none", flex: ex.isTime ? 1 : "unset" }} />
                      <button onClick={() => logSet(ex)} style={{
                        flex: 1, padding: "8px",
                        background: canLog ? w.color : "#161620",
                        color: canLog ? "#000" : "#383848",
                        border: `1px solid ${canLog ? w.color : "#222230"}`,
                        borderRadius: 8, cursor: canLog ? "pointer" : "default",
                        fontFamily: BF, fontWeight: 800, fontSize: 12, letterSpacing: 1, transition: "all 0.15s",
                      }}>+ LOG SET</button>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── HISTORY ───────────────────────────────────────────────────────────────
  if (view === "history") {
    const grouped = {};
    history.forEach(h => {
      if (!grouped[h.workoutId]) grouped[h.workoutId] = [];
      grouped[h.workoutId].push(h);
    });
    return (
      <div style={base}>
        <div style={{ padding: "48px 18px 16px", display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => setView("home")} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontFamily: DF, fontSize: 13, padding: 0 }}>← Back</button>
          <div style={{ fontFamily: BF, fontSize: 30, fontWeight: 900, letterSpacing: -0.5 }}>HISTORY</div>
        </div>
        {history.length === 0 ? (
          <div style={{ padding: 48, textAlign: "center", color: "#444", fontSize: 13, lineHeight: 1.8 }}>
            No workouts logged yet.<br />Start your first session!
          </div>
        ) : (
          <div style={{ paddingBottom: 48 }}>
            {WORKOUTS.map(w => {
              const sessions = grouped[w.id] || [];
              if (!sessions.length) return null;
              return (
                <div key={w.id} style={{ marginBottom: 8 }}>
                  <div style={{
                    padding: "14px 18px 10px",
                    fontFamily: BF, fontSize: 11, fontWeight: 700, letterSpacing: 3,
                    textTransform: "uppercase", color: w.color,
                    borderTop: "1px solid #111116",
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: w.color }} />
                    {w.name} ({sessions.length} sessions)
                  </div>
                  {sessions.map(s => {
                    const exIds = Object.keys(s.sets || {}).filter(id => (s.sets[id] || []).length > 0);
                    const isOpen = expandedHistory === s.id;
                    const allExercises = getExercises(w.id);
                    return (
                      <div key={s.id}>
                        <div onClick={() => setExpandedHistory(isOpen ? null : s.id)} style={{
                          padding: "12px 18px", display: "flex", alignItems: "center",
                          justifyContent: "space-between", cursor: "pointer",
                          background: isOpen ? "#0D0D12" : "transparent",
                          borderBottom: "1px solid #0F0F14",
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 2, height: 36, background: w.color, opacity: 0.5, borderRadius: 1, flexShrink: 0 }} />
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 500, color: "#D8D8E8" }}>{fmtDate(s.date)}</div>
                              <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>{s.durationMins}m · {exIds.length} exercises</div>
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontFamily: BF, fontSize: 22, fontWeight: 800, color: w.color, lineHeight: 1 }}>{s.totalSets}</div>
                              <div style={{ fontSize: 9, color: "#555", letterSpacing: 1 }}>SETS</div>
                            </div>
                            <div style={{ color: "#444", fontSize: 10 }}>{isOpen ? "▲" : "▼"}</div>
                          </div>
                        </div>
                        {isOpen && (
                          <div style={{ padding: "12px 18px 16px", background: "#0A0A0E", borderBottom: "1px solid #111116" }}>
                            {exIds.map(exId => {
                              const exercise = allExercises.find(e => e.id === exId);
                              const sets = s.sets[exId] || [];
                              return (
                                <div key={exId} style={{ marginBottom: 12 }}>
                                  <div style={{ fontSize: 11, color: "#888", fontWeight: 500, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>
                                    {exercise?.name || exId}
                                  </div>
                                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                                    {sets.map((set, i) => (
                                      <div key={i} style={{
                                        background: "#16161C", border: "1px solid #222230",
                                        borderRadius: 6, padding: "4px 8px",
                                        fontSize: 11, color: "#B0B0C8",
                                      }}>
                                        <span style={{ color: "#444", fontSize: 9 }}>#{i + 1} </span>
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
