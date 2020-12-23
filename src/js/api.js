const API = {
    /* 
     * @method - getRandomJoke
     * @return - Promise
     * @description - Query random joke from our API
     */
    getRandomJoke() {
        return new Promise(async (Resolve, Reject)=>{
            try {
                const jokeData = await fetch("http://localhost:8080/get-random/", {
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
                Reject("Sorry we couldn't find any jokes! But you can add one. Type <b>\"Knock Kncok\"</b>")
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
            const jokeData = await fetch("http://localhost:8080/jokes/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
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
            const jokeData = await fetch("http://localhost:8080/clear-all/", {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
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