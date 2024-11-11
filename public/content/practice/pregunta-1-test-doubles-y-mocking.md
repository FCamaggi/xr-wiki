# Pregunta 1: Test Doubles y Mocking

## 📖 Recordatorio Teórico

### Test Doubles: Conceptos Fundamentales

Los test doubles son objetos que simulan el comportamiento de objetos reales para pruebas. Son esenciales cuando:

- Los objetos reales son difíciles de configurar
- Los objetos reales producen resultados no deterministas
- Los objetos reales son lentos
- Los objetos reales aún no existen
- Los objetos reales tienen efectos secundarios

### Tipos de Test Doubles:

1. **Dummy**

   - Objetos que se pasan pero nunca se usan realmente
   - Solo rellenan parámetros
   - No tienen implementación funcional

   ```python
   class DummyLogger:
       def log(self, message):
           pass  # No hace nada
   ```

2. **Stub**

   - Proveen respuestas predefinidas a llamadas
   - No responden a nada que no esté programado
   - Útiles para forzar diferentes caminos en el código

   ```python
   class StubDatabase:
       def get_user(self, id):
           return {"id": id, "name": "Test User"}  # Respuesta hardcodeada
   ```

3. **Spy**

   - Registran información sobre cómo fueron llamados
   - Útiles para verificación de comportamiento
   - Mantienen estadísticas de uso

   ```python
   class SpyEmailService:
       def __init__(self):
           self.emails_sent = 0
           self.last_email = None

       def send(self, email):
           self.emails_sent += 1
           self.last_email = email
   ```

4. **Mock**

   - Objetos pre-programados con expectativas
   - Verifican si reciben las llamadas esperadas
   - Más sofisticados que los spies

   ```python
   class MockPaymentGateway:
       def __init__(self):
           self.expected_amount = None

       def expect_payment(self, amount):
           self.expected_amount = amount

       def process_payment(self, amount):
           assert amount == self.expected_amount, "Unexpected payment amount"
   ```

5. **Fake**

   - Tienen implementaciones reales pero simplificadas
   - Útiles para pruebas de integración
   - Mantienen algún tipo de estado

   ```python
   class FakeRepository:
       def __init__(self):
           self.data = {}

       def save(self, key, value):
           self.data[key] = value

       def get(self, key):
           return self.data.get(key)
   ```

### Cuándo Usar Cada Tipo:

| Tipo  | Uso Principal                 | Ejemplo de Caso                   |
| ----- | ----------------------------- | --------------------------------- |
| Dummy | Satisfacer parámetros         | Constructor que requiere logger   |
| Stub  | Proveer datos de prueba       | Simular respuestas de API         |
| Spy   | Verificar llamadas indirectas | Rastrear envíos de email          |
| Mock  | Verificar comportamiento      | Validar interacciones específicas |
| Fake  | Testing de integración        | Base de datos en memoria          |

### Mejores Prácticas:

1. Usar el double más simple que satisfaga la necesidad
2. Evitar mocks para todo; usar objetos reales cuando sea práctico
3. Mantener los test doubles simples y enfocados
4. Documentar el propósito y comportamiento del test double
5. Considerar el uso de frameworks de mocking para casos complejos

> Errores Comunes
>
> - Usar mocks cuando un stub sería suficiente
> - Crear test doubles demasiado complejos
> - No mantener los test doubles actualizados con la interfaz real
> - Depender demasiado de mocks en lugar de pruebas de integración

## 📋 Enunciado

```python
# Clase StoreService:
class StoreService:
    def __init__(self):
        HOST = 'http://localhost:12800'
        context = ('admin', 'YOUR_ADMIN_PASSWORD')
        self.client = DeployClient(HOST, use=MLServer, auth=context)

    def isAvailable(self, productName):
        result = client.get_service('check?product='+productName)
        return result == 'true'

# Clase ShoppingCart:
class ShoppingCart:
    def __init__(self, service):
        self.service = service
        self.list = []

    def addProduct(self, productName):
        if self.service.isAvailable(productName):
            self.list.append(productName)

    def totalItems(self):
        return len(list)

# Test original a modificar:
def test_1(self):
    service = StoreService()
    car = ShoppingCart(service)
    car.add("iPhone")
    self.assertEqual(car.totalItems(),1)
```

Un estudiante de testing escribió el test anterior para testear la clase ShoppingCart, sin embargo, como verá el mismo no es independiente. Ya que la clase ShoppingCart utiliza la clase StoreService que consume un servicio web de la nube. Re-escriba el siguiente test, utilizando un objeto mock o un stub de la clase StoreService, esto permitirá testear la clase ShoppingCart sin tener que depender del servicio web.

> Consideraciones Importantes
>
> - El test debe ser independiente del servicio web
> - Solo es necesario simular el método isAvailable
> - No es necesario crear tests adicionales
> - El mock/stub debe hacer pasar el test original

## 🔍 Solución

```python
def test_1(self):
    # Crear stub de StoreService
    class StoreServiceStub:
        def isAvailable(self, productName):
            return True

    # Usar el stub en lugar del servicio real
    service = StoreServiceStub()
    car = ShoppingCart(service)
    car.add("iPhone")
    self.assertEqual(car.totalItems(),1)
```

## 📚 Explicación

1. **¿Por qué necesitamos un test double?**

   - El test original depende de un servicio web externo
   - La conexión puede fallar o ser lenta
   - No podemos controlar el comportamiento del servicio
   - Queremos tests rápidos y confiables

2. **Implementación del stub**
   - Creamos una clase simple que simula StoreService
   - Solo implementamos isAvailable()
   - Retornamos True para simular disponibilidad
   - No necesitamos implementar la conexión web

> Test Doubles - Tipos
>
> - **Stub**: Retorna valores predefinidos (usado en este caso)
> - **Mock**: Verifica las interacciones
> - **Fake**: Implementación simplificada funcional
> - **Spy**: Registra información de uso
> - **Dummy**: Solo rellena parámetros

## 💡 Tips Adicionales

1. Mantén los test doubles lo más simples posible
2. Solo simula lo que necesitas para el test
3. Asegúrate que el double implementa la misma interfaz
4. Considera usar frameworks de mocking para casos más complejos
