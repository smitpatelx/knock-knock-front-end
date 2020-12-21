import Chat from './chat.js'
window.addEventListener('DOMContentLoaded', (event) => {
    const chat = new Chat();
    const inputBox = document.getElementById("input-box-main")
    const sendBtn = document.getElementById("btn-send")
    const createNewBtn = document.getElementById("create-new-btn")
    
    window.setTimeout(function (){
        inputBox.focus();
    })
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

    createNewBtn.addEventListener('click', (e)=>{
        chat.addNewChat("knock knock")
        inputBox.value = ""
        inputBox.focus()
    })
})