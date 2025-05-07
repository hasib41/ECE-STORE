import React, { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form';
import { useAddMerchandiseMutation } from '../../../redux/features/merchandises/merchandisesApi';
import Swal from 'sweetalert2';

const AddMerchandise = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [addMerchandise, {isLoading, isError}] = useAddMerchandiseMutation()
    const [imageFileName, setimageFileName] = useState('')
    const onSubmit = async (data) => {
 
        const newMerchandiseData = {
            ...data,
            coverImage: imageFileName
        }
        try {
            await addMerchandise(newMerchandiseData).unwrap();
            Swal.fire({
                title: "Merchandise added",
                text: "Your Merchandise is uploaded successfully!",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, It's Okay!"
              });
              reset();
              setimageFileName('')
              setimageFile(null);
        } catch (error) {
            console.error(error);
            alert("Failed to add merchandise. Please try again.")   
        }
      
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setimageFile(file);
            setimageFileName(file.name);
        }
    }
  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Merchandise</h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        {/* Reusable Input Field for Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter Merchandise title"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter Merchandise description"
          type="textarea"
          register={register}
        />

        {/* Reusable Select Field for Category */}
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'cricket Jersey', label: 'Cricket Jersey' },
            { value: 'football Jersey', label: 'Football Jersey' },
            { value: 'volleyball Jersey', label: 'Volleyball Jersey' },
            { value: 'fan t-shirt', label: 'Fan T-Shirt' },
            { value: 'winter collection', label: 'Winter Collection' },
          ]}
          register={register}
        />

        {/* Sleeve Type Field */}
        <SelectField
          label="Sleeve Type"
          name="sleeve"
          options={[
            { value: '', label: 'Choose Sleeve Type' },
            { value: 'half sleeve', label: 'Half Sleeve' },
            { value: 'full sleeve', label: 'Full Sleeve' }
          
          ]}
          register={register}
        />

        {/* Available Sizes */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Available Sizes</label>
          <div className="flex flex-wrap gap-2">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <label key={size} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={size}
                  {...register('availableSizes')}
                  className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm font-semibold text-gray-700">{size}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Year */}
        <InputField
          label="Year"
          name="year"
          type="number"
          placeholder="Enter year"
          defaultValue= {2025}
          register={register}
        />

        {/* Price */}
        <InputField
          label="Price"
          name="Price"
          type="number"
          placeholder="Price"
          register={register}
        />

        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
          {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
          {isLoading ? <span className="">Adding.. </span> : <span>Add Merchandise</span>}
        </button>
      </form>
    </div>
  )
}

export default AddMerchandise;