import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const bookingSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  phone: z.string().min(6, 'Phone number is required'),
  people: z.string().min(1, 'Number of people is required'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageTitle: string;
  packagePrice: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, packageTitle, packagePrice }) => {
  const { t } = useLanguage();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      await addDoc(collection(db, 'bookings'), {
        ...data,
        packageTitle,
        packagePrice,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      
      toast.success(t('booking.notification'), {
        duration: 5000,
        style: {
          background: '#1B4D3E',
          color: '#D4AF37',
          padding: '16px',
          borderRadius: '8px',
        },
      });
      reset();
      onClose();
    } catch (error) {
      toast.error(t('booking.error'));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full m-4 relative animate-scale">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-xl font-bold text-[#1B4D3E] mb-4">
          {t('booking.title')} - {packageTitle}
        </h3>
        <p className="text-gray-600 mb-6">
          {t('booking.price')}: ${packagePrice}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('booking.firstName')}
            </label>
            <input
              type="text"
              {...register('firstName')}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('booking.lastName')}
            </label>
            <input
              type="text"
              {...register('lastName')}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('booking.phone')}
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('booking.people')}
            </label>
            <input
              type="number"
              min="1"
              {...register('people')}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            />
            {errors.people && (
              <p className="mt-1 text-sm text-red-600">{errors.people.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#1B4D3E] text-[#D4AF37] py-3 rounded-lg hover:bg-[#254332] transition-colors"
          >
            {t('booking.submit')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;