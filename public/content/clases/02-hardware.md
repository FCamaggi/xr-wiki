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

  - Motion parallax (cambio aparente en la posición relativa de objetos cuando el observador se mueve)
  - Oclusión (cuando un objeto bloquea parcialmente la vista de otro, indicando que está más cerca)
  - Perspectiva (convergencia de líneas paralelas en el horizonte)
  - Tamaño de objetos (objetos similares parecen más pequeños a mayor distancia)
  - Perspectiva aérea (objetos distantes parecen más difusos y azulados)

- **Señales de Profundidad 3D (Binoculares)**
  - Estereopsis (percepción de profundidad basada en las diferencias entre las imágenes que recibe cada ojo)
  - Convergencia (movimiento coordinado de los ojos hacia adentro para enfocar objetos cercanos)
  - Acomodación (ajuste del cristalino para enfocar objetos a diferentes distancias)

#### Técnicas de Renderizado

- **Parallax**
  - Parallax cero (objeto aparece exactamente en el plano de la pantalla o proyección)
  - Parallax positivo (objeto aparece detrás del plano, creando sensación de profundidad)
  - Parallax negativo (objeto aparece flotando frente al plano de proyección)
  - Parallax divergente (separación excesiva entre imágenes que causa incomodidad visual - debe evitarse)

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
  - Tracking: 6DoF (6 Grados de Libertad: capacidad de movimiento en tres ejes de rotación y tres de traslación)
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
       - Eye tracking (seguimiento del movimiento de los ojos en tiempo real) y renderizado foveado (técnica que optimiza el renderizado proporcionando mayor detalle donde el usuario está mirando)
       - Resolución variable (centro vs periferia)

3. **Distorsión Óptica**
   - Compensación mediante pre-distorsión (corrección de distorsiones ópticas aplicada a la imagen antes de su visualización)
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
- Tracking corporal (tracking esqueletal: seguimiento en tiempo real de las articulaciones y movimientos del cuerpo humano)
- Eye tracking

#### Dispositivos Hápticos

- Guantes con feedback
- Controladores con vibración
- Exoesqueletos
- Sistemas de force feedback (dispositivos que proporcionan retroalimentación física de fuerza al usuario)

#### Interfaces Naturales

- Reconocimiento gestual
- Tracking de manos
- Interacción por voz
- Seguimiento corporal completo

## Conceptos Técnicos

### Definiciones Clave

#### Términos Oculomotores

- **Sacádicos**: Movimientos rápidos y coordinados de los ojos entre puntos de fijación
- **Vergencia**: Movimiento coordinado de ambos ojos para enfocar objetos a diferentes distancias
- **Reflejo vestíbulo-ocular**: Mecanismo que estabiliza la mirada durante los movimientos de la cabeza

#### Términos de Tracking

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
