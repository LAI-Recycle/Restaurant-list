const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

// require 餐廳的json
const restaurantList = require('./restaurant.json')

//express-handlebars!!!
// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//public的使用
app.use(express.static('public'))

//畫面
app.get('/', (req, res) => {
  res.render('index' , { restaurants : restaurantList.results })
})

//搜尋
app.get("/search", (req, res) => {
  //使用req.query.keyword抓到輸入的keyword
  //console.log( "req.query.keyword" , req.query.keyword)
  const restaurants = restaurantList.results.filter( function(restaurant){ 
    return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())  
  })
  res.render('index' , { restaurants : restaurants , keyword: req.query.keyword })
})

//show
app.get("/restaurants/:restaurant_id", (req, res) => {
  //console.log(req.params.restaurant_id) //使用req.params抓到需要的id
  const restaurant = restaurantList.results.find( function(restaurant){ 
    return restaurant.id.toString() == req.params.restaurant_id
  })
  // console.log(restaurant)

  res.render('show' , { restaurant: restaurant })
})

//記得要放監聽器阿!!!
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

