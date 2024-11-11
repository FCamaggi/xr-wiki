# Pregunta 5: Mutation Fuzzing vs Random Fuzzing

## 📖 Recordatorio Teórico

### Fundamentos del Fuzzing

El fuzzing es una técnica de testing automatizado que proporciona datos de entrada inesperados o aleatorios a un programa para encontrar vulnerabilidades y errores.

### Random Fuzzing

```python
# Ejemplo básico de Random Fuzzing
def random_fuzzer(max_length = 100):
    length = random.randrange(max_length)
    return ''.join(chr(random.randrange(256))
                  for _ in range(length))

# Uso
test_input = random_fuzzer()
program_under_test(test_input)
```

#### Características

- Generación completamente aleatoria
- No utiliza conocimiento previo
- Alta tasa de inputs inválidos
- Simple de implementar
- Baja eficiencia en cobertura

### Mutation Fuzzing

```python
# Ejemplo básico de Mutation Fuzzing
class MutationFuzzer:
    def __init__(self, seed_inputs):
        self.seed_inputs = seed_inputs
        self.inputs = seed_inputs[:]

    def mutate(self, input_str):
        """Modifica levemente una entrada existente"""
        if len(input_str) == 0:
            return self.seed_inputs[0]

        pos = random.randint(0, len(input_str) - 1)
        repl = chr(random.randrange(256))
        return input_str[:pos] + repl + input_str[pos + 1:]

    def create_input(self):
        """Genera nueva entrada mutando una existente"""
        inp = random.choice(self.inputs)
        return self.mutate(inp)
```

#### Características

- Basado en ejemplos válidos (seeds)
- Mantiene estructura básica
- Mayor tasa de inputs válidos
- Aprendizaje de ejecuciones previas
- Mejor cobertura de código

### Comparación de Técnicas

#### Random Fuzzing

```python
# Ejemplo: Testing de parser JSON
def random_json_fuzzer():
    chars = string.printable
    length = random.randint(1, 100)
    return ''.join(random.choice(chars)
                  for _ in range(length))

# Resultado típico: "{a;;#}"  # Probablemente inválido
```

#### Mutation Fuzzing

```python
# Ejemplo: Testing de parser JSON
valid_jsons = [
    '{"name": "test"}',
    '{"age": 30}',
    '{"items": [1,2,3]}'
]

def mutate_json(json_str):
    # Modifica manteniendo estructura
    pos = random.randint(0, len(json_str) - 1)
    if json_str[pos].isdigit():
        return json_str[:pos] + str(random.randint(0,9)) + json_str[pos + 1:]
    return json_str

# Resultado típico: '{"name": "tast"}'  # Probablemente válido
```

### Ventajas del Mutation Fuzzing

1. **Eficiencia**

```python
# Random Fuzzing - Muchos intentos inválidos
"{invalid" # ❌
"not json" # ❌
"[1,2," # ❌

# Mutation Fuzzing - Mantiene estructura
'{"name": "test1"}' # ✓
'{"name": "test2"}' # ✓
'{"name": "test3"}' # ✓
```

2. **Cobertura**

```python
# Tracking de cobertura
class CoverageFuzzer(MutationFuzzer):
    def __init__(self, seed_inputs):
        super().__init__(seed_inputs)
        self.coverage = set()

    def run_with_coverage(self, input_data):
        with Coverage() as cov:
            try:
                program_under_test(input_data)
            except:
                pass
        new_coverage = cov.coverage()
        is_interesting = bool(new_coverage - self.coverage)
        self.coverage |= new_coverage
        return is_interesting
```

> Consideraciones
>
> - Random fuzzing puede ser útil para pruebas iniciales
> - Mutation fuzzing requiere buenos seeds iniciales
> - La efectividad depende del dominio del problema

> Mejores Prácticas
>
> 1.  Comenzar con buenos ejemplos semilla
> 2.  Implementar estrategias de mutación inteligentes
> 3.  Mantener registro de cobertura
> 4.  Combinar ambas técnicas cuando sea apropiado

## 📋 Enunciado

Explique una ventaja (vista en clase) que tiene mutation fuzzing versus random fuzzing?

## 🔍 Solución

La principal ventaja del mutation fuzzing sobre el random fuzzing es que aprovecha inputs anteriores que han sido "interesantes" (por ejemplo, que han logrado nueva cobertura o encontrado bugs) para generar nuevos casos de prueba. Esto hace que la generación de inputs sea más dirigida y eficiente que la generación puramente aleatoria.

## 📚 Explicación

1. **Random Fuzzing:**

   - Genera inputs completamente aleatorios
   - No aprende de ejecuciones anteriores
   - Puede generar muchos inputs inválidos
   - Exploración no guiada del espacio de entrada

2. **Mutation Fuzzing:**
   - Modifica inputs que ya han sido exitosos
   - Mantiene estructura básica de inputs válidos
   - Mayor probabilidad de generar inputs útiles
   - Exploración más eficiente del espacio de entrada

> Caso Práctico
> Al testear un parser JSON:
>
> - Random fuzzing podría generar strings completamente aleatorios
> - Mutation fuzzing tomaría un JSON válido y haría pequeñas modificaciones
>
> Resultado: El mutation fuzzing tiene más probabilidades de encontrar bugs porque mantiene la estructura básica del JSON.

## 💡 Tips para el Examen

1. Enfócate en la eficiencia de la exploración
2. Menciona el concepto de "inputs interesantes"
3. Explica cómo se aprovecha el conocimiento previo
4. Usa ejemplos concretos para ilustrar la ventaja
5. Relaciona con la estructura del input esperado
