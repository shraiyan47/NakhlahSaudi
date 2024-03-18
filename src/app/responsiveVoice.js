"use client";
import Script from 'next/script'
import React, { useEffect, useState } from 'react'

function ResponsiveVoice(x) {
    // //alert(x);
    const [isResponsiveVoiceLoaded, setIsResponsiveVoiceLoaded] = useState(false)
    useEffect(() => {
        // Check if ResponsiveVoice is already available in the global scope
        if (window.responsiveVoice) {
            setIsResponsiveVoiceLoaded(true)
        }
    }, [])

    useEffect(() => {
        window.localStorage.setItem("RV", isResponsiveVoiceLoaded)
    }, [isResponsiveVoiceLoaded]);

    const key = 'MsWPQFPp'
    // const key = 'iXY3jNNL'
    return (
            <Script
                src={"https://code.responsivevoice.org/responsivevoice.js?key=" + key}
                // strategy="afterInteractive"
                strategy="beforeInteractive"
                onLoad={() => setIsResponsiveVoiceLoaded(true)}
            />
    )
}

export default ResponsiveVoice
