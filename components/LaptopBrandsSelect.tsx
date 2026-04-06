'use client'

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useState } from "react";

const LaptopBrands = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'HP'},
    { id: 3, name: 'Dell' },
    { id: 4, name: 'Lenovo' },
    { id: 5, name: 'ASUS' },
    { id: 6, name: 'Acer' },
    { id: 7, name: 'MSI' },
    { id: 8, name: 'Microsoft' },
    { id: 9, name: 'Samsung' },
]

const LaptopBrandsSelect = () => {
    const [selected, setSelected] = useState(LaptopBrands[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>

        <ListboxButton className="text-left w-full py-3 px-6 border-2 border-gray-200 rounded-4xl placeholder-gray-500 cursor-pointer z-10
        focus:outline-none focus:border-fuchsia-200">
            {selected.name}
        </ListboxButton>

        <div className="relative">

            <ListboxOptions className="absolute bg-white -top-7 w-full border-x border-b border-gray-200 rounded-b-lg pt-8
            focus:outline-none">
                
                {LaptopBrands.map((brand) => (
                    <ListboxOption key={brand.id} value={brand}
                    className=" py-1 px-6 hover:bg-fuchsia-50 hover:cursor-pointer">
                        {brand.name}
                    </ListboxOption>
                ))}
                
            </ListboxOptions>
        </div>

    </Listbox>
  )
}

export default LaptopBrandsSelect;
