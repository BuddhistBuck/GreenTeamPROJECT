/**
 * @author Chris P
 * @component Builds the selected list and interface
 **/
function buildList(text, wordsPerLine) {
  const items = text.split(" ");
  let renderBlock = [];

  let i = 0;
  while (i < items.length) {
    let substrings = [];

    let j = i;
    while (j < i + wordsPerLine) {
      substrings.push(items[j] + " ");
      j++;
    }

    renderBlock.push(substrings);

    i += wordsPerLine;
  }
  return renderBlock;
}

// Process text utilities
let testRenderText = `Since they are still preserved in the rocks for us to see, they must have been formed quite recently, `;
export const s = buildList(testRenderText, 4);
// console.log(s);
