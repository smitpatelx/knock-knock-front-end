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
    }
}

export default API