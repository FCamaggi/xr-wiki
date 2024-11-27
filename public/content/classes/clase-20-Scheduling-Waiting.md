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
