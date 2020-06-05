const MsSubscriptionManager = module.exports;
const MssubscriptionResource = require('../resources/MsSubscription_Resource');
const RestaurantResource = require('../resources/MsRestaurant_Resource');
const Promise = require('bluebird');

MsSubscriptionManager.getOneSubscription = async (userId,{ logger, logName }) =>{
    const sub = await MsSubscriptionResource.getSubsByUser(userId); 
    const subsDetail = await Promise.mapSeries(sub, async (subcription)=>{
        const { restId, packageId, ...data } = subcription; 
        const {namerestaurant} =  await RestaurantResource.getrestid(restId);
        const {balance, description} = await MssubscriptionResource.getOnePackage(packageId);
        return{ restId,...data,balance,description,namerestaurant}
    })   

    return subsDetail;
}