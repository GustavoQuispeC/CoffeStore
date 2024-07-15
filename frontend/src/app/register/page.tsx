"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";
import Image from "next/image"; // Importación del componente Image
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { NewUser } from "@/helpers/Autenticacion.helper";
import { IUserErrorProps, IUserProps } from "@/types/user";
import { validateRegisterUserForm } from "@/utils/userFormValidation";

const RegisterUser = () => {
  const Router = useRouter();

  const initialUserData: IUserProps = {
    name: "",
    email: "",
    password: "",
    phone: "",
  };

  const initialErrorState: IUserErrorProps = {
    name: "",
    email: "",
    password: "",
    phone: "",
  };

  const [dataUser, setDataUser] = useState<IUserProps>(initialUserData);
  const [error, setError] = useState<IUserErrorProps>(initialErrorState);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<keyof IUserErrorProps, boolean>>({
    name: false,
    email: false,
    password: false,
    phone: false,
  });

  const handleReset = (): void => {
    setDataUser(initialUserData);
    setError(initialErrorState);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    setDataUser((prevDataUser) => ({
      ...prevDataUser,
      [name]: value,
    }));

    if (!touched[name as keyof IUserErrorProps]) {
      setTouched((prevTouched) => ({
        ...prevTouched,
        [name]: true,
      }));
    }

    // Validar el campo específico que se ha cambiado
    const fieldErrors = validateRegisterUserForm({
      ...dataUser,
      [name]: value,
    });

    setError((prevError) => ({
      ...prevError,
      [name]: fieldErrors[name as keyof IUserErrorProps] || "", // Asegurar que siempre se asigna un string
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateRegisterUserForm(dataUser);
    setError(errors);

    // Marcar todos los campos como tocados para mostrar errores
    setTouched({
      name: true,
      email: true,
      password: true,
      phone: true,
    });

    // Si hay errores, no proceder con el envío
    if (Object.values(errors).some((x) => x !== "")) {
      return;
    }

    setLoading(true);
    setSubmitError(null);

    try {
      await NewUser(dataUser);
      toast.success("Usuario registrado correctamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setDataUser(initialUserData); // Limpiar campos del formulario
      setTouched({
        name: false,
        email: false,
        password: false,
        phone: false,
      });

      setTimeout(() => {
        Router.push("/login");
      }, 3000);
    } catch (error: any) {
      if (error.response) {
        setSubmitError(
          `Error al registrar el usuario: ${error.response.data.message}`
        );
      } else if (error.request) {
        setSubmitError(
          "Error al registrar el usuario: No se recibió respuesta del servidor."
        );
      } else {
        setSubmitError(`Error al registrar el usuario: ${error.message}`);
      }
      toast.error("Error al registrar el usuario");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = Object.values(error).some((x) => x !== "");


  return (
   
      <><div className="relative flex justify-center items-center font-sans h-full min-h-screen p-4">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/back.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 font-sans max-w-7xl mx-auto">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.6)", // Más transparente
              padding: 4,
              borderRadius: 2,
              boxShadow: "0 2px 16px -3px rgba(6, 81, 237, 0.3)",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "teal" }}></Avatar>
            <Typography component="h1" variant="h5" color="teal">
              Registro
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 3 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nombre y Apellido"
                name="name"
                autoComplete="name"
                autoFocus
                value={dataUser.name}
                onChange={handleChange}
                error={!!error.name}
                helperText={error.name}
                InputLabelProps={{ style: { color: 'teal' } }} // Color teal
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={dataUser.email}
                onChange={handleChange}
                error={!!error.email}
                helperText={error.email}
                InputLabelProps={{ style: { color: 'teal' } }} // Color teal
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Contraseña"
                name="password"
                type="password"
                autoComplete="new-password"
                value={dataUser.password}
                onChange={handleChange}
                error={!!error.password}
                helperText={error.password}
                InputLabelProps={{ style: { color: 'teal' } }} // Color teal
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Teléfono"
                name="phone"
                autoComplete="phone"
                value={dataUser.phone}
                onChange={handleChange}
                error={!!error.phone}
                helperText={error.phone}
                InputLabelProps={{ style: { color: 'teal' } }} // Color teal
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "teal",
                  "&:hover": {
                    backgroundColor: "darkslategray", // Color teal más oscuro en hover
                  },
                }}
                disabled={isDisabled || loading}
              >
                {loading ? "Registrando..." : "Registrarse"}
              </Button>
              <Button
                onClick={handleReset}
                fullWidth
                sx={{ mt: 1, mb: 2, borderColor: "teal", color: "teal" }}
              >
                Borrar Formulario
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
      <div className="absolute top-1 left-1">
        <Image src="/logoblanco.png" alt="Logo" width={300} height={300} /> {/* Ajusta el tamaño según sea necesario */}
      </div>
    </div><ToastContainer /></>
   
  );
};

export default RegisterUser;