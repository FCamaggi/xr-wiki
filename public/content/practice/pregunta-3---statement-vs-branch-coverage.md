# Pregunta 3 - Statement vs Branch Coverage

## 📖 Recordatorio Teórico

### Fundamentos de Cobertura de Código

La cobertura de código es una métrica que mide qué tanto del código fuente es ejecutado durante las pruebas. Los dos tipos principales son:

### Statement Coverage (Cobertura de Sentencias)

- Mide qué líneas de código se ejecutan
- Una línea se considera cubierta si se ejecuta al menos una vez

```python
def ejemplo(x):
    a = 0           # Línea 1
    b = x + 1       # Línea 2
    print(b)        # Línea 3
# Con test(1), cobertura = 100% (3/3 líneas)
```

### Branch Coverage (Cobertura de Ramas)

- Mide qué ramas de decisión (if/else, while, etc.) se ejecutan
- Requiere que cada condición se evalúe como verdadera y falsa

```python
def ejemplo(x):
    if x > 0:           # Rama 1: True/False
        return "Pos"    # Rama 1: True
    else:
        return "Neg"    # Rama 1: False
# Necesita test(1) y test(-1) para 100% branch coverage
```

### Relación entre Coberturas

```python
def validar_edad(edad):
    es_adulto = False           # Statement 1
    if edad >= 18:             # Branch 1
        es_adulto = True       # Statement 2
    return es_adulto           # Statement 3

# 100% Statement coverage posible con solo test(20)
# 100% Branch coverage requiere test(20) y test(15)
```

### Características Clave

1. **Statement Coverage**

   - Más básica y fácil de lograr
   - No garantiza probar todas las decisiones
   - 100% statement no implica 100% branch
   - Útil como métrica inicial

2. **Branch Coverage**
   - Más rigurosa que statement coverage
   - Requiere más casos de prueba
   - 100% branch implica 100% statement
   - Mejor para detectar errores lógicos

### Fórmulas de Cálculo

```
Statement Coverage = (Líneas ejecutadas / Total líneas) × 100%
Branch Coverage = (Ramas ejecutadas / Total ramas) × 100%
```

### Casos Especiales

1. **Operadores Lógicos**

```python
if (a > 0 and b > 0):    # Dos condiciones, una rama
    print("Ambos positivos")
```

2. **Bucles**

```python
while x < 10:    # Branch: entrada/no entrada al bucle
    x += 1       # Statement dentro del bucle
```

3. **Try-Except**

```python
try:
    valor = lista[0]    # Branch: éxito/excepción
except IndexError:
    valor = None        # Branch: manejo de excepción
```

> Errores Comunes
>
> - Confundir cobertura de líneas con cobertura de ramas
> - Asumir que alta cobertura significa alta calidad
> - Ignorar casos límite en condicionales
> - No considerar todas las combinaciones de condiciones

> Mejores Prácticas
>
> 1.  Usar branch coverage como objetivo mínimo
> 2.  Combinar con otras técnicas de testing
> 3.  Considerar condiciones compuestas
> 4.  Documentar casos no cubiertos intencionalmente
> 5.  No obsesionarse con lograr 100% de cobertura

## 📋 Enunciado

Es posible tener un statement coverage de 100% sin tener un branch coverage < 100%? Si es posible de un ejemplo que muestre de una función y unos tests que tengan 100% de statement coverage, pero no 100% de branch coverage. Si no es posible argumente porque no es posible.

## 🔍 Solución

Sí, es posible tener 100% de statement coverage sin tener 100% de branch coverage. Aquí un ejemplo:

```python
def verificar_edad(edad):
    es_adulto = False
    if edad >= 18:
        es_adulto = True
    return es_adulto

# Test que logra 100% statement coverage pero no 100% branch coverage
def test_verificar_edad():
    resultado = verificar_edad(20)
    assert resultado == True
```

En este caso:

- Statement coverage: 100% (todas las líneas son ejecutadas)
- Branch coverage: 50% (solo se prueba la rama verdadera del if)

## 📚 Explicación

1. **Statement Coverage**

   - Mide qué líneas de código se ejecutan
   - El test ejecuta todas las líneas:
     - Declaración de es_adulto
     - La condición if
     - La asignación dentro del if
     - El return

2. **Branch Coverage**
   - Mide qué ramas de decisión se toman
   - El test solo cubre:
     - La rama donde edad >= 18 es True
     - No cubre cuando edad >= 18 es False

> Diferencia Clave
> El statement coverage solo verifica que cada línea se ejecute al menos una vez, mientras que el branch coverage exige que cada decisión (if, while, etc.) se evalúe tanto como verdadera como falsa.

## 💡 Tips para el Examen

1. Identifica las decisiones en el código
2. Distingue entre ejecutar una línea y probar una condición
3. Para 100% branch coverage necesitas:
   - Probar cada condición como True
   - Probar cada condición como False
4. El statement coverage es más débil que el branch coverage
5. Un test suite con 100% branch coverage siempre tendrá 100% statement coverage

> Errores Comunes
>
> - Confundir ejecución de líneas con evaluación de condiciones
> - Pensar que probar una línea implica probar todas las ramas
> - Olvidar que cada decisión tiene múltiples caminos posibles
