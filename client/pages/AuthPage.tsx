import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/hooks/useAuth";
import { Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState<UserRole>("participant");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            login(formData.email, isLogin ? "participant" : role);
            navigate("/");
        }, 800);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary/5 flex flex-col justify-center px-4 safe-area-all">
            <div className="w-full max-w-sm mx-auto">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg shadow-primary/20">
                        ✨
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">Evently</h1>
                    <p className="text-muted-foreground">
                        {isLogin
                            ? "Bon retour parmi nous !"
                            : "Rejoignez la communauté Evently"}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-100 border border-gray-100">
                    {/* Toggle Login/Register */}
                    <div className="flex bg-muted p-1 rounded-xl mb-6 relative">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${isLogin
                                    ? "bg-white text-primary-600 shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Connexion
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${!isLogin
                                    ? "bg-white text-primary-600 shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Inscription
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="space-y-4 mb-2 animate-in slide-in-from-top-4 fade-in duration-300">
                                {/* Role Selection */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <label
                                        className={`relative flex flex-col items-center gap-2 p-3 border-2 rounded-xl cursor-pointer transition-all ${role === "participant"
                                                ? "border-primary-600 bg-primary-50"
                                                : "border-border hover:border-primary-200"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value="participant"
                                            checked={role === "participant"}
                                            onChange={() => setRole("participant")}
                                            className="sr-only"
                                        />
                                        <User className={`w-6 h-6 ${role === "participant" ? "text-primary-600" : "text-muted-foreground"}`} />
                                        <span className={`text-xs font-semibold ${role === "participant" ? "text-primary-800" : "text-muted-foreground"}`}>Participant</span>
                                        {role === "participant" && <CheckCircle2 className="w-4 h-4 text-primary-600 absolute top-2 right-2" />}
                                    </label>

                                    <label
                                        className={`relative flex flex-col items-center gap-2 p-3 border-2 rounded-xl cursor-pointer transition-all ${role === "organizer"
                                                ? "border-secondary bg-secondary/10"
                                                : "border-border hover:border-secondary/30"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value="organizer"
                                            checked={role === "organizer"}
                                            onChange={() => setRole("organizer")}
                                            className="sr-only"
                                        />
                                        <div className="w-6 h-6 flex items-center justify-center font-bold text-lg">🏢</div>
                                        <span className={`text-xs font-semibold ${role === "organizer" ? "text-secondary-800" : "text-muted-foreground"}`}>Organisateur</span>
                                        {role === "organizer" && <CheckCircle2 className="w-4 h-4 text-secondary absolute top-2 right-2" />}
                                    </label>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground">Nom complet</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <input
                                            type="text"
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                                            placeholder="Jean Dupont"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                                    placeholder="exemple@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">Mot de passe</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25 mt-6"
                        >
                            {isLogin ? "Se connecter" : "Créer mon compte"}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-sm text-muted-foreground">
                    En continuant, vous acceptez nos <Link to="#" className="text-primary-600 font-semibold">conditions d'utilisation</Link>.
                </p>
            </div>
        </div>
    );
}
