/*
Author https://www.chicagocomputerclasses.com/
YouTube Channel https://www.youtube.com/channel/UC8p19gUXJYTsUPEpusHgteQ
Video https://youtu.be/Ft5lxsXIGfE
*/
class SimilarStringFinder {
  constructor(targetPhrase,phraseList, minScore = 0){
    this.targetPhrase = targetPhrase
    this.phraseList = phraseList
    this.scores = null
    this.minScore = minScore
    this.bestMatch = {phrase:null, score: null, position: null}
    this.findScores()
  }

  findScores(){
   this.scores = this.phraseList.map((phrase,i) => {

      if(phrase === null || phrase === "" || typeof phrase !== "string") return { phrase:null, score: null, position: i }

      const score = stringSimilarity(this.targetPhrase, phrase)

      const currentMatch = { phrase:phrase, score: score, position: i }

      if(score < this.minScore) return currentMatch

      if(this.bestMatch.score === null || this.bestMatch.score < currentMatch.score){
        this.bestMatch = {...currentMatch}
      }
      return currentMatch
    })

  }

}
