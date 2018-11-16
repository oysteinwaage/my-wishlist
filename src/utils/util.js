export const myWishlistId = myEmail => myEmail.split('@')[0].replace('.', '');
export const leggTilNyttOnskeIListe = (eksisterende, nytt) => [...eksisterende, { onskeTekst: nytt }]
export const fjernOnskeFraListe = (eksisterende, slett) => eksisterende.filter(i => i !== slett);
