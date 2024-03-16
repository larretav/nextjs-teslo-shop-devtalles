'use client';
import { login, registerUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link"
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"

type FormInputs = {
  name: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>()

  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    
    const { email, name, password } = data;

    const resp = await registerUser(name, email, password);

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    const respLogin = await login(email.toLowerCase(), password);

    console.log(respLogin)

    window.location.replace('/')

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

      {/* {
        errors.name?.type === 'required' && <span className="text-red-500">* El nombre es obligatorio</span>
      } */}

      <label htmlFor="name">Nombre completo</label>
      <input
        id="name"
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            {
              'border-red-500': errors.name
            }
          )
        }
        type="text"
        autoFocus
        {...register('name', { required: true })}

      />

      <label htmlFor="email">Correo electrónico</label>
      <input
        id="email"
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            {
              'border-red-500': errors.email
            }
          )
        }
        type="email"
        {...register('email', { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
      />


      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            {
              'border-red-500': errors.password
            }
          )
        } type="password"
        {...register('password', { required: true, minLength: 6 })}
      />

      <button
        
        className="btn-primary">
        Crear cuenta
      </button>

      {errorMessage && <span className="mt-2 text-red-500">{errorMessage}</span>}

      {/* Divider */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/login"
        className="btn-secondary text-center">
        Ingresar
      </Link>

    </form>
  )
}
