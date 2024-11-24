import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { Package, Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface TravelPackage {
  id: string;
  title: string;
  price: string;
  duration: string;
  includes: string[];
  image: string;
}

const PackagesPage = () => {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<TravelPackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'packages'));
      const packagesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TravelPackage[];
      setPackages(packagesData);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch packages');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const imageFile = (form.querySelector('input[type="file"]') as HTMLInputElement).files?.[0];

    try {
      let imageUrl = editing?.image || '';

      if (imageFile) {
        const storageRef = ref(storage, `packages/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const packageData = {
        title: formData.get('title') as string,
        price: formData.get('price') as string,
        duration: formData.get('duration') as string,
        includes: (formData.get('includes') as string).split(',').map(item => item.trim()),
        image: imageUrl
      };

      if (editing) {
        await updateDoc(doc(db, 'packages', editing.id), packageData);
        toast.success('Package updated successfully');
      } else {
        await addDoc(collection(db, 'packages'), packageData);
        toast.success('Package added successfully');
      }

      setIsModalOpen(false);
      setEditing(null);
      fetchPackages();
    } catch (error) {
      toast.error('Failed to save package');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await deleteDoc(doc(db, 'packages', id));
        toast.success('Package deleted successfully');
        fetchPackages();
      } catch (error) {
        toast.error('Failed to delete package');
      }
    }
  };

  if (loading) return <div>Loading packages...</div>;

  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Package className="w-6 h-6 text-[#20392B]" />
          <h1 className="text-2xl font-bold text-[#20392B]">Packages</h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#20392B] text-[#C6A869] rounded-md hover:bg-[#254332] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden animate-scale stagger-1">
            <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#20392B]">{pkg.title}</h3>
              <p className="text-gray-600">${pkg.price} - {pkg.duration}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    setEditing(pkg);
                    setIsModalOpen(true);
                  }}
                  className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="flex items-center gap-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded-md"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-[#20392B] mb-4">
              {editing ? 'Edit Package' : 'Add New Package'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editing?.title}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#C6A869] focus:ring focus:ring-[#C6A869] focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="text"
                  name="price"
                  defaultValue={editing?.price}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#C6A869] focus:ring focus:ring-[#C6A869] focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <input
                  type="text"
                  name="duration"
                  defaultValue={editing?.duration}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#C6A869] focus:ring focus:ring-[#C6A869] focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Includes (comma-separated)
                </label>
                <input
                  type="text"
                  name="includes"
                  defaultValue={editing?.includes.join(', ')}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#C6A869] focus:ring focus:ring-[#C6A869] focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#20392B] file:text-[#C6A869] hover:file:bg-[#254332]"
                />
                {editing?.image && (
                  <img src={editing.image} alt="Current" className="mt-2 h-32 object-cover rounded-md" />
                )}
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditing(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#20392B] text-[#C6A869] rounded-md hover:bg-[#254332] transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagesPage;