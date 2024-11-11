# Pregunta 8: Search Based Testing - Tournament Selection

## 📖 Recordatorio Teórico

### Algoritmos Genéticos en Testing

Los algoritmos genéticos son técnicas de búsqueda inspiradas en la evolución natural, utilizadas para generar y optimizar casos de prueba.

#### Componentes Principales

```python
class GeneticAlgorithm:
    def __init__(self, population_size, tournament_size):
        self.population_size = population_size
        self.tournament_size = tournament_size
        self.population = []

    def evolve(self, generations):
        self.initialize_population()
        for gen in range(generations):
            new_population = []
            while len(new_population) < self.population_size:
                parent1 = self.tournament_selection()
                parent2 = self.tournament_selection()
                child = self.crossover(parent1, parent2)
                child = self.mutate(child)
                new_population.append(child)
            self.population = new_population
```

### Tournament Selection

#### Funcionamiento Básico

```python
def tournament_selection(self):
    # 1. Seleccionar participantes aleatorios
    tournament = random.sample(self.population, self.tournament_size)

    # 2. Encontrar el mejor del torneo
    return max(tournament, key=lambda x: x.fitness)
```

#### Características Clave

1. **Presión Selectiva**

```python
# Torneo pequeño = baja presión selectiva
tournament_size = 2  # Más diversidad

# Torneo grande = alta presión selectiva
tournament_size = 7  # Más elitista
```

2. **Probabilidad de Selección**

```python
# Probabilidad de seleccionar el mejor individuo:
p_best = 1 - (1 - 1/tournament_size)^tournament_size
```

3. **Control de Diversidad**

```python
def adaptive_tournament(self, gen_number, max_gens):
    # Ajusta tamaño del torneo según generación
    base_size = 2
    max_size = 7
    current_size = base_size + (max_size - base_size) * (gen_number/max_gens)
    return int(current_size)
```

### Implementación Detallada

#### Estructura del Torneo

```python
class TournamentSelector:
    def __init__(self, tournament_size):
        self.tournament_size = tournament_size

    def select(self, population, fitness_function):
        # Seleccionar participantes
        participants = random.sample(population,
                                   self.tournament_size)

        # Evaluar fitness
        fitness_scores = [(p, fitness_function(p))
                         for p in participants]

        # Retornar el mejor
        return max(fitness_scores, key=lambda x: x[1])[0]
```

#### Ejemplo con Test Cases

```python
class TestCase:
    def __init__(self, inputs):
        self.inputs = inputs
        self.fitness = 0

    def calculate_fitness(self):
        coverage = self.measure_coverage()
        complexity = self.assess_complexity()
        self.fitness = coverage * 0.7 + complexity * 0.3
```

### Ventajas y Características

#### 1. Facilidad de Implementación

```python
# Simple de implementar
def basic_tournament(population, size):
    selected = random.sample(population, size)
    return max(selected, key=lambda x: x.fitness)
```

#### 2. Paralelización

```python
# Fácil de paralelizar
def parallel_tournament(population, tournament_size, num_threads):
    with ThreadPoolExecutor(max_workers=num_threads) as executor:
        selections = [executor.submit(tournament_selection,
                                    population,
                                    tournament_size)
                     for _ in range(needed_selections)]
```

#### 3. Control de Presión Selectiva

```python
def calculate_selection_pressure(tournament_size):
    """
    Mayor tournament_size = Mayor presión selectiva
    Menor tournament_size = Mayor diversidad
    """
    return {
        'selection_probability': 1/tournament_size,
        'diversity_factor': 1 - (1/tournament_size)
    }
```

> Consideraciones
>
> - Tamaño del torneo afecta convergencia
> - Balance entre exploración y explotación
> - Posible pérdida de diversidad
> - Estancamiento en óptimos locales

> Mejores Prácticas
>
> 1.  Ajustar tamaño según el problema
> 2.  Mantener diversidad en la población
> 3.  Considerar torneos adaptativos
> 4.  Monitorear convergencia
> 5.  Combinar con otras técnicas de selección

## 📋 Enunciado

En search based software testing. Explique como funciona el algoritmo de selección por torneo.

## 🔍 Solución

El algoritmo de selección por torneo es una técnica de selección utilizada en algoritmos genéticos y búsqueda basada en software testing que selecciona individuos para reproducción mediante "torneos" entre un subconjunto de la población.

## 📚 Explicación

**Proceso del Algoritmo:**

1. Se selecciona aleatoriamente un subconjunto de individuos de la población (tamaño del torneo)
2. Estos individuos "compiten" basados en su fitness
3. El individuo con mejor fitness gana el torneo
4. El ganador es seleccionado para reproducción

> Ejemplo de Torneo
> Población: [A,B,C,D,E] con fitness [5,3,8,1,4]
>
> 1.  Selección aleatoria de 3 individuos: [A,C,E]
> 2.  Comparación de fitness: [5,8,4]
> 3.  Ganador: C (fitness = 8)

## 💡 Tips para el Examen

1. El tamaño del torneo afecta la presión selectiva
2. Torneos más grandes = mayor presión selectiva
3. Torneos más pequeños = mayor diversidad
4. Es un método simple y efectivo
5. Permite control sobre la presión selectiva

> Ventajas
>
> - Simple de implementar
> - Eficiente computacionalmente
> - Fácil de paralelizar
> - Control ajustable de la presión selectiva

Entendido. Analizaré el ejercicio de examen y lo estructuraré siguiendo el formato solicitado, incluyendo recursos adicionales y explicaciones detalladas.
