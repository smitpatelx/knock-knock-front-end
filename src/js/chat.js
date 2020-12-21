import API from './api.js'
class Chat {
    constructor(){
        this.chatContent = ''
        this.unfiltered = ''
        this.questions = [
            "Who’s there?",
            " who?",
            "Ha Ha, that’s a good one."
        ]
        this.formattedQuestion=[]
        this.answers = []
        this.queStart=false
        this.currentSequence=0
    }
    addNewChat(text){
        this.sanitize(text)
        const newChat = this.renderChatBubble();
        this.mountChat(newChat);
        this.resopnd()
    }
    renderChatBubble(className = "right"){
        let bubble = document.createElement('div');
        bubble.innerHTML=this.chatContent;
        bubble.className=className;
        return bubble;
    }
    mountChat(chatInstance){
        const chatContainer = document.querySelector(".chat-bubble-container");
        chatContainer.appendChild(chatInstance)
        // Scroll to bottom of the chat container
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    async resopnd(){
        const tellMeJoke = new RegExp(/\btell\b/gm);
        const startSequence = new RegExp(/\bknock knock\b/gm);
        const showAllCommands = new RegExp(/^\$show-all-cmd\b/gm);
        const deleteAllJoke = new RegExp(/^\$delete-all\b/gm);
        const command = this.unfiltered.toString().toLowerCase();

        if (tellMeJoke.exec(command) && this.queStart===false) {
            // Fetch new Jokes
            try {
                const data = await API.getRandomJoke();
                this.chatContent = data.joke_content;
                const newChat = this.renderChatBubble("left");
                this.mountChat(newChat);
            } catch(err) {
                this.chatContent = "Sorry we couldn't find any jokes! But you can add one. Type <b>\"Knock Kncok\"</b>";
                const newChat = this.renderChatBubble("left");
                this.mountChat(newChat);
            }
        } else if (showAllCommands.exec(command) && this.queStart===false) {
            // Show list of all commands
            this.chatContent = "<b>tell me a joke</b> : Tells you a random joke from our API.<br/><b>knock knock</b> : Ask your input to create a new joke.<br/><b>$clear-all</b> : Clear all chat from index DB.<br/><b>$delete-all</b> : Delete all jokes from our API.";
            const newChat = this.renderChatBubble("left");
            this.mountChat(newChat);
        } else if (deleteAllJoke.exec(command) && this.queStart===false) {
            // Deleting all jokes
            try {
                const data = await API.deleteAllJokes();
                this.chatContent = "Successfully deleted all jokes!";
                const newChat = this.renderChatBubble("left");
                this.mountChat(newChat);
            } catch(err) {
                this.chatContent = err;
                const newChat = this.renderChatBubble("left");
                this.mountChat(newChat);
            }
        } else if (startSequence.exec(command) && this.queStart===false) {
            // Ask for a new joke
            this.queStart=true
            console.log("Start new joke sequence")
        }

        // Joke Sequence
        if(this.queStart===true && this.currentSequence<=(this.questions.length)){
            this.initializeJokeSeq();
        }
    }
    sanitize(characters){
        this.unfiltered = characters;
        this.chatContent = characters
            .replace(/</g, "&lt;")
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/>/g, "&gt;");
    }
    resetSequence(){
        this.formattedQuestion=[]
        this.queStart=false;
        this.answers=[]
        this.currentSequence=0
    }
    async initializeJokeSeq(){
        this.answers.push(this.chatContent);
        if(this.currentSequence===1){
            this.chatContent = this.unfiltered+this.questions[this.currentSequence];
        } else {
            this.chatContent = this.questions[this.currentSequence];
        }
        this.formattedQuestion.push(this.chatContent)
        const newChat = this.renderChatBubble("left");
        this.mountChat(newChat);

        this.currentSequence++
        if (this.currentSequence==(this.questions.length)){
            let text = '';
            this.formattedQuestion.map((q, index)=>{
                text+="<b>User    : </b>"+this.answers[index]+"<br/>"
                text+="<b>JokeBot : </b>"+q+"<br/>"
            })
            this.chatContent=text
            const newChat = this.renderChatBubble("left");
            this.mountChat(newChat);

            const jokeFinalData = {joke_content: text, pub_date: new Date().toISOString()}

            try {
                await API.saveJoke(jokeFinalData);
            } catch(err) {
                this.chatContent = err;
                const newChat = this.renderChatBubble("left");
                this.mountChat(newChat);
            }

            this.resetSequence();
        }
    }
}

export default Chat