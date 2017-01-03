function getAvgWordsPerSentence(text) {
  var numSentences = text.match(/[.!?]+/g) ? text.match(/[.!?]+/g).length : 1;
  var wordCount = tokenizeText(text).length;
  return (wordCount / numSentences).toFixed(2);
}

function getAvgWordLength(tokens) {
  var totalLength = tokens.join("").length;
  return (totalLength / tokens.length).toFixed(2);
}

function countDistinctWords(tokens) {
  var distinctWords = [];
  for (var i=0; i<tokens.length; i++) {
    if (distinctWords.indexOf(tokens[i]) === -1) {
      distinctWords.push(tokens[i]);
    }
  }
  return distinctWords.length;
}

// https://en.wikipedia.org/wiki/Tokenization_(lexical_analysis).

function tokenizeText(text) {
  return text.toLowerCase().match(/\b[^\s]+\b/g).sort();
}

function removeReturns(text) {
  return text.replace(/\r?\n|\r/g, "");
}

function reportOnText(text) {
  var tokens = tokenizeText(text);
  var numDistinctWords = countDistinctWords(tokens);
  var numTotalWords = tokens.length;
  var avgWordLength = getAvgWordLength(tokens);
  var avgWordsPerSentence = getAvgWordsPerSentence(text);
  var textReport = $('.js-text-report');
  textReport.find('.js-word-count').text(numTotalWords);
  textReport.find('.js-unique-word-count').text(numDistinctWords);
  textReport.find('.js-avg-word-length').text(
    avgWordLength + " characters");
  textReport.find('.js-avg-sentence-length').text(
    avgWordsPerSentence + " words");
  textReport.removeClass('hidden');
}

function watchFormSubmission() {
  $('.js-text-form').submit(function(event) {
    event.preventDefault();
    var userText = $(this).find('#user-text').val();
    reportOnText(removeReturns(userText));
  });
}

$(document).ready(function(){
  watchFormSubmission();
});