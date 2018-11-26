export const BRUKER_LOGGET_INN = 'BRUKER_LOGGET_INN';
export function brukerLoggetInn(user) {
  return {
    type: BRUKER_LOGGET_INN,
    user,
  };
}

export const MOTTA_MIN_ONSKELISTE = 'MOTTA_MIN_ONSKELISTE';
export function mottaMinOnskeliste(nyListe) {
  return {
    type: MOTTA_MIN_ONSKELISTE,
    nyListe,
  };
}

export const TOGGLE_LENKE_DIALOG = 'TOGGLE_LENKE_DIALOG';
export function toggleLenkeDialog(index) {
  return {
    type: TOGGLE_LENKE_DIALOG,
    index,
  };
}

export const ENDRE_HEADER_TEKST = 'ENDRE_HEADER_TEKST';
export function endreHeaderTekst(nyTekst) {
  return {
    type: ENDRE_HEADER_TEKST,
    nyTekst,
  };
}

export const TOGGLE_VIS_OPPRETT_BRUKER = 'TOGGLE_VIS_OPPRETT_BRUKER';
export function toggleVisOpprettBruker() {
  return {
    type: TOGGLE_VIS_OPPRETT_BRUKER,
  };
}

export const MOTTA_BRUKERE = 'MOTTA_BRUKERE';
export function mottaBrukere(brukere) {
  return {
    type: MOTTA_BRUKERE,
    brukere
  };
}

// vennelister
export const MOTTA_VALGT_VENNS_LISTE = 'MOTTA_VALGT_VENNS_LISTE';
export function mottaValgtVennsListe(nyListe) {
  return {
    type: MOTTA_VALGT_VENNS_LISTE,
    nyListe,
  };
}

export const SETTE_VALGT_VENN = 'SETTE_VALGT_VENN';
export function setValgtVenn(venn) {
  return {
    type: SETTE_VALGT_VENN,
    venn,
  };
}

export const RESET_ALL_DATA = 'RESET_ALL_DATA';
export function resetAllData() {
  return {
    type: RESET_ALL_DATA,
  };
}
