# 5. ANÁLISIS DE RENDIMIENTO

## 5.1 Fundamentos del Análisis de Rendimiento

El análisis de rendimiento es una técnica utilizada para evaluar la eficiencia de un programa en términos de tiempo de ejecución, uso de memoria, consumo de CPU y número de llamadas a funciones. Este análisis es crucial para identificar cuellos de botella y optimizar el rendimiento del software. A continuación, se presenta una clase base para el análisis de rendimiento.

```python
class PerformanceAnalyzer:
    """Framework base para análisis de rendimiento"""
    def __init__(self):
        self.metrics = {
            'time': {},
            'memory': {},
            'cpu': {},
            'calls': {}
        }
        self.start_time = None
        self.tracemalloc_active = False

    def start_monitoring(self):
        """Inicia monitoreo de rendimiento"""
        self.start_time = time.perf_counter()
        if not self.tracemalloc_active:
            tracemalloc.start()
            self.tracemalloc_active = True

    def stop_monitoring(self):
        """Detiene monitoreo y calcula métricas"""
        elapsed = time.perf_counter() - self.start_time
        current, peak = tracemalloc.get_traced_memory()

        return {
            'execution_time': elapsed,
            'current_memory': current,
            'peak_memory': peak
        }
```

La clase `PerformanceAnalyzer` proporciona un marco básico para el monitoreo del rendimiento de un programa. Incluye métodos para iniciar y detener el monitoreo, así como para calcular métricas clave como el tiempo de ejecución y el uso de memoria. El método `start_monitoring` inicia el monitoreo del rendimiento y el seguimiento de la memoria, mientras que `stop_monitoring` detiene el monitoreo y calcula las métricas de rendimiento.

## 5.2 Técnicas de Profiling

### 5.2.1 Profiling por Muestreo

El profiling por muestreo es una técnica que toma muestras periódicas del estado del programa para identificar las funciones que consumen más tiempo y recursos. Esta técnica es menos intrusiva que el profiling por instrumentación y puede proporcionar una visión general del rendimiento del programa con un impacto mínimo en su ejecución.

```python
class SamplingProfiler:
    def __init__(self, interval=0.001):
        self.interval = interval
        self.samples = []
        self.running = False
        self.thread = None

    def start(self):
        """Inicia el muestreo"""
        self.running = True
        self.thread = threading.Thread(target=self._sample_loop)
        self.thread.daemon = True
        self.thread.start()

    def _sample_loop(self):
        """Loop principal de muestreo"""
        while self.running:
            stack = self._get_current_stack()
            self.samples.append({
                'timestamp': time.time(),
                'stack': stack,
                'memory': tracemalloc.get_traced_memory()[0],
                'thread_id': threading.get_ident()
            })
            time.sleep(self.interval)

    def _get_current_stack(self):
        """Obtiene stack trace actual"""
        stack = []
        frame = sys._current_frames()[threading.get_ident()]
        while frame:
            stack.append({
                'function': frame.f_code.co_name,
                'filename': frame.f_code.co_filename,
                'lineno': frame.f_lineno
            })
            frame = frame.f_back
        return stack
```

La clase `SamplingProfiler` implementa el profiling por muestreo, tomando muestras periódicas del stack trace y del uso de memoria del programa. El método `start` inicia el muestreo en un hilo separado, mientras que `_sample_loop` toma muestras a intervalos regulares y las almacena en una lista.

### 5.2.2 Profiling por Instrumentación

El profiling por instrumentación es una técnica que modifica el código del programa para registrar información detallada sobre cada llamada a función. Esta técnica proporciona datos precisos sobre el tiempo de ejecución y el uso de recursos de cada función, pero puede introducir una sobrecarga significativa en el rendimiento del programa.

```python
class InstrumentationProfiler:
    def __init__(self):
        self.call_graph = {}
        self.current_context = []

    def instrument_function(self, func):
        """Decora función para instrumentación"""
        @wraps(func)
        def wrapper(*args, **kwargs):
            start_time = time.perf_counter()
            start_memory = tracemalloc.get_traced_memory()[0]

            self.current_context.append(func.__name__)
            try:
                result = func(*args, **kwargs)
                return result
            finally:
                elapsed = time.perf_counter() - start_time
                memory_used = (tracemalloc.get_traced_memory()[0]
                             - start_memory)

                self._record_call(
                    func.__name__,
                    elapsed,
                    memory_used
                )
                self.current_context.pop()

    def _record_call(self, func_name, elapsed, memory_used):
        """Registra información de la llamada"""
        context = '.'.join(self.current_context[:-1])
        if context not in self.call_graph:
            self.call_graph[context] = {}

        if func_name not in self.call_graph[context]:
            self.call_graph[context][func_name] = {
                'calls': 0,
                'total_time': 0,
                'total_memory': 0,
                'min_time': float('inf'),
                'max_time': 0
            }

        stats = self.call_graph[context][func_name]
        stats['calls'] += 1
        stats['total_time'] += elapsed
        stats['total_memory'] += memory_used
        stats['min_time'] = min(stats['min_time'], elapsed)
        stats['max_time'] = max(stats['max_time'], elapsed)
```

La clase `InstrumentationProfiler` implementa el profiling por instrumentación, decorando funciones para registrar el tiempo de ejecución y el uso de memoria. El método `instrument_function` decora una función para medir su rendimiento, mientras que `_record_call` registra las métricas de cada llamada a función en un grafo de llamadas.

## 5.3 Análisis de Memoria

### 5.3.1 Tracking de Memoria

El tracking de memoria es una técnica utilizada para monitorear el uso de memoria de un programa y detectar posibles fugas de memoria. Esta técnica toma snapshots del estado de la memoria en diferentes puntos del tiempo y compara estos snapshots para identificar aumentos anómalos en el uso de memoria.

```python
class MemoryTracker:
    def __init__(self):
        self.snapshots = []

    def take_snapshot(self):
        """Toma snapshot de memoria actual"""
        snapshot = tracemalloc.take_snapshot()
        self.snapshots.append({
            'timestamp': time.time(),
            'snapshot': snapshot
        })
        return snapshot

    def compare_snapshots(self, snapshot1, snapshot2):
        """Compara dos snapshots de memoria"""
        statistics = snapshot2.compare_to(snapshot1, 'lineno')
        return [{
            'file': stat.traceback[0].filename,
            'line': stat.traceback[0].lineno,
            'size_diff': stat.size_diff,
            'count_diff': stat.count_diff
        } for stat in statistics]

    def find_memory_leaks(self):
        """Detecta posibles memory leaks"""
        if len(self.snapshots) < 2:
            return []

        first = self.snapshots[0]['snapshot']
        last = self.snapshots[-1]['snapshot']

        differences = self.compare_snapshots(first, last)
        return [diff for diff in differences
                if diff['size_diff'] > 0 and diff['count_diff'] > 0]
```

La clase `MemoryTracker` implementa el tracking de memoria, tomando snapshots del estado de la memoria y comparándolos para detectar posibles fugas de memoria. El método `take_snapshot` toma un snapshot de la memoria actual, mientras que `compare_snapshots` compara dos snapshots para identificar diferencias en el uso de memoria.

## 5.4 Optimización y Recomendaciones

### 5.4.1 Análisis de Performance

El análisis de performance es una técnica utilizada para identificar las áreas del código que consumen más recursos y tiempo de ejecución. Este análisis permite generar recomendaciones de optimización para mejorar la eficiencia del programa.

```python
class PerformanceOptimizer:
    def __init__(self, profiling_data):
        self.data = profiling_data
        self.recommendations = []

    def analyze_hotspots(self):
        """Identifica hotspots de performance"""
        hotspots = []
        for context, functions in self.data.call_graph.items():
            for func_name, stats in functions.items():
                if (stats['total_time'] / stats['calls']
                    > PERFORMANCE_THRESHOLD):
                    hotspots.append({
                        'function': func_name,
                        'context': context,
                        'avg_time': stats['total_time'] / stats['calls'],
                        'calls': stats['calls']
                    })
        return sorted(hotspots,
                     key=lambda x: x['avg_time'],
                     reverse=True)

    def generate_recommendations(self):
        """Genera recomendaciones de optimización"""
        hotspots = self.analyze_hotspots()
        memory_issues = self.analyze_memory_issues()

        recommendations = []
        for hotspot in hotspots:
            recommendations.append({
                'type': 'performance',
                'target': hotspot['function'],
                'suggestion': self._get_optimization_suggestion(hotspot)
            })

        for issue in memory_issues:
            recommendations.append({
                'type': 'memory',
                'target': issue['location'],
                'suggestion': self._get_memory_suggestion(issue)
            })

        return recommendations
```

### 5.4.2 Visualización y Reportes

```python
class PerformanceVisualizer:
    def __init__(self, profiling_data):
        self.data = profiling_data

    def create_flame_graph(self):
        """Genera flame graph de performance"""
        plt.figure(figsize=(15, 8))
        self._plot_flame_graph(self.data.call_graph)
        plt.title('Performance Flame Graph')

    def create_memory_timeline(self):
        """Visualiza uso de memoria en el tiempo"""
        plt.figure(figsize=(12, 6))
        times = [s['timestamp'] for s in self.data.snapshots]
        memory = [s['snapshot'].statistics('lineno')[0].size
                 for s in self.data.snapshots]
        plt.plot(times, memory)
        plt.title('Memory Usage Timeline')

    def generate_report(self):
        """Genera reporte completo de performance"""
        return {
            'summary': self.generate_summary(),
            'hotspots': self.format_hotspots(),
            'memory_analysis': self.analyze_memory(),
            'recommendations': self.generate_recommendations(),
            'visualizations': self.generate_visualizations()
        }
```
