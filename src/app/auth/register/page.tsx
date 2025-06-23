"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    Nom: '',
    Prenom: '',
    Pseudo: '',
    Email: '',
    MotDePasse: '',
    ConfirmMotDePasse: '',
    Telephone: '',
    Adresse: '',
    Role: 'parent' // Par défaut
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'animateur' : 'parent') : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Vérification des mots de passe
    if (formData.MotDePasse !== formData.ConfirmMotDePasse) {
      setError('Les mots de passe ne correspondent pas');
      setIsLoading(false);
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      setError('Configuration API manquante');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Payload envoyé :', {
        Nom: formData.Nom,
        Prenom: formData.Prenom,
        Pseudo: formData.Pseudo,
        Email: formData.Email,
        MotDePasse: formData.MotDePasse,
        Role: formData.Role,
        Telephone: parseInt(formData.Telephone),
        Adresse: formData.Adresse
      });
      const response = await axios.post(`${apiUrl}/utilisateur`, {
        Nom: formData.Nom,
        Prenom: formData.Prenom,
        Pseudo: formData.Pseudo,
        Email: formData.Email,
        MotDePasse: formData.MotDePasse,
        Role: formData.Role,
        Telephone: parseInt(formData.Telephone),
        Adresse: formData.Adresse
      });

      if (response.data) {
        router.push('/');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Une erreur est survenue lors de l\'inscription');
      } else {
        setError('Une erreur inattendue est survenue');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 items-center justify-center my-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Créer un compte
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="Nom" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  name="Nom"
                  id="nom"
                  required
                  value={formData.Nom}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label htmlFor="Prenom" className="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <input
                  type="text"
                  name="Prenom"
                  id="prenom"
                  required
                  value={formData.Prenom}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="Pseudo" className="block text-sm font-medium text-gray-700">
                Pseudo
              </label>
              <input
                type="text"
                name="Pseudo"
                id="pseudo"
                required
                value={formData.Pseudo}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="Email"
                id="email"
                required
                value={formData.Email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label htmlFor="MotDePasse" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                type="password"
                name="MotDePasse"
                id="motDePasse"
                required
                value={formData.MotDePasse}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label htmlFor="ConfirmMotDePasse" className="block text-sm font-medium text-gray-700">
                Confirmez le mot de passe
              </label>
              <input
                type="password"
                name="ConfirmMotDePasse"
                id="confirmMotDePasse"
                required
                value={formData.ConfirmMotDePasse}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label htmlFor="Telephone" className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <input
                type="tel"
                name="Telephone"
                id="telephone"
                required
                value={formData.Telephone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label htmlFor="Adresse" className="block text-sm font-medium text-gray-700">
                Adresse
              </label>
              <input
                type="text"
                name="Adresse"
                id="adresse"
                required
                value={formData.Adresse}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="Role"
                id="role"
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="role" className="ml-2 block text-sm text-gray-900">
                Je souhaite être animateur
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 
