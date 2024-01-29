"use client"
import React from 'react';

const FormHeader = ({subtitle}) => {
    return (
        <div className='text-center' >
            <h1 className='headerText font-bold py-1  text-[--cardPrimary]'>Nakhlah</h1>
            <p className='normalText mb-8 text-2xl'>{subtitle}</p>
        </div >
    );
};

export default FormHeader;