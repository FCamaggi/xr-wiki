# Clase 12b: Evaluación en XR

## Objetivos de Aprendizaje

- Comprender los fundamentos del entrenamiento perceptivo en XR
- Identificar las recomendaciones clave para desarrolladores de XR
- Conocer las causas y síntomas del malestar en XR
- Dominar las técnicas de evaluación y medición en sistemas XR

---

## Visión General

La evaluación en XR implica el análisis sistemático de experiencias inmersivas para garantizar su calidad, comodidad y efectividad. Esto incluye la identificación de problemas técnicos, la optimización de la interacción y la minimización de efectos adversos como el mareo o la fatiga visual. El entrenamiento perceptivo juega un papel crucial en la capacidad de los usuarios para detectar errores y adaptarse a entornos virtuales.

---

## Contenido Detallado

### Entrenamiento Perceptivo

#### Definición y Ejemplos

1. **Concepto**
   - Adaptación de los sistemas perceptivos mediante la exposición repetida y guiada a sistemas y experiencias XR.
   - Ejemplos:
     - Especialistas médicos detectando anomalías en imágenes.
     - Audiófilos identificando defectos en la reproducción de audio.

2. **Mecanismos Básicos**
   - Ponderación atencional.
   - Impronta de estímulos.
   - Diferenciación.
   - Unitización.

---

### Problemas Técnicos y Soluciones

#### Problemas de Estereofonía y Movimiento

1. **Errores de Movimiento**
   - Detectar errores en rotaciones básicas mediante movimientos canónicos de la cabeza.
   - Práctica con diferentes velocidades angulares y amplitudes constantes.

2. **Problemas Periféricos**
   - Distorsión periférica menos perceptible al mirar a través del centro de la lente.
   - Girar los ojos hacia el borde de la lente para revelar problemas de enfoque.

3. **Percepción de Latencia**
   - Detectar latencia mediante movimientos rápidos de la cabeza frente a un borde vertical.
   - Observar si el borde parece moverse fuera de fase con la cabeza.

---

### Recomendaciones para Desarrolladores

#### Mundos Virtuales

1. **Diseño General**
   - Establecer unidades virtuales que coincidan con el mundo real.
   - Modelar objetos completamente para evitar fallos visuales.
   - Minimizar locomoción (e.g., usar ascensores en lugar de escaleras).

2. **Renderización Visual**
   - Mantener consistencia entre vistas izquierda y derecha.
   - Evitar elementos fijos en la pantalla; todo debe parecer incrustado en el mundo virtual.
   - Optimizar velocidad de fotogramas (e.g., 90 FPS para Oculus Rift).

3. **Tracking y Zona Coincidente**
   - Evitar congelación o retraso en el seguimiento de la cabeza.
   - Considerar obstáculos físicos y advertir al usuario cuando se acerque a ellos.

4. **Interacción**
   - Proporcionar poderes sobrehumanos en lugar de replicar la realidad.
   - Minimizar movimiento físico en interacciones virtuales.

5. **Interfaces de Usuario**
   - Representar menús flotantes a una distancia mínima de dos metros.
   - Centrar pantallas virtuales con un campo de visión reducido.

6. **Audio**
   - Usar altavoces externos o auriculares con seguimiento para localización precisa del sonido.
   - Considerar efectos Doppler para señales de movimiento.

---

### Uso de Avatares

1. **Aspecto Propio**
   - Mostrar un cuerpo virtual simple mejora la sensación de presencia.
   - Evitar diferencias inesperadas entre el cuerpo virtual y real.
   - La apariencia del avatar influye en el comportamiento social.

---

### Comodidad y Malestar en XR

#### Síntomas Comunes

1. **Variantes de la Cinetosis**
   - Mareos y náuseas.
   - Somnolencia y fatiga visual.
   - Dolor de cabeza y cansancio.

2. **Causas de los Síntomas**
   - Analizar grupos pequeños con baja variabilidad.
   - Encontrar correlaciones estadísticas antes, durante y después de la exposición.

3. **Niveles de Evaluación**
   - Intensidad del síntoma.
   - Velocidad de aparición y disminución.
   - Porcentaje de usuarios afectados.

---

### Métodos de Evaluación

#### Cuestionarios

1. **Cuestionario sobre Enfermedad en el Simulador (SSQ)**
   - Escala de cuatro puntos para 16 síntomas estándar.
   - Administrar varias veces durante la experiencia.

2. **Limitaciones**
   - Respuestas subjetivas.
   - Interrupción de la experiencia.
   - Sesgo al prestar atención a los síntomas.

---

#### Mediciones Fisiológicas

1. **Técnicas**
   - Electrocardiograma (ECG).
   - Electrogastrograma (EGG).
   - Fotopletismograma (PPG).
   - Respuesta galvánica de la piel (GSR).

2. **Ventajas**
   - Datos objetivos.
   - Monitoreo continuo sin interrupción.

---

### Experimentos en Humanos

#### Método Científico

1. **Pasos**
   - Aprender de la literatura.
   - Diseñar e implementar métodos.
   - Formular hipótesis.
   - Diseñar experimentos.
   - Analizar datos y generar conclusiones.

2. **Consideraciones Éticas**
   - Evitar riesgos para la salud o privacidad.
   - Obtener aprobación de comités éticos cuando sea necesario.

3. **Variables**
   - Dependientes: medidas para probar hipótesis.
   - Independientes: condiciones manipuladas por el investigador.
   - Control: variables fijas para reducir varianza.

---

### Futuro de XR

#### Fronteras Tecnológicas

1. **Interfaces Sensoriales**
   - Tacto y propiocepción: dispositivos táctiles, matrices de pines.
   - Olfato y gusto: visores olfativos, piruletas digitales.
   - Interfaces cerebro-máquina: EEG inalámbrico.

2. **Normas y Código Abierto**
   - Estándares abiertos (e.g., OpenGL, OpenCL).
   - Organizaciones sin ánimo de lucro (e.g., Grupo Khronos).

3. **Hardware**
   - HMDs más ligeros y con campos de visión amplios.
   - Guantes de VR y control de mano a bajo costo.

---

### Notas Complementarias

- El entrenamiento perceptivo es esencial para evaluar la calidad de las experiencias XR.
- Las recomendaciones para desarrolladores abarcan diseño, renderización, tracking e interacción.
- Los cuestionarios y mediciones fisiológicas son herramientas clave para evaluar el malestar en XR.
- Los experimentos en humanos requieren un enfoque ético y riguroso.
- El futuro de XR incluye avances en interfaces sensoriales, hardware y estándares abiertos.
