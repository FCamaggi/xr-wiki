# Pregunta 15: Análisis de AST y Sistema de Warnings

## 📖 Recordatorio Teórico

### Fundamentos de Análisis AST

El Abstract Syntax Tree (AST) es una representación jerárquica del código fuente que facilita su análisis y transformación. Los visitors de AST permiten recorrer y analizar esta estructura de manera sistemática.

### Análisis Estático con AST

#### 1. Estructura de un Visitor

```python
class BaseVisitor(ast.NodeVisitor):
    def __init__(self):
        self.warnings = []

    def visit_FunctionDef(self, node):
        """Visita definiciones de funciones"""
        self.generic_visit(node)

    def visit_ClassDef(self, node):
        """Visita definiciones de clases"""
        self.generic_visit(node)
```

#### 2. Sistema de Warnings

```python
class WarningGenerator:
    def add_warning(self, message, line, detail):
        """
        Componentes de un warning:
        - Mensaje descriptivo
        - Número de línea
        - Detalles específicos
        """
        warning = {
            'message': message,
            'line': line,
            'detail': detail
        }
        self.warnings.append(warning)
```

#### 3. Tipos de Análisis Comunes

1. **Análisis de Parámetros**

   - Duplicación de nombres
   - Convenciones de nombrado
   - Número de parámetros

2. **Análisis de Estructura**

   - Complejidad de funciones
   - Anidamiento excesivo
   - Patrones problemáticos

3. **Análisis de Uso**
   - Variables no utilizadas
   - Importaciones innecesarias
   - Dead code

### Funcionamiento del Sistema de Warnings

#### 1. Proceso de Análisis

```python
def process_ast(ast_tree):
    """
    1. Parsear código a AST
    2. Aplicar visitors específicos
    3. Recolectar warnings
    4. Generar reporte
    """
    pass
```

#### 2. Tipos de Warnings

- Estilo de código
- Problemas potenciales
- Violaciones de convenciones
- Optimizaciones posibles

#### 3. Niveles de Severidad

```python
WARNING_LEVELS = {
    'ERROR': 3,   # Debe corregirse
    'WARNING': 2, # Debería corregirse
    'INFO': 1     # Sugerencia de mejora
}
```

### Mejores Prácticas en Análisis AST

1. **Diseño de Visitors**

   - Responsabilidad única
   - Clara separación de concerns
   - Manejo adecuado de contexto

2. **Gestión de Warnings**

   - Mensajes claros y accionables
   - Contexto suficiente
   - Evitar falsos positivos

3. **Optimización**
   - Caching de resultados
   - Análisis incremental
   - Filtrado de warnings

> Consideraciones Importantes
>
> 1.  Mantener consistencia en mensajes
> 2.  Evitar warnings redundantes
> 3.  Considerar el impacto en rendimiento
> 4.  Manejar casos especiales
> 5.  Validar resultados

> Mejores Prácticas
>
> 1.  Documentar reglas de análisis
> 2.  Mantener tests para visitors
> 3.  Permitir configuración de reglas
> 4.  Proporcionar ejemplos de corrección
> 5.  Mantener mensajes constructivos

### Patrones Comunes de Implementación

```python
class AdvancedWarningVisitor(ast.NodeVisitor):
    def __init__(self):
        self.context = []
        self.warnings = []

    def enter_context(self, context):
        self.context.append(context)

    def exit_context(self):
        self.context.pop()

    def add_warning(self, msg, node):
        self.warnings.append({
            'message': msg,
            'line': node.lineno,
            'context': self.context[-1] if self.context else None
        })
```

> Aplicaciones Típicas
>
> 1.  Detección de code smells
> 2.  Validación de estándares
> 3.  Análisis de seguridad
> 4.  Optimización de código
> 5.  Control de calidad

## 📋 Enunciado

Analice el siguiente código y explique cuándo esta regla arroja un warning. Escriba dos ejemplos en Python, el primero donde la regla anterior arroje un warning, el segundo donde no arroje un warning.

## 🔍 Análisis del Código

```python
class AVisitor(WarningNodeVisitor):
    def visit_FunctionDef(self, node: FunctionDef):
        array = []
        for nodeArg in node.args.args:
            array.append(nodeArg.arg)
        array = list(duplicates(array))
        if len(array) > 0:
            self.addWarning('Warning', node.lineno, ','.join(array))
        NodeVisitor.generic_visit(self, node)
```

> Explicación
> El código analiza definiciones de funciones y lanza un warning cuando hay argumentos duplicados en la función. El proceso es:
>
> 1.  Recolecta todos los nombres de argumentos
> 2.  Busca duplicados usando la función `duplicates()`
> 3.  Si hay duplicados (len > 0), emite un warning

## 💡 Ejemplos

### 1. Ejemplo con Warning

```python
def mala_funcion(x, y, x, z):  # Warning: argumento 'x' duplicado
    return x + y + z
```

### 2. Ejemplo sin Warning

```python
def buena_funcion(x, y, z):  # Sin warning: argumentos únicos
    return x + y + z
```

## 📚 Explicación Detallada

> Cuándo aparece el Warning
>
> - Cuando una función tiene parámetros con nombres repetidos
> - Se considera mala práctica tener argumentos duplicados
> - Python moderno (3.x) ni siquiera permite esto sintácticamente

> Puntos Importantes
>
> 1.  La regla detecta duplicados en argumentos
> 2.  Usa un visitor pattern para analizar el AST
> 3.  Solo revisa definiciones de funciones
> 4.  Emite warning con la línea y los nombres duplicados

## 🎯 Tips para Recordar

- [i] Los argumentos de función deben ser únicos
- [i] El warning ayuda a mantener código limpio
- [i] Es una validación de análisis estático
- [!] Python moderno previene esto por diseño

> Casos Adicionales
>
> ```python
> # Más ejemplos de mal uso (generarían warning)
> def otra_mala(a, b, a, c, b):  # Múltiples duplicados
>
> # Ejemplos correctos (sin warning)
> def parametros_ok(a, b, c, *args, **kwargs):  # Todo único
> ```
