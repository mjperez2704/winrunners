# Configuración del Usuario Administrador

Para acceder al panel de administración de WinRunners, necesitas crear un usuario administrador en Supabase.

## Pasos para crear el primer administrador:

### 1. Ejecutar los scripts de base de datos

Primero, asegúrate de haber ejecutado todos los scripts SQL en orden desde la carpeta `scripts/`:

\`\`\`bash
001_create_users_profiles.sql
002_create_runs_activities.sql
003_create_competitions_leagues.sql
004_create_badges_achievements.sql
005_create_social_features.sql
006_create_sponsors_rewards.sql
007_create_notifications_events.sql
008_insert_initial_data.sql
009_create_admin_users.sql
\`\`\`

### 2. Crear usuario en Supabase Auth

1. Ve a tu proyecto en Supabase Dashboard: https://supabase.com/dashboard
2. Navega a **Authentication** → **Users**
3. Click en **Add user** → **Create new user**
4. Ingresa:
   - **Email**: `admin@winrunners.com` (o el email que prefieras)
   - **Password**: Crea una contraseña segura
   - **Auto Confirm User**: Activado (importante)
5. Click en **Create user**
6. **Copia el UUID** del usuario creado (aparece en la columna ID)

### 3. Asignar permisos de administrador

1. Ve a **SQL Editor** en Supabase
2. Ejecuta el siguiente query (reemplaza `TU_UUID_AQUI` con el UUID copiado):

\`\`\`sql
INSERT INTO admin_users (user_id, email, full_name, role, is_active)
VALUES (
  'TU_UUID_AQUI',
  'admin@winrunners.com',
  'Administrador Principal',
  'super_admin',
  true
);
\`\`\`

3. Verifica que se creó correctamente:

\`\`\`sql
SELECT * FROM admin_users;
\`\`\`

### 4. Iniciar sesión

1. Ve a tu aplicación web: http://localhost:3000
2. Ingresa:
   - **Email**: `admin@winrunners.com`
   - **Password**: La contraseña que configuraste
3. Click en **Iniciar Sesión**

¡Listo! Ahora puedes acceder al panel de administración completo.

## Roles disponibles

- **super_admin**: Acceso total al sistema
- **admin**: Gestión de usuarios y contenido
- **moderator**: Moderación de contenido social
- **support**: Soporte y visualización

## Crear más administradores

Una vez dentro del panel, ve a:
**Dashboard → Configuración → Administradores** 

Ahí podrás crear más usuarios administradores con diferentes roles.

## Seguridad

⚠️ **IMPORTANTE**: 
- Cambia las credenciales por defecto en producción
- Usa contraseñas seguras
- No compartas las credenciales de super_admin
- Revisa regularmente los logs de acceso en **Configuración → Sistema**
