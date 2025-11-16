# Guía Rápida de Integración - WinRunners API en Flutter

## Instalación de Dependencias

\`\`\`yaml
# pubspec.yaml
dependencies:
  flutter:
    sdk: flutter
  
  # HTTP & API
  http: ^1.1.0
  supabase_flutter: ^2.0.0
  
  # GPS & Location
  geolocator: ^10.1.0
  location: ^5.0.0
  
  # Maps
  google_maps_flutter: ^2.5.0
  flutter_polyline_points: ^2.0.0
  
  # Storage & Cache
  flutter_secure_storage: ^9.0.0
  shared_preferences: ^2.2.2
  
  # State Management
  provider: ^6.1.0
  
  # UI
  intl: ^0.18.0
\`\`\`

## Estructura del Proyecto

\`\`\`
lib/
├── models/
│   ├── user.dart
│   ├── run.dart
│   ├── stats.dart
│   └── gps_point.dart
├── services/
│   ├── api_service.dart
│   ├── auth_service.dart
│   ├── run_tracking_service.dart
│   └── location_service.dart
├── providers/
│   ├── auth_provider.dart
│   └── run_provider.dart
├── screens/
│   ├── login_screen.dart
│   ├── home_screen.dart
│   ├── run_tracking_screen.dart
│   └── stats_screen.dart
└── main.dart
\`\`\`

## Inicialización

\`\`\`dart
// main.dart
import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:provider/provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  await Supabase.initialize(
    url: 'YOUR_SUPABASE_URL',
    anonKey: 'YOUR_SUPABASE_ANON_KEY',
  );
  
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => RunProvider()),
      ],
      child: MyApp(),
    ),
  );
}
\`\`\`

## Ejemplo Completo: Tracking de Carrera

Ver ejemplos detallados en `API_DOCUMENTATION.md` sección "Ejemplos de Integración Flutter".

## Troubleshooting

### Error: "Location permissions denied"
\`\`\`dart
await Geolocator.requestPermission();
\`\`\`

### Error: "Token expired"
\`\`\`dart
await supabase.auth.refreshSession();
\`\`\`

### Carrera no se guardó
\`\`\`dart
// Implementar cola offline
await _saveRunLocally(runData);
\`\`\`

---

Para documentación completa, consultar `API_DOCUMENTATION.md`
