import React from "react";

import { GrSecure } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiCoffeeBeans, GiDeliveryDrone } from "react-icons/gi";

const Banner = () => {
  return (
    <div className="min-h-[550px] flex justify-center items-center py-12 sm:py-0">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* sección de imagen */}
          <div data-aos="zoom-in">
            <img
              src="esmeralda1.png"
              alt="Café en Grano"
              className="max-w-[500px] h-[500px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
            />
          </div>

          {/* sección de detalles de texto */}
          <div className="flex flex-col justify-center gap-6 sm:pt-0">
            <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold">
              ¡Descubre Nuestro Café en Grano Premium!
            </h1>
            <p
              data-aos="fade-up"
              className="text-sm text-gray-500 tracking-wide leading-5"
            >
              Sumérgete en el mundo de sabores con nuestro café en grano de primera calidad. Granos seleccionados y un sabor inolvidable - todo a un excelente precio.
            </p>
            <div className="flex flex-col gap-4">
              <div data-aos="fade-up" className="flex items-center gap-4">
                <GrSecure className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-teal-100 dark:bg-teal-400" />
                <p>Calidad Garantizada</p>
              </div>
              <div data-aos="fade-up" className="flex items-center gap-4">
                <IoFastFood className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-teal-100 dark:bg-teal-400" />
                <p>Servicio Rápido</p>
              </div>
              <div data-aos="fade-up" className="flex items-center gap-4">
                <GiCoffeeBeans className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-teal-100 dark:bg-teal-400" />
                <p>Café en Grano Seleccionado</p>
              </div>
              <div data-aos="fade-up" className="flex items-center gap-4">
                <GiDeliveryDrone className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-teal-100 dark:bg-teal-400" />
                <p>Entrega Rápida</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;