import { Form, redirect, json, useActionData } from "remix";
import connectDb from "~/db/connectDb.server";

export async function action({ request }) {
  const form = await request.formData();
  const db = await connectDb();
  const date = new Date();
  const timestamp = Date.now();
  let today =
    date.getFullYear() +
    "-" +
    date.toLocaleString("default", { month: "short" }) +
    "-" +
    date.getDate();

  try {
    const newSnippet = await db.models.Snippet.create({
      title: form.get("title"),
      language: form.get("language"),
      code: form.get("code"),
      description: form.get("description"),
      favorite: false,
      createdAt: timestamp,
      date: today,
    });
    return redirect(`/${newSnippet._id}`);
  } catch (error) {
    return json(
      { errors: error.errors, values: Object.fromEntries(form) },
      { status: 400 }
    );
  }
}

export default function CreateSnippet() {
  const actionData = useActionData();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create new code snippet</h1>
      <Form method="post">
        <label htmlFor="title" className="block text-xl font-semibold">
          Title
        </label>
        <input
          type="text"
          name="title"
          defaultValue={actionData?.values.title}
          id="title"
          className={` border border-custom-black mt-2  w-72 px-2 py-1 
          ${actionData?.errors.title ? "border-2 border-red-500" : null}`}
        />
        {actionData?.errors.title && (
          <p className="text-red-500">{actionData.errors.title.message}</p>
        )}
        <br />
        <label htmlFor="language" className="block text-xl font-semibold mt-2">
          Language
        </label>
        <select
          name="language"
          id="language"
          className=" border border-custom-black mt-2  w-72 px-2 py-1"
        >
          <option value="javascript">JavaScript</option>
          <option value="php">Php</option>
          <option value="react">React</option>
          <option value="vue">Vue</option>
          <option value="angular">Angular</option>
          <option value="node">Node</option>
          <option value="rust">Rust</option>
          <option value="another">Another</option>
        </select>
        {actionData?.errors.language && (
          <p className="text-red-500">{actionData.errors.language.message}</p>
        )}
        <br />
        <label htmlFor="code" className="block  text-xl font-semibold mt-2">
          Code
        </label>
        <textarea
          type="text"
          name="code"
          defaultValue={actionData?.values.code}
          id="code"
          className={` border border-custom-black mt-2  w-72 px-2 py-1 
          ${actionData?.errors.title ? "border-2 border-red-500" : null}`}
        />
        {actionData?.errors.code && (
          <p className="text-red-500">{actionData.errors.code.message}</p>
        )}
        <br />
        <label
          htmlFor="description"
          className="block text-xl font-semibold mt-2"
        >
          Description
        </label>
        <textarea
          type="text"
          name="description"
          defaultValue={actionData?.values.code}
          id="description"
          className={` border border-custom-black mt-2  w-72 px-2 py-1 
          ${actionData?.errors.title ? "border-2 border-red-500" : null}`}
        />
        {actionData?.errors.description && (
          <p className="text-red-500">
            {actionData.errors.description.message}
          </p>
        )}
        <br />

        <button
          className="mt-2 px-6 py-1 h-full text-md border border-custom-black font-semibold hover:bg-custom-black hover:text-white transition-colors duration-200"
          type="submit"
        >
          Save
        </button>
      </Form>
    </div>
  );
}
