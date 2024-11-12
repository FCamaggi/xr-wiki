# Guía de Técnicas de Pruebas de Software: Tablas de Decisión y Transiciones de Estado

## Introducción

Este documento explica dos técnicas fundamentales para probar software de manera sistemática: las tablas de decisión y las transiciones de estado. Estas herramientas ayudan a los testers a asegurarse de que el software funcione correctamente bajo diferentes condiciones y escenarios.

## Tablas de Decisión

### ¿Qué son?

Las tablas de decisión son una forma organizada de mostrar cómo diferentes condiciones o entradas producen diferentes resultados. Es como una receta que muestra todos los ingredientes posibles y qué plato resultará según las combinaciones que uses.

### ¿Por qué usarlas?

- Ayudan a manejar situaciones complejas de manera ordenada
- Facilitan encontrar casos que faltan por probar
- Optimizan el esfuerzo de pruebas al evitar repeticiones

### Ejemplo Práctico: Sistema de Login

Imagina un sistema de inicio de sesión simple:

- El usuario debe ingresar nombre de usuario y contraseña
- Solo si ambos son correctos se permite el acceso
- Después de 3 intentos fallidos, se bloquea la cuenta

La tabla de decisión sería:

| Condición           | Caso 1 | Caso 2 | Caso 3 | Caso 4 |
| ------------------- | ------ | ------ | ------ | ------ |
| Usuario correcto    | ✓      | ✓      | ✗      | ✗      |
| Contraseña correcta | ✓      | ✗      | ✓      | ✗      |
| Resultado           | Acceso | Error  | Error  | Error  |

## Transiciones de Estado

### ¿Qué son?

Las transiciones de estado muestran cómo un sistema cambia de una situación a otra basado en diferentes eventos o acciones. Es como un mapa que muestra todos los caminos posibles que puede tomar un proceso.

### ¿Por qué usarlas?

- Ayudan a visualizar el flujo completo del sistema
- Permiten identificar comportamientos inesperados
- Facilitan la detección temprana de errores

### Ejemplo Práctico: Robot de Cocina

Imaginemos un robot de cocina automático:

1. Inicio → Encendido
2. Encendido → Procesando ingredientes
3. Procesando → Cocinando (si procesó dos veces)
4. Procesando → Triturando (si procesó una vez)
5. Cocinando/Triturando → Sirviendo
6. Sirviendo → Fin

## Ventajas y Limitaciones

### Ventajas

- Proporcionan una estructura clara para las pruebas
- Ayudan a no olvidar casos importantes
- Facilitan la documentación del proceso

### Limitaciones

- Pueden volverse complejas con muchas variables
- No todos los sistemas pueden representarse fácilmente
- Requieren tiempo para prepararse adecuadamente

## Conclusión

Estas técnicas son herramientas valiosas para asegurar la calidad del software, pero deben usarse según el contexto y las necesidades específicas del proyecto. Lo importante es entender cuándo y cómo aplicarlas para obtener el máximo beneficio.
