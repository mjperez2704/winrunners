# WinRunners API Documentation

Base URL: `https://your-domain.com/api`

## Autenticación

Todas las rutas protegidas requieren autenticación mediante JWT token.

### POST /auth/signup
Registrar nuevo usuario.

**Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "displayName": "JohnD"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "user": {...},
  "message": "Registro exitoso. Por favor verifica tu email."
}
\`\`\`

### POST /auth/login
Iniciar sesión.

**Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "user": {...},
  "session": {...}
}
\`\`\`

### POST /auth/logout
Cerrar sesión.

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Sesión cerrada"
}
\`\`\`

## Perfil

### GET /profile
Obtener perfil del usuario autenticado.

**Response:**
\`\`\`json
{
  "success": true,
  "profile": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "display_name": "JohnD",
    "subscription_type": "GRATIS",
    "total_km_run": 150.5,
    "total_runs": 45,
    ...
  }
}
\`\`\`

### PUT /profile
Actualizar perfil.

**Body:**
\`\`\`json
{
  "display_name": "NewName",
  "bio": "Running enthusiast",
  "country": "Spain"
}
\`\`\`

## Carreras

### GET /runs
Obtener carreras del usuario.

**Query params:**
- `limit`: número de resultados (default: 20)
- `offset`: offset para paginación (default: 0)

**Response:**
\`\`\`json
{
  "success": true,
  "runs": [...],
  "total": 45
}
\`\`\`

### POST /runs
Registrar nueva carrera.

**Body:**
\`\`\`json
{
  "title": "Morning Run",
  "distance_km": 10.5,
  "duration_seconds": 3600,
  "started_at": "2024-04-15T06:00:00Z",
  "ended_at": "2024-04-15T07:00:00Z",
  "gps_route": [...],
  "average_heart_rate": 145,
  "elevation_gain_m": 120
}
\`\`\`

### GET /runs/:id
Obtener una carrera específica.

### DELETE /runs/:id
Eliminar una carrera.

## Clasificación

### GET /leaderboard
Obtener clasificación.

**Query params:**
- `season_id`: UUID de la temporada
- `league_id`: UUID de la liga
- `limit`: número de resultados (default: 50)

## Desafíos

### GET /challenges
Obtener desafíos activos.

### POST /challenges/:id/join
Unirse a un desafío.

## Badges

### GET /badges
Obtener badges desbloqueados y disponibles.

**Response:**
\`\`\`json
{
  "success": true,
  "unlocked": [...],
  "available": [...]
}
\`\`\`

## Social

### GET /social/friends
Obtener lista de amigos.

### POST /social/friends
Enviar solicitud de amistad.

**Body:**
\`\`\`json
{
  "friendId": "uuid"
}
\`\`\`

### GET /social/feed
Obtener feed de actividades.

## Eventos

### GET /events
Obtener eventos próximos.

### POST /events/:id/register
Registrarse en un evento.

## Recompensas

### GET /rewards
Obtener recompensas disponibles.

### POST /rewards/:id/redeem
Canjear una recompensa.

**Body:**
\`\`\`json
{
  "shipping_address": {
    "street": "123 Main St",
    "city": "Madrid",
    "postal_code": "28001",
    "country": "Spain"
  }
}
\`\`\`

## Estadísticas

### GET /stats
Obtener estadísticas del usuario.

**Query params:**
- `period`: días para calcular stats (default: 30)

**Response:**
\`\`\`json
{
  "success": true,
  "stats": {
    "total_runs": 15,
    "total_distance_km": 150.5,
    "total_time_seconds": 54000,
    "average_pace": 5.2,
    "average_distance": 10.03,
    "longest_run": 21.1,
    "fastest_pace": 4.5
  },
  "period": "30"
}
\`\`\`

## Códigos de Error

- `400`: Bad Request - Datos inválidos
- `401`: Unauthorized - No autenticado
- `404`: Not Found - Recurso no encontrado
- `500`: Internal Server Error - Error del servidor

## Rate Limiting

- 100 requests por minuto por usuario
- 1000 requests por día para usuarios gratuitos
- Sin límite para usuarios premium
\`\`\`
