const fs = require('fs')

fs.writeFile(
  process.env.GOOGLE_APPLICATION_JSON,
  process.env.GOOGLE_CONFIG,
  err => {
    console.error(err)
  }
)
