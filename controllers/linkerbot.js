module.exports = {


    checkMessage: function checkMessage(message) {
        var strs = '';
        for(let i=0; i<message.length; i++) {
            if(message[i] == '{') {
                let j = i; 
                while (message[j] != '}') {
                    strs = strs + message[j];
                    j = j + 1;
                }
                return strs;
            }
        }
    }
}