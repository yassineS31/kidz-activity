"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDebounce } from 'use-debounce';

interface SearchResult {
  type: 'utilisateur' | 'activite' | 'categorie';
  id: number;
  name: string;
  url: string;
  description?: string;
  image?: string;
  role?: string;
}

interface GroupedResults {
  activites: SearchResult[];
  utilisateurs: SearchResult[];
  categories: SearchResult[];
}

function escapeHtml(text: string) {
  return text.replace(/[&<>"'`=\/]/g, function (s) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '`': '&#96;',
      '=': '&#61;',
      '/': '&#47;',
    } as Record<string, string>)[s];
  });
}

function sanitizeInput(input: string) {
  // Nettoyer les espaces
  return input
    .trim();
}

const SearchBar = () => {
  // Gère la navigation
  const router = useRouter();
  // Initialise les différents états
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [groupedResults, setGroupedResults] = useState<GroupedResults>({
    activites: [],
    utilisateurs: [],
    categories: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isForDropdownOpen, setIsForDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [selectedProfiles, setSelectedProfiles] = useState<number[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  
  // Références pour les éléments du DOM
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const forDropdownRef = useRef<HTMLDivElement>(null);
  const priceDropdownRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Données d'exemple pour les profils enfants
  const profiles = [
    { id: 1, name: "Emma (8 ans)" },
    { id: 2, name: "Lucas (12 ans)" },
    { id: 3, name: "Sophie (6 ans)" },
    { id: 4, name: "Tom (10 ans)" },
  ];

  // Fourchettes de prix
  const priceRanges = [
    { id: "gratuit", label: "Gratuit", value: "gratuit" },
    { id: "0-20", label: "0-20€", value: "0-20" },
    { id: "20-50", label: "20-50€", value: "20-50" },
    { id: "50-80", label: "50-80€", value: "50-80" },
    { id: "80+", label: "+80€", value: "80+" },
  ];

  // Grouper les résultats par type
  const groupResultsByType = useCallback((results: SearchResult[]): GroupedResults => {
    return results.reduce(
      (acc, result) => {
        const key = (result.type + 's') as keyof GroupedResults;
        if (acc[key]) {
          acc[key].push(result);
        }
        // Si le type n'est pas attendu, on ignore
        return acc;
      },
      { activites: [], utilisateurs: [], categories: [] } as GroupedResults
    );
  }, []);

  // Fonction de recherche optimisée
  const performSearch = useCallback(async (query: string) => {
    if (query.length < 2 || query.length > 50) {
      setSearchResults([]);
      setGroupedResults({ activites: [], utilisateurs: [], categories: [] });
      setIsDropdownOpen(false);
      return;
    }

    // Annuler la requête précédente
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Créer un nouveau controller
    abortControllerRef.current = new AbortController();

    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/search`, {
        params: {
          query,
          profiles: selectedProfiles,
          prices: selectedPrices,
          limit: 10
        },
        signal: abortControllerRef.current.signal
      });
      
      const results = response.data;
      setSearchResults(results);
      setGroupedResults(groupResultsByType(results));
      setIsDropdownOpen(results.length > 0);
      setSelectedIndex(-1);
      
    } catch (error) {
      if (axios.isCancel(error)) {
        return; // Requête annulée, ne pas traiter l'erreur
      }
      console.error("Erreur lors de la recherche:", error);
      setError("Erreur lors de la recherche");
      setSearchResults([]);
      setGroupedResults({ activites: [], utilisateurs: [], categories: [] });
      setIsDropdownOpen(false);
    } finally {
      setIsLoading(false);
    }
  }, [selectedProfiles, selectedPrices, groupResultsByType]);

  // Effet pour la recherche avec debounce
  useEffect(() => {
    performSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, performSearch]);

  // Gestion des clics extérieurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (forDropdownRef.current && !forDropdownRef.current.contains(event.target as Node)) {
        setIsForDropdownOpen(false);
      }
      if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target as Node)) {
        setIsPriceDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation au clavier
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isDropdownOpen || searchResults.length === 0) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex(prev => 
            prev < searchResults.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          event.preventDefault();
          if (selectedIndex >= 0) {
            router.push(searchResults[selectedIndex].url);
            setIsDropdownOpen(false);
          }
          break;
        case 'Escape':
          setIsDropdownOpen(false);
          searchInputRef.current?.blur();
          break;
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isDropdownOpen, searchResults, selectedIndex, router]);

  // Handlers
  const handleProfileToggle = useCallback((profileId: number) => {
    setSelectedProfiles(prev =>
      prev.includes(profileId)
        ? prev.filter(id => id !== profileId)
        : [...prev, profileId]
    );
  }, []);

  const handlePriceToggle = useCallback((priceId: string) => {
    setSelectedPrices(prev =>
      prev.includes(priceId)
        ? prev.filter(id => id !== priceId)
        : [...prev, priceId]
    );
  }, []);

  const handleResultClick = useCallback((result: SearchResult) => {
    router.push(result.url);
    setIsDropdownOpen(false);
    setSearchTerm("");
  }, [router]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setSearchResults([]);
    setIsDropdownOpen(false);
    searchInputRef.current?.focus();
  }, []);

  // Highlight du terme recherché
  const highlightMatch = useCallback((text: string, query: string) => {
    if (!query) return escapeHtml(text);
    const regex = new RegExp(`(${escapeHtml(query)})`, 'gi');
    return escapeHtml(text).replace(regex, '<mark class="bg-emerald-200">$1</mark>');
  }, []);

  // Rendu des groupes de résultats
  const renderResultGroup = useCallback((title: string, results: SearchResult[], icon: string) => {
    if (results.length === 0) return null;

    return (
      <div key={title} className="mb-2 last:mb-0">
        <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {icon} {title}
        </div>
        {results.map((result) => {
          const globalIndex = searchResults.findIndex(r => r.id === result.id);
          return (
            <div
              key={`${result.type}-${result.id}`}
              onClick={() => handleResultClick(result)}
              className={`px-3 py-2 hover:bg-gray-50 cursor-pointer ${
                globalIndex === selectedIndex ? 'bg-purple-50' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {result.type === 'utilisateur'
                    ? result.role === 'animateur'
                      ? '👨‍🏫'
                      : result.role === 'parent'
                        ? '👨‍👧‍👦'
                        : '👤'
                    : result.type === 'activite'
                      ? '🎯'
                      : '📁'}
                </span>
                <div className="flex-1">
                  <div 
                    className="text-gray-900 font-medium flex items-center"
                    dangerouslySetInnerHTML={{ 
                      __html: highlightMatch(result.name, debouncedSearchTerm) 
                    }}
                  />
                  {result.type === 'utilisateur' && result.role && (
                    <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-gray-200 text-gray-700">
                      {result.role.charAt(0).toUpperCase() + result.role.slice(1)}
                    </span>
                  )}
                  {result.description && (
                    <div 
                      className="text-sm text-gray-500 truncate"
                      dangerouslySetInnerHTML={{ 
                        __html: highlightMatch(result.description, debouncedSearchTerm) 
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [searchResults, selectedIndex, handleResultClick, highlightMatch, debouncedSearchTerm]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white h-14 rounded-2xl shadow-lg p-4 flex items-center gap-4">
        <div className="flex-1 relative" ref={dropdownRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Rechercher une activité, un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(sanitizeInput(e.target.value))}
              onFocus={() => searchResults.length > 0 && setIsDropdownOpen(true)}
              className="w-full h-8 pl-10 pr-10 rounded-xl py-3 text-purple bg-purple-light placeholder-gray-400 border-none outline-none text-lg"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Dropdown des résultats de recherche */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border max-h-96 overflow-y-auto z-20">
              {isLoading && (
                <div className="px-3 py-4 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple mx-auto"></div>
                  <div className="mt-2">Recherche en cours...</div>
                </div>
              )}
              
              {error && (
                <div className="px-3 py-4 text-center text-red-500">
                  {error}
                </div>
              )}
              
              {!isLoading && !error && searchResults.length === 0 && debouncedSearchTerm.length >= 2 && (
                <div className="px-3 py-4 text-center text-gray-500">
                  Aucun résultat trouvé pour &apos;{debouncedSearchTerm}&apos;
                </div>
              )}
              
              {!isLoading && !error && searchResults.length > 0 && (
                <div className="py-2">
                  {renderResultGroup("Activités", groupedResults.activites, "🎯")}
                  {renderResultGroup("Utilisateurs", groupedResults.utilisateurs, "👤")}
                  {renderResultGroup("Catégories", groupedResults.categories, "📁")}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dropdown "Pour" */}
        <div className="relative" ref={forDropdownRef}>
          <button
            onClick={() => {
              setIsForDropdownOpen(!isForDropdownOpen);
              setIsPriceDropdownOpen(false);
            }}
            className="w-28 h-8 mx-auto flex justify-center items-center gap-2 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-150 transition-colors"
          >
            <span className="text-purple font-medium">Pour</span>
            <ChevronDown
              className={`w-4 h-4 text-purple transition-transform ${
                isForDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isForDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white rounded-xl shadow-lg border p-2 min-w-48 z-10">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  onClick={() => handleProfileToggle(profile.id)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedProfiles.includes(profile.id)
                        ? "bg-purple border-purple"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedProfiles.includes(profile.id) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-gray-700">{profile.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dropdown "Prix" */}
        <div className="relative" ref={priceDropdownRef}>
          <button
            onClick={() => {
              setIsPriceDropdownOpen(!isPriceDropdownOpen);
              setIsForDropdownOpen(false);
            }}
            className="w-28 h-8 mx-auto flex justify-center items-center bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-150 transition-colors"
          >
            <span className="text-purple font-medium">Prix</span>
            <ChevronDown
              className={`w-4 h-4 text-purple transition-transform ${
                isPriceDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isPriceDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white rounded-xl shadow-lg border p-2 min-w-40 z-10">
              {priceRanges.map((price) => (
                <div
                  key={price.id}
                  onClick={() => handlePriceToggle(price.id)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedPrices.includes(price.id)
                        ? "bg-purple border-purple"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedPrices.includes(price.id) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-gray-700">{price.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button 
          onClick={() => performSearch(searchTerm)} 
          size={"rounded"} 
          variant="greenway"
          disabled={isLoading}
        >
          {isLoading ? "Recherche..." : "Chercher"}
        </Button>
      </div>

      {/* Indicateurs de sélection */}
      {(selectedProfiles.length > 0 || selectedPrices.length > 0) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedProfiles.map((profileId) => {
            const profile = profiles.find((p) => p.id === profileId);
            return (
              <span
                key={profileId}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
              >
                {profile?.name}
              </span>
            );
          })}
          {selectedPrices.map((priceId) => {
            const price = priceRanges.find((p) => p.id === priceId);
            return (
              <span
                key={priceId}
                className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm"
              >
                {price?.label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
