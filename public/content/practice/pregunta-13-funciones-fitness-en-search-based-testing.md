# Pregunta 13: Funciones Fitness en Search-Based Testing

## 📖 Recordatorio Teórico

### Fundamentos de Funciones Fitness

La función fitness es una medida que indica qué tan cerca está una solución de alcanzar un objetivo específico en testing basado en búsqueda. Es crucial para guiar algoritmos evolutivos y de búsqueda hacia soluciones óptimas.

### Tipos de Funciones Fitness

#### 1. Distancia de Ramas

```
Para condiciones booleanas simples:
- Condición verdadera: fitness = 0
- Condición falsa: fitness = k + distancia
donde k es una constante positiva
```

#### 2. Distancia Numérica

Para comparaciones numéricas:

```python
# Para a = b:
distancia = abs(a - b)

# Para a ≤ b:
distancia = max(0, a - b)

# Para a ≥ b:
distancia = max(0, b - a)
```

#### 3. Funciones Compuestas

Para condiciones complejas:

```python
# Para AND (a && b):
fitness = distancia(a) + distancia(b)

# Para OR (a || b):
fitness = min(distancia(a), distancia(b))
```

### Características de una Buena Función Fitness

1. **Continuidad**

   - Debe proporcionar gradiente
   - Evitar plateaus
   - Guiar hacia la solución

2. **Escalabilidad**

   - Manejar diferentes rangos de valores
   - Normalización cuando sea necesario

3. **Precisión**
   - Reflejar cercanía al objetivo
   - Discriminar entre soluciones

> Mejores Prácticas
>
> 1.  Mantener la función simple
> 2.  Evitar discontinuidades
> 3.  Normalizar cuando sea necesario
> 4.  Validar con casos límite
> 5.  Considerar el dominio del problema

> Errores Comunes
>
> 1.  Funciones binarias (0/1)
> 2.  Pérdida de información de distancia
> 3.  Plateaus en el espacio de búsqueda
> 4.  No considerar casos especiales

## 📋 Enunciado

Considere la siguiente función:

```python
def test_me(x, y):
    if x == 2 * (y + 1):
        return True
    else:
        return False
```

Crear una función fitness que devuelva la distancia a la que un input está de hacer que la condición sea verdad. Debe devolver 0 cuando la condición del if sea verdad.

## 🔍 Análisis

La condición que queremos que sea verdadera es:

```python
x == 2 * (y + 1)
```

Necesitamos medir la "distancia" entre:

- Valor actual: `x`
- Valor objetivo: `2 * (y + 1)`

## 💡 Solución

```python
def fitness(x, y):
    target = 2 * (y + 1)
    value = abs(x - target)
    return value
```

## 📚 Explicación Detallada

> Elementos Clave
>
> 1.  `target = 2 * (y + 1)`: Calcula el valor que debería tener x
> 2.  `abs(x - target)`: Mide la distancia entre x y su valor objetivo
> 3.  `return value`: Devuelve esta distancia

### Verificación:

```python
# Caso 1: Condición verdadera
assert fitness(4, 1) == 0  # porque 4 == 2 * (1 + 1)

# Caso 2: x mayor que el objetivo
assert fitness(5, 1) == 1  # porque |5 - 2*(1+1)| = |5 - 4| = 1

# Caso 3: x menor que el objetivo
assert fitness(3, 1) == 1  # porque |3 - 2*(1+1)| = |3 - 4| = 1
```

## 🎯 Casos de Uso

> Ejemplos Numéricos
>
> 1.  `fitness(4, 1)` → 0
>
> - target = 2 \* (1 + 1) = 4
> - |4 - 4| = 0
>
> 2.  `fitness(5, 1)` → 1
>
> - target = 2 \* (1 + 1) = 4
> - |5 - 4| = 1
>
> 3.  `fitness(0, 0)` → 2
>
> - target = 2 \* (0 + 1) = 2
> - |0 - 2| = 2

## 💡 Tips para Recordar

- [i] La función debe retornar 0 cuando x == 2\*(y+1)
- [i] Usar valor absoluto para distancias positivas
- [i] Separar el cálculo en pasos para mayor claridad
- [!] No olvidar los paréntesis en (y + 1)

> Errores Comunes
>
> 1.  Olvidar el valor absoluto
> 2.  Calcular incorrectamente el target
> 3.  Confundir el orden de la resta
> 4.  No considerar casos negativos

> Consejo para el Examen
>
> 1.  Escribe primero la fórmula matemática
> 2.  Prueba con casos sencillos
> 3.  Verifica especialmente el caso donde debe dar 0
> 4.  Comprueba que funciona con números negativos

## 🧮 Fórmula Matemática

$$ fitness(x,y) = |x - 2(y + 1)| $$
