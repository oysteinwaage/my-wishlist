import { auth } from '../config/firebase';

export const myWishlistId = () => auth.currentUser.uid;
export const erInnloggetBrukersUid = uid => auth.currentUser.uid === uid;

export const finnPersonMedUid = (uid, personer) => {
  return personer.find(x => x.uid === uid);
};
