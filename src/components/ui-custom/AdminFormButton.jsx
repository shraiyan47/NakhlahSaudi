import { Button } from '@/components/ui/button';
import React from 'react';

const AdminFormButton = ({title}) => {
    return (
        <Button type="submit" className='w-full text-xl bg-[#f0f2ff] text-[--uDHoverButton] hover:bg-[#f0f2ff] '>{title}</Button>
    );
};

export default AdminFormButton;