import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      sidebar: {
        title: 'Content Dashboard',
        feed: 'Feed',
        trending: 'Trending',
        favorites: 'Favorites',
        settings: 'Settings',
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
      },
      header: {
        searchPlaceholder: 'Search content...',
        user: 'User',
      },
      feed: {
        title: 'Personalized Feed',
        description: 'Content tailored to your preferences',
        loadMore: 'Load More',
        loading: 'Loading...',
        noContent: 'No content available. Update your preferences to see more.',
      },
      trending: {
        title: 'Trending Now',
        description: 'Most popular content across all categories',
        noContent: 'No trending content available.',
      },
      favorites: {
        title: 'Your Favorites',
        description: 'Content you\'ve saved for later',
        noFavorites: 'No favorites yet. Start saving content you love!',
      },
      settings: {
        title: 'Settings',
        description: 'Customize your dashboard experience',
        contentPreferences: 'Content Preferences',
        contentPreferencesDesc: 'Select the categories you want to see in your feed',
        appearance: 'Appearance',
        darkModeDesc: 'Toggle dark mode for better viewing in low light',
        resetPreferences: 'Reset Preferences',
        resetPreferencesDesc: 'Reset all your preferences to default settings',
        resetButton: 'Reset All Preferences',
        language: 'Language',
      },
      auth: {
        login: 'Login',
        logout: 'Logout',
        signUp: 'Sign Up',
        email: 'Email',
        password: 'Password',
        name: 'Name',
        loginSuccess: 'Login successful!',
        logoutSuccess: 'Logout successful!',
      },
      card: {
        readMore: 'Read More',
        watchNow: 'Watch Now',
        viewPost: 'View Post',
        view: 'View',
        addToFavorites: 'Add to favorites',
        removeFromFavorites: 'Remove from favorites',
      },
      categories: {
        technology: 'Technology',
        sports: 'Sports',
        finance: 'Finance',
        movies: 'Movies',
        social: 'Social Media',
      },
    },
  },
  es: {
    translation: {
      sidebar: {
        title: 'Panel de Contenido',
        feed: 'Feed',
        trending: 'Tendencias',
        favorites: 'Favoritos',
        settings: 'Configuración',
        darkMode: 'Modo Oscuro',
        lightMode: 'Modo Claro',
      },
      header: {
        searchPlaceholder: 'Buscar contenido...',
        user: 'Usuario',
      },
      feed: {
        title: 'Feed Personalizado',
        description: 'Contenido adaptado a tus preferencias',
        loadMore: 'Cargar Más',
        loading: 'Cargando...',
        noContent: 'No hay contenido disponible. Actualiza tus preferencias para ver más.',
      },
      trending: {
        title: 'Tendencias Ahora',
        description: 'Contenido más popular en todas las categorías',
        noContent: 'No hay contenido en tendencias disponible.',
      },
      favorites: {
        title: 'Tus Favoritos',
        description: 'Contenido que has guardado para más tarde',
        noFavorites: 'Aún no tienes favoritos. ¡Empieza a guardar contenido que te guste!',
      },
      settings: {
        title: 'Configuración',
        description: 'Personaliza tu experiencia en el panel',
        contentPreferences: 'Preferencias de Contenido',
        contentPreferencesDesc: 'Selecciona las categorías que quieres ver en tu feed',
        appearance: 'Apariencia',
        darkModeDesc: 'Activa el modo oscuro para mejor visualización en poca luz',
        resetPreferences: 'Restablecer Preferencias',
        resetPreferencesDesc: 'Restablece todas tus preferencias a la configuración predeterminada',
        resetButton: 'Restablecer Todas las Preferencias',
        language: 'Idioma',
      },
      auth: {
        login: 'Iniciar Sesión',
        logout: 'Cerrar Sesión',
        signUp: 'Registrarse',
        email: 'Correo Electrónico',
        password: 'Contraseña',
        name: 'Nombre',
        loginSuccess: '¡Inicio de sesión exitoso!',
        logoutSuccess: '¡Cierre de sesión exitoso!',
      },
      card: {
        readMore: 'Leer Más',
        watchNow: 'Ver Ahora',
        viewPost: 'Ver Publicación',
        view: 'Ver',
        addToFavorites: 'Agregar a favoritos',
        removeFromFavorites: 'Eliminar de favoritos',
      },
      categories: {
        technology: 'Tecnología',
        sports: 'Deportes',
        finance: 'Finanzas',
        movies: 'Películas',
        social: 'Redes Sociales',
      },
    },
  },
  fr: {
    translation: {
      sidebar: {
        title: 'Tableau de Bord de Contenu',
        feed: 'Flux',
        trending: 'Tendances',
        favorites: 'Favoris',
        settings: 'Paramètres',
        darkMode: 'Mode Sombre',
        lightMode: 'Mode Clair',
      },
      header: {
        searchPlaceholder: 'Rechercher du contenu...',
        user: 'Utilisateur',
      },
      feed: {
        title: 'Flux Personnalisé',
        description: 'Contenu adapté à vos préférences',
        loadMore: 'Charger Plus',
        loading: 'Chargement...',
        noContent: 'Aucun contenu disponible. Mettez à jour vos préférences pour voir plus.',
      },
      trending: {
        title: 'Tendances Actuelles',
        description: 'Contenu le plus populaire dans toutes les catégories',
        noContent: 'Aucun contenu en tendance disponible.',
      },
      favorites: {
        title: 'Vos Favoris',
        description: 'Contenu que vous avez enregistré pour plus tard',
        noFavorites: 'Pas encore de favoris. Commencez à enregistrer du contenu que vous aimez!',
      },
      settings: {
        title: 'Paramètres',
        description: 'Personnalisez votre expérience du tableau de bord',
        contentPreferences: 'Préférences de Contenu',
        contentPreferencesDesc: 'Sélectionnez les catégories que vous souhaitez voir dans votre flux',
        appearance: 'Apparence',
        darkModeDesc: 'Activez le mode sombre pour une meilleure visibilité en faible luminosité',
        resetPreferences: 'Réinitialiser les Préférences',
        resetPreferencesDesc: 'Réinitialisez toutes vos préférences aux paramètres par défaut',
        resetButton: 'Réinitialiser Toutes les Préférences',
        language: 'Langue',
      },
      auth: {
        login: 'Connexion',
        logout: 'Déconnexion',
        signUp: 'S\'inscrire',
        email: 'Email',
        password: 'Mot de passe',
        name: 'Nom',
        loginSuccess: 'Connexion réussie!',
        logoutSuccess: 'Déconnexion réussie!',
      },
      card: {
        readMore: 'Lire Plus',
        watchNow: 'Regarder Maintenant',
        viewPost: 'Voir la Publication',
        view: 'Voir',
        addToFavorites: 'Ajouter aux favoris',
        removeFromFavorites: 'Retirer des favoris',
      },
      categories: {
        technology: 'Technologie',
        sports: 'Sports',
        finance: 'Finance',
        movies: 'Films',
        social: 'Réseaux Sociaux',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
