import bcrypt from 'bcryptjs';
import { pool } from '@/lib/db';

export async function POST(request) {
  try {
    const { nombre, correo, password } = await request.json();

    const salt = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, salt);

    await pool.query(
      'INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)',
      [nombre, correo, passwordEncriptada]
    );

    return Response.json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.log('Error completo:', error);
    return Response.json({ error: 'Error al registrar el usuario' }, { status: 500 });
  }
}
