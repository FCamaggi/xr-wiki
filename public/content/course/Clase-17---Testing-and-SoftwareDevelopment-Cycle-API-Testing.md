# Guía sobre Metodologías de Desarrollo y Pruebas de Software

## Introducción

Este documento explica las diferentes formas de desarrollar software y cómo asegurarnos de que funcione correctamente a través de pruebas.

## Metodologías de Desarrollo

### 1. Modelo Waterfall (Cascada)

Es como construir una casa: primero haces los planos, luego los cimientos, después las paredes, y así sucesivamente. Cada paso debe completarse antes de pasar al siguiente.

**Características principales:**

- Proceso lineal y secuencial
- Fases claramente definidas
- Documentación exhaustiva
- Ideal cuando los requisitos son estables y bien definidos

**Desventaja principal:** Si encuentras un problema al final, es difícil y costoso volver atrás para arreglarlo.

### 2. Modelo V

Una versión mejorada del Waterfall que añade pruebas en cada etapa. Imagina que por cada piso que construyes en tu casa, haces una inspección inmediata.

**Características:**

- Similar al Waterfall pero con verificación en cada fase
- Detecta errores más temprano
- Mejor control de calidad
- Ideal para proyectos con requisitos claros

### 3. Desarrollo Ágil

Como cocinar siguiendo las sugerencias de los comensales: preparas un plato básico, lo prueban, y vas ajustando según sus comentarios.

**Características:**

- Desarrollo iterativo e incremental
- Colaboración constante con el cliente
- Adaptable a cambios
- Entrega continua de valor

## Niveles de Pruebas

### 1. Pruebas Unitarias

Como probar cada ingrediente antes de usarlo en una receta.

- Prueba componentes individuales
- Verifica que cada función hace su trabajo específico
- Ejemplo: Probar que una función de calculadora suma correctamente

### 2. Pruebas de Integración

Como asegurarse de que todos los ingredientes se mezclan bien.

- Prueba cómo funcionan los componentes juntos
- Verifica las interacciones entre partes del sistema
- Ejemplo: Probar que el login se conecta correctamente con la base de datos

### 3. Pruebas de Sistema

Como probar todo el plato completo.

- Prueba todo el sistema funcionando junto
- Verifica el flujo completo de operaciones
- Ejemplo: Probar todo el proceso de compra en una tienda online

### 4. Pruebas de Aceptación

Como cuando el cliente prueba el plato final.

- El cliente verifica que el software cumple sus necesidades
- Pruebas en condiciones reales
- Ejemplo: El cliente verifica que puede crear, editar y eliminar tareas en su sistema de gestión

## Tipos Adicionales de Pruebas

### Pruebas No Funcionales

Verifican aspectos como:

- Rendimiento (qué tan rápido funciona)
- Usabilidad (qué tan fácil es de usar)
- Seguridad (qué tan bien protegido está)
- Fiabilidad (qué tan estable es)
- Compatibilidad (con qué sistemas funciona)

## Conclusión

Las pruebas son fundamentales para asegurar la calidad del software. Cada nivel y tipo de prueba tiene su propósito específico, y juntos ayudan a crear software confiable y efectivo.
