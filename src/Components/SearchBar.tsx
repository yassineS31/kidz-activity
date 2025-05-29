"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Button } from "./ui/button";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isForDropdownOpen, setIsForDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [selectedProfiles, setSelectedProfiles] = useState<number[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  // Références pour les dropdowns
  const forDropdownRef = useRef<HTMLDivElement>(null);
  const priceDropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        forDropdownRef.current &&
        !forDropdownRef.current.contains(event.target as Node)
      ) {
        setIsForDropdownOpen(false);
      }
      if (
        priceDropdownRef.current &&
        !priceDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPriceDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileToggle = (profileId: number) => {
    setSelectedProfiles((prev) =>
      prev.includes(profileId)
        ? prev.filter((id) => id !== profileId)
        : [...prev, profileId]
    );
  };

  const handlePriceToggle = (priceId: string) => {
    setSelectedPrices((prev) =>
      prev.includes(priceId)
        ? prev.filter((id) => id !== priceId)
        : [...prev, priceId]
    );
  };

  const handleSearch = () => {
    console.log("Recherche:", {
      searchTerm,
      selectedProfiles,
      selectedPrices,
    });
    // Ici ajouter logique métier
  };

  return (
    <div className="w-full  max-w-4xl mx-auto p-4">
      <div className="bg-white h-14 rounded-2xl shadow-lg p-4 flex items-center gap-4">
        {/* Input de recherche */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Rechercher une activité"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-8 px-4 rounded-xl py-3 text-purple bg-purple-light placeholder-gray-400 border-none outline-none text-lg"
          />
        </div>

        {/* Dropdown "Pour" */}
        <div className="relative" ref={forDropdownRef}>
          <button
            onClick={() => {
              setIsForDropdownOpen(!isForDropdownOpen);
              setIsPriceDropdownOpen(false);
            }}
            className="w-28 h-8 mx-auto flex justify-center items-center gap-2  bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-150 transition-colors"
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
        <div className="relative " ref={priceDropdownRef}>
          <button
            onClick={() => {
              setIsPriceDropdownOpen(!isPriceDropdownOpen);
              setIsForDropdownOpen(false);
            }}
            className="w-28 h-8 mx-auto flex justify-center items-center  bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-150 transition-colors"
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

        {/* Bouton Rechercher */}
        <Button onClick={handleSearch} size={"rounded"} variant="greenway">
          Chercher
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
