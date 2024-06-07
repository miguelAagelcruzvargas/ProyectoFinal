import { useState } from 'react';

/**
 * Hook personalizado para manejar los valores de un formulario
 * @param {Object} initialState - Estado inicial del formulario
 * @returns {Array} [values, handleInputChange, reset]
 */
export const useForm = (initialState = {}) => {
  // Definición del estado del formulario utilizando el estado inicial proporcionado
  const [values, setValues] = useState(initialState);

  /**
   * Función para manejar el cambio en los campos del formulario
   * @param {Object} event - Evento de cambio en un campo del formulario
   */
  const handleInputChange = ({ target }) => {
    // Actualiza el estado de los valores del formulario con el nuevo valor del campo modificado
    setValues({
      ...values,
      [target.name]: target.value
    });
  };

  /**
   * Función para resetear el formulario a su estado inicial
   */
  const reset = () => {
    // Restaura el estado del formulario a su estado inicial
    setValues(initialState);
  };

  // Devuelve el estado actual del formulario, la función para manejar cambios y la función para resetear
  return [values, handleInputChange, reset];
};
