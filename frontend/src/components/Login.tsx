import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { z } from "zod";

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

type LoginErrors = Partial<Record<"email" | "password", string>>;

type Status = "ok" | "error" | null;

const loginSchema = z.object({
  email: z.string().min(1, "Requerido").email("Email inválido"),
  password: z.string().min(1, "Requerido"),
  remember: z.boolean().optional(),
});

const Login = () => {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [status, setStatus] = useState<Status>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));

    if (name === "email" || name === "password") {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    if (status !== null) {
      setStatus(null);
    }
  };

  const validate = () => {
    const result = loginSchema.safeParse(form);

    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors: LoginErrors = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (field === "email" || field === "password") {
        fieldErrors[field] = issue.message;
      }
    });

    setErrors(fieldErrors);
    return false;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      setStatus("error");
      return;
    }

    setStatus("ok");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex justify-center items-center">
        <div className="rounded-2xl ring ring-gray-300 bg-white/70 backdrop-blur p-6 shadow transition hover:shadow-lg flex flex-col h-full min-w-96">
          <h1 className="text-3xl font-semibold text-center">Iniciar sesión</h1>
          <p className="text-sm text-gray-700 mb-1 text-center">Accedé a tus compras y promociones favoritas.</p>

          <form onSubmit={onSubmit} className="mt-4 flex h-full flex-col" noValidate>
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium">Correo electrónico</label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={onChange}
                className="mt-1 w-full rounded-lg ring ring-violet-200 px-3 py-2 outline-none focus:ring-1 focus:ring-purple-700 hover:ring-2 hover:ring-violet-700"
                placeholder="ejemplo@correo.com"
              />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium mt-5">Contraseña</label>
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={onChange}
                className="mt-1 w-full rounded-lg ring ring-violet-200 px-3 py-2 outline-none focus:ring-1 focus:ring-purple-700 hover:ring-2 hover:ring-violet-700"
                placeholder="Ingresá tu contraseña"
              />
              {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between text-sm mt-2 mb-5">
              <label className="flex items-center gap-2">
                <input
                  name="remember"
                  type="checkbox"
                  checked={form.remember}
                  onChange={onChange}
                  className="cursor-pointer"
                />
                Recordarme
              </label>
              <a className="underline" href="/contact">¿Olvidaste tu contraseña?</a>
            </div>

            <div className="flex-grow" />

            <button
              type="submit"
              className="w-full rounded-xl py-3 mb-1 bg-purple-800 text-white font-medium cursor-pointer transition hover:shadow-violet-200 hover:bg-violet-700/90"
            >
              Ingresar
            </button>

            <p
              aria-live="polite"
              className={`text-sm ${
                status === "ok" ? "text-green-600" : status === "error" ? "text-red-600" : "hidden"
              }`}
            >
              {status === "ok"
                ? "¡Listo! Iniciaste sesión correctamente."
                : status === "error"
                ? "Revisá los campos marcados."
                : "."}
            </p>

            <div className="mt-1 text-sm text-gray-700">
              ¿Todavía no tenés cuenta? <a className="underline" href="/signup">Registrate</a>.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
