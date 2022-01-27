/**
 * Get best match from a list
 * @param {string} targetPhrase Target string to compare
 * @param {range} phraseList Column range of strings to compare
 * @param {number} minimumScore Minimum Score
 * @returns Sttring best matching phrase.
 * @customfunction
 */
function GETBESTMATCH(targetPhrase,phraseList,minimumScore = 0){

  const reshapedPhraseList =  phraseList.filter(r => r[0] != "").map(r => {
    return r[0]
  })
  const compare = new SimilarStringFinder(targetPhrase,reshapedPhraseList,minimumScore)

  console.log(compare)
  
  return compare.bestMatch.phrase
}
