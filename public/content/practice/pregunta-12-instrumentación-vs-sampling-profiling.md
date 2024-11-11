# Pregunta 12: Instrumentación vs Sampling Profiling

## 📖 Recordatorio Teórico

### Técnicas de Profiling

#### Instrumentación Profiling

```python
# Ejemplo de código instrumentado
def funcion_original():
    resultado = hacer_calculo()
    return resultado

# Versión instrumentada
def funcion_instrumentada():
    start_time = time.time()
    try:
        resultado = hacer_calculo()
        return resultado
    finally:
        end_time = time.time()
        log_execution_time(end_time - start_time)
```

##### Características Clave

1. **Modificación del Código**

```python
class Instrumentador:
    def instrumentar_funcion(self, funcion):
        def wrapper(*args, **kwargs):
            self.contador_llamadas += 1
            inicio_memoria = get_memory_usage()

            resultado = funcion(*args, **kwargs)

            fin_memoria = get_memory_usage()
            self.uso_memoria += (fin_memoria - inicio_memoria)
            return resultado
        return wrapper
```

2. **Precisión Total**

```python
class InstrumentacionPrecisa:
    def __init__(self):
        self.metricas = {
            'llamadas': {},
            'tiempo': {},
            'memoria': {}
        }

    def registrar_evento(self, funcion, tipo, valor):
        if funcion not in self.metricas[tipo]:
            self.metricas[tipo][funcion] = []
        self.metricas[tipo][funcion].append(valor)
```

#### Sampling Profiling

```python
class SamplingProfiler:
    def __init__(self, intervalo=0.001):
        self.intervalo = intervalo
        self.muestras = []
        self.activo = False

    def iniciar_muestreo(self):
        self.activo = True
        thread = Thread(target=self._muestrear)
        thread.daemon = True
        thread.start()

    def _muestrear(self):
        while self.activo:
            stack = get_current_stack()
            self.muestras.append(stack)
            time.sleep(self.intervalo)
```

##### Características Clave

1. **No Modifica el Código**

```python
def get_current_stack():
    stack = []
    frame = sys._current_frames()[threading.get_ident()]
    while frame:
        stack.append({
            'funcion': frame.f_code.co_name,
            'archivo': frame.f_code.co_filename,
            'linea': frame.f_lineno
        })
        frame = frame.f_back
    return stack
```

2. **Overhead Mínimo**

```python
class SamplingEficiente:
    def analizar_muestras(self):
        resultados = {}
        total_muestras = len(self.muestras)

        for muestra in self.muestras:
            for frame in muestra:
                funcion = frame['funcion']
                resultados[funcion] = resultados.get(funcion, 0) + 1

        return {
            func: count/total_muestras * 100
            for func, count in resultados.items()
        }
```

### Comparación de Técnicas

#### Instrumentación

```python
# Ventajas
ventajas_instrumentacion = {
    'precision': 'Captura cada llamada y evento',
    'datos_exactos': 'Métricas precisas de tiempo y recursos',
    'cobertura': 'Análisis completo del código'
}

# Desventajas
desventajas_instrumentacion = {
    'overhead': 'Impacto significativo en rendimiento',
    'efecto_observador': 'Modifica comportamiento del código',
    'complejidad': 'Requiere modificar código fuente'
}
```

#### Sampling

```python
# Ventajas
ventajas_sampling = {
    'overhead_bajo': 'Impacto mínimo en rendimiento',
    'no_intrusivo': 'No modifica código fuente',
    'simplicidad': 'Fácil de implementar y usar'
}

# Desventajas
desventajas_sampling = {
    'aproximado': 'No captura todos los eventos',
    'precision_menor': 'Basado en muestreo estadístico',
    'eventos_raros': 'Puede perder eventos poco frecuentes'
}
```

### Casos de Uso

#### Cuándo Usar Instrumentación

```python
casos_instrumentacion = [
    'Debugging detallado',
    'Análisis de rendimiento preciso',
    'Tracking de memoria exacto',
    'Análisis de cobertura'
]
```

#### Cuándo Usar Sampling

```python
casos_sampling = [
    'Monitoreo en producción',
    'Análisis inicial de performance',
    'Identificación de hotspots',
    'Sistemas de alta performance'
]
```

> Consideraciones Importantes
>
> - Instrumentación afecta el comportamiento real
> - Sampling puede perder eventos importantes
> - Balance entre precisión y overhead
> - Contexto del sistema determina la elección

> Mejores Prácticas
>
> 1.  Evaluar requisitos de precisión
> 2.  Considerar impacto en rendimiento
> 3.  Analizar contexto de uso
> 4.  Combinar técnicas cuando sea posible
> 5.  Documentar limitaciones elegidas

## 📋 Enunciado

Asocie cada afirmación con la técnica de Instrumentación o Sampling Profiling.
_Solo dos afirmaciones son correctas, una para cada técnica._

## 🔍 Opciones Disponibles

1. "Es útil para calcular el tiempo de ejecución"
2. "La técnica de sampling permite rastrear absolutamente todos los métodos ejecutados durante la ejecución"
3. "Un problema que tiene es el efecto observador"
4. "Utiliza un hilo corriendo en paralelo que monitorea la pila"

## 💡 Solución Correcta

### ✅ Sampling

- "Utiliza un hilo corriendo en paralelo que monitorea la pila"
  > Por qué es correcto
  > El sampling profiling funciona tomando muestras periódicas mediante un hilo separado que monitorea el estado de la pila de ejecución.

### ✅ Instrumentación

- "Un problema que tiene es el efecto observador"
  > Por qué es correcto
  > La instrumentación, al modificar el código original para agregar puntos de monitoreo, inherentemente sufre del efecto observador ya que el código modificado puede alterar el comportamiento normal del programa.

## ❌ Afirmaciones Incorrectas

1. "Es útil para calcular el tiempo de ejecución"

   > Por qué es incorrecto
   > Esta afirmación es ambigua ya que ambas técnicas pueden medir tiempos de ejecución.

2. "La técnica de sampling permite rastrear absolutamente todos los métodos ejecutados durante la ejecución"
   > Por qué es incorrecto
   > Esta afirmación es falsa. De hecho, es la instrumentación la que permite rastrear todos los métodos, mientras que el sampling solo toma muestras periódicas.

## 🎯 Comparación Real de las Técnicas

| Característica    | Sampling                             | Instrumentación           |
| ----------------- | ------------------------------------ | ------------------------- |
| Método            | Muestreo periódico con hilo paralelo | Modifica el código fuente |
| Precisión         | Aproximada                           | Exacta                    |
| Overhead          | Bajo                                 | Alto                      |
| Efecto Observador | Mínimo                               | Significativo             |
| Cobertura         | Parcial                              | Completa                  |

> Clave para Recordar
>
> - **Sampling:** Usa un hilo separado para tomar muestras → menos intrusivo
> - **Instrumentación:** Modifica el código → causa efecto observador

## 💡 Ejemplos Prácticos

```python
# Ejemplo de Sampling Profiler
class SamplingProfiler:
    def __init__(self):
        self.sampling_thread = Thread(target=self._sample)
        self.samples = []

    def _sample(self):
        while True:
            stack = get_current_stack()
            self.samples.append(stack)
            time.sleep(0.001)  # Intervalo de muestreo

# Ejemplo de Instrumentación
def instrumented_function():
    start_time = time.time()  # Código insertado - Efecto observador
    original_result = actual_function()
    end_time = time.time()    # Código insertado - Efecto observador
    log_execution_time(end_time - start_time)
    return original_result
```

> Para el Examen
>
> 1.  Identifica las características únicas de cada técnica
> 2.  Recuerda que el sampling usa un hilo separado
> 3.  El efecto observador es característico de la instrumentación
> 4.  No todas las afirmaciones sobre técnicas de profiling son correctas
