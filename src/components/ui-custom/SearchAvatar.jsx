import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FiSearch } from 'react-icons/fi'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';


const SearchAvatar = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
               
                <p className='text-2xl hover:text-uDHoverText'><FiSearch /></p>
                
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 border-none shadow mt-2" align="end" forceMount>
                <Command className="w-full rounded-lg">
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            <CommandItem>

                                <span>Calendar</span>
                            </CommandItem>
                            <CommandItem>

                                <span>Search Emoji</span>
                            </CommandItem>
                            <CommandItem>

                                <span>Calculator</span>
                            </CommandItem>
                        </CommandGroup>

                    </CommandList>
                </Command>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SearchAvatar;