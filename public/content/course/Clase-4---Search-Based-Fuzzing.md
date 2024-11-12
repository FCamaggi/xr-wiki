# Fuzzing Basado en Búsqueda: Una Guía Simple

## ¿Qué es el Fuzzing Basado en Búsqueda?

Imagina que estás buscando un tesoro en un gran campo. En lugar de cavar al azar, sería más eficiente tener alguna pista o señal que te indique si te estás acercando al tesoro. El fuzzing basado en búsqueda funciona de manera similar: en lugar de probar entradas aleatorias en un programa, utiliza "pistas" para encontrar las entradas que nos interesan.

## ¿Por qué es importante?

A veces no solo queremos probar un programa con datos aleatorios, sino que queremos encontrar entradas específicas que hagan que el programa se comporte de cierta manera. Por ejemplo, podríamos querer encontrar una entrada que haga que el programa tome un camino específico en su ejecución.

## ¿Cómo funciona?

### El concepto de "Fitness"

Para entender cómo funciona, pensemos en un juego de "frío-caliente":

- Cuando estás lejos del objetivo, te dicen "frío"
- Cuando te acercas, te dicen "tibio"
- Cuando estás muy cerca, te dicen "caliente"

En el fuzzing basado en búsqueda, usamos una "función de fitness" que hace algo similar: nos dice qué tan cerca estamos de encontrar la entrada que buscamos.

### Ejemplo Práctico

Imaginemos que queremos encontrar dos números x e y que cumplan la siguiente condición:

```python
x == 2 * (y + 1)
```

En lugar de probar números al azar, podemos:

1. Tomar un par de números inicial (por ejemplo, x=10, y=3)
2. Calcular qué tan lejos estamos de cumplir la condición
3. Probar números cercanos para ver si nos acercamos más
4. Repetir hasta encontrar números que cumplan la condición

## Métodos de Búsqueda

### 1. Escalador (Hill Climbing)

Es como subir una montaña en la niebla:

1. Miras a tu alrededor
2. Das un paso en la dirección que parece ir hacia arriba
3. Repites hasta llegar a la cima

### 2. Algoritmos Genéticos

Funcionan imitando la evolución natural:

1. Creas una "población" de posibles soluciones
2. Las mejores soluciones "sobreviven"
3. Las soluciones sobrevivientes se "reproducen" para crear nuevas soluciones
4. A veces ocurren "mutaciones" que introducen cambios aleatorios
5. El proceso se repite hasta encontrar una solución óptima

## Ejemplo Real: Decodificador CGI

Tomemos un ejemplo práctico: un programa que decodifica URLs. Queremos encontrar entradas que prueben diferentes partes del programa:

```python
def cgi_decode(s):
    # Convierte "+" en espacio
    # Convierte "%xx" en el carácter correspondiente
    # Por ejemplo: "Hello+World" -> "Hello World"
    #             "%41" -> "A"
```

En lugar de probar cadenas aleatorias, el fuzzing basado en búsqueda nos ayuda a encontrar:

- Cadenas que contengan "+"
- Cadenas que contengan secuencias "%xx" válidas
- Cadenas que prueben diferentes caminos en el programa

## Conclusiones

El fuzzing basado en búsqueda es como tener un mapa y una brújula cuando buscamos un tesoro, en lugar de buscar al azar. Nos ayuda a:

- Encontrar entradas específicas de manera más eficiente
- Probar partes específicas de un programa
- Descubrir problemas que serían difíciles de encontrar con pruebas aleatorias

Lo mejor es que estos conceptos se pueden aplicar a muchos tipos diferentes de programas y situaciones de prueba.
