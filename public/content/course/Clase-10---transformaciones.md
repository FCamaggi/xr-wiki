# Transformaciones de Código Python usando AST: Una Guía Simple

## Introducción

Este documento explica cómo podemos modificar código Python automáticamente usando el módulo `ast` (Abstract Syntax Tree). Imagina que el código es como un árbol, donde cada parte del programa (funciones, variables, operaciones) es una rama o una hoja que podemos modificar.

## Conceptos Básicos

El AST (Árbol de Sintaxis Abstracta) es una representación del código en forma de árbol que nos permite:

- Analizar el código
- Modificar su estructura
- Crear nuevo código

Es como tener un mapa detallado de nuestro código que podemos editar.

## Ejemplo 1: Agregando un Print Automático

### El Problema

Queremos modificar automáticamente una función para que imprima sus argumentos al inicio.

### Antes y Después

**Código Original:**

```python
def suma_before(a, b):
    return a + b
```

**Código Transformado:**

```python
def suma_after(a, b):
    print([a, b])
    return a + b
```

### Cómo Funciona

La clase `PrintTransformer` hace este trabajo:

1. Busca todas las definiciones de funciones
2. Crea una nueva instrucción `print`
3. La inserta al inicio de cada función

Es como si tuviéramos un asistente que:

1. Lee cada función
2. Agrega automáticamente una línea para imprimir los argumentos
3. Mantiene el resto del código igual

## Ejemplo 2: Eliminando Parámetros No Utilizados

### El Problema

Queremos eliminar automáticamente los parámetros que no se usan en una función.

### Antes y Después

**Código Original:**

```python
def var_before(a, b, c):
    return a + b
```

**Código Transformado:**

```python
def var_after(a, b):
    return a + b
```

### Cómo Funciona

El proceso usa dos clases:

1. `VarVisitor`:

   - Cuenta cuántas veces se usa cada variable
   - Es como un contador que anota cada vez que ve una variable en uso

2. `FunctionParametersTransformer`:
   - Revisa qué parámetros se usan realmente
   - Elimina los que no se utilizan
   - Es como un editor que elimina los parámetros innecesarios

## Casos de Uso

Estas transformaciones son útiles para:

- Depuración: Agregar prints automáticos para seguimiento
- Limpieza de código: Eliminar parámetros no usados
- Mantenimiento: Modificar muchas funciones de forma automática

## Ejemplo Práctico Adicional

Imaginemos que tenemos varias funciones en nuestro código:

```python
def calcular_precio(producto, cantidad, descuento):
    return producto * cantidad

def procesar_pedido(cliente, producto, fecha):
    return producto
```

Con nuestras transformaciones:

1. Se agregarían prints automáticos al inicio
2. Se eliminarían los parámetros no usados (`descuento` y `cliente`, `fecha`)

Resultado:

```python
def calcular_precio(producto, cantidad):
    print([producto, cantidad])
    return producto * cantidad

def procesar_pedido(producto):
    print([producto])
    return producto
```

## Conclusión

Estas herramientas nos permiten modificar código de forma automática y segura, ahorrando tiempo y reduciendo errores. Es como tener un asistente que puede editar nuestro código siguiendo reglas específicas.
