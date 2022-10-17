const { signUpError , signInError } = require('../utils/account.error');
const accountModel = require('../models/account.model')
let MetaApi = require('metaapi.cloud-sdk').default;

let token = process.env.TOKEN;
const api = new MetaApi(token);


//a faire
//get Provisioning id from database
async function getProvisioningProfileId(serverName) {
    const profiles = await api.provisioningProfileApi.getProvisioningProfiles();

    // create test MetaTrader account profile
    let profile = profiles.find(p => p.name === serverName);
    const provisioningProfileId = profile._data._id ;
    console.log(provisioningProfileId);
    return provisioningProfileId ;
}

//create a trading account 
exports.signUp = async function (req, res) {

    const { name, platform, login, broker, investPassword, server } = req.body;
    try {

        const provisioningProfile = await getProvisioningProfileId(broker);
        //Adding MT account to MetaApi
        account = await api.metatraderAccountApi.createAccount({
            name: name,
            login: login,
            password: investPassword,
            server: server,
            provisioningProfileId: provisioningProfile,
            platform: platform,
            application: 'MetaApi',
            magic: 1000
        });

        //add MT account to database
        await accountModel.create({
            name: name,
            platform: platform,
            login: login,
            broker: broker,
            investPassword: investPassword,
            server: server
        });
        res.status(200).json({ account: account.name })
    } catch (error) {
        const errors = signUpError(error);
        res.status(400).send(errors);
    }
}
//get account information
exports.accountInfo = async function (req, res) {
    //fetch account via api
    const accountId = login.login;
    const account = await api.metatraderAccountApi.getAccount(accountId);
    res.status(200).json({ account });
}

//get all account
exports.getAllAccount = async function (req, res) {
    const accounts = await api.metatraderAccountApi.getAccounts();
    //Fetch accounts via api
    //const accounts = await api.metatraderAccountApi.getAccounts();
    res.status(200).json({ accounts });
}


exports.signIn = async function (req , res) {
    try {
        const account = await api.metatraderAccountApi.getAccount(req.params.id);
        await account.deploy();
    } catch (error) {
        const errors = signInError(error);
        res.status(401).send(errors);
    }
}


exports.signOut = async function (req , res) {
    try {
        const account = await api.metatraderAccountApi.getAccount(req.params.id);
        await account.undeploy();
    } catch (error) {
        const errors = signInError(error);
        res.status(401).send(errors);
    }
}