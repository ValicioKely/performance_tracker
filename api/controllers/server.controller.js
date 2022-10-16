const serverModel = require('../models/server.model');
const { uploadError } = require('../utils/upload.error');
let MetaApi = require('metaapi.cloud-sdk').default;
const fs = require('fs');
const util = require('util');
const stream = require('stream');
const  pipeline = util.promisify(stream.pipeline);

let token = process.env.TOKEN;
const api = new MetaApi(token);


exports.uploadServer = async function (req, res) {
    const { servername, platform, version, brokerTimezone, brokerDSTSwitchTimezone } = req.body;
    let serverType;
    let fileName;
    try {
        const provisioningProfile = await api.provisioningProfileApi.createProvisioningProfile({
            name: servername,
            version: version,
            brokerTimezone: brokerTimezone,
            brokerDSTSwitchTimezone: brokerDSTSwitchTimezone
        });

        if (req.file !== null) {
            //define extension of server file
            if (platform == "mt5") {
                serverType = ".srv"
                //file validation 
                if (req.file.detectedMimeType !== "application/" + serverType) throw Error("type");
                //set file name
                fileName = req.body.servername + serverType;
                //add file into directory
                await pipeline(
                    req.file.stream,
                    fs.createWriteStream(
                        `${__dirname}/../client/public/uploads/server/${fileName}`
                    )
                );
                //upload provisioning profile via API
                await provisioningProfile.uploadFile(fileName, `${__dirname}/../client/public/uploads/server/${fileName}`);
                //upload server to the database
                const server = await serverModel.create({
                    servername: servername,
                    serverFile: req.file !== null ? "./uploads/server/" + fileName : "",
                });
                res.status(200).json({ server });
            }
            else if (platform == "mt4") {
                serverType = ".dat";
                //file validation 
                if (req.file.detectedMimeType !== "application/" + serverType) throw Error("type");
                //set file name
                fileName = req.body.servername + serverType;
                //add file into directory
                await pipeline(
                    req.file.stream,
                    fs.createWriteStream(
                        `${__dirname}/../client/public/uploads/broker/${fileName}`
                    )
                );
                //upload provisioning profile via API
                await provisioningProfile.uploadFile(fileName, `${__dirname}/../client/public/uploads/broker/${fileName}`);
                //upload server to the database
                const server = await serverModel.create({
                    servername: servername,
                    serverFile: req.file !== null ? "./uploads/broker/" + fileName : "",
                });
                res.status(200).json({ server });
            }
            else {
                throw Error('type');
            }
        }
        throw Error("file")
    } catch (error) {
        const errors = uploadError(error);
        res.status(400).send(errors)
    }
}

exports.getAllServer = async function (req, res) {
        const provisioningProfiles = await api.provisioningProfileApi.getProvisioningProfiles();
        res.status(200).json({ provisioningProfiles });
}

exports.serverInfo = async function (req, res) {
    //fetch provisioning profiles via api
    const provisioningProfile = await api.provisioningProfileApi.getProvisioningProfile(req.params.id);
    res.status(200).json({ provisioningProfile });
}

exports.deleteServer = async function (req, res) {
    const provisioningProfile = await api.provisioningProfileApi.getProvisioningProfile(req.params.id);
    await provisioningProfile.remove();
    res.redirect('/'); 
}