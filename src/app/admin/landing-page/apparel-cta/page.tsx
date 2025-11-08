'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function ApparelCTAAdmin() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/apparel-cta')
      .then((res) => res.json())
      .then((data) => {
        reset(data);
        setLoading(false);
      });
  }, [reset]);

  const onSubmit = async (data) => {
    await fetch('/api/apparel-cta', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="imageUrl">Image URL</label>
        <input id="imageUrl" {...register('imageUrl')} className="w-full p-2 border" />
      </div>
      <div>
        <label htmlFor="logoUrl">Logo URL</label>
        <input id="logoUrl" {...register('logoUrl')} className="w-full p-2 border" />
      </div>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" {...register('title')} className="w-full p-2 border" />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" {...register('description')} className="w-full p-2 border" />
      </div>
      <div>
        <label htmlFor="buttonText">Button Text</label>
        <input id="buttonText" {...register('buttonText')} className="w-full p-2 border" />
      </div>
      <div>
        <label htmlFor="buttonUrl">Button URL</label>
        <input id="buttonUrl" {...register('buttonUrl')} className="w-full p-2 border" />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
    </form>
  );
}
