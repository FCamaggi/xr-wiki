# Clase 27: Control Estadístico de Procesos

## Introducción al Control Estadístico de Procesos

El **Control Estadístico de Procesos** (SPC, por sus siglas en inglés) es una metodología que utiliza herramientas estadísticas para monitorear y controlar un proceso. Su objetivo es asegurar que el proceso opere de manera eficiente, produciendo productos de calidad y minimizando la variación.

### Analogía

Imagina que estás horneando un pastel. Para asegurarte de que salga bien, necesitas controlar la temperatura del horno y el tiempo de cocción. Si no lo haces, el pastel puede quemarse o no cocinarse adecuadamente. De manera similar, el SPC ayuda a las empresas a controlar sus procesos para evitar defectos en los productos.

## 1. Principios del Control Estadístico de Procesos

### 1.1. Variación en los Procesos

Todos los procesos tienen variación, que puede ser clasificada en dos tipos:

- **Variación Natural**: Es la variación que ocurre de manera inherente en el proceso. Por ejemplo, pequeñas diferencias en el tamaño de las piezas producidas.
- **Variación Especial**: Es la variación que se debe a causas externas o inusuales. Por ejemplo, un cambio en la materia prima que afecta la calidad del producto.

### 1.2. Objetivo del SPC

El objetivo del SPC es identificar y controlar la variación en los procesos para mantenerlos dentro de límites aceptables. Esto se logra mediante el uso de gráficos de control.

## 2. Herramientas del Control Estadístico de Procesos

### 2.1. Gráficos de Control

Los gráficos de control son herramientas visuales que permiten monitorear el comportamiento de un proceso a lo largo del tiempo. Los dos tipos más comunes son:

- **Gráfico X-bar**: Utilizado para monitorear la media de un proceso.
- **Gráfico R**: Utilizado para monitorear la variabilidad del proceso.

#### Ejemplo de Gráfico de Control

Supongamos que una fábrica produce tornillos y toma muestras de 5 tornillos cada hora. Si la media de la longitud de los tornillos se encuentra dentro de los límites de control, el proceso está bajo control.

### 2.2. Límites de Control

Los límites de control se establecen a partir de datos históricos del proceso y se utilizan para determinar si el proceso está bajo control. Se calculan como:

$$
UCL = \bar{X} + z \cdot \sigma
$$

$$
LCL = \bar{X} - z \cdot \sigma
$$

Donde:

- $UCL$ = Límite de control superior
- $LCL$ = Límite de control inferior
- $\bar{X}$ = Media del proceso
- $z$ = Número de desviaciones estándar (usualmente 3)
- $\sigma$ = Desviación estándar del proceso

## 3. Proceso de Implementación del SPC

### 3.1. Identificación de Atributos a Controlar

El primer paso es identificar qué características del proceso se van a monitorear. Por ejemplo, en una línea de producción de botellas, se podría controlar el volumen de líquido en cada botella.

### 3.2. Recolección de Datos

Se deben recolectar datos de manera sistemática para poder analizarlos. Esto puede incluir la medición de dimensiones, pesos, o cualquier otra característica relevante.

### 3.3. Análisis de Datos

Una vez recolectados los datos, se analizan utilizando gráficos de control para identificar tendencias o patrones que indiquen que el proceso está fuera de control.

## 4. Ejemplo Práctico

### Caso de una Fábrica de Botellas

Supongamos que una fábrica de botellas de vidrio quiere controlar el peso de las botellas producidas. Se toman muestras de 10 botellas cada hora y se registra el peso.

1. **Recolección de Datos**: Se obtienen los siguientes pesos (en gramos): 250, 252, 251, 249, 253, 250, 251, 252, 250, 251.
2. **Cálculo de la Media y Desviación Estándar**:
   - Media ($\bar{X}$):
     $$
     \bar{X} = \frac{250 + 252 + 251 + 249 + 253 + 250 + 251 + 252 + 250 + 251}{10} = 250.2
     $$
   - Desviación Estándar ($\sigma$):
     $$
     \sigma = \sqrt{\frac{\sum (x_i - \bar{X})^2}{n-1}} \approx 1.2
     $$
3. **Cálculo de Límites de Control**:
   - Límite Superior ($UCL$):
     $$
     UCL = 250.2 + 3 \cdot 1.2 \approx 253.8
     $$
   - Límite Inferior ($LCL$):
     $$
     LCL = 250.2 - 3 \cdot 1.2 \approx 246.6
     $$

## 5. Conclusión

El Control Estadístico de Procesos es una herramienta poderosa para asegurar la calidad en la producción. Al monitorear y controlar la variación en los procesos, las empresas pueden mejorar la calidad de sus productos y aumentar la satisfacción del cliente.

## 6. Resumen de Fórmulas

- **Límites de Control**:
  $$
  UCL = \bar{X} + z \cdot \sigma
  $$
  $$
  LCL = \bar{X} - z \cdot \sigma
  $$
