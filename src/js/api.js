const API = {
    getJoke() {
        return new Promise(async (Resolve, Reject)=>{
            const jokeData = await fetch("http://localhost:8080/jokes", {
                method: "GET"
            });
            if(jokeData && jokeData.json().length > 0){
                Resolve(jokeData.json())
            } else {
                Reject("No joke found")
            }
        })
    },
    getRandomJoke() {
        return new Promise(async (Resolve, Reject)=>{
            const jokeData = await fetch("http://localhost:8080/get-random/", {
                method: "GET"
            });
            if(jokeData){
                const jsonRes = await jokeData.json()
                
                if(jsonRes.errorCode==="ErrorJokeEmpty") {
                    Reject(jsonRes.errorMessage)
                } else {
                    Resolve(jsonRes)
                }
            } else {
                Reject("No joke found")
            }
        })
    },
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