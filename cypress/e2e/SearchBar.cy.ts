describe("SearchBar Component", () => {
  beforeEach(() => {
    // Récupération de l'API de recherche
    cy.intercept("GET", "**/api/search*", {
      fixture: "searchResults.json",
    }).as("searchAPI");

    // Visiter la page d'accueil
    cy.visit("http://localhost:3000");
  });

  describe("Interface utilisateur de base", () => {
    it("affiche tous les éléments de l'interface", () => {
      // Vérifier la présence du champ de recherche
      cy.get('input[placeholder*="Rechercher une activité"]').should(
        "be.visible"
      );

      // Vérifier les boutons de filtre
      cy.contains("button", "Pour").should("be.visible");
      cy.contains("button", "Prix").should("be.visible");

      // Vérifier le bouton de recherche
      cy.contains("button", "Chercher").should("be.visible");
    });

    it("a le placeholder correct dans le champ de recherche", () => {
      cy.get('input[placeholder*="Rechercher une activité"]').should(
        "have.attr",
        "placeholder",
        "Rechercher une activité, un utilisateur..."
      );
    });
  });

  describe("Fonctionnalité de recherche", () => {
    it("effectue une recherche avec debounce", () => {
      const searchTerm = "football";

      cy.get('input[placeholder*="Rechercher une activité"]').type(searchTerm, {
        delay: 100,
      });

      // Attendre le debounce (300ms)
      cy.wait(350);

      // Vérifier que l'API est appelée
      cy.wait("@searchAPI").then((interception) => {
        expect(interception.request.query.query).to.equal(searchTerm);
      });
    });

    it("affiche les résultats de recherche", () => {
      cy.get('input[placeholder*="Rechercher une activité"]')
        .wait(350)
        .type("football");

      cy.wait("@searchAPI");

      // Vérifier que le dropdown est visible
      cy.get('[data-cy="search-dropdown"]', { timeout: 1000 }).should(
        "be.visible"
      );
    });

    it("n'effectue pas de recherche pour moins de 2 caractères", () => {
      cy.get('input[placeholder*="Rechercher une activité"]').type("f");

      cy.wait(350);

      // Vérifier que l'API n'est pas appelée
      cy.get("@searchAPI.all").should("have.length", 0);

      // Vérifier que le dropdown n'est pas visible
      cy.get('[data-cy="search-dropdown"]').should("not.exist");
    });

    it("efface la recherche avec le bouton X", () => {
      cy.get('input[placeholder*="Rechercher une activité"]').type("football");

      // Cliquer sur le bouton de suppression
      cy.get('[data-lucide="x"]').click();

      // Vérifier que le champ est vide
      cy.get('input[placeholder*="Rechercher une activité"]').should(
        "have.value",
        ""
      );

      // Vérifier que le dropdown est fermé
      cy.get('[data-cy="search-dropdown"]').should("not.exist");
    });
  });

  describe("Navigation au clavier", () => {
    beforeEach(() => {
      // Effectuer une recherche pour avoir des résultats
      cy.get('input[placeholder*="Rechercher une activité"]').type("football");
      cy.wait("@searchAPI");
    });

    it("navigue avec les flèches du clavier", () => {
      cy.get('input[placeholder*="Rechercher une activité"]')
        .focus()
        .type("{downarrow}");

      // Vérifier que le premier élément est sélectionné
      cy.get('[data-cy="search-result"]:first').should(
        "have.class",
        "bg-purple-50"
      );
    });

    it("sélectionne un résultat avec Enter", () => {
      cy.get('input[placeholder*="Rechercher une activité"]')
        .focus()
        .type("{downarrow}")
        .type("{enter}");

      // Vérifier la navigation (à adapter selon votre routeur)
      cy.url().should("include", "/activite/");
    });

    it("ferme le dropdown avec Escape", () => {
      cy.get('input[placeholder*="Rechercher une activité"]')
        .focus()
        .type("{esc}");

      cy.get('[data-cy="search-dropdown"]').should("not.exist");
    });
  });

  describe("Filtres - Profils", () => {
    it("ouvre et ferme le dropdown des profils", () => {
      cy.contains("button", "Pour").click();

      cy.get('[data-cy="profile-dropdown"]').should("be.visible");

      // Fermer en cliquant à l'extérieur
      cy.get("body").click(0, 0);
      cy.get('[data-cy="profile-dropdown"]').should("not.exist");
    });

    it("sélectionne et désélectionne des profils", () => {
      cy.contains("button", "Pour").click();

      // Sélectionner Emma
      cy.contains("Emma (8 ans)").click();

      // Vérifier que la checkbox est cochée
      cy.contains("Emma (8 ans)")
        .parent()
        .find('[data-lucide="check"]')
        .should("be.visible");

      // Vérifier l'indicateur de sélection
      cy.contains(".bg-purple-100", "Emma (8 ans)").should("be.visible");

      // Désélectionner
      cy.contains("Emma (8 ans)").click();
      cy.get(".bg-purple-100").should("not.exist");
    });

    it("applique les filtres de profil à la recherche", () => {
      // Sélectionner un profil
      cy.contains("button", "Pour").click();
      cy.contains("Emma (8 ans)").click();
      cy.get("body").click(0, 0); // Fermer le dropdown

      // Effectuer une recherche
      cy.get('input[placeholder*="Rechercher une activité"]').type("football");

      cy.wait("@searchAPI").then((interception) => {
        expect(interception.request.query.profiles).to.include("1");
      });
    });
  });

  describe("Filtres - Prix", () => {
    it("ouvre et ferme le dropdown des prix", () => {
      cy.contains("button", "Prix").click();

      cy.get('[data-cy="price-dropdown"]').should("be.visible");

      // Fermer en cliquant ailleurs
      cy.get("body").click(0, 0);
      cy.get('[data-cy="price-dropdown"]').should("not.exist");
    });

    it("sélectionne des fourchettes de prix", () => {
      cy.contains("button", "Prix").click();

      // Sélectionner "Gratuit"
      cy.contains("Gratuit").click();

      // Vérifier l'indicateur
      cy.contains(".bg-emerald-100", "Gratuit").should("be.visible");

      // Sélectionner une autre fourchette
      cy.contains("0-20€").click();
      cy.contains(".bg-emerald-100", "0-20€").should("be.visible");
    });

    it("applique les filtres de prix à la recherche", () => {
      // Sélectionner un prix
      cy.contains("button", "Prix").click();
      cy.contains("Gratuit").click();
      cy.get("body").click(0, 0);

      // Effectuer une recherche
      cy.get('input[placeholder*="Rechercher une activité"]').type("football");

      cy.wait("@searchAPI").then((interception) => {
        expect(interception.request.query.prices).to.include("gratuit");
      });
    });
  });

  describe("Interactions avec les résultats", () => {
    beforeEach(() => {
      cy.get('input[placeholder*="Rechercher une activité"]').type("football");
      cy.wait("@searchAPI");
    });

    it("affiche les icônes correctes selon le type", () => {
      // Vérifier les icônes pour chaque type
      cy.get('[data-cy="search-result"]').each(($el) => {
        const resultType = $el.attr("data-type");

        if (resultType === "activite") {
          cy.wrap($el).should("contain", "🎯");
        } else if (resultType === "utilisateur") {
          cy.wrap($el).should("contain.oneOf", ["👨‍🏫", "👨‍👧‍👦", "👤"]);
        } else if (resultType === "categorie") {
          cy.wrap($el).should("contain", "📁");
        }
      });
    });

    it("surligne le terme recherché", () => {
      cy.get('[data-cy="search-result"]')
        .first()
        .find("mark.bg-emerald-200")
        .should("exist");
    });

    it("navigue vers le bon URL en cliquant sur un résultat", () => {
      cy.get('[data-cy="search-result"]').first().click();

      // Vérifier la navigation (à adapter selon vos URLs)
      cy.url().should("not.equal", Cypress.config().baseUrl + "/");
    });
  });

  describe("États de chargement et d'erreur", () => {
    it("affiche un indicateur de chargement", () => {
      // Mock d'une réponse lente
      cy.intercept("GET", "**/api/search*", {
        delay: 2000,
        fixture: "searchResults.json",
      }).as("slowSearchAPI");

      cy.get('input[placeholder*="Rechercher une activité"]').type("football");

      // Vérifier l'indicateur de chargement
      cy.contains("Recherche en cours...").should("be.visible");
      cy.get(".animate-spin").should("be.visible");
    });

    it("affiche un message d'erreur en cas d'échec", () => {
      // Mock d'une erreur API
      cy.intercept("GET", "**/api/search*", {
        statusCode: 500,
        body: { error: "Erreur serveur" },
      }).as("errorSearchAPI");

      cy.get('input[placeholder*="Rechercher une activité"]').type("football");

      cy.wait("@errorSearchAPI");

      cy.contains("Erreur lors de la recherche").should("be.visible");
    });

    it("affiche un message quand aucun résultat n'est trouvé", () => {
      // Mock d'une réponse vide
      cy.intercept("GET", "**/api/search*", {
        body: [],
      }).as("emptySearchAPI");

      cy.get('input[placeholder*="Rechercher une activité"]').type("zzzzz");

      cy.wait("@emptySearchAPI");

      cy.contains("Aucun résultat trouvé").should("be.visible");
    });
  });

  describe("Bouton de recherche manuel", () => {
    it("déclenche une recherche en cliquant sur le bouton", () => {
      cy.get('input[placeholder*="Rechercher une activité"]').type("football", {
        delay: 0,
      }); // Pas de delay pour éviter le debounce

      cy.contains("button", "Chercher").click();

      cy.wait("@searchAPI");
    });

    it("est désactivé pendant le chargement", () => {
      cy.intercept("GET", "**/api/search*", {
        delay: 1000,
        fixture: "searchResults.json",
      }).as("slowSearchAPI");

      cy.get('input[placeholder*="Rechercher une activité"]').type("football");

      cy.contains("button", "Recherche...").should("be.disabled");
    });
  });

  describe("Sécurité et validation", () => {
    it("échappe les caractères HTML dans les résultats", () => {
      const maliciousInput = '<script>alert("xss")</script>';

      cy.get('input[placeholder*="Rechercher une activité"]').type(
        maliciousInput
      );

      // Vérifier que le script n'est pas exécuté
      cy.get('[data-cy="search-result"]').should("not.contain", "<script>");
    });

    it("nettoie les espaces en début et fin", () => {
      cy.get('input[placeholder*="Rechercher une activité"]').type(
        "  football  "
      );

      cy.wait("@searchAPI").then((interception) => {
        expect(interception.request.query.query).to.equal("football");
      });
    });
  });

  describe("Responsive et accessibilité", () => {
    it("est utilisable sur mobile", () => {
      cy.viewport("iphone-x");

      cy.get('input[placeholder*="Rechercher une activité"]')
        .should("be.visible")
        .type("football");

      cy.wait("@searchAPI");

      cy.get('[data-cy="search-dropdown"]').should("be.visible");
    });
  });
});
