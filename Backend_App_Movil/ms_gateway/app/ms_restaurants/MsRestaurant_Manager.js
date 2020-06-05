const MsRestaurantManger = module.exports;

const MsRestaurantResource = require('../resources/MsRestaurant_Resource');
const OrderResource = require('../resources/MsOrders_Resource');
const Promise = require('bluebird');

MsRestaurantManger.getRestaurantId  = async (restId, body, { logger, logName }) => {
    const restaurants = await MsRestaurantResource.getrestid(restId , body);

    const OrderDetail = await Promise.mapSeries(restaurants , async (restaurant)=>  { 
        const {id , ...otherDate} =restaurant;
        const [p] = await OrderResource.getOrderByUser(id);
        const {...data} = p;
        return {...data,...otherDate}
    })

    return OrderDetail;
   
}

MsRestaurantManger.login = async (body, logger) => {
    const restaurant = await MsRestaurantResource.login(body, logger);
  
    if (restaurant) {
      const Restaurants = await MsRestaurantResource.getUserbyauthId(restaurant.authId, logger);
      
      const  token= Token.create({authid: Restaurants.authId, id: Restaurants.restId, description: Restaurants.description,   
         namerestaurant: Restaurants.nameRestaurant, image: Restaurants.Image, celphone: Restaurants.Celphone,
        direction: Restaurants.Direction, schedule: Restaurants.Schedule, city: Restaurants.City })
  
      return {authid: restaurant.authId, id: restaurant.restId, email:restaurant.authEmail, description: restaurant.description, 
         namerestaurant: restaurant.nameRestaurant,  image: restaurant.Image, celphone: restaurant.Celphone,
        direction: restaurant.Direction, schedule: restaurant.Schedule, city: restaurant.City ,token
       };
    }
    return null;
  };
  