
class JokeBotStorage {
    constructor(){
        this.jokeBotStorage = window.localStorage;
    }
    /* 
     * @method - create
     * @return - none
     * @params - data: Object
     * @description - Create new value in local storage
     */
    create(data){
        const strData = JSON.stringify({by: data.by,content: data.content, date: data.date})
        localStorage.setItem(data.by+"_"+data.date, strData);
    }
    /* 
     * @method - getAll
     * @return - Array
     * @description - Query all saved chats
     */
    getAll(){
        var i = 0,
            output = [],
            sKey;
        for (; sKey = this.jokeBotStorage.key(i); i++) {
            output.push(JSON.parse(this.jokeBotStorage.getItem(sKey)));
        }
        output = output.sort((a, b) => new Date(a.date) - new Date(b.date))
        return output
    }
    /* 
     * @method - deleteAll
     * @return - none
     * @description - Delete all saved chats
     */
    deleteAll() {
        this.jokeBotStorage.clear()
    }
}

export default JokeBotStorage