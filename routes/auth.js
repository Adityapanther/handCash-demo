const {HandCashConnect} = require('@handcash/handcash-connect');
const handCashConnect = new HandCashConnect(process.env.HAND_APPID);

// const account = handCashConnect.getAccountFromAuthToken(process.env.HAND_AUTH_TOKEN);
const SwaggerTest = require('@panthernine/swagger_test_sdk')
const mine = require('../schema/my');
const api = new SwaggerTest.UserApi();


async function auth(fastify, opts){
    // const profile = await account.profile.getCurrentProfile();
    
    fastify.post('/userProfile', {
                schema: mine,
                schema: {
    description: 'user profile info data',
    tags: ["user"],
    summary: 'abc',
    security: [{
        apiKey:{}
    }],
},}, (req, rep) =>{
    console.log(JSON.parse(req.headers.listme)[0]);
    
        const {
            publicProfile,
            privateProfile
        } = profile;
        rep.send(profile)
    })

    fastify.get('/getSpendableBalance', async(req, rep) =>{
        const balance = await account.wallet.getSpendableBalance();
        rep.send(balance)
    })

    fastify.get('/getFriends', async(req,rep) =>{
        const friendList = await account.profile.getFriends();
        rep.send(friendList.length)
    });


    fastify.post('/makePayment', async(req, rep) =>{
        const {sendAmount, desc, to} = req.body;
        // console.log(`${sendAmount}, ${desc}, ${to}`);
        const paymentParams = {
            description: desc.toString(),
            appAction: "like",
            payments: [
                {
                    destination: to.toString(),
                    currencyCode: 'DUR',
                    sendAmount: parseInt(sendAmount)
                },
            ]
        }

        const paymentResult = await account.wallet.pay(paymentParams);
        rep.send(paymentResult)
    })

    fastify.get('/test', (req, res)=>{
        const opts = {
            "email": "12@gmail.com",
            "password": "12345"
        }
        
        const callback = function(err, data, response){

            
            if(err){
                res.send(JSON.parse(err.response.text))
                return ;
            }
            console.log("data");
            
            
            
        }
        try{
            api.authGet(opts, callback)
        }catch(e){
            console.log(`catch ${e.response}`);
            
        }
    })

    fastify.get('/test2', (req, res)=> {

        const opts = {
            authToken: "xmp"
        }
        const callback = function(err, data){
            if(err){
                res.send(JSON.parse(err.response.text));
                return null;
            }

            res.send(data);
        }

        api.pageListGet(opts, callback);
        
    })


}


module.exports = auth;