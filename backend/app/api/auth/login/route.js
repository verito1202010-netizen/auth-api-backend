import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '@/lib/db';

export async function POST(request) {
  try {
    const { correo, password } = await request.json();

    // Buscar el usuario por correo
    const [usuarios] = await pool.query(
      'SELECT * FROM usuarios WHERE correo = ?',
      [correo]
    );

    if (usuarios.length === 0) {
      return Response.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const usuario = usuarios[0];

    // Comparar contraseña ingresada con la encriptada
    const contraseñaValida = await bcrypt.compare(password, usuario.contraseña);

    if (!contraseñaValida) {
      return Response.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo },
      'mi_clave_secreta',
      { expiresIn: '1h' }
    );

    return Response.json({
      mensaje: 'Inicio de sesión exitoso',
      token: token
    });

  } catch (error) {
    console.log('Error completo login:', error);
    return Response.json({ error: 'Error al iniciar sesión' }, { status: 500 });
  }
}
