import { Action, ActionPanel, Form } from "@raycast/api";
import { useForm, FormValidation, useFetch } from "@raycast/utils";
import { useState } from "react";

interface Values {
  word: string;
  dialect: string;
}

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export default function Command() {
  const [word, setWord] = useState<string | undefined>();
  const { isLoading, data } = useFetch(API_URL + word, {
    execute: word !== undefined,
    onData: (data) => console.log(data)
  });

  const { handleSubmit, itemProps } = useForm<Values>({
    onSubmit(values) {
      setWord(values.word);
    },
    validation: {
      dialect: FormValidation.Required,
      word: (value) => {
        if (value && !value.match(/^[A-Za-z]+$/)) {
          return "Word contains non-alphabetic characters.";
        } else if (!value) {
          return "A word is required.";
        }
      }
    }
  });

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField title="Word" {...itemProps.word} />
      <Form.Dropdown title="Dialect" {...itemProps.dialect}>
        <Form.Dropdown.Item value="uk" title="🇬🇧 United Kingdom" />
        <Form.Dropdown.Item value="us" title="🇺🇸 United States" />
      </Form.Dropdown>
    </Form>
  );
}
