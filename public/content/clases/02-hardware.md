# Clase 2: Hardware en Realidad Extendida

## Objetivos de Aprendizaje

- Comprender los principios de la renderización estéreo
- Conocer los diferentes tipos de dispositivos de salida visual en VR/AR
- Entender las diferencias entre sistemas ópticos y de video translúcido en AR
- Familiarizarse con los sistemas de entrada en XR

## Visión General

El hardware en XR abarca una amplia gama de dispositivos y tecnologías que permiten la creación de experiencias inmersivas. Desde la renderización estéreo hasta los dispositivos de entrada, cada componente juega un papel crucial en la calidad y efectividad de la experiencia XR.

## Contenido Detallado

### Renderización Estéreo

#### Principios de la Visión 3D

- **Señales de Profundidad 2D (Monoculares)**

  - Motion parallax
  - Oclusión
  - Perspectiva
  - Tamaño de objetos
  - Perspectiva aérea

- **Señales de Profundidad 3D (Binoculares)**
  - Estereopsis (disparidad retinal)
  - Convergencia

#### Técnicas de Renderizado

- **Parallax**
  - Parallax cero (objeto en el plano de proyección)
  - Parallax positivo (objeto detrás del plano)
  - Parallax negativo (objeto frente al plano)
  - Parallax divergente (evitar - antinatural)

#### Parámetros Críticos

- Distancia interpupilar (IPD)
- Apertura de la cámara (45-60 grados)
- Distancia focal (~30 \* IPD)
- Restricciones de proximidad (objetos no más cerca de 1/2 de la distancia focal)

### Dispositivos de Salida Visual

#### Head-Mounted Displays (HMDs)

##### Meta Quest 3

- Especificaciones Técnicas:
  - Resolución: 2064x2208 píxeles por ojo
  - Campo de visión: 110°H 97°V
  - Tasa de refresco: 120 Hz
  - Peso: 515 gr
  - Tracking: 6DoF
  - Procesador: Snapdragon XR2 Gen 2
  - RAM: 8GB
  - Batería: 4879 mAh (2.2 horas de uso)

##### Desafíos Principales

1. **Latencia**

   - Objetivo: 10-25 ms de latencia total
   - Factores:
     - Medición del movimiento
     - Actualización de posición
     - Renderizado
     - Transferencia de imagen
     - Visualización

2. **Alta Resolución**

   - Campo de visión humano: ~160° por ojo
   - Necesidades para calidad Retina:
     - 16K x 16K por ojo para FOV completo
     - Soluciones:
       - Eye tracking y renderizado foveado
       - Resolución variable (centro vs periferia)

3. **Distorsión Óptica**
   - Compensación mediante pre-distorsión
   - Corrección de aberración cromática

#### Sistemas de AR

##### Visores Ópticos Transparentes

- Ventajas:

  - Vista directa del mundo real
  - Sin latencia en la visión real
  - Mayor resolución del mundo real

- Desventajas:
  - Solo puede añadir luz
  - Limitaciones en oclusión
  - Campo de visión limitado

##### Visores de Video Transparente

- Ventajas:

  - Control total sobre la imagen final
  - Mejor registro real-virtual
  - Capacidad de oclusión

- Desventajas:
  - Latencia en toda la visión
  - Resolución limitada del mundo real
  - Dependencia de la cámara

##### AR Espacial (Proyectiva)

- Características:
  - Proyección directa sobre objetos reales
  - No requiere dispositivos de visualización personal
  - Permite experiencias compartidas

### Sistemas de Entrada

#### Tracking

- Seguimiento de cabeza
- Controladores de movimiento
- Tracking corporal
- Eye tracking

#### Dispositivos Hápticos

- Guantes con feedback
- Controladores con vibración
- Exoesqueletos
- Sistemas de force feedback

#### Interfaces Naturales

- Reconocimiento gestual
- Tracking de manos
- Interacción por voz
- Seguimiento corporal completo

## Conceptos Técnicos

### Definiciones Clave

- **IPD (Distancia Interpupilar)**: Separación entre los centros de las pupilas
- **FOV (Campo de Visión)**: Ángulo del espacio visible a través del dispositivo
- **DoF (Grados de Libertad)**: Número de dimensiones en las que se puede mover/rotar un objeto
- **Latencia**: Tiempo entre una acción y su efecto visible

### Aspectos Técnicos Críticos

- **Calibración**:

  - Ajuste de IPD
  - Alineación de displays
  - Corrección de distorsión

- **Optimización**:
  - Reducción de latencia
  - Compensación de movimiento
  - Técnicas anti-mareo

## Implementación Práctica

### Consideraciones de Diseño

- Equilibrio entre resolución y FOV
- Gestión de latencia
- Ergonomía y comodidad
- Consumo de energía

### Mejores Prácticas

- Calibración regular de dispositivos
- Optimización de render pipeline
- Gestión térmica
- Consideraciones de higiene

## Recursos Adicionales

### Referencias Académicas

- Papers sobre técnicas de renderizado estéreo
- Estudios sobre latencia y percepción
- Investigaciones sobre sistemas hápticos

### Recursos Online

- Documentación técnica de fabricantes
- Guías de desarrollo para plataformas específicas
- Comunidades de desarrolladores XR

## Notas Complementarias

- La tecnología XR continúa evolucionando rápidamente
- El equilibrio entre diferentes factores es crucial
- La experiencia del usuario debe ser siempre la prioridad
- Importancia de considerar las limitaciones actuales del hardware
