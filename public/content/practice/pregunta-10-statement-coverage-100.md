# Pregunta 10: Statement Coverage 100%

## 📖 Recordatorio Teórico

### Fundamentos de Statement Coverage

#### Definición

Statement coverage mide el porcentaje de líneas de código ejecutadas durante las pruebas.

```python
def funcion_ejemplo(x):
    a = x + 1       # Línea 1
    if x > 0:       # Línea 2
        b = x * 2   # Línea 3
    else:
        b = 0       # Línea 4
    return b        # Línea 5
```

#### Cálculo de Cobertura

```python
Cobertura = (Líneas ejecutadas / Total líneas) × 100%

# Ejemplo:
# Con test(1): Ejecuta líneas 1,2,3,5 -> 4/5 = 80%
# Con test(-1): Ejecuta líneas 1,2,4,5 -> 4/5 = 80%
# Con ambos tests: Ejecuta todas -> 5/5 = 100%
```

### Estrategias para 100% Coverage

#### 1. Identificación de Caminos

```python
def analizar_caminos(codigo):
    caminos = {
        'secuencial': [],  # Código que siempre se ejecuta
        'condicional': [], # Código dentro de if/else
        'bucles': [],      # Código dentro de loops
        'excepciones': []  # Código de manejo de errores
    }
```

#### 2. Diseño de Casos de Prueba

```python
def disenar_tests(caminos):
    tests = []
    for camino in caminos:
        # Identificar valores que activan el camino
        condiciones = camino.get_condiciones()
        valores = generar_valores(condiciones)
        tests.append(TestCase(valores))
    return tests
```

### Técnicas de Implementación

#### 1. Testing de Ramas

```python
# Código a probar
def calcular_descuento(total, tipo_cliente):
    if tipo_cliente == 'premium':
        descuento = 0.20
    elif tipo_cliente == 'regular':
        descuento = 0.10
    else:
        descuento = 0.0
    return total * (1 - descuento)

# Tests para 100% coverage
def test_descuentos():
    assert calcular_descuento(100, 'premium') == 80
    assert calcular_descuento(100, 'regular') == 90
    assert calcular_descuento(100, 'basic') == 100
```

#### 2. Testing de Loops

```python
def procesar_lista(items):
    resultado = []
    for item in items:
        if item > 0:
            resultado.append(item * 2)
    return resultado

# Tests para 100% coverage
def test_procesar_lista():
    assert procesar_lista([]) == []          # Lista vacía
    assert procesar_lista([1,2]) == [2,4]    # Valores positivos
    assert procesar_lista([-1]) == []        # Valores negativos
```

### Consideraciones Importantes

#### 1. Casos Especiales

```python
def funcion_con_excepciones(x):
    try:
        resultado = 100 / x    # Posible división por cero
        if resultado > 10:
            return "Alto"
        return "Bajo"
    except ZeroDivisionError:
        return "Error"

# Tests necesarios para 100% coverage
def test_completo():
    assert funcion_con_excepciones(5) == "Alto"
    assert funcion_con_excepciones(20) == "Bajo"
    assert funcion_con_excepciones(0) == "Error"
```

#### 2. Valores Límite

```python
def validar_edad(edad):
    if edad < 0:
        return "Inválido"
    elif edad < 18:
        return "Menor"
    elif edad < 65:
        return "Adulto"
    else:
        return "Senior"

# Tests para cubrir todos los casos
def test_validar_edad():
    assert validar_edad(-1) == "Inválido"
    assert validar_edad(17) == "Menor"
    assert validar_edad(30) == "Adulto"
    assert validar_edad(65) == "Senior"
```

> Limitaciones
>
> - No garantiza encontrar todos los errores
> - No verifica todas las combinaciones posibles
> - Puede dar falsa sensación de seguridad
> - No considera la calidad de las aserciones

> Mejores Prácticas
>
> 1.  Identificar todos los caminos de ejecución
> 2.  Incluir casos límite y especiales
> 3.  Verificar excepciones y errores
> 4.  Documentar casos no cubiertos
> 5.  Combinar con otras técnicas de testing

## 📋 Enunciado

Crear una batería de pruebas que logre un 100% de statement coverage para la siguiente función:

```python
def calculate_discounted_price(total, membership_level):
    if membership_level == 'silver':
        discount = 0.05
    elif membership_level == 'gold':
        discount = 0.10
    elif membership_level == 'platinum':
        discount = 0.15
    else:
        discount = 0.0
    if total > 100:
        return total * (1 - discount)
    else:
        return total
```

## 🔍 Análisis de Cobertura

Para lograr 100% de statement coverage necesitamos ejecutar:

1. Cada rama del if-elif-else de membership_level
2. Ambas ramas del if-else de total

## 📝 Solución

```python
import unittest

class MyTest(unittest.TestCase):
    def test_silver_above_100(self):
        result = calculate_discounted_price(200, 'silver')
        self.assertEqual(result, 190)  # 200 * (1 - 0.05)

    def test_gold_above_100(self):
        result = calculate_discounted_price(200, 'gold')
        self.assertEqual(result, 180)  # 200 * (1 - 0.10)

    def test_platinum_above_100(self):
        result = calculate_discounted_price(200, 'platinum')
        self.assertEqual(result, 170)  # 200 * (1 - 0.15)

    def test_no_membership_above_100(self):
        result = calculate_discounted_price(200, 'bronze')
        self.assertEqual(result, 200)  # 200 * (1 - 0.0)

    def test_any_membership_below_100(self):
        result = calculate_discounted_price(50, 'gold')
        self.assertEqual(result, 50)  # No discount applied
```

## 💡 Explicación

Cada test cubre una combinación específica:

> Cobertura de Casos
>
> 1.  **test_silver_above_100:**
>
> - Líneas: 2-3, 10-11
> - Descuento: 5%
>
> 2.  **test_gold_above_100:**
>
> - Líneas: 4-5, 10-11
> - Descuento: 10%
>
> 3.  **test_platinum_above_100:**
>
> - Líneas: 6-7, 10-11
> - Descuento: 15%
>
> 4.  **test_no_membership_above_100:**
>
> - Líneas: 8-9, 10-11
> - Descuento: 0%
>
> 5.  **test_any_membership_below_100:**
>
> - Líneas: cualquier membership, 12-13
> - Sin descuento

## 🧮 Fórmulas Usadas

$$
Precio_{final} = \begin{cases}
total \times (1 - descuento) & \text{si total > 100} \\
total & \text{si total ≤ 100}
\end{cases}
$$

Donde:

$$
descuento = \begin{cases}
0.05 & \text{si nivel = 'silver'} \\
0.10 & \text{si nivel = 'gold'} \\
0.15 & \text{si nivel = 'platinum'} \\
0.00 & \text{otro caso}
\end{cases}
$$

## 🎯 Tips para el Examen

- [i] Identifica todas las ramas de decisión
- [i] Asegura al menos un test por cada rama
- [i] Verifica valores límite (ej: 100)
- [!] No olvides el caso default/else
- [i] Usa valores que faciliten verificar el cálculo

> Recomendaciones
>
> 1.  Dibuja un diagrama de flujo antes de escribir tests
> 2.  Usa valores numéricos que faciliten verificar los cálculos
> 3.  Nombra los tests de manera descriptiva
> 4.  Verifica que cada línea se ejecute al menos una vez

> Errores Comunes
>
> - Olvidar probar el caso else/default
> - No verificar el caso de total ≤ 100
> - Usar valores que complican la verificación
> - No documentar el propósito de cada test

> Verificación de Cobertura
> Para verificar 100% de cobertura:
>
> ```bash
> coverage run -m unittest test_file.py
> coverage report -m
> ```
