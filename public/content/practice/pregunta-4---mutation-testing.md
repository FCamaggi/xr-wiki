# Pregunta 4 - Mutation Testing

## 📖 Recordatorio Teórico

### Fundamentos de Mutation Testing

El mutation testing es una técnica avanzada que evalúa la calidad de las pruebas mediante la introducción de pequeños cambios (mutaciones) en el código fuente y verificando si las pruebas detectan estos cambios.

### Operadores de Mutación Comunes

1. **Operadores Aritméticos**

```python
# Original
resultado = x + y
# Mutantes
resultado = x - y
resultado = x * y
resultado = x / y
```

2. **Operadores Relacionales**

```python
# Original
if x > y:
# Mutantes
if x >= y:
if x < y:
if x == y:
```

3. **Operadores Lógicos**

```python
# Original
if a and b:
# Mutantes
if a or b:
if not a and b:
if a and not b:
```

### Proceso de Mutation Testing

1. **Generación de Mutantes**

```python
def distance(dx, dy):
    return math.sqrt(dx*dx + dy*dy)

# Mutante 1: Cambio de operador
def distance_mut1(dx, dy):
    return math.sqrt(dx+dx + dy*dy)

# Mutante 2: Cambio de variable
def distance_mut2(dx, dy):
    return math.sqrt(dx*dx + dy+dy)
```

2. **Ejecución de Tests**

```python
# Test Original
assert distance(3,4) == 5

# Resultados esperados:
# Mutante 1: Debe fallar (mutante muerto)
# Mutante 2: Puede sobrevivir
```

### Métricas de Mutation Testing

```python
Mutation Score = (Mutantes Muertos / Total Mutantes) × 100%

# Ejemplo:
# 20 mutantes generados
# 15 mutantes muertos
# Mutation Score = 75%
```

### Tipos de Mutantes

1. **Mutantes Muertos**

   - Detectados por las pruebas
   - Indican pruebas efectivas

   ```python
   # Original
   if x > 0:
       return True

   # Mutante (muerto si hay test con x=0)
   if x >= 0:
       return True
   ```

2. **Mutantes Sobrevivientes**

   - No detectados por las pruebas
   - Indican debilidades en el suite de pruebas

   ```python
   # Original
   result = value * 2

   # Mutante (sobrevive si no hay test con value=1)
   result = value + value
   ```

3. **Mutantes Equivalentes**

   - Funcionalmente idénticos al código original
   - No pueden ser detectados por pruebas

   ```python
   # Original
   x = a + b

   # Mutante Equivalente
   x = b + a
   ```

### Estrategias de Selección de Mutantes

1. **Mutación Selectiva**

   - Seleccionar operadores más efectivos
   - Reducir número de mutantes

   ```python
   # Enfocarse en operadores críticos
   # - Operadores aritméticos en cálculos
   # - Condiciones en control de flujo
   # - Modificadores en bucles
   ```

2. **Mutación por Muestreo**
   - Seleccionar subset aleatorio de mutantes
   - Reducir tiempo de ejecución
   ```python
   # Ejemplo: Seleccionar 20% de mutantes
   # De 100 posibles mutantes
   # Analizar solo 20 aleatorios
   ```

> Limitaciones
>
> - Alto costo computacional
> - Mutantes equivalentes
> - Mutantes triviales
> - Tiempo de ejecución extenso

> Mejores Prácticas
>
> 1.  Priorizar áreas críticas del código
> 2.  Usar mutación selectiva
> 3.  Identificar y documentar mutantes equivalentes
> 4.  Combinar con otras técnicas de testing
> 5.  Automatizar el proceso

### Herramientas Comunes

```python
# Ejemplo con pytest-mutagen
def test_function():
    @mutate('a + b', 'a - b')
    def add(a, b):
        return a + b

    assert add(2, 2) == 4
```

## 📋 Enunciado

Considere la siguiente función que calcula la distancia del origen a un punto. Kokito, un estudiante de testing del 2020, realizó los siguientes dos tests para evaluar la funcionalidad de la función distance:

```python
# dx: distancia en el eje X
# dy: distancia en el eje Y
def distance(dx,dy):
    return math.sqrt(dx*dx + dy*dy)

def test_1(self):
    result = distance(0,2)
    self.assertEqual(result,2)

def test_2(self):
    result = distance(2,3)
    decimalPlace = 2
    self.assertAlmostEqual(result,3.60555,decimalPlace)
```

El profesor evaluó sus tests utilizando mutation testing, y la herramienta mostró un mutante que los test de kokito no pudo eliminar:

```
SURVIVED
--------
- src/max.py (l: 4, c: 21) - mutation from <class 'ast.Mult'> to <class 'ast.Add'>
```

Ayude a kokito a crear un test que permita eliminar este último mutante.

1. Explique porque la batería de test actual no detecta al mutante.
2. Escriba un test en python que permita matar ese mutante.

## 🔍 Solución

1. **¿Por qué no se detecta el mutante?**
   El mutante cambia la multiplicación (\*) por una suma (+) en la línea 4:

- Original: `math.sqrt(dx*dx + dy*dy)`
- Mutante: `math.sqrt(dx+dx + dy*dy)`

Para los casos de prueba actuales:

- test_1: `distance(0,2)` → Original: √(0*0 + 2*2) = 2 | Mutante: √(0+0 + 2\*2) = 2
- test_2: `distance(2,3)` → Original: √(2*2 + 3*3) = 3.60555 | Mutante: √(2+2 + 3\*3) = 3.60555

2. **Test para matar el mutante:**

```python
def test_3(self):
    result = distance(3,0)
    self.assertEqual(result,3)
```

## 📚 Explicación

1. **Por qué funciona el nuevo test:**

   - Con input (3,0):
     - Original: √(3*3 + 0*0) = √9 = 3
     - Mutante: √(3+3 + 0\*0) = √6 ≈ 2.45
   - El test detecta la diferencia entre multiplicación y suma

2. **¿Cómo seleccionar el caso de prueba?**
   - Necesitamos un caso donde x\*x ≠ x+x
   - Números pequeños como 0,1,2 pueden dar resultados similares
   - 3 es un buen candidato: 3\*3=9 vs 3+3=6

> Estrategia para Mutation Testing
>
> 1.  Analiza el operador mutado
> 2.  Busca inputs donde el comportamiento difiera
> 3.  Evita valores que den el mismo resultado
> 4.  Considera casos donde la diferencia sea significativa

## 💡 Tips para el Examen

1. Identifica el tipo de mutación
2. Analiza matemáticamente el impacto
3. Busca casos donde la mutación afecte el resultado
4. Verifica que el test falle con el mutante
5. El test debe pasar con el código original
