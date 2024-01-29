import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IoMdNotifications } from 'react-icons/io'

const NotificationAvatar = ({ isAdmin }) => {
    const tags = [
        {
            id: 1,
            title: 'hello'
        },
        {
            id: 2,
            title: 'hello'
        },
        {
            id: 3,
            title: 'hello'
        },
        {
            id: 4,
            title: 'hello'
        },
        {
            id: 5,
            title: 'hello'
        },
        {
            id: 6,
            title: 'hello'
        },

    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>

                {
                    isAdmin ? <Avatar className="h-12 w-12 cursor-pointer bg-[#fad7dd]">
                        <AvatarFallback className={'flex items-center justify-center pt-1  text-[#f67584]'}>3</AvatarFallback>
                    </Avatar> : <div className='relative'>
                        <IoMdNotifications className='text-3xl mt-1 text-[--cardPrimary]' />
                        <div className='absolute -top-1 -left-1 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center'>
                            <p className='text-xl pt-1 text-white'>5</p>
                        </div>
                    </div>}

            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 border-none shadow mt-2" align="end" forceMount>
                <ScrollArea className="w-full h-36  rounded-md ">
                    <div className="p-4">
                        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                        {
                            tags.map(item => (
                                <div key={item.id}>

                                    <div className="text-sm">
                                        {item.title}
                                    </div>
                                    <Separator className="my-2" />

                                </div>
                            ))
                        }

                    </div>
                </ScrollArea>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NotificationAvatar;