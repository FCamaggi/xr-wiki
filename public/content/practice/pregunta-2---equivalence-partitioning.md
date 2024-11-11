# Pregunta 2 - Equivalence Partitioning

## 📖 Recordatorio Teórico

### Equivalence Partitioning: Fundamentos

El particionamiento de equivalencia es una técnica de diseño de casos de prueba que:

- Divide el dominio de entrada en grupos donde el programa se comporta de manera similar
- Reduce el número total de casos de prueba necesarios
- Mantiene la efectividad del testing
- Se basa en la premisa de que si un caso falla, otros en la misma partición probablemente también fallarán

### Principios Clave:

1. **Particiones Válidas e Inválidas**

   ```
   Ejemplo: Edad para una licencia de conducir
   Particiones Válidas:    [16-120]
   Particiones Inválidas:  [-∞,15] y [121,∞]
   ```

2. **Características de una Buena Partición**
   - Mutuamente excluyentes (no hay solapamiento)
   - Colectivamente exhaustivas (cubren todo el dominio)
   - Comportamiento homogéneo dentro de cada partición
   - Límites claramente definidos

### Proceso de Aplicación:

1. **Identificar Variables**

   ```python
   # Ejemplo: Calificación de estudiantes
   def asignar_nota(puntaje):
       if 90 <= puntaje <= 100:
           return 'A'
       elif 80 <= puntaje < 90:
           return 'B'
       elif puntaje < 0 or puntaje > 100:
           raise ValueError("Puntaje inválido")
   ```

2. **Determinar Particiones**

   ```
   Particiones Válidas:
   - P1: [90-100] → 'A'
   - P2: [80-89]  → 'B'

   Particiones Inválidas:
   - P3: [-∞,0)   → Error
   - P4: (100,∞]  → Error
   ```

3. **Seleccionar Valores de Prueba**
   ```python
   # Valores representativos
   test_values = {
       'P1': 95,    # Representante de [90-100]
       'P2': 85,    # Representante de [80-89]
       'P3': -1,    # Representante de valores negativos
       'P4': 101    # Representante de valores > 100
   }
   ```

### Tipos de Particiones:

1. **Particiones de Rango**

   ```
   Ejemplo: Descuentos por edad
   0-12:    Gratis
   13-17:   50% descuento
   18-64:   Precio completo
   65+:     30% descuento
   ```

2. **Particiones de Estado**

   ```
   Ejemplo: Estado de usuario
   - No registrado
   - Registrado
   - Verificado
   - Premium
   ```

3. **Particiones de Tipo**
   ```
   Ejemplo: Tipos de archivo
   - Imágenes (.jpg, .png, .gif)
   - Documentos (.pdf, .doc)
   - Ejecutables (.exe, .bat)
   ```

### Combinación con Otras Técnicas:

1. **Boundary Value Analysis**

   ```
   Para la partición [80-89]:
   Valores límite: 80, 89
   Valores cerca del límite: 79, 81, 88, 90
   ```

2. **Decision Table Testing**
   ```
   Combinar particiones con condiciones:
   Edad | Membresía | Descuento
   -----+-----------+----------
   65+  | Premium   | 40%
   65+  | Regular   | 30%
   ```

### Mejores Prácticas:

1. **Documentación Clara**

   ```python
   # Documentar particiones y razón
   """
   Particiones:
   P1: [90-100] - Excelente desempeño
   P2: [80-89]  - Buen desempeño
   P3: [-∞,0)   - Valores inválidos negativos
   P4: (100,∞]  - Valores inválidos superiores
   """
   ```

2. **Validación de Cobertura**
   - Asegurar al menos un caso por partición
   - Considerar casos especiales
   - Verificar cobertura de particiones inválidas

> Errores Comunes
>
> - Olvidar particiones inválidas
> - No definir claramente los límites
> - Crear particiones solapadas
> - Ignorar casos especiales (null, vacío, etc.)
> - Asumir comportamiento homogéneo incorrectamente

> Recomendaciones
>
> 1.  Comenzar identificando todas las variables de entrada
> 2.  Definir claramente los límites de cada partición
> 3.  Incluir siempre particiones inválidas
> 4.  Documentar la razón de cada partición
> 5.  Validar que no haya huecos entre particiones

## 📋 Enunciado

Estás probando un formulario que permite subir un número, el mismo controla que sea solo posible ingresar números positivos >= 1. No tiene ningún otro tipo de control. El sistema basado en las notas obtenidas el sistema asigna las calificaciones como sigue:

- 1-49 = F
- 50-59 = E
- 60-69 = D
- 70-79 = C
- 80-89 = B
- 90-100 = A

¿Cuántos casos de pruebas necesarias para cubrir todas las particiones? Explique su respuesta.

## 🔍 Solución

Se necesitan 8 casos de prueba para cubrir todas las particiones posibles:

**Particiones válidas (6):**

1. Calificación F: 1-49
2. Calificación E: 50-59
3. Calificación D: 60-69
4. Calificación C: 70-79
5. Calificación B: 80-89
6. Calificación A: 90-100

**Particiones inválidas (2):** 7. Números < 1 8. Números > 100

> Casos de Prueba Representativos
> **Valores válidos:**
>
> - F: 25 (1-49)
> - E: 55 (50-59)
> - D: 65 (60-69)
> - C: 75 (70-79)
> - B: 85 (80-89)
> - A: 95 (90-100)
>
> **Valores inválidos:**
>
> - Menor: 0 (< 1)
> - Mayor: 101 (> 100)

## 📚 Explicación

1. La técnica de equivalence partitioning busca dividir el dominio de entrada en grupos que deberían comportarse de manera similar

2. Identificamos dos tipos principales de particiones:

   - Particiones válidas: los 6 rangos de calificaciones
   - Particiones inválidas: valores fuera del rango permitido

3. Cada partición representa un comportamiento diferente del sistema:
   - Asignación de una calificación específica (válidas)
   - Rechazo de la entrada (inválidas)

> Tips para Equivalence Partitioning
>
> 1.  Identifica los límites del dominio (1 y 100)
> 2.  Define las particiones válidas e inválidas
> 3.  Selecciona un valor representativo por partición
> 4.  Verifica que no haya huecos entre particiones
> 5.  Asegura que las particiones sean mutuamente excluyentes

## 💡 Tips para el Examen

1. Dibuja una línea numérica para visualizar mejor las particiones
2. No confundas equivalence partitioning con boundary testing
3. No olvides las particiones inválidas
4. Justifica por qué eliges cada partición
5. Verifica que cubres todo el dominio de entrada
