# Guía sobre Code Smells y AST en Python

## 1. ¿Qué son los Code Smells?

Los code smells son señales en el código que sugieren posibles problemas en el diseño o implementación. Aunque no son errores en sí mismos, pueden hacer que el código sea más difícil de mantener o modificar en el futuro.

Imagina que los code smells son como señales de advertencia en una casa:

- Una grieta en la pared no significa que la casa se vaya a caer, pero indica que algo podría necesitar atención
- Un olor extraño en la cocina no implica un incendio, pero sugiere revisar si algo está mal

## 2. Principales tipos de Code Smells

### 2.1 Método Largo (Long Method)

- **¿Qué es?**: Métodos con demasiadas líneas de código (generalmente más de 10)
- **Problema**: Son difíciles de entender y mantener
- **Solución**: Dividir en métodos más pequeños con nombres descriptivos

### 2.2 Clase Grande (Large Class)

- **¿Qué es?**: Clases que hacen demasiadas cosas
- **Problema**: Se vuelven difíciles de mantener y entender
- **Solución**: Dividir en clases más pequeñas y especializadas

### 2.3 Obsesión Primitiva (Primitive Obsession)

- **¿Qué es?**: Usar tipos primitivos en lugar de objetos pequeños
- **Ejemplo**: Usar `USER_ADMIN_ROLE = 1` en lugar de una clase `Role`
- **Solución**: Crear clases específicas para representar conceptos

### 2.4 Lista Larga de Parámetros (Long Parameter List)

- **¿Qué es?**: Métodos con demasiados parámetros
- **Problema**: Difícil de usar y mantener
- **Solución**: Agrupar parámetros relacionados en objetos

### 2.5 Código Duplicado (Duplicated Code)

- **¿Qué es?**: Fragmentos de código idénticos en diferentes lugares
- **Solución**: Extraer el código común en métodos reutilizables

## 3. AST (Abstract Syntax Tree) en Python

### 3.1 ¿Qué es el AST?

El AST es una representación en forma de árbol del código fuente. Permite analizar y modificar el código programáticamente.

### 3.2 Uso Básico

```python
import ast

# Código a analizar
code = """
def suma(a, b):
    return a + b
"""

# Crear el AST
tree = ast.parse(code)
```

### 3.3 Ejemplo Práctico: Detectar Métodos Largos

```python
class MethodLengthChecker(ast.NodeVisitor):
    def visit_FunctionDef(self, node):
        lines = node.end_lineno - node.lineno
        if lines > 10:
            print(f"El método {node.name} es muy largo ({lines} líneas)")
```

## 4. Consejos para Mantener un Código Limpio

1. **Nombres Descriptivos**: Los nombres deben explicar qué hace el código
2. **Métodos Cortos**: Mantener los métodos enfocados en una sola tarea
3. **Evitar Duplicación**: No repetir código
4. **Simplicidad**: El código más simple suele ser el mejor
5. **Comentarios Útiles**: Los comentarios deben explicar el "por qué", no el "qué"

## 5. Recursos Adicionales

- Refactoring Guru: https://refactoring.guru/smells
- Documentación de AST en Python: https://docs.python.org/3/library/ast.html
