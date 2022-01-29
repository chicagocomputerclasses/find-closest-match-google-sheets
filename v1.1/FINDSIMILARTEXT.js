/*
Author https://www.chicagocomputerclasses.com/
YouTube Channel https://www.youtube.com/channel/UC8p19gUXJYTsUPEpusHgteQ
Video https://youtu.be/Ft5lxsXIGfE
*/

/**
 * Get closest match from a list. Ex.  =FINDSIMILARTEXT(I1,G:G,0.7,"text")
 * @param {string} targetPhrase Target string to compare
 * @param {range} phraseList Range of strings to compare
 * @param {number} minimumScore Minimum score for a match (0 to 1), defaults to 0
 * @param {string} returnType "text" or "position", defaults to "text"
 * @returns Returns best match.
 * @customfunction
 */
function FINDSIMILARTEXT(targetPhrase,phraseList,minimumScore = 0, returnType = "text"){

  if(!(phraseList.length === 1 || phraseList[0].length === 1)) throw new Error("Range must be a single column or row.")

  const reshapedPhraseList =  phraseList.flat()

  const compare = new SimilarStringFinder(targetPhrase,reshapedPhraseList,minimumScore)

  //console.log(compare)
  if(returnType === "text") return compare.bestMatch.phrase
  if(returnType === "position" && compare.bestMatch.phrase !== null) return compare.bestMatch.position + 1
  return null
}
