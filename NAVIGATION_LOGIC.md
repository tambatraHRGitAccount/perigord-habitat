# Logique de Navigation par Rôle

## Rôles Utilisateurs

### 1. **Admin** (`role: "admin"`)
- ✅ Accès complet à `/admin/*`
- ✅ Accès à `/dashboard`
- ✅ Accès à `/equipment`
- ✅ Accès à `/client/*` (peut voir l'interface client)
- 🏠 Page d'accueil par défaut : `/admin/dashboard`

### 2. **Bailleur** (`role: "bailleur"`)
- ❌ Pas d'accès à `/admin/*`
- ✅ Accès à `/dashboard`
- ✅ Accès à `/equipment`
- ✅ Accès à `/client/*`
- 🏠 Page d'accueil par défaut : `/dashboard`

### 3. **Locataire** (`role: "locataire"`)
- ❌ Pas d'accès à `/admin/*`
- ❌ Pas d'accès à `/dashboard`
- ❌ Pas d'accès à `/equipment`
- ✅ Accès uniquement à `/client/*`
- 🏠 Page d'accueil par défaut : `/client/logement`

---

## Protection des Routes

### Middleware (`proxy.ts`)
Le middleware intercepte toutes les requêtes et applique les règles suivantes :

#### Routes d'authentification
- `/login`, `/register`, `/forgot-password`, `/reset-password`
- Si connecté → redirige vers la page d'accueil selon le rôle
- Si non connecté → accès autorisé

#### Routes Client (`/client/*`)
- Si non connecté → redirige vers `/client/auth/login`
- Si connecté sur `/client/auth/login` ou `/client/auth/register` → redirige vers `/client/logement`

#### Routes Admin (`/admin/*`)
- Si non connecté → redirige vers `/admin/auth/login`
- Si connecté mais pas admin → redirige vers la page d'accueil selon le rôle
- Si admin connecté sur `/admin/auth/login` → redirige vers `/admin/dashboard`

#### Routes Dashboard & Equipment (`/dashboard`, `/equipment`)
- Si non connecté → redirige vers `/login?next=[page]`
- Si connecté mais locataire → redirige vers `/client/logement`
- Si admin ou bailleur → accès autorisé

### Protection Côté Client
Les pages `/dashboard` et `/equipment` ont une double protection :

```typescript
useEffect(() => {
  const checkAuth = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push("/login");
      return;
    }

    const role = user.user_metadata?.role ?? user.app_metadata?.role;
    
    // Seuls admin et bailleur peuvent accéder
    if (role !== "admin" && role !== "bailleur") {
      router.push("/client/logement");
      return;
    }

    setIsAuthorized(true);
  };

  checkAuth();
}, [router]);
```

---

## Flux de Navigation

### Connexion d'un Admin
1. Connexion → `/admin/auth/login`
2. Authentification réussie
3. Middleware détecte `role: "admin"`
4. Redirection → `/admin/dashboard`

### Connexion d'un Bailleur
1. Connexion → `/login`
2. Authentification réussie
3. Middleware détecte `role: "bailleur"`
4. Redirection → `/dashboard`

### Connexion d'un Locataire
1. Connexion → `/client/auth/login`
2. Authentification réussie
3. Middleware détecte `role: "locataire"`
4. Redirection → `/client/logement`

### Tentative d'accès non autorisé
**Exemple : Locataire essaie d'accéder à `/dashboard`**
1. Requête vers `/dashboard`
2. Middleware vérifie l'authentification ✅
3. Middleware vérifie le rôle → `locataire` ❌
4. Redirection → `/client/logement`

---

## Fichiers Modifiés

1. **`types/user.ts`** : Ajout du rôle `"admin"` au type `UserRole`
2. **`proxy.ts`** : Logique complète de navigation et protection des routes
3. **`app/(pages)/dashboard/page.tsx`** : Protection côté client
4. **`app/(pages)/equipment/page.tsx`** : Protection côté client

---

## Tests Recommandés

### Test 1 : Locataire ne peut pas accéder au dashboard
1. Se connecter en tant que locataire
2. Essayer d'accéder à `/dashboard`
3. ✅ Devrait rediriger vers `/client/logement`

### Test 2 : Bailleur peut accéder au dashboard
1. Se connecter en tant que bailleur
2. Accéder à `/dashboard`
3. ✅ Devrait afficher le dashboard

### Test 3 : Admin a accès à tout
1. Se connecter en tant qu'admin
2. Accéder à `/admin/dashboard` ✅
3. Accéder à `/dashboard` ✅
4. Accéder à `/equipment` ✅
5. Accéder à `/client/logement` ✅

### Test 4 : Redirection après connexion
1. Admin se connecte → `/admin/dashboard`
2. Bailleur se connecte → `/dashboard`
3. Locataire se connecte → `/client/logement`
