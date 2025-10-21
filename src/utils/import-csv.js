import fs from 'node:fs'
import parse from "csv-parser";

const csvPath = new URL('../../files/tasks.csv', import.meta.url)

fs.createReadStream(csvPath)
  .pipe(parse())
  .on('data', (data) => {
    const { title, description } = data

    fetch('http://localhost:3333/tasks', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description 
      }),
      duplex: 'half'
    })
  })
  .on('end', () => {
    console.log('Upload CSV File finished')
  })