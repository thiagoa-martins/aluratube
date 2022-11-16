import React from "react";

import { createClient } from "@supabase/supabase-js";

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

const PROJECT_URL = "https://nmolqobbjkmzoagorcqn.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tb2xxb2Jiamttem9hZ29yY3FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg1MjY1MTIsImV4cCI6MTk4NDEwMjUxMn0.8sRmHQQ-UE17lmXTeNmW4IHJnvUXugngj_nbnHJj7bw";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export function RegisterVideo() {
  const registrationForm = useForm({
    initialValues: {
      title: "Criando aplicação NodeJS sem framework",
      url: "https://www.youtube.com/watch?v=c39UfvCR-gk",
    },
  });
  const [visibleForm, setVisibleForm] = React.useState(false);

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setVisibleForm(true)}>
        +
      </button>
      {visibleForm && (
        <form
          onSubmit={(event) => {
            event.preventDefault();

            supabase
              .from("videos")
              .insert({
                title: registrationForm.values.title,
                url: registrationForm.values.url,
                thumb: getThumbnail(registrationForm.values.url),
                playlist: "back-end",
              })
              .then((response) => console.log(response))
              .catch((err) => console.log(err));

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
