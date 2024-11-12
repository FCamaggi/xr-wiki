# Pregunta 16: Transformadores de AST y Modificación de Código

## 📖 Recordatorio Teórico

### Fundamentos de Transformación AST

Los transformadores AST son herramientas que permiten modificar el código fuente a través de su representación en árbol sintáctico abstracto. A diferencia de los visitors que solo analizan, los transformadores pueden realizar cambios estructurales en el código.

### Tipos de Transformaciones

#### 1. Transformaciones Sintácticas

```python
class SyntaxTransformer(ast.NodeTransformer):
    def visit_FunctionDef(self, node):
        """Transforma definiciones de funciones"""
        # Modificar argumentos, cuerpo o decoradores
        return self.generic_visit(node)

    def visit_ClassDef(self, node):
        """Transforma definiciones de clases"""
        # Modificar bases, cuerpo o metaclases
        return self.generic_visit(node)
```

#### 2. Transformaciones de Optimización

```python
class OptimizationTransformer(ast.NodeTransformer):
    def visit_BinOp(self, node):
        """Optimiza operaciones binarias"""
        if isinstance(node.op, ast.Add):
            # Simplificar sumas constantes
            if isinstance(node.left, ast.Num) and isinstance(node.right, ast.Num):
                return ast.Num(n=node.left.n + node.right.n)
        return self.generic_visit(node)
```

#### 3. Transformaciones de Instrumentación

```python
class InstrumentationTransformer(ast.NodeTransformer):
    def visit_FunctionDef(self, node):
        """Añade instrumentación a funciones"""
        # Insertar código de logging o monitoreo
        logging_call = self.create_logging_call(node.name)
        node.body.insert(0, logging_call)
        return self.generic_visit(node)
```

### Proceso de Transformación

#### 1. Análisis del AST Original

- Identificación de nodos objetivo
- Validación de contexto
- Recopilación de información necesaria

#### 2. Generación de Nuevos Nodos

```python
def create_new_node(old_node):
    """
    Crea un nuevo nodo AST basado en uno existente
    - Preserva información de contexto
    - Mantiene metadatos necesarios
    - Asegura consistencia sintáctica
    """
    pass
```

#### 3. Validación y Aplicación

```python
def apply_transformation(ast_tree):
    """
    1. Verificar precondiciones
    2. Aplicar transformación
    3. Validar resultado
    4. Mantener consistencia
    """
    pass
```

### Consideraciones de Implementación

#### 1. Preservación de Semántica

- Mantener comportamiento equivalente
- Considerar efectos secundarios
- Validar transformaciones

#### 2. Manejo de Contexto

- Scope de variables
- Resolución de nombres
- Dependencias entre nodos

#### 3. Optimización

- Minimizar transformaciones
- Reutilizar nodos cuando sea posible
- Evitar recursión innecesaria

### Patrones Comunes de Transformación

```python
class CommonTransformations:
    @staticmethod
    def add_parameter(node, param_name):
        """Añade un parámetro a una función"""
        new_arg = ast.arg(arg=param_name, annotation=None)
        node.args.args.insert(0, new_arg)
        return node

    @staticmethod
    def wrap_with_try_except(node):
        """Envuelve código en un bloque try-except"""
        return ast.Try(
            body=node.body,
            handlers=[ast.ExceptHandler()],
            orelse=[],
            finalbody=[]
        )
```

> Consideraciones Importantes
>
> 1.  Mantener la consistencia del AST
> 2.  Preservar información de línea y columna
> 3.  Manejar casos especiales
> 4.  Validar transformaciones
> 5.  Documentar cambios realizados

> Mejores Prácticas
>
> 1.  Realizar transformaciones incrementales
> 2.  Mantener transformaciones atómicas
> 3.  Implementar validaciones robustas
> 4.  Proporcionar mecanismos de rollback
> 5.  Documentar precondiciones y postcondiciones

## 📋 Enunciado

Analice el siguiente código.

```python
class ATransformer(NodeTransformer):
    def __init__(self):
         super().__init__()
         self.current_class = None
    def visit_ClassDef(self, node: ClassDef):
        self.current_class = node
        result = NodeTransformer.generic_visit(self, node)
        self.current_class = None
        return result
    def visit_FunctionDef(self, node):
        transformedNode = NodeTransformer.generic_visit(self,node)
        array = []
        for nodeArg in transformedNode.args.args:
            array.append(nodeArg.arg)
            if self.current_class != None:
                if len(array) > 0 :
                    if array[0] != 'self':
                        transformedNode.args.args.insert(0,arg(arg='self'))
                    else:
                        transformedNode.args.args.insert(0,arg(arg='self'))
        return transformedNode
class XCommand(RewriterCommand):
    def apply(self, ast):
            new_tree = fix_missing_locations(ATransformer().visit(ast))
            return new_tree
```

(a) Explique qué hace el transformador de código
(b) Escriba un programa de ejemplo que se transforme utilizando esta regla
(c) Escriba un ejemplo de código antes y después de la transformación.

## 🔍 Análisis

### (a) Explicación del Transformador

> Funcionalidad
> Este transformador AST agrega automáticamente el parámetro `self` como primer argumento a los métodos de una clase cuando no está presente. Específicamente:
>
> 1.  Visita definiciones de clases y funciones
> 2.  Si una función está dentro de una clase y no tiene `self` como primer argumento
> 3.  Inserta `self` automáticamente al inicio de los argumentos

## 💡 Solución

### (b) Ejemplo de Uso

```python
# Código que usa el transformador
class XCommand(RewriterCommand):
    def apply(self, ast):
        transformer = ATransformer()
        new_tree = transformer.visit(ast)
        return new_tree
```

### (c) Ejemplo de Transformación

> Antes de la Transformación
>
> ```python
> class MiClase:
>    def metodo1(x, y):
>        return x + y
>
>    def metodo2():
>        return "Hola"
> ```

> Después de la Transformación
>
> ```python
> class MiClase:
>    def metodo1(self, x, y):
>        return x + y
>
>    def metodo2(self):
>        return "Hola"
> ```

## 📚 Explicación Detallada

> Proceso de Transformación
>
> 1.  El transformador visita cada nodo del AST
> 2.  Cuando encuentra una definición de clase (`ClassDef`):
>
> - Guarda referencia a la clase actual
>
> 3.  Cuando encuentra una definición de función (`FunctionDef`):
>
> - Si está dentro de una clase
> - Verifica si el primer argumento es 'self'
> - Si no lo es, lo inserta

## 🎯 Puntos Importantes

- [i] Solo transforma métodos dentro de clases
- [i] Preserva todos los argumentos existentes
- [i] Mantiene la funcionalidad original
- [!] No modifica funciones fuera de clases

> Consideraciones
>
> 1.  La transformación es automática
> 2.  Asume que todo método necesita `self`
> 3.  No afecta a métodos estáticos/de clase
> 4.  Mantiene el orden de los argumentos originales

## 💡 Tips para el Examen

- [i] Identifica el propósito principal del transformador
- [i] Comprende el flujo de transformación
- [i] Reconoce qué se modifica y qué no
- [i] Practica con ejemplos variados
- [!] Ten en cuenta las reglas de Python sobre métodos

> Caso de Uso Práctico
> Este transformador es útil para:
>
> - Corregir código automáticamente
> - Estandarizar métodos de clase
> - Evitar errores comunes de programación
> - Mantener consistencia en el código
