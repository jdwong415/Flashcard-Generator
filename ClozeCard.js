var ClozeCard = function(text, cloze) {
  if (this instanceof ClozeCard) {
    this.cloze = cloze;

    if (!text.includes(cloze)) {
      console.log("Error: " + cloze + " does not exist in text");
      return;
    }
    this.partial = text.replace(cloze, "...");
    this.fullText = text;
  }
  else {
    return new ClozeCard(text, cloze);
  }
}

module.exports = ClozeCard;