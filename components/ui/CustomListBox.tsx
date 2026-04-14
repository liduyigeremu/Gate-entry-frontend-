'use client'

/*
CustomListBox - client side, reusable ListBox
*/

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { type SelectOption } from "../lib/constants/brands";

interface LaptopBrandsSelectProps<T extends FieldValues, O extends SelectOption> {
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
}: LaptopBrandsSelectProps<T, O> ) => {
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
                        font-semibold text-sm w-fit py-2 tracking-wider">
                        {label}
                        </label>
                        <ListboxButton
                        id={name}
                        className={`relative text-left w-full py-3 px-6 border-2 rounded-4xl placeholder-gray-500 cursor-pointer z-10
                        focus:outline-none focus:border-fuchsia-200
                        ${open
                        ? "border-fuchsia-200"
                        : "border-gray-200"}`}>

                            {selectedOption?.name ?? placeholder}
                            <ChevronDown
                            className={`
                                absolute text-gray-600 right-3 top-3
                                transition-transform duration-200
                                ${open ? 'rotate-180' : 'rotate-0'}
                            `}/>

                        </ListboxButton>

                        <div className="relative">

                            <ListboxOptions className="absolute bg-white -top-7 w-full border-x border-b border-gray-200 rounded-b-lg pt-8
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