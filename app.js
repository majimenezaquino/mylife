const request = require('request');
const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());

app.post('/profile', async function (req, res) {

const body =req.body;
const d_start = new Date(`${parseInt(body.age_year)-1}-01-01`);
const d_end = new Date(`${parseInt(body.age_year)+1}-01-01`);
  const param_1 =encodeURI(`query=${body.name}&hitsPerPage=16&maxValuesPerFacet=100&page=0&highlightPreTag=<ais-highlight-0000000000>&highlightPostTag=</ais-highlight-0000000000>&facets=["state","city","zip","dob"]&tagFilters=&facetFilters=["city:${body.city.toUpperCase()}","state:${body.state.toUpperCase()}","zip:${body.zip}"]&numericFilters=["dob>=${d_start.getTime()/1000}","dob<=${d_end.getTime()/1000}"]`);

  var options = {
    'method': 'POST',
    'url': 'https://sv31mkvxe1-2.algolianet.com/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.35.1)%3B%20Browser%20(lite)%3B%20react%20(16.14.0)%3B%20react-instantsearch%20(5.7.0)%3B%20JS%20Helper%20(2.28.1)&x-algolia-application-id=SV31MKVXE1&x-algolia-api-key=939759c73b450e38abf10176cc801a0c',
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "requests": [
        {
          "indexName": "searchprofile",
          "params": param_1
        }
      ]
    })
  
  };

 const r = await new Promise((resolve,reject)=>{
  try {
    request(options, function (error, response) {
      if (error) reject(error)
      const data =JSON.parse(response.body)
      if(data.results[0].hits && data.results[0].hits.length>0){
        return resolve(data.results[0].hits)
      }
      return res.json([])
      
    });
  } catch (error) {
    reject(error)
  }
 })
 console.log(param_1)
 return res.json(r)

})


const server = app.listen(process.env.PORT || 80, function () {
  const host = server.address().address
  const port = server.address().port
  
  console.log("Example app listening at http://%s:%s", host, port)
})