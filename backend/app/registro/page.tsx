"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
};

export default function Dashboard() {
  const router = useRouter();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const cargarProductos = async () => {
    const res = await fetch("/api/productos");
    const data = await res.json();
    setProductos(data);
  };

  const crearProducto = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, descripcion, precio })
    });
    setNombre("");
    setDescripcion("");
    setPrecio("");
    cargarProductos();
  };

  const eliminarProducto = async (id: number) => {
    await fetch("/api/productos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    cargarProductos();
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div style={{ maxWidth: "700px", margin: "30px auto", padding: "20px" }}>
      <h1>Bienvenido 👋</h1>
      <button
        onClick={cerrarSesion}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        Cerrar sesión
      </button>

      <h2>Crear Producto</h2>
      <form onSubmit={crearProducto} style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "30px" }}>
        <input
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          placeholder="Precio"
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Guardar Producto
        </button>
      </form>

      <h2>Lista de Productos</h2>
      {productos.length === 0 ? (
        <p>No hay productos registrados</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {productos.map((p) => (
            <li
              key={p.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px"
              }}
            >
              <strong>{p.nombre}</strong>
              <p>{p.descripcion}</p>
              <p>Precio: ${p.precio}</p>
              <button
                onClick={() => eliminarProducto(p.id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
