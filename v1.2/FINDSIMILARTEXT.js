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

  if(!(phraseList.length === 1 || phraseList[0].length === 1)) throw new Error("phraseList Range must be a single column or row.")

  const reshapedPhraseList =  phraseList.flat()



  if(!Array.isArray(targetPhrase)) targetPhrase = [[targetPhrase]]
  if(!(targetPhrase.length === 1 || targetPhrase[0].length === 1)) throw new Error("targetPhrase Range must be a single column or row.")

  if(targetPhrase.length === 1 || targetPhrase[0].length > 1) {
    return [
      targetPhrase[0].map(v => {
        return FINDSIMILARTEXT_return_options_(v,reshapedPhraseList,minimumScore,returnType,"column")
      }) // end map
    ]
  } // end if

  
  if(targetPhrase.length >= 1 || targetPhrase[0].length === 1) {
    return targetPhrase.map(v => {
        return FINDSIMILARTEXT_return_options_(v[0],reshapedPhraseList,minimumScore,returnType,"row")
    }) // end map
  } // end if

}


function FINDSIMILARTEXT_return_options_(v,reshapedPhraseList,minimumScore,returnType,rangeDirection){
    const compare = new SimilarStringFinder(v,reshapedPhraseList,minimumScore)
    //console.log(compare)
    const rangeDirectionBool = rangeDirection === "column"

    if(returnType === "text") return (rangeDirectionBool ? compare.bestMatch.phrase : [compare.bestMatch.phrase])
    if(returnType === "position" && compare.bestMatch.phrase !== null) return (rangeDirectionBool ?  compare.bestMatch.position + 1 : [compare.bestMatch.position + 1])
    return (rangeDirectionBool ? null : [null])
}
