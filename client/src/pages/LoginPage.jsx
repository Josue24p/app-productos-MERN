import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate()

  //me va devolver los datos, lo vemos en consola
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  //comprueba si está autenticado o no, si es si lo direcciona a products
  useEffect(()=>{
    if(isAuthenticated) navigate('/products')
  },[isAuthenticated])

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="className= bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {signinErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-bold my-">Login</h1>
        <form onSubmit={onSubmit}>
          {/*Sirve para que ya tengamos los valores que tipea el usuario ya en un estado*/}
          {/*  <input type="text"{...register('username', { required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Username'
                />
                {errors.username && (
                    <p className='text-red-500'>Username is required</p>
                )} */}
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button type="submit"
          className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'
          >Login</button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Don't have an account?{" "}
          <Link to="/register" className="text-sky-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
