const DUMMY_EXERCISES = [
  {
    name: "Bench Press",
    pumpType: "rep",
    pumpsPerRep: "5",
    bodyPart: "Chest / Tri",
  },
  {
    name: "Push Up",
    pumpType: "rep",
    pumpsPerRep: "10",
    bodyPart: "Chest / Tri",
  },
  {
    name: "Tricep Dips",
    pumpType: "rep",
    pumpsPerRep: "10",
    bodyPart: "Tri",
  },
  {
    name: "Bent Over Row",
    pumpType: "rep",
    pumpsPerRep: "5",
    bodyPart: "Back / Bi",
  },
  {
    name: "Pull Up",
    pumpType: "rep",
    pumpsPerRep: "15",
    bodyPart: "Back / Bi",
  },
  {
    name: "Bicep Curls",
    pumpType: "rep",
    pumpsPerRep: "5",
    bodyPart: "Bi",
  },
  {
    name: "Squat",
    pumpType: "rep",
    pumpsPerRep: "10",
    bodyPart: "Leg",
  },
  {
    name: "Lunge",
    pumpType: "rep",
    pumpsPerRep: "5",
    bodyPart: "Leg",
  },
  {
    name: "Calf Raise",
    pumpType: "rep",
    pumpsPerRep: "5",
    bodyPart: "Leg",
  },
  {
    name: "Plank",
    pumpType: "rep",
    pumpsPerRep: "5",
    bodyPart: "Abs",
  },
  {
    name: "Crunch",
    pumpType: "rep",
    pumpsPerRep: "5",
    bodyPart: "Abs",
  },
  {
    name: "Sit Up",
    pumpType: "rep",
    pumpsPerRep: "10",
    bodyPart: "Abs",
  },
  {
    name: "Flutter Kicks",
    pumpType: "rep",
    pumpsPerRep: "10",
    bodyPart: "Abs",
  },
  {
    name: "Side Planks",
    pumpType: "rep",
    pumpsPerRep: "5",
    bodyPart: "Oblique",
  },
  {
    name: "Shoulder Press",
    pumpType: "rep",
    pumpsPerRep: "5",
    bodyPart: "Shoulder",
  },
  {
    name: "Lateral Raise",
    pumpType: "rep",
    pumpsPerRep: "5",
    bodyPart: "Shoulder",
  },
  {
    name: "Glute Bridge",
    pumpType: "rep",
    pumpsPerRep: "5",
    bodyPart: "Glute",
  },
];

export function getAllExercises() {
  return DUMMY_EXERCISES;
}

export function getFilteredExercise(name) {
  var result = DUMMY_EXERCISES.find((obj) => {
    return obj.name === name;
  });
  return result;
}

const DUMMY_EX_ROUTINES = [
  ["Bench Press", "Bent Over Row", "Squat", "Plank"],
  ["Push Up", "Pull Up", "Lunge", "Shoulder Press"],
  ["Tricep Dips", "Bicep Curls", "Calf Raise", "Crunch"],
  ["Bench Press", "Pull Up", "Calf Raise", "Lateral Raise"],
  ["Push Up", "Bicep Curls", "Squat", "Sit Up"],
  ["Tricep Dips", "Bent Over Row", "Lunge", "Glute Bridge"],
  ["Bench Press", "Bicep Curls", "Lunge", "Flutter Kicks"],
  ["Push Up", "Bent Over Row", "Calf Raise", "Crunch"],
  ["Tricep Dips", "Pull Up", "Squat", "Side Planks"],
];

export function getAllExerciseRoutines() {
  return DUMMY_EX_ROUTINES;
}
