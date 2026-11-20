export type Question = {
  prompt: string
  options: [string, string, string, string]
  answer: 0 | 1 | 2 | 3
  explanation: string
}

/** Dummy quizzes keyed by document id, written from the sample PDF. */
export const QUIZZES: Record<string, Question[]> = {
  'cell-bio-week-4': [
    {
      prompt: 'What is the plasma membrane mainly made of?',
      options: ['A cellulose wall', 'A phospholipid bilayer', 'A single layer of protein', 'Starch granules'],
      answer: 1,
      explanation: 'The membrane is a phospholipid bilayer with proteins embedded in it.',
    },
    {
      prompt: 'Which model describes the structure of the cell membrane?',
      options: ['Lock and key model', 'Sliding filament model', 'Fluid mosaic model', 'Double helix model'],
      answer: 2,
      explanation: 'In the fluid mosaic model, lipids and proteins can move sideways within the layer.',
    },
    {
      prompt: 'What role does cholesterol play in the membrane?',
      options: ['It stabilises membrane fluidity', 'It produces ATP', 'It synthesises proteins', 'It stores genetic material'],
      answer: 0,
      explanation: 'Cholesterol sits between phospholipids and keeps the membrane from becoming too fluid or too rigid.',
    },
    {
      prompt: 'A membrane that is “selectively permeable”…',
      options: ['lets every molecule through', 'lets no molecules through', 'lets only water through', 'lets only some molecules pass freely'],
      answer: 3,
      explanation: 'Selective permeability means only certain molecules can cross freely.',
    },
    {
      prompt: 'Osmosis is the diffusion of which substance?',
      options: ['Glucose', 'Sodium ions', 'Water', 'Oxygen'],
      answer: 2,
      explanation: 'Osmosis is specifically the diffusion of water across a membrane.',
    },
    {
      prompt: 'What does active transport require?',
      options: ['Energy from ATP', 'Only a concentration gradient', 'Sunlight', 'No energy at all'],
      answer: 0,
      explanation: 'Active transport moves substances against their gradient, which costs ATP.',
    },
    {
      prompt: 'What does one cycle of the sodium-potassium pump move?',
      options: ['2 Na⁺ out and 3 K⁺ in', '3 Na⁺ out and 2 K⁺ in', '3 K⁺ out and 2 Na⁺ in', '1 Na⁺ out and 1 K⁺ in'],
      answer: 1,
      explanation: 'The Na⁺/K⁺ pump pushes 3 sodium ions out and brings 2 potassium ions in.',
    },
    {
      prompt: 'Where does aerobic respiration take place?',
      options: ['Ribosomes', 'Golgi apparatus', 'Lysosomes', 'Mitochondria'],
      answer: 3,
      explanation: 'Mitochondria carry out aerobic respiration and produce most of the cell’s ATP.',
    },
    {
      prompt: 'Which organelle modifies and packages proteins?',
      options: ['Golgi apparatus', 'Mitochondria', 'Lysosome', 'Cell membrane'],
      answer: 0,
      explanation: 'The Golgi apparatus modifies, sorts and packages proteins for delivery.',
    },
    {
      prompt: 'What is the job of lysosomes?',
      options: ['Synthesising lipids', 'Making ribosomes', 'Breaking down waste with enzymes', 'Carrying out photosynthesis'],
      answer: 2,
      explanation: 'Lysosomes contain digestive enzymes that break down waste and worn-out parts.',
    },
  ],
}
