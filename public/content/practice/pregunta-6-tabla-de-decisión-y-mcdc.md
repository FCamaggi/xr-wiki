# Pregunta 6: Tabla de Decisión y MCDC

## 📖 Recordatorio Teórico

### Tablas de Decisión

Una técnica sistemática para representar lógica compleja que combina múltiples condiciones y acciones.

#### Estructura Básica

| Condiciones | R1  | R2  | R3  | R4  |
| ----------- | --- | --- | --- | --- |
| Condición 1 | T   | T   | F   | F   |
| Condición 2 | T   | F   | T   | F   |
| Acción 1    | X   |     |     |     |
| Acción 2    |     | X   | X   |     |

#### Elementos Clave

1. **Condiciones**

   - Entradas o estados del sistema
   - Típicamente booleanas (T/F)

   ```
   Ejemplo:
   - Usuario registrado (T/F)
   - Saldo suficiente (T/F)
   ```

2. **Acciones**
   - Resultados o comportamientos
   - Marcadas con X o dejadas en blanco
   ```
   Ejemplo:
   - Aprobar transacción (X)
   - Rechazar transacción (X)
   ```

### Modified Condition/Decision Coverage (MCDC)

#### Principios MCDC

- Cada punto de entrada y salida se invoca
- Cada decisión toma todos los resultados posibles
- Cada condición afecta independientemente la decisión

#### Ejemplo MCDC

```python
def autorizar_compra(saldo, limite, monto):
    return (saldo >= monto) and (monto <= limite)

# Casos MCDC mínimos:
# 1. T T -> T  (caso base)
# 2. F T -> F  (saldo afecta)
# 3. T F -> F  (límite afecta)
```

### Creación de Tablas de Decisión

1. **Identificar Elementos**

```
Condiciones:
- Speed > 50
- School Zone

Acciones:
- $250 Multa
- Cárcel
```

2. **Generar Combinaciones**

| Speed>50 | School | Multa | Cárcel |
| -------- | ------ | ----- | ------ |
| T        | T      | X     | X      |
| T        | F      | X     |        |
| F        | T      |       |        |
| F        | F      |       |        |

3. **Simplificar si es posible**

```
Reglas redundantes o imposibles:
- Combinaciones que no pueden ocurrir
- Resultados idénticos que pueden combinarse
```

### Análisis de Completitud

1. **Verificar Cobertura**

   ```
   2^n donde n = número de condiciones
   Ejemplo: 2 condiciones = 4 combinaciones
   ```

2. **Identificar Casos Especiales**
   ```
   - Valores límite
   - Condiciones mutuamente excluyentes
   - Dependencias entre condiciones
   ```

> Errores Comunes
>
> - Olvidar combinaciones posibles
> - No identificar casos imposibles
> - Inconsistencia en la notación
> - Redundancia no identificada

> Mejores Prácticas
>
> 1.  Documentar todas las condiciones claramente
> 2.  Verificar completitud de combinaciones
> 3.  Identificar y marcar casos imposibles
> 4.  Validar consistencia de acciones
> 5.  Usar notación consistente (T/F, Y/N, S/N)

### Validación de la Tabla

#### Preguntas Clave

1. ¿Están todas las combinaciones posibles?
2. ¿Son todas las combinaciones válidas?
3. ¿Son las acciones consistentes?
4. ¿Hay casos redundantes?

#### Lista de Verificación

```
✓ Todas las condiciones definidas
✓ Todas las acciones identificadas
✓ Combinaciones completas
✓ Casos imposibles marcados
✓ Notación consistente
```

## 📋 Enunciado

La siguiente tabla de decisión fue desarrollada por un estudiante (Estudiante A) del curso de Testing:

**Tabla Estudiante A:**

| **Condiciones** | **T1** | **T2** |
| --------------- | ------ | ------ |
| Speed > 50      | T      | F      |
| School Zone     | T      | F      |
| **Actions**     |        |        |
| $250 Multa      | F      | F      |
| Cárcel          | T      | F      |
|                 |        |        |
|                 |        |        |

Otro estudiante (Estudiante B) consideró los siguientes casos:

**Tabla Estudiante B:**

| **Condiciones** | **T1** | **T2** | **T3** | **T4** |
| --------------- | ------ | ------ | ------ | ------ |
| Speed > 50      | 55     | 44     | 66     | 77     |
| School Zone     | T      | T      | T      | F      |
| **Actions**     |        |        |        |        |
| $250 de Multa   | F      | F      | F      | T      |
| Cárcel          | T      | F      | T      | F      |

Como puede ver la tabla del estudiante A está incompleta (le faltan 2 test), entonces el estudiante A quiere copiar algunos test del estudiante B antes de que el tiempo del examen acabe y canvas se cierre.

¿Qué par de tests el estudiante A debería copiar de la tabla del estudiante B para completar su tabla de decisión?

## 🔍 Solución

Los tests T2 y T4 del estudiante B son los más apropiados para completar la tabla del estudiante A.

**Justificación:**

1. La tabla A ya tiene:

   - Un caso donde Speed > 50 y School Zone son True (T1)
   - Un caso donde Speed > 50 y School Zone son False (T2)

2. Los tests T2 y T4 del estudiante B aportan:
   - T2: Speed <= 50 (44) y School Zone = True
   - T4: Speed > 50 (77) y School Zone = False

## 📚 Explicación

1. **Análisis de Cobertura:**
   - Se necesita cubrir todas las combinaciones posibles
   - Dos condiciones (Speed > 50 y School Zone) generan 4 combinaciones
   - La tabla A ya tiene 2 combinaciones
   - Faltan 2 combinaciones para completitud

> Comparación de Tests
>
> ```
> Tabla A (actual):
> T1: T,T → F,T
> T2: F,F → F,F
>
> Tabla B:
> T2: F,T → F,F (nueva combinación)
> T4: T,F → T,F (nueva combinación)
> ```

## 💡 Tips para el Examen

1. Identifica las condiciones y acciones
2. Analiza las combinaciones existentes
3. Busca combinaciones faltantes
4. Verifica que los tests seleccionados:
   - Cubran casos no existentes
   - Complementen la cobertura actual
5. Considera la independencia de los tests
