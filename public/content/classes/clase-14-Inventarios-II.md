# Clase 14: Control de Inventarios II

## Introducción a las Extensiones del Modelo Básico EOQ

El modelo de **Cantidad Económica de Pedido (EOQ)** es fundamental en la gestión de inventarios, pero en la práctica, las empresas enfrentan situaciones más complejas. Esta clase explora las extensiones del modelo EOQ para abordar diferentes escenarios, como lotes de producción, descuentos por cantidad y limitaciones de capacidad.

## 1. Supuestos del Modelo EOQ

El modelo EOQ se basa en varios supuestos clave:

- **Demanda constante**: Se asume que la demanda de productos es uniforme a lo largo del tiempo.
- **Lead time constante**: El tiempo de entrega de los pedidos es predecible.
- **Costo unitario constante**: El precio de los productos no varía.
- **Costos de inventario basados en promedios**: Los costos de mantener inventario se calculan en función de los niveles promedio.
- **Sin faltantes**: Se asume que toda la demanda se satisface sin interrupciones.

### Analogía

Imagina un restaurante que siempre tiene los ingredientes necesarios para preparar sus platos. Si la demanda de un platillo es constante y el proveedor entrega los ingredientes a tiempo, el restaurante puede operar sin problemas.

## 2. EOQ para Lotes de Producción (POQ)

El modelo de **Cantidad Económica de Pedido para Lotes de Producción (POQ)** se utiliza cuando un ítem se produce en varias etapas. A diferencia del modelo EOQ, donde los pedidos llegan de una sola vez, en el POQ, los pedidos se despachan a una tasa constante.

### Ejemplo Real

En una fábrica de muebles, la producción de sillas puede llevar tiempo. Si la tasa de producción es mayor que la demanda, la empresa puede producir un lote de sillas y almacenarlas hasta que se vendan.

### Fórmula del POQ

La cantidad óptima a ordenar en un modelo POQ se calcula como:

$$
Q^* = \sqrt{\frac{2DS}{H} \cdot \frac{p}{p-d}}
$$

Donde:

- $D$ = Demanda anual
- $S$ = Costo de setup
- $H$ = Costo de mantener inventario
- $p$ = Tasa de producción
- $d$ = Tasa de demanda

## 3. EOQ con Descuentos por Cantidad

Las empresas a menudo ofrecen descuentos por comprar en grandes cantidades. [El modelo EOQ se puede ajustar para considerar estos descuentos, lo que puede influir en la cantidad óptima a ordenar.](https://atlas.org/api/v1/files?documentId=10ef7bfb-4e33-4720-8493-c1d62f4ab78c)

### Ejemplo de Descuentos

Supongamos que una empresa vende un producto a diferentes precios según la cantidad comprada:

- 0 a 2,499 unidades:$1.20 por unidad
- 2,500 a 3,999 unidades:$1.00 por unidad
- 4,000 o más:$0.98 por unidad

### Cálculo de la Cantidad Óptima

Para determinar la cantidad óptima a ordenar, se deben calcular los costos totales para cada rango de precios y seleccionar el que minimice los costos. Por ejemplo, si la demanda anual es de 10,000 unidades y el costo de setup es de$4, se calcularían los costos totales para cada intervalo.

### Fórmulas de Costo Total

Los costos totales se pueden calcular como:

$$
TC = \frac{D}{Q}S + \frac{Q}{2}H + DC
$$

Donde:

- $TC$ = Costo total
- $D$ = Demanda anual
- $Q$ = Cantidad a ordenar
- $S$ = Costo de setup
- $H$ = Costo de mantener inventario
- $C$ = Costo por unidad

## 4. Inventarios Bajo Incertidumbre

La gestión de inventarios también debe considerar la incertidumbre en la demanda y el tiempo de reposición. Para manejar esta incertidumbre, se puede establecer un **stock de seguridad**.

### Ejemplo de Stock de Seguridad

Si una empresa de distribución de alimentos sabe que la demanda diaria de un producto tiene una variabilidad, puede mantener un stock de seguridad para asegurarse de que siempre haya suficiente producto disponible.

### Cálculo del Nivel de Reorden

El nivel de reorden se puede calcular considerando la probabilidad de satisfacer la demanda durante el tiempo de reposición:

$$
R = d \cdot L + Z \cdot \sigma_L
$$

Donde:

- $R$ = Nivel de reorden
- $d$ = Tasa de demanda
- $L$ = Tiempo de reposición
- $Z$ = Valor Z correspondiente al nivel de servicio deseado
- $\sigma_L$ = Desviación estándar de la demanda durante el tiempo de reposición

## 5. Conclusión

Las extensiones del modelo EOQ permiten a las empresas adaptarse a situaciones más complejas en la gestión de inventarios. [Al considerar factores como lotes de producción, descuentos por cantidad y la incertidumbre en la demanda, las organizaciones pueden optimizar su control de inventarios y mejorar su eficiencia operativa.](https://atlas.org/api/v1/files?documentId=10ef7bfb-4e33-4720-8493-c1d62f4ab78c)

## 6. Fórmulas Relevantes

- **Cantidad Óptima en POQ**:
  $$
   Q^* = \sqrt{\frac{2DS}{H} \cdot \frac{p}{p-d}}
  $$
- **Costo Total con Descuentos**:
  $$
   TC = \frac{D}{Q}S + \frac{Q}{2}H + DC
  $$
- **Nivel de Reorden**:
  $$
   R = d \cdot L + Z \cdot \sigma_L
  $$
