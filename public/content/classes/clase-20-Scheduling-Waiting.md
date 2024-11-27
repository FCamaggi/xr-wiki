# Clase 20: Programación de Operaciones y Líneas de Espera

## Introducción a la Programación de Operaciones

La **Programación de Operaciones** es una disciplina que se encarga de planificar y organizar los recursos de una empresa para maximizar la eficiencia y cumplir con los plazos de entrega. Esto incluye la programación de talleres, personal, vehículos y proyectos.

### Analogía

Imagina que estás organizando un evento. Necesitas coordinar a los proveedores, el lugar, y el personal para asegurarte de que todo esté listo a tiempo. La programación de operaciones es similar, pero en un contexto empresarial.

## 1. ¿Qué es la Programación de Operaciones?

La programación de operaciones se refiere a la asignación de recursos y tareas en un entorno de producción. [Su objetivo es optimizar el uso de recursos, minimizar costos y cumplir con las fechas de entrega.](https://atlas.org/api/v1/files?documentId=a09823cc-9738-4414-83f9-d731e488417d)

### Ejemplo

En una fábrica de automóviles, la programación de operaciones determina qué vehículos se ensamblan en qué momento y en qué línea de producción, asegurando que se cumplan los plazos de entrega.

## 2. Problemas Comunes en la Programación

Algunos de los problemas más comunes en la programación de operaciones incluyen:

- **Programación de talleres de trabajo**: Asignar tareas a diferentes máquinas y trabajadores.
- **Programación de personal**: Determinar cuántos empleados se necesitan en cada turno.
- **Programación de vehículos**: Planificar las rutas y horarios de entrega.

## 3. Reglas de Secuenciamiento

Las reglas de secuenciamiento son criterios que se utilizan para decidir el orden en que se procesan los trabajos. Algunas de las más comunes son:

### 3.1. FIFO (First In, First Out)

Los trabajos se procesan en el orden en que llegan. Es como una fila en un banco: el primero en llegar es el primero en ser atendido.

### 3.2. SPT (Shortest Processing Time)

Los trabajos se ordenan según el tiempo de procesamiento. Se priorizan los trabajos que requieren menos tiempo.

### 3.3. EDD (Earliest Due Date)

Los trabajos se procesan según su fecha de entrega. Los trabajos con fechas más cercanas se realizan primero.

### Ejemplo de Reglas de Secuenciamiento

Supongamos que tenemos tres trabajos con los siguientes tiempos de procesamiento y fechas de entrega:

| Trabajo | Tiempo de Procesamiento | Fecha de Entrega |
| ------- | ----------------------- | ---------------- |
| A       | 3 horas                 | Día 5            |
| B       | 2 horas                 | Día 2            |
| C       | 1 hora                  | Día 4            |

- **FIFO**: Se procesarían en el orden A, B, C.
- **SPT**: Se procesarían en el orden C, B, A.
- **EDD**: Se procesarían en el orden B, C, A.

## 4. Líneas de Espera

Las **líneas de espera** son un fenómeno común en la programación de operaciones. Se refieren a la acumulación de trabajos que esperan ser procesados. La teoría de colas estudia cómo gestionar estas líneas para minimizar el tiempo de espera y mejorar el servicio.

### Ejemplo de Líneas de Espera

Imagina un restaurante donde los clientes forman una fila para ser atendidos. Si el restaurante tiene un solo mesero, los clientes tendrán que esperar. La gestión eficiente de esta línea es crucial para mantener la satisfacción del cliente.

## 5. Fórmulas Relevantes

### 5.1. Utilización de la Capacidad

La utilización de la capacidad se puede calcular como:

$$
\rho = \frac{\lambda}{\mu}
$$

Donde:

- $\lambda$ es la tasa de llegada (número de trabajos por unidad de tiempo).
- $\mu$ es la tasa de servicio (número de trabajos que se pueden procesar por unidad de tiempo).

### 5.2. Tiempo de Espera Promedio

El tiempo de espera promedio en una cola se puede calcular usando la Ley de Little:

$$
L = \lambda W
$$

Donde:

- $L$ es el número promedio de trabajos en el sistema.
- $W$ es el tiempo promedio que un trabajo pasa en el sistema.

## 6. Conclusión

La programación de operaciones y la gestión de líneas de espera son fundamentales para el éxito de cualquier empresa. Al aplicar las reglas de secuenciamiento adecuadas y gestionar eficientemente las colas, las empresas pueden mejorar su eficiencia y satisfacción del cliente.

## 7. Resumen de Fórmulas

- **Utilización de la Capacidad**:
  $$
  \rho = \frac{\lambda}{\mu}
  $$
- **Ley de Little**:
  $$
  L = \lambda W
  $$

# Clase 22: Planificación Agregada

## Introducción a la Planificación Agregada

La **Planificación Agregada** es un proceso crucial en la gestión de operaciones que busca equilibrar la oferta y la demanda a medio plazo, generalmente en un horizonte de 6 a 18 meses. Su objetivo es determinar la combinación óptima de recursos humanos, tasa de producción e inventario.

### Analogía

Imagina que estás organizando un viaje familiar. Necesitas planificar cuántas personas irán, qué transporte usarás y cuántas maletas llevarás. La planificación agregada en una empresa es similar: se trata de asegurarse de que todos los recursos estén disponibles para satisfacer la demanda futura.

## 1. Objetivos de la Planificación Agregada

Los principales objetivos de la planificación agregada son:
[Especificar la combinación óptima de recursos:](https://atlas.org/api/v1/files?documentId=b75b22e2-3a53-41ef-9e4b-5fd2ac4e21ca) Esto incluye el número de trabajadores, la tasa de producción y el inventario disponible.

- **Minimizar costos**: [Se busca reducir costos de inventario, costos de faltante y costos de mano de obra.](https://atlas.org/api/v1/files?documentId=b75b22e2-3a53-41ef-9e4b-5fd2ac4e21ca)
- **Satisfacer la demanda**: Asegurarse de que la producción esté alineada con las necesidades del mercado.

## 2. Opciones Basadas en la Demanda

### 2.1. Inventario de Productos Terminados

El uso de inventario permite absorber fluctuaciones en la demanda. Por ejemplo, si se anticipa un aumento en la demanda durante las festividades, se puede aumentar la producción antes de que llegue el pico.

### 2.2. Ajuste de Precios

Ajustar los precios puede influir en la demanda. Por ejemplo, ofrecer descuentos en productos durante períodos de baja demanda puede ayudar a mantener un flujo constante de ventas.

## 3. Opciones Basadas en la Capacidad

### 3.1. Uso de Horas Extras

El uso de horas extras es una opción a corto plazo para aumentar la producción. Esto implica pagar a los trabajadores un bono por trabajar más horas.

### 3.2. Subcontratación

La subcontratación permite a las empresas manejar picos de demanda sin tener que aumentar permanentemente su fuerza laboral. Por ejemplo, una empresa puede contratar a un proveedor externo para manejar un aumento temporal en la producción.

## 4. Tipos de Planes Agregados

### 4.1. Planes de Nivel

Los planes de nivel utilizan una fuerza laboral constante y producen cantidades similares cada período. Esto permite una producción estable, pero puede resultar en costos de inventario más altos.

### 4.2. Planes Ajustados (Chase)

Los planes ajustados buscan minimizar el inventario de productos terminados al sincronizar la producción con la demanda. Esto puede ser más eficiente, pero puede resultar en fluctuaciones en la fuerza laboral.

## 5. Costos en la Planificación Agregada

Los costos asociados con la planificación agregada incluyen:

- **Costos de inventario**: Gastos relacionados con el almacenamiento de productos.
- **Costos de faltante**: Pérdidas por no poder satisfacer la demanda.
- **Costos de sobretiempo**: Gastos adicionales por horas extras trabajadas.
- **Costos de subcontratación**: Gastos por contratar servicios externos.

## 6. Fórmulas Relevantes

### 6.1. Cálculo de Costos Totales

El costo total de un plan agregado se puede calcular como:

$$
CT = CI + CF + CO + CS
$$

Donde:

- $CT$ = Costo total
- $CI$ = Costos de inventario
- $CF$ = Costos de faltante
- $CO$ = Costos de sobretiempo
- $CS$ = Costos de subcontratación

### 6.2. Tasa de Producción

La tasa de producción necesaria para cumplir con la demanda se puede calcular como:

$$
TP = \frac{D}{P}
$$

Donde:

- $TP$ = Tasa de producción
- $D$ = Demanda total
- $P$ = Período de tiempo

## 7. Conclusión

La planificación agregada es esencial para la gestión eficiente de operaciones. Permite a las empresas anticipar la demanda, gestionar recursos y minimizar costos, asegurando que se satisfagan las necesidades del mercado de manera efectiva.

## 8. Resumen de Fórmulas

- **Costo Total**:
  $$
  CT = CI + CF + CO + CS
  $$
- **Tasa de Producción**:
  $$
  TP = \frac{D}{P}
  $$
