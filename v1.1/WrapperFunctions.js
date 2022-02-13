/*
Author: Shadman Shahriar
Purpose: This is an arrayformula wrapper around =FINDSIMILARTEXT(...) including some behavior I personally need.
*/

/**
 * Get closest match from a list. Ex.  =MATCHFUZZY(I1,G:G,0.3)
 * @param {string} search_key Target string to compare
 * @param {range} range Range of strings to compare
 * @param {number} closeness_score Minimum score for a match (0 to 1), defaults to 0.3
 * @returns Returns best match.
 * @customfunction
 */
function MATCHFUZZY(search_key, range, closeness_score=0.3){
  // param for FINDSIMILARTEXT()
  returnType = "position" // change default to position for this wrapper

  // handle arrayformula
  if(Array.isArray(search_key))
    return search_key.map(row => row.map(cell => 
        MATCHFUZZY(cell, range, closeness_score, returnType)
      ))

  // handle single string input
  var result = FINDSIMILARTEXT(search_key, range, closeness_score, returnType)
  Logger.log(result)
  if(result || returnType !== "position") return result

  // handle not found
  return -1 // because INDEX(..., 0) array
}

/**
 * Get closest match from a list. Ex.  =VLOOKUPFUZZY(I1,G:H,2,0.3)
 * @param {string} search_key Target string to compare
 * @param {range} range Range of strings to compare
 * @param {number} index Index of the returning column
 * @param {number} closeness_score Minimum score for a match (0 to 1), defaults to 0.3
 * @returns Returns best match.
 * @customfunction
 */
function VLOOKUPFUZZY(search_key, range, index=1, closeness_score=0.3){
  var first_column = range.map(row => [row[0]])
  var desired_column = range.map(row => row[index-1])
  var matched_row = MATCHFUZZY(search_key, first_column, closeness_score)
  return matched_row.map(row => desired_column[row-1]) /*.map(row => [range[row][index-1]]) //Array.isArray(range) */
}
