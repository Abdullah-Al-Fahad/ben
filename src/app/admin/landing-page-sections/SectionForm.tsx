'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2, Loader2 } from 'lucide-react';

interface SectionFormProps {
  section: string;
  onClose: () => void;
}

export function SectionForm({ section, onClose }: SectionFormProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiEndpoint = `/api/${section}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(apiEndpoint);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const fetchedData = await res.json();
        setData(fetchedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [apiEndpoint]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prevData: any) => (prevData ? { ...prevData, [name]: value } : null));
  };

  const handleArrayChange = (index: number, value: string, key: string) => {
    setData((prevData: any) => {
        if (!prevData) return null;
        const newArray = [...prevData[key]];
        newArray[index] = value;
        return { ...prevData, [key]: newArray };
    });
  };

  const addArrayItem = (key: string) => {
    setData((prevData: any) => {
        if (!prevData) return null;
        return { ...prevData, [key]: [...prevData[key], ''] };
    });
  };

  const removeArrayItem = (index: number, key: string) => {
    setData((prevData: any) => {
        if (!prevData) return null;
        const newArray = prevData[key].filter((_: any, i: number) => i !== index);
        return { ...prevData, [key]: newArray };
    });
  };

  const handleComplexArrayChange = (index: number, field: string, value: string, key: string) => {
    setData((prevData: any) => {
      if (!prevData) return null;
      const newArray = [...prevData[key]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prevData, [key]: newArray };
    });
  };

  const addComplexArrayItem = (key: string, newItem: any) => {
    setData((prevData: any) => {
      if (!prevData) return null;
      return { ...prevData, [key]: [...prevData[key], newItem] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(apiEndpoint, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      alert(`${section} data updated successfully!`);
      onClose();
    } catch (err: any) {
      setError(err.message);
      alert(`Failed to update ${section} data: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-purple-500" /></div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-8">Error: {error}</div>;
  }

  if (!data) {
    return <div className="text-center p-8">No data found for {section}.</div>;
  }

  const renderFormFields = () => {
    return Object.keys(data).map((key) => {
      const value = data[key];

      if (Array.isArray(value)) {
        if (value.every(item => typeof item === 'string')) {
            return (
                <div key={key} className="p-4 border border-gray-200 dark:border-white/10 rounded-lg space-y-3">
                    <Label className="text-lg font-semibold">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</Label>
                    {value.map((item: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                            <Input
                                value={item}
                                onChange={(e) => handleArrayChange(index, e.target.value, key)}
                                className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 w-full"
                            />
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem(index, key)} className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => addArrayItem(key)} className="mt-2 bg-transparent border-purple-500 text-purple-500 dark:text-purple-400 hover:bg-purple-500 hover:text-white">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Item
                    </Button>
                </div>
            );
        }
        else if (value.every(item => typeof item === 'object' && item !== null)) {
            const newItem = Object.keys(value[0] || {}).reduce((acc, prop) => ({...acc, [prop]: ''}), {});
            return (
                <div key={key} className="p-4 border border-gray-200 dark:border-white/10 rounded-lg space-y-3">
                    <Label className="text-lg font-semibold">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</Label>
                    {value.map((item: any, index: number) => (
                        <div key={index} className="p-3 bg-gray-100 dark:bg-gray-800/50 rounded-md space-y-2">
                            {Object.keys(item).map(field => (
                                <div key={field}>
                                    <Label htmlFor={`${key}-${index}-${field}`} className="capitalize text-sm text-gray-600 dark:text-gray-400">{field}</Label>
                                    <Input
                                        id={`${key}-${index}-${field}`}
                                        value={item[field]}
                                        onChange={(e) => handleComplexArrayChange(index, field, e.target.value, key)}
                                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 mt-1"
                                    />
                                </div>
                            ))}
                             <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem(index, key)} className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500 !mt-3">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => addComplexArrayItem(key, newItem)} className="mt-2 bg-transparent border-purple-500 text-purple-500 dark:text-purple-400 hover:bg-purple-500 hover:text-white">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Item
                    </Button>
                </div>
            )
        }
      }

      const isTextarea = typeof value === 'string' && value.length > 100;
      return (
        <div key={key}>
          <Label htmlFor={key} className="capitalize text-base">{key.replace(/([A-Z])/g, ' $1')}</Label>
          {isTextarea ? (
            <Textarea id={key} name={key} value={value} onChange={handleChange} required rows={5} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 mt-1" />
          ) : (
            <Input id={key} name={key} value={value} onChange={handleChange} required className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 mt-1" />
          )}
        </div>
      );
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-1">
      {renderFormFields()}
      <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="ghost" onClick={onClose} className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200">
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
    </form>
  );
}
