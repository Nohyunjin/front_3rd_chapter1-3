import React, { useState } from 'react';
import { useCallback } from '../@lib';
import { useNotificationContext } from '../hooks/notificationHooks';
import { renderLog } from '../utils';

interface FormData {
  name: string;
  email: string;
  age: number;
  preferences: string[];
}

const ComplexForm: React.FC = () => {
  renderLog('ComplexForm rendered');
  const { addNotification } = useNotificationContext();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: 0,
    preferences: [],
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      addNotification('폼이 성공적으로 제출되었습니다', 'success');
    },
    [addNotification]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'age' ? parseInt(value) || 0 : value,
      }));
    },
    []
  );

  const handlePreferenceChange = useCallback((preference: string) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter((p) => p !== preference)
        : [...prev.preferences, preference],
    }));
  }, []);

  return (
    <div className='mt-8'>
      <h2 className='text-2xl font-bold mb-4'>복잡한 폼</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleInputChange}
          placeholder='이름'
          className='w-full p-2 border border-gray-300 rounded bg-white text-black dark:bg-gray-700 dark:text-white'
        />
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleInputChange}
          placeholder='이메일'
          className='w-full p-2 border border-gray-300 rounded bg-white text-black dark:bg-gray-700 dark:text-white'
        />
        <input
          type='number'
          name='age'
          value={formData.age}
          onChange={handleInputChange}
          placeholder='나이'
          className='w-full p-2 border border-gray-300 rounded bg-white text-black dark:bg-gray-700 dark:text-white'
        />
        <div className='space-x-4'>
          {['독서', '운동', '음악', '여행'].map((pref) => (
            <label key={pref} className='inline-flex items-center'>
              <input
                type='checkbox'
                checked={formData.preferences.includes(pref)}
                onChange={() => handlePreferenceChange(pref)}
                className='form-checkbox h-5 w-5 text-blue-600'
              />
              <span className='ml-2'>{pref}</span>
            </label>
          ))}
        </div>
        <button
          type='submit'
          className='w-full p-2 rounded bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700'
        >
          제출
        </button>
      </form>
    </div>
  );
};

export default ComplexForm;
