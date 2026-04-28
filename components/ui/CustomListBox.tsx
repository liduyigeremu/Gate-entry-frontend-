'use client'

/*
CustomListBox - client side, reusable ListBox
*/

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { type SelectOption } from "../lib/constants/devices";

interface CustomListBoxProps<T extends FieldValues, O extends SelectOption> {
    name: Path<T>;
    label: string;
    control: Control<T>;
    options: O[];
    placeholder: string;
}

const CustomListBox = <T extends FieldValues, O extends SelectOption>( {
    name,
    label,
    control,
    options,
    placeholder
}: CustomListBoxProps<T, O> ) => {
    return (
        <Controller
        name={name}
        control={control}
        render={({ field }) => {
            const selectedOption = options.find(opt => opt.value === field.value);

            return (
                <Listbox value={field.value} onChange={field.onChange}>

                    {({ open }) => (
                        <>
                        <label
                        htmlFor={name}
                        className="laptop-brand-label
                        text-xs w-fit py-1 label
                        md:py-2">
                        {label}
                        </label>
                        <ListboxButton
                        id={name}
                        className={`relative text-left text-muted w-full py-2 px-4 border rounded-4xl placeholder-placeholder cursor-pointer shadow-input
                        focus:outline-none focus:border-input-focus
                        md:py-3 md:px-6 md:mb-2
                        ${open
                        ? "border-input-focus z-10"
                        : "border-input"}`}>

                            {selectedOption?.name ?? <span className="text-placeholder">{placeholder}</span>}
                            <ChevronDown
                            className={`
                                absolute right-3 top-1/3 size-4
                                transition-transform duration-200
                                md:size-6 md:top-1/4
                                ${open ? 'rotate-180' : 'rotate-0'}
                            `}/>

                        </ListboxButton>

                        <div className="relative">

                            <ListboxOptions className="absolute bg-white top-0 w-full py-1 border border-input rounded-lg z-10
                            focus:outline-none">
                                
                                {options.map((option) => (
                                    <ListboxOption key={option.id} value={option.value}
                                    className=" py-1 px-6 hover:bg-fuchsia-50 hover:cursor-pointer">
                                        {option.name}
                                    </ListboxOption>
                                ))}
                                
                            </ListboxOptions>
                        </div>
                        </>
                    )}

                </Listbox>
            )
        } }
        />
        
    )
}

export default CustomListBox;