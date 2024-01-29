"use client"

import React from 'react';
import LeftNavbarItem from './LeftNavbarItem';

const AdminLeftNavbarSection = ({title, list}) => {
    return (
        <>
            <p className='mb-2 textSmall textSecondaryColor'>{title}</p>
            {
                list.map(item => (
                    <LeftNavbarItem key={item.id} item={item} />
                ))
            }
        </>
    );
};

export default AdminLeftNavbarSection;