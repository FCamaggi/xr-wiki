# Pregunta 17: Análisis de Flujo de Información y Métodos String

## 📖 Recordatorio Teórico

### Fundamentos de Flujo de Información

El análisis de flujo de información rastrea cómo los datos se propagan a través de un programa, permitiendo entender y monitorear el uso de datos sensibles.

### Wrapper Classes y Proxies

#### 1. Wrappers de Strings

```python
class BaseWrapper:
    def __init__(self, value):
        self._value = value
        self._tracked = set()

    def track_operation(self, operation_name):
        self._tracked.add(operation_name)
```

#### 2. Métodos de String

Los métodos de string en Python se pueden categorizar en:

1. **Operadores Especiales**

```python
_special_methods = [
    '_format_',   # Formateo de strings
    '_mod_',      # Operador %
    '_add_',      # Concatenación
    '_mul_'       # Multiplicación
]
```

2. **Métodos de Transformación**

```python
_transform_methods = [
    'capitalize',  # Capitalización
    'lower',      # Conversión a minúsculas
    'upper',      # Conversión a mayúsculas
    'swapcase'    # Intercambio de mayúsculas/minúsculas
]
```

3. **Métodos de Formato**

```python
_format_methods = [
    'center',      # Centrado
    'ljust',       # Justificación izquierda
    'rjust',       # Justificación derecha
    'format'       # Formateo avanzado
]
```

### Instrumentación de Métodos

#### 1. Proceso de Wrapping

```python
def wrap_method(original_method, name):
    def wrapper(*args, **kwargs):
        # 1. Loggear llamada
        log(f"Called {name}")

        # 2. Ejecutar método original
        result = original_method(*args, **kwargs)

        # 3. Mantener tipo wrapped
        return type(args[0])(result)

    return wrapper
```

#### 2. Propagación de Estado

```python
class InformationFlowTracker:
    def __init__(self):
        self.flow_graph = {}

    def track_operation(self, source, operation, result):
        """Registra operación y propaga información"""
        if source not in self.flow_graph:
            self.flow_graph[source] = set()
        self.flow_graph[source].add((operation, result))
```

### Implementación de Logging

#### 1. Sistema de Logging

```python
def log(operation_name):
    """
    Registra operaciones realizadas sobre strings
    - Nombre de operación
    - Timestamp
    - Contexto de ejecución
    """
    pass
```

#### 2. Análisis de Operaciones

```python
class OperationAnalyzer:
    def analyze_operations(self, logged_ops):
        """
        Analiza operaciones registradas para:
        - Patrones de uso
        - Frecuencia de operaciones
        - Cadenas de transformaciones
        """
        pass
```

> Consideraciones Importantes
>
> 1.  Mantener consistencia de tipos
> 2.  Evitar recursión infinita
> 3.  Preservar comportamiento original
> 4.  Gestionar memoria eficientemente
> 5.  Manejar casos especiales

> Mejores Prácticas
>
> 1.  Separar logging de lógica
> 2.  Minimizar overhead
> 3.  Usar estructuras de datos eficientes
> 4.  Documentar comportamiento wrapper
> 5.  Implementar limpieza de recursos

### Patrones de Implementación

```python
class MethodInitializer:
    @staticmethod
    def initialize_methods(target_class, method_names):
        """
        Inicializa métodos wrapped en la clase objetivo
        1. Obtiene método original
        2. Crea wrapper
        3. Asigna wrapper
        """
        for name in method_names:
            original = getattr(str, name)
            wrapped = target_class.make_str_wrapper(original, name)
            setattr(target_class, name, wrapped)
```

## 📋 Enunciado

```python
class tstr(str):
    @staticmethod
    def make_str_wrapper(fun,name):
        """Make 'fun' (a 'str' method) a method in 'tstr'"""
        def proxy(self, *args, **kwargs):
            log(name)
            res = fun(self, *args, **kwargs)
            return self.create(res)

    def informationflow_init_1():
        for name in ['_format_', '_mod_', '_rmod_', '_getitem_',
                    '_add_', '_mul_', '_rmul_',
                    'capitalize', 'casefold', 'center', 'encode',
                    'expandtabs', 'format', 'format_map', 'join',
                    'ljust', 'lower', 'lstrip', 'replace',
                    'rjust', 'rstrip', 'strip', 'swapcase',
                    'title', 'translate', 'upper']:
            fun = getattr(str, name)
            setattr(tstr, name, tstr.make_str_wrapper(fun,name))
```

Explique qué hace la función informationflow_init1().

## 💡 Explicación

> Objetivo Principal
> La función `informationflow_init1()` inicializa la clase `tstr` con versiones instrumentadas de los métodos de string, permitiendo el rastreo de su uso.

## 🔍 Funcionamiento Detallado

1. **Iteración sobre Métodos**

   - Recorre una lista predefinida de nombres de métodos de string
   - Incluye tanto operadores especiales (`_format_`, `_add_`, etc.)
   - Como métodos estándar (`capitalize`, `lower`, etc.)

2. **Para cada Método:**
   ```python
   fun = getattr(str, name)  # Obtiene método original
   setattr(tstr, name, tstr.make_str_wrapper(fun,name))  # Registra versión wrapped
   ```
3. **Tipos de Métodos que Registra:**
   - **Operadores:** `_format_`, `_mod_`, `_rmod_`, `_getitem_`
   - **Aritméticos:** `_add_`, `_mul_`, `_rmul_`
   - **Transformación:** `capitalize`, `lower`, `upper`
   - **Formateo:** `center`, `format`, `join`
   - **Limpieza:** `strip`, `lstrip`, `rstrip`

> Resultado Final
> Cada método registrado:
>
> - Mantiene su funcionalidad original
> - Añade capacidad de logging
> - Preserva el tipo tstr en resultados

## 📚 Importancia

- [i] Permite rastrear uso de métodos
- [i] Facilita análisis de flujo de información
- [i] Mantiene compatibilidad con str
- [!] Habilita debugging y monitoreo
