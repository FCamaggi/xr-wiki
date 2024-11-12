# Fuzzing Basado en Mutación: Una Guía Práctica

## Introducción

El fuzzing aleatorio tradicional tiene un problema: la mayoría de las entradas generadas son inválidas. El fuzzing basado en mutación ofrece una solución más inteligente al partir de entradas válidas existentes y modificarlas gradualmente.

## Principios Básicos

### ¿Qué es el Fuzzing Basado en Mutación?

Imagine que está modificando una receta de cocina que sabe que funciona:

- En lugar de inventar una receta completamente nueva (fuzzing aleatorio)
- Hace pequeños cambios a una receta probada (fuzzing por mutación)
- Mantiene los cambios que mejoran o descubre nuevos sabores

### Ventajas sobre el Fuzzing Aleatorio

Por ejemplo, para generar URLs válidas:

- Fuzzing aleatorio: 1 en 96^7 probabilidad (~10 años de intentos)
- Fuzzing por mutación: ~80% de éxito partiendo de URLs válidas

## Implementación

### 1. Operadores de Mutación

Tres tipos principales:

```python
# 1. Eliminar un carácter aleatorio
def delete_random_character(s):
    pos = random.randint(0, len(s) - 1)
    return s[:pos] + s[pos + 1:]

# 2. Insertar un carácter aleatorio
def insert_random_character(s):
    pos = random.randint(0, len(s))
    char = chr(random.randrange(32, 127))
    return s[:pos] + char + s[pos:]

# 3. Modificar un bit aleatorio
def flip_random_character(s):
    pos = random.randint(0, len(s) - 1)
    bit = 1 << random.randint(0, 6)
    return s[:pos] + chr(ord(s[pos]) ^ bit) + s[pos + 1:]
```

### 2. Proceso de Mutación

1. Comenzar con una entrada válida (semilla)
2. Aplicar operadores de mutación aleatoriamente
3. Verificar si la nueva entrada:
   - Es válida
   - Cubre nuevo código (aumenta cobertura)
4. Mantener las entradas exitosas para futuras mutaciones

### 3. Guiando las Mutaciones por Cobertura

Para hacer el proceso más eficiente:

- Mantener un registro de qué partes del código se han ejecutado
- Priorizar mutaciones que exploran código nuevo
- Evolucionar la población de entradas hacia mayor cobertura

## Ejemplo Práctico: Mutación de URLs

```python
# Entrada semilla
seed = "http://www.google.com/search?q=fuzzing"

# Aplicar mutaciones y verificar validez
mutation_fuzzer = MutationFuzzer(seed=[seed])
valid_mutations = []

for i in range(trials):
    mutated = mutation_fuzzer.mutate()
    if is_valid_url(mutated):
        valid_mutations.append(mutated)
```

## Conclusiones

- El fuzzing basado en mutación es más eficiente que el aleatorio
- Las mutaciones guiadas por cobertura ayudan a explorar más código
- La evolución de la población permite descubrir casos interesantes
- El enfoque es particularmente útil para formatos de entrada complejos (URLs, XML, etc.)
