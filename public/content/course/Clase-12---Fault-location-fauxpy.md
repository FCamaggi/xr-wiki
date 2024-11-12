# Guía sobre Localización de Fallos con FauxPy

## Introducción

Imagina que eres un detective tratando de resolver un misterio en tu código. Sabes que hay un error porque tus pruebas están fallando, pero ¿dónde está exactamente? Aquí es donde FauxPy entra en acción, actuando como tu asistente detective para encontrar errores en código Python.

## ¿Qué es FauxPy?

FauxPy es una herramienta moderna que ayuda a encontrar errores en programas Python. Piensa en ella como un escáner que analiza tu código de diferentes maneras para encontrar dónde podrían estar los problemas. Es especialmente útil porque puede usar diferentes métodos de búsqueda, como veremos a continuación.

## Técnicas de Localización de Fallos

### 1. Basada en Espectro (SBFL)

#### ¿Cómo funciona?

Es como comparar las huellas digitales de cuando tu programa funciona bien versus cuando falla. FauxPy observa qué líneas de código se ejecutan en cada caso y usa esta información para encontrar las sospechosas.

#### Ejemplo práctico:

Imagina una función que calcula el área de un triángulo equilátero:

```python
def equilateral_area(side):
    const = sqrt(3)/4
    term = side * side
    return const + term  # ERROR: debería ser multiplicación, no suma
```

SBFL detecta que esta línea es sospechosa porque cuando se ejecuta, las pruebas fallan.

**Ventajas:**

- Rápida (toma menos de un segundo)
- Fácil de entender

**Limitaciones:**

- No puede distinguir entre líneas que siempre se ejecutan juntas

### 2. Basada en Mutación (MBFL)

#### ¿Cómo funciona?

Es como hacer pequeños cambios experimentales en tu código para ver qué pasa. Si al cambiar algo el programa empieza a funcionar (o deja de funcionar), esa parte probablemente está relacionada con el error.

**Ventajas:**

- Muy precisa
- Puede encontrar errores específicos

**Limitaciones:**

- Mucho más lenta (puede tomar 15-20 segundos o más)
- Requiere más recursos

### 3. Basada en Trazas de Pila (ST)

#### ¿Cómo funciona?

Es como seguir las migajas de pan que deja tu programa cuando falla. Cuando ocurre un error que detiene el programa (como una división por cero), ST mira el camino que llevó a ese error.

#### Ejemplo práctico:

```python
def isosceles_area(base, leg):
    # Si intercambiamos base y leg incorrectamente
    t1 = leg * leg
    t2 = (base * base) / 4
    height = sqrt(t1 - t2)  # Crash si t1 < t2
```

**Ventajas:**

- Muy rápida
- Excelente para errores que causan que el programa se detenga

**Limitaciones:**

- Solo funciona cuando hay errores que detienen el programa
- No puede encontrar errores "silenciosos"

### 4. Cambio de Predicados (PS)

#### ¿Cómo funciona?

Es como jugar con los interruptores de luz de tu código. PS cambia temporalmente las decisiones (if/else) en tu programa para ver si eso arregla el error.

**Ventajas:**

- Puede encontrar errores en la lógica de decisión

**Limitaciones:**

- Solo funciona cuando el error está en una estructura de control (if/else)
- No sirve para errores en cálculos directos

## Consejos Prácticos

1. **Empieza con SBFL**: Es rápida y da buenos resultados iniciales.
2. **Usa MBFL** cuando necesites más precisión y no te importe esperar.
3. **Considera ST** cuando tu programa se detiene con errores.
4. **Prueba PS** cuando sospeches que el problema está en una decisión lógica.

## Conclusión

FauxPy es como tener varios detectives, cada uno con su propio método para encontrar errores. No hay un método perfecto para todos los casos, pero tener estas diferentes técnicas disponibles te da más posibilidades de encontrar y corregir errores en tu código.
