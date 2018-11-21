import {auth} from '../config/firebase';

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

export const erLoggetInn =() => auth.currentUser !== null;