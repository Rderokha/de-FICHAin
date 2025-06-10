'use client';

import { useForm } from 'react-hook-form';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log('Login:', data);
    // Aquí puedes conectar con tu sistema de auth o Web3 login
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="email"
        placeholder="Correo"
        {...register('email', { required: true })}
        className="w-full border p-2 rounded"
      />
      {errors.email && <p className="text-red-500 text-sm">Correo requerido</p>}

      <input
        type="password"
        placeholder="Contraseña"
        {...register('password', { required: true })}
        className="w-full border p-2 rounded"
      />
      {errors.password && <p className="text-red-500 text-sm">Contraseña requerida</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        Iniciar sesión
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
    console.log('Signup:', data);
    // Aquí puedes registrar al usuario en tu sistema o smart contract
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="text"
        placeholder="Nombre"
        {...register('name', { required: true })}
        className="w-full border p-2 rounded"
      />
      {errors.name && <p className="text-red-500 text-sm">Nombre requerido</p>}

      <input
        type="email"
        placeholder="Correo"
        {...register('email', { required: true })}
        className="w-full border p-2 rounded"
      />
      {errors.email && <p className="text-red-500 text-sm">Correo requerido</p>}

      <input
        type="password"
        placeholder="Contraseña"
        {...register('password', { required: true })}
        className="w-full border p-2 rounded"
      />
      {errors.password && <p className="text-red-500 text-sm">Contraseña requerida</p>}

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 cursor-pointer"
      >
        Registrarse
      </button>
    </form>
  );
}
