// import React, { useState } from 'react';
// // import responsiveVoice from 'responsivevoice';
// // import ResponsiveVoice from 'responsivevoice';
// var responsiveVoice = require('responsiveVoice');

// const ArabicSpeechResponsiveVoice = (param) => {
//     const [isSpeaking, setIsSpeaking] = useState(false);

    
//     const speakArabic = () => {
//         console.log("Arabic bunga bunga....",param.audioData)
        
//         const options = {
//             lang: 'US English Female', // Specify Arabic language
//             pitch: 1, // Adjust pitch as needed
//             rate: 1, // Adjust speech rate as needed
//             volume: 50, // Adjust volume as needed
//         };
        
//         console.log("ResponsiveVoice --> ",responsiveVoice)
      
//         try {
//             setIsSpeaking(true);
//             console.log("responsiveVoice --> ",responsiveVoice.speak)
//             responsiveVoice.speak("Boom Boom", options);
//         } catch (err) {
//             console.error('Error speaking:', err);
//         } finally {
//             setIsSpeaking(false);
//         }
//     };

//     return (
//         <div>
//             <button onClick={speakArabic} disabled={isSpeaking} type="button">
//                 {isSpeaking ? 'Stop Speaking' : 'Speak Arabic'}
//             </button>
//         </div>
//     );
// };

// export default ArabicSpeechResponsiveVoice;
