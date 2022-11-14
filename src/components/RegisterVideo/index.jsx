import React from "react";

import { StyledRegisterVideo } from "./styles";

function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues);

  return {
    values,
    handleChange: (event) => {
      const value = event.target.value;
      const name = event.target.name;
      setValues({
        ...values,
        [name]: value,
      });
    },
    clearForm: () => {
      setValues({});
    },
  };
}

export function RegisterVideo() {
  const registrationForm = useForm({
    initialValues: {
      title: "Por que aprender NodeJS em 2023?",
      url: "https://youtube..",
    },
  });
  const [visibleForm, setVisibleForm] = React.useState(true);

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setVisibleForm(true)}>
        +
      </button>
      {visibleForm && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setVisibleForm(false);
            registrationForm.clearForm();
          }}
        >
          <div>
            <button
              type="button"
              className="close-modal"
              onClick={() => setVisibleForm(false)}
            >
              X
            </button>
            <input
              type="text"
              placeholder="Título do vídeo"
              name="title"
              value={registrationForm.values.title}
              onChange={registrationForm.handleChange}
            />
            <input
              type="text"
              placeholder="URL"
              name="url"
              value={registrationForm.values.url}
              onChange={registrationForm.handleChange}
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      )}
    </StyledRegisterVideo>
  );
}
