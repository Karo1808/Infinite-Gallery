<div align="center">
  <h1>Infinite Gallery</h1>  
</div>

[![pl](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/Karo1808/infinite-gallery/blob/master/README.md)

### Opis

Infinite Gallery to aplikacja internetowa prezentująca nieskończoną galerię zdjęć. Została zbudowana przy użyciu Vite i React, wykorzystując API Unsplash do dynamicznego pobierania obrazów.

### Link do strony internetowej:

https://infinite-gallery-nqv7.vercel.app/

### Funkcje

- **Nieskończone przewijanie:** Użytkownicy mogą przewijać galerię bez końca, dynamicznie ładując więcej obrazów w trakcie nawigacji.
- **Funkcjonalność wyszukiwania:** Umożliwia użytkownikom wyszukiwanie konkretnych obrazów na podstawie słów kluczowych.
- **Układ "masonry":** Obrazy są wyświetlane w wizualnie atrakcyjnym układzie "masonry", optymalizując przestrzeń i estetykę.
- **Bezpośrednie linki:** Każdy obraz ma bezpośredni link do łatwego udostępniania lub dodawania do zakładek.
- **Modale:** Szczegółowy podgląd obrazu jest ułatwiony dzięki modalom, pozwalając użytkownikom przeglądać obrazy w większym formacie.
- **Przyciski udostępniania i pobierania:** Zapewnia użytkownikom opcję udostępniania obrazów lub pobierania ich bezpośrednio.
- **Zastępowanie obrazów rozmytymi:** Wykorzystuje rozmazane zastępstwa obrazów, aby usprawnić ładowanie i dostarczyć użytkownikom informacji zwrotnej wizualnej.
- **W pełni responsywna:** Aplikacja została zaprojektowana tak, aby dostosowywać się bezproblemowo do różnych rozmiarów ekranów i urządzeń.

### Użyte technologie

- **Vite:** Szybkie narzędzie do budowy nowoczesnych aplikacji jednostronicowych.
- **React:** Biblioteka JavaScript do tworzenia interfejsów użytkownika.
- **Typescript:** Nadzbiór języka JavaScript, dodający typowanie statyczne do języka.
- **Moduły CSS:** Pozwala na stylowanie w ograniczonym zakresie, automatycznie generując unikalne nazwy klas.
- **React Query:** Zapewnia narzędzia do zarządzania, buforowania i synchronizacji stanu serwera w aplikacjach React.
- **React Router:** Biblioteka routingu dla aplikacji React, umożliwiająca nawigację między różnymi stronami.
- **Blurhash:** Zastępczy obraz który wykorzystuje zamazaną wersje obrazu by usprawnić dozania użytkowanika
- **Unsplash API SDK:** Oficjalne SDK do integracji z API Unsplash w aplikacjach.

### Instalacja

Sklonuj repozytorium lokalnie

```bash
git clone https://github.com/Karo1808/infinite-gallery.git
```

Zainstaluj wymagane zależności

```bash
npm install
```

Utwórz plik .env.local i dodaj następujące zmienne środowiskowe

```bash
VITE_UNSPLASH_ACCESS_KEY=
VITE_UNSPLASH_ACCESS_KEY2=

VITE_FACEBOOK_ID=
```

Uruchom stronę lokalnie

```bash
npm run dev
```
