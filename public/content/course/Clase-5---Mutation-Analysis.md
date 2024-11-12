# Análisis por Mutación: Una Guía para Mejorar tus Pruebas

## ¿Por qué el Coverage No Es Suficiente?

Imagina que estás revisando un restaurante. No basta con ver si visitaste todas las mesas (cobertura) - ¡necesitas probar la comida también! De manera similar, en las pruebas de software:

- El coverage solo nos dice qué partes del código se ejecutaron
- No nos dice si verificamos correctamente los resultados
- Un test puede tener 100% de coverage pero ser inefectivo

### Ejemplo Simple

```python
def test_malo():
    ejecutar_programa()
    assert True  # ¡Siempre pasa pero no prueba nada!
```

## La Solución: Análisis por Mutación

### ¿Qué es?

Es como jugar al "detective de bugs":

1. Introducimos pequeños cambios (mutaciones) en el código
2. Ejecutamos las pruebas
3. Si las pruebas fallan, ¡bien! Detectaron el cambio
4. Si las pruebas pasan, encontramos una debilidad en nuestras pruebas

### Ejemplo Práctico

Original:

```python
def suma(a, b):
    return a + b
```

Mutación:

```python
def suma(a, b):
    return a - b  # Cambio introducido
```

## Tipos de Tests: Débiles vs Fuertes

Consideremos un programa que clasifica triángulos:

Test Débil:

```python
def test_debil():
    assert triangulo(1, 1, 1) != "Escaleno"  # Solo verifica lo que NO es
```

Test Fuerte:

```python
def test_fuerte():
    assert triangulo(1, 1, 1) == "Equilátero"  # Verifica exactamente lo que debe ser
```

### Score de Mutación

Es como una calificación para tus pruebas:

- Mutantes matados / Total de mutantes = Score
- Por ejemplo: Si matamos 8 de 10 mutantes = 80% score
- Mejor score = Mejores pruebas

## Consejos Prácticos

1. **Verifica los Resultados Específicos**

   - Mal: `assert resultado != "error"`
   - Bien: `assert resultado == "éxito"`

2. **Prueba Múltiples Casos**

   ```python
   def test_triangulo():
       assert triangulo(1, 1, 1) == "Equilátero"
       assert triangulo(1, 1, 2) == "Isósceles"
       assert triangulo(1, 2, 3) == "Escaleno"
   ```

3. **No Te Conformes con el Coverage**
   - Un coverage del 100% es bueno
   - Pero asegúrate de que tus assertions sean fuertes

## Conclusión

El análisis por mutación es como tener un revisor de calidad extra que:

- Encuentra puntos débiles en tus pruebas
- Te ayuda a escribir mejores assertions
- Complementa el coverage tradicional

Recuerda: Buenos tests no solo ejecutan el código, sino que verifican que hace exactamente lo que debe hacer.
