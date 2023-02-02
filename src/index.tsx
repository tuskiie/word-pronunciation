import { Form, ActionPanel, Action, showToast } from "@raycast/api";
import { useForm, FormValidation, useFetch } from "@raycast/utils";

type Values = {
  word: string;
  dialect: string;
};

export default function Command() {
  // function validateWord(word: string){
  //   if(word === "") return 
  // }
  // function queryAPI(word: string){
  //   const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
  // }
  //   const { isLoading, data, revalidate } = useFetch(values.word);

  function handleSubmit(values: Values) {
    console.log(values);
    showToast({ title: "Submitted form", message: "See logs for submitted values" });
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="word" title="Word" />
      <Form.Dropdown id="dialect" title="Dialect">
        <Form.Dropdown.Item value="uk" title="🇬🇧 United Kingdom" />
        <Form.Dropdown.Item value="us" title="🇺🇸 United States" />
      </Form.Dropdown>
    </Form>
  );
}
