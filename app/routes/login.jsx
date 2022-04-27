import {
  useLoaderData,
  useActionData,
  useCatch,
  Form,
  redirect,
  json,
} from "remix";
import connectDb from "~/db/connectDb.server.js";

import bcrypt from "bcryptjs";
import { useState } from "react";

export async function action({ request }) {
  const form = await request.formData();
  const db = await connectDb();
  const email = form.get("email");
  const password = form.get("password");
  if (form.get("_method") == "login") {
    try {
      const user = await db.models.Auth.findOne({
        email,
      });

      const auth = await bcrypt.compare(password, user.password);
      console.log(auth);
      if (auth && user) {
        return redirect("/");
      } else {
        return json({ data: user });
      }
      return user;
    } catch (error) {
      console.log(error);
      return json(
        { errors: error.errors, values: Object.fromEntries(form) },
        { status: 400 }
      );
    }
  }
  if (form.get("_method") == "signup") {
    try {
      const password = await bcrypt.hash(form.get("password"), 10);
      const user = await db.models.Auth.create({
        email: form.get("email"),
        password: password,
      });
      return redirect(`/`);
    } catch (error) {
      return json(
        { errors: error.errors, values: Object.fromEntries(form) },
        { status: 400 }
      );
    }
  }
}

export async function loader({ params, request }) {
  const db = await connectDb();
  const users = await db.models.Auth.find({});
  request.headers.get("Cookie");
  return users;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const users = useLoaderData();
  const user = useActionData();

  //   async function Auth() {
  //     await bcrypt.compare(user?.password, password, () => {
  //       redirect("/");
  //     });
  //   }
  //   console.log(user);
  //   Auth();
  return (
    <div className="flex w-full">
      <Form method="post" reloadDocument className=" flex flex-col">
        <h2>Login</h2>
        <input type="hidden" name="_method" value="login" />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </Form>
      <Form method="post" reloadDocument className=" flex flex-col ml-8">
        <h2>SIgn up</h2>
        <input type="hidden" name="_method" value="signup" />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <button type="submit">Submit</button>
      </Form>
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
