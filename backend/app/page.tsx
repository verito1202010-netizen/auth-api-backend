"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const iniciarSesion = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contrasena })
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      setMensaje("✅ Inicio de sesión exitoso");
      setTimeout(() => {
        router.push("/dashboard");
      }, 100);
    } else {
      setMensaje("❌ Correo o contraseña incorrectos");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto", textAlign: "center", border: "1px solid #ccc", padding: "30px", borderRadius: "8px" }}>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={iniciarSesion} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          type="email"
          placeholder="Correo:"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña:"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Ingresar
        </button>
      </form>
      <p style={{ marginTop: "15px", color: mensaje.includes("✅") ? "green" : "red" }}>{mensaje}</p>
      <p style={{ marginTop: "15px" }}>
        ¿No tienes cuenta?
        <a
          href="/registro"
          style={{ color: "#0070f3", cursor: "pointer" }}
        >
          Regístrate
        </a>
      </p>
    </div>
  );
}
