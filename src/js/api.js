const API = {
    api: 'http://knock.local/',
    /* 
     * @method - getRandomJoke
     * @return - Promise
     * @description - Query random joke from our API
     */
    getRandomJoke() {
        return new Promise(async (Resolve, Reject)=>{
            let jokeData
            try {
                jokeData = await fetch(this.api+"get-random/", {
                    method: "GET"
                });
            } catch(err) {
                Reject("API not reachable! Please contact admin")
            }

            if(jokeData){
                const jsonRes = await jokeData.json()
                if(jsonRes.errorCode==="ErrorJokeEmpty") {
                    Reject(jsonRes.errorMessage)
                } else {
                    Resolve(jsonRes)
                }
            } else {
                Reject("jokeData undefined, please constact admin!")
            }
        })
    },
    /* 
     * @method - saveJoke
     * @return - Promise
     * @params - data: Object
     * @description - Save new joke to our API
     */
    saveJoke(data){
        return new Promise(async (Resolve, Reject)=>{
            let jokeData
            try {
                jokeData = await fetch(this.api+"jokes/", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            } catch(err) {
                Reject("API not reachable! Please contact admin")
            }

            if(jokeData){
                Resolve(jokeData.json())
            } else {
                Reject("Error saving your Joke! Please try again.")
            }
        })
    },
    /* 
     * @method - deleteAllJokes
     * @return - Promise
     * @description - Delete all jokes from API
     */
    deleteAllJokes(){
        return new Promise(async (Resolve, Reject)=>{
            let jokeData
            try {
                jokeData = await fetch(this.api+"clear-all/", {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
            } catch(err) {
                Reject("API not reachable! Please contact admin")
            }
            
            if(jokeData){
                const jsonRes = await jokeData.json()
                
                if(jsonRes.errorCode==="ErrorDelJoke") {
                    Reject(jsonRes.errorMessage)
                } else {
                    Resolve(jsonRes)
                }
            } else {
                Reject("Error deleting all jokes!")
            }
        })
    }
}

export default API