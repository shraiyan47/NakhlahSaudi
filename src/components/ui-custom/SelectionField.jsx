' use client'
import * as React from "react"
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { LuChevronsUpDown } from 'react-icons/lu';
import { BiCheck } from 'react-icons/bi';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command';
import { cn } from "@/lib/utils"




const SelectionField = ({ form, data, name, subtitle }) => {
    const [open, setOpen] = React.useState(false)
    return (

        <FormField
            control={form.control}
            name={name}
            className='mb-5'
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild >
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className={cn(
                                        "w-full justify-between border-[3px] py-3 px-4 border-[--inputBorderPrimary] bg-[--bgSecondary] normalText text-black",
                                        !field.value && "text-black normalText border-[--inputBorderPrimary] bg-[--bgSecondary]"
                                    )}
                                >
                                    {field.value
                                        ? data.find(
                                            (item) => item.phonecode === field.value
                                        )?.name
                                        : subtitle}
                                    <LuChevronsUpDown className="text-[--inputBorderPrimary]" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] sm:w-[300px] md:w-[280px] lg:w-[250px] xl:w-[290px] 2xl:w-[400px] max-[1366px]:w-[300px] border-[1px] border-[--inputBorderPrimary] text-black  p-0">

                            <Command className=''>
                                <CommandInput placeholder="Search item..." />
                                <CommandEmpty>No item found.</CommandEmpty>
                                <CommandGroup className='h-20'>
                                
                                        
                                        {data.map((item) => (
                                            
                                            <CommandItem
                                                value={item.name}
                                                key={item.isoCode}

                                                onSelect={() => {
                                                    form.setValue(name, item.phonecode)
                                                    setOpen(false)
                                                }}
                                            >
                                                <BiCheck
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        item.phonecode === field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                                {item.name}
                                            </CommandItem>
                                        ))}
                                    
                                </CommandGroup>
                            </Command>

                        </PopoverContent>
                    </Popover>

                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default SelectionField;