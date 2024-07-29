"use client";
import { MdEdit } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { RiDeleteBin6Fill, RiAddLargeFill } from "react-icons/ri";
import { Pagination, Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IProductList } from "@/interfaces/IProductList";
import { IOrders } from "@/interfaces/IOrders";
import { get } from "http";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const OrderList = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState<IOrders[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const ORDERS_PER_PAGE = 10; // Cantidad de productos por página
  const [loading, setLoading] = useState(true);
  const [reportsOpen, setReportsOpen] = useState(false);

  const toggleReports = () => setReportsOpen(!reportsOpen);

  //! Obtener token de usuario
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userSession = localStorage.getItem("userSession");
      if (userSession) {
        const parsedSession = JSON.parse(userSession);
        console.log("userToken", parsedSession.userData.accessToken);
        setToken(parsedSession.userData.accessToken);
      }
    }
  }, [router]);

  //! Obtener los Ordenes
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(`${apiURL}/order`);
        const orders = response.data;
        console.log("orders", orders);
        setOrders(orders);
        setTotalPages(Math.ceil(orders.length / ORDERS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    fetchOrders();
  }, []);

  //! Función para calcular las ordenes a mostrar en la página actual
  const getCurrentPageOrders = () => {
    const filteredProducts = filterOrders();
    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
    const endIndex = startIndex + ORDERS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  };

  //! Función para filtrar las ordenes
  const filterOrders = () => {
    if (searchTerm === "") {
      return orders; // Si el campo de búsqueda está vacío, mostrar todos los productos
    } else {
      return orders.filter((orders) =>
        orders.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  //! Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Actualizar el estado del término de búsqueda
    setCurrentPage(1); // Reiniciar la página actual al cambiar el término de búsqueda
  };
  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <section className="p-1 sm:p-1 antialiased h-screen dark:bg-gray-700">
      <div className="flex flex-col md:flex-row xl:items-center xl:justify-between space-y-3 xl:space-y-0 :space-x-1 p-4 bg-gray-900 rounded-tl-xl rounded-tr-xl">
        <h5>
          <span className="text-green-400">Listado de Ordenes</span>
        </h5>
        <div className="flex-shrink-0 flex flex-col items-start md:flex-row md:items-center lg:justify-end space-y-3 md:space-y-0 md:space-x-3"></div>
      </div>
      <div className="mx-auto max-w-screen-2xl px-1 lg:px-2 "></div>
      <div className="w-40 md:w-1/2">
        <form className="flex items-center py-4 px-4">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <IoSearchSharp />
            </div>
            <input
              type="text"
              id="simple-search"
              placeholder="Search for orders"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              onChange={handleSearchChange}
            />
          </div>
        </form>
      </div>

      <div className="overflow-x-auto">
        {getCurrentPageOrders().map((order: IOrders) => (
          <div key={order.id} className="border-b dark:border-gray-600 ">
            <div
              onClick={toggleReports}
              className="flex items-center text-gray-600 w-full overflow-hidden cursor-pointer"
            >
              <div
                className={`w-10 border-r px-2 transform transition duration-300 ease-in-out ${
                  reportsOpen ? "rotate-90" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
              <div className="px-2 py-3 w-full">
                <div className="grid grid-cols-5 justify-start text-md gap-4 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <div className="p-4">
                    <b>Id:</b> {order.id}
                  </div>
                  <div className="p-4">
                    <b>Fecha:</b> {new Date(order.date).toLocaleDateString()}
                  </div>
                  <div className="p-4">
                    <b>Id Cliente: </b>
                    {order.user.id}
                  </div>
                  <div className="p-4">
                    <b>Total:</b> $ {order.orderDetail.totalPrice}
                  </div>
                  <div className="p-4">
                    <b>Estado:</b> {order.orderDetail.transactions[0].status}
                  </div>
                </div>
              </div>
            </div>
            {reportsOpen && (
              <div className="p-5">
                <table className="w-full text-md text-gray-500 dark:text-gray-400 ">
                  <thead className=" bg-gray-500 text-md  ">
                    {" "}
                    {/* Clase añadida para centrar el encabezado */}
                    <tr>
                      <th className="font-bold pl-4 text-start text-black px-4 py-3">
                        Id
                      </th>
                      <th className="font-bold pl-12 text-start text-black"></th>
                      <th className="font-bold pl-12 text-start text-black">
                        Producto
                      </th>
                      <th className="font-bold pl-4 text-start text-black">
                        Cantidad
                      </th>
                      <th className="font-bold pl-4 text-start text-black">
                        Precio
                      </th>
                      <th className="font-bold pl-4 text-start text-black">
                        Descuento
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border">
                    {order.productsOrder.map((x) => (
                      <tr
                        key={x.product.id}
                        className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-start"
                      >
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {x.product.id}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <img
                            src={x.product.imgUrl}
                            alt={x.product.imgUrl}
                            className="w-10 h-10"
                          />
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {x.product.description}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white pl-10">
                          {x.cantidad}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {x.product.price}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {x.product.discount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <div></div>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex overflow-x-auto sm:justify-center py-5 bg-gray-900 rounded-bl-xl rounded-br-xl">
        <Pagination
          layout="pagination"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          previousLabel="Anterior"
          nextLabel="Siguiente"
          showIcons
        />
      </div>
    </section>
  );
};

export default OrderList;

// {order.productsOrder.product.map((product) => (
//   <tr
//     key={product.cantidad}
//     className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
//   >
//     <th
//       scope="row"
//       className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//     >
//       <div className="flex items-center">{product.id}</div>
//     </th>
//     <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//       <div className="flex justify-center items-center">
//         {product.name}
//       </div>
//     </td>
//     <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//       {product.total}
//     </td>
//     <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//       {product.price}
//     </td>
//     <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//       {product.discount}
//     </td>
//     <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//       {product.status}
//     </td>
