const handleClick =(event,item)=>{
    event.stopPropagation()
    const value = new SpeechSynthesisUtterance(item)
    window.speechSynthesis.speak(value)
}
export default handleClick;