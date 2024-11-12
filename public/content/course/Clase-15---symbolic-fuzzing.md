# Fuzzing Simbólico: Una Guía Práctica

## Introducción

El fuzzing simbólico es una técnica para probar programas que nos permite explorar sistemáticamente diferentes caminos de ejecución y generar entradas de prueba específicas. En lugar de generar entradas aleatorias, analiza el código para determinar qué valores necesitamos para ejecutar cada parte del programa.

## ¿Por qué usar Fuzzing Simbólico?

Imaginemos que tenemos una caja fuerte con una combinación de 4 dígitos. Probar todas las combinaciones posibles (0000-9999) tomaría mucho tiempo. El fuzzing simbólico sería como tener un plano de la caja fuerte que nos muestra exactamente qué números necesitamos para abrirla.

Los métodos tradicionales de fuzzing que usan valores aleatorios tienen limitaciones:

- Es muy difícil encontrar valores específicos por azar
- Pueden perderse casos importantes
- No garantizan cubrir todos los caminos del programa

## Cómo Funciona

### Componentes Principales

1. **Variables Simbólicas**: En lugar de usar valores concretos, usamos variables que pueden tomar cualquier valor válido.

2. **Restricciones**: Condiciones que deben cumplir las variables para seguir un camino específico.

3. **Solucionador**: Un programa (como Z3) que encuentra valores concretos que satisfacen las restricciones.

### Ejemplo Simple

Consideremos esta función que determina el tipo de triángulo:

```python
def check_triangle(a: int, b: int, c: int) -> str:
    if a == b:
        if a == c:
            return "Equilateral"
        return "Isosceles"
    elif b == c or a == c:
        return "Isosceles"
    return "Scalene"
```

El fuzzing simbólico:

1. Identifica los diferentes caminos (equilátero, isósceles, escaleno)
2. Genera restricciones (por ejemplo, para equilátero: a=b y b=c)
3. Encuentra valores que cumplan estas restricciones

## Ventajas y Limitaciones

### Ventajas

- Puede encontrar casos específicos que serían muy difíciles de encontrar al azar
- Garantiza mejor cobertura del código
- Ayuda a encontrar errores en casos límite

### Limitaciones

- Puede ser computacionalmente costoso
- Tiene dificultades con bucles y código muy complejo
- Requiere que el código tenga buenas anotaciones de tipos

## Ejemplo Práctico: Calculadora de Raíces Cuadráticas

```python
def roots(a: float, b: float, c: float):
    d = b * b - 4 * a * c
    if a == 0:
        if b == 0:
            return None  # No solución
        return -c/b     # Ecuación lineal
    x1 = (-b + math.sqrt(d))/(2*a)
    x2 = (-b - math.sqrt(d))/(2*a)
    return x1, x2
```

El fuzzing simbólico puede ayudarnos a:

1. Encontrar casos donde la función falla (a=0)
2. Probar diferentes tipos de soluciones (reales, imaginarias)
3. Verificar casos límite

## Conclusiones

El fuzzing simbólico es una herramienta poderosa que nos permite:

- Probar nuestro código de manera más sistemática
- Encontrar errores difíciles de detectar
- Generar casos de prueba específicos

Es especialmente útil cuando:

- Necesitamos valores muy específicos para probar ciertas partes del código
- Queremos asegurarnos de probar todos los caminos posibles
- Trabajamos con código que tiene muchas condiciones y ramificaciones

Sin embargo, debemos recordar que es una herramienta más en nuestro arsenal y puede complementarse con otras técnicas de prueba como el fuzzing tradicional o las pruebas unitarias.
