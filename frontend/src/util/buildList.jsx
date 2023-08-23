/**
 * (CURRENTLY NOT IN USE) Builds the selected list and interface 
 **/
function buildList(text, wordsPerLine) {
  const items = text.split(" ");
  let renderBlock = [];

  let i = 0;
  while (i < items.length) {
    let substrings = [];

    let j = i;
    while (j < i + wordsPerLine) {
      if (items[j]) substrings.push(items[j] + " ");
      j++;
    }

    renderBlock.push(substrings);

    i += wordsPerLine;
  }
  return renderBlock;
}

// Process text utilities
let testRenderText = `A Dali clock hung on the wall between the bookcases, its distorted face sagging to the Tank War, mouth touched with hot gold as a gliding cursor struck sparks from the wall between the bookcases, its distorted face sagging to the bare concrete floor. The two surviving Founders of Zion were old men, old with the movement of the train, their high heels like polished hooves against the gray metal of the console in faded pinks and yellows. She peered at the clinic, Molly took him to the Tank War, mouth touched with hot gold as a gliding cursor struck sparks from the wall between the bookcases, its distorted face sagging to the bare concrete floor. None of that prepared him for the arena, the crowd, the tense hush, the towering puppets of light from a half-open service hatch framed a heap of discarded fiber optics and the chassis of a gutted game console. Strata of cigarette smoke rose from the tiers, drifting until it struck currents set up by the blowers and the drifting shoals of waste. The girls looked like tall, exotic grazing animals, swaying gracefully and unconsciously with the movement of the train, their high heels like polished hooves against the gray metal of the room where Case waited.
`;
export const s = buildList(testRenderText, 16);
// console.log(s);
