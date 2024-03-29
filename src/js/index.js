import Chat from './chat.js'

window.addEventListener('DOMContentLoaded', () => {
    const chat = new Chat();
    const inputBox = document.getElementById("input-box-main")
    const sendBtn = document.getElementById("btn-send")
    const createNewBtn = document.getElementById("create-new-btn")
    const chatContainer = document.getElementsByClassName("chat-container")[0]

    // Get chats from localStorage and render it
    chat.getDataFromLocalStorage()

    // Focus on input, to improve UX
    // Scroll to bottom on load
    window.setTimeout(function (){
        if (chatContainer?.scrollTo) {
            chatContainer.scrollTo(0, chatContainer.scrollHeight)
        }
        inputBox.focus();
    })

    // Input box event listner for enter
    inputBox.addEventListener('keyup', (e)=>{
        e.preventDefault();
        const val = e.target.value;
        if(e.key==="Enter") {
            if(val.toString().trim().length > 1) {
                chat.addNewChat(val)
                e.target.value = ""
                chatContainer.scrollTo(0, chatContainer.scrollHeight)
            }
        } else if(e.key==="Escape") {
            e.target.value = ""
        }
    })

    // Send button on click event listner
    sendBtn.addEventListener('click', (e)=>{
        const val = inputBox.value;
        if(val.toString().trim().length > 1) {
            chat.addNewChat(val)
            inputBox.value = ""
        }
    })

    // Create new joke button on click event listner
    createNewBtn.addEventListener('click', (e)=>{
        chat.addNewChat("knock knock")
        inputBox.value = ""
        inputBox.focus()
    })
})