export const myWishlistId = myEmail => myEmail.replace('@', '').replace('.', '');
export const leggTilNyttOnskeIListe = (eksisterende, nytt) => [...eksisterende, { onskeTekst: nytt }]
export const fjernOnskeFraListe = (eksisterende, slett) => eksisterende.filter(i => i !== slett);

export const leggTilLenkeTilOnske = (eksisterende, lenke, valgtOnske) =>
  eksisterende.map(onske => {
    if (onske === valgtOnske) {
      return Object.assign({}, onske, {
        url: lenke,
      });
    }
    return onske;
  });
