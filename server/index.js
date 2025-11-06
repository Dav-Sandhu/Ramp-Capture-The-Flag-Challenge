const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const URL = "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge"
const PORT = 3000

app.get('/', async (req, res) => {
    //gets the web content and loads it with cheerio
    const challenge = await axios.get(URL)
    const $ = cheerio.load(challenge.data)

    let hiddenURL = ""
    
    $('section').each((i, section) => {
        //ensures that the first two characters of the data-id on the section element are '92'
        if (!($(section).attr('data-id').slice(0, 2) === '92')) return

        $(section).find('article').each((i, article) => {
            //ensures that the last two characters of the data-class on the article element are '45'
            if (!($(article).attr('data-class').slice(-2) === '45')) return

            $(article).find('div').each((i, div) => {
                //ensures that the data-tag on the div element contains '78'
                if (!$(div).attr('data-tag').includes('78')) return

                //adds the value of each b element with a class of 'ref' to the output
                $(div).find('b.ref').each((i, b) => { hiddenURL += $(b).attr('value') })
            })
        })
    })

    //gets and loads the contents of the hidden website
    const secret = await axios.get(hiddenURL)
    const $$ = cheerio.load(secret.data)

    //obtains the hidden word from the body
    const hiddenWord = $$('body').html()

    //return the hidden url and word in json format
    res.json({ hiddenURL, hiddenWord })
})

app.listen(PORT)