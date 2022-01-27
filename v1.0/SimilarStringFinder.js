class SimilarStringFinder {
  constructor(targetPhrase,phraseList, minScore = 0){
    this.targetPhrase = targetPhrase
    this.phraseList = phraseList
    this.scores = null
    this.minScore = minScore
    this.bestMatch = {phrase:null, score: null}
    this.findScores()
  }

  findScores(){
   this.scores = this.phraseList.map(phrase => {
      const score = stringSimilarity(this.targetPhrase, phrase)

      const currentMatch = {phrase:phrase, score: score }

      if(score < this.minScore) return currentMatch

      if(this.bestMatch.score === null || this.bestMatch.score < currentMatch.score){
        this.bestMatch = {...currentMatch}
      }
      return currentMatch
    })   
  }

}
