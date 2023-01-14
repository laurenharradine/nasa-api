function getFetch(){
  document.querySelector('img').src = ""
  let date = getRandomDate()

  const url = `https://api.nasa.gov/planetary/apod?api_key=zU71SV2z8UAS2tpSRxtx9Ii4giGUAk6QIufK4bCn&date=${date}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        if( data.media_type === 'image' ){
          document.querySelector('img').src = data.hdurl
          document.querySelector('img').alt = data.title
        }else if(data.media_type === 'video'){
          document.querySelector('iframe').src = data.url
          document.querySelector('iframe').alt = data.title
        }
        document.querySelector('h2').innerText = `${date}: ${data.title}`
        document.querySelector('p').innerText = data.explanation
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function getRandomDate(){
  let day = Math.floor(Math.random() * 31) + 1
  let month = Math.floor(Math.random() * 12) + 1
  let year = Math.floor(Math.random() * (2023 - 2015) + 2015); 
  console.log(`Orig year: ${year}-${month}-${day}`)

  // Make sure we've got a date that exists!
  // I am unsure how to get today's date to compare against
  // yet, but maybe one day in space and time...!
  while ((day > 30 && (month === 9
  || month === 4 
  || month === 6 
  || month === 11)) || 
  ( day > 28 && month === 2)) {
    day = Math.floor(Math.random() * 32)
    console.log(`Regenerating: ${year}-${month}-${day}`)
  }

  return `${year}-${month}-${day}`
}

getFetch()
setInterval(getFetch, 30000)
//getFetch()

