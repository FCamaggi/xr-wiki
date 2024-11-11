# Pregunta 11: Principios del Testing

## 📖 Recordatorio Teórico

### Los 7 Principios Fundamentales del Testing

#### 1. El Testing Muestra la Presencia de Defectos

```python
# Ejemplo: Un test exitoso no garantiza ausencia de errores
def division_segura(a, b):
    if b != 0:
        return a/b
    return None

# Este test pasa pero no garantiza que no haya otros problemas
def test_division():
    assert division_segura(10, 2) == 5
    assert division_segura(10, 0) is None
```

#### 2. El Testing Exhaustivo es Imposible

```python
# Ejemplo: Función con muchas combinaciones posibles
def validar_password(password):
    return (8 <= len(password) <= 20 and
            any(c.isupper() for c in password) and
            any(c.islower() for c in password) and
            any(c.isdigit() for c in password))

# Número de combinaciones posibles:
# 62 caracteres posibles ^ longitud de 8-20 caracteres
# Imposible probar todas las combinaciones
```

#### 3. Testing Temprano

```python
# Costo de arreglar defectos
costos = {
    'requisitos': 1,      # Unidad monetaria
    'diseño': 5,
    'codigo': 10,
    'testing': 50,
    'produccion': 250
}
```

#### 4. Agrupación de Defectos

```python
# Ejemplo: Análisis de defectos
class DefectAnalyzer:
    def analyze_defects(self, defects):
        modules = {}
        for defect in defects:
            module = defect.module
            modules[module] = modules.get(module, 0) + 1
        return sorted(modules.items(),
                     key=lambda x: x[1],
                     reverse=True)
```

#### 5. Paradoja del Pesticida

```python
class TestSuite:
    def __init__(self):
        self.tests = []
        self.effectiveness = 1.0

    def run_tests(self):
        # La efectividad disminuye con el tiempo
        self.effectiveness *= 0.9

    def add_new_tests(self):
        # Necesidad de actualizar tests
        self.effectiveness = 1.0
```

#### 6. El Testing es Dependiente del Contexto

```python
# Diferentes tipos de testing según el contexto
testing_types = {
    'aplicacion_bancaria': {
        'prioridad': 'seguridad',
        'tests': ['penetracion', 'validacion_datos']
    },
    'juego_movil': {
        'prioridad': 'rendimiento',
        'tests': ['carga', 'usabilidad']
    }
}
```

#### 7. La Falacia de la Ausencia de Errores

```python
class Software:
    def evaluate_quality(self):
        metrics = {
            'defects': 0,          # Sin defectos encontrados
            'user_satisfaction': 2  # Baja satisfacción
        }
        # Un software sin defectos no es necesariamente útil
        return metrics
```

### Implicaciones Prácticas

#### 1. Estrategia de Testing

```python
class TestStrategy:
    def define_strategy(self, project_type):
        return {
            'risk_areas': self.identify_risks(),
            'test_levels': self.define_levels(),
            'resources': self.allocate_resources(),
            'schedule': self.create_schedule()
        }
```

#### 2. Gestión de Expectativas

```python
def communicate_test_results(test_results):
    return {
        'passed_tests': len(test_results.passed),
        'confidence_level': 'Alto',
        'limitations': [
            'No garantiza ausencia de errores',
            'Basado en pruebas selectivas',
            'Dependiente del contexto'
        ]
    }
```

> Errores Comunes
>
> - Asumir que testing exhaustivo es posible
> - Confiar excesivamente en los mismos tests
> - Ignorar el contexto del proyecto
> - Buscar perfección absoluta

> Mejores Prácticas
>
> 1.  Planificar testing desde el inicio
> 2.  Actualizar tests regularmente
> 3.  Adaptar estrategia al contexto
> 4.  Mantener expectativas realistas
> 5.  Documentar limitaciones y supuestos

## 📋 Enunciado

A un equipo de programadores se le encargó realizar un proyecto de software para una empresa reconocida. En la reunión inicial el equipo asegura que en sus proyectos siguen las mejores prácticas de desarrollo de software las cuales consideran buenas prácticas de testing, esto les permite entregar productos sin ninguna falla. El equipo desarrolla el proyecto pero al presentar el producto final ante la empresa este presenta una falla y el representante de la empresa enojado pide explicaciones.

**En base a la información entregada en el caso anterior ¿qué principio del testing no se respetó?**

## 🔍 Análisis de Opciones

1. Testing muestra la presencia de defectos
2. Testing exhaustivo es imposible
3. Paradoja del pesticida
4. Agrupación de defectos

## 📝 Solución

La respuesta correcta es: **Testing muestra la presencia de defectos**

## 💡 Explicación

> Principio Violado
> El equipo aseguró que podían entregar "productos sin ninguna falla", lo cual contradice directamente el principio fundamental de que el testing puede mostrar la presencia de defectos pero no puede probar su ausencia.

### Análisis de por qué las otras opciones no aplican:

> Otras Opciones
>
> - **Testing exhaustivo es imposible:** Aunque relevante, no es el principio principalmente violado en este caso
> - **Paradoja del pesticida:** No hay evidencia de que los tests se volvieran menos efectivos con el tiempo
> - **Agrupación de defectos:** No hay información sobre la distribución de los defectos

## 🎯 Principios Fundamentales del Testing

- [i] **Testing muestra la presencia de defectos**

  - El testing puede mostrar que hay defectos
  - No puede probar que no existen defectos
  - Reduce la probabilidad de defectos sin garantizar su ausencia

- [!] **Testing exhaustivo es imposible**

  - No se pueden probar todas las combinaciones
  - Se debe usar análisis de riesgos y prioridades

- [i] **Paradoja del pesticida**

  - Los mismos tests repetidos pierden efectividad
  - Los defectos se vuelven "resistentes"

- [i] **Agrupación de defectos**
  - Los defectos tienden a concentrarse
  - Sigue el principio de Pareto (80/20)

> Error Común
> La creencia de que el testing puede garantizar la ausencia total de defectos es un error común pero peligroso en el desarrollo de software.

> Para Recordar
>
> 1.  El testing reduce riesgos pero no los elimina
> 2.  "Ausencia de evidencia no es evidencia de ausencia"
> 3.  La confianza excesiva puede ser contraproducente
> 4.  Siempre comunica las limitaciones del testing

> Analogía
> Es como un control médico: puede detectar problemas de salud pero no puede garantizar que no existan problemas no detectados.
