# Fundamentos de las Pruebas Unitarias

## ¿Qué son las Pruebas Unitarias?

Las pruebas unitarias son un método de prueba de software que se enfoca en verificar el correcto funcionamiento de unidades individuales de código, como funciones o métodos de una clase. El objetivo es asegurarse de que cada parte del programa funciona correctamente de manera aislada.

Imagina que estás construyendo un coche. Las pruebas unitarias serían como probar cada componente del coche por separado antes de ensamblarlos. Verificarías que el motor funciona, que las ruedas giran, que las luces se encienden, etc. Esto te ayuda a asegurarte de que cada parte funciona correctamente antes de juntarlas todas.

### Ventajas de las Pruebas Unitarias

1. **Detectan errores temprano**: Al probar cada unidad de código por separado, puedes identificar y solucionar errores al principio del proceso de desarrollo.

2. **Facilitan los cambios**: Las pruebas unitarias actúan como una red de seguridad. Si modificas una parte del código, puedes ejecutar las pruebas para asegurarte de que los cambios no han introducido nuevos errores.

3. **Documentan el código**: Las pruebas unitarias pueden servir como una forma de documentación, mostrando cómo se espera que se use cada unidad de código.

4. **Mejoran el diseño**: Escribir pruebas unitarias te obliga a pensar sobre el diseño de tu código. Un código bien diseñado será más fácil de probar.

## La Anatomía de una Prueba Unitaria

Una prueba unitaria típicamente consta de tres partes:

1. **Arrange (Preparar)**: Aquí se establece el estado inicial. Se preparan los datos de entrada y se configuran las condiciones previas necesarias para la prueba.

2. **Act (Actuar)**: Aquí se ejecuta el código que se está probando. Normalmente es una sola llamada a un método o función.

3. **Assert (Afirmar)**: Aquí se verifica que el resultado de la acción coincide con lo esperado. Esto se hace usando afirmaciones (assertions).

```python
def test_withdraw():
    # Arrange
    account = BankAccount(1000)

    # Act
    result = account.withdraw(100)

    # Assert
    assert result == 900
    assert account.balance == 900
```

En este ejemplo, primero creamos un objeto `BankAccount` con un saldo inicial de 1000 (Arrange). Luego, llamamos al método `withdraw` con un argumento de 100 (Act). Finalmente, verificamos que el resultado y el nuevo saldo son los esperados (Assert).

## Mocks y Stubs

A veces, la unidad de código que queremos probar tiene dependencias de otros componentes del sistema. Esto puede hacer que nuestras pruebas sean más difíciles de escribir, ya que tendríamos que asegurarnos de que esos componentes externos están en el estado correcto antes de ejecutar nuestra prueba.

Aquí es donde entran en juego los mocks y stubs:

- **Mocks**: Son objetos que simulan el comportamiento de objetos reales de una manera controlada. Pueden registrar las interacciones que tienen con el código bajo prueba y permitirte verificar que esas interacciones son las esperadas.

- **Stubs**: Son objetos que proporcionan respuestas predefinidas a las llamadas realizadas durante la prueba. Reemplazan a un componente real del que depende el código bajo prueba.

```python
def test_get_user():
    # Arrange
    mock_database = DatabaseMock()
    mock_database.add_user(User(1, "Alice"))
    user_service = UserService(mock_database)

    # Act
    user = user_service.get_user(1)

    # Assert
    assert user.name == "Alice"
```

En este ejemplo, en lugar de utilizar una base de datos real, creamos un mock (`DatabaseMock`) que simula el comportamiento de la base de datos. Esto nos permite probar el `UserService` sin necesitar una base de datos real.

## Escribiendo Pruebas Efectivas

Para escribir pruebas unitarias efectivas, es importante mantener algunas cosas en mente:

1. **Mantén las pruebas simples**: Cada prueba debe verificar una sola cosa. Evita la tentación de hacer demasiadas aserciones en una sola prueba.

2. **Nombra tus pruebas claramente**: El nombre de una prueba debe describir claramente lo que está siendo probado. Un buen formato es `test_[nombre_del_método]_[estado_bajo_prueba]_[comportamiento_esperado]`.

3. **Evita la lógica en las pruebas**: La lógica en las pruebas las hace más difíciles de entender y mantener. Si encuentras lógica en tus pruebas, considera moverla al código de producción.

4. **Prueba los casos límite**: Asegúrate de probar no solo los casos de uso típicos, sino también los casos extremos y los valores límite.

5. **Ejecuta tus pruebas con frecuencia**: Las pruebas unitarias son más útiles cuando se ejecutan con frecuencia. Considera ejecutarlas como parte de tu proceso de integración continua.

Considera el siguiente ejemplo:

```python
def is_palindrome(word):
    return word == word[::-1]

def test_is_palindrome_empty_string():
    assert is_palindrome("")

def test_is_palindrome_single_character():
    assert is_palindrome("a")

def test_is_palindrome_mixed_casing():
    assert is_palindrome("Deed")

def test_is_palindrome_with_spaces():
    assert is_palindrome("nurses run")

def test_is_palindrome_not_palindrome():
    assert not is_palindrome("hello")
```

Aquí tenemos una función simple `is_palindrome` que verifica si una palabra es un palíndromo (se lee igual de adelante hacia atrás). Hemos escrito una serie de pruebas unitarias para verificar su comportamiento en diferentes casos: una cadena vacía, una sola letra, palabras con mayúsculas y minúsculas mezcladas, frases con espacios y una palabra que no es un palíndromo.

Cada prueba tiene un nombre claro que describe lo que se está probando, y las aserciones son simples y fáciles de entender. Ejecutando estas pruebas con frecuencia, podemos asegurarnos de que nuestra función `is_palindrome` sigue funcionando correctamente incluso si hacemos cambios en el código en el futuro.

En conclusión, las pruebas unitarias son una parte esencial del desarrollo de software moderno. Te permiten verificar que cada parte de tu código funciona correctamente, lo que a su vez facilita el mantenimiento y la refactorización del código. Al escribir pruebas simples y claras, y al ejecutarlas con frecuencia, puedes mejorar en gran medida la calidad y fiabilidad de tu software.
