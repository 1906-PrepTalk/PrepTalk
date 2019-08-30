const list =
  'invested in you and let me tell you the world needs your tablets again does it happen we heard from you young people cuz remember this so you got to get out there you got to give it everything'

function countWords(str) {
  let wordCounts = []
  str.split(' ').forEach(word => {
    if (wordCounts.length > 0) {
      wordCounts.forEach(obj => {
        if (obj.label === word) {
          obj.y++
        } else {
          let wordObj = {}
          wordObj.label = word
          wordObj.y = 1
          wordCounts.push(wordObj)
        }
      })
    } else {
      let wordObj = {}
      wordObj.label = word
      wordObj.y = 1
      wordCounts.push(wordObj)
    }
  })
  return wordCounts
}

// function countWords(str) {
//   let wordCounts = []
//   const split = str.split(' ')
//   console.log(split)
// }

console.log(countWords(list))
