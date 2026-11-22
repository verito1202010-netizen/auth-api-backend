import { pool } from '@/lib/db';

export async function POST(request) {
  try {
    const { nombre, descripcion, precio } = await request.json();
    await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)',
      [nombre, descripcion, precio]
    );
    return Response.json({ mensaje: 'Producto creado exitosamente' });
  } catch (error) {
    console.log('Error crear producto:', error);
    return Response.json({ error: 'Error al crear producto' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [productos] = await pool.query('SELECT * FROM productos');
    return Response.json(productos);
  } catch (error) {
    console.log('Error listar productos:', error);
    return Response.json({ error: 'Error al listar productos' }, { status: 500 });
  }
}
