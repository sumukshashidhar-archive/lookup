module.exports = {


    extractMessage: function checkMessage(message) {
        var strs = '';
        var checker = false;
        for(let i=0; i<message.length; i++) {
            checker = true;
            if(message[i] == '{') {
                let j = i+1; 
                while (message[j] != '}') {
                    strs = strs + message[j];
                    j = j + 1;
                }
                return {"response":true, "message":strs}
            }
        }
        return {"response": false, "message":undefined}
    }, 

    modifyMessage: function modifyMessage(message) {
        var strs = '';
        var checker = false;
        for(let i=0; i<message.length; i++) {
            checker = true;
            if(message[i] == '{') {
                let j = i+1; 
                while (message[j] != '}') {
                    strs = strs + message[j];
                    j = j + 1;
                }
                return {"response":true, "message":strs}
            }
        }
        return {"response": false, "message":undefined}
    }
}