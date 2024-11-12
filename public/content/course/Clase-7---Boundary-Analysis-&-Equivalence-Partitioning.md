# Guía de Pruebas de Software: Análisis de Límites y Particiones de Equivalencia

## Introducción

Este documento explica dos técnicas fundamentales para diseñar pruebas de software de manera eficiente y efectiva: el análisis de límites (Boundary Analysis) y las particiones de equivalencia (Equivalence Partitioning).

## Particiones de Equivalencia

### ¿Qué es?

Es una técnica de prueba de caja negra que divide los datos de entrada en grupos o "particiones" donde se espera que los elementos de cada grupo se comporten de manera similar. Esto permite reducir el número de casos de prueba necesarios mientras se mantiene una buena cobertura.

### Características principales:

- Aplicable en diferentes niveles de prueba (unitario, integración, sistema)
- Divide los datos en particiones válidas e inválidas
- Cada valor solo puede pertenecer a una partición
- Las particiones inválidas deben probarse individualmente

### Ejemplo Práctico: Sistema Bancario

Consideremos un sistema que verifica la edad para abrir una cuenta bancaria:

- Partición válida: 18-60 años (permite apertura online)
- Particiones inválidas:
  - Menores de 18 años
  - Mayores de 60 años

## Análisis de Límites (Boundary Analysis)

### ¿Qué es?

Es una técnica que se enfoca en probar los valores en los límites entre diferentes particiones, ya que la experiencia muestra que estos puntos son más propensos a errores.

### Tipos de prueba:

1. **Prueba de dos valores (Two-value testing)**:

   - El valor límite exacto
   - El valor inmediatamente después del límite

2. **Prueba de tres valores (Three-value testing)**:
   - El valor justo antes del límite
   - El valor límite exacto
   - El valor inmediatamente después del límite

### Ejemplo Práctico: Sistema de Pedidos de Pizza

Para un sistema que acepta pedidos de 1 a 10 pizzas:

Límites a probar:

- Límite inferior: 0, 1, 2
- Límite superior: 9, 10, 11

## Beneficios y Consideraciones

### Ventajas:

- Reduce el número de casos de prueba necesarios
- Proporciona una cobertura sistemática
- Ayuda a identificar casos problemáticos
- Facilita la documentación y mantenimiento

### Cuándo usar cada técnica:

- **Particiones de Equivalencia**: Cuando hay grupos claros de valores con comportamiento similar
- **Análisis de Límites**: Cuando hay rangos definidos y puntos de transición críticos

### Consideraciones importantes:

1. Las pruebas deben ser independientes
2. Los casos de prueba inválidos no deben combinarse
3. Documentar claramente los criterios de partición
4. Mantener actualizada la suite de pruebas

## Conclusión

Estas técnicas son fundamentales para crear pruebas efectivas y eficientes. Combinadas adecuadamente, permiten obtener una buena cobertura de pruebas mientras se mantiene manejable el número de casos de prueba.
