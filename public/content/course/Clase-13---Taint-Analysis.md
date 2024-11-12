# Análisis de Contaminación (Taint Analysis): Una Guía Simple

## Introducción

Imagina que tienes una botella de agua limpia (datos confiables) y otra botella con agua que no sabes si es potable (datos no confiables). Si mezclas un poco del agua no confiable con la limpia, toda el agua se vuelve potencialmente peligrosa. El análisis de contaminación en programación funciona de manera similar: rastrea cómo los datos "no confiables" pueden contaminar los datos "limpios".

## ¿Por qué es importante?

Pensemos en un sitio web bancario:

- Los datos que vienen del banco son confiables
- Los datos que ingresan los usuarios son potencialmente peligrosos
- No queremos que los datos no confiables se usen en operaciones sensibles

## Cómo funciona: Un ejemplo práctico

### La Base de Datos Vulnerable

El documento muestra una base de datos simple que almacena información sobre vehículos:

```python
INVENTORY = """
1997,van,Ford,E350
2000,car,Mercury,Cougar
1999,car,Chevy,Venture
"""
```

El problema es que esta base de datos acepta cualquier comando SQL sin verificar si es seguro. Es como dejar que cualquier persona entre a tu casa sin revisar quién es.

### La Solución: Strings Contaminados

Para resolver esto, se crea una nueva clase llamada `tstr` (tainted string o cadena contaminada) que funciona así:

1. Cada string tiene una etiqueta de "contaminación":

   - TRUSTED (confiable)
   - UNTRUSTED (no confiable)
   - Otros niveles según se necesite

2. Cuando se manipula el string, la contaminación se propaga:

```python
# Ejemplo
texto_no_confiable = tstr("Hola", taint="UNTRUSTED")
texto_confiable = "Mundo"
resultado = texto_no_confiable + texto_confiable  # resultado es no confiable
```

### Sanitización: Limpiando los Datos

Cuando necesitamos usar datos no confiables, debemos "limpiarlos" primero. Es como filtrar el agua antes de beberla:

```python
def sanitize(entrada_usuario):
    # Solo permite letras, números y algunos símbolos básicos
    if re.match(r'^select +[-a-zA-Z0-9_, ()]+ from +[-a-zA-Z0-9_, ()]+$', entrada_usuario):
        return tstr(entrada_usuario, taint='TRUSTED')
    else:
        return tstr('', taint='UNTRUSTED')
```

## Ejemplos Prácticos

### Ejemplo 1: Entrada Segura

```python
# Entrada segura del usuario
entrada_buena = tstr("select year,model from inventory", taint='UNTRUSTED')
entrada_sanitizada = sanitize(entrada_buena)
# La base de datos acepta esta entrada porque fue sanitizada
```

### Ejemplo 2: Intento de Ataque

```python
# Intento de ataque
entrada_maliciosa = tstr('__import__("os").popen("ls").read()', taint='UNTRUSTED')
entrada_sanitizada = sanitize(entrada_maliciosa)
# La base de datos rechaza esta entrada porque no pasa la sanitización
```

## Conclusión

El análisis de contaminación es como un sistema de seguridad que:

1. Marca todos los datos externos como "no confiables"
2. Rastrea cómo estos datos se propagan por el programa
3. Requiere que los datos sean "limpiados" antes de usarlos en operaciones sensibles
4. Protege contra ataques y vulnerabilidades comunes

Esta técnica es especialmente útil en:

- Aplicaciones web
- Bases de datos
- Sistemas que procesan entrada de usuarios
- Cualquier sistema que necesite distinguir entre datos confiables y no confiables
