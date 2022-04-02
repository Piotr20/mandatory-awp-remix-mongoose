import { Form, redirect, json, useActionData } from "remix";
import connectDb from "~/db/connectDb.server";

export async function action({ request }) {
  const form = await request.formData();
  const db = await connectDb();
  try {
    const newSnippet = await db.models.Snippet.create({
      title: form.get("title"),
      language: form.get("language"),
      code: form.get("code"),
      description: form.get("description"),
      favourite: false,
    });
    return redirect(`/${newSnippet._id}`);
  } catch (error) {
    return json({ errors: error.errors, values: Object.fromEntries(form) }, { status: 400 });
  }
}

export default function CreateBook() {
  const actionData = useActionData();
  return (
    <div>
      <h1>Create book</h1>
      <Form method="post">
        <label htmlFor="title" className="block">
          Title
        </label>
        <input
          type="text"
          name="title"
          defaultValue={actionData?.values.title}
          id="title"
          className={actionData?.errors.title ? "border-2 border-red-500" : null}
        />
        {actionData?.errors.title && <p className="text-red-500">{actionData.errors.title.message}</p>}
        <br />
        <label htmlFor="language" className="block">
          Language
        </label>
        <select name="language" id="language">
          <option value="JS">JavaScript</option>
          <option value="Php">Php</option>
          <option value="React">React</option>
          <option value="Vue">Vue</option>
          <option value="Angular">Angular</option>
          <option value="Node">Node</option>
          <option value="Rust">Rust</option>
          <option value="Another">Another</option>
        </select>
        {actionData?.errors.language && <p className="text-red-500">{actionData.errors.language.message}</p>}
        <br />
        <label htmlFor="code" className="block">
          Code
        </label>
        <textarea
          type="text"
          name="code"
          defaultValue={actionData?.values.code}
          id="code"
          className={actionData?.errors.code ? "border-2 border-red-500" : null}
        />
        {actionData?.errors.code && <p className="text-red-500">{actionData.errors.code.message}</p>}
        <br />
        <label htmlFor="description" className="block">
          Description
        </label>
        <textarea
          type="text"
          name="description"
          defaultValue={actionData?.values.code}
          id="description"
          className={actionData?.errors.description ? "border-2 border-red-500" : null}
        />
        {actionData?.errors.description && (
          <p className="text-red-500">{actionData.errors.description.message}</p>
        )}
        <br />

        <button type="submit">Save</button>
      </Form>
    </div>
  );
}
