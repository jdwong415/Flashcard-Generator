var ClozeCard = function(text, cloze) {
  this.cloze = cloze;

  if (!text.includes(cloze)) {
    console.log("Error: " + cloze + " does not exist in text");
    return;
  }
  this.partial = text.replace(cloze, "");
  this.fullText = text;
}

module.exports = ClozeCard;