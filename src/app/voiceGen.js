import { Volume2 } from 'lucide-react'
import React from 'react'

function RVVoiceGen(x) {
    console.log("contentDetailsAudio ===> ",x.contentDetailsAudio)
    const isResponsiveVoiceLoaded = window.localStorage.getItem("RV")

    const handleSpeak = () => {
        console.log("ResponsiveVoice Loaded:", isResponsiveVoiceLoaded)
        console.log("ResponsiveVoice Available:", window.responsiveVoice)
        if (window.responsiveVoice && isResponsiveVoiceLoaded) {
            // if (window.responsiveVoice) {
            window.responsiveVoice.speak(x.contentDetailsAudio, "Arabic Male", { pitch: .9 }, { rate: .5 })
            console.log("Text spoken.")
        } else {
            console.log("ResponsiveVoice not loaded yet.")
        }
    }
    return (
        <div>
            <p type="button" onClick={handleSpeak} className="pt-3 pb-1 px-3" style={{ cursor: "pointer", maxWidth: "15px" }}>
                <i className="fa fa-volume-up"></i>
                <Volume2 />
            </p>
        </div>
    )
}

export default RVVoiceGen
