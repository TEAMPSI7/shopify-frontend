'use client'
import React, { FormEvent, useState, ChangeEvent } from 'react';
import axios from 'axios';

// Define a type for variations
interface Variation {
    variationName: string;
    size?: string;
    color?: string;
    price: number;
    discountRate?: number;
    image?: File | null;
}

// Define a type for the form data
interface FormData {
    name: string;
    rating: number;
    numOfReviews: number;
    basePrice: number;
    discountRate: number;
    productImage: File | null; // Allowing File or null for file input
    variations: Variation[];
}

const Page: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        rating: 0,
        numOfReviews: 0,
        basePrice: 0,
        discountRate: 0,
        productImage: null,
        variations: []
    });

    // Handle text input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file input changes
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, productImage: e.target.files[0] });
        }
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('rating', formData.rating.toString());
        data.append('numOfReviews', formData.numOfReviews.toString());
        data.append('basePrice', formData.basePrice.toString());
        data.append('discountRate', formData.discountRate.toString());
        
        if (formData.productImage) {
            data.append('productImage', formData.productImage);
        }
        
        // Add variations if necessary (if you plan to handle variations later)
        // formData.variations.forEach((variation, index) => {
        //     data.append(`variations[${index}][variationName]`, variation.variationName);
        //     if (variation.size) data.append(`variations[${index}][size]`, variation.size);
        //     if (variation.color) data.append(`variations[${index}][color]`, variation.color);
        //     data.append(`variations[${index}][price]`, variation.price.toString());
        //     if (variation.discountRate) data.append(`variations[${index}][discountRate]`, variation.discountRate.toString());
        //     if (variation.image) data.append(`variations[${index}][image]`, variation.image);
        // });

        try {
            await axios.post('http://localhost:3001/api/products', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Product added successfully');
        } catch (error) {
            console.error('There was an error uploading the product!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-[8rem]'>
            <label htmlFor="name">Product Name</label>
            <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleInputChange}
                className='p-2 border border-gray-300 rounded-md'
            />
            <label htmlFor="rating">Rating</label>
            <input
                type="number"
                name="rating"
                placeholder="Rating"
                value={formData.rating}
                onChange={handleInputChange}
                className='p-2 border border-gray-300 rounded-md'
            />
            <label htmlFor="numOfReviews">Number of Reviews</label>
            <input
                type="number"
                name="numOfReviews"
                placeholder="Number of Reviews"
                value={formData.numOfReviews}
                onChange={handleInputChange}
                className='p-2 border border-gray-300 rounded-md'
            />
            <label htmlFor="basePrice">Base Price</label>
            <input
                type="number"
                name="basePrice"
                placeholder="Base Price"
                value={formData.basePrice}
                onChange={handleInputChange}
                className='p-2 border border-gray-300 rounded-md'
            />
            <label htmlFor="discountRate">Discount Rate</label>
            <input
                type="number"
                name="discountRate"
                placeholder="Discount Rate"
                value={formData.discountRate}
                onChange={handleInputChange}
                className='p-2 border border-gray-300 rounded-md'
            />
            <label htmlFor="productImage">Product Image</label>
            <input
                type="file"
                name="productImage"
                onChange={handleFileChange}
                accept='image/*'
            />
            {/* Add fields for variations if necessary */}
            <button type="submit" className='bg-blue-500 text-white p-2 rounded-md'>Submit</button>
        </form>
    );
};

export default Page;
