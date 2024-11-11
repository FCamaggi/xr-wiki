# 3. FUZZING Y TESTING DINÁMICO

## 3.1 Fundamentos del Fuzzing

El fuzzing es una técnica de testing dinámico que consiste en proporcionar entradas aleatorias o semi-aleatorias a un programa con el objetivo de descubrir fallos y vulnerabilidades. Esta técnica es especialmente útil para encontrar errores de seguridad y robustez en el software.

```python
class FuzzingStrategy:
    """Framework base para estrategias de fuzzing"""
    def __init__(self):
        self.executions = 0
        self.crashes = []
        self.coverage = set()
        self.interesting_inputs = set()

    def generate_input(self):
        raise NotImplementedError

    def execute_target(self, input_data):
        raise NotImplementedError

    def is_interesting(self, result, coverage):
        return bool(coverage - self.coverage)

    def update_stats(self, input_data, result, coverage):
        self.executions += 1
        self.coverage.update(coverage)
        if result.is_crash:
            self.crashes.append((input_data, result))
```

La clase `FuzzingStrategy` proporciona una estructura base para implementar diferentes estrategias de fuzzing. Incluye métodos para generar entradas, ejecutar el objetivo, determinar si un resultado es interesante y actualizar las estadísticas de ejecución. Esta clase puede ser extendida para crear estrategias de fuzzing específicas, como fuzzing mutacional, simbólico o concólico.

## 3.2 Estrategias de Fuzzing

### 3.2.1 Fuzzing Mutacional

El fuzzing mutacional es una técnica que se basa en modificar entradas existentes para generar nuevas entradas de prueba. Esta técnica es útil para explorar el espacio de entrada de manera eficiente, aprovechando las entradas que ya han demostrado ser interesantes o que han descubierto fallos en el pasado.

```python
class MutationFuzzer(FuzzingStrategy):
    def __init__(self, initial_inputs, mutations=None):
        super().__init__()
        self.population = initial_inputs
        self.mutations = mutations or [
            self.bit_flip,
            self.byte_flip,
            self.arithmetic,
            self.known_integers,
            self.splice_inputs
        ]

    def bit_flip(self, input_data):
        """Muta bits individuales del input"""
        if not input_data: return input_data
        data = bytearray(input_data)
        pos = random.randint(0, len(data) * 8 - 1)
        byte_pos = pos // 8
        bit_pos = pos % 8
        data[byte_pos] ^= (1 << bit_pos)
        return bytes(data)

    def splice_inputs(self, input_data):
        """Combina dos inputs del pool"""
        if len(self.population) < 2: return input_data
        input2 = random.choice(self.population)
        pos1 = random.randint(0, len(input_data))
        pos2 = random.randint(0, len(input2))
        return input_data[:pos1] + input2[pos2:]

    def select_next_input(self):
        """Selecciona input para siguiente iteración"""
        weights = [self.calculate_weight(inp) for inp in self.population]
        return random.choices(self.population, weights=weights)[0]

    def calculate_weight(self, input_data):
        """Calcula peso basado en historial y cobertura"""
        coverage_score = len(self.get_coverage(input_data))
        novelty_score = self.calculate_novelty(input_data)
        return coverage_score * novelty_score
```

### 3.2.2 Fuzzing Simbólico

El fuzzing simbólico utiliza técnicas de análisis estático y simbólico para generar entradas de prueba que cubran diferentes caminos de ejecución en el código. Esta técnica es especialmente útil para descubrir fallos en condiciones específicas y para asegurar una alta cobertura de código.

```python
class SymbolicFuzzer(FuzzingStrategy):
    def __init__(self, function, solver=z3.Solver()):
        super().__init__()
        self.function = function
        self.solver = solver
        self.path_constraints = []
        self.variables = {}

    def create_symbolic_variable(self, name, type_hint):
        """Crea variable simbólica con tipo"""
        if type_hint == int:
            var = z3.Int(name)
        elif type_hint == float:
            var = z3.Real(name)
        elif type_hint == bool:
            var = z3.Bool(name)
        else:
            raise ValueError(f"Tipo no soportado: {type_hint}")

        self.variables[name] = var
        return var

    def add_path_constraint(self, constraint):
        """Agrega constraint de path"""
        self.path_constraints.append(constraint)

    def solve_path(self):
        """Intenta resolver constraints actuales"""
        self.solver.push()
        for constraint in self.path_constraints:
            self.solver.add(constraint)

        if self.solver.check() == z3.sat:
            model = self.solver.model()
            result = {
                name: model[var].as_long()
                for name, var in self.variables.items()
            }
            self.solver.pop()
            return result

        self.solver.pop()
        return None
```

### 3.2.3 Fuzzing Concólico

El fuzzing concólico combina la ejecución concreta y simbólica para generar entradas de prueba que exploren diferentes caminos de ejecución en el código. Esta técnica es útil para descubrir fallos que dependen de condiciones específicas y para asegurar una alta cobertura de código.

```python
class ConcolicFuzzer(FuzzingStrategy):
    def __init__(self, function):
        super().__init__()
        self.function = function
        self.symbolic_executor = SymbolicExecutor()
        self.concrete_executor = ConcreteExecutor()

    def execute_concolic(self, inputs):
        """Ejecuta función concólica y simbólicamente"""
        # Ejecución concreta
        concrete_result = self.concrete_executor.execute(
            self.function, inputs)

        # Ejecución simbólica
        symbolic_trace = self.symbolic_executor.execute(
            self.function, inputs)

        return concrete_result, symbolic_trace

    def negate_path_condition(self, path_conditions, index):
        """Niega una condición para explorar nuevo path"""
        if not path_conditions:
            return None

        new_conditions = path_conditions[:index]
        negated = z3.Not(path_conditions[index])
        new_conditions.append(negated)

        return z3.And(new_conditions)

    def generate_new_inputs(self, path_conditions):
        """Genera nuevos inputs negando condiciones"""
        for i in range(len(path_conditions)):
            new_condition = self.negate_path_condition(
                path_conditions, i)
            if new_condition:
                solution = self.solve_constraints(new_condition)
                if solution:
                    yield solution
```

## 3.3 Optimización y Guía

### 3.3.1 Guía por Cobertura

La guía por cobertura es una técnica de fuzzing que utiliza la información de cobertura del código para dirigir la generación de entradas de prueba. Esta técnica permite identificar áreas del código que no han sido suficientemente exploradas y asignar más recursos para probar esas áreas.

```python
class CoverageGuidedFuzzer(FuzzingStrategy):
    def __init__(self, target_function):
        super().__init__()
        self.target = target_function
        self.coverage_tracker = CoverageTracker()
        self.energy_allocation = EnergyAllocation()

    def run_with_coverage(self, input_data):
        """Ejecuta input monitoreando cobertura"""
        with self.coverage_tracker as tracker:
            result = self.execute_target(input_data)
            new_coverage = tracker.get_new_coverage()

        return result, new_coverage

    def allocate_energy(self, input_data):
        """Asigna energía basada en beneficio histórico"""
        coverage_impact = self.coverage_tracker.get_impact(input_data)
        novelty_score = self.calculate_novelty(input_data)
        return self.energy_allocation.calculate(
            coverage_impact, novelty_score)
```

### 3.3.2 Estrategias de Semilla

Las estrategias de semilla son técnicas utilizadas para seleccionar y gestionar las entradas iniciales (semillas) que se utilizarán en el proceso de fuzzing. Estas estrategias ayudan a maximizar la efectividad del fuzzing al elegir semillas que tienen un alto potencial para descubrir nuevos fallos.

```python
class SeedStrategy:
    def __init__(self):
        self.seeds = []
        self.performance_metrics = {}

    def add_seed(self, seed, performance):
        """Agrega nueva semilla al pool"""
        self.seeds.append(seed)
        self.performance_metrics[seed] = performance

    def select_seed(self):
        """Selecciona semilla basada en métricas"""
        weights = [self.calculate_weight(seed)
                  for seed in self.seeds]
        return random.choices(self.seeds, weights=weights)[0]

    def prune_seeds(self):
        """Elimina semillas poco efectivas"""
        threshold = self.calculate_threshold()
        self.seeds = [seed for seed in self.seeds
                     if self.performance_metrics[seed] > threshold]
```

## 3.4 Integración y Pipeline

### 3.4.1 Pipeline de Fuzzing

Un pipeline de fuzzing es una secuencia de pasos automatizados que permite ejecutar diferentes estrategias de fuzzing de manera coordinada. Este pipeline ayuda a maximizar la cobertura y la efectividad del fuzzing al combinar múltiples técnicas y gestionar los recursos de manera eficiente.

```python
class FuzzingPipeline:
    def __init__(self, target):
        self.target = target
        self.strategies = {
            'mutation': MutationFuzzer(),
            'symbolic': SymbolicFuzzer(target),
            'concolic': ConcolicFuzzer(target)
        }
        self.scheduler = FuzzingScheduler()

    def run_campaign(self, time_budget):
        """Ejecuta campaña de fuzzing completa"""
        start_time = time.time()
        results = []

        while time.time() - start_time < time_budget:
            strategy = self.scheduler.next_strategy()
            result = self.run_strategy(strategy)
            results.append(result)
            self.scheduler.update_stats(strategy, result)

        return self.aggregate_results(results)
```

### 3.4.2 Monitoreo y Reportes

El monitoreo y la generación de reportes son componentes cruciales para evaluar el progreso y la efectividad de una campaña de fuzzing. Estos componentes permiten visualizar la cobertura alcanzada, los fallos encontrados y las métricas de rendimiento, proporcionando una visión integral del proceso de fuzzing.

```python
class FuzzingMonitor:
    def __init__(self):
        self.metrics = {
            'executions': 0,
            'crashes': [],
            'coverage': set(),
            'unique_paths': set()
        }

    def generate_report(self):
        """Genera reporte detallado"""
        return {
            'summary': self.generate_summary(),
            'coverage_analysis': self.analyze_coverage(),
            'crash_analysis': self.analyze_crashes(),
            'performance_metrics': self.calculate_performance()
        }

    def visualize_progress(self):
        """Genera visualizaciones de progreso"""
        plt.figure(figsize=(15, 10))

        # Coverage over time
        plt.subplot(2, 2, 1)
        self.plot_coverage_progress()

        # Unique crashes
        plt.subplot(2, 2, 2)
        self.plot_crash_distribution()

        # Performance metrics
        plt.subplot(2, 2, 3)
        self.plot_performance_metrics()

        # Path exploration
        plt.subplot(2, 2, 4)
        self.plot_path_exploration()

        return plt
```
