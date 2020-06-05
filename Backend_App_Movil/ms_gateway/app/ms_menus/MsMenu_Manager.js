const MsMenuManager = module.exports;
const MsMenuResource = require('../resources/MsMenu_Resource');
const Promise = require('bluebird');


MsMenuManager.getMenuOptionSubOption = async (menuId, options = {}) => {
    const {logger} = options;
    logger.info(`Starts MenuController.get: params del menu ${JSON.stringify(menuId)}`);
    const optionSubOptio = await MsMenuResource.getOptoinId(menuId)
    return {optionSubOptio};
}

MsMenuManager.getRestIdMenu = async (menuId, options = {}) => {
    const { logger } = options;
    logger.info(`Starts MenuController.get: paramsManager del menu ${JSON.stringify(menuId)}`);
    const detatailMenu = await MsMenuResource.getRestIdMenu(menuId)
    return detatailMenu;
}

MsMenuManager.getOptionsById = async (menuid, { logger, logName }) => {

    const options = await MsMenuResource.getOptions(menuid);
    const subOptionList = await Promise.mapSeries(options, async (option) => {
        const { optionId, optionName} = option;
        const subOptions = await MsMenuResource.getSubOptions(optionId);
        const subOptionDetail = await Promise.mapSeries(subOptions, async (suboption) => {
            const {subName, subId} = suboption;
            return {subName,subId};
        })
        return {optionName,optionId,subOptionDetail};
    })
    return subOptionList;
}


//const { optionId, ...otherData } = option;
        // const p = await MsMenuResource.getSubOptions(optionId);  
        // const {...data} = p;
        // return {...data,...otherData}
