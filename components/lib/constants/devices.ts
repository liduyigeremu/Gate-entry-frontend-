
export type SelectOption = {
    id: number;
    name: string;
    value: string;
};

export const DeviceTypes: SelectOption[] = [
    { id: 1, name: 'Laptop', value: 'laptop' },
    { id: 2, name: 'Tablet', value: 'tablet' },
]
    
export const DeviceBrands: Record<string, SelectOption[]> = {
    laptop: [
        { id: 1, name: 'Apple', value: 'apple' },
        { id: 2, name: 'HP', value: 'hp' },
        { id: 3, name: 'Dell', value: 'dell' },
        { id: 4, name: 'Lenovo', value: 'lenovo' },
        { id: 5, name: 'ASUS', value: 'asus' },
        { id: 6, name: 'Acer', value: 'acer' },
        { id: 7, name: 'MSI', value: 'msi' },
        { id: 8, name: 'Microsoft', value: 'microsoft' },
        { id: 9, name: 'Samsung', value: 'samsung' },
    ],
    tablet: [
        { id: 1, name: 'Apple', value: 'apple' },
        { id: 2, name: 'Lenovo', value: 'lenovo' },
        { id: 3, name: 'ASUS', value: 'asus' },
        { id: 4, name: 'Samsung', value: 'samsung' },
    ]
}