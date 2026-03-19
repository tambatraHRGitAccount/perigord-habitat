-- ============================================================
-- TABLE : ai_responses
-- Mémoire de l'IA "Qui fait quoi ?" basée sur perigord.md
-- Décret n°87-712 du 26 août 1987 + Loi n°89-462 du 6 juillet 1989
-- ============================================================

CREATE TABLE public.ai_responses (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  category        text        NOT NULL, -- 'salutation','general','sejour','cuisine','salle_de_bains','exterieur','cas_particulier','fuite','chauffage','electricite','humidite','nuisibles'
  piece           text,                 -- pièce concernée (peut être null pour les réponses générales)
  problem         text        NOT NULL, -- nom court du problème
  keywords        text[]      NOT NULL, -- mots-clés déclencheurs (minuscules, sans accent)
  responsable     text,                 -- 'locataire','bailleur','contrat_entretien','a_verifier',null pour salutations
  response        text        NOT NULL, -- réponse complète de l'IA
  legal_ref       text,                 -- référence légale
  priority        integer     NOT NULL DEFAULT 0, -- plus élevé = préféré si plusieurs matchs
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- Index pour accélérer la recherche par keywords
CREATE INDEX ai_responses_keywords_idx ON public.ai_responses USING GIN (keywords);
CREATE INDEX ai_responses_priority_idx ON public.ai_responses (priority DESC);

-- Lecture publique (pas besoin d'être connecté pour lire la base de connaissance)
ALTER TABLE public.ai_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lecture publique" ON public.ai_responses FOR SELECT USING (true);
-- Seul le service role peut écrire
CREATE POLICY "Service role uniquement en écriture" ON public.ai_responses FOR INSERT WITH CHECK (false);


-- ============================================================
-- FONCTION RPC : match_ai_response
-- Retourne la meilleure réponse pour un message utilisateur
-- Scoring : nombre de mots-clés matchés + priorité
-- ============================================================

CREATE OR REPLACE FUNCTION public.match_ai_response(user_input text)
RETURNS TABLE (
  id          uuid,
  category    text,
  problem     text,
  responsable text,
  response    text,
  legal_ref   text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  normalized text;
BEGIN
  -- L'input arrive déjà normalisé (sans accents, minuscules) depuis le client
  normalized := lower(user_input);

  RETURN QUERY
  SELECT
    r.id,
    r.category,
    r.problem,
    r.responsable,
    r.response,
    r.legal_ref
  FROM public.ai_responses r
  WHERE EXISTS (
    SELECT 1
    FROM unnest(r.keywords) AS kw
    WHERE
      -- Match direct : l'input contient le mot-clé complet
      normalized ILIKE '%' || kw || '%'
      OR
      -- Match inverse : un mot du mot-clé (> 3 chars) est présent dans l'input
      -- Ex: keyword "robinet cuisine" → teste "robinet" et "cuisine" séparément
      EXISTS (
        SELECT 1
        FROM unnest(string_to_array(kw, ' ')) AS kw_word
        WHERE length(kw_word) > 3
          AND normalized ILIKE '%' || kw_word || '%'
      )
  )
  ORDER BY
    -- Score fort : mots-clés complets trouvés dans l'input
    (
      SELECT COUNT(*)
      FROM unnest(r.keywords) AS kw
      WHERE normalized ILIKE '%' || kw || '%'
    ) * 3
    +
    -- Score faible : mots individuels des keywords trouvés dans l'input
    (
      SELECT COUNT(*)
      FROM unnest(r.keywords) AS kw
      WHERE EXISTS (
        SELECT 1
        FROM unnest(string_to_array(kw, ' ')) AS kw_word
        WHERE length(kw_word) > 3
          AND normalized ILIKE '%' || kw_word || '%'
      )
    )
    +
    r.priority
  DESC
  LIMIT 1;
END;
$$;


-- ============================================================
-- DONNÉES : Salutations & interactions basiques
-- ============================================================

INSERT INTO ai_responses (category, piece, problem, keywords, responsable, response, legal_ref, priority) VALUES

('salutation', NULL, 'Bonjour / Hello', ARRAY['bonjour','bonsoir','salut','hello','hi','hey','coucou','bjr'],
NULL,
'Bonjour ! Je suis votre assistant "Qui fait quoi ?", la plateforme de Périgord Habitat.

Je suis là pour vous aider à comprendre, en cas de panne ou de problème dans votre logement :
• Qui doit intervenir ? (vous ou le bailleur)
• Qui paie la réparation ?
• Quelle est la base légale ?
• Comment diagnostiquer ou réparer soi-même ?

Décrivez-moi votre problème, ou choisissez une pièce parmi : séjour, cuisine, salle de bains, extérieur.',
NULL, 100),

('salutation', NULL, 'Merci', ARRAY['merci','super','parfait','nickel','excellent','bravo','top'],
NULL,
'De rien ! C''est avec plaisir.

N''hésitez pas à me poser d''autres questions sur votre logement. Je suis là pour vous aider à y voir clair sur vos droits et obligations en tant que locataire.',
NULL, 90),

('salutation', NULL, 'Au revoir', ARRAY['au revoir','aurevoir','bye','bonne journee','bonne soiree','a bientot','ciao'],
NULL,
'Au revoir ! Bonne journée.

N''oubliez pas : en cas d''urgence (fuite importante, panne de chauffage en hiver, danger électrique), contactez directement votre agence Périgord Habitat ou les services d''urgence.',
NULL, 90),

('salutation', NULL, 'Aide / Comment ça marche', ARRAY['aide','help','comment','utiliser','comment ca marche','comment utiliser','je sais pas','je ne sais pas'],
NULL,
'Voici comment utiliser cet assistant :

1️⃣ Décrivez votre problème en texte libre
   Ex : "mon robinet fuit", "le chauffage ne marche pas"

2️⃣ Vous pouvez aussi joindre une photo ou une vidéo pour aider au diagnostic

3️⃣ Je vous indique immédiatement :
   • Qui doit intervenir (vous, le bailleur, ou un prestataire sous contrat)
   • Qui paie
   • La base légale
   • Les gestes à faire en premier

Essayez maintenant en décrivant votre problème !',
NULL, 95),

('salutation', NULL, 'Présentation de l''IA', ARRAY['qui es tu','tu es quoi','tu fais quoi','c''est quoi','presentation','tu peux faire quoi','tes capacites'],
NULL,
'Je suis l''assistant intelligent de la plateforme "Qui fait quoi ?" de Périgord Habitat.

Ma mission :
• Vous expliquer qui est responsable de chaque réparation dans votre logement
• Distinguer les réparations locatives (à votre charge) des réparations non locatives (à la charge du bailleur)
• Vous indiquer les équipements couverts par les contrats d''entretien
• Vous guider dans les démarches à effectuer

Je m''appuie sur le Décret n°87-712 du 26 août 1987 et la Loi n°89-462 du 6 juillet 1989.',
'Loi n°89-462 du 6 juillet 1989', 80);


-- ============================================================
-- DONNÉES : Informations générales / légales
-- ============================================================

INSERT INTO ai_responses (category, piece, problem, keywords, responsable, response, legal_ref, priority) VALUES

('general', NULL, 'Décret 1987 / Base légale', ARRAY['decret','loi','legal','texte','reglementation','1987','89-462','87-712','juridique','reference'],
NULL,
'La répartition des réparations entre locataire et bailleur est encadrée par deux textes :

📜 Décret n°87-712 du 26 août 1987
→ Liste précisément les réparations locatives (à votre charge en tant que locataire)
→ Principe : entretien courant et petites réparations = locataire

📜 Loi n°89-462 du 6 juillet 1989 (articles 7c et 7d)
→ Oblige le locataire à l''entretien courant du logement
→ Le bailleur assure les gros travaux et la vétusté

En résumé :
• Usure normale du quotidien → Locataire
• Panne, vétusté, gros travaux → Bailleur
• Équipements sous contrat → Prestataire via charges',
'Décret n°87-712 du 26 août 1987', 70),

('general', NULL, 'Réparations locatives', ARRAY['reparation locative','entretien courant','a ma charge','charge locataire','dois-je payer','je dois payer'],
'locataire',
'Les réparations locatives sont les petites réparations et l''entretien courant que le locataire doit assurer à ses frais.

🔧 Exemples de réparations à votre charge :
• Joints (robinets, douche, baignoire, WC)
• Débouchage des éviers, WC, siphons
• Entretien des volets (sangle, manivelle)
• Remplacement des interrupteurs et prises cassés
• Entretien des sols (vitrification parquet)
• Papier peint abîmé, peinture dégradée
• Entretien du jardin, haies, pelouse

⚠️ Attention : si la dégradation est due à la vétusté (usure normale du temps), c''est au bailleur d''intervenir.',
'Décret n°87-712 du 26 août 1987', 70),

('general', NULL, 'Contrat d''entretien', ARRAY['contrat entretien','sous contrat','couvert','maintenance','prestataire','charges'],
'contrat_entretien',
'Certains équipements de votre logement sont couverts par des contrats d''entretien inclus dans vos charges mensuelles.

🔵 Équipements sous contrat d''entretien :
• Chaudière (gaz ou fioul)
• Cumulus / chauffe-eau gaz
• VMC (Ventilation Mécanique Contrôlée)
• Ascenseur
• Fosse septique
• Insert de cheminée
• Détecteurs de fumée (DAAF)

En cas de panne sur ces équipements :
→ Contactez votre agence Périgord Habitat
→ Un prestataire agréé interviendra
→ Vous n''avancez pas les frais (couverts par vos charges)',
NULL, 70),

('general', NULL, 'Comment signaler un problème', ARRAY['signaler','declaration','comment faire','demarche','contacter bailleur','agence','contact'],
NULL,
'Pour signaler un problème à votre bailleur Périgord Habitat :

📞 Par téléphone : contactez votre agence locale
📧 Par email : via votre espace locataire en ligne
📝 Par courrier recommandé : pour les demandes importantes (gardez une copie)

💡 Conseils :
• Signalez le problème rapidement (évite l''aggravation)
• Décrivez précisément la panne ou le désordre
• Joignez des photos si possible
• En cas de litige, privilégiez l''écrit (email ou recommandé)
• Conservez tous les échanges

⚡ Urgences (fuite importante, panne électrique dangereuse, panne chauffage en hiver) : contactez directement l''agence pour une intervention rapide.',
NULL, 65),

('general', NULL, 'Qui est le bailleur', ARRAY['bailleur','proprietaire','perigord habitat','organisme','hlm','bailleur social'],
NULL,
'Périgord Habitat est votre bailleur social (organisme HLM).

En tant que bailleur, Périgord Habitat est responsable de :
🏠 La structure du bâtiment (toiture, murs porteurs, fondations)
🔧 Les grosses réparations et gros travaux
⚡ Le bon fonctionnement des installations à la livraison
📋 Les équipements sous contrat d''entretien
🕰️ La vétusté (usure normale liée au temps)

Vos obligations en tant que locataire :
• Entretien courant du logement
• Petites réparations (liste décret 1987)
• Signalement rapide des problèmes',
NULL, 65);


-- ============================================================
-- DONNÉES : Séjour
-- ============================================================

INSERT INTO ai_responses (category, piece, problem, keywords, responsable, response, legal_ref, priority) VALUES

('sejour', 'sejour', 'Papier peint / Peinture murale', ARRAY['papier peint','tapisserie','mur','peinture','crayonne','dessine','tache','griffure','egratignu'],
'locataire',
'👤 Responsable : Locataire
💰 Qui paie : Locataire

Le remplacement et l''entretien des revêtements muraux (papier peint, peinture) sont à la charge du locataire.

🔧 Que faire :
• Vous pouvez repeindre ou reposer du papier peint vous-même
• Pour les taches importantes ou les griffures, procédez à la réfection avant l''état des lieux de sortie
• Choisissez des couleurs neutres pour faciliter la relocation

⚠️ Attention : si les murs sont fissurés (structure) ou humides (infiltration), c''est au bailleur d''intervenir. Signalez-le.',
'Décret n°87-712 du 26 août 1987 – Revêtements intérieurs', 80),

('sejour', 'sejour', 'Interrupteur / Prise électrique', ARRAY['interrupteur','prise','courant','electricite','electrique','allumage','lumiere','eclairage','commutateur'],
'locataire',
'👤 Responsable : Locataire (pour l''entretien et les petites réparations)
💰 Qui paie : Locataire

🔧 Que faire en premier :
1. Coupez le disjoncteur général avant toute intervention
2. Vérifiez si le disjoncteur différentiel a sauté (tableau électrique)
3. Réenclenchez le disjoncteur et testez
4. Si une prise ou un interrupteur est cassé : remplacez-le (en coupant le courant !)

⚠️ Limites :
• Installation électrique vétuste ou dangereuse → Bailleur
• Tableau électrique défectueux → Bailleur
• Court-circuit répété sans cause identifiée → Signalez au bailleur

En cas de doute, ne touchez pas à l''installation et contactez votre agence.',
'Décret n°87-712 du 26 août 1987 – Installations électriques', 80),

('sejour', 'sejour', 'Volet / Persienne', ARRAY['volet','persienne','sangle','manivelle','treuil','store','volet roulant','fermeture','ouverture volet'],
'locataire',
'👤 Responsable : Locataire
💰 Qui paie : Locataire

Les petites réparations des volets sont à votre charge.

🔧 Que faire selon le problème :
• Sangle cassée → Remplacez la sangle (disponible en bricolage, ~10€)
• Manivelle cassée → Remplacez la manivelle
• Treuil bloqué → Débloquez ou remplacez le treuil
• Vitre de volet cassée → Remplacez la vitre
• Mastic détérioré → Refaites le mastic

⚠️ Si le mécanisme motorisé est défaillant (volet roulant électrique) et que c''est dû à la vétusté → contactez le bailleur.',
'Décret n°87-712 du 26 août 1987 – Menuiseries extérieures', 80),

('sejour', 'sejour', 'Détecteur de fumée (DAAF)', ARRAY['detecteur fumee','daaf','alarme','alarme incendie','fumee','pile detecteur','bip','bruit detecteur'],
'contrat_entretien',
'🔵 Responsable : Contrat d''entretien (Bailleur via charges)
💰 Qui paie : Inclus dans vos charges

Le détecteur de fumée (DAAF) est sous contrat d''entretien.

🔧 Que faire :
• Si le détecteur émet un bip continu (pile faible) → Contactez votre agence Périgord Habitat
• Si le détecteur ne fonctionne plus → Contactez votre agence
• Ne retirez jamais le détecteur de son emplacement
• Ne le couvrez pas (torchon, sac)

⚠️ Obligation légale : La présence d''un DAAF est obligatoire dans chaque logement (loi du 9 mars 2010). Le bailleur est responsable de son installation et de son entretien.',
'Loi n°2010-238 du 9 mars 2010 – Détecteurs de fumée', 85),

('sejour', 'sejour', 'Sol / Parquet / Carrelage', ARRAY['sol','parquet','carrelage','plancher','revetement sol','dalle','lino','linoleum','vitrification','sol abime'],
'locataire',
'👤 Responsable : Locataire (entretien courant et petites réparations)
💰 Qui paie : Locataire

🔧 Que faire selon le problème :
• Parquet terne → Vitrifiez ou huilez le parquet
• Lame de parquet décollée → Recollez ou remplacez la lame
• Carrelage fissuré (impact) → Remplacez le carreau
• Lino décollé → Recolllez ou remplacez

⚠️ Exceptions (Bailleur) :
• Carrelage fissuré suite à un mouvement de structure
• Parquet pourri suite à une infiltration
• Sol décollé sur grande surface sans cause locative
→ Signalez au bailleur avec photos',
'Décret n°87-712 du 26 août 1987 – Revêtements de sol', 75),

('sejour', 'sejour', 'Thermostat / Programmateur', ARRAY['thermostat','programmateur','temperature','reglage chauffage','thermostatique','vanne thermostatique'],
'locataire',
'👤 Responsable : Locataire (nettoyage et petites réparations)
💰 Qui paie : Locataire

🔧 Que faire :
• Thermostat ne répond plus → Vérifiez les piles, remplacez si nécessaire
• Vanne thermostatique bloquée → Tournez doucement, débloquez manuellement
• Programmateur défaillant → Réinitialisez selon la notice

⚠️ Si le problème persiste après ces vérifications, le thermostat ou la vanne est peut-être défaillant(e). Contactez votre agence Périgord Habitat pour remplacement (couvert contrat d''entretien si lié à la chaudière).',
'Décret n°87-712 du 26 août 1987', 70);


-- ============================================================
-- DONNÉES : Cuisine
-- ============================================================

INSERT INTO ai_responses (category, piece, problem, keywords, responsable, response, legal_ref, priority) VALUES

('cuisine', 'cuisine', 'Évier bouché / Siphon', ARRAY['evier','bouche','bouchon','siphon','debouchage','evier cuisine','lavabo','deboucher'],
'locataire',
'👤 Responsable : Locataire
💰 Qui paie : Locataire

Le débouchage des appareils sanitaires (évier, lavabo, douche) est à votre charge.

🔧 Comment déboucher :
1. Utilisez une ventouse (pompe à déboucher) vigoureusement
2. Retirez et nettoyez le siphon (placez un seau en dessous)
3. Versez du bicarbonate + vinaigre blanc, attendez 30 min, rincez à l''eau chaude
4. Utilisez un déboucheur enzymatique (respectueux des canalisations)

⚠️ Évitez les produits chimiques forts (acide chlorhydrique) qui abîment les canalisations.

Si le problème vient d''une canalisation encastrée bouchée (bouchon collectif) → contactez le bailleur.',
'Décret n°87-712 du 26 août 1987 – Installations sanitaires', 85),

('cuisine', 'cuisine', 'Serrure / Porte / Clé', ARRAY['serrure','cle','porte','verrou','fermeture','barillet','cle perdue','cle cassee','serrure cuisine'],
'locataire',
'👤 Responsable : Locataire
💰 Qui paie : Locataire

La serrure et ses réparations courantes sont à votre charge.

🔧 Que faire :
• Clé perdue → Faites faire un double chez un serrurier (à vos frais)
• Clé cassée dans la serrure → Appelez un serrurier, les frais sont à votre charge
• Serrure qui grippe → Lubrifiez avec de la graisse ou de la poudre de graphite
• Barillet défaillant → Remplacez le barillet (serrurier, ~50-100€)

⚠️ Si la porte d''entrée ne ferme plus à la suite d''une effraction → déposez plainte, contactez bailleur + assurance. Les frais peuvent être partagés selon les circonstances.',
'Décret n°87-712 du 26 août 1987 – Serrures', 85),

('cuisine', 'cuisine', 'Radiateur qui chauffe mal / Purge', ARRAY['radiateur froid','purge','radiateur chauffe mal','pas chaud','tiede','radiateur cuisine','chauffage cuisine','bruit radiateur'],
'contrat_entretien',
'🔵 Responsable : Contrat d''entretien (Bailleur via charges)
💰 Qui paie : Inclus dans vos charges

🔧 Que faire en premier :
1. Vérifiez que la vanne du radiateur est bien ouverte (tournez à gauche = ouvrir)
2. Purgez le radiateur : tournez la vis de purge avec la clé de purge jusqu''à entendre l''air sortir, fermez quand l''eau coule
3. Vérifiez que tous les radiateurs du logement sont concernés ou un seul

Si le problème persiste après purge :
→ Contactez votre agence Périgord Habitat
→ Le prestataire sous contrat interviendra

⚠️ Ne démontez pas le radiateur vous-même.',
'Contrat d''entretien de chauffage collectif', 85),

('cuisine', 'cuisine', 'Radiateur électrique / Convecteur HS', ARRAY['convecteur','radiateur electrique','radiateur hs','convecteur hs','panne radiateur electrique','radiateur ne chauffe plus','panneau rayonnant'],
'bailleur',
'🔴 Responsable : Bailleur
💰 Qui paie : Bailleur

Le remplacement d''un radiateur électrique (convecteur) défaillant est à la charge du bailleur.

🔧 Que faire :
1. Vérifiez que le disjoncteur du circuit chauffage n''a pas sauté
2. Testez l''alimentation électrique de la prise de courant
3. Si le convecteur est réellement HS → contactez votre agence Périgord Habitat
4. Signalez par écrit (email ou recommandé) pour garder une trace

⚠️ En hiver, le bailleur a l''obligation d''assurer le chauffage. Une panne prolongée peut justifier une demande d''urgence.',
'Loi n°89-462 du 6 juillet 1989 – Obligation de délivrance', 85),

('cuisine', 'cuisine', 'Flexible gaz / Tuyau gaz', ARRAY['gaz','flexible gaz','tuyau gaz','perime','date gaz','odeur gaz','fuite gaz'],
'locataire',
'👤 Responsable : Locataire (remplacement du flexible)
💰 Qui paie : Locataire

⚠️ SÉCURITÉ D''ABORD si vous sentez du gaz :
1. N''allumez AUCUN interrupteur, ne fumez pas
2. Ouvrez les fenêtres
3. Fermez le robinet de gaz
4. Evacuez le logement
5. Appelez le 0800 47 33 33 (numéro d''urgence gaz, gratuit) ou le 18

Pour le flexible ordinaire (non urgent) :
• Vérifiez la date imprimée sur le flexible (durée de vie max : 10 ans)
• Remplacez-le avant expiration (disponible en bricolage, ~15-25€)
• Achetez un flexible NF avec date de fabrication récente',
'Arrêté du 2 août 1977 – Installations de gaz', 95),

('cuisine', 'cuisine', 'Interphone / Visiophone / Sonnette', ARRAY['interphone','visiophone','sonnette','portier','digicode','interphonie','portier video'],
'locataire',
'👤 Responsable : Locataire (entretien courant)
💰 Qui paie : Locataire

🔧 Que faire :
• Sonnette sans pile → Remplacez les piles
• Sonnette filaire défaillante → Vérifiez le câblage visible
• Interphone qui grésille → Nettoyez les contacts
• Visiophone HS → Contactez votre agence (l''installation est plus complexe)

⚠️ Si l''interphone collectif (côté hall d''entrée) est en panne → c''est la charge du bailleur ou du syndic. Contactez votre agence.',
'Décret n°87-712 du 26 août 1987', 75),

('cuisine', 'cuisine', 'Robinet machine à laver', ARRAY['machine a laver','lave linge','robinet machine','arrivee eau machine','raccordement machine','tuyau machine'],
'locataire',
'👤 Responsable : Locataire
💰 Qui paie : Locataire

L''entretien du raccordement de la machine à laver (robinet d''arrêt, tuyaux) est à votre charge.

🔧 Que faire :
• Robinet qui goutte → Changez le joint (fermez l''eau d''abord)
• Tuyau d''alimentation fissuré → Remplacez le tuyau (disponible en bricolage)
• Tuyau d''évacuation qui fuit → Vérifiez le raccord et la courbure
• Vibrations excessives → Réglez les pieds de la machine, mettez un tapis anti-vibrations

⚠️ Si la fuite provient d''une canalisation encastrée → contactez le bailleur.',
'Décret n°87-712 du 26 août 1987', 75),

('cuisine', 'cuisine', 'Robinet de cuisine qui fuit', ARRAY['robinet cuisine','robinetterie cuisine','mitigeur cuisine','joint robinet','robinet qui goutte','goutte a goutte cuisine'],
'locataire',
'👤 Responsable : Locataire
💰 Qui paie : Locataire

Un robinet qui goutte doit être réparé rapidement (coût sur votre facture d''eau).

🔧 Comment réparer :
1. Coupez l''eau au robinet d''arrêt sous l''évier
2. Démontez le robinet (dévisser le cache, la vis, le chapeau)
3. Remplacez le joint usé (joint plat ou céramique selon le modèle, ~2-5€)
4. Remontez, rouvrez l''eau et testez

💡 Un robinet qui goutte = environ 35 litres d''eau par jour = surcoût sur votre facture !

⚠️ Si la robinetterie est très ancienne et vétuste → contactez le bailleur.',
'Décret n°87-712 du 26 août 1987 – Robinetterie', 80);


-- ============================================================
-- DONNÉES : Salle de bains
-- ============================================================

INSERT INTO ai_responses (category, piece, problem, keywords, responsable, response, legal_ref, priority) VALUES

('salle_de_bains', 'salle_de_bains', 'Joint sanitaire / Baignoire / Douche', ARRAY['joint','joint baignoire','joint douche','joint sanitaire','etancheite','silicon','mastic joint','joint sdb'],
'locataire',
'👤 Responsable : Locataire
💰 Qui paie : Locataire

Le changement des joints sanitaires (baignoire, douche, lavabo) est à votre charge.

🔧 Comment refaire un joint :
1. Découpez et retirez l''ancien joint (cutter, grattoir)
2. Nettoyez et séchez parfaitement la surface
3. Masquez avec du ruban adhésif de chaque côté
4. Appliquez le silicone en un seul passage régulier
5. Lissez avec le doigt humide ou une spatule
6. Retirez le ruban immédiatement
7. Laissez sécher 24h avant contact avec l''eau

💡 Produits : silicone sanitaire blanc (~5-8€ en bricolage)

⚠️ Un joint défaillant peut causer des infiltrations et des dégâts des eaux chez les voisins. Intervenez rapidement.',
'Décret n°87-712 du 26 août 1987 – Installations sanitaires', 85),

('salle_de_bains', 'salle_de_bains', 'Chasse d''eau qui coule / WC', ARRAY['chasse eau','toilettes','wc','coule','chasse defaillante','mecanisme wc','flotteur','wc coule'],
'locataire',
'👤 Responsable : Locataire
💰 Qui paie : Locataire

Une chasse d''eau qui coule en permanence représente jusqu''à 200 litres d''eau gaspillés par jour !

🔧 Comment réparer :
1. Fermez le robinet d''arrêt (derrière ou sous le WC)
2. Ouvrez le réservoir
3. Vérifiez et remplacez le flotteur s''il est percé ou mal réglé
4. Remplacez le joint de chasse si l''eau s''écoule sous le clapet
5. Ajustez la tige du flotteur pour couper l''arrivée au bon niveau

💡 Kit de réparation complet WC : ~15-25€ en bricolage

⚠️ Si le mécanisme complet est hors service (très vieux) → remplacez l''ensemble du mécanisme de chasse.',
'Décret n°87-712 du 26 août 1987 – Appareils sanitaires', 85),

('salle_de_bains', 'salle_de_bains', 'Robinet / Fuite eau salle de bains', ARRAY['robinet sdb','robinet salle de bains','mitigeur','robinet baignoire','robinet douche','fuite robinet sdb','joint robinet sdb'],
'locataire',
'👤 Responsable : Locataire (en général)
💰 Qui paie : Locataire

Un robinet qui fuit doit être réparé rapidement pour éviter une note d''eau salée.

🔧 Que faire :
1. Coupez l''eau au robinet d''arrêt
2. Identifiez la source : fuite au niveau du bec ? du corps ? du dessous ?
3. Remplacez le joint correspondant
4. Pour un mitigeur : remplacez la cartouche céramique (~10-20€)

⚠️ Exceptions (Bailleur) :
• Robinetterie très ancienne impossible à réparer (pièces introuvables)
• Fuite provenant d''une canalisation encastrée
→ Signalez au bailleur avec photos',
'Décret n°87-712 du 26 août 1987 – Robinetterie', 85),

('salle_de_bains', 'salle_de_bains', 'Ventilation / Grille VMC', ARRAY['ventilation','grille','aeration','vmc sdb','odeur sdb','humidite sdb','aerer','buee','moisissures sdb'],
'locataire',
'👤 Responsable : Locataire (nettoyage des grilles)
🔵 VMC elle-même : Contrat d''entretien

🔧 Ce que vous devez faire :
• Nettoyez régulièrement la grille de ventilation (aspirateur + chiffon)
• Ne bouchez JAMAIS la grille (ni avec du papier, ni avec un torchon)
• Aérez quotidiennement la salle de bains (10 min après douche)

⚠️ Si la VMC ne tourne plus ou est très bruyante → contactez votre agence Périgord Habitat. C''est couvert par le contrat d''entretien.

💡 Une mauvaise ventilation cause moisissures, humidité excessive et dégradation des murs. Signalez tout problème rapidement.',
'Décret n°87-712 du 26 août 1987', 80),

('salle_de_bains', 'salle_de_bains', 'Cumulus / Chauffe-eau / Eau chaude', ARRAY['cumulus','chauffe eau','eau chaude','ballon eau chaude','chauffe bain','plus eau chaude','eau froide','ballon'],
'contrat_entretien',
'🔵 Responsable : Contrat d''entretien (Bailleur via charges)
💰 Qui paie : Inclus dans vos charges

🔧 Que faire en premier :
1. Vérifiez que le disjoncteur du cumulus n''a pas sauté
2. Vérifiez que le thermostat est bien réglé (55-60°C recommandé)
3. Attendez 2-3h après la remise sous tension avant d''avoir de l''eau chaude

Si le problème persiste :
→ Contactez votre agence Périgord Habitat
→ Précisez : type d''appareil (électrique/gaz), volume, symptômes

⚠️ Urgence : si vous entendez des bruits anormaux forts, voyez de l''eau s''écouler du groupe de sécurité en permanence → coupez le cumulus et contactez l''agence rapidement.',
'Contrat d''entretien – chauffe-eau', 90),

('salle_de_bains', 'salle_de_bains', 'WC / Toilettes bouchés', ARRAY['wc bouche','toilettes bouchees','cuvette','deboucher wc','debouchage wc'],
'locataire',
'👤 Responsable : Locataire
💰 Qui paie : Locataire

🔧 Comment déboucher les WC :
1. Utilisez une ventouse WC (pompe haute pression) : 10-15 mouvements vigoureux
2. Utilisez un furet (spirale métallique) pour les bouchons profonds
3. Versez de l''eau chaude (pas bouillante) avec du liquide vaisselle
4. Produit enzymatique déboucheur (respectueux des canalisations)

❌ Évitez :
• Jeter des lingettes (même "biodégradables")
• Papier trop épais, coton, objets solides

Si le bouchon est collectif (plusieurs logements concernés) → contactez le bailleur.',
'Décret n°87-712 du 26 août 1987 – Installations sanitaires', 80),

('salle_de_bains', 'salle_de_bains', 'Baignoire / Douche bouchée', ARRAY['baignoire bouchee','douche bouchee','bonde','evacuation douche','siphon douche','bonde baignoire'],
'locataire',
'👤 Responsable : Locataire
💰 Qui paie : Locataire

🔧 Comment déboucher :
1. Retirez et nettoyez la bonde / grille d''évacuation (souvent des cheveux)
2. Utilisez une ventouse
3. Retirez et nettoyez le siphon
4. Produit déboucheur enzymatique

💡 Préventif : posez un filtre de bonde pour retenir les cheveux (~3€)',
'Décret n°87-712 du 26 août 1987', 75);


-- ============================================================
-- DONNÉES : Extérieur
-- ============================================================

INSERT INTO ai_responses (category, piece, problem, keywords, responsable, response, legal_ref, priority) VALUES

('exterieur', 'exterieur', 'Cave / Cellier', ARRAY['cave','cellier','debarras','local','cave sale','rangement'],
'locataire',
'👤 Responsable : Locataire
💰 Qui paie : Locataire

L''entretien de tous les locaux loués (cave, cellier) est à votre charge.

🔧 Vos obligations :
• Maintenir la cave propre et dégagée
• Ne pas stocker de produits dangereux ou inflammables
• Assurer une bonne ventilation (ne pas boucher les aérations)
• Signaler toute infiltration au bailleur

⚠️ Si la cave est humide à cause d''infiltrations extérieures → c''est au bailleur d''intervenir sur l''étanchéité. Signalez avec photos.',
'Loi n°89-462 du 6 juillet 1989 – Article 7', 70),

('exterieur', 'exterieur', 'Balcon / Terrasse', ARRAY['balcon','terrasse','evacuation balcon','bouchon balcon','balcon bouche','nettoyage balcon'],
'locataire',
'👤 Responsable : Locataire (entretien courant)
💰 Qui paie : Locataire

🔧 Vos obligations :
• Débouchage des évacuations d''eau du balcon/terrasse (feuilles, dépôts)
• Nettoyage régulier du balcon
• Entretien des plantes et bacs à fleurs

⚠️ Structure du balcon (fissures, descellement) → Bailleur
⚠️ Garde-corps instable → Signalez IMMÉDIATEMENT au bailleur (sécurité)

💡 Pensez à vérifier les évacuations à l''automne pour éviter les débordements en cas de forte pluie.',
'Décret n°87-712 du 26 août 1987', 75),

('exterieur', 'exterieur', 'Jardin / Pelouse / Haies', ARRAY['jardin','pelouse','haie','taille','tonte','gazon','arbuste','arbre','jardinage','herbe'],
'locataire',
'👤 Responsable : Locataire
💰 Qui paie : Locataire

L''entretien du jardin privatif est entièrement à votre charge.

🔧 Vos obligations :
• Tonte régulière de la pelouse
• Taille des haies et arbustes
• Désherbage des allées
• Entretien des massifs

⚠️ Arbres à abattre (dangereux, trop grands) → concertez-vous avec le bailleur. Pour les gros travaux d''abattage, une autorisation peut être nécessaire.

⚠️ En quittant le logement, le jardin doit être dans le même état qu''à votre arrivée (voir état des lieux d''entrée).',
'Décret n°87-712 du 26 août 1987', 75),

('exterieur', 'exterieur', 'Porte d''entrée / Porte palière', ARRAY['porte entree','porte paliere','entree','porte principale','fermeture porte entree','poignee porte entree'],
'locataire',
'👤 Responsable : Locataire (entretien courant)
💰 Qui paie : Locataire (petites réparations)

🔧 Vos obligations :
• Lubrifier les gonds et la serrure
• Remplacer les joints de porte si nécessaire
• Entretenir la poignée

⚠️ Structure de la porte (bois pourri, encadrement abîmé) → Bailleur
⚠️ En cas d''effraction → déposez plainte + contactez bailleur + assurance

💡 Si la porte ferme mal sans cause locative (déformation du bâtiment) → signalez au bailleur.',
'Décret n°87-712 du 26 août 1987', 70),

('exterieur', 'exterieur', 'Garage / Parking / Portail', ARRAY['garage','portail','poignee garage','serrure garage','porte garage','parking','box'],
'locataire',
'👤 Responsable : Locataire (entretien courant)
💰 Qui paie : Locataire

🔧 Vos obligations :
• Lubrifier les charnières et mécanismes du garage
• Entretenir la serrure/poignée
• Maintenir le garage propre

⚠️ Mécanisme motorisé défaillant (vétusté) → contactez le bailleur
⚠️ Structure endommagée → Bailleur',
'Décret n°87-712 du 26 août 1987', 70),

('exterieur', 'exterieur', 'Cheminée / Insert', ARRAY['cheminee','insert','foyer','feu','bois','poele','flambee','feux de cheminee'],
'contrat_entretien',
'🔵 Responsable : Contrat d''entretien (Bailleur via charges)
💰 Qui paie : Inclus dans vos charges

Les inserts et cheminées sont couverts par contrat d''entretien.

🔧 Que faire :
• Pour tout problème de fonctionnement → contactez votre agence Périgord Habitat
• N''intervenez pas vous-même sur le conduit ou l''appareil

⚠️ IMPORTANT : Le ramonage est OBLIGATOIRE (voir entrée ramonage). Sans ramonage, votre assurance peut refuser d''indemniser en cas d''incendie.',
'Arrêté du 22 octobre 1969 – Ramonage', 80),

('exterieur', 'exterieur', 'Ramonage / Conduit de cheminée', ARRAY['ramonage','ramoneur','conduit','fumee','tirage','conduit cheminee','ramoner'],
'contrat_entretien',
'🔵 Responsable : Contrat d''entretien (Bailleur via charges)
💰 Qui paie : Inclus dans vos charges

Le ramonage est une obligation légale annuelle.

📋 Points importants :
• Fréquence : 1 fois par an minimum (2 fois si utilisation intensive)
• Un professionnel certifié doit intervenir
• Conservez le certificat de ramonage (exigé par votre assurance)

🔧 Que faire :
→ Contactez votre agence Périgord Habitat pour programmer le ramonage
→ Le prestataire sous contrat interviendra

⚠️ Sans ramonage, votre assurance peut refuser de couvrir un sinistre incendie de cheminée.',
'Arrêté du 22 octobre 1969 – Ramonage obligatoire', 85),

('exterieur', 'exterieur', 'Chaudière', ARRAY['chaudiere','chaudiere gaz','chaudiere fioul','chaudiere en panne','chauffage central','bruleur','chaudiere hs'],
'contrat_entretien',
'🔵 Responsable : Contrat d''entretien (Bailleur via charges)
💰 Qui paie : Inclus dans vos charges

La chaudière est entièrement couverte par le contrat d''entretien.

🔧 Que faire en cas de panne :
1. Vérifiez la pression du circuit (manomètre : doit être entre 1 et 2 bar)
2. Si pression trop basse → re-pressurisez via le robinet de remplissage (consulter la notice)
3. Vérifiez que le disjoncteur de la chaudière n''a pas sauté
4. Réinitialisez via le bouton reset si disponible
5. Si panne persiste → contactez IMMÉDIATEMENT votre agence Périgord Habitat

⚠️ En hiver, une panne de chaudière est une urgence. Le bailleur doit intervenir dans les meilleurs délais.',
'Contrat d''entretien de chaudière', 90),

('exterieur', 'exterieur', 'VMC / Ventilation Mécanique', ARRAY['vmc','ventilation mecanique','ventilation controlee','extracteur','bouche ventilation','ventilation en panne','air'],
'contrat_entretien',
'🔵 Responsable : Contrat d''entretien (Bailleur via charges)
💰 Qui paie : Inclus dans vos charges

La VMC est couverte par contrat d''entretien.

🔧 Que faire :
• Nettoyez régulièrement les bouches de ventilation (aspirateur, chiffon)
• Ne bouchez jamais les bouches de ventilation

Si la VMC est en panne ou très bruyante :
→ Contactez votre agence Périgord Habitat

⚠️ Une VMC défaillante entraîne humidité, moisissures et mauvaise qualité de l''air. Ne tardez pas à signaler.',
'Contrat d''entretien VMC', 80),

('exterieur', 'exterieur', 'Fosse septique', ARRAY['fosse septique','assainissement','fosse','vidange fosse','tout a l egout','eaux usees','assainissement non collectif'],
'contrat_entretien',
'🔵 Responsable : Contrat d''entretien (Bailleur via charges)
💰 Qui paie : Inclus dans vos charges

La fosse septique est sous contrat d''entretien.

🔧 Que faire :
• Signalez tout problème (mauvaises odeurs, débordement) à votre agence
• N''introduisez pas de produits chimiques agressifs dans les WC (détruisent les bactéries)
• Limitez les lingettes et graisses

→ Pour la vidange, contactez votre agence Périgord Habitat.',
'Contrat d''entretien – assainissement non collectif', 75),

('exterieur', 'exterieur', 'Ascenseur', ARRAY['ascenseur','elevateur','ascenseur en panne','ascenseur bloque'],
'contrat_entretien',
'🔵 Responsable : Contrat d''entretien (Bailleur via charges)
💰 Qui paie : Inclus dans vos charges

🚨 Si vous êtes bloqué dans l''ascenseur :
1. Appuyez sur le bouton d''alarme (cloche rouge)
2. Appelez le 18 (pompiers) ou le 112

Pour toute panne ou anomalie :
→ Contactez votre agence Périgord Habitat
→ Un prestataire spécialisé interviendra sous contrat',
'Contrat d''entretien ascenseur', 90);


-- ============================================================
-- DONNÉES : Cas particuliers / "Ça dépend"
-- ============================================================

INSERT INTO ai_responses (category, piece, problem, keywords, responsable, response, legal_ref, priority) VALUES

('cas_particulier', NULL, 'Vétusté / Usure normale', ARRAY['vetuste','usure','vieux','ancien','age','deteriore','deterioration','normal','anciennete'],
'a_verifier',
'⚪ Responsable : À vérifier — Peut être à la charge du Bailleur

La vétusté désigne l''usure normale d''un équipement ou d''un revêtement liée au passage du temps, indépendante de l''usage du locataire.

📋 Principe :
• Si la dégradation est due au temps et à l''usure normale → Bailleur
• Si la dégradation est due à un mauvais usage ou une négligence → Locataire

🔧 Que faire :
→ Contactez votre agence Périgord Habitat et décrivez précisément la situation
→ Demandez une visite technique pour évaluer l''état
→ Conservez des photos datées

💡 La grille de vétusté (si prévue au bail) fixe des durées de vie standard pour chaque élément.',
'Loi n°89-462 du 6 juillet 1989 – Article 20-1', 85),

('cas_particulier', NULL, 'Sinistre / Dégât des eaux', ARRAY['sinistre','degat des eaux','inondation','fuite voisin','degat','assurance','eau plafond','plafond mouille','ecoulement'],
'a_verifier',
'⚪ Responsable : À vérifier selon l''origine

En cas de dégât des eaux :

🚨 Actions immédiates :
1. Coupez l''eau au compteur si la fuite vient de chez vous
2. Prévenez les voisins si besoin
3. Protégez vos meubles et affaires

📞 Dans les 5 jours ouvrés :
• Déclarez le sinistre à votre assurance habitation
• Informez votre bailleur par écrit (email ou recommandé)
• Remplissez un constat amiable dégât des eaux avec le voisin concerné

📋 Responsabilités :
• Fuite canalisation encastrée → Bailleur
• Joint défaillant (robinet, douche) → Locataire
• Fuite du voisin → Assurance du voisin

⚠️ Conservez toutes les preuves (photos, factures).',
'Article L.122-7 du Code des assurances', 95),

('cas_particulier', NULL, 'Effraction / Vandalisme / Cambriolage', ARRAY['effraction','vandalisme','cambriolage','vol','intrusion','brise','casse par effraction','degrade'],
'a_verifier',
'⚪ Responsable : À vérifier selon les circonstances

En cas d''effraction ou de vandalisme :

🚨 Actions immédiates :
1. Appelez le 17 (Police/Gendarmerie)
2. Ne touchez à rien avant le passage des forces de l''ordre
3. Déposez plainte (indispensable pour l''assurance)
4. Sécurisez votre logement (serrurier si nécessaire)

📞 Dans les 5 jours ouvrés :
• Déclarez le sinistre à votre assurance habitation
• Contactez votre bailleur par écrit

💰 Qui paie les réparations :
• Porte fracturée, serrure forcée → Assurance (avec la plainte)
• Si pas d''assurance → Locataire en principe
• Parties communes → Bailleur ou syndic',
'Article L.113-1 du Code des assurances', 95),

('cas_particulier', NULL, 'Dégradation / Casse par le locataire', ARRAY['casse','degrade','degradation','accident','bris','trou','mur perce','fenetre cassee'],
'locataire',
'👤 Responsable : Locataire
💰 Qui paie : Locataire (au prix du neuf si dégradation intentionnelle)

En cas de dégradation causée par le locataire :

📋 Principe légal :
• Dégradation accidentelle → Locataire responsable, couvert par assurance habitation
• Dégradation intentionnelle → Locataire paie au prix du neuf
• Usure normale → Non imputable au locataire

🔧 Que faire :
1. Déclarez à votre assurance habitation (responsabilité civile couvre souvent les dégâts accidentels)
2. Réparez avant l''état des lieux de sortie si possible
3. Informez le bailleur si les dégâts sont importants

⚠️ À l''état des lieux de sortie, le bailleur peut retenir sur le dépôt de garantie le coût des réparations dues à des dégradations.',
'Loi n°89-462 du 6 juillet 1989 – Articles 7 et 22', 85),

('cas_particulier', NULL, 'Parties communes / Couloir / Hall', ARRAY['parties communes','couloir','cage escalier','hall','palier','commun','escalier','couloir immeuble'],
'a_verifier',
'⚪ Responsable : Bailleur / Syndic (parties communes)

Les parties communes (hall, couloir, cage d''escalier, local poubelles) sont sous la responsabilité du bailleur ou du syndic.

🔧 Que faire :
• Problème dans les parties communes → Contactez votre agence Périgord Habitat
• Gardien sur place → Signalez-lui directement
• Urgence (éclairage éteint la nuit, porte d''entrée cassée) → Contactez l''agence rapidement

⚠️ Vous n''êtes pas responsable de l''entretien des parties communes, mais vous devez les traiter avec soin.',
NULL, 80),

('cas_particulier', NULL, 'Amiante / Plomb / Logement ancien', ARRAY['amiante','plomb','logement ancien','avant 1999','materiau dangereux','fibre','saturnisme','diagnostic'],
'a_verifier',
'⚪ Responsable : Bailleur (obligation légale)

⚠️ PRÉCAUTIONS IMPORTANTES :

Si votre logement est antérieur à 1997 (amiante) ou 1949 (plomb) :

🚫 NE PAS :
• Percer les murs sans vérification
• Poncer les revêtements
• Gratter les peintures

✅ QUE FAIRE :
1. Contactez votre agence Périgord Habitat AVANT tous travaux
2. Demandez les diagnostics amiante et plomb (DTA, CREP)
3. Signalez tout matériau suspect

📋 Obligations du bailleur :
• Fournir les diagnostics obligatoires
• Prendre en charge les travaux de désamiantage/déplombage
• Informer le locataire des risques

⚠️ En cas d''exposition accidentelle → consultez un médecin.',
'Loi n°98-1194 du 23 décembre 1998 – Amiante', 90);


-- ============================================================
-- DONNÉES : Fuite d'eau (général)
-- ============================================================

INSERT INTO ai_responses (category, piece, problem, keywords, responsable, response, legal_ref, priority) VALUES

('fuite', NULL, 'Fuite d''eau générale', ARRAY['fuite','fuit','fuite eau','eau qui coule','ecoulement','canalisation','tuyau qui fuit'],
'a_verifier',
'💧 Fuite d''eau : agissez vite !

🚨 Actions immédiates :
1. Fermez le robinet d''arrêt général (sous l''évier ou au compteur)
2. Coupez le disjoncteur si l''eau touche des prises électriques (DANGER !)
3. Protégez vos affaires

📋 Qui est responsable ?

• Joint de robinet, siphon, bonde → Locataire
• Canalisation encastrée, colonne commune → Bailleur
• Fuite du voisin → Assurance du voisin + bailleur
• Chauffe-eau, cumulus → Contrat d''entretien

🔧 Que faire ensuite :
→ Identifiez l''origine précise de la fuite
→ Si origine incertaine ou canalisation encastrée → contactez votre agence Périgord Habitat IMMÉDIATEMENT
→ Signalez par écrit (email) pour garder une trace

⚠️ Une fuite non traitée peut causer des dégâts chez les voisins et vous rendre responsable.',
'Décret n°87-712 du 26 août 1987', 95),

('fuite', NULL, 'Compteur d''eau / Coupure eau', ARRAY['compteur','compteur eau','coupure eau','plus eau','eau coupee','arrivee eau'],
'a_verifier',
'💧 Plus d''eau dans le logement

🔧 Que vérifier :
1. Le robinet d''arrêt général de votre logement est-il ouvert ?
2. Y a-t-il une coupure collective (travaux, incident réseau) ?
3. Vos voisins ont-ils de l''eau ?
4. Avez-vous une facture d''eau impayée ?

📞 Que faire :
• Coupure collective → Contactez votre agence Périgord Habitat ou le service des eaux
• Problème individuel → Contactez votre agence

⚠️ Si la coupure est due à un impayé, régularisez rapidement (droit à l''eau minimum garanti).',
NULL, 80);


-- ============================================================
-- DONNÉES : Chauffage (général)
-- ============================================================

INSERT INTO ai_responses (category, piece, problem, keywords, responsable, response, legal_ref, priority) VALUES

('chauffage', NULL, 'Panne chauffage générale', ARRAY['chauffage','panne chauffage','pas de chauffage','chauffage en panne','froid','plus de chaud','temperature','chauffage collectif'],
'contrat_entretien',
'🔥 Chauffage en panne

🔧 Vérifications rapides :
1. Vérifiez que tous vos radiateurs sont concernés ou seulement un
2. Contrôlez la vanne de chaque radiateur (ouverte = à gauche)
3. Vérifiez la pression de la chaudière (entre 1 et 2 bar)
4. Purgez les radiateurs froids

📋 Selon l''origine :
• Chaudière individuelle HS → Contrat d''entretien, contactez l''agence
• Chauffage collectif coupé → Contactez votre agence IMMÉDIATEMENT
• Radiateur électrique HS → Bailleur

⚠️ En période hivernale, une panne de chauffage est une URGENCE. Le bailleur a l''obligation de chauffage minimum. Signalez immédiatement.',
'Loi n°89-462 du 6 juillet 1989 – Décence du logement', 95),

('chauffage', NULL, 'Chauffage collectif', ARRAY['chauffage collectif','chaufferie','reseau chaleur','circuit collectif','chaudiere collective'],
'contrat_entretien',
'🔵 Responsable : Contrat d''entretien collectif
💰 Qui paie : Inclus dans les charges collectives

Le chauffage collectif est géré par un prestataire sous contrat.

🔧 Que faire :
→ Contactez votre agence Périgord Habitat en précisant :
• L''adresse complète et le numéro de logement
• La date et l''heure de la panne
• Si d''autres logements sont concernés

⚠️ En cas de panne collective, l''agence coordonne l''intervention. Ne tardez pas à signaler.',
'Contrat d''entretien chauffage collectif', 85);


-- ============================================================
-- DONNÉES : Électricité (général)
-- ============================================================

INSERT INTO ai_responses (category, piece, problem, keywords, responsable, response, legal_ref, priority) VALUES

('electricite', NULL, 'Panne électricité / Plus de courant', ARRAY['panne electricite','plus de courant','disjoncteur','tableau electrique','coupure electricite','electricite coupee','tout eteint'],
'locataire',
'⚡ Plus de courant dans le logement

🔧 Procédure étape par étape :
1. Vérifiez le tableau électrique (coffret) : un disjoncteur a-t-il sauté ?
2. Remettez en position les disjoncteurs déclenchés (levier vers le haut)
3. Si le disjoncteur re-saute immédiatement → débranchez tous les appareils du circuit concerné
4. Rebranchez un par un pour identifier l''appareil en défaut
5. Si le disjoncteur général (différentiel) a sauté → cherchez un appareil défaillant ou une fuite à la terre

📞 Si la panne vient du réseau extérieur :
→ Contactez Enedis (0809 404 404, service ouvert 24h/24)

⚠️ Si vous voyez des fils brûlés, sentez une odeur de brûlé ou voyez des étincelles → COUPEZ le disjoncteur général et contactez un électricien + le bailleur.',
'Décret n°87-712 du 26 août 1987', 90),

('electricite', NULL, 'Ampoule / Luminaire', ARRAY['ampoule','lumiere','luminaire','eclairage','lampe','spot','plafond','lustre'],
'locataire',
'👤 Responsable : Locataire (remplacement des ampoules)
💰 Qui paie : Locataire

🔧 Que faire :
• Ampoule grillée → Remplacez-la (même culot, même puissance ou équivalent LED)
• Luminaire cassé → Réparez ou remplacez à vos frais
• Interrupteur ne répond plus → Vérifiez le disjoncteur, puis remplacez l''interrupteur

💡 Privilégiez les ampoules LED (plus économiques et durables).

⚠️ Luminaire encastré défaillant (câblage interne) → Contactez le bailleur si l''installation est ancienne et dangereuse.',
'Décret n°87-712 du 26 août 1987', 70);


-- ============================================================
-- DONNÉES : Humidité / Moisissures
-- ============================================================

INSERT INTO ai_responses (category, piece, problem, keywords, responsable, response, legal_ref, priority) VALUES

('humidite', NULL, 'Moisissures / Humidité / Condensation', ARRAY['moisissures','moisissure','humidite','humide','condensation','buee','champignon','noir','tache noire'],
'a_verifier',
'⚪ Responsable : À déterminer selon l''origine

Les moisissures peuvent avoir deux causes :

📋 Cause 1 – Comportement du locataire (Locataire) :
• Logement insuffisamment aéré
• Linge séché dans le logement sans ventilation
• VMC/grilles bouchées

🔧 Solutions locataire :
• Aérez 10 min matin et soir
• Ne bouchez pas les grilles de ventilation
• Évitez de sécher le linge en intérieur
• Traitez avec un produit antimoisissures (spray)

📋 Cause 2 – Problème structurel (Bailleur) :
• Infiltration depuis l''extérieur
• Isolation thermique insuffisante (pont thermique)
• VMC défaillante

🔧 Que faire si suspect structurel :
→ Signalez au bailleur avec photos
→ Demandez une visite technique',
'Décret n°2002-120 du 30 janvier 2002 – Logement décent', 85),

('humidite', NULL, 'Infiltration / Dégât humidité', ARRAY['infiltration','eau rentrer','plafond mouille','mur mouille','eau exterieure','plafond gonfle','peinture qui gonfle'],
'bailleur',
'🔴 Responsable : Bailleur
💰 Qui paie : Bailleur

Une infiltration depuis l''extérieur est à la charge du bailleur.

🚨 Que faire :
1. Prenez des photos immédiatement (avec date)
2. Protégez vos affaires
3. Contactez votre agence Périgord Habitat PAR ÉCRIT (email ou recommandé)
4. Décrivez précisément : localisation, ampleur, depuis quand

📋 Origines fréquentes :
• Toiture défaillante → Bailleur
• Façade fissurée → Bailleur
• Fenêtre mal étanche (menuiserie vétuste) → Bailleur
• Joint de fenêtre défaillant → Locataire

⚠️ Gardez toutes les preuves. En cas de dégâts sur vos affaires, déclarez à votre assurance habitation.',
'Loi n°89-462 du 6 juillet 1989 – Décence et entretien', 90);


-- ============================================================
-- DONNÉES : Nuisibles
-- ============================================================

INSERT INTO ai_responses (category, piece, problem, keywords, responsable, response, legal_ref, priority) VALUES

('nuisibles', NULL, 'Cafards / Souris / Nuisibles', ARRAY['cafard','cafards','blatte','souris','rat','rongeur','nuisible','insecte','fourmi','araignee'],
'a_verifier',
'⚪ Responsable : À vérifier selon l''origine et le bail

📋 Principe général :
• Infestation présente à l''entrée dans le logement → Bailleur
• Infestation due au comportement du locataire (nourriture laissée, hygiène) → Locataire
• Infestation collective (tout l''immeuble) → Bailleur / Syndic

🔧 Que faire :
1. Identifiez le type de nuisible
2. Utilisez des pièges ou insecticides adaptés en premier recours
3. Bouchez les fissures et passages (silicone)
4. Si infestation importante ou collective → contactez votre agence Périgord Habitat

⚠️ Signalez toujours au bailleur une infestation, même si vous la gérez, pour éviter la propagation.',
NULL, 75),

('nuisibles', NULL, 'Punaises de lit', ARRAY['punaise','punaises','piqure nuit','lit','matelas','insecte lit','nuisible lit'],
'a_verifier',
'⚪ Responsable : À vérifier (souvent partagé)

Les punaises de lit sont un problème sérieux qui nécessite une intervention professionnelle.

🚨 Actions immédiates :
1. Ne déplacez pas les meubles dans l''appartement (risque de propagation)
2. Lavez draps et vêtements à 60°C minimum
3. Contactez IMMÉDIATEMENT votre agence Périgord Habitat

📋 Traitement :
• Le bailleur peut organiser un traitement collectif
• Un professionnel certifié doit intervenir
• Plusieurs passages sont souvent nécessaires

⚠️ Ne tentez pas de traiter seul avec des sprays du commerce : inefficace sur les œufs et risque de propagation.',
NULL, 85);
