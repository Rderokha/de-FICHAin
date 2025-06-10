'use client';

import { useForm } from 'react-hook-form';

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
        className="w-full border p-2 rounded"
      />
      {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

      <input
        type="password"
        placeholder="Password"
        {...register('password', { required: true })}
        className="w-full border p-2 rounded"
      />
      {errors.password && <p className="text-red-500 text-sm">Password is required</p>}

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
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log('Signup data:', data);
    // Aquí puedes registrar al usuario en tu sistema o smart contract
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        {...register('name', { required: true })}
        className="w-full border p-2 rounded"
      />
      {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

      <input
        type="email"
        placeholder="Email"
        {...register('email', { required: true })}
        className="w-full border p-2 rounded"
      />
      {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

      <input
        type="password"
        placeholder="Password"
        {...register('password', { required: true })}
        className="w-full border p-2 rounded"
      />
      {errors.password && <p className="text-red-500 text-sm">Password is required</p>}

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 cursor-pointer"
      >
        Signup
      </button>
    </form>
  );
}
