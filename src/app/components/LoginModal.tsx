"use client";

import { useState } from "react";
import { X, User, Briefcase, Compass, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginModalProps {
  onClose: () => void;
  onLogin: (type: 'motoboy' | 'daily' | 'traveler' | 'fleet') => void;
}

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [step, setStep] = useState<'select' | 'form'>('select');
  const [selectedType, setSelectedType] = useState<'motoboy' | 'daily' | 'traveler' | 'fleet' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    password: '',
  });

  const userTypes = [
    {
      type: 'motoboy' as const,
      icon: Briefcase,
      title: 'Motoboy',
      description: 'Ferramenta de trabalho com GPS automático',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      type: 'daily' as const,
      icon: User,
      title: 'Casa ↔ Trabalho',
      description: 'Uso diário com registro de distância',
      color: 'from-green-500 to-emerald-500',
    },
    {
      type: 'traveler' as const,
      icon: Compass,
      title: 'Viajante',
      description: 'Aventuras com controle manual de viagens',
      color: 'from-purple-500 to-pink-500',
    },
    {
      type: 'fleet' as const,
      icon: Users,
      title: 'Administrador de Frota',
      description: 'Gestão completa para locadoras',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const handleSelectType = (type: 'motoboy' | 'daily' | 'traveler' | 'fleet') => {
    setSelectedType(type);
    setStep('form');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedType) {
      onLogin(selectedType);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-slate-900 border-white/10 max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
          <CardTitle className="text-white text-2xl">
            {step === 'select' ? 'Escolha seu tipo de uso' : 'Complete seu cadastro'}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {step === 'select' 
              ? 'Selecione como você usa sua moto para personalizar sua experiência'
              : 'Preencha seus dados para começar'
            }
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === 'select' ? (
            <div className="grid md:grid-cols-2 gap-4">
              {userTypes.map((userType) => {
                const Icon = userType.icon;
                return (
                  <button
                    key={userType.type}
                    onClick={() => handleSelectType(userType.type)}
                    className="text-left p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                  >
                    <div className={`bg-gradient-to-br ${userType.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {userType.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {userType.description}
                    </p>
                  </button>
                );
              })}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
                <p className="text-white font-semibold mb-1">
                  Tipo selecionado: {userTypes.find(t => t.type === selectedType)?.title}
                </p>
                <Button
                  type="button"
                  variant="link"
                  className="text-blue-400 hover:text-blue-300 p-0 h-auto"
                  onClick={() => setStep('select')}
                >
                  Alterar tipo de uso
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Nome completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cpf" className="text-white">CPF</Label>
                  <Input
                    id="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-white">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    required
                    minLength={6}
                  />
                </div>
              </div>



              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold"
              >
                Continuar para escolha de plano
              </Button>

              <p className="text-center text-gray-400 text-sm">
                Já tem uma conta?{' '}
                <button type="button" className="text-blue-400 hover:text-blue-300">
                  Fazer login
                </button>
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
