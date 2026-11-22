import { pool } from "../../../lib/db";

export async function GET() {
  const [rows] = await pool.query("SELECT * FROM productos");
  return Response.json(rows);
}

export async function POST(request) {
  const { nombre, descripcion, precio } = await request.json();
  await pool.query(
    "INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)",
    [nombre, descripcion, precio]
  );
  return Response.json({ mensaje: "Producto guardado" });
}

export async function PUT(request) {
  const { id, nombre, descripcion, precio } = await request.json();
  await pool.query(
    "UPDATE productos SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?",
    [nombre, descripcion, precio, id]
  );
  return Response.json({ mensaje: "Producto actualizado" });
}

export async function DELETE(request) {
  const { id } = await request.json();
  await pool.query("DELETE FROM productos WHERE id = ?", [id]);
  return Response.json({ mensaje: "Producto eliminado" });
}
