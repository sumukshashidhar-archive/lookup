module.exports = {


    checkMessage: async function checkMessage(message) {

        var checkPromise = new Promise(function(res, rej) {
            console.log(message)
            res(true)
        })

        let checkMessageReturn = await checkMessage; 
        return checkMessage
    }
}