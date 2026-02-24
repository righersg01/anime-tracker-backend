import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "@/lib/api"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const data = await api.post("/auth/login", {
        email,
        password
      })

      localStorage.setItem("token", data.token)

      navigate("/")
    } catch (error) {
      alert("Erro ao fazer login")
    }
  }

    return (
    <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-sm p-6 rounded-lg border bg-card shadow-sm">
        <h1 className="text-2xl font-semibold mb-6 text-center">
            Entrar na conta
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <button
            type="submit"
            className="w-full rounded-md bg-primary text-primary-foreground py-2 font-medium hover:opacity-90 transition"
            >
            Entrar
            </button>
        </form>
        </div>
    </div>
    )
}