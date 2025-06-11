'use client';

import { useForm } from 'react-hook-form';

const inputClass = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400 text-stone-600';
const errorTextClass = 'text-red-500 text-sm mt-1';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log('Login data:', data);
    // Aquí puedes conectar con tu sistema de auth o Web3 login
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        {...register('email', { required: true })}
        className={inputClass}
      />
      {errors.email && <p className={errorTextClass}>Email is required</p>}

      <input
        type="password"
        placeholder="Password"
        {...register('password', { required: true })}
        className={inputClass}
      />
      {errors.password && <p className={errorTextClass}>Password is required</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        Log In
      </button>
    </form>
  );
}

export function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log('Signup data:', data);
    // Aquí puedes registrar al usuario en tu sistema o smart contract
  };

  // Para verificar la contraseña en tiempo real
  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        {...register('name', { required: true })}
        className={inputClass}
      />
      {errors.name && <p className={errorTextClass}>Name is required</p>}

      <input
        type="email"
        placeholder="Email"
        {...register('email', { required: true })}
        className={inputClass}
      />
      {errors.email && <p className={errorTextClass}>Email is required</p>}

      <input
        type="password"
        placeholder="Password"
        {...register('password', { required: true })}
        className={inputClass}
      />
      {errors.password && <p className={errorTextClass}>Password is required</p>}

      <input
          type="password"
          placeholder="Repeat password"
          {...register('confirmPassword', {
            required: true,
            validate: (value) =>
              value === password || 'Passwords do not match',
          })}
          className={inputClass}
        />
        {errors.confirmPassword && (
          <p className={errorTextClass}>{errors.confirmPassword.message?.toString()}</p>
        )}

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 cursor-pointer"
      >
        Sign Up
      </button>
    </form>
  );
}
