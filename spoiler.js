const cheerio = require('cheerio')
const request = require('request');

let movie = process.argv[2]   
let time = Number(process.argv[3]);


request(`https://api.themoviedb.org/3/search/movie?api_key=c254f174e3ef7bd559ed74294ff10031&query=${movie}`, (err, response, body) => {
    const obj = JSON.parse(body)
    const titles = obj.total_results
    //checking if TMDB have the movie information.
    if (titles === 0) {
        console.log(`Couldn't find the spoiler`)
        return
    } else {

        console.log(`**spoiler warning** We will be spoiling the plot of ${movie} in ${time} seconds`)


        request(`https://www.google.ca/search?q=${movie}+film`, function (error, response, body) {
            if (error) {
                console.log(`Couldn’t get page because of error: ${error}`)
                return;
            }

            // Getting the headline for the first page of Google Search
            var $ = cheerio.load(body),
                links = $("h3");

            links.each((i, links) => {
                link = $(links).text();
                console.log(link)

            })


        })

        setTimeout(() => {
            request(`https://api.themoviedb.org/3/search/movie?api_key=c254f174e3ef7bd559ed74294ff10031&query=${movie}`, (err, response, body) => {
                const obj = JSON.parse(body)
                const data = obj.results[0]
                //spoiling the plot of the movie
                console.log(data.overview)

            })
        }, time *= 1000)


    }

})







