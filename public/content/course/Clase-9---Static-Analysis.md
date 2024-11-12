# AST y Análisis Estático en Python: Una Guía Práctica

## 1. Introducción al AST (Abstract Syntax Tree)

El AST es una representación en forma de árbol del código fuente que permite analizar y manipular su estructura. En Python, podemos trabajar con ASTs usando el módulo `ast`.

### 1.1 Conceptos básicos

- Cada nodo del árbol representa una construcción del lenguaje (expresiones, operaciones, variables, etc.)
- La estructura es jerárquica: los nodos padres contienen subnodos
- Permite analizar el código sin ejecutarlo

## 2. Estructura Principal

```python
class Node:           # Clase base abstracta
    def eval(self)    # Evalúa la expresión
    def accept(self, visitor)  # Para patrón visitor

class NumberNode(Node):   # Representa números literales
    def __init__(self, value)
    def eval(self)

class AdditionNode(Node): # Representa sumas
    def __init__(self, left, right)
    def eval(self)
```

## 3. Parser y AST

El parser convierte código fuente en un AST:

```python
# Código fuente de entrada
source = "(+ 2 3)"

# Parseado a AST
tree = parser(source)  # Devuelve un árbol con nodos AdditionNode, NumberNode, etc.
```

### 3.1 Principales tipos de nodos

- NumberNode: Valores numéricos
- AdditionNode: Operación de suma
- SubstractNode: Operación de resta
- BinaryOperatorNode: Base para operaciones binarias

## 4. Patrón Visitor

El patrón Visitor permite agregar operaciones sobre el AST sin modificar las clases:

```python
class CodeVisitor:
    def visit_number(self, node)
    def visit_addition(self, node)
    def visit_substraction(self, node)
```

### Ejemplo de visitor:

```python
class AdditionCounterVisitor(CodeVisitor):
    def __init__(self):
        self.counter = 0

    def visit_addition(self, node):
        self.counter += 1
        # Visita recursivamente
        node.leftNode.accept(self)
        node.rightNode.accept(self)
```

## 5. Análisis Estático

El análisis estático permite encontrar problemas sin ejecutar el código:

### 5.1 Principales técnicas

- **Regex**: Busca patrones en el texto del código
- **AST Analysis**: Analiza la estructura del árbol sintáctico
- **Symbolic Execution**: Simula la ejecución con valores simbólicos
- **Program Slicing**: Extrae subconjuntos relevantes del programa

### 5.2 Ejemplos comunes de análisis

- Detección de código muerto
- Variables no utilizadas
- Métodos muy largos
- Complejidad ciclomática alta

## 6. Recomendaciones de Uso

1. Comienza con análisis simples antes de hacer transformaciones complejas
2. Usa visitors para operaciones que necesiten recorrer todo el árbol
3. Mantén la separación de responsabilidades entre parsing y análisis
4. Considera usar librerías existentes para análisis estático cuando sea posible

Este es un resumen práctico de los conceptos más importantes sobre AST y análisis estático en Python. Los ejemplos son simplificados pero ilustran los principios fundamentales.
