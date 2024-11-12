# Pregunta 9: Tablas de Decisión y Análisis de Reglas

## 📖 Recordatorio Teórico

### Construcción de Tablas de Decisión

#### Elementos Básicos

```
1. Condiciones: Entradas o estados
2. Acciones: Resultados o salidas
3. Reglas: Combinaciones de condiciones
4. Valores: Típicamente T/F o Y/N
```

#### Estructura Estándar

| Condiciones | R1  | R2  | R3  | R4  |
| ----------- | --- | --- | --- | --- |
| Condición A | T   | T   | F   | F   |
| Condición B | T   | F   | T   | F   |
| Acción 1    | X   |     |     |     |
| Acción 2    |     | X   | X   |     |

### Técnicas de Análisis

#### 1. Análisis de Completitud

```python
def verificar_completitud(condiciones):
    combinaciones_posibles = 2 ** len(condiciones)
    combinaciones_actuales = len(set(reglas))
    return combinaciones_actuales == combinaciones_posibles
```

#### 2. Detección de Conflictos

```python
def detectar_conflictos(tabla):
    for regla1 in tabla.reglas:
        for regla2 in tabla.reglas:
            if (regla1.condiciones == regla2.condiciones and
                regla1.acciones != regla2.acciones):
                return True
    return False
```

### Optimización de Tablas

#### 1. Simplificación de Reglas

Original:

| A   | B   | Acción |
| --- | --- | ------ |
| T   | T   | X      |
| T   | F   | X      |

Simplificada:

| A   | B   | Acción |                        |
| --- | --- | ------ | ---------------------- |
| T   | \*  | X      | (\* = cualquier valor) |

#### 2. Identificación de Redundancias

```python
class Regla:
    def es_redundante(self, otra_regla):
        return (self.condiciones.subset(otra_regla.condiciones) and
                self.acciones == otra_regla.acciones)
```

### Validación de Reglas

#### 1. Verificación de Consistencia

```python
def verificar_consistencia(tabla):
    # Comprobar condiciones mutuamente excluyentes
    for regla in tabla.reglas:
        if regla.tiene_condiciones_contradictorias():
            return False
    return True
```

#### 2. Análisis de Cobertura

```python
def calcular_cobertura(tabla):
    casos_cubiertos = set()
    for regla in tabla.reglas:
        casos_cubiertos.update(regla.get_casos_cubiertos())
    return len(casos_cubiertos) / total_casos_posibles
```

### Aspectos Prácticos

#### 1. Definición de Reglas

```python
# Ejemplo de sistema de descuentos
class SistemaDescuentos:
    def calcular_descuento(self, edad, es_estudiante, monto):
        if edad > 60:
            return 0.34  # 34% descuento
        elif es_estudiante:
            return 0.50 if tiene_tarjeta_familiar else 0.10
        return 0.00
```

#### 2. Evaluación de Condiciones

```
Evaluación por Prioridad:
1. Verificar condiciones excluyentes
2. Aplicar reglas en orden
3. Manejar casos por defecto
```

> Errores Comunes
>
> - Omitir combinaciones válidas
> - No identificar reglas contradictorias
> - Ignorar casos especiales
> - Sobrecomplicar la tabla

> Mejores Prácticas
>
> 1.  Mantener la tabla simple y clara
> 2.  Verificar completitud
> 3.  Validar consistencia
> 4.  Documentar casos especiales
> 5.  Usar notación consistente

## 📋 Enunciado

Si tu tienes un tarjeta para personas de más de 60 años, tu obtienes un descuento del 34% en cualquier ticket que compres. Si tu estas viajando con un niño (menor a 16), tu puedes obtener un descuento del 50% por cualquier ticket si es que tienes una tarjeta familiar, de otra forma tienes un descuento de 10%. Solo puede tener un tipo de tarjeta.

- Crea una tabla de decision mostrando todas las combinaciones de descuentos, y los resultados en descuentos.
- Indica que combinaciones no son realistas.

## 🔍 Análisis Previo

Identificamos las condiciones y acciones:

**Condiciones:**

1. Tiene tarjeta senior (>60 años)
2. Viaja con niño (<16)
3. Tiene tarjeta familiar

**Acciones:**

1. Descuento 34%
2. Descuento 50%
3. Descuento 10%

## 📊 Solución

### Tabla de Decisión Expandida

| Condiciones      | R1  | R2  | R3  | R4  | R5  | R6  | R7  | R8  |
| ---------------- | --- | --- | --- | --- | --- | --- | --- | --- |
| Tarjeta Senior   | S   | S   | S   | S   | N   | N   | N   | N   |
| Viaja con niño   | S   | S   | N   | N   | S   | S   | N   | N   |
| Tarjeta Familiar | S   | N   | S   | N   | S   | N   | S   | N   |
| **Acciones**     |     |     |     |     |     |     |     |     |
| Descuento 34%    | X   | X   | X   | X   | -   | -   | -   | -   |
| Descuento 50%    | -   | -   | -   | -   | X   | -   | -   | -   |
| Descuento 10%    | -   | -   | -   | -   | -   | X   | -   | -   |

> Combinaciones No Realistas
>
> - R1: No puede tener tarjeta senior y familiar simultáneamente
> - R3: No puede tener tarjeta senior y familiar simultáneamente
> - R7: Tiene tarjeta familiar pero no viaja con niño

## 💡 Explicación

1. **Prioridades de Reglas:**

   - La tarjeta senior siempre da 34% independiente de otras condiciones
   - La tarjeta familiar da 50% solo si viaja con niño
   - Sin tarjeta familiar pero con niño = 10%

2. **Simplificación:**
   $$
   Descuento_{final} = \begin{cases}
   34\% & \text{si tiene tarjeta senior} \\
   50\% & \text{si tiene tarjeta familiar y niño} \\
   10\% & \text{si tiene niño sin tarjeta familiar} \\
   0\% & \text{en otro caso}
   \end{cases}
   $$

## 🎯 Tips para el Examen

- [i] Identifica todas las condiciones posibles
- [i] Usa 'S'/'N' o 'Y'/'N' consistentemente
- [i] Marca claramente las combinaciones no realistas
- [i] Verifica que las reglas sean mutuamente excluyentes
- [!] Recuerda que algunas combinaciones pueden ser imposibles
- [i] Las condiciones excluyentes reducen el número de reglas válidas

> Metodología
>
> 1.  Lista todas las condiciones
> 2.  Crea todas las combinaciones posibles
> 3.  Identifica reglas imposibles
> 4.  Asigna acciones a cada combinación válida
> 5.  Simplifica si es posible

> Errores Comunes
>
> - Olvidar condiciones mutuamente excluyentes
> - No identificar todas las combinaciones imposibles
> - No marcar claramente los descuentos aplicables

> Verificación
> Comprueba cada regla con un ejemplo:
>
> - R4: Senior sin niño → 34%
> - R6: Con niño sin tarjetas → 10%
> - R8: Sin condiciones → 0%
