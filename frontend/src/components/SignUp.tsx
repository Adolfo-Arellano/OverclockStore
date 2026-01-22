import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { z } from "zod";

type SignUpForm = {
  firstNames: string;
  lastNames: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignUpErrors = Partial<Record<"firstNames" | "lastNames" | "email" | "password" | "confirmPassword", string>>;

type Status = "ok" | "error" | null;

const signUpSchema = z.object({
  firstNames: z.string().min(1, "Debes ingresar tus nombres"),
  lastNames: z.string().min(1, "Debes ingresar tus apellidos"),
  email: z.string().min(1, "Requerido").email("Email inválido"),
  password: z.string().min(1, "Requerido"),
  confirmPassword: z.string().min(1, "Requerido"),
})
.refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

const SignUp = () => {
  const [form, setForm] = useState<SignUpForm>({ firstNames: "", lastNames: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [status, setStatus] = useState<Status>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));

    if (
      name === "firstNames" ||
      name === "lastNames" ||
      name === "email" ||
      name === "password" ||
      name === "confirmPassword"
    ) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    if (status !== null) {
      setStatus(null);
    }
  };

  const validate = () => {
    const result = signUpSchema.safeParse(form);

    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors: SignUpErrors = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (
        field === "firstNames" ||
        field === "lastNames" ||
        field === "email" ||
        field === "password" ||
        field === "confirmPassword"
      ) {
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
          <h1 className="text-3xl font-semibold text-center">Registrate</h1>
          <p className="text-sm text-gray-700 mb-1 text-center">Registrate para acceder a tus compras y promociones favoritas.</p>

          <form onSubmit={onSubmit} className="mt-4 flex h-full flex-col" noValidate>
            <div>
              <label htmlFor="signup-first-names" className="block text-sm font-medium pl-1">Nombres</label>
              <input
                id="signup-first-names"
                name="firstNames"
                type="text"
                autoComplete="given-name"
                value={form.firstNames}
                onChange={onChange}
                className="mt-1 w-full rounded-lg ring ring-violet-200 px-3 py-2 outline-none focus:ring-1 focus:ring-purple-700 hover:ring-2 hover:ring-violet-700"
                placeholder="Tus nombres"
              />
              {errors.firstNames && <p className="text-xs text-red-600 mt-1 pl-1">{errors.firstNames}</p>}
            </div>

            <div>
              <label htmlFor="signup-last-names" className="block text-sm font-medium pl-1 mt-5">Apellidos</label>
              <input
                id="signup-last-names"
                name="lastNames"
                type="text"
                autoComplete="family-name"
                value={form.lastNames}
                onChange={onChange}
                className="mt-1 w-full rounded-lg ring ring-violet-200 px-3 py-2 outline-none focus:ring-1 focus:ring-purple-700 hover:ring-2 hover:ring-violet-700"
                placeholder="Tu apellido"
              />
              {errors.lastNames && <p className="text-xs text-red-600 mt-1 pl-1">{errors.lastNames}</p>}
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-sm font-medium pl-1 mt-5">Correo electrónico</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={onChange}
                className="mt-1 w-full rounded-lg ring ring-violet-200 px-3 py-2 outline-none focus:ring-1 focus:ring-purple-700 hover:ring-2 hover:ring-violet-700"
                placeholder="ejemplo@correo.com"
              />
              {errors.email && <p className="text-xs text-red-600 mt-1 pl-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium pl-1 mt-5">Contraseña</label>
              <input
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={onChange}
                className="mt-1 w-full rounded-lg ring ring-violet-200 px-3 py-2 outline-none focus:ring-1 focus:ring-purple-700 hover:ring-2 hover:ring-violet-700"
                placeholder="Ingresá tu contraseña"
              />
              {errors.password && <p className="text-xs text-red-600 mt-1 pl-1">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="signup-confirm-password" className="block text-sm font-medium pl-1 mt-5">Confirmar contraseña</label>
              <input
                id="signup-confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={onChange}
                className="mt-1 w-full rounded-lg ring ring-violet-200 px-3 py-2 outline-none focus:ring-1 focus:ring-purple-700 hover:ring-2 hover:ring-violet-700"
                placeholder="Repetir contraseña"
              />
              {errors.confirmPassword && <p className="text-xs text-red-600 mt-1 pl-1">{errors.confirmPassword}</p>}
            </div>

            <div className="flex-grow" />

            <button
              type="submit"
              className="w-full rounded-xl py-3 mb-1 mt-6 bg-purple-800 text-white font-medium cursor-pointer transition hover:shadow-violet-200 hover:bg-violet-700/90"
            >
              Registrarme
            </button>

            <p
              aria-live="polite"
              className={`text-sm pl-1 ${
                status === "ok" ? "text-green-600" : status === "error" ? "text-red-600" : "hidden"
              }`}
            >
              {status === "ok"
                ? "¡Listo! Te registraste correctamente."
                : status === "error"
                ? "Revisá los campos marcados."
                : "."}
            </p>

            <div className="mt-1 text-sm text-gray-700">
              ¿Ya estás registrado? <a className="underline" href="/login">Inicia sesión</a>.
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp;