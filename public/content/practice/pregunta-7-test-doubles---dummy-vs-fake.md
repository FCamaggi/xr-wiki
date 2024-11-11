# Pregunta 7: Test Doubles - Dummy vs Fake

## 📖 Recordatorio Teórico

### Diferencias Fundamentales entre Test Doubles

#### Dummy Objects

```python
# Dummy - solo para llenar parámetros
class DummyLogger:
    def log(self, message):
        pass  # No hace nada

class DummyConnection:
    def connect(self):
        pass
    def disconnect(self):
        pass
```

- No tienen implementación real
- Nunca se usan realmente
- Solo satisfacen requisitos de firma
- No tienen lógica de negocio

#### Fake Objects

```python
# Fake - implementación simplificada pero funcional
class FakeDatabase:
    def __init__(self):
        self.data = {}

    def save(self, key, value):
        self.data[key] = value

    def get(self, key):
        return self.data.get(key)

class FakeAuthenticator:
    def __init__(self):
        self.users = {'admin': 'password123'}

    def authenticate(self, user, password):
        return self.users.get(user) == password
```

- Tienen implementación real pero simplificada
- Mantienen estado interno
- Procesan datos realmente
- Simulan comportamiento del objeto real

### Casos de Uso

#### Dummy Objects

```python
class UserService:
    def __init__(self, logger, connection):
        self.logger = logger
        self.connection = connection

# Uso de Dummy
service = UserService(
    logger=DummyLogger(),      # No se usa realmente
    connection=DummyConnection() # No se usa realmente
)
```

#### Fake Objects

```python
class UserRepository:
    def __init__(self, database):
        self.db = database

    def save_user(self, user):
        self.db.save(user.id, user)

# Uso de Fake
repository = UserRepository(
    database=FakeDatabase()  # Se usa activamente
)
repository.save_user(user)
```

### Diferencias en Testing

#### Tests con Dummy

```python
def test_user_creation():
    # Dummy solo para constructor
    dummy_logger = DummyLogger()
    service = UserService(dummy_logger)

    user = service.create_user("test")
    assert user.name == "test"
    # dummy_logger nunca se usa
```

#### Tests con Fake

```python
def test_user_authentication():
    # Fake para simular autenticación
    fake_auth = FakeAuthenticator()

    # El fake procesa realmente la autenticación
    assert fake_auth.authenticate("admin", "password123")
    assert not fake_auth.authenticate("admin", "wrong")
```

### Escenarios de Aplicación

#### Cuándo usar Dummy

```python
# 1. Parámetros obligatorios no usados
def __init__(self, config, logger, monitor):
    self.config = config
    # logger y monitor no se usan

# 2. Interfaces que requieren implementación
class AbstractHandler:
    def handle(self): pass
```

#### Cuándo usar Fake

```python
# 1. Simular bases de datos
class FakeUserDatabase:
    def __init__(self):
        self.users = []

    def add(self, user):
        self.users.append(user)

    def find(self, username):
        return next((u for u in self.users
                    if u.name == username), None)

# 2. Simular servicios externos
class FakePaymentGateway:
    def __init__(self):
        self.payments = []
        self.successful = True

    def process_payment(self, amount):
        if self.successful:
            self.payments.append(amount)
            return True
        return False
```

> Errores Comunes
>
> - Usar Fake cuando Dummy es suficiente
> - Implementar más funcionalidad de la necesaria
> - Mezclar responsabilidades entre doubles
> - No documentar el comportamiento esperado

> Mejores Prácticas
>
> 1.  Usar el double más simple posible
> 2.  Mantener implementaciones mínimas
> 3.  Documentar el propósito del double
> 4.  Asegurar consistencia con la interfaz real
> 5.  Separar claramente las responsabilidades

## 📋 Enunciado

Explique en que se diferencia un dummy object y un fake object.

## 🔍 Solución

La principal diferencia está en su implementación y propósito:

**Dummy Object:**

- Solo rellena parámetros requeridos
- No tiene implementación funcional
- Nunca se usa realmente en el test

**Fake Object:**

- Tiene implementación simplificada pero funcional
- Simula el comportamiento real
- Se usa activamente durante el test

## 📚 Explicación

> Ejemplo Comparativo
> Para una interfaz de base de datos:
>
> ```python
> # Dummy - solo rellena parámetros
> class DummyDatabase:
>    def __init__(self):
>        pass
>
> # Fake - implementación simplificada
> class FakeDatabase:
>    def __init__(self):
>        self.data = {}
>
>    def save(self, key, value):
>        self.data[key] = value
>
>    def get(self, key):
>        return self.data.get(key)
> ```

## 💡 Tips para el Examen

1. El dummy es el más simple de los test doubles
2. El fake tiene lógica de negocio simplificada
3. Los dummy son para satisfacer parámetros
4. Los fake son para simular comportamiento
5. Los fake son útiles para testing de integración
