const fs = require('fs')

fs.writeFile(
  process.env.GOOGLE_APPLICATION_CREDENTIALS,
  process.env.GOOGLE_CONFIG,

  function(err, data) {
    if (err) throw err
    console.log(data)
  }
)
