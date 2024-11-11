# Pregunta 14: Técnicas de Fault Location

## 📖 Recordatorio Teórico

La localización de fallas es un aspecto crucial del testing que busca identificar las partes del código que son responsables de los fallos detectados. Es especialmente importante en sistemas grandes donde encontrar manualmente la causa de un fallo puede ser como buscar una aguja en un pajar.

### 1. SBFL (Spectrum-Based Fault Localization)

#### Fundamentos

SBFL es una técnica que utiliza la información de ejecución del programa (spectrum) para identificar las líneas de código más sospechosas de contener defectos. Se basa en la correlación entre la ejecución de una línea de código y los fallos observados.

#### Funcionamiento

1. **Recolección de Datos**

   ```python
   # Ejemplo de estructura de datos para SBFL
   class ExecutionData:
       def __init__(self):
           self.executed_lines = {
               'passed_tests': defaultdict(int),  # Líneas ejecutadas por tests exitosos
               'failed_tests': defaultdict(int)   # Líneas ejecutadas por tests fallidos
           }
   ```

2. **Análisis de Cobertura**

   - Para cada test:
     - Se registra qué líneas se ejecutan
     - Se guarda el resultado del test (pass/fail)
   - Se construye una matriz de cobertura que muestra la relación entre tests y líneas ejecutadas

3. **Cálculo de Sospecha**
   Se utilizan fórmulas específicas para calcular qué tan sospechosa es cada línea. La más común es la fórmula Ochiai:

   $$ suspiciousness = \frac{ef}{\sqrt{(ef + ep)(ef + nf)}} $$

   Donde:

   - ef = número de tests fallidos que ejecutan la línea
   - ep = número de tests pasados que ejecutan la línea
   - nf = número total de tests fallidos

### 2. MBFL (Mutation-Based Fault Localization)

#### Fundamentos

MBFL es una técnica más sofisticada que utiliza mutación de código para identificar las ubicaciones de los defectos. Se basa en la idea de que las mutaciones en código defectuoso tendrán un impacto diferente en los tests que las mutaciones en código correcto.

#### Funcionamiento

1. **Generación de Mutantes**

   - Se crean variaciones del programa original mediante operadores de mutación
   - Cada mutante tiene un cambio pequeño y localizado

   ```python
   class MutationOperator:
       def generate_mutants(self, code_line):
           """
           Ejemplos de mutaciones:
           - Cambiar operadores: + por -, == por !=
           - Modificar valores: constantes, variables
           - Alterar condiciones: and por or
           """
           mutants = []
           # Operadores aritméticos
           if '+' in code_line:
               mutants.append(code_line.replace('+', '-'))
           # Operadores relacionales
           if '==' in code_line:
               mutants.append(code_line.replace('==', '!='))
           return mutants
   ```

2. **Ejecución de Tests**

   - Se ejecutan todos los tests en cada mutante
   - Se registra qué tests "matan" (detectan) cada mutante

   ```python
   class MutantTesting:
       def test_mutant(self, mutant, test_suite):
           results = {
               'killed_by': [],
               'survived': []
           }
           for test in test_suite:
               if test.run(mutant) != test.run(original):
                   results['killed_by'].append(test)
               else:
                   results['survived'].append(test)
           return results
   ```

3. **Análisis de Impacto**
   - Se analiza cómo las mutaciones afectan los resultados de los tests
   - Las líneas donde las mutaciones tienen mayor impacto son más sospechosas
   ```python
   def calculate_mutation_impact(mutant_results):
       """
       Mayor impacto = Mayor probabilidad de contener el defecto
       - Mutaciones que cambian muchos resultados de test
       - Mutaciones que afectan tests específicos
       """
       impact_score = len(mutant_results['killed_by']) / total_tests
       return impact_score
   ```

### Comparación de Técnicas

| Aspecto             | SBFL      | MBFL     |
| ------------------- | --------- | -------- |
| Precisión           | Moderada  | Alta     |
| Costo computacional | Bajo      | Alto     |
| Complejidad         | Simple    | Compleja |
| Escalabilidad       | Alta      | Limitada |
| Falsos positivos    | Moderados | Bajos    |

#### Ventajas y Desventajas

**SBFL:**

- ✅ Rápido y escalable
- ✅ Fácil de implementar
- ✅ Bajo overhead
- ❌ Menor precisión
- ❌ Sensible a la calidad de los tests

**MBFL:**

- ✅ Alta precisión
- ✅ Mejor identificación de defectos
- ✅ Menos falsos positivos
- ❌ Computacionalmente costoso
- ❌ Problemas con mutantes equivalentes

> Limitaciones Importantes
>
> 1.  **SBFL:**
>
> - Puede dar falsos positivos en código acoplado
> - Depende fuertemente de la calidad de los tests
> - Puede ser impreciso en condiciones complejas
>
> 2.  **MBFL:**
>
> - Alto costo computacional
> - Problema de mutantes equivalentes
> - Dificultad para escalar en proyectos grandes
> - Requiere buenos tests para ser efectivo

> Mejores Prácticas
>
> 1.  **Selección de Técnica:**
>
> - Usar SBFL para análisis inicial rápido
> - Aplicar MBFL en áreas críticas o sospechosas
> - Combinar técnicas para mayor precisión
>
> 2.  **Implementación:**
>
> - Mantener buena suite de pruebas
> - Automatizar el proceso de análisis
> - Validar resultados manualmente
> - Documentar patrones de defectos encontrados

## 📋 Enunciado

Indique dos técnicas de fault location vista en clase. Explique a grandes rasgos sus diferencias.

## 💡 Solución

### 1. SBFL (Spectrum-Based Fault Localization)

> Características SBFL
>
> - Utiliza información de cobertura de pruebas
> - Analiza correlación entre líneas ejecutadas y fallos
> - No requiere modificar el código
> - Usa fórmulas como Ochiai para calcular sospecha

### 2. MBFL (Mutation-Based Fault Localization)

> Características MBFL
>
> - Genera mutantes del código
> - Ejecuta tests en cada mutante
> - Analiza qué mutaciones "matan" los tests
> - Más preciso pero computacionalmente costoso

## 🔄 Diferencias Principales

| Aspecto                 | SBFL                | MBFL            |
| ----------------------- | ------------------- | --------------- |
| Base del análisis       | Cobertura de código | Mutaciones      |
| Costo computacional     | Bajo                | Alto            |
| Precisión               | Moderada            | Alta            |
| Modificación del código | No requiere         | Genera mutantes |
| Complejidad             | Simple              | Compleja        |

> Cuándo Usar Cada Una
>
> - **SBFL:** Para análisis rápido inicial
> - **MBFL:** Para localización más precisa cuando los recursos lo permiten
