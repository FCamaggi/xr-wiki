# Clase 3: Percepción en Realidad Extendida

## Objetivos de Aprendizaje

- Comprender la diferencia entre realidad objetiva y subjetiva
- Entender los procesos y modelos perceptuales fundamentales
- Conocer las diferentes modalidades perceptuales y su impacto en XR
- Analizar la percepción del espacio y tiempo en entornos virtuales
- Dominar los conceptos de estabilidad perceptiva y atención

## Visión General

La percepción humana es fundamental para el diseño de experiencias XR efectivas. Entender cómo nuestro cerebro procesa la información sensorial nos permite crear experiencias más inmersivas y naturales, evitando problemas de usabilidad y disconfort.

## Contenido Detallado

### Realidad Objetiva y Subjetiva

#### Principios Fundamentales

- La realidad es inherentemente subjetiva
- Las ilusiones perceptuales demuestran la naturaleza interpretativa de la percepción
- Tipos de ilusiones relevantes para XR:
  - Ilusión de Jastrow (ilusión que hace que dos figuras idénticas parezcan de diferente tamaño)
  - Ilusión de Hering (ilusión donde líneas rectas paralelas parecen curvarse debido a un patrón radiante)
  - Ilusión de Kanisza (percepción de contornos y formas que físicamente no existen)
  - Ilusión de Ponzo (ilusión donde líneas del mismo tamaño parecen diferentes debido a líneas convergentes)

#### Estímulos y Procesamiento

- **Estímulos Distales**: Objetos y eventos físicos reales en el entorno antes de ser procesados por nuestros sentidos
- **Estímulos Proximales**: Señales sensoriales que llegan directamente a nuestros receptores sensoriales
- **Procesamiento**:
  - Ascendente (bottom-up): Basado en estímulos próximos
  - Descendente (top-down): Basado en conocimiento y expectativas

### Modalidades Perceptuales

#### Sistema Visual

1. **Anatomía y Función**

   - Retina y procesamiento de fotones: La retina es una capa de tejido en la parte posterior del ojo que contiene células fotorreceptoras (conos y bastones). Estas células convierten la luz en señales eléctricas que el cerebro puede interpretar.
   - Conos: Son responsables de la visión en color y la percepción de detalles finos. Funcionan mejor en condiciones de buena iluminación y se concentran principalmente en la fóvea.
   - Bastones: Son más sensibles a la luz y permiten la visión en condiciones de baja iluminación. No detectan colores y están distribuidos principalmente en la periferia de la retina.
   - Fóvea y visión central: La fóvea es una pequeña área en el centro de la retina donde la densidad de conos es máxima, proporcionando la mayor agudeza visual y detalle.

2. **Características Visuales**

   - Campo visual vs campo de atención: El campo visual es el área que podemos ver sin mover los ojos, mientras que el campo de atención es la parte del campo visual en la que estamos enfocando nuestra atención.
   - Brillo y luminosidad: El brillo se refiere a la intensidad de la luz percibida, mientras que la luminosidad es la percepción subjetiva de la cantidad de luz.
   - Percepción del color: Es la capacidad de distinguir diferentes colores, basada en la activación de los conos en la retina 2.
   - Agudeza visual: Es la capacidad de ver detalles finos y distinguir objetos claramente.

3. **Movimientos Oculares**
   - Sacádicos: Movimientos rápidos y bruscos de los ojos que cambian el punto de fijación de un objeto a otro.
   - Fijaciones: Periodos en los que los ojos permanecen relativamente quietos y enfocados en un objeto.
   - Seguimiento suave: Movimientos oculares lentos y continuos que siguen un objeto en movimiento.
   - Vergencia: Movimientos de los ojos que ajustan la alineación para mantener la visión binocular cuando miramos objetos a diferentes distancias.
   - Reflejo vestíbulo-ocular: Un reflejo que estabiliza la imagen en la retina durante movimientos rápidos de la cabeza, manteniendo la visión clara.

#### Sistema Auditivo

1. **Propiedades del Sonido**

   - **Frecuencia y amplitud**:

     - La frecuencia (medida en Hz) determina el tono del sonido: frecuencias altas producen sonidos agudos, frecuencias bajas producen sonidos graves
     - La amplitud representa la magnitud de las variaciones de presión en una onda sonora, medida en decibelios (dB), y determina la intensidad del sonido
     - El rango de audición humana típicamente abarca frecuencias entre 20 Hz y 20,000 Hz

   - **Volumen y tono**:

     - El volumen es la percepción subjetiva de la intensidad del sonido, influenciada principalmente por la amplitud
     - El tono es la percepción de la altura del sonido determinada por su frecuencia
     - La percepción de volumen no es lineal respecto a la amplitud física (sigue una escala logarítmica)

   - **Umbrales auditivos**:
     - Umbral de audición: nivel mínimo detectable (aproximadamente 0 dB)
     - Umbral de dolor: nivel donde el sonido causa dolor (120-140 dB)
     - Umbral diferencial: mínima diferencia perceptible entre dos estímulos auditivos

2. **Procesamiento Binaural**

   - **Diferencias interaurales temporales (ITD)**:

     - Son las diferencias en el tiempo de llegada del sonido a cada oído
     - Particularmente efectivas para frecuencias bajas (menos de 1,500 Hz)
     - Las diferencias pueden ser tan pequeñas como 10 microsegundos pero aún detectables

   - **Localización espacial del sonido**:

     - Diferencias interaurales de intensidad (IID): variaciones en la intensidad del sonido entre ambos oídos
     - Efecto de sombra de la cabeza: la cabeza bloquea parcialmente las ondas sonoras creando diferencias de intensidad
     - Conos de confusión: áreas donde la localización espacial es ambigua debido a ITDs e IIDs similares

   - **Señales monoaurales**:
     - Filtrado del pabellón auricular que modifica el espectro según la dirección
     - Efectos HRTF (Head-Related Transfer Function): transformaciones acústicas específicas basadas en la anatomía individual
     - Claves espectrales que ayudan a discriminar entre fuentes delante/detrás y arriba/abajo

   #### Sistema Táctil

   1. **Tipos de Tacto**

      - **Tacto pasivo**:

        - Percepción táctil sin movimiento exploratorio voluntario
        - Ocurre cuando los estímulos entran en contacto con la piel estática
        - Menor precisión discriminativa que el tacto activo
        - Ejemplos: sentir una brisa en la piel o que alguien coloque un objeto en tu mano

      - **Tacto activo**:

        - Implica movimientos exploratorios intencionales
        - Integra información sensorial y motora
        - Permite una mejor discriminación de propiedades como contornos y texturas
        - Procedimientos exploratorios específicos para diferentes propiedades (presión para dureza, movimiento lateral para textura)

      - **Vibración**:

        - Detectada principalmente por los corpúsculos de Pacini y Meissner
        - Sensibilidad a diferentes frecuencias: 40-400 Hz (óptima alrededor de 250 Hz)
        - La amplitud mínima detectable varía según la frecuencia y ubicación corporal
        - Fundamental para el feedback háptico en dispositivos XR

      - **Textura**:
        - Percepción de patrones microscópicos y macroscópicos en superficies
        - Discriminación de rugosidad, dureza, pegajosidad y temperatura
        - Contribución dual de mecanorreceptores y termorreceptores
        - Las texturas percibidas influyen en respuestas emocionales y preferencias

   2. **Sistemas Involucrados**

      - **Sistema sensorial**:

        - Mecanorreceptores en la piel: Corpúsculos de Meissner (presión ligera), células de Merkel (presión sostenida), corpúsculos de Pacini (vibración), terminaciones de Ruffini (estiramiento)
        - Termorreceptores: detectan calor y frío
        - Nociceptores: responsables de la percepción del dolor
        - Densidad variable de receptores (mayor en dedos y labios, menor en espalda)

      - **Sistema motor**:

        - Controla movimientos exploratorios durante el tacto activo
        - Coordina la fuerza y precisión de manipulación
        - Ajusta movimientos basados en retroalimentación táctil
        - Bucle sensoriomotor que permite ajustes continuos durante la exploración

      - **Sistema cognitivo**:
        - Integración e interpretación de señales táctiles
        - Memoria háptica para reconocimiento de objetos
        - Atención selectiva a estímulos táctiles relevantes
        - Procesamiento multimodal que combina tacto con visión y audición

   #### Propiocepción y Equilibrio

   1. **Sistema vestibular**

      - Ubicado en el laberinto del oído interno, contiene:
        - Canales semicirculares (3 por oído): detectan aceleración angular y rotacional
        - Otolitos (utrículo y sáculo): detectan aceleración lineal y gravedad
      - Genera señales neuronales que se integran con información visual y propioceptiva
      - Fundamental para la estabilización de la mirada (reflejo vestíbulo-ocular)
      - Las discrepancias entre información vestibular y visual en XR pueden causar cinetosis

   2. **Detección de movimiento físico**

      - Receptores musculares (husos musculares): detectan estiramiento y longitud muscular
      - Órganos tendinosos de Golgi: monitorean tensión muscular
      - Receptores articulares: informan sobre posición y movimiento de articulaciones
      - Integración central de múltiples señales para construir un modelo del movimiento corporal

   3. **Orientación espacial**

      - Mapa corporal interno (esquema corporal)
      - Integración multimodal de información visual, vestibular y propioceptiva
      - Sistemas de referencia egocéntricos (centrados en el cuerpo) y alocéntricos (centrados en el entorno)
      - Actualización constante durante el movimiento (actualización de ruta)
      - Crucial para la navegación efectiva en entornos XR

   4. **Aceleración lineal y angular**
      - Aceleración lineal: detectada principalmente por los otolitos
      - Aceleración angular: detectada principalmente por los canales semicirculares
      - Umbrales de detección: aproximadamente 0.01 m/s² para aceleración lineal y 0.1°/s² para aceleración angular
      - El cerebro utiliza estas señales para distinguir movimiento propio vs. movimiento del entorno
      - En XR, la simulación inadecuada de estas aceleraciones puede causar discrepancias sensoriales

### Percepción del Espacio y Tiempo

#### Percepción Espacial

1. **Marcos de Referencia**

   - Criterios exocéntricos
   - Criterios egocéntricos
   - Espacio personal vs espacio de acción

2. **Señales de Profundidad**
   - Pictóricas (oclusión, perspectiva, etc.)
   - De movimiento (parallax)
   - Binoculares (estereopsis)
   - Oculomotoras (vergencia, acomodación)

#### Percepción Temporal

1. **Aspectos Temporales**

   - Presente subjetivo
   - Momentos perceptuales
   - Eventos y secuencias

2. **Factores que Afectan la Percepción Temporal**
   - Relojes biológicos
   - Relojes cognitivos
   - Atención y esfuerzo
   - Edad y experiencia

### Estabilidad Perceptiva y Atención

#### Constancias Perceptuales

- Constancia de tamaño (capacidad de percibir un objeto como del mismo tamaño independientemente de su distancia)
- Constancia de forma (habilidad de reconocer objetos como la misma forma desde diferentes ángulos)
- Constancia de posición (capacidad de mantener la orientación percibida de objetos a pesar del movimiento)
- Constancia de luminosidad y color (habilidad de percibir colores y brillos como constantes bajo diferentes condiciones de iluminación)

#### Adaptación

1. **Adaptación Sensorial**

   - Adaptación a la luz/oscuridad (ajuste de la sensibilidad visual a diferentes niveles de iluminación)
   - Adaptación táctil (disminución gradual de la sensibilidad al estímulo táctil continuo)
   - Adaptación auditiva (ajuste de la sensibilidad auditiva a diferentes niveles de sonido)

2. **Adaptación Perceptiva**
   - Adaptación dual (capacidad de mantener dos marcos de referencia perceptual simultáneos)
   - Adaptación de posición (ajuste a cambios en la orientación espacial)
   - Adaptación temporal (ajuste a diferentes patrones temporales de estímulos)

#### Atención

1. **Recursos y Limitaciones**

   - Capacidad perceptiva
   - Carga perceptiva
   - Efecto cóctel (capacidad de enfocarse en una conversación específica en un ambiente ruidoso con múltiples fuentes de sonido)
   - Ceguera por falta de atención

2. **Dirección de la Atención**
   - Mirada atencional
   - Captación atencional
   - Saliencia (característica que hace que un elemento destaque naturalmente sobre otros en la percepción)
   - Búsqueda visual

## Guías de Diseño para XR

### Principios Generales

1. **Coherencia Sensorial**

   - Mantener consistencia entre modalidades
   - Evitar conflictos sensoriales
   - Sincronización espacio-temporal

2. **Diseño Intuitivo**
   - Interfaces naturales
   - Modelos mentales simples
   - Asociaciones con experiencias previas

### Recomendaciones Específicas

#### Visuales

- Selección cuidadosa de colores
- Uso efectivo de señales de profundidad
- Consideración de la adaptación visual

#### Audio

- Implementación de audio espacial
- Uso de señales binaurales
- Sincronización audiovisual

#### Interacción

- Diseño para diferentes espacios de acción
- Consideración de la propiocepción
- Retroalimentación multimodal

## Recursos Adicionales

### Referencias Académicas

- Goldstein [2007] - Procesos perceptivos
- Estudios sobre ilusiones perceptuales
- Investigaciones sobre atención y cognición

### Herramientas y Técnicas

- Mapas de saliencia
- Técnicas de evaluación perceptual
- Métodos de medición de atención

## Notas Complementarias

- La percepción es fundamental para la presencia en XR
- Los conflictos perceptuales pueden causar malestar
- La adaptación perceptual puede mejorar la experiencia
- La atención debe guiarse cuidadosamente en XR
