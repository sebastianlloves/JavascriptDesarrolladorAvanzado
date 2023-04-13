/*
  Las expresiones regulares son patrones que proporcionan forma de buscar y reemplazar texto. 
  En JavaScript cobran especial relevancia porque, además, nos permiten generar validaciones.
  Están disponibles a través del objeto RegExp y se encuentran integrados en los métodos de String. 
*/

/*
  Banderas -> Elementos que afectan a la búsqueda
    => i (no distingue entre mayúsculas y minúsculas) 
    => g (Si no se pone, sólo se obtiene la primera coincidencia)
  
  Conjuntos [] -> retornan true cuando se encuentra alguno de los caracteres declarados dentro de los corchetes
*/

/*
  Clases de Caracteres -> Notación especial que coincide con cualquier símbolo de un determinado conjunto
    => Inclusivas (coincide con el conjunto)
      => - -> Cualquier carácter excepto nueva línea
      => \d -> Cualquier dígito
      => \s -> Símbolos de espacio, tabulaciones, nuevas líneas
      => \w -> letras (sin acentos ni caracteres especiales), dígitos y guion bajo
    => Exclusivas (coincide con lo que NO sea parte del conjunto)
*/

/*
  Anclas -> Obligan a verificar la condición principio/fin de texto
    => ^ inicio -> La RegExp debe encontrarse al inicio de la cadena
    => $ final -> La RegExp debe encontrarse al final de la cadena
    => ^RegExp$ -> LA RegExp debe coincidir de principio a fin con la cadena
*/

/*
  Escapar Caracteres y Límites de palabra
    => Escapar caracteres permite utilizar caracteres que significan algo en una REgExp (Ej: .) como su valor de lectura
    => Límite de Palabra permite buscar un texto dentro del texto

*/

/*
  Conjuntos
    => [] - retornan true cuando se encuentra alguno de los caracteres declarados dentro de los corchetes
    => [^] - retornan true cuando NO se encuentra alguno de los caracteres declarados dentro de los corchetes
    => () - permite encontrar palabras que comparten caracteres

  Rangos
    => [0-5] - retorna true si se encuentra un dígito entre el 0 y el 5   
    
  Cuantificadores
    => {n} - n cantidad de caracteres 
    => {x,n} - entre x y n cantidad de caracteres
    => {n,} - desde n cantidad de caracteres
    Abreviaciones
      => + = {1,}
      => ? = {0,1}
      => * = {0,}

  Grupos de Captura - Se crean combinando conjuntos de paréntesis y cuantificadores
    => ()+ - Al menos una coincidencia de la RegExp al completo      
*/
