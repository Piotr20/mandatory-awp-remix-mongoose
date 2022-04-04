import { useLoaderData, useCatch, json, Form, useParams, Link, redirect } from "remix";
import { useState, useEffect } from "react";
import connectDb from "~/db/connectDb.server.js";
import { BiTrash } from "@react-icons/all-files/bi/BiTrash";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { AiFillStar } from "@react-icons/all-files/ai/AiFillStar";
import SnippetBody from "~/components/snippetBody";

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
  const sort = params.sortBy;

  if (form.get("_method") === "favorite") {
    try {
      await db.models.Snippet.findByIdAndUpdate({ _id: id }, { $set: { favorite: form.get("favorite") } });

      return null;
    } catch (error) {
      return json({ errors: error.errors, values: Object.fromEntries(form) }, { status: 400 });
    }
  }
  if (form.get("_method") === "delete") {
    try {
      await db.models.Snippet.findByIdAndDelete({ _id: id });
      return redirect("/");
    } catch (error) {
      return json({ errors: error.errors, values: Object.fromEntries(form) }, { status: 400 });
    }
  }
}

export default function BookPage() {
  const snippet = useLoaderData();
  const params = useParams();
  const [favorite, setAsFavorite] = useState(false);
  useEffect(() => {
    setAsFavorite(snippet.favorite);
  }, [params]);

  return (
    <div className="w-full h-snippet overflow-y-auto ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{snippet.title}</h1>
        <div className="flex items-center">
          <Link to={`/${snippet._id}/edit`}>
            <button className="mx-1 px-6 py-1 h-full text-md border border-custom-black font-semibold hover:bg-custom-black hover:text-white transition-colors duration-200">
              Edit
            </button>
          </Link>
          <Form method="post">
            <input type="hidden" name="_method" value="delete" />
            <button className="mx-1 hover:bg-red-600 hover:text-white transition-colors duration-200 h-full p-1">
              <BiTrash className="w-7 h-7" />
            </button>
          </Form>
          <Form method="post">
            <input type="hidden" name="_method" value="favorite" />
            <button className="mx-1 relative w-7 h-7" type="submit">
              <span
                className={`${favorite ? "hidden" : ""}`}
                onClick={(e) => {
                  setAsFavorite(true);
                }}
              >
                <AiOutlineStar className=" fill-custom-black w-7 h-7 absolute bottom-0" />
              </span>
              <span
                className={`${favorite ? "" : "hidden"}`}
                onClick={(e) => {
                  setAsFavorite(false);
                }}
              >
                <AiFillStar className=" fill-custom-black w-7 h-7 absolute bottom-0" />
              </span>
              <input hidden name="favorite" defaultValue={favorite} />
            </button>
          </Form>
        </div>
      </div>
      <SnippetBody snippetData={snippet} />
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div>
      <h1>
        {caught.status} {caught.statusText}
      </h1>
      <h2>{caught.data}</h2>
    </div>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <h1 className="text-red-500 font-bold">
      {error.name}: {error.message}
    </h1>
  );
}
