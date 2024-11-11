# 4. LOCALIZACIÓN DE FALLAS

## 4.1 Fundamentos de Localización de Fallas

La localización de fallas es una técnica utilizada para identificar las partes del código que son responsables de los fallos observados durante la ejecución de pruebas. Esta técnica es esencial para mejorar la eficiencia del proceso de depuración y reducir el tiempo necesario para corregir errores. A continuación, se presenta una clase base para la localización de fallas.

```python
class FaultLocalization:
    """Framework base para localización de fallas"""
    def __init__(self):
        self.executions = []
        self.coverage = {}
        self.suspicious_scores = {}

    def analyze_execution(self, test_case, result, coverage):
        """Analiza la ejecución de un caso de prueba"""
        self.executions.append({
            'test': test_case,
            'result': result,
            'coverage': coverage
        })

    def calculate_suspiciousness(self):
        """Calcula puntuación de sospecha para cada línea"""
        for line in self.coverage:
            self.suspicious_scores[line] = self._calculate_score(line)

    def _calculate_score(self, line):
        """Método base para calcular score de sospecha"""
        raise NotImplementedError
```

En este ejemplo, la clase `FaultLocalization` proporciona una estructura base para implementar diferentes técnicas de localización de fallas. Incluye métodos para analizar la ejecución de casos de prueba, calcular la cobertura y determinar la puntuación de sospecha para cada línea de código. Esta clase puede ser extendida para implementar técnicas específicas de localización de fallas, como la localización basada en espectro o en mutación.

## 4.2 Técnicas de Localización

### 4.2.1 Localización Basada en Espectro (SBFL)

La localización basada en espectro (SBFL) utiliza la información de cobertura de pruebas para identificar las líneas de código más sospechosas de contener fallos. Esta técnica se basa en la correlación entre las líneas de código ejecutadas y los resultados de las pruebas (pasadas o fallidas). A continuación, se presenta una implementación de SBFL utilizando diferentes fórmulas de sospecha.

```python
class SpectrumBasedLocalization(FaultLocalization):
    def __init__(self, formula='ochiai'):
        super().__init__()
        self.formula = formula
        self.formulas = {
            'ochiai': self._ochiai_score,
            'tarantula': self._tarantula_score,
            'dstar': self._dstar_score
        }

    def _ochiai_score(self, line_stats):
        """Implementa fórmula Ochiai"""
        failed_covered = line_stats['failed_covered']
        total_failed = line_stats['total_failed']
        total_covered = line_stats['total_covered']

        denominator = math.sqrt(total_failed * total_covered)
        return failed_covered / denominator if denominator else 0

    def analyze_coverage_matrix(self):
        """Analiza matriz de cobertura de tests"""
        matrix = {}
        for execution in self.executions:
            test_id = execution['test'].id
            result = execution['result']
            coverage = execution['coverage']

            for line in coverage:
                if line not in matrix:
                    matrix[line] = {'passed': [], 'failed': []}
                target = matrix[line]['failed' if result.failed else 'passed']
                target.append(test_id)

        return matrix
```

En este ejemplo, la clase `SpectrumBasedLocalization` implementa la técnica SBFL utilizando la fórmula Ochiai para calcular la sospecha de cada línea de código. La función `analyze_coverage_matrix` analiza la matriz de cobertura de pruebas para determinar qué líneas fueron ejecutadas por pruebas fallidas y pasadas.

### 4.2.2 Localización Basada en Mutación (MBFL)

La localización basada en mutación (MBFL) utiliza mutantes del código fuente para identificar las líneas de código más propensas a contener fallos. Los mutantes son versiones modificadas del código original, y se ejecutan pruebas en estos mutantes para observar si fallan. A continuación, se presenta una implementación de MBFL.

```python
class MutationBasedLocalization(FaultLocalization):
    def __init__(self):
        super().__init__()
        self.mutants = {}
        self.mutation_results = {}

    def generate_mutants(self, source_code):
        """Genera mutantes del código"""
        mutator = CodeMutator()
        for line in source_code.split('\n'):
            line_mutants = mutator.generate_mutants(line)
            self.mutants[line] = line_mutants

    def execute_mutants(self):
        """Ejecuta suite de tests en cada mutante"""
        for line, mutants in self.mutants.items():
            self.mutation_results[line] = []
            for mutant in mutants:
                result = self.execute_test_suite(mutant)
                self.mutation_results[line].append(result)

    def calculate_mutation_score(self, line):
        """Calcula score basado en resultados de mutantes"""
        results = self.mutation_results[line]
        killed = len([r for r in results if r.killed])
        total = len(results)
        return killed / total if total else 0
```

En este ejemplo, la clase `MutationBasedLocalization` genera mutantes del código fuente y ejecuta una suite de pruebas en cada mutante. La función `calculate_mutation_score` calcula la puntuación de sospecha basada en los resultados de los mutantes, determinando cuántos mutantes fueron "matados" por las pruebas.

### 4.2.3 Localización por Stack Trace

La localización por stack trace utiliza los rastros de pila generados durante los fallos para identificar las ubicaciones más sospechosas en el código. Esta técnica analiza la frecuencia y la posición de los frames en los stack traces para calcular una puntuación de sospecha. A continuación, se presenta una implementación de esta técnica.

```python
class StackTraceAnalyzer:
    def __init__(self):
        self.crash_traces = []
        self.frequency_map = {}

    def analyze_trace(self, stack_trace):
        """Analiza un stack trace de error"""
        frames = self.parse_stack_trace(stack_trace)
        self.crash_traces.append(frames)
        self.update_frequency_map(frames)

    def calculate_frame_scores(self):
        """Calcula scores para cada frame"""
        scores = {}
        for frame, freq in self.frequency_map.items():
            position_score = self.calculate_position_score(frame)
            frequency_score = self.calculate_frequency_score(freq)
            scores[frame] = position_score * frequency_score
        return scores

    def get_most_suspicious_locations(self, limit=10):
        """Retorna las ubicaciones más sospechosas"""
        scores = self.calculate_frame_scores()
        return sorted(scores.items(),
                     key=lambda x: x[1],
                     reverse=True)[:limit]
```

En este ejemplo, la clase `StackTraceAnalyzer` analiza los stack traces de errores y calcula una puntuación de sospecha para cada frame. La función `get_most_suspicious_locations` retorna las ubicaciones más sospechosas en el código, basándose en la frecuencia y la posición de los frames en los stack traces.

## 4.3 Implementación con FAUXPY

### 4.3.1 Configuración de FAUXPY

FAUXPY es una herramienta que facilita la localización de fallas mediante la integración de diferentes técnicas de análisis. A continuación, se presenta una clase `FAUXPYRunner` que configura y ejecuta FAUXPY en un proyecto específico.

```python
class FAUXPYRunner:
    def __init__(self, project_path):
        self.project_path = project_path
        self.config = {
            'src': './src',
            'test': './tests',
            'families': ['sbfl', 'mbfl', 'st']
        }

    def setup_environment(self):
        """Configura ambiente para FAUXPY"""
        return {
            'PYTHONPATH': self.project_path,
            'FAUXPY_EXEC': True
        }

    def run_analysis(self, failing_tests):
        """Ejecuta análisis completo con FAUXPY"""
        results = {}
        for family in self.config['families']:
            result = self.run_family_analysis(family, failing_tests)
            results[family] = result
        return results
```

En este ejemplo, la clase `FAUXPYRunner` se encarga de configurar el entorno necesario para ejecutar FAUXPY y de realizar el análisis de localización de fallas utilizando diferentes familias de técnicas, como SBFL, MBFL y ST. El método `setup_environment` configura las variables de entorno necesarias, mientras que `run_analysis` ejecuta el análisis para cada familia de técnicas y acumula los resultados.

### 4.3.2 Integración de Técnicas

Para obtener una localización de fallas más precisa, es posible combinar los resultados de diferentes técnicas. La clase `FAUXPYIntegrator` se encarga de integrar los resultados de las distintas técnicas utilizadas por FAUXPY.

```python
class FAUXPYIntegrator:
    def __init__(self, runner):
        self.runner = runner
        self.results = {}

    def combine_techniques(self, weights=None):
        """Combina resultados de diferentes técnicas"""
        if weights is None:
            weights = {
                'sbfl': 0.4,
                'mbfl': 0.4,
                'st': 0.2
            }

        combined_scores = {}
        for location in self.get_all_locations():
            score = 0
            for technique, weight in weights.items():
                if location in self.results[technique]:
                    score += self.results[technique][location] * weight
            combined_scores[location] = score

        return combined_scores
```

En este ejemplo, la clase `FAUXPYIntegrator` toma los resultados generados por `FAUXPYRunner` y los combina utilizando pesos específicos para cada técnica. El método `combine_techniques` permite ajustar los pesos según la importancia relativa de cada técnica, proporcionando una puntuación combinada para cada ubicación sospechosa en el código.

## 4.4 Análisis y Visualización

### 4.4.1 Análisis de Resultados

El análisis de resultados de la localización de fallas es crucial para evaluar la efectividad de las técnicas utilizadas. La clase `FaultLocalizationAnalyzer` se encarga de calcular métricas de efectividad y generar reportes detallados que comparan las diferentes técnicas de localización de fallas.

```python
class FaultLocalizationAnalyzer:
    def __init__(self, results):
        self.results = results
        self.metrics = {}

    def calculate_effectiveness(self):
        """Calcula métricas de efectividad"""
        return {
            'top_n': self.calculate_top_n_metrics(),
            'mean_rank': self.calculate_mean_rank(),
            'examination_effort': self.calculate_examination_effort()
        }

    def generate_report(self):
        """Genera reporte detallado"""
        return {
            'summary': self.generate_summary(),
            'technique_comparison': self.compare_techniques(),
            'recommendations': self.generate_recommendations()
        }
```

En este ejemplo, la clase `FaultLocalizationAnalyzer` calcula métricas como el `top_n`, que mide cuántas fallas se encuentran en las primeras posiciones de la lista de sospechosos, el `mean_rank`, que es el rango promedio de las fallas, y el `examination_effort`, que mide el esfuerzo necesario para encontrar las fallas. Estos análisis permiten identificar qué técnicas son más efectivas y dónde se pueden realizar mejoras.

### 4.4.2 Visualización de Resultados

La visualización de los resultados de la localización de fallas es esencial para comprender y comunicar los hallazgos. La clase `FaultVisualization` proporciona métodos para crear visualizaciones como heatmaps de sospecha y gráficos de comparación de técnicas.

```python
class FaultVisualization:
    def __init__(self, results):
        self.results = results

    def create_suspiciousness_heatmap(self):
        """Genera heatmap de sospecha"""
        plt.figure(figsize=(12, 8))
        sns.heatmap(self.prepare_heatmap_data(),
                   cmap='YlOrRd',
                   annot=True)
        plt.title('Suspiciousness Heatmap')

    def create_technique_comparison_plot(self):
        """Compara resultados de diferentes técnicas"""
        plt.figure(figsize=(10, 6))
        for technique, scores in self.results.items():
            plt.plot(sorted(scores.values(), reverse=True),
                    label=technique)
        plt.legend()
        plt.title('Technique Comparison')
```

En este ejemplo, la clase `FaultVisualization` genera un heatmap que muestra la sospecha de cada línea de código, facilitando la identificación visual de las áreas más problemáticas. Además, el gráfico de comparación de técnicas permite evaluar el rendimiento relativo de diferentes métodos de localización de fallas, ayudando a seleccionar la técnica más adecuada para un proyecto específico.
