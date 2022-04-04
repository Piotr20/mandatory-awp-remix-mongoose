import { Form, redirect, json, useActionData, useLoaderData } from "remix";
import connectDb from "~/db/connectDb.server";

export async function loader({ params }) {
  const db = await connectDb();
  const snippet = await db.models.Snippet.findById(params.snippetId);

  if (!snippet) {
    throw new Response(`Couldn't find snippet with id ${params.snippetId}`, {
      status: 404,
    });
  }
  return json(snippet);
}
export async function action({ request, params }) {
  const form = await request.formData();
  const db = await connectDb();
  const id = params.snippetId;
  const date = new Date();
  const timestamp = Date.now();
  let today =
    date.getFullYear() + "-" + date.toLocaleString("default", { month: "short" }) + "-" + date.getDate();

  try {
    await db.models.Snippet.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: form.get("title"),
          language: form.get("language"),
          code: form.get("code"),
          description: form.get("description"),
          createdAt: timestamp,
          date: today,
        },
      }
    );
    return redirect(`/${id}`);
  } catch (error) {
    return json({ errors: error.errors, values: Object.fromEntries(form) }, { status: 400 });
  }
}

export default function EditSnippet() {
  const actionData = useActionData();
  const loaderData = useLoaderData();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Update code snippet</h1>
      <Form method="post">
        <label htmlFor="title" className="block text-xl font-semibold">
          Title
        </label>
        <input
          type="text"
          name="title"
          defaultValue={loaderData?.title}
          id="title"
          className={` border border-custom-black mt-2 w-1/3 px-2 py-1 
          ${actionData?.errors.title ? "border-2 border-red-500" : null}`}
        />
        {actionData?.errors.title && <p className="text-red-500">{actionData.errors.title.message}</p>}
        <br />
        <label htmlFor="language" className="block text-xl font-semibold mt-2">
          Language
        </label>
        <select
          defaultValue={loaderData.language}
          name="language"
          id="language"
          className=" border border-custom-black mt-2 w-1/3 px-2 py-1"
        >
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
        <label htmlFor="code" className="block  text-xl font-semibold mt-2">
          Code
        </label>
        <textarea
          type="text"
          name="code"
          defaultValue={loaderData?.code}
          id="code"
          className={` border border-custom-black mt-2 w-1/3 px-2 py-1 
          ${actionData?.errors.title ? "border-2 border-red-500" : null}`}
        />
        {actionData?.errors.code && <p className="text-red-500">{actionData.errors.code.message}</p>}
        <br />
        <label htmlFor="description" className="block text-xl font-semibold mt-2">
          Description
        </label>
        <textarea
          type="text"
          name="description"
          defaultValue={loaderData.description}
          id="description"
          className={` border border-custom-black mt-2 w-1/3 px-2 py-1 
          ${actionData?.errors.description ? "border-2 border-red-500" : null}`}
        />
        {actionData?.errors.description && (
          <p className="text-red-500">{actionData.errors.description.message}</p>
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
