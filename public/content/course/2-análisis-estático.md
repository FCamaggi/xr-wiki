# 2. ANÁLISIS ESTÁTICO

El análisis estático examina el código sin ejecutarlo, permitiendo detectar defectos potenciales, problemas de diseño y vulnerabilidades en etapas tempranas del desarrollo.

## 2.1 Abstract Syntax Tree (AST)

### 2.1.1 Fundamentos de AST

El Abstract Syntax Tree (AST) es una representación intermedia del código fuente que captura la estructura sintáctica del programa en forma de árbol. Cada nodo del árbol representa una construcción sintáctica del lenguaje de programación, como una declaración, una expresión o un bloque de código. El análisis de AST permite a los desarrolladores y herramientas de análisis estático inspeccionar y manipular el código de manera estructurada, facilitando la detección de errores, la optimización y la transformación del código.

```python
class ASTAnalyzer:
    def __init__(self):
        self.issues = []
        self.metrics = {}

    def analyze_file(self, file_path):
        """Analiza un archivo usando AST"""
        with open(file_path) as f:
            code = f.read()
        tree = ast.parse(code)
        return self.analyze_tree(tree)

    def analyze_tree(self, tree):
        """Analiza el AST completo"""
        self.analyze_structure(tree)
        self.collect_metrics(tree)
        self.detect_patterns(tree)
        return {
            'issues': self.issues,
            'metrics': self.metrics
        }
```

### 2.1.2 Visitors Especializados

Los visitors especializados son clases que recorren el AST y realizan acciones específicas en función de los nodos que encuentran. Estos visitors permiten implementar análisis detallados y personalizados, como la medición de la complejidad del código, la detección de patrones de diseño o la identificación de code smells. Al extender la clase `ast.NodeVisitor`, se pueden definir métodos para visitar diferentes tipos de nodos y acumular métricas o detectar problemas específicos.

```python
class ComplexityVisitor(ast.NodeVisitor):
    def __init__(self):
        self.complexity = 0

    def visit_If(self, node):
        self.complexity += 1
        self.generic_visit(node)

    def visit_For(self, node):
        self.complexity += 1
        self.generic_visit(node)

    def visit_While(self, node):
        self.complexity += 1
        self.generic_visit(node)
```

## 2.2 Detección de Code Smells

### 2.2.1 Implementación de Detectores

La detección de code smells es una técnica utilizada para identificar patrones en el código que pueden indicar problemas de diseño o mantenimiento. Estos patrones, conocidos como "smells", no son errores de programación, pero pueden afectar negativamente la calidad del software. A continuación, se presenta una implementación de un detector de code smells utilizando el módulo `ast` de Python.

```python
class SmellDetector(ast.NodeVisitor):
    def __init__(self):
        self.smells = []
        self.current_class = None
        self.current_function = None

    def visit_ClassDef(self, node):
        """Detecta large class y otros smells relacionados"""
        self.current_class = node.name
        class_metrics = {
            'methods': len([n for n in node.body if isinstance(n, ast.FunctionDef)]),
            'attributes': len([n for n in node.body if isinstance(n, ast.AnnAssign)]),
            'complexity': self.calculate_class_complexity(node)
        }

        if class_metrics['methods'] > 20:
            self.smells.append({
                'type': 'LargeClass',
                'class': node.name,
                'metrics': class_metrics
            })

        self.generic_visit(node)
        self.current_class = None

    def visit_FunctionDef(self, node):
        """Detecta long method y complex method"""
        self.current_function = node.name
        metrics = {
            'lines': len(node.body),
            'parameters': len(node.args.args),
            'complexity': self.calculate_function_complexity(node)
        }

        if metrics['lines'] > 15:
            self.smells.append({
                'type': 'LongMethod',
                'function': node.name,
                'class': self.current_class,
                'metrics': metrics
            })

        self.generic_visit(node)
        self.current_function = None
```

En este ejemplo, la clase `SmellDetector` extiende `ast.NodeVisitor` para recorrer el árbol de sintaxis abstracta (AST) del código fuente. Se detectan dos tipos de code smells: `LargeClass` y `LongMethod`. La detección se basa en métricas como el número de métodos y atributos en una clase, y el número de líneas y parámetros en una función.

### 2.2.2 Métricas y Umbrales

Para detectar code smells de manera efectiva, es importante definir métricas y umbrales que determinen cuándo una clase o función se considera problemática. A continuación, se presenta una clase que calcula estas métricas y compara los resultados con los umbrales definidos.

```python
class CodeMetrics:
    def __init__(self):
        self.thresholds = {
            'method_length': 15,
            'class_size': 20,
            'complexity': 10,
            'parameters': 5
        }

    def analyze_code(self, ast_tree):
        visitor = MetricsVisitor(self.thresholds)
        visitor.visit(ast_tree)
        return visitor.metrics
```

La clase `CodeMetrics` define umbrales para diferentes métricas, como la longitud de los métodos, el tamaño de las clases, la complejidad y el número de parámetros. La función `analyze_code` utiliza un `MetricsVisitor` para recorrer el AST y calcular las métricas del código, comparándolas con los umbrales definidos para identificar posibles code smells.

## 2.3 Análisis de Flujo de Control

### 2.3.1 Construcción de CFG

El análisis de flujo de control (CFG, por sus siglas en inglés) es una técnica utilizada para representar todos los caminos posibles que puede tomar un programa durante su ejecución. Un CFG se construye a partir del código fuente y se representa como un grafo dirigido, donde los nodos representan bloques básicos de código y las aristas representan las posibles transiciones entre estos bloques.

```python
class CFGBuilder:
    def __init__(self):
        self.graph = nx.DiGraph()
        self.current_node = None

    def build_cfg(self, ast_node):
        """Construye el grafo de flujo de control"""
        entry_node = self.create_node('entry')
        self.current_node = entry_node

        self.visit(ast_node)
        return self.graph

    def connect_nodes(self, from_node, to_node):
        """Conecta nodos en el CFG"""
        self.graph.add_edge(from_node, to_node)
```

En este ejemplo, la clase `CFGBuilder` se encarga de construir el grafo de flujo de control a partir de un nodo AST (Abstract Syntax Tree). El método `build_cfg` inicializa el grafo y comienza la visita del nodo AST, mientras que el método `connect_nodes` se utiliza para conectar los nodos en el grafo.

### 2.3.2 Análisis de Paths

El análisis de paths en un CFG permite identificar todos los caminos posibles que puede seguir el flujo de ejecución de un programa. Esto es útil para detectar posibles errores, optimizar el rendimiento y mejorar la cobertura de pruebas.

```python
class PathAnalyzer:
    def __init__(self, cfg):
        self.cfg = cfg
        self.paths = []

    def find_all_paths(self):
        """Encuentra todos los paths posibles en el CFG"""
        start = self.cfg.get_entry_node()
        end = self.cfg.get_exit_node()
        return list(nx.all_simple_paths(self.cfg, start, end))

    def analyze_path_complexity(self, path):
        """Analiza la complejidad de un path específico"""
        complexity = 0
        conditions = []

        for node in path:
            if isinstance(node, ConditionNode):
                complexity += 1
                conditions.append(node.condition)

        return {
            'complexity': complexity,
            'conditions': conditions,
            'length': len(path)
        }
```

La clase `PathAnalyzer` se utiliza para analizar los paths en un CFG. El método `find_all_paths` encuentra todos los caminos posibles desde el nodo de entrada hasta el nodo de salida del CFG. El método `analyze_path_complexity` calcula la complejidad de un path específico, contando el número de condiciones y la longitud del path.

## 2.4 Implementación Práctica

### 2.4.1 Pipeline de Análisis Estático

El pipeline de análisis estático es una secuencia de pasos automatizados que permite examinar el código fuente de un proyecto para identificar problemas potenciales, medir métricas de calidad y detectar code smells. A continuación, se presenta una implementación de un pipeline de análisis estático en Python.

```python
class StaticAnalysisPipeline:
    def __init__(self):
        self.ast_analyzer = ASTAnalyzer()
        self.smell_detector = SmellDetector()
        self.metrics_calculator = CodeMetrics()
        self.cfg_analyzer = CFGBuilder()

    def analyze_project(self, project_path):
        """Ejecuta análisis completo de un proyecto"""
        results = {
            'files_analyzed': 0,
            'issues_found': [],
            'metrics': {},
            'smells': [],
            'cfgs': {}
        }

        for file_path in self.get_python_files(project_path):
            file_results = self.analyze_file(file_path)
            self.update_results(results, file_results)

        return self.generate_report(results)

    def analyze_file(self, file_path):
        """Analiza un archivo individual"""
        with open(file_path) as f:
            code = f.read()

        tree = ast.parse(code)

        return {
            'ast_analysis': self.ast_analyzer.analyze_tree(tree),
            'smells': self.smell_detector.visit(tree),
            'metrics': self.metrics_calculator.analyze_code(tree),
            'cfg': self.cfg_analyzer.build_cfg(tree)
        }
```

En este ejemplo, la clase `StaticAnalysisPipeline` coordina diferentes componentes de análisis estático, como el análisis de AST, la detección de code smells, el cálculo de métricas y la construcción de CFG. El método `analyze_project` recorre todos los archivos Python en un proyecto y aplica estos análisis a cada archivo, acumulando los resultados.

### 2.4.2 Visualización y Reportes

La visualización y generación de reportes son componentes cruciales para comunicar los resultados del análisis estático de manera efectiva. A continuación, se presenta una clase que genera reportes HTML y visualizaciones de las métricas obtenidas.

```python
class AnalysisReporter:
    def __init__(self, results):
        self.results = results

    def generate_html_report(self):
        """Genera reporte HTML del análisis"""
        template = self.load_template('static_analysis.html')
        return template.render(
            metrics=self.results['metrics'],
            issues=self.results['issues'],
            smells=self.results['smells']
        )

    def generate_metrics_visualization(self):
        """Genera visualizaciones de métricas"""
        plt.figure(figsize=(12, 8))

        # Complexity distribution
        plt.subplot(2, 2, 1)
        self.plot_complexity_distribution()

        # Smells distribution
        plt.subplot(2, 2, 2)
        self.plot_smells_distribution()

        # Metrics trends
        plt.subplot(2, 2, 3)
        self.plot_metrics_trends()

        # Issues by type
        plt.subplot(2, 2, 4)
        self.plot_issues_by_type()

        return plt
```

La clase `AnalysisReporter` toma los resultados del análisis estático y genera un reporte HTML utilizando una plantilla predefinida. Además, crea visualizaciones de las métricas, como la distribución de la complejidad, la distribución de code smells, las tendencias de métricas y los tipos de problemas encontrados. Estas visualizaciones ayudan a entender mejor el estado del código y a identificar áreas que requieren atención.
