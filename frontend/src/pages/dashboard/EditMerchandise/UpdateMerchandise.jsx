import React, { useEffect, useState } from 'react'
import InputField from '../addMerchandise/InputField'
import SelectField from '../addMerchandise/SelectField'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchMerchandiseByIdQuery, useUpdateMerchandiseMutation } from '../../../redux/features/merchandises/merchandisesApi';
import Swal from 'sweetalert2';
import Loading from '../../../components/Loading';

const UpdateMerchandise = () => {
  const { id } = useParams();
  const { data: merchandiseData, isLoading, isError, refetch } = useFetchMerchandiseByIdQuery(id);
  const [updateMerchandise] = useUpdateMerchandiseMutation();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [imageFileName, setImageFileName] = useState('');

  useEffect(() => {
    if (merchandiseData) {
      setValue('title', merchandiseData.title);
      setValue('description', merchandiseData.description);
      setValue('category', merchandiseData.category);
      setValue('sleeve', merchandiseData.sleeve);
      setValue('year', merchandiseData.year);
      setValue('Price', merchandiseData.Price);
      setImageFileName(merchandiseData.coverImage);
    }
  }, [merchandiseData, setValue]);

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      coverImage: imageFileName
    };

    try {
      await updateMerchandise({ id, updatedData }).unwrap();
      Swal.fire({
        title: "Merchandise Updated",
        text: "Your merchandise is updated successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Great!"
      });
      await refetch();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update merchandise.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFileName(file.name); // Adjust this if you’re uploading and saving URL
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching merchandise data</div>;

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Merchandise</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter Merchandise title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter description"
          type="textarea"
          register={register}
        />

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

        <InputField
          label="Year"
          name="year"
          type="number"
          placeholder="Enter year"
          register={register}
        />

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

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
          Update Merchandise
        </button>
      </form>
    </div>
  )
};

export default UpdateMerchandise;