import Chat from './chat.js'

const chat = new Chat();
const inputBox = document.getElementById("input-box-main")
const sendBtn = document.getElementById("btn-send")

inputBox.focus();
inputBox.addEventListener('keyup', (e)=>{
    e.preventDefault();
    const val = e.target.value;
    if(e.key==="Enter") {
        if(val.toString().trim().length > 2) {
            chat.addNewChat(val)
            e.target.value = ""
        }
    } else if(e.key==="Escape") {
        e.target.value = ""
    }
})

sendBtn.addEventListener('click', (e)=>{
    const val = inputBox.value;
    if(val.toString().trim().length > 2) {
        chat.addNewChat(val)
        inputBox.value = ""
    }
})