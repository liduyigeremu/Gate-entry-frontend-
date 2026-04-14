'use client'

/*
CustomImageDropzone -  client side, reusable image type input
*/

import { FileUp } from "lucide-react";
import { X } from "lucide-react";
import { Control, Controller, FieldValues, Path, useWatch } from "react-hook-form";
import { useState, useEffect } from "react";
import Image from "next/image";

interface CustomImageDropzoneProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    placeholder: string;
}

const CustomImageDropzone = <T extends FieldValues>( {
    name,
    control,
    placeholder
} : CustomImageDropzoneProps<T> ) => {
    const [previewURL, setPreviewURL] = useState<string | null>(null);
    const currentFile = useWatch({ control, name }) as File;

    useEffect(() => {
        if (currentFile instanceof File) {
            const url = URL.createObjectURL(currentFile);
            // eslint-disable-next-line
            setPreviewURL(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewURL(null);
        }
    }, [currentFile])

    return (
        <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <label
            htmlFor={name}
            onDragOver={ (e) => e.preventDefault()}
            onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) field.onChange(file);
            }}
            className={`relative flex flex-col min-w-50 h-50 border-2 border-dashed border-fuchsia-300
            items-center justify-center rounded-4xl
            ${previewURL && 'border-none'}`}
            >
                {previewURL
                    ?  <>
                        <Image
                        src={previewURL}
                        alt={`${placeholder}preview`}
                        fill
                        className="object-cover rounded-4xl"/>
                    
                        <button
                        type="button"
                        onClick={() => field.onChange(undefined)}
                        aria-label="Remove Image"
                        className="bg-white/70 absolute flex top-3 right-3 size-7 p-1 rounded-full duration-200
                        hover:bg-white"
                        >
                            <X  className="size-full text-primary"/>
                        </button>
                        </>
                    :   <>
                        <div className="size-10 p-2 bg-fuchsia-100 rounded-full">
                        <FileUp className="size-full text-primary" />
                        </div>
                        <div className="font-semibold p-1">
                        {placeholder}
                        </div>
                        <div className="text-xs text-gray-400">
                        DROP IMAGE OR BROWSE
                        </div>
                        <input
                        id={name}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        ref={field.ref}
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                        </>
                    }

            </label>
        )}
        />
    )
}

export default CustomImageDropzone;
