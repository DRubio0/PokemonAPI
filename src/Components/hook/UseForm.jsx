//Este componente nos ayuda para darle una forma inicial al estado de la busqueda el pokemon
import { useState } from "react";

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  //cuando el nombre sea ingresado en el buscador que recorra todos los datos y nos muestr el valor
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //para vover a reiniciar el estado de la busqueda
  const onResetForm = () => {
    setFormState(initialForm);
  };

  //retornamos todos los metodos
  return {
    //el mapeado de toso lo que contiene formState
    ...formState,
    //tambien imprimimos los datos generales del formState
    formState,
    onInputChange,
    onResetForm,
  };
};
