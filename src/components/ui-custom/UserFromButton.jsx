import { Button } from '@/components/ui/button';
import React from 'react';

const UserFromButton = ({title}) => {
    return (
        <Button type="submit" className='buttonColor'>{title}</Button>
    );
};

export default UserFromButton;