import { auth } from '../config/firebase';

export const myWishlistId = () => auth.currentUser.uid;
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

export const markerOnskeSomKjopt = (eksisterende, kjoptOnske, kjopt) => {
  return eksisterende.map(onske => {
    if (onske === kjoptOnske) {
      return Object.assign({}, onske, {
        kjopt,
        kjoptAv: kjopt ? auth.currentUser.uid : '',
      });
    }
    return onske;
  })
};

export const finnPersonMedUid = (uid, personer) => {
  return personer.find(x => x.uid === uid);
};

export const erInnloggetBrukersUid = uid => auth.currentUser.uid === uid;

export const erLoggetInn = () => auth.currentUser !== null;