import React from 'react';
import backgroundImage from '../../../public/hermoso-jardin-fresas-amanecer-doi-ang-khang-chiang-mai-tailandia.jpg'; 

const Login = () => {
  return (
    <div
      className="flex justify-center items-center font-sans h-full min-h-screen p-4"
      style={{
        backgroundImage: `url("/hermoso-jardin-fresas-amanecer-doi-ang-khang-chiang-mai-tailandia.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <div className="font-sans max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 items-center gap-8 h-full">
          <form className="max-w-lg w-full p-6 bg-opacity-70 bg-white rounded-2xl shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] flex flex-col justify-center">
            <div className="mb-12">
              <h3 className="text-gray-800 text-4xl font-extrabold">
                Iniciar sesión
              </h3>
              <p className="text-gray-800 text-sm mt-6">
                Vive una <b>EXPERIENCIA</b> distinta. ¡Regístrate y disfruta de los mejores productos!
              </p>
            </div>

            <div>
              <label className="text-gray-800 text-[15px] mb-2 block">
                Correo
              </label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="text"
                  required
                  className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
                  placeholder="Ingrese correo"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clipPath="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      strokeMiterlimit="10"
                      strokeWidth="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-gray-800 text-[15px] mb-2 block">
                Contraseña
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
                  placeholder="Ingrese contraseña"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 justify-between mt-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="shrink-0 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm text-gray-800"
                >
                  Recordar
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="jajvascript:void(0);"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                className="w-full shadow-xl py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-green-800 hover:bg-green-900 focus:outline-none"
              >
                Iniciar sesión
              </button>
            </div>
            <p className="text-sm mt-8 text-center text-gray-800">
              ¿No tienes cuenta?{" "}
              <a
                href="#"
                className="text-green-700 font-semibold tracking-wide hover:underline ml-1"
              >
                Regístrate Aquí
              </a>
            </p>
          </form>

          <div className="h-full md:py-6 flex items-center relative max-md:before:hidden before:absolute before:bg-gradient-to-r before:h-full before:w-3/4 before:right-0 before:z-0">
            <img
              src="/coffe.png"
              alt="Imagen de café"
              className="rounded-xl lg:w-4/5 md:w-11/12 z-50 relative"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
