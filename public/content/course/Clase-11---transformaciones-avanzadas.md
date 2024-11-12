# Transformaciones Automáticas de Código Python: Nivel Avanzado

## Introducción

Este documento explica dos transformaciones avanzadas de código Python usando AST:

1. Agregar automáticamente el parámetro `self` faltante en métodos de clases
2. Extraer código común de pruebas unitarias a un método `setUp`

## 1. Agregando 'self' Faltante

### El Problema

A veces olvidamos agregar el parámetro `self` en los métodos de una clase. Por ejemplo:

```python
class BankAccount:
    def balance():  # ¡Falta self!
        return self.total
```

### La Solución

La clase `SelfAdder` arregla este problema automáticamente:

1. Detecta cuando estamos dentro de una clase
2. Revisa cada método
3. Si falta `self`, lo agrega como primer parámetro

### Ejemplo Práctico

**Antes:**

```python
class BankAccount:
    def balance():  # Falta self
        return self.total
```

**Después:**

```python
class BankAccount:
    def balance(self):  # ¡Ahora tiene self!
        return self.total
```

## 2. Extracción de Código Común en Pruebas

### El Problema

En pruebas unitarias, a menudo repetimos código de configuración:

```python
class DemoTest(TestCase):
    def test_deposit(self):
        account = BankAccount()  # Código repetido
        account.deposit(100)
        self.assertEqual(account.balance(), 100)

    def test_withdraw(self):
        account = BankAccount()  # Código repetido
        account.deposit(100)
        account.withdraw(50)
        self.assertEqual(account.balance(), 50)
```

### La Solución

Usamos dos clases:

1. `CommonPrefixVisitor`:

   - Encuentra código común al inicio de cada método de prueba
   - Es como un detective que busca patrones repetidos

2. `SetupTransformer`:
   - Crea un método `setUp` con el código común
   - Elimina ese código de los métodos de prueba
   - Es como un organizador que mueve el código repetido a un lugar común

### Ejemplo Práctico

**Antes:**

```python
class DemoTest(TestCase):
    def test_deposit(self):
        account = BankAccount()  # Código repetido
        account.deposit(100)
        self.assertEqual(account.balance(), 100)

    def test_withdraw(self):
        account = BankAccount()  # Código repetido
        account.deposit(100)
        account.withdraw(50)
        self.assertEqual(account.balance(), 50)
```

**Después:**

```python
class DemoTest(TestCase):
    def setUp(self):
        account = BankAccount()  # ¡Código movido aquí!
        account.deposit(100)

    def test_deposit(self):
        self.assertEqual(account.balance(), 100)

    def test_withdraw(self):
        account.withdraw(50)
        self.assertEqual(account.balance(), 50)
```

## Ventajas y Usos

1. **Mantenimiento Automático:**

   - Corrige errores comunes (falta de `self`)
   - Reduce código duplicado
   - Hace el código más limpio y organizado

2. **Ahorro de Tiempo:**

   - Automatiza tareas repetitivas
   - Reduce errores humanos
   - Facilita refactorizaciones grandes

3. **Mejor Organización:**
   - Código de pruebas más limpio
   - Mejor estructura de clases
   - Mayor facilidad de mantenimiento

## Conclusión

Estas herramientas nos ayudan a mantener nuestro código más limpio y organizado de forma automática. Es como tener un asistente que:

- Corrige olvidos comunes (como faltas de `self`)
- Reorganiza código repetido en pruebas
- Mantiene la consistencia en todo el proyecto
