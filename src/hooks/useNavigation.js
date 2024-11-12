import { useState, useEffect } from 'react';

const useNavigation = () => {
    const [tableOfContents, setTableOfContents] = useState({
        course: [],
        practice: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTableOfContents = async () => {
            try {
                setLoading(true);
                const contents = {
                    course: [
                        ...Array.from({ length: 18 }, (_, i) => ({
                            slug: `Clase-${i}${getSlugCoursesSuffix(i)}`,
                            title: `Clase ${i + 1}${getTitleCoursesSuffix(i)}`,
                            order: i
                        })).sort((a, b) => a.order - b.order)
                        , {
                            slug: '1-fundamentos-del-testing',
                            title: '1. Fundamentos del Testing',
                            order: 18
                        },
                        {
                            slug: '2-análisis-estático',
                            title: '2. Análisis Estático',
                            order: 19
                        },
                        {
                            slug: '3-fuzzing-y-testing-dinámico',
                            title: '3. Fuzzing y Testing Dinámico',
                            order: 20
                        },
                        {
                            slug: '4-localización-de-fallas',
                            title: '4. Localización de Fallas',
                            order: 21
                        },
                        {
                            slug: '5-análisis-de-rendimiento',
                            title: '5. Análisis de Rendimiento',
                            order: 22
                        }
                    ]
                    ,
                    practice: [
                        {
                            // Nombre exacto del archivo
                            slug: 'pregunta-guía-de-estudio',
                            title: 'Guía de Estudio',
                            order: 0
                        },
                        ...Array.from({ length: 19 }, (_, i) => ({
                            slug: `pregunta-${i + 1}${getSlugSuffix(i + 1)}`,
                            title: `Pregunta ${i + 1}${getTitleSuffix(i + 1)}`,
                            order: i + 1
                        }))
                    ].sort((a, b) => a.order - b.order)
                };

                setTableOfContents(contents);
                setError(null);
            } catch (err) {
                setError('Error cargando la tabla de contenidos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTableOfContents();
    }, []);

    return { tableOfContents, loading, error };
};

function getSlugSuffix(number) {
    const suffixes = {
        1: '-test-doubles-y-mocking',
        2: '---equivalence-partitioning',
        3: '---statement-vs-branch-coverage',
        4: '---mutation-testing',
        5: '-mutation-fuzzing-vs-random-fuzzing',
        6: '-tabla-de-decisión-y-mcdc',
        7: '-test-doubles---dummy-vs-fake',
        8: '-search-based-testing---tournament-selection',
        9: '-tablas-de-decisión-y-análisis-de-reglas',
        10: '-statement-coverage-100',
        11: '-principios-del-testing',
        12: '-instrumentación-vs-sampling-profiling',
        13: '-funciones-fitness-en-search-based-testing',
        14: '-técnicas-de-fault-location',
        15: '-análisis-de-ast-y-sistema-de-warnings',
        16: '-transformadores-de-ast-y-modificación-de-código',
        17: '-análisis-de-flujo-de-información-y-métodos-string',
        18: '-paradoja-del-pesticida-en-testing',
        19: '-limitaciones-del-mutation-testing'
    };
    return suffixes[number] || '';
}

function getTitleSuffix(number) {
    const suffixes = {
        1: ': Test Doubles y Mocking',
        2: ': Equivalence Partitioning',
        3: ': Statement vs Branch Coverage',
        4: ': Mutation Testing',
        5: ': Mutation Fuzzing vs Random Fuzzing',
        6: ': Tabla de Decisión y MCDC',
        7: ': Test Doubles - Dummy vs Fake',
        8: ': Search Based Testing - Tournament Selection',
        9: ': Tablas de Decisión y Análisis de Reglas',
        10: ': Statement Coverage 100%',
        11: ': Principios del Testing',
        12: ': Instrumentación vs Sampling Profiling',
        13: ': Funciones Fitness en Search Based Testing',
        14: ': Técnicas de Fault Location',
        15: ': Análisis de AST y Sistema de Warnings',
        16: ': Transformadores de AST y Modificación de Código',
        17: ': Análisis de Flujo de Información y Métodos String',
        18: ': Paradoja del Pesticida en Testing',
        19: ': Limitaciones del Mutation Testing'
    };
    return suffixes[number] || '';
}

function getSlugCoursesSuffix(number) {
    const suffixes = {
        0: '---Introducción-al-curso',
        1: '---Unit-Testing',
        2: '---Coverage',
        3: '---Mutation-Based-Fuzzing',
        4: '---Search-Based-Fuzzing',
        5: '---Mutation-Analysis',
        6: '---Decision-Tables-&-State-Transitioning',
        7: '---Boundary-Analysis-&-Equivalence-Partitioning',
        8: '---Code-Smells-&-Basic-Static-Rules',
        9: '---Static-Analysis',
        10: '---transformaciones',
        11: '---transformaciones-avanzadas',
        12: '---Fault-location-fauxpy',
        13: '---Taint-Analysis',
        14: '---concolic-fuzzing',
        15: '---symbolic-fuzzing',
        16: '---instrumentation-profiling',
        17: '---Testing-and-SoftwareDevelopment-Cycle-API-Testing'
    };
    return suffixes[number] || '';
}

function getTitleCoursesSuffix(number) {
    const suffixes = {
        0: ': Introducción al curso',
        1: ': Unit Testing',
        2: ': Coverage',
        3: ': Mutation Based Fuzzing',
        4: ': Search Based Fuzzing',
        5: ': Mutation Analysis',
        6: ': Decision Tables & State Transitioning',
        7: ': Boundary Analysis & Equivalence Partitioning',
        8: ': Code Smells & Basic Static Rules',
        9: ': Static Analysis',
        10: ': Transformaciones',
        11: ': Transformaciones Avanzadas',
        12: ': Fault Location Fauxpy',
        13: ': Taint Analysis',
        14: ': Concolic Fuzzing',
        15: ': Symbolic Fuzzing',
        16: ': Instrumentation Profiling',
        17: ': Testing and Software Development Cycle API Testing'
    };
    return suffixes[number] || '';
}


export default useNavigation;