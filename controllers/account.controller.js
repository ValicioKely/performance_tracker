const { signUpError , signInError } = require('../utils/account.error');
const accountModel = require('../models/account.model')
let MetaApi = require('metaapi.cloud-sdk').default;

let token = process.env.TOKEN;
const api = new MetaApi(token);


//a faire
//get Provisioning id from database
async function getProvisioningProfileId(sevvername) {
    
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
            provisioningProfileId: provisioningProfile.id,
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
        res.status(200).json({ account: account._id })
    } catch (error) {
        const errors = signUpError(error);
        res.status(400).send(errors);
    }
}
//get account information
exports.accountInfo = async function (req, res) {
    if (!ObjectId.isValid(req.params.id)) {
        console.log(`ID unknwon ${req.params.id}`)
    }
    const account = await userModel.findById(req.params.id).select("-password");
    
    //fetch account via api
    //const accountId = login.login;
    //const account = await api.metatraderAccountApi.getAccount(accountId);
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