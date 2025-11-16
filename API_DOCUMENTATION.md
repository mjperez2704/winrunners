# WinRunners API - Documentación Completa para Aplicación Móvil

**Versión:** 1.0  
**Base URL:** `https://your-domain.com/api`  
**Fecha de actualización:** Enero 2025

---

## Tabla de Contenidos

1. [Autenticación](#autenticación)
2. [Perfil de Usuario](#perfil-de-usuario)
3. [Registro de Carreras (Tracking en Tiempo Real)](#registro-de-carreras)
4. [Estadísticas y Progreso](#estadísticas-y-progreso)
5. [Sistema de Logros (Badges)](#sistema-de-logros)
6. [Desafíos y Metas](#desafíos-y-metas)
7. [Sistema Social](#sistema-social)
8. [Eventos y Competencias](#eventos-y-competencias)
9. [Clasificación (Leaderboard)](#clasificación)
10. [Recompensas](#recompensas)
11. [Códigos de Error](#códigos-de-error)
12. [Ejemplos de Integración Flutter](#ejemplos-flutter)
13. [Best Practices](#best-practices)

---

## Autenticación

Todas las rutas protegidas requieren el token de sesión de Supabase en los headers.

### Headers Requeridos

\`\`\`
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
apikey: YOUR_SUPABASE_ANON_KEY
\`\`\`

### POST /auth/signup

Registrar nuevo usuario en la plataforma.

**Request Body:**
\`\`\`json
{
  "email": "corredor@example.com",
  "password": "SecurePass123!",
  "fullName": "Juan Pérez",
  "displayName": "JuanRunner"
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "user": {
    "id": "uuid-user-id",
    "email": "corredor@example.com",
    "created_at": "2025-01-15T10:30:00Z"
  },
  "message": "Registro exitoso. Por favor verifica tu email."
}
\`\`\`

**Errores:**
- `400`: Email ya registrado
- `422`: Contraseña débil o datos inválidos

---

### POST /auth/login

Iniciar sesión en la plataforma.

**Request Body:**
\`\`\`json
{
  "email": "corredor@example.com",
  "password": "SecurePass123!"
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "user": {
    "id": "uuid-user-id",
    "email": "corredor@example.com",
    "user_metadata": {
      "full_name": "Juan Pérez",
      "display_name": "JuanRunner"
    }
  },
  "session": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "v1.MjdhMjA3YmEtZjYyNi00...",
    "expires_in": 3600,
    "expires_at": 1737028800
  }
}
\`\`\`

**Importante:** Guardar `access_token` y `refresh_token` de forma segura en el dispositivo.

---

### POST /auth/logout

Cerrar sesión del usuario.

**Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Sesión cerrada exitosamente"
}
\`\`\`

---

## Perfil de Usuario

### GET /profile

Obtener perfil completo del usuario autenticado.

**Response (200):**
\`\`\`json
{
  "success": true,
  "profile": {
    "id": "uuid-user-id",
    "email": "corredor@example.com",
    "full_name": "Juan Pérez",
    "display_name": "JuanRunner",
    "avatar_url": "https://storage.url/avatar.jpg",
    "bio": "Corredor apasionado de maratones",
    "subscription_type": "PREMIUM",
    "subscription_status": "ACTIVO",
    "total_km_run": 1250.75,
    "total_runs": 156,
    "best_pace_min_km": 4.23,
    "longest_run_km": 42.2,
    "total_elevation_gain_m": 15800,
    "country": "España",
    "city": "Madrid",
    "created_at": "2024-06-15T10:30:00Z",
    "last_run_at": "2025-01-15T07:30:00Z"
  }
}
\`\`\`

---

### PUT /profile

Actualizar información del perfil.

**Request Body:**
\`\`\`json
{
  "display_name": "JuanElVeloz",
  "bio": "Corredor de ultra distancia",
  "country": "España",
  "city": "Barcelona",
  "avatar_url": "https://storage.url/new-avatar.jpg"
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "profile": { /* perfil actualizado */ },
  "message": "Perfil actualizado correctamente"
}
\`\`\`

---

## Registro de Carreras

**IMPORTANTE:** Este es el endpoint más crítico para la aplicación móvil. Permite registrar rutas con GPS en tiempo real.

### POST /runs

Registrar una nueva carrera con datos de GPS y métricas.

**Request Body:**
\`\`\`json
{
  "title": "Entrenamiento Matutino",
  "description": "Carrera de intervalos en el parque",
  "distance_km": 10.5,
  "duration_seconds": 2940,
  "started_at": "2025-01-15T06:00:00Z",
  "ended_at": "2025-01-15T06:49:00Z",
  "gps_route": [
    {
      "latitude": 40.4168,
      "longitude": -3.7038,
      "altitude": 667.5,
      "timestamp": "2025-01-15T06:00:00Z",
      "accuracy": 5.2,
      "speed": 3.2
    },
    {
      "latitude": 40.4178,
      "longitude": -3.7048,
      "altitude": 670.2,
      "timestamp": "2025-01-15T06:00:30Z",
      "accuracy": 4.8,
      "speed": 3.5
    }
    /* ... más puntos GPS cada 10-30 segundos */
  ],
  "average_heart_rate": 152,
  "max_heart_rate": 178,
  "elevation_gain_m": 125,
  "calories_burned": 680,
  "weather_conditions": {
    "temperature": 15,
    "humidity": 65,
    "weather": "Soleado"
  },
  "is_public": true,
  "route_type": "ENTRENAMIENTO"
}
\`\`\`

**Cálculos automáticos del servidor:**
- `average_speed_km_h`: Calculado automáticamente
- `average_pace_min_km`: Calculado automáticamente
- Validación de distancia basada en GPS
- Detección de pausas en el recorrido

**Response (200):**
\`\`\`json
{
  "success": true,
  "run": {
    "id": "uuid-run-id",
    "user_id": "uuid-user-id",
    "title": "Entrenamiento Matutino",
    "distance_km": 10.5,
    "duration_seconds": 2940,
    "average_speed_km_h": 12.8,
    "average_pace_min_km": 4.68,
    "elevation_gain_m": 125,
    "calories_burned": 680,
    "started_at": "2025-01-15T06:00:00Z",
    "ended_at": "2025-01-15T06:49:00Z",
    "gps_route": [ /* array completo */ ],
    "achievements_unlocked": [
      {
        "badge_id": "uuid-badge-id",
        "name": "10K Master",
        "description": "Completaste 10km"
      }
    ],
    "created_at": "2025-01-15T06:50:00Z"
  },
  "message": "Carrera registrada exitosamente"
}
\`\`\`

---

### GET /runs

Obtener historial de carreras del usuario.

**Query Parameters:**
- `limit` (opcional): Número de resultados (default: 20, max: 100)
- `offset` (opcional): Offset para paginación (default: 0)
- `sort` (opcional): Campo para ordenar (default: started_at)
- `order` (opcional): asc o desc (default: desc)

**Ejemplo de Request:**
\`\`\`
GET /api/runs?limit=10&offset=0&sort=distance_km&order=desc
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "runs": [
    {
      "id": "uuid-run-id",
      "title": "Carrera Larga Dominical",
      "distance_km": 21.1,
      "duration_seconds": 7200,
      "average_pace_min_km": 5.68,
      "elevation_gain_m": 250,
      "started_at": "2025-01-14T07:00:00Z",
      "thumbnail_map": "https://storage.url/map-thumbnail.jpg"
    }
    /* ... más carreras */
  ],
  "total": 156,
  "page": 1,
  "per_page": 10
}
\`\`\`

---

### GET /runs/:id

Obtener detalles completos de una carrera específica, incluyendo ruta GPS completa.

**Response (200):**
\`\`\`json
{
  "success": true,
  "run": {
    "id": "uuid-run-id",
    "user_id": "uuid-user-id",
    "title": "Carrera Larga Dominical",
    "description": "Preparación para maratón",
    "distance_km": 21.1,
    "duration_seconds": 7200,
    "average_speed_km_h": 10.55,
    "average_pace_min_km": 5.68,
    "elevation_gain_m": 250,
    "calories_burned": 1450,
    "average_heart_rate": 145,
    "max_heart_rate": 172,
    "started_at": "2025-01-14T07:00:00Z",
    "ended_at": "2025-01-14T09:00:00Z",
    "gps_route": [ /* array completo con todos los puntos GPS */ ],
    "splits": [
      {
        "km": 1,
        "time_seconds": 342,
        "pace_min_km": 5.7
      }
      /* ... splits por kilómetro */
    ],
    "weather_conditions": {
      "temperature": 12,
      "humidity": 75,
      "weather": "Nublado"
    },
    "is_public": true,
    "likes_count": 24,
    "comments_count": 5,
    "created_at": "2025-01-14T09:05:00Z"
  }
}
\`\`\`

---

### DELETE /runs/:id

Eliminar una carrera del historial.

**Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Carrera eliminada correctamente"
}
\`\`\`

**Errores:**
- `403`: No autorizado (no es tu carrera)
- `404`: Carrera no encontrada

---

## Estadísticas y Progreso

### GET /stats

Obtener estadísticas detalladas del usuario para un período específico.

**Query Parameters:**
- `period` (opcional): Días a calcular (default: 30, opciones: 7, 30, 90, 365, all)

**Ejemplo:**
\`\`\`
GET /api/stats?period=30
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "stats": {
    "period_days": 30,
    "total_runs": 15,
    "total_distance_km": 156.8,
    "total_time_seconds": 54000,
    "total_elevation_gain_m": 1850,
    "total_calories": 12400,
    "average_pace_min_km": 5.74,
    "average_distance_km": 10.45,
    "average_duration_minutes": 60,
    "longest_run_km": 21.1,
    "fastest_pace_min_km": 4.23,
    "most_elevation_gain_m": 420,
    "runs_by_week": [
      { "week": 1, "runs": 4, "distance": 42.5 },
      { "week": 2, "runs": 3, "distance": 38.2 },
      { "week": 3, "runs": 5, "distance": 52.1 },
      { "week": 4, "runs": 3, "distance": 24.0 }
    ],
    "runs_by_day_of_week": {
      "monday": 2,
      "tuesday": 3,
      "wednesday": 1,
      "thursday": 2,
      "friday": 1,
      "saturday": 3,
      "sunday": 3
    },
    "progress": {
      "distance_vs_last_period": "+12.5%",
      "pace_improvement": "-0.34 min/km",
      "consistency_score": 85
    }
  }
}
\`\`\`

---

## Sistema de Logros

### GET /badges

Obtener todos los badges (insignias) del usuario: desbloqueados y disponibles.

**Response (200):**
\`\`\`json
{
  "success": true,
  "unlocked": [
    {
      "id": "uuid-badge-id",
      "name": "Primera Carrera",
      "description": "Completaste tu primera carrera",
      "icon_url": "https://storage.url/badge-first-run.png",
      "category": "HITOS",
      "unlocked_at": "2024-06-15T08:00:00Z"
    },
    {
      "id": "uuid-badge-id-2",
      "name": "100 Kilómetros",
      "description": "Alcanzaste 100km acumulados",
      "icon_url": "https://storage.url/badge-100km.png",
      "category": "DISTANCIA",
      "unlocked_at": "2024-08-22T15:30:00Z"
    }
  ],
  "available": [
    {
      "id": "uuid-badge-id-3",
      "name": "Maratonista",
      "description": "Completa una carrera de 42km",
      "icon_url": "https://storage.url/badge-marathon.png",
      "category": "DISTANCIA",
      "progress": {
        "current": 21.1,
        "required": 42.2,
        "percentage": 50
      }
    }
  ],
  "total_unlocked": 24,
  "total_available": 58
}
\`\`\`

---

## Desafíos y Metas

### GET /challenges

Obtener desafíos activos y disponibles.

**Query Parameters:**
- `status` (opcional): ACTIVO, COMPLETADO, FALLIDO (default: ACTIVO)
- `type` (opcional): PERSONAL, COMUNITARIO, PRIVADO

**Response (200):**
\`\`\`json
{
  "success": true,
  "challenges": [
    {
      "id": "uuid-challenge-id",
      "title": "Desafío de Enero",
      "description": "Corre 100km durante enero",
      "type": "COMUNITARIO",
      "goal_type": "DISTANCIA",
      "goal_value": 100,
      "current_progress": 45.8,
      "progress_percentage": 45.8,
      "start_date": "2025-01-01T00:00:00Z",
      "end_date": "2025-01-31T23:59:59Z",
      "participants_count": 1250,
      "reward_points": 500,
      "reward_badge": {
        "name": "Campeón de Enero",
        "icon_url": "https://storage.url/badge-enero.png"
      }
    }
  ]
}
\`\`\`

---

### POST /challenges/:id/join

Unirse a un desafío comunitario.

**Response (200):**
\`\`\`json
{
  "success": true,
  "challenge": { /* detalles del desafío */ },
  "message": "Te uniste al desafío exitosamente"
}
\`\`\`

---

## Sistema Social

### GET /social/friends

Obtener lista de amigos del usuario.

**Response (200):**
\`\`\`json
{
  "success": true,
  "friends": [
    {
      "id": "uuid-friend-id",
      "display_name": "María Runner",
      "avatar_url": "https://storage.url/avatar-maria.jpg",
      "total_km_run": 850.5,
      "total_runs": 98,
      "friendship_since": "2024-07-20T10:00:00Z",
      "last_run_at": "2025-01-14T18:30:00Z"
    }
  ],
  "total": 23
}
\`\`\`

---

### POST /social/friends

Enviar solicitud de amistad.

**Request Body:**
\`\`\`json
{
  "friendId": "uuid-user-id"
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Solicitud de amistad enviada"
}
\`\`\`

---

### GET /social/feed

Obtener feed de actividades públicas de amigos y comunidad.

**Query Parameters:**
- `limit` (opcional): Número de posts (default: 20)
- `offset` (opcional): Para paginación

**Response (200):**
\`\`\`json
{
  "success": true,
  "feed": [
    {
      "id": "uuid-post-id",
      "type": "RUN_COMPLETED",
      "user": {
        "id": "uuid-user-id",
        "display_name": "Carlos Veloz",
        "avatar_url": "https://storage.url/avatar-carlos.jpg"
      },
      "run": {
        "id": "uuid-run-id",
        "title": "Carrera vespertina",
        "distance_km": 8.5,
        "duration_seconds": 2400,
        "average_pace_min_km": 4.71,
        "map_thumbnail": "https://storage.url/map-thumb.jpg"
      },
      "likes_count": 15,
      "comments_count": 3,
      "has_liked": false,
      "created_at": "2025-01-15T18:30:00Z"
    }
  ]
}
\`\`\`

---

## Eventos y Competencias

### GET /events

Obtener eventos deportivos próximos.

**Query Parameters:**
- `status` (opcional): PROXIMO, EN_CURSO, FINALIZADO
- `type` (opcional): CARRERA, MARATON, ULTRA, VIRTUAL

**Response (200):**
\`\`\`json
{
  "success": true,
  "events": [
    {
      "id": "uuid-event-id",
      "name": "Maratón de Madrid 2025",
      "description": "42km por las calles de Madrid",
      "type": "MARATON",
      "date": "2025-04-27T09:00:00Z",
      "location": "Madrid, España",
      "distance_km": 42.195,
      "registration_open": true,
      "registration_deadline": "2025-04-01T23:59:59Z",
      "max_participants": 30000,
      "current_participants": 12458,
      "entry_fee": 45.00,
      "currency": "EUR",
      "image_url": "https://storage.url/event-marathon-madrid.jpg"
    }
  ]
}
\`\`\`

---

### POST /events/:id/register

Registrarse en un evento.

**Request Body:**
\`\`\`json
{
  "category": "GENERAL",
  "tshirt_size": "M",
  "emergency_contact": {
    "name": "Ana Pérez",
    "phone": "+34612345678"
  }
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "registration": {
    "id": "uuid-registration-id",
    "event_id": "uuid-event-id",
    "bib_number": "A1234",
    "category": "GENERAL",
    "payment_status": "PENDIENTE",
    "payment_url": "https://payment.url/checkout/xyz"
  },
  "message": "Registro exitoso. Completa el pago para confirmar."
}
\`\`\`

---

## Clasificación

### GET /leaderboard

Obtener clasificación de usuarios.

**Query Parameters:**
- `season_id` (opcional): UUID de temporada específica
- `league_id` (opcional): UUID de liga específica
- `period` (opcional): semanal, mensual, anual, historico (default: mensual)
- `limit` (opcional): Número de resultados (default: 50)

**Response (200):**
\`\`\`json
{
  "success": true,
  "leaderboard": [
    {
      "position": 1,
      "user_id": "uuid-user-id",
      "display_name": "El Rayo",
      "avatar_url": "https://storage.url/avatar.jpg",
      "total_points": 2450,
      "total_distance_km": 450.8,
      "total_runs": 45,
      "average_pace_min_km": 4.52,
      "league": "DIAMANTE",
      "change_from_last_week": "+2"
    }
  ],
  "your_position": 156,
  "total_participants": 5420
}
\`\`\`

---

## Recompensas

### GET /rewards

Obtener recompensas disponibles para canjear.

**Response (200):**
\`\`\`json
{
  "success": true,
  "rewards": [
    {
      "id": "uuid-reward-id",
      "name": "Zapatillas Nike Pegasus 40",
      "description": "Zapatillas premium para running",
      "points_required": 5000,
      "stock_available": 15,
      "image_url": "https://storage.url/reward-nike.jpg",
      "category": "EQUIPO",
      "sponsor": {
        "name": "Nike",
        "logo_url": "https://storage.url/nike-logo.png"
      }
    }
  ],
  "your_points": 3450
}
\`\`\`

---

### POST /rewards/:id/redeem

Canjear una recompensa.

**Request Body:**
\`\`\`json
{
  "shipping_address": {
    "street": "Calle Mayor 123",
    "city": "Madrid",
    "state": "Madrid",
    "postal_code": "28013",
    "country": "España",
    "phone": "+34612345678"
  }
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "redemption": {
    "id": "uuid-redemption-id",
    "reward": { /* detalles de la recompensa */ },
    "status": "PROCESANDO",
    "tracking_number": null,
    "estimated_delivery": "2025-01-25T00:00:00Z"
  },
  "remaining_points": 450,
  "message": "Recompensa canjeada exitosamente"
}
\`\`\`

---

## Códigos de Error

| Código | Descripción | Solución |
|--------|-------------|----------|
| 400 | Bad Request - Datos inválidos | Verificar formato de datos |
| 401 | Unauthorized - No autenticado | Iniciar sesión nuevamente |
| 403 | Forbidden - Sin permisos | Verificar permisos del usuario |
| 404 | Not Found - Recurso no encontrado | Verificar ID del recurso |
| 409 | Conflict - Recurso duplicado | Ya existe el recurso |
| 422 | Unprocessable Entity - Validación fallida | Revisar campos requeridos |
| 429 | Too Many Requests - Rate limit | Esperar antes de reintentar |
| 500 | Internal Server Error | Contactar soporte |

---

## Ejemplos de Integración Flutter

### 1. Configuración Inicial

\`\`\`dart
// lib/services/api_service.dart
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:supabase_flutter/supabase_flutter.dart';

class ApiService {
  static const String baseUrl = 'https://your-domain.com/api';
  final SupabaseClient supabase;
  
  ApiService(this.supabase);
  
  Future<Map<String, String>> _getHeaders() async {
    final session = supabase.auth.currentSession;
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${session?.accessToken}',
      'apikey': 'YOUR_SUPABASE_ANON_KEY',
    };
  }
}
\`\`\`

### 2. Autenticación

\`\`\`dart
// Login
Future<Map<String, dynamic>> login(String email, String password) async {
  final response = await http.post(
    Uri.parse('$baseUrl/auth/login'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({
      'email': email,
      'password': password,
    }),
  );
  
  if (response.statusCode == 200) {
    final data = jsonDecode(response.body);
    // Guardar tokens de forma segura
    await _saveTokens(data['session']);
    return data;
  } else {
    throw Exception('Error en login: ${response.body}');
  }
}
\`\`\`

### 3. Registro de Carrera con GPS

\`\`\`dart
import 'package:geolocator/geolocator.dart';

class RunTrackingService {
  List<Map<String, dynamic>> gpsPoints = [];
  DateTime? startTime;
  
  // Iniciar tracking
  Future<void> startRun() async {
    startTime = DateTime.now();
    
    // Solicitar permisos de ubicación
    await Geolocator.requestPermission();
    
    // Iniciar stream de posiciones
    Geolocator.getPositionStream(
      locationSettings: LocationSettings(
        accuracy: LocationAccuracy.high,
        distanceFilter: 10, // Actualizar cada 10 metros
      ),
    ).listen((Position position) {
      _addGPSPoint(position);
    });
  }
  
  void _addGPSPoint(Position position) {
    gpsPoints.add({
      'latitude': position.latitude,
      'longitude': position.longitude,
      'altitude': position.altitude,
      'timestamp': DateTime.now().toIso8601String(),
      'accuracy': position.accuracy,
      'speed': position.speed,
    });
  }
  
  // Finalizar y guardar carrera
  Future<Map<String, dynamic>> finishRun({
    required String title,
    int? averageHeartRate,
  }) async {
    final endTime = DateTime.now();
    final duration = endTime.difference(startTime!).inSeconds;
    
    // Calcular distancia total
    double totalDistance = _calculateTotalDistance();
    
    // Calcular elevación ganada
    double elevationGain = _calculateElevationGain();
    
    // Enviar a la API
    final response = await http.post(
      Uri.parse('${ApiService.baseUrl}/runs'),
      headers: await _getHeaders(),
      body: jsonEncode({
        'title': title,
        'distance_km': totalDistance,
        'duration_seconds': duration,
        'started_at': startTime!.toIso8601String(),
        'ended_at': endTime.toIso8601String(),
        'gps_route': gpsPoints,
        'average_heart_rate': averageHeartRate,
        'elevation_gain_m': elevationGain,
        'is_public': true,
        'route_type': 'ENTRENAMIENTO',
      }),
    );
    
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Error al guardar carrera');
    }
  }
  
  double _calculateTotalDistance() {
    double total = 0.0;
    for (int i = 1; i < gpsPoints.length; i++) {
      total += Geolocator.distanceBetween(
        gpsPoints[i-1]['latitude'],
        gpsPoints[i-1]['longitude'],
        gpsPoints[i]['latitude'],
        gpsPoints[i]['longitude'],
      );
    }
    return total / 1000; // Convertir a kilómetros
  }
  
  double _calculateElevationGain() {
    double gain = 0.0;
    for (int i = 1; i < gpsPoints.length; i++) {
      double diff = gpsPoints[i]['altitude'] - gpsPoints[i-1]['altitude'];
      if (diff > 0) gain += diff;
    }
    return gain;
  }
}
\`\`\`

### 4. Obtener Estadísticas

\`\`\`dart
Future<Map<String, dynamic>> getStats({int period = 30}) async {
  final response = await http.get(
    Uri.parse('$baseUrl/stats?period=$period'),
    headers: await _getHeaders(),
  );
  
  if (response.statusCode == 200) {
    return jsonDecode(response.body);
  } else {
    throw Exception('Error al obtener estadísticas');
  }
}
\`\`\`

### 5. Widget de Carrera en Vivo

\`\`\`dart
class LiveRunWidget extends StatefulWidget {
  @override
  _LiveRunWidgetState createState() => _LiveRunWidgetState();
}

class _LiveRunWidgetState extends State<LiveRunWidget> {
  final RunTrackingService _trackingService = RunTrackingService();
  bool isRunning = false;
  double currentDistance = 0.0;
  Duration currentDuration = Duration.zero;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          '${currentDistance.toStringAsFixed(2)} km',
          style: TextStyle(fontSize: 48, fontWeight: FontWeight.bold),
        ),
        Text(
          '${_formatDuration(currentDuration)}',
          style: TextStyle(fontSize: 24),
        ),
        ElevatedButton(
          onPressed: isRunning ? _stopRun : _startRun,
          child: Text(isRunning ? 'Finalizar' : 'Iniciar Carrera'),
        ),
      ],
    );
  }
  
  void _startRun() async {
    await _trackingService.startRun();
    setState(() {
      isRunning = true;
    });
    // Iniciar timer para actualizar UI
    Timer.periodic(Duration(seconds: 1), (timer) {
      if (!isRunning) {
        timer.cancel();
        return;
      }
      setState(() {
        currentDuration = DateTime.now().difference(_trackingService.startTime!);
        currentDistance = _trackingService._calculateTotalDistance();
      });
    });
  }
  
  void _stopRun() async {
    try {
      final result = await _trackingService.finishRun(
        title: 'Carrera ${DateTime.now().day}/${DateTime.now().month}',
      );
      
      setState(() {
        isRunning = false;
      });
      
      // Mostrar resumen
      _showRunSummary(result);
    } catch (e) {
      print('Error: $e');
    }
  }
  
  String _formatDuration(Duration duration) {
    String twoDigits(int n) => n.toString().padLeft(2, '0');
    return '${twoDigits(duration.inHours)}:${twoDigits(duration.inMinutes.remainder(60))}:${twoDigits(duration.inSeconds.remainder(60))}';
  }
}
\`\`\`

---

## Best Practices

### Seguridad
1. **Nunca** almacenar tokens en SharedPreferences sin encriptación
2. Usar `flutter_secure_storage` para tokens sensibles
3. Implementar refresh de tokens automático
4. Validar certificados SSL en producción

### Performance
1. Implementar caché local para datos frecuentes (perfil, estadísticas)
2. Usar paginación en listas largas
3. Comprimir datos GPS antes de enviar (eliminar puntos redundantes)
4. Enviar datos en background cuando termine la carrera

### GPS Tracking
1. Ajustar `distanceFilter` según velocidad del usuario
2. Implementar detección de pausas automáticas
3. Guardar progreso localmente cada 1-2 minutos (por si se cierra la app)
4. Validar precisión GPS (`accuracy < 20 metros`)

### Manejo de Errores
1. Implementar reintentos automáticos con exponential backoff
2. Guardar carreras offline si no hay conexión
3. Sincronizar automáticamente cuando haya conexión
4. Mostrar mensajes de error claros al usuario

### Rate Limiting
- Respetar límites: 100 req/min para usuarios free, ilimitado para premium
- Implementar queue local para peticiones
- Cachear respuestas cuando sea posible

---

## Contacto y Soporte

**Email de soporte:** api-support@winrunners.com  
**Documentación actualizada:** https://docs.winrunners.com  
**Status de la API:** https://status.winrunners.com

**Última actualización:** Enero 2025  
**Versión de la API:** 1.0
